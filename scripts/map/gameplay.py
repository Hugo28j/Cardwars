"""User-requested gameplay generalisation; not a new historical reconstruction."""
from shapely.geometry import Point
from shapely.ops import unary_union
from shapely import set_precision

def apply_gameplay(resolved, geometries, land, geo, polygons):
    def clean(g): return set_precision(unary_union(polygons(g)),.001)
    states={f['name']:clean(g) for (f,_),g in zip(resolved,geometries)}
    meta={f['name']:dict(f) for f,_ in resolved}
    def note(name,text): meta[name]['gameplayNote']=text
    def give(name,area):
        area=clean(area.intersection(land))
        for other in states:
            if other!=name and states[other].intersects(area): states[other]=clean(states[other].difference(area))
        states[name]=clean(unary_union([states[name],area]))
    def distribute(area,exclude):
        # Vacated corners go to the neighbour sharing the longest edge.
        for part in polygons(area):
            choices=[n for n,g in states.items() if n not in exclude and not g.is_empty]
            target=max(choices,key=lambda n:part.boundary.intersection(states[n].boundary).length)
            if part.boundary.intersection(states[target].boundary).length<.001:
                target=min(choices,key=lambda n:part.distance(states[n]))
            give(target,part)
    def replace(name,new,old=None):
        new=clean(new.intersection(land))
        old=states[name] if old is None else clean(old)
        states[name]=clean(states[name].difference(old))
        give(name,new)
        distribute(old.difference(new),{name})
    def merge(source,target):
        if source in states:
            states[target]=unary_union([states[target],states.pop(source)])
            meta.pop(source,None)

    # The coarse source calls both island Sicily and the Angevin mainland Sicily.
    # Detail Naples used a different coastline, leaving Sicilian triangles behind.
    mainland=max(polygons(land),key=lambda g:g.area)
    give('Kingdom of Naples',states['Kingdom of Sicily'].intersection(mainland))
    give('Kingdom of Naples',states['Kingdom of Sicily'].intersection(geo([(12,39.5),(19,39.5),(19,43),(12,43)])))

    merge('Free Imperial City of Strasbourg','Prince-Bishopric of Strasbourg')
    meta['Prince-Bishopric of Strasbourg'].update(label='STRASBOURG',labelLevel=2)
    note('Prince-Bishopric of Strasbourg','Gameplay: Strasbourg city and its surrounding bishopric form one state.')
    for name in ['Free Imperial City of Speyer','Prince-Bishopric of Speyer','Free Imperial City of Worms','Prince-Bishopric of Worms']:
        merge(name,'County Palatine of the Rhine')
    note('County Palatine of the Rhine','Gameplay: Speyer, Worms and the Speyer bishopric are incorporated into the Palatinate.')
    for name in ['Free Imperial City of Augsburg','Prince-Bishopric of Augsburg']:
        merge(name,'Duchy of Upper Bavaria')
    # The old Augsburg marker straddled the inherited Bavaria/bishopric edge.
    give('Duchy of Upper Bavaria',geo([(10.72,48.26),(10.72,48.48),(10.95,48.52),(11.12,48.38),(11.05,48.24)]))
    note('Duchy of Upper Bavaria','Gameplay: Augsburg and its bishopric are incorporated into Upper Bavaria.')

    replace('Archbishopric of Cologne',geo([(6.50,50.36),(6.68,50.73),(6.65,51.23),(6.91,51.12),(7.10,51.04),(7.40,51.06),(7.73,51.17),(7.82,51.04),(7.61,50.84),(7.37,50.72),(7.17,50.39)]))
    note('Archbishopric of Cologne','Gameplay border cleaned to remove the detached wedge and angular notch.')
    replace('Free Imperial City of Bremen',geo([(8.62,53.12),(8.69,53.24),(8.83,53.26),(9.00,53.19),(9.11,53.08),(9.02,52.96),(8.85,52.92),(8.69,52.99)]))
    note('Free Imperial City of Bremen','Gameplay footprint generalized around Bremen; the square city enclave is removed.')
    name='Duchy of Saxe-Lauenburg'
    parts=polygons(states[name]);core=max(parts,key=lambda p:p.area)
    states[name]=core
    distribute(unary_union([p for p in parts if p is not core]),{name})
    note(name,'Gameplay: detached fragments are assigned to adjacent states; Saxe-Lauenburg has one connected mainland territory.')

    neighbours=['County of Champagne','Duchy of Lorraine','Duchy of Burgundy']
    envelope=unary_union([states[n] for n in neighbours]).convex_hull
    corridor=states['Kingdom of France'].intersection(envelope)
    # Remove the complete intrusions, not a rectangular crop leaving wedges.
    for piece in polygons(corridor):
        target=max(neighbours,key=lambda n:piece.boundary.intersection(states[n].boundary).length)
        give(target,piece)
    for name in ['County of Champagne','Duchy of Lorraine','Duchy of Burgundy']:
        note(name,'Gameplay: the narrow French corridor between Champagne and Lorraine is distributed among its neighbours.')


    # Remove the thin residual France tongue between Amiens and Reims.
    give('County of Champagne',geo([
        (2.3333,49.7467),(2.5000,49.4667),(2.8333,49.0000),(3.0667,48.1500),
        (3.7333,48.0200),(4.5833,48.0200),(5.4500,47.7500),(5.4500,48.2000),
        (5.4000,48.6667),(5.3333,49.2000),(5.0667,49.7333),(4.2500,49.8000),
        (3.4167,49.9000),(2.5833,49.9333)
    ]))
    note('County of Champagne','Gameplay: the remaining French tongue north-west of Reims is absorbed into Champagne for a clean regional border.')

    # Burgundy / Lorraine / Lyon-Vienne gameplay cleanup.
    # These are deliberate map simplifications requested for the game layer.
    if 'County of Burgundy' in states:
        merge('County of Burgundy','Duchy of Burgundy')
        note('Duchy of Burgundy','Gameplay: Franche-Comte is incorporated into Burgundy.')

    if 'Duchy of Lorraine' in states:
        lorraine=states.pop('Duchy of Lorraine')
        meta.pop('Duchy of Lorraine',None)
        south=lorraine.intersection(geo([(4.6,45.4),(6.5,45.4),(6.5,46.7),(4.6,46.7)]))
        north=lorraine.difference(south)
        west=north.intersection(geo([(5.4,47.5),(6.4,47.5),(6.4,50.2),(5.4,50.2)]))
        east=north.difference(west)
        give('Duchy of Burgundy',south)
        give('County of Champagne',west)
        give('Prince-Bishopric of Strasbourg',east)
        note('Duchy of Burgundy','Gameplay: Franche-Comte and the detached southern Lorraine fragment are incorporated into Burgundy.')
        note('County of Champagne','Gameplay: western Lorraine is folded into Champagne.')
        note('Prince-Bishopric of Strasbourg','Gameplay: eastern Lorraine is folded into Strasbourg.')

    # Remove the last small France wedge around Lyon/Vienne.
    replace('Archbishopric of Lyon',geo([
        (3.7917,45.6800),(3.7250,45.8800),(3.8500,46.0800),(4.1833,46.1800),
        (4.5833,46.1467),(4.9167,46.0667),(5.2333,45.8533),(5.2083,45.6933),
        (5.0417,45.6200),(4.7917,45.5867),(4.4167,45.5333),(4.0417,45.5667)
    ]))
    meta['Archbishopric of Lyon'].update(lx=4.70,ly=45.88)
    note('Archbishopric of Lyon','Gameplay: Lyon is enlarged westward and northward to remove the residual French wedge and create a smoother border.')

    replace('Archbishopric of Vienne',geo([
        (4.0417,45.5667),(4.4167,45.5333),(4.7917,45.5867),(5.0417,45.6200),
        (5.2083,45.6933),(5.3333,45.5333),(5.2500,45.3000),(5.0833,45.1667),
        (4.7917,45.1200),(4.4167,45.1667),(4.1500,45.3000)
    ]))
    meta['Archbishopric of Vienne'].update(lx=4.72,ly=45.42)
    note('Archbishopric of Vienne','Gameplay: Vienne is enlarged westward with a smoother shared border with Lyon.')


    # User-marked cleanup around Champagne, Lyon and Saluzzo.
    # 1) Return the western Champagne sliver (left of the drawn line) to France.
    give('Kingdom of France',geo([
        (2.5000,49.7867),(3.5000,49.9067),(3.2500,49.6800),
        (2.9167,49.4000),(2.6667,49.0000),(2.5000,49.7867)
    ]))
    # 2) Give the circled French strip below Hainaut to Champagne.
    give('County of Champagne',geo([
        (3.5000,49.9067),(3.7049,50.0254),(4.4200,49.8100),
        (4.8500,49.8027),(5.4167,49.5333),(5.8333,49.3867),
        (3.5000,49.9067)
    ]))
    note('County of Champagne','Gameplay border follows the user-marked split: the western sliver returns to France, while the circled strip below Hainaut is assigned to Champagne.')

    # 3) Give the circled French wedge just north of Lyon to Lyon.
    give('Archbishopric of Lyon',geo([
        (3.8750,46.0667),(4.2083,46.1467),(4.5417,46.2133),
        (4.8000,46.1500),(5.3846,45.8997),(5.2083,45.6933),
        (4.5000,46.0000),(3.8750,46.0667)
    ]))
    note('Archbishopric of Lyon','Gameplay: the circled French wedge immediately north of Lyon is incorporated into Lyon.')

    # 4) Give the circled French pocket beside Saluzzo to Saluzzo.
    give('Marquisate of Saluzzo',geo([
        (6.9000,44.8000),(6.7000,44.8500),(6.6000,44.6500),
        (6.8116,44.4873),(6.8886,44.5349),(6.9691,44.5418),
        (6.9000,44.8000)
    ]))
    note('Marquisate of Saluzzo','Gameplay: the small circled French pocket on the Alpine border is assigned to Saluzzo.')

    name='Kingdom of Majorca'
    old=states[name].intersection(geo([(3.5,43.3),(4.3,43.3),(4.3,44),(3.5,44)]))
    new=geo([(3.61,43.63),(3.67,43.76),(3.82,43.82),(3.99,43.76),(4.10,43.61),(4.01,43.48),(3.81,43.44),(3.68,43.50)])
    replace(name,new,old)
    note(name,'Gameplay: Montpellier retains its Majorcan allegiance with a non-rectangular footprint.')


    # Iberia gameplay cleanup: give Andorra a rounder readable footprint.
    # Roussillon is a separate gameplay region in build-map.py, historically
    # belonging to the Kingdom of Majorca around 1300.
    if 'Andorra' in states:
        replace('Andorra',geo([
            (1.85,42.6967),(1.8375,42.5433),(1.725,42.4633),
            (1.5417,42.4367),(1.3792,42.48),(1.3208,42.57),
            (1.3708,42.6533),(1.5125,42.71),(1.6958,42.7267)
        ]))
        note('Andorra','Gameplay border rounded for readability while preserving the small Pyrenean polity.')

    # Remove tiny coastal remnants of the two inherited source resolutions.
    # Keep islands, entire small polities, and any fragment containing a city.
    # Reassign only a minor mainland component with a substantial shared edge.
    import json,subprocess,pathlib
    root=pathlib.Path(__file__).resolve().parents[2]
    cities=json.loads(subprocess.check_output(['node','--input-type=module','-e',
        "import {CITIES_1300} from './src/data1300.js'; console.log(JSON.stringify(CITIES_1300.map(c=>[c.lon,c.lat])))"],cwd=root,text=True))
    anchors=[Point((lon+22)*12,(72-lat)*15) for lon,lat in cities]
    transfers=0
    for name in list(states):
        parts=polygons(states[name]);largest=max((p.area for p in parts),default=0)
        for part in parts:
            if part.area>=min(8,largest*.025) or part.boundary.intersection(land.boundary).length<.01: continue
            if any(part.buffer(.05).covers(p) for p in anchors): continue
            neighbours=[(part.boundary.intersection(g.boundary).length,n) for n,g in states.items() if n!=name and not g.is_empty]
            length,target=max(neighbours,default=(0,None))
            if length>.1:
                give(target,part);transfers+=1
    print(f'Gameplay merges complete; {transfers} minor coastal remnants reassigned.',flush=True)
    keys=[n for n,g in states.items() if not g.is_empty]
    return [(meta[n],states[n]) for n in keys],[states[n] for n in keys]
