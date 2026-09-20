import {CITIES_1300 as CITIES,CITY_1300 as CITY} from './data1300.js?v=20260920-quimper-perigueux';
import {icon} from './icons.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pos=(lon,lat)=>[(lon+22)*12,(72-lat)*15];
const historicalLabels=[
 ['FRANCE',1.9,46.65,1],['ENGLAND',-1.5,52.5,1],['SCOTLAND',-4,56.8,1],
 ['PORTUGAL',-8,39.4,1],['CASTILE',-4.5,40.1,1],['ARAGON',.3,41.2,1],
 ['NAVARRE',-1.7,42.7,2],['GRANADA',-4.6,36.8,2],
 ['POLAND',19,52,1],['LITHUANIA',25,54.5,1],['TEUTONIC ORDER',20.5,54,2],
 ['HUNGARY',20,47,1],['SERBIA',20.4,43.5,2],['BULGARIA',25.3,43.2,2]
];
const bounds={x:120,y:180,w:684,h:390};
const overlaps=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const palettes=['#879372','#8b7890','#a38d65','#728fa1','#9c8172','#738f82','#9c966f','#8b9a8b','#947b68','#6f8793','#947b8a','#7d946f'];
const realmOf=f=>f.realm||f.name||'Local communities';
const IBERIA_REALMS=new Set(['Kingdom of Portugal','Crown of Castile','Crown of Aragon','Kingdom of Navarre','Granada','Andorra','Roussillon']);
const cityRealm=c=>c.country==='Emirate of Granada'?'Granada':c.country;
const isIberianCity=c=>IBERIA_REALMS.has(cityRealm(c));
const displayRealmName=name=>name==='Granada'?'Emirate of Granada':name;
const polygonPath=poly=>poly.length?'M'+poly.map(p=>p[0].toFixed(3)+','+p[1].toFixed(3)).join('L')+'Z':'';
const polygonBox=poly=>{const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const polygonCentroid=poly=>{let a=0,cx=0,cy=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],k=p[0]*q[1]-q[0]*p[1];a+=k;cx+=(p[0]+q[0])*k;cy+=(p[1]+q[1])*k;}if(Math.abs(a)<1e-8){const n=poly.length||1;return [poly.reduce((v,p)=>v+p[0],0)/n,poly.reduce((v,p)=>v+p[1],0)/n];}return [cx/(3*a),cy/(3*a)];};
const pointInPolygon=(p,poly)=>{let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j],cross=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]);if(cross)inside=!inside;}return inside;};
const visibleCellMetrics=(poly,land,fallback)=>{const box=polygonBox(poly),pts=[],steps=20;for(let iy=0;iy<=steps;iy++){for(let ix=0;ix<=steps;ix++){const p=[box.x+box.w*ix/steps,box.y+box.h*iy/steps];if(!pointInPolygon(p,poly))continue;let onLand=false;try{onLand=land.isPointInFill(new DOMPoint(p[0],p[1]));}catch{onLand=true;}if(onLand)pts.push(p);}}if(!pts.length)return {center:fallback,box:{x:fallback[0]-4,y:fallback[1]-4,w:8,h:8}};const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);return {center:[pts.reduce((v,p)=>v+p[0],0)/pts.length,pts.reduce((v,p)=>v+p[1],0)/pts.length],box:{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};};
const clipHalfPlane=(poly,a,b,c)=>{const out=[];if(!poly.length)return out;const inside=p=>a*p[0]+b*p[1]<=c+1e-7;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],pin=inside(p),qin=inside(q);if(pin)out.push(p);if(pin!==qin){const dx=q[0]-p[0],dy=q[1]-p[1],den=a*dx+b*dy;if(Math.abs(den)>1e-9){const t=(c-a*p[0]-b*p[1])/den;out.push([p[0]+dx*t,p[1]+dy*t]);}}}return out;};
const voronoiCell=(point,others,box)=>{let poly=[[box.x,box.y],[box.x+box.w,box.y],[box.x+box.w,box.y+box.h],[box.x,box.y+box.h]];for(const other of others){if(other===point)continue;const a=other[0]-point[0],b=other[1]-point[1],c=(other[0]*other[0]+other[1]*other[1]-point[0]*point[0]-point[1]*point[1])/2;poly=clipHalfPlane(poly,a,b,c);if(!poly.length)break;}return poly;};
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
export class WorldMap{
 constructor(host,state,onSelect,onRegion){
  this.host=host;this.state=state;this.onSelect=onSelect;this.onRegion=onRegion;this.mode='historical';this.view={x:100,y:220,w:750,h:600};this.pointers=new Map();this.destroyed=false;this.drawn=false;
  host.innerHTML=`<svg id="world-map" role="img" aria-label="Political map of Europe around 1300 CE. Drag to pan, scroll or pinch to zoom. In Iberia, left click a city territory and right click a country." tabindex="0"><defs><pattern id="ocean-grid" width="120" height="150" patternUnits="userSpaceOnUse"><path d="M120 0H0V150" fill="none" stroke="#d6e0c7" stroke-opacity=".06" stroke-width=".7"/></pattern></defs><rect x="-5000" y="-5000" width="15000" height="15000" fill="#192c32"/><rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#ocean-grid)"/><g id="land"></g><g id="city-territories"></g><g id="realm-labels"></g><g id="city-territory-labels"></g><g id="sea-labels"></g><g id="cities"></g></svg><div class="map-top"><div class="map-heading"><span class="eyebrow">EUROPE & ANATOLIA</span><span>${CITIES.length} researched city cards · political map c. 1300 CE</span></div><div class="map-era-badge">REALMS · c. 1300 CE</div></div><div class="map-bottom"><span class="map-hint">Drag to explore · Iberia: left click city territory · right click country</span><span id="map-attribution" class="map-attribution">Approximate 1300 borders · Historical Basemaps · Natural Earth coastline</span><span class="map-key"><i></i> Researched 1300 city card</span></div><div class="map-controls"><button data-map="in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button><button data-map="out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button><button data-map="selected" title="Focus selected city" aria-label="Focus selected city">${icon('target')}</button><button data-map="all" title="Show map overview" aria-label="Show map overview">${icon('globe')}</button></div><div class="map-compass" aria-hidden="true"><span>N</span><i></i></div><div class="map-loading">Unfolding the atlas…</div>`;
  this.svg=host.querySelector('svg');this.abort=new AbortController();const opts={signal:this.abort.signal};
  this.svg.addEventListener('wheel',e=>{e.preventDefault();const r=this.svg.getBoundingClientRect();this.zoom(Math.exp(e.deltaY*.0013),(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);},{...opts,passive:false});
  this.svg.addEventListener('pointerdown',e=>{if(e.button===2)return;this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragStart={x:e.clientX,y:e.clientY};this.dragged=false;this.svg.setPointerCapture(e.pointerId);},opts);
  this.svg.addEventListener('pointermove',e=>{if(!this.pointers.has(e.pointerId))return;const old=this.pointers.get(e.pointerId),next={x:e.clientX,y:e.clientY};
   if(this.pointers.size===2){const other=[...this.pointers.entries()].find(([id])=>id!==e.pointerId)[1],before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(next.x-other.x,next.y-other.y),r=this.svg.getBoundingClientRect();if(after)this.zoom(before/after,((next.x+other.x)/2-r.left)/r.width,((next.y+other.y)/2-r.top)/r.height);this.dragged=true;}
   else{const r=this.svg.getBoundingClientRect();this.view.x-=(next.x-old.x)*this.view.w/r.width;this.view.y-=(next.y-old.y)*this.view.h/r.height;if(Math.hypot(next.x-this.dragStart.x,next.y-this.dragStart.y)>5)this.dragged=true;this.update();}this.pointers.set(e.pointerId,next);
  },opts);
  const release=e=>{const tracked=this.pointers.has(e.pointerId);this.pointers.delete(e.pointerId);if(this.svg.hasPointerCapture(e.pointerId))this.svg.releasePointerCapture(e.pointerId);if(e.type==='pointerup'&&tracked&&!this.dragged){const target=document.elementFromPoint(e.clientX,e.clientY);if(target)this.pick(target,'primary',e);}};
  this.svg.addEventListener('pointerup',release,opts);this.svg.addEventListener('pointercancel',release,opts);this.svg.addEventListener('contextmenu',e=>{e.preventDefault();this.pick(e.target,'country',e);},opts);
  this.svg.addEventListener('keydown',e=>{if(['+','=','-'].includes(e.key)){e.preventDefault();this.zoom(e.key==='-'?1.25:.8);}else if(e.key.startsWith('Arrow')){e.preventDefault();const d=this.view.w*.08;if(e.key==='ArrowLeft')this.view.x-=d;if(e.key==='ArrowRight')this.view.x+=d;if(e.key==='ArrowUp')this.view.y-=d;if(e.key==='ArrowDown')this.view.y+=d;this.update();}},opts);
  host.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;const a=b.dataset.map;if(a==='in')this.zoom(.75);if(a==='out')this.zoom(1.3);if(a==='selected')this.focus(state.selected);if(a==='all')this.fit();if(['modern','historical'].includes(a)&&this.mode!==a){this.mode=a;host.querySelectorAll('.map-modes button').forEach(b=>b.classList.toggle('active',b.dataset.map===a));this.load(false);}},opts);
  this.resize=new ResizeObserver(()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;const cy=this.view.y+this.view.h/2,overview=this.overviewWidth&&Math.abs(this.view.w-this.overviewWidth)<1;if(overview){this.fit();return;}this.overviewWidth=Math.max(bounds.w+30,(bounds.h+70)*r.width/r.height);this.view.h=this.view.w*r.height/r.width;this.view.y=cy-this.view.h/2;this.update();});this.resize.observe(host);this.load(true);
 }
 async load(fit){
  const mode=this.mode;
  try{cache[mode]??=fetch(mode==='modern'?'assets/modern-atlas.json?v=20260920-quimper-perigueux':'assets/atlas.json?v=20260920-quimper-perigueux').then(r=>{if(!r.ok)throw new Error('Missing atlas');return r.json();});const atlas=await cache[mode];this.realmInfo=new Map(atlas.map(f=>[realmOf(f),f]));if(this.destroyed||this.mode!==mode)return;
   this.svg.querySelector('#land').innerHTML=atlas.filter(f=>!f.outline).map((f,i)=>`<path class="territory ${f.detail?'detail-polity':''} ${IBERIA_REALMS.has(realmOf(f))?'iberia-realm':''}" data-realm="${esc(realmOf(f))}" data-detail="${f.detail?'1':'0'}" d="${f.d}" fill="${mode==='historical'?colorForRealm(realmOf(f)):palettes[i%palettes.length]}" fill-rule="evenodd" stroke="#28372e" stroke-width=".85" stroke-linejoin="round" vector-effect="non-scaling-stroke"><title>${esc(f.name||'Local communities')}</title></path>`).join('');
   this.buildIberianTerritories(atlas);
   const labels=[...historicalLabels.map(([name,x,y,level=1])=>({name,x,y,level,kind:level===1?'major':'polity'})),...atlas.filter(f=>f.label).map(f=>({name:f.label,x:f.lx,y:f.ly,level:f.labelLevel||2,kind:f.outline?'umbrella':'polity'}))];this.svg.querySelector('#realm-labels').innerHTML=labels.map(({name,x,y,level,kind})=>{const p=pos(x,y);return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" data-level="${level}" data-kind="${kind}" class="realm-label">${esc(name)}</text>`;}).join('');
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
   if(IBERIA_REALMS.has(realm)&&event){
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
 buildIberianTerritories(atlas){
  const defs=this.svg.querySelector('defs'),territoryLayer=this.svg.querySelector('#city-territories'),labelLayer=this.svg.querySelector('#city-territory-labels');
  defs.querySelectorAll('.iberia-dynamic').forEach(n=>n.remove());territoryLayer.innerHTML='';labelLayer.innerHTML='';this.cityTerritoryLabels=[];
  for(const realm of IBERIA_REALMS){
   const feature=atlas.find(f=>!f.outline&&realmOf(f)===realm);if(!feature)continue;
   const land=this.svg.querySelector('.territory.iberia-realm[data-realm="'+CSS.escape(realm)+'"]');if(!land)continue;
   const bbox=land.getBBox(),pad=4,box={x:bbox.x-pad,y:bbox.y-pad,w:bbox.width+pad*2,h:bbox.height+pad*2};
   const cities=CITIES.filter(c=>cityRealm(c)===realm),points=cities.map(c=>pos(c.mapLon??c.lon,c.mapLat??c.lat));
   if(!cities.length)continue;
   const realmClip='iberia-realm-'+realm.toLowerCase().replace(/[^a-z0-9]+/g,'-');
   defs.insertAdjacentHTML('beforeend',`<clipPath class="iberia-dynamic" id="${realmClip}"><path d="${feature.d}" fill-rule="evenodd"/></clipPath>`);
   const cells=cities.map((c,i)=>{const poly=voronoiCell(points[i],points,box),metrics=visibleCellMetrics(poly,land,points[i]);return {c,poly,cellBox:metrics.box,labelPoint:metrics.center};});
   const paths=cells.map(({c,poly})=>`<path class="city-territory-cell" data-city="${c.id}" data-realm="${esc(realm)}" d="${polygonPath(poly)}"><title>${esc(c.name)} · ${esc(displayRealmName(realm))}</title></path>`).join('');
   territoryLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${realmClip})">${paths}</g>`);
   for(const {c,poly,cellBox,labelPoint} of cells){
    const cellClip='iberia-cell-'+c.id.replace(/[^a-z0-9-]/gi,'-');
    defs.insertAdjacentHTML('beforeend',`<clipPath class="iberia-dynamic" id="${cellClip}"><path d="${polygonPath(poly)}"/></clipPath>`);
    const angle=IBERIA_LABEL_ANGLES[c.id]||0;
    labelLayer.insertAdjacentHTML('beforeend',`<g clip-path="url(#${realmClip})"><g clip-path="url(#${cellClip})"><text x="${labelPoint[0]}" y="${labelPoint[1]}" text-anchor="middle" dominant-baseline="central" transform="rotate(${angle} ${labelPoint[0]} ${labelPoint[1]})" class="city-area-label" data-city-label="${c.id}" data-cell-w="${cellBox.w}" data-cell-h="${cellBox.h}">${esc(c.name)}</text></g></g>`);
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
  const iberiaRealmLabels=new Set(['PORTUGAL','CASTILE','ARAGON','NAVARRE','GRANADA','ANDORRA','ROUSSILLON','MAJORCA']);
  // Iberian polity names hand over to city-territory names at the exact same zoom level.
  for(const t of this.realmLabels||[]){
   const level=+(t.dataset.level||1),umbrella=t.dataset.kind==='umbrella';
   const eligible=level===1||(level===2&&unit<.48)||(level>=3&&unit<.20);
   const p=screen(+t.getAttribute('x'),+t.getAttribute('y'));
   t.style.display='';
   const px=(umbrella?11:level===1?13:level===2?12:11)*Math.min(1,Math.max(.68,.8/unit));
   t.style.fontSize=(unit*px)+'px';t.style.letterSpacing=(unit*(umbrella?1.5:.65))+'px';t.style.strokeWidth=(unit*2.5)+'px';t.style.opacity=umbrella?'.6':'1';
   const w=t.getComputedTextLength()/unit,box={x:p.x-w/2-4,y:p.y-px-3,w:w+8,h:px+7};
   const inView=box.x+box.w>0&&box.x<width&&box.y+box.h>0&&box.y<height;
   const iberiaCountry=iberiaRealmLabels.has(t.textContent.trim());
   const show=eligible&&inView&&(level===1||!occupied.some(b=>overlaps(box,b)))&&!(iberiaCountry&&showCityAreas);
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
   const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),q=screen(...p),selected=s.selected===c.id,iberia=isIberianCity(c);
   if(q.x<-20||q.y<-20||q.x>width+20||q.y>height+20)return '';
   const box={x:q.x+10,y:q.y-10,w:c.name.length*7+6,h:21};
   const show=selected||(unit<.30&&!occupied.some(b=>overlaps(box,b)));
   if(show)occupied.push(box);
   const size=selected||unit<.3?4:2;
   if(iberia)return '';
   return `<g class="city-marker owned" data-city="${c.id}" data-realm="${esc(cityRealm(c))}" transform="translate(${p}) scale(${unit})"><title>${esc(c.name)} · ${esc(c.country)} · researched 1300 card</title><circle r="9" fill="transparent"/>${selected?'<circle r="10" fill="none" stroke="#f3d9a2" stroke-width="1.2"/>':''}<path d="M0 -${size} ${size} 0 0 ${size} -${size} 0Z" fill="#f8d791" stroke="#283d32" stroke-width="1"/>${(!iberia&&show)?`<text x="10" y="4" class="city-label owned">${esc(c.name)}</text>`:''}</g>`;
  }).reverse().join('');
 }
 destroy(){this.destroyed=true;this.abort.abort();this.resize.disconnect();}
}
