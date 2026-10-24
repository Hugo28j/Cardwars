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

from shapely import make_valid, set_precision, voronoi_polygons
from shapely.geometry import GeometryCollection, MultiPoint, MultiPolygon, Polygon
from shapely.ops import linemerge, polygonize, unary_union
from shapely.strtree import STRtree


ROOT = Path(__file__).resolve().parent.parent
ATLAS_PATH = ROOT / "assets" / "atlas.json"
LAND_PATH = ROOT / "assets" / "map-land.json"
BORDERS_PATH = ROOT / "assets" / "map-shared-borders.json"
MODERN_ATLAS_PATH = ROOT / "assets" / "modern-atlas.json"
REGION_OVERRIDES_PATH = ROOT / "assets" / "map-current-region-overrides.json"
SAMPLE_STEP = 1.2
COORDINATE_DIGITS = 6

# These are the playable city seeds inside modern Belgium. Mons and Luxembourg
# receive fixed current administrative shapes below; the other cities divide
# the remainder while keeping every marker inside its own clickable polygon.
BELGIUM_CITY_SEEDS = {
    "1300-bruges": (302.6964, 311.8605),
    "1300-ypres": (298.632, 317.229),
    "1300-ghent": (308.6088, 314.1855),
    "1300-antwerp": (316.83, 311.709),
    "1300-brussels": (316.2204, 317.2455),
    "1300-leuven": (320.406, 316.803),
    "1300-mons": (311.4204, 323.187),
    "1300-luxembourg": (337.5828, 335.826),
}
FIXED_CURRENT_CITY_IDS = {"1300-mons", "1300-luxembourg"}
LOCKED_GAP_CITY_IDS = {*BELGIUM_CITY_SEEDS, "1300-avignon"}


def parse_svg_area_raw(path_data: str):
    geometry = GeometryCollection()
    for ring_data in path_data.split("Z"):
        points = [
            tuple(map(float, pair))
            for pair in re.findall(r"(-?[\d.]+),(-?[\d.]+)", ring_data)
        ]
        if len(points) >= 3:
            geometry = geometry.symmetric_difference(Polygon(points))
    return geometry


def parse_svg_area(path_data: str):
    return make_valid(parse_svg_area_raw(path_data))


def polygons(geometry):
    if geometry.geom_type == "Polygon":
        return [geometry]
    result = []
    for item in getattr(geometry, "geoms", ()):
        result.extend(polygons(item))
    return result


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


def boundary_samples(geometries, excluded_owners=frozenset()):
    points = []
    owners = []
    seen = set()
    for owner, geometry in enumerate(geometries):
        if owner in excluded_owners:
            continue
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


def apply_current_belgium_layout(features, geometries, land):
    """Snap Belgium/Luxembourg to current borders without changing click logic."""
    modern_atlas = json.loads(MODERN_ATLAS_PATH.read_text())
    overrides = json.loads(REGION_OVERRIDES_PATH.read_text())
    modern = {
        feature["name"]: parse_svg_area(feature["d"]).intersection(land)
        for feature in modern_atlas
        if feature.get("name") in {"Belgium", "Luxembourg"}
    }
    belgium = modern["Belgium"]
    luxembourg_country = modern["Luxembourg"]
    current_zone = belgium.union(luxembourg_country)
    hainaut = parse_svg_area(overrides["belgianHainautD"]).intersection(belgium)
    belgian_luxembourg = parse_svg_area(
        overrides["belgianLuxembourgD"]
    ).intersection(belgium)

    city_positions = {
        feature.get("cityId"): index
        for index, feature in enumerate(features)
        if feature.get("cityId")
    }
    missing = set(BELGIUM_CITY_SEEDS).difference(city_positions)
    assert not missing, f"Missing Belgian city features: {sorted(missing)}"

    # Remove the old hand-drawn Belgian footprint from every province. The
    # selected Belgian cities are rebuilt only inside the current borders;
    # neighbouring cities retain only the land outside those borders.
    for index, (feature, geometry) in enumerate(zip(features, geometries)):
        if feature.get("cityId") in BELGIUM_CITY_SEEDS:
            geometries[index] = GeometryCollection()
        else:
            geometries[index] = clean_area(geometry.difference(current_zone))

    fixed = {
        "1300-mons": hainaut,
        "1300-luxembourg": belgian_luxembourg.union(luxembourg_country),
    }
    remaining = belgium.difference(unary_union(list(fixed.values())))
    flexible_ids = [
        city_id
        for city_id in BELGIUM_CITY_SEEDS
        if city_id not in FIXED_CURRENT_CITY_IDS
    ]
    cells = voronoi_polygons(
        MultiPoint([BELGIUM_CITY_SEEDS[city_id] for city_id in flexible_ids]),
        extend_to=belgium.envelope,
        ordered=True,
    )
    for city_id, cell in zip(flexible_ids, cells.geoms):
        geometries[city_positions[city_id]] = clean_area(cell.intersection(remaining))
    for city_id, geometry in fixed.items():
        geometries[city_positions[city_id]] = clean_area(geometry)

    target_union = unary_union(
        [geometries[city_positions[city_id]] for city_id in BELGIUM_CITY_SEEDS]
    )
    assert current_zone.symmetric_difference(target_union).area < 1e-6
    return geometries


def apply_local_region_corrections(features, geometries, land):
    """Keep user-marked city regions from reclaiming oversized gap fills."""
    overrides = json.loads(REGION_OVERRIDES_PATH.read_text())
    avignon_index = next(
        index
        for index, feature in enumerate(features)
        if feature.get("cityId") == "1300-avignon"
    )
    geometries[avignon_index] = clean_area(
        parse_svg_area(overrides["avignonD"]).intersection(land)
    )
    return geometries


def rebuild_coverage(features, land):
    original = [clean_area(parse_svg_area(feature["d"]).intersection(land)) for feature in features]
    original = apply_current_belgium_layout(features, original, land)
    original = apply_local_region_corrections(features, original, land)
    missing_land = land.difference(unary_union(original))
    locked_owners = {
        index
        for index, feature in enumerate(features)
        if feature.get("cityId") in LOCKED_GAP_CITY_IDS
    }
    samples, owners = boundary_samples(original, locked_owners)
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


def normalize_coverage(features, geometries, land):
    """Turn all near-touching outlines into one exact shared-edge subdivision."""
    modern_atlas = json.loads(MODERN_ATLAS_PATH.read_text())
    modern = {
        feature["name"]: parse_svg_area(feature["d"]).intersection(land)
        for feature in modern_atlas
        if feature.get("name") in {"Belgium", "Luxembourg"}
    }
    belgium = modern["Belgium"]
    current_zone = belgium.union(modern["Luxembourg"])
    overrides = json.loads(REGION_OVERRIDES_PATH.read_text())
    fixed_masks = {
        "1300-mons": parse_svg_area(overrides["belgianHainautD"]).intersection(belgium),
        "1300-luxembourg": parse_svg_area(
            overrides["belgianLuxembourgD"]
        ).intersection(belgium).union(modern["Luxembourg"]),
    }
    avignon_mask = parse_svg_area(overrides["avignonD"]).intersection(land)
    network = unary_union(
        [
            land.boundary,
            current_zone.boundary,
            *[mask.boundary for mask in fixed_masks.values()],
            *[geometry.boundary for geometry in geometries if not geometry.is_empty],
        ]
    )
    faces = []
    for face in polygonize(network):
        if face.area <= 1e-10:
            continue
        faces.extend(
            polygon
            for polygon in polygons(face.intersection(land))
            if polygon.area > 1e-10
        )
    city_positions = {
        feature.get("cityId"): index
        for index, feature in enumerate(features)
        if feature.get("cityId")
    }
    flexible_indices = [
        city_positions[city_id]
        for city_id in BELGIUM_CITY_SEEDS
        if city_id not in FIXED_CURRENT_CITY_IDS
    ]
    flexible_tree = STRtree([geometries[index] for index in flexible_indices])
    outside_indices = [
        index
        for index, feature in enumerate(features)
        if feature.get("cityId") not in LOCKED_GAP_CITY_IDS
    ]
    outside_tree = STRtree([geometries[index] for index in outside_indices])
    assigned = [[] for _ in geometries]

    def add_parts(geometry, resolve_owner):
        for polygon in polygons(geometry):
            if polygon.area <= 1e-10:
                continue
            assigned[resolve_owner(polygon.representative_point())].append(polygon)

    def flexible_owner(probe):
        local_owners = flexible_tree.query(probe, predicate="covered_by")
        local_owner = (
            int(local_owners[0])
            if len(local_owners)
            else int(flexible_tree.nearest(probe))
        )
        return flexible_indices[local_owner]

    def outside_owner(probe):
        local_owners = outside_tree.query(probe, predicate="covered_by")
        local_owner = (
            int(local_owners[0])
            if len(local_owners)
            else int(outside_tree.nearest(probe))
        )
        return outside_indices[local_owner]

    for face in faces:
        if face.is_empty or face.area <= 1e-10:
            continue
        luxembourg_part = face.intersection(fixed_masks["1300-luxembourg"])
        add_parts(
            luxembourg_part,
            lambda _probe: city_positions["1300-luxembourg"],
        )
        remainder = face.difference(fixed_masks["1300-luxembourg"])
        mons_part = remainder.intersection(fixed_masks["1300-mons"])
        add_parts(mons_part, lambda _probe: city_positions["1300-mons"])
        remainder = remainder.difference(fixed_masks["1300-mons"])
        current_part = remainder.intersection(current_zone)
        add_parts(current_part, flexible_owner)
        outside_part = remainder.difference(current_zone)
        add_parts(outside_part, outside_owner)
    rebuilt = [
        unary_union(parts) if parts else GeometryCollection()
        for parts in assigned
    ]
    # Re-polygonize once after the administrative cuts so every final owner
    # receives complete shared faces. This removes floating-point T-junctions
    # created by the overlay operations above.
    final_network = unary_union(
        [
            land.boundary,
            avignon_mask.boundary,
            *[geometry.boundary for geometry in rebuilt if not geometry.is_empty],
        ]
    )
    final_assigned = [[] for _ in rebuilt]
    for face in polygonize(final_network):
        for polygon in polygons(face.intersection(land)):
            if polygon.area <= 1e-10:
                continue
            probe = polygon.representative_point()
            if avignon_mask.covers(probe):
                owner = city_positions["1300-avignon"]
            elif fixed_masks["1300-luxembourg"].covers(probe):
                owner = city_positions["1300-luxembourg"]
            elif fixed_masks["1300-mons"].covers(probe):
                owner = city_positions["1300-mons"]
            elif current_zone.covers(probe):
                owner = flexible_owner(probe)
            else:
                owner = outside_owner(probe)
            final_assigned[owner].append(polygon)
    final = [
        unary_union(parts) if parts else GeometryCollection()
        for parts in final_assigned
    ]
    # Build the actual stored coverage once more on a common grid. Snapping
    # the network before polygonizing (instead of each owner independently)
    # guarantees that both sides of every edge receive identical vertices.
    precision_land = set_precision(land, 0.001)
    precision_network = unary_union(
        [
            precision_land.boundary,
            *[
                set_precision(geometry.boundary, 0.001)
                for geometry in final
                if not geometry.is_empty
            ],
        ]
    )
    stored_assigned = [[] for _ in final]
    for face in polygonize(precision_network):
        for polygon in polygons(face.intersection(precision_land)):
            if polygon.area <= 1e-10:
                continue
            probe = polygon.representative_point()
            if avignon_mask.covers(probe):
                owner = city_positions["1300-avignon"]
            elif fixed_masks["1300-luxembourg"].covers(probe):
                owner = city_positions["1300-luxembourg"]
            elif fixed_masks["1300-mons"].covers(probe):
                owner = city_positions["1300-mons"]
            elif current_zone.covers(probe):
                owner = flexible_owner(probe)
            else:
                owner = outside_owner(probe)
            stored_assigned[owner].append(polygon)
    return [
        unary_union(parts) if parts else GeometryCollection()
        for parts in stored_assigned
    ]


def shared_borders(features, geometries):
    country_lines = []
    city_lines = []
    tree = STRtree(geometries)
    for left_index, left in enumerate(geometries):
        if left.is_empty:
            continue
        left_boundary = left.boundary
        if left_boundary is None:
            continue
        for right_index in tree.query(left):
            right_index = int(right_index)
            if right_index <= left_index:
                continue
            right = geometries[right_index]
            if right.is_empty:
                continue
            right_boundary = right.boundary
            if right_boundary is None:
                continue
            shared = left_boundary.intersection(right_boundary)
            if shared is None or shared.is_empty or shared.length <= 1e-7:
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
    rebuilt = normalize_coverage(features, rebuilt, land)

    stored = []
    for feature, geometry in zip(features, rebuilt):
        path_data = area_to_svg(geometry)
        rounded = parse_svg_area_raw(path_data)
        if not rounded.is_valid:
            rounded = make_valid(rounded)
        rounded = clean_area(rounded)
        feature["d"] = area_to_svg(rounded)
        stored.append(rounded)
    for feature in atlas:
        if feature.get("underlay"):
            feature["d"] = land_record["d"]

    # Validate the rebuilt coverage here. tests/map-topology.py reparses the
    # rounded SVG in a fresh GEOS process and verifies the browser payload.
    union = unary_union(stored)
    assert all(geometry.is_valid for geometry in stored), "A rebuilt province is invalid"
    overlap_area = sum(geometry.area for geometry in stored) - union.area
    assert overlap_area < 1e-4, "Rebuilt provinces materially overlap"
    assert land.difference(union.buffer(0.003)).area < 1e-7, "Rebuilt land has gaps"
    assert union.difference(land.buffer(0.003)).area < 1e-7, "A province extends into the sea"

    country, city = shared_borders(features, stored)
    assert country.difference(land.buffer(0.003)).length < 1e-5
    assert city.difference(land.buffer(0.003)).length < 1e-5

    ATLAS_PATH.write_text(json.dumps(atlas, ensure_ascii=False, separators=(",", ":")) + "\n")
    BORDERS_PATH.write_text(
        json.dumps(
            {
                "source": "shared boundaries rebuilt from current country and city polygons",
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
