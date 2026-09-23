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

# Gameplay merges must affect both rendered ownership and the card allegiance.
import subprocess
cards=json.loads(subprocess.check_output(['node','--input-type=module','-e',
    "import {CITIES_1300} from './src/data1300.js';console.log(JSON.stringify(CITIES_1300))"],cwd=ROOT,text=True))
by_name={f['name']:g for f,g in zip(states,geoms)}
for old in ['Free Imperial City of Strasbourg','Free Imperial City of Speyer','Prince-Bishopric of Speyer','Free Imperial City of Worms','Prince-Bishopric of Augsburg','Free Imperial City of Augsburg']:
    assert old not in by_name, f'Removed gameplay state survived: {old}'
expected={'Strasbourg':'Prince-Bishopric of Strasbourg','Speyer':'County Palatine of the Rhine','Worms':'County Palatine of the Rhine','Bruchsal':'County Palatine of the Rhine','Augsburg':'Duchy of Upper Bavaria'}
for c in cards:
    if c['name'] in expected:
        assert c['country']==expected[c['name']], f'Wrong card allegiance: {c["name"]}'
        assert c.get('historicalCountry') and c.get('gameplayNote')
        p=Point((c['lon']+22)*12,(72-c['lat'])*15)
        assert by_name[c['country']].covers(p), f'City marker outside assigned state: {c["name"]}'
assert by_name['Duchy of Saxe-Lauenburg'].geom_type=='Polygon', 'Detached Lauenburg survived'
assert by_name['Archbishopric of Cologne'].geom_type=='Polygon', 'Detached Cologne survived'
for name in ['Free Imperial City of Bremen','Kingdom of Majorca']:
    g=by_name[name]
    if name=='Kingdom of Majorca':
        from shapely.geometry import box
        g=g.intersection(box((3.5+22)*12,(72-44)*15,(4.3+22)*12,(72-43.3)*15))
    assert g.area/g.envelope.area<.9, f'Rectangular enclave survived: {name}'
# All of mainland southern Italy must be Naples, not stray coarse Sicily.
mainland=max(list(land.geoms),key=lambda p:p.area) if land.geom_type=='MultiPolygon' else land
assert by_name['Kingdom of Sicily'].intersection(mainland).area<.001
print('PASS: requested mergers, card ownership, enclave shapes and coastal remnant removal.')

# The entire old French intrusion must be gone, not cropped into tiny wedges.
envelope=unary_union([by_name[n] for n in ['County of Champagne','Duchy of Lorraine','Duchy of Burgundy']]).convex_hull
assert by_name['Kingdom of France'].intersection(envelope).area<.1, 'French corridor fragments survived'
c=next(c for c in cards if c['name']=='Montpellier')
assert by_name[c['country']].covers(Point((c['lon']+22)*12,(72-c['lat'])*15))
