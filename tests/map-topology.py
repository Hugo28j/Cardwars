"""Regression checks for the SVG geometry actually rendered by the atlas.
Run with Python + Shapely 2.1: python tests/map-topology.py
"""
import json,re
from pathlib import Path
from shapely.geometry import Polygon, GeometryCollection, Point
from shapely.ops import unary_union
from shapely import coverage_is_valid
ROOT=Path(__file__).resolve().parent.parent

def parse(d):
    result=GeometryCollection()
    for ring in d.split('Z'):
        pts=[tuple(map(float,p)) for p in re.findall(r'(-?[\d.]+),(-?[\d.]+)',ring)]
        if len(pts)>=3: result=result.symmetric_difference(Polygon(pts))
    return result

atlas=json.loads((ROOT/'assets/atlas.json').read_text())
land=parse(json.loads((ROOT/'assets/map-land.json').read_text())['d'])
states=[f for f in atlas if not f.get('outline')]
geoms=[parse(f['d']) for f in states]
assert all(g.is_valid for g in geoms)
assert coverage_is_valid(geoms), 'The rendered polygons overlap or have mismatched edges'
# Allow only the generator's 0.001-unit coordinate snapping tolerance.
# At maximum zoom 0.003 map units is still well below one screen pixel.
coverage=unary_union(geoms)
assert land.difference(coverage.buffer(.003)).area<1e-7, 'Land is missing'
assert coverage.difference(land.buffer(.003)).area<1e-7, 'Land extends into the sea'
names=[f['realm'] for f in states]
assert len(names)==len(set(names)), 'Duplicate state/label'
assert all(not f['d'] for f in atlas if f.get('outline')), 'Old imperial border overlay is still drawn'
# Inland points near the gaps visible in the reported screenshot.
for lon,lat in [(8.3,46.8),(9.0,45.8),(10.5,47.2),(6.9,48.1),(13.2,47.4),(14.3,48.1)]:
    p=Point((lon+22)*12,(72-lat)*15)
    assert sum(g.covers(p) for g in geoms)==1, f'Missing or overlapping land at {lon},{lat}'
print(f'PASS: {len(states)} unique states; valid shared edges; no land gaps, overlaps or duplicate envelope.')
