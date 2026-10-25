import {buildCampaignFrontTopology1300,alignCampaignFront1300} from './campaign-front1300.js?v=20261025-fine-grid-v2';
import {PhaserMapLayer} from './phaser/map-layer.js?v=20261025-watchpost-roof-v1';
import {CITIES_1300 as CITIES,CITY_1300 as CITY} from './data1300.js?v=20260928-anatolia-v8';
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
 ['DENMARK',10.3,56.35,1],['HUNGARY',20,47,1],['SERBIA',20.4,43.5,2],['BULGARIA',25.3,43.2,2]
];
const HISTORICAL_LABEL_REALMS=new Map([
 ['FRANCE','Kingdom of France'],['ENGLAND','Kingdom of England'],['SCOTLAND','Kingdom of Scotland'],
 ['PORTUGAL','Kingdom of Portugal'],['CASTILE','Crown of Castile'],['ARAGON','Crown of Aragon'],
 ['NAVARRE','Kingdom of Navarre'],['GRANADA','Granada'],['AQUITAINE','Kingdom of England'],
 ['POLAND','Kingdom of Poland'],['LITHUANIA','Grand Duchy of Lithuania'],['TEUTONIC ORDER','Teutonic Order'],
 ['DENMARK','Kingdom of Denmark'],['HUNGARY','Kingdom of Hungary'],['SERBIA','Kingdom of Serbia'],['BULGARIA','Second Bulgarian Empire']
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
const ownerRealmForCity=(game,c)=>{const saved=game?.cityOwners?.[c.id];if(saved==='player')return 'player';if(saved&&game?.playerColors?.[saved])return saved;const raw=typeof saved==='string'&&saved?saved:c.country;return raw==='Emirate of Granada'?'Granada':(CITY_REALM_ALIASES.get(raw)||raw);};
// Every c.1300 city now gets the same territory treatment that France and Iberia already use.
// The active subset is intersected with the currently loaded atlas so unmatched/modern realms keep normal markers.
const CITY_TERRITORY_REALMS=new Set(CITIES.map(cityRealm));
const CITY_IDS=new Set(CITIES.map(c=>c.id));
const displayRealmName=name=>name==='Granada'?'Emirate of Granada':name;
const polygonPath=poly=>poly.length?'M'+poly.map(p=>p[0].toFixed(3)+','+p[1].toFixed(3)).join('L')+'Z':'';
const polygonBox=poly=>{const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const polygonArea=poly=>Math.abs(poly.reduce((a,p,i)=>{const q=poly[(i+1)%poly.length];return a+p[0]*q[1]-q[0]*p[1];},0)/2);
const polygonCentroid=poly=>{let a=0,cx=0,cy=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],k=p[0]*q[1]-q[0]*p[1];a+=k;cx+=(p[0]+q[0])*k;cy+=(p[1]+q[1])*k;}if(Math.abs(a)<1e-8){const n=poly.length||1;return [poly.reduce((v,p)=>v+p[0],0)/n,poly.reduce((v,p)=>v+p[1],0)/n];}return [cx/(3*a),cy/(3*a)];};
export const pointInPolygon=(p,poly)=>{let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j],cross=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]);if(cross)inside=!inside;}return inside;};
const pointSegmentDistance=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l2=dx*dx+dy*dy;if(l2<1e-12)return Math.hypot(p[0]-a[0],p[1]-a[1]);const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l2)),x=a[0]+t*dx,y=a[1]+t*dy;return Math.hypot(p[0]-x,p[1]-y);};
const polygonEdgeDistance=(p,poly)=>{let d=Infinity;for(let i=0;i<poly.length;i++)d=Math.min(d,pointSegmentDistance(p,poly[i],poly[(i+1)%poly.length]));return d;};
const nearestPointOnSegment=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l2=dx*dx+dy*dy;if(l2<1e-12)return {point:[...a],distance:Math.hypot(p[0]-a[0],p[1]-a[1]),a,b};const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l2)),q=[a[0]+t*dx,a[1]+t*dy];return {point:q,distance:Math.hypot(p[0]-q[0],p[1]-q[1]),a,b};};
export const cityPointInProvince=(point,polys)=>{
 const usable=(polys||[]).filter(poly=>poly.length>=3);
 if(!usable.length)return [...point];
 if(usable.some(poly=>pointInPolygon(point,poly)))return [...point];
 let nearest=null,targetPoly=null;
 for(const poly of usable)for(let i=0;i<poly.length;i++){
  const hit=nearestPointOnSegment(point,poly[i],poly[(i+1)%poly.length]);
  if(!nearest||hit.distance<nearest.distance){nearest=hit;targetPoly=poly;}
 }
 if(!nearest||!targetPoly)return [...point];
 const interior=safeLabelMetrics(targetPoly,[targetPoly],polygonCentroid(targetPoly)).center;
 // The nearest boundary point itself can fail strict point-in-polygon tests.
 // Move only as far inward as required, preserving the real city position.
 for(const ratio of [.015,.03,.06,.12,.25,.5,1]){
  const candidate=[nearest.point[0]+(interior[0]-nearest.point[0])*ratio,nearest.point[1]+(interior[1]-nearest.point[1])*ratio];
  if(pointInPolygon(candidate,targetPoly))return candidate;
 }
 return [...interior];
};
const nearestCoastEdge=(p,polys)=>{let best=null;for(const poly of polys||[])for(let i=0;i<poly.length;i++){const hit=nearestPointOnSegment(p,poly[i],poly[(i+1)%poly.length]);if(!best||hit.distance<best.distance)best=hit;}return best;};
const compactMilitaryNumber=n=>Math.max(0,Math.round(Number(n)||0)).toLocaleString('en-GB');
const normalizeArmyRelation=r=>r===true?'player':r===false||!r?'neutral':String(r);
const unitBadge=(textValue,relation='neutral',y=13)=>{const rel=normalizeArmyRelation(relation),t=String(textValue),w=Math.max(24,t.length*6.2+12),x=-w/2;return `<g class="military-count ${rel}-count" transform="translate(0,${y})"><rect x="${x}" y="-7" width="${w}" height="14" rx="6"/><text x="0" y="3" text-anchor="middle">${t}</text></g>`;};
const soldierPiece=(count,relation='neutral',badgeY=13)=>unitBadge(compactMilitaryNumber(count),relation,badgeY);
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
 '1300-lisbon':0,'1300-evora':5,'1300-silves':0,'1300-guarda':-6,'1300-faro':0,'1300-pamplona':0,'1300-andorra-la-vella':0,'1300-perpignan':-8,'1300-huesca':0,'1300-zaragoza':0,'1300-girona':-22,
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
let sharedBordersCache;
export class WorldMap{
 constructor(host,state,onSelect,onRegion,onArmySelect=null,onArmyMove=null){
  this.host=host;this.state=state;this.onSelect=onSelect;this.onRegion=onRegion;this.onArmySelect=onArmySelect;this.onArmyMove=onArmyMove;this.armyPointer=null;this.mode='historical';this.view={x:100,y:220,w:750,h:600};this.pointers=new Map();this.destroyed=false;this.drawn=false;this.coastMarkerCache=new Map();this.physicalLandPolys=[];this.deferredRefreshTimer=null;this.interactionRefreshDelay=90;this.movementAnimationFrame=0;this.territoryVisualState=new Map();this.territoryVisiblePrevious=new Set();this.captureGhosts=new Set();
  host.innerHTML=`<svg id="world-map" role="img" aria-label="Political map of Europe around 1300 CE. Drag to pan, scroll or pinch to zoom. In detailed regions, left click a city territory and right click a country." tabindex="0"><defs><pattern id="ocean-grid" width="120" height="150" patternUnits="userSpaceOnUse"><path d="M120 0H0V150" fill="none" stroke="#d6e0c7" stroke-opacity=".06" stroke-width=".7"/></pattern><linearGradient id="soldier-body-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8c28c"/><stop offset=".45" stop-color="#8d7755"/><stop offset="1" stop-color="#44392d"/></linearGradient><linearGradient id="soldier-metal-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5e2ce"/><stop offset=".48" stop-color="#8d948b"/><stop offset="1" stop-color="#343d3a"/></linearGradient><linearGradient id="ship-wood-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bd8a4f"/><stop offset=".52" stop-color="#78502f"/><stop offset="1" stop-color="#3e2b20"/></linearGradient><linearGradient id="ship-sail-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1e5bd"/><stop offset=".6" stop-color="#baa879"/><stop offset="1" stop-color="#75694c"/></linearGradient><marker id="army-route-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d6bd72"/></marker><g id="occupation-patterns"></g><filter id="military-shadow" x="-70%" y="-70%" width="240%" height="240%"><feDropShadow dx="1.5" dy="2.2" stdDeviation="1.6" flood-color="#07110e" flood-opacity=".7"/></filter></defs><rect x="-5000" y="-5000" width="15000" height="15000" fill="#192c32"/><rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#ocean-grid)"/><g id="land"></g><g id="city-territories"></g><g id="tactical-front-territory" pointer-events="none"></g><g id="territory-capture-fx" pointer-events="none"></g><g id="country-borders"></g><g id="sea-labels"></g><g id="realm-labels"></g><g id="city-territory-labels"></g><g id="cities"></g><g id="watchpost-markers" pointer-events="none"></g><g id="army-movement-routes"></g><g id="campaign-front-orders" pointer-events="none"></g><g id="military-markers"></g><g id="tactical-front-formations"></g></svg><div class="map-top"><div class="map-heading"><span class="eyebrow">EUROPE & ANATOLIA</span><span>${CITIES.length} researched city cards · political map c. 1300 CE</span></div><div class="map-era-badge">REALMS · c. 1300 CE</div></div><div class="map-bottom"><span class="map-hint">Drag to explore · click army for details · right-click or drag army to move</span><span id="map-attribution" class="map-attribution">Approximate 1300 borders · Historical Basemaps · Natural Earth coastline</span><span class="map-key"><i></i> Researched 1300 city card</span></div><div class="map-controls"><button data-map="in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button><button data-map="out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button><button data-map="selected" title="Focus selected city" aria-label="Focus selected city">${icon('target')}</button><button data-map="all" title="Show map overview" aria-label="Show map overview">${icon('globe')}</button></div><div class="map-compass" aria-hidden="true"><span>N</span><i></i></div><div class="map-loading">Unfolding the atlas…</div>`;
  this.svg=host.querySelector('svg');this.phaserLayer=new PhaserMapLayer(this);this.abort=new AbortController();const opts={signal:this.abort.signal};
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
  host.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;const a=b.dataset.map;if(a==='in')this.zoom(.68);if(a==='out')this.zoom(1.45);if(a==='selected')this.focus(state.selected);if(a==='all')this.fit();if(['modern','historical'].includes(a)&&this.mode!==a){this.mode=a;host.querySelectorAll('.map-modes button').forEach(b=>b.classList.toggle('active',b.dataset.map===a));this.load(false);}},opts);
  this.resize=new ResizeObserver(()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;const cy=this.view.y+this.view.h/2,overview=this.overviewWidth&&Math.abs(this.view.w-this.overviewWidth)<1;if(overview){this.fit();return;}this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*r.width/r.height);this.view.h=this.view.w*r.height/r.width;this.view.y=cy-this.view.h/2;this.update();});this.resize.observe(host);this.load(true);
 }
 async load(fit){
  const mode=this.mode;
  try{cache[mode]??=fetch(mode==='modern'?'assets/modern-atlas.json?v=20260920-aquileia-venice-coast-fix-v1':'assets/atlas.json?v=20261023-shared-coverage-v1').then(r=>{if(!r.ok)throw new Error('Missing atlas');return r.json();});physicalLandCache??=fetch('assets/map-land.json?v=20260920-aquileia-venice-coast-fix-v1').then(r=>r.ok?r.json():{d:''}).catch(()=>({d:''}));sharedBordersCache??=fetch('assets/map-shared-borders.json?v=20261023-shared-coverage-v1').then(r=>r.ok?r.json():{countryD:'',cityD:''}).catch(()=>({countryD:'',cityD:''}));const [atlas,physicalLand,sharedBorders]=await Promise.all([cache[mode],physicalLandCache,mode==='historical'?sharedBordersCache:Promise.resolve({countryD:'',cityD:''})]);this.physicalLandPolys=svgSubpaths(physicalLand.d).map(svgSubpathPoints).filter(p=>p.length>=3);this.coastMarkerCache.clear();this.realmInfo=new Map(atlas.map(f=>[realmOf(f),f]));if(this.destroyed||this.mode!==mode)return;
   const drawnAtlas=mode==='historical'&&atlas.some(f=>f.cityId);
   const atlasRealms=new Set(atlas.filter(f=>!f.outline&&!f.underlay).map(realmOf));
   this.cityTerritoryRealms=new Set([...CITY_TERRITORY_REALMS].filter(realm=>atlasRealms.has(realm)));
   const territoryFeatures=atlas.filter(f=>!f.outline&&!f.underlay),territoryMarkup=territoryFeatures.map((f,i)=>{const realm=realmOf(f),fill=(mode==='historical'?colorForRealm(realm):palettes[i%palettes.length]),outline=drawnAtlas?'':withoutIslandStroke(f.d),cleaned=outline!==f.d,stroke=drawnAtlas?fill:(cleaned?'none':'#28372e'),sw=drawnAtlas?'.36':(cleaned?'0':'.85'),base=`<path class="territory ${f.detail?'detail-polity':''} ${this.cityTerritoryRealms.has(realm)?'city-region-realm':''} ${IBERIA_REALMS.has(realm)?'iberia-realm':''} ${drawnAtlas?'drawn-map-territory':''}" data-realm="${esc(realm)}" data-detail="${f.detail?'1':'0'}" d="${f.d}" fill="${fill}" fill-rule="evenodd" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" vector-effect="non-scaling-stroke" style="--territory-fill:${fill}"><title>${esc(f.name||'Local communities')}</title></path>`;if(!cleaned)return base;return base+(outline?`<path d="${outline}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'');}).join('');
   const defs=this.svg.querySelector('defs');defs.querySelector('#map-land-clip')?.remove();if(physicalLand.d)defs.insertAdjacentHTML('beforeend',`<clipPath id="map-land-clip"><path d="${physicalLand.d}" fill-rule="evenodd"/></clipPath>`);
   const cleanIslandCoast=drawnAtlas?'':islandLandOutline(physicalLand.d),cleanIslandBorders=drawnAtlas?'':sharedIslandBorders(atlas),realmSeamCovers=drawnAtlas?'':sameRealmSeamCovers(atlas,mode),landBase=drawnAtlas&&physicalLand.d?`<path class="drawn-map-land-base" d="${physicalLand.d}" fill-rule="evenodd"/>`:'',drawnCoast=drawnAtlas&&physicalLand.d?`<path class="drawn-map-coast" d="${physicalLand.d}"/>`:'',countryLinework=drawnAtlas?`${sharedBorders.countryD?`<path class="drawn-map-border" clip-path="url(#map-land-clip)" d="${sharedBorders.countryD}"/>`:''}${drawnCoast}`:'';
   this.svg.querySelector('#land').innerHTML=landBase+territoryMarkup+(cleanIslandCoast?`<path d="${cleanIslandCoast}" fill="none" stroke="#0a0d0c" stroke-width="1.25" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'')+(cleanIslandBorders?`<path d="${cleanIslandBorders}" fill="none" stroke="#070908" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'')+realmSeamCovers;
   this.svg.querySelector('#country-borders').innerHTML=countryLinework;
   this.buildCityTerritories(atlas,sharedBorders.cityD);
   const rawLabels=[...historicalLabels.map(([name,x,y,level=1])=>({name,x,y,level,kind:level===1?'major':'polity',realm:HISTORICAL_LABEL_REALMS.get(name)||''})),...atlas.filter(f=>f.label).map(f=>({name:f.label,x:f.lx,y:f.ly,level:f.labelLevel||2,kind:f.outline?'umbrella':'polity',realm:f.outline?'':realmOf(f)}))],seenLabels=new Set(),labels=rawLabels.filter(l=>{const key=(l.realm||'')+'|'+l.name;if(seenLabels.has(key))return false;seenLabels.add(key);return true;});
   this.svg.querySelector('#realm-labels').innerHTML=labels.map(({name,x,y,level,kind,realm})=>{const fallback=pos(x,y),metric=realm?realmLabelMetrics(atlas,realm,fallback):{center:fallback,clearance:0},p=metric.center;return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" data-level="${level}" data-kind="${kind}" data-realm-label="${esc(realm)}" data-base-x="${p[0]}" data-base-y="${p[1]}" data-safe-radius="${metric.clearance.toFixed(3)}" class="realm-label">${esc(name)}</text>`;}).join('');
   this.realmLabels=[...this.svg.querySelectorAll('.realm-label')].sort((a,b)=>{const au=a.dataset.kind==='umbrella'?1:0,bu=b.dataset.kind==='umbrella'?1:0;return au-bu||+(a.dataset.level)-+(b.dataset.level);});
   this.svg.querySelector('#sea-labels').innerHTML=[['MEDITERRANEAN SEA',14,35],['BLACK SEA',34,43],['ATLANTIC OCEAN',-14,44],['NORTH SEA',3,56]].map(([name,x,y])=>{const p=pos(x,y);return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" class="sea-label">${name}</text>`;}).join('');
   this.host.querySelector('#map-attribution').textContent=drawnAtlas?'Rebuilt shared borders · historical realms c. 1300 · Natural Earth coastline':'Approximate 1300 borders · Historical Basemaps · Natural Earth coastline';this.host.querySelector('.map-loading')?.remove();if(fit&&this.focusRequest)this.focus(this.focusRequest);else if(fit)this.fit();else this.update();
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
 buildCityTerritories(atlas,cityBorderD=''){
  if(atlas.some(f=>f.cityId)){this.buildDrawnCityTerritories(atlas,cityBorderD);return;}
  const defs=this.svg.querySelector('defs'),territoryLayer=this.svg.querySelector('#city-territories'),labelLayer=this.svg.querySelector('#city-territory-labels');
  defs.querySelectorAll('.city-territory-dynamic,.iberia-dynamic').forEach(n=>n.remove());territoryLayer.innerHTML='';labelLayer.innerHTML='';this.cityTerritoryLabels=[];this.cityAdjacency=new Map();this.cityCenters=new Map();this.cityUnitAnchors=new Map();this.cityCellGeometry=new Map();this.cityRealmGeometry=new Map();
  for(const realm of this.cityTerritoryRealms||[]){
   const features=atlas.filter(f=>!f.outline&&!f.underlay&&realmOf(f)===realm);if(!features.length)continue;
   const realmD=features.map(f=>f.d).join(''),realmPolys=svgSubpaths(realmD).map(svgSubpathPoints).filter(p=>p.length>=3);if(!realmPolys.length)continue;
   const cities=CITIES.filter(c=>cityRealm(c)===realm),points=cities.map(c=>cityPointInProvince(cityTerritoryPoint(realm,c),realmPolys));if(!cities.length)continue;
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
 buildDrawnCityTerritories(atlas,cityBorderD){
  const defs=this.svg.querySelector('defs'),territoryLayer=this.svg.querySelector('#city-territories'),labelLayer=this.svg.querySelector('#city-territory-labels'),features=atlas.filter(f=>f.cityId&&CITY[f.cityId]);
  defs.querySelectorAll('.city-territory-dynamic,.iberia-dynamic').forEach(n=>n.remove());territoryLayer.innerHTML='';labelLayer.innerHTML='';this.cityTerritoryLabels=[];this.cityAdjacency=new Map();this.cityCenters=new Map();this.cityUnitAnchors=new Map();this.cityCellGeometry=new Map();this.cityRealmGeometry=new Map();
  const byRealm=new Map();
  for(const feature of features){
   const c=CITY[feature.cityId],realm=realmOf(feature),rawPoint=pos(c.mapLon??c.lon,c.mapLat??c.lat),polys=svgSubpaths(feature.d).map(svgSubpathPoints).filter(p=>p.length>=3),point=cityPointInProvince(rawPoint,polys),poly=polys.find(p=>pointInPolygon(point,p))||[...polys].sort((a,b)=>polygonArea(b)-polygonArea(a))[0];if(!poly)continue;
   const metrics=visibleCellMetrics(poly,[poly],point),cellClip='city-cell-'+c.id.replace(/[^a-z0-9-]/gi,'-');
   this.cityCenters.set(c.id,point);this.cityAdjacency.set(c.id,new Set(feature.neighbors||[]));this.cityUnitAnchors.set(c.id,{point:metrics.center,clearance:metrics.clearance,cellClip,componentClip:cellClip});this.cityCellGeometry.set(c.id,{poly,componentPoly:poly,realmPolys:polys});
   if(!byRealm.has(realm))byRealm.set(realm,{realm,polys:[],cities:[],points:[]});const group=byRealm.get(realm);group.polys.push(...polys);group.cities.push(c);group.points.push(point);
   defs.insertAdjacentHTML('beforeend',`<clipPath class="city-territory-dynamic" id="${cellClip}"><path d="${feature.d}" fill-rule="evenodd"/></clipPath>`);
   territoryLayer.insertAdjacentHTML('beforeend',`<path class="city-territory-cell drawn-city-territory-cell" data-city="${c.id}" data-realm="${esc(realm)}" d="${feature.d}" fill-rule="evenodd"><title>${esc(displayCityName(c))} · ${esc(displayRealmName(realm))}</title></path>`);
   const angle=IBERIA_LABEL_ANGLES[c.id]||0,p=metrics.center,box=metrics.box;
   labelLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${cellClip})"><text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" transform="rotate(${angle} ${p[0]} ${p[1]})" class="city-area-label" data-city-label="${c.id}" data-cell-w="${box.w}" data-cell-h="${box.h}" data-safe-radius="${metrics.clearance.toFixed(3)}">${esc(displayCityName(c))}</text></g>`);
  }
  if(cityBorderD)territoryLayer.insertAdjacentHTML('beforeend',`<path class="drawn-city-border" clip-path="url(#map-land-clip)" d="${cityBorderD}"/>`);
  for(const [realm,g] of byRealm){const pts=g.polys.flat(),xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);if(!pts.length)continue;g.bbox={x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};this.cityRealmGeometry.set(realm,g);}
  for(const [id,neighbors] of this.cityAdjacency)for(const neighbor of neighbors)if(this.cityAdjacency.has(neighbor))this.cityAdjacency.get(neighbor).add(id);
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
 campaignFrontTopology1300(){
  if(!this.cityCellGeometry?.size||!this.cityCenters?.size)return null;
  if(!this.frontTopology){const provinces=[];for(const [id,g] of this.cityCellGeometry){const center=this.cityCenters.get(id);if(center&&g.poly?.length>=3)provinces.push({id,poly:g.poly,polys:g.componentPoly?[g.componentPoly]:g.realmPolys,center,neighbors:this.neighboursOf(id)});}this.frontTopology=buildCampaignFrontTopology1300(provinces);}
  return this.frontTopology;
 }
 frontNodeForWatchpost1300(post){const topology=this.campaignFrontTopology1300(),center=this.cityCenters?.get(post.cityId);if(!topology||!center)return null;const x=center[0]+(Number(post.x??3)-3)*2.5,y=center[1]+(Number(post.y??2)-2)*2.5;return (topology.byCity.get(post.cityId)||[]).reduce((best,n)=>!best||Math.hypot(n.x-x,n.y-y)<Math.hypot(best.x-x,best.y-y)?n:best,null);}
 renderTacticalFront1300(game,visibleCities,unit,show){
  const terrain=this.svg.querySelector('#tactical-front-territory'),formations=this.svg.querySelector('#tactical-front-formations');
  if(!terrain||!formations)return;const front=game?.tacticalFront,topology=front&&this.campaignFrontTopology1300();
  if(!front||!topology||!show){terrain.replaceChildren();formations.replaceChildren();return;}
  alignCampaignFront1300(front,topology);
  const color=country=>country===game.playerCountry?(game.playerColor||'#608db8'):(game.alliances||[]).includes(country)?'#c1a15e':colorForRealm(CITY_REALM_ALIASES.get(country)||country),visible=n=>visibleCities.has(n.city)&&n.x>=this.view.x-topology.step&&n.x<=this.view.x+this.view.w+topology.step&&n.y>=this.view.y-topology.step&&n.y<=this.view.y+this.view.h+topology.step;
  const paths=new Map(),changed=new Set(front.changes||[]),fresh=[];
  for(const [id,country] of Object.entries(front.control||{})){const n=topology.byId.get(id);if(!n||!visible(n)||n.castle)continue;const key=n.city+'|'+country;if(!paths.has(key))paths.set(key,{city:n.city,country,d:''});const z=topology.step/2;paths.get(key).d+='M'+(n.x-z)+','+(n.y-z)+'h'+topology.step+'v'+topology.step+'h-'+topology.step+'Z';if(changed.has(id)&&this.frontRevision!==front.revision&&this.frontVisiblePrevious?.has(n.city))fresh.push(n);}
  terrain.innerHTML=[...paths.values()].map(row=>{const clip=this.cityUnitAnchors?.get(row.city)?.cellClip;return '<path d="'+row.d+'" '+(clip?'clip-path="url(#'+clip+')"':'')+' fill="'+color(row.country)+'" fill-opacity=".85" stroke="none"/>';}).join('');
  const shown=(front.formations||[]).filter(f=>{const n=topology.byId.get(f.node);return n&&visible(n)&&Object.values(f.units).some(n=>Number(n)>0);});
  formations.innerHTML=shown.map(f=>{const n=topology.byId.get(f.node),total=Object.values(f.units).reduce((s,n)=>s+Number(n||0),0),own=f.country===game.playerCountry,origin=f.source.startsWith('guard:')?f.source.slice(6):f.source,city=game.frontArmyLocations?.[origin],r=total>=1000?6:total>=200?4.8:total>=20?3.5:2.3;
   return '<g class="'+(own&&city?'army-map-marker':'front-enemy-formation')+'" '+(own&&city?'data-unit-city="'+esc(origin)+'"':'pointer-events="none"')+' transform="translate('+n.x+' '+n.y+')"><title>'+esc(f.country)+' · '+total+' soldiers</title><circle r="'+(unit*r)+'" fill="'+color(f.country)+'" stroke="#172d28" stroke-width="'+unit+'"/>'+(own&&city?'<circle r="'+(unit*12)+'" fill="transparent" pointer-events="all"/>':'')+(total>=20?'<text y="'+(-unit*7)+'" text-anchor="middle" font-size="'+(unit*10)+'" fill="#fff0cf" stroke="#182b27" stroke-width="'+(unit*2.8)+'" paint-order="stroke" pointer-events="none">'+compactMilitaryNumber(total)+'</text>':'')+'</g>';
  }).join('');
  // Animate only positions seen both before and after this tick. Map redraws never restart a move.
  if(this.frontRevision!==undefined&&this.frontRevision!==front.revision&&!document.hidden&&typeof matchMedia==='function'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
   let animated=0;shown.forEach((f,i)=>{const from=topology.byId.get(f.previous),to=topology.byId.get(f.node);
    if(animated>=120||f.movedDay!==game.day||!from||!to||from.id===to.id||!visible(from)||!this.frontVisiblePrevious?.has(from.city))return;
    const marker=formations.children[i],motion=document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    motion.setAttribute('attributeName','transform');motion.setAttribute('type','translate');motion.setAttribute('from',from.x+' '+from.y);motion.setAttribute('to',to.x+' '+to.y);motion.setAttribute('dur','450ms');motion.setAttribute('begin','indefinite');motion.setAttribute('fill','remove');
    marker.append(motion);motion.addEventListener('endEvent',()=>motion.remove(),{once:true});motion.beginElement?.();animated++;
   });
  }
  // One short bounded capture animation, only for territory visible before and after the tick.
  if(fresh.length&&typeof matchMedia==='function'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.hidden){for(const n of fresh.slice(0,80)){const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');circle.setAttribute('cx',n.x);circle.setAttribute('cy',n.y);circle.setAttribute('r',topology.step*.55);circle.setAttribute('fill',color(front.control[n.id]));circle.setAttribute('pointer-events','none');formations.append(circle);const anim=circle.animate?.([{opacity:.9},{opacity:0}],{duration:420});if(anim){anim.onfinish=()=>circle.remove();anim.oncancel=()=>circle.remove();}else circle.remove();}}
  this.frontRevision=front.revision;this.frontVisiblePrevious=new Set(visibleCities);
 }
 neighboursOf(cityId){return [...(this.cityAdjacency?.get(cityId)||[])];}
 zoom(f,fx=.5,fy=.5,deferRefresh=false){const w=Math.max(12,Math.min(this.overviewWidth||900,this.view.w*f)),r=w/this.view.w;this.view.x+=this.view.w*fx*(1-r);this.view.y+=this.view.h*fy*(1-r);this.view.w=w;this.view.h*=r;this.update(deferRefresh);}
 focus(id){this.focusRequest=id;const c=CITY[id];if(!c)return;const p=this.cityCenters?.get(id)||cityTerritoryPoint(cityRealm(c),c),r=this.host.getBoundingClientRect();this.view.w=180;this.view.h=180*r.height/Math.max(1,r.width);this.view.x=p[0]-this.view.w/2;this.view.y=p[1]-this.view.h/2;this.update();}
 fit(){this.focusRequest=null;const r=this.host.getBoundingClientRect(),aspect=r.width/Math.max(1,r.height);this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*aspect);this.view.w=this.overviewWidth;this.view.h=this.view.w/aspect;this.view.x=bounds.x+(bounds.w-this.view.w)/2;this.view.y=bounds.y+(bounds.h-this.view.h)/2;this.update();}
 applyViewBox(){if(!this.svg)return;const v=this.view;
  v.x=v.w>=bounds.w?bounds.x+(bounds.w-v.w)/2:Math.max(bounds.x,Math.min(bounds.x+bounds.w-v.w,v.x));
  v.y=v.h>=bounds.h?bounds.y+(bounds.h-v.h)/2:Math.max(bounds.y,Math.min(bounds.y+bounds.h-v.h,v.y));
  this.svg.setAttribute('viewBox',`${v.x} ${v.y} ${v.w} ${v.h}`);
 }
 updateBorderZoomStyle(){if(!this.svg)return;const width=this.host.clientWidth||1000,unit=this.view.w/width,reveal=Math.max(0,Math.min(1,(.34-unit)/.26)),cityBorderZoomColor=mixHex('#8d9690','#626c66',reveal);
  this.svg.style.setProperty('--city-border-zoom-color',cityBorderZoomColor);
  this.svg.style.setProperty('--city-border-zoom-opacity',(reveal*.42).toFixed(3));
  this.svg.style.setProperty('--city-border-zoom-width',(.26+reveal*.25).toFixed(3));
 }
 updateMovingArmyAnimation(){
  const game=this.state?.game,moves=game?.movements;if(this.destroyed||(!moves?.length&&!game?.watchpostTransfers?.length))return false;
  const dayDuration=Math.max(250,Number(game.dayDurationMs)||2000),dayNow=Number(game.day)||0,lastTick=Number(game.lastTickAt)||Date.now(),dayFraction=Math.max(0,Math.min(.999,(Date.now()-lastTick)/dayDuration));
  const movingEls=[...(this.svg?.querySelectorAll('.moving-army-marker[data-move-id]')||[])],postEls=[...(this.svg?.querySelectorAll('.watchpost-transfer-marker[data-post-transfer-id]')||[])];if(!movingEls.length&&!postEls.length)return false;
  for(const el of movingEls){
   const move=moves.find(x=>String(x.id)===el.dataset.moveId);if(!move)continue;const from=this.cityCenters?.get(move.from)||this.cityUnitAnchors?.get(move.from)?.point,to=this.cityCenters?.get(move.to)||this.cityUnitAnchors?.get(move.to)?.point;if(!from||!to)continue;
   const start=Number.isFinite(Number(move.visualStartDay))?Number(move.visualStartDay):(Number(move.startDay)||dayNow),finish=Number(move.finishDay)||start+1,span=Math.max(.001,finish-start),progress=Math.max(0,Math.min(1,(dayNow+dayFraction-start)/span)),x=from[0]+(to[0]-from[0])*progress,y=from[1]+(to[1]-from[1])*progress;
   el.setAttribute('transform',`translate(${x} ${y})`);
  }
  for(const el of postEls){
   const transfer=game.watchpostTransfers.find(t=>String(t.id)===el.dataset.postTransferId);
   if(!transfer)continue;
   const fromX=Number(el.dataset.fromX),fromY=Number(el.dataset.fromY),toX=Number(el.dataset.toX),toY=Number(el.dataset.toY);
   if(![fromX,fromY,toX,toY].every(Number.isFinite))continue;
   const start=Number(transfer.startDay)||0,finish=Math.max(start+1,Number(transfer.arrivalDay)||start+1),progress=Math.max(0,Math.min(1,(dayNow+dayFraction-start)/(finish-start)));
   el.setAttribute('transform',`translate(${fromX+(toX-fromX)*progress} ${fromY+(toY-fromY)*progress})`);
  }
  return true;
 }
 ensureMovementAnimationLoop(){
  if(this.destroyed||this.movementAnimationFrame)return;const tick=()=>{this.movementAnimationFrame=0;if(this.destroyed)return;if(this.updateMovingArmyAnimation())this.movementAnimationFrame=requestAnimationFrame(tick);};this.movementAnimationFrame=requestAnimationFrame(tick);
 }
 stopMovementAnimationLoop(){if(this.movementAnimationFrame){cancelAnimationFrame(this.movementAnimationFrame);this.movementAnimationFrame=0;}}
 scheduleRefresh(delay=this.interactionRefreshDelay||90){if(this.destroyed)return;this.cancelScheduledRefresh();this.deferredRefreshTimer=setTimeout(()=>{this.deferredRefreshTimer=null;if(!this.destroyed)this.refresh();},delay);}
 cancelScheduledRefresh(){if(this.deferredRefreshTimer!==null){clearTimeout(this.deferredRefreshTimer);this.deferredRefreshTimer=null;}}
 flushRefresh(){if(this.destroyed)return;this.cancelScheduledRefresh();this.refresh();}
 update(deferRefresh=false){if(!this.svg)return;this.applyViewBox();this.updateBorderZoomStyle();if(deferRefresh){this.scheduleRefresh();return;}this.cancelScheduledRefresh();this.refresh();}
 animateVisibleTerritoryCapture(changes){
  if(!changes.length||this.destroyed||typeof matchMedia=== 'function'&&matchMedia('(prefers-reduced-motion: reduce)').matches||document.hidden)return;
  const layer=this.svg.querySelector('#territory-capture-fx');if(!layer)return;
  for(const change of changes.slice(0,16)){
   if(this.captureGhosts.size>=16)break;
   const ghost=change.cell.cloneNode(false);
   ghost.removeAttribute('data-city');ghost.removeAttribute('data-realm');ghost.setAttribute('class','territory-capture-ghost');ghost.setAttribute('pointer-events','none');
   ghost.style.fill=change.oldFill;ghost.style.fillOpacity='1';
   layer.appendChild(ghost);this.captureGhosts.add(ghost);
   const dispose=()=>{this.captureGhosts.delete(ghost);ghost.remove();};
   if(typeof ghost.animate!=='function'){dispose();continue;}
   // Animate the old territory away without touching the simulation or rebuilding the map.
   const a=ghost.animate([{opacity:1},{opacity:0}],{duration:420,easing:'ease-out',fill:'forwards'});
   a.onfinish=dispose;a.oncancel=dispose;
  }
 }
 refresh(){if(!this.svg)return;this.cancelScheduledRefresh();const width=this.host.clientWidth||1000,height=this.host.clientHeight||600,unit=this.view.w/width,s=this.state,occupied=[];
  this.updateBorderZoomStyle();
  const screen=(x,y)=>({x:(x-this.view.x)/unit,y:(y-this.view.y)/unit});
  const showCityAreas=unit<.082,game=s.game||null,ownedCities=new Set(game?.ownedCityIds||[]),fogDetail=!!game?.fogOfWar&&showCityAreas,visibleCities=new Set(),visionSources=new Set(),playerCountry=game?.playerCountry||'',alliedCountries=new Set(game?.alliances||[]),rawOwner=c=>{const saved=game?.cityOwners?.[c.id];if(saved&&game?.playerColors?.[saved])return saved;return saved==='player'?playerCountry:(typeof saved==='string'&&saved?saved:c.country);},friendlyCountry=country=>!!country&&(country===playerCountry||country===game?.localPlayerId||alliedCountries.has(country));
  if(!game?.fogOfWar){for(const c of CITIES)visibleCities.add(c.id);}
  else{
   for(const c of CITIES){
    const owner=rawOwner(c),occupier=game?.occupations?.[c.id],friendlyOwner=friendlyCountry(owner),friendlyOccupier=friendlyCountry(occupier);
    if((friendlyOwner&&(!occupier||friendlyOccupier))||occupier===playerCountry)visionSources.add(c.id);
   }
   for(const [cityId,row] of Object.entries(game?.militaryByCity||{}))if(Number(row?.army)>0&&CITY_IDS.has(cityId))visionSources.add(cityId);
   for(const move of game?.movements||[])if(move?.side!=='enemy'&&CITY_IDS.has(move?.from))visionSources.add(move.from);
   const tacticalTopology=game?.tacticalFront&&this.campaignFrontTopology1300();
   for(const f of game?.tacticalFront?.formations||[])if(f.country===playerCountry||alliedCountries.has(f.country)){const n=tacticalTopology?.byId.get(f.node);if(n)visionSources.add(n.city);}
   for(const id of visionSources){visibleCities.add(id);for(const neighbour of this.cityAdjacency?.get(id)||[])visibleCities.add(neighbour);}
  }
  this.phaserVisibleCities=visibleCities;
  this.svg.style.setProperty('--player-realm-color',game?.playerColor||'#c6534d');
  const occupationPatternByCountry=new Map(),patternHost=this.svg.querySelector('#occupation-patterns'),occupiers=[...new Set(Object.values(game?.occupations||{}).filter(Boolean))];
  if(patternHost){patternHost.innerHTML=occupiers.map((country,i)=>{const id='occupation-stripes-'+i,realm=CITY_REALM_ALIASES.get(country)||country,color=game?.playerColors?.[country]||(country===game?.playerCountry?(game?.playerColor||'#c6534d'):colorForRealm(realm));occupationPatternByCountry.set(country,id);return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)"><rect width="9" height="9" fill="transparent"/><path d="M0 -2V11" stroke="${color}" stroke-width="3.2" stroke-opacity=".88"/></pattern>`;}).join('');}
  const captureChanges=[];
  for(const cell of this.svg.querySelectorAll('.city-territory-cell')){
   const id=cell.dataset.city,savedOwner=game?.cityOwners?.[id],humanColor=savedOwner?game?.playerColors?.[savedOwner]:null,isLocalMultiplayerOwner=!!game?.localPlayerId&&savedOwner===game.localPlayerId,isOwned=ownedCities.has(id)||isLocalMultiplayerOwner,isHumanOwned=!!humanColor,isVisible=visibleCities.has(id);
   const occNext=game?.occupations?.[id]||null,ownerNext=game?.cityOwners?.[id]||null;
   const previous=this.territoryVisualState.get(id),nextState={owner:ownerNext,occupier:occNext};
   if(game&&previous&&this.territoryVisiblePrevious.has(id)&&isVisible&&(previous.owner!==ownerNext||previous.occupier!==occNext)){
    captureChanges.push({cell,oldFill:window.getComputedStyle(cell).fill});
   }
   this.territoryVisualState.set(id,nextState);
   cell.classList.toggle('game-owned',!!game&&isOwned);cell.classList.toggle('game-player-owned',!!game&&isHumanOwned);
   cell.classList.toggle('game-visible',!!game&&!isOwned&&isVisible);
   const occupier=game?.occupations?.[id],occupationPattern=occupier?occupationPatternByCountry.get(occupier):null;
   cell.classList.toggle('game-hidden',!!game&&fogDetail&&!isVisible);cell.classList.toggle('game-battle',!!game?.battlesByCity?.[id]);cell.classList.toggle('game-siege',!!game?.siegesByCity?.[id]);cell.classList.toggle('game-occupied',!!occupier);
   if(occupationPattern&&(!fogDetail||isVisible)){cell.style.fill=`url(#${occupationPattern})`;cell.style.fillOpacity='.92';}
   else if(isHumanOwned){cell.style.fill=humanColor;cell.style.fillOpacity=isOwned?'.92':'.78';}
   else{cell.style.removeProperty('fill');cell.style.removeProperty('fill-opacity');}
  }
  this.animateVisibleTerritoryCapture(captureChanges);
  this.territoryVisiblePrevious=visibleCities;
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
  const showMilitary=!!game&&!game?.hideMilitary&&showCityAreas,showMovementRoutes=!!game&&showCityAreas&&(showMilitary||game?.showMovements);this.cityLabelBoxes=new Map();
  const orderedCityLabels=[...(this.cityTerritoryLabels||[])].sort((a,b)=>(b.dataset.cityLabel===s.selected)-(a.dataset.cityLabel===s.selected)||+(b.dataset.safeRadius||0)-+(a.dataset.safeRadius||0));
  for(const t of orderedCityLabels){
   const name=t.textContent||'',safe=+(t.dataset.safeRadius||0),safePx=safe/unit,ideal=name.length>18?12:name.length>12?13:14.5,cityId=t.dataset.cityLabel,fogVisible=!game?.fogOfWar||visibleCities.has(cityId);
   t.classList.toggle('game-owned-label',!!game&&ownedCities.has(cityId));
   t.style.display=showCityAreas&&fogVisible?'':'none';
   if(showCityAreas&&fogVisible){
    t.style.fontSize=(unit*ideal)+'px';t.style.strokeWidth=(unit*1.55)+'px';t.style.letterSpacing=(unit*.12)+'px';
    const measured=Math.max(1,t.getComputedTextLength()/unit),maxWidth=safePx*1.82,maxHeight=safePx*1.55,scale=Math.min(1,maxWidth/measured,maxHeight/(ideal*1.05)),px=ideal*scale;
    t.style.fontSize=(unit*px)+'px';
    const p=screen(+t.getAttribute('x'),+t.getAttribute('y')),w=t.getComputedTextLength()/unit,box={x:p.x-w/2-3,y:p.y-px*.58-2,w:w+6,h:px*1.16+4};
    const fits=px>=4.8,inView=box.x+box.w>0&&box.x<width&&box.y+box.h>0&&box.y<height,selected=cityId===s.selected,collision=!selected&&[...occupied,...this.cityLabelBoxes.values()].some(b=>overlaps(box,b));
    const visible=fits&&inView&&!collision;t.style.display=visible?'':'none';if(visible)this.cityLabelBoxes.set(cityId,box);
   }
  }
  this.svg.querySelectorAll('.sea-label').forEach(t=>{t.style.fontSize=(unit*12)+'px';t.style.letterSpacing=(unit*2)+'px';t.style.display=unit<.15?'none':'';});
  this.svg.querySelector('#cities').innerHTML=CITIES.map(c=>{
   const p=this.cityCenters?.get(c.id)||pos(c.mapLon??c.lon,c.mapLat??c.lat),q=screen(...p),selected=s.selected===c.id,territoryCity=this.cityTerritoryRealms?.has(cityRealm(c));
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
   if(!showMovementRoutes||!Array.isArray(game?.movements)||!game.movements.length)movementLayer.innerHTML='';
   else{
    const routePieces=[],dayDuration=Math.max(250,Number(game.dayDurationMs)||2000),dayNow=Number(game.day)||0,lastTick=Number(game.lastTickAt)||Date.now(),dayFraction=Math.max(0,Math.min(.999,(Date.now()-lastTick)/dayDuration));
    for(const move of game.movements){
     const enemy=move.side==='enemy';if(enemy&&!visibleCities.has(move.from)&&!visibleCities.has(move.to))continue;const fromAnchor=this.cityCenters?.get(move.from)||this.cityUnitAnchors?.get(move.from)?.point,toAnchor=this.cityCenters?.get(move.to)||this.cityUnitAnchors?.get(move.to)?.point;if(!fromAnchor||!toAnchor)continue;
     const visualStart=Number.isFinite(Number(move.visualStartDay))?Number(move.visualStartDay):(Number(move.startDay)||dayNow),span=Math.max(.001,(Number(move.finishDay)||dayNow+1)-visualStart),progress=Math.max(0,Math.min(1,(dayNow+dayFraction-visualStart)/span)),current=[fromAnchor[0]+(toAnchor[0]-fromAnchor[0])*progress,fromAnchor[1]+(toAnchor[1]-fromAnchor[1])*progress],remainingMs=Math.max(120,(1-progress)*span*dayDuration),route=Array.isArray(move.route)?move.route:[],idx=Math.max(0,Number(move.routeIndex)||0),future=route.slice(idx+1).map(id=>this.cityCenters?.get(id)||this.cityUnitAnchors?.get(id)?.point).filter(Boolean),pathPoints=[fromAnchor,...future];
     const d=pathPoints.length>1?'M'+pathPoints.map(p=>p[0].toFixed(3)+','+p[1].toFixed(3)).join('L'):'';
     if(d)routePieces.push(`<path class="army-route-line ${enemy?'enemy-route-line':''}" d="${d}" marker-end="url(#army-route-arrow)"/>`);
     const selected=!enemy&&game?.selectedArmyCity===move.from,scale=unit,relation=enemy?'enemy':'player';
     routePieces.push('<g class="army-map-marker moving-army-marker '+relation+'-army '+(selected?'selected-army':'')+'" data-move-id="'+esc(String(move.id))+'" '+(enemy?'pointer-events="none"':'data-unit-city="'+move.from+'"')+' transform="translate('+current[0]+' '+current[1]+')"><g transform="scale('+scale+')"><title>'+esc(move.name||'Army')+': '+compactMilitaryNumber(move.count)+' soldiers marching</title>'+(enemy?'':'<circle class="army-click-hitbox" cx="0" cy="0" r="28" fill="transparent" pointer-events="all"/>')+'<g class="army-travel-dots"><circle r="5" fill="'+(enemy?'#d4665e':'#e7c575')+'" stroke="#272f32" stroke-width="1.3"/><circle cx="-10" cy="4" r="3.1" fill="'+(enemy?'#d4665e':'#e7c575')+'" opacity=".8"/><circle cx="-18" cy="-3" r="2.2" fill="'+(enemy?'#d4665e':'#e7c575')+'" opacity=".6"/></g>'+unitBadge(compactMilitaryNumber(move.count),relation,16)+'</g></g>');
    }
    movementLayer.innerHTML=routePieces.join('');this.ensureMovementAnimationLoop();
   }
   if(!game?.movements?.length&&!game?.watchpostTransfers?.length)this.stopMovementAnimationLoop();
  }
  // Pseudo-3D government watchposts drawn on the real campaign map.
  // Placement is stored per province, separate from normal town buildings.
  const watchpostLayer=this.svg.querySelector('#watchpost-markers');
  if(watchpostLayer){
   const postVisualPositions=new Map();
   const postZoom=Math.max(0,Math.min(1,(500-(Number(this.view?.w)||0))/380));
   watchpostLayer.innerHTML=(postZoom>0&&showCityAreas?(game?.watchposts||[]):[]).filter(p=>ownedCities.has(p.cityId)&&(!fogDetail||visibleCities.has(p.cityId))).map(p=>{
    const city=CITY[p.cityId];if(!city)return '';
    const center=this.cityCenters?.get(p.cityId)||pos(city.lon,city.lat);
    const placement=[center[0]+(Math.max(0,Math.min(6,Number.isFinite(Number(p.x))?Number(p.x):3))-3)*2.5,center[1]+(Math.max(0,Math.min(4,Number.isFinite(Number(p.y))?Number(p.y):2))-2)*2.5];
    const geometry=this.cityCellGeometry?.get(p.cityId)?.poly;
    if(geometry?.length>=3&&!pointInPolygon(placement,geometry)){
     const safe=this.cityUnitAnchors?.get(p.cityId)?.point||center;
     for(let t=.92;t>=0;t-=.08){const candidate=[safe[0]+(placement[0]-safe[0])*t,safe[1]+(placement[1]-safe[1])*t];if(pointInPolygon(candidate,geometry)){placement[0]=candidate[0];placement[1]=candidate[1];break;}}
    }
    const x=placement[0],y=placement[1];postVisualPositions.set(String(p.id),[x,y]);
    const complete=(Number(game?.day)||0)>=(Number(p.readyDay)||Infinity);
    const text=complete?String(Math.floor(Number(p.men)||0)):Math.max(0,Number(p.readyDay)-Number(game?.day||0))+'d';
    return '<g class="campaign-watchpost" data-watchpost-id="'+p.id+'" transform="translate('+x.toFixed(2)+' '+y.toFixed(2)+') scale('+(0.42+postZoom*.42).toFixed(2)+')" opacity="'+(.25+postZoom*.75).toFixed(2)+'" pointer-events="none">'
     +'<title>Wachtpost '+p.id+' – '+(complete?p.men+' garnizoen':'in aanbouw, '+text)+'</title>'
     +'<image href="assets/phaser/watchpost.svg?v=20261025-pitched-gable-v1" x="-22" y="-25" width="44" height="51" preserveAspectRatio="xMidYMid meet"/>'
     +'<text x="0" y="30" text-anchor="middle" font-size="10" font-weight="800" fill="#fff0bb" stroke="#192d27" stroke-width="2.8" paint-order="stroke">'+text+'</text></g>';
   }).join('');
   const transports=(game?.watchpostTransfers||[]).filter(t=>ownedCities.has(t.cityId)&&(!fogDetail||visibleCities.has(t.cityId)));
   watchpostLayer.insertAdjacentHTML('beforeend',transports.map(t=>{
    const post=postVisualPositions.get(String(t.postId)),castle=this.cityCenters?.get(t.cityId);
    if(!post||!castle)return '';
    const outward=t.direction==='to-post',from=outward?castle:post,to=outward?post:castle;
    const count=Object.values(t.units||{}).reduce((n,x)=>n+Math.max(0,Number(x)||0),0);
    return '<g class="watchpost-transfer-marker" data-post-transfer-id="'+String(t.id).replace(/[^\w-]/g,'')+'" data-from-x="'+from[0]+'" data-from-y="'+from[1]+'" data-to-x="'+to[0]+'" data-to-y="'+to[1]+'" pointer-events="none"><title>'+count+' soldiers travelling '+(outward?'to watchpost':'to castle')+'</title><circle r="3.5" cy="-3" fill="#ecd6a2" stroke="#31544e" stroke-width="1.5"/><circle r="2.5" cx="5" cy="0" fill="#ecd6a2" stroke="#31544e" stroke-width="1"/></g>';
   }).join(''));
   if(transports.length)this.ensureMovementAnimationLoop();
  }
  // Province-scale equivalents of the sandbox's yellow attack arrows and defensive circles.
  // These decorations are drawn only where the player already has map vision.
  const frontLayer=this.svg.querySelector('#campaign-front-orders');
  if(frontLayer){
   if(!showCityAreas||!game?.frontOrders?.length)frontLayer.innerHTML='';
   else{
    const pieces=[];
    for(const order of game.frontOrders.slice(0,80)){
     if(!order||Number(order.expiresDay)<=Number(game.day)||!visibleCities.has(order.target))continue;
     if(order.type==='attack'&&!visibleCities.has(order.from))continue;
     const to=this.cityCenters?.get(order.target);
     if(!to)continue;
     if(order.type==='defend'){
      const radius=unit*22;
      pieces.push('<g class="front-defensive-zone" pointer-events="none"><title>Verdedigingsbevel: '+esc(CITY[order.target]?displayCityName(CITY[order.target]):order.target)+'</title><circle cx="'+to[0]+'" cy="'+to[1]+'" r="'+radius.toFixed(3)+'" fill="#79c8b2" fill-opacity=".10" stroke="#b9ead3" stroke-width="'+(unit*1.7).toFixed(3)+'" stroke-dasharray="'+(unit*5).toFixed(2)+' '+(unit*3).toFixed(2)+'"/></g>');
     }else if(order.type==='attack'){
      const from=this.cityCenters?.get(order.from);
      if(!from)continue;
      pieces.push('<g class="front-attack-order" pointer-events="none"><title>Aanvalsbevel richting '+esc(CITY[order.target]?displayCityName(CITY[order.target]):order.target)+'</title><path d="M'+from[0].toFixed(2)+' '+from[1].toFixed(2)+'L'+to[0].toFixed(2)+' '+to[1].toFixed(2)+'" fill="none" stroke="#ffe18a" stroke-width="'+(unit*2.4).toFixed(3)+'" stroke-dasharray="'+(unit*7).toFixed(2)+' '+(unit*3).toFixed(2)+'" marker-end="url(#army-route-arrow)"/></g>');
     }
    }
    frontLayer.innerHTML=pieces.join('');
   }
  }
  this.renderTacticalFront1300(game,visibleCities,unit,showCityAreas);
  const militaryLayer=this.svg.querySelector('#military-markers');
  if(militaryLayer){
   if(!showMilitary)militaryLayer.innerHTML='';
   else{
    const pieces=[],militaryBoxes=[];
    for(const c of CITIES){
     if(!visibleCities.has(c.id))continue;
     const owned=ownedCities.has(c.id),override=game?.militaryByCity?.[c.id],foreign=game?.foreignMilitaryByCity?.[c.id],battle=game?.battlesByCity?.[c.id]||null,siege=game?.siegesByCity?.[c.id]||null,occupied=!!game?.occupations?.[c.id],playerOverride=!!override&&Number(override.army)>0,foreignExtra=Math.max(0,Number(foreign?.army)||0),savedOwner=game?.cityOwners?.[c.id],mapOwner=savedOwner==='player'?game?.playerCountry:(typeof savedOwner==='string'&&savedOwner?savedOwner:c.country),foreignRelation=foreignExtra>0?((game?.wars||[]).includes(foreign?.country)?'enemy':(game?.alliances||[]).includes(foreign?.country)?'ally':'neutral'):null,relation=playerOverride?'player':(foreignRelation||mapArmyRelation(game,c,false)),baseStatic=game?.hideHistoricalMilitary?0:Math.max(0,Number(c.army)||0),fallbackArmy=battle||siege||occupied?0:(foreignExtra>0&&foreign?.country!==mapOwner?foreignExtra:baseStatic+foreignExtra),army=Math.max(0,Number(override?.army??fallbackArmy)||0),navy=Math.max(0,Number(override?.navy??c.navy)||0);
     const castle=this.cityCenters?.get(c.id)||this.cityUnitAnchors?.get(c.id)?.point;
      if(!castle)continue;
      const sq=screen(...castle);
      if(army>0&&sq.x>-45&&sq.y>-55&&sq.x<width+45&&sq.y<height+55){
       const selectedArmy=game?.selectedArmyCity===c.id;
       const marker=`<g class="army-map-marker castle-army-count ${relation}-army ${selectedArmy?'selected-army':''}" data-unit-city="${c.id}" transform="translate(${castle}) scale(${unit})"><title>${esc(displayCityName(c))}: ${compactMilitaryNumber(army)} soldiers</title><rect x="-25" y="1" width="50" height="23" fill="transparent" pointer-events="all"/>${unitBadge(compactMilitaryNumber(army),relation,15)}</g>`;
       pieces.push(marker);
      }
      if(battle&&Number(battle.enemyCount)>0){
       const count=compactMilitaryNumber(battle.enemyCount);
       pieces.push(`<g class="battle-enemy-marker enemy-army" transform="translate(${castle}) scale(${unit})" pointer-events="none"><title>${esc(battle.enemyCountry||'Enemy')}: ${count} soldiers</title>${unitBadge(count,'enemy',37)}</g>`);
      }
      if(navy>0){const coast=this.coastMarkerForCity(c);if(coast){const cq=screen(...coast);if(cq.x>-55&&cq.y>-55&&cq.x<width+55&&cq.y<height+55)pieces.push(`<g class="navy-map-marker" data-unit-city="${c.id}" transform="translate(${coast}) scale(${unit})"><title>${esc(displayCityName(c))}: ${compactMilitaryNumber(navy)} ships</title>${shipPiece(navy,owned)}</g>`);}}
    }
    militaryLayer.innerHTML=pieces.join('');
   }
  }
 }
 destroy(){this.phaserLayer?.destroy();this.destroyed=true;for(const ghost of this.captureGhosts||[])ghost.remove();this.captureGhosts?.clear();this.cancelScheduledRefresh();this.stopMovementAnimationLoop();this.abort.abort();this.resize.disconnect();}
}
