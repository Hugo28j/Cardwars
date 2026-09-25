// Cardwars c.1300 Victoria-style market core.
// Pure simulation module: UI/state orchestration stays in app.js.

export const GOODS_1300=[
 {id:'grain',name:'Grain',basePrice:20,category:'food'},
 {id:'fish',name:'Fish',basePrice:24,category:'food'},
 {id:'meat',name:'Meat',basePrice:32,category:'food'},
 {id:'wool',name:'Wool',basePrice:22,category:'raw'},
 {id:'cloth',name:'Cloth',basePrice:38,category:'consumer'},
 {id:'wood',name:'Wood',basePrice:25,category:'raw'},
 {id:'stone',name:'Stone',basePrice:24,category:'raw'},
 {id:'iron',name:'Iron',basePrice:34,category:'raw'},
 {id:'tools',name:'Tools',basePrice:42,category:'industrial'},
 {id:'leather',name:'Leather',basePrice:36,category:'consumer'},
 {id:'salt',name:'Salt',basePrice:28,category:'food'},
 {id:'ale',name:'Beer',basePrice:30,category:'consumer'},
 {id:'services',name:'Services',basePrice:26,category:'service'},
 {id:'manuscripts',name:'Manuscripts',basePrice:55,category:'knowledge'},
 {id:'arms',name:'Arms',basePrice:58,category:'military'},
 {id:'ships',name:'Ships',basePrice:75,category:'military'}
];
export const GOOD_1300=Object.fromEntries(GOODS_1300.map(g=>[g.id,g]));
export const COMPANY_OUTPUT_MULTIPLIER_1300=1.125;

export const BUILDING_PRODUCTION_1300={
 fields:{professions:{farmers:.78,laborers:.22},inputs:{},outputs:{grain:72}},
 pastures:{professions:{farmers:.72,laborers:.28},inputs:{},outputs:{meat:9.844,wool:15.469}},
 textiles:{professions:{craftsmen:.68,laborers:.27,merchants:.05},inputs:{wool:10},outputs:{cloth:14.625}},
 forge:{professions:{craftsmen:.62,laborers:.30,merchants:.08},inputs:{iron:8,wood:2},outputs:{tools:9,arms:4.5}},
 market:{professions:{merchants:.55,laborers:.35,clerks:.10},inputs:{cloth:.8,ale:.6},outputs:{services:25.313}},
 barracks:{professions:{soldiers:.78,officers:.08,laborers:.14},inputs:{grain:3,arms:1.2},outputs:{services:12.375}},
 dockyard:{professions:{craftsmen:.48,laborers:.42,merchants:.10},inputs:{wood:12,cloth:3,tools:2},outputs:{ships:6.75,fish:9,services:4.5}},
 walls:{professions:{laborers:.75,craftsmen:.25},inputs:{},outputs:{}},
 guildhall:{professions:{craftsmen:.50,merchants:.28,clerks:.22},inputs:{cloth:1,tools:.8},outputs:{services:19.688}},
 university:{professions:{scholars:.50,clergy:.25,clerks:.25},inputs:{manuscripts:2},outputs:{services:10.125,manuscripts:3.375}},
 watermill:{professions:{laborers:.48,craftsmen:.32,farmers:.20},inputs:{wood:.8,tools:.8},outputs:{grain:20.25}},
 brewery:{professions:{craftsmen:.55,laborers:.35,merchants:.10},inputs:{grain:11,wood:.5},outputs:{ale:15.75}},
 tannery:{professions:{craftsmen:.55,laborers:.40,merchants:.05},inputs:{meat:4,salt:1},outputs:{leather:9}},
 fishery:{professions:{laborers:.78,merchants:.12,craftsmen:.10},inputs:{},outputs:{fish:15.75}},
 saltworks:{professions:{laborers:.80,merchants:.12,craftsmen:.08},inputs:{wood:.5},outputs:{salt:16.875}},
 quarry:{professions:{laborers:.84,craftsmen:.16},inputs:{},outputs:{stone:14.625}},
 lumberyard:{professions:{laborers:.82,craftsmen:.18},inputs:{},outputs:{wood:15.75}},
 ironworks:{professions:{craftsmen:.42,laborers:.50,merchants:.08},inputs:{tools:2},outputs:{iron:11.25}},
 mint:{professions:{craftsmen:.40,clerks:.35,merchants:.25},inputs:{iron:2,tools:.5},outputs:{services:7.875},directFlorins:15},
 monastery:{professions:{clergy:.58,farmers:.20,scholars:.12,laborers:.10},inputs:{grain:2},outputs:{manuscripts:5.063,services:10.125}},
 cathedral:{professions:{clergy:.55,clerks:.20,scholars:.15,laborers:.10},inputs:{grain:1,cloth:.5},outputs:{services:11.25,manuscripts:2.25}},
 hospital:{professions:{clergy:.30,clerks:.20,laborers:.50},inputs:{grain:2,cloth:1},outputs:{services:10.125}}
};

const POP_ARCHETYPES=[
 {id:'peasants',name:'Peasants',wealth:8},{id:'laborers',name:'Laborers',wealth:9},
 {id:'craftsmen',name:'Craftsmen',wealth:12},{id:'burghers',name:'Burghers',wealth:16},
 {id:'clergy',name:'Clergy',wealth:15},{id:'nobles',name:'Nobles',wealth:22}
];
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const round=(n,p=4)=>{const m=10**p;return Math.round((Number(n)||0)*m)/m;};
const WEEKS_PER_MONTH=52/12,FLORINS_PER_MARKET_VALUE=.05,POP_FOOD_DEMAND_PER_1000=3.6,BUILDING_MAINTENANCE_INPUT_SHARE=.35,REALM_PRICE_FOOD_SERVICE_INTEGRATION=.62,REALM_PRICE_OTHER_INTEGRATION=.42;

function blankGood(g,previous){const price=Number(previous?.price);return {goodId:g.id,supply:0,demand:0,price:Number.isFinite(price)&&price>0?price:g.basePrice,targetPrice:g.basePrice,basePrice:g.basePrice};}
function ensureMarket(previous={}){const goods={};for(const g of GOODS_1300)goods[g.id]=blankGood(g,previous?.goods?.[g.id]);return {goods,marketAccess:Number.isFinite(Number(previous?.marketAccess))?Number(previous.marketAccess):1,priceIndex:Number.isFinite(Number(previous?.priceIndex))?Number(previous.priceIndex):1};}
function addOrder(row,key,amount){if(row&&Number(amount)>0)row[key]+=Number(amount);}
function normalizedPrice(market,id){const g=GOOD_1300[id],p=market.goods[id]?.price||g?.basePrice||1;return p/(g?.basePrice||p||1);}
function priceDemandMultiplier1300(market,id,elasticity=.9,min=.55,max=3){const priceRatio=clamp(normalizedPrice(market,id),.25,3);return clamp(Math.pow(1/priceRatio,elasticity),min,max);}
function allocateSubstitutes(market,ids,total,preferences={},priceElasticity=1.35){const weighted=ids.map(id=>[id,(preferences[id]??1)/Math.pow(Math.max(.25,normalizedPrice(market,id)),priceElasticity)]),sum=weighted.reduce((n,[,w])=>n+w,0)||1;return Object.fromEntries(weighted.map(([id,w])=>[id,total*w/sum]));}
function createPopGroups(city,previous){
 const population=Math.max(1,Number(city.population)||1),urban=clamp((Number(city.economy)||50)/100,0,1),tech=clamp((Number(city.technology)||50)/100,0,1),shares={peasants:clamp(.68-urban*.30-tech*.08,.28,.68),laborers:.16+urban*.08,craftsmen:.07+urban*.07,burghers:.04+urban*.07,clergy:.04,nobles:.03},total=Object.values(shares).reduce((a,b)=>a+b,0);
 return POP_ARCHETYPES.map(a=>{const old=previous?.groups?.find(g=>g.id===a.id),size=Math.round(population*(shares[a.id]/total));return {id:a.id,name:a.name,size,wealth:round(old?.wealth??a.wealth,2),standardOfLiving:round(old?.standardOfLiving??a.wealth,2),employed:Math.round(Number(old?.employed)||0)};});
}
function ambientSupply(city,market){
 const k=Math.max(.1,Number(city.population||0)/1000),food=clamp(Number(city.food)||50,0,100)/100,econ=clamp(Number(city.economy)||50,0,100)/100;
 addOrder(market.goods.grain,'supply',k*(.55+food*.65)*(1+(Number(city.grainBonusPct)||0)/100));addOrder(market.goods.meat,'supply',k*(.07+food*.10));addOrder(market.goods.wool,'supply',k*(.09+food*.10));addOrder(market.goods.wood,'supply',k*(.14+food*.14));addOrder(market.goods.stone,'supply',k*(.04+econ*.04));addOrder(market.goods.iron,'supply',k*(.012+econ*.018));addOrder(market.goods.salt,'supply',k*.025);addOrder(market.goods.services,'supply',k*(.12+econ*.18));if(city.coastal)addOrder(market.goods.fish,'supply',k*.18);
}
function popOrders(city,market,popState){
 const k=Math.max(.1,Number(city.population||0)/1000),groups=popState.groups||[],pop=Math.max(1,groups.reduce((n,g)=>n+g.size,0)),avgWealth=groups.reduce((n,g)=>n+g.wealth*g.size,0)/pop,wealthFactor=clamp(.75+(avgWealth-8)*.025,.7,1.45),food=allocateSubstitutes(market,['grain','fish','meat'],k*POP_FOOD_DEMAND_PER_1000,{grain:2.30,fish:city.coastal?1.20:.60,meat:.90},1.35);
 for(const [id,n] of Object.entries(food))addOrder(market.goods[id],'demand',n*priceDemandMultiplier1300(market,id,1.05,.65,2.6));
 addOrder(market.goods.cloth,'demand',k*.25*wealthFactor*priceDemandMultiplier1300(market,'cloth',.95,.60,2.7));
 addOrder(market.goods.wood,'demand',k*.10*priceDemandMultiplier1300(market,'wood',.65,.70,2.0));
 addOrder(market.goods.salt,'demand',k*.12*priceDemandMultiplier1300(market,'salt',.65,.70,2.0));
 addOrder(market.goods.ale,'demand',k*.18*wealthFactor*priceDemandMultiplier1300(market,'ale',1.0,.55,2.8));
 addOrder(market.goods.leather,'demand',k*.08*wealthFactor*priceDemandMultiplier1300(market,'leather',.9,.60,2.5));
 addOrder(market.goods.services,'demand',k*(2.20+1.00*wealthFactor)*priceDemandMultiplier1300(market,'services',.9,.60,2.7));
 if(avgWealth>15){addOrder(market.goods.manuscripts,'demand',k*.015*(avgWealth-14)*priceDemandMultiplier1300(market,'manuscripts',.9,.55,2.6));addOrder(market.goods.cloth,'demand',k*.05*priceDemandMultiplier1300(market,'cloth',1.0,.55,2.8));}
}
function buildingMaintenanceOrders1300(city,market){
 for(const sector of city.sectors||[]){
  const level=Math.max(0,Number(sector.level)||0);if(level<=0)continue;
  const p=sectorPotential(sector,city),inputs=p.def.inputs||{},maintenanceScale=level*BUILDING_MAINTENANCE_INPUT_SHARE;
  for(const [id,n] of Object.entries(inputs))addOrder(market.goods[id],'demand',Math.max(0,Number(n)||0)*maintenanceScale*priceDemandMultiplier1300(market,id,.45,.80,1.60));
  addOrder(market.goods.tools,'demand',level*.12*priceDemandMultiplier1300(market,'tools',.45,.80,1.60));
  addOrder(market.goods.wood,'demand',level*.08*priceDemandMultiplier1300(market,'wood',.40,.82,1.50));
  addOrder(market.goods.stone,'demand',level*.04*priceDemandMultiplier1300(market,'stone',.40,.82,1.50));
  if(['forge','ironworks','mint','dockyard'].includes(sector.id))addOrder(market.goods.iron,'demand',level*.08*priceDemandMultiplier1300(market,'iron',.45,.80,1.60));
  if(['university','monastery','cathedral'].includes(sector.id))addOrder(market.goods.manuscripts,'demand',level*.10*priceDemandMultiplier1300(market,'manuscripts',.50,.78,1.70));
  if(['barracks','dockyard'].includes(sector.id))addOrder(market.goods.arms,'demand',level*.08*priceDemandMultiplier1300(market,'arms',.45,.80,1.60));
 }
}
function infrastructure(city){const levels=(city.sectors||[]).reduce((n,s)=>n+(Number(s.level)||0),0),support=(city.sectors||[]).reduce((n,s)=>n+(['market','warehouse','merchantquarter','customshouse','bridge','dockyard'].includes(s.id)?Number(s.level)||0:0),0),capacity=10+(Number(city.economy)||50)/5+support*4,usage=Math.max(1,levels*1.7);return {capacity,usage,access:clamp(capacity/usage,.35,1)};}
function updatePrices(market){
 for(const g of GOODS_1300){const row=market.goods[g.id],s=row.supply,d=row.demand,imbalance=(d-s)/Math.max(s,d,1),modifier=clamp(imbalance*.75,-.75,.75);row.targetPrice=round(g.basePrice*(1+modifier),4);row.price=round(row.price+(row.targetPrice-row.price)*.15,4);}
 const basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]];market.priceIndex=round(basket.reduce((n,[id,w])=>n+normalizedPrice(market,id)*w,0),4);
}
function integrateRealmPrices1300(markets){
 const marketList=Object.values(markets||{});if(marketList.length<2)return;
 for(const g of GOODS_1300){
  const entries=marketList.map(m=>{const row=m.goods[g.id],s=Math.max(0,Number(row.supply)||0),d=Math.max(0,Number(row.demand)||0),price=Math.max(.01,Number(row.price)||g.basePrice);return {m,row,s,d,price,surplus:Math.max(0,s-d)};});
  const totalSupply=entries.reduce((n,x)=>n+x.s,0),totalDemand=entries.reduce((n,x)=>n+x.d,0),totalWeight=entries.reduce((n,x)=>n+Math.max(1,x.s+x.d),0),weightedLocal=entries.reduce((n,x)=>n+x.price*Math.max(1,x.s+x.d),0)/Math.max(1,totalWeight),imbalance=(totalDemand-totalSupply)/Math.max(totalSupply,totalDemand,1),realmTarget=g.basePrice*(1+clamp(imbalance*.65,-.62,.62)),surplusWeight=entries.reduce((n,x)=>n+x.surplus,0),surplusPrice=surplusWeight>0?entries.reduce((n,x)=>n+x.price*x.surplus,0)/surplusWeight:weightedLocal,oversupplied=totalSupply>totalDemand,realmReference=clamp((weightedLocal*.45+realmTarget*.55)*(oversupplied?.72:1)+(oversupplied?surplusPrice*.28:0),g.basePrice*.28,g.basePrice*1.75);
  for(const x of entries){const access=clamp(Number(x.m.marketAccess)||1,.25,1),baseIntegration=(g.category==='food'||g.category==='service')?REALM_PRICE_FOOD_SERVICE_INTEGRATION:REALM_PRICE_OTHER_INTEGRATION,integration=clamp(baseIntegration*(.55+.45*access),.18,.72);x.row.realmPrice=round(realmReference,4);x.row.price=round(x.price+(realmReference-x.price)*integration,4);}
 }
 const basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]];
 for(const market of marketList)market.priceIndex=round(basket.reduce((n,[id,w])=>n+normalizedPrice(market,id)*w,0),4);
}
function sectorPotential(sector,city){const def=sector.production||BUILDING_PRODUCTION_1300[sector.id]||{inputs:{},outputs:{services:1}},level=Math.max(0,Number(sector.level)||0),capacity=Math.max(1,Number(sector.capacity)||1),workers=clamp(Number(sector.workers)||0,0,capacity),employmentRatio=workers/capacity,technologyFactor=.86+clamp(Number(city.technology)||50,0,100)/500,economyOfScale=1+Math.min(level*.01,.30);return {def,level,capacity,workers,employmentRatio,potential:level*employmentRatio*technologyFactor*economyOfScale};}
function updatePops(city,market,previous,sectors){
 const wageBenchmark=Math.max(.01,Number(city.expectedWage)||.08),groups=createPopGroups(city,previous),population=groups.reduce((n,g)=>n+g.size,0)||1,totalWorkers=sectors.reduce((n,s)=>n+s.workers,0),employmentRate=clamp(totalWorkers/Math.max(1,Number(city.labourPool)||population*.34),0,1),weightedWage=sectors.reduce((n,s)=>n+s.wage*s.workers,0)/Math.max(1,totalWorkers),realWage=(weightedWage||.08)/wageBenchmark/Math.max(.45,market.priceIndex),employedTotal=Math.min(totalWorkers,Math.round(population*.34));
 let remaining=employedTotal;for(const id of ['craftsmen','laborers','burghers','peasants','clergy','nobles']){const g=groups.find(x=>x.id===id);if(!g)continue;const cap=Math.round(g.size*(id==='peasants'?.45:.72)),take=Math.min(cap,remaining);g.employed=take;remaining-=take;}
 for(const g of groups){const employment=g.size?g.employed/g.size:0,base=POP_ARCHETYPES.find(x=>x.id===g.id)?.wealth||10,target=base+(realWage-1)*2.4+(employment-.45)*1.6;g.wealth=round(clamp(g.wealth+(target-g.wealth)*.08,3,35),2);g.standardOfLiving=round(clamp(g.wealth+(1-market.priceIndex)*1.2,2,40),2);}
 return {groups,employmentRate:round(employmentRate,4),averageWealth:round(groups.reduce((n,g)=>n+g.wealth*g.size,0)/population,2),averageStandardOfLiving:round(groups.reduce((n,g)=>n+g.standardOfLiving*g.size,0)/population,2)};
}

export function simulateWeeklyEconomy1300({cities=[],previousMarkets={},previousPops={},taxRate=10,taxCollectionFactor=.35}={}){
 const markets={},pops={},sectorsByCity={};let weeklyTax=0;
 for(const city of cities){
  const market=markets[city.id]=ensureMarket(previousMarkets?.[city.id]),popState={groups:createPopGroups(city,previousPops?.[city.id])};ambientSupply(city,market);popOrders(city,market,popState);buildingMaintenanceOrders1300(city,market);
  for(const sector of city.sectors||[]){if((Number(sector.level)||0)<=0)continue;const p=sectorPotential(sector,city);for(const [id,n] of Object.entries(p.def.inputs||{}))addOrder(market.goods[id],'demand',n*p.potential);for(const [id,n] of Object.entries(p.def.outputs||{}))addOrder(market.goods[id],'supply',n*p.potential);}
 }
 for(const market of Object.values(markets))updatePrices(market);
 integrateRealmPrices1300(markets);
 for(const city of cities){
  const market=markets[city.id],infra=infrastructure(city),rows=sectorsByCity[city.id]={};market.marketAccess=round(infra.access,4);
  for(const sector of city.sectors||[]){
   if((Number(sector.level)||0)<=0)continue;const p=sectorPotential(sector,city),inputIds=Object.keys(p.def.inputs||{}),availability=inputIds.length?Math.min(...inputIds.map(id=>clamp(market.goods[id].supply/Math.max(market.goods[id].demand,1e-6),.15,1))):1,throughput=clamp(p.employmentRatio*availability*infra.access,0,1.15),scale=p.level*throughput*(.86+clamp(Number(city.technology)||50,0,100)/500)*(1+Math.min(p.level*.01,.30));
   let revenueValue=0,inputValue=0;const outputs={},inputs={};
   for(const [id,n] of Object.entries(p.def.outputs||{})){const q=n*scale;outputs[id]=round(q,3);revenueValue+=q*market.goods[id].price;}
   for(const [id,n] of Object.entries(p.def.inputs||{})){const q=n*scale;inputs[id]=round(q,3);inputValue+=q*market.goods[id].price;}
   const directFlorins=Math.max(0,Number(p.def.directFlorins)||0)*scale,weeklyRevenue=revenueValue*FLORINS_PER_MARKET_VALUE+directFlorins,weeklyInputCost=inputValue*FLORINS_PER_MARKET_VALUE,monthlyWage=Math.max(.05,Number(sector.wage)||.08),weeklyWageCost=p.workers*(monthlyWage/WEEKS_PER_MONTH),weeklyProfit=weeklyRevenue-weeklyInputCost-weeklyWageCost,weeklySectorTax=Math.max(0,weeklyProfit)*(clamp(Number(taxRate)||0,0,100)/100)*taxCollectionFactor;weeklyTax+=weeklySectorTax;
   const monthly=x=>round(x*WEEKS_PER_MONTH,4);rows[sector.id]={workers:p.workers,capacity:p.capacity,wage:Number(sector.wage)||0,employmentRatio:round(p.employmentRatio,4),inputAvailability:round(availability,4),marketAccess:round(infra.access,4),throughput:round(throughput,4),inputs,outputs,gross:monthly(weeklyRevenue),inputCost:monthly(weeklyInputCost),wageBill:monthly(weeklyWageCost),profit:monthly(weeklyProfit),tax:monthly(weeklySectorTax)};
  }
  pops[city.id]=updatePops(city,market,previousPops?.[city.id],Object.values(rows));
 }
 return {markets,pops,sectorsByCity,weeklyTax:round(weeklyTax,4),monthlyTaxEstimate:round(weeklyTax*WEEKS_PER_MONTH,2)};
}
export function aggregateMarkets1300(markets={}){
 const rows={};for(const g of GOODS_1300)rows[g.id]={id:g.id,name:g.name,basePrice:g.basePrice,supply:0,demand:0,priceWeighted:0,weight:0};
 for(const market of Object.values(markets||{}))for(const g of GOODS_1300){const m=market?.goods?.[g.id];if(!m)continue;const weight=Math.max(1,m.supply+m.demand);rows[g.id].supply+=m.supply;rows[g.id].demand+=m.demand;rows[g.id].priceWeighted+=m.price*weight;rows[g.id].weight+=weight;}
 return Object.values(rows).map(r=>{const price=r.weight?r.priceWeighted/r.weight:r.basePrice;return {...r,supply:round(r.supply,2),demand:round(r.demand,2),price:round(price,2),changePct:round((price/r.basePrice-1)*100,1)};});
}
