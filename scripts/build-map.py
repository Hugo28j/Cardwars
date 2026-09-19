"""Rebuild the continuous c.1300 atlas. Python 3 + Shapely >= 2.1.
Uses geographic region outlines, never the legacy scanline atlas.
"""
import json,sys,pathlib,math
from collections import defaultdict
from shapely import make_valid,set_precision
from shapely.geometry import shape,Polygon,Point,box,GeometryCollection,LineString
from shapely.ops import unary_union,polygonize,linemerge,polylabel
from shapely.strtree import STRtree
ROOT=pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'scripts/map'))
from regions import REGIONS
CLIP=box(-12,34,45,60)
GRID=.000001

def parts(g,kind='Polygon'):
    if g.geom_type==kind:return [g]
    return [p for x in getattr(g,'geoms',[]) for p in parts(x,kind)]
def clean(g):return set_precision(unary_union(parts(make_valid(g))),GRID)
def projection(x,y):return ((x+22)*12,(72-y)*15)
def ringpath(coords,closed=True):
    return 'M'+'L'.join(f'{x:.3f},{y:.3f}' for x,y in [projection(*p[:2]) for p in coords])+('Z' if closed else '')
def fillpath(g):return ''.join(ringpath(r.coords) for p in parts(g) for r in [p.exterior,*p.interiors])
def linepath(g):return ''.join(ringpath(p.coords,False) for p in parts(g,'LineString'))
def rounded(line):
    """Round shared junction-free edges, limiting each corner cut to ~10km.
    Every adjacent state uses the exact same edge. Endpoints never move.
    """
    pts=list(line.coords)
    if len(pts)<3:return line
    for _ in range(2):
        out=[pts[0]]
        for a,b in zip(pts,pts[1:]):
            length=math.dist(a,b)
            t=min(.25,.09/max(length,1e-12))
            out.extend([(a[0]*(1-t)+b[0]*t,a[1]*(1-t)+b[1]*t),(a[0]*t+b[0]*(1-t),a[1]*t+b[1]*(1-t))])
        out.append(pts[-1]);pts=out
    return LineString(pts)
RENAMES={'France':'Kingdom of France','Portugal':'Kingdom of Portugal','Castile':'Crown of Castile','Aragón':'Crown of Aragon','Navarre':'Kingdom of Navarre','Granada':'Emirate of Granada','English territory':'Kingdom of England','Scotland':'Kingdom of Scotland','Britany':'Duchy of Brittany','Poland':'Kingdom of Poland','Lithuania':'Grand Duchy of Lithuania','Hungary':'Kingdom of Hungary','Raška':'Kingdom of Serbia','Bulgar Khanate':'Second Bulgarian Empire','Sicily':'Kingdom of Naples','Venice':'Republic of Venice','Seljuk Caliphate':'Sultanate of Rum','Trebizond':'Empire of Trebizond','Teutonic Knights':'Teutonic Order','Norway':'Kingdom of Norway','Denmark':'Kingdom of Denmark','Sweden':'Kingdom of Sweden','Corsica':'Republic of Genoa','Sardinia':'Sardinian lordships'}
land=clean(shape(json.loads((ROOT/'scripts/map/coastline.geojson').read_text())).intersection(CLIP))
world=json.loads((ROOT/'assets/world-1300.geojson').read_text())
base=[]
for f in world['features']:
    g=clean(shape(f['geometry']).intersection(CLIP)) if shape(f['geometry']).is_valid else clean(make_valid(shape(f['geometry'])).intersection(CLIP))
    if g.is_empty:continue
    name=f['properties'].get('NAME') or f['properties'].get('SUBJECTO') or 'Local lordships'
    name=RENAMES.get(name,name)
    base.append((dict(name=name,realm=name,detail=False),g))
# Fit coarse historical coastline to the more detailed land mask. Only coastal
# gaps are extended; existing inland borders are not buffered.
missing=land.difference(unary_union([g for _,g in base]))
base=[(f,clean(g.union(g.buffer(.4).intersection(missing)).intersection(land))) for f,g in base]
left=land.difference(unary_union([g for _,g in base]))
for patch in parts(left):
    owner=min(range(len(base)),key=lambda i:base[i][1].distance(patch))
    f,g=base[owner];base[owner]=(f,clean(g.union(patch)))
features=list(base)
for f in REGIONS:
    meta={k:v for k,v in f.items() if k!='points'}
    g=clean(Polygon(f['points']).intersection(land))
    if not g.is_empty:features.append((meta,g))
# Resolve priority once, then dissolve pieces of the same polity.
covered=GeometryCollection();groups=defaultdict(list);metadata={};labels=[]
for f,g in reversed(features):
    visible=clean(g.difference(covered))
    covered=clean(covered.union(g))
    if visible.is_empty:continue
    groups[f['realm']].append(visible)
    metadata.setdefault(f['realm'],f)
    if f.get('label'):labels.append({k:f[k] for k in ['realm','label','lx','ly','labelLevel']})
names=list(groups);geoms=[clean(unary_union(groups[n])) for n in names]
# Normalize junctions into a planar network before smoothing shared edges.
network=unary_union([g.boundary for g in geoms]+[land.boundary])
internal=network.difference(land.boundary)
chains=linemerge(internal) if internal.geom_type!='LineString' else internal
smooth=unary_union([rounded(l) for l in parts(chains,'LineString')])
faces=list(polygonize(unary_union([smooth,land.boundary])))
tree=STRtree(geoms);buckets=[[] for _ in names]
for face in faces:
    p=face.representative_point()
    if not land.covers(p):continue
    hits=[int(i) for i in tree.query(p) if geoms[i].covers(p)]
    if not hits:
        hits=[int(tree.nearest(p))]
    # Representative points of tiny rounded slivers may sit on a moved edge;
    # assign by greatest overlapping area if this face spans several owners.
    candidates=list(tree.query(face))
    owner=max(candidates,key=lambda i:geoms[i].intersection(face).area) if len(candidates)>1 else hits[0]
    buckets[int(owner)].append(face)
new=[clean(unary_union(b)) for b in buckets]
# Any residual rounding fragment stays land and inherits the touching region.
remainder=clean(land.difference(unary_union(new)))
for patch in parts(remainder):
    owner=min(range(len(new)),key=lambda i:new[i].distance(patch))
    new[owner]=clean(new[owner].union(patch))
geoms=new
# Disjoint fills, a single internal-border mesh, and one high-resolution coast.
mesh=unary_union([g.boundary for g in geoms]).difference(land.boundary)
base_labels=[('Kingdom of France','FRANCE',1.9,46.65,1),('Kingdom of England','ENGLAND',-1.5,52.5,1),('Kingdom of Scotland','SCOTLAND',-4,56.8,1),('Crown of Castile','CASTILE',-4.5,40.1,1),('Kingdom of Poland','POLAND',19,52,1),('Grand Duchy of Lithuania','LITHUANIA',25,54.5,1),('Kingdom of Hungary','HUNGARY',20,47,1),('Kingdom of Serbia','SERBIA',20.4,43.5,2),('Second Bulgarian Empire','BULGARIA',25.3,43.2,2),('Teutonic Order','TEUTONIC ORDER',20.5,54,2),('Ilkhanate','ILKHANATE',41.1,38.8,1),('Holy Roman Empire','HOLY ROMAN EMPIRE',10.05,50.12,1)]
for realm,label,x,y,level in base_labels:labels.append(dict(realm=realm,label=label,lx=x,ly=y,labelLevel=level,umbrella=realm=='Holy Roman Empire'))
byname=dict(zip(names,geoms));final_labels=[];seen=set()
for l in labels:
    if l['realm'] not in byname or (l['realm'],l['label']) in seen:continue
    seen.add((l['realm'],l['label']))
    g=byname[l['realm']];p=Point(l['lx'],l['ly'])
    if not g.covers(p) and not l.get('umbrella'):
        # Keep labels on their own territorial component, never silently move
        # a mainland label to a distant overseas possession.
        poly=min(parts(g),key=lambda a:a.distance(p))
        p=polylabel(poly,tolerance=.01)
        l['lx'],l['ly']=round(p.x,5),round(p.y,5)
    final_labels.append(l)
# Avoid identical colours on neighbours while keeping a stable muted palette.
adjacency=STRtree(geoms);palette_indices={}
for i in sorted(range(len(names)),key=lambda i:(-geoms[i].area,names[i])):
    used={palette_indices[names[int(j)]] for j in adjacency.query(geoms[i],predicate='intersects') if names[int(j)] in palette_indices}
    h=7
    for c in names[i]:h=(h*31+ord(c)) & 0xffffffff
    palette_indices[names[i]]=next((k for step in range(12) if (k:=(h+step)%12) not in used),h%12)
output={'version':'1300-continuous-v2','features':[dict(name=n,realm=n,paletteIndex=palette_indices[n],detail=metadata[n].get('detail',False),note=metadata[n].get('note',''),d=fillpath(g)) for n,g in zip(names,geoms) if not g.is_empty], 'labels':final_labels,'land':fillpath(land),'borders':linepath(mesh)}
(ROOT/'assets/atlas-1300-v2.json').write_text(json.dumps(output,ensure_ascii=False,separators=(',',':'))+'\n')
(ROOT/'scripts/map/compiled-regions.geojson').write_text(json.dumps({'type':'FeatureCollection','features':[{'type':'Feature','properties':{'name':n},'geometry':__import__('shapely.geometry',fromlist=['mapping']).mapping(g)} for n,g in zip(names,geoms) if not g.is_empty]},separators=(',',':'))+'\n')
assert all(g.is_valid for g in geoms)
assert sum(g.area for g in geoms)-unary_union(geoms).area<.000001
assert land.symmetric_difference(unary_union(geoms)).area<.00001
print(f'{len(output["features"])} polities, {len(final_labels)} labels; no overlap or missing land; {len(json.dumps(output))} bytes')
