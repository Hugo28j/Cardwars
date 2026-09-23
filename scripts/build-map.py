"""Build continuous, non-overlapping 1300 map polygons. Requires shapely>=2.1.
The preserved input is the authored map at commit 2ebedba; small borders remain
schematic. This improves rendering, not the historical precision of that source.
"""
import json,re,pathlib,math,runpy
from collections import defaultdict
from shapely import make_valid, coverage_simplify, coverage_is_valid, set_precision, voronoi_polygons
from shapely.geometry import Polygon, GeometryCollection, box, Point, MultiPoint, shape
from shapely.ops import unary_union, polygonize
from shapely.strtree import STRtree
from shapely.affinity import affine_transform
ROOT=pathlib.Path(__file__).resolve().parent.parent

def polygons(g):
    if g.geom_type=='Polygon': return [g]
    return [p for part in getattr(g,'geoms',[]) for p in polygons(part)]
def parse(d):
    rings=[]
    for ring in d.split('Z'):
        pts=[tuple(map(float,p)) for p in re.findall(r'(-?[\d.]+),(-?[\d.]+)',ring)]
        if len(pts)>=3: rings.extend(polygons(make_valid(Polygon(pts))))
    # Original detail paths are adjacent strips, not holes.
    return unary_union(rings)
def project(lon,lat): return ((lon+22)*12,(72-lat)*15)
def geo(points): return Polygon([project(*p) for p in points])
def path(g):
    return ''.join('M'+'L'.join(f'{x},{y}' for x,y in ring.coords)+'Z' for p in polygons(g) for ring in [p.exterior,*p.interiors])
source=json.loads((ROOT/'scripts/map/atlas-source.json').read_text())
# Geographic scope includes neighbouring land for orientation, not the whole world.
clip=box(*project(-12,60),*project(45,34))
features=[]; outlines=[]
for f in source:
    g=set_precision(parse(f['d']).intersection(clip),.001)
    if g.is_empty: continue
    (outlines if f.get('outline') else features).append(({k:v for k,v in f.items() if k!='d'},g))

# France-region principalities missing from the previous atlas. These are
# deliberately generalized polygons; they are not digitized cadastral borders.
additions=[
 ('Duchy of Burgundy','BURGUNDY',4.55,47.15,2,[(3.15,47.65),(3.85,48.05),(4.65,48.02),(5.45,47.75),(5.45,46.5),(4.8,46.15),(4.05,46.55),(3.4,47.1)]),
 ('County of Champagne','CHAMPAGNE',4.15,48.8,2,[(3.1,49.7),(4.25,49.85),(5.15,49.5),(5.45,48.2),(4.65,48.02),(3.85,48.05),(3.15,47.65),(2.9,48.35)]),
 ('County of Anjou','ANJOU',-.5,47.55,2,[(-1.35,47.15),(-1.15,47.85),(-.6,48.15),(.35,47.95),(.55,47.35),(.05,47.05),(-.65,47.0)]),
 ('County of Provence','PROVENCE',6.05,43.8,2,[(4.65,43.3),(4.7,43.85),(5.05,44.25),(5.55,44.65),(6.6,44.65),(7.25,44.15),(7.6,43.75),(6.7,43.0),(5.4,42.95)]),
 ('Dauphine of Viennois','DAUPHINÉ',5.65,45.0,2,[(4.75,45.65),(5.4,45.9),(6.25,45.65),(6.8,45.05),(6.6,44.65),(5.55,44.65),(5.05,44.25),(4.8,44.55)]),
 ('County of Burgundy','FRANCHE-COMTÉ',6.05,47.05,2,[(5.45,47.75),(6.15,47.9),(6.9,47.5),(6.65,46.85),(5.9,46.3),(5.45,46.5)]),
 ('Viscounty of Limoges','LIMOGES',1.25,45.7,3,[(.65,46.0),(1.45,46.1),(1.8,45.7),(1.35,45.35),(.7,45.4)]),
 ('Archbishopric of Lyon','LYON',4.78,45.85,3,[(4.5,46),(4.95,46),(5.05,45.65),(4.65,45.6)]),
 ('Archbishopric of Vienne','VIENNE',4.87,45.52,3,[(4.7,45.6),(5.0,45.65),(5.0,45.4),(4.75,45.4)]),
 ('Kingdom of Majorca','MONTPELLIER',3.87,43.62,3,[(3.65,43.48),(4.05,43.48),(4.08,43.8),(3.65,43.82)]),
 ('Roussillon','ROUSSILLON',2.7,42.65,3,[(1.8375,42.5433),(2.8,42.4),(3.2,42.45),(3.1,42.9),(2.6,42.95),(2.1,42.8467),(1.85,42.6967)])
]
world=json.loads((ROOT/'scripts/map/physical-land.geojson').read_text())
land=set_precision(unary_union([make_valid(affine_transform(shape(f['geometry']),[12,0,0,-15,264,1080])).intersection(clip) for f in world['features']]).intersection(clip),.001)
features=[(f,g.intersection(land)) for f,g in features]

for name,label,x,y,level,points in additions:
    features.append((dict(name=name,realm=name,label=label,lx=x,ly=y,labelLevel=level,detail=True),set_precision(geo(points).intersection(land),.001)))
# The old grid accidentally assigned a Ligurian strip to Waldstaette.
# Restore the Swiss core and the Genoese mainland; retain Genoese Corsica.
features=[(f,g) for f,g in features if f['name']!='Waldstatte']
features.append((dict(name='Republic of Genoa',realm='Republic of Genoa',detail=True,label='GENOA',lx=8.9,ly=44.35,labelLevel=2),geo([(7.45,43.72),(7.8,44.1),(8.35,44.5),(8.8,44.65),(9.25,44.6),(9.8,44.3),(10.1,44.05),(9.7,43.8),(8.7,43.6)]).intersection(land)))
features.append((dict(name='Waldstatte',realm='Waldstatte',detail=True,label='WALDSTÄTTE',lx=8.55,ly=46.9,labelLevel=2),geo([(8.05,46.8),(8.3,47.1),(8.75,47.15),(8.95,46.95),(8.65,46.55),(8.35,46.6)]).intersection(land)))

# Overlay the newer hand-generalized geographic regions from the continuous-map
# checkpoint. The current live realm set remains authoritative: checkpoint-only
# states are ignored unless gameplay.py deliberately merges/removes them later.
REGIONS=runpy.run_path(str(ROOT/'scripts/map/regions.py'))['REGIONS']
allowed_realms=set(json.loads((ROOT/'scripts/map/expected-realms.json').read_text()))
region_renames={
    'Emirate of Granada':'Granada',
    'Lordship of Ferrara':'Marquisate of Ferrara',
    'Beylik of Alaiye':'Alaiye',
    'Beylik of Eshref':'Eshrefids',
    'Beylik of Hamid':'Hamidids',
    'Beylik of Ladik':'Ladik',
    'Pervane Beylik':'Pervane',
    'Empire of Trebizond':'Trebizond',
}
gameplay_intermediate={'Waldstatte','Commune of Como','County of Burgundy','Duchy of Lorraine'}
accepted=skipped=0
for region in REGIONS:
    source_realm=region.get('realm') or region.get('name')
    realm=region_renames.get(source_realm,source_realm)
    if realm not in allowed_realms and source_realm not in gameplay_intermediate:
        skipped+=1
        continue
    meta={k:v for k,v in region.items() if k!='points'}
    if realm!=source_realm:
        meta['name']=meta['realm']=realm
    geometry=set_precision(geo(region['points']).intersection(land),.001)
    if geometry.is_empty:
        continue
    features.append((meta,geometry));accepted+=1
print(f'Continuous geographic overlays: {accepted} accepted, {skipped} checkpoint-only regions skipped.',flush=True)

# Correct anachronistic rank (the duchy title is later than this snapshot).
for f,g in features:
    if f['name']=='Republic of Genoa' and g.bounds[3]>450 and g.bounds[1]>430: f.update(label='GENOESE CORSICA',labelLevel=3)
    if f['name']=='Duchy of Mecklenburg': f['name']=f['realm']='Lordship of Mecklenburg'
    if f['name'] in ['Duchy of Austria','Margraviate of Brandenburg','Republic of Florence','Republic of Venice','Lordship of Milan','Karamanids','Beylik of Germiyan','Empire of Trebizond']: f['labelLevel']=2
    if f['name']=='Duchy of Brittany': f.update(label='BRITTANY',lx=-2.8,ly=48.15,labelLevel=2)

# Resolve the paint stack into actual polygons: no hidden territories under
# another polity and no strip edges within a state.
covered=GeometryCollection(); resolved=[]
for f,g in reversed(features):
    visible=make_valid(g.difference(covered))
    covered=unary_union([covered,g])
    if not visible.is_empty: resolved.append((f,visible))
resolved.reverse()
# A state can have several disjoint components, but only one geometry/label.
merged=defaultdict(list); metadata={}
for f,g in resolved:
    name=f.get('realm') or f.get('name') or 'Local communities'
    merged[name].append(g)
    metadata[name]=dict(f,name=name,realm=name)
resolved=[(metadata[name],unary_union(parts)) for name,parts in merged.items()]
geometries=[unary_union(polygons(g)) for _,g in resolved]
# Historical coastlines do not coincide with physical land. Partition ONLY the
# missing land by nearest boundary, without repainting existing ownership.
# Sampling is deterministic; this is a cartographic repair, not new evidence.
missing=land.difference(unary_union(geometries))
if not missing.is_empty:
    seeds={}
    nearby=missing.buffer(2)
    for owner,g in enumerate(geometries):
        edge=g.boundary.intersection(nearby)
        lines=[edge] if edge.geom_type=='LineString' else list(getattr(edge,'geoms',[]))
        for line in lines:
            if line.geom_type!='LineString' or line.is_empty: continue
            count=max(1,math.ceil(line.length/.75))
            for i in range(count+1):
                point=line.interpolate(i/count,normalized=True)
                seeds.setdefault((round(point.x,6),round(point.y,6)),owner)
    cells=voronoi_polygons(MultiPoint(list(seeds)),extend_to=land.envelope,ordered=True)
    extras=[[] for _ in geometries]
    for owner,cell in zip(seeds.values(),cells.geoms):
        piece=cell.intersection(missing)
        if not piece.is_empty: extras[owner].append(piece)
    geometries=[set_precision(unary_union([g,*extra]),.001) for g,extra in zip(geometries,extras)]
print('Coastline gaps repaired',flush=True)
apply_gameplay=runpy.run_path(str(ROOT/'scripts/map/gameplay.py'))['apply_gameplay']
resolved,geometries=apply_gameplay(resolved,geometries,land,geo,polygons)
# Node every junction as one shared network before simplifying. Do not snap
# polygonized faces independently: dense hand-authored regions can otherwise
# acquire microscopic mismatches along an otherwise identical shared edge.
network=unary_union([g.boundary for g in geometries])
faces=[g for g in polygonize(network) if not g.is_empty]
tree=STRtree(geometries); owners=[]; kept=[]
for face in faces:
    p=face.representative_point()
    candidates=[int(i) for i in tree.query(p) if geometries[int(i)].covers(p)]
    if candidates:
        owner=max(candidates,key=lambda i:geometries[i].intersection(face).area)
    else:
        candidates=[int(i) for i in tree.query(face) if geometries[int(i)].intersection(face).area>1e-9]
        if not candidates:
            continue
        owner=max(candidates,key=lambda i:geometries[i].intersection(face).area)
    kept.append(face);owners.append(owner)
assert coverage_is_valid(kept), 'Invalid shared boundary network before simplification'
smooth=coverage_simplify(kept,2.2,simplify_boundary=False)
groups=[[] for _ in geometries]
for owner,g in zip(owners,smooth): groups[owner].append(g)
geometries=[unary_union(group) for group in groups]
result=[]
for (f,_),g in zip(resolved,geometries):
    f=dict(f)
    if f.get('label'):
        p=Point(project(f['lx'],f['ly']))
        if not g.covers(p):
            p=max(polygons(g),key=lambda p:p.area).representative_point()
            f['lx']=round(p.x/12-22,5);f['ly']=round(72-p.y/15,5)
    result.append(dict(f,d=path(g)))
# The imperial envelope supplies one umbrella label, not a second border map.
for f,g in outlines: result.append(dict(f,d=''))
(ROOT/'assets/atlas-1300-v2.json').write_text(json.dumps(result,separators=(',',':'),ensure_ascii=False)+'\n')
assert all(g.is_valid for g in geometries)
assert coverage_is_valid(geometries), 'Overlapping territories or mismatched borders'
assert land.symmetric_difference(unary_union(geometries)).area<.05, 'Missing land after topology repair'
assert len([f['realm'] for f in result if not f.get('outline')])==len(set(f['realm'] for f in result if not f.get('outline'))), 'Duplicate polity layer'
expected_realms=set(json.loads((ROOT/'scripts/map/expected-realms.json').read_text()))
built_realms={f['realm'] for f in result if not f.get('outline')}
assert built_realms==expected_realms, f'Realm set changed: missing={sorted(expected_realms-built_realms)}, added={sorted(built_realms-expected_realms)}'
# Persist canonical land alongside the paths for an independent coverage test.
(ROOT/'assets/map-land.json').write_text(json.dumps({'d':path(land)},separators=(',',':'))+'\n')
print(f'{len(result)} features; continuous polygons; coverage valid: {coverage_is_valid(geometries)}')
