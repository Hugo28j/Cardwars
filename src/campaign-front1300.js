// Persistent tactical positions; soldier totals remain in the campaign military ledger.
// Geometry is rebuilt from the real map and is never stored in a save.
// Eight times less area per tile; keep the previous map-distance budget per day.
export const FRONT_STEP_1300=2/Math.sqrt(8);
export const FRONT_DAILY_DISTANCE_1300=2;
const count=u=>Object.values(u||{}).reduce((s,n)=>s+Math.max(0,Number(n)||0),0);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const inside=(p,poly)=>{let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;};
export function buildCampaignFrontTopology1300(provinces,step=FRONT_STEP_1300){
 const nodes=[],byId=new Map(),byCity=new Map(),castles=new Map(),byGrid=new Map();
 const add=(id,x,y,city)=>{const n={id,x,y,city,links:[],castle:false};nodes.push(n);byId.set(id,n);byCity.get(city).push(n);return n;};
 for(const p of provinces){byCity.set(p.id,[]);const polys=p.polys||[p.poly],xs=p.poly.map(v=>v[0]),ys=p.poly.map(v=>v[1]);
  for(let y=Math.floor(Math.min(...ys)/step);y<=Math.ceil(Math.max(...ys)/step);y++)for(let x=Math.floor(Math.min(...xs)/step);x<=Math.ceil(Math.max(...xs)/step);x++){
   const point=[(x+.5)*step,(y+.5)*step];if(!inside(point,p.poly)||!polys.some(poly=>inside(point,poly)))continue;
   const key=x+','+y;if(byGrid.has(key))continue;const n=add(key,...point,p.id);byGrid.set(key,n);
  }
  const local=byCity.get(p.id);// Tiny provinces still get their true castle anchor.
  const c=local.length?local.reduce((a,b)=>Math.hypot(a.x-p.center[0],a.y-p.center[1])<Math.hypot(b.x-p.center[0],b.y-p.center[1])?a:b):add('castle:'+p.id,...p.center,p.id);
  c.castle=true;castles.set(p.id,c);
 }
 const connect=(a,b)=>{if(!a||!b||a===b)return;if(!a.links.includes(b.id))a.links.push(b.id);if(!b.links.includes(a.id))b.links.push(a.id);};
 const provinceMap=new Map(provinces.map(p=>[p.id,p]));
 for(const [key,n] of byGrid){const [x,y]=key.split(',').map(Number);for(const key2 of [(x+1)+','+y,x+','+(y+1)]){const b=byGrid.get(key2);if(b&&(b.city===n.city||provinceMap.get(n.city)?.neighbors.includes(b.city)))connect(n,b);}}
 // Repair sampling gaps only across an authoritative shared province border.
 for(const p of provinces){const local=byCity.get(p.id),seen=new Set(),c=castles.get(p.id);const flood=seed=>{const q=[seed];seen.add(seed.id);for(let h=0;h<q.length;h++)for(const id of q[h].links){const n=byId.get(id);if(n.city===p.id&&!seen.has(id)){seen.add(id);q.push(n);}}};flood(c);
  for(const n of local)if(!seen.has(n.id)){const near=local.filter(a=>seen.has(a.id)).sort((a,b)=>distance(a,n)-distance(b,n))[0];if(near&&distance(near,n)<=step*2.1){connect(near,n);flood(n);}}
  for(const other of p.neighbors){if(p.id>=other||!byCity.has(other))continue;const targets=byCity.get(other);if(local.some(n=>n.links.some(id=>byId.get(id).city===other)))continue;let best=null;for(const a of local)for(const b of targets){const d=distance(a,b);if(!best||d<best.d)best={a,b,d};}if(best)connect(best.a,best.b);}
 }
 return {nodes,byId,byCity,castles,step};
}
export function ensureCampaignFront1300(military){
 const f=military.front&&military.front.version===1?military.front:{version:1,control:{},formations:[],lastDay:-1};
 f.control=f.control&&typeof f.control==='object'?f.control:{};f.formations=Array.isArray(f.formations)?f.formations:[];military.front=f;return f;
}
// Old saves used a 2-unit grid. Remap positions and occupied terrain before rendering/ticking.
export function alignCampaignFront1300(front,topology){
 const oldStep=Number(front.step)||2;if(Math.abs(oldStep-topology.step)<1e-9){front.step=topology.step;return front;}
 const oldControl=front.control||{},control={};
 if(Object.keys(oldControl).length)for(const n of topology.nodes){if(n.castle)continue;const id=Math.floor(n.x/oldStep)+','+Math.floor(n.y/oldStep);if(oldControl[id])control[n.id]=oldControl[id];}
 const remap=id=>{if(!id||id.startsWith('castle:'))return topology.byId.has(id)?id:null;const [x,y]=id.split(',').map(Number);if(!Number.isFinite(x)||!Number.isFinite(y))return null;const px=(x+.5)*oldStep,py=(y+.5)*oldStep,gx=Math.floor(px/topology.step),gy=Math.floor(py/topology.step);let best=null;
  for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const n=topology.byId.get((gx+dx)+','+(gy+dy));if(n&&(!best||Math.hypot(n.x-px,n.y-py)<Math.hypot(best.x-px,best.y-py)))best=n;}return best?.id||null;
 };
 for(const f of front.formations||[]){f.node=remap(f.node);f.previous=remap(f.previous);}
 front.control=control;front.step=topology.step;front.changes=[];front.revision=(front.revision||0)+1;return front;
}
function allocate(units,n){const result={},total=count(units);let left=Math.min(n,total);const entries=Object.entries(units);for(let i=0;i<entries.length;i++){const [id,have]=entries[i],take=i===entries.length-1?Math.min(have,left):Math.min(have,left,Math.floor(n*have/Math.max(1,total)));result[id]=take;left-=take;}for(const [id,have] of entries){const take=Math.min(left,have-(result[id]||0));result[id]=(result[id]||0)+take;left-=take;}return result;}
export function frontArmyDeployed1300(military,key){return (military.front?.formations||[]).some(f=>f.source===key&&count(f.units)>0);}
export function frontSiegeSupport1300(front,topology,city,country){
 const c=topology.castles.get(city);if(!c)return [];const ring=c.links.map(id=>topology.byId.get(id));
 if(!ring.length||ring.filter(n=>(front.control[n.id]||'')===country).length<Math.ceil(ring.length*.75))return [];
 return front.formations.filter(f=>f.country===country&&count(f.units)>0&&ring.some(n=>distance(n,topology.byId.get(f.node)||c)<=topology.step*2.1));
}
export function tickCampaignFront1300(military,topology,ctx){
 const state=alignCampaignFront1300(ensureCampaignFront1300(military),topology);if(state.lastDay===ctx.day)return false;state.lastDay=ctx.day;
 const {byId,nodes,castles}=topology,owner=n=>state.control[n.id]||ctx.owner(n.city),active=n=>ctx.active(ctx.owner(n.city));
 for(const [id,country] of Object.entries(state.control)){const n=byId.get(id);if(!n||country===ctx.owner(n.city)||!ctx.atWar(country,ctx.owner(n.city)))delete state.control[id];}
 const sources=new Map(ctx.sources.map(s=>[s.key,s]));
 state.formations=state.formations.filter(f=>sources.has(f.source)&&byId.has(f.node));
 // Reconcile each type independently after recruitment, casualties, splits or loaded saves.
 for(const source of ctx.sources){
  const center=castles.get(source.city);if(!center)continue;let groups=state.formations.filter(f=>f.source===source.key&&!f.guard);
  if(!ctx.active(source.country)){state.formations=state.formations.filter(f=>f.source!==source.key);continue;}
  const reserve=Math.min(count(source.units),Math.max(0,Math.floor(source.garrison??count(source.units)*.2))),mobile=count(source.units)-reserve;
  const wanted=source.fixed?count(source.units):mobile;
  if(!groups.length&&wanted>0){const size=Math.max(1,Math.min(8,Math.floor(wanted/20)||1));for(let i=0;i<size;i++){const f={id:source.key+':'+i,source:source.key,country:source.country,node:source.node||center.id,units:{}};state.formations.push(f);groups.push(f);}}
  const pool=allocate(source.units,wanted);
  let guard=state.formations.find(f=>f.source===source.key&&f.guard);
  if(!source.fixed&&reserve>0){if(!guard){guard={id:source.key+':guard',source:source.key,country:source.country,node:center.id,units:{},guard:true};state.formations.push(guard);}guard.node=center.id;guard.units=Object.fromEntries(Object.entries(source.units).map(([id,n])=>[id,n-(pool[id]||0)]));}
  else if(guard)guard.units={};
  for(const [unit,amount] of Object.entries(pool)){
   const old=groups.reduce((s,f)=>s+(f.units[unit]||0),0);let left=amount;
   groups.forEach((f,i)=>{const n=i===groups.length-1?left:Math.min(left,old>0?Math.floor(amount*(f.units[unit]||0)/old):Math.floor(amount/Math.max(1,groups.length)));f.units[unit]=n;left-=n;});
  }
  for(const f of groups)for(const unit of Object.keys(f.units))if(!(unit in pool))delete f.units[unit];
 }
 state.formations=state.formations.filter(f=>count(f.units)>0);
 const occupied=new Map();for(const f of state.formations){if(!occupied.has(f.node))occupied.set(f.node,[]);occupied.get(f.node).push(f);}
 // Simultaneous damage uses the existing unit HP, attack, range, tactics, supply and commanders.
 const losses=new Map();for(const f of state.formations){const source=sources.get(f.source),n=byId.get(f.node);if(!source)continue;const combat=ctx.combat(source,f.units),range=Math.ceil(Math.min(3,Math.max(1,combat.range||1))*FRONT_DAILY_DISTANCE_1300/topology.step);const nearby=[n],seen=new Set([n.id]);for(let k=0;k<range;k++){for(const a of [...nearby])for(const id of a.links)if(!seen.has(id)){seen.add(id);nearby.push(byId.get(id));}}
  const targets=nearby.flatMap(a=>occupied.get(a.id)||[]).filter(t=>ctx.atWar(f.country,t.country));if(!targets.length)continue;
  const target=targets.sort((a,b)=>distance(n,byId.get(a.node))-distance(n,byId.get(b.node)))[0],def=ctx.combat(sources.get(target.source),target.units),bonus=ctx.defense?.(target,byId.get(target.node))||0;
  const damage=Math.max(1,Math.round(combat.attack/Math.max(35,def.avgHp*18*def.defense*(1+bonus/100))));losses.set(target,(losses.get(target)||0)+damage);
 }
 for(const [f,amount] of losses){const dead=allocate(f.units,Math.min(count(f.units),amount));for(const [unit,n] of Object.entries(dead))if(n){f.units[unit]-=n;ctx.casualty(sources.get(f.source),unit,n);}}
 state.formations=state.formations.filter(f=>count(f.units)>0);
 // Multiple connected small steps retain the previous map-distance budget per day.
 const fields=new Map(),pathField=(country,seeds)=>{const cacheKey=country+'|'+seeds.join(';');if(fields.has(cacheKey))return fields.get(cacheKey);const dist=new Map(),q=[];for(const id of seeds)if(byId.has(id)){dist.set(id,0);q.push(byId.get(id));}for(let h=0;h<q.length;h++)for(const id of q[h].links){if(dist.has(id))continue;const n=byId.get(id),o=owner(n);if(o!==country&&!ctx.allied(country,o)&&!ctx.atWar(country,o))continue;dist.set(id,dist.get(q[h].id)+1);q.push(n);}fields.set(cacheKey,dist);return dist;};
 const fronts=new Map();for(const n of nodes){if(!active(n))continue;const o=owner(n);if(n.links.some(id=>ctx.atWar(o,owner(byId.get(id))))){if(!fronts.has(o))fronts.set(o,[]);fronts.get(o).push(n.id);}}
 const siegeHolds=new Map();for(const [city,castle] of castles){for(const country of new Set(ctx.sources.map(s=>s.country))){if(!ctx.atWar(country,owner(castle)))continue;const supporters=frontSiegeSupport1300(state,topology,city,country);for(const f of supporters)if(!f.guard)siegeHolds.set(f.id,city);}}
 const ratio=FRONT_DAILY_DISTANCE_1300/topology.step,steps=Math.max(1,Math.floor(ctx.day*ratio)-Math.floor((ctx.day-1)*ratio));
 const changes=[];for(let substep=0;substep<steps;substep++)for(const f of state.formations){const s=sources.get(f.source),n=byId.get(f.node);if(!s||s.fixed||f.guard)continue;
  const order=ctx.orders.find(o=>o.armyKey===s.key),target=order&&castles.get(order.target);if(siegeHolds.has(f.id)&&(!order||order.target===siegeHolds.get(f.id)))continue;let seeds;
  if(target)seeds=order.type==='defend'?[target.id,...target.links]:target.links;
  else {const invaded=(fronts.get(f.country)||[]).filter(id=>ctx.owner(byId.get(id).city)===f.country&&owner(byId.get(id))===f.country&&byId.get(id).links.some(k=>ctx.owner(byId.get(k).city)===f.country&&ctx.atWar(f.country,owner(byId.get(k)))));seeds=invaded.length?invaded:(fronts.get(f.country)||[]);}
  if(!seeds.length)continue;const field=pathField(f.country,seeds),here=field.get(n.id);let options=n.links.map(id=>byId.get(id)).filter(a=>{const o=owner(a);return !a.castle&&(o===f.country||ctx.allied(f.country,o)||ctx.atWar(f.country,o))&&!state.formations.some(t=>t.node===a.id&&ctx.atWar(f.country,t.country)&&count(t.units)>0);});
  const enemies=options.filter(a=>ctx.atWar(f.country,owner(a)));if(enemies.length&&order?.type!=='defend'&&(here===0||here===1||here===undefined))options=enemies;
  else options=options.filter(a=>(field.get(a.id)??Infinity)<(here??Infinity));
  options.sort((a,b)=>{const rank=a=>(field.get(a.id)??1e6)+(state.formations.filter(t=>t.node===a.id&&t.country===f.country).length*2);return rank(a)-rank(b);});
  const next=options[0];if(!next)continue;
  const previous=n.id;f.node=next.id;if(f.movedDay!==ctx.day)f.previous=previous;f.movedDay=ctx.day;
  if(ctx.atWar(f.country,owner(next))){state.control[next.id]=f.country;changes.push(next.id);}
 }
 // Merge isolated remnants into friendly formations at the same tile, retaining every type.
 for(const f of [...state.formations]){if(count(f.units)>=10)continue;const other=state.formations.find(t=>t!==f&&!t.guard&&!f.guard&&t.source===f.source&&t.node===f.node);if(other){for(const [id,n] of Object.entries(f.units))other.units[id]=(other.units[id]||0)+n;f.units={};}}
 state.formations=state.formations.filter(f=>count(f.units)>0);
 // Empty pockets flip only when every land exit is held by a hostile coalition; castles are anchors.
 const protectedNodes=new Set();for(const f of state.formations){const n=byId.get(f.node);const nearby=new Set([n.id,...n.links]);for(const id of [...nearby])for(const next of byId.get(id).links)nearby.add(next);for(const id of nearby)protectedNodes.add(f.country+'|'+id);}
 const seen=new Set(),armed=new Set(state.formations.map(f=>f.node));for(const n of nodes){if(seen.has(n.id)||!active(n)||n.castle||armed.has(n.id))continue;const country=owner(n),q=[n],boundary=new Set();let anchored=protectedNodes.has(country+'|'+n.id);seen.add(n.id);for(let h=0;h<q.length;h++)for(const id of q[h].links){const a=byId.get(id),o=owner(a);if(o===country){if(a.castle||armed.has(id)){anchored=true;continue;}if(protectedNodes.has(country+'|'+id))anchored=true;if(!seen.has(id)){seen.add(id);q.push(a);}}else boundary.add(o);}
  const sides=[...boundary];if(!anchored&&sides.length&&sides.every(o=>ctx.atWar(country,o))&&sides.every(o=>o===sides[0]||ctx.allied(sides[0],o)))for(const a of q){state.control[a.id]=sides[0];changes.push(a.id);}
 }
 state.changes=changes.slice(-500);state.revision=(state.revision||0)+1;
 return true;
}
