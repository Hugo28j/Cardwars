import {CITIES_1300 as CITIES,CITY_1300 as CITY} from './data1300.js?v=20260920-merge-frankfurt-into-mainz-v1';
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
// Every c.1300 city now gets the same territory treatment that France and Iberia already use.
// The active subset is intersected with the currently loaded atlas so unmatched/modern realms keep normal markers.
const CITY_TERRITORY_REALMS=new Set(CITIES.map(cityRealm));
const displayRealmName=name=>name==='Granada'?'Emirate of Granada':name;
const polygonPath=poly=>poly.length?'M'+poly.map(p=>p[0].toFixed(3)+','+p[1].toFixed(3)).join('L')+'Z':'';
const polygonBox=poly=>{const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const polygonCentroid=poly=>{let a=0,cx=0,cy=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],k=p[0]*q[1]-q[0]*p[1];a+=k;cx+=(p[0]+q[0])*k;cy+=(p[1]+q[1])*k;}if(Math.abs(a)<1e-8){const n=poly.length||1;return [poly.reduce((v,p)=>v+p[0],0)/n,poly.reduce((v,p)=>v+p[1],0)/n];}return [cx/(3*a),cy/(3*a)];};
const pointInPolygon=(p,poly)=>{let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j],cross=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]);if(cross)inside=!inside;}return inside;};
const visibleCellMetrics=(poly,landPolys,fallback)=>{const box=polygonBox(poly),pts=[],steps=20;for(let iy=0;iy<=steps;iy++){for(let ix=0;ix<=steps;ix++){const p=[box.x+box.w*ix/steps,box.y+box.h*iy/steps];if(!pointInPolygon(p,poly)||!landPolys.some(land=>pointInPolygon(p,land)))continue;pts.push(p);}}if(!pts.length)return {center:fallback,box:{x:fallback[0]-4,y:fallback[1]-4,w:8,h:8}};const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);return {center:[pts.reduce((v,p)=>v+p[0],0)/pts.length,pts.reduce((v,p)=>v+p[1],0)/pts.length],box:{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};};
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
const cache={};
let physicalLandCache;
export class WorldMap{
 constructor(host,state,onSelect,onRegion){
  this.host=host;this.state=state;this.onSelect=onSelect;this.onRegion=onRegion;this.mode='historical';this.view={x:100,y:220,w:750,h:600};this.pointers=new Map();this.destroyed=false;this.drawn=false;
  host.innerHTML=`<svg id="world-map" role="img" aria-label="Political map of Europe around 1300 CE. Drag to pan, scroll or pinch to zoom. In detailed regions, left click a city territory and right click a country." tabindex="0"><defs><pattern id="ocean-grid" width="120" height="150" patternUnits="userSpaceOnUse"><path d="M120 0H0V150" fill="none" stroke="#d6e0c7" stroke-opacity=".06" stroke-width=".7"/></pattern></defs><rect x="-5000" y="-5000" width="15000" height="15000" fill="#192c32"/><rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#ocean-grid)"/><g id="land"></g><g id="city-territories"></g><g id="realm-labels"></g><g id="city-territory-labels"></g><g id="sea-labels"></g><g id="cities"></g></svg><div class="map-top"><div class="map-heading"><span class="eyebrow">EUROPE & ANATOLIA</span><span>${CITIES.length} researched city cards · political map c. 1300 CE</span></div><div class="map-era-badge">REALMS · c. 1300 CE</div></div><div class="map-bottom"><span class="map-hint">Drag to explore · detailed regions: left click city territory · right click country</span><span id="map-attribution" class="map-attribution">Approximate 1300 borders · Historical Basemaps · Natural Earth coastline</span><span class="map-key"><i></i> Researched 1300 city card</span></div><div class="map-controls"><button data-map="in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button><button data-map="out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button><button data-map="selected" title="Focus selected city" aria-label="Focus selected city">${icon('target')}</button><button data-map="all" title="Show map overview" aria-label="Show map overview">${icon('globe')}</button></div><div class="map-compass" aria-hidden="true"><span>N</span><i></i></div><div class="map-loading">Unfolding the atlas…</div>`;
  this.svg=host.querySelector('svg');this.abort=new AbortController();const opts={signal:this.abort.signal};
  this.svg.addEventListener('wheel',e=>{e.preventDefault();const r=this.svg.getBoundingClientRect();this.zoom(Math.exp(e.deltaY*.0013),(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);},{...opts,passive:false});
  this.svg.addEventListener('pointerdown',e=>{if(e.button===2)return;this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragStart={x:e.clientX,y:e.clientY};this.dragged=false;this.svg.setPointerCapture(e.pointerId);},opts);
  this.svg.addEventListener('pointermove',e=>{if(!this.pointers.has(e.pointerId))return;const old=this.pointers.get(e.pointerId),next={x:e.clientX,y:e.clientY};
   if(this.pointers.size===2){const other=[...this.pointers.entries()].find(([id])=>id!==e.pointerId)[1],before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(next.x-other.x,next.y-other.y),r=this.svg.getBoundingClientRect();if(after)this.zoom(before/after,((next.x+other.x)/2-r.left)/r.width,((next.y+other.y)/2-r.top)/r.height);this.dragged=true;}
   else{const r=this.svg.getBoundingClientRect();this.view.x-=(next.x-old.x)*this.view.w/r.width;this.view.y-=(next.y-old.y)*this.view.h/r.height;if(Math.hypot(next.x-this.dragStart.x,next.y-this.dragStart.y)>5)this.dragged=true;this.update();}this.pointers.set(e.pointerId,next);
  },opts);
  const release=e=>{const tracked=this.pointers.has(e.pointerId);this.pointers.delete(e.pointerId);if(this.svg.hasPointerCapture(e.pointerId))this.svg.releasePointerCapture(e.pointerId);if(e.type==='pointerup'&&tracked&&!this.dragged){const target=document.elementFromPoint(e.clientX,e.clientY);if(target)this.pick(target,'primary',e);}};
  this.svg.addEventListener('pointerup',release,opts);this.svg.addEventListener('pointercancel',release,opts);this.svg.addEventListener('contextmenu',e=>{e.preventDefault();this.pick(e.target,'country',e);},opts);this.svg.addEventListener('pointerover',e=>{const t=e.target.closest?.('.territory[data-realm]');if(!t)return;const realm=t.dataset.realm;this.svg.querySelectorAll('.territory.realm-hover').forEach(n=>n.classList.remove('realm-hover'));this.svg.querySelectorAll('.territory[data-realm="'+CSS.escape(realm)+'"]').forEach(n=>n.classList.add('realm-hover'));},opts);this.svg.addEventListener('pointerout',e=>{const from=e.target.closest?.('.territory[data-realm]');if(!from)return;const to=e.relatedTarget?.closest?.('.territory[data-realm]');if(to&&to.dataset.realm===from.dataset.realm)return;this.svg.querySelectorAll('.territory.realm-hover').forEach(n=>n.classList.remove('realm-hover'));},opts);
  this.svg.addEventListener('keydown',e=>{if(['+','=','-'].includes(e.key)){e.preventDefault();this.zoom(e.key==='-'?1.25:.8);}else if(e.key.startsWith('Arrow')){e.preventDefault();const d=this.view.w*.08;if(e.key==='ArrowLeft')this.view.x-=d;if(e.key==='ArrowRight')this.view.x+=d;if(e.key==='ArrowUp')this.view.y-=d;if(e.key==='ArrowDown')this.view.y+=d;this.update();}},opts);
  host.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;const a=b.dataset.map;if(a==='in')this.zoom(.75);if(a==='out')this.zoom(1.3);if(a==='selected')this.focus(state.selected);if(a==='all')this.fit();if(['modern','historical'].includes(a)&&this.mode!==a){this.mode=a;host.querySelectorAll('.map-modes button').forEach(b=>b.classList.toggle('active',b.dataset.map===a));this.load(false);}},opts);
  this.resize=new ResizeObserver(()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;const cy=this.view.y+this.view.h/2,overview=this.overviewWidth&&Math.abs(this.view.w-this.overviewWidth)<1;if(overview){this.fit();return;}this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*r.width/r.height);this.view.h=this.view.w*r.height/r.width;this.view.y=cy-this.view.h/2;this.update();});this.resize.observe(host);this.load(true);
 }
 async load(fit){
  const mode=this.mode;
  try{cache[mode]??=fetch(mode==='modern'?'assets/modern-atlas.json?v=20260920-aquileia-venice-coast-fix-v1':'assets/atlas.json?v=20260920-merge-frankfurt-into-mainz-v1').then(r=>{if(!r.ok)throw new Error('Missing atlas');return r.json();});physicalLandCache??=fetch('assets/map-land.json?v=20260920-aquileia-venice-coast-fix-v1').then(r=>r.ok?r.json():{d:''}).catch(()=>({d:''}));const [atlas,physicalLand]=await Promise.all([cache[mode],physicalLandCache]);this.realmInfo=new Map(atlas.map(f=>[realmOf(f),f]));if(this.destroyed||this.mode!==mode)return;
   const atlasRealms=new Set(atlas.filter(f=>!f.outline&&!f.underlay).map(realmOf));
   this.cityTerritoryRealms=new Set([...CITY_TERRITORY_REALMS].filter(realm=>atlasRealms.has(realm)));
   const territoryMarkup=atlas.filter(f=>!f.outline).map((f,i,arr)=>{const realm=realmOf(f),mainIndex=arr.findIndex(g=>!g.underlay&&realmOf(g)===realm),fill=(mode==='historical'?colorForRealm(realm):palettes[((f.underlay&&mainIndex>=0)?mainIndex:i)%palettes.length]),outline=f.underlay?'':withoutIslandStroke(f.d),cleaned=!f.underlay&&outline!==f.d,stroke=f.underlay||cleaned?'none':'#28372e',sw=f.underlay||cleaned?'0':'.85',base=`<path class="territory ${f.detail?'detail-polity':''} ${this.cityTerritoryRealms.has(realm)?'city-region-realm':''} ${IBERIA_REALMS.has(realm)?'iberia-realm':''} ${f.underlay?'territory-underlay':''}" data-realm="${esc(realm)}" data-detail="${f.detail?'1':'0'}" d="${f.d}" fill="${fill}" fill-rule="evenodd" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" vector-effect="non-scaling-stroke"><title>${esc(f.name||'Local communities')}</title></path>`;if(!cleaned)return base;return base+(outline?`<path d="${outline}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'');}).join('');
   const cleanIslandCoast=islandLandOutline(physicalLand.d),cleanIslandBorders=sharedIslandBorders(atlas),realmSeamCovers=sameRealmSeamCovers(atlas,mode);
   this.svg.querySelector('#land').innerHTML=territoryMarkup+(cleanIslandCoast?`<path d="${cleanIslandCoast}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'')+(cleanIslandBorders?`<path d="${cleanIslandBorders}" fill="none" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" pointer-events="none"/>`:'')+realmSeamCovers;
   this.buildCityTerritories(atlas);
   const labels=[...historicalLabels.map(([name,x,y,level=1])=>({name,x,y,level,kind:level===1?'major':'polity',realm:HISTORICAL_LABEL_REALMS.get(name)||''})),...atlas.filter(f=>f.label).map(f=>({name:f.label,x:f.lx,y:f.ly,level:f.labelLevel||2,kind:f.outline?'umbrella':'polity',realm:f.outline?'':realmOf(f)}))];this.svg.querySelector('#realm-labels').innerHTML=labels.map(({name,x,y,level,kind,realm})=>{const p=pos(x,y);return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" data-level="${level}" data-kind="${kind}" data-realm-label="${esc(realm)}" class="realm-label">${esc(name)}</text>`;}).join('');
   this.realmLabels=[...this.svg.querySelectorAll('.realm-label')].sort((a,b)=>+(a.dataset.level)-+(b.dataset.level));
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
  if(c){this.onSelect(c.dataset.city);return;}
  if(r){
   const realm=r.dataset.realm;
   if(this.cityTerritoryRealms?.has(realm)&&event){
    const city=this.nearestCityInRealm(realm,event.clientX,event.clientY);
    if(city){this.onSelect(city.id);return;}
   }
   if(this.onRegion)this.onRegion({name:displayRealmName(realm),realm,detail:r.dataset.detail==='1',mode:'historical',gameplayNote:this.realmInfo?.get(realm)?.gameplayNote});
  }
 }
 mapPoint(clientX,clientY){const r=this.svg.getBoundingClientRect();return {x:this.view.x+(clientX-r.left)/Math.max(1,r.width)*this.view.w,y:this.view.y+(clientY-r.top)/Math.max(1,r.height)*this.view.h};}
 nearestCityInRealm(realm,clientX,clientY){
  const p=this.mapPoint(clientX,clientY),cities=CITIES.filter(c=>cityRealm(c)===realm);
  let best=null,bestD=Infinity;
  for(const c of cities){const q=pos(c.mapLon??c.lon,c.mapLat??c.lat),dx=q[0]-p.x,dy=q[1]-p.y,d=dx*dx+dy*dy;if(d<bestD){bestD=d;best=c;}}
  return best;
 }
 buildCityTerritories(atlas){
  const defs=this.svg.querySelector('defs'),territoryLayer=this.svg.querySelector('#city-territories'),labelLayer=this.svg.querySelector('#city-territory-labels');
  defs.querySelectorAll('.city-territory-dynamic,.iberia-dynamic').forEach(n=>n.remove());territoryLayer.innerHTML='';labelLayer.innerHTML='';this.cityTerritoryLabels=[];
  for(const realm of this.cityTerritoryRealms||[]){
   const features=atlas.filter(f=>!f.outline&&!f.underlay&&realmOf(f)===realm);if(!features.length)continue;
   const realmD=features.map(f=>f.d).join(''),realmPolys=svgSubpaths(realmD).map(svgSubpathPoints).filter(p=>p.length>=3);if(!realmPolys.length)continue;
   const cities=CITIES.filter(c=>cityRealm(c)===realm),points=cities.map(c=>pos(c.mapLon??c.lon,c.mapLat??c.lat));if(!cities.length)continue;
   const allPts=realmPolys.flat(),xs=allPts.map(p=>p[0]),ys=allPts.map(p=>p[1]),pad=4;
   let box={x:Math.min(...xs)-pad,y:Math.min(...ys)-pad,w:Math.max(...xs)-Math.min(...xs)+pad*2,h:Math.max(...ys)-Math.min(...ys)+pad*2};
   if(realm==='Kingdom of England'){
    const px=points.map(p=>p[0]),py=points.map(p=>p[1]),scopePad=14;
    box={x:Math.min(...px)-scopePad,y:Math.min(...py)-scopePad,w:Math.max(...px)-Math.min(...px)+scopePad*2,h:Math.max(...py)-Math.min(...py)+scopePad*2};
   }
   const realmClip='city-realm-'+realm.toLowerCase().replace(/[^a-z0-9]+/g,'-');
   defs.insertAdjacentHTML('beforeend',`<clipPath class="city-territory-dynamic" id="${realmClip}"><path d="${realmD}" fill-rule="evenodd"/></clipPath>`);
   const componentForPoint=p=>{for(let i=0;i<realmPolys.length;i++)if(pointInPolygon(p,realmPolys[i]))return i;return -1;};
   const components=points.map(componentForPoint);
   const cells=cities.map((c,i)=>{const poly=voronoiCell(points[i],points,box),component=components[i],metricPolys=component>=0?[realmPolys[component]]:realmPolys,metrics=visibleCellMetrics(poly,metricPolys,points[i]);return {c,poly,component,cellBox:metrics.box,labelPoint:metrics.center};});
   const paths=cells.map(({c,poly})=>`<path class="city-territory-cell" data-city="${c.id}" data-realm="${esc(realm)}" d="${polygonPath(poly)}"><title>${esc(displayCityName(c))} · ${esc(displayRealmName(realm))}</title></path>`).join('');
   const blockerGroups=atlas.filter(f=>!f.outline&&!f.underlay&&realmOf(f)!==realm).map(f=>svgSubpaths(f.d).map(svgSubpathPoints).filter(p=>p.length>=3)).filter(polys=>polys.length);
   const componentByCity=new Map(cells.map(x=>[x.c.id,x.component]));
   let borderPaths='';
   for(const edge of sharedCellEdges(cells)){
    const key=cityBorderKey(realm,edge.cities[0],edge.cities[1]);if(CITY_BORDER_SKIP.has(key)||CITY_BORDER_MANUAL.has(key))continue;
    const ca=componentByCity.get(edge.cities[0]),cb=componentByCity.get(edge.cities[1]);
    // If both cities live on different disconnected land pieces (islands / opposite shores),
    // the sea is already the separator: do not invent an extra city border.
    if(ca>=0&&cb>=0&&ca!==cb)continue;
    const frags=mergeNearbyFragments(segmentVisibleFragments(edge.a,edge.b,realmPolys,blockerGroups)).map(trimRealmFragment).filter(Boolean);
    borderPaths+=frags.map(f=>`<path class="city-territory-border" d="M${f.a[0].toFixed(3)},${f.a[1].toFixed(3)}L${f.b[0].toFixed(3)},${f.b[1].toFixed(3)}"/>`).join('');
   }
   for(const [key,d] of CITY_BORDER_MANUAL)if(key.startsWith(realm+'|'))borderPaths+=`<path class="city-territory-border city-territory-border-manual" d="${d}"/>`;
   territoryLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${realmClip})">${paths}${borderPaths}</g>`);
   for(const {c,poly,cellBox,labelPoint} of cells){
    const cellClip='city-cell-'+c.id.replace(/[^a-z0-9-]/gi,'-');
    defs.insertAdjacentHTML('beforeend',`<clipPath class="city-territory-dynamic" id="${cellClip}"><path d="${polygonPath(poly)}"/></clipPath>`);
    const angle=IBERIA_LABEL_ANGLES[c.id]||0;
    labelLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${realmClip})"><g clip-path="url(#${cellClip})"><text x="${labelPoint[0]}" y="${labelPoint[1]}" text-anchor="middle" dominant-baseline="central" transform="rotate(${angle} ${labelPoint[0]} ${labelPoint[1]})" class="city-area-label" data-city-label="${c.id}" data-cell-w="${cellBox.w}" data-cell-h="${cellBox.h}">${esc(displayCityName(c))}</text></g></g>`);
   }
  }
  this.cityTerritoryLabels=[...labelLayer.querySelectorAll('.city-area-label')];
 }
 zoom(f,fx=.5,fy=.5){const w=Math.max(28,Math.min(this.overviewWidth||900,this.view.w*f)),r=w/this.view.w;this.view.x+=this.view.w*fx*(1-r);this.view.y+=this.view.h*fy*(1-r);this.view.w=w;this.view.h*=r;this.update();}
 focus(id){this.focusRequest=id;const c=CITY[id];if(!c)return;const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),r=this.host.getBoundingClientRect();this.view.w=310;this.view.h=310*r.height/Math.max(1,r.width);this.view.x=p[0]-this.view.w/2;this.view.y=p[1]-this.view.h/2;this.update();}
 fit(){this.focusRequest=null;const r=this.host.getBoundingClientRect(),aspect=r.width/Math.max(1,r.height);this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*aspect);this.view.w=this.overviewWidth;this.view.h=this.view.w/aspect;this.view.x=bounds.x+(bounds.w-this.view.w)/2;this.view.y=bounds.y+(bounds.h-this.view.h)/2;this.update();}
 update(){if(!this.svg)return;const v=this.view;
  v.x=v.w>=bounds.w?bounds.x+(bounds.w-v.w)/2:Math.max(bounds.x,Math.min(bounds.x+bounds.w-v.w,v.x));
  v.y=v.h>=bounds.h?bounds.y+(bounds.h-v.h)/2:Math.max(bounds.y,Math.min(bounds.y+bounds.h-v.h,v.y));
  this.svg.setAttribute('viewBox',`${v.x} ${v.y} ${v.w} ${v.h}`);this.refresh();}
 refresh(){const width=this.host.clientWidth||1000,height=this.host.clientHeight||600,unit=this.view.w/width,s=this.state,occupied=[];
  const screen=(x,y)=>({x:(x-this.view.x)/unit,y:(y-this.view.y)/unit});
  const showCityAreas=unit<.082;
  // Country / polity names hand over to city-territory names at the exact same zoom level.
  for(const t of this.realmLabels||[]){
   const level=+(t.dataset.level||1),umbrella=t.dataset.kind==='umbrella';
   const eligible=level===1||(level===2&&unit<.48)||(level>=3&&unit<.20);
   const p=screen(+t.getAttribute('x'),+t.getAttribute('y'));
   t.style.display='';
   const px=(umbrella?11:level===1?13:level===2?12:11)*Math.min(1,Math.max(.68,.8/unit));
   t.style.fontSize=(unit*px)+'px';t.style.letterSpacing=(unit*(umbrella?1.5:.65))+'px';t.style.strokeWidth=(unit*2.5)+'px';t.style.opacity=umbrella?'.6':'1';
   const w=t.getComputedTextLength()/unit,box={x:p.x-w/2-4,y:p.y-px-3,w:w+8,h:px+7};
   const inView=box.x+box.w>0&&box.x<width&&box.y+box.h>0&&box.y<height;
   const territoryCountry=!!t.dataset.realmLabel&&this.cityTerritoryRealms?.has(t.dataset.realmLabel);
   const show=eligible&&inView&&(level===1||!occupied.some(b=>overlaps(box,b)))&&!(territoryCountry&&showCityAreas);
   t.style.display=show?'':'none';if(show)occupied.push(box);
  }
  for(const t of this.cityTerritoryLabels||[]){
   const cellW=+(t.dataset.cellW||0)/unit,cellH=+(t.dataset.cellH||0)/unit,name=t.textContent||'';
   const ideal=name.length>15?12.5:14.5,maxW=cellW*.90/Math.max(1,name.length*.54),maxH=cellH*.46;
   const px=Math.max(6.2,Math.min(ideal,maxW,maxH));
   t.style.display=showCityAreas?'':'none';
   if(showCityAreas){t.style.fontSize=(unit*px)+'px';t.style.strokeWidth=(unit*1.45)+'px';t.style.letterSpacing=(unit*.18)+'px';}
  }
  this.svg.querySelectorAll('.sea-label').forEach(t=>{t.style.fontSize=(unit*12)+'px';t.style.letterSpacing=(unit*2)+'px';t.style.display=unit<.15?'none':'';});
  const cities=[...CITIES].sort((a,b)=>(s.selected===b.id?100:0)+b.rarity-((s.selected===a.id?100:0)+a.rarity));
  this.svg.querySelector('#cities').innerHTML=cities.map(c=>{
   const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),q=screen(...p),selected=s.selected===c.id,territoryCity=this.cityTerritoryRealms?.has(cityRealm(c));
   if(q.x<-20||q.y<-20||q.x>width+20||q.y>height+20)return '';
   const box={x:q.x+10,y:q.y-10,w:displayCityName(c).length*7+6,h:21};
   const forceLabel=c.id==='1300-quimper'&&unit<.34;const show=selected||forceLabel||(unit<.30&&!occupied.some(b=>overlaps(box,b)));
   if(show)occupied.push(box);
   const size=selected||unit<.3?4:2;
   if(territoryCity)return '';
   return `<g class="city-marker owned" data-city="${c.id}" data-realm="${esc(cityRealm(c))}" transform="translate(${p}) scale(${unit})"><title>${esc(displayCityName(c))} · ${esc(c.country)} · researched 1300 card</title><circle r="9" fill="transparent"/>${selected?'<circle r="10" fill="none" stroke="#f3d9a2" stroke-width="1.2"/>':''}<path d="M0 -${size} ${size} 0 0 ${size} -${size} 0Z" fill="#f8d791" stroke="#283d32" stroke-width="1"/>${(!territoryCity&&show)?`<text x="10" y="4" class="city-label owned">${esc(displayCityName(c))}</text>`:''}</g>`;
  }).reverse().join('');
 }
 destroy(){this.destroyed=true;this.abort.abort();this.resize.disconnect();}
}
