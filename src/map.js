import {CITIES_1300 as CITIES,CITY_1300 as CITY} from './data1300.js?v=20260922-army-five-percent-v5';
import {icon} from './icons.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CITY_DISPLAY_NAMES=new Map([
 ['1300-pozsony','Bratislava'],['1300-kassa','Košice'],['1300-gradec','Gradec'],
 ['1300-oradea','Oradea'],['1300-cluj','Cluj'],['1300-alba-iulia','Alba Iulia'],
 ['1300-sibiu','Sibiu'],['1300-brasov','Brașov'],['1300-stettin','Szczecin'],
 ['1300-saverne','Saverne'],['1300-olbia','Olbia'],['1300-cagliari','Cagliari'],
 ['1300-wroclaw','Wrocław']
]);
const displayCityName=c=>CITY_DISPLAY_NAMES.get(c.id)||String(c.name||'').split('/')[0].trim();
const pos=(lon,lat)=>[(lon+22)*12,(72-lat)*15];
const historicalLabels=[
 ['FRANCE',1.9,46.65,1],['ENGLAND',-1.5,52.5,1],['SCOTLAND',-4,56.8,1],
 ['PORTUGAL',-8,39.4,1],['CASTILE',-4.5,40.1,1],['ARAGON',.3,41.2,1],
 ['NAVARRE',-1.7,42.7,2],['GRANADA',-4.6,36.8,2],
 ['AQUITAINE',-0.55,45.15,2],
 ['POLAND',19,52,1],['LITHUANIA',25,54.5,1],['TEUTONIC ORDER',20.5,54,2],
 ['HUNGARY',20,47,1],['SERBIA',20.4,43.5,2],['BULGARIA',25.3,43.2,2]
];
const HISTORICAL_LABEL_REALMS=new Map([
 ['FRANCE','Kingdom of France'],['ENGLAND','Kingdom of England'],['SCOTLAND','Kingdom of Scotland'],
 ['PORTUGAL','Kingdom of Portugal'],['CASTILE','Crown of Castile'],['ARAGON','Crown of Aragon'],
 ['NAVARRE','Kingdom of Navarre'],['GRANADA','Granada'],['AQUITAINE','Kingdom of England'],
 ['POLAND','Kingdom of Poland'],['LITHUANIA','Grand Duchy of Lithuania'],['TEUTONIC ORDER','Teutonic Order'],
 ['HUNGARY','Kingdom of Hungary'],['SERBIA','Kingdom of Serbia'],['BULGARIA','Second Bulgarian Empire']
]);
const bounds={x:120,y:180,w:684,h:390};
const overlaps=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const palettes=['#879372','#8b7890','#a38d65','#728fa1','#9c8172','#738f82','#9c966f','#8b9a8b','#947b68','#6f8793','#947b8a','#7d946f'];
const realmOf=f=>f.realm||f.name||'Local communities';
const CITY_REALM_ALIASES=new Map([
 ['Duchy of Aquitaine (English Crown)','Kingdom of England'],
 ['Archbishopric of Lyon (Holy Roman Empire)','Archbishopric of Lyon'],
 ['Archbishopric of Vienne (Holy Roman Empire)','Archbishopric of Vienne'],
 ['County of Jülich','County of Julich'],
 ['County of Württemberg','County of Wurttemberg'],
 ['Prince-Bishopric of Münster','Prince-Bishopric of Munster'],
 ['Prince-Bishopric of Osnabrück','Prince-Bishopric of Osnabruck'],
 ['Prince-Bishopric of Würzburg','Prince-Bishopric of Wurzburg'],
 ['Imperial City of Frankfurt','Free Imperial City of Frankfurt'],
 ['Duchy of Brunswick-Lüneburg','Duchy of Brunswick-Luneburg'],
 ['Free Imperial City of Lübeck','Free Imperial City of Lubeck'],
 ['Lordship of Werle','Lordship of Mecklenburg'],
 ['Free Imperial City of Regensburg','Prince-Bishopric of Regensburg'],
 ['Duchy of Masovia','Kingdom of Poland'],
 ['Duchy of Wrocław','Kingdom of Bohemia'],
 ['Duchy of Pomerelia','Kingdom of Poland']
]);

const svgSubpaths=d=>String(d||'').match(/M[^M]+?Z/g)||[];
const svgSubpathPoints=seg=>{const nums=(seg.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number),pts=[];for(let i=0;i+1<nums.length;i+=2)pts.push([nums[i],nums[i+1]]);return pts;};
const svgSubpathStats=seg=>{const pts=svgSubpathPoints(seg);if(!pts.length)return {area:0,minx:Infinity,maxx:-Infinity,miny:Infinity,maxy:-Infinity};let a=0,minx=Infinity,maxx=-Infinity,miny=Infinity,maxy=-Infinity;for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[(i+1)%pts.length];a+=p[0]*q[1]-q[0]*p[1];minx=Math.min(minx,p[0]);maxx=Math.max(maxx,p[0]);miny=Math.min(miny,p[1]);maxy=Math.max(maxy,p[1]);}return {area:Math.abs(a/2),minx,maxx,miny,maxy};};
const ISLAND_STROKE_ZONES=[{minx:365.8,maxx:380.2,miny:433.5,maxy:460.2},{minx:360.8,maxx:382.2,miny:460.2,maxy:498.0}];
const inIslandStrokeZone=s=>ISLAND_STROKE_ZONES.some(z=>s.minx>=z.minx&&s.maxx<=z.maxx&&s.miny>=z.miny&&s.maxy<=z.maxy);
const withoutIslandStroke=d=>svgSubpaths(d).filter(seg=>!inIslandStrokeZone(svgSubpathStats(seg))).join('');
const islandLandOutline=d=>svgSubpaths(d).filter(seg=>{const s=svgSubpathStats(seg);return inIslandStrokeZone(s)&&s.area>=.02;}).join('');
const sharedIslandBorders=atlas=>{const edges=new Map();for(const f of atlas){if(f.outline||f.underlay)continue;const realm=realmOf(f);for(const seg of svgSubpaths(f.d)){if(!inIslandStrokeZone(svgSubpathStats(seg)))continue;const pts=svgSubpathPoints(seg);for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length],ak=a[0].toFixed(3)+','+a[1].toFixed(3),bk=b[0].toFixed(3)+','+b[1].toFixed(3),key=ak<bk?ak+'|'+bk:bk+'|'+ak;let edge=edges.get(key);if(!edge){edge={a,b,realms:new Set()};edges.set(key,edge);}edge.realms.add(realm);}}}return [...edges.values()].filter(e=>e.realms.size>1).map(e=>'M'+e.a[0].toFixed(3)+','+e.a[1].toFixed(3)+'L'+e.b[0].toFixed(3)+','+e.b[1].toFixed(3)).join('');};
const sameRealmSeamCovers=(atlas,mode)=>atlas.filter(f=>!f.outline&&!f.underlay).map((f,i,arr)=>{const realm=realmOf(f),edges=new Map();for(const seg of svgSubpaths(f.d)){const pts=svgSubpathPoints(seg);for(let j=0;j<pts.length;j++){const a=pts[j],b=pts[(j+1)%pts.length],ak=a[0].toFixed(3)+','+a[1].toFixed(3),bk=b[0].toFixed(3)+','+b[1].toFixed(3),key=ak<bk?ak+'|'+bk:bk+'|'+ak;let edge=edges.get(key);if(!edge){edge={a,b,count:0};edges.set(key,edge);}edge.count++;}}const d=[...edges.values()].filter(e=>e.count>1).map(e=>'M'+e.a[0].toFixed(3)+','+e.a[1].toFixed(3)+'L'+e.b[0].toFixed(3)+','+e.b[1].toFixed(3)).join('');if(!d)return'';const fill=mode==='historical'?colorForRealm(realm):palettes[i%palettes.length];return `<path d="${d}" fill="none" stroke="${fill}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`;}).join('');
const IBERIA_REALMS=new Set(['Kingdom of Portugal','Crown of Castile','Crown of Aragon','Kingdom of Navarre','Granada','Andorra','Roussillon']);
const cityRealm=c=>c.country==='Emirate of Granada'?'Granada':(CITY_REALM_ALIASES.get(c.country)||c.country);
const ownerRealmForCity=(game,c)=>{const saved=game?.cityOwners?.[c.id];if(saved==='player')return 'player';const raw=typeof saved==='string'&&saved?saved:c.country;return raw==='Emirate of Granada'?'Granada':(CITY_REALM_ALIASES.get(raw)||raw);};
// Every c.1300 city now gets the same territory treatment that France and Iberia already use.
// The active subset is intersected with the currently loaded atlas so unmatched/modern realms keep normal markers.
const CITY_TERRITORY_REALMS=new Set(CITIES.map(cityRealm));
const displayRealmName=name=>name==='Granada'?'Emirate of Granada':name;
const polygonPath=poly=>poly.length?'M'+poly.map(p=>p[0].toFixed(3)+','+p[1].toFixed(3)).join('L')+'Z':'';
const polygonBox=poly=>{const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const polygonArea=poly=>Math.abs(poly.reduce((a,p,i)=>{const q=poly[(i+1)%poly.length];return a+p[0]*q[1]-q[0]*p[1];},0)/2);
const polygonCentroid=poly=>{let a=0,cx=0,cy=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],k=p[0]*q[1]-q[0]*p[1];a+=k;cx+=(p[0]+q[0])*k;cy+=(p[1]+q[1])*k;}if(Math.abs(a)<1e-8){const n=poly.length||1;return [poly.reduce((v,p)=>v+p[0],0)/n,poly.reduce((v,p)=>v+p[1],0)/n];}return [cx/(3*a),cy/(3*a)];};
const pointInPolygon=(p,poly)=>{let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j],cross=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]);if(cross)inside=!inside;}return inside;};
const pointSegmentDistance=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l2=dx*dx+dy*dy;if(l2<1e-12)return Math.hypot(p[0]-a[0],p[1]-a[1]);const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l2)),x=a[0]+t*dx,y=a[1]+t*dy;return Math.hypot(p[0]-x,p[1]-y);};
const polygonEdgeDistance=(p,poly)=>{let d=Infinity;for(let i=0;i<poly.length;i++)d=Math.min(d,pointSegmentDistance(p,poly[i],poly[(i+1)%poly.length]));return d;};
const nearestPointOnSegment=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l2=dx*dx+dy*dy;if(l2<1e-12)return {point:[...a],distance:Math.hypot(p[0]-a[0],p[1]-a[1]),a,b};const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l2)),q=[a[0]+t*dx,a[1]+t*dy];return {point:q,distance:Math.hypot(p[0]-q[0],p[1]-q[1]),a,b};};
const nearestCoastEdge=(p,polys)=>{let best=null;for(const poly of polys||[])for(let i=0;i<poly.length;i++){const hit=nearestPointOnSegment(p,poly[i],poly[(i+1)%poly.length]);if(!best||hit.distance<best.distance)best=hit;}return best;};
const compactMilitaryNumber=n=>Math.max(0,Math.round(Number(n)||0)).toLocaleString('en-GB');
const normalizeArmyRelation=r=>r===true?'player':r===false||!r?'neutral':String(r);
const unitBadge=(textValue,relation='neutral',y=13)=>{const rel=normalizeArmyRelation(relation),t=String(textValue),w=Math.max(24,t.length*6.2+12),x=-w/2;return `<g class="military-count ${rel}-count" transform="translate(0,${y})"><rect x="${x}" y="-7" width="${w}" height="14" rx="6"/><text x="0" y="3" text-anchor="middle">${t}</text></g>`;};
const soldierPiece=(count,relation='neutral',badgeY=13)=>{const rel=normalizeArmyRelation(relation);return `<g class="military-piece soldier-piece ${rel}-unit"><ellipse class="unit-ground-shadow" cx="0" cy="8" rx="9.5" ry="3.1"/><path class="soldier-back" d="M-4 -8L3 -9 7 3 1 8-6 4Z"/><path class="soldier-body" d="M-5 -9L1 -11 5 -1 1 7-6 3Z"/><path class="soldier-highlight" d="M-3 -8L0 -9 2 1-1 4Z"/><circle class="soldier-head" cx="-1" cy="-14" r="4"/><path class="soldier-helmet" d="M-5 -15Q-1 -21 4 -15L4 -13-5 -13Z"/><path class="soldier-leg" d="M-3 4L-5 10M2 5L4 10"/><path class="soldier-spear" d="M6 -22L6 8"/><path class="soldier-spear-tip" d="M6 -27L3 -21 9 -21Z"/><path class="soldier-shield" d="M-9 -7Q-4 -10 0 -6L-1 2Q-5 7-9 2Z"/>${unitBadge(compactMilitaryNumber(count),rel,badgeY)}</g>`;};
const shipPiece=(count,owned)=>`<g class="military-piece ship-piece ${owned?'player-unit':''}"><ellipse class="unit-ground-shadow ship-shadow" cx="0" cy="8" rx="14" ry="3"/><path class="ship-hull-side" d="M-15 1L15 1 9 8-10 8Z"/><path class="ship-hull" d="M-16 -2L13 -2 16 2-14 4Z"/><path class="ship-deck" d="M-10 -4L9 -4 13 -2-14 -2Z"/><path class="ship-mast" d="M0 -20V1"/><path class="ship-sail-back" d="M1 -18L12 -5 1 -6Z"/><path class="ship-sail" d="M-1 -19L-12 -6-1 -7Z"/><path class="ship-flag" d="M0 -20L8 -17 0 -15Z"/>${unitBadge(compactMilitaryNumber(count),owned?'player':'neutral')}</g>`;
const mapArmyRelation=(game,c,playerOverride=false)=>{if(playerOverride)return 'player';const saved=game?.cityOwners?.[c.id],country=saved==='player'?game?.playerCountry:(typeof saved==='string'&&saved?saved:c.country);if(country===game?.playerCountry)return 'player';if((game?.wars||[]).includes(country))return 'enemy';if((game?.alliances||[]).includes(country))return 'ally';return 'neutral';};

const safeLabelMetrics=(cell,landPolys,fallback)=>{
 const box=polygonBox(cell),inside=p=>pointInPolygon(p,cell)&&landPolys.some(land=>pointInPolygon(p,land));
 let best=null;
 const consider=p=>{if(!inside(p))return;let d=polygonEdgeDistance(p,cell);for(const land of landPolys)if(pointInPolygon(p,land)){d=Math.min(d,polygonEdgeDistance(p,land));break;}if(!best||d>best.clearance)best={center:p,clearance:d};};
 const centroid=polygonCentroid(cell);consider(centroid);consider(fallback);
 const steps=22;
 for(let iy=0;iy<=steps;iy++)for(let ix=0;ix<=steps;ix++)consider([box.x+box.w*ix/steps,box.y+box.h*iy/steps]);
 if(best){
  let span=Math.max(box.w,box.h)/steps;
  for(let pass=0;pass<4;pass++){const c=best.center,s=span;for(let iy=-2;iy<=2;iy++)for(let ix=-2;ix<=2;ix++)consider([c[0]+ix*s/2,c[1]+iy*s/2]);span/=2;}
 }
 if(!best)return {center:fallback,box:{x:fallback[0]-2,y:fallback[1]-2,w:4,h:4},clearance:1};
 const pts=[],sample=24;
 for(let iy=0;iy<=sample;iy++)for(let ix=0;ix<=sample;ix++){const p=[box.x+box.w*ix/sample,box.y+box.h*iy/sample];if(inside(p))pts.push(p);}
 const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 return {center:best.center,clearance:Math.max(.45,best.clearance),box:pts.length?{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}:{x:best.center[0]-best.clearance,y:best.center[1]-best.clearance,w:best.clearance*2,h:best.clearance*2}};
};
const visibleCellMetrics=(poly,landPolys,fallback)=>safeLabelMetrics(poly,landPolys,fallback);
const realmLabelMetrics=(atlas,realm,fallback)=>{
 const polys=atlas.filter(f=>!f.outline&&!f.underlay&&realmOf(f)===realm).flatMap(f=>svgSubpaths(f.d).map(svgSubpathPoints).filter(p=>p.length>=3));
 if(!polys.length)return {center:fallback,clearance:0};
 const main=[...polys].sort((a,b)=>polygonArea(b)-polygonArea(a))[0];
 return safeLabelMetrics(main,[main],pointInPolygon(fallback,main)?fallback:polygonCentroid(main));
};
const clipHalfPlane=(poly,a,b,c)=>{const out=[];if(!poly.length)return out;const inside=p=>a*p[0]+b*p[1]<=c+1e-7;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],pin=inside(p),qin=inside(q);if(pin)out.push(p);if(pin!==qin){const dx=q[0]-p[0],dy=q[1]-p[1],den=a*dx+b*dy;if(Math.abs(den)>1e-9){const t=(c-a*p[0]-b*p[1])/den;out.push([p[0]+dx*t,p[1]+dy*t]);}}}return out;};
const voronoiCell=(point,others,box)=>{let poly=[[box.x,box.y],[box.x+box.w,box.y],[box.x+box.w,box.y+box.h],[box.x,box.y+box.h]];for(const other of others){if(other===point)continue;const a=other[0]-point[0],b=other[1]-point[1],c=(other[0]*other[0]+other[1]*other[1]-point[0]*point[0]-point[1]*point[1])/2;poly=clipHalfPlane(poly,a,b,c);if(!poly.length)break;}return poly;};
const cityBorderKey=(realm,a,b)=>realm+'|'+[a,b].sort().join('|');
const CITY_BORDER_SKIP=new Set([
 cityBorderKey('Kingdom of France','1300-narbonne','1300-nimes'),

 // Serbia: move the Peć–Prizren split to the user's drawn line.
 cityBorderKey('Kingdom of Serbia','1300-pec','1300-prizren'),

 // Carinthia / Aquileia: shorten or replace the highlighted splits.
 cityBorderKey('Duchy of Carinthia','1300-st-veit','1300-klagenfurt'),
 cityBorderKey('Patriarchate of Aquileia','1300-udine','1300-cividale'),
 cityBorderKey('Patriarchate of Aquileia','1300-aquileia','1300-cividale'),

 // Milan: keep only the unhighlighted parts and use the vertical split drawn by the user.
 cityBorderKey('Lordship of Milan','1300-altdorf','1300-como'),
 cityBorderKey('Lordship of Milan','1300-monza','1300-como'),

 // Moravia: remove the highlighted Jihlava spokes and trim Brno–Znojmo to the new diagonal.
 cityBorderKey('Margraviate of Moravia','1300-brno','1300-jihlava'),
 cityBorderKey('Margraviate of Moravia','1300-znojmo','1300-jihlava'),
 cityBorderKey('Margraviate of Moravia','1300-brno','1300-znojmo')
]);
const CITY_BORDER_MANUAL=new Map([
 [cityBorderKey('Kingdom of France','1300-narbonne','1300-nimes'),'M305.564,422.991L308.109,424.794'],

 // Screenshot 1 — Serbia
 [cityBorderKey('Kingdom of Serbia','1300-pec','1300-prizren'),'M493.815,449.641L504.944,423.440'],

 // Screenshot 2 — Carinthia / Aquileia
 [cityBorderKey('Duchy of Carinthia','1300-st-veit','1300-klagenfurt'),'M430.886,377.941L437.636,380.073'],
 [cityBorderKey('Patriarchate of Aquileia','1300-udine','1300-cividale'),'M418.447,380.917L423.499,381.904'],

 // Screenshot 3 — Milan
 [cityBorderKey('Lordship of Milan','1300-altdorf','1300-como'),'M361.200,387.854L376.494,382.663'],
 [cityBorderKey('Lordship of Milan','1300-monza','1300-como'),'M372.360,395.773L376.784,392.445'],
 ['Lordship of Milan|manual-west-vertical','M376.141,376.349L376.784,392.445'],

 // Screenshot 4 — Moravia
 [cityBorderKey('Margraviate of Moravia','1300-brno','1300-znojmo'),'M458.615,342.900L470.742,358.829'],
 ['Margraviate of Moravia|manual-jihlava-diagonal','M454.190,347.170L465.084,336.759']
]);
const sharedCellEdges=cells=>{const edges=new Map();for(const {c,poly} of cells){for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ak=a[0].toFixed(5)+','+a[1].toFixed(5),bk=b[0].toFixed(5)+','+b[1].toFixed(5),key=ak<bk?ak+'|'+bk:bk+'|'+ak;let e=edges.get(key);if(!e){e={a,b,cities:[]};edges.set(key,e);}e.cities.push(c.id);}}return [...edges.values()].filter(e=>e.cities.length===2);};
const segmentIntersectionT=(a,b,c,d)=>{const rx=b[0]-a[0],ry=b[1]-a[1],sx=d[0]-c[0],sy=d[1]-c[1],den=rx*sy-ry*sx;if(Math.abs(den)<1e-9)return null;const qx=c[0]-a[0],qy=c[1]-a[1],t=(qx*sy-qy*sx)/den,u=(qx*ry-qy*rx)/den;return t>-1e-7&&t<1+1e-7&&u>-1e-7&&u<1+1e-7?Math.max(0,Math.min(1,t)):null;};
const pointInCompound=(p,polys)=>{let inside=false;for(const poly of polys)if(pointInPolygon(p,poly))inside=!inside;return inside;};
const segmentVisibleFragments=(a,b,realmPolys,blockerGroups=[])=>{const ts=[0,1],addHits=polys=>{for(const poly of polys)for(let i=0;i<poly.length;i++){const t=segmentIntersectionT(a,b,poly[i],poly[(i+1)%poly.length]);if(t!==null)ts.push(t);}};addHits(realmPolys);for(const polys of blockerGroups)addHits(polys);ts.sort((x,y)=>x-y);const uniq=[];for(const t of ts)if(!uniq.length||Math.abs(t-uniq[uniq.length-1])>1e-5)uniq.push(t);const at=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],out=[];for(let i=0;i+1<uniq.length;i++){const t0=uniq[i],t1=uniq[i+1];if(t1-t0<1e-6)continue;const mid=at((t0+t1)/2),blocked=blockerGroups.some(polys=>pointInCompound(mid,polys));if(pointInCompound(mid,realmPolys)&&!blocked)out.push({a:at(t0),b:at(t1),startBoundary:t0>1e-5,endBoundary:t1<1-1e-5});}return out;};
const mergeNearbyFragments=(frags,maxGap=.35)=>{const out=[];for(const frag of frags){const prev=out[out.length-1];if(prev&&Math.hypot(frag.a[0]-prev.b[0],frag.a[1]-prev.b[1])<=maxGap){prev.b=frag.b;prev.endBoundary=frag.endBoundary;}else out.push({a:[...frag.a],b:[...frag.b],startBoundary:frag.startBoundary,endBoundary:frag.endBoundary});}return out;};
const trimRealmFragment=frag=>{const a=[...frag.a],b=[...frag.b];return Math.hypot(b[0]-a[0],b[1]-a[1])<.45?null:{a,b};};

const CITY_TERRITORY_POINT_OVERRIDES=new Map([
 ['Kingdom of Naples|1300-laquila',[463.000,425.000]],
 ['Kingdom of Naples|1300-salerno',[453.000,472.000]],
 ['Kingdom of Naples|1300-split',[505.000,405.000]]
]);
const cityTerritoryPoint=(realm,c)=>CITY_TERRITORY_POINT_OVERRIDES.get(realm+'|'+c.id)||pos(c.mapLon??c.lon,c.mapLat??c.lat);

const IBERIA_LABEL_ANGLES={
 '1300-santiago':-7,'1300-leon':-5,'1300-burgos':4,'1300-valladolid':0,'1300-salamanca':-3,'1300-zamora':-7,'1300-segovia':5,'1300-avila':-8,
 '1300-plasencia':-9,'1300-badajoz':-11,'1300-toledo':3,'1300-cuenca':10,'1300-guadalajara':5,'1300-cordoba':-5,
 '1300-seville':0,'1300-jaen':5,'1300-braga':-8,'1300-guimaraes':-10,'1300-porto':0,'1300-coimbra':0,'1300-santarem':-7,
 '1300-lisbon':0,'1300-evora':5,'1300-silves':0,'1300-pamplona':0,'1300-andorra-la-vella':0,'1300-perpignan':-8,'1300-huesca':0,'1300-zaragoza':0,'1300-girona':-22,
 '1300-barcelona':-22,'1300-tarragona':-16,'1300-valencia':0,'1300-alicante':-18,'1300-murcia':7,'1300-granada':0,
 '1300-malaga':-6,'1300-almeria':-14,'1300-porto':-10
};
const colorForRealm=name=>{
 let h=7;
 for(const c of String(name))h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;
 return palettes[h%palettes.length];
};
const mixHex=(from,to,amount)=>{
 const a=String(from).replace('#',''),b=String(to).replace('#',''),mix=(i)=>Math.round(parseInt(a.slice(i,i+2),16)*(1-amount)+parseInt(b.slice(i,i+2),16)*amount).toString(16).padStart(2,'0');
 return '#'+mix(0)+mix(2)+mix(4);
};
// Keep Castile exactly as the visual reference the user approved.
// Other realms get the same subtle city-border contrast relative to their own fill,
// so the lines cannot disappear into blue/green/purple country colors.
const cityBorderColor=realm=>'#7a8781';
const cityBorderOpacity=realm=>'.30';
const cache={};
let physicalLandCache;
export class WorldMap{
 constructor(host,state,onSelect,onRegion,onArmySelect=null,onArmyMove=null){
  this.host=host;this.state=state;this.onSelect=onSelect;this.onRegion=onRegion;this.onArmySelect=onArmySelect;this.onArmyMove=onArmyMove;this.armyPointer=null;this.mode='historical';this.view={x:100,y:220,w:750,h:600};this.pointers=new Map();this.destroyed=false;this.drawn=false;this.coastMarkerCache=new Map();this.physicalLandPolys=[];this.deferredRefreshTimer=null;this.interactionRefreshDelay=90;
  host.innerHTML=`<svg id="world-map" role="img" aria-label="Political map of Europe around 1300 CE. Drag to pan, scroll or pinch to zoom. In detailed regions, left click a city territory and right click a country." tabindex="0"><defs><pattern id="ocean-grid" width="120" height="150" patternUnits="userSpaceOnUse"><path d="M120 0H0V150" fill="none" stroke="#d6e0c7" stroke-opacity=".06" stroke-width=".7"/></pattern><linearGradient id="soldier-body-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8c28c"/><stop offset=".45" stop-color="#8d7755"/><stop offset="1" stop-color="#44392d"/></linearGradient><linearGradient id="soldier-metal-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5e2ce"/><stop offset=".48" stop-color="#8d948b"/><stop offset="1" stop-color="#343d3a"/></linearGradient><linearGradient id="ship-wood-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bd8a4f"/><stop offset=".52" stop-color="#78502f"/><stop offset="1" stop-color="#3e2b20"/></linearGradient><linearGradient id="ship-sail-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1e5bd"/><stop offset=".6" stop-color="#baa879"/><stop offset="1" stop-color="#75694c"/></linearGradient><marker id="army-route-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d6bd72"/></marker><filter id="military-shadow" x="-70%" y="-70%" width="240%" height="240%"><feDropShadow dx="1.5" dy="2.2" stdDeviation="1.6" flood-color="#07110e" flood-opacity=".7"/></filter></defs><rect x="-5000" y="-5000" width="15000" height="15000" fill="#192c32"/><rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#ocean-grid)"/><g id="land"></g><g id="city-territories"></g><g id="sea-labels"></g><g id="realm-labels"></g><g id="city-territory-labels"></g><g id="cities"></g><g id="army-movement-routes"></g><g id="military-markers"></g></svg><div class="map-top"><div class="map-heading"><span class="eyebrow">EUROPE & ANATOLIA</span><span>${CITIES.length} researched city cards · political map c. 1300 CE</span></div><div class="map-era-badge">REALMS · c. 1300 CE</div></div><div class="map-bottom"><span class="map-hint">Drag to explore · click army for details · right-click or drag army to move</span><span id="map-attribution" class="map-attribution">Approximate 1300 borders · Historical Basemaps · Natural Earth coastline</span><span class="map-key"><i></i> Researched 1300 city card</span></div><div class="map-controls"><button data-map="in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button><button data-map="out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button><button data-map="selected" title="Focus selected city" aria-label="Focus selected city">${icon('target')}</button><button data-map="all" title="Show map overview" aria-label="Show map overview">${icon('globe')}</button></div><div class="map-compass" aria-hidden="true"><span>N</span><i></i></div><div class="map-loading">Unfolding the atlas…</div>`;
  this.svg=host.querySelector('svg');this.abort=new AbortController();const opts={signal:this.abort.signal};
  this.svg.addEventListener('wheel',e=>{e.preventDefault();const r=this.svg.getBoundingClientRect();this.zoom(Math.exp(e.deltaY*.0013),(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height,true);},{...opts,passive:false});this.svg.addEventListener('mousedown',e=>{if(e.button===1)e.preventDefault();},{...opts,passive:false});/* middle mouse is intentionally disabled */
  this.svg.addEventListener('pointerdown',e=>{if(e.button!==0){if(e.button===1)e.preventDefault();return;}const army=e.target.closest?.('.army-map-marker[data-unit-city]');this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragStart={x:e.clientX,y:e.clientY};this.dragged=false;if(army&&this.onArmySelect){this.armyPointer={pointerId:e.pointerId,cityId:army.dataset.unitCity};e.preventDefault();}this.svg.setPointerCapture(e.pointerId);},opts);
  this.svg.addEventListener('pointermove',e=>{if(!this.pointers.has(e.pointerId))return;const old=this.pointers.get(e.pointerId),next={x:e.clientX,y:e.clientY};
   if(this.armyPointer?.pointerId===e.pointerId){if(Math.hypot(next.x-this.dragStart.x,next.y-this.dragStart.y)>5)this.dragged=true;this.pointers.set(e.pointerId,next);return;}
   if(this.pointers.size===2){const other=[...this.pointers.entries()].find(([id])=>id!==e.pointerId)[1],before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(next.x-other.x,next.y-other.y),r=this.svg.getBoundingClientRect();if(after)this.zoom(before/after,((next.x+other.x)/2-r.left)/r.width,((next.y+other.y)/2-r.top)/r.height,true);this.dragged=true;}
   else{const r=this.svg.getBoundingClientRect();this.view.x-=(next.x-old.x)*this.view.w/r.width;this.view.y-=(next.y-old.y)*this.view.h/r.height;if(Math.hypot(next.x-this.dragStart.x,next.y-this.dragStart.y)>5)this.dragged=true;this.update(true);}this.pointers.set(e.pointerId,next);
  },opts);
  const release=e=>{const tracked=this.pointers.has(e.pointerId),armyDrag=this.armyPointer?.pointerId===e.pointerId,source=this.armyPointer?.cityId;this.pointers.delete(e.pointerId);if(this.svg.hasPointerCapture(e.pointerId))this.svg.releasePointerCapture(e.pointerId);
   if(armyDrag){if(e.type==='pointerup'){if(this.dragged){const targetCity=this.cityAtClientPoint(e.clientX,e.clientY);if(targetCity&&targetCity!==source&&this.onArmyMove)this.onArmyMove(source,targetCity);else if(this.onArmySelect)this.onArmySelect(source,'click');}else if(this.onArmySelect)this.onArmySelect(source,'click');}this.armyPointer=null;this.dragged=false;this.flushRefresh();return;}
   if(tracked&&this.dragged&&!this.pointers.size)this.flushRefresh();if(e.type==='pointerup'&&tracked&&!this.dragged){const target=document.elementFromPoint(e.clientX,e.clientY);if(target)this.pick(target,'primary',e);}};
  this.svg.addEventListener('pointerup',release,opts);this.svg.addEventListener('pointercancel',release,opts);this.svg.addEventListener('auxclick',e=>{if(e.button===1)e.preventDefault();},{...opts,passive:false});this.svg.addEventListener('contextmenu',e=>{const army=e.target.closest?.('.army-map-marker[data-unit-city]');if(army&&this.onArmySelect){e.preventDefault();this.onArmySelect(army.dataset.unitCity,'context');return;}e.preventDefault();this.pick(e.target,'country',e);},opts);this.svg.addEventListener('pointerover',e=>{const t=e.target.closest?.('.territory[data-realm]');if(!t)return;const realm=t.dataset.realm;this.svg.querySelectorAll('.territory.realm-hover').forEach(n=>n.classList.remove('realm-hover'));this.svg.querySelectorAll('.territory[data-realm="'+CSS.escape(realm)+'"]').forEach(n=>n.classList.add('realm-hover'));},opts);this.svg.addEventListener('pointerout',e=>{const from=e.target.closest?.('.territory[data-realm]');if(!from)return;const to=e.relatedTarget?.closest?.('.territory[data-realm]');if(to&&to.dataset.realm===from.dataset.realm)return;this.svg.querySelectorAll('.territory.realm-hover').forEach(n=>n.classList.remove('realm-hover'));},opts);
  this.svg.addEventListener('keydown',e=>{if(['+','=','-'].includes(e.key)){e.preventDefault();this.zoom(e.key==='-'?1.25:.8);}else if(e.key.startsWith('Arrow')){e.preventDefault();const d=this.view.w*.08;if(e.key==='ArrowLeft')this.view.x-=d;if(e.key==='ArrowRight')this.view.x+=d;if(e.key==='ArrowUp')this.view.y-=d;if(e.key==='ArrowDown')this.view.y+=d;this.update();}},opts);
  host.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;const a=b.dataset.map;if(a==='in')this.zoom(.75);if(a==='out')this.zoom(1.3);if(a==='selected')this.focus(state.selected);if(a==='all')this.fit();if(['modern','historical'].includes(a)&&this.mode!==a){this.mode=a;host.querySelectorAll('.map-modes button').forEach(b=>b.classList.toggle('active',b.dataset.map===a));this.load(false);}},opts);
  this.resize=new ResizeObserver(()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;const cy=this.view.y+this.view.h/2,overview=this.overviewWidth&&Math.abs(this.view.w-this.overviewWidth)<1;if(overview){this.fit();return;}this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*r.width/r.height);this.view.h=this.view.w*r.height/r.width;this.view.y=cy-this.view.h/2;this.update();});this.resize.observe(host);this.load(true);
 }
 async load(fit){
  const mode=this.mode;
  try{cache[mode]??=fetch(mode==='modern'?'assets/modern-atlas.json?v=20260920-aquileia-venice-coast-fix-v1':'assets/atlas.json?v=20260920-merge-frankfurt-into-mainz-v1').then(r=>{if(!r.ok)throw new Error('Missing atlas');return r.json();});physicalLandCache??=fetch('assets/map-land.json?v=20260920-aquileia-venice-coast-fix-v1').then(r=>r.ok?r.json():{d:''}).catch(()=>({d:''}));const [atlas,physicalLand]=await Promise.all([cache[mode],physicalLandCache]);this.physicalLandPolys=svgSubpaths(physicalLand.d).map(svgSubpathPoints).filter(p=>p.length>=3);this.coastMarkerCache.clear();this.realmInfo=new Map(atlas.map(f=>[realmOf(f),f]));if(this.destroyed||this.mode!==mode)return;
   const atlasRealms=new Set(atlas.filter(f=>!f.outline&&!f.underlay).map(realmOf));
   this.cityTerritoryRealms=new Set([...CITY_TERRITORY_REALMS].filter(realm=>atlasRealms.has(realm)));
   const territoryMarkup=atlas.filter(f=>!f.outline).map((f,i,arr)=>{const realm=realmOf(f),mainIndex=arr.findIndex(g=>!g.underlay&&realmOf(g)===realm),fill=(mode==='historical'?colorForRealm(realm):palettes[((f.underlay&&mainIndex>=0)?mainIndex:i)%palettes.length]),outline=f.underlay?'':withoutIslandStroke(f.d),cleaned=!f.underlay&&outline!==f.d,stroke=f.underlay||cleaned?'none':'#28372e',sw=f.underlay||cleaned?'0':'.85',base=`<path class="territory ${f.detail?'detail-polity':''} ${this.cityTerritoryRealms.has(realm)?'city-region-realm':''} ${IBERIA_REALMS.has(realm)?'iberia-realm':''} ${f.underlay?'territory-underlay':''}" data-realm="${esc(realm)}" data-detail="${f.detail?'1':'0'}" d="${f.d}" fill="${fill}" fill-rule="evenodd" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" vector-effect="non-scaling-stroke"><title>${esc(f.name||'Local communities')}</title></path>`;if(!cleaned)return base;return base+(outline?`<path d="${outline}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'');}).join('');
   const cleanIslandCoast=islandLandOutline(physicalLand.d),cleanIslandBorders=sharedIslandBorders(atlas),realmSeamCovers=sameRealmSeamCovers(atlas,mode);
   this.svg.querySelector('#land').innerHTML=territoryMarkup+(cleanIslandCoast?`<path d="${cleanIslandCoast}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'')+(cleanIslandBorders?`<path d="${cleanIslandBorders}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'')+realmSeamCovers;
   this.buildCityTerritories(atlas);
   const rawLabels=[...historicalLabels.map(([name,x,y,level=1])=>({name,x,y,level,kind:level===1?'major':'polity',realm:HISTORICAL_LABEL_REALMS.get(name)||''})),...atlas.filter(f=>f.label).map(f=>({name:f.label,x:f.lx,y:f.ly,level:f.labelLevel||2,kind:f.outline?'umbrella':'polity',realm:f.outline?'':realmOf(f)}))],seenLabels=new Set(),labels=rawLabels.filter(l=>{const key=(l.realm||'')+'|'+l.name;if(seenLabels.has(key))return false;seenLabels.add(key);return true;});
   this.svg.querySelector('#realm-labels').innerHTML=labels.map(({name,x,y,level,kind,realm})=>{const fallback=pos(x,y),metric=realm?realmLabelMetrics(atlas,realm,fallback):{center:fallback,clearance:0},p=metric.center;return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" data-level="${level}" data-kind="${kind}" data-realm-label="${esc(realm)}" data-base-x="${p[0]}" data-base-y="${p[1]}" data-safe-radius="${metric.clearance.toFixed(3)}" class="realm-label">${esc(name)}</text>`;}).join('');
   this.realmLabels=[...this.svg.querySelectorAll('.realm-label')].sort((a,b)=>{const au=a.dataset.kind==='umbrella'?1:0,bu=b.dataset.kind==='umbrella'?1:0;return au-bu||+(a.dataset.level)-+(b.dataset.level);});
   this.svg.querySelector('#sea-labels').innerHTML=[['MEDITERRANEAN SEA',14,35],['BLACK SEA',34,43],['ATLANTIC OCEAN',-14,44],['NORTH SEA',3,56]].map(([name,x,y])=>{const p=pos(x,y);return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" class="sea-label">${name}</text>`;}).join('');
   this.host.querySelector('#map-attribution').textContent='Approximate 1300 borders · Historical Basemaps · Natural Earth coastline';this.host.querySelector('.map-loading')?.remove();if(fit&&this.focusRequest)this.focus(this.focusRequest);else if(fit)this.fit();else this.update();
  }catch{delete cache[mode];const el=this.host.querySelector('.map-loading');if(el)el.textContent='Map could not load. Reload to try again.';}
 }
 pick(target,intent='primary',event=null){
  const c=target.closest?.('[data-city]');
  const r=target.closest?.('[data-realm]');
  if(intent==='country'){
   const realm=r?.dataset.realm||c?.dataset.realm;
   if(realm&&this.onRegion)this.onRegion({name:displayRealmName(realm),realm,detail:r?.dataset.detail==='1',mode:'historical',gameplayNote:this.realmInfo?.get(realm)?.gameplayNote});
   return;
  }
  if(c){if(this.state?.game?.fogOfWar&&c.classList.contains('game-hidden'))return;this.onSelect(c.dataset.city);return;}
  if(r){
   const realm=r.dataset.realm;
   if(this.cityTerritoryRealms?.has(realm)&&event){
    const city=this.nearestCityInRealm(realm,event.clientX,event.clientY);
    if(city){this.onSelect(city.id);return;}
   }
   if(this.onRegion)this.onRegion({name:displayRealmName(realm),realm,detail:r.dataset.detail==='1',mode:'historical',gameplayNote:this.realmInfo?.get(realm)?.gameplayNote});
  }
 }
 cityAtClientPoint(clientX,clientY){
  const stack=document.elementsFromPoint?document.elementsFromPoint(clientX,clientY):[];for(const el of stack){if(el.closest?.('.army-map-marker'))continue;const cityEl=el.closest?.('[data-city]');if(cityEl?.dataset.city&&!cityEl.classList.contains('game-hidden'))return cityEl.dataset.city;}
  for(const el of stack){const realmEl=el.closest?.('.territory[data-realm]');if(!realmEl)continue;const city=this.nearestCityInRealm(realmEl.dataset.realm,clientX,clientY);if(city)return city.id;}return null;
 }
 mapPoint(clientX,clientY){const r=this.svg.getBoundingClientRect();return {x:this.view.x+(clientX-r.left)/Math.max(1,r.width)*this.view.w,y:this.view.y+(clientY-r.top)/Math.max(1,r.height)*this.view.h};}
 nearestCityInRealm(realm,clientX,clientY){
  const p=this.mapPoint(clientX,clientY),cities=CITIES.filter(c=>cityRealm(c)===realm);
  let best=null,bestD=Infinity;
  for(const c of cities){const q=this.cityCenters?.get(c.id)||cityTerritoryPoint(realm,c),dx=q[0]-p.x,dy=q[1]-p.y,d=dx*dx+dy*dy;if(d<bestD){bestD=d;best=c;}}
  return best;
 }
 buildCityTerritories(atlas){
  const defs=this.svg.querySelector('defs'),territoryLayer=this.svg.querySelector('#city-territories'),labelLayer=this.svg.querySelector('#city-territory-labels');
  defs.querySelectorAll('.city-territory-dynamic,.iberia-dynamic').forEach(n=>n.remove());territoryLayer.innerHTML='';labelLayer.innerHTML='';this.cityTerritoryLabels=[];this.cityAdjacency=new Map();this.cityCenters=new Map();this.cityUnitAnchors=new Map();this.cityCellGeometry=new Map();this.cityRealmGeometry=new Map();
  for(const realm of this.cityTerritoryRealms||[]){
   const features=atlas.filter(f=>!f.outline&&!f.underlay&&realmOf(f)===realm);if(!features.length)continue;
   const realmD=features.map(f=>f.d).join(''),realmPolys=svgSubpaths(realmD).map(svgSubpathPoints).filter(p=>p.length>=3);if(!realmPolys.length)continue;
   const cities=CITIES.filter(c=>cityRealm(c)===realm),points=cities.map(c=>cityTerritoryPoint(realm,c));if(!cities.length)continue;
   cities.forEach((c,i)=>{this.cityCenters.set(c.id,points[i]);if(!this.cityAdjacency.has(c.id))this.cityAdjacency.set(c.id,new Set());});
   const geometryPts=realmPolys.flat(),geometryXs=geometryPts.map(p=>p[0]),geometryYs=geometryPts.map(p=>p[1]);
   this.cityRealmGeometry.set(realm,{realm,polys:realmPolys,cities,points,bbox:{x:Math.min(...geometryXs),y:Math.min(...geometryYs),w:Math.max(...geometryXs)-Math.min(...geometryXs),h:Math.max(...geometryYs)-Math.min(...geometryYs)}});
   const allPts=realmPolys.flat(),xs=allPts.map(p=>p[0]),ys=allPts.map(p=>p[1]),pad=4;
   let box={x:Math.min(...xs)-pad,y:Math.min(...ys)-pad,w:Math.max(...xs)-Math.min(...xs)+pad*2,h:Math.max(...ys)-Math.min(...ys)+pad*2};
   if(realm==='Kingdom of England'){
    const px=points.map(p=>p[0]),py=points.map(p=>p[1]),scopePad=14;
    box={x:Math.min(...px)-scopePad,y:Math.min(...py)-scopePad,w:Math.max(...px)-Math.min(...px)+scopePad*2,h:Math.max(...py)-Math.min(...py)+scopePad*2};
   }
   const realmClip='city-realm-'+realm.toLowerCase().replace(/[^a-z0-9]+/g,'-');
   defs.insertAdjacentHTML('beforeend',`<clipPath class="city-territory-dynamic" id="${realmClip}"><path d="${realmD}" fill-rule="evenodd"/></clipPath>`);
   const componentClips=realmPolys.map((poly,i)=>{const id=realmClip+'-component-'+i;defs.insertAdjacentHTML('beforeend',`<clipPath class="city-territory-dynamic" id="${id}"><path d="${polygonPath(poly)}"/></clipPath>`);return id;});
   const componentForPoint=p=>{for(let i=0;i<realmPolys.length;i++)if(pointInPolygon(p,realmPolys[i]))return i;return -1;};
   const components=points.map(componentForPoint);
   const cells=cities.map((c,i)=>{const poly=voronoiCell(points[i],points,box),component=components[i],metricPolys=component>=0?[realmPolys[component]]:realmPolys,metrics=visibleCellMetrics(poly,metricPolys,points[i]);return {c,poly,component,cellBox:metrics.box,labelPoint:metrics.center,metrics};});
   const paths=cells.map(({c,poly,component})=>{const componentClip=component>=0?componentClips[component]:realmClip;return `<path class="city-territory-cell" data-city="${c.id}" data-realm="${esc(realm)}" clip-path="url(#${componentClip})" d="${polygonPath(poly)}"><title>${esc(displayCityName(c))} · ${esc(displayRealmName(realm))}</title></path>`;}).join('');
   const blockerGroups=atlas.filter(f=>!f.outline&&!f.underlay&&realmOf(f)!==realm).map(f=>svgSubpaths(f.d).map(svgSubpathPoints).filter(p=>p.length>=3)).filter(polys=>polys.length);
   const componentByCity=new Map(cells.map(x=>[x.c.id,x.component])),cellEdges=sharedCellEdges(cells);
   let borderPaths='';
   for(const edge of cellEdges){
    const ca=componentByCity.get(edge.cities[0]),cb=componentByCity.get(edge.cities[1]);
    // Different islands / disconnected land pieces are never neighbours.
    if(ca>=0&&cb>=0&&ca!==cb)continue;
    const visiblePolys=ca>=0?[realmPolys[ca]]:realmPolys;
    const frags=mergeNearbyFragments(segmentVisibleFragments(edge.a,edge.b,visiblePolys,blockerGroups)).map(trimRealmFragment).filter(Boolean);
    // This is the single source of truth: a real visible shared boundary means adjacency.
    if(frags.length){
     const [a,b]=edge.cities;this.cityAdjacency.get(a)?.add(b);this.cityAdjacency.get(b)?.add(a);
    }
    const key=cityBorderKey(realm,edge.cities[0],edge.cities[1]);if(CITY_BORDER_SKIP.has(key)||CITY_BORDER_MANUAL.has(key))continue;
    borderPaths+=frags.map(f=>`<path class="city-territory-border" d="M${f.a[0].toFixed(3)},${f.a[1].toFixed(3)}L${f.b[0].toFixed(3)},${f.b[1].toFixed(3)}"/>`).join('');
   }
   for(const [key,d] of CITY_BORDER_MANUAL)if(key.startsWith(realm+'|'))borderPaths+=`<path class="city-territory-border city-territory-border-manual" d="${d}"/>`;
   territoryLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${realmClip})" style="--city-border:${cityBorderColor(realm)};--city-border-opacity:${cityBorderOpacity(realm)}">${paths}${borderPaths}</g>`);
   for(const {c,poly,component,cellBox,labelPoint,metrics} of cells){
    const cellClip='city-cell-'+c.id.replace(/[^a-z0-9-]/gi,'-'),componentClip=component>=0?componentClips[component]:realmClip;
    this.cityUnitAnchors.set(c.id,{point:labelPoint,clearance:metrics.clearance,cellClip,componentClip});this.cityCellGeometry.set(c.id,{poly,componentPoly:component>=0?realmPolys[component]:null,realmPolys});
    defs.insertAdjacentHTML('beforeend',`<clipPath class="city-territory-dynamic" id="${cellClip}"><path d="${polygonPath(poly)}"/></clipPath>`);
    const angle=IBERIA_LABEL_ANGLES[c.id]||0;
    labelLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${componentClip})"><g clip-path="url(#${cellClip})"><text x="${labelPoint[0]}" y="${labelPoint[1]}" text-anchor="middle" dominant-baseline="central" transform="rotate(${angle} ${labelPoint[0]} ${labelPoint[1]})" class="city-area-label" data-city-label="${c.id}" data-cell-w="${cellBox.w}" data-cell-h="${cellBox.h}" data-safe-radius="${metrics.clearance.toFixed(3)}">${esc(displayCityName(c))}</text></g></g>`);
   }
  }
  // Across different realms, adjacency is derived from the ACTUAL drawn political border.
  // We sample each realm-boundary segment on both sides. A foreign realm only counts when
  // the sample truly crosses from realm A into realm B. Merely being geographically close,
  // or touching at one corner, is not enough.
  const realmEntries=[...this.cityRealmGeometry.entries()],
        inGeom=(g,p)=>p[0]>=g.bbox.x-.6&&p[0]<=g.bbox.x+g.bbox.w+.6&&p[1]>=g.bbox.y-.6&&p[1]<=g.bbox.y+g.bbox.h+.6&&pointInCompound(p,g.polys),
        nearestCity=(g,p)=>{let best=null,bestD=Infinity;for(let i=0;i<g.cities.length;i++){const q=g.points[i],dx=p[0]-q[0],dy=p[1]-q[1],d=dx*dx+dy*dy;if(d<bestD){bestD=d;best=g.cities[i];}}return best;},
        foreignAcross=(outside,inside,except)=>{let best=null,bestD=Infinity;for(const [r,g] of realmEntries){if(r===except||!inGeom(g,outside)||inGeom(g,inside))continue;const c=nearestCity(g,outside),q=c&&this.cityCenters.get(c.id);if(!q)continue;const dx=outside[0]-q[0],dy=outside[1]-q[1],d=dx*dx+dy*dy;if(d<bestD){bestD=d;best={realm:r,geom:g,city:c};}}return best;},
        addNeighbour=(a,b)=>{if(!a||!b||a===b)return;this.cityAdjacency.get(a)?.add(b);this.cityAdjacency.get(b)?.add(a);};
  for(const [realm,g] of realmEntries){
   for(const poly of g.polys)for(let i=0;i<poly.length;i++){
    const a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len<.08)continue;
    const nx=-dy/len,ny=dx/len,samples=len>10?3:len>4?2:1;
    for(let s=0;s<samples;s++){
     const t=(s+.5)/samples,mid=[a[0]+dx*t,a[1]+dy*t];let linked=false;
     for(const eps of [.06,.12,.22,.38]){
      const plus=[mid[0]+nx*eps,mid[1]+ny*eps],minus=[mid[0]-nx*eps,mid[1]-ny*eps],
            plusIn=inGeom(g,plus),minusIn=inGeom(g,minus);
      if(plusIn===minusIn)continue;
      const inside=plusIn?plus:minus,outside=plusIn?minus:plus,other=foreignAcross(outside,inside,realm);
      if(!other)continue;
      const ca=nearestCity(g,inside),cb=other.city;
      if(ca&&cb){addNeighbour(ca.id,cb.id);linked=true;break;}
     }
     if(linked)continue;
    }
   }
  }
  this.cityTerritoryLabels=[...labelLayer.querySelectorAll('.city-area-label')];
 }
 coastMarkerForCity(c){
  if(this.coastMarkerCache.has(c.id))return this.coastMarkerCache.get(c.id);
  const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),hit=nearestCoastEdge(p,this.physicalLandPolys);
  if(!hit||hit.distance>18){this.coastMarkerCache.set(c.id,null);return null;}
  const a=hit.a,b=hit.b,dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1,n=[-dy/len,dx/len],q=hit.point;
  let candidates=[[q[0]+n[0]*3.2,q[1]+n[1]*3.2],[q[0]-n[0]*3.2,q[1]-n[1]*3.2]];
  let sea=candidates.find(x=>!pointInCompound(x,this.physicalLandPolys));
  if(!sea){candidates=[[q[0]+n[0]*5.5,q[1]+n[1]*5.5],[q[0]-n[0]*5.5,q[1]-n[1]*5.5]];sea=candidates.find(x=>!pointInCompound(x,this.physicalLandPolys));}
  const result=sea||q;this.coastMarkerCache.set(c.id,result);return result;
 }
 neighboursOf(cityId){return [...(this.cityAdjacency?.get(cityId)||[])];}
 zoom(f,fx=.5,fy=.5,deferRefresh=false){const w=Math.max(28,Math.min(this.overviewWidth||900,this.view.w*f)),r=w/this.view.w;this.view.x+=this.view.w*fx*(1-r);this.view.y+=this.view.h*fy*(1-r);this.view.w=w;this.view.h*=r;this.update(deferRefresh);}
 focus(id){this.focusRequest=id;const c=CITY[id];if(!c)return;const p=this.cityCenters?.get(id)||cityTerritoryPoint(cityRealm(c),c),r=this.host.getBoundingClientRect();this.view.w=310;this.view.h=310*r.height/Math.max(1,r.width);this.view.x=p[0]-this.view.w/2;this.view.y=p[1]-this.view.h/2;this.update();}
 fit(){this.focusRequest=null;const r=this.host.getBoundingClientRect(),aspect=r.width/Math.max(1,r.height);this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*aspect);this.view.w=this.overviewWidth;this.view.h=this.view.w/aspect;this.view.x=bounds.x+(bounds.w-this.view.w)/2;this.view.y=bounds.y+(bounds.h-this.view.h)/2;this.update();}
 applyViewBox(){if(!this.svg)return;const v=this.view;
  v.x=v.w>=bounds.w?bounds.x+(bounds.w-v.w)/2:Math.max(bounds.x,Math.min(bounds.x+bounds.w-v.w,v.x));
  v.y=v.h>=bounds.h?bounds.y+(bounds.h-v.h)/2:Math.max(bounds.y,Math.min(bounds.y+bounds.h-v.h,v.y));
  this.svg.setAttribute('viewBox',`${v.x} ${v.y} ${v.w} ${v.h}`);
 }
 updateBorderZoomStyle(){if(!this.svg)return;const width=this.host.clientWidth||1000,unit=this.view.w/width,cityBorderZoom=Math.max(0,Math.min(1,(.42-unit)/.34)),cityBorderZoomColor=mixHex('#7a8781','#4d5954',cityBorderZoom);
  this.svg.style.setProperty('--city-border-zoom-color',cityBorderZoomColor);
  this.svg.style.setProperty('--city-border-zoom-opacity',(.30+cityBorderZoom*.30).toFixed(3));
  this.svg.style.setProperty('--city-border-zoom-width',(.90+cityBorderZoom*.28).toFixed(3));
 }
 scheduleRefresh(delay=this.interactionRefreshDelay||90){if(this.destroyed)return;this.cancelScheduledRefresh();this.deferredRefreshTimer=setTimeout(()=>{this.deferredRefreshTimer=null;if(!this.destroyed)this.refresh();},delay);}
 cancelScheduledRefresh(){if(this.deferredRefreshTimer!==null){clearTimeout(this.deferredRefreshTimer);this.deferredRefreshTimer=null;}}
 flushRefresh(){if(this.destroyed)return;this.cancelScheduledRefresh();this.refresh();}
 update(deferRefresh=false){if(!this.svg)return;this.applyViewBox();this.updateBorderZoomStyle();if(deferRefresh){this.scheduleRefresh();return;}this.cancelScheduledRefresh();this.refresh();}
 refresh(){if(!this.svg)return;this.cancelScheduledRefresh();const width=this.host.clientWidth||1000,height=this.host.clientHeight||600,unit=this.view.w/width,s=this.state,occupied=[];
  this.updateBorderZoomStyle();
  const screen=(x,y)=>({x:(x-this.view.x)/unit,y:(y-this.view.y)/unit});
  const showCityAreas=unit<.082,game=s.game||null,ownedCities=new Set(game?.ownedCityIds||[]),visibleCities=new Set(ownedCities),fogDetail=!!game?.fogOfWar&&showCityAreas;
  if(game?.fogOfWar)for(const id of ownedCities)for(const neighbour of this.cityAdjacency?.get(id)||[])visibleCities.add(neighbour);
  this.svg.style.setProperty('--player-realm-color',game?.playerColor||'#c6534d');
  for(const cell of this.svg.querySelectorAll('.city-territory-cell')){
   const id=cell.dataset.city,isOwned=ownedCities.has(id),isVisible=visibleCities.has(id);
   cell.classList.toggle('game-owned',!!game&&isOwned);
   cell.classList.toggle('game-visible',!!game&&!isOwned&&isVisible);
   cell.classList.toggle('game-hidden',!!game&&fogDetail&&!isOwned&&!isVisible);cell.classList.toggle('game-battle',!!game?.battlesByCity?.[id]);cell.classList.toggle('game-siege',!!game?.siegesByCity?.[id]);cell.classList.toggle('game-occupied',!!game?.occupations?.[id]);
  }
  // Country / polity names follow the territory that realm still owns.
  // When a realm loses a city, its name is re-centered over its remaining city cells.
  for(const t of this.realmLabels||[]){
   const realm=t.dataset.realmLabel;
   t.dataset.realmGone='0';delete t.dataset.dynamicSafeRadius;
   if(game&&realm&&this.cityTerritoryRealms?.has(realm)){
    const remaining=CITIES.filter(c=>cityRealm(c)===realm&&ownerRealmForCity(game,c)===realm);
    if(!remaining.length)t.dataset.realmGone='1';
    else{
     let sx=0,sy=0,sw=0;
     for(const c of remaining){const a=this.cityUnitAnchors?.get(c.id);if(!a)continue;const w=Math.max(.3,(Number(a.clearance)||1)**2);sx+=a.point[0]*w;sy+=a.point[1]*w;sw+=w;}
     if(sw>0){
      const target=[sx/sw,sy/sw],inside=c=>{const g=this.cityCellGeometry?.get(c.id);if(!g||!pointInPolygon(target,g.poly))return false;return g.componentPoly?pointInPolygon(target,g.componentPoly):g.realmPolys.some(p=>pointInPolygon(target,p));};
      let point=remaining.some(inside)?target:null;
      if(!point){let best=null,bd=Infinity;for(const c of remaining){const a=this.cityUnitAnchors?.get(c.id);if(!a)continue;const d=(a.point[0]-target[0])**2+(a.point[1]-target[1])**2;if(d<bd){bd=d;best=a;}}point=best?.point||target;}
      const nearest=remaining.map(c=>this.cityUnitAnchors?.get(c.id)).filter(Boolean).sort((a,b)=>(a.point[0]-point[0])**2+(a.point[1]-point[1])**2-(b.point[0]-point[0])**2-(b.point[1]-point[1])**2)[0];
      t.setAttribute('x',point[0]);t.setAttribute('y',point[1]);t.dataset.dynamicSafeRadius=String(Math.max(.7,(Number(nearest?.clearance)||1)*1.25));
     }
    }
   }else{const bx=Number(t.dataset.baseX),by=Number(t.dataset.baseY);if(Number.isFinite(bx))t.setAttribute('x',bx);if(Number.isFinite(by))t.setAttribute('y',by);}
  }
  // Labels shrink before crossing borders, and lower-priority labels wait if another label occupies the same screen space.
  for(const t of this.realmLabels||[]){
   const level=+(t.dataset.level||1),umbrella=t.dataset.kind==='umbrella',safe=+(t.dataset.dynamicSafeRadius||t.dataset.safeRadius||0),realmGone=t.dataset.realmGone==='1';
   const eligible=level===1||(level===2&&unit<.48)||(level>=3&&unit<.20);
   const p=screen(+t.getAttribute('x'),+t.getAttribute('y'));
   t.style.display='';
   const ideal=(umbrella?11:level===1?13:level===2?12:11)*Math.min(1,Math.max(.68,.8/unit));
   t.style.fontSize=(unit*ideal)+'px';t.style.letterSpacing=(unit*(umbrella?1.2:.45))+'px';t.style.strokeWidth=(unit*2.5)+'px';t.style.opacity=umbrella?'.6':'1';
   const measured=Math.max(1,t.getComputedTextLength()/unit),safePx=safe>0?safe/unit:Infinity,maxWidth=safe>0?safePx*1.82:Infinity,maxHeight=safe>0?safePx*1.55:Infinity;
   const scale=Math.min(1,maxWidth/measured,maxHeight/(ideal*1.05)),px=ideal*scale;
   t.style.fontSize=(unit*px)+'px';
   const w=t.getComputedTextLength()/unit,box={x:p.x-w/2-4,y:p.y-px*.58-3,w:w+8,h:px*1.16+6};
   const inView=box.x+box.w>0&&box.x<width&&box.y+box.h>0&&box.y<height;
   const territoryCountry=!!t.dataset.realmLabel&&this.cityTerritoryRealms?.has(t.dataset.realmLabel),fits=umbrella||safe<=0||px>=5.2;
   const collision=occupied.some(b=>overlaps(box,b));
   const show=!realmGone&&eligible&&inView&&fits&&!collision&&!(showCityAreas&&(territoryCountry||umbrella));
   t.style.display=show?'':'none';if(show)occupied.push(box);
  }
  const showMilitary=!!game&&showCityAreas;this.cityLabelBoxes=new Map();
  for(const t of this.cityTerritoryLabels||[]){
   const name=t.textContent||'',safe=+(t.dataset.safeRadius||0),safePx=safe/unit,ideal=name.length>18?12:name.length>12?13:14.5,cityId=t.dataset.cityLabel,fogVisible=!game?.fogOfWar||visibleCities.has(cityId);
   t.classList.toggle('game-owned-label',!!game&&ownedCities.has(cityId));
   t.style.display=showCityAreas&&fogVisible?'':'none';
   if(showCityAreas&&fogVisible){
    t.style.fontSize=(unit*ideal)+'px';t.style.strokeWidth=(unit*1.55)+'px';t.style.letterSpacing=(unit*.12)+'px';
    const measured=Math.max(1,t.getComputedTextLength()/unit),maxWidth=safePx*1.82,maxHeight=safePx*1.55,scale=Math.min(1,maxWidth/measured,maxHeight/(ideal*1.05)),px=ideal*scale;
    t.style.fontSize=(unit*px)+'px';
    const p=screen(+t.getAttribute('x'),+t.getAttribute('y')),w=t.getComputedTextLength()/unit,box={x:p.x-w/2-3,y:p.y-px*.58-2,w:w+6,h:px*1.16+4};
    const fits=px>=4.8,inView=box.x+box.w>0&&box.x<width&&box.y+box.h>0&&box.y<height;
    const visible=fits&&inView;t.style.display=visible?'':'none';if(visible)this.cityLabelBoxes.set(cityId,box);
   }
  }
  this.svg.querySelectorAll('.sea-label').forEach(t=>{t.style.fontSize=(unit*12)+'px';t.style.letterSpacing=(unit*2)+'px';t.style.display=unit<.15?'none':'';});
  this.svg.querySelector('#cities').innerHTML=CITIES.map(c=>{
   const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),q=screen(...p),selected=s.selected===c.id,territoryCity=this.cityTerritoryRealms?.has(cityRealm(c));
   if(q.x<-20||q.y<-20||q.x>width+20||q.y>height+20)return '';
   if(fogDetail&&!visibleCities.has(c.id))return '';
   const size=selected||unit<.3?4:2;
   if(territoryCity)return '';
   const army=Math.max(0,Number(game?.militaryByCity?.[c.id]?.army??c.army)||0),hasArmyNumber=showMilitary&&army>0,labelY=hasArmyNumber?-34:4,labelBox={x:q.x+8,y:q.y+labelY-13,w:displayCityName(c).length*7+8,h:19},forceLabel=c.id==='1300-quimper'&&unit<.34,show=selected||forceLabel||(unit<.30&&!occupied.some(b=>overlaps(labelBox,b)));
   if(show)occupied.push(labelBox);
   return `<g class="city-marker owned" data-city="${c.id}" data-realm="${esc(cityRealm(c))}" transform="translate(${p}) scale(${unit})"><title>${esc(displayCityName(c))} · ${esc(c.country)} · researched 1300 card</title><circle r="9" fill="transparent"/>${selected?'<circle r="10" fill="none" stroke="#f3d9a2" stroke-width="1.2"/>':''}<path d="M0 -${size} ${size} 0 0 ${size} -${size} 0Z" fill="#f8d791" stroke="#283d32" stroke-width="1"/>${show?`<text x="10" y="${labelY}" class="city-label owned">${esc(displayCityName(c))}</text>`:''}</g>`;
  }).join('');
  const movementLayer=this.svg.querySelector('#army-movement-routes');
  if(movementLayer){
   if(!showMilitary||!Array.isArray(game?.movements)||!game.movements.length)movementLayer.innerHTML='';
   else{
    const routePieces=[],dayDuration=Math.max(250,Number(game.dayDurationMs)||2000),dayNow=Number(game.day)||0,lastTick=Number(game.lastTickAt)||Date.now(),dayFraction=Math.max(0,Math.min(.999,(Date.now()-lastTick)/dayDuration));
    for(const move of game.movements){
     const fromAnchor=this.cityUnitAnchors?.get(move.from)?.point||this.cityCenters?.get(move.from),toAnchor=this.cityUnitAnchors?.get(move.to)?.point||this.cityCenters?.get(move.to);if(!fromAnchor||!toAnchor)continue;
     const span=Math.max(1,(Number(move.finishDay)||dayNow+1)-(Number(move.startDay)||dayNow)),progress=Math.max(0,Math.min(1,(dayNow+dayFraction-(Number(move.startDay)||dayNow))/span)),current=[fromAnchor[0]+(toAnchor[0]-fromAnchor[0])*progress,fromAnchor[1]+(toAnchor[1]-fromAnchor[1])*progress],remainingMs=Math.max(120,(1-progress)*span*dayDuration),route=Array.isArray(move.route)?move.route:[],idx=Math.max(0,Number(move.routeIndex)||0),future=route.slice(idx+1).map(id=>this.cityUnitAnchors?.get(id)?.point||this.cityCenters?.get(id)).filter(Boolean),pathPoints=[current,...future];
     const d=pathPoints.length>1?'M'+pathPoints.map(p=>p[0].toFixed(3)+','+p[1].toFixed(3)).join('L'):'';
     if(d)routePieces.push(`<path class="army-route-line" d="${d}" marker-end="url(#army-route-arrow)"/>`);
     const selected=game?.selectedArmyCity===move.from,scale=unit,fromText=current[0]+' '+current[1],toText=toAnchor[0]+' '+toAnchor[1];
     routePieces.push(`<g class="army-map-marker moving-army-marker player-army ${selected?'selected-army':''}" data-unit-city="${move.from}" transform="translate(${current})"><animateTransform attributeName="transform" type="translate" from="${fromText}" to="${toText}" dur="${remainingMs}ms" fill="freeze"/><g transform="scale(${scale})"><title>${esc(move.name||'Army')}: ${compactMilitaryNumber(move.count)} soldiers marching</title><circle class="army-click-hitbox" cx="0" cy="0" r="28" fill="transparent" pointer-events="all"/>${soldierPiece(move.count,'player',13)}</g></g>`);
    }
    movementLayer.innerHTML=routePieces.join('');
   }
  }
  const militaryLayer=this.svg.querySelector('#military-markers');
  if(militaryLayer){
   if(!showMilitary)militaryLayer.innerHTML='';
   else{
    const pieces=[],militaryBoxes=[];
    for(const c of CITIES){
     if(!visibleCities.has(c.id))continue;
     const owned=ownedCities.has(c.id),override=game?.militaryByCity?.[c.id],foreign=game?.foreignMilitaryByCity?.[c.id],battle=game?.battlesByCity?.[c.id]||null,siege=game?.siegesByCity?.[c.id]||null,occupied=!!game?.occupations?.[c.id],playerOverride=!!override&&Number(override.army)>0,relation=mapArmyRelation(game,c,playerOverride),foreignExtra=Math.max(0,Number(foreign?.army)||0),fallbackArmy=battle||siege||occupied?0:(Math.max(0,Number(c.army)||0)+foreignExtra),army=Math.max(0,Number(override?.army??fallbackArmy)||0),navy=Math.max(0,Number(override?.navy??c.navy)||0);
     const unitAnchor=this.cityUnitAnchors?.get(c.id),land=unitAnchor?.point||this.cityCenters?.get(c.id)||cityTerritoryPoint(cityRealm(c),c),sq=screen(...land),territoryCity=this.cityTerritoryRealms?.has(cityRealm(c)),cell=this.cityCellGeometry?.get(c.id),clipArmy=marker=>territoryCity&&unitAnchor?.cellClip&&unitAnchor?.componentClip?`<g class="army-city-hitbox" clip-path="url(#${unitAnchor.componentClip})"><g clip-path="url(#${unitAnchor.cellClip})">${marker}</g></g>`:marker;
     if(battle&&Number(battle.playerCount)>0&&Number(battle.enemyCount)>0&&sq.x>-55&&sq.y>-65&&sq.x<width+55&&sq.y<height+65){
      const safePx=Math.max(1,(Number(unitAnchor?.clearance)||0)/unit),horizontal=safePx>=38,sep=Math.max(10,Math.min(23,safePx*.42)),scale=Math.max(.38,Math.min(.78,safePx/48)),offsets=horizontal?[[-sep,3],[sep,3]]:[[0,-sep],[0,sep]],playerPoint=[land[0]+offsets[0][0]*unit,land[1]+offsets[0][1]*unit],enemyPoint=[land[0]+offsets[1][0]*unit,land[1]+offsets[1][1]*unit],selectedArmy=game?.selectedArmyCity===c.id;
      const playerMarker=`<g class="army-map-marker battle-army player-army ${selectedArmy?'selected-army':''}" data-unit-city="${c.id}" transform="translate(${playerPoint}) scale(${unit*scale})"><title>Your army: ${compactMilitaryNumber(battle.playerCount)} soldiers</title><circle class="army-click-hitbox" cx="0" cy="0" r="28" fill="transparent" pointer-events="all"/>${soldierPiece(battle.playerCount,'player',18)}</g>`;
      const enemyMarker=`<g class="battle-enemy-marker enemy-army" transform="translate(${enemyPoint}) scale(${unit*scale})" pointer-events="none"><title>${esc(battle.enemyCountry||'Enemy')}: ${compactMilitaryNumber(battle.enemyCount)} soldiers</title>${soldierPiece(battle.enemyCount,'enemy',18)}</g>`;
      pieces.push(clipArmy(playerMarker),clipArmy(enemyMarker));militaryBoxes.push({x:sq.x-48,y:sq.y-48,w:96,h:96});
     }else if(army>0&&sq.x>-45&&sq.y>-55&&sq.x<width+45&&sq.y<height+55){
      const badgeY=showCityAreas&&territoryCity?28:13,labelBox=this.cityLabelBoxes?.get(c.id),badgeW=Math.max(24,compactMilitaryNumber(army).length*6.2+12),boxW=Math.max(42,badgeW+6),boxH=badgeY>20?66:53,candidates=territoryCity?[[0,50],[0,-50],[48,12],[-48,12],[48,-26],[-48,-26],[36,40],[-36,40],[36,-40],[-36,-40],[0,72],[0,-72],[68,0],[-68,0]]:[[0,0],[0,44],[0,-44],[42,0],[-42,0]];
      const boxAt=(q,dx,dy)=>({x:q.x+dx-boxW/2,y:q.y+dy-29,w:boxW,h:boxH}),mapAt=(dx,dy)=>[land[0]+dx*unit,land[1]+dy*unit],screenToMap=(x,y)=>[this.view.x+x*unit,this.view.y+y*unit],insideCellPoint=p=>!territoryCity||!cell||(pointInPolygon(p,cell.poly)&&(cell.componentPoly?pointInPolygon(p,cell.componentPoly):cell.realmPolys.some(poly=>pointInPolygon(p,poly)))),boxInsideCell=box=>{if(!territoryCity||!cell)return true;const inset=1.5,x0=box.x+inset,y0=box.y+inset,x1=box.x+box.w-inset,y1=box.y+box.h-inset,cx=(x0+x1)/2,cy=(y0+y1)/2;return [[x0,y0],[x1,y0],[x1,y1],[x0,y1],[cx,y0],[cx,y1],[x0,cy],[x1,cy]].every(([x,y])=>insideCellPoint(screenToMap(x,y)));};
      let chosen=null,markerScale=1;
      for(const [dx,dy] of candidates){const qbox=boxAt(sq,dx,dy),mp=mapAt(dx,dy),inView=qbox.x+qbox.w>2&&qbox.x<width-2&&qbox.y+qbox.h>2&&qbox.y<height-2;if(!inView||labelBox&&overlaps(qbox,labelBox)||militaryBoxes.some(b=>overlaps(qbox,b))||!boxInsideCell(qbox))continue;chosen={dx,dy,box:qbox,point:mp};break;}
      if(!chosen){const safePx=Math.max(1,(Number(unitAnchor?.clearance)||0)/unit),needRadius=Math.hypot(boxW/2,boxH/2);markerScale=Math.max(.22,Math.min(1,(safePx/Math.max(1,needRadius))*.90));const sw=boxW*markerScale,sh=boxH*markerScale,qbox={x:sq.x-sw/2,y:sq.y-29*markerScale,w:sw,h:sh};chosen={dx:0,dy:0,box:qbox,point:land,fallback:true};}
      militaryBoxes.push(chosen.box);
      const selectedArmy=game?.selectedArmyCity===c.id,marker=`<g class="army-map-marker ${relation}-army ${selectedArmy?'selected-army':''} ${game?.armyMoveMode&&selectedArmy?'move-armed':''}" data-unit-city="${c.id}" transform="translate(${chosen.point}) scale(${unit*markerScale})"><title>${esc(displayCityName(c))}: ${compactMilitaryNumber(army)} soldiers</title><circle class="army-click-hitbox" cx="0" cy="0" r="28" fill="transparent" pointer-events="all"/>${soldierPiece(army,relation,badgeY)}</g>`;
      pieces.push(clipArmy(marker));
     }
     if(navy>0){const coast=this.coastMarkerForCity(c);if(coast){const cq=screen(...coast);if(cq.x>-55&&cq.y>-55&&cq.x<width+55&&cq.y<height+55)pieces.push(`<g class="navy-map-marker" data-unit-city="${c.id}" transform="translate(${coast}) scale(${unit})"><title>${esc(displayCityName(c))}: ${compactMilitaryNumber(navy)} ships</title>${shipPiece(navy,owned)}</g>`);}}
    }
    militaryLayer.innerHTML=pieces.join('');
   }
  }
 }
 destroy(){this.destroyed=true;this.cancelScheduledRefresh();this.abort.abort();this.resize.disconnect();}
}
