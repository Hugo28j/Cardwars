// Medieval economy: quantities and money below are deliberately scaled gameplay units.
// A tick consumes 1/calendar-month-length of monthly flows; the crown settles once a month.
import {BUILDINGS_1300, BUILDING_1300, ECONOMY_1300, startingBuildingLevel1300, buildingCost1300, buildingAvailability1300} from './buildings1300.js?v=20260922-economy-v1';

export const GOODS_1300 = [
 ['grain','Grain','Staples',.45],['flour','Flour','Staples',.75],['food','Food','Staples',1],
 ['timber','Timber','Materials',.65],['stone','Stone','Materials',.7],['iron','Iron ore','Materials',1.1],
 ['charcoal','Charcoal','Materials',.8],['wool','Wool','Materials',.85],['hides','Hides','Materials',.8],
 ['salt','Salt','Staples',1.2],['tools','Tools','Crafts',2],['cloth','Cloth','Crafts',2],
 ['leather','Leather','Crafts',1.8],['ale','Ale','Luxury',1.3],['wine','Wine','Luxury',2.2],
 ['glass','Glass','Luxury',2.8],['arms','Arms','Military',3],['ships','Ships','Military',8],
 ['services','Services','Urban',1],['knowledge','Manuscripts','Urban',3]
].map(([id,name,category,basePrice])=>({id,name,category,basePrice,tradable:!['services','knowledge'].includes(id)}));
export const GOOD_1300=Object.fromEntries(GOODS_1300.map(g=>[g.id,g]));
// Monthly input/output baskets per fully staffed level. Lower tiers clear first.
export const RECIPES_1300={
 fields:{tier:0,input:{},output:{grain:32}},pastures:{tier:0,input:{},output:{wool:15,hides:7,food:9}},
 fishery:{tier:0,input:{},output:{food:24}},saltworks:{tier:0,input:{},output:{salt:15}},
 quarry:{tier:0,input:{},output:{stone:24}},lumberyard:{tier:0,input:{},output:{timber:30}},
 ironmine:{tier:0,input:{},output:{iron:20}},vineyard:{tier:0,input:{},output:{wine:14}},
 charcoal:{tier:1,input:{timber:15},output:{charcoal:24}},watermill:{tier:1,input:{grain:22},output:{flour:27}},
 tannery:{tier:1,input:{hides:12,salt:3},output:{leather:17}},textiles:{tier:1,input:{wool:18},output:{cloth:22}},
 brewery:{tier:1,input:{grain:14,timber:3},output:{ale:22}},
 bakery:{tier:2,input:{flour:20,timber:4},output:{food:30}},
 tools:{tier:2,input:{iron:10,charcoal:6},output:{tools:16}},
 forge:{tier:2,input:{iron:12,charcoal:8},output:{arms:16}},
 glassworks:{tier:2,input:{stone:5,charcoal:10},output:{glass:14}},
 dockyard:{tier:2,input:{timber:20,cloth:5,iron:3},output:{ships:6}},
 market:{tier:3,input:{timber:1},output:{services:22}},
 warehouse:{tier:3,input:{timber:2},output:{services:18}},
 merchantquarter:{tier:3,input:{cloth:2},output:{services:28}},
 customshouse:{tier:3,input:{knowledge:1},output:{services:14}},
 mint:{tier:3,input:{iron:2,charcoal:2},output:{services:20}},
 guildhall:{tier:3,input:{knowledge:2},output:{services:22}},
 university:{tier:3,input:{cloth:2},output:{knowledge:10}},
 monastery:{tier:3,input:{grain:3},output:{knowledge:6,food:5}},
 cathedral:{tier:3,input:{glass:1},output:{services:15,knowledge:3}},
 hospital:{tier:3,input:{food:3,cloth:2},output:{services:18}},
 barracks:{tier:3,input:{food:5,arms:2},output:{services:10}},
 walls:{tier:3,input:{stone:3},output:{services:8}},
 bridge:{tier:3,input:{stone:2},output:{services:16}},
 roads:{tier:3,input:{stone:2,timber:1},output:{services:14}},
 builders:{tier:3,input:{tools:2,timber:3},output:{services:18}}
};
export const METHODS_1300={
 traditional:{name:'Traditional',technology:0,output:1,inputs:1,workers:1,tools:0},
 improved:{name:'Improved tools',technology:60,output:1.3,inputs:1.15,workers:.9,tools:2},
 guild:{name:'Guild specialisation',technology:78,output:1.65,inputs:1.35,workers:.8,tools:4}
};
export const TRADE_LAWS_1300={
 balanced:{name:'Market tolls',tariff:.08,capacity:1,description:'8% import/export tolls; normal caravan capacity.'},
 free:{name:'Open trade',tariff:0,capacity:1.5,description:'No toll revenue; 50% more trade capacity.'},
 protection:{name:'Protect local crafts',tariff:.2,capacity:.65,description:'20% tolls; lower capacity and more expensive imports.'},
 closed:{name:'Closed borders',tariff:0,capacity:0,description:'No foreign trade. Your realm must supply its own needs.'}
};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const num=(n,d=0)=>Number.isFinite(Number(n))?Number(n):d;
const round=n=>Math.round(n*100)/100;
const map=()=>Object.fromEntries(GOODS_1300.map(g=>[g.id,0]));
const dictionary=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const own=(o,k)=>Object.hasOwn(o,k);
export function provinceBuildings1300(game,c){
 return BUILDINGS_1300.map(b=>({...b,level:clamp(startingBuildingLevel1300(c,b.id)+Math.floor(num(game.buildings?.[c.id]?.[b.id])),0,ECONOMY_1300.maxBuildingLevel)}));
}
export function daysInMonth1300(day=0){const d=new Date(Date.UTC(1300,0,1+day));return new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();}
export function ensureMarket1300(game,cities){
 game.economy=dictionary(game.economy);const e=game.economy;
 const population=cities.reduce((n,c)=>n+num(c.people),0),old=dictionary(e.market),m=old;
 const initial=m.version!==1;
 const openingPerThousand={grain:2.8,flour:.35,food:4,timber:1,stone:.2,iron:.1,charcoal:.12,wool:.2,hides:.1,salt:.14,tools:.08,cloth:.34,leather:.16,ale:.24,wine:.08,glass:.03,arms:.06,ships:.005,services:.7,knowledge:.03};
 m.version=1;m.goods=dictionary(m.goods);m.clockSpeed=[0,1,3,6].includes(m.clockSpeed)?m.clockSpeed:1;
 for(const g of GOODS_1300){
  const row=dictionary(m.goods[g.id]);
  row.price=clamp(num(row.price,g.basePrice),g.basePrice*.4,g.basePrice*2.8);
  // Two months of modest merchant inventories on first migration; no treasury grant.
  row.stock=clamp(num(row.stock,Math.max(g.id==='ships'?.3:4,population/1000*openingPerThousand[g.id])),0,1e9);
  for(const k of ['supply','demand','imports','exports','shortage','consumed'])row[k]=clamp(num(row[k]),0,1e9);
  m.goods[g.id]=row;
 }
 m.tradeLaw=own(TRADE_LAWS_1300,m.tradeLaw)?m.tradeLaw:'balanced';
 m.routes=dictionary(m.routes);for(const id of Object.keys(m.routes))if(!own(GOOD_1300,id))delete m.routes[id];
 for(const g of GOODS_1300)m.routes[g.id]=['auto','import','export','off'].includes(m.routes[g.id])?m.routes[g.id]:'auto';
 for(const k of ['methods','subsidies','priorities','paused','population'])m[k]=dictionary(m[k]);
 m.debt=clamp(num(m.debt),0,1e12);m.arrears=clamp(num(m.arrears),0,1e12);
 m.investmentPool=clamp(num(m.investmentPool),0,1e9);m.constructionFocus=['balanced','building'].includes(m.constructionFocus)?m.constructionFocus:'balanced';
 m.queue=(Array.isArray(m.queue)?m.queue:[]).filter(q=>q&&cities.some(c=>c.id===q.cityId)&&own(BUILDING_1300,q.buildingId)).slice(0,30).map(q=>({...q,work:clamp(num(q.work),0,1e6),required:clamp(num(q.required,30),1,365),cost:clamp(num(q.cost),0,1e6),materials:Object.fromEntries(['timber','stone','tools'].map(k=>[k,clamp(num(q.materials?.[k],1),0,1e6)]))}));
 m.accrued=dictionary(m.accrued);for(const k of ['tax','tariffs','expenses','subsidies','interest','days'])m.accrued[k]=clamp(num(m.accrued[k]),0,1e9);
 m.history=(Array.isArray(m.history)?m.history:[]).slice(-24);m.alerts=Array.isArray(m.alerts)?m.alerts.slice(0,6):[];
 for(const c of cities){const p=dictionary(m.population[c.id]);m.population[c.id]={...p,sol:clamp(num(p.sol,45+num(c.economyScore)/5),0,100),fulfilment:clamp(num(p.fulfilment,1),0,1),employment:clamp(num(p.employment),0,1),access:clamp(num(p.access,1),.35,1),unrest:clamp(num(p.unrest,10),0,100)};}
 if(initial){m.accrued={tax:0,tariffs:0,expenses:0,subsidies:0,interest:0,days:0};m.lastTickDay=null;}
 e.market=m;return m;
}
function setting(m,key,cityId,id,fallback){return m[key]?.[cityId]?.[id]??fallback;}
export function sectorSettings1300(game,cityId,id){const m=game.economy.market;return {method:setting(m,'methods',cityId,id,'traditional'),subsidy:setting(m,'subsidies',cityId,id,false)===true,priority:clamp(num(setting(m,'priorities',cityId,id,1),1),1,3),paused:setting(m,'paused',cityId,id,false)===true};}
export function setSector1300(game,c,buildingId,key,value){
 if(!game.ownedCities.includes(c.id)||!own(BUILDING_1300,buildingId)||!provinceBuildings1300(game,c).some(b=>b.id===buildingId&&b.level>0))return 'This sector is not owned or built.';
 const m=game.economy.market;
 if(key==='methods'&&(!own(METHODS_1300,value)||num(c.technology)<METHODS_1300[value].technology))return 'This production method needs more local technology.';
 if(!['methods','subsidies','priorities','paused'].includes(key))return 'Unknown setting.';
 if(['subsidies','paused'].includes(key)&&typeof value!=='boolean')return 'Invalid setting.';
 if(key==='priorities'&&![1,2,3].includes(value))return 'Invalid priority.';
 m[key][c.id]??={};m[key][c.id][buildingId]=value;return null;
}
export function constructionQuote1300(game,c,buildingId){
 const b=BUILDING_1300[buildingId];if(!b)return null;
 const level=provinceBuildings1300(game,c).find(x=>x.id===buildingId).level;
 const pending=game.economy.market.queue.filter(q=>q.cityId===c.id&&q.buildingId===buildingId).length;
 const required=24+(level+pending)*8+(b.cost>=200?12:0),cost=buildingCost1300(b,level+pending);
 return {level,pending,cost,required,materials:{timber:8+(level+pending)*3,stone:6+(level+pending)*3,tools:2+(level+pending)}};
}
export function queueConstruction1300(game,c,buildingId){
 if(!game.ownedCities.includes(c.id)||!own(BUILDING_1300,buildingId))return 'You can only build in your own provinces.';
 const m=game.economy.market,b=BUILDING_1300[buildingId],q=constructionQuote1300(game,c,buildingId),availability=buildingAvailability1300(c,b);
 if(!availability.ok)return availability.reason;
 if(q.level+q.pending>=ECONOMY_1300.maxBuildingLevel)return 'Maximum level is already built or queued.';
 if(m.queue.length>=30)return 'The construction queue is full (30 projects).';
 if(game.florins<q.cost)return `You need ƒ${round(q.cost-game.florins)} more.`;
 game.florins=round(game.florins-q.cost);
 const investment=Math.min(m.investmentPool,q.cost*.25);m.investmentPool=round(m.investmentPool-investment);game.florins=round(game.florins+investment);
 m.queue.push({id:`${game.day}-${c.id}-${buildingId}-${m.queue.length}`,cityId:c.id,buildingId,work:0,required:q.required,cost:q.cost-investment,materials:q.materials});return null;
}
export function cancelConstruction1300(game,index){const m=game.economy.market,q=m.queue[index];if(!q)return false;game.florins=round(game.florins+q.cost*(1-q.work/q.required)*.75);m.queue.splice(index,1);return true;}
export function creditLimit1300(cities){return round(100+cities.reduce((n,c)=>n+num(c.people),0)/500);}
export function repayDebt1300(game,amount=50){const m=game.economy.market,n=Math.min(amount,game.florins,m.debt+m.arrears);const arrears=Math.min(n,m.arrears);m.arrears=round(m.arrears-arrears);m.debt=round(m.debt-(n-arrears));game.florins=round(game.florins-n);return n;}
function populationBasket(c,sol){const n=num(c.people)/1000,lux=clamp((sol-30)/45,.1,1.4);return {grain:n*1.4,food:n*2,timber:n*.35,salt:n*.07,cloth:n*.17,leather:n*.08,ale:n*.2*lux,wine:n*.07*lux,glass:n*.025*lux,services:n*.45*lux};}
function take(stock,id,quantity){const n=Math.min(stock[id],Math.max(0,quantity));stock[id]-=n;return n;}
export function tickEconomy1300(game,cities,{baseExpenses=0}={}){
 const m=ensureMarket1300(game,cities),e=game.economy;
 if(m.lastTickDay===game.day)return {completed:[],duplicate:true};
 const days=daysInMonth1300(game.day),dt=1/days,date=new Date(Date.UTC(1300,0,1+game.day)),season=[.86,.86,.96,1,1,1.06,1.12,1.25,1.25,1.06,.9,.86][date.getUTCMonth()];
 const supply=map(),demand=map(),stock=map(),opening=map(),used=map(),imports=map(),exports=map();
 for(const g of GOODS_1300)stock[g.id]=opening[g.id]=m.goods[g.id].stock;
 const sectors=[];let population=0,workforce=0,workersTotal=0,weightedAccess=0;
 const previous=e.lastEconomy||{};e.employment=dictionary(e.employment);e.lastEconomy={};
 let builderLevels=0,tradeLevels=0,soldiers=0,ships=0;
 for(const c of cities){
  const rows=provinceBuildings1300(game,c),n=num(c.people)/1000,p=m.population[c.id],labour=Math.max(1,Math.round(num(c.people)*.34));population+=num(c.people);workforce+=labour;
  const level=id=>rows.find(b=>b.id===id)?.level||0;
  const infra=level('roads')*2+level('bridge')+level('warehouse')+level('market')+level('dockyard');
  const industrial=rows.reduce((a,b)=>a+b.level,0);
  p.access=clamp(.88+infra*.025-industrial*.004,.4,1);weightedAccess+=p.access*num(c.people);
  soldiers+=num(c.army)+rows.reduce((n,b)=>n+num(b.effects.army)*b.level,0);ships+=num(c.navy)+rows.reduce((n,b)=>n+num(b.effects.navy)*b.level,0);
  builderLevels+=level('builders');tradeLevels+=level('warehouse')+level('merchantquarter')+level('dockyard')*2+level('roads');
  // Rural hinterland: subsistence output prevents an urban-only economy from starting empty.
  const rural={grain:n*1.9*season,food:n*1.45,timber:n*.55,wool:n*.12,hides:n*.09,stone:n*.12,iron:n*.045};
  for(const [id,q] of Object.entries(rural)){supply[id]+=q;stock[id]+=q*dt;}
  const basket=populationBasket(c,p.sol);for(const [id,q] of Object.entries(basket))demand[id]+=q;
  e.employment[c.id]=dictionary(e.employment[c.id]);e.lastEconomy[c.id]={};
  const active=rows.filter(b=>b.level>0).map(b=>{
   const settings=sectorSettings1300(game,c.id,b.id),method=METHODS_1300[settings.method]||METHODS_1300.traditional;
   const wage=clamp(num(e.buildingWages?.[c.id]?.[b.id],num(e.cityWages?.[c.id],num(e.nationalWage,.12))),.02,.5);
   const capacity=Math.round(b.maxWorkers*b.level*method.workers);
   return {c,b,settings,method,wage,capacity,old:num(e.employment[c.id][b.id]),score:settings.priority*10+wage/b.normalWage};
  }).sort((a,b)=>b.score-a.score||a.b.id.localeCompare(b.b.id));
  // Allocate the whole labour pool once. Smooth hiring, but never allow oversubscription.
  let remaining=labour,employed=0;
  for(const s of active){
   const prev=previous[c.id]?.[s.b.id],viability=!s.settings.subsidy&&prev?.profit<0?clamp(1+prev.profit/Math.max(1,prev.wageBill+prev.inputCost),.15,1):1;
   const desired=s.settings.paused?0:Math.round(s.capacity*clamp(.25+.65*s.wage/s.b.normalWage,.15,1)*viability);
   const target=Math.min(remaining,desired),workers=s.settings.paused?0:Math.min(remaining,Math.round(clamp(target,s.old-Math.max(5,s.capacity*.06),s.old+Math.max(5,s.capacity*.06))));
   s.workers=clamp(workers,0,s.capacity);remaining-=s.workers;employed+=s.workers;
   e.employment[c.id][s.b.id]=s.workers;
   const r=RECIPES_1300[s.b.id],fill=s.workers/Math.max(1,s.capacity),eff=fill*s.b.level*p.access*(.8+num(c.technology)/250);
   s.input=Object.fromEntries(Object.entries(r.input).map(([id,q])=>[id,q*eff*s.method.inputs]));
   if(s.method.tools&&!s.settings.paused)s.input.tools=(s.input.tools||0)+s.method.tools*eff;
   s.output=Object.fromEntries(Object.entries(r.output).map(([id,q])=>[id,q*eff*s.method.output*(s.b.id==='fields'?season:1)]));
   for(const [id,q] of Object.entries(s.input))demand[id]+=q;
   s.tier=r.tier;sectors.push(s);
  }
  p.employment=employed/labour;workersTotal+=employed;
 }
 const military={food:soldiers/800,arms:soldiers/1800,ships:ships/60};
 for(const [id,q] of Object.entries(military))demand[id]+=q;
 const activeProjects=m.queue.slice(0,2),speed=(m.constructionFocus==='building'?1.5:1)*(1+Math.min(1,builderLevels*.06));
 for(const q of activeProjects)for(const [id,total] of Object.entries(q.materials))demand[id]+=total/q.required*days*speed;
 const law=TRADE_LAWS_1300[m.tradeLaw],capacity=(population/1000*2+tradeLevels*10+30)*law.capacity;
 const potential=map();for(const s of sectors)for(const [id,q] of Object.entries(s.output))potential[id]+=q;
 // Merchants fund trade. Ports/roads and the trade law bound total monthly throughput.
 let tradeLeft=capacity*dt;
 const orders=GOODS_1300.filter(g=>g.tradable&&m.routes[g.id]!=='off'&&m.routes[g.id]!=='export').map(g=>{
  const coverage=m.routes[g.id]==='import'?.65:.28;
  const wanted=Math.max(0,demand[g.id]*coverage-stock[g.id]-potential[g.id]*dt);
  return {g,wanted,priority:m.routes[g.id]==='import'?2:1};
 }).sort((a,b)=>b.priority-a.priority||((stock[a.g.id]/Math.max(.1,demand[a.g.id]))-(stock[b.g.id]/Math.max(.1,demand[b.g.id]))));
 let tariff=0;
 for(const {g,wanted} of orders){const q=Math.min(wanted,tradeLeft);tradeLeft-=q;stock[g.id]+=q;imports[g.id]=q/dt;tariff+=q*g.basePrice*law.tariff/dt;}
 // Clear recipes by tier with proportional input rationing within each tier.
 for(let tier=0;tier<=3;tier++){
  const batch=sectors.filter(s=>s.tier===tier),needed=map();
  for(const s of batch)for(const [id,q] of Object.entries(s.input))needed[id]+=q*dt;
  for(const s of batch){
   s.fulfilment=Math.min(1,...Object.entries(s.input).map(([id])=>needed[id]>0?stock[id]/needed[id]:1));
   s.fulfilment=clamp(s.fulfilment,0,1);
  }
  for(const s of batch){
   for(const [id,q] of Object.entries(s.input)){const n=take(stock,id,q*dt*s.fulfilment);used[id]+=n/dt;}
   for(const [id,q] of Object.entries(s.output)){const n=q*s.fulfilment;stock[id]+=n*dt;supply[id]+=n;}
  }
 }
 // Construction uses real materials; partial deliveries create proportional progress.
 const completed=[];
 for(const q of activeProjects){
  const step=Math.min(speed,q.required-q.work),fraction=step/q.required;
  const ratio=clamp(Math.min(1,...Object.entries(q.materials).map(([id,total])=>total*fraction>0?stock[id]/(total*fraction):1)),0,1);
  for(const [id,total] of Object.entries(q.materials))used[id]+=take(stock,id,total*fraction*ratio)/dt;
  q.work=Math.min(q.required,q.work+step*ratio);q.status=ratio<.95?'Materials shortage':'Building';
  if(q.work>=q.required-.00001){game.buildings??={};game.buildings[q.cityId]??={};game.buildings[q.cityId][q.buildingId]=num(game.buildings[q.cityId][q.buildingId])+1;completed.push(q);}
 }
 m.queue=m.queue.filter(q=>!completed.includes(q));
 // Population and military consume after production. All cities receive the same market ration.
 const household=map();for(const c of cities)for(const [id,q] of Object.entries(populationBasket(c,m.population[c.id].sol)))household[id]+=q;
 const availability=map();
 for(const g of GOODS_1300){const q=(household[g.id]+(military[g.id]||0))*dt;availability[g.id]=q>0?clamp(stock[g.id]/q,0,1):1;used[g.id]+=take(stock,g.id,q)/dt;}
 for(const g of GOODS_1300){
  const mode=m.routes[g.id];
  if(g.tradable&&['auto','export'].includes(mode)&&tradeLeft>0){const reserve=demand[g.id]*(mode==='export'?.2:.8);const q=Math.min(Math.max(0,stock[g.id]-reserve),tradeLeft);stock[g.id]-=q;tradeLeft-=q;exports[g.id]=q/dt;tariff+=q*g.basePrice*law.tariff/dt;}
  const supplied=supply[g.id]+imports[g.id]+opening[g.id]/.6,desired=demand[g.id]+exports[g.id];
  const ratio=desired/Math.max(.1,supplied);
  const target=g.basePrice*clamp(.6+ratio*.7,.4,2.8)*(imports[g.id]>0?1+law.tariff:1);
  const price=clamp(m.goods[g.id].price*.9+target*.1,g.basePrice*.4,g.basePrice*2.8);
  const spoilage=['grain','flour','food'].includes(g.id)?.006:g.tradable?.001:.08;
  m.goods[g.id]={price,stock:Math.max(0,stock[g.id]*(1-spoilage)),supply:supply[g.id],demand:demand[g.id],imports:imports[g.id],exports:exports[g.id],consumed:used[g.id],shortage:Math.max(0,demand[g.id]-used[g.id])};
 }
 let sectorTax=0,payrollTax=0,subsidies=0,gdp=0,profits=0;
 const taxRate=clamp(num(e.taxRate,10),0,30)/100,collection=clamp(1-num(e.corruption,20)/150,.25,1);
 for(const s of sectors){
  let gross=0,inputCost=0;
  for(const [id,q] of Object.entries(s.output)){
   const soldRatio=clamp((used[id]+exports[id])/Math.max(.01,supply[id]+imports[id]),0,1);
   gross+=q*s.fulfilment*m.goods[id].price*soldRatio;
   gdp+=q*s.fulfilment*m.goods[id].price;
  }
  for(const [id,q] of Object.entries(s.input))inputCost+=q*s.fulfilment*m.goods[id].price;
  const wageBill=s.workers/100*s.wage*10,profit=gross-inputCost-wageBill,tax=Math.max(0,profit)*taxRate*collection;
  const subsidy=s.settings.subsidy?Math.max(0,-profit):0;subsidies+=subsidy;sectorTax+=tax;payrollTax+=wageBill*taxRate*.35*collection;profits+=Math.max(0,profit-tax);
  e.lastEconomy[s.c.id][s.b.id]={workers:s.workers,capacity:s.capacity,wage:s.wage,gross,wageBill,inputCost,profit,tax,subsidy,fulfilment:s.fulfilment,method:s.settings.method,input:s.input,output:Object.fromEntries(Object.entries(s.output).map(([id,q])=>[id,q*s.fulfilment]))};
 }
 const landTax=population/1000*.6*(taxRate/.1)*collection;
 const revenue=sectorTax+payrollTax+landTax+tariff,interest=m.debt*.012;
 e.monthlyTax=round(sectorTax+payrollTax+landTax);e.monthRevenue=round(revenue);e.monthExpenses=round(baseExpenses+subsidies+interest);
 m.budget={sectorTax,payrollTax,landTax,tariffs:tariff,subsidies,interest,baseExpenses};
 m.investmentPool=Math.min(1e6,m.investmentPool+profits*.08*dt);
 m.gdp=gdp;m.workers=workersTotal;m.workforce=workforce;m.access=population?weightedAccess/population:1;m.tradeCapacity=capacity;m.tradeUsed=capacity-tradeLeft/dt;m.season=season;
 m.accrued.tax+=(sectorTax+payrollTax+landTax)*dt;m.accrued.tariffs+=tariff*dt;m.accrued.expenses+=baseExpenses*dt;m.accrued.subsidies+=subsidies*dt;m.accrued.interest+=interest*dt;m.accrued.days++;
 let sol=0,fulfilment=0;
 for(const c of cities){
  const p=m.population[c.id],basket=populationBasket(c,p.sol);let needed=0,met=0,base=0;
  for(const [id,q] of Object.entries(basket)){const value=q*m.goods[id].price;needed+=value;met+=value*availability[id];base+=q*GOOD_1300[id].basePrice;}
  const citySectors=Object.values(e.lastEconomy[c.id]),employed=citySectors.reduce((n,s)=>n+s.workers,0);
  const wage=employed?citySectors.reduce((n,s)=>n+s.workers*s.wage,0)/employed:clamp(num(e.cityWages?.[c.id],num(e.nationalWage,.12)),.02,.5);
  const purchasing=clamp((.8+p.employment*(wage/.12)*.8)*(1-taxRate*.8)*base/Math.max(.1,needed),.1,1.5);
  p.fulfilment=needed?met/needed:1;
  const food=availability.food*.6+availability.grain*.4;
  const target=clamp(25+30*Math.min(1.4,purchasing)+p.employment*12-(1-food)*40-(1-p.fulfilment)*20,5,95);
  p.sol=clamp(p.sol+(target-p.sol)*.025,0,100);
  p.unrest=clamp(60-p.sol+(1-food)*35+taxRate*30+m.arrears/Math.max(20,creditLimit1300(cities))*15,0,100);
  sol+=p.sol*num(c.people);fulfilment+=p.fulfilment*num(c.people);
 }
 m.sol=population?sol/population:50;m.fulfilment=population?fulfilment/population:1;
 m.alerts=[];
 if(m.fulfilment<.8)m.alerts.push('Household shortages are reducing living standards. Import staples or expand food production.');
 if(m.access<.8)m.alerts.push('Market access is low. Build roads, bridges or warehouses.');
 if(sectors.some(s=>s.fulfilment<.6&&s.workers>0))m.alerts.push('Some workshops lack inputs. Check production chains or prioritise imports.');
 if(e.monthRevenue<e.monthExpenses)m.alerts.push('The state budget is in deficit. Review taxes, subsidies and administration.');
 if(m.arrears>0)m.alerts.push('Unpaid bills are increasing unrest. Restore a surplus and repay arrears.');
 m.lastTickDay=game.day;return {completed};
}
export function settleMarketMonth1300(game,cities,label){
 const m=ensureMarket1300(game,cities),e=game.economy,a=m.accrued;
 const revenue=round(a.tax+a.tariffs),expenses=round(a.expenses+a.subsidies+a.interest),balance=round(revenue-expenses);
 let cash=round(num(game.florins)+balance);
 if(cash<0){const borrowed=Math.min(-cash,Math.max(0,creditLimit1300(cities)-m.debt));m.debt=round(m.debt+borrowed);cash=round(cash+borrowed);if(cash<0){m.arrears=round(m.arrears-cash);cash=0;}}
 game.florins=cash;e.lastMonthRevenue=revenue;e.lastMonthExpenses=expenses;e.lastMonthBalance=balance;e.lastMonthLabel=label;
 m.history.push({label,gdp:round(num(m.gdp)),sol:round(num(m.sol,50)),balance,treasury:cash,debt:m.debt,arrears:m.arrears});m.history=m.history.slice(-24);
 m.accrued={tax:0,tariffs:0,expenses:0,subsidies:0,interest:0,days:0};
 return {revenue,expenses,balance};
}
