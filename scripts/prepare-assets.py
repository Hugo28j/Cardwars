"""Regenerate the historical SVG atlas from the bundled GPL-3.0 GeoJSON."""
import json,pathlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
ASSETS=ROOT/"assets"

def distance(p,a,b):
    x,y=p;ax,ay=a;bx,by=b;dx,dy=bx-ax,by-ay
    t=max(0,min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy))) if dx or dy else 0
    return ((x-ax-t*dx)**2+(y-ay-t*dy)**2)**0.5
def simplify(points,epsilon=0.035):
    if len(points)<4:return points
    distances=[distance(p,points[0],points[-1]) for p in points[1:-1]]
    m=max(distances)
    if m>epsilon:
        i=distances.index(m)+1;return simplify(points[:i+1],epsilon)[:-1]+simplify(points[i:],epsilon)
    return [points[0],points[-1]]

def atlas():
    original=json.loads((ASSETS/'world-600.geojson').read_text());result=[]
    for f in original['features']:
        p=f['properties'];name=p.get('NAME') or ''
        # Remove the upstream layer's four residual Ostrogoth labels: the kingdom fell in 553.
        # Preserve their geometry as unassigned land instead of inventing precise successors.
        if name=='Ostrogoths':name=''
        paths=[]
        for poly in f['geometry']['coordinates']:
            for ring in poly:
                if not ring or max(x[0] for x in ring)<-23 or min(x[0] for x in ring)>151 or max(x[1] for x in ring)<-36:continue
                pts=simplify(ring)
                if len(pts)<4:continue
                paths.append('M'+'L'.join(f'{(x+22)*12:.2f},{(72-y)*15:.2f}' for x,y,*_ in pts)+'Z')
        if paths:result.append({'name':name,'realm':p.get('SUBJECTO') or name,'d':''.join(paths)})
    (ASSETS/'atlas.json').write_text(json.dumps(result,separators=(',',':')))
    print('atlas',len(result),'features',flush=True)

if __name__=='__main__':
    atlas()
