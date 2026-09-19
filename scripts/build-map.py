"""Build continuous, non-overlapping 1300 map polygons. Requires shapely>=2.1.
The preserved input is the authored map at commit 2ebedba; small borders remain
schematic. This improves rendering, not the historical precision of that source.
"""
import json,re,pathlib
from shapely import make_valid, coverage_simplify, coverage_is_valid, set_precision
from shapely.geometry import Polygon, GeometryCollection, box, Point, shape
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
    return ''.join('M'+'L'.join(f'{x:.3f},{y:.3f}' for x,y in ring.coords)+'Z' for p in polygons(g) for ring in [p.exterior,*p.interiors])
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
 ('Kingdom of Majorca','ROUSSILLON',2.7,42.65,3,[(1.9,42.45),(2.8,42.4),(3.2,42.45),(3.1,42.9),(2.6,42.95),(2.05,42.8)])
]
world=json.loads((ROOT/'assets/world-1300.geojson').read_text())
land=set_precision(unary_union([make_valid(affine_transform(shape(f['geometry']),[12,0,0,-15,264,1080])).intersection(clip) for f in world['features']]).intersection(clip),.001)
features=[(f,g.intersection(land)) for f,g in features]

for name,label,x,y,level,points in additions:
    features.append((dict(name=name,realm=name,label=label,lx=x,ly=y,labelLevel=level,detail=True),set_precision(geo(points).intersection(land),.001)))
# The old grid accidentally assigned a Ligurian strip to Waldstaette.
# Restore the Swiss core and the Genoese mainland; retain Genoese Corsica.
features=[(f,g.difference(geo([(7,43),(10.2,43),(10.2,45),(7,45)]))) if f['name']=='Waldstatte' else (f,g) for f,g in features]
features.append((dict(name='Republic of Genoa',realm='Republic of Genoa',detail=True,label='GENOA',lx=8.9,ly=44.35,labelLevel=2),geo([(7.45,43.72),(7.8,44.1),(8.35,44.5),(8.8,44.65),(9.25,44.6),(9.8,44.3),(10.1,44.05),(9.7,43.8),(8.7,43.6)]).intersection(land)))
features.append((dict(name='Waldstatte',realm='Waldstatte',detail=True,label='WALDSTÄTTE',lx=8.55,ly=46.9,labelLevel=2),geo([(8.05,46.8),(8.3,47.1),(8.75,47.15),(8.95,46.95),(8.65,46.55),(8.35,46.6)]).intersection(land)))
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
geometries=[unary_union(polygons(g)) for _,g in resolved]
# Node every junction before simplifying: adjacent source shapes can encode
# the same edge with different intermediate vertices.
faces=list(polygonize(unary_union([g.boundary for g in geometries])))
tree=STRtree(geometries); owners=[]; kept=[]
for face in faces:
    p=face.representative_point()
    candidates=[int(i) for i in tree.query(p) if geometries[i].covers(p)]
    if candidates: kept.append(face);owners.append(max(candidates))
assert coverage_is_valid(kept), 'Invalid noded coverage'
smooth=coverage_simplify(kept,1.8,simplify_boundary=False)
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
for f,g in outlines: result.append(dict(f,d=path(g)))
(ROOT/'assets/atlas.json').write_text(json.dumps(result,separators=(',',':'),ensure_ascii=False)+'\n')
assert all(g.is_valid for g in geometries)
print(f'{len(result)} features; continuous polygons; coverage valid: {coverage_is_valid(geometries)}')
