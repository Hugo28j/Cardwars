import {CITIES_1300 as CITIES,CITY_1300 as CITY} from './data1300.js';
import {icon} from './icons.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pos=(lon,lat)=>[(lon+22)*12,(72-lat)*15];
const historicalLabels=[
 ['KINGDOM OF FRANCE',2,47,1],['KINGDOM OF ENGLAND',-1.5,52.5,1],['KINGDOM OF SCOTLAND',-4,56.8,1],
 ['KINGDOM OF PORTUGAL',-8,39.4,1],['CROWN OF CASTILE',-4.5,40.1,1],['CROWN OF ARAGON',.3,41.2,1],
 ['KINGDOM OF NAVARRE',-1.7,42.7,2],['EMIRATE OF GRANADA',-4.6,36.8,2],
 ['KINGDOM OF POLAND',19,52,1],['GRAND DUCHY OF LITHUANIA',24,54.5,1],['TEUTONIC ORDER',23.5,55,2],
 ['KINGDOM OF HUNGARY',20,47,1],['KINGDOM OF SERBIA',20.4,43.5,2],['SECOND BULGARIAN EMPIRE',25.3,43.2,2],
 ['GOLDEN HORDE',31.5,48.8,1],['KINGDOM OF DENMARK',10.5,56.5,1],['KINGDOM OF SWEDEN',16,59,1],['KINGDOM OF NORWAY',9,61,1]
];
const palettes=['#879372','#8b7890','#a38d65','#728fa1','#9c8172','#738f82','#9c966f','#8b9a8b','#947b68','#6f8793','#947b8a','#7d946f'];
const realmOf=f=>f.realm||f.name||'Local communities';
const colorForRealm=name=>{
 let h=7;
 for(const c of String(name))h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;
 return palettes[h%palettes.length];
};
const cache={};
export class WorldMap{
 constructor(host,state,onSelect,onRegion){
  this.host=host;this.state=state;this.onSelect=onSelect;this.onRegion=onRegion;this.mode='historical';this.view={x:100,y:220,w:750,h:600};this.pointers=new Map();this.destroyed=false;this.drawn=false;
  host.innerHTML=`<svg id="world-map" role="img" aria-label="Political map of Europe around 1300 CE. Drag to pan, scroll or pinch to zoom, click a country or city to inspect it." tabindex="0"><defs><pattern id="ocean-grid" width="120" height="150" patternUnits="userSpaceOnUse"><path d="M120 0H0V150" fill="none" stroke="#d6e0c7" stroke-opacity=".06" stroke-width=".7"/></pattern></defs><rect x="-5000" y="-5000" width="15000" height="15000" fill="#192c32"/><rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#ocean-grid)"/><g id="land"></g><g id="realm-labels"></g><g id="sea-labels"></g><g id="cities"></g></svg><div class="map-top"><div class="map-heading"><span class="eyebrow">THE EUROPEAN ATLAS</span><span>${CITIES.length} researched city cards · political map c. 1300 CE</span></div><div class="map-era-badge">REALMS · c. 1300 CE</div></div><div class="map-bottom"><span class="map-hint">Drag to explore · Scroll to zoom · Click a country or city to inspect</span><span id="map-attribution" class="map-attribution">Approximate historical borders · c. 1300 CE · Historical Basemaps</span><span class="map-key"><i></i> Researched 1300 city card</span></div><div class="map-controls"><button data-map="in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button><button data-map="out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button><button data-map="selected" title="Focus selected city" aria-label="Focus selected city">${icon('target')}</button><button data-map="all" title="Show all cities" aria-label="Show all cities">${icon('globe')}</button></div><div class="map-compass" aria-hidden="true"><span>N</span><i></i></div><div class="map-loading">Unfolding the atlas…</div>`;
  this.svg=host.querySelector('svg');this.abort=new AbortController();const opts={signal:this.abort.signal};
  this.svg.addEventListener('wheel',e=>{e.preventDefault();const r=this.svg.getBoundingClientRect();this.zoom(Math.exp(e.deltaY*.0013),(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);},{...opts,passive:false});
  this.svg.addEventListener('pointerdown',e=>{if(e.button===2)return;this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragStart={x:e.clientX,y:e.clientY};this.dragged=false;this.svg.setPointerCapture(e.pointerId);},opts);
  this.svg.addEventListener('pointermove',e=>{if(!this.pointers.has(e.pointerId))return;const old=this.pointers.get(e.pointerId),next={x:e.clientX,y:e.clientY};
   if(this.pointers.size===2){const other=[...this.pointers.entries()].find(([id])=>id!==e.pointerId)[1],before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(next.x-other.x,next.y-other.y),r=this.svg.getBoundingClientRect();if(after)this.zoom(before/after,((next.x+other.x)/2-r.left)/r.width,((next.y+other.y)/2-r.top)/r.height);this.dragged=true;}
   else{const r=this.svg.getBoundingClientRect();this.view.x-=(next.x-old.x)*this.view.w/r.width;this.view.y-=(next.y-old.y)*this.view.h/r.height;if(Math.hypot(next.x-this.dragStart.x,next.y-this.dragStart.y)>5)this.dragged=true;this.update();}this.pointers.set(e.pointerId,next);
  },opts);
  const release=e=>{const tracked=this.pointers.has(e.pointerId);this.pointers.delete(e.pointerId);if(this.svg.hasPointerCapture(e.pointerId))this.svg.releasePointerCapture(e.pointerId);if(e.type==='pointerup'&&tracked&&!this.dragged){const target=document.elementFromPoint(e.clientX,e.clientY);if(target)this.pick(target);}};
  this.svg.addEventListener('pointerup',release,opts);this.svg.addEventListener('pointercancel',release,opts);this.svg.addEventListener('contextmenu',e=>{e.preventDefault();this.pick(e.target);},opts);
  this.svg.addEventListener('keydown',e=>{if(['+','=','-'].includes(e.key)){e.preventDefault();this.zoom(e.key==='-'?1.25:.8);}else if(e.key.startsWith('Arrow')){e.preventDefault();const d=this.view.w*.08;if(e.key==='ArrowLeft')this.view.x-=d;if(e.key==='ArrowRight')this.view.x+=d;if(e.key==='ArrowUp')this.view.y-=d;if(e.key==='ArrowDown')this.view.y+=d;this.update();}},opts);
  host.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;const a=b.dataset.map;if(a==='in')this.zoom(.75);if(a==='out')this.zoom(1.3);if(a==='selected')this.focus(state.selected);if(a==='all')this.fit();if(['modern','historical'].includes(a)&&this.mode!==a){this.mode=a;host.querySelectorAll('.map-modes button').forEach(b=>b.classList.toggle('active',b.dataset.map===a));this.load(false);}},opts);
  this.resize=new ResizeObserver(()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;this.view.h=this.view.w*r.height/r.width;this.update();});this.resize.observe(host);this.load(true);
 }
 async load(fit){
  const mode=this.mode;
  try{cache[mode]??=fetch(mode==='modern'?'assets/modern-atlas.json':'assets/atlas.json').then(r=>{if(!r.ok)throw new Error('Missing atlas');return r.json();});const atlas=await cache[mode];if(this.destroyed||this.mode!==mode)return;
   this.svg.querySelector('#land').innerHTML=atlas.map((f,i)=>f.outline?`<path class="empire-outline" d="${f.d}" fill="none" stroke="#d7c48b" stroke-opacity=".48" stroke-width="1.05" stroke-dasharray="6 5" vector-effect="non-scaling-stroke"><title>${esc(f.name)}</title></path>`:`<path class="territory ${f.detail?'detail-polity':''}" data-realm="${esc(realmOf(f))}" data-detail="${f.detail?'1':'0'}" d="${f.d}" fill="${mode==='historical'?colorForRealm(realmOf(f)):palettes[i%palettes.length]}" fill-rule="evenodd" stroke="${f.detail?'none':'#22322b'}" stroke-width="${f.detail?'0':'.75'}" vector-effect="non-scaling-stroke"><title>${esc(f.name||'Local communities')}</title></path>`).join('');
   const labels=[...historicalLabels.map(([name,x,y,level=1])=>({name,x,y,level,kind:'major'})),...atlas.filter(f=>f.label).map(f=>({name:f.label,x:f.lx,y:f.ly,level:f.labelLevel||2,kind:f.outline?'umbrella':'polity'}))];this.svg.querySelector('#realm-labels').innerHTML=labels.map(({name,x,y,level,kind})=>{const p=pos(x,y);return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" data-level="${level}" data-kind="${kind}" class="realm-label">${esc(name)}</text>`;}).join('');
   this.svg.querySelector('#sea-labels').innerHTML=[['MEDITERRANEAN SEA',14,35],['BLACK SEA',34,43],['ATLANTIC OCEAN',-14,44],['NORTH SEA',3,56]].map(([name,x,y])=>{const p=pos(x,y);return `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" class="sea-label">${name}</text>`;}).join('');
   this.host.querySelector('#map-attribution').textContent='Approximate historical borders · c. 1300 CE · Historical Basemaps';this.host.querySelector('.map-loading')?.remove();if(fit&&this.focusRequest)this.focus(this.focusRequest);else if(fit)this.fit();else this.update();
  }catch{delete cache[mode];const el=this.host.querySelector('.map-loading');if(el)el.textContent='Map could not load. Reload to try again.';}
 }
 pick(target){const c=target.closest('[data-city]');if(c){this.onSelect(c.dataset.city);return;}const r=target.closest('[data-realm]');if(r&&this.onRegion)this.onRegion({name:r.dataset.realm,detail:r.dataset.detail==='1',mode:'historical'});}
 zoom(f,fx=.5,fy=.5){const w=Math.max(28,Math.min(1800,this.view.w*f)),r=w/this.view.w;this.view.x+=this.view.w*fx*(1-r);this.view.y+=this.view.h*fy*(1-r);this.view.w=w;this.view.h*=r;this.update();}
 focus(id){this.focusRequest=id;const c=CITY[id];if(!c)return;const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),r=this.host.getBoundingClientRect();this.view.w=310;this.view.h=310*r.height/Math.max(1,r.width);this.view.x=p[0]-this.view.w/2;this.view.y=p[1]-this.view.h/2;this.update();}
 fit(){this.focusRequest=null;const r=this.host.getBoundingClientRect();this.view.w=Math.max(590,420*r.width/Math.max(1,r.height));this.view.h=this.view.w*r.height/Math.max(1,r.width);this.view.x=405-this.view.w/2;this.view.y=405-this.view.h/2;this.update();}
 update(){if(!this.svg)return;this.view.x=Math.max(-400,Math.min(950,this.view.x));this.view.y=Math.max(-300,Math.min(720,this.view.y));this.svg.setAttribute('viewBox',`${this.view.x} ${this.view.y} ${this.view.w} ${this.view.h}`);this.refresh();}
 refresh(){const unit=this.view.w/(this.host.clientWidth||1000),s=this.state,occupied=[];
  const cities=[...CITIES].sort((a,b)=>(s.selected===b.id?100:0)+b.rarity-((s.selected===a.id?100:0)+a.rarity));
  this.svg.querySelector('#cities').innerHTML=cities.map(c=>{const p=pos(c.mapLon??c.lon,c.mapLat??c.lat),selected=s.selected===c.id,box={x:(p[0]-this.view.x)/unit+10,y:(p[1]-this.view.y)/unit-10,w:c.name.length*7,h:21};const show=selected||!occupied.some(b=>box.x<b.x+b.w&&box.x+box.w>b.x&&box.y<b.y+b.h&&box.y+box.h>b.y);if(show)occupied.push(box);return `<g class="city-marker owned" data-city="${c.id}" transform="translate(${p}) scale(${unit})"><title>${esc(c.name)} · ${esc(c.country)} · researched 1300 card</title><circle r="12" fill="transparent"/>${selected?'<circle r="12" fill="none" stroke="#f3d9a2" stroke-width="1.2"/>':''}<path d="M0 -4 4 0 0 4 -4 0Z" fill="#f8d791" stroke="#283d32" stroke-width="1.2"/>${show?`<text x="10" y="4" class="city-label owned">${esc(c.name)}</text>`:''}</g>`;}).reverse().join('');
  this.svg.querySelectorAll('.realm-label').forEach(t=>{const level=+(t.dataset.level||1),kind=t.dataset.kind||'polity',show=kind==='major'||kind==='umbrella'||level===1||(level===2&&unit<.38)||(level>=3&&unit<.16);t.style.display=show?'':'none';if(!show)return;const screenPx=kind==='major'?10:kind==='umbrella'?7.2:level===1?8.5:level===2?7.2:6.1;t.style.fontSize=(unit*screenPx)+'px';t.style.letterSpacing=(unit*(kind==='major'?1.15:.75))+'px';t.style.strokeWidth=(unit*.7)+'px';t.style.opacity=kind==='umbrella'?'.48':'1';});
 }
 destroy(){this.destroyed=true;this.abort.abort();this.resize.disconnect();}
}
