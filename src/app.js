import {PLAYER_REALM, DIP_ACTIONS, diplomacyState, relation, opinion, attitude, acceptance, performAction, weeklyDiplomacy, relationSlots, availableCasusBelli1300} from './diplomacy1300.js?v=20260926-rebellion-cb-v21';
import {CITIES_1300,CITY_1300,SUPPORT_TERRITORIES_1300,RARITIES_1300,RARITY_COLORS_1300,RESEARCH_1300_NOTE} from './data1300.js?v=20260922-army-five-percent-v5';
import {freshProfile,migrateProfile,validateProfile} from './engine.js?v=20260921-player-realm-v7';
import {ECONOMY_1300,BUILDINGS_1300,BUILDING_1300,isCoastalCity1300,startingBuildingLevel1300,buildingCost1300} from './buildings1300.js?v=20260925-treasury-grain-market-v9';
import {icon} from './icons.js?v=20260926-hud-notifications-v3';
import {GOOGLE_CLIENT_ID} from './auth-config.js?v=20260921-auth-v1';
import {WorldMap} from './map.js?v=20260926-battle-movement-v10';
import {TECH_BRANCHES_1300,TECHNOLOGIES_1300,TECHNOLOGY_1300,freshTechnologyState1300,normaliseTechnologyState1300,technologyAvailable1300,technologyResearchCost1300,technologyBonuses1300,branchUnlockedCount1300,applyWeeklyResearch1300} from './technology1300.js?v=20260926-military-unlocks-v3';
import {MILITARY_UNITS_1300,MILITARY_UNIT_1300,PROFESSIONAL_MILITARY_UNITS_1300,normaliseMilitaryState1300,unitCount1300,professionalCount1300,levyCount1300,pendingProfessional1300,addTrainingOrder1300,addLevyOrder1300,cancelOrder1300,disbandUnits1300,applyUnitLosses1300,completeTrainingForDay1300} from './military1300.js?v=20260926-v2';

/* Bundled market core: kept inline so GitHub Pages boot does not depend on a second new JS module. */
const GOODS_1300=[
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
const GOOD_1300=Object.fromEntries(GOODS_1300.map(g=>[g.id,g]));
const COMPANY_OUTPUT_MULTIPLIER_1300=1.125;
const PROVINCE_GRAIN_BONUS_1300={
 '1300-orleans':35,
 '1300-paris':20,
 '1300-bourges':25,
 '1300-poitiers':20,
 '1300-toulouse':25,
 '1300-zaragoza':20,
 '1300-bologna':25,
 '1300-leon':15
};

const BUILDING_PRODUCTION_1300={
 fields:{professions:{farmers:.78,laborers:.22},inputs:{tools:.4},outputs:{grain:80}},
 pastures:{professions:{farmers:.72,laborers:.28},inputs:{tools:.25},outputs:{meat:11.25,wool:18.75}},
 textiles:{professions:{craftsmen:.68,laborers:.27,merchants:.05},inputs:{wool:12,tools:.7},outputs:{cloth:15}},
 forge:{professions:{craftsmen:.62,laborers:.30,merchants:.08},inputs:{iron:8,wood:2},outputs:{tools:8,arms:4}},
 market:{professions:{merchants:.55,laborers:.35,clerks:.10},inputs:{cloth:.8,ale:.6},outputs:{services:22.5}},
 barracks:{professions:{soldiers:.78,officers:.08,laborers:.14},inputs:{grain:3,arms:1.2},outputs:{services:11}},
 dockyard:{professions:{craftsmen:.48,laborers:.42,merchants:.10},inputs:{wood:12,cloth:3,tools:2},outputs:{ships:6,fish:8,services:4}},
 walls:{professions:{laborers:.75,craftsmen:.25},inputs:{},outputs:{}},
 guildhall:{professions:{craftsmen:.50,merchants:.28,clerks:.22},inputs:{cloth:1,tools:.8},outputs:{services:17.5}},
 university:{professions:{scholars:.50,clergy:.25,clerks:.25},inputs:{manuscripts:2},outputs:{services:9,manuscripts:3}},
 watermill:{professions:{laborers:.48,craftsmen:.32,farmers:.20},inputs:{wood:.8,tools:.8},outputs:{grain:18}},
 brewery:{professions:{craftsmen:.55,laborers:.35,merchants:.10},inputs:{grain:11,wood:.5},outputs:{ale:14}},
 tannery:{professions:{craftsmen:.55,laborers:.40,merchants:.05},inputs:{meat:4,salt:1},outputs:{leather:8}},
 fishery:{professions:{laborers:.78,merchants:.12,craftsmen:.10},inputs:{wood:.6,salt:.5},outputs:{fish:22}},
 saltworks:{professions:{laborers:.80,merchants:.12,craftsmen:.08},inputs:{wood:.5},outputs:{salt:15}},
 quarry:{professions:{laborers:.84,craftsmen:.16},inputs:{tools:1.1},outputs:{stone:20}},
 lumberyard:{professions:{laborers:.82,craftsmen:.18},inputs:{tools:.8},outputs:{wood:21}},
 ironworks:{professions:{craftsmen:.42,laborers:.50,merchants:.08},inputs:{tools:2},outputs:{iron:10}},
 mint:{professions:{craftsmen:.40,clerks:.35,merchants:.25},inputs:{iron:2,tools:.5},outputs:{services:7},directFlorins:15},
 monastery:{professions:{clergy:.58,farmers:.20,scholars:.12,laborers:.10},inputs:{grain:2},outputs:{manuscripts:4.5,services:9}},
 cathedral:{professions:{clergy:.55,clerks:.20,scholars:.15,laborers:.10},inputs:{grain:1,cloth:.5},outputs:{services:10,manuscripts:2}},
 hospital:{professions:{clergy:.30,clerks:.20,laborers:.50},inputs:{grain:2,cloth:1},outputs:{services:9}}
};

const PRODUCTION_METHODS_1300={
 fields:[
  {id:'hand-cultivation',name:'Hand Cultivation',inputs:{},outputs:{grain:64},description:'Uses labour and basic hand work only. No purchased Tools input.'},
  {id:'tool-assisted-farming',name:'Tool-Assisted Farming',requiresTech:'heavy-tools',inputs:{tools:.4},outputs:{grain:80},description:'Heavy agricultural tools raise Grain output but create ongoing Tools costs.'}
 ],
 pastures:[
  {id:'open-herding',name:'Open Herding',inputs:{},outputs:{meat:8.75,wool:13.75},description:'Traditional herding with no purchased industrial input.'},
  {id:'managed-pastures',name:'Managed Pastures',requiresTech:'heavy-tools',inputs:{tools:.25},outputs:{meat:11.25,wool:18.75},description:'Better tools and pasture management increase Meat and Wool output.'}
 ],
 textiles:[
  {id:'hand-looms',name:'Hand Looms',inputs:{wool:10},outputs:{cloth:13},description:'Traditional hand looms use Wool but no purchased Tools.'},
  {id:'tool-assisted-looms',name:'Tool-Assisted Looms',requiresTech:'specialized-workshops',inputs:{wool:12,tools:.7},outputs:{cloth:15},description:'Specialized workshop tools increase Cloth output at higher input cost.'}
 ],
 quarry:[
  {id:'hand-quarrying',name:'Hand Quarrying',inputs:{},outputs:{stone:13},description:'Manual extraction with basic local equipment and no purchased Tools input.'},
  {id:'tool-assisted-quarrying',name:'Tool-Assisted Quarrying',requiresTech:'specialized-workshops',inputs:{tools:1.1},outputs:{stone:20},description:'Specialized iron tools greatly increase Stone extraction.'}
 ],
 lumberyard:[
  {id:'hand-felling',name:'Hand Felling',inputs:{},outputs:{wood:14},description:'Manual forestry using basic local equipment with no purchased Tools input.'},
  {id:'iron-tool-logging',name:'Iron-Tool Logging',requiresTech:'specialized-workshops',inputs:{tools:.8},outputs:{wood:21},description:'Specialized axes and tools increase Timber output.'}
 ],
 fishery:[
  {id:'shore-fishing',name:'Shore Fishing',inputs:{},outputs:{fish:14},description:'Small boats, nets and shore crews with no purchased industrial input.'},
  {id:'equipped-fishing',name:'Equipped Fishing',requiresTech:'improved-shipwrights',inputs:{wood:.6,salt:.5},outputs:{fish:19},description:'Improved boats and preservation supplies allow larger catches.'}
 ],
 forge:[
  {id:'iron-forging',name:'Iron Forging',inputs:{iron:8,wood:2},outputs:{tools:8,arms:4},description:'Iron and timber produce efficient Tools as well as military Arms.'},
  {id:'stone-toolmaking',name:'Stone Toolmaking',inputs:{stone:5,wood:1},outputs:{tools:6},description:'Uses Stone and timber to make basic Tools. Cheaper and immediately available, but produces fewer Tools and no Arms.'}
 ]
};
function productionMethodsForBuilding1300(buildingId){
 const methods=PRODUCTION_METHODS_1300[buildingId];
 if(methods?.length)return methods;
 const def=BUILDING_PRODUCTION_1300[buildingId]||{inputs:{},outputs:{services:1}};
 return [{id:'standard',name:'Standard Method',inputs:def.inputs||{},outputs:def.outputs||{},directFlorins:Number(def.directFlorins)||0,description:'The established production method for this company.'}];
}
function productionMethodUnlocked1300(game,method){
 return !method?.requiresTech||normaliseTechnologyState1300(game?.technology).unlocked.includes(method.requiresTech);
}
function resolvedProductionMethod1300(game,buildingId,requestedId){
 const methods=productionMethodsForBuilding1300(buildingId),requested=methods.find(x=>x.id===requestedId);
 if(requested&&productionMethodUnlocked1300(game,requested))return requested;
 return methods.find(x=>productionMethodUnlocked1300(game,x))||methods[0];
}
function boostedProductionOutputs1300(outputs={}){
 return Object.fromEntries(Object.entries(outputs).map(([id,n])=>[id,round(Number(n)*COMPANY_OUTPUT_MULTIPLIER_1300,3)]));
}
function productionDefinition1300(game,buildingId,requestedId){
 const base=BUILDING_PRODUCTION_1300[buildingId]||{professions:{laborers:1},inputs:{},outputs:{services:1}},method=resolvedProductionMethod1300(game,buildingId,requestedId);
 return {...base,inputs:{...(method.inputs||{})},outputs:boostedProductionOutputs1300(method.outputs||{}),directFlorins:Number(method.directFlorins??base.directFlorins)||0,methodId:method.id,methodName:method.name};
}

const POP_ARCHETYPES=[
 {id:'peasants',name:'Peasants',wealth:8},{id:'laborers',name:'Laborers',wealth:9},
 {id:'craftsmen',name:'Craftsmen',wealth:12},{id:'burghers',name:'Burghers',wealth:16},
 {id:'clergy',name:'Clergy',wealth:15},{id:'nobles',name:'Nobles',wealth:22}
];
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const round=(n,p=4)=>{const m=10**p;return Math.round((Number(n)||0)*m)/m;};
const WEEKS_PER_MONTH=52/12,FLORINS_PER_MARKET_VALUE=.05,POP_FOOD_DEMAND_PER_1000=3.6,BUILDING_MAINTENANCE_INPUT_SHARE=.35,REALM_PRICE_FOOD_SERVICE_INTEGRATION=.62,REALM_PRICE_OTHER_INTEGRATION=.42;

function blankGood(g,previous){
 const price=Number(previous?.price),start=Number.isFinite(price)&&price>0?price:g.basePrice,stock=Math.max(0,Number(previous?.stock)||0),consumer=Number(previous?.consumerPrice);
 return {goodId:g.id,supply:0,demand:0,need:0,bought:0,domesticBought:0,domesticSold:0,stockpileBought:0,sold:0,reserve:0,stock,fulfilled:0,tradeProfit:0,tariffRate:0,tariffRevenue:0,importShare:0,priorityImportBoost:0,price:start,consumerPrice:Number.isFinite(consumer)&&consumer>0?consumer:start,inputUnitPrice:Number.isFinite(consumer)&&consumer>0?consumer:start,previousPrice:start,targetPrice:g.basePrice,basePrice:g.basePrice};
}
function ensureMarket(previous={}){const goods={};for(const g of GOODS_1300)goods[g.id]=blankGood(g,previous?.goods?.[g.id]);return {goods,marketAccess:Number.isFinite(Number(previous?.marketAccess))?Number(previous.marketAccess):1,priceIndex:Number.isFinite(Number(previous?.priceIndex))?Number(previous.priceIndex):1,basePriceIndex:Number.isFinite(Number(previous?.basePriceIndex))?Number(previous.basePriceIndex):1};}
function addOrder(row,key,amount){if(row&&Number(amount)>0)row[key]+=Number(amount);}
function normalizedPrice(market,id){const g=GOOD_1300[id],row=market.goods[id],p=Number(row?.consumerPrice)||Number(row?.price)||g?.basePrice||1;return p/(g?.basePrice||p||1);}
function priceDemandMultiplier1300(market,id,elasticity=.9,min=.55,max=3){
 const priceRatio=clamp(normalizedPrice(market,id),.25,3);
 return clamp(Math.pow(1/priceRatio,elasticity),min,max);
}
function allocateSubstitutes(market,ids,total,preferences={},priceElasticity=1.35){
 const weighted=ids.map(id=>[id,(preferences[id]??1)/Math.pow(Math.max(.25,normalizedPrice(market,id)),priceElasticity)]),sum=weighted.reduce((n,[,w])=>n+w,0)||1;
 return Object.fromEntries(weighted.map(([id,w])=>[id,total*w/sum]));
}
function createPopGroups(city,previous){
 const population=Math.max(1,Number(city.population)||1),urban=clamp((Number(city.economy)||50)/100,0,1),tech=clamp((Number(city.technology)||50)/100,0,1),shares={peasants:clamp(.68-urban*.30-tech*.08,.28,.68),laborers:.16+urban*.08,craftsmen:.07+urban*.07,burghers:.04+urban*.07,clergy:.04,nobles:.03},total=Object.values(shares).reduce((a,b)=>a+b,0);
 return POP_ARCHETYPES.map(a=>{const old=previous?.groups?.find(g=>g.id===a.id),size=Math.round(population*(shares[a.id]/total));return {id:a.id,name:a.name,size,wealth:round(old?.wealth??a.wealth,2),standardOfLiving:round(old?.standardOfLiving??a.wealth,2),employed:Math.round(Number(old?.employed)||0)};});
}
function ambientSupply(city,market){
 const k=Math.max(.1,Number(city.population||0)/1000),food=clamp(Number(city.food)||50,0,100)/100,econ=clamp(Number(city.economy)||50,0,100)/100;
 addOrder(market.goods.grain,'supply',k*(.55+food*.65)*(1+(Number(city.grainBonusPct)||0)/100));addOrder(market.goods.meat,'supply',k*(.07+food*.10));addOrder(market.goods.wool,'supply',k*(.09+food*.10));addOrder(market.goods.wood,'supply',k*(.14+food*.14));addOrder(market.goods.stone,'supply',k*(.04+econ*.04));addOrder(market.goods.iron,'supply',k*(.012+econ*.018));addOrder(market.goods.salt,'supply',k*.025);addOrder(market.goods.services,'supply',k*(.12+econ*.18));if(city.coastal)addOrder(market.goods.fish,'supply',k*.18);
}
function popOrders(city,market,popState){
 const k=Math.max(.1,Number(city.population||0)/1000),demandGrowth=clamp(Number(city.demandGrowthMultiplier)||1,1,3),needK=k*demandGrowth,groups=popState.groups||[],pop=Math.max(1,groups.reduce((n,g)=>n+g.size,0)),avgWealth=groups.reduce((n,g)=>n+g.wealth*g.size,0)/pop,wealthFactor=clamp(.75+(avgWealth-8)*.025,.7,1.45),food=allocateSubstitutes(market,['grain','fish','meat'],needK*POP_FOOD_DEMAND_PER_1000,{grain:2.30,fish:city.coastal?1.20:.60,meat:.90},1.35);
 for(const [id,n] of Object.entries(food))addOrder(market.goods[id],'demand',n*priceDemandMultiplier1300(market,id,1.05,.65,2.6));
 addOrder(market.goods.cloth,'demand',needK*.25*wealthFactor*priceDemandMultiplier1300(market,'cloth',.95,.60,2.7));
 addOrder(market.goods.wood,'demand',needK*.10*priceDemandMultiplier1300(market,'wood',.65,.70,2.0));
 addOrder(market.goods.salt,'demand',needK*.12*priceDemandMultiplier1300(market,'salt',.65,.70,2.0));
 addOrder(market.goods.ale,'demand',needK*.18*wealthFactor*priceDemandMultiplier1300(market,'ale',1.0,.55,2.8));
 addOrder(market.goods.leather,'demand',needK*.08*wealthFactor*priceDemandMultiplier1300(market,'leather',.9,.60,2.5));
 addOrder(market.goods.services,'demand',needK*(2.20+1.00*wealthFactor)*priceDemandMultiplier1300(market,'services',.9,.60,2.7));
 if(avgWealth>15){
  addOrder(market.goods.manuscripts,'demand',needK*.015*(avgWealth-14)*priceDemandMultiplier1300(market,'manuscripts',.9,.55,2.6));
  addOrder(market.goods.cloth,'demand',needK*.05*priceDemandMultiplier1300(market,'cloth',1.0,.55,2.8));
 }
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
function militaryDemandOrders1300(city,market){
 const d=city?.militaryDemand||{},foodNeed=Math.max(0,Number(d.food)||0),armsNeed=Math.max(0,Number(d.arms)||0);
 if(foodNeed>0){const food=allocateSubstitutes(market,['grain','fish','meat'],foodNeed,{grain:2.4,fish:city.coastal?.8:.35,meat:1.1},1.1);for(const [id,n] of Object.entries(food))addOrder(market.goods[id],'demand',n*priceDemandMultiplier1300(market,id,.55,.78,1.55));}
 if(armsNeed>0)addOrder(market.goods.arms,'demand',armsNeed*priceDemandMultiplier1300(market,'arms',.35,.82,1.45));
}
function infrastructure(city){const levels=(city.sectors||[]).reduce((n,s)=>n+(Number(s.level)||0),0),support=(city.sectors||[]).reduce((n,s)=>n+(['market','warehouse','merchantquarter','customshouse','bridge','dockyard'].includes(s.id)?Number(s.level)||0:0),0),capacity=10+(Number(city.economy)||50)/5+support*4,usage=Math.max(1,levels*1.7);return {capacity,usage,access:clamp(capacity/usage,.35,1)};}
function updatePrices(market){
 for(const g of GOODS_1300){
  const row=market.goods[g.id],s=row.supply+Math.min(Number(row.stock)||0,Math.max(0,row.demand)*.5),d=row.demand,imbalance=(d-s)/Math.max(s,d,1),modifier=clamp(imbalance*.75,-.75,.75);
  row.targetPrice=round(g.basePrice*(1+modifier),4);row.price=round(row.price+(row.targetPrice-row.price)*.15,4);
 }
 const basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]];
 market.basePriceIndex=round(basket.reduce((n,[id,w])=>{const g=GOOD_1300[id],p=Number(market.goods[id]?.price)||g.basePrice;return n+(p/g.basePrice)*w;},0),4);
 market.priceIndex=market.basePriceIndex;
}
function integrateRealmPrices1300(markets){
 const marketList=Object.values(markets||{});if(marketList.length<2)return;
 for(const g of GOODS_1300){
  const entries=marketList.map(m=>{const row=m.goods[g.id],s=Math.max(0,Number(row.supply)||0)+Math.min(Math.max(0,Number(row.stock)||0),Math.max(0,Number(row.demand)||0)*.5),d=Math.max(0,Number(row.demand)||0),price=Math.max(.01,Number(row.price)||g.basePrice);return {m,row,s,d,price,surplus:Math.max(0,s-d)};});
  const totalSupply=entries.reduce((n,x)=>n+x.s,0),totalDemand=entries.reduce((n,x)=>n+x.d,0),totalWeight=entries.reduce((n,x)=>n+Math.max(1,x.s+x.d),0),weightedLocal=entries.reduce((n,x)=>n+x.price*Math.max(1,x.s+x.d),0)/Math.max(1,totalWeight),imbalance=(totalDemand-totalSupply)/Math.max(totalSupply,totalDemand,1),realmModifier=clamp(imbalance*.65,-.62,.62),realmTarget=g.basePrice*(1+realmModifier),surplusWeight=entries.reduce((n,x)=>n+x.surplus,0),surplusPrice=surplusWeight>0?entries.reduce((n,x)=>n+x.price*x.surplus,0)/surplusWeight:weightedLocal,oversupplied=totalSupply>totalDemand;
  const realmReference=clamp((weightedLocal*.45+realmTarget*.55)*(oversupplied?.72:1)+(oversupplied?surplusPrice*.28:0),g.basePrice*.28,g.basePrice*1.75);
  for(const x of entries){
   const access=clamp(Number(x.m.marketAccess)||1,.25,1),baseIntegration=(g.category==='food'||g.category==='service')?REALM_PRICE_FOOD_SERVICE_INTEGRATION:REALM_PRICE_OTHER_INTEGRATION,integration=clamp(baseIntegration*(.55+.45*access),.18,.72);
   x.row.realmPrice=round(realmReference,4);x.row.realmSupply=round(totalSupply,3);x.row.realmDemand=round(totalDemand,3);x.row.price=round(x.price+(realmReference-x.price)*integration,4);
  }
 }
 const basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]];
 for(const market of marketList){market.basePriceIndex=round(basket.reduce((n,[id,w])=>{const g=GOOD_1300[id],p=Number(market.goods[id]?.price)||g.basePrice;return n+(p/g.basePrice)*w;},0),4);market.priceIndex=market.basePriceIndex;}
}
function settleRealmMarketFlows1300(markets,tradeStockpile={}){
 const marketList=Object.values(markets||{}),remainingStockpile=Object.fromEntries(GOODS_1300.map(g=>[g.id,Math.max(0,Number(tradeStockpile?.[g.id])||0)])),stockpileUsed={};
 for(const g of GOODS_1300){
  const entries=marketList.map(m=>{const row=m.goods[g.id],need=Math.max(0,Number(row.demand)||0),produced=Math.max(0,Number(row.supply)||0),oldStock=Math.max(0,Number(row.stock)||0),productionUsed=Math.min(produced,need),afterProduction=Math.max(0,need-productionUsed),stockUsed=Math.min(oldStock,afterProduction),shortage=Math.max(0,afterProduction-stockUsed),surplus=Math.max(0,produced-productionUsed);return {m,row,need,produced,oldStock,productionUsed,stockUsed,shortage,surplus};});
  const totalShortage=entries.reduce((n,x)=>n+x.shortage,0),totalSurplus=entries.reduce((n,x)=>n+x.surplus,0),internalPool=Math.min(totalShortage,totalSurplus);
  for(const x of entries)x.domesticBought=totalShortage>0?Math.min(x.shortage,internalPool*(x.shortage/totalShortage)):0;
  const internalUsed=entries.reduce((n,x)=>n+x.domesticBought,0);
  for(const x of entries)x.domesticSold=totalSurplus>0?Math.min(x.surplus,internalUsed*(x.surplus/totalSurplus)):0;
  const exporterVolume=entries.reduce((n,x)=>n+x.domesticSold,0),exporterPrice=exporterVolume>0?entries.reduce((n,x)=>n+x.domesticSold*(Number(x.row.price)||g.basePrice),0)/exporterVolume:entries.reduce((n,x)=>n+(Number(x.row.realmPrice)||Number(x.row.price)||g.basePrice),0)/Math.max(1,entries.length);
  for(const x of entries){const access=clamp(Number(x.m.marketAccess)||1,.25,1),transport=g.category==='service'?.01:.02+(1-access)*.06;x.row.domesticUnitPrice=round(exporterPrice*(1+transport),4);}
  const afterInternalTotal=entries.reduce((n,x)=>n+Math.max(0,x.shortage-x.domesticBought),0),stockPool=Math.min(remainingStockpile[g.id]||0,afterInternalTotal);
  for(const x of entries)x.stockpileBought=afterInternalTotal>0?Math.min(Math.max(0,x.shortage-x.domesticBought),stockPool*(Math.max(0,x.shortage-x.domesticBought)/afterInternalTotal)):0;
  stockpileUsed[g.id]=round(entries.reduce((n,x)=>n+x.stockpileBought,0),4);remainingStockpile[g.id]=round(Math.max(0,(remainingStockpile[g.id]||0)-stockpileUsed[g.id]),4);
  for(const x of entries){
   const remainingNeed=Math.max(0,x.shortage-x.domesticBought-x.stockpileBought),access=clamp((Number(x.m.marketAccess)||1)+(Number(x.row.priorityImportBoost)||0),.2,1),bought=remainingNeed*access,remainingSurplus=Math.max(0,x.surplus-x.domesticSold),reserve=remainingSurplus*.18,exportable=Math.max(0,remainingSurplus-reserve),exportShare=clamp(.45+access*.45,.60,.90),sold=exportable*exportShare,carried=Math.max(0,x.oldStock-x.stockUsed+exportable-sold),decay=g.category==='food'?.90:g.category==='service'?0:.97,stock=carried*decay,fulfilled=x.productionUsed+x.stockUsed+x.domesticBought+x.stockpileBought+bought;
   x.row.need=round(x.need,3);x.row.localSold=round(x.productionUsed,3);x.row.domesticBought=round(x.domesticBought,3);x.row.domesticSold=round(x.domesticSold,3);x.row.stockpileBought=round(x.stockpileBought,3);x.row.bought=round(bought,3);x.row.sold=round(sold,3);x.row.totalSold=round(x.productionUsed+x.domesticSold+sold,3);x.row.reserve=round(reserve,3);x.row.stock=round(stock,3);x.row.fulfilled=round(fulfilled,3);x.row.tradeProfit=round((sold*x.row.price-bought*x.row.price*1.12)*FLORINS_PER_MARKET_VALUE,4);
  }
 }
 return {remainingStockpile,stockpileUsed};
}
function applyTariffsToMarket1300(market,tariffs={}){
 const basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]];let revenue=0;
 for(const g of GOODS_1300){
  const row=market.goods[g.id],rate=g.category==='service'?0:clamp(Number(tariffs?.[g.id])||0,0,50),fulfilled=Math.max(0,Number(row.fulfilled)||0),foreign=Math.max(0,Number(row.bought)||0),domestic=Math.max(0,Number(row.domesticBought)||0),stockpile=Math.max(0,Number(row.stockpileBought)||0),local=Math.max(0,fulfilled-foreign-domestic-stockpile),share=fulfilled>0?clamp(foreign/fulfilled,0,1):0,localPrice=Number(row.price)||g.basePrice,domesticPrice=Number(row.domesticUnitPrice)||localPrice*1.03,stockpilePrice=localPrice*1.05,foreignPrice=localPrice*1.12*(1+rate/100),blended=fulfilled>0?(local*localPrice+domestic*domesticPrice+stockpile*stockpilePrice+foreign*foreignPrice)/fulfilled:localPrice;
  row.tariffRate=rate;row.importShare=round(share,4);row.consumerPrice=round(blended,4);row.inputUnitPrice=round(blended,4);row.tariffRevenue=round(foreign*localPrice*FLORINS_PER_MARKET_VALUE*(rate/100),4);revenue+=row.tariffRevenue;
 }
 market.priceIndex=round(basket.reduce((n,[id,w])=>n+normalizedPrice(market,id)*w,0),4);
 market.tariffCostOfLivingPct=round((market.priceIndex/Math.max(.0001,market.basePriceIndex)-1)*100,2);
 return round(revenue,4);
}
function sectorPotential(sector,city){const def=sector.production||BUILDING_PRODUCTION_1300[sector.id]||{inputs:{},outputs:{services:1}},tech=city.techEffects||{},level=Math.max(0,Number(sector.level)||0),workerReduction=(['fields','pastures'].includes(sector.id)?Number(tech.farmWorkersPct)||0:sector.id==='watermill'?Number(tech.millWorkersPct)||0:0),capacity=Math.max(1,(Number(sector.capacity)||1)*(1+workerReduction/100)),workers=clamp(Number(sector.workers)||0,0,capacity),employmentRatio=workers/capacity,technologyFactor=.86+clamp(Number(city.technology)||50,0,100)/500,economyOfScale=1+Math.min(level*.01,.30),farm=['fields','pastures'].includes(sector.id),manufactured=['textiles','forge','guildhall','brewery','tannery','mint'].includes(sector.id),outputPct=(Number(tech.companyOutputPct)||0)+(farm?Number(tech.farmOutputPct)||0:0)+(manufactured?Number(tech.manufacturedOutputPct)||0:0)+(sector.id==='watermill'?Number(tech.millOutputPct)||0:0)+(sector.id==='lumberyard'?Number(tech.lumberOutputPct)||0:0);return {def,level,capacity,workers,employmentRatio,potential:level*employmentRatio*technologyFactor*economyOfScale*(1+outputPct/100),inputMultiplier:Math.max(.5,1+(Number(tech.inputRequiredPct)||0)/100)};}
function updatePops(city,market,previous,sectors){
 const wageBenchmark=Math.max(.01,Number(city.expectedWage)||.08),groups=createPopGroups(city,previous),population=groups.reduce((n,g)=>n+g.size,0)||1,workerPool=Math.max(1,Math.min(population,Number(city.labourPool)||population*.5)),sectorWorkers=sectors.reduce((n,s)=>n+(Number(s.workers)||0),0),totalWorkers=Math.min(workerPool,sectorWorkers),employmentRate=clamp(totalWorkers/workerPool,0,1),weightedWage=sectors.reduce((n,s)=>n+(Number(s.wage)||0)*(Number(s.workers)||0),0)/Math.max(1,sectorWorkers),realWage=(weightedWage||.08)/wageBenchmark/Math.max(.45,market.priceIndex),professionGroup={farmers:'peasants',laborers:'laborers',craftsmen:'craftsmen',merchants:'burghers',clerks:'burghers',clergy:'clergy',scholars:'clergy',officers:'nobles',soldiers:'peasants'},desired={};
 for(const s of sectors){
  const def=s.production||BUILDING_PRODUCTION_1300[s.id]||{},prof=def.professions||{laborers:1};
  for(const [profession,share] of Object.entries(prof)){const id=professionGroup[profession]||'laborers';desired[id]=(desired[id]||0)+(Number(s.workers)||0)*(Number(share)||0);}
 }
 const capRate={peasants:.70,laborers:.90,craftsmen:.90,burghers:.78,clergy:.60,nobles:.40};
 let assigned=0;
 for(const g of groups){const cap=Math.floor(g.size*(capRate[g.id]??.75)),take=Math.min(cap,Math.max(0,Math.round(desired[g.id]||0)));g.employed=take;assigned+=take;}
 let remaining=Math.max(0,Math.round(totalWorkers-assigned));
 for(const id of ['laborers','peasants','craftsmen','burghers','clergy','nobles']){if(remaining<=0)break;const g=groups.find(x=>x.id===id);if(!g)continue;const cap=Math.floor(g.size*(capRate[g.id]??.75)),spare=Math.max(0,cap-g.employed),take=Math.min(spare,remaining);g.employed+=take;remaining-=take;}
 if(remaining>0)for(const g of groups){if(remaining<=0)break;const spare=Math.max(0,g.size-g.employed),take=Math.min(spare,remaining);g.employed+=take;remaining-=take;}
 for(const g of groups){const employment=g.size?g.employed/g.size:0,base=POP_ARCHETYPES.find(x=>x.id===g.id)?.wealth||10,target=base+(realWage-1)*2.4+(employment-.45)*1.6;g.wealth=round(clamp(g.wealth+(target-g.wealth)*.08,3,35),2);g.standardOfLiving=round(clamp(g.wealth+(1-market.priceIndex)*1.2,2,40),2);}
 return {groups,employmentRate:round(employmentRate,4),averageWealth:round(groups.reduce((n,g)=>n+g.wealth*g.size,0)/population,2),averageStandardOfLiving:round(groups.reduce((n,g)=>n+g.standardOfLiving*g.size,0)/population,2)};
}
function simulateWeeklyEconomy1300({cities=[],previousMarkets={},previousPops={},taxRate=10,taxCollectionFactor=.35,tariffs={},tradeStockpile={}}={}){
 const markets={},pops={},sectorsByCity={};let weeklyTax=0,weeklyTariffRevenue=0;
 for(const city of cities){
  const market=markets[city.id]=ensureMarket(previousMarkets?.[city.id]),popState={groups:createPopGroups(city,previousPops?.[city.id])};market.marketAccess=round(infrastructure(city).access,4);ambientSupply(city,market);popOrders(city,market,popState);buildingMaintenanceOrders1300(city,market);militaryDemandOrders1300(city,market);
  for(const sector of city.sectors||[]){
   if((Number(sector.level)||0)<=0)continue;
   const p=sectorPotential(sector,city),priority=sector.priority||'employment',treasury=Number.isFinite(Number(sector.treasury))?Number(sector.treasury):100,cashFactor=treasury<=0?.15:treasury<50?.55+.45*(treasury/50):1,inputIds=Object.keys(p.def.inputs||{}),inputDemandFactor=priority==='output'?1.22:1,outputEstimateFactor=priority==='output'?1.10:1;
   for(const [id,n] of Object.entries(p.def.inputs||{})){addOrder(market.goods[id],'demand',n*p.potential*cashFactor*inputDemandFactor*(p.inputMultiplier||1));market.goods[id].priorityImportBoost=clamp((Number(market.goods[id].priorityImportBoost)||0)+(priority==='output'?.16:0),-.18,.22);}
   for(const [id,n] of Object.entries(p.def.outputs||{}))addOrder(market.goods[id],'supply',n*p.potential*cashFactor*outputEstimateFactor);
  }
 }
 for(const market of Object.values(markets))updatePrices(market);
 integrateRealmPrices1300(markets);
 const tradeFlow=settleRealmMarketFlows1300(markets,tradeStockpile);
 for(const market of Object.values(markets))weeklyTariffRevenue+=applyTariffsToMarket1300(market,tariffs);
 for(const city of cities){
  const market=markets[city.id],infra=infrastructure(city),rows=sectorsByCity[city.id]={};market.marketAccess=round(infra.access,4);
  for(const sector of city.sectors||[]){
   if((Number(sector.level)||0)<=0)continue;
   const p=sectorPotential(sector,city),inputIds=Object.keys(p.def.inputs||{}),availability=inputIds.length?Math.min(...inputIds.map(id=>clamp((Number(market.goods[id].fulfilled)||0)/Math.max(market.goods[id].demand,1e-6),.12,1))):1,priority=sector.priority||'employment',treasury=Number.isFinite(Number(sector.treasury))?Number(sector.treasury):100,cashFactor=treasury<=0?.15:treasury<50?.55+.45*(treasury/50):1,inputPriceIndex=inputIds.length?inputIds.reduce((n,id)=>n+(Number(market.goods[id].inputUnitPrice)||GOOD_1300[id].basePrice)/GOOD_1300[id].basePrice,0)/inputIds.length:1,priorityThroughput=priority==='output'?1.16:1,throughput=clamp(p.employmentRatio*availability*infra.access*priorityThroughput*cashFactor,0,priority==='output'?1.28:1.12),scale=p.potential*throughput/Math.max(.01,p.employmentRatio);
   let revenueValue=0,inputValue=0;const outputs={},soldOutputs={},inputs={};
   for(const [id,n] of Object.entries(p.def.outputs||{})){const q=n*scale,row=market.goods[id],marketSupply=Math.max(0,Number(row?.supply)||0),marketSold=Math.max(0,Number(row?.totalSold)||0),soldShare=marketSupply>0?clamp(marketSold/marketSupply,0,1):0,soldQ=q*soldShare;outputs[id]=round(q,3);soldOutputs[id]=round(soldQ,3);revenueValue+=soldQ*(Number(row?.price)||GOOD_1300[id].basePrice);}
   for(const [id,n] of Object.entries(p.def.inputs||{})){const q=n*scale*(p.inputMultiplier||1);inputs[id]=round(q,3);inputValue+=q*(Number(market.goods[id].inputUnitPrice)||Number(market.goods[id].consumerPrice)||market.goods[id].price);}
   const directFlorins=Math.max(0,Number(p.def.directFlorins)||0)*scale,weeklyRevenue=revenueValue*FLORINS_PER_MARKET_VALUE+directFlorins,weeklyInputCost=inputValue*FLORINS_PER_MARKET_VALUE,monthlyWage=Math.max(GAME_WAGE_MIN,Number(sector.wage)||GAME_WAGE_MIN),fullWeeklyWageCost=p.workers*(monthlyWage/WEEKS_PER_MONTH),weeklyWageCost=treasury<=0?0:fullWeeklyWageCost,unpaidWages=Math.max(0,fullWeeklyWageCost-weeklyWageCost),weeklyProfit=weeklyRevenue-weeklyInputCost-weeklyWageCost,weeklySectorTax=Math.max(0,weeklyProfit)*(clamp(Number(taxRate)||0,0,100)/100)*taxCollectionFactor;weeklyTax+=weeklySectorTax;
   const weekly=x=>round(x,4);rows[sector.id]={id:sector.id,mode:priority,workers:p.workers,capacity:p.capacity,wage:Number(sector.wage)||0,treasury:weekly(treasury),employmentRatio:round(p.employmentRatio,4),inputAvailability:round(availability,4),inputPriceIndex:round(inputPriceIndex,4),marketAccess:round(infra.access,4),throughput:round(throughput,4),inputs,outputs,soldOutputs,directFlorins:weekly(directFlorins),gross:weekly(weeklyRevenue),inputCost:weekly(weeklyInputCost),wageBill:weekly(weeklyWageCost),unpaidWages:weekly(unpaidWages),profit:weekly(weeklyProfit),tax:weekly(weeklySectorTax)};
  }
  pops[city.id]=updatePops(city,market,previousPops?.[city.id],Object.values(rows));
 }
 return {markets,pops,sectorsByCity,weeklyTax:round(weeklyTax,4),weeklyTaxEstimate:round(weeklyTax,2),weeklyTariffRevenue:round(weeklyTariffRevenue,4),tradeStockpileRemaining:tradeFlow.remainingStockpile,tradeStockpileUsed:tradeFlow.stockpileUsed};
}
function aggregateMarkets1300(markets={}){
 const rows={};for(const g of GOODS_1300)rows[g.id]={id:g.id,name:g.name,basePrice:g.basePrice,supply:0,demand:0,fulfilled:0,bought:0,domesticBought:0,stockpileBought:0,sold:0,reserve:0,tariffRevenue:0,priceWeighted:0,consumerPriceWeighted:0,weight:0};
 for(const market of Object.values(markets||{}))for(const g of GOODS_1300){const m=market?.goods?.[g.id];if(!m)continue;const weight=Math.max(1,(Number(m.supply)||0)+(Number(m.demand)||0));rows[g.id].supply+=Number(m.supply)||0;rows[g.id].demand+=Number(m.demand)||0;rows[g.id].fulfilled+=Number(m.fulfilled)||0;rows[g.id].bought+=Number(m.bought)||0;rows[g.id].domesticBought+=Number(m.domesticBought)||0;rows[g.id].stockpileBought+=Number(m.stockpileBought)||0;rows[g.id].sold+=Number(m.sold)||0;rows[g.id].reserve+=Number(m.reserve)||0;rows[g.id].tariffRevenue+=Number(m.tariffRevenue)||0;rows[g.id].priceWeighted+=(Number(m.price)||g.basePrice)*weight;rows[g.id].consumerPriceWeighted+=(Number(m.consumerPrice)||Number(m.price)||g.basePrice)*weight;rows[g.id].weight+=weight;}
 return Object.values(rows).map(r=>{const price=r.weight?r.priceWeighted/r.weight:r.basePrice,consumerPrice=r.weight?r.consumerPriceWeighted/r.weight:price;return {...r,supply:round(r.supply,2),demand:round(r.demand,2),fulfilled:round(r.fulfilled,2),bought:round(r.bought,2),domesticBought:round(r.domesticBought,2),stockpileBought:round(r.stockpileBought,2),sold:round(r.sold,2),reserve:round(r.reserve,2),tariffRevenue:round(r.tariffRevenue,4),price:round(price,2),consumerPrice:round(consumerPrice,2),changePct:round((consumerPrice/r.basePrice-1)*100,1)};});
}
const $=s=>document.querySelector(s),app=$('#app'),modal=$('#modal'),
 LEGACY_KEY='cardwars.collection.v2',ACCOUNTS_KEY='cardwars.accounts.v1',SESSION_KEY='cardwars.session.v1',PROFILE_PREFIX='cardwars.profile.';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CITY_DISPLAY_NAMES_1300=new Map([
 ['1300-pozsony','Bratislava'],['1300-kassa','Košice'],['1300-gradec','Gradec'],
 ['1300-oradea','Oradea'],['1300-cluj','Cluj'],['1300-alba-iulia','Alba Iulia'],
 ['1300-sibiu','Sibiu'],['1300-brasov','Brașov'],['1300-stettin','Szczecin'],
 ['1300-saverne','Saverne'],['1300-olbia','Olbia'],['1300-cagliari','Cagliari'],
 ['1300-wroclaw','Wrocław']
]);
const displayCityName1300=c=>CITY_DISPLAY_NAMES_1300.get(c.id)||String(c.name||'').split('/')[0].trim();
const CARD_ART_1300={
 '1300-seville':'assets/cards1300/000-seville.svg',
 '1300-cordoba':'assets/cards1300/001-cordoba.svg',
 '1300-toledo':'assets/cards1300/002-toledo.svg',
 '1300-valladolid':'assets/cards1300/003-valladolid.svg',
 '1300-burgos':'assets/cards1300/004-burgos.svg',
 '1300-murcia':'assets/cards1300/005-murcia.svg',
 '1300-salamanca':'assets/cards1300/006-salamanca.svg',
 '1300-segovia':'assets/cards1300/007-segovia.svg',
 '1300-leon':'assets/cards1300/008-leon.svg',
 '1300-jaen':'assets/cards1300/009-jaen.svg',
 '1300-santiago':'assets/cards1300/010-santiago.svg'
};
let profile=freshProfile(),storageFailed=false,accounts={},currentAccountKey=null,authUser=null,legacyProfile=null;
try{
 accounts=JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||'{}');
 if(!accounts||typeof accounts!=='object'||Array.isArray(accounts))accounts={};
 currentAccountKey=localStorage.getItem(SESSION_KEY);
 if(currentAccountKey&&accounts[currentAccountKey]){
  authUser=accounts[currentAccountKey];
  const raw=localStorage.getItem(PROFILE_PREFIX+currentAccountKey);
  if(raw){const p=migrateProfile(JSON.parse(raw));if(p&&validateProfile(p))profile=p;else storageFailed=true;}
 }else currentAccountKey=null;
 const legacyRaw=localStorage.getItem(LEGACY_KEY);
 if(legacyRaw){const p=migrateProfile(JSON.parse(legacyRaw));if(p&&validateProfile(p))legacyProfile=p;}
}catch{storageFailed=true;accounts={};currentAccountKey=null;authUser=null;}
let view='collection',country1300='all',search1300='',deckCountry='all',deckSearch='',world=null,selected1300='1300-seville',buildingCity='1300-seville',gameScreen='map',gameProvincePanel=null,gameProvinceTab='general',gameProvinceBuildingDetail=null,gameProvinceBuildingCatalog=false,gameArmyPanelKey=null,gameArmyMoveMode=false,gameArmySplitMode=false,gameBattlePanelId=null,gameSiegePanelId=null,gameCountryPanel=false,gameCountryTab='politics',gameDiplomacyCountry=null,gameRankingCategory='overall',gameClockTimer=null,gameStartCountdownPending=false,activeBattleDialogId=null,flagPaintColor='#f2e7c9',atlasRegion=null,atlasSearch='',rankingCategory='overall',selectedTechnologyTreeNode='crop-rotation',toastTimer;
const mapState={selected:selected1300,collection:{}};
const COUNTRIES_1300=[...new Set(CITIES_1300.map(c=>c.country))].sort((a,b)=>a.localeCompare(b));
const STARTER_REGIONS_1300=[
 {id:'iberia',name:'Iberian Region',short:'Iberia',description:'Castile, Aragon, Portugal, Navarre, Granada and the western Mediterranean edge.'},
 {id:'italy',name:'Italian Region',short:'Italy',description:'The Italian peninsula, Alpine approaches and the city-rich northern Italian sphere.'},
 {id:'west',name:'Western Europe',short:'West',description:'France, England, the Low Countries and the western imperial frontier.'},
 {id:'central',name:'Central Europe',short:'Central',description:'The German lands, Bohemia, Austria and the central imperial heartlands.'},
 {id:'east',name:'Eastern Europe',short:'East',description:'Poland, Hungary and the eastern side of the current 1300 map.'}
];
const STARTER_REGION_BY_ID=Object.fromEntries(STARTER_REGIONS_1300.map(r=>[r.id,r]));
const PLAYER_REALM_COLORS=[
 ['#c6534d','Crimson'],['#d09445','Amber'],['#b4a244','Gold'],['#5e9467','Forest'],
 ['#4d8b91','Teal'],['#557fa8','Royal Blue'],['#7765a3','Violet'],['#a15f85','Rose']
];
const validRealmColor=c=>PLAYER_REALM_COLORS.some(([hex])=>hex===c);
const FLAG_COLORS_1300=['#b83f43','#f2e7c9','#d3b45f','#406b9a','#4f7b55','#22272a','#704f86','#d07c45'];
const FLAG_W=12,FLAG_H=8,FLAG_SIZE=FLAG_W*FLAG_H,DEFAULT_FLAG_COLOR='#b83f43';
function normaliseFlag1300(flag){
 const a=Array.isArray(flag)?flag.slice(0,FLAG_SIZE):[];
 while(a.length<FLAG_SIZE)a.push(DEFAULT_FLAG_COLOR);
 return a.map(c=>FLAG_COLORS_1300.includes(c)?c:DEFAULT_FLAG_COLOR);
}
function flagGridHTML1300(flag,editable=false){
 const safe=normaliseFlag1300(flag);
 return `<div class="flag-grid ${editable?'editable':''}">${safe.map((c,i)=>editable?`<button data-flag-index="${i}" data-action="flag-cell" data-index="${i}" style="--flag-cell:${c}" aria-label="Flag cell ${i+1}"></button>`:`<span data-flag-index="${i}" style="--flag-cell:${c}"></span>`).join('')}</div>`;
}
function flagShieldHTML1300(flag,cls=''){
 return `<div class="flag-shield ${cls}">${flagGridHTML1300(flag,false)}</div>`;
}

function regionForCity1300(c){
 const lat=Number(c.lat),lon=Number(c.lon);
 if(lat<44.8&&lon<4.5)return 'iberia';
 if(lat<46.9&&lon>=6.5&&lon<18.5)return 'italy';
 if(lon<7.5)return 'west';
 if(lon<18)return 'central';
 return 'east';
}
function shuffle1300(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function ownedCardIds1300(){
 return new Set(Object.entries(profile.collection1300||{}).filter(([,count])=>(Number(count)||0)>0).map(([id])=>id));
}
function guaranteedEight1300(pool,exclude=new Set()){
 const result=[],used=new Set(exclude);
 for(const [rarity,count] of [[0,5],[1,2],[2,1]]){
  const available=shuffle1300(pool.filter(c=>c.rarity===rarity&&!used.has(c.id)));
  if(available.length<count)return null;
  available.slice(0,count).forEach(c=>{result.push({id:c.id,duplicate:false});used.add(c.id);});
 }
 return shuffle1300(result);
}
function uniqueEight1300(pool,exclude=new Set()){
 const available=shuffle1300(pool.filter(c=>!exclude.has(c.id)));
 if(available.length<8)return null;
 return available.slice(0,8).map(c=>({id:c.id,duplicate:false}));
}
function grantCards1300(cards){for(const r of cards)profile.collection1300[r.id]=(profile.collection1300[r.id]||0)+1;profile.packsOpened1300++;profile.drawn1300+=cards.length;profile.lastPack1300=cards;}
// Pack reveal rendering is defined with the paid-pack system below so starter and paid packs share one stacked reveal flow.
function chooseStarterRegion1300(regionId){
 if(profile.starterRegionClaimed)return;
 const region=STARTER_REGION_BY_ID[regionId];if(!region)return;
 const pool=CITIES_1300.filter(c=>regionForCity1300(c)===regionId),owned=ownedCardIds1300();
 const cards=guaranteedEight1300(pool,owned);
 if(!cards){toast('This region no longer has enough unowned Common, Uncommon and Rare cards for the guaranteed starter pack.');return;}
 grantCards1300(cards);
 profile.starterRegion=regionId;profile.starterRegionClaimed=true;profile.starterCardIds=cards.map(x=>x.id);
 save();render();
 showStarterPack1300(cards,`${region.name} Pack`,'Guaranteed: 5 Common · 2 Uncommon · 1 Rare · no duplicates','Next: free welcome pack');
}
function claimWelcomePack1300(){
 if(!profile.starterRegionClaimed||profile.welcomePackClaimed)return;
 const cards=uniqueEight1300(CITIES_1300,ownedCardIds1300());
 if(!cards){toast('There are not enough unowned 1300 cards left for the free welcome pack.');return;}
 grantCards1300(cards);
 profile.welcomePackClaimed=true;profile.welcomeCardIds=cards.map(x=>x.id);profile.onboardingComplete=true;
 profile.deck=[...profile.starterCardIds,...profile.welcomeCardIds].filter((id,i,a)=>a.indexOf(id)===i).slice(0,16);
 save();view='deck';render();
 showStarterPack1300(cards,'Welcome Pack','Eight random 1300 cards you did not already own. Your first 16-card deck is ready.','Build my deck');
}

function ensureEconomyProfile(p){
 if(!Number.isSafeInteger(p.florins)||p.florins<0)p.florins=ECONOMY_1300.startFlorins;
 if(!p.buildings||typeof p.buildings!=='object'||Array.isArray(p.buildings))p.buildings={};
 const validBuildings=new Set(BUILDINGS_1300.map(b=>b.id));
 for(const [cityId,levels] of Object.entries({...p.buildings})){
  if(!Object.hasOwn(CITY_1300,cityId)||!levels||typeof levels!=='object'||Array.isArray(levels)){delete p.buildings[cityId];continue;}
  const clean={};
  for(const [buildingId,n] of Object.entries(levels))if(validBuildings.has(buildingId)&&Number.isSafeInteger(n)&&n>0)clean[buildingId]=Math.min(Number(BUILDING_1300[buildingId]?.maxLevel)||ECONOMY_1300.maxBuildingLevel,n);
  if(Object.keys(clean).length)p.buildings[cityId]=clean;else delete p.buildings[cityId];
 }
}
ensureEconomyProfile(profile);
const GAME_WAGE_MIN=.05,GAME_WAGE_MAX=1.00,GAME_WAGE_STEP=.01,GAME_TAX_MIN=0,GAME_TAX_MAX=30,GAME_TAX_COLLECTION_FACTOR=.35;
const GAME_DAY_REAL_MS=2000,GAME_INITIAL_CLOCK_DELAY_MS=60000,GAME_AUTOSAVE_DAYS=182,RESEARCH_RATE_MULTIPLIER_1300=3;
const GAME_MONTHS_1300=['January','February','March','April','May','June','July','August','September','October','November','December'];
const clamp1300=(n,min,max)=>Math.max(min,Math.min(max,n));
const money1300=n=>(Number(n)||0).toFixed(2);
function freshGameEconomy1300(){return {taxRate:10,nationalWage:.08,tariffs:{},cityWages:{},buildingWages:{},companyPolicies:{},companyTreasuries:{},populationByCity:{},populationDemography:{},populationRemainders:{},employment:{},lastEconomy:{},markets:{},pops:{},dynamicStats:{},technologyBudgets:{},lastStatChanges:{},statRemainders:{},lastMarketTickDay:null,weeklyTax:0,weeklyTariffRevenue:0,weekSectorRevenue:0,weekTariffRevenue:0,lastWeekSectorRevenue:0,lastWeekTariffRevenue:0,weeklyBudgetProjection:null,monthRevenue:0,monthExpenses:0,lastMonthRevenue:0,lastMonthExpenses:0,lastMonthBalance:0,lastMonthLabel:'No completed week yet',stabilityBudget:0,stabilityModifier:0,corruption:20,lastStabilityChange:0,weeklyCadenceV1:true,startingWage020V1:true,startingWage040V2:true,weeklyWage010V3:true,weeklyWage006V4:true,weeklyWage002V5:true,monthlyWage012V6:true,monthlyWage010V7:true,monthlyWage008V8:true};}
function freshGameDiplomacy1300(){return {relations:{},alliances:{},wars:{},recognitions:{},tradeStockpile:{},aiTreasuries:{},aiGoods:{},lastImproveDay:{},independenceSupportByCity:{},activeIndependenceSupportWars:{},opinionBaselineV2:{},history:[],diplomatSystemV3:true};}
function normaliseGameDiplomacy1300(raw){
 const d=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshGameDiplomacy1300();
 for(const key of ['relations','alliances','wars','recognitions','tradeStockpile','aiTreasuries','aiGoods','lastImproveDay','independenceSupportByCity','activeIndependenceSupportWars','opinionBaselineV2'])if(!d[key]||typeof d[key]!=='object'||Array.isArray(d[key]))d[key]={};
 for(const g of GOODS_1300)d.tradeStockpile[g.id]=Math.max(0,Math.round((Number(d.tradeStockpile[g.id])||0)*100)/100);
 d.history=Array.isArray(d.history)?d.history.slice(-40):[];
 d.diplomatSystemV3=true;
 delete d.notifications;delete d.notificationSeq;delete d.diploZeroLatched;delete d.diploInsultBonusUntilDay;delete d.lastDiploBreakdown;delete d.diploCurrencyV2;
 if(d.network?.pairs)for(const p of Object.values(d.network.pairs))for(const r of Object.values(p?.directions||{}))if(r){r.embargo=false;delete r.subsidy;}
 return d;
}
const ASK_FLORINS_FAVOR_COST_1300=5;
function totalDiplomats1300(game){
 const status=campaignLeaderboardStatus1300(game),ratio=status.scoreRatio;
 return ratio>=.75?5:ratio>=.50?4:ratio>=.25?3:2;
}
function activeDiplomatMissions1300(game){
 return Object.values(diplomacyState(game).pairs).map(p=>({pair:p,ours:p.directions?.[PLAYER_REALM]})).filter(x=>x.ours?.mission);
}
function reconcileDiplomatCapacity1300(game){
 const active=activeDiplomatMissions1300(game),total=totalDiplomats1300(game);
 for(let i=total;i<active.length;i++)active[i].ours.mission=null;
}
function busyDiplomats1300(game){reconcileDiplomatCapacity1300(game);return activeDiplomatMissions1300(game).length;}
function availableDiplomats1300(game){return Math.max(0,totalDiplomats1300(game)-busyDiplomats1300(game));}
function diplomatSummary1300(game){const total=totalDiplomats1300(game),busy=busyDiplomats1300(game);return {total,busy,available:Math.max(0,total-busy)};}
function actionRecallsDiplomat1300(game,country,action){
 const ours=relation(game,PLAYER_REALM,country).ours;
 return action==='improve'&&ours.mission==='improve'||action==='curry'&&ours.mission==='curry';
}
function diplomacyActionCanStart1300(game,country,action){
 if(actionRecallsDiplomat1300(game,country,action))return true;
 if(availableDiplomats1300(game)<=0)return false;
 if(action==='money')return relation(game,PLAYER_REALM,country).ours.favors>=ASK_FLORINS_FAVOR_COST_1300;
 return true;
}
function requireFreeDiplomat1300(game,country,action){
 if(actionRecallsDiplomat1300(game,country,action))return true;
 if(availableDiplomats1300(game)>0)return true;
 toast(`All ${totalDiplomats1300(game)} diplomats are busy. Recall an Improve Relations or Curry Favors diplomat first.`);return false;
}
function diplomacyActionMeta1300(game,country,action){
 const ours=relation(game,PLAYER_REALM,country).ours;
 if(action==='improve')return ours.mission==='improve'?'Recall diplomat':'Uses 1 diplomat';
 if(action==='curry')return ours.mission==='curry'?'Recall diplomat':'Uses 1 diplomat';
 if(action==='money')return `${ASK_FLORINS_FAVOR_COST_1300} favors`;
 if(action==='war'&&availableCasusBelli1300(game,PLAYER_REALM,country).length)return 'Casus belli available';
 return 'Needs free diplomat';
}
function diplomacyRelation1300(game,country){return opinion(relation(game,PLAYER_REALM,country).theirs);}
function setDiplomacyRelation1300(game,country,value){const r=relation(game,PLAYER_REALM,country).theirs,current=opinion(r);r.opinion=clamp1300(r.opinion+value-current,-200,200);game.diplomacy.relations[country]=opinion(r);return opinion(r);}
function diplomacyCurrentCountryCities1300(game,country){return CITIES_1300.filter(c=>campaignCityOwner1300(game,c)===country);}
function greatCircleDistanceKm1300(a,b){
 const rad=Math.PI/180,lat1=Number(a?.lat)*rad,lat2=Number(b?.lat)*rad,dLat=(Number(b?.lat)-Number(a?.lat))*rad,dLon=(Number(b?.lon)-Number(a?.lon))*rad;
 if(!Number.isFinite(lat1)||!Number.isFinite(lat2)||!Number.isFinite(dLat)||!Number.isFinite(dLon))return Infinity;
 const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
 return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
}
function diplomacyAllianceContext1300(game,country){
 const rows=buildCampaignRankings1300(game),player=rows.find(r=>r.player),target=rows.find(r=>r.country===country);
 const playerStrength=Math.max(1,Number(player?.strength)||diplomacyPlayerStrength1300(game)),targetStrength=Math.max(1,Number(target?.strength)||Number(diplomacyCountryStats1300(country).strength)||1),strengthDifference=playerStrength-targetStrength;
 // Continuous version of +5 acceptance per 1,000 ranking-strength advantage, capped so one factor cannot decide everything alone.
 const rankingModifier=clamp1300(strengthDifference/200,-35,35);
 const playerCities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean),currentTarget=diplomacyCurrentCountryCities1300(game,country),targetCities=currentTarget.length?currentTarget:diplomacyCountryCities1300(country).filter(c=>!c.supportTerritory);
 let distanceKm=Infinity;
 for(const a of playerCities)for(const b of targetCities)distanceKm=Math.min(distanceKm,greatCircleDistanceKm1300(a,b));
 if(!Number.isFinite(distanceKm))distanceKm=1800;
 // Neighbours get a bonus; about every 150 km shifts acceptance by 5 points. Neutral is roughly 600 km.
 const distanceModifier=clamp1300((600-distanceKm)/30,-35,20);
 return {playerStrength,targetStrength,strengthDifference,rankingModifier,distanceKm,distanceModifier,playerRank:player?.rank??null,targetRank:target?.rank??null};
}
function allianceBaseReluctance1300(game){
 return game?.campaignStage==='nation'?10:game?.campaignStage==='free_cities'?0:-10;
}
function diplomacyPowers1300(game,country){
 const c=diplomacyAllianceContext1300(game,country);
 return {[PLAYER_REALM]:c.playerStrength,[country]:c.targetStrength,__baseReluctance:allianceBaseReluctance1300(game),__allianceRankingModifier:c.rankingModifier,__allianceDistanceModifier:c.distanceModifier,__allianceDistanceKm:c.distanceKm,__playerRank:c.playerRank,__targetRank:c.targetRank,__strengthDifference:c.strengthDifference};
}
function initializeDiplomacyWorld1300(game){
 const n=diplomacyState(game);if(n.worldInitialized)return;
 const countries=[...new Set(CITIES_1300.map(c=>c.country))],centers=Object.fromEntries(countries.map(name=>{const cs=CITIES_1300.filter(c=>c.country===name);return [name,{lat:cs.reduce((v,c)=>v+c.lat,0)/cs.length,lon:cs.reduce((v,c)=>v+c.lon,0)/cs.length}];}));
 for(const name of countries){relation(game,PLAYER_REALM,name);const near=countries.filter(c=>c!==name).sort((a,b)=>Math.hypot(centers[a].lat-centers[name].lat,centers[a].lon-centers[name].lon)-Math.hypot(centers[b].lat-centers[name].lat,centers[b].lon-centers[name].lon)).slice(0,2);for(const other of near){const r=relation(game,name,other);r.ours.mission='improve';}}
 n.worldInitialized=true;
}
function runAdvancedDiplomacy1300(action,options={}){
 const g=profile.activeGame,c=gameDiplomacyCountry;if(!g||!c)return null;ensureDiplomacyCountry1300(g,c);initializeDiplomacyWorld1300(g);
 if(!requireFreeDiplomat1300(g,c,action))return {ok:false,message:'No diplomat available.'};
 const result=performAction(g,PLAYER_REALM,c,action,diplomacyPowers1300(g,c),{...options,maxDiplomats:totalDiplomats1300(g)});
 if(result.ok&&action==='war')refreshIndependenceSupportWars1300(g);
 if(result.ok)syncCampaignMilitaryOverlay1300(g);
 if(result.ok||result.attempted){diplomacyLog1300(g,c,result.message);save();}
 renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(result.message);return result;
}
function advancedDiplomacyHTML1300(game,country){
 const {pair,ours,theirs}=relation(game,PLAYER_REALM,country),slots=relationSlots(game,PLAYER_REALM),dip=diplomatSummary1300(game);
 const labels={
  improve:'Improve relations',curry:'Curry favors',gift:'Gift',alliance:'Alliance',breakAlliance:'Break alliance',
  trust:'Spend favors for trust',rival:'Rival',insult:'Insult',guarantee:'Guarantee independence',
  recognition:'Independence recognition',supportIndependence:'Support independence',
  access:'Ask military access',offerAccess:'Offer military access',trade:'Trade agreement',
  money:'Ask Florins',sellCity:'Sell city',deal:'Exchange',peace:'Peace treaty',war:'Declare war'
 };
 const blocked=id=>pair.war&&!['peace','insult'].includes(id)||Math.max(0,(ours.cooldowns[id]||0)-game.day)>0||id==='breakAlliance'&&!pair.alliance||id==='alliance'&&pair.alliance;
 const defs={};
 for(const id of Object.keys(DIP_ACTIONS))defs[id]={id,label:labels[id]||DIP_ACTIONS[id],disabled:blocked(id)};
 Object.assign(defs,{
  money:{id:'money',label:labels.money,disabled:pair.war},
  recognition:{id:'recognition',label:labels.recognition,disabled:pair.war},
  sellCity:{id:'sellCity',label:labels.sellCity,disabled:pair.war||game.ownedCities?.length<=1},
  deal:{id:'deal',label:labels.deal,disabled:pair.war},
  supportIndependence:{id:'supportIndependence',label:labels.supportIndependence,disabled:pair.war}
 });
 const order=['improve','curry','gift','alliance','breakAlliance','trust','rival','insult','guarantee','recognition','supportIndependence','access','offerAccess','trade','money','sellCity','deal','peace','war'];
 const rows=order.filter(id=>defs[id]&&(id!=='peace'||pair.war)).map(id=>({...defs[id],disabled:defs[id].disabled||!diplomacyActionCanStart1300(game,country,id)}));
 return `<p class="dip-detail-note">Diplomats: <b>${dip.available}/${dip.total} available</b> · Commitments: ${slots}/4${pair.truceUntil>game.day?` · Truce: ${pair.truceUntil-game.day} days`:''}</p>
 <div class="dip-section-title compact"><span>DIPLOMATIC ACTIONS</span></div>
 <ul class="dip-action-list">${rows.map(x=>`<li><button data-action="dip-advanced" data-id="${x.id}" ${x.disabled?'disabled':''}><span>${esc(x.label)}</span><small class="${x.id==='money'?'favor':'diplomat'}">${esc(diplomacyActionMeta1300(game,country,x.id))}</small></button></li>`).join('')}</ul>
 <details class="dip-memory"><summary>Their diplomatic memories (${theirs.modifiers.length})</summary>${theirs.modifiers.map(m=>`<p>${esc(m.type)} <b class="${m.value>=0?'positive':'negative'}">${m.value>0?'+':''}${m.value.toFixed(1)}</b></p>`).join('')||'<p>No memories yet.</p>'}</details>`;
}
function diplomacyRelationLabel1300(v){return v>=70?'Trusted':v>=35?'Friendly':v>=10?'Cordial':v>-10?'Neutral':v>-35?'Tense':v>-70?'Hostile':'Bitter enemies';}
function diplomacyLog1300(game,country,text){const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy),date=gameDate1300(game.day);d.history.push({country,text,date:`${date.day} ${date.month} ${date.year}`});d.history=d.history.slice(-40);}
function diplomacyCountryCities1300(country){return [...CITIES_1300,...SUPPORT_TERRITORIES_1300].filter(c=>c.country===country);}
function diplomacyCountryGoodsModel1300(country){
 const cities=diplomacyCountryCities1300(country),n=Math.max(1,cities.length),popK=Math.max(2,cities.reduce((x,c)=>x+(Number(c.people)||0),0)/1000),food=cities.reduce((x,c)=>x+(Number(c.food)||50),0)/n,econ=cities.reduce((x,c)=>x+(Number(c.economyScore)||50),0)/n,tech=cities.reduce((x,c)=>x+(Number(c.technology)||50),0)/n,coastal=cities.filter(c=>isCoastalCity1300(c)).length;
 const supply={grain:popK*(.34+food/115),fish:coastal*12+popK*.015,meat:popK*(.06+food/900),wool:popK*(.07+food/1200),cloth:popK*(.03+econ/1100),wood:popK*(.09+food/1500),stone:popK*(.035+econ/2500),iron:popK*(.008+tech/6000),tools:popK*(.012+tech/3500),leather:popK*(.025+econ/2500),salt:popK*.018+coastal*2,wine:popK*(.02+econ/3000),ale:popK*(.045+food/1800),horses:popK*(.012+food/4000),luxuries:popK*(.004+econ/3200),services:popK*(.07+econ/900),manuscripts:popK*(.002+tech/10000),arms:popK*(.004+tech/7000),ships:coastal*(1+econ/65)};
 const demand={grain:popK*.78,fish:popK*.07,meat:popK*.10,wool:popK*.045,cloth:popK*.085,wood:popK*.06,stone:popK*.025,iron:popK*.018,tools:popK*.035,leather:popK*.028,salt:popK*.035,wine:popK*.025,ale:popK*.06,horses:popK*.015,luxuries:popK*(.008+econ/9000),services:popK*.12,manuscripts:popK*(.003+tech/9000),arms:popK*.012,ships:coastal*.9};
 const balances={};for(const g of GOODS_1300)balances[g.id]=Math.round(((supply[g.id]||0)-(demand[g.id]||0))*100)/100;
 return {balances,popK,economy:econ,technology:tech};
}
function diplomacyCountryStats1300(country){
 const row=countryRankings1300().find(r=>r.country===country);if(row)return row;
 const cities=diplomacyCountryCities1300(country),count=Math.max(1,cities.length),sum=k=>cities.reduce((n,c)=>n+(Number(c[k])||0),0);
 return {country,cityCount:cities.length,population:sum('people'),army:sum('army'),navy:sum('navy'),foodAvg:Math.round(sum('food')/count),economyAvg:Math.round(sum('economyScore')/count),technologyAvg:Math.round(sum('technology')/count),stabilityAvg:Math.round(sum('stability')/count),strength:Math.round((sum('army')*2+sum('navy')*10+sum('people')/50+sum('economyScore')*50/count)*1.1)};
}
function openingVictimCountry1300(game,country){
 return (game?.ownedCities||[]).some(id=>(game.originCountryByCity?.[id]||CITY_1300[id]?.country)===country);
}
function ensureDiplomacyOpinionBaseline1300(game,country){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);if(d.opinionBaselineV2[country])return;
 const victim=openingVictimCountry1300(game,country),r=relation(game,PLAYER_REALM,country),clean=x=>!x.modifiers?.length&&!x.ae;
 if(clean(r.ours)&&Number(r.ours.opinion)===0)r.ours.opinion=10;
 if(clean(r.theirs)){
  const current=Number(r.theirs.opinion)||0;
  if(victim&&(current===0||current===-200))r.theirs.opinion=-100;
  else if(!victim&&current===0)r.theirs.opinion=10;
 }
 d.relations[country]=opinion(r.theirs);d.opinionBaselineV2[country]=true;
}
function ensureDiplomacyCountry1300(game,country){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy),stats=diplomacyCountryStats1300(country),model=diplomacyCountryGoodsModel1300(country);
 if(!Number.isFinite(Number(d.relations[country])))d.relations[country]=openingVictimCountry1300(game,country)?-100:10;
 ensureDiplomacyOpinionBaseline1300(game,country);
 if(!Number.isFinite(Number(d.aiTreasuries[country])))d.aiTreasuries[country]=Math.round(Math.max(25,45+(stats.economyAvg||50)*1.8+(stats.cityCount||1)*12+(stats.population||0)/22000)*100)/100;
 if(!d.aiGoods[country]||typeof d.aiGoods[country]!=='object'||Array.isArray(d.aiGoods[country]))d.aiGoods[country]={};
 for(const g of GOODS_1300)if(!Number.isFinite(Number(d.aiGoods[country][g.id])))d.aiGoods[country][g.id]=Math.round(Math.max(0,(model.balances[g.id]||0)*3+Math.max(2,model.popK*.05))*100)/100;
 return {d,stats,model};
}
function accrueTradeSurplus1300(game,markets){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);
 for(const row of aggregateMarkets1300(markets||{})){const reserve=Math.max(0,Number(row.reserve)||0);if(reserve>0)d.tradeStockpile[row.id]=Math.round(Math.min(9999,(Number(d.tradeStockpile[row.id])||0)+reserve)*100)/100;}
}
function diplomacyPlayerStrength1300(game){
 const t=countryTotals1300(game);return Math.max(1,Math.round((t.food+t.economy+t.technology+t.stability)*50+t.population/50+t.army*2+t.navy*10));
}
function diplomacyChance1300(game,country,base=0){
 const rel=diplomacyRelation1300(game,country),target=Math.max(1,diplomacyCountryStats1300(country).strength||1),ratio=diplomacyPlayerStrength1300(game)/target;
 return clamp1300(base+rel*.65+Math.min(25,ratio*18),5,95);
}
function diplomacyAccepts1300(score){return Number(score)>=50;}
function acceptanceLabel1300(score){return score>=50?'Will accept':'Will refuse';}
function acceptanceClass1300(score){return score>=50?'accept':score>=35?'borderline':'reject';}
function acceptanceMeterHTML1300(score,note=''){
 const n=clamp1300(Math.round(Number(score)||0),0,100);
 return `<div class="dip-acceptance-meter ${acceptanceClass1300(n)}"><div><strong>Acceptance</strong><span>${n}/100 · ${acceptanceLabel1300(n).toUpperCase()}</span></div><i><b style="width:${n}%"></b><em></em></i>${note?`<small>${esc(note)}</small>`:''}</div>`;
}
function diplomacyGoodInterest1300(model,goodId){
 if(goodId==='florins')return 1;
 const balance=Number(model?.balances?.[goodId])||0,scale=Math.max(3,(Number(model?.popK)||1)*.08),pressure=clamp1300(balance/scale,-1.4,1.4);
 return clamp1300(1-pressure*.48,.34,1.75);
}
function allianceAssessment1300(game,country){return proposalAssessment1300(game,country,'alliance');}

function moneyRequestAssessment1300(game,country,amount){
 const {d}=ensureDiplomacyCountry1300(game,country),rel=diplomacyRelation1300(game,country),n=Math.max(0,Number(amount)||0);
 if(d.wars[country])return {score:0,note:'They will not finance an enemy.'};
 if(n<=0)return {score:0,note:'Enter an amount first.'};
 if(n>d.aiTreasuries[country])return {score:0,note:'The request is larger than their available diplomatic treasury.'};
 const treasuryShare=n/Math.max(1,d.aiTreasuries[country]),score=clamp1300(Math.round(24+rel*.5+(d.alliances[country]?18:0)+(d.recognitions[country]?5:0)-treasuryShare*72),1,99);
 return {score,note:treasuryShare>.35?'You are asking for a large share of their treasury.':d.alliances[country]?'Your alliance makes financial support more attractive.':'Better relations make financial aid more likely.'};
}
function independenceAssessment1300(game,country){
 const {d,stats}=ensureDiplomacyCountry1300(game,country),rel=diplomacyRelation1300(game,country),pending=(game.ownedCities||[]).filter(id=>(game.originCountryByCity?.[id]||CITY_1300[id]?.country)===country&&game.independenceByCity?.[id]!==true);
 if(!pending.length)return {score:0,note:'There are no rebel provinces from this country awaiting recognition.'};
 if(d.wars[country])return {score:0,note:'They will not recognise independence while the war continues.'};
 const ratio=diplomacyPlayerStrength1300(game)/Math.max(1,stats.strength||1),militaryPressure=clamp1300((ratio-.45)*38,-12,28),territoryCost=Math.min(22,pending.length*5),score=clamp1300(Math.round(18+rel*.34+militaryPressure-territoryCost+(d.alliances[country]?12:0)),1,99);
 return {score,note:ratio>=1?'Your strength makes suppressing the rebellion costly for them.':pending.length>2?'They are reluctant to recognise the loss of several provinces.':'Relations, military pressure and the number of lost provinces drive this choice.'};
}
function citySaleAssessment1300(game,country,cityId,price){
 const c=CITY_1300[cityId],{d}=ensureDiplomacyCountry1300(game,country),n=Math.max(0,Number(price)||0),rel=diplomacyRelation1300(game,country);
 if(!c||!game.ownedCities?.includes(cityId))return {score:0,note:'Choose one of your provinces.'};
 if(game.ownedCities.length<=1)return {score:0,note:'You cannot sell your final province.'};
 if(d.wars[country])return {score:0,note:'Peaceful city sales are unavailable during war.'};
 if(n>d.aiTreasuries[country])return {score:0,note:'They cannot afford the asking price.'};
 const home=(game.originCountryByCity?.[cityId]||c.country)===country,cityValue=Math.max(4,(Number(c.startingFlorins)||1)*12+(Number(c.people)||0)/12000+(Number(c.economyScore)||50)/10),ideal=cityValue*(home?1.55:1)*(1+Math.max(-.25,rel/250)),priceRatio=n/Math.max(.01,ideal),score=clamp1300(Math.round(88-priceRatio*38+rel*.08+(home?10:0)),1,99);
 return {score,ideal,home,note:home?'They value this province extra because it historically belongs to their realm.':priceRatio>.9?'The price is close to or above what they consider the province worth.':'The price is attractive compared with their valuation.'};
}
function tradeAssessment1300(game,country,offerAsset,offerAmount,requestAsset,requestAmount){
 const {d,model}=ensureDiplomacyCountry1300(game,country),oa=String(offerAsset||''),ra=String(requestAsset||''),on=Math.max(0,Number(offerAmount)||0),rn=Math.max(0,Number(requestAmount)||0),rel=diplomacyRelation1300(game,country);
 if(d.wars[country])return {score:0,note:'Normal trade is suspended during war.'};
 const treaty=relation(game,PLAYER_REALM,country);
 if(!on||!rn||oa===ra)return {score:0,note:'Choose two different assets and enter both amounts.'};
 if(oa==='florins'&&game.florins<on)return {score:0,note:'You cannot afford your own offer.'};
 if(oa!=='florins'&&(Number(d.tradeStockpile[oa])||0)<on)return {score:0,note:`You do not have enough ${GOOD_1300[oa]?.name||oa} in trade stock.`};
 if(ra==='florins'&&d.aiTreasuries[country]<rn)return {score:0,note:'Their treasury cannot cover this request.'};
 if(ra!=='florins'&&(Number(d.aiGoods[country]?.[ra])||0)<rn)return {score:0,note:`They do not have enough ${GOOD_1300[ra]?.name||ra} available.`};
 const offerInterest=diplomacyGoodInterest1300(model,oa),requestInterest=diplomacyGoodInterest1300(model,ra),offerValue=diplomacyAssetValue1300(oa,on)*offerInterest,requestValue=diplomacyAssetValue1300(ra,rn)*requestInterest,ratio=offerValue/Math.max(.0001,requestValue),score=clamp1300(Math.round(50+(ratio-1)*58+rel*.18+(treaty.pair.trade?10:0)),1,99);
 let note='The AI compares the value of both sides of the deal.';
 if(oa!=='florins'&&offerInterest>=1.25)note=`They currently need ${GOOD_1300[oa]?.name||oa}, so your offer is especially valuable.`;
 else if(oa!=='florins'&&offerInterest<=.7)note=`They already have plenty of ${GOOD_1300[oa]?.name||oa}, so they value your offer less.`;
 else if(ra!=='florins'&&requestInterest<=.7)note=`They have a surplus of ${GOOD_1300[ra]?.name||ra}, so they are happy to trade it away.`;
 else if(ra!=='florins'&&requestInterest>=1.25)note=`${GOOD_1300[ra]?.name||ra} is scarce for them, so they are reluctant to give it away.`;
 return {score,note,offerInterest,requestInterest,offerValue,requestValue,ratio};
}

function independenceSupportCandidates1300(game,country){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);
 return (game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean).filter(c=>{
  const origin=game.originCountryByCity?.[c.id]||c.country,supporters=d.independenceSupportByCity?.[c.id]||[];
  return origin&&origin!==country&&!supporters.includes(country);
 });
}
function supportIndependenceAssessment1300(game,country,cityId){
 const c=CITY_1300[cityId],{d}=ensureDiplomacyCountry1300(game,country),rel=diplomacyRelation1300(game,country);
 if(!c||!game.ownedCities?.includes(cityId))return {score:0,note:'Choose one of your provinces.'};
 const origin=game.originCountryByCity?.[cityId]||c.country;
 if(!origin||origin===country)return {score:0,note:'A country cannot support independence against itself.'};
 if(d.wars[country])return {score:0,note:'They will not promise support while at war with you.'};
 if((d.independenceSupportByCity?.[cityId]||[]).includes(country))return {score:99,note:`${country} already supports ${displayCityName1300(c)}.`};
 const originRelation=relation(game,country,origin),targetStrength=Math.max(1,diplomacyCountryStats1300(country).strength||1),originStrength=Math.max(1,diplomacyCountryStats1300(origin).strength||1);
 const strengthTerm=clamp1300(Math.log2(targetStrength/originStrength)*9,-18,18),originOpinion=opinion(originRelation.ours),rivalBonus=originRelation.ours.rival?22:0,allyPenalty=originRelation.pair.alliance?55:0,playerAlliance=d.alliances[country]?15:0;
 const score=clamp1300(Math.round(38+rel*.32+strengthTerm-originOpinion*.10+rivalBonus+playerAlliance-allyPenalty),1,99);
 const note=originRelation.pair.alliance?`They are allied with ${origin}, so support is very unlikely.`:originRelation.ours.rival?`${origin} is their rival, which makes support more attractive.`:`They weigh relations with you against the risk of opposing ${origin}.`;
 return {score,note,origin};
}
function grantIndependenceSupport1300(game,country,cityId){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);d.independenceSupportByCity??={};const list=d.independenceSupportByCity[cityId]??=[];
 if(!list.includes(country))list.push(country);d.independenceSupportByCity[cityId]=list;return list;
}
function requestSupportIndependence1300(country,cityId){
 const game=profile.activeGame;if(!game||!country)return;const c=CITY_1300[cityId],assessment=supportIndependenceAssessment1300(game,country,cityId),rel=diplomacyRelation1300(game,country);
 if(!c){toast('Choose a province first.');return;}if(!independenceSupportCandidates1300(game,country).some(x=>x.id===cityId)){toast(assessment.note||'This province is not eligible for another support promise.');return;}
 if(!requireFreeDiplomat1300(game,country,'supportIndependence'))return;
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-1);diplomacyLog1300(game,country,`Refused to support the independence of ${displayCityName1300(c)} (${assessment.score}% acceptance).`);toast(`${country} refused to support this province.`);}
 else{grantIndependenceSupport1300(game,country,cityId);refreshIndependenceSupportWars1300(game);setDiplomacyRelation1300(game,country,rel+2);diplomacyLog1300(game,country,`Promised to support ${displayCityName1300(c)} if ${assessment.origin} tries to reclaim it.`);toast(`${country} will support ${displayCityName1300(c)} against ${assessment.origin}.`);}
 save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();
}

function activateIndependenceSupport1300(game,enemyCountry){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy),promised=new Set();
 for(const cityId of game.ownedCities||[]){const origin=game.originCountryByCity?.[cityId]||CITY_1300[cityId]?.country;if(origin===enemyCountry)for(const s of d.independenceSupportByCity?.[cityId]||[])promised.add(s);}
 if(!promised.size)return [];
 d.activeIndependenceSupportWars??={};const active=new Set(d.activeIndependenceSupportWars[enemyCountry]||[]),joined=[];
 for(const supporter of promised){
  if(supporter===enemyCountry||active.has(supporter))continue;
  const r=relation(game,supporter,enemyCountry);r.pair.alliance=false;
  if(!r.pair.war)r.pair.war={started:Number(game.day)||0,attacker:supporter,defender:enemyCountry,supportFor:PLAYER_REALM};
  active.add(supporter);joined.push(supporter);
  diplomacyLog1300(game,supporter,`${supporter} activated its independence promise and joined your side against ${enemyCountry}.`);
 }
 d.activeIndependenceSupportWars[enemyCountry]=[...active];return joined;
}
function refreshIndependenceSupportWars1300(game){
 if(!game)return;
 for(const p of Object.values(diplomacyState(game).pairs)){
  if(!p.countries.includes(PLAYER_REALM)||!p.war||p.war.attacker===PLAYER_REALM)continue;
  const enemy=p.countries.find(c=>c!==PLAYER_REALM);if(enemy)activateIndependenceSupport1300(game,enemy);
 }
}
function dealTokenInfo1300(game,country,token,amount,side){
 const {d,model}=ensureDiplomacyCountry1300(game,country),n=Math.round(Math.max(0,Number(amount)||0)*100)/100,t=String(token||'');
 if(t==='florins'){
  if(n<=0)return {ok:false,note:'Enter a Florin amount.'};
  if(side==='offer'&&game.florins<n)return {ok:false,note:'You cannot afford the Florins in your offer.'};
  if(side==='request'&&d.aiTreasuries[country]<n)return {ok:false,note:'Their treasury cannot cover your request.'};
  return {ok:true,value:n,label:`ƒ${money1300(n)}`,kind:'florins',amount:n};
 }
 if(t.startsWith('good:')){
  const id=t.slice(5),g=GOOD_1300[id];if(!g||n<=0)return {ok:false,note:'Choose a good and amount.'};
  if(side==='offer'&&(Number(d.tradeStockpile[id])||0)<n)return {ok:false,note:`You only have ${money1300(d.tradeStockpile[id]||0)} ${g.name} in trade stock.`};
  if(side==='request'&&(Number(d.aiGoods[country]?.[id])||0)<n)return {ok:false,note:`They do not have enough ${g.name} available.`};
  const interest=diplomacyGoodInterest1300(model,id);
  return {ok:true,value:diplomacyAssetValue1300(id,n)*interest,label:`${money1300(n)} ${g.name}`,kind:'good',goodId:id,amount:n,interest};
 }
 if(t.startsWith('city:')){
  const id=t.slice(5),c=CITY_1300[id];
  if(side!=='offer'||!c||!game.ownedCities?.includes(id))return {ok:false,note:'That city cannot be offered.'};
  if(game.ownedCities.length<=1)return {ok:false,note:'You cannot trade away your final province.'};
  const sale=citySaleAssessment1300(game,country,id,0);
  return {ok:true,value:Math.max(6,Number(sale.ideal)||10),label:`City: ${displayCityName1300(c)}`,kind:'city',cityId:id,amount:1};
 }
 if(t.startsWith('support:')){
  const id=t.slice(8),c=CITY_1300[id],support=supportIndependenceAssessment1300(game,country,id);
  if(side!=='request'||!c||support.score<=0)return {ok:false,note:support.note||'That support cannot be requested.'};
  const originStrength=Math.max(1,diplomacyCountryStats1300(support.origin).strength||1),targetStrength=Math.max(1,diplomacyCountryStats1300(country).strength||1),risk=clamp1300(originStrength/targetStrength,0.4,3);
  return {ok:true,value:12+risk*9,label:`Support independence: ${displayCityName1300(c)}`,kind:'support',cityId:id,amount:1,support};
 }
 return {ok:false,note:'Choose an asset.'};
}
function diplomacyDealAssessment1300(game,country,offerToken,offerAmount,requestToken,requestAmount){
 const {d}=ensureDiplomacyCountry1300(game,country);if(d.wars[country])return {score:0,note:'Normal negotiations are suspended during war.'};
 const treaty=relation(game,PLAYER_REALM,country);
 const offer=dealTokenInfo1300(game,country,offerToken,offerAmount,'offer');if(!offer.ok)return {score:0,note:offer.note,offer};
 const request=dealTokenInfo1300(game,country,requestToken,requestAmount,'request');if(!request.ok)return {score:0,note:request.note,offer,request};
 if(String(offerToken||'')===String(requestToken||''))return {score:0,note:'Choose two different things for the exchange.',offer,request};
 if(offer.kind==='city'&&request.kind==='support'&&offer.cityId===request.cityId)return {score:0,note:'You cannot trade away the same city whose independence you are asking them to support.',offer,request};
 const rel=diplomacyRelation1300(game,country),ratio=offer.value/Math.max(.0001,request.value),score=clamp1300(Math.round(50+(ratio-1)*55+rel*.18+(treaty.pair.trade?10:0)),1,99);
 let note='They compare the diplomatic and economic value of both sides of the exchange.';
 if(offer.kind==='city')note='A city is a major concession and can be exchanged for goods, Florins or independence support.';
 if(request.kind==='support')note=`They price the military risk of opposing ${request.support.origin} into this promise.`;
 return {score,note,offer,request,ratio};
}
function transferPlayerCityInDeal1300(game,country,cityId){
 game.ownedCities=game.ownedCities.filter(id=>id!==cityId);game.cityOwners??={};game.cityOwners[cityId]=country;delete game.buildings?.[cityId];
 for(const key of ['employment','lastEconomy','markets','pops','cityWages','dynamicStats','technologyBudgets','lastStatChanges','statRemainders'])delete game.economy?.[key]?.[cityId];
 delete game.economy?.buildingWages?.[cityId];
 delete game.diplomacy?.independenceSupportByCity?.[cityId];
 if(gameProvincePanel===cityId){gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;renderGameProvincePanel();}
}
function executeDiplomaticDeal1300(country,offerToken,offerAmount,requestToken,requestAmount){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),assessment=diplomacyDealAssessment1300(game,country,offerToken,offerAmount,requestToken,requestAmount);
 if(assessment.score<=0){toast(assessment.note||'This exchange cannot be proposed.');return false;}
 if(!requireFreeDiplomat1300(game,country,'deal'))return false;
 if(!diplomacyAccepts1300(assessment.score)){diplomacyLog1300(game,country,`Rejected exchange (${assessment.score}% acceptance): ${assessment.note}`);setDiplomacyRelation1300(game,country,diplomacyRelation1300(game,country)-1);save();renderGameDiplomacyPanel1300();toast(`${country} rejected the exchange.`);return false;}
 const {offer,request}=assessment;
 if(offer.kind==='florins'){game.florins=Math.round((game.florins-offer.amount)*100)/100;d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]+offer.amount)*100)/100;}
 if(offer.kind==='good'){d.tradeStockpile[offer.goodId]=Math.round((d.tradeStockpile[offer.goodId]-offer.amount)*100)/100;d.aiGoods[country][offer.goodId]=Math.round(((Number(d.aiGoods[country][offer.goodId])||0)+offer.amount)*100)/100;}
 if(offer.kind==='city')transferPlayerCityInDeal1300(game,country,offer.cityId);
 if(request.kind==='florins'){d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-request.amount)*100)/100;game.florins=Math.round((game.florins+request.amount)*100)/100;}
 if(request.kind==='good'){d.aiGoods[country][request.goodId]=Math.round((d.aiGoods[country][request.goodId]-request.amount)*100)/100;d.tradeStockpile[request.goodId]=Math.round(((Number(d.tradeStockpile[request.goodId])||0)+request.amount)*100)/100;}
 if(request.kind==='support'){grantIndependenceSupport1300(game,country,request.cityId);refreshIndependenceSupportWars1300(game);}
 setDiplomacyRelation1300(game,country,diplomacyRelation1300(game,country)+2);diplomacyLog1300(game,country,`Exchange accepted: you offered ${offer.label}; they provided ${request.label}.`);
 if(offer.kind==='good'||request.kind==='good')simulateGameEconomyDay1300(game,{forceMarket:true,collectRevenue:false});
 refreshCampaignStage1300(game);updateCampaignRankingSnapshot1300(game);syncCampaignMilitaryOverlay1300(game);
 save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(`Exchange with ${country} completed.`);return true;
}

function improveRelations1300(country){gameDiplomacyCountry=country;runAdvancedDiplomacy1300('improve');}

function insultCountry1300(country){gameDiplomacyCountry=country;runAdvancedDiplomacy1300('insult');}

function declareWar1300(country){gameDiplomacyCountry=country;runAdvancedDiplomacy1300('war');}

function requestAlliance1300(country){gameDiplomacyCountry=country;runAdvancedDiplomacy1300('alliance');}

function requestMoney1300(country,amount){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),ours=relation(game,PLAYER_REALM,country).ours,n=Math.round(Math.max(0,Number(amount)||0)*100)/100,rel=diplomacyRelation1300(game,country),assessment=moneyRequestAssessment1300(game,country,n);
 if(!n){toast('Enter an amount of Florins to request.');return;}if(d.wars[country]){toast('They will not fund you while at war.');return;}if(n>d.aiTreasuries[country]){toast(`${country} does not have that much available treasury.`);return;}
 if(ours.favors<ASK_FLORINS_FAVOR_COST_1300){toast(`Ask Florins requires ${ASK_FLORINS_FAVOR_COST_1300} favors with ${country}. You have ${ours.favors.toFixed(1)}.`);return;}
 if(!requireFreeDiplomat1300(game,country,'money'))return;
 ours.favors=round(Math.max(0,ours.favors-ASK_FLORINS_FAVOR_COST_1300),2);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-2);diplomacyLog1300(game,country,`Spent ${ASK_FLORINS_FAVOR_COST_1300} favors; request for ƒ${money1300(n)} rejected (${assessment.score}% acceptance).`);toast(`${country} refused the request.`);}else{d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-n)*100)/100;game.florins=Math.round((game.florins+n)*100)/100;setDiplomacyRelation1300(game,country,rel+1);diplomacyLog1300(game,country,`Spent ${ASK_FLORINS_FAVOR_COST_1300} favors and received ƒ${money1300(n)} in financial aid (${assessment.score}% acceptance).`);toast(`${country} sent ƒ${money1300(n)}.`);}save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();
}
function requestIndependence1300(country){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),pending=(game.ownedCities||[]).filter(id=>(game.originCountryByCity?.[id]||CITY_1300[id]?.country)===country&&game.independenceByCity?.[id]!==true);
 if(!pending.length){toast('You have no unrecognised rebel provinces from this country.');return;}if(d.wars[country]){toast('Recognition cannot be negotiated while you are at war.');return;}
 if(!requireFreeDiplomat1300(game,country,'recognition'))return;
 const assessment=independenceAssessment1300(game,country),rel=diplomacyRelation1300(game,country);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-4);diplomacyLog1300(game,country,`Independence recognition rejected for ${pending.length} province${pending.length===1?'':'s'} (${assessment.score}% acceptance).`);toast(`${country} refused to recognise your independence.`);}
 else{for(const id of pending)game.independenceByCity[id]=true;d.recognitions[country]=true;setDiplomacyRelation1300(game,country,Math.max(15,rel+10));refreshCampaignStage1300(game);diplomacyLog1300(game,country,`Recognised the independence of ${pending.length} rebel province${pending.length===1?'':'s'} (${assessment.score}% acceptance).`);toast(`${country} recognised your independence.`);}
 updateCampaignRankingSnapshot1300(game);save();renderGameDiplomacyPanel1300();renderGameCountryPanel1300();refreshGameClockUI1300();
}
function sellCityToCountry1300(country,cityId,price){
 const game=profile.activeGame;if(!game||!country)return;const c=CITY_1300[cityId],{d}=ensureDiplomacyCountry1300(game,country),n=Math.round(Math.max(0,Number(price)||0)*100)/100;if(!c||!game.ownedCities?.includes(cityId)){toast('Choose one of your provinces.');return;}if(game.ownedCities.length<=1){toast('You cannot sell your final province.');return;}if(d.wars[country]){toast('You cannot peacefully sell a city while at war.');return;}if(n>d.aiTreasuries[country]){toast(`${country} cannot afford that price.`);return;}
 if(!requireFreeDiplomat1300(game,country,'sellCity'))return;
 const rel=diplomacyRelation1300(game,country),assessment=citySaleAssessment1300(game,country,cityId,n);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-2);diplomacyLog1300(game,country,`Rejected offer to buy ${displayCityName1300(c)} for ƒ${money1300(n)} (${assessment.score}% acceptance).`);save();renderGameDiplomacyPanel1300();toast(`${country} rejected the city price.`);return;}
 d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-n)*100)/100;game.florins=Math.round((game.florins+n)*100)/100;game.ownedCities=game.ownedCities.filter(id=>id!==cityId);game.cityOwners??={};game.cityOwners[cityId]=country;delete game.buildings?.[cityId];delete game.construction?.[cityId];for(const key of ['employment','lastEconomy','markets','pops','cityWages','dynamicStats','technologyBudgets','lastStatChanges','statRemainders'])delete game.economy?.[key]?.[cityId];delete game.economy?.buildingWages?.[cityId];delete game.diplomacy?.independenceSupportByCity?.[cityId];setDiplomacyRelation1300(game,country,rel+5);diplomacyLog1300(game,country,`Bought ${displayCityName1300(c)} for ƒ${money1300(n)}.`);refreshCampaignStage1300(game);updateCampaignRankingSnapshot1300(game);syncCampaignMilitaryOverlay1300(game);if(gameProvincePanel===cityId){gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;renderGameProvincePanel();}save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(`${displayCityName1300(c)} was sold to ${country}.`);
}
function diplomacyAssetValue1300(asset,amount){if(asset==='florins')return Number(amount)||0;const g=GOOD_1300[asset];return (Number(amount)||0)*(Number(g?.basePrice)||1)*FLORINS_PER_MARKET_VALUE;}
function executeDiplomaticTrade1300(country,offerAsset,offerAmount,requestAsset,requestAmount){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),oa=String(offerAsset||''),ra=String(requestAsset||''),on=Math.round(Math.max(0,Number(offerAmount)||0)*100)/100,rn=Math.round(Math.max(0,Number(requestAmount)||0)*100)/100,assessment=tradeAssessment1300(game,country,oa,on,ra,rn);if(!on||!rn||oa===ra){toast('Choose two different assets and enter both amounts.');return;}if(d.wars[country]){toast('Normal trade is suspended while at war.');return;}
 if(oa==='florins'){if(game.florins<on){toast('You do not have enough Florins for this offer.');return;}}else if((Number(d.tradeStockpile[oa])||0)<on){toast(`You only have ${money1300(d.tradeStockpile[oa]||0)} ${GOOD_1300[oa]?.name||oa} in trade stock.`);return;}
 if(ra==='florins'){if(d.aiTreasuries[country]<rn){toast(`${country} cannot pay that many Florins.`);return;}}else if((Number(d.aiGoods[country]?.[ra])||0)<rn){toast(`${country} does not have that much ${GOOD_1300[ra]?.name||ra} available.`);return;}
 if(!requireFreeDiplomat1300(game,country,'trade'))return;
 const rel=diplomacyRelation1300(game,country);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-1);diplomacyLog1300(game,country,`Rejected trade proposal (${assessment.score}% acceptance): ${assessment.note}`);save();renderGameDiplomacyPanel1300();toast(`${country} rejected the trade.`);return;}
 if(oa==='florins'){game.florins=Math.round((game.florins-on)*100)/100;d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]+on)*100)/100;}else{d.tradeStockpile[oa]=Math.round((d.tradeStockpile[oa]-on)*100)/100;d.aiGoods[country][oa]=Math.round(((Number(d.aiGoods[country][oa])||0)+on)*100)/100;}
 if(ra==='florins'){d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-rn)*100)/100;game.florins=Math.round((game.florins+rn)*100)/100;}else{d.aiGoods[country][ra]=Math.round((d.aiGoods[country][ra]-rn)*100)/100;d.tradeStockpile[ra]=Math.round(((Number(d.tradeStockpile[ra])||0)+rn)*100)/100;}
 setDiplomacyRelation1300(game,country,rel+1);diplomacyLog1300(game,country,`Trade completed (${assessment.score}% acceptance): offered ${on} ${oa==='florins'?'Florins':GOOD_1300[oa]?.name||oa}, received ${rn} ${ra==='florins'?'Florins':GOOD_1300[ra]?.name||ra}.`);if(oa!=='florins'||ra!=='florins')simulateGameEconomyDay1300(game,{forceMarket:true,collectRevenue:false});save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(`Trade with ${country} completed.`);
}
function normaliseGameEconomy1300(raw){
 const e=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshGameEconomy1300(),hadDynamic=!!(e.dynamicStats&&typeof e.dynamicStats==='object'&&!Array.isArray(e.dynamicStats)),wasWeekly=!!e.weeklyCadenceV1;
 e.taxRate=clamp1300(Math.round(Number.isFinite(Number(e.taxRate))?Number(e.taxRate):10),GAME_TAX_MIN,GAME_TAX_MAX);
 if(!e.startingWage020V1&&Math.abs((Number(e.nationalWage)||.12)-.12)<.001)e.nationalWage=.20;
 if(!e.startingWage040V2&&Math.abs((Number(e.nationalWage)||.20)-.20)<.001)e.nationalWage=.40;
 if(!e.weeklyWage010V3){e.nationalWage=.10;e.cityWages={};e.buildingWages={};e.weeklyWage010V3=true;}
 if(!e.weeklyWage006V4){if(Math.abs((Number(e.nationalWage)||.10)-.10)<.001)e.nationalWage=.06;for(const wages of [e.cityWages,e.buildingWages])for(const [key,value] of Object.entries(wages||{})){if(value&&typeof value==='object'&&!Array.isArray(value)){for(const [subKey,subValue] of Object.entries(value))if(Math.abs((Number(subValue)||0)-.10)<.001)value[subKey]=.06;}else if(Math.abs((Number(value)||0)-.10)<.001)wages[key]=.06;}e.weeklyWage006V4=true;}
 if(!e.weeklyWage002V5){if(Math.abs((Number(e.nationalWage)||.06)-.06)<.001)e.nationalWage=.02;for(const wages of [e.cityWages,e.buildingWages])for(const [key,value] of Object.entries(wages||{})){if(value&&typeof value==='object'&&!Array.isArray(value)){for(const [subKey,subValue] of Object.entries(value))if(Math.abs((Number(subValue)||0)-.06)<.001)value[subKey]=.02;}else if(Math.abs((Number(value)||0)-.06)<.001)wages[key]=.02;}e.weeklyWage002V5=true;}
 if(!e.monthlyWage012V6){e.nationalWage=.12;e.cityWages={};e.buildingWages={};e.monthlyWage012V6=true;}
 if(!e.monthlyWage010V7){if(Math.abs((Number(e.nationalWage)||.12)-.12)<.001)e.nationalWage=.10;for(const wages of [e.cityWages,e.buildingWages])for(const [key,value] of Object.entries(wages||{})){if(value&&typeof value==='object'&&!Array.isArray(value)){for(const [subKey,subValue] of Object.entries(value))if(Math.abs((Number(subValue)||0)-.12)<.001)value[subKey]=.10;}else if(Math.abs((Number(value)||0)-.12)<.001)wages[key]=.10;}e.monthlyWage010V7=true;}
 if(!e.monthlyWage008V8){if(Math.abs((Number(e.nationalWage)||.10)-.10)<.001)e.nationalWage=.08;for(const wages of [e.cityWages,e.buildingWages])for(const [key,value] of Object.entries(wages||{})){if(value&&typeof value==='object'&&!Array.isArray(value)){for(const [subKey,subValue] of Object.entries(value))if(Math.abs((Number(subValue)||0)-.10)<.001)value[subKey]=.08;}else if(Math.abs((Number(value)||0)-.10)<.001)wages[key]=.08;}e.monthlyWage008V8=true;}
 e.nationalWage=clamp1300(Math.round((Number(e.nationalWage)||.08)*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);e.startingWage020V1=true;e.startingWage040V2=true;e.weeklyWage010V3=true;e.weeklyWage006V4=true;e.weeklyWage002V5=true;e.monthlyWage012V6=true;e.monthlyWage010V7=true;e.monthlyWage008V8=true;
 for(const key of ['tariffs','cityWages','buildingWages','companyPolicies','companyTreasuries','populationByCity','populationDemography','populationRemainders','employment','lastEconomy','markets','pops','dynamicStats','technologyBudgets','lastStatChanges','statRemainders'])if(!e[key]||typeof e[key]!=='object'||Array.isArray(e[key]))e[key]={};
 for(const [cityId,policies] of Object.entries({...e.companyPolicies})){
  if(!policies||typeof policies!=='object'||Array.isArray(policies)){delete e.companyPolicies[cityId];continue;}
  for(const [buildingId,raw] of Object.entries({...policies})){
   if(!raw||typeof raw!=='object'||Array.isArray(raw)){delete policies[buildingId];continue;}
   const priority=['employment','output'].includes(raw.priority)?raw.priority:'employment';
   const methods=productionMethodsForBuilding1300(buildingId),fallback=methods[0]?.id||'standard',productionMethod=methods.some(x=>x.id===raw.productionMethod)?raw.productionMethod:fallback;
   policies[buildingId]={employmentTarget:clamp1300(Math.round(Number.isFinite(Number(raw.employmentTarget))?Number(raw.employmentTarget):100),0,100),buildingSupport:clamp1300(Math.round((Number(raw.buildingSupport??raw.recruitmentSupport)||0)*10)/10,0,10),priority,productionMethod};
  }
 }
 for(const g of GOODS_1300)e.tariffs[g.id]=g.category==='service'?0:clamp1300(Math.round((Number(e.tariffs[g.id])||0)/5)*5,0,50);
 e.lastMarketTickDay=Number.isFinite(Number(e.lastMarketTickDay))?Number(e.lastMarketTickDay):null;
 e.weeklyTax=Math.max(0,Number.isFinite(Number(e.weeklyTax))?Number(e.weeklyTax):0);e.weeklyTariffRevenue=Math.max(0,Number.isFinite(Number(e.weeklyTariffRevenue))?Number(e.weeklyTariffRevenue):0);
 for(const key of ['weekSectorRevenue','weekTariffRevenue','lastWeekSectorRevenue','lastWeekTariffRevenue','monthRevenue','monthExpenses','lastMonthRevenue','lastMonthExpenses','lastMonthBalance'])e[key]=Number.isFinite(Number(e[key]))?Number(e[key]):0;
 if(!e.weeklyBudgetProjection||typeof e.weeklyBudgetProjection!=='object'||Array.isArray(e.weeklyBudgetProjection))e.weeklyBudgetProjection=null;
 e.stabilityBudget=clamp1300(Math.round((hadDynamic&&Number.isFinite(Number(e.stabilityBudget))?Number(e.stabilityBudget):0)*100)/100,0,10000);
 e.stabilityModifier=0;
 e.corruption=clamp1300(Number.isFinite(Number(e.corruption))?Number(e.corruption):20,0,100);
 e.lastStabilityChange=Number.isFinite(Number(e.lastStabilityChange))?Number(e.lastStabilityChange):0;
 if(!wasWeekly){
  e.stabilityBudget=roundStat1300(e.stabilityBudget/WEEKS_PER_MONTH);
  for(const id of Object.keys(e.technologyBudgets))e.technologyBudgets[id]=roundStat1300((Number(e.technologyBudgets[id])||0)/WEEKS_PER_MONTH);
  for(const city of Object.values(e.lastEconomy))for(const row of Object.values(city||{}))for(const key of ['gross','inputCost','wageBill','profit','tax'])if(Number.isFinite(Number(row?.[key])))row[key]=round(Number(row[key])/WEEKS_PER_MONTH,4);
  for(const market of Object.values(e.markets))for(const row of Object.values(market?.goods||{}))if(Number.isFinite(Number(row?.tradeProfit)))row.tradeProfit=round(Number(row.tradeProfit)/WEEKS_PER_MONTH,4);
  e.monthRevenue=0;e.monthExpenses=0;e.lastMonthRevenue=0;e.lastMonthExpenses=0;e.lastMonthBalance=0;e.lastMonthLabel='No completed week yet';
 }
 e.weeklyCadenceV1=true;
 if(typeof e.lastMonthLabel!=='string')e.lastMonthLabel='No completed week yet';
 return e;
}
const GAME_WEEKDAYS_1300=['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag','Zondag'];
function gameDate1300(dayIndex=0){
 const index=Math.max(0,Math.floor(Number(dayIndex)||0)),d=new Date(Date.UTC(1300,0,1+index));
 return {day:d.getUTCDate(),month:GAME_MONTHS_1300[d.getUTCMonth()],year:d.getUTCFullYear(),weekday:GAME_WEEKDAYS_1300[index%7]};
}
const GAME_ARMY_UPKEEP_PER_UNIT=.001,GAME_UNPROF_ARMY_UPKEEP_PER_UNIT=.0001,GAME_NAVY_UPKEEP_PER_UNIT=.003;
const roundStat1300=n=>Math.round((Number(n)||0)*100)/100;
function completedCampaignMonths1300(game){
 const d=new Date(Date.UTC(1300,0,1+Math.max(0,Math.floor(Number(game?.day)||0))));
 return Math.max(0,(d.getUTCFullYear()-1300)*12+d.getUTCMonth());
}
function completedCampaignWeeks1300(game){return Math.max(0,Math.floor((Number(game?.day)||0)/7));}
function expectedMonthlyWage1300(game){const years=Math.max(0,Math.floor((Number(game?.day)||0)/365.2425));return Math.min(GAME_WAGE_MAX,.08+years*.01);}
function populationDemandGrowth1300(game){const years=Math.max(0,(Number(game?.day)||0)/365.2425);return Math.min(3,1+years*.01);}
function isCampaignMonday1300(game){return Math.max(0,Math.floor(Number(game?.day)||0))%7===0;}
function daysUntilCampaignMonday1300(game){const n=Math.max(0,Math.floor(Number(game?.day)||0))%7;return (7-n)%7;}
function gameStatCap1300(game){return roundStat1300(100+completedCampaignWeeks1300(game)*(.10/WEEKS_PER_MONTH));}
function ensureGameDynamicStats1300(game){
 if(!game)return;const e=game.economy=normaliseGameEconomy1300(game.economy);
 for(const id of game.ownedCities||[]){
  const c=CITY_1300[id];if(!c)continue;
  const row=e.dynamicStats[id]&&typeof e.dynamicStats[id]==='object'?e.dynamicStats[id]:{};
  e.dynamicStats[id]={
   food:roundStat1300(Number.isFinite(Number(row.food))?row.food:c.food),
   economy:roundStat1300(Number.isFinite(Number(row.economy))?row.economy:c.economyScore),
   technology:roundStat1300(Number.isFinite(Number(row.technology))?row.technology:c.technology),
   stability:roundStat1300(Number.isFinite(Number(row.stability))?row.stability:c.stability)
  };
  e.technologyBudgets[id]=Math.max(0,roundStat1300(Number(e.technologyBudgets[id])||0));
 }
}
function provinceDynamicStats1300(game,c,{withBuildings=true}={}){
 if(!game||!c)return {food:0,economy:0,technology:0,stability:0,cap:100};
 ensureGameDynamicStats1300(game);const e=game.economy,row=e.dynamicStats[c.id],cap=gameStatCap1300(game),state=withBuildings?gameProvinceBuildingState(c):null,b=state?.bonuses||{food:0,economy:0,technology:0,stability:0},tech=technologyBonuses1300(game.technology),hasMarket=!!state?.buildings?.some(x=>x.id==='market'&&x.level>0);
 const value=(key,bonus=0)=>roundStat1300(clamp1300((Number(row?.[key])||0)+(Number(bonus)||0),0,cap));
 return {food:value('food',b.food),economy:value('economy',(Number(b.economy)||0)+tech.economyFlat+(hasMarket?tech.marketEconomyFlat:0)),technology:value('technology',b.technology),stability:value('stability',(Number(b.stability)||0)+tech.stabilityFlat),cap};
}
function effectiveProvinceStability1300(game,c,buildingBonus=0){
 if(game?.ownedCities?.includes(c?.id))return provinceDynamicStats1300(game,c).stability;
 return roundStat1300(clamp1300((Number(c?.stability)||0)+(Number(buildingBonus)||0),0,100));
}
function ensureGamePopulation1300(game){
 if(!game)return;const e=game.economy=normaliseGameEconomy1300(game.economy);
 for(const id of game.ownedCities||[]){const c=CITY_1300[id];if(!c)continue;const current=Number(e.populationByCity[id]);if(!Number.isFinite(current)||current<1)e.populationByCity[id]=Math.max(1,Math.round(Number(c.people)||1));if(!Number.isFinite(Number(e.populationRemainders[id])))e.populationRemainders[id]=0;}
}
function effectivePopulation1300(game,c){
 if(!c)return 0;if(game?.ownedCities?.includes(c.id)){ensureGamePopulation1300(game);return Math.max(1,Math.round(Number(game.economy.populationByCity[c.id])||Number(c.people)||1));}
 return Math.max(0,Math.round(Number(c.people)||0));
}
function foodAvailabilityFromMarket1300(market,fallback=1){
 const rows=['grain','fish','meat'].map(id=>market?.goods?.[id]).filter(Boolean),need=rows.reduce((n,r)=>n+(Number(r.need)||Number(r.demand)||0),0),fulfilled=rows.reduce((n,r)=>n+(Number(r.fulfilled)||0),0);
 return need>0?clamp1300(fulfilled/need,.15,1.15):clamp1300(Number(fallback)||1,.15,1.15);
}
function foodHappinessEffect1300(availability){
 const a=clamp1300(Number(availability)||1,.15,1.15);
 return a>=1?clamp1300((a-1)*30,0,5):clamp1300((a-1)*18,-12,0);
}
function costOfLivingHappinessEffect1300(costPct){
 const cost=Math.max(0,Number(costPct)||0);
 if(cost<2.5)return clamp1300((2.5-cost)*1.2,0,3);
 if(cost<5)return clamp1300(-(cost-2.5)*.35,-.9,0);
 return clamp1300(-.9-(cost-5)*1.15,-24,-.9);
}
function countryFoodAvailability1300(game){
 let need=0,fulfilled=0;for(const id of game?.ownedCities||[]){const market=game.economy?.markets?.[id];for(const gid of ['grain','fish','meat']){const row=market?.goods?.[gid];if(!row)continue;need+=Number(row.need)||Number(row.demand)||0;fulfilled+=Number(row.fulfilled)||0;}}
 return need>0?clamp1300(fulfilled/need,.15,1.15):1;
}
function rescalePopulationGroups1300(game,cityId,newPopulation){
 const groups=game?.economy?.pops?.[cityId]?.groups;if(!Array.isArray(groups)||!groups.length)return;const current=groups.reduce((n,g)=>n+(Number(g.size)||0),0);if(current<=0)return;
 let used=0;for(let i=0;i<groups.length;i++){const next=i===groups.length-1?Math.max(0,newPopulation-used):Math.max(0,Math.round(newPopulation*(Number(groups[i].size)||0)/current));groups[i].size=next;groups[i].employed=Math.min(Number(groups[i].employed)||0,next);used+=next;}
}
function provinceDemographyProjection1300(game,c){
 ensureGamePopulation1300(game);const e=game.economy,population=effectivePopulation1300(game,c),market=e.markets?.[c.id],pop=e.pops?.[c.id],stats=provinceDynamicStats1300(game,c),buildingBonuses=gameProvinceBuildingState(c).bonuses;
 const foodAvailability=foodAvailabilityFromMarket1300(market,clamp1300((Number(stats.food)||50)/70,.45,1.08));
 const groups=pop?.groups||[],groupPop=groups.reduce((n,g)=>n+(Number(g.size)||0),0),avgWealth=Number(pop?.averageWealth)||(groupPop?groups.reduce((n,g)=>n+(Number(g.wealth)||0)*(Number(g.size)||0),0)/groupPop:10),avgSol=Number(pop?.averageStandardOfLiving)||(groupPop?groups.reduce((n,g)=>n+(Number(g.standardOfLiving)||0)*(Number(g.size)||0),0)/groupPop:10);
 const wageRatio=effectiveCityWage1300(game,c.id)/expectedMonthlyWage1300(game),tariffCost=Math.max(0,Number(market?.tariffCostOfLivingPct)||0),stabilityEffect=stabilityHappinessEffect1300(stats.stability),solEffect=(avgSol-10)*1.6,wageEffect=clamp1300((wageRatio-1)*16,-18,16),taxEffect=clamp1300(-(e.taxRate-10)*.70,-18,7),tariffEffect=costOfLivingHappinessEffect1300(tariffCost),foodEffect=foodHappinessEffect1300(foodAvailability),buildingHappinessEffect=Number(buildingBonuses.happinessBonus)||0,currentHappiness=clamp1300(Number.isFinite(Number(e.populationDemography?.[c.id]?.happiness))?Number(e.populationDemography[c.id].happiness):60,0,100),happinessPressure=stabilityEffect+solEffect+wageEffect+taxEffect+tariffEffect+foodEffect+buildingHappinessEffect,happinessStep=happinessWeeklyStep1300(currentHappiness,happinessPressure),happiness=happinessStep.value,technology=Number(stats.technology)||0;
 const foodFertility=clamp1300(.30+foodAvailability*.72,.15,1.08),happinessFertility=clamp1300(.72+happiness*.0038,.64,1.10),wealthFertility=clamp1300(.78+(avgWealth-6)*.04,.58,1.14),birthRate=clamp1300(39*foodFertility*happinessFertility*wealthFertility,7,46);
 const techMortality=clamp1300(1.22-(technology/100)*.44,.78,1.22),foodMortality=foodAvailability>=.95?1:1+(.95-foodAvailability)*8,wealthMortality=clamp1300(1.12-(avgSol-6)*.025,.78,1.35),happinessMortality=happiness<40?1+(40-happiness)/100:1,deathRate=clamp1300(38*techMortality*foodMortality*wealthMortality*happinessMortality,27,230);
 const growthBonus=technologyBonuses1300(game.technology).populationGrowthPct/100,rawAnnualPct=(birthRate-deathRate)/10,annualGrowthPct=clamp1300(rawAnnualPct*(1+growthBonus),-18,1.2),weeklyRate=annualGrowthPct/100/52.1429,expectedBirths=population*(birthRate/1000)/52.1429,expectedDeaths=population*(deathRate/1000)/52.1429,lifeExpectancy=clamp1300((28+(technology-50)*.08+(foodAvailability-.95)*18+(avgSol-10)*.40+(happiness-60)*.03)*(1+(Number(buildingBonuses.lifeExpectancyPct)||0)/100),14,50);
 return {population,foodAvailability,happiness,currentHappiness,happinessChange:happinessStep.change,happinessPressure,stabilityEffect,solEffect,wageEffect,taxEffect,tariffEffect,foodEffect,buildingHappinessEffect,avgWealth,avgSol,technology,birthRate,deathRate,annualGrowthPct,weeklyRate,expectedBirths,expectedDeaths,lifeExpectancy};
}
function applyWeeklyPopulationChange1300(game){
 ensureGamePopulation1300(game);const e=game.economy;
 for(const id of game.ownedCities||[]){const c=CITY_1300[id];if(!c)continue;const projection=provinceDemographyProjection1300(game,c),carry=Number(e.populationRemainders[id])||0,raw=projection.population*projection.weeklyRate+carry,change=Math.trunc(raw),next=Math.max(1,projection.population+change);e.populationRemainders[id]=round(raw-change,6);e.populationByCity[id]=next;rescalePopulationGroups1300(game,id,next);e.populationDemography[id]={...projection,change,population:next,week:completedCampaignWeeks1300(game),day:Number(game.day)||0};}
 invalidateWeeklyBudgetProjection1300(game);
}
function countryDemography1300(game){
 ensureGamePopulation1300(game);let population=0,weightedGrowth=0,weightedLife=0,weightedFood=0,births=0,deaths=0,change=0;
 for(const id of game.ownedCities||[]){const c=CITY_1300[id];if(!c)continue;const p=effectivePopulation1300(game,c),d=game.economy.populationDemography[id]||provinceDemographyProjection1300(game,c);population+=p;weightedGrowth+=d.annualGrowthPct*p;weightedLife+=d.lifeExpectancy*p;weightedFood+=d.foodAvailability*p;births+=d.expectedBirths;deaths+=d.expectedDeaths;change+=Number(d.change)||0;}
 return {population,annualGrowthPct:population?weightedGrowth/population:0,lifeExpectancy:population?weightedLife/population:0,foodAvailability:population?weightedFood/population:1,expectedBirths:births,expectedDeaths:deaths,change};
}

function legacyStartingProfessionalByCity1300(game){
 const ids=(game?.ownedCities||[]).filter(id=>CITY_1300[id]),population=ids.reduce((n,id)=>n+effectivePopulation1300(game,CITY_1300[id]),0),raw={};let total=0;
 for(const id of ids){raw[id]=Math.max(0,Math.round(Number(CITY_1300[id]?.army)||0));total+=raw[id];}
 const limit=Math.floor(population*.05),scale=total>limit&&total?limit/total:1,out={};for(const id of ids)out[id]=scale===1?raw[id]:Math.floor(raw[id]*scale);
 let rest=limit-Object.values(out).reduce((n,x)=>n+x,0);for(const id of [...ids].sort((a,b)=>(raw[b]*scale-out[b])-(raw[a]*scale-out[a]))){if(rest<=0)break;if(out[id]<raw[id]){out[id]++;rest--;}}
 return out;
}
function ensureGameMilitary1300(game){
 if(!game)return null;const starts=legacyStartingProfessionalByCity1300(game),names={},technologyByCity={};for(const id of game.ownedCities||[]){names[id]=displayCityName1300(CITY_1300[id]);technologyByCity[id]=Number(CITY_1300[id]?.technology)||50;}
 game.military=normaliseMilitaryState1300(game.military,{ownedCities:[...(game.ownedCities||[])],startingByCity:starts,cityName:id=>names[id]||id,technologyByCity});return game.military;
}
function militaryCityArmy1300(game,id){return ensureGameMilitary1300(game)?.armiesByCity?.[id]||null;}
function militaryUnitCount1300(game,cityId,unitId){return unitCount1300(ensureGameMilitary1300(game),cityId,unitId);}
function armyOriginCityId1300(game,key){
 const m=ensureGameMilitary1300(game),a=m?.armiesByCity?.[key];if(!a)return CITY_1300[key]?key:null;
 return CITY_1300[a.homeCityId]?a.homeCityId:(CITY_1300[key]?key:null);
}
function armyKeys1300(game){return Object.keys(ensureGameMilitary1300(game)?.armiesByCity||{});}
function armyKeysAtLocation1300(game,cityId,{standingOnly=true}={}){
 const m=ensureAdvancedMilitary1300(game);if(!m||!CITY_1300[cityId])return [];const moving=new Set((m.movements||[]).map(x=>x.armyHomeId)),fighting=new Set((m.battles||[]).filter(b=>b.status==='active').map(b=>b.armyHomeId));
 return Object.entries(m.armiesByCity).filter(([key,a])=>militaryArmyTotal1300(game,key)>0&&(a.location||armyOriginCityId1300(game,key))===cityId&&(!standingOnly||(!moving.has(key)&&!fighting.has(key)))).map(([key])=>key);
}
function armyDirectProfessionalCount1300(game,key){const m=ensureGameMilitary1300(game);return PROFESSIONAL_MILITARY_UNITS_1300.reduce((n,id)=>n+unitCount1300(m,key,id),0);}
function armyDirectLevyCount1300(game,key){return unitCount1300(ensureGameMilitary1300(game),key,'levy-swordsmen');}
function militaryProfessionalCountCity1300(game,id){
 const m=ensureGameMilitary1300(game);if(!CITY_1300[id])return professionalCount1300(m,id);
 let total=0;for(const key of Object.keys(m.armiesByCity||{}))if(armyOriginCityId1300(game,key)===id)total+=armyDirectProfessionalCount1300(game,key);return total;
}
function militaryLevyCountCity1300(game,id){
 const m=ensureGameMilitary1300(game);if(!CITY_1300[id])return levyCount1300(m,id);
 let total=0;for(const key of Object.keys(m.armiesByCity||{}))if(armyOriginCityId1300(game,key)===id)total+=armyDirectLevyCount1300(game,key);return total;
}
function militaryPendingProfessionalCity1300(game,id){return pendingProfessional1300(ensureGameMilitary1300(game),id);}
function militaryUnitUnlocked1300(game,id){const u=MILITARY_UNIT_1300[id];return !!u&&(!u.tech||normaliseTechnologyState1300(game.technology).unlocked.includes(u.tech));}
function militaryBaseLabourPool1300(c,game){
 if(!c||!game)return 50;const e=game.economy=normaliseGameEconomy1300(game.economy),population=effectivePopulation1300(game,c),expected=Math.max(.01,expectedMonthlyWage1300(game)),wage=Math.max(GAME_WAGE_MIN,effectiveCityWage1300(game,c.id)),wageRatio=wage/expected,pop=e.pops?.[c.id],groups=pop?.groups||[],rates={peasants:.56,laborers:.78,craftsmen:.75,burghers:.55,clergy:.38,nobles:.22};let base=.56;
 if(groups.length){const total=groups.reduce((n,g)=>n+(Number(g.size)||0),0);if(total)base=groups.reduce((n,g)=>n+(Number(g.size)||0)*(rates[g.id]??.55),0)/total;}
 const stats=provinceDynamicStats1300(game,c),market=e.markets?.[c.id],food=foodAvailabilityFromMarket1300(market,clamp1300((Number(stats.food)||50)/70,.45,1.08)),sol=Number(pop?.averageStandardOfLiving)||10,dem=e.populationDemography?.[c.id],happy=Number.isFinite(Number(dem?.happiness))?Number(dem.happiness):Number(stats.stability)||50,tax=Number(e.taxRate)||10,state=gameProvinceBuildingState(c),jobs=state.buildings.filter(x=>x.level>0&&x.id!=='walls').reduce((n,x)=>n+Math.max(0,Number(x.maxWorkers)||0)*Math.max(0,Number(x.level)||0),0),jobRatio=jobs/Math.max(1,population);
 const participation=clamp1300(base+clamp1300((wageRatio-1)*.18,-.18,.20)+clamp1300((food-.90)*.20,-.12,.05)+clamp1300((happy-60)/500,-.09,.08)+clamp1300((sol-10)*.008,-.06,.08)+clamp1300(-(tax-10)*.002,-.04,.02)+clamp1300((jobRatio-.18)*.18,-.04,.08),.22,.78);
 return Math.max(50,Math.round(population*participation));
}
function militaryWorkerPoolDraw1300(game,id){
 const c=CITY_1300[id];if(!c||!game)return 0;const pop=effectivePopulation1300(game,c),base=militaryBaseLabourPool1300(c,game),outside=Math.max(0,pop-base),professionals=militaryProfessionalCountCity1300(game,id)+militaryPendingProfessionalCity1300(game,id),professionalDraw=Math.max(0,professionals-outside);return Math.min(base,professionalDraw+militaryLevyCountCity1300(game,id));
}
function militaryProfessionalLimit1300(game){return Math.floor((game?.ownedCities||[]).reduce((n,id)=>n+effectivePopulation1300(game,CITY_1300[id]),0)*.05);}
function militaryUnprofessionalLimit1300(game){return Math.floor((game?.ownedCities||[]).reduce((n,id)=>n+effectivePopulation1300(game,CITY_1300[id]),0)*.25);}
function startProfessionalTraining1300(game,cityId,unitId,amount){
 const u=MILITARY_UNIT_1300[unitId],n=Math.max(1,Math.floor(Number(amount)||0));if(!game?.ownedCities?.includes(cityId)||!u?.professional)return {ok:false,message:'Invalid professional recruitment order.'};if(activeSiegeAtCity1300(game,cityId))return {ok:false,message:'You cannot recruit or train troops in a province under siege.'};if(!militaryUnitUnlocked1300(game,unitId))return {ok:false,message:u.name+' requires '+(TECHNOLOGY_1300[u.tech]?.name||u.tech)+'.'};
 const active=professionalArmyState1300(game).army,pending=ensureGameMilitary1300(game).trainingQueues.reduce((s,q)=>s+q.amount,0),limit=militaryProfessionalLimit1300(game);if(active+pending+n>limit)return {ok:false,message:'Professional army cap is 5% of population. You can queue at most '+Math.max(0,limit-active-pending)+' more soldiers.'};
 const order=addTrainingOrder1300(ensureGameMilitary1300(game),{cityId,unitId,amount:n,day:game.day}),trainingPct=commanderBonus1300(game,cityId,'trainingPct'),days=Math.max(15,Math.round(u.trainingDays*(1-trainingPct/100)));order.finishDay=game.day+days;invalidateWeeklyBudgetProjection1300(game);return {ok:true,message:n+' '+u.name+' entered training. The full group joins in '+days+' days.'};
}
function levyDailyRate1300(game,id){const c=CITY_1300[id],lvl=c?gameProvinceBuildingState(c).buildings.find(x=>x.id==='barracks')?.level||0:0;return Math.min(3,1+(lvl>0?1:0)+(lvl>=3?1:0));}
function startLevyRecruitment1300(game,cityId,amount){
 const n=Math.max(1,Math.floor(Number(amount)||0));if(!game?.ownedCities?.includes(cityId))return {ok:false,message:'Invalid levy recruitment order.'};if(activeSiegeAtCity1300(game,cityId))return {ok:false,message:'You cannot raise levies in a province under siege.'};const s=unprofessionalArmyState1300(game),pending=ensureGameMilitary1300(game).levyOrders.reduce((x,q)=>x+q.remaining,0);if(s.army+pending+n>s.limit)return {ok:false,message:'Unprofessional army cap is 25% of population. You can raise at most '+Math.max(0,s.limit-s.army-pending)+' more levies.'};
 addLevyOrder1300(ensureGameMilitary1300(game),{cityId,amount:n,day:game.day});return {ok:true,message:'Raising '+n+' Levy Swordsmen at up to '+levyDailyRate1300(game,cityId)+' per day.'};
}
function cancelMilitaryOrder1300(game,id){const ok=cancelOrder1300(ensureGameMilitary1300(game),id);if(ok)invalidateWeeklyBudgetProjection1300(game);return ok;}
function disbandMilitaryUnits1300(game,cityId,unitId,amount){const n=disbandUnits1300(ensureGameMilitary1300(game),cityId,unitId,amount);if(n)invalidateWeeklyBudgetProjection1300(game);return n;}
function applyMilitaryCasualties1300(game,cityId,unitId,amount){
 const dead=applyUnitLosses1300(ensureGameMilitary1300(game),cityId,unitId,amount),originId=armyOriginCityId1300(game,cityId)||cityId,c=CITY_1300[originId];if(!dead||!c)return 0;ensureGamePopulation1300(game);const pop=effectivePopulation1300(game,c),next=Math.max(1,pop-dead);game.economy.populationByCity[originId]=next;rescalePopulationGroups1300(game,originId,next);invalidateWeeklyBudgetProjection1300(game);return dead;
}
function militaryCityUpkeep1300(game,id,professional){
 let total=0;const m=ensureGameMilitary1300(game);
 for(const [key] of Object.entries(m.armiesByCity||{}))if(armyOriginCityId1300(game,key)===id)for(const u of MILITARY_UNITS_1300)if(u.professional===professional)total+=unitCount1300(m,key,u.id)*u.upkeep;
 if(professional)for(const q of m.trainingQueues.filter(q=>q.cityId===id))total+=q.amount*MILITARY_UNIT_1300[q.unitId].upkeep;return total;
}
function processMilitaryDay1300(game){
 const m=ensureGameMilitary1300(game),done=completeTrainingForDay1300(m,game.day);let changed=done.length>0;
 for(const q of m.levyOrders){const c=CITY_1300[q.cityId];if(!c)continue;const take=Math.min(q.remaining,levyDailyRate1300(game,q.cityId),Math.max(0,cityLabourPool1300(c,game)),Math.max(0,militaryUnprofessionalLimit1300(game)-unprofessionalArmyState1300(game).army));if(take>0){m.armiesByCity[q.cityId].units['levy-swordsmen']+=take;q.remaining-=take;changed=true;}}
 m.levyOrders=m.levyOrders.filter(q=>q.remaining>0);if(processAdvancedMilitaryDay1300(game))changed=true;if(changed){invalidateWeeklyBudgetProjection1300(game);syncCampaignMilitaryOverlay1300(game);}return changed;
}

const COMMANDER_TEMPLATES_1300=[
 {id:'guard-captain',name:'Captain of the Guard',upkeep:.20,bonuses:{defensePct:6,moralePct:5},summary:'+6% defense · +5% morale'},
 {id:'drillmaster',name:'Veteran Drillmaster',upkeep:.24,bonuses:{trainingPct:12},summary:'-12% professional training time'},
 {id:'bow-captain',name:'Master of Bowmen',upkeep:.28,bonuses:{rangedPct:12},summary:'+12% ranged attack'},
 {id:'quartermaster',name:'Experienced Quartermaster',upkeep:.32,bonuses:{supplyPct:18,movementPct:5},summary:'+18% supply efficiency · +5% movement'},
 {id:'field-marshal',name:'Aggressive Field Marshal',upkeep:.40,bonuses:{attackPct:10,moralePct:4},summary:'+10% attack · +4% morale'},
 {id:'grand-marshal',name:'Grand Marshal',upkeep:.50,bonuses:{attackPct:7,defensePct:7,moralePct:8,movementPct:5},summary:'+7% attack/defense · +8% morale · +5% movement'}
];
const COMMANDER_TEMPLATE_1300=Object.fromEntries(COMMANDER_TEMPLATES_1300.map(x=>[x.id,x]));
const BATTLE_DEFENDER_BONUS_PCT_1300=15;
const BATTLE_TACTICS_1300={
 hold:{name:'Hold Formation',attack:1,defense:1.10,ranged:1,summary:'+10% defense'},
 assault:{name:'Aggressive Assault',attack:1.18,defense:.88,ranged:1,summary:'+18% attack · -12% defense'},
 shield:{name:'Shield Wall',attack:.90,defense:1.25,ranged:.78,summary:'+25% defense · weaker ranged output'},
 skirmish:{name:'Skirmish',attack:.94,defense:.92,ranged:1.28,summary:'+28% ranged power · -8% defense'},
 flank:{name:'Flanking Manoeuvre',attack:1.08,defense:.94,ranged:1,summary:'Strong with cavalry · slightly weaker defense'}
};
function ensureAdvancedMilitary1300(game){
 const m=ensureGameMilitary1300(game);if(!m)return null;
 m.commanders=Array.isArray(m.commanders)?m.commanders:[];
 m.movements=Array.isArray(m.movements)?m.movements:[];
 m.battles=Array.isArray(m.battles)?m.battles:[];
 m.sieges=Array.isArray(m.sieges)?m.sieges:[];
 m.occupations=m.occupations&&typeof m.occupations==='object'&&!Array.isArray(m.occupations)?m.occupations:{};
 m.supplyByCity=m.supplyByCity&&typeof m.supplyByCity==='object'&&!Array.isArray(m.supplyByCity)?m.supplyByCity:{};
 m.nextCommanderId=Math.max(1,Math.floor(Number(m.nextCommanderId)||1));m.nextMovementId=Math.max(1,Math.floor(Number(m.nextMovementId)||1));m.nextBattleId=Math.max(1,Math.floor(Number(m.nextBattleId)||1));m.nextSiegeId=Math.max(1,Math.floor(Number(m.nextSiegeId)||1));m.nextArmyGroupId=Math.max(1,Math.floor(Number(m.nextArmyGroupId)||1));
 const validUnits=new Set(MILITARY_UNITS_1300.map(u=>u.id));
 for(const [key,a] of Object.entries(m.armiesByCity||{})){
  const fallbackHome=CITY_1300[key]?key:(game.ownedCities||[])[0];a.homeCityId=CITY_1300[a.homeCityId]?a.homeCityId:fallbackHome;a.location=CITY_1300[a.location]?a.location:a.homeCityId;a.id=a.id||('army-'+key);a.name=a.name||('Army of '+displayCityName1300(CITY_1300[a.homeCityId]||CITY_1300[a.location]));
  a.units=a.units&&typeof a.units==='object'&&!Array.isArray(a.units)?a.units:{};for(const unit of MILITARY_UNITS_1300)a.units[unit.id]=Math.max(0,Math.floor(Number(a.units[unit.id])||0));for(const id of Object.keys(a.units))if(!validUnits.has(id))delete a.units[id];
  a.morale=clamp1300(Number.isFinite(Number(a.morale))?Number(a.morale):100,0,100);if(a.commanderId&&!m.commanders.some(c=>c.id===a.commanderId))a.commanderId=null;
 }
 m.commanders=m.commanders.filter(c=>c&&COMMANDER_TEMPLATE_1300[c.templateId]).map(c=>({...COMMANDER_TEMPLATE_1300[c.templateId],...c,id:String(c.id)}));
 m.movements=m.movements.filter(x=>x&&m.armiesByCity[x.armyHomeId]&&CITY_1300[x.to]&&Number(x.finishDay)>Number(game.day||0)-1);
 m.battles=m.battles.filter(b=>b&&m.armiesByCity[b.armyHomeId]&&CITY_1300[b.cityId]&&['active','won','lost','retreated'].includes(b.status||'active')).slice(-20);
 m.sieges=m.sieges.filter(s=>s&&CITY_1300[s.cityId]&&['active','won','lifted'].includes(s.status||'active')).slice(-30).map(s=>({...s,armyHomeIds:Array.isArray(s.armyHomeIds)?s.armyHomeIds.filter(k=>m.armiesByCity[k]):[],foodPct:clamp1300(Number.isFinite(Number(s.foodPct))?Number(s.foodPct):100,0,100),unrestPct:clamp1300(Number.isFinite(Number(s.unrestPct))?Number(s.unrestPct):10,0,100),lastRollDay:Number.isFinite(Number(s.lastRollDay))?Number(s.lastRollDay):Number(s.startedDay)||0,log:Array.isArray(s.log)?s.log.slice(0,12):[]}));
 return m;
}
function commanderForArmy1300(game,homeId){const m=ensureAdvancedMilitary1300(game),a=m?.armiesByCity?.[homeId];return a?.commanderId?m.commanders.find(c=>c.id===a.commanderId)||null:null;}
function commanderBonus1300(game,homeId,key){return Number(commanderForArmy1300(game,homeId)?.bonuses?.[key])||0;}
function hireCommander1300(game,templateId){const m=ensureAdvancedMilitary1300(game),t=COMMANDER_TEMPLATE_1300[templateId];if(!m||!t)return {ok:false,message:'Unknown commander.'};if(m.commanders.some(c=>c.templateId===templateId))return {ok:false,message:t.name+' is already in your service.'};const c={...t,id:'commander-'+m.nextCommanderId++};m.commanders.push(c);invalidateWeeklyBudgetProjection1300(game);return {ok:true,message:t.name+' hired for ƒ'+t.upkeep.toFixed(2)+'/week.',commander:c};}
function assignCommander1300(game,homeId,commanderId){const m=ensureAdvancedMilitary1300(game),a=m?.armiesByCity?.[homeId],c=m?.commanders.find(x=>x.id===commanderId);if(!a||!c)return false;for(const army of Object.values(m.armiesByCity))if(army.commanderId===c.id)army.commanderId=null;a.commanderId=c.id;return true;}
function dismissCommander1300(game,id){const m=ensureAdvancedMilitary1300(game),before=m.commanders.length;m.commanders=m.commanders.filter(c=>c.id!==id);for(const a of Object.values(m.armiesByCity))if(a.commanderId===id)a.commanderId=null;if(m.commanders.length!==before){invalidateWeeklyBudgetProjection1300(game);return true;}return false;}
function commanderUpkeepTotal1300(game){return roundStat1300((ensureAdvancedMilitary1300(game)?.commanders||[]).reduce((n,c)=>n+(Number(c.upkeep)||0),0));}
function militaryArmyTotal1300(game,homeId){const a=militaryCityArmy1300(game,homeId);return a?Object.values(a.units||{}).reduce((n,x)=>n+(Number(x)||0),0):0;}
function militaryMarketDemand1300(game,homeId){
 const m=ensureAdvancedMilitary1300(game),keys=Object.keys(m?.armiesByCity||{}).filter(key=>armyOriginCityId1300(game,key)===homeId),active=keys.reduce((n,key)=>n+militaryArmyTotal1300(game,key),0),professional=keys.reduce((n,key)=>n+armyDirectProfessionalCount1300(game,key),0),levy=keys.reduce((n,key)=>n+armyDirectLevyCount1300(game,key),0),training=(m?.trainingQueues||[]).filter(q=>q.cityId===homeId).reduce((n,q)=>n+q.amount,0);
 return {food:roundStat1300(active/1000*2.6+training/1000*1.4),arms:roundStat1300(professional/1000*.55+levy/1000*.12+training/1000*1.15),active,training};
}
function militarySupplyStatus1300(game,homeId){
 const originId=armyOriginCityId1300(game,homeId)||homeId,market=game?.economy?.markets?.[originId],food=foodAvailabilityFromMarket1300(market,1),armsRow=market?.goods?.arms,armsNeed=Number(armsRow?.need)||Number(armsRow?.demand)||0,arms=armsNeed>0?clamp1300((Number(armsRow?.fulfilled)||0)/armsNeed,.15,1.15):1,logistics=commanderBonus1300(game,homeId,'supplyPct')/100,boost=x=>clamp1300(x+(1-x)*logistics,.15,1.15),foodAdj=boost(food),armsAdj=boost(arms),overall=clamp1300(foodAdj*.65+armsAdj*.35,.15,1.15);
 return {food:foodAdj,arms:armsAdj,overall,combat:clamp1300(.55+overall*.45,.60,1.07),moralePenalty:overall<.70?(.70-overall)*7:0};
}
function armyDistanceKm1300(a,b){if(!a||!b)return 0;const rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon),la1=rad(a.lat),la2=rad(b.lat),h=Math.sin(dLat/2)**2+Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
function armyMovementDays1300(game,homeId,targetId,fromId=null){
 const army=militaryCityArmy1300(game,homeId),from=CITY_1300[fromId||army?.location||armyOriginCityId1300(game,homeId)],to=CITY_1300[targetId];if(!from||!to)return 3;
 let bonus=commanderBonus1300(game,homeId,'movementPct');const u=new Set(normaliseTechnologyState1300(game.technology).unlocked);if(u.has('improved-roads'))bonus+=10;if(u.has('campaign-logistics'))bonus+=5;if(u.has('combined-arms'))bonus+=5;
 const distance=armyDistanceKm1300(from,to),base=3+7*clamp1300(distance/350,0,1);return clamp1300(Math.round(base/(1+bonus/100)),3,10);
}
function activeBattleForArmy1300(game,homeId){return ensureAdvancedMilitary1300(game)?.battles.find(b=>b.armyHomeId===homeId&&b.status==='active')||null;}
function activeBattleAtCity1300(game,cityId){return ensureAdvancedMilitary1300(game)?.battles.find(b=>b.cityId===cityId&&b.status==='active')||null;}
function movementForArmy1300(game,homeId){return ensureAdvancedMilitary1300(game)?.movements.find(x=>x.armyHomeId===homeId)||null;}
function cityWarOwner1300(game,c){const owner=campaignCityOwner1300(game,c),player=gameCountryName1300(game);return owner===player?null:owner;}
function warTargetCities1300(game){return CITIES_1300.filter(c=>{const owner=cityWarOwner1300(game,c);return owner&&game?.diplomacy?.wars?.[owner];});}
function armyCanEnterCity1300(game,cityId){
 const c=CITY_1300[cityId];if(!c)return false;const owner=campaignCityOwner1300(game,c),player=gameCountryName1300(game);return owner===player||!!game?.diplomacy?.wars?.[owner];
}
function armyRoute1300(game,fromId,targetId){
 if(!CITY_1300[fromId]||!CITY_1300[targetId]||!armyCanEnterCity1300(game,targetId))return null;if(fromId===targetId)return [fromId];if(!world?.neighboursOf)return null;
 const queue=[fromId],prev=new Map([[fromId,null]]);
 while(queue.length){const cur=queue.shift();for(const next of world.neighboursOf(cur)){if(prev.has(next)||!CITY_1300[next]||!armyCanEnterCity1300(game,next))continue;prev.set(next,cur);if(next===targetId){const route=[];let p=targetId;while(p){route.unshift(p);p=prev.get(p);}return route;}queue.push(next);}}
 return null;
}
function movementRouteDays1300(game,homeId,route,startIndex=0){let days=0;for(let i=startIndex;i<route.length-1;i++)days+=armyMovementDays1300(game,homeId,route[i+1],route[i]);return days;}
function startArmyMovement1300(game,homeId,targetId){
 const m=ensureAdvancedMilitary1300(game),a=m?.armiesByCity?.[homeId],target=CITY_1300[targetId];if(!a||!target)return {ok:false,message:'Invalid march order.'};if(movementForArmy1300(game,homeId))return {ok:false,message:'This army is already marching.'};if(activeBattleForArmy1300(game,homeId))return {ok:false,message:'This army is currently in battle.'};if(militaryArmyTotal1300(game,homeId)<=0)return {ok:false,message:'This army has no soldiers.'};
 const fromId=a.location||armyOriginCityId1300(game,homeId);if(fromId===targetId)return {ok:false,message:'The army is already there.'};const route=armyRoute1300(game,fromId,targetId);if(!route||route.length<2)return {ok:false,message:'There is no legal connected route. Armies may only cross bordering provinces you own or provinces belonging to a country you are at war with.'};
 const next=route[1],days=armyMovementDays1300(game,homeId,next,fromId),totalDays=movementRouteDays1300(game,homeId,route,0),move={id:'move-'+m.nextMovementId++,armyHomeId:homeId,from:fromId,to:next,finalTarget:targetId,route,routeIndex:0,startDay:game.day,finishDay:game.day+days};m.movements.push(move);a.movingTo=next;
 return {ok:true,route,days,totalDays,message:a.name+' is marching to '+displayCityName1300(target)+' via '+(route.length-1)+' province'+(route.length===2?'':'s')+'. Estimated travel: '+totalDays+' days.'};
}
function enemyComposition1300(c){
 let total=Math.max(0,Math.round(Number(c?.army)||0));if(!total)return {};
 let cross=0,heavy=0,knights=0;if(Number(c.technology)>=68){cross=Math.round(total*.12);total-=cross;}if(Number(c.technology)>=78){heavy=Math.round(total*.12);total-=heavy;}if(Number(c.technology)>=88){knights=Math.round(total*.06);total-=knights;}
 const arch=Math.round(total*.30),shield=Math.max(0,total-arch);return {'shield-spearmen':shield,archers:arch,crossbowmen:cross,'men-at-arms':heavy,knights};
}
function battleUnitTotal1300(units){return Object.values(units||{}).reduce((n,x)=>n+Math.max(0,Number(x)||0),0);}
function activeSiegeAtCity1300(game,cityId){return ensureAdvancedMilitary1300(game)?.sieges.find(s=>s.cityId===cityId&&s.status==='active')||null;}
function playerOccupationAtCity1300(game,cityId){return ensureAdvancedMilitary1300(game)?.occupations?.[cityId]===gameCountryName1300(game);}
function warScoreAdjust1300(game,country,delta){const p=country?relation(game,PLAYER_REALM,country).pair:null;if(!p?.war)return 0;p.war.warScore=roundStat1300(clamp1300((Number(p.war.warScore)||0)+(Number(delta)||0),-100,100));return p.war.warScore;}
function adjacentCityIds1300(cityId){return world?.neighboursOf?.(cityId)||[];}
function nearestPlayerRetreatCity1300(game,cityId){const from=CITY_1300[cityId],player=gameCountryName1300(game);if(!from)return null;return adjacentCityIds1300(cityId).filter(id=>CITY_1300[id]&&campaignCityOwner1300(game,CITY_1300[id])===player).sort((a,b)=>armyDistanceKm1300(from,CITY_1300[a])-armyDistanceKm1300(from,CITY_1300[b]))[0]||null;}
function nearestEnemyRetreatCity1300(game,battle){const from=CITY_1300[battle?.cityId],enemy=battle?.enemyCountry;if(!from||!enemy)return null;return adjacentCityIds1300(battle.cityId).filter(id=>CITY_1300[id]&&campaignCityOwner1300(game,CITY_1300[id])===enemy&&!playerOccupationAtCity1300(game,id)).sort((a,b)=>armyDistanceKm1300(from,CITY_1300[a])-armyDistanceKm1300(from,CITY_1300[b]))[0]||null;}
function siegeStrength1300(game,siege){const m=ensureAdvancedMilitary1300(game);if(!m||!siege)return 0;return (siege.armyHomeIds||[]).reduce((n,key)=>n+((m.armiesByCity[key]?.location===siege.cityId)?militaryArmyTotal1300(game,key):0),0);}
function siegeFortificationPct1300(game,cityId){const c=CITY_1300[cityId];if(!c)return 0;return Math.max(0,Number(gameProvinceBuildingState(c)?.bonuses?.siegeDifficultyPct)||0);}
function siegeSuccessChance1300(game,siege){
 const c=CITY_1300[siege?.cityId];if(!c||!siege)return 0;const days=Math.max(0,(Number(game.day)||0)-(Number(siege.startedDay)||0)),months=days/30,strength=Math.max(1,siegeStrength1300(game,siege)),baseArmy=Math.max(50,Number(c.army)||50),strengthTerm=clamp1300(Math.log2(strength/baseArmy)*5,-6,16),foodTerm=(100-clamp1300(siege.foodPct,0,100))*.22,unrestTerm=clamp1300(siege.unrestPct,0,100)*.28,fortPenalty=siegeFortificationPct1300(game,siege.cityId)*.25;
 return clamp1300(Math.round((5+months*7+strengthTerm+foodTerm+unrestTerm-fortPenalty)*10)/10,2,90);
}
function startSiege1300(game,armyHomeId,cityId,enemyCountry=null){
 const m=ensureAdvancedMilitary1300(game),c=CITY_1300[cityId];if(!m||!c)return null;let siege=activeSiegeAtCity1300(game,cityId);const keys=armyKeysAtLocation1300(game,cityId,{standingOnly:false}).filter(k=>militaryArmyTotal1300(game,k)>0);if(armyHomeId&&!keys.includes(armyHomeId)&&m.armiesByCity[armyHomeId]?.location===cityId)keys.push(armyHomeId);
 if(siege){siege.armyHomeIds=[...new Set([...(siege.armyHomeIds||[]),...keys])];return siege;}
 const owner=enemyCountry||campaignCityOwner1300(game,c),stability=Number(c.stability)||50;siege={id:'siege-'+m.nextSiegeId++,cityId,enemyCountry:owner,armyHomeIds:[...new Set(keys.length?keys:[armyHomeId].filter(Boolean))],startedDay:Number(game.day)||0,lastRollDay:Number(game.day)||0,status:'active',foodPct:100,unrestPct:clamp1300(Math.round(Math.max(0,55-stability)*.6),0,45),lastChance:0,lastRoll:null,log:[]};m.sieges.push(siege);delete m.occupations[cityId];return siege;
}
function completeSiegeOccupation1300(game,siege){
 const m=ensureAdvancedMilitary1300(game);if(!m||!siege||siege.status!=='active')return false;siege.status='won';siege.completedDay=Number(game.day)||0;m.occupations[siege.cityId]=gameCountryName1300(game);warScoreAdjust1300(game,siege.enemyCountry,12);siege.log.unshift({day:game.day,type:'success',chance:siege.lastChance||siegeSuccessChance1300(game,siege),roll:siege.lastRoll});siege.log=siege.log.slice(0,12);return true;
}
function processSiegesDay1300(game){
 const m=ensureAdvancedMilitary1300(game);let changed=false;for(const siege of m.sieges){if(siege.status!=='active')continue;const c=CITY_1300[siege.cityId];if(!c)continue;
  const atCity=armyKeysAtLocation1300(game,siege.cityId,{standingOnly:false}).filter(k=>militaryArmyTotal1300(game,k)>0&&!activeBattleForArmy1300(game,k));siege.armyHomeIds=[...new Set(atCity)];
  const stillAtWar=!!game.diplomacy?.wars?.[siege.enemyCountry];if(!stillAtWar||!siege.armyHomeIds.length){siege.status='lifted';siege.liftedDay=Number(game.day)||0;changed=true;continue;}
  const pop=Math.max(1000,Number(c.people)||1000),foodScore=clamp1300(Number(c.food)||50,0,100),drain=clamp1300(.22+pop/90000*.12+(65-foodScore)/210,.12,1.15);siege.foodPct=clamp1300(siege.foodPct-drain,0,100);siege.unrestPct=clamp1300(siege.unrestPct+.04+Math.max(0,55-siege.foodPct)*.022+Math.max(0,55-(Number(c.stability)||50))*.004,0,100);changed=true;
  if((Number(game.day)||0)-(Number(siege.lastRollDay)||0)>=30){const chance=siegeSuccessChance1300(game,siege),roll=Math.random()*100;siege.lastRollDay=Number(game.day)||0;siege.lastChance=chance;siege.lastRoll=Math.round(roll*10)/10;if(roll<=chance)completeSiegeOccupation1300(game,siege);else{siege.log.unshift({day:game.day,type:'hold',chance,roll:siege.lastRoll,foodPct:roundStat1300(siege.foodPct),unrestPct:roundStat1300(siege.unrestPct)});siege.log=siege.log.slice(0,12);}changed=true;}
 }return changed;
}
function createBattle1300(game,homeId,cityId,retreatCityId){
 const m=ensureAdvancedMilitary1300(game);if(activeBattleAtCity1300(game,cityId))return activeBattleAtCity1300(game,cityId);const c=CITY_1300[cityId],enemyUnits=enemyComposition1300(c),enemyTotal=battleUnitTotal1300(enemyUnits),id='battle-'+m.nextBattleId++,battle={id,armyHomeId:homeId,cityId,enemyCountry:campaignCityOwner1300(game,c),enemyUnits,playerMorale:100,enemyMorale:100,playerTactic:'hold',enemyTactic:'hold',defenderBonusPct:BATTLE_DEFENDER_BONUS_PCT_1300,lastTacticDay:(Number(game.day)||0)-3,startedDay:Number(game.day)||0,lastResolvedDay:Number(game.day)||0,status:enemyTotal>0?'active':'won',retreatCityId:retreatCityId||homeId,playerCasualties:0,enemyCasualties:0,log:[]};m.battles.push(battle);return battle;
}
function tacticCombat1300(units,tacticId,phase,commander={},supply=1,morale=100){
 const t=BATTLE_TACTICS_1300[tacticId]||BATTLE_TACTICS_1300.hold;let attack=0,hp=0,total=0,rangedCount=0,cavalry=0;
 for(const [id,countRaw] of Object.entries(units||{})){const u=MILITARY_UNIT_1300[id];if(!u)continue;const count=Math.max(0,Number(countRaw)||0),ranged=u.range>1;let factor=phase==='ranged'?(ranged?1:.28):(ranged?.82:1);if(ranged)factor*=t.ranged;if(id==='knights')cavalry+=count;attack+=count*u.attack*factor;hp+=count*u.hp;total+=count;if(ranged)rangedCount+=count;}
 if(tacticId==='flank'&&total)attack*=1+Math.min(.22,cavalry/total*.65);const attackBonus=(Number(commander.attackPct)||0)+(rangedCount&&total?Number(commander.rangedPct||0)*(rangedCount/total):0),defenseBonus=Number(commander.defensePct)||0;
 return {total,attack:attack*t.attack*(1+attackBonus/100)*supply*(.55+.45*morale/100),avgHp:total?hp/total:10,defense:t.defense*(1+defenseBonus/100)};
}
function removeEnemyCasualties1300(units,count){let left=Math.max(0,Math.floor(count));for(const id of ['levy-swordsmen','shield-spearmen','archers','crossbowmen','men-at-arms','knights']){if(left<=0)break;const have=Math.max(0,Number(units[id])||0),take=Math.min(have,left);units[id]=have-take;left-=take;}return Math.max(0,Math.floor(count))-left;}
function applyArmyCasualties1300(game,homeId,count){let left=Math.max(0,Math.floor(count)),dead=0;const army=militaryCityArmy1300(game,homeId);if(!army)return 0;for(const id of ['levy-swordsmen','shield-spearmen','archers','crossbowmen','men-at-arms','knights']){if(left<=0)break;const have=militaryUnitCount1300(game,homeId,id),take=Math.min(have,left);if(take){dead+=applyMilitaryCasualties1300(game,homeId,id,take);left-=take;}}return dead;}
function resolveBattleDay1300(game,battle){
 if(!battle||battle.status!=='active'||battle.lastResolvedDay>=game.day)return false;
 const army=militaryCityArmy1300(game,battle.armyHomeId);if(!army){battle.status='lost';return true;}
 const beforePlayer=militaryArmyTotal1300(game,battle.armyHomeId),beforeEnemy=battleUnitTotal1300(battle.enemyUnits);
 if(beforePlayer<=0){battle.status='lost';battle.lastResolvedDay=game.day;warScoreAdjust1300(game,battle.enemyCountry,-4);return true;}
 if(beforeEnemy<=0){battle.status='won';battle.lastResolvedDay=game.day;warScoreAdjust1300(game,battle.enemyCountry,4);startSiege1300(game,battle.armyHomeId,battle.cityId,battle.enemyCountry);return true;}
 const phase=game.day-battle.startedDay<2?'ranged':'melee',supply=militarySupplyStatus1300(game,battle.armyHomeId),commander=commanderForArmy1300(game,battle.armyHomeId)?.bonuses||{},defenderBonus=Number(battle.defenderBonusPct)||BATTLE_DEFENDER_BONUS_PCT_1300,p=tacticCombat1300(army.units,battle.playerTactic,phase,commander,supply.combat,battle.playerMorale),e=tacticCombat1300(battle.enemyUnits,battle.enemyTactic,phase,{defensePct:defenderBonus},.94,battle.enemyMorale);
 const pLoss=Math.max(0,Math.min(p.total,Math.round(e.attack/Math.max(35,p.avgHp*18*p.defense)))),eLoss=Math.max(0,Math.min(e.total,Math.round(p.attack/Math.max(35,e.avgHp*18*e.defense)))),actualP=applyArmyCasualties1300(game,battle.armyHomeId,pLoss),actualE=removeEnemyCasualties1300(battle.enemyUnits,eLoss);battle.playerCasualties+=actualP;battle.enemyCasualties+=actualE;
 const moraleBonus=Number(commander.moralePct)||0;battle.playerMorale=clamp1300(battle.playerMorale-(.7+actualP/Math.max(1,p.total)*115+supply.moralePenalty)*(1-moraleBonus/100),0,100);battle.enemyMorale=clamp1300(battle.enemyMorale-(.8+actualE/Math.max(1,e.total)*115),0,100);battle.lastResolvedDay=game.day;
 const playerRemaining=militaryArmyTotal1300(game,battle.armyHomeId),enemyRemaining=battleUnitTotal1300(battle.enemyUnits);battle.log.unshift({day:game.day,phase,playerLoss:actualP,enemyLoss:actualE,playerRemaining,enemyRemaining,playerMorale:roundStat1300(battle.playerMorale),enemyMorale:roundStat1300(battle.enemyMorale)});battle.log=battle.log.slice(0,12);
 if(enemyRemaining<=0){battle.status='won';battle.enemyRetreatedTo=null;warScoreAdjust1300(game,battle.enemyCountry,4);startSiege1300(game,battle.armyHomeId,battle.cityId,battle.enemyCountry);}
 else if(battle.enemyMorale<=15){const retreat=nearestEnemyRetreatCity1300(game,battle);if(retreat){battle.status='won';battle.enemyRetreatedTo=retreat;warScoreAdjust1300(game,battle.enemyCountry,4);startSiege1300(game,battle.armyHomeId,battle.cityId,battle.enemyCountry);}}
 if(battle.status==='active'&&playerRemaining<=0){battle.status='lost';warScoreAdjust1300(game,battle.enemyCountry,-4);}
 else if(battle.status==='active'&&battle.playerMorale<=15){const retreat=nearestPlayerRetreatCity1300(game,battle.cityId);if(retreat){battle.status='lost';battle.retreatCityId=retreat;army.location=retreat;army.morale=Math.max(25,battle.playerMorale);warScoreAdjust1300(game,battle.enemyCountry,-4);}}
 return true;
}
function setBattleTactic1300(game,battleId,tacticId){const b=ensureAdvancedMilitary1300(game)?.battles.find(x=>x.id===battleId);if(!b||b.status!=='active'||!BATTLE_TACTICS_1300[tacticId])return {ok:false,message:'That tactic is unavailable.'};const wait=3-(game.day-b.lastTacticDay);if(wait>0)return {ok:false,message:'Tactics can be changed again in '+wait+' day'+(wait===1?'':'s')+'.'};b.playerTactic=tacticId;b.lastTacticDay=game.day;return {ok:true,message:'Tactic changed to '+BATTLE_TACTICS_1300[tacticId].name+'.'};}
function nearestRetreatCity1300(game,battle){return nearestPlayerRetreatCity1300(game,battle?.cityId);}
function retreatBattle1300(game,battleId){
 const m=ensureAdvancedMilitary1300(game),b=m?.battles.find(x=>x.id===battleId),army=b?militaryCityArmy1300(game,b.armyHomeId):null;if(!b||b.status!=='active'||!army)return {ok:false,message:'No active battle to retreat from.'};
 const destination=nearestPlayerRetreatCity1300(game,b.cityId);if(!destination)return {ok:false,message:'Retreat is impossible: this province has no bordering friendly province.'};
 const extra=Math.ceil(militaryArmyTotal1300(game,b.armyHomeId)*.02),dead=applyArmyCasualties1300(game,b.armyHomeId,extra);b.playerCasualties+=dead;b.status='retreated';b.retreatCityId=destination;army.location=destination;delete army.movingTo;army.morale=Math.max(35,b.playerMorale-8);m.movements=m.movements.filter(x=>x.armyHomeId!==b.armyHomeId);warScoreAdjust1300(game,b.enemyCountry,-2);syncCampaignMilitaryOverlay1300(game);
 return {ok:true,destination,message:'Army retreated to '+displayCityName1300(CITY_1300[destination])+(dead?' and lost '+dead+' soldiers during the withdrawal.':'.')};
}
function processArmyMovements1300(game){
 const m=ensureAdvancedMilitary1300(game),remaining=[];let changed=false;
 for(const move of [...m.movements]){
  if(game.day<move.finishDay){remaining.push(move);continue;}const army=m.armiesByCity[move.armyHomeId];if(!army)continue;
  const arrivedFrom=move.from;army.location=move.to;delete army.movingTo;const target=CITY_1300[move.to],owner=target?campaignCityOwner1300(game,target):null,player=gameCountryName1300(game);changed=true;
  if(target&&owner!==player&&game.diplomacy?.wars?.[owner]&&!playerOccupationAtCity1300(game,move.to)){const existingSiege=activeSiegeAtCity1300(game,move.to);if(existingSiege){startSiege1300(game,move.armyHomeId,move.to,owner);continue;}const battle=createBattle1300(game,move.armyHomeId,move.to,arrivedFrom);if(battle?.status==='won')startSiege1300(game,move.armyHomeId,move.to,owner);continue;}
  const route=Array.isArray(move.route)&&move.route.length?move.route:[move.from,move.to],idx=Math.max(1,Math.min(route.length-1,(Number(move.routeIndex)||0)+1));
  if(idx<route.length-1){
   const next=route[idx+1];if(!armyCanEnterCity1300(game,next))continue;const days=armyMovementDays1300(game,move.armyHomeId,next,army.location);move.routeIndex=idx;move.from=army.location;move.to=next;move.startDay=game.day;move.finishDay=game.day+days;army.movingTo=next;remaining.push(move);
  }
 }
 m.movements=remaining;return changed;
}
function processMilitaryAttrition1300(game){
 if((Number(game.day)||0)%7!==0)return false;let changed=false;for(const homeId of armyKeys1300(game)){if(activeBattleForArmy1300(game,homeId))continue;const supply=militarySupplyStatus1300(game,homeId),total=militaryArmyTotal1300(game,homeId);if(total>=100&&supply.food<.45){const loss=Math.max(1,Math.floor(total*(.45-supply.food)*.01));if(applyArmyCasualties1300(game,homeId,loss)>0)changed=true;}}return changed;
}
function processAdvancedMilitaryDay1300(game){let changed=processArmyMovements1300(game);for(const b of ensureAdvancedMilitary1300(game).battles)if(resolveBattleDay1300(game,b))changed=true;if(processSiegesDay1300(game))changed=true;if(processMilitaryAttrition1300(game))changed=true;if(changed){syncCampaignMilitaryOverlay1300(game);if(gameArmyPanelKey)renderArmyMapPanel1300();if(gameBattlePanelId)renderGameBattlePanel1300();if(gameSiegePanelId)renderGameSiegePanel1300();if(activeBattleDialogId)renderBattleDialog1300(activeBattleDialogId);}return changed;}


function professionalArmyState1300(game){const ids=(game?.ownedCities||[]).filter(id=>CITY_1300[id]);ensureGameMilitary1300(game);const byCity={};let army=0;for(const id of ids){byCity[id]=militaryProfessionalCountCity1300(game,id);army+=byCity[id];}const population=ids.reduce((n,id)=>n+effectivePopulation1300(game,CITY_1300[id]),0),limit=militaryProfessionalLimit1300(game);return {population,basePercent:5,bonusPercent:0,percent:5,limit,rawTotal:army,army,byCity};}
function unprofessionalArmyState1300(game){const ids=(game?.ownedCities||[]).filter(id=>CITY_1300[id]);ensureGameMilitary1300(game);const byCity={};let army=0;for(const id of ids){byCity[id]=militaryLevyCountCity1300(game,id);army+=byCity[id];}const population=ids.reduce((n,id)=>n+effectivePopulation1300(game,CITY_1300[id]),0),limit=militaryUnprofessionalLimit1300(game);return {population,percent:25,limit,army,byCity};}
function campaignMilitaryByCity1300(game){
 const out={};if(!game)return out;const m=ensureAdvancedMilitary1300(game),moving=new Set((m.movements||[]).map(x=>x.armyHomeId));
 for(const [key,army] of Object.entries(m.armiesByCity||{})){if(moving.has(key))continue;const total=militaryArmyTotal1300(game,key);if(total<=0)continue;const loc=army.location||armyOriginCityId1300(game,key);if(!CITY_1300[loc])continue;out[loc]??={army:0,navy:0,armyKeys:[]};out[loc].army+=total;out[loc].armyKeys.push(key);}
 for(const homeId of game.ownedCities||[]){const c=CITY_1300[homeId];if(!c)continue;const b=gameProvinceBuildingState(c).bonuses;out[homeId]??={army:0,navy:0,armyKeys:[]};out[homeId].navy+=(Number(c.navy)||0)+(Number(b.navy)||0);}
 return out;
}
function campaignMovementOverlay1300(game){
 const m=ensureAdvancedMilitary1300(game);return (m?.movements||[]).map(move=>{const army=m.armiesByCity[move.armyHomeId];return {id:move.id,armyKey:move.armyHomeId,name:army?.name||'Army',count:militaryArmyTotal1300(game,move.armyHomeId),from:move.from,to:move.to,finalTarget:move.finalTarget||move.to,route:Array.isArray(move.route)?[...move.route]:[move.from,move.to],routeIndex:Number(move.routeIndex)||0,startDay:Number(move.startDay)||0,finishDay:Number(move.finishDay)||0};}).filter(x=>x.count>0&&CITY_1300[x.from]&&CITY_1300[x.to]);
}
function campaignBattleOverlay1300(game){
 const m=ensureAdvancedMilitary1300(game);return Object.fromEntries((m?.battles||[]).filter(b=>b.status==='active').map(b=>[b.cityId,{id:b.id,armyKey:b.armyHomeId,playerCount:militaryArmyTotal1300(game,b.armyHomeId),enemyCount:battleUnitTotal1300(b.enemyUnits),playerMorale:roundStat1300(b.playerMorale),enemyMorale:roundStat1300(b.enemyMorale),enemyCountry:b.enemyCountry,playerCountry:gameCountryName1300(game)}]));
}
function campaignSiegeOverlay1300(game){
 const m=ensureAdvancedMilitary1300(game);return Object.fromEntries((m?.sieges||[]).filter(s=>s.status==='active').map(s=>[s.cityId,{id:s.id,cityId:s.cityId,enemyCountry:s.enemyCountry,foodPct:roundStat1300(s.foodPct),unrestPct:roundStat1300(s.unrestPct),chance:siegeSuccessChance1300(game,s),strength:siegeStrength1300(game,s)}]));
}
function campaignDiplomacyMapState1300(game){
 const d=normaliseGameDiplomacy1300(game.diplomacy);return {playerCountry:gameCountryName1300(game),wars:Object.keys(d.wars||{}).filter(k=>d.wars[k]),alliances:Object.keys(d.alliances||{}).filter(k=>d.alliances[k])};
}
function syncCampaignMilitaryOverlay1300(game=profile.activeGame){
 if(!world?.state?.game||!game)return;const military=ensureAdvancedMilitary1300(game),dip=campaignDiplomacyMapState1300(game);world.state.game.ownedCityIds=[...(game.ownedCities||[])];world.state.game.cityOwners={...(game.cityOwners||{})};world.state.game.playerCountry=dip.playerCountry;world.state.game.wars=dip.wars;world.state.game.alliances=dip.alliances;world.state.game.militaryByCity=campaignMilitaryByCity1300(game);world.state.game.movements=campaignMovementOverlay1300(game);world.state.game.battlesByCity=campaignBattleOverlay1300(game);world.state.game.siegesByCity=campaignSiegeOverlay1300(game);world.state.game.occupations={...(military?.occupations||{})};world.state.game.day=Number(game.day)||0;world.state.game.lastTickAt=Number(game.lastTickAt)||Date.now();world.state.game.dayDurationMs=GAME_DAY_REAL_MS;world.refresh();
}
function militaryTotals1300(game){const p=professionalArmyState1300(game),u=unprofessionalArmyState1300(game);let navy=0;for(const id of game?.ownedCities||[]){const c=CITY_1300[id];if(c){const b=gameProvinceBuildingState(c).bonuses;navy+=(Number(c.navy)||0)+(Number(b.navy)||0);}}return {army:p.army,unprofessionalArmy:u.army,navy,professionalArmyLimit:p.limit,professionalArmyPercent:p.percent,professionalArmyBonusPercent:p.bonusPercent};}
function annualInflationFactor1300(game){const years=Math.max(0,Math.floor((Number(game?.day)||0)/365.2425));return Math.pow(1.01,years);}
function stabilityBudgetMax1300(game){
 const population=(game?.ownedCities||[]).reduce((n,id)=>n+effectivePopulation1300(game,CITY_1300[id]),0),lerp=(a,b,t)=>a+(b-a)*clamp1300(t,0,1);
 let max;if(population<=20000)max=5;
 else if(population<=50000)max=lerp(5,20,(population-20000)/30000);
 else if(population<=100000)max=lerp(20,40,(population-50000)/50000);
 else if(population<=250000)max=lerp(40,75,(population-100000)/150000);
 else if(population<=500000)max=lerp(75,120,(population-250000)/250000);
 else max=120+Math.sqrt((population-500000)/1000)*2;
 return roundStat1300((max/WEEKS_PER_MONTH)*annualInflationFactor1300(game));
}
function stabilityBudgetNeed1300(game){return roundStat1300(Math.max(.08,stabilityBudgetMax1300(game)*.45));}
function provinceTechnologyBudgetMax1300(c,game){
 const p=Number(c?.people)||0,lerp=(a,b,t)=>a+(b-a)*clamp1300(t,0,1);let max;
 if(p<=20000)max=3;
 else if(p<=50000)max=lerp(3,8,(p-20000)/30000);
 else if(p<=100000)max=lerp(8,15,(p-50000)/50000);
 else if(p<=250000)max=lerp(15,30,(p-100000)/150000);
 else max=Math.min(60,30+(p-250000)/25000);
 return roundStat1300((max/WEEKS_PER_MONTH)*annualInflationFactor1300(game));
}
function technologyBudgetNeed1300(c,game){return roundStat1300(Math.max(.06,provinceTechnologyBudgetMax1300(c,game)*.45));}
function weeklyStateExpenses1300(game){
 const e=normaliseGameEconomy1300(game.economy),mil=militaryTotals1300(game),tech=(game.ownedCities||[]).reduce((n,id)=>n+(Number(e.technologyBudgets[id])||0),0),buildingSupport=companyBuildingSupportTotal1300(game),bonuses=technologyBonuses1300(game.technology);let armyRaw=0,unprofessionalRaw=0,navyRaw=0,fortifications=0;
 for(const id of game.ownedCities||[]){const c=CITY_1300[id];if(!c)continue;const b=gameProvinceBuildingState(c).bonuses,mod=(1+bonuses.armyMaintenancePct/100)*(1+(Number(b.armyUpkeepPct)||0)/100),navyUnits=Math.max(0,(Number(c.navy)||0)+(Number(b.navy)||0));armyRaw+=militaryCityUpkeep1300(game,id,true)*mod;unprofessionalRaw+=militaryCityUpkeep1300(game,id,false)*mod;navyRaw+=navyUnits*GAME_NAVY_UPKEEP_PER_UNIT*(1+bonuses.navyMaintenancePct/100)*(1+(Number(b.navyUpkeepPct)||0)/100);fortifications+=Math.max(0,Number(b.fortificationUpkeep)||0);}
 const army=roundStat1300(armyRaw),unprofessionalArmy=roundStat1300(unprofessionalRaw),commanders=commanderUpkeepTotal1300(game),navy=roundStat1300(navyRaw),fortification=roundStat1300(fortifications),stability=roundStat1300(Math.min(e.stabilityBudget,stabilityBudgetMax1300(game))),technology=roundStat1300(tech);return {army,unprofessionalArmy,commanders,navy,fortification,stability,technology,buildingSupport,total:roundStat1300(army+unprofessionalArmy+commanders+navy+fortification+stability+technology+buildingSupport),armyUnits:mil.army,unprofessionalArmyUnits:mil.unprofessionalArmy||0,navyUnits:mil.navy,stabilityNeed:stabilityBudgetNeed1300(game),stabilityMax:stabilityBudgetMax1300(game)};
}
function stabilityPolicyPressure1300(game){
 const e=normaliseGameEconomy1300(game.economy),wageRatio=e.nationalWage/expectedMonthlyWage1300(game),tariffCost=tariffCostOfLivingImpact1300(game);
 const taxEffect=clamp1300(-(e.taxRate-10)*.03,-.60,.30),wageEffect=clamp1300((wageRatio-1)*.35,-.40,.30),tariffEffect=tariffCost<=5?clamp1300((5-tariffCost)*.008,0,.04):clamp1300(-(tariffCost-5)*.04,-.80,0);
 return {taxEffect,wageEffect,tariffEffect,total:clamp1300(taxEffect+wageEffect+tariffEffect,-.95,.60)};
}
function applyWeeklyStabilityPolicy1300(game){
 const e=normaliseGameEconomy1300(game.economy),need=stabilityBudgetNeed1300(game),budget=Math.min(e.stabilityBudget,stabilityBudgetMax1300(game)),ratio=need>0?budget/need:1;
 let corruptionDelta=0;
 if(ratio<.20)corruptionDelta=1.5;
 else if(ratio<.60)corruptionDelta=.7;
 else if(ratio<.95)corruptionDelta=.2;
 else if(ratio<=1.15)corruptionDelta=-.1;
 else if(ratio<=1.60)corruptionDelta=-.6;
 else corruptionDelta=-1.2;
 e.corruption=roundStat1300(clamp1300(e.corruption+corruptionDelta/WEEKS_PER_MONTH,0,100));
 e.lastStabilityChange=roundStat1300(stabilityPolicyMonthlyDelta1300(game)/WEEKS_PER_MONTH);
}
function technologyTreeUnlockedCount1300(game){
 return normaliseTechnologyState1300(game?.technology).unlocked.length;
}
function stabilityPolicyMonthlyDelta1300(game){
 const e=normaliseGameEconomy1300(game.economy),need=stabilityBudgetNeed1300(game),budget=Math.min(e.stabilityBudget,stabilityBudgetMax1300(game)),ratio=need>0?budget/need:1,policy=stabilityPolicyPressure1300(game);
 let delta=0;
 if(ratio<.20)delta=-.30;
 else if(ratio<.60)delta=-.12;
 else if(ratio<.95)delta=-.03;
 else if(ratio<=1.15)delta=.08;
 else if(ratio<=1.60)delta=.30;
 else if(ratio<=2.00)delta=.60;
 else delta=.90;
 delta-=Math.max(0,e.corruption-35)*.002;
 delta+=policy.total;
 return round(delta,4);
}
function applyLiveDynamicStats1300(game,factor=1/30){
 ensureGameDynamicStats1300(game);const e=game.economy,cap=gameStatCap1300(game),treeUnlocked=technologyTreeUnlockedCount1300(game);
 for(const id of game.ownedCities||[]){
  const c=CITY_1300[id];if(!c)continue;const row=e.dynamicStats[id],b=gameProvinceBuildingState(c).bonuses,market=e.markets?.[id],pop=e.pops?.[id],metrics=Object.values(e.lastEconomy?.[id]||{});
  const foodDefs=[['grain',.82],['fish',1.08],['meat',1.18]],foodRows=foodDefs.map(([gid,quality])=>({def:GOOD_1300[gid],quality,m:market?.goods?.[gid]})).filter(x=>x.m);
  const foodNeed=foodRows.reduce((n,x)=>n+(Number(x.m.need)||Number(x.m.demand)||0),0),foodFulfilled=foodRows.reduce((n,x)=>n+(Number(x.m.fulfilled)||0),0),availability=foodNeed>0?clamp1300(foodFulfilled/foodNeed,.35,1.25):1;
  const quality=foodFulfilled>0?foodRows.reduce((n,x)=>n+(Number(x.m.fulfilled)||0)*x.quality,0)/foodFulfilled:.72,variety=foodRows.filter(x=>(Number(x.m.fulfilled)||0)>Math.max(.05,foodFulfilled*.08)).length,priceRatio=foodRows.length?foodRows.reduce((n,x)=>n+(Number(x.m.consumerPrice)||Number(x.m.price)||x.def.basePrice)/x.def.basePrice,0)/foodRows.length:1;
  const groups=pop?.groups||[],popN=groups.reduce((n,g)=>n+(Number(g.size)||0),0),avgSol=popN?groups.reduce((n,g)=>n+(Number(g.standardOfLiving)||10)*(Number(g.size)||0),0)/popN:10,wageRatio=effectiveCityWage1300(game,id)/expectedMonthlyWage1300(game),affordability=clamp1300((.72+.28*wageRatio+(avgSol-10)*.018)/Math.max(.65,priceRatio),.45,1.45),varietyBonus=(variety-1)*.035;
  const currentFood=Number(row.food)||0,baseFood=Number(c.food)||50,foodTarget=clamp1300(baseFood+(availability-.85)*50+(affordability-1)*10+(quality-.85)*8+varietyBonus*10,0,cap);let foodDelta=clamp1300((foodTarget-currentFood)*.09,-.45,.45);if(availability>=.98&&currentFood<cap-.01)foodDelta=Math.max(foodDelta,availability>=1.08?.18:.08);
  const profit=metrics.reduce((n,m)=>n+(Number(m.profit)||0),0),gross=metrics.reduce((n,m)=>n+(Number(m.gross)||0),0),workers=metrics.reduce((n,m)=>n+(Number(m.workers)||0),0),capacity=metrics.reduce((n,m)=>n+(Number(m.capacity)||0),0),margin=profit/Math.max(1,Math.abs(gross)),employment=capacity?workers/capacity:0,economyDelta=metrics.length?clamp1300(margin*.24+(employment-.58)*.10,-.32,.32):-.05;
  const techBudget=Math.min(Number(e.technologyBudgets[id])||0,provinceTechnologyBudgetMax1300(c,game)),techNeed=technologyBudgetNeed1300(c,game),techRatio=techNeed?techBudget/techNeed:0,investmentBase=(techRatio-.35)*.12,investmentMultiplier=1+Math.max(0,Number(b.technologyInvestmentPct)||0)/100,technologyDelta=clamp1300((investmentBase>0?investmentBase*investmentMultiplier:investmentBase)+treeUnlocked*.008,-.05,.40),stabilityDelta=stabilityPolicyMonthlyDelta1300(game);
  e.statRemainders[id]??={};
  const apply=(key,monthlyDelta,bonus=0)=>{
   const before=Number(row[key])||0,carry=Number(e.statRemainders[id][key])||0,raw=monthlyDelta*factor+carry,maxBase=Math.max(0,cap-(Number(bonus)||0));
   let step=roundStat1300(raw);
   if(step===0&&Math.abs(monthlyDelta)>=.001&&before>0&&before<maxBase)step=Math.sign(monthlyDelta)*.01;
   const after=roundStat1300(clamp1300(before+step,0,maxBase)),actual=roundStat1300(after-before);
   row[key]=after;e.statRemainders[id][key]=round(raw-actual,6);
   if(after===0||after===maxBase)e.statRemainders[id][key]=0;
   return actual;
  };
  e.lastStatChanges[id]={food:apply('food',foodDelta,0),economy:apply('economy',economyDelta,b.economy),technology:apply('technology',technologyDelta,0),stability:apply('stability',stabilityDelta,b.stability)};
  e.lastStatUpdateDay=Number(game.day)||0;
 }
}

function effectiveCityWage1300(game,cityId){
 const e=game.economy;return Number.isFinite(Number(e.cityWages[cityId]))?Number(e.cityWages[cityId]):e.nationalWage;
}
function effectiveBuildingWage1300(game,cityId,buildingId){
 const row=game.economy.buildingWages?.[cityId];
 return row&&Number.isFinite(Number(row[buildingId]))?Number(row[buildingId]):effectiveCityWage1300(game,cityId);
}
function companyTreasury1300(game,cityId,buildingId){
 const e=game.economy=normaliseGameEconomy1300(game.economy);e.companyTreasuries[cityId]??={};
 const current=Number(e.companyTreasuries[cityId][buildingId]);
 if(!Number.isFinite(current))e.companyTreasuries[cityId][buildingId]=100;
 return Number(e.companyTreasuries[cityId][buildingId]);
}
function setCompanyTreasury1300(game,cityId,buildingId,value){
 const e=game.economy=normaliseGameEconomy1300(game.economy);e.companyTreasuries[cityId]??={};
 e.companyTreasuries[cityId][buildingId]=Math.round((Number(value)||0)*100)/100;
 return e.companyTreasuries[cityId][buildingId];
}
function applyCompanyTreasuryResults1300(game,sectorsByCity={}){
 for(const [cityId,rows] of Object.entries(sectorsByCity||{}))for(const [buildingId,row] of Object.entries(rows||{})){
  const before=companyTreasury1300(game,cityId,buildingId),tax=Math.max(0,Number(row.tax)||0),support=companyPolicy1300(game,cityId,buildingId).buildingSupport,net=(Number(row.profit)||0)-tax+support,after=setCompanyTreasury1300(game,cityId,buildingId,before+net);
  row.treasuryBefore=before;row.stateSupport=roundStat1300(support);row.netCash=roundStat1300(net);row.treasury=after;row.financialState=after<0?'bankrupt':after<50?'distressed':'stable';
 }
}
function cityLabourPool1300(c,game=profile.activeGame){if(!c||!game)return 50;return Math.max(0,militaryBaseLabourPool1300(c,game)-militaryWorkerPoolDraw1300(game,c.id));}
function buildingAvailability1300(c,b){
 if(startingBuildingLevel1300(c,b.id)>0)return {ok:true,reason:'Historical sector already present'};
 const people=Number(c.people)||0,food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0,army=Number(c.army)||0,navy=Number(c.navy)||0,coastal=isCoastalCity1300(c);
 const text=[c.name,c.subrealm,c.economy,c.historicalRole,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase(),trade=/trade|market|merchant|fair|commerce|emporium|port|shipping/.test(text),cloth=/cloth|textile|wool|flax|weav/.test(text),pasture=/sheep|wool|pasture|livestock|cattle/.test(text),river=/river|rhine|danube|seine|thames|po |elbe|meuse|loire|douro|tagus|crossing|bridge/.test(text),leather=/leather|hide|tanner/.test(text),salt=/salt|brine/.test(text),timber=/timber|wood|forest|lumber/.test(text),stone=/stone|quarr|marble/.test(text),religious=/cathedral|bishop|archbishop|abbey|monastery|monastic|pilgrim|church/.test(text),finance=/mint|coin|bank|finance|money|royal capital|court/.test(text);
 switch(b.id){
  case 'fields':return {ok:food>=48,reason:'Needs a stronger agricultural base'};
  case 'pastures':return {ok:food>=60||pasture,reason:'Needs grazing or livestock potential'};
  case 'textiles':return {ok:(econ>=56&&people>=4500)||cloth,reason:'Needs urban craft labour or a cloth economy'};
  case 'forge':return {ok:tech>=58&&people>=3500,reason:'Needs skilled metalworkers and technical capacity'};
  case 'market':return {ok:(econ>=50&&people>=3000)||trade,reason:'Needs a viable commercial population'};
  case 'barracks':return {ok:army>=70||stab>=62,reason:'Needs an established military or administrative base'};
  case 'dockyard':return {ok:isCoastalCity1300(c),reason:'Requires a coast or major port'};
  case 'walls':return {ok:stab>=48||people>=7000,reason:'Needs enough population or administration to maintain fortifications'};
  case 'guildhall':return {ok:econ>=66&&people>=8000,reason:'Needs a developed urban craft economy'};
  case 'university':return {ok:tech>=77&&people>=9000,reason:'Needs a large, advanced scholarly centre'};
  case 'watermill':return {ok:river||food>=68,reason:'Needs a useful river/water source or a strong grain economy'};
  case 'brewery':return {ok:food>=52&&people>=3500,reason:'Needs grain supply and a sizeable local market'};
  case 'tannery':return {ok:leather||pasture||people>=6000&&econ>=54,reason:'Needs hides/livestock or enough urban craft demand'};
  case 'fishery':return {ok:coastal,reason:'Requires a coastal or major port province'};
  case 'saltworks':return {ok:salt||coastal&&econ>=72,reason:'Needs salt/brine resources or a strong coastal trade economy'};
  case 'quarry':return {ok:stone||people>=8000&&stab>=55,reason:'Needs workable stone deposits and organised labour'};
  case 'lumberyard':return {ok:timber||food>=60,reason:'Needs nearby woodland or a strong rural hinterland'};
  case 'ironworks':return {ok:true,reason:''};
  case 'mint':return {ok:finance||econ>=82&&tech>=68&&people>=12000,reason:'Needs strong fiscal authority, skilled metalwork and major commerce'};
  case 'monastery':return {ok:religious||tech>=65&&stab>=55,reason:'Needs a strong ecclesiastical or scholarly base'};
  case 'cathedral':return {ok:religious&&people>=6000,reason:'Requires an important bishopric, archbishopric or major church centre'};
  case 'hospital':return {ok:people>=7000&&stab>=48,reason:'Needs a sufficiently large and organised urban population'};
  default:return {ok:true,reason:''};
 }
}
function seedGameEmployment1300(game){
 game.economy=normaliseGameEconomy1300(game.economy);
 for(const cityId of game.ownedCities||[]){
  const c=CITY_1300[cityId];if(!c)continue;game.economy.employment[cityId]??={};
  const state=gameProvinceBuildingState(c);let remaining=cityLabourPool1300(c);
  const sectors=state.buildings.filter(b=>b.level>0&&b.id!=='walls').sort((a,b)=>effectiveBuildingWage1300(game,cityId,b.id)-effectiveBuildingWage1300(game,cityId,a.id));
  for(const row of sectors){const cap=row.maxWorkers*row.level,target=Math.min(remaining,Math.round(cap*.62));game.economy.employment[cityId][row.id]=target;remaining-=target;}
 }
}
function companyPolicy1300(game,cityId,buildingId){
 const raw=game?.economy?.companyPolicies?.[cityId]?.[buildingId]||{};
 const methods=productionMethodsForBuilding1300(buildingId),fallback=methods[0]?.id||'standard',productionMethod=methods.some(x=>x.id===raw.productionMethod)?raw.productionMethod:fallback;
 return {employmentTarget:clamp1300(Math.round(Number.isFinite(Number(raw.employmentTarget))?Number(raw.employmentTarget):100),0,100),buildingSupport:clamp1300(Math.round((Number(raw.buildingSupport??raw.recruitmentSupport)||0)*10)/10,0,10),priority:['employment','output'].includes(raw.priority)?raw.priority:'employment',productionMethod};
}
function companyOperatingWage1300(game,c,row){
 const base=effectiveBuildingWage1300(game,c.id,row.id),policy=companyPolicy1300(game,c.id,row.id);if(policy.priority!=='employment')return base;
 const expected=expectedMonthlyWage1300(game),employmentBase=Math.max(base,expected*.90),capacity=Math.max(1,row.maxWorkers*row.level),workers=Math.max(0,Number(game.economy?.employment?.[c.id]?.[row.id])||0),target=Math.max(1,capacity*(policy.employmentTarget/100)),shortage=clamp1300((target-workers)/target,0,1),def=BUILDING_PRODUCTION_1300[row.id]||{},ids=Object.keys(def.inputs||{}),market=game.economy?.markets?.[c.id],inputIndex=ids.length?ids.reduce((n,id)=>{const g=GOOD_1300[id],m=market?.goods?.[id];return n+(Number(m?.consumerPrice)||Number(m?.price)||g.basePrice)/g.basePrice;},0)/ids.length:1,affordability=clamp1300(1.18-inputIndex*.18,.72,1.05),premium=shortage*(.34*affordability);
 return clamp1300(Math.round(employmentBase*(1+premium)*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);
}
function setCompanyPolicy1300(cityId,buildingId,patch={}){
 const game=profile.activeGame;if(!game||!game.ownedCities?.includes(cityId)||!BUILDING_1300[buildingId])return;
 const e=game.economy=normaliseGameEconomy1300(game.economy),current=companyPolicy1300(game,cityId,buildingId),next={...current,...patch};
 next.employmentTarget=clamp1300(Math.round(Number(next.employmentTarget)||0),0,100);next.buildingSupport=clamp1300(Math.round((Number(next.buildingSupport)||0)*10)/10,0,10);delete next.recruitmentSupport;next.priority=['employment','output'].includes(next.priority)?next.priority:'employment';const method=resolvedProductionMethod1300(game,buildingId,next.productionMethod);next.productionMethod=method.id;
 e.companyPolicies[cityId]??={};e.companyPolicies[cityId][buildingId]=next;invalidateWeeklyBudgetProjection1300(game);simulateGameEconomyDay1300(game,{forceMarket:true,collectRevenue:false});save();renderGameProvincePanel();refreshWeeklyBudgetDOM1300(game);renderCampaignHudNotifications1300(game);
}
function companyBuildingSupportTotal1300(game){
 let total=0;for(const cityId of game?.ownedCities||[]){const c=CITY_1300[cityId];if(!c)continue;for(const row of gameProvinceBuildingState(c).buildings.filter(x=>x.level>0&&x.id!=='walls'))total+=companyPolicy1300(game,cityId,row.id).buildingSupport;}
 return roundStat1300(total);
}
function economyCitySnapshot1300(game,c){
 const state=gameProvinceBuildingState(c),e=game.economy,sectors=state.buildings.filter(row=>row.level>0&&row.id!=='walls').map(row=>{const policy=companyPolicy1300(game,c.id,row.id),method=resolvedProductionMethod1300(game,row.id,policy.productionMethod);return {id:row.id,level:row.level,workers:Math.max(0,Number(e.employment?.[c.id]?.[row.id])||0),capacity:Math.max(1,row.maxWorkers*row.level),wage:companyOperatingWage1300(game,c,row),treasury:companyTreasury1300(game,c.id,row.id),employmentTarget:policy.employmentTarget,buildingSupport:policy.buildingSupport,priority:policy.priority,productionMethod:method.id,production:productionDefinition1300(game,row.id,method.id)};}),stats=provinceDynamicStats1300(game,c);
 return {id:c.id,population:effectivePopulation1300(game,c),food:stats.food,economy:stats.economy,technology:stats.technology,stability:stats.stability,coastal:isCoastalCity1300(c),labourPool:cityLabourPool1300(c,game),grainBonusPct:Number(PROVINCE_GRAIN_BONUS_1300[c.id])||0,demandGrowthMultiplier:populationDemandGrowth1300(game),expectedWage:expectedMonthlyWage1300(game),techEffects:technologyBonuses1300(game.technology),militaryDemand:militaryMarketDemand1300(game,c.id),sectors};
}
function calculateWeeklyBudgetProjection1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),cities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean).map(c=>economyCitySnapshot1300(game,c));
 const result=simulateWeeklyEconomy1300({cities,previousMarkets:e.markets,previousPops:e.pops,taxRate:e.taxRate,taxCollectionFactor:GAME_TAX_COLLECTION_FACTOR,tariffs:e.tariffs,tradeStockpile:{...normaliseGameDiplomacy1300(game.diplomacy).tradeStockpile}}),expenses=weeklyStateExpenses1300(game),bonuses=technologyBonuses1300(game.technology),sectorTaxes=roundStat1300(result.weeklyTaxEstimate*(1+bonuses.taxIncomePct/100)),importTariffs=roundStat1300(result.weeklyTariffRevenue*(1+bonuses.tradeIncomePct/100)),income=roundStat1300(sectorTaxes+importTariffs);
 return {day:Number(game.day)||0,sectorTaxes,importTariffs,income,expenses,balance:roundStat1300(income-expenses.total)};
}
function weeklyBudgetProjection1300(game,{refresh=false}={}){
 const e=game.economy=normaliseGameEconomy1300(game.economy),cached=e.weeklyBudgetProjection;
 if(refresh||!cached||Number(cached.day)!==(Number(game.day)||0))e.weeklyBudgetProjection=calculateWeeklyBudgetProjection1300(game);
 return e.weeklyBudgetProjection;
}
function invalidateWeeklyBudgetProjection1300(game){if(game?.economy)game.economy.weeklyBudgetProjection=null;}
function refreshWeeklyBudgetDOM1300(game,{refresh=true}={}){
 if(!game)return;const b=weeklyBudgetProjection1300(game,{refresh}),money=(id,value,prefix='')=>{const el=$(id);if(el)el.textContent=prefix+'ƒ'+money1300(Math.abs(value));},signed=(id,value)=>{const el=$(id);if(!el)return;el.textContent=(value<0?'-':'+')+'ƒ'+money1300(Math.abs(value));el.classList.toggle('negative',value<0);el.classList.toggle('positive',value>0);};
 money('#budget-sector-taxes',b.sectorTaxes,'+');money('#budget-import-tariffs',b.importTariffs,'+');money('#budget-army-expense',b.expenses.army,'-');money('#budget-unprof-army-expense',b.expenses.unprofessionalArmy,'-');money('#budget-commanders-expense',b.expenses.commanders,'-');money('#budget-navy-expense',b.expenses.navy,'-');money('#budget-fortification-expense',b.expenses.fortification,'-');money('#budget-building-support-expense',b.expenses.buildingSupport,'-');money('#budget-stability-expense',b.expenses.stability,'-');money('#budget-tech-expense',b.expenses.technology,'-');money('#budget-total-expenses',b.expenses.total,'-');signed('#budget-current-balance',b.balance);signed('#country-current-week-balance',b.balance);
 const top=$('#game-daily-tax');if(top)top.textContent='Week balance: '+(b.balance<0?'-':'')+'ƒ'+money1300(Math.abs(b.balance));
}
function simulateGameEconomyDay1300(game,{forceMarket=false,collectRevenue=true}={}){
 const e=game.economy=normaliseGameEconomy1300(game.economy);
 for(const cityId of game.ownedCities||[]){
  const c=CITY_1300[cityId];if(!c)continue;const state=gameProvinceBuildingState(c),labour=cityLabourPool1300(c,game);e.employment[cityId]??={};
  const liveStats=provinceDynamicStats1300(game,c),sectors=state.buildings.filter(row=>row.level>0&&row.id!=='walls').map(row=>{const capacity=Math.max(1,row.maxWorkers*row.level),treasury=companyTreasury1300(game,cityId,row.id),wage=companyOperatingWage1300(game,c,row),wageRatio=wage/expectedMonthlyWage1300(game),last=e.lastEconomy?.[cityId]?.[row.id],policy=companyPolicy1300(game,cityId,row.id),profitSignal=clamp1300((Number(last?.profit)||0)/8,-.35,.55),priorityAttract=policy.priority==='employment'?.14:policy.priority==='output'?.06:0,attract=clamp1300(.18+.72*wageRatio+profitSignal+priorityAttract,.04,1.2),local=clamp1300(.80+(liveStats.stability-50)/300+(liveStats.economy-50)/500,.65,1.08),taxDrag=clamp1300(1-Math.max(0,e.taxRate-10)*.004,.80,1.03),targetCap=capacity*(policy.employmentTarget/100),treasuryEmploymentCap=treasury<0?0:treasury<50?.30:treasury<75?.50:1,desiredBase=capacity*clamp1300(attract*local*taxDrag,.02,1),desired=Math.round(Math.min(targetCap,desiredBase,capacity*treasuryEmploymentCap));return {row,capacity,treasury,wage,policy,treasuryEmploymentCap,desired,score:wageRatio+profitSignal+(policy.priority==='employment'?.12:policy.priority==='output'?.05:0)};}).sort((a,b)=>b.score-a.score);
  let remaining=labour;for(const sec of sectors){const hardMax=Math.floor(sec.capacity*sec.treasuryEmploymentCap);if(sec.treasury<0){e.employment[cityId][sec.row.id]=0;continue;}const target=Math.min(sec.desired,remaining,hardMax);remaining-=target;let current=Math.min(hardMax,Math.max(0,Number(e.employment[cityId][sec.row.id])||0)),speed=1+(sec.policy.priority==='employment'?.35:sec.policy.priority==='output'?.15:0),distressExit=sec.treasury<50?.55:sec.treasury<75?.35:0,move=Math.max(5,Math.round(sec.capacity*Math.max(.08*speed,distressExit)));e.employment[cityId][sec.row.id]=Math.round(current+clamp1300(target-current,-move,move));}
 }
 const last=Number(e.lastMarketTickDay),due=forceMarket||!Number.isFinite(last)||(Number(game.day)||0)-last>=7;
 if(due){const cities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean).map(c=>economyCitySnapshot1300(game,c)),d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy),result=simulateWeeklyEconomy1300({cities,previousMarkets:e.markets,previousPops:e.pops,taxRate:e.taxRate,taxCollectionFactor:GAME_TAX_COLLECTION_FACTOR,tariffs:e.tariffs,tradeStockpile:{...d.tradeStockpile}}),techBonuses=technologyBonuses1300(game.technology);if(collectRevenue&&isCampaignMonday1300(game))applyCompanyTreasuryResults1300(game,result.sectorsByCity);e.markets=result.markets;e.pops=result.pops;e.lastEconomy=result.sectorsByCity;e.weeklyTax=roundStat1300(result.weeklyTaxEstimate*(1+techBonuses.taxIncomePct/100));e.weeklyTariffRevenue=roundStat1300(result.weeklyTariffRevenue*(1+techBonuses.tradeIncomePct/100));if(!forceMarket)e.lastMarketTickDay=Number(game.day)||0;if(collectRevenue&&isCampaignMonday1300(game)){for(const g of GOODS_1300)d.tradeStockpile[g.id]=Math.max(0,Math.round((Number(result.tradeStockpileRemaining?.[g.id])||0)*100)/100);accrueTradeSurplus1300(game,result.markets);}if(!forceMarket)applyLiveDynamicStats1300(game,1/WEEKS_PER_MONTH);if(collectRevenue){e.weekSectorRevenue=Math.round((Number(e.weekSectorRevenue||0)+e.weeklyTax)*100)/100;e.weekTariffRevenue=Math.round((Number(e.weekTariffRevenue||0)+e.weeklyTariffRevenue)*100)/100;e.monthRevenue=Math.round((e.weekSectorRevenue+e.weekTariffRevenue)*100)/100;}}
 e.monthExpenses=weeklyStateExpenses1300(game).total;invalidateWeeklyBudgetProjection1300(game);
}
function refreshGameDateUI1300(){
 const game=profile.activeGame;if(!game)return;const d=gameDate1300(game.day),main=$('#game-date-main'),year=$('#game-date-year'),status=$('#game-clock-status');
 if(main)main.textContent=`${d.day} ${d.month}`;if(year)year.textContent=d.year;if(status)status.textContent=d.weekday;
}
function refreshGameClockUI1300(){
 const game=profile.activeGame;if(!game)return;game.economy=normaliseGameEconomy1300(game.economy);refreshGameDateUI1300();refreshCampaignResourceBar1300(game);renderCampaignHudNotifications1300(game);
}
function settleGameWeek1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),expenseBreakdown=weeklyStateExpenses1300(game),revenue=Math.round(e.monthRevenue*100)/100,expenses=expenseBreakdown.total,balance=Math.round((revenue-expenses)*100)/100,d=gameDate1300(game.day);
 e.lastMonthRevenue=revenue;e.lastMonthExpenses=expenses;e.lastMonthBalance=balance;e.lastMonthLabel=`${d.day} ${d.month} ${d.year}`;e.lastWeekSectorRevenue=e.weekSectorRevenue;e.lastWeekTariffRevenue=e.weekTariffRevenue;
 game.florins=Math.max(0,Math.round((Number(game.florins)+balance)*100)/100);applyWeeklyStabilityPolicy1300(game);applyWeeklyPopulationChange1300(game);settleWeeklyResearch1300(game);initializeDiplomacyWorld1300(game);for(const event of weeklyDiplomacy(game,completedCampaignWeeks1300(game),Object.fromEntries(buildCampaignRankings1300(game).map(r=>[r.country,r.strength||1]))))diplomacyLog1300(game,'World',event);updateCampaignRankingSnapshot1300(game);e.weekSectorRevenue=0;e.weekTariffRevenue=0;e.monthRevenue=0;e.monthExpenses=weeklyStateExpenses1300(game).total;
}
function maybeAutosaveCampaign1300(game){
 if(!game)return false;
 const day=Math.max(0,Math.floor(Number(game.day)||0)),last=Math.max(0,Math.floor(Number(game.lastAutosaveDay)||0));
 if(day-last<GAME_AUTOSAVE_DAYS)return false;
 game.lastAutosaveDay=day;save();return true;
}
function advanceGameDay1300(){const game=profile.activeGame;if(!game)return;game.day=(Number(game.day)||0)+1;const militaryChanged=processMilitaryDay1300(game);refreshGameDateUI1300();if(militaryChanged){refreshCampaignResourceBar1300(game);if(gameProvincePanel)renderGameProvincePanel();}if(!isCampaignMonday1300(game))return;processBuildingConstruction1300(game);simulateGameEconomyDay1300(game);settleGameWeek1300(game);refreshIndependenceSupportWars1300(game);maybeAutosaveCampaign1300(game);refreshGameClockUI1300();if(gameProvincePanel)renderGameProvincePanel();if(gameCountryPanel)renderGameCountryPanel1300();if(gameDiplomacyCountry)renderGameDiplomacyPanel1300();}
function setGameStartCountdown1300(value){
 const el=$('#game-start-countdown');if(!el)return;
 if(value<=0){el.classList.remove('visible');el.hidden=true;el.textContent='';return;}
 el.textContent=`GAME STARTS IN ${value}`;el.hidden=false;requestAnimationFrame(()=>el.classList.add('visible'));
}
function beginGameDayClock1300(){
 const game=profile.activeGame;if(!game)return;
 game.clockStartsAt=null;game.clockStartedAt=Date.now();game.lastTickAt=Date.now();setGameStartCountdown1300(0);
 gameClockTimer=setInterval(()=>{
  const game=profile.activeGame;if(!game)return;
  game.lastTickAt=Date.now();
  advanceGameDay1300();
 },GAME_DAY_REAL_MS);
}
function setupGameClock1300(){
 if(gameClockTimer){clearInterval(gameClockTimer);gameClockTimer=null;}
 refreshGameClockUI1300();
 const game=profile.activeGame;if(!game)return;
 let startAt=Number(game.clockStartsAt);
 if(gameStartCountdownPending&&(!Number.isFinite(startAt)||startAt<=Date.now())){startAt=Date.now()+GAME_INITIAL_CLOCK_DELAY_MS;game.clockStartsAt=startAt;}
 gameStartCountdownPending=false;
 if(!Number.isFinite(startAt)||startAt<=Date.now()){beginGameDayClock1300();return;}
 const updatePreStart=()=>{
  const active=profile.activeGame;if(!active)return;
  const remaining=Math.max(0,Number(active.clockStartsAt)-Date.now());
  if(remaining<=0){clearInterval(gameClockTimer);gameClockTimer=null;beginGameDayClock1300();return;}
  if(remaining<=3000)setGameStartCountdown1300(Math.max(1,Math.ceil(remaining/1000)));
  else setGameStartCountdown1300(0);
 };
 updatePreStart();
 gameClockTimer=setInterval(updatePreStart,250);
}
function ensureGameProfile(p){
 p.collection1300=p.collection1300&&typeof p.collection1300==='object'&&!Array.isArray(p.collection1300)?p.collection1300:{};
 p.playerFlag=normaliseFlag1300(p.playerFlag);
 if(!validRealmColor(p.playerColor))p.playerColor='#c6534d';
 if(!Array.isArray(p.deck))p.deck=[];
 const owned=id=>Object.hasOwn(CITY_1300,id)&&(Number(p.collection1300[id])||0)>0;
 p.deck=[...new Set(p.deck)].filter(owned).slice(0,16);
 if(!Array.isArray(p.starterCardIds))p.starterCardIds=[];
 if(!Array.isArray(p.welcomeCardIds))p.welcomeCardIds=[];
 p.starterCardIds=[...new Set(p.starterCardIds)].filter(owned).slice(0,8);
 p.welcomeCardIds=[...new Set(p.welcomeCardIds)].filter(owned).slice(0,8);
 if(p.activeGame){
  const g=p.activeGame;
  const validDeck=Array.isArray(g.deck)?[...new Set(g.deck)].filter(owned).slice(0,16):[];
  const validHand=Array.isArray(g.hand)?[...new Set(g.hand)].filter(id=>validDeck.includes(id)).slice(0,4):[];
  if(validDeck.length!==16||validHand.length!==4)p.activeGame=null;
  else{
   const startTreasury=Math.round(validHand.reduce((sum,id)=>sum+(Number(CITY_1300[id]?.startingFlorins)||.01),0)*100)/100;
   const currentTreasury=Number.isFinite(Number(g.florins))?Math.max(0,Math.round(Number(g.florins)*100)/100):startTreasury;
   const playerColor=validRealmColor(g.playerColor)?g.playerColor:p.playerColor;
   const savedOwned=Array.isArray(g.ownedCities)?[...new Set(g.ownedCities)].filter(id=>Object.hasOwn(CITY_1300,id)):[],ownedCities=savedOwned.length?savedOwned:[...validHand],oldOwners=g.cityOwners&&typeof g.cityOwners==='object'&&!Array.isArray(g.cityOwners)?g.cityOwners:{},cityOwners={...oldOwners};for(const id of ownedCities)cityOwners[id]='player';
   const gameBuildings=g.buildings&&typeof g.buildings==='object'&&!Array.isArray(g.buildings)?g.buildings:{},construction=g.construction&&typeof g.construction==='object'&&!Array.isArray(g.construction)?g.construction:{};
   const day=Math.max(0,Math.floor(Number(g.day)||0)),clockStartedAt=Number.isFinite(Number(g.clockStartedAt))?Number(g.clockStartedAt):Date.now(),clockStartsAt=Number.isFinite(Number(g.clockStartsAt))?Number(g.clockStartsAt):null,lastTickAt=Number.isFinite(Number(g.lastTickAt))?Number(g.lastTickAt):null,lastAutosaveDay=Number.isFinite(Number(g.lastAutosaveDay))?Math.max(0,Math.floor(Number(g.lastAutosaveDay))):0,economy=normaliseGameEconomy1300(g.economy);
   p.activeGame={date:'1300-01-01',deck:validDeck,hand:validHand,ownedCities,cityOwners,playerColor,flag:normaliseFlag1300(g.flag||p.playerFlag),startingFlorins:startTreasury,florins:currentTreasury,buildings:gameBuildings,construction,day,clockStartedAt,clockStartsAt,lastTickAt,lastAutosaveDay,economy,technology:normaliseTechnologyState1300(g.technology),diplomacy:normaliseGameDiplomacy1300(g.diplomacy),campaignStage:g.campaignStage,originCountryByCity:g.originCountryByCity,independenceByCity:g.independenceByCity,formedNation:g.formedNation,won:g.won,victoryRank:g.victoryRank,victoryDate:g.victoryDate,rankingSnapshot:g.rankingSnapshot,hudNotificationDismissed:g.hudNotificationDismissed&&typeof g.hudNotificationDismissed==='object'&&!Array.isArray(g.hudNotificationDismissed)?g.hudNotificationDismissed:{},military:g.military&&typeof g.military==='object'&&!Array.isArray(g.military)?g.military:null};initialiseCampaignIdentity1300(p.activeGame);ensureGameDynamicStats1300(p.activeGame);ensureGameMilitary1300(p.activeGame);p.activeGame.economy.stabilityBudget=Math.min(p.activeGame.economy.stabilityBudget,stabilityBudgetMax1300(p.activeGame));for(const id of p.activeGame.ownedCities)p.activeGame.economy.technologyBudgets[id]=Math.min(Number(p.activeGame.economy.technologyBudgets[id])||0,provinceTechnologyBudgetMax1300(CITY_1300[id],p.activeGame));refreshCampaignStage1300(p.activeGame);
  }
 }
}
ensureGameProfile(profile);
function toggleDeckCard1300(id){
 if(profile.activeGame){toast('Quit the active campaign before changing your deck.');return;}
 if(!Object.hasOwn(CITY_1300,id)||(Number(profile.collection1300[id])||0)<=0){toast('You can only use cards you own.');return;}
 const i=profile.deck.indexOf(id);
 if(i>=0)profile.deck.splice(i,1);
 else if(profile.deck.length<16)profile.deck.push(id);
 else{toast('Your deck already contains 16 cards. Remove one first.');return;}
 save();render();
}

const CAMPAIGN_STAGES_1300={
 rebellion:{label:'Rebellion',next:'Free Cities'},
 free_cities:{label:'Free Cities',next:'Form a Nation'},
 nation:{label:'Nation',next:'Great Power'}
};
function campaignPlayerBaseName1300(){return authUser?.name||'Player';}
function campaignStageLabel1300(game){return CAMPAIGN_STAGES_1300[game?.campaignStage]?.label||'Rebellion';}
function gameCountryName1300(game=profile.activeGame){
 const name=campaignPlayerBaseName1300();
 if(game?.campaignStage==='nation'&&game.formedNation)return game.formedNation;
 if(game?.campaignStage==='free_cities')return `${name}'s Free Cities`;
 return `${name}'s Rebellion`;
}
function initialiseCampaignIdentity1300(game){
 if(!game)return;
 game.campaignStage=['rebellion','free_cities','nation'].includes(game.campaignStage)?game.campaignStage:'rebellion';
 game.originCountryByCity=game.originCountryByCity&&typeof game.originCountryByCity==='object'?game.originCountryByCity:{};
 game.independenceByCity=game.independenceByCity&&typeof game.independenceByCity==='object'?game.independenceByCity:{};
 for(const id of game.ownedCities||[]){
  const c=CITY_1300[id];if(!c)continue;
  game.originCountryByCity[id]??=c.country;
  if(typeof game.independenceByCity[id]!=='boolean')game.independenceByCity[id]=false;
 }
 game.formedNation=typeof game.formedNation==='string'&&game.formedNation?game.formedNation:null;
 game.won=!!game.won;
}
function campaignRealmStillExists1300(game,country){
 if(!game||!country)return false;
 return CITIES_1300.some(c=>{
  const saved=game.cityOwners?.[c.id],owner=saved==='player'?'player':typeof saved==='string'&&saved?saved:c.country;
  return owner===country;
 });
}
function refreshAutoFreeCities1300(game){
 for(const id of game?.ownedCities||[]){
  const origin=game.originCountryByCity?.[id]||CITY_1300[id]?.country;
  if(origin&&!campaignRealmStillExists1300(game,origin))game.independenceByCity[id]=true;
 }
}
function refreshCampaignStage1300(game){
 initialiseCampaignIdentity1300(game);refreshAutoFreeCities1300(game);
 if(game.campaignStage==='rebellion'&&(game.ownedCities||[]).length&&game.ownedCities.every(id=>game.independenceByCity[id]===true))game.campaignStage='free_cities';
}
function formableRealms1300(game){
 const owned=new Set(game?.ownedCities||[]),groups=new Map();
 for(const c of CITIES_1300){const row=groups.get(c.country)||{country:c.country,cities:[]};row.cities.push(c);groups.set(c.country,row);}
 return [...groups.values()].map(row=>{
  const held=row.cities.filter(c=>owned.has(c.id)),missing=row.cities.filter(c=>!owned.has(c.id)),multiProvince=row.cities.length>=2;
  return {...row,held,missing,progress:row.cities.length?held.length/row.cities.length:0,multiProvince,canForm:multiProvince&&game?.campaignStage==='free_cities'&&held.length>0&&missing.length===0};
 }).filter(row=>row.held.length>0&&row.multiProvince).sort((a,b)=>b.progress-a.progress||a.missing.length-b.missing.length||a.country.localeCompare(b.country));
}
function formCampaignNation1300(country){
 const game=profile.activeGame;if(!game)return;refreshCampaignStage1300(game);
 const represented=CITIES_1300.filter(c=>c.country===country);if(represented.length<2){toast('One-province realms cannot be formed. Expand into a multi-province country first.');return;}
 const target=formableRealms1300(game).find(x=>x.country===country);
 if(!target){toast('That country is not linked to enough provinces you own.');return;}
 if(game.campaignStage!=='free_cities'){toast('All of your cities must first become Free Cities.');return;}
 if(target.missing.length){toast(`You still need ${target.missing.length} province${target.missing.length===1?'':'s'} to form ${target.country}.`);return;}
 game.campaignStage='nation';game.formedNation=target.country;updateCampaignRankingSnapshot1300(game);checkCampaignVictory1300(game);save();renderGameCountryPanel1300();toast(`${target.country} has been formed.`);
}
function checkCampaignVictory1300(game){
 if(!game||game.campaignStage!=='nation'){if(game)game.won=false;return false;}
 const playerName=gameCountryName1300(game),rows=buildCampaignRankings1300(game),player=rows.find(r=>r.country===playerName);
 if(player&&player.rank<=5){game.won=true;game.victoryRank=player.rank;game.victoryDate=gameDate1300(game.day);return true;}
 game.won=false;game.victoryRank=null;return false;
}
function startGame1300(){
 if(profile.deck.length!==16){toast(`Choose exactly 16 owned cards first. You currently have ${profile.deck.length}.`);return;}
 const shuffled=shuffle1300(profile.deck),hand=shuffled.slice(0,4);
 const startingFlorins=Math.round(hand.reduce((sum,id)=>sum+(Number(CITY_1300[id]?.startingFlorins)||.01),0)*100)/100;
 const ownedCities=[...hand],cityOwners=Object.fromEntries(ownedCities.map(id=>[id,'player']));
 profile.activeGame={date:'1300-01-01',deck:[...profile.deck],hand,ownedCities,cityOwners,playerColor:profile.playerColor,flag:normaliseFlag1300(profile.playerFlag),startingFlorins,florins:startingFlorins,buildings:{},construction:{},day:0,clockStartedAt:Date.now(),clockStartsAt:Date.now()+GAME_INITIAL_CLOCK_DELAY_MS,lastTickAt:null,lastAutosaveDay:0,economy:freshGameEconomy1300(),technology:freshTechnologyState1300(),diplomacy:freshGameDiplomacy1300(),campaignStage:'rebellion',originCountryByCity:Object.fromEntries(ownedCities.map(id=>[id,CITY_1300[id]?.country||'Unknown'])),independenceByCity:Object.fromEntries(ownedCities.map(id=>[id,false])),formedNation:null,won:false,hudNotificationDismissed:{},military:null};
 // Normal starting opinion is +10. Countries that lost one of your opening cities start at -100 toward you.
 for(const country of new Set(CITIES_1300.map(c=>c.country)))profile.activeGame.diplomacy.relations[country]=10;
 for(const victim of new Set(ownedCities.map(id=>CITY_1300[id]?.country).filter(Boolean)))profile.activeGame.diplomacy.relations[victim]=-100;
 ensureGameDynamicStats1300(profile.activeGame);ensureGameMilitary1300(profile.activeGame);seedGameEmployment1300(profile.activeGame);simulateGameEconomyDay1300(profile.activeGame,{forceMarket:true,collectRevenue:false});profile.activeGame.economy.lastMarketTickDay=0;updateCampaignRankingSnapshot1300(profile.activeGame);
 selected1300=profile.activeGame.hand[0];mapState.selected=selected1300;gameScreen='map';gameStartCountdownPending=true;save();navigate('game');
}

const purchasedBuildingLevel=(cityId,buildingId)=>Math.max(0,Number(profile.buildings?.[cityId]?.[buildingId])||0);
const buildingMaxLevel1300=b=>Math.max(1,Number(b?.maxLevel)||ECONOMY_1300.maxBuildingLevel);
function buildingLevelEffects1300(id,level){
 const l=Math.max(0,Math.floor(Number(level)||0));
 if(!l)return {};
 if(id==='barracks')return {armyRecruitmentTimePct:l>=3?-25:l>=2?-20:-10,armyUpkeepPct:l>=3?-25:l>=2?-5:0};
 if(id==='dockyard')return {shipBuildTimePct:l>=2?-15:-10,shipBuildCostPct:l>=3?-25:0,navyUpkeepPct:l>=3?-25:l>=2?-10:0};
 if(id==='walls')return {siegeDifficultyPct:l>=4?50:l>=3?30:l>=2?20:10,fortificationUpkeep:l>=4?.25:l>=3?.20:l>=2?.15:.10};
 if(id==='university')return {technologyInvestmentPct:l*10};
 if(id==='monastery')return {technologyInvestmentPct:l*6};
 if(id==='cathedral')return {technologyInvestmentPct:l*8};
 if(id==='hospital')return {happinessBonus:l*2,lifeExpectancyPct:l*2};
 return {};
}
function cityBuildingState(c){
 const bonuses={food:0,economy:0,technology:0,stability:0,professionalArmyLimit:0,navy:0,income:0,armyRecruitmentTimePct:0,armyUpkeepPct:0,shipBuildTimePct:0,shipBuildCostPct:0,navyUpkeepPct:0,siegeDifficultyPct:0,fortificationUpkeep:0,technologyInvestmentPct:0,happinessBonus:0,lifeExpectancyPct:0};
 const buildings=BUILDINGS_1300.map(b=>{
  const maxLevel=buildingMaxLevel1300(b),historical=startingBuildingLevel1300(c,b.id),purchased=purchasedBuildingLevel(c.id,b.id),coastAllowed=!b.requiresCoast||isCoastalCity1300(c),level=coastAllowed?Math.min(maxLevel,historical+purchased):0,levelEffects=buildingLevelEffects1300(b.id,level);
  for(const [key,value] of Object.entries(b.effects))bonuses[key]=(bonuses[key]||0)+value*level;
  for(const [key,value] of Object.entries(levelEffects))bonuses[key]=(bonuses[key]||0)+value;
  return {...b,maxLevel,historical,purchased,level,levelEffects,cost:level<maxLevel?buildingCost1300(b,level):null};
 });
 return {buildings,bonuses,totalLevels:buildings.reduce((sum,b)=>sum+b.level,0),historicalLevels:buildings.reduce((sum,b)=>sum+b.historical,0)};
}
function buildingEffectText(b){
 const labels={food:'Food',economy:'Economy',technology:'Technology',stability:'Stability',professionalArmyLimit:'Professional army limit',navy:'Navy',income:'Annual income',armyRecruitmentTimePct:'Army recruitment time',armyUpkeepPct:'Army upkeep',shipBuildTimePct:'Ship building time',shipBuildCostPct:'Ship building cost',navyUpkeepPct:'Navy upkeep',siegeDifficultyPct:'Siege difficulty',fortificationUpkeep:'State upkeep / week',technologyInvestmentPct:'Technology investment effectiveness',happinessBonus:'Happiness',lifeExpectancyPct:'Life expectancy'};
 const pctKeys=new Set(['professionalArmyLimit','armyRecruitmentTimePct','armyUpkeepPct','shipBuildTimePct','shipBuildCostPct','navyUpkeepPct','siegeDifficultyPct','technologyInvestmentPct','lifeExpectancyPct']);
 const rows=[...Object.entries(b.effects||{}).map(([key,value])=>[key,value]),...Object.entries(b.levelEffects||{}).map(([key,value])=>[key,value])].filter(([,value])=>Number(value)!==0);
 return rows.map(([key,value])=>`${labels[key]||key} ${Number(value)>0?'+':''}${value}${key==='income'?' ƒ':key==='fortificationUpkeep'?' ƒ':pctKeys.has(key)?'%':''}`).join(' · ');
}
function compactBuildingWorkers1300(value){
 const n=Math.max(0,Math.round(Number(value)||0)),compact=(x,d,suffix)=>x.toFixed(d).replace('.',',')+suffix;
 if(n>=1000000)return compact(n/1000000,n<10000000?1:0,'M');
 if(n>=10000)return compact(n/1000,n<100000?1:0,'K');
 return n.toLocaleString('en-GB');
}
function buildingConstructionJob1300(game,cityId,buildingId){return game?.construction?.[cityId]?.[buildingId]||null;}
function buildingConstructionDays1300(row){
 const cost=Math.max(50,Math.min(400,Number(row?.cost)||50)),level=Math.max(0,Number(row?.level)||0),category=String(row?.category||'').toLowerCase();
 let days=14+((cost-50)/350)*21+level*7;if(/defence|knowledge|navy|civic/.test(category))days+=4;
 const modifier=technologyBonuses1300(profile.activeGame?.technology).constructionTimePct;return clamp1300(Math.round(days*(1+modifier/100)/7)*7,14,56);
}
function buildingConstructionTimeText1300(days){const weeks=Math.max(2,Math.round((Number(days)||14)/7));return weeks===8?'~2 months':weeks+' weeks';}
function constructionProgress1300(game,job){if(!job)return 0;const total=Math.max(1,(Number(job.completeDay)||0)-(Number(job.startDay)||0)),done=clamp1300((Number(game?.day)||0)-(Number(job.startDay)||0),0,total);return Math.round(done/total*100);}
function constructionFinishText1300(job){if(!job)return '';const d=gameDate1300(Number(job.completeDay)||0);return d.day+' '+d.month+' '+d.year;}
function completeBuildingConstruction1300(game,cityId,buildingId){
 const c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!c||!building)return;
 game.buildings??={};game.buildings[cityId]??={};game.buildings[cityId][buildingId]=(Number(game.buildings[cityId][buildingId])||0)+1;
 if(buildingId!=='walls'){game.economy.employment[cityId]??={};game.economy.employment[cityId][buildingId]??=0;game.economy.companyPolicies[cityId]??={};game.economy.companyPolicies[cityId][buildingId]??={employmentTarget:100,buildingSupport:0,priority:'employment',productionMethod:productionMethodsForBuilding1300(buildingId)[0]?.id||'standard'};game.economy.companyTreasuries??={};game.economy.companyTreasuries[cityId]??={};if(!Number.isFinite(Number(game.economy.companyTreasuries[cityId][buildingId])))game.economy.companyTreasuries[cityId][buildingId]=100;}
 delete game.construction?.[cityId]?.[buildingId];if(game.construction?.[cityId]&&!Object.keys(game.construction[cityId]).length)delete game.construction[cityId];
 toast(building.name+' construction finished in '+displayCityName1300(c)+'.');
}
function processBuildingConstruction1300(game){
 if(!game?.construction)return;let changed=false;
 for(const [cityId,jobs] of Object.entries({...game.construction}))for(const [buildingId,job] of Object.entries({...jobs})){if((Number(game.day)||0)>=(Number(job.completeDay)||Infinity)){completeBuildingConstruction1300(game,cityId,buildingId);changed=true;}}
 if(changed){invalidateWeeklyBudgetProjection1300(game);syncCampaignMilitaryOverlay1300(game);}
}
function gameBuildingPurchaseLevel(cityId,buildingId){
 return Number(profile.activeGame?.buildings?.[cityId]?.[buildingId])||0;
}
function gameProvinceBuildingState(c){
 const bonuses={food:0,economy:0,technology:0,stability:0,professionalArmyLimit:0,navy:0,armyRecruitmentTimePct:0,armyUpkeepPct:0,shipBuildTimePct:0,shipBuildCostPct:0,navyUpkeepPct:0,siegeDifficultyPct:0,fortificationUpkeep:0,technologyInvestmentPct:0,happinessBonus:0,lifeExpectancyPct:0};
 const buildings=BUILDINGS_1300.map(b=>{
  const maxLevel=buildingMaxLevel1300(b),historical=startingBuildingLevel1300(c,b.id),purchased=gameBuildingPurchaseLevel(c.id,b.id),coastAllowed=!b.requiresCoast||isCoastalCity1300(c),level=coastAllowed?clamp1300(historical+purchased,0,maxLevel):0,availability=buildingAvailability1300(c,b),construction=buildingConstructionJob1300(profile.activeGame,c.id,b.id),levelEffects=buildingLevelEffects1300(b.id,level);
  for(const [key,value] of Object.entries(b.effects))bonuses[key]=(bonuses[key]||0)+value*level;
  for(const [key,value] of Object.entries(levelEffects))bonuses[key]=(bonuses[key]||0)+value;
  const rawCost=level<maxLevel?buildingCost1300(b,level):null,inflation=annualInflationFactor1300(profile.activeGame),discount=technologyBonuses1300(profile.activeGame?.technology).constructionCostPct,cost=rawCost===null?null:Math.max(1,Math.round(rawCost*inflation*(1+discount/100)));return {...b,maxLevel,historical,purchased,level,levelEffects,construction,available:availability.ok,availabilityReason:availability.reason,cost,inflation,constructionDays:cost!==null?buildingConstructionDays1300({...b,level,cost}):null};
 });
 return {bonuses,buildings,totalLevels:buildings.reduce((sum,b)=>sum+b.level,0)};
}
function buildingPicture1300(id){
 const shapes={
  fields:'<path d="M8 48c13-15 28-25 48-33M10 56c15-13 29-21 46-27M18 51l-4-10m14 3-4-10m15 3-4-10m15 4-4-10"/><circle cx="49" cy="13" r="6"/>',
  pastures:'<path d="M12 45c0-10 7-17 17-17h10c8 0 13 5 13 12v9H20c-5 0-8-1-8-4Z"/><path d="M21 28c0-7 4-11 9-11 5 0 8 3 10 7m-20 25v7m26-7v7m5-22 6-5m-7 10 7 2"/>',
  textiles:'<path d="M13 14h38v38H13zM20 20v26m8-26v26m8-26v26m8-26v26M13 30h38M13 39h38"/><path d="M8 10h48M8 56h48"/>',
  forge:'<path d="M13 45h36l-5 10H20zM18 40c0-5 5-10 10-10h18v10z"/><path d="m16 13 8 8L39 6l7 7-15 15 8 8-6 6-23-23z"/>',
  market:'<path d="M10 24h44l-5-13H15zM14 24v30h36V24M22 54V36h12v18"/><path d="M10 24c0 6 8 6 8 0 0 6 8 6 8 0 0 6 8 6 8 0 0 6 8 6 8 0 0 6 8 6 8 0"/>',
  barracks:'<path d="M12 53h40V25L32 11 12 25zM23 53V39h18v14"/><path d="m16 15 12 12m20-12L36 27M11 11l18 18m24-18L35 29"/>',
  dockyard:'<path d="M8 42c10 9 38 9 48 0l-6 12H14zM19 40V19h24v21M31 19V8M31 8l15 8H31"/><path d="M11 57c8-4 14 4 21 0 7-4 13 4 21 0"/>',
  walls:'<path d="M10 53V20h10v8h8v-8h8v8h8v-8h10v33zM20 20v-9h8v9m8 0v-9h8v9"/><path d="M27 53V39h10v14"/>',
  guildhall:'<path d="M11 53h42M15 49V25h34v24M11 25h42L32 9z"/><path d="M22 49V33h20v16M32 33v16"/><circle cx="32" cy="18" r="3"/>',
  university:'<path d="M9 18c9-5 17-4 23 1v32c-6-5-14-6-23-1zM55 18c-9-5-17-4-23 1v32c6-5 14-6 23-1z"/><path d="M32 19v32M14 27c6-2 10-2 14 1m-14 8c6-2 10-2 14 1m22-10c-6-2-10-2-14 1m14 8c-6-2-10-2-14 1"/>',
  watermill:'<circle cx="19" cy="35" r="12"/><path d="M19 18v34M2 35h34M7 23l24 24M31 23 7 47M34 53h21V27H34M39 53V38h10v15"/>',
  brewery:'<path d="M16 18h27v34H16zM43 25h7c6 0 7 17 0 18h-7M21 12h17M24 18v-6h11v6"/><path d="M21 29h17M21 38h17"/>',
  tannery:'<path d="M11 18c9-7 16-7 22-2 7-5 14-4 21 2l-7 11 3 20-18-5-18 5 3-20z"/><path d="M32 15v29M19 24c9 5 17 5 26 0"/>',
  fishery:'<path d="M8 35c12-13 28-13 40 0-12 13-28 13-40 0zM48 35l9-8v16z"/><circle cx="20" cy="32" r="2"/><path d="M12 51c10-5 16 5 26 0 8-4 12 4 20 0"/>',
  saltworks:'<path d="M9 43h46v10H9zM14 31h36v12M21 20h22v11"/><path d="M17 52 24 43m9 9 7-9m9 9 4-9M24 14l3-5m8 5 3-5"/>',
  quarry:'<path d="M8 50 19 29l12 8 9-20 16 33z"/><path d="m12 18 9 9m-4-15 10 10M38 33l11 7"/>',
  lumberyard:'<path d="M10 49h44M14 42h36M18 35h28"/><circle cx="19" cy="42" r="7"/><circle cx="39" cy="42" r="7"/><path d="M50 32 57 18M46 30l8-16"/>',
  ironworks:'<path d="M10 53h44V31L43 21v10L32 21v10L20 21v10H10z"/><path d="M17 53V42h12v11M38 53V40h10v13M15 16h8l3 15h-8z"/><path d="M19 12v-5m12 12 5-7m8 8 8-6"/>',
  warehouse:'<path d="M9 52h46V23L32 10 9 23zM15 52V29h34v23"/><path d="M15 36h34M24 29v23m16-23v23"/>',
  merchantquarter:'<path d="M8 52h48M12 47V24h16v23M36 47V17h16v30"/><path d="M16 24v-8h8v8M40 17V9h8v8M17 33h6m18-7h6m-6 9h6"/>',
  customshouse:'<path d="M10 52h44M14 48V24h36v24M10 24h44L32 10z"/><path d="M22 48V31m10 17V31m10 17V31M19 18h26"/>',
  mint:'<circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="13"/><path d="M32 18v28M25 24h11c7 0 7 8 0 8H28c-7 0-7 8 0 8h11"/>',
  bridge:'<path d="M7 45h50M10 45c4-19 14-19 20 0m4 0c4-19 14-19 20 0M10 31h44"/><path d="M8 53c9-4 15 4 24 0 9-4 15 4 24 0"/>',
  monastery:'<path d="M10 53h44V27L32 12 10 27zM27 53V38h10v15"/><path d="M32 12V5M27 9h10M16 32h8m16 0h8"/>',
  cathedral:'<path d="M9 53h46L50 26l-10 8-8-21-8 21-10-8zM28 53V39h8v14"/><path d="M32 13V5M27 9h10M18 39h6m16 0h6"/>',
  hospital:'<path d="M11 52h42V20H11zM26 12h12v8H26z"/><path d="M32 27v18M23 36h18M17 47h30"/>'
 };
 return `<svg viewBox="0 0 64 64" class="province-building-svg" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[id]||shapes.guildhall}</svg>`;
}
function goodQty1300(n){const v=Number(n)||0;return v>=1000?(v/1000).toFixed(1)+'K':v.toFixed(v<10?1:0);}
function goodFlowText1300(map){return Object.entries(map||{}).filter(([,n])=>Number(n)>0).map(([id,n])=>`${GOOD_1300[id]?.name||id} ${goodQty1300(n)}`).join(' · ')||'None';}
function provinceMarketHTML1300(game,cityId){
 const market=game.economy?.markets?.[cityId];if(!market)return '';
 const rows=GOODS_1300.map(g=>{
  const m=market.goods?.[g.id];if(!m)return null;
  const produced=Math.max(0,Number(m.supply)||0),need=Math.max(0,Number(m.need)||Number(m.demand)||0),internal=Math.max(0,(Number(m.domesticBought)||0)+(Number(m.stockpileBought)||0)),bought=Math.max(0,Number(m.bought)||0),sold=Math.max(0,Number(m.sold)||0),stock=Math.max(0,Number(m.stock)||0),marketPrice=Number(m.consumerPrice)||Number(m.price)||g.basePrice,unitPrice=marketPrice*FLORINS_PER_MARKET_VALUE;
  return {g,produced,need,internal,bought,sold,stock,unitPrice,activity:produced+need+internal+bought+sold+stock};
 }).filter(Boolean).sort((a,b)=>b.activity-a.activity).slice(0,9);
 return `<div class="province-market-head"><div><span>LOCAL MARKET</span><strong>Realm goods are used before foreign imports</strong></div></div>
 <section class="province-market-clear">
  <div class="province-market-columns"><span>GOOD</span><span>PRODUCED</span><span>NEED</span><span>INTERNAL</span><span>FOREIGN</span><span>SOLD</span><span>PRICE / 1</span></div>
  ${rows.map(r=>`<div class="province-market-row"><strong>${esc(r.g.name)}</strong><span>${goodQty1300(r.produced)}</span><span>${goodQty1300(r.need)}</span><span>${goodQty1300(r.internal)}</span><span>${goodQty1300(r.bought)}</span><span>${goodQty1300(r.sold)}</span><em>ƒ${money1300(r.unitPrice)}</em></div>`).join('')}
 </section>`;
}
function countryMarketHTML1300(game){
 const rows=aggregateMarkets1300(game.economy?.markets||{}).sort((a,b)=>Math.abs(b.changePct)-Math.abs(a.changePct)).slice(0,10);
 return `<div class="country-section-title"><span>GOODS MARKET</span><small>Internal realm supply first · diplomatic stockpile second · foreign imports last</small></div><section class="country-market-table">${rows.map(r=>`<div><strong>${esc(r.name)}</strong><span>Supply ${goodQty1300(r.supply)}</span><span>Demand ${goodQty1300(r.demand)}</span><b>ƒ${money1300(r.consumerPrice*FLORINS_PER_MARKET_VALUE)}</b><i class="${r.changePct>1?'up':r.changePct<-1?'down':''}">${r.changePct>=0?'+':''}${r.changePct}%</i></div>`).join('')}</section>`;
}
function gameSectorMetrics1300(game,cityId,buildingId){
 const m=game.economy?.lastEconomy?.[cityId]?.[buildingId];if(m)return m;
 const c=CITY_1300[cityId],row=c?gameProvinceBuildingState(c).buildings.find(x=>x.id===buildingId):null,workers=Math.max(0,Number(game.economy?.employment?.[cityId]?.[buildingId])||0),capacity=row?row.maxWorkers*row.level:0;
 if(buildingId==='walls')return {workers:0,capacity:0,wage:0,treasury:null,gross:0,inputCost:0,wageBill:0,unpaidWages:0,profit:0,tax:0,throughput:0,inputs:{},outputs:{}};
 return {workers,capacity,wage:effectiveBuildingWage1300(game,cityId,buildingId),treasury:companyTreasury1300(game,cityId,buildingId),gross:0,inputCost:0,wageBill:0,unpaidWages:0,profit:0,tax:0,throughput:0,inputs:{},outputs:{},directFlorins:0};
}
function gameCityEconomySummary1300(game,cityId){
 const c=CITY_1300[cityId];if(!c)return {workers:0,labour:0,tax:0,profit:0,gross:0};
 const metrics=game.economy?.lastEconomy?.[cityId]||{},rows=Object.values(metrics);
 return {workers:rows.reduce((n,m)=>n+(Number(m.workers)||0),0),labour:cityLabourPool1300(c),tax:rows.reduce((n,m)=>n+(Number(m.tax)||0),0),profit:roundStat1300(rows.reduce((n,m)=>n+(Number(m.profit)||0),0)),gross:roundStat1300(rows.reduce((n,m)=>n+(Number(m.gross)||0),0))};
}
function wageStepper1300(scope,cityId,buildingId,value,canReset){
 const attrs=scope==='national'?'':`data-city="${cityId}"${buildingId?` data-id="${buildingId}"`:''}`,action=scope==='national'?'game-national-wage-adjust':scope==='city'?'game-city-wage-adjust':'game-building-wage-adjust',resetAction=scope==='city'?'game-city-wage-reset':'game-building-wage-reset';
 return `<div class="wage-stepper"><button data-action="${action}" data-delta="-0.01" ${attrs}>−</button><strong>ƒ${money1300(value)}</strong><button data-action="${action}" data-delta="0.01" ${attrs}>+</button>${scope!=='national'?'<button class="wage-reset" data-action="'+resetAction+'" '+attrs+' '+(canReset?'':'disabled')+'>inherit</button>':''}</div>`;
}
function buildingMoneyTone1300(value,{cost=false}={}){
 const n=Number(value)||0;
 if(cost&&n>0)return 'negative';
 if(n>0)return 'positive';
 if(n<0)return 'negative';
 return 'neutral';
}
function gameBuildingDetailHTML1300(cityId,buildingId){
 const game=profile.activeGame,c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!game||!c||!building)return '';
 const owned=game.ownedCities?.includes(cityId),state=gameProvinceBuildingState(c),row=state.buildings.find(x=>x.id===buildingId);if(!row)return '';
 const coastal=isCoastalCity1300(c),e=game.economy=normaliseGameEconomy1300(game.economy),maxLevel=row.maxLevel||buildingMaxLevel1300(row),stateOnly=row.id==='walls',maxed=row.level>=maxLevel,blocked=row.requiresCoast&&!coastal,unavailable=!row.available&&row.level===0,pending=!!row.construction,canBuy=owned&&!pending&&!maxed&&!blocked&&!unavailable&&game.florins>=row.cost,m=owned&&!stateOnly?gameSectorMetrics1300(game,c.id,row.id):null,override=owned&&!stateOnly&&Number.isFinite(Number(e.buildingWages?.[c.id]?.[row.id])),effectiveWage=owned&&!stateOnly?effectiveBuildingWage1300(game,c.id,row.id):0,policy=owned&&!stateOnly?companyPolicy1300(game,c.id,row.id):null,productionMethods=owned&&!stateOnly?productionMethodsForBuilding1300(row.id):[],activeMethod=owned&&!stateOnly?resolvedProductionMethod1300(game,row.id,policy.productionMethod):null,buttonText=!owned?'FOREIGN':pending?'CONSTRUCTING':unavailable?'UNAVAILABLE':maxed?'MAX LEVEL':blocked?'NEEDS PORT':row.level?'UPGRADE':'BUILD',constructionPct=pending?constructionProgress1300(game,row.construction):0;
 const employment=m?Math.round((m.workers/Math.max(1,m.capacity))*100):0,throughput=m?Math.round((m.throughput||0)*100):0;
 return `<section class="building-detail-view">
  <div class="building-detail-toolbar"><button data-action="game-building-detail-back" class="building-detail-back" aria-label="Back to buildings">← <span>Back</span></button><span>${esc(displayCityName1300(c))}</span></div>
  <div class="building-detail-hero">
   <div class="building-detail-icon">${buildingPicture1300(row.id)}</div>
   <div><span class="building-detail-category">${esc(row.category)}</span><h2>${esc(row.name)}</h2><strong>Level ${row.level} / ${maxLevel}</strong><p>${esc(unavailable?row.availabilityReason:row.description)}</p>${buildingEffectText(row)?`<em>${esc(buildingEffectText(row))}</em>`:''}</div>
  </div>
  ${pending?`<section class="building-construction-status"><div><span>CONSTRUCTION IN PROGRESS</span><strong>${row.level===0?'New building':`Level ${row.level} → ${Math.min(maxLevel,row.level+1)}`}</strong><small>Finishes ${constructionFinishText1300(row.construction)}</small></div><b>${constructionPct}%</b><i><em style="width:${constructionPct}%"></em></i></section>`:''}
  ${owned&&row.level>0&&!stateOnly?`<div class="building-detail-section"><div class="building-detail-section-title"><span>PRODUCTION</span><small>Live weekly market simulation</small></div>
   <div class="building-flow-grid"><button class="building-flow-method-button" data-action="game-production-methods" data-city="${c.id}" data-id="${row.id}" type="button"><span>INPUTS</span><strong>${esc(goodFlowText1300(m.inputs))}</strong><small>${esc(activeMethod?.name||'Production method')} · click to change</small></button><article><span>OUTPUTS</span><strong>${esc(goodFlowText1300(m.outputs))}${Number(m.directFlorins)>0?` · Florins +ƒ${money1300(m.directFlorins)}`:''}</strong></article></div>
   <div class="building-detail-progress"><div><span>Throughput</span><strong>${throughput}%</strong></div><i><b style="width:${Math.max(0,Math.min(100,throughput))}%"></b></i></div>
   <div class="building-detail-progress"><div><span>Employment</span><strong>${employment}%</strong></div><i><b style="width:${Math.max(0,Math.min(100,employment))}%"></b></i></div>
  </div>
  <div class="building-detail-section building-detail-wage-section"><div class="building-detail-wage"><div><span>Minimum wage</span><small>${override?'Custom wage':'Inherited wage'} · monthly wage per worker</small></div>${wageStepper1300('building',c.id,row.id,effectiveWage,override)}</div></div>
  <div class="building-detail-section company-control-section">
   <div class="building-detail-section-title"><span>COMPANY CONTROL</span><small>Independent for this company</small></div>
   <label class="company-control-slider"><div><span>Employment target</span><strong data-company-target-value="${c.id}:${row.id}">${policy.employmentTarget}%</strong></div><input type="range" min="0" max="100" step="5" value="${policy.employmentTarget}" data-company-target data-city="${c.id}" data-id="${row.id}" aria-label="Employment target for ${esc(row.name)}"></label>
   <label class="company-control-slider"><div><span>Building support</span><strong data-company-support-value="${c.id}:${row.id}">ƒ${money1300(policy.buildingSupport)}/week</strong></div><input type="range" min="0" max="10" step="0.10" value="${policy.buildingSupport}" data-company-support data-city="${c.id}" data-id="${row.id}" aria-label="Building support for ${esc(row.name)}"><small>The state contributes up to this amount every week to the company, offsetting part of its operating costs and protecting its treasury.</small></label>
   <label class="company-control-priority"><span>Operating mode</span><select data-company-priority data-city="${c.id}" data-id="${row.id}" aria-label="Operating mode for ${esc(row.name)}"><option value="employment" ${policy.priority==='employment'?'selected':''}>Employment</option><option value="output" ${policy.priority==='output'?'selected':''}>Output</option></select><small>${policy.priority==='employment'?`Raises wages automatically while understaffed (current effective wage ƒ${money1300(m.wage)}). Best when you want to fill jobs.`:'Buys more inputs, accepts more imports and pushes maximum throughput. Best when the workforce is nearly full.'}</small></label>
  </div>
  <div class="building-detail-section"><div class="building-detail-section-title"><span>FINANCES</span><small>Per week</small></div>
   <div class="building-workers-card"><span>WORKERS</span><strong>${compactBuildingWorkers1300(m.workers)} <small>/ ${compactBuildingWorkers1300(m.capacity)}</small></strong></div>
   <div class="building-finance-list">
    <div><span>Company treasury</span><strong class="${buildingMoneyTone1300(m.treasury??companyTreasury1300(game,c.id,row.id))}">${(m.treasury??companyTreasury1300(game,c.id,row.id))<0?'-':''}ƒ${money1300(Math.abs(m.treasury??companyTreasury1300(game,c.id,row.id)))}</strong><small>${(m.treasury??companyTreasury1300(game,c.id,row.id))<0?'Bankrupt · wages unpaid and workers leave':(m.treasury??companyTreasury1300(game,c.id,row.id))<50?'Low cash · workforce is shrinking':'Healthy cash reserve'}</small></div>
    <div><span>Revenue</span><strong class="${buildingMoneyTone1300(m.gross)}">+ƒ${money1300(Math.abs(m.gross||0))}</strong></div>
    <div><span>Input costs</span><strong class="${buildingMoneyTone1300(m.inputCost,{cost:true})}">-ƒ${money1300(Math.abs(m.inputCost||0))}</strong></div>
    <div><span>Wages</span><strong class="${buildingMoneyTone1300(m.wageBill,{cost:true})}">-ƒ${money1300(Math.abs(m.wageBill||0))}</strong>${Number(m.unpaidWages)>0?`<small class="negative">Unpaid: ƒ${money1300(m.unpaidWages)}</small>`:''}</div>
    <div><span>Building support</span><strong class="positive">+ƒ${money1300(Number(m.stateSupport)||policy.buildingSupport)}</strong><small>Paid by the state each week</small></div>
    <div class="profit"><span>Profit</span><strong class="${buildingMoneyTone1300(m.profit)}">${m.profit>=0?'+':'-'}ƒ${money1300(Math.abs(m.profit||0))}</strong><small>Tax paid: -ƒ${money1300(Math.abs(m.tax||0))} · cashflow after support ${Number(m.netCash)>=0?'+':'-'}ƒ${money1300(Math.abs(Number(m.netCash)||0))}</small></div>
   </div>
  </div>`:''}
  ${owned&&stateOnly&&row.level>0?`<div class="building-detail-section"><div class="building-detail-section-title"><span>FORTIFICATION COMMAND</span><small>State-funded defensive infrastructure</small></div><div class="building-finance-list"><div><span>Siege difficulty</span><strong class="positive">+${Number(row.levelEffects?.siegeDifficultyPct)||0}%</strong><small>Reserved for the battle/siege system</small></div><div><span>State upkeep</span><strong class="negative">-ƒ${money1300(Number(row.levelEffects?.fortificationUpkeep)||0)}/week</strong><small>Paid directly from the state treasury every Monday</small></div></div></div>`:''}
  ${owned?`<div class="building-detail-upgrade"><div><span>State treasury</span><strong>ƒ${money1300(game.florins)}</strong>${!pending&&row.cost!==null&&!maxed&&!blocked&&!unavailable?`<small>${buildingConstructionTimeText1300(row.constructionDays)}</small>`:''}</div><button ${canBuy?'':'disabled'} data-action="game-build-province" data-city="${c.id}" data-id="${row.id}"><span>${buttonText}</span>${row.cost!==null&&!pending&&!blocked&&!unavailable&&!maxed?`<strong>ƒ${Number(row.cost).toFixed(0)}</strong>`:''}</button>${row.level>0&&!pending?`<button class="building-demolish-button" data-action="game-demolish-building" data-city="${c.id}" data-id="${row.id}"><span>DEMOLISH</span><small>Remove 1 level · no refund</small></button>`:''}</div>`:''}
 </section>`;
}

function gameProvinceBuildingCatalogHTML1300(cityId){
 const game=profile.activeGame,c=CITY_1300[cityId];if(!game||!c||!game.ownedCities?.includes(cityId))return '';
 const state=gameProvinceBuildingState(c),coastal=isCoastalCity1300(c),rows=state.buildings.filter(row=>row.level===0&&row.available&&(!row.requiresCoast||coastal));
 return `<div class="province-side-head building-catalog-head" style="border-left-color:${game.playerColor}"><button class="province-side-close" data-action="close-game-province" aria-label="Close">×</button><span>NEW BUILDING</span><h2>${esc(displayCityName1300(c))}</h2><p>Choose a new sector for this province</p></div>
 ${gameProvinceTabsHTML1300()}
 <div class="province-side-scroll building-catalog-scroll">
  <div class="building-catalog-toolbar"><button data-action="game-building-catalog-back">← BACK TO BUILDINGS</button><div><span>CREATE A NEW BUILDING</span><strong>Available in ${esc(displayCityName1300(c))}</strong></div><em>Treasury ƒ${money1300(game.florins)}</em></div>
  <section class="building-catalog-list">${rows.length?rows.map(row=>{const pending=!!row.construction,canBuy=!pending&&game.florins>=row.cost,pct=pending?constructionProgress1300(game,row.construction):0;return `<article class="building-catalog-card ${pending?'constructing':''}"><button class="building-catalog-icon" data-action="game-building-detail" data-city="${c.id}" data-id="${row.id}" title="Open ${esc(row.name)} details">${buildingPicture1300(row.id)}<span>DETAILS</span></button><div class="building-catalog-copy"><span>${esc(row.category)}</span><strong>${esc(row.name)}</strong><p>${esc(row.description)}</p><em>${pending?`Construction ${pct}% · finishes ${constructionFinishText1300(row.construction)}`:esc(buildingEffectText(row))}</em></div><button class="building-catalog-buy" data-action="game-build-province" data-city="${c.id}" data-id="${row.id}" ${canBuy?'':'disabled'}><span>${pending?'CONSTRUCTING':'BUILD'}</span>${pending?`<small>${pct}%</small>`:`<strong>ƒ${Number(row.cost).toFixed(0)}</strong><small>${buildingConstructionTimeText1300(row.constructionDays)}</small>`}</button></article>`;}).join(''):'<div class="building-catalog-empty"><strong>No new buildings available</strong><p>Every currently available building type already exists here, or this province does not meet the requirements for another type yet.</p></div>'}</section>
 </div>`;
}

const MILITARY_UNIT_DESCRIPTION_1300={
 'levy-swordsmen':'Quickly raised local swordsmen. Cheap and weak; every recruited levy leaves the worker pool.',
 'shield-spearmen':'Disciplined spear-and-shield infantry forming the core of the professional army.',
 archers:'Professional bowmen with long range but lower durability.',
 crossbowmen:'Hard-hitting ranged troops unlocked by Crossbow Corps.',
 'men-at-arms':'Armoured heavy infantry unlocked by Organized Retinues.',
 knights:'Elite heavy cavalry unlocked by Combined Arms.'
};
function battleDialogHTML1300(game,b){
 const c=CITY_1300[b.cityId],army=militaryCityArmy1300(game,b.armyHomeId),supply=militarySupplyStatus1300(game,b.armyHomeId),commander=commanderForArmy1300(game,b.armyHomeId),playerTotal=militaryArmyTotal1300(game,b.armyHomeId),enemyTotal=battleUnitTotal1300(b.enemyUnits),days=Math.max(0,(Number(game.day)||0)-b.startedDay),canChange=game.day-b.lastTacticDay>=3,retreatCity=nearestPlayerRetreatCity1300(game,b.cityId),canRetreat=b.status==='active'&&!!retreatCity,defenderBonus=Number(b.defenderBonusPct)||BATTLE_DEFENDER_BONUS_PCT_1300;
 return `<div class="battle-dialog">
  <span class="eyebrow">BATTLE · DAY ${days+1}</span><h2>${esc(displayCityName1300(c))}</h2><p>${esc(army?.name||'Your army')} against ${esc(b.enemyCountry||c.country)}.</p>
  <div class="battle-sides"><article><span>YOUR ARMY</span><strong>${strengthNumber(playerTotal)}</strong><small>Morale ${Math.round(b.playerMorale)}% · Supply ${Math.round(supply.overall*100)}%</small><i><b style="width:${clamp1300(b.playerMorale,0,100)}%"></b></i></article><article><span>DEFENDERS</span><strong>${strengthNumber(enemyTotal)}</strong><small>Morale ${Math.round(b.enemyMorale)}%</small><i><b style="width:${clamp1300(b.enemyMorale,0,100)}%"></b></i></article></div>
  <div class="battle-summary-grid"><span>Commander<strong>${esc(commander?.name||'No commander')}</strong></span><span>Your losses<strong class="negative">${strengthNumber(b.playerCasualties)}</strong></span><span>Enemy losses<strong>${strengthNumber(b.enemyCasualties)}</strong></span><span>Defender bonus<strong>+${defenderBonus}% DEF</strong></span><span>Status<strong>${esc(b.status.toUpperCase())}</strong></span></div>
  <div class="battle-tactics"><div><span>TACTICS</span><small>${canChange?'Choose a new order':'Can change again in '+Math.max(0,3-(game.day-b.lastTacticDay))+'d'}</small></div><div class="battle-tactic-buttons">${Object.entries(BATTLE_TACTICS_1300).map(([id,t])=>`<button data-action="battle-tactic" data-battle="${b.id}" data-tactic="${id}" class="${b.playerTactic===id?'active':''}" ${b.status!=='active'||!canChange?'disabled':''}><strong>${esc(t.name)}</strong><small>${esc(t.summary)}</small></button>`).join('')}</div></div>
  ${b.status==='active'?`<div class="battle-retreat"><button data-action="battle-retreat" data-battle="${b.id}" ${canRetreat?'':'disabled'}>RETREAT</button><small>${canRetreat?'Withdraw to '+esc(displayCityName1300(CITY_1300[retreatCity]))+'. Withdrawal may cause extra casualties.':'No bordering friendly province: retreat is impossible.'}</small></div>`:`<div class="battle-result ${b.status}"><strong>${b.status==='won'?'VICTORY':b.status==='lost'?'DEFEAT':'ARMY WITHDREW'}</strong><small>This battle is finished. Province occupation and peace terms will be added with the later war-score system.</small></div>`}
  ${b.log?.length?`<div class="battle-log"><span>RECENT DAYS</span>${b.log.map(x=>`<div><b>Day ${x.day-b.startedDay+1}</b><small>${x.phase==='ranged'?'Ranged exchange':'Main engagement'} · You lost ${x.playerLoss}, enemy lost ${x.enemyLoss}</small></div>`).join('')}</div>`:''}
 </div>`;
}
function openBattleDialog1300(id){const game=profile.activeGame,b=ensureAdvancedMilitary1300(game)?.battles.find(x=>x.id===id);if(!game||!b)return;activeBattleDialogId=id;showDialog(battleDialogHTML1300(game,b),'battle-dialog-shell');}
function renderBattleDialog1300(id=activeBattleDialogId){const game=profile.activeGame,b=ensureAdvancedMilitary1300(game)?.battles.find(x=>x.id===id);if(!game||!b){activeBattleDialogId=null;return;}if(modal.open&&activeBattleDialogId===id)showDialog(battleDialogHTML1300(game,b),'battle-dialog-shell');}
function openBattleByCity1300(cityId){const b=activeBattleAtCity1300(profile.activeGame,cityId);if(b)openBattleDialog1300(b.id);}
function gameBattlePanelHTML1300(battleId){
 const game=profile.activeGame,b=ensureAdvancedMilitary1300(game)?.battles.find(x=>x.id===battleId);if(!game||!b)return '';
 const c=CITY_1300[b.cityId],army=militaryCityArmy1300(game,b.armyHomeId),playerTotal=militaryArmyTotal1300(game,b.armyHomeId),enemyTotal=battleUnitTotal1300(b.enemyUnits),days=Math.max(0,(Number(game.day)||0)-b.startedDay),defenderBonus=Number(b.defenderBonusPct)||BATTLE_DEFENDER_BONUS_PCT_1300,latest=b.log?.[0],playerPct=clamp1300(Number(b.playerMorale)||0,0,100),enemyPct=clamp1300(Number(b.enemyMorale)||0,0,100),status=String(b.status||'active'),retreatCity=nearestPlayerRetreatCity1300(game,b.cityId),canRetreat=status==='active'&&!!retreatCity;
 const resultLabel=status==='won'?'VICTORY':status==='lost'?'DEFEAT':status==='retreated'?'RETREATED':'BATTLE IN PROGRESS';
 return `<div class="province-side-head battle-side-head"><button class="province-side-close" data-action="battle-panel-close" aria-label="Close">×</button><span>BATTLE · DAY ${days+1}</span><h2>${esc(displayCityName1300(c))}</h2><p>${esc(army?.name||'Your army')} vs ${esc(b.enemyCountry||c?.country||'Defenders')}</p></div>
 <div class="province-side-scroll battle-side-scroll">
  <section class="battle-live-score"><article class="attacker"><span>YOUR ARMY</span><strong>${strengthNumber(playerTotal)}</strong><small>Attacker</small></article><i>VS</i><article class="defender"><span>DEFENDERS</span><strong>${strengthNumber(enemyTotal)}</strong><small>+${defenderBonus}% defense bonus</small></article></section>
  <section class="battle-morale-panel"><div><div><span>YOUR MORALE</span><strong>${Math.round(playerPct)}%</strong></div><i><b style="width:${playerPct}%"></b></i></div><div><div><span>DEFENDER MORALE</span><strong>${Math.round(enemyPct)}%</strong></div><i><b style="width:${enemyPct}%"></b></i></div></section>
  <section class="battle-live-summary"><div><span>TODAY · YOUR LOSSES</span><strong class="negative">${strengthNumber(latest?.day===game.day?latest.playerLoss:0)}</strong></div><div><span>TODAY · ENEMY LOSSES</span><strong>${strengthNumber(latest?.day===game.day?latest.enemyLoss:0)}</strong></div><div><span>TOTAL YOUR LOSSES</span><strong class="negative">${strengthNumber(b.playerCasualties)}</strong></div><div><span>TOTAL ENEMY LOSSES</span><strong>${strengthNumber(b.enemyCasualties)}</strong></div></section>
  <section class="battle-live-status ${status}"><span>STATUS</span><strong>${resultLabel}</strong><small>Battle calculations update once every in-game day.</small></section>
  ${status==='active'?`<button class="battle-panel-retreat" data-action="battle-retreat" data-battle="${b.id}" ${canRetreat?'':'disabled'}><strong>RETREAT</strong><small>${canRetreat?'Withdraw to '+esc(displayCityName1300(CITY_1300[retreatCity]))+'.':'No bordering friendly province. This army is trapped and must keep fighting.'}</small></button>`:`<section class="battle-finished-note"><strong>${resultLabel}</strong><small>${status==='retreated'?'Army withdrew to '+esc(displayCityName1300(CITY_1300[b.retreatCityId]))+'.':'This battle has ended.'}</small></section>`}
  <div class="battle-day-log-title"><span>DAILY CASUALTIES</span><small>Newest day first</small></div>
  <section class="battle-day-log">${b.log?.length?b.log.map(x=>`<article><div><strong>Day ${x.day-b.startedDay+1}</strong><small>${x.phase==='ranged'?'Ranged exchange':'Main engagement'}</small></div><span class="negative">−${strengthNumber(x.playerLoss)}</span><span>−${strengthNumber(x.enemyLoss)}</span><div class="battle-log-morale"><small>You ${Math.round(Number(x.playerMorale)||0)}%</small><small>Def ${Math.round(Number(x.enemyMorale)||0)}%</small></div></article>`).join(''):'<p>No casualties yet. The first combat update happens on the next in-game day.</p>'}</section>
 </div>`;
}
function renderGameBattlePanel1300(){
 const panel=$('#game-province-panel'),shell=$('.game-map-shell');if(!panel)return;
 if(!gameBattlePanelId){if(!gameProvincePanel&&!gameArmyPanelKey){panel.innerHTML='';panel.classList.remove('open');shell?.classList.remove('province-panel-open');}return;}
 const html=gameBattlePanelHTML1300(gameBattlePanelId);if(!html){gameBattlePanelId=null;renderGameProvincePanel();return;}
 const scroll=panel.querySelector('.battle-side-scroll')?.scrollTop||0;panel.innerHTML=html;panel.classList.add('open');shell?.classList.add('province-panel-open');const next=panel.querySelector('.battle-side-scroll');if(next)next.scrollTop=scroll;
}
function openGameBattlePanel1300(battleId){
 const game=profile.activeGame,b=ensureAdvancedMilitary1300(game)?.battles.find(x=>x.id===battleId);if(!game||!b)return;
 gameBattlePanelId=battleId;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;gameCountryPanel=false;gameDiplomacyCountry=null;renderGameCountryPanel1300();renderGameDiplomacyPanel1300();renderGameBattlePanel1300();
}


function gameSiegePanelHTML1300(siegeId){
 const game=profile.activeGame,m=ensureAdvancedMilitary1300(game),s=m?.sieges.find(x=>x.id===siegeId);if(!game||!s)return '';
 const c=CITY_1300[s.cityId],days=Math.max(0,(Number(game.day)||0)-(Number(s.startedDay)||0)),food=clamp1300(Number(s.foodPct)||0,0,100),unrest=clamp1300(Number(s.unrestPct)||0,0,100),chance=s.status==='active'?siegeSuccessChance1300(game,s):Number(s.lastChance)||100,strength=siegeStrength1300(game,s),fort=siegeFortificationPct1300(game,s.cityId),toRoll=s.status==='active'?Math.max(0,30-((Number(game.day)||0)-(Number(s.lastRollDay)||0))):0,status=s.status==='active'?'SIEGE IN PROGRESS':s.status==='won'?'CITY OCCUPIED':'SIEGE LIFTED';
 return `<div class="province-side-head siege-side-head"><button class="province-side-close" data-action="siege-panel-close" aria-label="Close">×</button><span>SIEGE · DAY ${days+1}</span><h2>${esc(displayCityName1300(c))}</h2><p>${esc(s.enemyCountry||c?.country||'Enemy province')}</p></div>
 <div class="province-side-scroll siege-side-scroll">
  <section class="siege-status-card"><div><span>STATUS</span><strong>${status}</strong><small>${s.status==='active'?'The city is cut off from outside supply.':'The siege is no longer active.'}</small></div><div><span>BESIEGING ARMY</span><strong>${strengthNumber(strength)}</strong><small>${(s.armyHomeIds||[]).length} army group${(s.armyHomeIds||[]).length===1?'':'s'}</small></div></section>
  <section class="siege-bars">
   <div><header><span>CITY FOOD</span><strong>${Math.round(food)}%</strong></header><i class="food"><b style="width:${food}%"></b></i><small>No outside trade or food deliveries reach the city while the siege continues.</small></div>
   <div><header><span>UNREST</span><strong>${Math.round(unrest)}%</strong></header><i class="unrest"><b style="width:${unrest}%"></b></i><small>Low food and low stability increase unrest and make surrender more likely.</small></div>
   <div><header><span>NEXT MONTHLY SURRENDER CHANCE</span><strong>${Math.round(chance)}%</strong></header><i class="chance"><b style="width:${chance}%"></b></i><small>${s.status==='active'?toRoll+' days until the next siege roll.':'Final siege roll completed.'}</small></div>
  </section>
  <section class="siege-factors"><div><span>Fortification resistance</span><strong>${fort?'-'+Math.round(fort*.25)+' pts':'None'}</strong></div><div><span>Time under siege</span><strong>${Math.floor(days/30)} month${Math.floor(days/30)===1?'':'s'}</strong></div><div><span>Food shortage</span><strong>${Math.round(100-food)}%</strong></div><div><span>Population unrest</span><strong>${Math.round(unrest)}%</strong></div></section>
  ${s.status==='won'?'<div class="siege-occupation-note"><strong>OCCUPIED</strong><small>The province remains legally owned by the enemy until a peace treaty transfers it.</small></div>':''}
  <div class="siege-log-title"><span>MONTHLY SIEGE ROLLS</span><small>Newest first</small></div>
  <section class="siege-log">${s.log?.length?s.log.map(x=>`<article><div><strong>Day ${Math.max(1,(Number(x.day)||0)-s.startedDay+1)}</strong><small>${x.type==='success'?'City surrendered':'City held out'}</small></div><span>Chance ${Math.round(Number(x.chance)||0)}%</span><span>Roll ${Number.isFinite(Number(x.roll))?Number(x.roll).toFixed(1):'—'}</span></article>`).join(''):'<p>The first surrender roll happens after 30 siege days.</p>'}</section>
  <div class="military-rule-note"><b>Siege rule:</b> the original owner cannot recruit troops in this province while it is besieged. Surrender chance rises with time, shortages and unrest.</div>
 </div>`;
}
function renderGameSiegePanel1300(){
 const panel=$('#game-province-panel'),shell=$('.game-map-shell');if(!panel)return;if(!gameSiegePanelId){if(!gameProvincePanel&&!gameArmyPanelKey&&!gameBattlePanelId){panel.innerHTML='';panel.classList.remove('open');shell?.classList.remove('province-panel-open');}return;}
 const html=gameSiegePanelHTML1300(gameSiegePanelId);if(!html){gameSiegePanelId=null;renderGameProvincePanel();return;}const scroll=panel.querySelector('.siege-side-scroll')?.scrollTop||0;panel.innerHTML=html;panel.classList.add('open');shell?.classList.add('province-panel-open');const next=panel.querySelector('.siege-side-scroll');if(next)next.scrollTop=scroll;
}
function openGameSiegePanel1300(siegeId){
 const game=profile.activeGame,s=ensureAdvancedMilitary1300(game)?.sieges.find(x=>x.id===siegeId);if(!game||!s)return;gameSiegePanelId=siegeId;gameBattlePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;gameCountryPanel=false;gameDiplomacyCountry=null;renderGameCountryPanel1300();renderGameDiplomacyPanel1300();renderGameSiegePanel1300();
}

function provinceMilitaryHTML1300(game,c){
 const m=ensureAdvancedMilitary1300(game),army=militaryCityArmy1300(game,c.id),prof=militaryProfessionalCountCity1300(game,c.id),levy=militaryLevyCountCity1300(game,c.id),workerDraw=militaryWorkerPoolDraw1300(game,c.id),queues=m.trainingQueues.filter(q=>q.cityId===c.id),levyOrders=m.levyOrders.filter(q=>q.cityId===c.id),unlocked=new Set(normaliseTechnologyState1300(game.technology).unlocked),supply=militarySupplyStatus1300(game,c.id),commander=commanderForArmy1300(game,c.id),movement=movementForArmy1300(game,c.id),battle=activeBattleForArmy1300(game,c.id),recentBattles=m.battles.filter(b=>b.armyHomeId===c.id).slice(-4).reverse(),location=CITY_1300[army?.location||c.id]||c;
 const orders=[
  ...queues.map(q=>{const u=MILITARY_UNIT_1300[q.unitId],left=Math.max(0,q.finishDay-game.day),pct=Math.round(clamp1300((game.day-q.startDay)/Math.max(1,q.finishDay-q.startDay)*100,0,100));return `<article><div><strong>${q.amount} ${esc(u.name)}</strong><small>Professional training - whole group joins at completion</small></div><span>${left}d - ${pct}%</span><button data-action="military-cancel-order" data-order="${esc(q.id)}">CANCEL</button></article>`;}),
  ...levyOrders.map(q=>`<article><div><strong>${q.remaining} / ${q.requested} Levy Swordsmen remaining</strong><small>Raised from worker pool - up to ${levyDailyRate1300(game,c.id)}/day</small></div><span>ACTIVE</span><button data-action="military-cancel-order" data-order="${esc(q.id)}">CANCEL</button></article>`)
 ];
 const hired=m.commanders,available=COMMANDER_TEMPLATES_1300.filter(t=>!hired.some(x=>x.templateId===t.id));
 const targetMap=new Map();for(const id of game.ownedCities||[]){const row=CITY_1300[id];if(row)targetMap.set(row.id,row);}for(const row of warTargetCities1300(game))targetMap.set(row.id,row);
 const targets=[...targetMap.values()].filter(x=>x.id!==(army?.location||c.id));
 return `<section class="province-military-panel">
  <div class="province-military-heading"><div><span>CITY ARMY</span><strong>${esc(army?.name||('Army of '+displayCityName1300(c)))}</strong></div><small><b>${strengthNumber(prof)}</b> professional - <b>${strengthNumber(levy)}</b> levy - ${strengthNumber(workerDraw)} drawn from worker pool</small></div>
  <div class="army-status-grid"><span>LOCATION<strong>${esc(displayCityName1300(location))}</strong></span><span>MORALE<strong>${Math.round(Number(army?.morale)||100)}%</strong></span><span>FOOD SUPPLY<strong class="${supply.food<.7?'negative':'positive'}">${Math.round(supply.food*100)}%</strong></span><span>ARMS SUPPLY<strong class="${supply.arms<.7?'negative':'positive'}">${Math.round(supply.arms*100)}%</strong></span></div>
  ${battle?`<button class="active-battle-banner" data-action="battle-open" data-battle="${battle.id}"><span>ACTIVE BATTLE</span><strong>${esc(displayCityName1300(CITY_1300[battle.cityId]))}</strong><small>Open live battle panel</small></button>`:''}
  ${movement?`<div class="army-movement-banner"><span>MARCHING</span><strong>${esc(displayCityName1300(CITY_1300[movement.to]))}</strong><small>${Math.max(0,movement.finishDay-game.day)} days remaining</small></div>`:!battle&&targets.length?`<div class="army-march-control"><div><span>MARC / ATTACK</span><small>Enemy provinces can only be entered while at war.</small></div><select data-army-march-target>${targets.map(x=>{const owner=campaignCityOwner1300(game,x),enemy=owner!==gameCountryName1300(game);return `<option value="${x.id}">${esc(displayCityName1300(x))}${enemy?' - '+esc(owner):' - your realm'}</option>`;}).join('')}</select><button data-action="army-march" data-city="${c.id}">MARCH</button></div>`:''}
  <div class="province-military-units">${MILITARY_UNITS_1300.map(u=>{const count=militaryUnitCount1300(game,c.id,u.id),locked=!!u.tech&&!unlocked.has(u.tech),queued=queues.filter(q=>q.unitId===u.id).reduce((n,q)=>n+q.amount,0),isLevy=!u.professional;return `<article class="military-unit-card ${locked?'locked':''}" data-unit-card="${u.id}">
   <div class="military-unit-title"><div><span>${esc(u.category)}</span><strong>${esc(u.name)}</strong></div><b>${strengthNumber(count)}</b></div>
   <div class="military-unit-stats"><span>HP <b>${u.hp}</b></span><span>ATK <b>${u.attack}</b></span><span>RNG <b>${u.range}</b></span><span>&#402;; <b>${u.upkeep.toFixed(3)}</b>/wk</span></div>
   <p>${esc(MILITARY_UNIT_DESCRIPTION_1300[u.id]||'')}</p>
  ${queued?`<small class="military-queued">+${queued} training</small>`:''}
  ${locked?`<div class="military-tech-lock">REQUIRES ${esc(TECHNOLOGY_1300[u.tech]?.name||u.tech)}</div>`:`<div class="military-recruit-row"><input type="number" min="1" step="1" value="10" data-military-amount aria-label="Amount of ${esc(u.name)}"><button data-action="${isLevy?'military-raise-levy':'military-train'}" data-city="${c.id}" data-unit="${u.id}">${isLevy?'RAISE':'TRAIN'}${u.professional?` - ${u.trainingDays}d`:''}</button><button class="secondary" data-action="military-disband" data-city="${c.id}" data-unit="${u.id}" ${count?'':'disabled'}>DISBAND</button></div>`}
  </article>`;}).join('')}</div>
  ${orders.length?`<div class="military-order-list"><span>ACTIVE RECRUITMENT</span>${orders.join('')}</div>`:''}
  <div class="commander-section">
   <div class="commander-section-head"><div><span>COMMANDER</span><strong>${esc(commander?.name||'No commander assigned')}</strong></div><small>${commander?esc(commander.summary)+' - &#402;'+commander.upkeep.toFixed(2)+'/week':'You may hire several commanders, but only one can command this army.'}</small></div>
   ${hired.length?`<div class="commander-roster">${hired.map(x=>{const assigned=Object.entries(m.armiesByCity).find(([,a])=>a.commanderId===x.id)?.[0];return `<article><div><strong>${esc(x.name)}</strong><small>${esc(x.summary)} - &#402;${x.upkeep.toFixed(2)}/week${assigned?' - assigned to '+esc(displayCityName1300(CITY_1300[assigned])):''}</small></div><button data-action="commander-assign" data-city="${c.id}" data-commander="${x.id}" ${army?.commanderId===x.id?'disabled':''}>${army?.commanderId===x.id?'ASSIGNED':'ASSIGN'}</button><button class="secondary" data-action="commander-dismiss" data-commander="${x.id}">DISMISS</button></article>`;}).join('')}</div>`:''}
   ${available.length?`<div class="commander-candidates"><span>AVAILABLE COMMANDERS</span>${available.map(x=>`<article><div><strong>${esc(x.name)}</strong><small>${esc(x.summary)}</small></div><em>&#402;${x.upkeep.toFixed(2)}/week</em><button data-action="commander-hire" data-template="${x.id}">HIRE</button></article>`).join('')}</div>`:''}
  </div>
  ${recentBattles.length?`<div class="army-battle-history"><span>BATTLES</span>${recentBattles.map(b=>`<button data-action="battle-open" data-battle="${b.id}"><strong>${esc(displayCityName1300(CITY_1300[b.cityId]))}</strong><small>${b.status.toUpperCase()} - losses ${strengthNumber(b.playerCasualties)} / ${strengthNumber(b.enemyCasualties)}</small></button>`).join('')}</div>`:''}
  <div class="military-rule-note"><b>Population & supply:</b> every soldier is one real person. Levies leave the worker pool immediately. Professional troops use people outside the worker pool first. Armies increase Food and Arms demand; serious shortages reduce combat power and can cause attrition.</div>
 </section>`;
}


function createArmyDetachment1300(game,sourceKey,amounts){
 const m=ensureAdvancedMilitary1300(game),source=m?.armiesByCity?.[sourceKey];if(!source)return {ok:false,message:'Army not found.'};if(movementForArmy1300(game,sourceKey)||activeBattleForArmy1300(game,sourceKey))return {ok:false,message:'You cannot separate an army while it is marching or fighting.'};
 const picked={};let splitTotal=0,total=militaryArmyTotal1300(game,sourceKey);
 for(const u of MILITARY_UNITS_1300){const have=unitCount1300(m,sourceKey,u.id),n=Math.min(have,Math.max(0,Math.floor(Number(amounts?.[u.id])||0)));picked[u.id]=n;splitTotal+=n;}
 if(splitTotal<=0)return {ok:false,message:'Choose at least one soldier to separate.'};if(splitTotal>=total)return {ok:false,message:'Leave at least one soldier in the original army.'};
 for(const u of MILITARY_UNITS_1300)source.units[u.id]-=picked[u.id];
 const key='field-'+m.nextArmyGroupId++,origin=armyOriginCityId1300(game,sourceKey),nAtOrigin=Object.keys(m.armiesByCity).filter(k=>armyOriginCityId1300(game,k)===origin).length;
 m.armiesByCity[key]={id:'army-'+key,name:(nAtOrigin+1)+'th Detachment of '+displayCityName1300(CITY_1300[origin]),homeCityId:origin,location:source.location||origin,units:picked,morale:Number(source.morale)||100,commanderId:null};
 invalidateWeeklyBudgetProjection1300(game);return {ok:true,key,message:'Created a new '+splitTotal+' soldier detachment.'};
}
function unifyArmiesAtLocation1300(game,targetKey){
 const m=ensureAdvancedMilitary1300(game),target=m?.armiesByCity?.[targetKey];if(!target)return {ok:false,message:'Army not found.'};if(movementForArmy1300(game,targetKey)||activeBattleForArmy1300(game,targetKey))return {ok:false,message:'This army must be standing still before it can unify.'};
 const location=target.location||armyOriginCityId1300(game,targetKey),keys=armyKeysAtLocation1300(game,location,{standingOnly:true});if(keys.length<2)return {ok:false,message:'There is no second army here to unify with.'};
 let merged=0;for(const key of keys){if(key===targetKey)continue;const donor=m.armiesByCity[key];if(!donor)continue;for(const u of MILITARY_UNITS_1300){const n=unitCount1300(m,key,u.id);if(n){target.units[u.id]=(Number(target.units[u.id])||0)+n;merged+=n;donor.units[u.id]=0;}}if(!target.commanderId&&donor.commanderId){target.commanderId=donor.commanderId;donor.commanderId=null;}if(key.startsWith('field-'))delete m.armiesByCity[key];}
 invalidateWeeklyBudgetProjection1300(game);return {ok:true,message:'Unified '+merged+' soldiers into '+target.name+'.'};
}
function armyRouteLabel1300(move){
 if(!move)return '';const route=(move.route||[move.from,move.to]).map(id=>displayCityName1300(CITY_1300[id])).filter(Boolean);return route.join(' → ');
}
function gameArmyPanelHTML1300(armyKey){
 const game=profile.activeGame,m=ensureAdvancedMilitary1300(game),army=m?.armiesByCity?.[armyKey];if(!game||!army||militaryArmyTotal1300(game,armyKey)<=0)return '';
 const locationId=army.location||armyOriginCityId1300(game,armyKey),location=CITY_1300[locationId],origin=CITY_1300[armyOriginCityId1300(game,armyKey)],movement=movementForArmy1300(game,armyKey),battle=activeBattleForArmy1300(game,armyKey),supply=militarySupplyStatus1300(game,armyKey),commander=commanderForArmy1300(game,armyKey),atLocation=armyKeysAtLocation1300(game,locationId,{standingOnly:true}),total=militaryArmyTotal1300(game,armyKey);
 const routeDays=movement?Math.max(0,movement.finishDay-game.day)+movementRouteDays1300(game,armyKey,movement.route||[movement.from,movement.to],Math.max(1,(Number(movement.routeIndex)||0)+1)):0;
 return `<div class="province-side-head army-side-head" style="border-left-color:${game.playerColor}"><button class="province-side-close" data-action="army-panel-close" aria-label="Close">×</button><span>FIELD ARMY</span><h2>${esc(army.name)}</h2><p>${esc(displayCityName1300(location))}</p></div>
 <div class="province-side-scroll army-map-panel-scroll">
  <section class="army-map-hero"><div><span>TOTAL SOLDIERS</span><strong>${strengthNumber(total)}</strong><small>Origin: ${esc(displayCityName1300(origin))}</small></div><div><span>MORALE</span><strong>${Math.round(Number(army.morale)||100)}%</strong><small>${commander?esc(commander.name):'No commander assigned'}</small></div></section>
  <section class="army-map-status-grid"><div><span>FOOD SUPPLY</span><strong class="${supply.food<.7?'negative':'positive'}">${Math.round(supply.food*100)}%</strong></div><div><span>ARMS SUPPLY</span><strong class="${supply.arms<.7?'negative':'positive'}">${Math.round(supply.arms*100)}%</strong></div></section>
  ${movement?`<section class="army-map-route"><span>MARCHING</span><strong>${esc(armyRouteLabel1300(movement))}</strong><small>Current hop: ${Math.max(0,movement.finishDay-game.day)}d · estimated route remaining ${routeDays}d</small></section>`:''}
  ${battle?`<button class="active-battle-banner army-panel-battle" data-action="battle-open" data-battle="${battle.id}"><span>ACTIVE BATTLE</span><strong>${esc(displayCityName1300(CITY_1300[battle.cityId]))}</strong><small>Open live battle panel</small></button>`:''}
  <div class="army-map-section-title"><span>COMPOSITION</span><small>Selected field army</small></div>
  <section class="army-map-unit-list">${MILITARY_UNITS_1300.map(u=>{const n=unitCount1300(m,armyKey,u.id);return `<div><span>${esc(u.name)}</span><strong>${strengthNumber(n)}</strong><small>${u.professional?'Professional':'Levy'}</small></div>`;}).join('')}</section>
  ${atLocation.length>1?`<div class="army-map-section-title"><span>ARMIES IN THIS PROVINCE</span><small>${atLocation.length} separate armies</small></div><section class="army-map-stack-list">${atLocation.map(key=>{const a=m.armiesByCity[key];return `<button class="${key===armyKey?'active':''}" data-action="army-select-group" data-army-key="${esc(key)}"><span>${esc(a.name)}</span><strong>${strengthNumber(militaryArmyTotal1300(game,key))}</strong></button>`;}).join('')}</section>`:''}
  <section class="army-map-command">
   <button data-action="army-arm-move" class="${gameArmyMoveMode?'active':''}" ${movement||battle?'disabled':''}><strong>${gameArmyMoveMode?'CHOOSE DESTINATION':'MOVE ARMY'}</strong><small>${gameArmyMoveMode?'Left-click a legal province on the map.':'Right-click this army on the map, or click and drag it to a province.'}</small></button>
   <button data-action="army-unify" ${atLocation.length<2||movement||battle?'disabled':''}><strong>UNIFY ARMY</strong><small>Merge all of your armies standing in ${esc(displayCityName1300(location))} into this army.</small></button>
   <button data-action="army-split-toggle" ${movement||battle||total<2?'disabled':''}><strong>SEPARATE ARMY</strong><small>Choose soldiers to form a second field army in this province.</small></button>
  </section>
  ${gameArmySplitMode?`<section class="army-split-panel"><div><span>SEPARATE ARMY</span><small>Choose how many soldiers move into the new army.</small></div>${MILITARY_UNITS_1300.map(u=>{const n=unitCount1300(m,armyKey,u.id);return `<label><span>${esc(u.name)} <small>/ ${n}</small></span><input type="number" min="0" max="${n}" step="1" value="0" data-split-unit="${u.id}"></label>`;}).join('')}<button data-action="army-split-confirm">CREATE SEPARATE ARMY</button></section>`:''}
  <div class="military-rule-note"><b>Movement:</b> every hop must cross a shared province border. Each hop takes 3–10 days based on distance. Long orders are automatically routed province by province. You may only enter your own provinces or provinces of countries you are currently at war with.</div>
 </div>`;
}
function renderArmyMapPanel1300(){
 const panel=$('#game-province-panel'),shell=$('.game-map-shell');if(!panel)return;if(!gameArmyPanelKey){if(!gameProvincePanel){panel.innerHTML='';panel.classList.remove('open');shell?.classList.remove('province-panel-open');}return;}
 const html=gameArmyPanelHTML1300(gameArmyPanelKey);if(!html){gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;renderGameProvincePanel();return;}panel.innerHTML=html;panel.classList.add('open');shell?.classList.add('province-panel-open');
 if(world?.state?.game){const a=ensureAdvancedMilitary1300(profile.activeGame)?.armiesByCity?.[gameArmyPanelKey];world.state.game.selectedArmyCity=a?.location||null;world.state.game.armyMoveMode=gameArmyMoveMode;world.refresh();}
}
function openMapArmyPanel1300(locationId,intent='click'){
 const game=profile.activeGame;if(!game)return;const keys=armyKeysAtLocation1300(game,locationId,{standingOnly:false});if(!keys.length)return;const current=gameArmyPanelKey&&keys.includes(gameArmyPanelKey)?gameArmyPanelKey:keys.find(k=>!movementForArmy1300(game,k)&&!activeBattleForArmy1300(game,k))||keys[0];
 gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=current;gameArmySplitMode=false;gameArmyMoveMode=intent==='context'&&!movementForArmy1300(game,current)&&!activeBattleForArmy1300(game,current);gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;gameCountryPanel=false;gameDiplomacyCountry=null;renderGameCountryPanel1300();renderGameDiplomacyPanel1300();renderArmyMapPanel1300();
}
function orderSelectedArmyMovement1300(targetId,sourceLocation=null){
 const game=profile.activeGame;if(!game)return false;let key=gameArmyPanelKey;if(sourceLocation){const keys=armyKeysAtLocation1300(game,sourceLocation,{standingOnly:true});if(!key||!keys.includes(key))key=keys[0];}
 if(!key){toast('Select an army first.');return false;}const result=startArmyMovement1300(game,key,targetId);toast(result.message);if(!result.ok)return false;
 gameArmyPanelKey=key;gameArmyMoveMode=false;gameArmySplitMode=false;save();syncCampaignMilitaryOverlay1300(game);renderArmyMapPanel1300();return true;
}
function dragMapArmy1300(sourceLocation,targetId){const game=profile.activeGame;if(!game)return;const keys=armyKeysAtLocation1300(game,sourceLocation,{standingOnly:true});if(!keys.length)return;if(!gameArmyPanelKey||!keys.includes(gameArmyPanelKey))gameArmyPanelKey=keys[0];orderSelectedArmyMovement1300(targetId,sourceLocation);}

const GAME_PROVINCE_TABS_1300=[['general','GENERAL'],['army','ARMY'],['economy','ECONOMY']];
function gameProvinceTabsHTML1300(){
 return '<nav class="province-panel-tabs" aria-label="Province sections">'+GAME_PROVINCE_TABS_1300.map(([id,label])=>'<button type="button" data-action="game-province-tab" data-id="'+id+'" class="'+(gameProvinceTab===id?'active':'')+'" aria-selected="'+(gameProvinceTab===id?'true':'false')+'">'+label+'</button>').join('')+'</nav>';
}

function gameProvincePanelHTML(cityId){
 const game=profile.activeGame,c=CITY_1300[cityId];if(!game||!c)return '';
 if(!GAME_PROVINCE_TABS_1300.some(([id])=>id===gameProvinceTab))gameProvinceTab='general';
 if(gameProvinceBuildingDetail||gameProvinceBuildingCatalog)gameProvinceTab='economy';
 const owned=game.ownedCities?.includes(cityId),state=gameProvinceBuildingState(c),b=state.bonuses,coastal=isCoastalCity1300(c),e=game.economy=normaliseGameEconomy1300(game.economy),cap=owned?gameStatCap1300(game):100;
 const live=owned?provinceDynamicStats1300(game,c):{food:roundStat1300(Math.min(100,c.food+b.food)),economy:roundStat1300(Math.min(100,c.economyScore+b.economy)),technology:roundStat1300(Math.min(100,c.technology+b.technology)),stability:roundStat1300(Math.min(100,c.stability+b.stability)),cap:100},changes=e.lastStatChanges?.[cityId]||{},stats=[['Food',live.food,'food'],['Economy',live.economy,'economy'],['Technology',live.technology,'technology'],['Stability',live.stability,'stability']];
 const summary=owned?gameCityEconomySummary1300(game,cityId):null,prof=owned?professionalArmyState1300(game):null,cityOverride=Number.isFinite(Number(e.cityWages[cityId])),cityWage=effectiveCityWage1300(game,cityId),techMax=provinceTechnologyBudgetMax1300(c,game),techBudget=Math.min(Number(e.technologyBudgets?.[cityId])||0,techMax),techNeed=technologyBudgetNeed1300(c,game),populationNow=owned?effectivePopulation1300(game,c):Number(c.people)||0,popDemo=owned?(e.populationDemography?.[cityId]||provinceDemographyProjection1300(game,c)):null;
 const detail=gameProvinceBuildingDetail?gameBuildingDetailHTML1300(cityId,gameProvinceBuildingDetail):'';
 if(gameProvinceBuildingDetail&&!detail)gameProvinceBuildingDetail=null;
 if(detail)return `<div class="province-side-head detail-open" style="border-left-color:${owned?game.playerColor:'#8a8174'}"><button class="province-side-close" data-action="close-game-province" aria-label="Close">×</button><span>${owned?'YOUR PROVINCE':'VISIBLE PROVINCE'}</span><h2>${esc(displayCityName1300(c))}</h2><p>${owned?'Your Realm':esc(c.country)}</p></div>${gameProvinceTabsHTML1300()}<div class="province-side-scroll building-detail-scroll">${detail}</div>`;
 if(gameProvinceBuildingCatalog&&owned)return gameProvinceBuildingCatalogHTML1300(cityId);
 const existing=state.buildings.filter(row=>row.level>0);
 return `<div class="province-side-head" style="border-left-color:${owned?game.playerColor:'#8a8174'}"><button class="province-side-close" data-action="close-game-province" aria-label="Close">×</button><span>${owned?'YOUR PROVINCE':'VISIBLE PROVINCE'}</span><h2>${esc(displayCityName1300(c))}</h2><p>${owned?'Your Realm':esc(c.country)}</p></div>
 ${gameProvinceTabsHTML1300()}
 ${gameProvinceTab==='economy'&&owned?`<div class="workforce-summary province-economy-summary"><span><strong>${strengthNumber(summary.workers)}</strong><small>EMPLOYED</small></span><span><strong>${strengthNumber(summary.labour)}</strong><small>WORKER POOL</small></span><span><strong class="${summary.profit<0?'negative':''}">${summary.profit>=0?'+':'-'}ƒ${money1300(Math.abs(summary.profit))}</strong><small>PROFIT / WEEK</small></span></div>`:''}
 <div class="province-side-scroll">
  ${gameProvinceTab==='general'?`<section class="province-side-facts ${coastal?'has-navy':'no-navy'}"><div class="province-population-fact"><span>Population</span><strong>${strengthNumber(populationNow)}</strong>${owned&&popDemo?`<small class="${Number(popDemo.change)>0?'positive':Number(popDemo.change)<0?'negative':'neutral'}">${Number(popDemo.change)>0?'+':''}${Number(popDemo.change)||0} last week · ${Number(popDemo.annualGrowthPct).toFixed(2)}%/yr</small>`:''}</div>${coastal?`<div><span>Navy</span><strong>${strengthNumber(c.navy+b.navy)}</strong></div>`:''}<div><span>Professional army</span><strong>${strengthNumber(owned?(prof?.byCity[c.id]||0):c.army)}</strong></div><div><span>Unprofessional army</span><strong>${owned?strengthNumber(unprofessionalArmyState1300(game).byCity[c.id]||0):'—'}</strong></div></section>
  <section class="province-side-stats dynamic">${stats.map(([label,value,key])=>{const change=Number(changes[key])||0,pct=cap?clamp1300(value/cap*100,0,100):0;return `<div><span>${label}</span><strong>${Number(value).toFixed(2)} <small>/ ${cap.toFixed(2)}</small></strong><em class="${change>0?'positive':change<0?'negative':'neutral'}">${change>0?'+':''}${change.toFixed(2)} this week</em><i><b style="width:${pct}%"></b></i></div>`;}).join('')}</section>
  ${owned?`<section class="province-economic-policy"><div class="policy-heading"><span>PROVINCE POLICY</span><small>National tax and realm wage are set in the country Economy tab</small></div>
   <div class="policy-row"><div><strong>Province minimum wage</strong><small>${cityOverride?'Custom monthly wage':'Inherits realm monthly wage'} · per worker / month</small></div>${wageStepper1300('city',cityId,null,cityWage,cityOverride)}</div>
   <div class="policy-row technology-investment-row"><div><strong>Technology investment</strong><small>Recommended ƒ${money1300(techNeed)}/week · directly affects this province${Number(b.technologyInvestmentPct)>0?` · building effectiveness +${Number(b.technologyInvestmentPct)}%`:''}</small></div><div class="province-tech-slider"><strong data-tech-budget-value="${c.id}">ƒ${money1300(techBudget)}</strong><input data-tech-budget-city="${c.id}" type="range" min="0" max="${techMax}" step="0.01" value="${techBudget}" aria-label="Technology investment in ${esc(displayCityName1300(c))}"><small>ƒ0.00 — ƒ${money1300(techMax)}</small></div></div>
  </section>`:''}`:''}
  ${gameProvinceTab==='army'?(owned?provinceMilitaryHTML1300(game,c):`<section class="province-tab-empty"><span>ARMY</span><strong>Army management is only available in your own provinces.</strong></section>`):''}
  ${gameProvinceTab==='economy'?`${owned?provinceMarketHTML1300(game,c.id):''}
  <div class="province-building-header"><div><span>BUILDINGS IN THIS PROVINCE</span><strong>${existing.length} building type${existing.length===1?'':'s'}</strong></div><small>${owned?`Treasury <b>ƒ${money1300(game.florins)}</b>`:'Foreign province'}</small></div>
  <section class="province-building-cards compact-owned-buildings">${existing.length?existing.map(row=>{
   const maxLevel=row.maxLevel||buildingMaxLevel1300(row),maxed=row.level>=maxLevel,pending=!!row.construction,stateOnly=row.id==='walls',m=owned&&!stateOnly?gameSectorMetrics1300(game,c.id,row.id):null,canUpgrade=owned&&!pending&&!maxed&&game.florins>=row.cost,profit=Number(m?.profit)||0;
   return `<article class="province-building-card owned-building-card ${maxed?'maxed':''} ${pending?'constructing':''}">
    <div class="owned-building-title"><strong>${esc(row.name)}</strong><span>LV ${row.level}/${maxLevel}</span></div>
    <button class="province-building-picture building-detail-trigger" data-action="game-building-detail" data-city="${c.id}" data-id="${row.id}" title="Open ${esc(row.name)} details" aria-label="Open ${esc(row.name)} details">${buildingPicture1300(row.id)}<span>DETAILS</span></button>
    <div class="owned-building-main">${owned?(stateOnly?`<div class="owned-building-metrics"><div><span>SIEGE DIFFICULTY</span><strong>+${Number(row.levelEffects?.siegeDifficultyPct)||0}%</strong></div><div><span>STATE UPKEEP</span><strong class="negative">-ƒ${money1300(Number(row.levelEffects?.fortificationUpkeep)||0)}/week</strong></div></div>`:`<div class="owned-building-metrics"><div><span>HIRED</span><strong>${compactBuildingWorkers1300(m.workers)} <small>/ ${compactBuildingWorkers1300(m.capacity)}</small></strong></div><div><span>WEEKLY PROFIT</span><strong class="${profit<0?'negative':'positive'}">${profit>=0?'+':'-'}ƒ${money1300(Math.abs(profit))}</strong></div></div>`):`<div class="owned-building-metrics foreign"><div><span>STATUS</span><strong>FOREIGN BUILDING</strong></div></div>`}</div>
    <div class="province-building-buy compact-upgrade"><button ${canUpgrade?'':'disabled'} data-action="game-build-province" data-city="${c.id}" data-id="${row.id}"><span>${pending?`BUILDING ${constructionProgress1300(game,row.construction)}%`:maxed?'MAX LEVEL':owned?'UPGRADE':'FOREIGN'}</span>${row.cost!==null&&owned&&!pending&&!maxed?`<strong>ƒ${Number(row.cost).toFixed(0)}</strong><small>${buildingConstructionTimeText1300(row.constructionDays)}</small>`:''}</button></div>
   </article>`;
  }).join(''):'<div class="owned-building-empty"><strong>No buildings yet</strong><p>Create the first building for this province below.</p></div>'}</section>
  ${owned?`<div class="create-building-wrap"><button class="create-new-building" data-action="game-building-catalog-open"><span>＋</span><div><strong>CREATE A NEW BUILDING</strong><small>Choose from buildings this province can support</small></div></button></div>`:''}`:''}
 </div>`;
}
function renderGameProvincePanel(){
 const panel=$('#game-province-panel'),shell=$('.game-map-shell');if(!panel)return;if(gameBattlePanelId){renderGameBattlePanel1300();return;}if(gameSiegePanelId){renderGameSiegePanel1300();return;}if(gameArmyPanelKey){renderArmyMapPanel1300();return;}
 if(!gameProvincePanel||!CITY_1300[gameProvincePanel]){panel.innerHTML='';panel.classList.remove('open');shell?.classList.remove('province-panel-open');if(world?.state?.game){world.state.game.selectedArmyCity=null;world.state.game.armyMoveMode=false;world.refresh();}return;}
 const scroll=panel.querySelector('.province-side-scroll')?.scrollTop||0;panel.innerHTML=gameProvincePanelHTML(gameProvincePanel);panel.classList.add('open');shell?.classList.add('province-panel-open');const next=panel.querySelector('.province-side-scroll');if(next)next.scrollTop=scroll;
}
function buyGameProvinceBuilding(cityId,buildingId){
 const game=profile.activeGame,c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!game||!c||!building)return;
 if(!game.ownedCities?.includes(cityId)){toast('You can only build in provinces you own.');return;}
 const row=gameProvinceBuildingState(c).buildings.find(x=>x.id===buildingId);if(!row||row.level>=(row.maxLevel||buildingMaxLevel1300(row)))return;
 if(row.construction){toast(building.name+' is already under construction.');return;}
 if(!row.available&&row.level===0){toast(row.availabilityReason);return;}if(building.requiresCoast&&!isCoastalCity1300(c)){toast('This building requires real access to the sea. River ports do not count as coastal access.');return;}
 if(game.florins<row.cost){toast('You need ƒ'+money1300(row.cost-game.florins)+' more in-game Florins.');return;}
 const days=buildingConstructionDays1300(row),startDay=Number(game.day)||0,completeDay=startDay+days;
 game.florins=Math.round((game.florins-row.cost)*100)/100;game.construction??={};game.construction[cityId]??={};game.construction[cityId][buildingId]={cityId,buildingId,startDay,completeDay,days,cost:row.cost,fromLevel:row.level,toLevel:row.level+1};
 invalidateWeeklyBudgetProjection1300(game);save();renderGameProvincePanel();refreshGameClockUI1300();toast(building.name+' '+(row.level?'upgrade':'construction')+' started in '+displayCityName1300(c)+'. Ready in '+buildingConstructionTimeText1300(days)+'.');
}
function demolishGameProvinceBuilding1300(cityId,buildingId){
 const game=profile.activeGame,c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!game||!c||!building||!game.ownedCities?.includes(cityId))return;
 const row=gameProvinceBuildingState(c).buildings.find(x=>x.id===buildingId);if(!row||row.level<=0)return;if(row.construction){toast('Finish the current construction before demolishing this building.');return;}
 if(!confirm('Demolish one level of '+building.name+' in '+displayCityName1300(c)+'? You will not receive a refund.'))return;
 game.buildings??={};game.buildings[cityId]??={};game.buildings[cityId][buildingId]=(Number(game.buildings[cityId][buildingId])||0)-1;
 const next=gameProvinceBuildingState(c).buildings.find(x=>x.id===buildingId);if(!next||next.level<=0){if(game.economy.employment?.[cityId])game.economy.employment[cityId][buildingId]=0;if(game.economy.companyPolicies?.[cityId])delete game.economy.companyPolicies[cityId][buildingId];if(game.economy.buildingWages?.[cityId])delete game.economy.buildingWages[cityId][buildingId];if(game.economy.companyTreasuries?.[cityId])delete game.economy.companyTreasuries[cityId][buildingId];}
 simulateGameEconomyDay1300(game,{forceMarket:true,collectRevenue:false});invalidateWeeklyBudgetProjection1300(game);save();renderGameProvincePanel();refreshGameClockUI1300();syncCampaignMilitaryOverlay1300(game);toast(building.name+' reduced to level '+(next?.level||0)+' in '+displayCityName1300(c)+'.');
}
function changeGameTax1300(delta){const g=profile.activeGame;if(!g)return;g.economy.taxRate=clamp1300(g.economy.taxRate+Number(delta),GAME_TAX_MIN,GAME_TAX_MAX);invalidateWeeklyBudgetProjection1300(g);save();renderGameProvincePanel();renderGameCountryPanel1300();refreshGameClockUI1300();}
function changeNationalWage1300(delta){const g=profile.activeGame;if(!g)return;g.economy.nationalWage=clamp1300(Math.round((g.economy.nationalWage+Number(delta))*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);invalidateWeeklyBudgetProjection1300(g);save();renderGameProvincePanel();renderGameCountryPanel1300();refreshGameClockUI1300();}
function setStabilityBudget1300(value){const g=profile.activeGame;if(!g)return;const max=stabilityBudgetMax1300(g);g.economy.stabilityBudget=clamp1300(roundStat1300(value),0,max);g.economy.monthExpenses=weeklyStateExpenses1300(g).total;invalidateWeeklyBudgetProjection1300(g);save();refreshWeeklyBudgetDOM1300(g);renderCampaignHudNotifications1300(g);const out=$('#stability-budget-value');if(out)out.textContent='ƒ'+money1300(g.economy.stabilityBudget);}
function setProvinceTechnologyBudget1300(cityId,value){
 const g=profile.activeGame,c=CITY_1300[cityId];if(!g||!c||!g.ownedCities?.includes(cityId))return;const max=provinceTechnologyBudgetMax1300(c,g),v=clamp1300(roundStat1300(value),0,max);g.economy.technologyBudgets[cityId]=v;g.economy.monthExpenses=weeklyStateExpenses1300(g).total;invalidateWeeklyBudgetProjection1300(g);save();refreshWeeklyBudgetDOM1300(g);renderCampaignHudNotifications1300(g);document.querySelectorAll('[data-tech-budget-value="'+cityId+'"]').forEach(el=>el.textContent='ƒ'+money1300(v));
}
function changeCityWage1300(cityId,delta){const g=profile.activeGame;if(!g)return;const current=effectiveCityWage1300(g,cityId);g.economy.cityWages[cityId]=clamp1300(Math.round((current+Number(delta))*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);invalidateWeeklyBudgetProjection1300(g);save();renderGameProvincePanel();refreshWeeklyBudgetDOM1300(g);}
function resetCityWage1300(cityId){const g=profile.activeGame;if(!g)return;delete g.economy.cityWages[cityId];invalidateWeeklyBudgetProjection1300(g);save();renderGameProvincePanel();refreshWeeklyBudgetDOM1300(g);}
function changeBuildingWage1300(cityId,buildingId,delta){const g=profile.activeGame;if(!g)return;g.economy.buildingWages[cityId]??={};const current=effectiveBuildingWage1300(g,cityId,buildingId);g.economy.buildingWages[cityId][buildingId]=clamp1300(Math.round((current+Number(delta))*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);invalidateWeeklyBudgetProjection1300(g);save();renderGameProvincePanel();refreshWeeklyBudgetDOM1300(g);}
function resetBuildingWage1300(cityId,buildingId){const g=profile.activeGame;if(!g)return;if(g.economy.buildingWages[cityId]){delete g.economy.buildingWages[cityId][buildingId];if(!Object.keys(g.economy.buildingWages[cityId]).length)delete g.economy.buildingWages[cityId];}invalidateWeeklyBudgetProjection1300(g);save();renderGameProvincePanel();refreshWeeklyBudgetDOM1300(g);}

function buildBuilding1300(cityId,buildingId){
 const c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!c||!building)return;
 const state=cityBuildingState(c),row=state.buildings.find(b=>b.id===buildingId);if(!row||row.level>=(row.maxLevel||buildingMaxLevel1300(row)))return;
 if(building.requiresCoast&&!isCoastalCity1300(c)){toast('This building requires real access to the sea. River ports do not count as coastal access.');return;}
 if(profile.florins<row.cost){toast(`You need ${(row.cost-profile.florins).toLocaleString('en-GB')} more florins.`);return;}
 profile.florins-=row.cost;
 profile.buildings[c.id]??={};profile.buildings[c.id][buildingId]=(profile.buildings[c.id][buildingId]||0)+1;
 save();render();toast(`${building.name} expanded in ${displayCityName1300(c)} for ${row.cost.toLocaleString('en-GB')} florins.`);
}

const isHistoricalFreeCity1300=country=>/^(Free Imperial City of|Free City of)\b/i.test(String(country||''));
const baselinePowerModifier1300=country=>isHistoricalFreeCity1300(country)?.75:1;
const campaignPowerModifier1300=(game,entry)=>{
 if(entry?.player){
  if(game?.campaignStage==='rebellion')return .50;
  if(game?.campaignStage==='free_cities')return .75;
  return 1;
 }
 return baselinePowerModifier1300(entry?.country);
};
const powerModifierLabel1300=(modifier,entry,game)=>{
 if(entry?.player&&game?.campaignStage==='rebellion')return 'Rebellion −50%';
 if(entry?.player&&game?.campaignStage==='free_cities')return 'Free Cities −25%';
 if(isHistoricalFreeCity1300(entry?.country))return 'Free City −25%';
 return 'No status penalty';
};

const countryRankings1300=()=>{
 const grouped=new Map();
 for(const c of [...CITIES_1300,...SUPPORT_TERRITORIES_1300]){
  const entry=grouped.get(c.country)||{country:c.country,cities:[],supportTerritories:[],population:0,army:0,navy:0,foodTotal:0,economyTotal:0,technologyTotal:0,stabilityTotal:0};
  entry.cities.push(c);
  if(c.supportTerritory)entry.supportTerritories.push(c);
  entry.population+=Number(c.people)||0;
  entry.army+=Number(c.army)||0;
  entry.navy+=Number(c.navy)||0;
  entry.foodTotal+=Number(c.food)||0;
  entry.economyTotal+=Number(c.economyScore)||0;
  entry.technologyTotal+=Number(c.technology)||0;
  entry.stabilityTotal+=Number(c.stability)||0;
  grouped.set(c.country,entry);
 }
 return [...grouped.values()].map(entry=>{
  const cityCount=entry.cities.length||1;
  const playableCityCount=entry.cities.filter(c=>!c.supportTerritory).length;
  const foodAvg=Math.round(entry.foodTotal/cityCount);
  const economyAvg=Math.round(entry.economyTotal/cityCount);
  const technologyAvg=Math.round(entry.technologyTotal/cityCount);
  const stabilityAvg=Math.round(entry.stabilityTotal/cityCount);
  const foodScore=foodAvg*50,economyScore=economyAvg*50,technologyScore=technologyAvg*50,stabilityScore=stabilityAvg*50;
  const populationScore=Math.round(entry.population/50),armyScore=Math.round(entry.army*2),navyScore=Math.round(entry.navy*10);
  const baseScore=foodScore+economyScore+technologyScore+stabilityScore+populationScore+armyScore+navyScore;
  const cityMultiplier=1+cityCount/50,powerModifier=baselinePowerModifier1300(entry.country),rawStrength=Math.round(baseScore*cityMultiplier),strength=Math.round(rawStrength*powerModifier);
  return {...entry,cityCount,playableCityCount,foodAvg,economyAvg,technologyAvg,stabilityAvg,foodScore,economyScore,technologyScore,stabilityScore,populationScore,armyScore,navyScore,baseScore,cityMultiplier,powerModifier,rawStrength,strength};
 }).sort((a,b)=>b.strength-a.strength||a.country.localeCompare(b.country)).map((entry,i)=>({...entry,rank:i+1}));
};
const RANKING_CATEGORIES_1300=[
 ['overall','Overall','strength','Total strength'],
 ['food','Food','foodAvg','Average /100'],
 ['economy','Economy','economyAvg','Average /100'],
 ['technology','Technology','technologyAvg','Average /100'],
 ['stability','Stability','stabilityAvg','Average /100'],
 ['population','Population','population','Total population'],
 ['army','Army','army','Total army'],
 ['navy','Navy','navy','Total navy']
];
const strengthNumber=n=>Math.round(n).toLocaleString('en-GB');
const rankingCategoryMeta=()=>RANKING_CATEGORIES_1300.find(([id])=>id===rankingCategory)||RANKING_CATEGORIES_1300[0];
const rankingRows1300=()=>{
 const [,label,key,unit]=rankingCategoryMeta();
 const rows=countryRankings1300().sort((a,b)=>b[key]-a[key]||b.strength-a.strength||a.country.localeCompare(b.country));
 return {label,key,unit,rows:rows.map((r,i)=>({...r,categoryRank:i+1,categoryValue:r[key]}))};
};
function button(text,action,cls='secondary',extra=''){return `<button class="btn ${cls}" data-action="${action}" ${extra}>${text}</button>`;}
function toast(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4200);}
function save(){
 if(!authUser||!currentAccountKey)return;
 try{localStorage.setItem(PROFILE_PREFIX+currentAccountKey,JSON.stringify(profile));}
 catch{storageFailed=true;toast('Browser storage is unavailable. Export your campaign from the guide.');}
}
function saveAccounts(){try{localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(accounts));}catch{storageFailed=true;}}
async function codeHash(name,code){
 const bytes=new TextEncoder().encode(name.toLowerCase()+'|'+code);
 const hash=await crypto.subtle.digest('SHA-256',bytes);
 return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function loginPage(){return `<main class="login-page"><section class="login-card"><div class="login-brand"><span class="brand-mark">${icon('crown')}</span><div><strong>CARDWARS</strong><small>THE AGE OF REALMS</small></div></div><span class="eyebrow">PLAYER PROFILE</span><h1>Enter the realm<span class="title-dot">.</span></h1><p>Use a player name and private code for a local profile on this device, or continue with Google once a Google OAuth Client ID is configured.</p><label>Player name<input id="login-name" maxlength="28" autocomplete="username" placeholder="Your name"></label><label>Code<input id="login-code" type="password" maxlength="32" autocomplete="current-password" placeholder="At least 4 characters"></label><button class="btn primary login-continue" data-action="auth-local">Continue</button><div class="login-separator"><span>or</span></div><div id="google-signin" class="google-signin-slot">${GOOGLE_CLIENT_ID?'Loading Google sign-in…':'<button disabled>Continue with Google</button><small>Add your Google OAuth Client ID to src/auth-config.js to activate this.</small>'}</div><small class="login-footnote">Local name + code accounts are stored only in this browser. They are a prototype login, not server-backed authentication.</small></section></main>`;}
function persistSession(key){currentAccountKey=key;authUser=accounts[key];localStorage.setItem(SESSION_KEY,key);}
function loadAccountProfile(key){
 const raw=localStorage.getItem(PROFILE_PREFIX+key);
 if(raw){const p=migrateProfile(JSON.parse(raw));if(p&&validateProfile(p))return p;}
 return freshProfile();
}
async function localAuth(){
 const name=$('#login-name')?.value.trim(),code=$('#login-code')?.value||'';
 if(!name||name.length<2){toast('Enter a player name of at least 2 characters.');return;}
 if(code.length<4){toast('Your code needs at least 4 characters.');return;}
 const key='local:'+name.toLowerCase(),hash=await codeHash(name,code),existing=accounts[key];
 if(existing&&existing.codeHash!==hash){toast('That code is not correct for this player name.');return;}
 if(!existing){
  accounts[key]={type:'local',name,codeHash:hash};
  saveAccounts();
  const firstLocal=Object.keys(accounts).filter(k=>k.startsWith('local:')).length===1;
  profile=firstLocal&&legacyProfile?legacyProfile:freshProfile();
 }else profile=loadAccountProfile(key);
 persistSession(key);ensureEconomyProfile(profile);ensureGameProfile(profile);save();render();
}
function decodeGoogleCredential(token){try{const payload=token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(decodeURIComponent(atob(payload).split('').map(c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('')));}catch{return null;}}
function handleGoogleCredential(response){
 const p=decodeGoogleCredential(response.credential);if(!p?.sub)return;
 const key='google:'+p.sub;
 accounts[key]={type:'google',name:p.name||p.email||'Google player',email:p.email||''};saveAccounts();
 profile=loadAccountProfile(key);persistSession(key);ensureEconomyProfile(profile);ensureGameProfile(profile);save();render();
}
function loadGoogleScript(){return new Promise((resolve,reject)=>{if(window.google?.accounts?.id)return resolve();const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;s.defer=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
async function setupGoogleLogin(){
 if(!GOOGLE_CLIENT_ID||!$('#google-signin'))return;
 try{await loadGoogleScript();if(!$('#google-signin'))return;google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:handleGoogleCredential});$('#google-signin').innerHTML='';google.accounts.id.renderButton($('#google-signin'),{theme:'outline',size:'large',width:320,text:'continue_with'});}catch{if($('#google-signin'))$('#google-signin').textContent='Google sign-in could not load.';}
}
function logoutAccount(){try{localStorage.removeItem(SESSION_KEY);}catch{}currentAccountKey=null;authUser=null;profile=freshProfile();view='collection';render();}
function onboardingPage(){
 const region=STARTER_REGION_BY_ID[profile.starterRegion];
 if(!profile.starterRegionClaimed)return `<main class="onboarding-page"><section class="onboarding-intro"><span class="eyebrow">FIRST CAMPAIGN · FREE STARTER PACK 1/2</span><h1>Choose your region<span class="title-dot">.</span></h1><p>Your region pack contains exactly <strong>5 Common, 2 Uncommon and 1 Rare</strong> city from that part of Europe. Your two free starter packs never draw a card you already own.</p></section><section class="region-choice-grid">${STARTER_REGIONS_1300.map(r=>{const pool=CITIES_1300.filter(c=>regionForCity1300(c)===r.id);return `<button data-action="starter-region" data-id="${r.id}"><span>${r.short}</span><strong>${r.name}</strong><p>${r.description}</p><small>${pool.length} possible 1300 cards · 8 free starter cards</small></button>`;}).join('')}</section></main>`;
 return `<main class="onboarding-page welcome-pack-page"><section class="welcome-pack-card"><span class="eyebrow">FREE STARTER PACK 2/2</span><h1>Your ${esc(region?.name||'regional')} cards are secured<span class="title-dot">.</span></h1><p>Now open one final free 8-card welcome pack. It avoids every card you already received, so your first two packs give you <strong>16 unique owned cards</strong> — exactly enough for your first deck.</p><div class="starter-progress"><span class="done">1 <small>REGION PACK</small></span><i></i><span>2 <small>WELCOME PACK</small></span></div><button class="btn primary large-button" data-action="starter-welcome">Open free welcome pack ${icon('arrow')}</button></section></main>`;
}
function flag(){return `<span class="realm-sigil" aria-hidden="true">${icon('crown')}</span>`;}
function header(){return `<header class="lobby-header"><button class="brand" data-action="collection" aria-label="Cardwars home"><span class="brand-mark">${icon('crown')}</span><span>CARDWARS<small>THE AGE OF REALMS</small></span></button><nav aria-label="Main navigation">${[['collection','cards','Collection'],['packs','pack','Packs'],['deck','cards','Deck'],['game','army','Game'],['rankings','star','Rankings'],['atlas','globe','Map']].map(([id,i,label])=>`<button class="${view===id?'active':''}" data-action="${id}">${icon(i)}<span>${label}</span></button>`).join('')}</nav><div class="header-tools"><span class="seal-count campaign-florins" title="Campaign treasury"><b>ƒ</b> <strong id="florin-total">${profile.florins.toLocaleString('en-GB')}</strong> <small>florins</small></span><button class="player-chip" data-action="logout" title="Log out"><strong>${esc(authUser?.name||'Player')}</strong><small>Log out</small></button><button class="reset-button" data-action="reset" title="Reset 1300 campaign progress">Reset</button><button class="icon-btn" data-action="help" aria-label="Game guide and saves">${icon('help')}</button></div></header>`;}
function footer(){const era=view==='rankings'?'COUNTRY STRENGTH · c. 1300 CE':'EUROPE · c. 1300 CE';return `<footer class="lobby-footer"><span>${era}</span><span class="save-note">${icon('save')} ${storageFailed?'Export a save to keep your progress':'Saved on this device'}</span><button data-action="sources">Historical notes & sources ${icon('arrow')}</button></footer>`;}
function stat(key,label,value){const icons={food:'wheat',army:'army',navy:'navy',people:'people',size:'size',technology:'tech',satisfaction:'happy'};return `<div class="stat"><span>${icon(icons[key])}${label}</span><strong>${value}</strong></div>`;}
function card1300(c,compact=false){const displayName=displayCityName1300(c),number=String(CITIES_1300.findIndex(x=>x.id===c.id)).padStart(3,'0'),upgraded=Number.isFinite(c.economyScore)&&Number.isFinite(c.stability),scores=upgraded?[['Food',c.food],['Economy',c.economyScore],['Technology',c.technology],['Stability',c.stability]]:[['Food',c.food],['Technology',c.technology],['Satisfaction',c.satisfaction]],art=CARD_ART_1300[c.id];return `<button class="city-card card-1300 rarity-${c.rarity} ${compact?'compact':''}" style="--rarity:${RARITY_COLORS_1300[c.rarity]}" data-action="card1300" data-id="${c.id}" aria-label="Inspect ${esc(displayName)}, ${esc(c.country)}, c. 1300"><div class="card-photo ${art?'card-photo-1300-art':'card-photo-placeholder'}">${art?`<img src="${art}" alt="Stylised historical reconstruction of ${esc(displayName)} around 1300" loading="${compact?'eager':'lazy'}">`:`<div class="photo-placeholder"><span>${icon('globe')}</span><strong>IMAGE RESERVED</strong><small>Historical artwork will be added later</small></div>`}<span class="rarity-chip">${icon(c.rarity>2?'star':'globe')}${RARITIES_1300[c.rarity]}</span><span class="card-number">1300-${number}</span><div class="card-city"><span class="card-country">${flag(c)} ${c.country}</span><h3 class="${displayName.length>16?'long-name':''}">${displayName}</h3><small>${c.subrealm} · c. 1300 CE</small></div></div><div class="card-stats">${stat('army','Army',c.armyText)}${stat('navy','Navy',c.navyText)}${stat('people','People',c.populationText)}${stat('size','Size',c.sizeText)}<div class="card-scores ${upgraded?'card-scores-4':''}">${scores.map(([label,n])=>`<div><span>${label}</span><strong>${n}<small>/100</small></strong><i style="--value:${n}%"></i></div>`).join('')}</div></div><div class="card-foot"><span>${icon('check')} Researched 1300 card</span><span>Population confidence: ${c.populationConfidence}</span></div></button>`;}
function render(){if(gameClockTimer){clearInterval(gameClockTimer);gameClockTimer=null;}world?.destroy();world=null;if(!authUser){app.className='lobby auth-view';app.innerHTML=loginPage();setupGoogleLogin();return;}if(!profile.onboardingComplete){app.className='lobby onboarding-view';app.innerHTML=onboardingPage();return;}const campaignMap=view==='game'&&!!profile.activeGame&&gameScreen==='map';app.className=view==='atlas'?'lobby atlas-view':campaignMap?'lobby atlas-view game-campaign-view':'lobby';app.innerHTML=(campaignMap?'':header())+(view==='collection'?collectionPage():view==='packs'?packs1300Page():view==='deck'?deckPage():view==='game'?gamePage():view==='rankings'?rankingsPage():atlasPage())+((view==='atlas'||campaignMap)?'':footer());if(view==='collection')renderGrid();if(view==='atlas'){renderAtlasPanel();mapState.selected=selected1300;mapState.collection={};mapState.game=null;world=new WorldMap($('#map-host'),mapState,id=>{selected1300=id;mapState.selected=id;atlasRegion=null;renderAtlasPanel();world.refresh();app.classList.add('show-panel');},region=>{atlasRegion=region;atlasSearch='';renderAtlasPanel();app.classList.add('show-panel');});}if(campaignMap){mapState.selected=selected1300;mapState.collection={};mapState.game={ownedCityIds:[...(profile.activeGame.ownedCities||profile.activeGame.hand)],cityOwners:{...(profile.activeGame.cityOwners||{})},playerColor:profile.activeGame.playerColor||profile.playerColor,playerCountry:gameCountryName1300(profile.activeGame),wars:Object.keys(normaliseGameDiplomacy1300(profile.activeGame.diplomacy).wars||{}).filter(k=>profile.activeGame.diplomacy.wars[k]),alliances:Object.keys(normaliseGameDiplomacy1300(profile.activeGame.diplomacy).alliances||{}).filter(k=>profile.activeGame.diplomacy.alliances[k]),fogOfWar:true,militaryByCity:campaignMilitaryByCity1300(profile.activeGame),movements:campaignMovementOverlay1300(profile.activeGame),battlesByCity:campaignBattleOverlay1300(profile.activeGame),siegesByCity:campaignSiegeOverlay1300(profile.activeGame),occupations:{...(ensureAdvancedMilitary1300(profile.activeGame)?.occupations||{})},day:Number(profile.activeGame.day)||0,lastTickAt:Number(profile.activeGame.lastTickAt)||Date.now(),dayDurationMs:GAME_DAY_REAL_MS,selectedArmyCity:null,armyMoveMode:false};world=new WorldMap($('#game-map-host'),mapState,id=>{if(gameArmyMoveMode&&gameArmyPanelKey){orderSelectedArmyMovement1300(id);return;}const activeBattle=activeBattleAtCity1300(profile.activeGame,id);if(activeBattle){openGameBattlePanel1300(activeBattle.id);mapState.selected=id;world.refresh();return;}const activeSiege=activeSiegeAtCity1300(profile.activeGame,id);if(activeSiege){openGameSiegePanel1300(activeSiege.id);mapState.selected=id;world.refresh();return;}selected1300=id;gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmySplitMode=false;gameCountryPanel=false;renderGameCountryPanel1300();gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();gameProvincePanel=id;gameProvinceTab='general';gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;mapState.selected=id;world.refresh();renderGameProvincePanel();},region=>{if(gameArmyMoveMode){toast('Choose a province, not a country label.');return;}openGameDiplomacyPanel1300(region);},(location,intent)=>openMapArmyPanel1300(location,intent),(source,target)=>dragMapArmy1300(source,target));setupGameClock1300();}}
const PACK_TYPES_1300={
 common:{id:'common',name:'Common Pack',price:200,odds:[57.5,35,5,2,.5],eyebrow:'STANDARD PAID PACK',accent:'common'},
 epic:{id:'epic',name:'Epic Pack',price:500,odds:[40,30,17,9,4],eyebrow:'PREMIUM PAID PACK',accent:'epic'}
};
const PACK_ODDS_1300=PACK_TYPES_1300.common.odds,PACK_PRICE_1300=PACK_TYPES_1300.common.price;
function owned1300Count(){return Object.keys(profile.collection1300||{}).length;}
function drawPaidPack1300(typeId='common'){
 const pack=PACK_TYPES_1300[typeId]||PACK_TYPES_1300.common;
 if(profile.florins<pack.price){toast(`You need ${(pack.price-profile.florins).toLocaleString('en-GB')} more florins for this pack.`);return null;}
 profile.florins-=pack.price;
 const cards=[];
 for(let i=0;i<5;i++){
  let roll=Math.random()*100,tier=0;
  for(;tier<pack.odds.length-1;tier++){if(roll<pack.odds[tier])break;roll-=pack.odds[tier];}
  let pool=CITIES_1300.filter(c=>c.rarity===tier);
  if(!pool.length)pool=CITIES_1300;
  const c=pool[Math.floor(Math.random()*pool.length)],duplicate=!!profile.collection1300[c.id];
  profile.collection1300[c.id]=(profile.collection1300[c.id]||0)+1;
  cards.push({id:c.id,duplicate});
 }
 profile.packsOpened1300++;profile.drawn1300+=cards.length;profile.lastPack1300=cards;profile.lastPackType1300=pack.id;save();
 return {cards,pack};
}
function drawPack1300(){const result=drawPaidPack1300('common');return result?.cards||null;}
function packFlipCard1300(r,index,{badge=true,total=5}={}){
 const c=CITY_1300[r.id],offset=Math.min(index,7);
 return `<div class="pack-flip-card ${index===0?'ready':''}" data-reveal-index="${index}" style="--stack-index:${index};--stack-offset:${offset};z-index:${total-index}">
  <div class="pack-flip-inner">
   <div class="pack-flip-back">
    <span class="pack-back-crown">${icon('crown')}</span><strong>CARDWARS</strong><b>1300</b><small>${index===0?'CLICK TO REVEAL':'NEXT CARD'}</small>
   </div>
   <div class="pack-flip-front">${card1300(c,true)}${badge?`<span class="pack-result-badge ${r.duplicate?'duplicate':''}">${r.duplicate?'DUPLICATE':'NEW CARD'}</span>`:''}</div>
  </div>
  <button class="pack-stack-click" data-action="reveal-pack-card" data-index="${index}" ${index===0?'':'disabled'} aria-label="Reveal card ${index+1}"></button>
 </div>`;
}
function revealPackCard1300(buttonEl){
 const slot=buttonEl.closest('.pack-flip-card');if(!slot||slot.classList.contains('dismissed'))return;
 const index=Number(slot.dataset.revealIndex)||0;
 if(!slot.classList.contains('revealed')){
  slot.classList.add('revealed');
  slot.querySelector('.pack-flip-back small')?.replaceChildren(document.createTextNode('CLICK AGAIN FOR NEXT'));
  const hint=modal.querySelector('.pack-reveal-hint span');if(hint)hint.textContent='Click the revealed card again for the next card';
  return;
 }
 slot.classList.add('dismissed');buttonEl.disabled=true;
 const next=slot.parentElement?.querySelector(`[data-reveal-index="${index+1}"]`);
 if(next){
  next.classList.add('ready');
  const nextButton=next.querySelector('[data-action="reveal-pack-card"]');if(nextButton)nextButton.disabled=false;
  const hint=modal.querySelector('.pack-reveal-hint span');if(hint)hint.textContent='Click the top card to reveal it';
 }else if(action==='war'){
  const claims=availableCasusBelli1300(game,PLAYER_REALM,country),choices=[...claims,{id:'no-casus-belli',name:'No Casus Belli',warGoal:'Conquest',targetCityIds:[]}];
  body=`<p>Choose the legal reason and war goal. Rebel provinces from the same original country are grouped into one independence war.</p><label class="dip-modal-field"><span>Casus belli</span><select id="dip-modal-casus-belli">${choices.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}${x.targetCityIds?.length?' · '+x.targetCityIds.length+' rebel province'+(x.targetCityIds.length===1?'':'s'):''}</option>`).join('')}</select></label><div class="dip-war-goals">${choices.map(x=>`<article data-cb-info="${esc(x.id)}"><strong>${esc(x.name)}</strong><small>${esc(x.warGoal)}${x.id==='no-casus-belli'?' · +15 aggressive expansion · −1 diplomatic reputation':x.targetCityIds?.length?' · ticking war score while every rebel province stays controlled':''}</small></article>`).join('')}</div>`;
  confirm=`<button class="danger" data-action="dip-modal-war">DECLARE WAR</button>`;
 }else{
  modal.classList.add('pack-reveal-complete');
  modal.querySelectorAll('[data-reveal-complete]').forEach(el=>el.disabled=false);
  const hint=modal.querySelector('.pack-reveal-hint span');if(hint)hint.textContent='Pack complete';
 }
}
function showPack1300(cards,typeId='common',{allowRepurchase=true}={}){
 const pack=PACK_TYPES_1300[typeId]||PACK_TYPES_1300.common,fresh=cards.filter(x=>!x.duplicate).length;
 showDialog(`<div class="pack1300-reveal ${pack.accent}-reveal"><span class="eyebrow">${esc(pack.name.toUpperCase())} · 1300 CE</span><h2>${fresh?fresh+' new '+(fresh===1?'city':'cities'):'Five familiar cities'}</h2><p>The cards are stacked. Click the top card once to reveal it, then click it again to move to the next card.</p><div class="pack1300-reveal-grid pack-card-stack">${cards.map((r,i)=>packFlipCard1300(r,i,{total:cards.length})).join('')}</div><div class="pack-reveal-hint">${icon('cards')} <span>Click the top card to reveal it</span></div><div class="dialog-actions">${button('Close','close','secondary','data-reveal-complete disabled')}${allowRepurchase?button(`Buy another ${pack.name} · ƒ${pack.price}`,pack.id==='epic'?'open-epic-pack-1300':'open-pack-1300','primary','data-reveal-complete disabled'):''}</div></div>`,'pack1300-dialog');
}
function showStarterPack1300(cards,title,subtitle,nextLabel='Continue'){
 showDialog(`<div class="starter-pack-reveal"><span class="eyebrow">FREE STARTER PACK · 1300 CE</span><h2>${esc(title)}</h2><p>${esc(subtitle)} Click the top card once to reveal it, then again for the next card.</p><div class="starter-pack-grid pack-card-stack">${cards.map((r,i)=>packFlipCard1300(r,i,{badge:false,total:cards.length})).join('')}</div><div class="pack-reveal-hint">${icon('cards')} <span>Click the top card to reveal it</span></div><div class="dialog-actions">${button(nextLabel,'close','primary','data-reveal-complete disabled')}</div></div>`,'starter-pack-dialog');
}
function packOffer1300(pack){
 const canBuy=profile.florins>=pack.price;
 return `<section class="pack-shop-card ${pack.accent}">
  <div class="pack1300-stage"><div class="pack1300-orbit"></div><div class="pack1300-art"><span>THE AGE OF REALMS</span><i>${icon('crown')}</i><strong>${esc(pack.name.toUpperCase())}</strong><b>ƒ${pack.price}</b><small>5 CITY CARDS · 1300</small></div></div>
  <div class="pack1300-copy"><span class="eyebrow">${pack.eyebrow}</span><h2>${esc(pack.name)}</h2><p>${pack.id==='epic'?'Uses the original higher-rarity paid-pack odds.':'The standard affordable pack with rarer high-tier pulls.'} Five independent draws from the packable 1300 city-card set.</p>
   <div class="pack1300-highlights"><span>${icon('cards')} 5 cards per pack</span><span>${icon('coins')} Cost: ƒ${pack.price}</span><span>${icon('globe')} ${CITIES_1300.length} packable cities</span></div>
   <button class="btn primary large-button" data-action="${pack.id==='epic'?'open-epic-pack-1300':'open-pack-1300'}" ${canBuy?'':'disabled'}><span>${canBuy?'Buy '+pack.name:'Not enough florins'}</span><strong>ƒ${pack.price}</strong></button>
  </div>
  <aside class="pack1300-odds"><span class="eyebrow">RARITY ODDS</span><h3>Per card.</h3>${RARITIES_1300.map((name,i)=>`<div><span>${name}</span><strong>${pack.odds[i]}%</strong></div>`).join('')}</aside>
 </section>`;
}
function packs1300Page(){
 return `<main class="packs1300-page">
  <div class="page-title packs1300-title"><div><span class="eyebrow">PACKS · c. 1300 CE</span><h1>Grow your collection<span class="title-dot">.</span></h1><p>Choose between the ƒ200 Common Pack and the higher-rarity ƒ500 Epic Pack. Both contain five packable 1300 city cards.</p></div><div class="pack1300-count"><strong>${owned1300Count()}<small>/${CITIES_1300.length}</small></strong><span>UNIQUE 1300 CARDS OWNED</span></div></div>
  <div class="pack-shop-list">${packOffer1300(PACK_TYPES_1300.common)}${packOffer1300(PACK_TYPES_1300.epic)}</div>
  <section class="pack1300-stats pack-shop-stats"><span><strong>${profile.packsOpened1300}</strong><small>PACKS OPENED</small></span><span><strong>${profile.drawn1300}</strong><small>CARDS DRAWN</small></span><span><strong>${owned1300Count()}</strong><small>UNIQUE OWNED</small></span></section>
  ${profile.lastPack1300.length?'<button class="text-btn pack-last-button" data-action="last-pack-1300">View last pack</button>':''}
 </main>`;
}

function deckPage(){
 const locked=!!profile.activeGame,q=deckSearch.toLowerCase().trim();
 const list=CITIES_1300.filter(c=>(Number(profile.collection1300[c.id])||0)>0&&(deckCountry==='all'||c.country===deckCountry)&&(!q||`${c.name} ${c.country} ${c.subrealm}`.toLowerCase().includes(q))).sort((a,b)=>profile.deck.includes(a.id)-profile.deck.includes(b.id)||b.rarity-a.rarity||b.people-a.people);
 const selected=profile.deck.map(id=>CITY_1300[id]).filter(Boolean);
 return `<main class="deck-page">
  <div class="page-title deck-title"><div><span class="eyebrow">YOUR CAMPAIGN DECK · 1300 CE</span><h1>Build your deck<span class="title-dot">.</span></h1><p>Choose exactly 16 owned city cards. When a campaign starts, four random cities from these 16 become your opening hand.</p></div><div class="deck-counter ${profile.deck.length===20?'ready':''}"><strong>${profile.deck.length}<small>/16</small></strong><span>${profile.deck.length===16?'READY TO PLAY':'CARDS SELECTED'}</span></div></div>
  ${locked?`<div class="deck-lock-note">${icon('lock')}<div><strong>Deck locked</strong><p>A campaign is currently active. End it from the Game tab before changing these 16 cards.</p></div></div>`:''}
  <section class="deck-selected-strip">
   <div class="deck-strip-head"><span>Selected deck</span><strong>${profile.deck.length}/16</strong></div>
   <div class="deck-slots">${Array.from({length:16},(_,i)=>{const c=selected[i];return c?`<button data-action="deck-toggle" data-id="${c.id}" ${locked?'disabled':''} title="${esc(displayCityName1300(c))}"><b>${String(CITIES_1300.findIndex(x=>x.id===c.id)).padStart(3,'0')}</b><span>${esc(displayCityName1300(c))}</span></button>`:`<i><b>${String(i+1).padStart(2,'0')}</b><span>Empty</span></i>`;}).join('')}</div>
  </section>
  <div class="deck-toolbar">
   <label class="search-input">${icon('search')}<input id="deck-search" aria-label="Search deck cards" placeholder="Find a city…" value="${esc(deckSearch)}"></label>
   <select id="deck-country-filter" aria-label="Filter deck cards by realm"><option value="all">All realms</option>${COUNTRIES_1300.map(name=>`<option value="${esc(name)}" ${deckCountry===name?'selected':''}>${esc(name.replace('Crown of ','').replace('Kingdom of ','').replace('Emirate of ',''))}</option>`).join('')}</select>
   <span>${list.length} available cards</span>
  </div>
  <section class="deck-card-grid">${list.map(c=>{const selectedCard=profile.deck.includes(c.id),art=CARD_ART_1300[c.id];return `<button class="deck-choice ${selectedCard?'selected':''}" data-action="deck-toggle" data-id="${c.id}" ${locked?'disabled':''}>
   <div class="deck-choice-art" ${art?`style="background-image:linear-gradient(0deg,#15211dee,#15211d22),url('${art}')"`:''}><span>${RARITIES_1300[c.rarity]}</span><b>1300-${String(CITIES_1300.findIndex(x=>x.id===c.id)).padStart(3,'0')}</b></div>
   <div class="deck-choice-copy"><strong>${esc(displayCityName1300(c))}</strong><small>${esc(c.country)}</small><span>F ${c.food} · E ${c.economyScore} · T ${c.technology} · S ${c.stability}</span></div>
   <i>${selectedCard?'✓':'+'}</i>
  </button>`;}).join('')}</section>
 </main>`;
}
function collectionPage(){return collection1300Page();}
function collection1300Page(){return `<main class="collection-page collection-1300-page">
 <section class="collection-hero-1300">
  <div class="collection-hero-copy">
   <span class="eyebrow">THE 1300 RESEARCH EDITION · EUROPE</span>
   <h1>The collection<span class="title-dot">.</span></h1>
   <p>${CITIES_1300.length} researched medieval city cards across ${COUNTRIES_1300.length} realms and political entities.</p>
   <div class="collection-hero-tags"><span>c. 1300 CE</span><span>Historical research set</span><span>Europe</span></div>
  </div>
  <div class="collection-progress research-progress collection-progress-1300">
   <strong>${String(CITIES_1300.length).padStart(3,'0')}</strong>
   <span>RESEARCHED CARDS</span>
   <div><i style="width:100%"></i></div>
   <small>${COUNTRIES_1300.length} realms represented</small>
  </div>
 </section>
 <div class="research-notice research-notice-1300">${icon('help')}<div><strong>Historical accuracy note</strong><p>Population figures are historical estimates. Army, navy and the four 0–100 scores are comparative Cardwars gameplay values calibrated across the c. 1300 set.</p></div></div>
 <div class="collection-toolbar collection-toolbar-1300">
  <div class="segmented collection-all-segment"><button class="${country1300==='all'?'active':''}" data-action="country1300" data-id="all">All cities <small>${CITIES_1300.length}</small></button></div>
  <div class="filters collection-filters-1300">
   <label class="search-input">${icon('search')}<input id="city-search-1300" aria-label="Search 1300 cards" placeholder="Find a city…" value="${esc(search1300)}"></label>
   <select id="country-filter-1300" aria-label="Filter by 1300 realm"><option value="all">All realms</option>${COUNTRIES_1300.map(name=>`<option value="${esc(name)}" ${country1300===name?'selected':''}>${esc(name.replace('Crown of ','').replace('Kingdom of ','').replace('Emirate of ',''))} (${CITIES_1300.filter(c=>c.country===name).length})</option>`).join('')}</select>
  </div>
 </div>
 <div class="collection-meta collection-meta-1300"><span id="result-count"></span><span>Research edition · c. 1300 CE</span></div>
 <div id="card-grid" class="card-grid"></div>
</main>`;}
function renderGrid(){render1300Grid();}
function render1300Grid(){const q=search1300.toLowerCase().trim(),list=CITIES_1300.filter(c=>(country1300==='all'||c.country===country1300)&&(!q||`${c.name} ${c.country} ${c.subrealm} ${c.historicalRole} ${c.economy}`.toLowerCase().includes(q))).sort((a,b)=>b.rarity-a.rarity||b.people-a.people);$('#result-count').textContent=`${list.length} ${list.length===1?'card':'cards'}`;$('#card-grid').innerHTML=list.length?list.map(c=>card1300(c)).join(''):`<div class="no-results">${icon('search')}<h3>No 1300 cards found</h3><p>Try another city or historical role.</p></div>`;}
function developmentPage(){
 const c=CITY_1300[buildingCity]||CITIES_1300[0];buildingCity=c.id;
 const state=cityBuildingState(c),b=state.bonuses;
 const developed={food:Math.min(100,c.food+b.food),economy:Math.min(100,c.economyScore+b.economy),technology:Math.min(100,c.technology+b.technology),stability:Math.min(100,c.stability+b.stability),army:c.army,navy:c.navy+b.navy};
 const countryOptions=COUNTRIES_1300.map(countryName=>`<optgroup label="${esc(countryName)}">${CITIES_1300.filter(x=>x.country===countryName).sort((a,z)=>displayCityName1300(a).localeCompare(displayCityName1300(z))).map(x=>`<option value="${x.id}" ${x.id===c.id?'selected':''}>${esc(displayCityName1300(x))}</option>`).join('')}</optgroup>`).join('');
 const statBox=(label,base,value)=>`<div><span>${label}</span><strong>${strengthNumber(value)}</strong><small>Base ${strengthNumber(base)}${value!==base?` · +${strengthNumber(value-base)} buildings`:''}</small></div>`;
 return `<main class="buildings-page">
  <div class="game-subnav"><button data-action="game-map">← Back to campaign map</button></div><div class="page-title buildings-title"><div><span class="eyebrow">CAMPAIGN ECONOMY · c. 1300 CE</span><h1>Build the realm<span class="title-dot">.</span></h1><p>Develop provinces with farms, workshops, military infrastructure and institutions. Historical starting buildings are free; new construction is paid from the campaign treasury.</p></div><div class="treasury-card"><span>TREASURY</span><strong>ƒ ${profile.florins.toLocaleString('en-GB')}</strong><small>Florins · construction currency</small></div></div>
  <div class="building-system-note">${icon('help')}<div><strong>Campaign prototype</strong><p>Buildings currently modify the local campaign version of a city. Historical country rankings remain based on the researched 1300 baseline, so construction does not rewrite the historical scoreboard yet.</p></div></div>
  <section class="city-development-head">
   <div><span class="eyebrow">DEVELOP A PROVINCE</span><h2>${esc(displayCityName1300(c))}</h2><p>${esc(c.country)} · ${esc(c.subrealm)}</p></div>
   <label>Selected province<select id="building-city-select">${countryOptions}</select></label>
  </section>
  <div class="development-overview">
   <span><strong>${state.totalLevels}</strong><small>BUILDING LEVELS</small></span>
   <span><strong>${state.historicalLevels}</strong><small>HISTORICAL START LEVELS</small></span>
   <span><strong>${b.income>=0?'+':''}${strengthNumber(b.income)} ƒ</strong><small>BUILDING INCOME / YEAR</small></span>
   <span><strong>${isCoastalCity1300(c)?'YES':'NO'}</strong><small>NAVAL CONSTRUCTION</small></span>
  </div>
  <section class="developed-stats">
   ${statBox('Food',c.food,developed.food)}
   ${statBox('Economy',c.economyScore,developed.economy)}
   ${statBox('Technology',c.technology,developed.technology)}
   ${statBox('Stability',c.stability,developed.stability)}
   ${statBox('Professional army',c.army,developed.army)}
   ${statBox('Navy',c.navy,developed.navy)}
  </section>
  <div class="building-catalog-head"><div><span class="eyebrow">BUILDING CATALOGUE</span><h2>${BUILDINGS_1300.length} province buildings</h2></div><p>Most buildings reach level ${ECONOMY_1300.maxBuildingLevel}; Stone Fortifications can reach level 4. Costs rise as a building becomes more developed.</p></div>
  <section class="building-grid">
   ${state.buildings.map(row=>{const blocked=row.requiresCoast&&!isCoastalCity1300(c),maxed=row.level>=ECONOMY_1300.maxBuildingLevel,canAfford=!maxed&&!blocked&&profile.florins>=row.cost;return `<article class="building-card ${blocked?'blocked':''} ${maxed?'maxed':''}">
    <div class="building-card-top"><span class="building-category">${esc(row.category)}</span><span class="building-level">LEVEL ${row.level}/${ECONOMY_1300.maxBuildingLevel}</span></div>
    <h3>${esc(row.name)}</h3><p>${esc(row.description)}</p>
    <div class="building-effects">${esc(buildingEffectText(row))}</div>
    <div class="building-origin"><span>Historical start <strong>${row.historical}</strong></span><span>Player built <strong>${row.purchased}</strong></span></div>
    <div class="building-level-pips">${Array.from({length:ECONOMY_1300.maxBuildingLevel},(_,i)=>`<i class="${i<row.level?'filled':''}"></i>`).join('')}</div>
    ${maxed?'<button disabled>MAX LEVEL</button>':blocked?'<button disabled>REQUIRES PORT / COAST</button>':`<button class="${canAfford?'can-build':''}" data-action="build-building" data-id="${row.id}" data-city="${c.id}"><span>Build level ${row.level+1}</span><strong>ƒ ${row.cost.toLocaleString('en-GB')}</strong></button>`}
   </article>`;}).join('')}
  </section>
 </main>`;
}

const GAME_COUNTRY_TABS=[
 ['politics','Politics'],['economy','Economy'],['people','People'],['decisions','Decisions'],['technology','Technology'],['rebellions','Rebellions'],['rankings','Rankings']
];

function campaignCityOwner1300(game,c){
 const owner=game?.cityOwners?.[c.id];
 return owner==='player'?gameCountryName1300():(typeof owner==='string'&&owner?owner:c.country);
}
function campaignCityStats1300(game,c,isPlayer){
 if(!isPlayer)return {food:Number(c.food)||0,economy:Number(c.economyScore)||0,technology:Number(c.technology)||0,stability:Number(c.stability)||0,population:Number(c.people)||0,army:Number(c.army)||0,navy:Number(c.navy)||0};
 const state=gameProvinceBuildingState(c),b=state.bonuses,stats=provinceDynamicStats1300(game,c),prof=professionalArmyState1300(game);
 return {
  food:stats.food,economy:stats.economy,technology:stats.technology,stability:stats.stability,
  population:effectivePopulation1300(game,c),
  army:Number(prof.byCity[c.id])||0,
  navy:(Number(c.navy)||0)+(Number(b.navy)||0)
 };
}
function buildCampaignRankings1300(game){
 const playerName=gameCountryName1300(game),grouped=new Map();
 for(const c of CITIES_1300){
  const owner=campaignCityOwner1300(game,c),isPlayer=owner===playerName,st=campaignCityStats1300(game,c,isPlayer);
  const entry=grouped.get(owner)||{country:owner,player:isPlayer,cities:[],supportTerritories:[],population:0,army:0,navy:0,foodTotal:0,economyTotal:0,technologyTotal:0,stabilityTotal:0};
  entry.player=entry.player||isPlayer;entry.cities.push(c);entry.population+=st.population;entry.army+=st.army;entry.navy+=st.navy;entry.foodTotal+=st.food;entry.economyTotal+=st.economy;entry.technologyTotal+=st.technology;entry.stabilityTotal+=st.stability;grouped.set(owner,entry);
 }
 // Hidden support territories only survive while their original country still owns at least one playable city.
 for(const support of SUPPORT_TERRITORIES_1300){
  const entry=grouped.get(support.country);if(!entry||entry.player)continue;
  entry.cities.push(support);entry.supportTerritories.push(support);entry.population+=Number(support.people)||0;entry.army+=Number(support.army)||0;entry.navy+=Number(support.navy)||0;entry.foodTotal+=Number(support.food)||0;entry.economyTotal+=Number(support.economyScore)||0;entry.technologyTotal+=Number(support.technology)||0;entry.stabilityTotal+=Number(support.stability)||0;
 }
 return [...grouped.values()].map(entry=>{
  const cityCount=entry.cities.length||1,playableCityCount=entry.cities.filter(c=>!c.supportTerritory).length;
  const foodAvg=roundStat1300(entry.foodTotal/cityCount),economyAvg=roundStat1300(entry.economyTotal/cityCount),technologyAvg=roundStat1300(entry.technologyTotal/cityCount),stabilityAvg=roundStat1300(entry.stabilityTotal/cityCount);
  const foodScore=foodAvg*50,economyScore=economyAvg*50,technologyScore=technologyAvg*50,stabilityScore=stabilityAvg*50,populationScore=Math.round(entry.population/50),armyScore=Math.round(entry.army*2),navyScore=Math.round(entry.navy*10);
  const baseScore=foodScore+economyScore+technologyScore+stabilityScore+populationScore+armyScore+navyScore,cityMultiplier=1+cityCount/50,powerModifier=campaignPowerModifier1300(game,entry),rawStrength=Math.round(baseScore*cityMultiplier),strength=Math.round(rawStrength*powerModifier);
  return {...entry,cityCount,playableCityCount,foodAvg,economyAvg,technologyAvg,stabilityAvg,foodScore,economyScore,technologyScore,stabilityScore,populationScore,armyScore,navyScore,baseScore,cityMultiplier,powerModifier,rawStrength,strength};
 }).filter(r=>r.playableCityCount>0).sort((a,b)=>b.strength-a.strength||a.country.localeCompare(b.country)).map((r,i)=>({...r,rank:i+1}));
}
function campaignLeaderboardStatus1300(game){
 if(!game)return {rank:null,strength:0,leaderStrength:1,scoreRatio:0,medal:'unranked'};
 const rows=buildCampaignRankings1300(game),player=rows.find(r=>r.player),leaderStrength=Math.max(1,Number(rows[0]?.strength)||1),rank=Number(player?.rank)||null,strength=Math.max(0,Number(player?.strength)||0),scoreRatio=clamp1300(strength/leaderStrength,0,1);
 return {rank,strength,leaderStrength,scoreRatio,medal:rank&&rank<=10?'gold':rank&&rank<=15?'silver':rank&&rank<=20?'bronze':'unranked'};
}
function campaignRankBadgeHTML1300(game){
 const r=campaignLeaderboardStatus1300(game),label=r.rank?`#${r.rank}`:'—';
 return `<button id="campaign-rank-badge" class="campaign-rank-badge ${r.medal}" data-action="open-rankings-tab" title="Open Rankings · overall world rank · strength ${strengthNumber(r.strength)}" aria-label="Open Rankings, current world rank ${label}">${label}</button>`;
}
function campaignHudDismissals1300(game){
 if(!game)return {};
 if(!game.hudNotificationDismissed||typeof game.hudNotificationDismissed!=='object'||Array.isArray(game.hudNotificationDismissed))game.hudNotificationDismissed={};
 return game.hudNotificationDismissed;
}
function campaignCompanyLosses1300(game){
 const losses=[];if(!game)return losses;
 for(const cityId of game.ownedCities||[]){
  const c=CITY_1300[cityId];if(!c)continue;
  const state=gameProvinceBuildingState(c);
  for(const row of state.buildings){
   if(row.level<=0||row.id==='walls')continue;
   const m=gameSectorMetrics1300(game,cityId,row.id),net=Number.isFinite(Number(m.netCash))?Number(m.netCash):(Number(m.profit)||0)-(Number(m.tax)||0);
   if(net<-.004)losses.push({id:`company-loss:${cityId}:${row.id}`,type:'company-loss',cityId,buildingId:row.id,icon:'trendDown',title:`${row.name} in ${displayCityName1300(c)} is losing ƒ${money1300(Math.abs(net))}/week`,loss:net,name:row.name,cityName:displayCityName1300(c)});
  }
 }
 return losses.sort((a,b)=>a.loss-b.loss||a.cityName.localeCompare(b.cityName)||a.name.localeCompare(b.name));
}
function campaignHudNotificationState1300(game){
 const dismissed=campaignHudDismissals1300(game),state=game.technology=normaliseTechnologyState1300(game.technology),e=game.economy=normaliseGameEconomy1300(game.economy),techNeeded=!state.activeResearch&&state.unlocked.length<TECHNOLOGIES_1300.length,techInvestmentTotal=(game.ownedCities||[]).reduce((n,id)=>n+(Number(e.technologyBudgets?.[id])||0),0),noTechInvestment=(game.ownedCities||[]).length>0&&techInvestmentTotal<=.001,noStabilityInvestment=(Number(e.stabilityBudget)||0)<=.001,losses=campaignCompanyLosses1300(game),liveCompanyKeys=new Set(losses.map(x=>x.id));
 if(!techNeeded)delete dismissed['tech-idle'];
 if(!noTechInvestment)delete dismissed['tech-investment-zero'];
 if(!noStabilityInvestment)delete dismissed['stability-investment-zero'];
 for(const key of Object.keys(dismissed))if(key.startsWith('company-loss:')&&!liveCompanyKeys.has(key))delete dismissed[key];
 const items=[];
 if(techNeeded&&!dismissed['tech-idle'])items.push({id:'tech-idle',type:'tech-idle',icon:'tech',title:'No technology is being researched · left-click to open the Technology Tree · right-click to dismiss'});
 if(noTechInvestment&&!dismissed['tech-investment-zero'])items.push({id:'tech-investment-zero',type:'tech-investment-zero',icon:'temple',title:'No provincial Technology investment · left-click to open Provincial Research Investment · right-click to dismiss'});
 if(noStabilityInvestment&&!dismissed['stability-investment-zero'])items.push({id:'stability-investment-zero',type:'stability-investment-zero',icon:'happy',title:'No Stability administration investment · left-click to open Stability administration · right-click to dismiss'});
 for(const loss of losses)if(!dismissed[loss.id])items.push({...loss,title:loss.title+' · left-click to open this company · right-click to dismiss'});
 return items;
}
function campaignHudNotificationsHTML1300(game){
 const items=campaignHudNotificationState1300(game);
 return `<div id="campaign-hud-notifications" class="campaign-hud-notifications ${items.length?'':'empty'}" aria-label="Campaign notifications">${items.map(n=>`<button type="button" class="campaign-hud-notification ${n.type}" data-action="campaign-hud-notification" data-notification-id="${esc(n.id)}" data-notification-type="${esc(n.type)}" ${n.cityId?`data-city="${esc(n.cityId)}"`:''} ${n.buildingId?`data-building="${esc(n.buildingId)}"`:''} title="${esc(n.title)}" aria-label="${esc(n.title)}">${icon(n.icon)}</button>`).join('')}</div>`;
}
function renderCampaignHudNotifications1300(game){
 const host=$('#campaign-hud-notifications');if(!host||!game)return;
 const items=campaignHudNotificationState1300(game);host.classList.toggle('empty',!items.length);
 host.innerHTML=items.map(n=>`<button type="button" class="campaign-hud-notification ${n.type}" data-action="campaign-hud-notification" data-notification-id="${esc(n.id)}" data-notification-type="${esc(n.type)}" ${n.cityId?`data-city="${esc(n.cityId)}"`:''} ${n.buildingId?`data-building="${esc(n.buildingId)}"`:''} title="${esc(n.title)}" aria-label="${esc(n.title)}">${icon(n.icon)}</button>`).join('');
}
function dismissCampaignHudNotification1300(id){
 const game=profile.activeGame;if(!game||!id)return;campaignHudDismissals1300(game)[id]=true;save();renderCampaignHudNotifications1300(game);
}
function openCampaignHudNotification1300(type,cityId,buildingId){
 const game=profile.activeGame;if(!game)return;
 if(type==='tech-idle'){gameCountryTab='technology';openGameCountryPanel1300();openTechnologyTree1300();return;}
 if(type==='tech-investment-zero'){gameCountryTab='technology';openGameCountryPanel1300();requestAnimationFrame(()=>document.querySelector('#game-country-panel .province-tech-investments')?.scrollIntoView({block:'start',behavior:'smooth'}));return;}
 if(type==='stability-investment-zero'){gameCountryTab='economy';openGameCountryPanel1300();requestAnimationFrame(()=>document.querySelector('#game-country-panel .stability-spending')?.scrollIntoView({block:'center',behavior:'smooth'}));return;}
 if(type==='company-loss'&&CITY_1300[cityId]&&BUILDING_1300[buildingId]&&game.ownedCities?.includes(cityId)){
  modal.close();gameCountryPanel=false;renderGameCountryPanel1300();gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();gameProvincePanel=cityId;gameProvinceTab='economy';gameProvinceBuildingCatalog=false;gameProvinceBuildingDetail=buildingId;renderGameProvincePanel();world?.focus?.(cityId);
 }
}
function updateCampaignRankingSnapshot1300(game){
 if(!game)return;const d=gameDate1300(game.day);
 game.rankingSnapshot={day:game.day,label:`${d.day} ${d.month} ${d.year}`,rows:buildCampaignRankings1300(game).map(r=>({...r,cities:r.cities.map(c=>c.id),supportTerritories:r.supportTerritories.map(c=>c.id)}))};checkCampaignVictory1300(game);
}
function campaignRankingRows1300(game){
 if(!game.rankingSnapshot?.rows?.length)updateCampaignRankingSnapshot1300(game);
 const meta=RANKING_CATEGORIES_1300.find(([id])=>id===gameRankingCategory)||RANKING_CATEGORIES_1300[0],[,label,key,unit]=meta;
 const rows=game.rankingSnapshot.rows.map(r=>({...r,cities:(r.cities||[]).map(id=>CITY_1300[id]||SUPPORT_TERRITORIES_1300.find(s=>s.id===id)).filter(Boolean),supportTerritories:(r.supportTerritories||[]).map(id=>SUPPORT_TERRITORIES_1300.find(s=>s.id===id)).filter(Boolean)})).sort((a,b)=>b[key]-a[key]||b.strength-a.strength||a.country.localeCompare(b.country));
 return {label,key,unit,rows:rows.map((r,i)=>({...r,categoryRank:i+1}))};
}
function countryRankingsHTML1300(game){
 const board=campaignRankingRows1300(game),cap=gameStatCap1300(game),value=(r,key)=>key==='strength'?strengthNumber(r.strength):['foodAvg','economyAvg','technologyAvg','stabilityAvg'].includes(key)?Number(r[key]).toFixed(2)+'/'+cap.toFixed(2):strengthNumber(r[key]);
 return `<section class="campaign-ranking-head"><div><span>CAMPAIGN RANKINGS</span><strong>${board.rows.length} active countries</strong></div><small>Snapshot: ${esc(game.rankingSnapshot?.label||'1 January 1300')} · updates every Monday</small></section>
 <div class="campaign-ranking-tabs">${RANKING_CATEGORIES_1300.map(([id,label])=>`<button class="${gameRankingCategory===id?'active':''}" data-action="game-ranking-category" data-id="${id}">${label}</button>`).join('')}</div>
 <section class="campaign-ranking-list">${board.rows.map(r=>`<details class="${r.player?'player':''}"><summary><span>#${String(r.categoryRank).padStart(2,'0')}</span><strong>${r.player?'★ ':''}${esc(r.country)}</strong><small>${r.playableCityCount} cities · ${r.powerModifier<1?esc(powerModifierLabel1300(r.powerModifier,r,game)):'full power'}</small><b>${value(r,board.key)}</b></summary><div class="campaign-ranking-breakdown"><span>Food <b>${Number(r.foodAvg).toFixed(2)}</b></span><span>Economy <b>${Number(r.economyAvg).toFixed(2)}</b></span><span>Technology <b>${Number(r.technologyAvg).toFixed(2)}</b></span><span>Stability <b>${Number(r.stabilityAvg).toFixed(2)}</b></span><span>Population <b>${strengthNumber(r.population)}</b></span><span>Army <b>${strengthNumber(r.army)}</b></span><span>Navy <b>${strengthNumber(r.navy)}</b></span><span>Raw power <b>${strengthNumber(r.rawStrength??r.strength)}</b></span><span>Status modifier <b>×${Number(r.powerModifier??1).toFixed(2)}</b></span><span>Overall <b>${strengthNumber(r.strength)}</b></span></div></details>`).join('')}</section>`;
}
function countryTotals1300(game){
 const cities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean),population=cities.reduce((n,c)=>n+effectivePopulation1300(game,c),0),mil=militaryTotals1300(game),cap=gameStatCap1300(game);
 const avg=key=>cities.length?roundStat1300(cities.reduce((n,c)=>n+(Number(provinceDynamicStats1300(game,c)[key])||0),0)/cities.length):0;
 return {cities,population,army:mil.army,armyLimit:mil.professionalArmyLimit,armyLimitPercent:mil.professionalArmyPercent,armyLimitBonusPercent:mil.professionalArmyBonusPercent,navy:mil.navy,food:avg('food'),economy:avg('economy'),technology:avg('technology'),stability:avg('stability'),cap};
}
function countrySectorRows1300(game){
 const rows=new Map();
 for(const cityId of game.ownedCities||[]){
  const c=CITY_1300[cityId];if(!c)continue;
  for(const b of gameProvinceBuildingState(c).buildings){
   if(b.level<=0)continue;
   const m=gameSectorMetrics1300(game,cityId,b.id),r=rows.get(b.id)||{id:b.id,name:b.name,category:b.category,levels:0,workers:0,capacity:0,gross:0,inputCost:0,profit:0,tax:0,wageWeighted:0};
   r.levels+=b.level;r.workers+=m.workers;r.capacity+=m.capacity;r.gross+=m.gross;r.inputCost+=m.inputCost||0;r.profit+=m.profit;r.tax+=m.tax;r.wageWeighted+=m.wage*Math.max(1,m.workers);rows.set(b.id,r);
  }
 }
 return [...rows.values()].map(r=>({...r,avgWage:r.workers?r.wageWeighted/r.workers:BUILDING_1300[r.id]?.normalWage||0})).sort((a,b)=>b.workers-a.workers||b.levels-a.levels);
}
function happinessDiminishingReturns1300(base,modifier){
 const b=clamp1300(Number(base)||0,0,100),m=Number(modifier)||0;
 // Happiness is its own persistent value. Conditions only push it up or down.
 const positiveScale=clamp1300(1.22-b*.0092,.32,1.12),negativeScale=clamp1300(.58+b*.0085,.62,1.42),scale=m>=0?positiveScale:negativeScale;
 return {value:clamp1300(b+m*scale,0,100),scale};
}
function stabilityHappinessEffect1300(stability){
 return clamp1300((Number(stability||0)-60)*.12,-8,5);
}
function happinessWeeklyStep1300(current,pressure){
 const step=clamp1300((Number(pressure)||0)*.10,-3,2.5);
 const curve=happinessDiminishingReturns1300(current,step);
 return {value:roundStat1300(curve.value),change:roundStat1300(curve.value-current),scale:curve.scale,step};
}
function countryPeople1300(game){
 const t=countryTotals1300(game),e=game.economy=normaliseGameEconomy1300(game.economy),simCities=(game.ownedCities||[]).map(id=>e.pops?.[id]).filter(Boolean),wageRatio=e.nationalWage/expectedMonthlyWage1300(game),tariffCost=tariffCostOfLivingImpact1300(game),foodAvailability=countryFoodAvailability1300(game),stabilityEffect=stabilityHappinessEffect1300(t.stability),wageEffect=clamp1300((wageRatio-1)*16,-18,16),taxEffect=clamp1300(-(e.taxRate-10)*.70,-18,7),tariffEffect=costOfLivingHappinessEffect1300(tariffCost),foodEffect=foodHappinessEffect1300(foodAvailability),buildingHappyWeight=(game.ownedCities||[]).reduce((n,id)=>{const city=CITY_1300[id];if(!city)return n;const pop=effectivePopulation1300(game,city),bonus=Number(gameProvinceBuildingState(city).bonuses.happinessBonus)||0;return n+pop*bonus;},0),buildingHappinessEffect=t.population?buildingHappyWeight/t.population:0;
 const currentHappyWeight=(game.ownedCities||[]).reduce((n,id)=>{const city=CITY_1300[id];if(!city)return n;const p=effectivePopulation1300(game,city),saved=Number(e.populationDemography?.[id]?.happiness);return n+p*(Number.isFinite(saved)?saved:60);},0),currentHappiness=t.population?currentHappyWeight/t.population:60;
 if(simCities.length){
  const grouped=new Map();let population=0,wealthTotal=0,solTotal=0;
  for(const city of simCities)for(const g of city.groups||[]){const row=grouped.get(g.name)||{name:g.name,count:0,employed:0,wealthTotal:0,solTotal:0};row.count+=g.size;row.employed+=Number(g.employed)||0;row.wealthTotal+=g.wealth*g.size;row.solTotal+=g.standardOfLiving*g.size;grouped.set(g.name,row);population+=g.size;wealthTotal+=g.wealth*g.size;solTotal+=g.standardOfLiving*g.size;}
  const groups=[...grouped.values()].map(g=>({name:g.name,count:g.count,employed:g.employed,pct:population?Math.round(g.count/population*1000)/10:0,wealth:g.count?g.wealthTotal/g.count:0,sol:g.count?g.solTotal/g.count:0})),avgWealth=population?wealthTotal/population:0,avgSol=population?solTotal/population:0,solEffect=(avgSol-10)*1.6,modifier=stabilityEffect+solEffect+wageEffect+taxEffect+tariffEffect+foodEffect+buildingHappinessEffect,step=happinessWeeklyStep1300(currentHappiness,modifier),happiness=Math.round(currentHappiness);
  return {...t,population:t.population,happiness,groups,avgWealth,avgSol,happinessPolicy:{currentHappiness,stabilityEffect,solEffect,wageEffect,taxEffect,tariffEffect,foodEffect,buildingHappinessEffect,foodAvailability,tariffCost,modifier,weeklyChange:step.change,projectedHappiness:step.value,curveScale:step.scale}};
 }
 const solEffect=0,modifier=stabilityEffect+solEffect+wageEffect+taxEffect+tariffEffect+foodEffect+buildingHappinessEffect,step=happinessWeeklyStep1300(currentHappiness,modifier),happiness=Math.round(currentHappiness),burghers=clamp1300(10+t.economy*.13,12,24),clergy=6,nobles=4,soldiers=5,peasants=Math.max(0,100-burghers-clergy-nobles-soldiers),groups=[['Peasants',peasants],['Burghers',burghers],['Clergy',clergy],['Nobles',nobles],['Soldiers',soldiers]].map(([name,pct])=>({name,pct:Math.round(pct*10)/10,count:Math.round(t.population*pct/100),wealth:0,sol:0}));
 return {...t,happiness,groups,avgWealth:0,avgSol:0,happinessPolicy:{currentHappiness,stabilityEffect,solEffect,wageEffect,taxEffect,tariffEffect,foodEffect,buildingHappinessEffect,foodAvailability,tariffCost,modifier,weeklyChange:step.change,projectedHappiness:step.value,curveScale:step.scale}};
}
function populationGroupDetail1300(game,name){
 const e=game.economy=normaliseGameEconomy1300(game.economy);let count=0,employed=0,foodNeed=0,foodSupplied=0,wealthTotal=0,solTotal=0;
 for(const id of game.ownedCities||[]){
  const city=CITY_1300[id],pop=e.pops?.[id],group=pop?.groups?.find(g=>g.name===name);if(!city||!group)continue;
  const size=Math.max(0,Number(group.size)||0),market=e.markets?.[id],availability=foodAvailabilityFromMarket1300(market,clamp1300((Number(provinceDynamicStats1300(game,city).food)||50)/70,.45,1.08)),need=size/1000*POP_FOOD_DEMAND_PER_1000*populationDemandGrowth1300(game);
  count+=size;employed+=Math.min(size,Math.max(0,Number(group.employed)||0));foodNeed+=need;foodSupplied+=need*availability;wealthTotal+=(Number(group.wealth)||0)*size;solTotal+=(Number(group.standardOfLiving)||0)*size;
 }
 const unemployed=Math.max(0,count-employed),coverage=foodNeed>0?foodSupplied/foodNeed:1;
 return {name,count,employed,unemployed,workingPct:count?employed/count*100:0,foodNeed,foodSupplied,foodCoverage:coverage,wealth:count?wealthTotal/count:0,sol:count?solTotal/count:0};
}
function openPopulationGroupDetail1300(name){
 const game=profile.activeGame;if(!game||!name)return;const g=populationGroupDetail1300(game,name);
 showDialog(`<div class="simple-dialog population-group-dialog"><span class="eyebrow">PEOPLE · SOCIAL GROUP</span><h2>${esc(g.name)}</h2><p>This shows the current totals across your realm. Food is measured in weekly market units.</p><div class="population-group-detail-grid"><span>Total people<strong>${strengthNumber(g.count)}</strong></span><span>Working<strong>${strengthNumber(g.employed)}</strong></span><span>Unemployed<strong>${strengthNumber(g.unemployed)}</strong></span><span>Working share<strong>${g.workingPct.toFixed(1)}%</strong></span><span>Food needed / week<strong>${g.foodNeed.toFixed(2)}</strong></span><span>Food supplied / week<strong>${g.foodSupplied.toFixed(2)}</strong></span><span>Food coverage<strong class="${g.foodCoverage>=.98?'positive':g.foodCoverage<.8?'negative':''}">${Math.round(g.foodCoverage*100)}%</strong></span><span>Average wealth<strong>${g.wealth.toFixed(1)}</strong></span><span>Standard of living<strong>${g.sol.toFixed(1)}</strong></span></div><p class="population-group-note">The worker pool reacts to the social mix, minimum wage, food supply, happiness and stability, living standards, taxes and available job capacity. Higher wages usually raise participation, but employment still depends on actual company jobs.</p></div>`,'population-group-dialog-shell');
}
function countryRebellionRows1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy);
 return (game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean).map(c=>{
  const wage=effectiveCityWage1300(game,c.id),stability=effectiveProvinceStability1300(game,c,gameProvinceBuildingState(c).bonuses.stability),risk=Math.round(clamp1300(100-stability+(e.taxRate-10)*.35-(wage/expectedMonthlyWage1300(game)-1)*10+e.corruption*.12,0,100));
  return {c,risk};
 }).sort((a,b)=>b.risk-a.risk);
}
function countryPoliticsHTML1300(game){
 refreshCampaignStage1300(game);const t=countryTotals1300(game),capital=t.cities[0],independent=(game.ownedCities||[]).filter(id=>game.independenceByCity?.[id]).length;
 return `<section class="country-overview-hero"><div class="country-flag-large">${flagShieldHTML1300(game.flag,'country-panel-flag')}</div><div><span>${esc(campaignStageLabel1300(game).toUpperCase())}</span><h2>${esc(gameCountryName1300(game))}</h2><p>Capital: <strong>${esc(capital?displayCityName1300(capital):'—')}</strong></p></div></section>
 <section class="campaign-path"><div class="${game.campaignStage==='rebellion'?'active done':''}"><span>1</span><strong>Rebellion</strong><small>${independent}/${game.ownedCities.length} cities independent</small></div><div class="${['free_cities','nation'].includes(game.campaignStage)?'active done':''}"><span>2</span><strong>Free Cities</strong><small>All cities recognised as independent</small></div><div class="${game.campaignStage==='nation'?'active done':''}"><span>3</span><strong>Nation</strong><small>Form a country in Decisions</small></div><div class="${game.won?'active done':''}"><span>4</span><strong>Great Power</strong><small>Reach the Overall Top 5 to win</small></div></section>
 <section class="country-stat-grid"><div><span>Provinces</span><strong>${t.cities.length}</strong></div><div><span>Population</span><strong>${strengthNumber(t.population)}</strong></div><div><span>Professional army</span><strong>${strengthNumber(t.army)} / ${strengthNumber(t.armyLimit)}</strong><small>${Number(t.armyLimitPercent).toFixed(0)}% population cap</small></div><div><span>Navy</span><strong>${strengthNumber(t.navy)}</strong></div></section>
 <section class="country-policy-card"><span>DYNAMIC REALM STATS</span><h3>Current limit: ${t.cap.toFixed(2)}</h3><p>The maximum starts at 100.00 and rises by about +0.023 every Monday. All four values are stored to two decimal places.</p></section>
 <section class="country-national-stats">${[['Food',t.food],['Economy',t.economy],['Technology',t.technology],['Stability',t.stability]].map(([n,v])=>`<div><span>${n}</span><strong>${Number(v).toFixed(2)} / ${t.cap.toFixed(2)}</strong><i><b style="width:${clamp1300(v/t.cap*100,0,100)}%"></b></i></div>`).join('')}</section>`;
}
function tariffCostOfLivingImpact1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]],markets=Object.entries(e.markets||{});let base=0,consumer=0,weight=0;
 for(const [cityId,m] of markets){const w=Math.max(1,Number(CITY_1300[cityId]?.people)||1);let bIndex=0,cIndex=0;for(const [id,bw] of basket){const g=GOOD_1300[id],row=m?.goods?.[id],price=Number(row?.price)||g.basePrice,fulfilled=Math.max(0,Number(row?.fulfilled)||0),imports=Math.max(0,Number(row?.bought)||0),share=fulfilled>0?clamp1300(imports/fulfilled,0,1):0,rate=g.category==='service'?0:Number(e.tariffs[id])||0;bIndex+=(price/g.basePrice)*bw;cIndex+=(price*(1+(rate/100)*share)/g.basePrice)*bw;}base+=bIndex*w;consumer+=cIndex*w;weight+=w;}
 return weight?roundStat1300(Math.max(0,(consumer/base-1)*100)):0;
}
function tariffRows1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),marketRows=Object.fromEntries(aggregateMarkets1300(e.markets).map(r=>[r.id,r]));
 return GOODS_1300.filter(g=>g.category!=='service').map(g=>{const r=marketRows[g.id]||{},rate=Number(e.tariffs[g.id])||0,imports=Number(r.bought)||0,fulfilled=Math.max(0,Number(r.fulfilled)||0),share=fulfilled>0?clamp1300(imports/fulfilled,0,1):0,rawPrice=Number(r.price)||g.basePrice,basePrice=rawPrice*FLORINS_PER_MARKET_VALUE,consumerPrice=rawPrice*(1+(rate/100)*share)*FLORINS_PER_MARKET_VALUE,revenue=imports*rawPrice*FLORINS_PER_MARKET_VALUE*(rate/100);return {g,rate,imports,revenue,basePrice,consumerPrice};});
}
function countryTariffsHTML1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),rows=tariffRows1300(game),active=rows.filter(r=>r.rate>0).length,revenue=rows.reduce((n,r)=>n+r.revenue,0),living=tariffCostOfLivingImpact1300(game);
 return `<div class="country-section-title tariff-title"><span>IMPORT TARIFFS</span><small>Choose a tariff per product · applied every Monday</small></div>
 <section class="tariff-summary"><div><span>ACTIVE TARIFFS</span><strong>${active}</strong></div><div><span>EST. REVENUE / WEEK</span><strong class="positive">+ƒ${money1300(revenue)}</strong></div><div><span>COST OF LIVING</span><strong class="${living>0?'negative':'neutral'}">+${living.toFixed(2)}%</strong></div></section>
 <section class="tariff-explainer"><strong>How tariffs work</strong><p>A tariff is charged only on goods your provinces import from outside your realm. The money goes into your treasury on Monday. Imported goods become more expensive for households and companies, lowering purchasing power, standard of living and potentially stability. Goods produced locally are not directly taxed by this tariff.</p></section>
 <section class="tariff-table"><div class="tariff-head"><span>GOOD</span><span>IMPORTS</span><span>PRICE</span><span>TARIFF</span><span>REVENUE</span></div>
  ${rows.map(r=>`<div class="tariff-row"><div><strong>${esc(r.g.name)}</strong><small>${esc(r.g.category)}</small></div><span>${goodQty1300(r.imports)}</span><span class="${r.consumerPrice>r.basePrice+.0001?'negative':''}">ƒ${money1300(r.consumerPrice)}</span><div class="tariff-stepper"><button data-action="game-tariff-adjust" data-id="${r.g.id}" data-delta="-5" ${r.rate<=0?'disabled':''}>−</button><strong>${r.rate}%</strong><button data-action="game-tariff-adjust" data-id="${r.g.id}" data-delta="5" ${r.rate>=50?'disabled':''}>+</button></div><b class="${r.revenue>0?'positive':'neutral'}">+ƒ${money1300(r.revenue)}</b></div>`).join('')}
 </section>`;
}
function setGameTariff1300(goodId,delta){
 const game=profile.activeGame,g=GOOD_1300[goodId];if(!game||!g||g.category==='service')return;
 const e=game.economy=normaliseGameEconomy1300(game.economy),current=Number(e.tariffs[goodId])||0;e.tariffs[goodId]=clamp1300(Math.round((current+Number(delta||0))/5)*5,0,50);invalidateWeeklyBudgetProjection1300(game);save();renderGameCountryPanel1300();refreshGameClockUI1300();
}
function countryEconomyHTML1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),budget=weeklyBudgetProjection1300(game,{refresh:true}),expenses=budget.expenses;e.monthExpenses=expenses.total;const balance=budget.balance,sectors=countrySectorRows1300(game),stabilityMax=expenses.stabilityMax;
 return `<section class="country-money-hero"><div><span>TREASURY</span><strong>ƒ${money1300(game.florins)}</strong></div><div><span>PROJECTED WEEK BALANCE</span><strong id="country-current-week-balance" class="${balance<0?'negative':'positive'}">${balance<0?'-':'+'}ƒ${money1300(Math.abs(balance))}</strong></div></section>
 <section class="country-budget-table"><div class="country-budget-title"><span>WEEKLY BUDGET</span><small>Live forecast · recalculates every day · paid Monday</small></div>
  <div><span>Sector taxes</span><strong id="budget-sector-taxes">+ƒ${money1300(budget.sectorTaxes)}</strong></div>
  <div><span>Import tariffs</span><strong id="budget-import-tariffs" class="${budget.importTariffs>0?'positive':''}">+ƒ${money1300(budget.importTariffs)}</strong></div>
  <div><span>Professional army upkeep</span><strong id="budget-army-expense">-ƒ${money1300(expenses.army)}</strong></div>
  <div><span>Unprofessional army upkeep</span><strong id="budget-unprof-army-expense">-ƒ${money1300(expenses.unprofessionalArmy)}</strong></div><div><span>Commanders</span><strong id="budget-commanders-expense">-ƒ${money1300(expenses.commanders)}</strong></div>
  <div><span>Navy upkeep</span><strong id="budget-navy-expense">-ƒ${money1300(expenses.navy)}</strong></div>
  <div><span>Fortification upkeep</span><strong id="budget-fortification-expense">-ƒ${money1300(expenses.fortification)}</strong></div>
  <div><span>Building support</span><strong id="budget-building-support-expense">-ƒ${money1300(expenses.buildingSupport)}</strong></div>
  <div><span>Stability administration</span><strong id="budget-stability-expense">-ƒ${money1300(expenses.stability)}</strong></div>
  <div><span>Provincial technology investment</span><strong id="budget-tech-expense">-ƒ${money1300(expenses.technology)}</strong></div>
  <div><span>Total state expenses</span><strong id="budget-total-expenses">-ƒ${money1300(expenses.total)}</strong></div>
  <div class="balance"><span>Projected balance</span><strong id="budget-current-balance" class="${balance<0?'negative':'positive'}">${balance<0?'-':'+'}ƒ${money1300(Math.abs(balance))}</strong></div>
  <div class="last-month"><span>Last week · ${esc(e.lastMonthLabel)}</span><strong>${e.lastMonthBalance<0?'-':'+'}ƒ${money1300(Math.abs(e.lastMonthBalance))}</strong></div>
 </section>
 <section class="country-econ-policy"><div><span>National tax rate</span><small>Applied to profitable sectors</small></div><div class="tax-stepper"><button data-action="game-tax-adjust" data-delta="-1">−</button><strong>${e.taxRate}%</strong><button data-action="game-tax-adjust" data-delta="1">+</button></div></section>
 <section class="country-econ-policy"><div><span>National minimum wage</span><small>Monthly wage per worker · converted to weekly payroll in company finances</small></div>${wageStepper1300('national','',null,e.nationalWage,false)}</section>
 ${countryTariffsHTML1300(game)}
 <section class="country-econ-policy stability-spending"><div><span>Stability administration</span><small>Starts at ƒ0.00. Recommended: ƒ${money1300(expenses.stabilityNeed)}/week · Population-scaled maximum ƒ${money1300(stabilityMax)} · Inflation ×${annualInflationFactor1300(game).toFixed(3)} · Corruption ${money1300(e.corruption)}% · Last stability change ${e.lastStabilityChange>0?'+':''}${money1300(e.lastStabilityChange)}</small></div><div class="stability-budget-slider"><strong id="stability-budget-value">ƒ${money1300(Math.min(e.stabilityBudget,stabilityMax))}</strong><input id="stability-budget-range" type="range" min="0" max="${stabilityMax}" step="0.01" value="${Math.min(e.stabilityBudget,stabilityMax)}" aria-label="Stability administration weekly budget"><div><span>ƒ0.00</span><span>ƒ${money1300(stabilityMax)}</span></div></div></section>
 ${countryMarketHTML1300(game)}
 <div class="country-section-title"><span>COMPANIES & SECTORS</span><small>Profitability feeds the Economy stat every Monday</small></div>
 <section class="country-company-list">${sectors.length?sectors.map(r=>`<article><div class="company-icon">${buildingPicture1300(r.id)}</div><div class="company-main"><div><strong>${esc(r.name)}</strong><span>${r.levels} levels</span></div><small>${esc(r.category)}</small><p>Workers <b>${strengthNumber(r.workers)} / ${strengthNumber(r.capacity)}</b> · Avg. wage <b>ƒ${money1300(r.avgWage)}</b></p></div><div class="company-money"><span>Profit/week</span><strong class="${r.profit<0?'negative':''}">ƒ${money1300(r.profit)}</strong><small>Inputs ƒ${money1300(r.inputCost||0)} · Tax ƒ${money1300(r.tax)}</small></div></article>`).join(''):'<p class="country-empty">No active sectors yet.</p>'}</section>`;
}
function countryPeopleHTML1300(game){
 const p=countryPeople1300(game),e=game.economy=normaliseGameEconomy1300(game.economy),prof=professionalArmyState1300(game),unprof=unprofessionalArmyState1300(game),population=Math.max(1,Number(p.population)||0),profPct=prof.army/population*100,unprofPct=unprof.army/population*100,dem=countryDemography1300(game);
 const hp=p.happinessPolicy||{currentHappiness:p.happiness||60,stabilityEffect:0,solEffect:0,wageEffect:0,taxEffect:0,tariffEffect:0,foodEffect:0,buildingHappinessEffect:0,weeklyChange:0,curveScale:1},growthTone=dem.annualGrowthPct>0?'positive':dem.annualGrowthPct<0?'negative':'neutral',tone=v=>v>0?'positive':v<0?'negative':'neutral',signed=v=>`${v>=0?'+':''}${Number(v||0).toFixed(1)}`;
 return `<section class="people-happiness"><div><span>POPULATION HAPPINESS</span><strong>${p.happiness}<small>/100</small></strong></div><i><b style="width:${p.happiness}%"></b></i><div class="happiness-factor-table"><div class="happiness-factor-head"><span>FACTOR</span><span>VALUE</span><span>PRESSURE</span></div><div><span>Stability</span><span>${Math.round(Number(p.stability)||0)}/100</span><strong class="${tone(hp.stabilityEffect)}">${signed(hp.stabilityEffect)}</strong></div><div><span>Standard of living</span><span>${Number(p.avgSol||0).toFixed(1)}</span><strong class="${tone(hp.solEffect)}">${signed(hp.solEffect)}</strong></div><div><span>Wages</span><span>ƒ${money1300(e.nationalWage)}/month</span><strong class="${tone(hp.wageEffect)}">${signed(hp.wageEffect)}</strong></div><div><span>Taxes</span><span>${e.taxRate}%</span><strong class="${tone(hp.taxEffect)}">${signed(hp.taxEffect)}</strong></div><div><span>Cost of living</span><span>+${Number(hp.tariffCost||0).toFixed(1)}%</span><strong class="${tone(hp.tariffEffect)}">${signed(hp.tariffEffect)}</strong></div><div><span>Food availability</span><span>${Math.round((Number(hp.foodAvailability)||0)*100)}%</span><strong class="${tone(hp.foodEffect)}">${signed(hp.foodEffect)}</strong></div><div><span>Buildings</span><span>Hospitals & civic</span><strong class="${tone(hp.buildingHappinessEffect)}">${signed(hp.buildingHappinessEffect)}</strong></div><div><span>Net happiness change</span><span>per week</span><strong class="${tone(hp.weeklyChange)}">${signed(hp.weeklyChange)}</strong></div></div></section>
 <section class="country-stat-grid people"><div><span>Total population</span><strong>${strengthNumber(p.population)}</strong></div><div><span>Average stability</span><strong>${Number(p.stability).toFixed(2)} / ${p.cap.toFixed(2)}</strong></div><div><span>Average wealth</span><strong>${p.avgWealth?p.avgWealth.toFixed(1):'—'}</strong></div><div><span>Standard of living</span><strong>${p.avgSol?p.avgSol.toFixed(1):'—'}</strong></div></section>
 <div class="country-section-title"><span>POPULATION DYNAMICS</span><small>Updated every Monday</small></div>
 <section class="population-demography">
  <article><span>ANNUAL TREND</span><strong class="${growthTone}">${dem.annualGrowthPct>=0?'+':''}${dem.annualGrowthPct.toFixed(2)}%</strong><small>Last weekly change: ${dem.change>=0?'+':''}${dem.change} people</small></article>
  <article><span>LIFE EXPECTANCY</span><strong>${dem.lifeExpectancy.toFixed(1)} <small>years</small></strong><small>Food, living standards and technology affect mortality</small></article>
  <article><span>FOOD COVERAGE</span><strong class="${dem.foodAvailability<.8?'negative':dem.foodAvailability>=.98?'positive':'neutral'}">${Math.round(dem.foodAvailability*100)}%</strong><small>Food shortages raise deaths and reduce births</small></article>
  <article><span>BIRTHS / DEATHS</span><strong>${dem.expectedBirths.toFixed(1)} / ${dem.expectedDeaths.toFixed(1)}</strong><small>Expected per week at current conditions</small></article>
 </section>
 <p class="population-demography-note">Population changes are deliberately slow in normal conditions. Families grow faster when food is sufficient, happiness is high and households can afford children. Severe food shortages, poverty and low technology increase mortality and can make population decline.</p>
 <div class="country-section-title"><span>MILITARY MANPOWER</span><small>Share of your total population serving in the army</small></div>
 <section class="population-army-summary">
  <article><div><span>PROFESSIONAL ARMY</span><strong>${strengthNumber(prof.army)} <small>/ ${strengthNumber(prof.limit)}</small></strong></div><div class="population-army-numbers"><b>${profPct.toFixed(2)}% of population</b><em>Maximum ${Number(prof.percent).toFixed(0)}%</em></div><i><b style="width:${clamp1300(prof.army/Math.max(1,prof.limit)*100,0,100)}%"></b></i></article>
  <article><div><span>UNPROFESSIONAL ARMY</span><strong>${strengthNumber(unprof.army)} <small>/ ${strengthNumber(unprof.limit)}</small></strong></div><div class="population-army-numbers"><b>${unprofPct.toFixed(2)}% of population</b><em>Maximum ${Number(unprof.percent).toFixed(0)}%</em></div><i><b style="width:${clamp1300(unprof.army/Math.max(1,unprof.limit)*100,0,100)}%"></b></i></article>
 </section>
 <div class="country-section-title"><span>POPULATION GROUPS</span><small>Approximate social distribution</small></div>
 <section class="population-groups">${p.groups.map(g=>`<article><div><button type="button" class="population-group-name" data-action="people-group-detail" data-group="${esc(g.name)}">${esc(g.name)}</button><span>${g.pct}%</span></div><i><b style="width:${g.pct}%"></b></i><small>${strengthNumber(g.count)} people · ${g.count?Math.round((Number(g.employed)||0)/g.count*100):0}% working${g.wealth?' · wealth '+g.wealth.toFixed(1)+' · SOL '+g.sol.toFixed(1):''}</small></article>`).join('')}</section>`;
}
function countryDecisionsHTML1300(game){
 refreshCampaignStage1300(game);const candidates=formableRealms1300(game),independenceRows=(game.ownedCities||[]).map(id=>{const c=CITY_1300[id],origin=game.originCountryByCity?.[id]||CITY_1300[id]?.country,free=game.independenceByCity?.[id]===true,parentExists=campaignRealmStillExists1300(game,origin);return {c,origin,free,parentExists};}).filter(x=>x.c);
 return `<div class="country-section-title"><span>INDEPENDENCE</span><small>${campaignStageLabel1300(game)} · right-click countries on the map for diplomacy, recognition, alliances, war and trade</small></div>
 <section class="independence-status">${independenceRows.map(r=>`<article><div><strong>${esc(displayCityName1300(r.c))}</strong><small>${r.free?(r.parentExists?`Free from ${esc(r.origin)}`:`${esc(r.origin)} no longer exists`):`Rebelling from ${esc(r.origin)}`}</small></div><span class="${r.free?'free':'pending'}">${r.free?'FREE CITY':'REBELLION'}</span></article>`).join('')}</section>
 <section class="future-diplomacy-note"><strong>Active diplomacy</strong><p>Right-click a country on the campaign map. Parent countries can recognise your rebel provinces. If a parent country disappears entirely, its rebel provinces automatically become Free Cities. Your realm only reaches the Free Cities stage when every city you own is a Free City.</p></section>
 <div class="country-section-title"><span>FORMABLE COUNTRIES</span><small>Requires at least 2 provinces · one-province states cannot be formed</small></div>
 <section class="formable-country-list">${candidates.length?candidates.map(f=>`<article class="${f.canForm?'ready':''}"><div class="formable-head"><div><strong>${esc(f.country)}</strong><small>${f.held.length}/${f.cities.length} required provinces</small></div><span>${Math.round(f.progress*100)}%</span></div><div class="formable-progress"><i style="width:${Math.round(f.progress*100)}%"></i></div><p><b>Owned:</b> ${f.held.map(c=>esc(displayCityName1300(c))).join(', ')||'None'}</p><p><b>Still needed:</b> ${f.missing.length?f.missing.map(c=>esc(displayCityName1300(c))).join(', '):'All required provinces owned'}</p><button data-action="form-country" data-country="${esc(f.country)}" ${f.canForm?'':'disabled'}>${f.canForm?'FORM '+esc(f.country):game.campaignStage!=='free_cities'?'BECOME FREE CITIES FIRST':'MISSING PROVINCES'}</button></article>`).join(''):'<p class="country-empty">No multi-province formable country is linked to your current cities.</p>'}</section>
 <div class="country-section-title"><span>VICTORY</span><small>Final campaign objective</small></div><section class="great-power-goal"><strong>${game.won?'VICTORY · GREAT POWER':'Become a Great Power'}</strong><p>After forming a real nation, reach the <b>Overall Top 5</b> in the campaign Rankings. Entering the Top 5 wins the campaign.</p></section>`;
}
function technologyResearchIncome1300(game){
 const totals=countryTotals1300(game);let monthly=0,universities=0,monasteries=0,largeCities=0;
 for(const c of totals.cities){const buildings=gameProvinceBuildingState(c).buildings,university=buildings.find(x=>x.id==='university')?.level||0,monastery=buildings.find(x=>x.id==='monastery')?.level||0;universities+=university;monasteries+=monastery;if(effectivePopulation1300(game,c)>=50000)largeCities++;monthly+=university*5+monastery*2+(effectivePopulation1300(game,c)>=50000?.5:0);}
 const knowledgeBonus=1+Math.max(0,totals.technology)/1000,baseMonthly=monthly*knowledgeBonus,baseWeekly=baseMonthly/WEEKS_PER_MONTH,weekly=round(baseWeekly*RESEARCH_RATE_MULTIPLIER_1300,2);return {weekly,monthly:round(baseMonthly*RESEARCH_RATE_MULTIPLIER_1300,2),baseWeekly:round(baseWeekly,2),baseMonthly:round(baseMonthly,2),universities,monasteries,largeCities,knowledgeBonus,rateMultiplier:RESEARCH_RATE_MULTIPLIER_1300};
}
function technologyCostContext1300(game,tech){
 const playerCities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean),playerTech=countryTotals1300(game).technology,countries=new Map();
 for(const c of CITIES_1300){const owner=campaignCityOwner1300(game,c);if(owner==='player'||game.ownedCities?.includes(c.id))continue;const row=countries.get(owner)||{cities:[],total:0};row.cities.push(c);row.total+=Number(c.technology)||0;countries.set(owner,row);}
 let neighbours=0,tradingAdvanced=false;for(const [country,row] of countries){const avg=row.total/Math.max(1,row.cities.length);if(avg<playerTech)continue;let near=false;for(const a of playerCities){for(const b of row.cities){if(greatCircleDistanceKm1300(a,b)<=250){near=true;break;}}if(near)break;}if(near)neighbours++;if(diplomacyRelation1300(game,country)>=40)tradingAdvanced=true;}
 return {diffusionDiscount:neighbours>=3?.15:neighbours>=1?.05:0,tradeDiscount:tradingAdvanced?.10:0,inflationMultiplier:annualInflationFactor1300(game),neighbours};
}
function applyTechnologyCompletions1300(game,completed){
 ensureGameDynamicStats1300(game);for(const id of completed){const tech=TECHNOLOGY_1300[id];if(!tech)continue;for(const cityId of game.ownedCities||[]){const row=game.economy.dynamicStats[cityId];if(row)row.technology=roundStat1300(clamp1300((Number(row.technology)||0)+tech.technologyGain,0,gameStatCap1300(game)));}toast(tech.name+' research completed.');}
 invalidateWeeklyBudgetProjection1300(game);
}
function settleWeeklyResearch1300(game){
 game.technology=normaliseTechnologyState1300(game.technology);const active=TECHNOLOGY_1300[game.technology.activeResearch],context=active?technologyCostContext1300(game,active):{},result=applyWeeklyResearch1300(game.technology,technologyResearchIncome1300(game).weekly,context);game.technology=result.state;applyTechnologyCompletions1300(game,result.completed);
}
function startTechnologyResearch1300(id){
 const game=profile.activeGame,tech=TECHNOLOGY_1300[id];if(!game||!tech)return;game.technology=normaliseTechnologyState1300(game.technology);if(game.technology.unlocked.includes(id)){toast('This technology is already researched.');return;}if(!technologyAvailable1300(game.technology,tech)){toast('Research the required technology first.');return;}if(tech.branch==='navy'&&!(game.ownedCities||[]).some(cityId=>isCoastalCity1300(CITY_1300[cityId]))){toast('You need at least one coastal province to research naval technology.');return;}game.technology.activeResearch=id;delete campaignHudDismissals1300(game)['tech-idle'];const result=applyWeeklyResearch1300(game.technology,0,technologyCostContext1300(game,tech));game.technology=result.state;applyTechnologyCompletions1300(game,result.completed);save();renderGameCountryPanel1300();renderCampaignHudNotifications1300(game);if(modal.open&&modal.classList.contains('tech-tree-dialog'))renderTechnologyTreeDialog1300();toast('Research started: '+tech.name+'.');
}
function technologyNodeHTML1300(game,state,tech){
 const researched=state.unlocked.includes(tech.id),active=state.activeResearch===tech.id,available=technologyAvailable1300(state,tech),coastal=(game.ownedCities||[]).some(id=>isCoastalCity1300(CITY_1300[id])),navyBlocked=tech.branch==='navy'&&!coastal,context=technologyCostContext1300(game,tech),cost=technologyResearchCost1300(state,tech,context),progress=researched?cost:Math.min(cost,Number(state.progressByTech[tech.id])||0),pct=researched?100:Math.round(progress/cost*100),requirement=tech.requires.map(id=>TECHNOLOGY_1300[id]?.name).filter(Boolean).join(' or ');
 return `<article class="tech-node ${researched?'researched':active?'researching':available&&!navyBlocked?'available':'locked'}"><div class="tech-node-top"><span>TIER ${tech.tier}${tech.route?' · '+esc(tech.route.toUpperCase()):''}</span><b>${researched?'RESEARCHED':active?'IN PROGRESS':available&&!navyBlocked?'AVAILABLE':'LOCKED'}</b></div><strong>${esc(tech.name)}</strong><ul>${tech.effects.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${active||progress>0?`<div class="tech-progress"><i><b style="width:${pct}%"></b></i><small>${progress.toFixed(1)} / ${cost} Research · ${pct}%</small></div>`:''}<div class="tech-node-foot"><small>${researched?`+${tech.technologyGain} Technology applied to every city`:navyBlocked?'Requires a coastal province':!available?'Requires '+esc(requirement):`${cost} Research · +${tech.technologyGain} city Technology`}</small>${!researched&&available&&!navyBlocked?`<button data-action="research-technology" data-id="${tech.id}" ${active?'disabled':''}>${active?'RESEARCHING':'RESEARCH'}</button>`:''}</div></article>`;
}
function countryTechnologyHTML1300(game){
 const totals=countryTotals1300(game),e=game.economy=normaliseGameEconomy1300(game.economy),state=game.technology=normaliseTechnologyState1300(game.technology),income=technologyResearchIncome1300(game),active=TECHNOLOGY_1300[state.activeResearch],activeContext=active?technologyCostContext1300(game,active):{},activeCost=active?technologyResearchCost1300(state,active,activeContext):0,activeProgress=active?Number(state.progressByTech[active.id])||0:0;
 return `<section class="tech-command"><div class="tech-command-stat"><span>NATIONAL TECHNOLOGY</span><strong>${totals.technology.toFixed(2)}<small>/${totals.cap.toFixed(2)}</small></strong><p>Every researched technology also permanently raises Technology in all your cities.</p></div><div class="research-ledger"><div><span>UNLOCKED</span><strong>${state.unlocked.length}<small>/30</small></strong></div><div><span>RESEARCH / WEEK</span><strong>+${income.weekly.toFixed(2)}</strong></div><div><span>UNSPENT</span><strong>${state.researchPoints.toFixed(1)}</strong></div></div>${active?`<div class="active-research"><div><span>ACTIVE RESEARCH</span><strong>${esc(active.name)}</strong><small>${activeProgress.toFixed(1)} / ${activeCost} · ${Math.round(activeProgress/activeCost*100)}%${activeContext.diffusionDiscount?` · ${Math.round(activeContext.diffusionDiscount*100)}% neighbour diffusion`:''}${activeContext.tradeDiscount?' · 10% trade diffusion':''}</small></div><i><b style="width:${Math.min(100,activeProgress/activeCost*100)}%"></b></i></div>`:`<div class="active-research empty"><span>NO ACTIVE RESEARCH</span><p>Open the full tree and choose any available technology. Research Points remain stored while you decide.</p></div>`}<button class="open-tech-tree-button" data-action="open-tech-tree">${icon('temple')}<span><strong>OPEN TECHNOLOGY TREE</strong><small>Explore 30 upgrades across five connected branches</small></span><b>OPEN →</b></button><div class="research-sources"><span>Research sources</span><p>${income.universities} University levels · ${income.monasteries} Monastery levels · ${income.largeCities} cities above 50K · ${Math.round((income.knowledgeBonus-1)*100)}% city-Technology bonus · base +${income.baseWeekly.toFixed(2)}/week · +200% campaign rate = ×${income.rateMultiplier} → +${income.weekly.toFixed(2)}/week</p></div></section>
 <div class="country-section-title"><span>PROVINCIAL RESEARCH INVESTMENT</span><small>Improves each city's own Technology stat · paid every Monday</small></div>
 <section class="province-tech-investments">${totals.cities.map(c=>{const max=provinceTechnologyBudgetMax1300(c,game),need=technologyBudgetNeed1300(c,game),budget=Math.min(Number(e.technologyBudgets[c.id])||0,max),stats=provinceDynamicStats1300(game,c),change=Number(e.lastStatChanges?.[c.id]?.technology)||0;return `<article><div><strong>${esc(displayCityName1300(c))}</strong><small>Technology ${stats.technology.toFixed(2)} / ${totals.cap.toFixed(2)} · last week <b class="${change>0?'positive':change<0?'negative':'neutral'}">${change>0?'+':''}${change.toFixed(2)}</b></small></div><div class="province-tech-slider"><strong data-tech-budget-value="${c.id}">ƒ${money1300(budget)}</strong><input data-tech-budget-city="${c.id}" type="range" min="0" max="${max}" step="0.01" value="${budget}" aria-label="Technology investment in ${esc(displayCityName1300(c))}"><small>Recommended ƒ${money1300(need)} · max ƒ${money1300(max)} · inflation ×${annualInflationFactor1300(game).toFixed(3)}</small></div></article>`;}).join('')}</section>`;
}

function technologyTreeStatus1300(game,state,tech){
 const researched=state.unlocked.includes(tech.id),active=state.activeResearch===tech.id,available=technologyAvailable1300(state,tech),navyBlocked=tech.branch==='navy'&&!(game.ownedCities||[]).some(id=>isCoastalCity1300(CITY_1300[id]));
 return {researched,active,available:available&&!navyBlocked,navyBlocked,status:researched?'researched':active?'researching':available&&!navyBlocked?'available':'locked'};
}
function technologyTreeMiniNode1300(game,state,tech){
 const meta=technologyTreeStatus1300(game,state,tech),selected=selectedTechnologyTreeNode===tech.id;
 return `<button class="technology-tree-node ${meta.status} ${selected?'selected':''}" data-action="select-tech-node" data-id="${tech.id}"><span>T${tech.tier}${tech.route?' · '+esc(tech.route.replace(' route','')):''}</span><strong>${esc(tech.name)}</strong><small>${meta.researched?'RESEARCHED':meta.active?'IN PROGRESS':meta.available?'AVAILABLE':'LOCKED'}</small></button>`;
}
function technologyTreeLane1300(game,state,branch){
 const nodes=TECHNOLOGIES_1300.filter(x=>x.branch===branch.id),tiers={1:nodes.filter(x=>x.tier===1),2:nodes.filter(x=>x.tier===2),3:nodes.filter(x=>x.tier===3),4:nodes.filter(x=>x.tier===4),5:nodes.filter(x=>x.tier===5)},count=branchUnlockedCount1300(state,branch.id),specialized=count>=3;
 return `<section class="technology-tree-lane ${branch.id}"><header><span>${count}/6</span><strong>${esc(branch.name)}</strong><small class="${specialized?'active':''}">${specialized?'ACTIVE · ':''}${esc(branch.specializationEffect)}</small></header><div class="technology-tree-path"><div class="tree-single">${tiers[1].map(t=>technologyTreeMiniNode1300(game,state,t)).join('')}</div><i class="tree-stem"></i><div class="tree-single">${tiers[2].map(t=>technologyTreeMiniNode1300(game,state,t)).join('')}</div><div class="tree-fork"></div><div class="tree-routes">${tiers[3].map(t=>technologyTreeMiniNode1300(game,state,t)).join('')}</div><div class="tree-merge"></div><div class="tree-single">${tiers[4].map(t=>technologyTreeMiniNode1300(game,state,t)).join('')}</div><i class="tree-stem"></i><div class="tree-single capstone">${tiers[5].map(t=>technologyTreeMiniNode1300(game,state,t)).join('')}</div></div></section>`;
}
function technologyTreeDetail1300(game,state,tech){
 const branch=TECH_BRANCHES_1300.find(x=>x.id===tech.branch),meta=technologyTreeStatus1300(game,state,tech),context=technologyCostContext1300(game,tech),cost=technologyResearchCost1300(state,tech,context),progress=meta.researched?cost:Math.min(cost,Number(state.progressByTech[tech.id])||0),requirements=tech.requires.map(id=>TECHNOLOGY_1300[id]?.name).filter(Boolean),requirementWord=tech.tier===4?'one of':'all of';
 return `<aside class="technology-tree-detail"><span class="eyebrow">${esc(branch?.name||'Technology')} · TIER ${tech.tier}</span><h2>${esc(tech.name)}</h2>${tech.route?`<p class="technology-route">${esc(tech.route)}</p>`:''}<div class="technology-detail-state ${meta.status}">${meta.researched?'RESEARCHED':meta.active?'RESEARCH IN PROGRESS':meta.available?'AVAILABLE TO RESEARCH':'LOCKED'}</div><ul>${tech.effects.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="technology-detail-facts"><div><span>RESEARCH COST</span><strong>${cost}</strong></div><div><span>CITY TECHNOLOGY</span><strong>+${tech.technologyGain}</strong></div><div><span>PROGRESS</span><strong>${progress.toFixed(1)} / ${cost}</strong></div></div>${requirements.length?`<p class="technology-requirements"><b>Requires ${requirementWord}:</b> ${esc(requirements.join(tech.tier===4?' or ':', '))}</p>`:''}${meta.navyBlocked?'<p class="technology-requirements warning">A coastal province is required for naval research.</p>':''}${!meta.researched&&meta.available?`<button class="technology-research-button" data-action="research-technology" data-id="${tech.id}" ${meta.active?'disabled':''}>${meta.active?'RESEARCHING':'START RESEARCH'}</button>`:''}</aside>`;
}
function technologyTreeDialogHTML1300(game){
 const state=game.technology=normaliseTechnologyState1300(game.technology),income=technologyResearchIncome1300(game),selected=TECHNOLOGY_1300[selectedTechnologyTreeNode]||TECHNOLOGIES_1300[0];selectedTechnologyTreeNode=selected.id;
 return `<div class="technology-tree-screen"><header class="technology-tree-header"><div><span class="eyebrow">CARDWARS · c. 1300 CE</span><h1>Technology Tree</h1><p>Choose a node to inspect its effects. The two Tier III routes reconnect at Tier IV.</p></div><div class="technology-tree-summary"><span>UNLOCKED <strong>${state.unlocked.length}/30</strong></span><span>RESEARCH / WEEK <strong>+${income.weekly.toFixed(2)}</strong></span><span>UNSPENT <strong>${state.researchPoints.toFixed(1)}</strong></span></div></header><div class="technology-tree-workspace"><main class="technology-tree-canvas"><div class="technology-tree-legend"><span class="researched">Researched</span><span class="researching">Researching</span><span class="available">Available</span><span class="locked">Locked</span></div><div class="technology-tree-lanes">${TECH_BRANCHES_1300.map(branch=>technologyTreeLane1300(game,state,branch)).join('')}</div></main>${technologyTreeDetail1300(game,state,selected)}</div></div>`;
}
function renderTechnologyTreeDialog1300(){const game=profile.activeGame;if(!game)return;modal.innerHTML=`<button class="modal-close icon-btn" data-action="close" aria-label="Close technology tree">${icon('close')}</button>${technologyTreeDialogHTML1300(game)}`;modal.setAttribute('aria-label','Technology Tree');}
function openTechnologyTree1300(){const game=profile.activeGame;if(!game)return;showDialog(technologyTreeDialogHTML1300(game),'tech-tree-dialog');}
function countryRebellionsHTML1300(game){
 const rows=countryRebellionRows1300(game),avg=rows.length?Math.round(rows.reduce((n,r)=>n+r.risk,0)/rows.length):0;
 return `<section class="rebellion-summary"><span>NATIONAL UNREST</span><strong>${avg}<small>/100</small></strong><p>Risk rises with low stability, high taxes and weak wages. Actual rebel armies will be added later.</p></section><section class="rebellion-list">${rows.map(r=>`<article><div><strong>${esc(displayCityName1300(r.c))}</strong><small>${r.risk>=60?'High risk':r.risk>=30?'Moderate risk':'Low risk'}</small></div><i><b style="width:${r.risk}%"></b></i><span>${r.risk}%</span></article>`).join('')}</section>`;
}


function diplomacyAssetOptions1300(selected='florins'){return [{id:'florins',name:'Florins'},...GOODS_1300].map(g=>`<option value="${g.id}" ${selected===g.id?'selected':''}>${esc(g.name)}</option>`).join('');}
function diplomacyOpinionClass1300(n){return Number(n)>0?'positive':Number(n)<0?'negative':'neutral';}
function proposalAssessment1300(game,country,action){
 const powers=diplomacyPowers1300(game,country),r=acceptance(game,PLAYER_REALM,country,action,powers),score=r.blocked?0:clamp1300(50+r.score,0,100);
 if(action==='alliance'&&!r.blocked)return {score,note:'A diplomatic score of 0 or higher is accepted.',rawScore:r.score,reasons:r.reasons,powers};
 return {score,note:r.blocked||`Diplomatic score ${r.score}; acceptance requires 0.`,rawScore:r.score,reasons:r.reasons,powers};
}
function diplomacyFactorValueHTML1300(value){
 const n=Number(value)||0,cls=n>0?'positive':n<0?'negative':'neutral';
 return `<strong class="${cls}">${n>0?'+':''}${n.toFixed(1)}</strong>`;
}
function allianceAcceptanceTableHTML1300(assessment){
 const reasons=Array.isArray(assessment?.reasons)?assessment.reasons:[],byLabel=Object.fromEntries(reasons.map(r=>[r.label,Number(r.value)||0]));
 const core=[
  ['Base reluctance','Base reluctance'],
  ['Opinion','Their opinion'],
  ['Trust','Their trust'],
  ['Ranking power','Ranking power difference'],
  ['Distance','Distance']
 ];
 const coreLabels=new Set(core.map(([,source])=>source));
 const rows=core.map(([label,source])=>`<div><span>${label}</span>${diplomacyFactorValueHTML1300(byLabel[source]||0)}</div>`);
 for(const r of reasons)if(!coreLabels.has(r.label)&&Math.abs(Number(r.value)||0)>.004)rows.push(`<div><span>${esc(r.label)}</span>${diplomacyFactorValueHTML1300(r.value)}</div>`);
 return `<div class="dip-alliance-breakdown">${rows.join('')}<div class="total"><span>Diplomatic score</span>${diplomacyFactorValueHTML1300(assessment?.rawScore||0)}</div></div>`;
}
function diplomacyDealOfferOptions1300(game,country){
 const {d}=ensureDiplomacyCountry1300(game,country),out=[`<option value="florins">Florins · ƒ${money1300(game.florins)}</option>`];
 for(const g of GOODS_1300){const n=Number(d.tradeStockpile[g.id])||0;if(n>.005)out.push(`<option value="good:${g.id}">${esc(g.name)} · ${money1300(n)} available</option>`);}
 for(const id of game.ownedCities||[]){const c=CITY_1300[id];if(c&&game.ownedCities.length>1)out.push(`<option value="city:${c.id}">City · ${esc(displayCityName1300(c))}</option>`);}
 return out.join('');
}
function diplomacyDealRequestOptions1300(game,country){
 const {d}=ensureDiplomacyCountry1300(game,country),out=[`<option value="florins">Florins · ƒ${money1300(d.aiTreasuries[country])}</option>`];
 for(const g of GOODS_1300){const n=Number(d.aiGoods[country]?.[g.id])||0;if(n>.005)out.push(`<option value="good:${g.id}">${esc(g.name)} · ${money1300(n)} available</option>`);}
 for(const c of independenceSupportCandidates1300(game,country))out.push(`<option value="support:${c.id}">Support independence · ${esc(displayCityName1300(c))}</option>`);
 return out.join('');
}

function peaceTreatyOccupiedCities1300(game,country){
 const m=ensureAdvancedMilitary1300(game);return CITIES_1300.filter(c=>campaignCityOwner1300(game,c)===country&&m?.occupations?.[c.id]===gameCountryName1300(game));
}
function peaceTreatyAssessment1300(game,country,{cityIds=[],independence=false,florins=0}={}){
 const {pair}=relation(game,PLAYER_REALM,country);if(!pair.war)return {score:0,note:'You are not at war.',reasons:[]};
 const occupied=new Set(peaceTreatyOccupiedCities1300(game,country).map(c=>c.id)),selected=[...new Set(cityIds)].filter(id=>occupied.has(id)),warScore=Number(pair.war.warScore)||0,days=Math.max(0,(Number(game.day)||0)-(Number(pair.war.started)||0)),duration=Math.min(12,days/30*1.5),playerStrength=Math.max(1,diplomacyPlayerStrength1300(game)),enemyStrength=Math.max(1,Number(diplomacyCountryStats1300(country).strength)||1),power=clamp1300(Math.log2(playerStrength/enemyStrength)*7,-10,10),occupation=occupied.size*5;
 let landCost=0;for(const id of selected){const city=CITY_1300[id];landCost+=8+Math.min(8,(Number(city?.people)||0)/20000)+Math.min(6,(Number(city?.economyScore)||50)/20);}
 const {d}=ensureDiplomacyCountry1300(game,country),cash=Math.max(0,Number(florins)||0),cashShare=cash/Math.max(1,Number(d.aiTreasuries[country])||1),cashCost=Math.min(45,cashShare*38),pending=(game.ownedCities||[]).filter(id=>(game.originCountryByCity?.[id]||CITY_1300[id]?.country)===country&&game.independenceByCity?.[id]!==true),independenceCost=independence&&pending.length?(pair.war.casusBelli==='fight-for-independence'?4:18):0;
 const raw=45+warScore*.7+duration+power+occupation-landCost-cashCost-independenceCost,score=clamp1300(Math.round(raw),0,100),reasons=[
  ['Base willingness',45],['War score',roundStat1300(warScore*.7)],['War duration',roundStat1300(duration)],['Relative strength',roundStat1300(power)],['Occupied provinces',roundStat1300(occupation)],['Land demands',roundStat1300(-landCost)],['Florins demanded',roundStat1300(-cashCost)],['Independence',roundStat1300(-independenceCost)]
 ].filter(([,v])=>Math.abs(v)>.01);
 return {score,note:score>=50?'The other side is prepared to accept these terms.':'Reduce your demands or improve your position in the war.',reasons,selected,pending,warScore};
}
function peaceTreatyAcceptanceHTML1300(a){
 return acceptanceMeterHTML1300(a.score,a.note)+`<div class="peace-acceptance-breakdown">${(a.reasons||[]).map(([label,value])=>`<div><span>${esc(label)}</span><strong class="${value>0?'positive':value<0?'negative':''}">${value>0?'+':''}${Number(value).toFixed(1)}</strong></div>`).join('')}</div>`;
}
function annexPeaceCity1300(game,country,cityId){
 const c=CITY_1300[cityId],m=ensureAdvancedMilitary1300(game);if(!c||campaignCityOwner1300(game,c)!==country||m?.occupations?.[cityId]!==gameCountryName1300(game))return false;
 game.ownedCities??=[];if(!game.ownedCities.includes(cityId))game.ownedCities.push(cityId);game.cityOwners??={};game.cityOwners[cityId]='player';game.originCountryByCity??={};game.originCountryByCity[cityId]??=country;game.independenceByCity??={};game.independenceByCity[cityId]=true;delete m.occupations[cityId];return true;
}
function executePeaceTreaty1300(country,cityIds,independence,florins){
 const game=profile.activeGame;if(!game||!country)return false;const {d}=ensureDiplomacyCountry1300(game,country),{pair,theirs}=relation(game,PLAYER_REALM,country);if(!pair.war){toast('You are no longer at war.');return false;}if(!requireFreeDiplomat1300(game,country,'peace'))return false;
 const cash=clamp1300(Number(florins)||0,0,Number(d.aiTreasuries[country])||0),assessment=peaceTreatyAssessment1300(game,country,{cityIds,independence,florins:cash});
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,diplomacyRelation1300(game,country)-1);diplomacyLog1300(game,country,`Peace treaty refused (${assessment.score}% acceptance).`);save();renderGameDiplomacyPanel1300();toast(country+' refused these peace terms.');return false;}
 let annexed=0;for(const id of assessment.selected||[])if(annexPeaceCity1300(game,country,id))annexed++;
 if(independence){for(const id of assessment.pending||[])game.independenceByCity[id]=true;if((assessment.pending||[]).length)d.recognitions[country]=true;}
 if(cash>0){d.aiTreasuries[country]=roundStat1300(Math.max(0,(Number(d.aiTreasuries[country])||0)-cash));game.florins=roundStat1300((Number(game.florins)||0)+cash);}
 const m=ensureAdvancedMilitary1300(game);for(const b of m.battles)if(b.enemyCountry===country&&b.status==='active')b.status='retreated';for(const s of m.sieges)if(s.enemyCountry===country&&s.status==='active')s.status='lifted';for(const [cityId,occupier] of Object.entries({...m.occupations}))if(occupier===gameCountryName1300(game)&&campaignCityOwner1300(game,CITY_1300[cityId])===country)delete m.occupations[cityId];
 m.movements=m.movements.filter(move=>{const target=CITY_1300[move.to];if(target&&campaignCityOwner1300(game,target)===country){const a=m.armiesByCity[move.armyHomeId];if(a)delete a.movingTo;return false;}return true;});
 pair.war=null;pair.truceUntil=Math.max(Number(pair.truceUntil)||0,(Number(game.day)||0)+365*5);d.wars[country]=false;theirs.trust=clamp1300((Number(theirs.trust)||50)+5,0,100);setDiplomacyRelation1300(game,country,Math.max(-200,diplomacyRelation1300(game,country)+8));
 ensureGameDynamicStats1300(game);ensureGamePopulation1300(game);ensureGameMilitary1300(game);seedGameEmployment1300(game);simulateGameEconomyDay1300(game,{forceMarket:true,collectRevenue:false});refreshCampaignStage1300(game);updateCampaignRankingSnapshot1300(game);
 diplomacyLog1300(game,country,`Peace treaty accepted: ${annexed} province${annexed===1?'':'s'} ceded${independence?', independence recognised':''}${cash>0?', ƒ'+money1300(cash)+' paid':''}.`);gameBattlePanelId=null;gameSiegePanelId=null;syncCampaignMilitaryOverlay1300(game);save();renderGameDiplomacyPanel1300();renderGameCountryPanel1300();refreshGameClockUI1300();toast(country+' accepted the peace treaty.');return true;
}

function diplomacySliderHTML1300({id,label,min=0,max=100,step=1,value=0,prefix='',suffix=''}) {
 const safeMax=Math.max(Number(min)||0,Number(max)||0),safeValue=clamp1300(Number(value)||0,Number(min)||0,safeMax);
 return `<label class="dip-modal-slider"><span>${esc(label)}</span><strong><span id="${id}-value">${esc(prefix)}${money1300(safeValue)}${esc(suffix)}</span></strong><input id="${id}" type="range" min="${Number(min)||0}" max="${safeMax}" step="${Number(step)||1}" value="${safeValue}"></label>`;
}
function openDiplomacyAction1300(action){
 const game=profile.activeGame,country=gameDiplomacyCountry;if(!game||!country)return;
 const {d}=ensureDiplomacyCountry1300(game,country),{pair,ours}=relation(game,PLAYER_REALM,country),ownCities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean),pending=ownCities.filter(c=>(game.originCountryByCity?.[c.id]||c.country)===country&&game.independenceByCity?.[c.id]!==true),supportCities=independenceSupportCandidates1300(game,country);
 const title={money:'Ask for Florins',recognition:'Ask for independence recognition',sellCity:'Sell a city',deal:'Negotiate an exchange',supportIndependence:'Ask for support independence',peace:'Negotiate peace treaty'}[action]||DIP_ACTIONS[action]||'Diplomatic action';
 const actionMeta=diplomacyActionMeta1300(game,country,action);
 let body='',confirm='';
 if(action==='gift'){
  const max=Math.max(0,Math.floor((Number(game.florins)||0)*100)/100),sliderMax=Math.max(1,max),value=max>=1?Math.min(5,max):1;
  body=`<p>Choose how many Florins to send. Gifts start at ƒ1.00; larger gifts create a stronger positive diplomatic memory, with the same 90-day gift cooldown.</p>${diplomacySliderHTML1300({id:'dip-modal-gift-range',label:'Gift amount',min:1,max:sliderMax,step:.5,value,prefix:'ƒ'})}`;
  confirm=`<button data-action="dip-modal-gift" ${max<1?'disabled':''}>SEND GIFT</button>`;
 }else if(action==='money'){
  const max=Math.max(0,Math.floor((Number(d.aiTreasuries[country])||0)*100)/100),value=Math.min(5,max),a=moneyRequestAssessment1300(game,country,value);
  body=`<p>Their available diplomatic treasury is <strong>ƒ${money1300(max)}</strong>. Asking for Florins costs <strong>${ASK_FLORINS_FAVOR_COST_1300} favors</strong>. You currently have <strong>${ours.favors.toFixed(1)}</strong> favors with ${esc(country)}.</p>${diplomacySliderHTML1300({id:'dip-modal-money-range',label:'Florins requested',min:0,max,step:.5,value,prefix:'ƒ'})}<div id="dip-modal-acceptance">${acceptanceMeterHTML1300(a.score,a.note)}</div>`;
  confirm=`<button data-action="dip-modal-money" ${max<=0||ours.favors<ASK_FLORINS_FAVOR_COST_1300?'disabled':''}>SEND REQUEST</button>`;
 }else if(action==='recognition'){
  const a=independenceAssessment1300(game,country);
  body=`<p>${pending.length?`${country} still has to recognise ${pending.length} rebel province${pending.length===1?'':'s'} that you control.`:'You have no unrecognised rebel provinces from this country.'}</p><div id="dip-modal-acceptance">${acceptanceMeterHTML1300(a.score,a.note)}</div>`;
  confirm=`<button data-action="dip-modal-recognition" ${!pending.length?'disabled':''}>ASK RECOGNITION</button>`;
 }else if(action==='sellCity'){
  const first=ownCities[0],max=Math.max(0,Math.floor((Number(d.aiTreasuries[country])||0)*100)/100),value=Math.min(10,max),a=citySaleAssessment1300(game,country,first?.id,value);
  body=`<p>Choose one of your cities and the Florin price. Historical ownership and relations affect how highly they value it.</p><label class="dip-modal-field"><span>City</span><select id="dip-modal-sell-city">${ownCities.map(c=>`<option value="${c.id}">${esc(displayCityName1300(c))}</option>`).join('')}</select></label>${diplomacySliderHTML1300({id:'dip-modal-sell-price',label:'Price',min:0,max,step:.5,value,prefix:'ƒ'})}<div id="dip-modal-acceptance">${acceptanceMeterHTML1300(a.score,a.note)}</div>`;
  confirm=`<button data-action="dip-modal-sell" ${ownCities.length<=1?'disabled':''}>MAKE OFFER</button>`;
 }else if(action==='supportIndependence'){
  const first=supportCities[0],a=first?supportIndependenceAssessment1300(game,country,first.id):{score:0,note:'No eligible city needs a new promise from this country.'};
  body=`<p>Ask ${country} to promise military support if the original owner later starts a war to reclaim one of your cities. The promise is stored per city and activates in a defensive war against that original owner.</p><label class="dip-modal-field"><span>City to support</span><select id="dip-modal-support-city">${supportCities.map(c=>`<option value="${c.id}">${esc(displayCityName1300(c))} · vs ${esc(game.originCountryByCity?.[c.id]||c.country)}</option>`).join('')||'<option value="">No eligible city</option>'}</select></label><div id="dip-modal-acceptance">${acceptanceMeterHTML1300(a.score,a.note)}</div>`;
  confirm=`<button data-action="dip-modal-support" ${!supportCities.length?'disabled':''}>ASK FOR SUPPORT</button>`;
 }else if(action==='peace'){
  const occupied=peaceTreatyOccupiedCities1300(game,country),maxCash=Math.max(0,Math.floor((Number(d.aiTreasuries[country])||0)*100)/100),defaultIndependence=pair.war?.casusBelli==='fight-for-independence'&&pending.length>0,a=peaceTreatyAssessment1300(game,country,{cityIds:[],independence:defaultIndependence,florins:0});
  body=`<p>Choose the terms you want in the peace treaty. Occupied provinces can be demanded as land; you may also demand independence recognition and Florins. The other country weighs war score, occupations, relative strength, war duration and the size of your demands.</p><div class="peace-term-block"><div class="peace-term-head"><span>LAND</span><small>${occupied.length} occupied province${occupied.length===1?'':'s'} available</small></div><div class="peace-city-terms">${occupied.length?occupied.map(c=>`<label><input type="checkbox" data-peace-city value="${c.id}"><span>${esc(displayCityName1300(c))}</span><small>Occupied · population ${strengthNumber(c.people)}</small></label>`).join(''):'<p>You have not occupied any provinces from this country yet.</p>'}</div></div><div class="peace-term-block"><label class="peace-independence-term"><input id="dip-modal-peace-independence" type="checkbox" ${defaultIndependence?'checked':''} ${pending.length?'':'disabled'}><span><strong>INDEPENDENCE RECOGNITION</strong><small>${pending.length?pending.length+' rebel province'+(pending.length===1?'':'s')+' still need recognition.':'No unrecognised rebel provinces from this country.'}</small></span></label></div>${diplomacySliderHTML1300({id:'dip-modal-peace-florins',label:'Florins demanded',min:0,max:maxCash,step:.5,value:0,prefix:'ƒ'})}<div id="dip-modal-acceptance">${peaceTreatyAcceptanceHTML1300(a)}</div>`;
  confirm=`<button data-action="dip-modal-peace">SEND PEACE TERMS</button>`;
 }else if(action==='peace'){
  setValue('dip-modal-peace-florins','ƒ');const cityIds=[...modal.querySelectorAll('[data-peace-city]:checked')].map(x=>x.value),independence=!!modal.querySelector('#dip-modal-peace-independence')?.checked,florins=modal.querySelector('#dip-modal-peace-florins')?.value||0,el=modal.querySelector('#dip-modal-acceptance');if(el)el.innerHTML=peaceTreatyAcceptanceHTML1300(peaceTreatyAssessment1300(game,country,{cityIds,independence,florins}));
 }
 if(action==='deal'){
  const requestDefault=independenceSupportCandidates1300(game,country)[0]?.id?`support:${independenceSupportCandidates1300(game,country)[0].id}`:'florins',offerDefault='florins',a=diplomacyDealAssessment1300(game,country,offerDefault,5,requestDefault,5);
  body=`<p>Build one exchange. You can offer Florins, trade goods or a city, and request Florins, goods or an independence-support promise in return.</p><div class="dip-deal-grid"><label class="dip-modal-field"><span>You offer</span><select id="dip-modal-deal-offer">${diplomacyDealOfferOptions1300(game,country)}</select><input id="dip-modal-deal-offer-amount" type="number" min="0.01" step="0.01" value="5"></label><span class="dip-deal-arrow">⇄</span><label class="dip-modal-field"><span>You request</span><select id="dip-modal-deal-request">${diplomacyDealRequestOptions1300(game,country)}</select><input id="dip-modal-deal-request-amount" type="number" min="0.01" step="0.01" value="5"></label></div><div id="dip-modal-acceptance">${acceptanceMeterHTML1300(a.score,a.note)}</div>`;
  confirm=`<button data-action="dip-modal-deal">PROPOSE EXCHANGE</button>`;
 }else{
  const active=action==='improve'&&ours.mission==='improve'||action==='curry'&&ours.mission==='curry'||action==='alliance'&&pair.alliance||action==='rival'&&ours.rival||action==='guarantee'&&ours.guarantee||action==='access'&&ours.access||action==='offerAccess'&&relation(game,PLAYER_REALM,country).theirs.access||action==='trade'&&pair.trade;
  const descriptions={
   improve:active?'Recall the diplomat currently improving relations.':'Assign a diplomat to improve their opinion by +3 every Monday, up to +100 from the mission.',
   curry:active?'Recall the diplomat currently currying favors.':'Assign a diplomat to curry extra favors. This requires an alliance.',
   alliance:'Propose a formal alliance.',
   breakAlliance:'End the current alliance. This reduces their trust and creates a truce.',
   trust:'Spend 10 favors to increase their trust by 5.',
   rival:active?'Remove this country as your rival.':'Declare this country a rival.',
   insult:'Send an insult. Their opinion and trust will fall and a 90-day cooldown applies.',
   guarantee:active?'Revoke your guarantee of their independence.':'Guarantee their independence.',
   access:'Ask for military access.',
   offerAccess:active?'Revoke the military access you offered them.':'Offer them military access.',
   trade:'Propose a trade agreement. This improves the acceptance of negotiated exchanges.',
   peace:'Offer a white peace and a five-year truce.',
   war:'Choose a casus belli and declare war. Trade and military access end.'
  };
  body=`<p>${esc(descriptions[action]||'Confirm this diplomatic action.')}</p>`;
  if(['alliance','access','trade'].includes(action)){const a=proposalAssessment1300(game,country,action);body+=`<div id="dip-modal-acceptance">${acceptanceMeterHTML1300(a.score,a.note)}${action==='alliance'?allianceAcceptanceTableHTML1300(a):''}</div>`;}
  confirm=`<button class="${action==='war'?'danger':''}" data-action="dip-modal-standard" data-id="${action}">${action==='war'?'DECLARE WAR':active&&['improve','curry'].includes(action)?'RECALL':'CONFIRM'}</button>`;
 }
 showDialog(`<div class="diplomacy-action-dialog" data-dip-modal-action="${esc(action)}"><span class="eyebrow">DIPLOMATIC ACTION · ${esc(country.toUpperCase())}</span><h2>${esc(title)}</h2><div id="dip-modal-action-cost" class="dip-modal-action-cost">${esc(actionMeta)}</div>${body}<div class="dip-modal-actions">${confirm}<button class="secondary" data-action="close">CANCEL</button></div></div>`,'diplomacy-action-modal');
 updateDiplomacyActionModalPreview1300();
}
function updateDiplomacyActionModalPreview1300(){
 const game=profile.activeGame,country=gameDiplomacyCountry,root=modal.querySelector('.diplomacy-action-dialog');if(!game||!country||!root)return;
 const action=root.dataset.dipModalAction,put=a=>{const el=modal.querySelector('#dip-modal-acceptance');if(el)el.innerHTML=acceptanceMeterHTML1300(a.score,a.note)+(action==='alliance'?allianceAcceptanceTableHTML1300(a):'');},setValue=(id,prefix='',suffix='')=>{const input=modal.querySelector(`#${id}`),out=modal.querySelector(`#${id}-value`);if(input&&out)out.textContent=`${prefix}${money1300(input.value)}${suffix}`;};
 if(action==='gift')setValue('dip-modal-gift-range','ƒ');
 if(action==='money'){setValue('dip-modal-money-range','ƒ');put(moneyRequestAssessment1300(game,country,modal.querySelector('#dip-modal-money-range')?.value));}
 if(action==='sellCity'){setValue('dip-modal-sell-price','ƒ');put(citySaleAssessment1300(game,country,modal.querySelector('#dip-modal-sell-city')?.value,modal.querySelector('#dip-modal-sell-price')?.value));}
 if(action==='supportIndependence')put(supportIndependenceAssessment1300(game,country,modal.querySelector('#dip-modal-support-city')?.value));
 if(action==='deal'){
  const offer=modal.querySelector('#dip-modal-deal-offer')?.value||'',request=modal.querySelector('#dip-modal-deal-request')?.value||'',oa=modal.querySelector('#dip-modal-deal-offer-amount'),ra=modal.querySelector('#dip-modal-deal-request-amount');
  const offerFixed=offer.startsWith('city:'),requestFixed=request.startsWith('support:');if(oa){oa.disabled=offerFixed;if(offerFixed)oa.value='1';}if(ra){ra.disabled=requestFixed;if(requestFixed)ra.value='1';}
  put(diplomacyDealAssessment1300(game,country,offer,oa?.value,request,ra?.value));
 }
}
function updateDiplomacyAcceptancePreview1300(){updateDiplomacyActionModalPreview1300();}

function diplomacyCountryPanelHTML1300(country){
 const game=profile.activeGame;if(!game||!country)return '';
 const {d,stats}=ensureDiplomacyCountry1300(game,country),r=relation(game,PLAYER_REALM,country),theirOpinion=opinion(r.theirs),ourOpinion=opinion(r.ours),war=!!r.pair.war,ally=!!r.pair.alliance,cities=diplomacyCountryCities1300(country).filter(c=>!c.supportTerritory),history=d.history.filter(x=>x.country===country).slice(-7).reverse();
 const status=war?`${r.pair.war.casusBelliName||'WAR'} · SCORE ${Number(r.pair.war.warScore)||0}`:ally?'ALLIANCE':d.recognitions[country]?'RECOGNISES YOUR INDEPENDENCE':'NO TREATY';
 return `<div class="dip-panel-head"><button class="country-panel-close" data-action="game-diplomacy-close">×</button><div class="dip-realm-seal">${icon('crown')}</div><div class="dip-panel-title"><span>${esc(polityType(country).toUpperCase())}</span><h2>${esc(country)}</h2><small class="${war?'negative':ally?'positive':''}">${status}</small></div><div class="dip-header-opinion" title="Your opinion / their opinion" aria-label="Your opinion ${ourOpinion.toFixed(1)}; their opinion ${theirOpinion.toFixed(1)}"><strong><b class="${diplomacyOpinionClass1300(ourOpinion)}">${ourOpinion>0?'+':''}${ourOpinion.toFixed(1)}</b><i>/</i><b class="${diplomacyOpinionClass1300(theirOpinion)}">${theirOpinion>0?'+':''}${theirOpinion.toFixed(1)}</b></strong></div></div>
 <div class="dip-scroll">
  <section class="dip-compact-stats">
   <div><span>Provinces</span><strong>${stats.cityCount||cities.length||'—'}</strong></div>
   <div><span>Population</span><strong>${strengthNumber(stats.population||0)}</strong></div>
   <div><span>Army</span><strong>${strengthNumber(stats.army||0)}</strong></div>
   <div><span>Navy</span><strong>${strengthNumber(stats.navy||0)}</strong></div>
   <div><span>Trust</span><strong>${r.theirs.trust.toFixed(1)} / ${r.ours.trust.toFixed(1)}</strong></div>
   <div><span>Favors</span><strong>${r.ours.favors.toFixed(1)}</strong></div>
   <div><span>Aggressive expansion</span><strong>${r.theirs.ae.toFixed(1)}</strong></div>
  </section>
  ${advancedDiplomacyHTML1300(game,country)}
  <div class="dip-section-title"><span>KNOWN PROVINCES</span><small>${cities.length} playable city territories</small></div>
  <section class="dip-city-list">${cities.length?cities.slice(0,16).map(c=>`<span>${esc(displayCityName1300(c))}</span>`).join(''):'<small>No playable city cards are currently attached to this realm.</small>'}</section>
  <div class="dip-section-title"><span>DIPLOMATIC HISTORY</span><small>Most recent actions with this country</small></div>
  <section class="dip-history">${history.length?history.map(x=>`<article><span>${esc(x.date)}</span><p>${esc(x.text)}</p></article>`).join(''):'<p>No diplomatic actions yet.</p>'}</section>
 </div>`;
}
function renderGameDiplomacyPanel1300(){
 const panel=$('#game-diplomacy-panel');if(!panel)return;if(!gameDiplomacyCountry||!profile.activeGame){panel.innerHTML='';panel.classList.remove('open');return;}const scroll=panel.querySelector('.dip-scroll')?.scrollTop||0;panel.innerHTML=diplomacyCountryPanelHTML1300(gameDiplomacyCountry);panel.classList.add('open');const next=panel.querySelector('.dip-scroll');if(next)next.scrollTop=scroll;
}
function openGameDiplomacyPanel1300(region){
 const game=profile.activeGame,country=String(region?.name||region?.realm||'').trim();if(!game||!country)return;if(country===gameCountryName1300(game)){openGameCountryPanel1300();return;}ensureDiplomacyCountry1300(game,country);gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;gameCountryPanel=false;renderGameProvincePanel();renderGameCountryPanel1300();gameDiplomacyCountry=country;renderGameDiplomacyPanel1300();
}

function gameCountryPanelHTML1300(){
 const game=profile.activeGame;if(!game)return '';
 const body=gameCountryTab==='economy'?countryEconomyHTML1300(game):gameCountryTab==='people'?countryPeopleHTML1300(game):gameCountryTab==='decisions'?countryDecisionsHTML1300(game):gameCountryTab==='technology'?countryTechnologyHTML1300(game):gameCountryTab==='rebellions'?countryRebellionsHTML1300(game):gameCountryTab==='rankings'?countryRankingsHTML1300(game):countryPoliticsHTML1300(game);
 return `<div class="country-panel-head"><button class="country-panel-close" data-action="game-country-close">×</button><div class="country-panel-mini-flag">${flagShieldHTML1300(game.flag)}</div><div><span>${esc(campaignStageLabel1300(game).toUpperCase())}</span><h2>${esc(gameCountryName1300(game))}</h2></div></div><nav class="country-panel-tabs">${GAME_COUNTRY_TABS.map(([id,label])=>`<button class="${gameCountryTab===id?'active':''}" data-action="game-country-tab" data-id="${id}">${label}</button>`).join('')}</nav><div class="country-panel-scroll">${body}</div>`;
}
function renderGameCountryPanel1300(){
 const panel=$('#game-country-panel');if(!panel)return;
 if(!gameCountryPanel||!profile.activeGame){panel.innerHTML='';panel.classList.remove('open');return;}
 const oldScroll=panel.querySelector('.country-panel-scroll')?.scrollTop||0;panel.innerHTML=gameCountryPanelHTML1300();panel.classList.add('open');const sc=panel.querySelector('.country-panel-scroll');if(sc)sc.scrollTop=oldScroll;
}
function openGameCountryPanel1300(){
 if(!profile.activeGame)return;gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;renderGameProvincePanel();gameCountryPanel=true;renderGameCountryPanel1300();
}
function campaignResourceBarHTML1300(game){
 const budget=weeklyBudgetProjection1300(game),totals=countryTotals1300(game),prof=professionalArmyState1300(game),unprof=unprofessionalArmyState1300(game),mil=militaryTotals1300(game),balance=Number(budget.balance)||0,dip=diplomatSummary1300(game),rank=campaignLeaderboardStatus1300(game);
 return `<section class="campaign-resource-bar" aria-label="Realm resources">
  <article class="campaign-resource-box treasury"><span>TREASURY</span><strong id="campaign-resource-treasury">ƒ${money1300(game.florins)}</strong><small id="campaign-resource-week" class="${balance>0?'positive':balance<0?'negative':'neutral'}">${balance>0?'+':balance<0?'-':''}ƒ${money1300(Math.abs(balance))}/week</small></article>
  <article class="campaign-resource-box"><span>POPULATION</span><strong id="campaign-resource-population">${strengthNumber(totals.population)}</strong></article>
  <article class="campaign-resource-box diplomats" title="Diplomats depend on leaderboard strength: under 25% of #1 = 2, 25% = 3, 50% = 4, 75%+ = 5. Current strength: ${strengthNumber(rank.strength)} (${Math.round(rank.scoreRatio*100)}% of #1)."><span>DIPLOMATS</span><strong id="campaign-resource-diplomats">${dip.available} / ${dip.total}</strong><small id="campaign-resource-diplomats-busy">${dip.busy} assigned</small></article>
  <article class="campaign-resource-box"><span>PRO ARMY</span><strong id="campaign-resource-pro-army">${strengthNumber(prof.army)}</strong></article>
  <article class="campaign-resource-box"><span>UNPRO ARMY</span><strong id="campaign-resource-unpro-army">${strengthNumber(unprof.army)}</strong></article>
  <article class="campaign-resource-box"><span>NAVY</span><strong id="campaign-resource-navy">${strengthNumber(mil.navy)}</strong></article>
 </section>`;
}
function refreshCampaignResourceBar1300(game){
 if(!game)return;const budget=weeklyBudgetProjection1300(game),totals=countryTotals1300(game),prof=professionalArmyState1300(game),unprof=unprofessionalArmyState1300(game),mil=militaryTotals1300(game),balance=Number(budget.balance)||0,dip=diplomatSummary1300(game),rank=campaignLeaderboardStatus1300(game);
 const set=(id,value)=>{const el=$(id);if(el)el.textContent=value;};
 set('#campaign-resource-treasury','ƒ'+money1300(game.florins));set('#campaign-resource-population',strengthNumber(totals.population));set('#campaign-resource-diplomats',dip.available+' / '+dip.total);set('#campaign-resource-diplomats-busy',dip.busy+' assigned');set('#campaign-resource-pro-army',strengthNumber(prof.army));set('#campaign-resource-unpro-army',strengthNumber(unprof.army));set('#campaign-resource-navy',strengthNumber(mil.navy));
 const dipBox=$('#campaign-resource-diplomats')?.closest('.campaign-resource-box');if(dipBox)dipBox.title=`Diplomats depend on leaderboard strength. Current strength: ${strengthNumber(rank.strength)} (${Math.round(rank.scoreRatio*100)}% of #1).`;
 const badge=$('#campaign-rank-badge');if(badge){badge.textContent=rank.rank?`#${rank.rank}`:'—';badge.className=`campaign-rank-badge ${rank.medal}`;badge.title=`Overall world rank · strength ${strengthNumber(rank.strength)}`;}
 const weekly=$('#campaign-resource-week');if(weekly){weekly.textContent=(balance>0?'+':balance<0?'-':'')+'ƒ'+money1300(Math.abs(balance))+'/week';weekly.classList.remove('positive','negative','neutral');weekly.classList.add(balance>0?'positive':balance<0?'negative':'neutral');}
}
function gamePage(){
 if(!profile.activeGame){
  const selected=profile.deck.map(id=>CITY_1300[id]).filter(Boolean);
  return `<main class="game-start-page"><div class="game-start-card"><span class="eyebrow">NEW CAMPAIGN · 1300 CE</span><h1>Start a rebellion<span class="title-dot">.</span></h1><p>On <strong>1 January 1300</strong>, four random cities from your 16-card deck rebel together against their parent countries. Win independence for every city, become Free Cities, form a nation, then reach the Overall Top 5 to become a Great Power and win.</p><div class="game-deck-status"><span><strong>${profile.deck.length}</strong><small>/16 cards</small></span><div><b style="width:${Math.min(100,profile.deck.length/16*100)}%"></b></div></div><div class="game-start-preview">${selected.slice(0,8).map(c=>`<span>${esc(displayCityName1300(c))}</span>`).join('')}${selected.length>8?`<span>+${selected.length-8} more</span>`:''}</div><div class="game-color-picker"><div><span>YOUR REALM COLOR</span><small>Your four opening provinces become this color when the campaign starts.</small></div><div class="game-color-swatches">${PLAYER_REALM_COLORS.map(([hex,name])=>`<button class="${profile.playerColor===hex?'active':''}" data-action="game-color" data-color="${hex}" title="${name}" aria-label="Choose ${name} realm color" style="--swatch:${hex}"></button>`).join('')}</div></div><div class="game-flag-editor"><div class="game-flag-copy"><span>YOUR FLAG</span><strong>Draw your realm flag</strong><small>Default is red. Choose a colour and paint the grid.</small><div class="flag-palette">${FLAG_COLORS_1300.map(c=>`<button class="${flagPaintColor===c?'active':''}" data-action="flag-color" data-color="${c}" style="--flag-paint:${c}" aria-label="Choose flag colour"></button>`).join('')}</div><button class="text-btn flag-reset-btn" data-action="flag-reset">Reset to red</button></div><div class="game-flag-canvas">${flagShieldHTML1300(profile.playerFlag,'editor-preview')}<div class="flag-editor-grid">${flagGridHTML1300(profile.playerFlag,true)}</div></div></div><div class="game-start-actions"><button class="btn primary large-button" data-action="start-game" ${profile.deck.length===16?'':'disabled'}><span>Start Game</span>${icon('arrow')}</button>${profile.deck.length===16?'':`<button class="text-btn" data-action="deck">Choose your 16-card deck</button>`}</div></div></main>`;
 }
 if(gameScreen==='development')return developmentPage();
 const gameDate=gameDate1300(profile.activeGame.day);
 return `<div class="game-map-shell"><main class="map-surface" id="game-map-host"></main>
  <div id="game-start-countdown" class="game-start-countdown" hidden aria-live="polite"></div>
  <div class="game-date-panel"><span>CAMPAIGN DATE</span><strong id="game-date-main">${gameDate.day} ${gameDate.month}</strong><small id="game-date-year">${gameDate.year}</small><em id="game-clock-status"></em></div>
  <button class="game-country-shield ${gameProvincePanel?'province-open':''}" data-action="game-country-open" data-country-shield="1" aria-label="Open your country">${flagShieldHTML1300(profile.activeGame.flag,'map-shield')}</button>
  ${campaignRankBadgeHTML1300(profile.activeGame)}
  ${campaignHudNotificationsHTML1300(profile.activeGame)}
  ${campaignResourceBarHTML1300(profile.activeGame)}<button class="game-quit-button" data-action="quit-game">Quit</button>
  <aside id="game-province-panel" class="game-province-panel ${gameProvincePanel?'open':''}">${gameProvincePanel?gameProvincePanelHTML(gameProvincePanel):''}</aside>
  <aside id="game-country-panel" class="game-country-panel ${gameCountryPanel?'open':''}">${gameCountryPanel?gameCountryPanelHTML1300():''}</aside>
  <aside id="game-diplomacy-panel" class="game-diplomacy-panel ${gameDiplomacyCountry?'open':''}">${gameDiplomacyCountry?diplomacyCountryPanelHTML1300(gameDiplomacyCountry):''}</aside>
 </div>`;
}
function rankingsPage(){
 const overall=countryRankings1300(),leader=overall[0],board=rankingRows1300(),meta=rankingCategoryMeta();
 const categoryValue=(r,key)=>key==='strength'?strengthNumber(r.strength):['foodAvg','economyAvg','technologyAvg','stabilityAvg'].includes(key)?strengthNumber(r[key])+'/100':strengthNumber(r[key]);
 return `<main class="rankings-page">
  <div class="page-title rankings-title"><div><span class="eyebrow">COUNTRY POWER · c. 1300 CE</span><h1>Rankings<span class="title-dot">.</span></h1><p>Country strength now uses national averages for the four 0–100 stats, total population, army and navy, followed by a bonus for the number of cities.</p></div><div class="ranking-leader"><span>#1 OVERALL</span><strong>${esc(leader?.country||'—')}</strong><small>${leader?strengthNumber(leader.strength):'—'} strength</small></div></div>
  <div class="ranking-formula">${icon('help')}<div><strong>Country strength formula</strong><p><b>(Average Food × 50 + Average Economy × 50 + Average Technology × 50 + Average Stability × 50 + Total Population ÷ 50 + Total Army × 2 + Total Navy × 10) × city bonus.</b> The city bonus is <b>1 + (cities × 0.02)</b>, so 12 cities = <b>×1.24</b> and 4 cities = <b>×1.08</b>. All displayed scores are rounded to whole numbers.</p></div></div>
  <div class="ranking-overview"><span><strong>${overall.length}</strong><small>COUNTRIES</small></span><span><strong>${CITIES_1300.length}</strong><small>CITIES</small></span><span><strong>${leader?strengthNumber(leader.cityMultiplier*100-100):'0'}%</strong><small>#1 CITY BONUS</small></span></div>
  <div class="ranking-category-tabs" aria-label="Ranking category">
   ${RANKING_CATEGORIES_1300.map(([id,label])=>`<button class="${rankingCategory===id?'active':''}" data-action="ranking-category" data-id="${id}">${label}</button>`).join('')}
  </div>
  <div class="ranking-board-title"><div><span class="eyebrow">${esc(board.label.toUpperCase())} SCOREBOARD</span><h2>${esc(board.label)} ranking</h2></div><span>${esc(board.unit)}</span></div>
  <section class="country-ranking-list" aria-label="${esc(board.label)} country ranking">
   <div class="country-ranking-head"><span>Rank</span><span>Country</span><span>Cities</span><span>${esc(board.label)}</span></div>
   ${board.rows.map(r=>`<details class="country-ranking-row ${r.categoryRank<=3?'top-three':''}">
    <summary><span class="rank-number">#${String(r.categoryRank).padStart(2,'0')}</span><span class="rank-country">${r.categoryRank<=3?icon('star'):flag()}<strong>${esc(r.country)}</strong></span><span class="rank-provinces">${r.cityCount}</span><span class="rank-strength">${categoryValue(r,board.key)}</span></summary>
    <div class="country-score-breakdown">
      <div><span>Average Food</span><strong>${strengthNumber(r.foodAvg)} /100</strong><small>×50 = ${strengthNumber(r.foodScore)}</small></div>
      <div><span>Average Economy</span><strong>${strengthNumber(r.economyAvg)} /100</strong><small>×50 = ${strengthNumber(r.economyScore)}</small></div>
      <div><span>Average Technology</span><strong>${strengthNumber(r.technologyAvg)} /100</strong><small>×50 = ${strengthNumber(r.technologyScore)}</small></div>
      <div><span>Average Stability</span><strong>${strengthNumber(r.stabilityAvg)} /100</strong><small>×50 = ${strengthNumber(r.stabilityScore)}</small></div>
      <div><span>Total Population</span><strong>${strengthNumber(r.population)}</strong><small>÷50 = ${strengthNumber(r.populationScore)}</small></div>
      <div><span>Total Army</span><strong>${strengthNumber(r.army)}</strong><small>×2 = ${strengthNumber(r.armyScore)}</small></div>
      <div><span>Total Navy</span><strong>${strengthNumber(r.navy)}</strong><small>×10 = ${strengthNumber(r.navyScore)}</small></div>
      <div><span>Base score</span><strong>${strengthNumber(r.baseScore)}</strong><small>Before city bonus</small></div>
      <div class="city-bonus-box"><span>City bonus</span><strong>×${r.cityMultiplier.toFixed(2)}</strong><small>${r.cityCount} cities</small></div>
      <div class="final-score-box"><span>Overall strength</span><strong>${strengthNumber(r.strength)}</strong><small>${strengthNumber(r.baseScore)} × ${r.cityMultiplier.toFixed(2)}</small></div>
      ${r.supportTerritories.length?r.supportTerritories.map(s=>`<div class="support-territory-box"><span>Non-playable support territory</span><strong>${esc(s.name)}</strong><small>${strengthNumber(s.people)} population · ${strengthNumber(s.army)} army · ${strengthNumber(s.navy)} navy · linked to ${r.playableCityCount} playable English city cards · never appears in packs</small></div>`).join(''):''}
    </div>
   </details>`).join('')}
  </section>
 </main>`;
}
function atlasPage(){return `<div class="atlas-layout"><aside class="realm-panel" id="atlas-panel"></aside><main class="map-surface" id="map-host"></main><button class="atlas-panel-toggle" data-action="toggle-panel" aria-label="Show or hide city information">${icon('list')}</button></div>`;}
function polityType(name){for(const [needle,type] of [['Free Imperial City','Free Imperial City'],['Prince-Bishopric','Prince-Bishopric'],['Archbishopric','Archbishopric'],['Grand Duchy','Grand Duchy'],['Margraviate','Margraviate'],['Marquisate','Marquisate'],['Principality','Principality'],['Patriarchate','Patriarchate'],['Lordship','Lordship'],['Commune','Commune'],['Judicate','Judicate'],['Duchy','Duchy'],['County','County'],['Kingdom','Kingdom'],['Empire','Empire'],['Republic','Republic'],['Beylik','Beylik'],['Khanate','Khanate'],['Ilkhanate','Ilkhanate'],['Sultanate','Sultanate'],['Emirate','Emirate'],['Crown of','Composite monarchy'],['Order','Military Order'],['Papal States','Papal State'],['Waldstatte','Confederated communities']])if(name.includes(needle))return type;return 'Political entity';}
function polityDescription(name,detail){const type=polityType(name);if(type==='Free Imperial City')return 'A self-governing imperial city within the Holy Roman Empire, shown separately because it had substantial local autonomy.';if(type==='Prince-Bishopric'||type==='Archbishopric')return 'An ecclesiastical territory where the ruling bishop or archbishop also exercised temporal political power.';if(type==='Beylik')return 'A Turkish principality in the fragmented political landscape of Anatolia around 1300.';if(type==='Republic')return 'A republican polity represented as a separate power on the c. 1300 political map.';if(type==='Papal State')return 'Territory under the temporal rule of the papacy, represented separately from neighbouring Italian states.';return detail?'A distinct medieval polity in the detailed c. 1300 gameplay layer. Its fine borders are schematic approximations for map readability.':'A political entity shown on the approximate c. 1300 historical map.';}
function inAtlasRegion(){return true;}
function atlasRealmForCity(c){return c.country==='Emirate of Granada'?'Granada':c.country;}
function renderAtlasPanel(){const c=CITY_1300[selected1300]||CITIES_1300[0];if(atlasRegion){const type=polityType(atlasRegion.name),realmKey=atlasRegion.realm||atlasRegion.name,realmCities=CITIES_1300.filter(city=>atlasRealmForCity(city)===realmKey).sort((a,b)=>b.rarity-a.rarity||b.people-a.people),urbanPop=realmCities.reduce((sum,city)=>sum+city.people,0),support=SUPPORT_TERRITORIES_1300.find(x=>x.country===realmKey);$('#atlas-panel').innerHTML=`<div class="atlas-panel-head polity-panel-head"><span class="eyebrow">COUNTRY / REALM · c. 1300 CE</span><h2>${esc(atlasRegion.name)}</h2><p>${esc(type)}</p><div class="atlas-panel-switch"><button data-action="all-map-cities">Back to 1300 cards</button><button data-action="inspect-selected">Selected 1300 card ${icon('arrow')}</button></div></div><div class="polity-panel-body"><div class="polity-map-seal">${icon('crown')}<span><strong>${esc(type)}</strong><small>Right-click country information · c. 1300</small></span></div><p>${esc(polityDescription(atlasRegion.name,atlasRegion.detail))}</p>${atlasRegion.gameplayNote?`<p>${esc(atlasRegion.gameplayNote)}</p>`:``}<div class="polity-facts"><span>Playable city territories<strong>${realmCities.length||'—'}</strong></span><span>Playable-city population<strong>${realmCities.length?urbanPop.toLocaleString('en-GB'):'—'}</strong></span>${support?`<span>Home realm population<strong>${support.people.toLocaleString('en-GB')}</strong></span><span>Home realm army<strong>${support.army.toLocaleString('en-GB')}</strong></span><span>Home realm navy<strong>${support.navy.toLocaleString('en-GB')}</strong></span><span>Ranking link<strong>${realmCities.length} playable + 1 support</strong></span>`:''}</div>${realmCities.length?`<div class="panel-section"><span class="section-label">CITY TERRITORIES</span><div class="city-links">${realmCities.map(city=>`<button data-action="map-city" data-id="${city.id}"><span>${esc(city.name)} · ${city.populationText}</span>${icon('arrow')}</button>`).join('')}</div></div>`:''}<p class="atlas-footnote">${support?'England also has one non-playable home-realm support entity. It contributes national population, army and navy to rankings but is never a card or pack result. ':'Population here is only the sum of researched city cards, not the total population of the whole country. '}Left-click a playable city territory for its card and right-click for this country view.</p></div>`;return;}const list=CITIES_1300.filter(c=>`${c.name} ${c.subrealm} ${c.historicalRole}`.toLowerCase().includes(atlasSearch.toLowerCase()));$('#atlas-panel').innerHTML=`<div class="atlas-panel-head"><span class="eyebrow">1300 CITY ATLAS</span><h2>Europe · research set</h2><p>${CITIES_1300.length} researched city cards</p><div class="atlas-panel-switch"><button class="active" data-action="all-map-cities">All 1300 cards</button><button data-action="inspect-selected">Selected card ${icon('arrow')}</button></div></div><div class="atlas-feature atlas-feature-placeholder"><div class="atlas-placeholder-art">${icon('globe')}<small>IMAGE RESERVED</small></div><div><span class="card-country">${flag(c)}${c.country}</span><h3>${c.name}</h3><p>${c.subrealm} · ${c.populationText} people</p>${button('Inspect 1300 card '+icon('arrow'),'card1300','small-btn',`data-id="${c.id}"`)}</div></div><div class="atlas-search-wrap"><label class="search-input">${icon('search')}<input id="atlas-search" aria-label="Find a 1300 city on the map" placeholder="Find a researched city…" value="${esc(atlasSearch)}"></label></div><div class="atlas-city-list" id="atlas-city-list">${mapList(list)}</div><p class="atlas-footnote">The 1300 set is being built polity by polity across Europe. Political ownership is based on 1300, with selected states grouped and borders simplified for gameplay.</p>`;}
function mapList(list){return list.length?list.map(c=>`<button class="${selected1300===c.id?'selected':''}" data-action="map-city" data-id="${c.id}">${flag(c)}<span><strong>${c.name}</strong><small>${c.subrealm} · ${c.populationText}</small></span>${icon('arrow')}</button>`).join(''):'<p class="empty-map-list">No researched 1300 cards match this search.</p>';}
function openProductionMethods1300(cityId,buildingId){
 const game=profile.activeGame,c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!game||!c||!building||!game.ownedCities?.includes(cityId))return;
 const policy=companyPolicy1300(game,cityId,buildingId),active=resolvedProductionMethod1300(game,buildingId,policy.productionMethod),methods=productionMethodsForBuilding1300(buildingId);
 showDialog(`<div class="production-method-dialog"><span class="eyebrow">PRODUCTION METHOD · ${esc(displayCityName1300(c).toUpperCase())}</span><h2>${esc(building.name)}</h2><p>Choose how this company produces its goods. Better methods can require technologies and more expensive inputs.</p><div class="production-method-choice-list">${methods.map(method=>{const unlocked=productionMethodUnlocked1300(game,method),tech=method.requiresTech?TECHNOLOGY_1300[method.requiresTech]:null,selected=active?.id===method.id;return `<button type="button" class="production-method-choice ${selected?'selected':''} ${unlocked?'':'locked'}" data-action="game-select-production-method" data-city="${esc(cityId)}" data-id="${esc(buildingId)}" data-method="${esc(method.id)}" ${unlocked?'':'disabled'}><div><span>${selected?'CURRENT METHOD':unlocked?'AVAILABLE':'LOCKED'}</span><strong>${esc(method.name)}</strong><small>${esc(method.description||'')}</small></div><div class="production-method-choice-flow"><span><b>INPUTS</b>${esc(goodFlowText1300(method.inputs||{}))}</span><em>→</em><span><b>OUTPUTS</b>${esc(goodFlowText1300(boostedProductionOutputs1300(method.outputs||{})))}${Number(method.directFlorins)>0?` · Florins +ƒ${money1300(method.directFlorins)}`:''}</span></div>${!unlocked?`<p>Requires: ${esc(tech?.name||'Technology')}</p>`:''}</button>`;}).join('')}</div></div>`,'production-method-dialog-shell');
}
function showDialog(html,cls=''){modal.className=cls;modal.innerHTML=`<button class="modal-close icon-btn" data-action="close" aria-label="Close dialog">${icon('close')}</button>${html}`;if(!modal.open)modal.showModal();modal.setAttribute('aria-label',modal.querySelector('h2')?.textContent||'Cardwars dialog');}
function inspectCard1300(id){const c=CITY_1300[id];if(!c)return;const sources=c.sources.map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ');showDialog(`<div class="detail-card">${card1300(c,true)}</div><div class="detail-copy detail-copy-1300"><span class="eyebrow">RESEARCHED CITY CARD · c. 1300 CE</span><h2>${c.name}</h2><div class="detail-country">${flag(c)}<span>${c.country}<small>${c.subrealm}</small></span></div>${c.gameplayNote?`<p class="small muted">${esc(c.gameplayNote)} Historical affiliation: ${esc(c.historicalCountry)} — ${esc(c.historicalSubrealm)}.</p>`:``}<p class="lead">${esc(c.researchSummary)}</p><div class="detail-facts"><span>Population<strong>${c.populationRange||c.populationText} · ${c.populationConfidence} confidence</strong></span><span>Starting Florins<strong>ƒ${Number(c.startingFlorins).toFixed(2)} · in-game starting wealth</strong></span><span>Historical role<strong>${esc(c.historicalRole)}</strong></span><span>Economy<strong>${esc(c.economy)}</strong></span><span>Military role<strong>${esc(c.militaryRole)}</strong></span></div><div class="research-evidence"><strong>How to read the stats</strong><p>${esc(c.evidenceNote)}</p><p>${esc(RESEARCH_1300_NOTE)}</p></div>${button('Locate on the 1300 map '+icon('globe'),'locate1300','primary',`data-id="${id}"`)}<div class="research-sources"><strong>Research sources</strong><p>${sources}</p></div></div>`,'card-dialog card-dialog-1300');}

function showReset(){showDialog(`<div class="simple-dialog"><span class="eyebrow">START AGAIN</span><h2>Reset campaign progress?</h2><p>This resets your Florin treasury and every player-built province building. The researched 1300 card set itself remains available.</p><p>You can export a backup before resetting.</p><div class="dialog-actions">${button('Cancel','close')}${button('Reset campaign','confirm-reset','danger')}</div></div>`);}
function showHelp(){showDialog(`<div class="simple-dialog"><span class="eyebrow">CARDWARS · c. 1300 CE</span><h2>Build your medieval realm.</h2><div class="help-list"><div><b>01</b><span><strong>Explore the 1300 collection</strong>Browse the researched European city cards by country and inspect their historical stats and sources.</span></div><div><b>02</b><span><strong>Build a 16-card deck</strong>Choose your campaign cities in the Deck tab. A new game draws four random cities as your opening hand.</span></div><div><b>03</b><span><strong>Play and develop</strong>Your campaign starts on 1 January 1300. Use the map and develop provinces with Florins and buildings.</span></div><div><b>04</b><span><strong>Compare the great powers</strong>The Rankings tab compares countries by Food, Economy, Technology, Stability, Population, Army, Navy and overall strength.</span></div><div><b>05</b><span><strong>Explore the map</strong>Drag to pan, scroll or pinch to zoom. Left-click a playable city territory for its card and right-click a realm for country information.</span></div></div><div class="save-help"><h3>Your campaign save</h3><p>Florins and player-built buildings are saved in this browser. Export a backup to keep or transfer them.</p><div class="dialog-actions">${button(icon('download')+' Export campaign','export')}${button('Import campaign','import')}</div></div><button class="text-btn" data-action="sources">Historical notes & sources</button></div>`);}
function showSources(){showDialog(`<div class="simple-dialog"><span class="eyebrow">HISTORY & GEOGRAPHY</span><h2>Behind the 1300 set.</h2><p>The active Cardwars collection now focuses entirely on <strong>Europe around 1300 CE</strong>. Population figures are historical estimates; military values and the four 0–100 gameplay scores are comparative modelling values.</p><p>${esc(RESEARCH_1300_NOTE)}</p><h3>Historical map</h3><p>The atlas uses the c. 1300 layer from <a href="https://github.com/aourednik/historical-basemaps" target="_blank" rel="noopener">Historical Basemaps, André Ourednik and contributors</a>, under <a href="assets/historical-basemaps-LICENSE.txt" target="_blank" rel="noopener">GPL-3.0</a>. Borders are approximate and simplified for gameplay.</p><h3>Card research</h3><p>Each 1300 city card includes its own research sources in the card detail view. Generated historical artwork is illustrative rather than documentary evidence.</p></div>`,'credits-dialog');}
function exportSave(){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(profile,null,2)],{type:'application/json'}));a.href=url;a.download='cardwars-1300-campaign.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Campaign exported.');}
function navigate(next){modal.close();view=next;render();window.scrollTo(0,0);}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action,id=b.dataset.id;
 if(a==='auth-local'){await localAuth();return;}
 if(a==='logout'){logoutAccount();return;}
 if(a==='starter-region'){chooseStarterRegion1300(id);return;}
 if(a==='starter-welcome'){claimWelcomePack1300();return;}
 if(['collection','packs','deck','game','rankings','atlas'].includes(a)){navigate(a);return;}
 if(a==='ranking-category'){rankingCategory=id;render();return;}
 if(a==='reveal-pack-card'){revealPackCard1300(b);return;}
 if(a==='open-pack-1300'){const result=drawPaidPack1300('common');if(!result)return;render();showPack1300(result.cards,'common');return;}
 if(a==='open-epic-pack-1300'){const result=drawPaidPack1300('epic');if(!result)return;render();showPack1300(result.cards,'epic');return;}
 if(a==='last-pack-1300'){showPack1300(profile.lastPack1300,profile.lastPackType1300||'common',{allowRepurchase:false});return;}
 if(a==='deck-toggle'){toggleDeckCard1300(id);return;}
 if(a==='game-color'&&!profile.activeGame){const color=b.dataset.color;if(validRealmColor(color)){profile.playerColor=color;save();render();}return;}
 if(a==='flag-color'&&!profile.activeGame){const c=b.dataset.color;if(FLAG_COLORS_1300.includes(c)){flagPaintColor=c;render();}return;}
 if(a==='flag-cell'&&!profile.activeGame){const i=Number(b.dataset.index);if(Number.isInteger(i)&&i>=0&&i<FLAG_SIZE){profile.playerFlag=normaliseFlag1300(profile.playerFlag);profile.playerFlag[i]=flagPaintColor;save();document.querySelectorAll('[data-flag-index="'+i+'"]').forEach(el=>el.style.setProperty('--flag-cell',flagPaintColor));}return;}
 if(a==='flag-reset'&&!profile.activeGame){profile.playerFlag=Array(FLAG_SIZE).fill(DEFAULT_FLAG_COLOR);save();render();return;}
 if(a==='start-game'){gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceTab='general';gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;gameCountryPanel=false;gameDiplomacyCountry=null;startGame1300();return;}
 if(a==='game-map'){gameScreen='map';render();return;}
 if(a==='game-province-tab'){if(GAME_PROVINCE_TABS_1300.some(([tabId])=>tabId===id)){gameProvinceTab=id;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;const provinceScroll=$('#game-province-panel .province-side-scroll');if(provinceScroll)provinceScroll.scrollTop=0;renderGameProvincePanel();}return;}
 if(a==='close-game-province'){gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;renderGameProvincePanel();return;}
 if(a==='game-building-detail'){if(BUILDING_1300[id]&&CITY_1300[b.dataset.city]){gameProvincePanel=b.dataset.city;gameProvinceTab='economy';gameProvinceBuildingDetail=id;renderGameProvincePanel();}return;}
 if(a==='game-building-detail-back'){gameProvinceBuildingDetail=null;renderGameProvincePanel();return;}
 if(a==='game-building-catalog-open'){if(gameProvincePanel&&profile.activeGame?.ownedCities?.includes(gameProvincePanel)){gameProvinceTab='economy';gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=true;renderGameProvincePanel();}return;}
 if(a==='game-building-catalog-back'){gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;renderGameProvincePanel();return;}
 if(a==='game-country-open'){openGameCountryPanel1300();return;}
 if(a==='open-rankings-tab'){gameCountryTab='rankings';openGameCountryPanel1300();return;}
 if(a==='campaign-hud-notification'){openCampaignHudNotification1300(b.dataset.notificationType,b.dataset.city,b.dataset.building);return;}
 if(a==='game-country-close'){gameCountryPanel=false;renderGameCountryPanel1300();return;}
 if(a==='game-country-tab'){if(GAME_COUNTRY_TABS.some(([x])=>x===id)){gameCountryTab=id;renderGameCountryPanel1300();}return;}
 if(a==='open-tech-tree'){openTechnologyTree1300();return;}
 if(a==='select-tech-node'){if(TECHNOLOGY_1300[id]){selectedTechnologyTreeNode=id;renderTechnologyTreeDialog1300();}return;}
 if(a==='research-technology'){startTechnologyResearch1300(id);return;}
 if(a==='game-diplomacy-close'){gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();return;}
 if(a==='dip-advanced'){openDiplomacyAction1300(id);return;}
 if(a==='dip-modal-peace'){const cityIds=[...modal.querySelectorAll('[data-peace-city]:checked')].map(x=>x.value),independence=!!modal.querySelector('#dip-modal-peace-independence')?.checked,florins=modal.querySelector('#dip-modal-peace-florins')?.value||0;if(executePeaceTreaty1300(gameDiplomacyCountry,cityIds,independence,florins))modal.close();return;}
 if(a==='dip-modal-standard'){const result=runAdvancedDiplomacy1300(id);if(result?.ok)modal.close();return;}
 if(a==='dip-modal-war'){const result=runAdvancedDiplomacy1300('war',{casusBelli:modal.querySelector('#dip-modal-casus-belli')?.value||'no-casus-belli'});if(result?.ok)modal.close();return;}
 if(a==='dip-modal-gift'){const result=runAdvancedDiplomacy1300('gift',{amount:modal.querySelector('#dip-modal-gift-range')?.value});if(result?.ok)modal.close();return;}
 if(a==='dip-modal-money'){requestMoney1300(gameDiplomacyCountry,modal.querySelector('#dip-modal-money-range')?.value);modal.close();return;}
 if(a==='dip-modal-recognition'){requestIndependence1300(gameDiplomacyCountry);modal.close();return;}
 if(a==='dip-modal-sell'){sellCityToCountry1300(gameDiplomacyCountry,modal.querySelector('#dip-modal-sell-city')?.value,modal.querySelector('#dip-modal-sell-price')?.value);modal.close();return;}
 if(a==='dip-modal-support'){requestSupportIndependence1300(gameDiplomacyCountry,modal.querySelector('#dip-modal-support-city')?.value);modal.close();return;}
 if(a==='dip-modal-deal'){const ok=executeDiplomaticDeal1300(gameDiplomacyCountry,modal.querySelector('#dip-modal-deal-offer')?.value,modal.querySelector('#dip-modal-deal-offer-amount')?.value,modal.querySelector('#dip-modal-deal-request')?.value,modal.querySelector('#dip-modal-deal-request-amount')?.value);if(ok)modal.close();return;}
 if(a==='dip-confirm-war'){const g=profile.activeGame,c=b.dataset.country;if(g&&c){const result=performAction(g,PLAYER_REALM,c,'war',diplomacyPowers1300(g,c));if(result.ok){diplomacyLog1300(g,c,result.message);save();}modal.close();renderGameDiplomacyPanel1300();toast(result.message);}return;}
 if(a==='dip-improve'){improveRelations1300(gameDiplomacyCountry);return;}
 if(a==='dip-insult'){insultCountry1300(gameDiplomacyCountry);return;}
 if(a==='dip-war'){declareWar1300(gameDiplomacyCountry);return;}
 if(a==='dip-alliance'){requestAlliance1300(gameDiplomacyCountry);return;}
 if(a==='dip-money'){requestMoney1300(gameDiplomacyCountry,$('#dip-money-amount')?.value);return;}
 if(a==='dip-independence'){requestIndependence1300(gameDiplomacyCountry);return;}
 if(a==='dip-sell-city'){sellCityToCountry1300(gameDiplomacyCountry,$('#dip-sell-city')?.value,$('#dip-sell-price')?.value);return;}
 if(a==='dip-trade'){executeDiplomaticTrade1300(gameDiplomacyCountry,$('#dip-offer-asset')?.value,$('#dip-offer-amount')?.value,$('#dip-request-asset')?.value,$('#dip-request-amount')?.value);return;}
 if(a==='form-country'){formCampaignNation1300(b.dataset.country);return;}
 if(a==='people-group-detail'){openPopulationGroupDetail1300(b.dataset.group);return;}
 if(a==='game-ranking-category'){if(RANKING_CATEGORIES_1300.some(([x])=>x===id)){gameRankingCategory=id;renderGameCountryPanel1300();}return;}
 if(a==='battle-panel-close'){gameBattlePanelId=null;renderGameProvincePanel();return;}
 if(a==='siege-panel-close'){gameSiegePanelId=null;renderGameProvincePanel();return;}
 if(a==='battle-open'){openGameBattlePanel1300(b.dataset.battle);return;}
 if(a==='battle-tactic'){const result=setBattleTactic1300(profile.activeGame,b.dataset.battle,b.dataset.tactic);if(result.ok){save();if(gameBattlePanelId)renderGameBattlePanel1300();renderBattleDialog1300(b.dataset.battle);}toast(result.message);return;}
 if(a==='battle-retreat'){const result=retreatBattle1300(profile.activeGame,b.dataset.battle);if(result.ok){save();syncCampaignMilitaryOverlay1300(profile.activeGame);refreshCampaignResourceBar1300(profile.activeGame);if(gameBattlePanelId)renderGameBattlePanel1300();if(gameArmyPanelKey)renderArmyMapPanel1300();}toast(result.message);return;}
 if(a==='army-panel-close'){gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;renderGameProvincePanel();return;}
 if(a==='army-select-group'){const key=b.dataset.armyKey;if(ensureAdvancedMilitary1300(profile.activeGame)?.armiesByCity?.[key]){gameArmyPanelKey=key;gameArmyMoveMode=false;gameArmySplitMode=false;renderArmyMapPanel1300();}return;}
 if(a==='army-arm-move'){if(gameArmyPanelKey&&!movementForArmy1300(profile.activeGame,gameArmyPanelKey)&&!activeBattleForArmy1300(profile.activeGame,gameArmyPanelKey)){gameArmyMoveMode=!gameArmyMoveMode;gameArmySplitMode=false;renderArmyMapPanel1300();toast(gameArmyMoveMode?'Choose a destination province on the map.':'Movement selection cancelled.');}return;}
 if(a==='army-unify'){if(gameArmyPanelKey){const result=unifyArmiesAtLocation1300(profile.activeGame,gameArmyPanelKey);if(result.ok){gameArmySplitMode=false;save();syncCampaignMilitaryOverlay1300(profile.activeGame);refreshCampaignResourceBar1300(profile.activeGame);}renderArmyMapPanel1300();toast(result.message);}return;}
 if(a==='army-split-toggle'){gameArmySplitMode=!gameArmySplitMode;gameArmyMoveMode=false;renderArmyMapPanel1300();return;}
 if(a==='army-split-confirm'){if(gameArmyPanelKey){const amounts={};document.querySelectorAll('#game-province-panel [data-split-unit]').forEach(el=>amounts[el.dataset.splitUnit]=el.value);const result=createArmyDetachment1300(profile.activeGame,gameArmyPanelKey,amounts);if(result.ok){gameArmyPanelKey=result.key;gameArmySplitMode=false;save();syncCampaignMilitaryOverlay1300(profile.activeGame);refreshCampaignResourceBar1300(profile.activeGame);}renderArmyMapPanel1300();toast(result.message);}return;}
 if(a==='military-train'){const card=b.closest('[data-unit-card]'),amount=card?.querySelector('[data-military-amount]')?.value,result=startProfessionalTraining1300(profile.activeGame,b.dataset.city,b.dataset.unit,amount);if(result.ok){save();renderGameProvincePanel();refreshCampaignResourceBar1300(profile.activeGame);}toast(result.message);return;}
 if(a==='military-raise-levy'){const card=b.closest('[data-unit-card]'),amount=card?.querySelector('[data-military-amount]')?.value,result=startLevyRecruitment1300(profile.activeGame,b.dataset.city,amount);if(result.ok){save();renderGameProvincePanel();}toast(result.message);return;}
 if(a==='military-disband'){const card=b.closest('[data-unit-card]'),amount=card?.querySelector('[data-military-amount]')?.value,n=disbandMilitaryUnits1300(profile.activeGame,b.dataset.city,b.dataset.unit,amount);if(n){save();syncCampaignMilitaryOverlay1300(profile.activeGame);renderGameProvincePanel();refreshCampaignResourceBar1300(profile.activeGame);toast(n+' soldiers returned to civilian life.');}return;}
 if(a==='military-cancel-order'){if(cancelMilitaryOrder1300(profile.activeGame,b.dataset.order)){save();renderGameProvincePanel();toast('Recruitment order cancelled.');}return;}
 if(a==='army-march'){const select=b.closest('.army-march-control')?.querySelector('[data-army-march-target]'),result=startArmyMovement1300(profile.activeGame,b.dataset.city,select?.value);if(result?.ok){save();syncCampaignMilitaryOverlay1300(profile.activeGame);renderGameProvincePanel();}toast(result?.message||'Unable to move army.');return;}
 if(a==='game-build-province'){buyGameProvinceBuilding(b.dataset.city,id);return;}
 if(a==='game-demolish-building'){demolishGameProvinceBuilding1300(b.dataset.city,id);return;}
 if(a==='game-tax-adjust'){changeGameTax1300(b.dataset.delta);return;}
 if(a==='game-tariff-adjust'){setGameTariff1300(id,b.dataset.delta);return;}
 if(a==='game-national-wage-adjust'){changeNationalWage1300(b.dataset.delta);return;}
 if(a==='game-city-wage-adjust'){changeCityWage1300(b.dataset.city,b.dataset.delta);return;}
 if(a==='game-city-wage-reset'){resetCityWage1300(b.dataset.city);return;}
 if(a==='game-building-wage-adjust'){changeBuildingWage1300(b.dataset.city,id,b.dataset.delta);return;}
 if(a==='game-building-wage-reset'){resetBuildingWage1300(b.dataset.city,id);return;}
 if(a==='game-production-methods'){openProductionMethods1300(b.dataset.city,id);return;}
 if(a==='game-select-production-method'){setCompanyPolicy1300(b.dataset.city,id,{productionMethod:b.dataset.method});modal.close();return;}
 if(a==='quit-game'){if(gameClockTimer){clearInterval(gameClockTimer);gameClockTimer=null;}world?.destroy();world=null;profile.activeGame=null;for(const key of ['previousGame','previousGames','pastGame','pastGames','gameHistory','campaignHistory','savedGame','savedGames','lastGame'])delete profile[key];mapState.game=null;gameScreen='map';gameBattlePanelId=null;gameSiegePanelId=null;gameArmyPanelKey=null;gameArmyMoveMode=false;gameArmySplitMode=false;gameProvincePanel=null;gameProvinceTab='general';gameProvinceBuildingDetail=null;gameProvinceBuildingCatalog=false;gameCountryPanel=false;gameDiplomacyCountry=null;save();render();toast('Campaign deleted from this device. Your deck and collection were kept.');return;}
 if(a==='build-building'){buildBuilding1300(b.dataset.city,id);return;}
 if(a==='close')modal.close();
 if(a==='country1300'){country1300=id;render();}
 if(a==='card1300'&&!(modal.open&&modal.classList.contains('card-dialog-1300')))inspectCard1300(id);
 if(a==='reset')showReset();
 if(a==='confirm-reset'){profile.florins=0;profile.buildings={};profile.activeGame=null;mapState.collection={};search1300='';country1300='all';deckSearch='';deckCountry='all';atlasSearch='';atlasRegion=null;selected1300=profile.deck[0]||'1300-seville';buildingCity=selected1300;gameScreen='map';save();render();toast('Campaign economy reset. Your cards, deck and one-time starter packs were kept.');}
 if(a==='locate1300'){selected1300=id;mapState.selected=id;atlasRegion=null;atlasSearch='';navigate('atlas');world.focus(id);app.classList.add('show-panel');}
 if(a==='map-city'){selected1300=id;mapState.selected=id;atlasRegion=null;renderAtlasPanel();world.focus(id);app.classList.add('show-panel');}
 if(a==='inspect-selected')inspectCard1300(selected1300);
 if(a==='all-map-cities'){atlasRegion=null;atlasSearch='';renderAtlasPanel();}
 if(a==='toggle-panel')app.classList.toggle('show-panel');
 if(a==='help')showHelp();
 if(a==='sources')showSources();
 if(a==='export')exportSave();
 if(a==='import')$('#import-file').click();
});
document.addEventListener('contextmenu',e=>{const notice=e.target.closest('[data-notification-id]');if(notice&&profile.activeGame){e.preventDefault();dismissCampaignHudNotification1300(notice.dataset.notificationId);return;}const shield=e.target.closest('[data-country-shield]');if(shield&&profile.activeGame){e.preventDefault();openGameCountryPanel1300();}});
document.addEventListener('input',e=>{if(e.target.id==='city-search-1300'){search1300=e.target.value;renderGrid();}if(e.target.id==='deck-search'){deckSearch=e.target.value;render();}if(e.target.id==='atlas-search'){atlasSearch=e.target.value;const list=CITIES_1300.filter(c=>`${c.name} ${c.subrealm} ${c.historicalRole}`.toLowerCase().includes(atlasSearch.toLowerCase()));$('#atlas-city-list').innerHTML=mapList(list);}if(e.target.id==='stability-budget-range'){setStabilityBudget1300(e.target.value);}if(e.target.matches?.('[data-tech-budget-city]'))setProvinceTechnologyBudget1300(e.target.dataset.techBudgetCity,e.target.value);if(e.target.matches?.('[data-company-target]')){const out=document.querySelector('[data-company-target-value="'+e.target.dataset.city+':'+e.target.dataset.id+'"]');if(out)out.textContent=Math.round(Number(e.target.value)||0)+'%';}if(e.target.matches?.('[data-company-support]')){const out=document.querySelector('[data-company-support-value="'+e.target.dataset.city+':'+e.target.dataset.id+'"]');if(out)out.textContent='ƒ'+money1300(e.target.value)+'/week';}if(['dip-money-amount','dip-sell-price','dip-offer-amount','dip-request-amount'].includes(e.target.id))updateDiplomacyAcceptancePreview1300();if(e.target.closest?.('.diplomacy-action-dialog'))updateDiplomacyActionModalPreview1300();});
document.addEventListener('change',e=>{if(e.target.id==='building-city-select'){buildingCity=e.target.value;render();}if(e.target.id==='country-filter-1300'){country1300=e.target.value;render();}if(e.target.id==='deck-country-filter'){deckCountry=e.target.value;render();}if(e.target.matches?.('[data-company-target]'))setCompanyPolicy1300(e.target.dataset.city,e.target.dataset.id,{employmentTarget:e.target.value});if(e.target.matches?.('[data-company-support]'))setCompanyPolicy1300(e.target.dataset.city,e.target.dataset.id,{buildingSupport:e.target.value});if(e.target.matches?.('[data-company-priority]'))setCompanyPolicy1300(e.target.dataset.city,e.target.dataset.id,{priority:e.target.value});if(['dip-sell-city','dip-offer-asset','dip-request-asset'].includes(e.target.id))updateDiplomacyAcceptancePreview1300();if(e.target.closest?.('.diplomacy-action-dialog'))updateDiplomacyActionModalPreview1300();});
$('#import-file').addEventListener('change',async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;try{if(file.size>1000000)throw new Error();const p=migrateProfile(JSON.parse(await file.text()));if(!p||!validateProfile(p))throw new Error();ensureEconomyProfile(p);ensureGameProfile(p);showDialog(`<div class="simple-dialog"><span class="eyebrow">RESTORE CAMPAIGN</span><h2>Import this 1300 campaign?</h2><p>This replaces your current building progress and treasury with <strong>ƒ ${p.florins.toLocaleString('en-GB')}</strong>.</p><div class="dialog-actions">${button('Cancel','close')}${button('Import and replace','confirm-import','primary')}</div></div>`);modal.querySelector('[data-action="confirm-import"]').addEventListener('click',()=>{profile=p;save();navigate('collection');toast('1300 campaign imported.');},{once:true});}catch{toast('Invalid campaign file. Your existing progress was kept.');}});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
render();window.__CARDWARS_BOOTED__=true;if(storageFailed)toast('A saved collection could not be loaded. You can import a backup from the guide.');
