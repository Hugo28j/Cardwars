#!/usr/bin/env python3
"""Close the hand-drawn atlas gaps and derive borders from shared land geometry.

Requires Shapely 2.1+. The original city polygons are retained; only uncovered
parts of the physical land mask are assigned to the nearest polygon boundary.
The resulting country and city linework therefore cannot extend into the sea.
"""

from __future__ import annotations

import json
import math
import re
from pathlib import Path

from shapely import coverage_is_valid, make_valid, voronoi_polygons
from shapely.geometry import GeometryCollection, MultiPoint, MultiPolygon, Polygon
from shapely.ops import linemerge, unary_union
from shapely.strtree import STRtree


ROOT = Path(__file__).resolve().parent.parent
ATLAS_PATH = ROOT / "assets" / "atlas.json"
LAND_PATH = ROOT / "assets" / "map-land.json"
BORDERS_PATH = ROOT / "assets" / "map-shared-borders.json"
SAMPLE_STEP = 1.2
COORDINATE_DIGITS = 6


def parse_svg_area(path_data: str):
    geometry = GeometryCollection()
    for ring_data in path_data.split("Z"):
        points = [
            tuple(map(float, pair))
            for pair in re.findall(r"(-?[\d.]+),(-?[\d.]+)", ring_data)
        ]
        if len(points) >= 3:
            geometry = geometry.symmetric_difference(Polygon(points))
    return make_valid(geometry)


def polygons(geometry):
    if geometry.geom_type == "Polygon":
        return [geometry]
    return [item for item in getattr(geometry, "geoms", ()) if item.geom_type == "Polygon"]


def clean_area(geometry):
    """Remove zero-area rings created where a filled gap meets its old edge."""
    cleaned = []
    for polygon in polygons(make_valid(geometry)):
        if polygon.area <= 1e-7:
            continue
        holes = [ring.coords for ring in polygon.interiors if Polygon(ring).area > 1e-7]
        cleaned.append(Polygon(polygon.exterior, holes))
    if not cleaned:
        return GeometryCollection()
    return cleaned[0] if len(cleaned) == 1 else MultiPolygon(cleaned)


def format_number(value: float) -> str:
    text = f"{value:.{COORDINATE_DIGITS}f}".rstrip("0").rstrip(".")
    return "0" if text in {"-0", ""} else text


def area_to_svg(geometry) -> str:
    result = []
    for polygon in polygons(geometry):
        for ring in [polygon.exterior, *polygon.interiors]:
            points = list(ring.coords)[:-1]
            if len(points) < 3:
                continue
            result.append(
                "M"
                + "L".join(f"{format_number(x)},{format_number(y)}" for x, y in points)
                + "Z"
            )
    return "".join(result)


def lines(geometry):
    if geometry.is_empty:
        return []
    if geometry.geom_type == "LineString":
        return [geometry]
    return [item for item in getattr(geometry, "geoms", ()) if item.geom_type == "LineString"]


def linework_to_svg(geometry) -> str:
    result = []
    for line in lines(geometry):
        points = list(line.coords)
        if len(points) < 2 or line.length <= 1e-7:
            continue
        result.append(
            "M" + "L".join(f"{format_number(x)},{format_number(y)}" for x, y in points)
        )
    return "".join(result)


def boundary_samples(geometries):
    points = []
    owners = []
    seen = set()
    for owner, geometry in enumerate(geometries):
        for polygon in polygons(geometry):
            for ring in [polygon.exterior, *polygon.interiors]:
                coordinates = list(ring.coords)
                for start, end in zip(coordinates, coordinates[1:]):
                    count = max(1, math.ceil(math.dist(start, end) / SAMPLE_STEP))
                    for index in range(count):
                        ratio = index / count
                        point = (
                            round(start[0] + (end[0] - start[0]) * ratio, 9),
                            round(start[1] + (end[1] - start[1]) * ratio, 9),
                        )
                        if point in seen:
                            continue
                        seen.add(point)
                        points.append(point)
                        owners.append(owner)
    return points, owners


def rebuild_coverage(features, land):
    original = [clean_area(parse_svg_area(feature["d"]).intersection(land)) for feature in features]
    missing_land = land.difference(unary_union(original))
    samples, owners = boundary_samples(original)
    cells = voronoi_polygons(MultiPoint(samples), extend_to=land.envelope, ordered=True)
    additions = [[] for _ in features]
    for owner, cell in zip(owners, cells.geoms):
        piece = cell.intersection(missing_land)
        if not piece.is_empty and piece.area > 1e-12:
            additions[owner].append(piece)
    rebuilt = []
    for geometry, pieces in zip(original, additions):
        rebuilt.append(clean_area(unary_union([geometry, *pieces]) if pieces else geometry))
    return rebuilt


def shared_borders(features, geometries):
    country_lines = []
    city_lines = []
    tree = STRtree(geometries)
    for left_index, left in enumerate(geometries):
        for right_index in tree.query(left):
            right_index = int(right_index)
            if right_index <= left_index:
                continue
            shared = left.boundary.intersection(geometries[right_index].boundary)
            if shared.is_empty or shared.length <= 1e-7:
                continue
            left_feature = features[left_index]
            right_feature = features[right_index]
            left_realm = left_feature.get("realm") or left_feature.get("name", "Local communities")
            right_realm = right_feature.get("realm") or right_feature.get("name", "Local communities")
            if left_realm != right_realm:
                country_lines.extend(lines(shared))
            elif (
                left_feature.get("cityId")
                and right_feature.get("cityId")
                and left_feature["cityId"] != right_feature["cityId"]
            ):
                city_lines.extend(lines(shared))
    country = linemerge(unary_union(country_lines))
    city = linemerge(unary_union(city_lines))
    return country, city


def main():
    atlas = json.loads(ATLAS_PATH.read_text())
    land_record = json.loads(LAND_PATH.read_text())
    land = parse_svg_area(land_record["d"])
    state_positions = [
        index
        for index, feature in enumerate(atlas)
        if not feature.get("outline") and not feature.get("underlay")
    ]
    features = [atlas[index] for index in state_positions]
    rebuilt = rebuild_coverage(features, land)

    for feature, geometry in zip(features, rebuilt):
        feature["d"] = area_to_svg(geometry)
    for feature in atlas:
        if feature.get("underlay"):
            feature["d"] = land_record["d"]

    # Validate the exact rounded paths that the browser will receive.
    stored = [parse_svg_area(feature["d"]) for feature in features]
    union = unary_union(stored)
    assert all(geometry.is_valid for geometry in stored), "A rebuilt province is invalid"
    assert coverage_is_valid(stored), "Rebuilt provinces overlap or have mismatched edges"
    assert land.difference(union.buffer(0.003)).area < 1e-7, "Rebuilt land has gaps"
    assert union.difference(land.buffer(0.003)).area < 1e-7, "A province extends into the sea"

    country, city = shared_borders(features, stored)
    assert country.difference(land.buffer(1e-6)).length < 1e-5
    assert city.difference(land.buffer(1e-6)).length < 1e-5

    ATLAS_PATH.write_text(json.dumps(atlas, ensure_ascii=False, separators=(",", ":")) + "\n")
    BORDERS_PATH.write_text(
        json.dumps(
            {
                "source": "shared boundaries rebuilt from assets/atlas.json",
                "countryD": linework_to_svg(country),
                "cityD": linework_to_svg(city),
            },
            ensure_ascii=False,
            separators=(",", ":"),
        )
        + "\n"
    )
    print(
        f"Rebuilt {len(features)} regions; "
        f"country border {country.length:.1f}; city border {city.length:.1f}."
    )


if __name__ == "__main__":
    main()
