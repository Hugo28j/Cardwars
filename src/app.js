import {CITIES_1300,CITY_1300,SUPPORT_TERRITORIES_1300,RARITIES_1300,RARITY_COLORS_1300,RESEARCH_1300_NOTE} from './data1300.js?v=20260921-starting-florins-v4';
import {freshProfile,migrateProfile,validateProfile} from './engine.js?v=20260921-player-realm-v7';
import {ECONOMY_1300,BUILDINGS_1300,BUILDING_1300,isCoastalCity1300,startingBuildingLevel1300,buildingCost1300} from './buildings1300.js?v=20260922-buildings-25-v5';
import {icon} from './icons.js';
import {GOOGLE_CLIENT_ID} from './auth-config.js?v=20260921-auth-v1';
import {WorldMap} from './map.js?v=20260921-military-map-pieces-v15';

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
 {id:'ale',name:'Ale',basePrice:30,category:'consumer'},
 {id:'services',name:'Services',basePrice:26,category:'service'},
 {id:'manuscripts',name:'Manuscripts',basePrice:55,category:'knowledge'},
 {id:'arms',name:'Arms',basePrice:58,category:'military'},
 {id:'ships',name:'Ships',basePrice:75,category:'military'}
];
const GOOD_1300=Object.fromEntries(GOODS_1300.map(g=>[g.id,g]));

const BUILDING_PRODUCTION_1300={
 fields:{professions:{farmers:.78,laborers:.22},inputs:{tools:.4},outputs:{grain:30}},
 pastures:{professions:{farmers:.72,laborers:.28},inputs:{tools:.25},outputs:{meat:9,wool:15}},
 textiles:{professions:{craftsmen:.68,laborers:.27,merchants:.05},inputs:{wool:12,tools:.7},outputs:{cloth:15}},
 forge:{professions:{craftsmen:.62,laborers:.30,merchants:.08},inputs:{iron:9,wood:3},outputs:{tools:7,arms:4}},
 market:{professions:{merchants:.55,laborers:.35,clerks:.10},inputs:{cloth:.8,ale:.6},outputs:{services:18}},
 barracks:{professions:{soldiers:.78,officers:.08,laborers:.14},inputs:{grain:3,arms:1.2},outputs:{services:4}},
 dockyard:{professions:{craftsmen:.48,laborers:.42,merchants:.10},inputs:{wood:12,cloth:3,tools:2},outputs:{ships:3}},
 walls:{professions:{laborers:.75,craftsmen:.25},inputs:{stone:5,wood:1},outputs:{services:2}},
 guildhall:{professions:{craftsmen:.50,merchants:.28,clerks:.22},inputs:{cloth:1,tools:.8},outputs:{services:14}},
 university:{professions:{scholars:.50,clergy:.25,clerks:.25},inputs:{manuscripts:2},outputs:{services:9,manuscripts:1}},
 watermill:{professions:{laborers:.48,craftsmen:.32,farmers:.20},inputs:{wood:.8,tools:.8},outputs:{grain:18}},
 brewery:{professions:{craftsmen:.55,laborers:.35,merchants:.10},inputs:{grain:11,wood:.5},outputs:{ale:14}},
 tannery:{professions:{craftsmen:.55,laborers:.40,merchants:.05},inputs:{meat:4,salt:1},outputs:{leather:8}},
 fishery:{professions:{laborers:.78,merchants:.12,craftsmen:.10},inputs:{wood:.6,salt:.5},outputs:{fish:22}},
 saltworks:{professions:{laborers:.80,merchants:.12,craftsmen:.08},inputs:{wood:.5},outputs:{salt:16}},
 quarry:{professions:{laborers:.84,craftsmen:.16},inputs:{tools:1.1},outputs:{stone:20}},
 lumberyard:{professions:{laborers:.82,craftsmen:.18},inputs:{tools:.8},outputs:{wood:21}},
 warehouse:{professions:{merchants:.42,laborers:.38,clerks:.20},inputs:{wood:.5},outputs:{services:17}},
 merchantquarter:{professions:{merchants:.58,clerks:.27,laborers:.15},inputs:{cloth:1.2,ale:.8},outputs:{services:24}},
 customshouse:{professions:{clerks:.48,merchants:.32,laborers:.20},inputs:{manuscripts:.25},outputs:{services:17}},
 mint:{professions:{craftsmen:.40,clerks:.35,merchants:.25},inputs:{iron:2,tools:.5},outputs:{services:19}},
 bridge:{professions:{laborers:.52,merchants:.28,clerks:.20},inputs:{wood:.5,stone:.35},outputs:{services:15}},
 monastery:{professions:{clergy:.58,farmers:.20,scholars:.12,laborers:.10},inputs:{grain:2},outputs:{manuscripts:1.6,services:6}},
 cathedral:{professions:{clergy:.55,clerks:.20,scholars:.15,laborers:.10},inputs:{grain:1,cloth:.5},outputs:{services:10,manuscripts:.7}},
 hospital:{professions:{clergy:.30,clerks:.20,laborers:.50},inputs:{grain:2,cloth:1},outputs:{services:9}}
};

const POP_ARCHETYPES=[
 {id:'peasants',name:'Peasants',wealth:8},{id:'laborers',name:'Laborers',wealth:9},
 {id:'craftsmen',name:'Craftsmen',wealth:12},{id:'burghers',name:'Burghers',wealth:16},
 {id:'clergy',name:'Clergy',wealth:15},{id:'nobles',name:'Nobles',wealth:22}
];
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const round=(n,p=4)=>{const m=10**p;return Math.round((Number(n)||0)*m)/m;};
const WEEKS_PER_MONTH=52/12,FLORINS_PER_MARKET_VALUE=.0025;

function blankGood(g,previous){const price=Number(previous?.price);return {goodId:g.id,supply:0,demand:0,price:Number.isFinite(price)&&price>0?price:g.basePrice,targetPrice:g.basePrice,basePrice:g.basePrice};}
function ensureMarket(previous={}){const goods={};for(const g of GOODS_1300)goods[g.id]=blankGood(g,previous?.goods?.[g.id]);return {goods,marketAccess:Number.isFinite(Number(previous?.marketAccess))?Number(previous.marketAccess):1,priceIndex:Number.isFinite(Number(previous?.priceIndex))?Number(previous.priceIndex):1};}
function addOrder(row,key,amount){if(row&&Number(amount)>0)row[key]+=Number(amount);}
function normalizedPrice(market,id){const g=GOOD_1300[id],p=market.goods[id]?.price||g?.basePrice||1;return p/(g?.basePrice||p||1);}
function allocateSubstitutes(market,ids,total,preferences={}){const weighted=ids.map(id=>[id,(preferences[id]??1)/Math.max(.25,normalizedPrice(market,id))]),sum=weighted.reduce((n,[,w])=>n+w,0)||1;return Object.fromEntries(weighted.map(([id,w])=>[id,total*w/sum]));}
function createPopGroups(city,previous){
 const population=Math.max(1,Number(city.population)||1),urban=clamp((Number(city.economy)||50)/100,0,1),tech=clamp((Number(city.technology)||50)/100,0,1),shares={peasants:clamp(.68-urban*.30-tech*.08,.28,.68),laborers:.16+urban*.08,craftsmen:.07+urban*.07,burghers:.04+urban*.07,clergy:.04,nobles:.03},total=Object.values(shares).reduce((a,b)=>a+b,0);
 return POP_ARCHETYPES.map(a=>{const old=previous?.groups?.find(g=>g.id===a.id),size=Math.round(population*(shares[a.id]/total));return {id:a.id,name:a.name,size,wealth:round(old?.wealth??a.wealth,2),standardOfLiving:round(old?.standardOfLiving??a.wealth,2),employed:Math.round(Number(old?.employed)||0)};});
}
function ambientSupply(city,market){
 const k=Math.max(.1,Number(city.population||0)/1000),food=clamp(Number(city.food)||50,0,100)/100,econ=clamp(Number(city.economy)||50,0,100)/100;
 addOrder(market.goods.grain,'supply',k*(.55+food*.65));addOrder(market.goods.meat,'supply',k*(.07+food*.10));addOrder(market.goods.wool,'supply',k*(.09+food*.10));addOrder(market.goods.wood,'supply',k*(.14+food*.14));addOrder(market.goods.stone,'supply',k*(.04+econ*.04));addOrder(market.goods.iron,'supply',k*(.012+econ*.018));addOrder(market.goods.salt,'supply',k*.025);addOrder(market.goods.services,'supply',k*(.12+econ*.18));if(city.coastal)addOrder(market.goods.fish,'supply',k*.18);
}
function popOrders(city,market,popState){
 const k=Math.max(.1,Number(city.population||0)/1000),groups=popState.groups||[],pop=Math.max(1,groups.reduce((n,g)=>n+g.size,0)),avgWealth=groups.reduce((n,g)=>n+g.wealth*g.size,0)/pop,wealthFactor=clamp(.75+(avgWealth-8)*.025,.7,1.45),food=allocateSubstitutes(market,['grain','fish','meat'],k*.78,{grain:1.25,fish:city.coastal?1.1:.55,meat:.7});
 for(const [id,n] of Object.entries(food))addOrder(market.goods[id],'demand',n);
 addOrder(market.goods.cloth,'demand',k*.09*wealthFactor);addOrder(market.goods.wood,'demand',k*.035);addOrder(market.goods.salt,'demand',k*.04);addOrder(market.goods.ale,'demand',k*.065*wealthFactor);addOrder(market.goods.leather,'demand',k*.025*wealthFactor);addOrder(market.goods.services,'demand',k*(.10+.07*wealthFactor));if(avgWealth>15){addOrder(market.goods.manuscripts,'demand',k*.006*(avgWealth-14));addOrder(market.goods.cloth,'demand',k*.025);}
}
function infrastructure(city){const levels=(city.sectors||[]).reduce((n,s)=>n+(Number(s.level)||0),0),support=(city.sectors||[]).reduce((n,s)=>n+(['market','warehouse','merchantquarter','customshouse','bridge','dockyard'].includes(s.id)?Number(s.level)||0:0),0),capacity=10+(Number(city.economy)||50)/5+support*4,usage=Math.max(1,levels*1.7);return {capacity,usage,access:clamp(capacity/usage,.35,1)};}
function updatePrices(market){
 for(const g of GOODS_1300){const row=market.goods[g.id],s=row.supply,d=row.demand,imbalance=(d-s)/Math.max(s,d,1),modifier=clamp(imbalance*.75,-.75,.75);row.targetPrice=round(g.basePrice*(1+modifier),4);row.price=round(row.price+(row.targetPrice-row.price)*.15,4);}
 const basket=[['grain',.34],['fish',.08],['meat',.08],['cloth',.18],['salt',.07],['ale',.08],['services',.17]];market.priceIndex=round(basket.reduce((n,[id,w])=>n+normalizedPrice(market,id)*w,0),4);
}
function sectorPotential(sector,city){const def=BUILDING_PRODUCTION_1300[sector.id]||{inputs:{},outputs:{services:1}},level=Math.max(0,Number(sector.level)||0),capacity=Math.max(1,Number(sector.capacity)||1),workers=clamp(Number(sector.workers)||0,0,capacity),employmentRatio=workers/capacity,technologyFactor=.86+clamp(Number(city.technology)||50,0,100)/500,economyOfScale=1+Math.min(level*.01,.30);return {def,level,capacity,workers,employmentRatio,potential:level*employmentRatio*technologyFactor*economyOfScale};}
function updatePops(city,market,previous,sectors){
 const groups=createPopGroups(city,previous),population=groups.reduce((n,g)=>n+g.size,0)||1,totalWorkers=sectors.reduce((n,s)=>n+s.workers,0),employmentRate=clamp(totalWorkers/Math.max(1,Number(city.labourPool)||population*.34),0,1),weightedWage=sectors.reduce((n,s)=>n+s.wage*s.workers,0)/Math.max(1,totalWorkers),realWage=(weightedWage||.08)/.12/Math.max(.45,market.priceIndex),employedTotal=Math.min(totalWorkers,Math.round(population*.34));
 let remaining=employedTotal;for(const id of ['craftsmen','laborers','burghers','peasants','clergy','nobles']){const g=groups.find(x=>x.id===id);if(!g)continue;const cap=Math.round(g.size*(id==='peasants'?.45:.72)),take=Math.min(cap,remaining);g.employed=take;remaining-=take;}
 for(const g of groups){const employment=g.size?g.employed/g.size:0,base=POP_ARCHETYPES.find(x=>x.id===g.id)?.wealth||10,target=base+(realWage-1)*2.4+(employment-.45)*1.6;g.wealth=round(clamp(g.wealth+(target-g.wealth)*.08,3,35),2);g.standardOfLiving=round(clamp(g.wealth+(1-market.priceIndex)*1.2,2,40),2);}
 return {groups,employmentRate:round(employmentRate,4),averageWealth:round(groups.reduce((n,g)=>n+g.wealth*g.size,0)/population,2),averageStandardOfLiving:round(groups.reduce((n,g)=>n+g.standardOfLiving*g.size,0)/population,2)};
}

function simulateWeeklyEconomy1300({cities=[],previousMarkets={},previousPops={},taxRate=10,taxCollectionFactor=.35}={}){
 const markets={},pops={},sectorsByCity={};let weeklyTax=0;
 for(const city of cities){
  const market=markets[city.id]=ensureMarket(previousMarkets?.[city.id]),popState={groups:createPopGroups(city,previousPops?.[city.id])};ambientSupply(city,market);popOrders(city,market,popState);
  for(const sector of city.sectors||[]){if((Number(sector.level)||0)<=0)continue;const p=sectorPotential(sector,city);for(const [id,n] of Object.entries(p.def.inputs||{}))addOrder(market.goods[id],'demand',n*p.potential);for(const [id,n] of Object.entries(p.def.outputs||{}))addOrder(market.goods[id],'supply',n*p.potential);}
 }
 for(const market of Object.values(markets))updatePrices(market);
 for(const city of cities){
  const market=markets[city.id],infra=infrastructure(city),rows=sectorsByCity[city.id]={};market.marketAccess=round(infra.access,4);
  for(const sector of city.sectors||[]){
   if((Number(sector.level)||0)<=0)continue;const p=sectorPotential(sector,city),inputIds=Object.keys(p.def.inputs||{}),availability=inputIds.length?Math.min(...inputIds.map(id=>clamp(market.goods[id].supply/Math.max(market.goods[id].demand,1e-6),.15,1))):1,throughput=clamp(p.employmentRatio*availability*infra.access,0,1.15),scale=p.level*throughput*(.86+clamp(Number(city.technology)||50,0,100)/500)*(1+Math.min(p.level*.01,.30));
   let revenueValue=0,inputValue=0;const outputs={},inputs={};
   for(const [id,n] of Object.entries(p.def.outputs||{})){const q=n*scale;outputs[id]=round(q,3);revenueValue+=q*market.goods[id].price;}
   for(const [id,n] of Object.entries(p.def.inputs||{})){const q=n*scale;inputs[id]=round(q,3);inputValue+=q*market.goods[id].price;}
   const weeklyRevenue=revenueValue*FLORINS_PER_MARKET_VALUE,weeklyInputCost=inputValue*FLORINS_PER_MARKET_VALUE,weeklyWageCost=(p.workers/1000)*Math.max(.01,Number(sector.wage)||.01),weeklyProfit=weeklyRevenue-weeklyInputCost-weeklyWageCost,weeklySectorTax=Math.max(0,weeklyProfit)*(clamp(Number(taxRate)||0,0,100)/100)*taxCollectionFactor;weeklyTax+=weeklySectorTax;
   const monthly=x=>round(x*WEEKS_PER_MONTH,4);rows[sector.id]={workers:p.workers,capacity:p.capacity,wage:Number(sector.wage)||0,employmentRatio:round(p.employmentRatio,4),inputAvailability:round(availability,4),marketAccess:round(infra.access,4),throughput:round(throughput,4),inputs,outputs,gross:monthly(weeklyRevenue),inputCost:monthly(weeklyInputCost),wageBill:monthly(weeklyWageCost),profit:monthly(weeklyProfit),tax:monthly(weeklySectorTax)};
  }
  pops[city.id]=updatePops(city,market,previousPops?.[city.id],Object.values(rows));
 }
 return {markets,pops,sectorsByCity,weeklyTax:round(weeklyTax,4),monthlyTaxEstimate:round(weeklyTax*WEEKS_PER_MONTH,2)};
}
function aggregateMarkets1300(markets={}){
 const rows={};for(const g of GOODS_1300)rows[g.id]={id:g.id,name:g.name,basePrice:g.basePrice,supply:0,demand:0,priceWeighted:0,weight:0};
 for(const market of Object.values(markets||{}))for(const g of GOODS_1300){const m=market?.goods?.[g.id];if(!m)continue;const weight=Math.max(1,m.supply+m.demand);rows[g.id].supply+=m.supply;rows[g.id].demand+=m.demand;rows[g.id].priceWeighted+=m.price*weight;rows[g.id].weight+=weight;}
 return Object.values(rows).map(r=>{const price=r.weight?r.priceWeighted/r.weight:r.basePrice;return {...r,supply:round(r.supply,2),demand:round(r.demand,2),price:round(price,2),changePct:round((price/r.basePrice-1)*100,1)};});
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
let view='collection',country1300='all',search1300='',deckCountry='all',deckSearch='',world=null,selected1300='1300-seville',buildingCity='1300-seville',gameScreen='map',gameProvincePanel=null,gameProvinceBuildingDetail=null,gameCountryPanel=false,gameCountryTab='politics',gameDiplomacyCountry=null,gameRankingCategory='overall',gameClockTimer=null,flagPaintColor='#f2e7c9',atlasRegion=null,atlasSearch='',rankingCategory='overall',toastTimer;
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
  for(const [buildingId,n] of Object.entries(levels))if(validBuildings.has(buildingId)&&Number.isSafeInteger(n)&&n>0)clean[buildingId]=Math.min(ECONOMY_1300.maxBuildingLevel,n);
  if(Object.keys(clean).length)p.buildings[cityId]=clean;else delete p.buildings[cityId];
 }
}
ensureEconomyProfile(profile);
const GAME_WAGE_MIN=.02,GAME_WAGE_MAX=.50,GAME_WAGE_STEP=.02,GAME_TAX_MIN=0,GAME_TAX_MAX=30,GAME_TAX_COLLECTION_FACTOR=.35;
const GAME_MONTHS_1300=['January','February','March','April','May','June','July','August','September','October','November','December'];
const clamp1300=(n,min,max)=>Math.max(min,Math.min(max,n));
const money1300=n=>(Number(n)||0).toFixed(2);
function freshGameEconomy1300(){return {taxRate:10,nationalWage:.12,cityWages:{},buildingWages:{},employment:{},lastEconomy:{},markets:{},pops:{},dynamicStats:{},technologyBudgets:{},lastStatChanges:{},lastMarketTickDay:null,monthlyTax:0,monthRevenue:0,monthExpenses:0,lastMonthRevenue:0,lastMonthExpenses:0,lastMonthBalance:0,lastMonthLabel:'No completed month yet',stabilityBudget:0,stabilityModifier:0,corruption:20,lastStabilityChange:0};}
function freshGameDiplomacy1300(){return {relations:{},alliances:{},wars:{},recognitions:{},tradeStockpile:{},aiTreasuries:{},aiGoods:{},lastImproveDay:{},history:[]};}
function normaliseGameDiplomacy1300(raw){
 const d=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshGameDiplomacy1300();
 for(const key of ['relations','alliances','wars','recognitions','tradeStockpile','aiTreasuries','aiGoods','lastImproveDay'])if(!d[key]||typeof d[key]!=='object'||Array.isArray(d[key]))d[key]={};
 for(const g of GOODS_1300)d.tradeStockpile[g.id]=Math.max(0,Math.round((Number(d.tradeStockpile[g.id])||0)*100)/100);
 d.history=Array.isArray(d.history)?d.history.slice(-40):[];
 return d;
}
function diplomacyRelation1300(game,country){const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);return clamp1300(Math.round(Number(d.relations[country])||0),-100,100);}
function setDiplomacyRelation1300(game,country,value){const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);d.relations[country]=clamp1300(Math.round(value),-100,100);return d.relations[country];}
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
function ensureDiplomacyCountry1300(game,country){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy),stats=diplomacyCountryStats1300(country),model=diplomacyCountryGoodsModel1300(country);
 if(!Number.isFinite(Number(d.relations[country])))d.relations[country]=0;
 if(!Number.isFinite(Number(d.aiTreasuries[country])))d.aiTreasuries[country]=Math.round(Math.max(25,45+(stats.economyAvg||50)*1.8+(stats.cityCount||1)*12+(stats.population||0)/22000)*100)/100;
 if(!d.aiGoods[country]||typeof d.aiGoods[country]!=='object'||Array.isArray(d.aiGoods[country]))d.aiGoods[country]={};
 for(const g of GOODS_1300)if(!Number.isFinite(Number(d.aiGoods[country][g.id])))d.aiGoods[country][g.id]=Math.round(Math.max(0,(model.balances[g.id]||0)*3+Math.max(2,model.popK*.05))*100)/100;
 return {d,stats,model};
}
function accrueTradeSurplus1300(game,markets){
 const d=game.diplomacy=normaliseGameDiplomacy1300(game.diplomacy);
 for(const row of aggregateMarkets1300(markets||{})){const surplus=Math.max(0,(Number(row.supply)||0)-(Number(row.demand)||0));if(surplus>0)d.tradeStockpile[row.id]=Math.round(Math.min(9999,(Number(d.tradeStockpile[row.id])||0)+surplus*.35)*100)/100;}
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
 return `<div class="dip-acceptance-meter ${acceptanceClass1300(n)}"><div><strong>Acceptance</strong><span>${n}% · ${acceptanceLabel1300(n).toUpperCase()}</span></div><i><b style="width:${n}%"></b><em></em></i>${note?`<small>${esc(note)}</small>`:''}</div>`;
}
function diplomacyGoodInterest1300(model,goodId){
 if(goodId==='florins')return 1;
 const balance=Number(model?.balances?.[goodId])||0,scale=Math.max(3,(Number(model?.popK)||1)*.08),pressure=clamp1300(balance/scale,-1.4,1.4);
 return clamp1300(1-pressure*.48,.34,1.75);
}
function allianceAssessment1300(game,country){
 const {d,stats}=ensureDiplomacyCountry1300(game,country),rel=diplomacyRelation1300(game,country);
 if(d.wars[country])return {score:0,note:'War makes an alliance impossible.'};
 if(d.alliances[country])return {score:100,note:'An alliance is already active.'};
 const ratio=diplomacyPlayerStrength1300(game)/Math.max(1,stats.strength||1),power=clamp1300(Math.log2(Math.max(.15,ratio))*12,-20,20),score=clamp1300(Math.round(28+rel*.55+power+(d.recognitions[country]?6:0)),1,99);
 return {score,note:rel<20?'Relations are still too cold for a serious alliance.':ratio<.55?'They see your realm as too weak to be a useful ally.':ratio>2.5?'Your strength makes the alliance useful, but also somewhat threatening.':'Relations and strategic strength both affect this decision.'};
}
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
 if(!on||!rn||oa===ra)return {score:0,note:'Choose two different assets and enter both amounts.'};
 if(oa==='florins'&&game.florins<on)return {score:0,note:'You cannot afford your own offer.'};
 if(oa!=='florins'&&(Number(d.tradeStockpile[oa])||0)<on)return {score:0,note:`You do not have enough ${GOOD_1300[oa]?.name||oa} in trade stock.`};
 if(ra==='florins'&&d.aiTreasuries[country]<rn)return {score:0,note:'Their treasury cannot cover this request.'};
 if(ra!=='florins'&&(Number(d.aiGoods[country]?.[ra])||0)<rn)return {score:0,note:`They do not have enough ${GOOD_1300[ra]?.name||ra} available.`};
 const offerInterest=diplomacyGoodInterest1300(model,oa),requestInterest=diplomacyGoodInterest1300(model,ra),offerValue=diplomacyAssetValue1300(oa,on)*offerInterest,requestValue=diplomacyAssetValue1300(ra,rn)*requestInterest,ratio=offerValue/Math.max(.0001,requestValue),score=clamp1300(Math.round(50+(ratio-1)*58+rel*.18),1,99);
 let note='The AI compares the value of both sides of the deal.';
 if(oa!=='florins'&&offerInterest>=1.25)note=`They currently need ${GOOD_1300[oa]?.name||oa}, so your offer is especially valuable.`;
 else if(oa!=='florins'&&offerInterest<=.7)note=`They already have plenty of ${GOOD_1300[oa]?.name||oa}, so they value your offer less.`;
 else if(ra!=='florins'&&requestInterest<=.7)note=`They have a surplus of ${GOOD_1300[ra]?.name||ra}, so they are happy to trade it away.`;
 else if(ra!=='florins'&&requestInterest>=1.25)note=`${GOOD_1300[ra]?.name||ra} is scarce for them, so they are reluctant to give it away.`;
 return {score,note,offerInterest,requestInterest,offerValue,requestValue,ratio};
}
function improveRelations1300(country){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),last=Number(d.lastImproveDay[country]);
 if(d.wars[country]){toast('You cannot improve relations while at war.');return;}
 if(Number.isFinite(last)&&(Number(game.day)||0)-last<30){toast('Your envoys already visited this country recently. Try again after 30 campaign days.');return;}
 if(game.florins<5){toast('You need ƒ5.00 for envoys and gifts.');return;}
 game.florins=Math.round((game.florins-5)*100)/100;d.lastImproveDay[country]=Number(game.day)||0;setDiplomacyRelation1300(game,country,diplomacyRelation1300(game,country)+12);diplomacyLog1300(game,country,'Sent envoys and gifts (+12 relations, ƒ5.00).');save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(`Relations with ${country} improved.`);
}
function insultCountry1300(country){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country);setDiplomacyRelation1300(game,country,diplomacyRelation1300(game,country)-20);d.alliances[country]=false;diplomacyLog1300(game,country,'Delivered an insult (−20 relations).');save();renderGameDiplomacyPanel1300();toast(`${country} has been insulted.`);
}
function declareWar1300(country){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country);if(d.wars[country])return;
 d.wars[country]=true;d.alliances[country]=false;setDiplomacyRelation1300(game,country,-100);diplomacyLog1300(game,country,'War declared.');save();renderGameDiplomacyPanel1300();toast(`War declared on ${country}. Combat and occupations can now be expanded on top of this war state.`);
}
function requestAlliance1300(country){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),rel=diplomacyRelation1300(game,country),assessment=allianceAssessment1300(game,country);if(d.wars[country]){toast('You cannot request an alliance while at war.');return;}if(d.alliances[country]){toast('You are already allied.');return;}
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-3);diplomacyLog1300(game,country,`Alliance request rejected (${assessment.score}% acceptance).`);toast(`${country} rejected the alliance.`);}else{d.alliances[country]=true;setDiplomacyRelation1300(game,country,rel+8);diplomacyLog1300(game,country,`Alliance accepted (${assessment.score}% acceptance).`);toast(`${country} accepted your alliance.`);}save();renderGameDiplomacyPanel1300();
}
function requestMoney1300(country,amount){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),n=Math.round(Math.max(0,Number(amount)||0)*100)/100,rel=diplomacyRelation1300(game,country),assessment=moneyRequestAssessment1300(game,country,n);
 if(!n){toast('Enter an amount of Florins to request.');return;}if(d.wars[country]){toast('They will not fund you while at war.');return;}if(n>d.aiTreasuries[country]){toast(`${country} does not have that much available treasury.`);return;}
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-2);diplomacyLog1300(game,country,`Request for ƒ${money1300(n)} rejected (${assessment.score}% acceptance).`);toast(`${country} refused the request.`);}else{d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-n)*100)/100;game.florins=Math.round((game.florins+n)*100)/100;setDiplomacyRelation1300(game,country,rel+1);diplomacyLog1300(game,country,`Received ƒ${money1300(n)} in financial aid (${assessment.score}% acceptance).`);toast(`${country} sent ƒ${money1300(n)}.`);}save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();
}
function requestIndependence1300(country){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),pending=(game.ownedCities||[]).filter(id=>(game.originCountryByCity?.[id]||CITY_1300[id]?.country)===country&&game.independenceByCity?.[id]!==true);
 if(!pending.length){toast('You have no unrecognised rebel provinces from this country.');return;}if(d.wars[country]){toast('Recognition cannot be negotiated while you are at war.');return;}
 const assessment=independenceAssessment1300(game,country),rel=diplomacyRelation1300(game,country);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-4);diplomacyLog1300(game,country,`Independence recognition rejected for ${pending.length} province${pending.length===1?'':'s'} (${assessment.score}% acceptance).`);toast(`${country} refused to recognise your independence.`);}
 else{for(const id of pending)game.independenceByCity[id]=true;d.recognitions[country]=true;setDiplomacyRelation1300(game,country,Math.max(15,rel+10));refreshCampaignStage1300(game);diplomacyLog1300(game,country,`Recognised the independence of ${pending.length} rebel province${pending.length===1?'':'s'} (${assessment.score}% acceptance).`);toast(`${country} recognised your independence.`);}
 updateCampaignRankingSnapshot1300(game);save();renderGameDiplomacyPanel1300();renderGameCountryPanel1300();
}
function sellCityToCountry1300(country,cityId,price){
 const game=profile.activeGame;if(!game||!country)return;const c=CITY_1300[cityId],{d}=ensureDiplomacyCountry1300(game,country),n=Math.round(Math.max(0,Number(price)||0)*100)/100;if(!c||!game.ownedCities?.includes(cityId)){toast('Choose one of your provinces.');return;}if(game.ownedCities.length<=1){toast('You cannot sell your final province.');return;}if(d.wars[country]){toast('You cannot peacefully sell a city while at war.');return;}if(n>d.aiTreasuries[country]){toast(`${country} cannot afford that price.`);return;}
 const rel=diplomacyRelation1300(game,country),assessment=citySaleAssessment1300(game,country,cityId,n);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-2);diplomacyLog1300(game,country,`Rejected offer to buy ${displayCityName1300(c)} for ƒ${money1300(n)} (${assessment.score}% acceptance).`);save();renderGameDiplomacyPanel1300();toast(`${country} rejected the city price.`);return;}
 d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-n)*100)/100;game.florins=Math.round((game.florins+n)*100)/100;game.ownedCities=game.ownedCities.filter(id=>id!==cityId);game.cityOwners??={};game.cityOwners[cityId]=country;delete game.buildings?.[cityId];for(const key of ['employment','lastEconomy','markets','pops','cityWages'])delete game.economy?.[key]?.[cityId];delete game.economy?.buildingWages?.[cityId];setDiplomacyRelation1300(game,country,rel+5);diplomacyLog1300(game,country,`Bought ${displayCityName1300(c)} for ƒ${money1300(n)}.`);refreshCampaignStage1300(game);updateCampaignRankingSnapshot1300(game);if(world?.state?.game){world.state.game.ownedCityIds=[...game.ownedCities];world.state.game.militaryByCity=campaignMilitaryByCity1300(game);world.refresh();}if(gameProvincePanel===cityId){gameProvincePanel=null;gameProvinceBuildingDetail=null;renderGameProvincePanel();}save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(`${displayCityName1300(c)} was sold to ${country}.`);
}
function diplomacyAssetValue1300(asset,amount){if(asset==='florins')return Number(amount)||0;const g=GOOD_1300[asset];return (Number(amount)||0)*(Number(g?.basePrice)||1)*FLORINS_PER_MARKET_VALUE;}
function executeDiplomaticTrade1300(country,offerAsset,offerAmount,requestAsset,requestAmount){
 const game=profile.activeGame;if(!game||!country)return;const {d}=ensureDiplomacyCountry1300(game,country),oa=String(offerAsset||''),ra=String(requestAsset||''),on=Math.round(Math.max(0,Number(offerAmount)||0)*100)/100,rn=Math.round(Math.max(0,Number(requestAmount)||0)*100)/100,assessment=tradeAssessment1300(game,country,oa,on,ra,rn);if(!on||!rn||oa===ra){toast('Choose two different assets and enter both amounts.');return;}if(d.wars[country]){toast('Normal trade is suspended while at war.');return;}
 if(oa==='florins'){if(game.florins<on){toast('You do not have enough Florins for this offer.');return;}}else if((Number(d.tradeStockpile[oa])||0)<on){toast(`You only have ${money1300(d.tradeStockpile[oa]||0)} ${GOOD_1300[oa]?.name||oa} in trade stock.`);return;}
 if(ra==='florins'){if(d.aiTreasuries[country]<rn){toast(`${country} cannot pay that many Florins.`);return;}}else if((Number(d.aiGoods[country]?.[ra])||0)<rn){toast(`${country} does not have that much ${GOOD_1300[ra]?.name||ra} available.`);return;}
 const rel=diplomacyRelation1300(game,country);
 if(!diplomacyAccepts1300(assessment.score)){setDiplomacyRelation1300(game,country,rel-1);diplomacyLog1300(game,country,`Rejected trade proposal (${assessment.score}% acceptance): ${assessment.note}`);save();renderGameDiplomacyPanel1300();toast(`${country} rejected the trade.`);return;}
 if(oa==='florins'){game.florins=Math.round((game.florins-on)*100)/100;d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]+on)*100)/100;}else{d.tradeStockpile[oa]=Math.round((d.tradeStockpile[oa]-on)*100)/100;d.aiGoods[country][oa]=Math.round(((Number(d.aiGoods[country][oa])||0)+on)*100)/100;}
 if(ra==='florins'){d.aiTreasuries[country]=Math.round((d.aiTreasuries[country]-rn)*100)/100;game.florins=Math.round((game.florins+rn)*100)/100;}else{d.aiGoods[country][ra]=Math.round((d.aiGoods[country][ra]-rn)*100)/100;d.tradeStockpile[ra]=Math.round(((Number(d.tradeStockpile[ra])||0)+rn)*100)/100;}
 setDiplomacyRelation1300(game,country,rel+1);diplomacyLog1300(game,country,`Trade completed (${assessment.score}% acceptance): offered ${on} ${oa==='florins'?'Florins':GOOD_1300[oa]?.name||oa}, received ${rn} ${ra==='florins'?'Florins':GOOD_1300[ra]?.name||ra}.`);save();renderGameDiplomacyPanel1300();refreshGameClockUI1300();toast(`Trade with ${country} completed.`);
}
function normaliseGameEconomy1300(raw){
 const e=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshGameEconomy1300(),hadDynamic=!!(e.dynamicStats&&typeof e.dynamicStats==='object'&&!Array.isArray(e.dynamicStats));
 e.taxRate=clamp1300(Math.round(Number.isFinite(Number(e.taxRate))?Number(e.taxRate):10),GAME_TAX_MIN,GAME_TAX_MAX);
 e.nationalWage=clamp1300(Math.round((Number(e.nationalWage)||.12)*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);
 for(const key of ['cityWages','buildingWages','employment','lastEconomy','markets','pops','dynamicStats','technologyBudgets','lastStatChanges'])if(!e[key]||typeof e[key]!=='object'||Array.isArray(e[key]))e[key]={};
 e.lastMarketTickDay=Number.isFinite(Number(e.lastMarketTickDay))?Number(e.lastMarketTickDay):null;
 e.monthlyTax=Math.max(0,Number.isFinite(Number(e.monthlyTax))?Number(e.monthlyTax):(Number(e.dailyTax)||0));
 for(const key of ['monthRevenue','monthExpenses','lastMonthRevenue','lastMonthExpenses','lastMonthBalance'])e[key]=Number.isFinite(Number(e[key]))?Number(e[key]):0;
 e.stabilityBudget=clamp1300(Math.round((hadDynamic&&Number.isFinite(Number(e.stabilityBudget))?Number(e.stabilityBudget):0)*100)/100,0,10000);
 e.stabilityModifier=0;
 e.corruption=clamp1300(Number.isFinite(Number(e.corruption))?Number(e.corruption):20,0,100);
 e.lastStabilityChange=Number.isFinite(Number(e.lastStabilityChange))?Number(e.lastStabilityChange):0;
 if(typeof e.lastMonthLabel!=='string')e.lastMonthLabel='No completed month yet';
 return e;
}
function gameDate1300(dayIndex=0){
 const d=new Date(Date.UTC(1300,0,1+Math.max(0,Math.floor(Number(dayIndex)||0))));
 return {day:d.getUTCDate(),month:GAME_MONTHS_1300[d.getUTCMonth()],year:d.getUTCFullYear()};
}
const GAME_ARMY_UPKEEP_PER_UNIT=.005,GAME_NAVY_UPKEEP_PER_UNIT=.02;
const roundStat1300=n=>Math.round((Number(n)||0)*100)/100;
function completedCampaignMonths1300(game){
 const d=new Date(Date.UTC(1300,0,1+Math.max(0,Math.floor(Number(game?.day)||0))));
 return Math.max(0,(d.getUTCFullYear()-1300)*12+d.getUTCMonth());
}
function gameStatCap1300(game){return roundStat1300(100+completedCampaignMonths1300(game)*.10);}
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
 ensureGameDynamicStats1300(game);const e=game.economy,row=e.dynamicStats[c.id],cap=gameStatCap1300(game),b=withBuildings?gameProvinceBuildingState(c).bonuses:{food:0,economy:0,technology:0,stability:0};
 const value=(key,bonus=0)=>roundStat1300(clamp1300((Number(row?.[key])||0)+(Number(bonus)||0),0,cap));
 return {food:value('food',b.food),economy:value('economy',b.economy),technology:value('technology',b.technology),stability:value('stability',b.stability),cap};
}
function effectiveProvinceStability1300(game,c,buildingBonus=0){
 if(game?.ownedCities?.includes(c?.id))return provinceDynamicStats1300(game,c).stability;
 return roundStat1300(clamp1300((Number(c?.stability)||0)+(Number(buildingBonus)||0),0,100));
}
function campaignMilitaryByCity1300(game){
 const out={};if(!game)return out;
 const owned=new Set(game.ownedCities||[]);
 for(const id of owned){
  const c=CITY_1300[id];if(!c)continue;
  const b=gameProvinceBuildingState(c).bonuses;
  out[id]={army:(Number(c.army)||0)+(Number(b.army)||0),navy:(Number(c.navy)||0)+(Number(b.navy)||0)};
 }
 return out;
}
function syncCampaignMilitaryOverlay1300(game=profile.activeGame){
 if(!world?.state?.game||!game)return;
 world.state.game.militaryByCity=campaignMilitaryByCity1300(game);
 world.refresh();
}
function militaryTotals1300(game){
 let army=0,navy=0;
 for(const cityId of game?.ownedCities||[]){
  const c=CITY_1300[cityId];if(!c)continue;
  const b=gameProvinceBuildingState(c).bonuses;
  army+=(Number(c.army)||0)+(Number(b.army)||0);
  navy+=(Number(c.navy)||0)+(Number(b.navy)||0);
 }
 return {army,navy};
}
function stabilityBudgetMax1300(game){
 const population=(game?.ownedCities||[]).reduce((n,id)=>n+(Number(CITY_1300[id]?.people)||0),0),lerp=(a,b,t)=>a+(b-a)*clamp1300(t,0,1);
 let max;if(population<=20000)max=5;
 else if(population<=50000)max=lerp(5,20,(population-20000)/30000);
 else if(population<=100000)max=lerp(20,40,(population-50000)/50000);
 else if(population<=250000)max=lerp(40,75,(population-100000)/150000);
 else if(population<=500000)max=lerp(75,120,(population-250000)/250000);
 else max=120+Math.sqrt((population-500000)/1000)*2;
 return roundStat1300(max);
}
function stabilityBudgetNeed1300(game){return roundStat1300(Math.max(.35,stabilityBudgetMax1300(game)*.45));}
function provinceTechnologyBudgetMax1300(c){
 const p=Number(c?.people)||0,lerp=(a,b,t)=>a+(b-a)*clamp1300(t,0,1);
 if(p<=20000)return 3;
 if(p<=50000)return roundStat1300(lerp(3,8,(p-20000)/30000));
 if(p<=100000)return roundStat1300(lerp(8,15,(p-50000)/50000));
 if(p<=250000)return roundStat1300(lerp(15,30,(p-100000)/150000));
 return roundStat1300(Math.min(60,30+(p-250000)/25000));
}
function technologyBudgetNeed1300(c){return roundStat1300(Math.max(.25,provinceTechnologyBudgetMax1300(c)*.45));}
function monthlyStateExpenses1300(game){
 const e=normaliseGameEconomy1300(game.economy),mil=militaryTotals1300(game),tech=(game.ownedCities||[]).reduce((n,id)=>n+(Number(e.technologyBudgets[id])||0),0);
 const army=roundStat1300(mil.army*GAME_ARMY_UPKEEP_PER_UNIT),navy=roundStat1300(mil.navy*GAME_NAVY_UPKEEP_PER_UNIT),stability=roundStat1300(Math.min(e.stabilityBudget,stabilityBudgetMax1300(game))),technology=roundStat1300(tech);
 return {army,navy,stability,technology,total:roundStat1300(army+navy+stability+technology),armyUnits:mil.army,navyUnits:mil.navy,stabilityNeed:stabilityBudgetNeed1300(game),stabilityMax:stabilityBudgetMax1300(game)};
}
function applyMonthlyStabilityPolicy1300(game){
 const e=normaliseGameEconomy1300(game.economy),need=stabilityBudgetNeed1300(game),budget=Math.min(e.stabilityBudget,stabilityBudgetMax1300(game)),ratio=need>0?budget/need:1;
 let stabilityDelta=0,corruptionDelta=0;
 if(ratio<.20){stabilityDelta=-.35;corruptionDelta=1.5;}
 else if(ratio<.60){stabilityDelta=-.18;corruptionDelta=.7;}
 else if(ratio<.95){stabilityDelta=-.06;corruptionDelta=.2;}
 else if(ratio<=1.15){stabilityDelta=.01;corruptionDelta=-.1;}
 else if(ratio<=1.60){stabilityDelta=.14;corruptionDelta=-.6;}
 else{stabilityDelta=.27;corruptionDelta=-1.2;}
 stabilityDelta-=Math.max(0,e.corruption-35)*.002;
 e.corruption=roundStat1300(clamp1300(e.corruption+corruptionDelta,0,100));
 e.lastStabilityChange=roundStat1300(stabilityDelta);
}
function technologyTreeUnlockedCount1300(game){
 const tech=countryTotals1300(game).technology,thresholds=[50,60,68,76,84,92];
 return thresholds.filter(x=>tech>=x).length;
}
function applyMonthlyDynamicStats1300(game){
 ensureGameDynamicStats1300(game);const e=game.economy,cap=gameStatCap1300(game),treeUnlocked=technologyTreeUnlockedCount1300(game);
 for(const id of game.ownedCities||[]){
  const c=CITY_1300[id];if(!c)continue;const row=e.dynamicStats[id],b=gameProvinceBuildingState(c).bonuses,current=provinceDynamicStats1300(game,c),market=e.markets?.[id],pop=e.pops?.[id],metrics=Object.values(e.lastEconomy?.[id]||{});
  const foodGoods=['grain','fish','meat'],foodRows=foodGoods.map(gid=>({def:GOOD_1300[gid],m:market?.goods?.[gid]})).filter(x=>x.m),foodSupply=foodRows.reduce((n,x)=>n+(Number(x.m.supply)||0),0),foodDemand=foodRows.reduce((n,x)=>n+(Number(x.m.demand)||0),0),availability=foodDemand>0?clamp1300(foodSupply/foodDemand,.45,1.55):1,priceRatio=foodRows.length?foodRows.reduce((n,x)=>n+(Number(x.m.price)||x.def.basePrice)/x.def.basePrice,0)/foodRows.length:1;
  const groups=pop?.groups||[],popN=groups.reduce((n,g)=>n+(Number(g.size)||0),0),avgSol=popN?groups.reduce((n,g)=>n+(Number(g.standardOfLiving)||10)*(Number(g.size)||0),0)/popN:10,wageRatio=effectiveCityWage1300(game,id)/.12,affordability=clamp1300((.72+.28*wageRatio+(avgSol-10)*.018)/Math.max(.65,priceRatio),.5,1.5),foodTarget=clamp1300((Number(c.food)||50)+(availability-1)*24+(affordability-1)*20,0,cap),foodDelta=clamp1300((foodTarget-current.food)*.08,-.40,.40);
  const profit=metrics.reduce((n,m)=>n+(Number(m.profit)||0),0),gross=metrics.reduce((n,m)=>n+(Number(m.gross)||0),0),workers=metrics.reduce((n,m)=>n+(Number(m.workers)||0),0),capacity=metrics.reduce((n,m)=>n+(Number(m.capacity)||0),0),margin=profit/Math.max(1,Math.abs(gross)),employment=capacity?workers/capacity:0,economyDelta=metrics.length?clamp1300(margin*.24+(employment-.58)*.10,-.32,.32):-.05;
  const techBudget=Math.min(Number(e.technologyBudgets[id])||0,provinceTechnologyBudgetMax1300(c)),techNeed=technologyBudgetNeed1300(c),techRatio=techNeed?techBudget/techNeed:0,technologyDelta=clamp1300((techRatio-.35)*.12+treeUnlocked*.008,-.05,.28);
  const stabilityDelta=Number(e.lastStabilityChange)||0;
  const apply=(key,delta,bonus)=>{const maxBase=Math.max(0,cap-(Number(bonus)||0)),before=Number(row[key])||0;row[key]=roundStat1300(clamp1300(before+delta,0,maxBase));return roundStat1300(row[key]-before);};
  e.lastStatChanges[id]={food:apply('food',foodDelta,b.food),economy:apply('economy',economyDelta,b.economy),technology:apply('technology',technologyDelta,b.technology),stability:apply('stability',stabilityDelta,b.stability)};
 }
}

function effectiveCityWage1300(game,cityId){
 const e=game.economy;return Number.isFinite(Number(e.cityWages[cityId]))?Number(e.cityWages[cityId]):e.nationalWage;
}
function effectiveBuildingWage1300(game,cityId,buildingId){
 const row=game.economy.buildingWages?.[cityId];
 return row&&Number.isFinite(Number(row[buildingId]))?Number(row[buildingId]):effectiveCityWage1300(game,cityId);
}
function cityLabourPool1300(c){return Math.max(50,Math.round((Number(c.people)||0)*.34));}
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
  case 'warehouse':return {ok:trade&&econ>=58,reason:'Needs established trade, markets or a port'};
  case 'merchantquarter':return {ok:trade&&econ>=70&&people>=7000,reason:'Needs a wealthy commercial city with sustained merchant traffic'};
  case 'customshouse':return {ok:(coastal||river)&&trade&&econ>=60,reason:'Needs a port, river crossing or major trade route'};
  case 'mint':return {ok:finance||econ>=82&&tech>=68&&people>=12000,reason:'Needs strong fiscal authority, skilled metalwork and major commerce'};
  case 'bridge':return {ok:river||/crossing|bridge/.test(text),reason:'Needs a major river or strategic crossing'};
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
  const sectors=state.buildings.filter(b=>b.level>0).sort((a,b)=>effectiveBuildingWage1300(game,cityId,b.id)-effectiveBuildingWage1300(game,cityId,a.id));
  for(const row of sectors){const cap=row.maxWorkers*row.level,target=Math.min(remaining,Math.round(cap*.62));game.economy.employment[cityId][row.id]=target;remaining-=target;}
 }
}
function economyCitySnapshot1300(game,c){
 const state=gameProvinceBuildingState(c),e=game.economy,sectors=state.buildings.filter(row=>row.level>0).map(row=>({id:row.id,level:row.level,workers:Math.max(0,Number(e.employment?.[c.id]?.[row.id])||0),capacity:Math.max(1,row.maxWorkers*row.level),wage:effectiveBuildingWage1300(game,c.id,row.id)}));
 return {id:c.id,population:Number(c.people)||0,food:Number(c.food)||50,economy:Number(c.economyScore)||50,technology:Number(c.technology)||50,stability:effectiveProvinceStability1300(game,c,state.bonuses.stability),coastal:isCoastalCity1300(c),labourPool:cityLabourPool1300(c),sectors};
}
function simulateGameEconomyDay1300(game,{forceMarket=false,collectRevenue=true}={}){
 const e=game.economy=normaliseGameEconomy1300(game.economy);
 for(const cityId of game.ownedCities||[]){
  const c=CITY_1300[cityId];if(!c)continue;const state=gameProvinceBuildingState(c),labour=cityLabourPool1300(c);e.employment[cityId]??={};
  const sectors=state.buildings.filter(row=>row.level>0).map(row=>{const capacity=Math.max(1,row.maxWorkers*row.level),wage=effectiveBuildingWage1300(game,cityId,row.id),wageRatio=wage/row.normalWage,last=e.lastEconomy?.[cityId]?.[row.id],profitSignal=clamp1300((Number(last?.profit)||0)/8,-.35,.55),attract=clamp1300(.18+.72*wageRatio+profitSignal,.06,1),local=clamp1300(.80+(Number(c.stability)-50)/300+(Number(c.economyScore)-50)/500,.65,1.08),taxDrag=clamp1300(1-Math.max(0,e.taxRate-10)*.004,.80,1.03);return {row,capacity,wage,desired:Math.round(capacity*clamp1300(attract*local*taxDrag,.04,1)),score:wageRatio+profitSignal};}).sort((a,b)=>b.score-a.score);
  let remaining=labour;for(const sec of sectors){const target=Math.min(sec.desired,remaining);remaining-=target;const current=Math.max(0,Number(e.employment[cityId][sec.row.id])||0),move=Math.max(5,Math.round(sec.capacity*.08));e.employment[cityId][sec.row.id]=Math.round(current+clamp1300(target-current,-move,move));}
 }
 const last=Number(e.lastMarketTickDay),due=forceMarket||!Number.isFinite(last)||(Number(game.day)||0)-last>=7;
 if(due){const cities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean).map(c=>economyCitySnapshot1300(game,c)),result=simulateWeeklyEconomy1300({cities,previousMarkets:e.markets,previousPops:e.pops,taxRate:e.taxRate,taxCollectionFactor:GAME_TAX_COLLECTION_FACTOR});e.markets=result.markets;e.pops=result.pops;e.lastEconomy=result.sectorsByCity;e.monthlyTax=result.monthlyTaxEstimate;e.lastMarketTickDay=Number(game.day)||0;accrueTradeSurplus1300(game,result.markets);if(collectRevenue)e.monthRevenue=Math.round((Number(e.monthRevenue||0)+result.weeklyTax)*100)/100;}
 e.monthExpenses=monthlyStateExpenses1300(game).total;
}
function refreshGameClockUI1300(){
 const game=profile.activeGame;if(!game)return;game.economy=normaliseGameEconomy1300(game.economy);game.economy.monthExpenses=monthlyStateExpenses1300(game).total;const d=gameDate1300(game.day),main=$('#game-date-main'),year=$('#game-date-year'),status=$('#game-clock-status'),treasury=$('#game-treasury-amount'),tax=$('#game-daily-tax');
 if(main)main.textContent=`${d.day} ${d.month}`;if(year)year.textContent=d.year;if(treasury)treasury.textContent='ƒ'+money1300(game.florins);if(tax)tax.textContent='Month balance: ƒ'+money1300((game.economy?.monthRevenue||0)-(game.economy?.monthExpenses||0));
 if(status){const remain=Math.max(0,60000-(Date.now()-game.clockStartedAt));status.textContent=remain>0?`Economy starts in ${Math.ceil(remain/1000)}s`:'1 day every 5 seconds';}
}
function settleGameMonth1300(game,finishedDate){
 const e=game.economy=normaliseGameEconomy1300(game.economy),expenseBreakdown=monthlyStateExpenses1300(game),revenue=Math.round(e.monthRevenue*100)/100,expenses=expenseBreakdown.total,balance=Math.round((revenue-expenses)*100)/100;
 e.lastMonthRevenue=revenue;e.lastMonthExpenses=expenses;e.lastMonthBalance=balance;e.lastMonthLabel=`${finishedDate.month} ${finishedDate.year}`;
 game.florins=Math.max(0,Math.round((Number(game.florins)+balance)*100)/100);applyMonthlyStabilityPolicy1300(game);updateCampaignRankingSnapshot1300(game);e.monthRevenue=0;e.monthExpenses=monthlyStateExpenses1300(game).total;
}
function advanceGameDay1300(){
 const game=profile.activeGame;if(!game)return;
 const before=gameDate1300(game.day);game.day=(Number(game.day)||0)+1;const after=gameDate1300(game.day);
 if(before.month!==after.month||before.year!==after.year)settleGameMonth1300(game,before);
 simulateGameEconomyDay1300(game);save();refreshGameClockUI1300();if(gameProvincePanel)renderGameProvincePanel();if(gameCountryPanel)renderGameCountryPanel1300();if(gameDiplomacyCountry)renderGameDiplomacyPanel1300();
}
function setupGameClock1300(){
 if(gameClockTimer)clearInterval(gameClockTimer);refreshGameClockUI1300();
 gameClockTimer=setInterval(()=>{const game=profile.activeGame;if(!game)return;const now=Date.now(),remain=60000-(now-game.clockStartedAt);
  if(remain>0){refreshGameClockUI1300();return;}
  if(!Number.isFinite(Number(game.lastTickAt))){game.lastTickAt=now;save();refreshGameClockUI1300();return;}
  if(now-game.lastTickAt>=5000){game.lastTickAt=now;advanceGameDay1300();}else refreshGameClockUI1300();
 },1000);
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
   const gameBuildings=g.buildings&&typeof g.buildings==='object'&&!Array.isArray(g.buildings)?g.buildings:{};
   const day=Math.max(0,Math.floor(Number(g.day)||0)),clockStartedAt=Number.isFinite(Number(g.clockStartedAt))?Number(g.clockStartedAt):Date.now(),lastTickAt=Number.isFinite(Number(g.lastTickAt))?Number(g.lastTickAt):null,economy=normaliseGameEconomy1300(g.economy);
   p.activeGame={date:'1300-01-01',deck:validDeck,hand:validHand,ownedCities,cityOwners,playerColor,flag:normaliseFlag1300(g.flag||p.playerFlag),startingFlorins:startTreasury,florins:currentTreasury,buildings:gameBuildings,day,clockStartedAt,lastTickAt,economy,diplomacy:normaliseGameDiplomacy1300(g.diplomacy),campaignStage:g.campaignStage,originCountryByCity:g.originCountryByCity,independenceByCity:g.independenceByCity,formedNation:g.formedNation,won:g.won,victoryRank:g.victoryRank,victoryDate:g.victoryDate,rankingSnapshot:g.rankingSnapshot};initialiseCampaignIdentity1300(p.activeGame);refreshCampaignStage1300(p.activeGame);
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
function refreshCampaignStage1300(game){
 initialiseCampaignIdentity1300(game);
 if(game.campaignStage==='rebellion'&&(game.ownedCities||[]).length&&game.ownedCities.every(id=>game.independenceByCity[id]===true))game.campaignStage='free_cities';
}
function formableRealms1300(game){
 const owned=new Set(game?.ownedCities||[]),groups=new Map();
 for(const c of CITIES_1300){
  const row=groups.get(c.country)||{country:c.country,cities:[]};row.cities.push(c);groups.set(c.country,row);
 }
 return [...groups.values()].map(row=>{
  const held=row.cities.filter(c=>owned.has(c.id)),missing=row.cities.filter(c=>!owned.has(c.id));
  return {...row,held,missing,progress:row.cities.length?held.length/row.cities.length:0,canForm:game?.campaignStage==='free_cities'&&held.length>0&&missing.length===0};
 }).filter(row=>row.held.length>0).sort((a,b)=>b.progress-a.progress||a.missing.length-b.missing.length||a.country.localeCompare(b.country));
}
function formCampaignNation1300(country){
 const game=profile.activeGame;if(!game)return;
 refreshCampaignStage1300(game);
 const target=formableRealms1300(game).find(x=>x.country===country);
 if(!target){toast('That country is not linked to any province you own.');return;}
 if(game.campaignStage!=='free_cities'){toast('All of your cities must first gain independence and become Free Cities.');return;}
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
 profile.activeGame={date:'1300-01-01',deck:[...profile.deck],hand,ownedCities,cityOwners,playerColor:profile.playerColor,flag:normaliseFlag1300(profile.playerFlag),startingFlorins,florins:startingFlorins,buildings:{},day:0,clockStartedAt:Date.now(),lastTickAt:null,economy:freshGameEconomy1300(),diplomacy:freshGameDiplomacy1300(),campaignStage:'rebellion',originCountryByCity:Object.fromEntries(ownedCities.map(id=>[id,CITY_1300[id]?.country||'Unknown'])),independenceByCity:Object.fromEntries(ownedCities.map(id=>[id,false])),formedNation:null,won:false};
 seedGameEmployment1300(profile.activeGame);simulateGameEconomyDay1300(profile.activeGame,{forceMarket:true,collectRevenue:false});updateCampaignRankingSnapshot1300(profile.activeGame);
 selected1300=profile.activeGame.hand[0];mapState.selected=selected1300;gameScreen='map';save();navigate('game');
}

const purchasedBuildingLevel=(cityId,buildingId)=>Math.max(0,Number(profile.buildings?.[cityId]?.[buildingId])||0);
function cityBuildingState(c){
 const bonuses={food:0,economy:0,technology:0,stability:0,army:0,navy:0,income:0};
 const buildings=BUILDINGS_1300.map(b=>{
  const historical=startingBuildingLevel1300(c,b.id),purchased=purchasedBuildingLevel(c.id,b.id),level=Math.min(ECONOMY_1300.maxBuildingLevel,historical+purchased);
  for(const [key,value] of Object.entries(b.effects))bonuses[key]=(bonuses[key]||0)+value*level;
  return {...b,historical,purchased,level,cost:level<ECONOMY_1300.maxBuildingLevel?buildingCost1300(b,level):null};
 });
 return {buildings,bonuses,totalLevels:buildings.reduce((sum,b)=>sum+b.level,0),historicalLevels:buildings.reduce((sum,b)=>sum+b.historical,0)};
}
function buildingEffectText(b){
 const labels={food:'Food',economy:'Economy',technology:'Technology',stability:'Stability',army:'Professional army',navy:'Navy',income:'Annual income'};
 return Object.entries(b.effects).map(([key,value])=>`${labels[key]} ${value>0?'+':''}${value}${key==='income'?' ƒ':''}`).join(' · ');
}
function gameBuildingPurchaseLevel(cityId,buildingId){
 return Math.max(0,Number(profile.activeGame?.buildings?.[cityId]?.[buildingId])||0);
}
function gameProvinceBuildingState(c){
 const bonuses={food:0,economy:0,technology:0,stability:0,army:0,navy:0};
 const buildings=BUILDINGS_1300.map(b=>{
  const historical=startingBuildingLevel1300(c,b.id),purchased=gameBuildingPurchaseLevel(c.id,b.id),level=Math.min(ECONOMY_1300.maxBuildingLevel,historical+purchased),availability=buildingAvailability1300(c,b);
  for(const [key,value] of Object.entries(b.effects))bonuses[key]=(bonuses[key]||0)+value*level;
  return {...b,historical,purchased,level,available:availability.ok,availabilityReason:availability.reason,cost:level<ECONOMY_1300.maxBuildingLevel?buildingCost1300(b,level):null};
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
 const rows=GOODS_1300.map(g=>{const m=market.goods?.[g.id];if(!m)return null;return {g,m,pct:(m.price/g.basePrice-1)*100};}).filter(Boolean).sort((a,b)=>Math.abs(b.pct)-Math.abs(a.pct)).slice(0,7);
 return `<div class="province-market-head"><div><span>LOCAL MARKET</span><strong>Market access ${Math.round((market.marketAccess||1)*100)}%</strong></div><small>Prices update weekly</small></div><section class="province-market-list">${rows.map(({g,m,pct})=>`<div><strong>${esc(g.name)}</strong><span>S ${goodQty1300(m.supply)} · D ${goodQty1300(m.demand)}</span><b>ƒ${money1300(m.price)} <i class="${pct>1?'up':pct<-1?'down':''}">${pct>=0?'+':''}${pct.toFixed(1)}%</i></b></div>`).join('')}</section>`;
}
function countryMarketHTML1300(game){
 const rows=aggregateMarkets1300(game.economy?.markets||{}).sort((a,b)=>Math.abs(b.changePct)-Math.abs(a.changePct)).slice(0,10);
 return `<div class="country-section-title"><span>GOODS MARKET</span><small>Owned local markets · weekly price tick</small></div><section class="country-market-table">${rows.map(r=>`<div><strong>${esc(r.name)}</strong><span>Supply ${goodQty1300(r.supply)}</span><span>Demand ${goodQty1300(r.demand)}</span><b>ƒ${money1300(r.price)}</b><i class="${r.changePct>1?'up':r.changePct<-1?'down':''}">${r.changePct>=0?'+':''}${r.changePct}%</i></div>`).join('')}</section>`;
}
function gameSectorMetrics1300(game,cityId,buildingId){
 const m=game.economy?.lastEconomy?.[cityId]?.[buildingId];if(m)return m;
 const c=CITY_1300[cityId],row=c?gameProvinceBuildingState(c).buildings.find(x=>x.id===buildingId):null,workers=Math.max(0,Number(game.economy?.employment?.[cityId]?.[buildingId])||0),capacity=row?row.maxWorkers*row.level:0;
 return {workers,capacity,wage:effectiveBuildingWage1300(game,cityId,buildingId),gross:0,inputCost:0,wageBill:0,profit:0,tax:0,throughput:0,inputs:{},outputs:{}};
}
function gameCityEconomySummary1300(game,cityId){
 const c=CITY_1300[cityId];if(!c)return {workers:0,labour:0,tax:0};
 const metrics=game.economy?.lastEconomy?.[cityId]||{};
 return {workers:Object.values(metrics).reduce((n,m)=>n+(Number(m.workers)||0),0),labour:cityLabourPool1300(c),tax:Object.values(metrics).reduce((n,m)=>n+(Number(m.tax)||0),0)};
}
function wageStepper1300(scope,cityId,buildingId,value,canReset){
 const attrs=scope==='national'?'':`data-city="${cityId}"${buildingId?` data-id="${buildingId}"`:''}`,action=scope==='national'?'game-national-wage-adjust':scope==='city'?'game-city-wage-adjust':'game-building-wage-adjust',resetAction=scope==='city'?'game-city-wage-reset':'game-building-wage-reset';
 return `<div class="wage-stepper"><button data-action="${action}" data-delta="-0.02" ${attrs}>−</button><strong>ƒ${money1300(value)}</strong><button data-action="${action}" data-delta="0.02" ${attrs}>+</button>${scope!=='national'?'<button class="wage-reset" data-action="'+resetAction+'" '+attrs+' '+(canReset?'':'disabled')+'>inherit</button>':''}</div>`;
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
 const coastal=isCoastalCity1300(c),e=game.economy=normaliseGameEconomy1300(game.economy),maxed=row.level>=ECONOMY_1300.maxBuildingLevel,blocked=row.requiresCoast&&!coastal,unavailable=!row.available&&row.level===0,canBuy=owned&&!maxed&&!blocked&&!unavailable&&game.florins>=row.cost,m=owned?gameSectorMetrics1300(game,c.id,row.id):null,override=owned&&Number.isFinite(Number(e.buildingWages?.[c.id]?.[row.id])),effectiveWage=owned?effectiveBuildingWage1300(game,c.id,row.id):0,buttonText=!owned?'FOREIGN':unavailable?'UNAVAILABLE':maxed?'MAX LEVEL':blocked?'NEEDS PORT':row.level?'UPGRADE':'BUILD';
 const employment=m?Math.round((m.workers/Math.max(1,m.capacity))*100):0,throughput=m?Math.round((m.throughput||0)*100):0;
 return `<section class="building-detail-view">
  <div class="building-detail-toolbar"><button data-action="game-building-detail-back" class="building-detail-back" aria-label="Back to buildings">← <span>Back</span></button><span>${esc(displayCityName1300(c))}</span></div>
  <div class="building-detail-hero">
   <div class="building-detail-icon">${buildingPicture1300(row.id)}</div>
   <div><span class="building-detail-category">${esc(row.category)}</span><h2>${esc(row.name)}</h2><strong>Level ${row.level} / ${ECONOMY_1300.maxBuildingLevel}</strong><p>${esc(unavailable?row.availabilityReason:row.description)}</p><em>${esc(buildingEffectText(row))}</em></div>
  </div>
  ${owned&&row.level>0?`<div class="building-detail-section"><div class="building-detail-section-title"><span>PRODUCTION</span><small>Live weekly market simulation</small></div>
   <div class="building-flow-grid"><article><span>INPUTS</span><strong>${esc(goodFlowText1300(m.inputs))}</strong></article><article><span>OUTPUTS</span><strong>${esc(goodFlowText1300(m.outputs))}</strong></article></div>
   <div class="building-detail-progress"><div><span>Throughput</span><strong>${throughput}%</strong></div><i><b style="width:${Math.max(0,Math.min(100,throughput))}%"></b></i></div>
   <div class="building-detail-progress"><div><span>Employment</span><strong>${employment}%</strong></div><i><b style="width:${Math.max(0,Math.min(100,employment))}%"></b></i></div>
  </div>
  <div class="building-detail-section"><div class="building-detail-section-title"><span>FINANCES</span><small>Per month</small></div>
   <div class="building-finance-grid">
    <article><span>Workers</span><strong class="neutral">${strengthNumber(m.workers)} / ${strengthNumber(m.capacity)}</strong></article>
    <article><span>Revenue</span><strong class="${buildingMoneyTone1300(m.gross)}">+ƒ${money1300(Math.abs(m.gross||0))}</strong></article>
    <article><span>Input costs</span><strong class="${buildingMoneyTone1300(m.inputCost,{cost:true})}">-ƒ${money1300(Math.abs(m.inputCost||0))}</strong></article>
    <article><span>Wages</span><strong class="${buildingMoneyTone1300(m.wageBill,{cost:true})}">-ƒ${money1300(Math.abs(m.wageBill||0))}</strong></article>
    <article class="profit"><span>Profit</span><strong class="${buildingMoneyTone1300(m.profit)}">${m.profit>=0?'+':'-'}ƒ${money1300(Math.abs(m.profit||0))}</strong></article>
    <article><span>Tax paid</span><strong class="${buildingMoneyTone1300(m.tax,{cost:true})}">-ƒ${money1300(Math.abs(m.tax||0))}</strong></article>
   </div>
  </div>
  <div class="building-detail-section"><div class="building-detail-section-title"><span>LABOUR</span><small>Building-specific policy</small></div><div class="building-detail-wage"><div><span>Minimum wage</span><small>${override?'Custom wage':'Inherited wage'}</small></div>${wageStepper1300('building',c.id,row.id,effectiveWage,override)}</div></div>`:''}
  ${owned?`<div class="building-detail-upgrade"><div><span>Treasury</span><strong>ƒ${money1300(game.florins)}</strong></div><button ${canBuy?'':'disabled'} data-action="game-build-province" data-city="${c.id}" data-id="${row.id}"><span>${buttonText}</span>${row.cost!==null&&!blocked&&!unavailable&&!maxed?`<strong>ƒ${Number(row.cost).toFixed(0)}</strong>`:''}</button></div>`:''}
 </section>`;
}

function gameProvincePanelHTML(cityId){
 const game=profile.activeGame,c=CITY_1300[cityId];if(!game||!c)return '';
 const owned=game.ownedCities?.includes(cityId),state=gameProvinceBuildingState(c),b=state.bonuses,coastal=isCoastalCity1300(c),e=game.economy=normaliseGameEconomy1300(game.economy);
 const stats=[['Food',Math.min(100,c.food+b.food)],['Economy',Math.min(100,c.economyScore+b.economy)],['Technology',Math.min(100,c.technology+b.technology)],['Stability',owned?effectiveProvinceStability1300(game,c,b.stability):Math.min(100,c.stability+b.stability)]];
 const summary=owned?gameCityEconomySummary1300(game,cityId):null,cityOverride=Number.isFinite(Number(e.cityWages[cityId])),cityWage=effectiveCityWage1300(game,cityId);
 const detail=gameProvinceBuildingDetail?gameBuildingDetailHTML1300(cityId,gameProvinceBuildingDetail):'';
 if(gameProvinceBuildingDetail&&!detail)gameProvinceBuildingDetail=null;
 if(detail)return `<div class="province-side-head detail-open" style="border-left-color:${owned?game.playerColor:'#8a8174'}"><button class="province-side-close" data-action="close-game-province" aria-label="Close">×</button><span>${owned?'YOUR PROVINCE':'VISIBLE PROVINCE'}</span><h2>${esc(displayCityName1300(c))}</h2><p>${owned?'Your Realm':esc(c.country)}</p></div><div class="province-side-scroll building-detail-scroll">${detail}</div>`;
 return `<div class="province-side-head" style="border-left-color:${owned?game.playerColor:'#8a8174'}"><button class="province-side-close" data-action="close-game-province" aria-label="Close">×</button><span>${owned?'YOUR PROVINCE':'VISIBLE PROVINCE'}</span><h2>${esc(displayCityName1300(c))}</h2><p>${owned?'Your Realm':esc(c.country)}</p></div>
 <div class="province-side-scroll">
  <section class="province-side-facts"><div><span>Population</span><strong>${esc(c.populationText||strengthNumber(c.people))}</strong></div><div><span>Starting wealth</span><strong>ƒ${money1300(c.startingFlorins)}</strong></div><div><span>Army</span><strong>${strengthNumber(c.army+b.army)}</strong></div><div><span>Navy</span><strong>${strengthNumber(c.navy+b.navy)}</strong></div></section>
  <section class="province-side-stats">${stats.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong><i><b style="width:${value}%"></b></i></div>`).join('')}</section>
  ${owned?`<section class="province-economic-policy"><div class="policy-heading"><span>ECONOMIC POLICY</span><small>Changes apply next day</small></div>
   <div class="policy-row"><div><strong>Realm tax</strong><small>Tax on sector profits</small></div><div class="tax-stepper"><button data-action="game-tax-adjust" data-delta="-1">−</button><strong>${e.taxRate}%</strong><button data-action="game-tax-adjust" data-delta="1">+</button></div></div>
   <div class="policy-row"><div><strong>Realm minimum wage</strong><small>Default for every province</small></div>${wageStepper1300('national',cityId,null,e.nationalWage,false)}</div>
   <div class="policy-row"><div><strong>Province minimum wage</strong><small>${cityOverride?'Custom rule':'Inherits realm wage'}</small></div>${wageStepper1300('city',cityId,null,cityWage,cityOverride)}</div>
   <div class="workforce-summary"><span><strong>${strengthNumber(summary.workers)}</strong><small>EMPLOYED</small></span><span><strong>${strengthNumber(summary.labour)}</strong><small>WORKER POOL</small></span><span><strong>ƒ${money1300(summary.tax)}</strong><small>TAX / MONTH</small></span></div>
  </section>`:''}
  <section class="province-side-info"><span>ECONOMY</span><p>${esc(c.economy)}</p><span>HISTORICAL ROLE</span><p>${esc(c.historicalRole)}</p></section>
  ${owned?provinceMarketHTML1300(game,c.id):''}
  <div class="province-building-header"><div><span>SECTORS & BUILDINGS</span><strong>${state.totalLevels} levels</strong></div><small>${owned?`Treasury <b>ƒ${money1300(game.florins)}</b>`:'Foreign province'}</small></div>
  <section class="province-building-cards">${state.buildings.filter(row=>row.level>0||(row.available&&(!row.requiresCoast||coastal))).map(row=>{
   const maxed=row.level>=ECONOMY_1300.maxBuildingLevel,blocked=row.requiresCoast&&!coastal,unavailable=!row.available&&row.level===0,canBuy=owned&&!maxed&&!blocked&&!unavailable&&game.florins>=row.cost,m=owned?gameSectorMetrics1300(game,c.id,row.id):null,override=owned&&Number.isFinite(Number(e.buildingWages?.[c.id]?.[row.id])),effectiveWage=owned?effectiveBuildingWage1300(game,c.id,row.id):0;
   const buttonText=!owned?'FOREIGN':unavailable?'UNAVAILABLE':maxed?'MAX LEVEL':blocked?'NEEDS PORT':row.level?'UPGRADE':'BUILD';
   return `<article class="province-building-card ${maxed?'maxed':''} ${unavailable?'unavailable':''}"><button class="province-building-picture building-detail-trigger" data-action="game-building-detail" data-city="${c.id}" data-id="${row.id}" title="Open ${esc(row.name)} details" aria-label="Open ${esc(row.name)} details">${buildingPicture1300(row.id)}<span>Details</span></button><div class="province-building-copy"><div><strong>${esc(row.name)}</strong><span>LV ${row.level}/${ECONOMY_1300.maxBuildingLevel}</span></div><small>${esc(row.category)}</small><p>${esc(unavailable?row.availabilityReason:row.description)}</p><em>${esc(buildingEffectText(row))}</em>
    ${owned&&row.level>0?`<div class="sector-production"><span><b>Inputs</b> ${esc(goodFlowText1300(m.inputs))}</span><span><b>Outputs</b> ${esc(goodFlowText1300(m.outputs))}</span><small>Throughput ${Math.round((m.throughput||0)*100)}% · employment ${Math.round((m.workers/Math.max(1,m.capacity))*100)}%</small></div><div class="sector-economy expanded"><span>Workers <b>${strengthNumber(m.workers)} / ${strengthNumber(m.capacity)}</b></span><span>Revenue/month <b>ƒ${money1300(m.gross)}</b></span><span>Inputs/month <b>-ƒ${money1300(m.inputCost||0)}</b></span><span>Wages/month <b>-ƒ${money1300(m.wageBill)}</b></span><span>Profit/month <b class="${m.profit<0?'negative':''}">ƒ${money1300(m.profit)}</b></span><span>Tax/month <b>ƒ${money1300(m.tax)}</b></span></div><div class="sector-wage"><span>Minimum wage</span>${wageStepper1300('building',c.id,row.id,effectiveWage,override)}</div>`:''}
    <div class="province-level-pips">${Array.from({length:ECONOMY_1300.maxBuildingLevel},(_,i)=>`<i class="${i<row.level?'on':''}"></i>`).join('')}</div></div>
    <div class="province-building-buy"><button ${canBuy?'':'disabled'} data-action="game-build-province" data-city="${c.id}" data-id="${row.id}"><span>${buttonText}</span>${row.cost!==null&&owned&&!blocked&&!unavailable&&!maxed?`<strong>ƒ${Number(row.cost).toFixed(0)}</strong>`:''}</button></div></article>`;
  }).join('')}</section>
 </div>`;
}
function renderGameProvincePanel(){
 const panel=$('#game-province-panel'),shell=$('.game-map-shell');if(!panel)return;
 if(!gameProvincePanel||!CITY_1300[gameProvincePanel]){panel.innerHTML='';panel.classList.remove('open');shell?.classList.remove('province-panel-open');return;}
 const scroll=panel.querySelector('.province-side-scroll')?.scrollTop||0;panel.innerHTML=gameProvincePanelHTML(gameProvincePanel);panel.classList.add('open');shell?.classList.add('province-panel-open');const next=panel.querySelector('.province-side-scroll');if(next)next.scrollTop=scroll;
}
function buyGameProvinceBuilding(cityId,buildingId){
 const game=profile.activeGame,c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!game||!c||!building)return;
 if(!game.ownedCities?.includes(cityId)){toast('You can only build in provinces you own.');return;}
 const row=gameProvinceBuildingState(c).buildings.find(x=>x.id===buildingId);if(!row||row.level>=ECONOMY_1300.maxBuildingLevel)return;
 if(!row.available&&row.level===0){toast(row.availabilityReason);return;}if(building.requiresCoast&&!isCoastalCity1300(c)){toast('A Royal Dockyard requires a coastal or major port province.');return;}
 if(game.florins<row.cost){toast(`You need ƒ${money1300(row.cost-game.florins)} more in-game Florins.`);return;}
 game.florins=Math.round((game.florins-row.cost)*100)/100;game.buildings??={};game.buildings[cityId]??={};game.buildings[cityId][buildingId]=(game.buildings[cityId][buildingId]||0)+1;game.economy.employment[cityId]??={};game.economy.employment[cityId][buildingId]??=0;simulateGameEconomyDay1300(game,{forceMarket:true,collectRevenue:false});save();renderGameProvincePanel();syncCampaignMilitaryOverlay1300(game);const amount=$('#game-treasury-amount');if(amount)amount.textContent='ƒ'+money1300(game.florins);toast(`${building.name} upgraded in ${displayCityName1300(c)}.`);
}
function changeGameTax1300(delta){const g=profile.activeGame;if(!g)return;g.economy.taxRate=clamp1300(g.economy.taxRate+Number(delta),GAME_TAX_MIN,GAME_TAX_MAX);save();renderGameProvincePanel();renderGameCountryPanel1300();}
function changeNationalWage1300(delta){const g=profile.activeGame;if(!g)return;g.economy.nationalWage=clamp1300(Math.round((g.economy.nationalWage+Number(delta))*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);save();renderGameProvincePanel();renderGameCountryPanel1300();}
function setStabilityBudget1300(value){const g=profile.activeGame;if(!g)return;g.economy.stabilityBudget=clamp1300(Math.round((Number(value)||0)*100)/100,0,100);g.economy.monthExpenses=monthlyStateExpenses1300(g).total;save();refreshGameClockUI1300();const out=$('#stability-budget-value');if(out)out.textContent='ƒ'+money1300(g.economy.stabilityBudget);}
function changeCityWage1300(cityId,delta){const g=profile.activeGame;if(!g)return;const current=effectiveCityWage1300(g,cityId);g.economy.cityWages[cityId]=clamp1300(Math.round((current+Number(delta))*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);save();renderGameProvincePanel();}
function resetCityWage1300(cityId){const g=profile.activeGame;if(!g)return;delete g.economy.cityWages[cityId];save();renderGameProvincePanel();}
function changeBuildingWage1300(cityId,buildingId,delta){const g=profile.activeGame;if(!g)return;g.economy.buildingWages[cityId]??={};const current=effectiveBuildingWage1300(g,cityId,buildingId);g.economy.buildingWages[cityId][buildingId]=clamp1300(Math.round((current+Number(delta))*100)/100,GAME_WAGE_MIN,GAME_WAGE_MAX);save();renderGameProvincePanel();}
function resetBuildingWage1300(cityId,buildingId){const g=profile.activeGame;if(!g)return;if(g.economy.buildingWages[cityId]){delete g.economy.buildingWages[cityId][buildingId];if(!Object.keys(g.economy.buildingWages[cityId]).length)delete g.economy.buildingWages[cityId];}save();renderGameProvincePanel();}

function buildBuilding1300(cityId,buildingId){
 const c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!c||!building)return;
 const state=cityBuildingState(c),row=state.buildings.find(b=>b.id===buildingId);if(!row||row.level>=ECONOMY_1300.maxBuildingLevel)return;
 if(building.requiresCoast&&!isCoastalCity1300(c)){toast('A Royal Dockyard requires a coastal or major port city.');return;}
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
function render(){if(gameClockTimer){clearInterval(gameClockTimer);gameClockTimer=null;}world?.destroy();world=null;if(!authUser){app.className='lobby auth-view';app.innerHTML=loginPage();setupGoogleLogin();return;}if(!profile.onboardingComplete){app.className='lobby onboarding-view';app.innerHTML=onboardingPage();return;}const campaignMap=view==='game'&&!!profile.activeGame&&gameScreen==='map';app.className=view==='atlas'?'lobby atlas-view':campaignMap?'lobby atlas-view game-campaign-view':'lobby';app.innerHTML=(campaignMap?'':header())+(view==='collection'?collectionPage():view==='packs'?packs1300Page():view==='deck'?deckPage():view==='game'?gamePage():view==='rankings'?rankingsPage():atlasPage())+((view==='atlas'||campaignMap)?'':footer());if(view==='collection')renderGrid();if(view==='atlas'){renderAtlasPanel();mapState.selected=selected1300;mapState.collection={};mapState.game=null;world=new WorldMap($('#map-host'),mapState,id=>{selected1300=id;mapState.selected=id;atlasRegion=null;renderAtlasPanel();world.refresh();app.classList.add('show-panel');},region=>{atlasRegion=region;atlasSearch='';renderAtlasPanel();app.classList.add('show-panel');});}if(campaignMap){mapState.selected=selected1300;mapState.collection={};mapState.game={ownedCityIds:[...(profile.activeGame.ownedCities||profile.activeGame.hand)],playerColor:profile.activeGame.playerColor||profile.playerColor,fogOfWar:true,militaryByCity:campaignMilitaryByCity1300(profile.activeGame)};world=new WorldMap($('#game-map-host'),mapState,id=>{selected1300=id;gameCountryPanel=false;renderGameCountryPanel1300();gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();gameProvincePanel=id;gameProvinceBuildingDetail=null;mapState.selected=id;world.refresh();renderGameProvincePanel();},region=>openGameDiplomacyPanel1300(region));setupGameClock1300();}}
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
 const developed={food:Math.min(100,c.food+b.food),economy:Math.min(100,c.economyScore+b.economy),technology:Math.min(100,c.technology+b.technology),stability:Math.min(100,c.stability+b.stability),army:c.army+b.army,navy:c.navy+b.navy};
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
  <div class="building-catalog-head"><div><span class="eyebrow">BUILDING CATALOGUE</span><h2>10 province buildings</h2></div><p>Maximum level ${ECONOMY_1300.maxBuildingLevel}. Costs rise as a building becomes more developed.</p></div>
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
 const state=gameProvinceBuildingState(c),b=state.bonuses;
 return {
  food:Math.min(100,(Number(c.food)||0)+(Number(b.food)||0)),
  economy:Math.min(100,(Number(c.economyScore)||0)+(Number(b.economy)||0)),
  technology:Math.min(100,(Number(c.technology)||0)+(Number(b.technology)||0)),
  stability:effectiveProvinceStability1300(game,c,b.stability),
  population:Number(c.people)||0,
  army:(Number(c.army)||0)+(Number(b.army)||0),
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
  const foodAvg=Math.round(entry.foodTotal/cityCount),economyAvg=Math.round(entry.economyTotal/cityCount),technologyAvg=Math.round(entry.technologyTotal/cityCount),stabilityAvg=Math.round(entry.stabilityTotal/cityCount);
  const foodScore=foodAvg*50,economyScore=economyAvg*50,technologyScore=technologyAvg*50,stabilityScore=stabilityAvg*50,populationScore=Math.round(entry.population/50),armyScore=Math.round(entry.army*2),navyScore=Math.round(entry.navy*10);
  const baseScore=foodScore+economyScore+technologyScore+stabilityScore+populationScore+armyScore+navyScore,cityMultiplier=1+cityCount/50,powerModifier=campaignPowerModifier1300(game,entry),rawStrength=Math.round(baseScore*cityMultiplier),strength=Math.round(rawStrength*powerModifier);
  return {...entry,cityCount,playableCityCount,foodAvg,economyAvg,technologyAvg,stabilityAvg,foodScore,economyScore,technologyScore,stabilityScore,populationScore,armyScore,navyScore,baseScore,cityMultiplier,powerModifier,rawStrength,strength};
 }).filter(r=>r.playableCityCount>0).sort((a,b)=>b.strength-a.strength||a.country.localeCompare(b.country)).map((r,i)=>({...r,rank:i+1}));
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
 const board=campaignRankingRows1300(game),value=(r,key)=>key==='strength'?strengthNumber(r.strength):['foodAvg','economyAvg','technologyAvg','stabilityAvg'].includes(key)?strengthNumber(r[key])+'/100':strengthNumber(r[key]);
 return `<section class="campaign-ranking-head"><div><span>CAMPAIGN RANKINGS</span><strong>${board.rows.length} active countries</strong></div><small>Snapshot: ${esc(game.rankingSnapshot?.label||'1 January 1300')} · updates every month</small></section>
 <div class="campaign-ranking-tabs">${RANKING_CATEGORIES_1300.map(([id,label])=>`<button class="${gameRankingCategory===id?'active':''}" data-action="game-ranking-category" data-id="${id}">${label}</button>`).join('')}</div>
 <section class="campaign-ranking-list">${board.rows.map(r=>`<details class="${r.player?'player':''}"><summary><span>#${String(r.categoryRank).padStart(2,'0')}</span><strong>${r.player?'★ ':''}${esc(r.country)}</strong><small>${r.playableCityCount} cities · ${r.powerModifier<1?esc(powerModifierLabel1300(r.powerModifier,r,game)):'full power'}</small><b>${value(r,board.key)}</b></summary><div class="campaign-ranking-breakdown"><span>Food <b>${r.foodAvg}</b></span><span>Economy <b>${r.economyAvg}</b></span><span>Technology <b>${r.technologyAvg}</b></span><span>Stability <b>${r.stabilityAvg}</b></span><span>Population <b>${strengthNumber(r.population)}</b></span><span>Army <b>${strengthNumber(r.army)}</b></span><span>Navy <b>${strengthNumber(r.navy)}</b></span><span>Raw power <b>${strengthNumber(r.rawStrength??r.strength)}</b></span><span>Status modifier <b>×${Number(r.powerModifier??1).toFixed(2)}</b></span><span>Overall <b>${strengthNumber(r.strength)}</b></span></div></details>`).join('')}</section>`;
}
function countryTotals1300(game){
 const cities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean),population=cities.reduce((n,c)=>n+(Number(c.people)||0),0),mil=militaryTotals1300(game);
 const avg=key=>cities.length?Math.round(cities.reduce((n,c)=>n+(Number(c[key])||0),0)/cities.length):0;
 const stability=cities.length?Math.round(cities.reduce((n,c)=>n+effectiveProvinceStability1300(game,c,gameProvinceBuildingState(c).bonuses.stability),0)/cities.length):0;
 return {cities,population,army:mil.army,navy:mil.navy,food:avg('food'),economy:avg('economyScore'),technology:avg('technology'),stability};
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
function countryPeople1300(game){
 const t=countryTotals1300(game),e=game.economy=normaliseGameEconomy1300(game.economy),simCities=(game.ownedCities||[]).map(id=>e.pops?.[id]).filter(Boolean);
 if(simCities.length){
  const grouped=new Map();let population=0,wealthTotal=0,solTotal=0;
  for(const city of simCities)for(const g of city.groups||[]){const row=grouped.get(g.name)||{name:g.name,count:0,wealthTotal:0,solTotal:0};row.count+=g.size;row.wealthTotal+=g.wealth*g.size;row.solTotal+=g.standardOfLiving*g.size;grouped.set(g.name,row);population+=g.size;wealthTotal+=g.wealth*g.size;solTotal+=g.standardOfLiving*g.size;}
  const groups=[...grouped.values()].map(g=>({name:g.name,count:g.count,pct:population?Math.round(g.count/population*1000)/10:0,wealth:g.count?g.wealthTotal/g.count:0,sol:g.count?g.solTotal/g.count:0})),avgWealth=population?wealthTotal/population:0,avgSol=population?solTotal/population:0,wageRatio=e.nationalWage/.12,happiness=Math.round(clamp1300(t.stability+(avgSol-10)*1.3+(wageRatio-1)*7-(e.taxRate-10)*.25,0,100));
  return {...t,population,happiness,groups,avgWealth,avgSol};
 }
 const wageRatio=e.nationalWage/.12,happiness=Math.round(clamp1300(t.stability+(wageRatio-1)*11-(e.taxRate-10)*.25,0,100)),burghers=clamp1300(10+t.economy*.13,12,24),clergy=6,nobles=4,soldiers=5,peasants=Math.max(0,100-burghers-clergy-nobles-soldiers),groups=[['Peasants',peasants],['Burghers',burghers],['Clergy',clergy],['Nobles',nobles],['Soldiers',soldiers]].map(([name,pct])=>({name,pct:Math.round(pct*10)/10,count:Math.round(t.population*pct/100),wealth:0,sol:0}));
 return {...t,happiness,groups,avgWealth:0,avgSol:0};
}
function countryRebellionRows1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy);
 return (game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean).map(c=>{
  const wage=effectiveCityWage1300(game,c.id),stability=effectiveProvinceStability1300(game,c,gameProvinceBuildingState(c).bonuses.stability),risk=Math.round(clamp1300(100-stability+(e.taxRate-10)*.35-(wage/.12-1)*10+e.corruption*.12,0,100));
  return {c,risk};
 }).sort((a,b)=>b.risk-a.risk);
}
function countryPoliticsHTML1300(game){
 refreshCampaignStage1300(game);const t=countryTotals1300(game),capital=t.cities[0],independent=(game.ownedCities||[]).filter(id=>game.independenceByCity?.[id]).length;
 return `<section class="country-overview-hero"><div class="country-flag-large">${flagShieldHTML1300(game.flag,'country-panel-flag')}</div><div><span>${esc(campaignStageLabel1300(game).toUpperCase())}</span><h2>${esc(gameCountryName1300(game))}</h2><p>Capital: <strong>${esc(capital?displayCityName1300(capital):'—')}</strong></p></div></section>
 <section class="campaign-path"><div class="${game.campaignStage==='rebellion'?'active done':''}"><span>1</span><strong>Rebellion</strong><small>${independent}/${game.ownedCities.length} cities independent</small></div><div class="${['free_cities','nation'].includes(game.campaignStage)?'active done':''}"><span>2</span><strong>Free Cities</strong><small>All cities recognised as independent</small></div><div class="${game.campaignStage==='nation'?'active done':''}"><span>3</span><strong>Nation</strong><small>Form a country in Decisions</small></div><div class="${game.won?'active done':''}"><span>4</span><strong>Great Power</strong><small>Reach the Overall Top 5 to win</small></div></section>
 <section class="country-stat-grid"><div><span>Provinces</span><strong>${t.cities.length}</strong></div><div><span>Population</span><strong>${strengthNumber(t.population)}</strong></div><div><span>Army</span><strong>${strengthNumber(t.army)}</strong></div><div><span>Navy</span><strong>${strengthNumber(t.navy)}</strong></div></section>
 <section class="country-policy-card"><span>GOVERNMENT</span><h3>Player Realm</h3><p>Your country currently has direct player rule. Government reforms, laws, diplomacy and interest groups can be added here later.</p></section>
 <section class="country-national-stats">${[['Food',t.food],['Economy',t.economy],['Technology',t.technology],['Stability',t.stability]].map(([n,v])=>`<div><span>${n}</span><strong>${v}/100</strong><i><b style="width:${v}%"></b></i></div>`).join('')}</section>`;
}
function countryEconomyHTML1300(game){
 const e=game.economy=normaliseGameEconomy1300(game.economy),expenses=monthlyStateExpenses1300(game);e.monthExpenses=expenses.total;const balance=e.monthRevenue-e.monthExpenses,sectors=countrySectorRows1300(game);
 return `<section class="country-money-hero"><div><span>TREASURY</span><strong>ƒ${money1300(game.florins)}</strong></div><div><span>CURRENT MONTH BALANCE</span><strong class="${balance<0?'negative':''}">${balance<0?'-':'+'}ƒ${money1300(Math.abs(balance))}</strong></div></section>
 <section class="country-budget-table"><div class="country-budget-title"><span>MONTHLY BUDGET</span><small>Money is paid when the month closes</small></div>
  <div><span>Sector taxes</span><strong>+ƒ${money1300(e.monthRevenue)}</strong></div>
  <div><span>Professional army upkeep · ${strengthNumber(expenses.armyUnits)} × ƒ0.005</span><strong>-ƒ${money1300(expenses.army)}</strong></div>
  <div><span>Navy upkeep · ${strengthNumber(expenses.navyUnits)} × ƒ0.02</span><strong>-ƒ${money1300(expenses.navy)}</strong></div>
  <div><span>Administration & anti-corruption</span><strong>-ƒ${money1300(expenses.stability)}</strong></div>
  <div><span>Total state expenses</span><strong>-ƒ${money1300(e.monthExpenses)}</strong></div>
  <div class="balance"><span>Current balance</span><strong>${balance<0?'-':'+'}ƒ${money1300(Math.abs(balance))}</strong></div>
  <div class="last-month"><span>Last month · ${esc(e.lastMonthLabel)}</span><strong>${e.lastMonthBalance<0?'-':'+'}ƒ${money1300(Math.abs(e.lastMonthBalance))}</strong></div>
 </section>
 <section class="country-econ-policy"><div><span>National tax rate</span><small>Applied to profitable sectors</small></div><div class="tax-stepper"><button data-action="game-tax-adjust" data-delta="-1">−</button><strong>${e.taxRate}%</strong><button data-action="game-tax-adjust" data-delta="1">+</button></div></section>
 <section class="country-econ-policy"><div><span>National minimum wage</span><small>Province and company overrides can replace this</small></div>${wageStepper1300('national','',null,e.nationalWage,false)}</section>
 <section class="country-econ-policy stability-spending"><div><span>Administration & anti-corruption</span><small>Recommended: ƒ${money1300(expenses.stabilityNeed)}/month · Corruption ${money1300(e.corruption)}% · Stability ${e.lastStabilityChange>0?'+':''}${money1300(e.lastStabilityChange)}/month</small></div><div class="stability-budget-slider"><strong id="stability-budget-value">ƒ${money1300(e.stabilityBudget)}</strong><input id="stability-budget-range" type="range" min="0" max="100" step="0.01" value="${e.stabilityBudget}" aria-label="Administration and anti-corruption monthly budget"><div><span>ƒ0.00</span><span>ƒ100.00</span></div></div></section>
 ${countryMarketHTML1300(game)}
 <div class="country-section-title"><span>COMPANIES & SECTORS</span><small>${sectors.length} active sector types</small></div>
 <section class="country-company-list">${sectors.length?sectors.map(r=>`<article><div class="company-icon">${buildingPicture1300(r.id)}</div><div class="company-main"><div><strong>${esc(r.name)}</strong><span>${r.levels} levels</span></div><small>${esc(r.category)}</small><p>Workers <b>${strengthNumber(r.workers)} / ${strengthNumber(r.capacity)}</b> · Avg. wage <b>ƒ${money1300(r.avgWage)}</b></p></div><div class="company-money"><span>Profit/month</span><strong class="${r.profit<0?'negative':''}">ƒ${money1300(r.profit)}</strong><small>Inputs ƒ${money1300(r.inputCost||0)} · Tax ƒ${money1300(r.tax)}</small></div></article>`).join(''):'<p class="country-empty">No active sectors yet.</p>'}</section>`;
}
function countryPeopleHTML1300(game){
 const p=countryPeople1300(game);
 return `<section class="people-happiness"><div><span>POPULATION HAPPINESS</span><strong>${p.happiness}<small>/100</small></strong></div><i><b style="width:${p.happiness}%"></b></i><p>Happiness currently reacts to stability, national taxation and the national minimum wage.</p></section>
 <section class="country-stat-grid people"><div><span>Total population</span><strong>${strengthNumber(p.population)}</strong></div><div><span>Average stability</span><strong>${p.stability}/100</strong></div><div><span>Average wealth</span><strong>${p.avgWealth?p.avgWealth.toFixed(1):'—'}</strong></div><div><span>Standard of living</span><strong>${p.avgSol?p.avgSol.toFixed(1):'—'}</strong></div></section>
 <div class="country-section-title"><span>POPULATION GROUPS</span><small>Approximate social distribution</small></div>
 <section class="population-groups">${p.groups.map(g=>`<article><div><strong>${g.name}</strong><span>${g.pct}%</span></div><i><b style="width:${g.pct}%"></b></i><small>${strengthNumber(g.count)} people${g.wealth?' · wealth '+g.wealth.toFixed(1)+' · SOL '+g.sol.toFixed(1):''}</small></article>`).join('')}</section>`;
}
function countryDecisionsHTML1300(game){
 refreshCampaignStage1300(game);const candidates=formableRealms1300(game),independenceRows=(game.ownedCities||[]).map(id=>({c:CITY_1300[id],origin:game.originCountryByCity?.[id]||CITY_1300[id]?.country,free:game.independenceByCity?.[id]===true})).filter(x=>x.c);
 return `<div class="country-section-title"><span>INDEPENDENCE</span><small>${campaignStageLabel1300(game)} · right-click countries on the map for diplomacy, recognition, alliances, war and trade</small></div>
 <section class="independence-status">${independenceRows.map(r=>`<article><div><strong>${esc(displayCityName1300(r.c))}</strong><small>Rebelling from ${esc(r.origin)}</small></div><span class="${r.free?'free':'pending'}">${r.free?'INDEPENDENT':'REBELLION'}</span></article>`).join('')}</section>
 <section class="future-diplomacy-note"><strong>Active diplomacy</strong><p>Right-click a country on the campaign map. Parent countries can recognise your rebel provinces, friendly realms can become allies or send financial aid, and provinces can be sold as diplomatic concessions. Trade uses the surplus goods produced by your economy.</p></section>
 <div class="country-section-title"><span>FORMABLE COUNTRIES</span><small>Only countries linked to at least one city you already own</small></div>
 <section class="formable-country-list">${candidates.length?candidates.map(f=>`<article class="${f.canForm?'ready':''}"><div class="formable-head"><div><strong>${esc(f.country)}</strong><small>${f.held.length}/${f.cities.length} required provinces</small></div><span>${Math.round(f.progress*100)}%</span></div><div class="formable-progress"><i style="width:${Math.round(f.progress*100)}%"></i></div><p><b>Owned:</b> ${f.held.map(c=>esc(displayCityName1300(c))).join(', ')||'None'}</p><p><b>Still needed:</b> ${f.missing.length?f.missing.map(c=>esc(displayCityName1300(c))).join(', '):'All required provinces owned'}</p><button data-action="form-country" data-country="${esc(f.country)}" ${f.canForm?'':'disabled'}>${f.canForm?'FORM '+esc(f.country):game.campaignStage!=='free_cities'?'BECOME FREE CITIES FIRST':'MISSING PROVINCES'}</button></article>`).join(''):'<p class="country-empty">No formable country is linked to your current cities.</p>'}</section>
 <div class="country-section-title"><span>VICTORY</span><small>Final campaign objective</small></div><section class="great-power-goal"><strong>${game.won?'VICTORY · GREAT POWER':'Become a Great Power'}</strong><p>After forming a real nation, reach the <b>Overall Top 5</b> in the campaign Rankings. Entering the Top 5 wins the campaign.</p></section>`;
}
function countryTechnologyHTML1300(game){
 const t=countryTotals1300(game),nodes=[['Crop Administration',50],['Guild Organisation',60],['Improved Metallurgy',68],['Scholastic Networks',76],['Advanced Fortification',84],['Financial Institutions',92]];
 return `<section class="tech-summary"><span>NATIONAL TECHNOLOGY</span><strong>${t.technology}<small>/100</small></strong><p>This first tree is a framework; later each branch can have costs, research time and prerequisites.</p></section><section class="tech-tree">${nodes.map(([name,need],i)=>`<article class="${t.technology>=need?'unlocked':'locked'}"><span>Tier ${i+1}</span><strong>${name}</strong><small>${t.technology>=need?'AVAILABLE':'Requires '+need+' technology'}</small></article>`).join('')}</section>`;
}
function countryRebellionsHTML1300(game){
 const rows=countryRebellionRows1300(game),avg=rows.length?Math.round(rows.reduce((n,r)=>n+r.risk,0)/rows.length):0;
 return `<section class="rebellion-summary"><span>NATIONAL UNREST</span><strong>${avg}<small>/100</small></strong><p>Risk rises with low stability, high taxes and weak wages. Actual rebel armies will be added later.</p></section><section class="rebellion-list">${rows.map(r=>`<article><div><strong>${esc(displayCityName1300(r.c))}</strong><small>${r.risk>=60?'High risk':r.risk>=30?'Moderate risk':'Low risk'}</small></div><i><b style="width:${r.risk}%"></b></i><span>${r.risk}%</span></article>`).join('')}</section>`;
}

function diplomacyAssetOptions1300(selected='florins'){return [{id:'florins',name:'Florins'},...GOODS_1300].map(g=>`<option value="${g.id}" ${selected===g.id?'selected':''}>${esc(g.name)}</option>`).join('');}
function updateDiplomacyAcceptancePreview1300(){
 const game=profile.activeGame,country=gameDiplomacyCountry;if(!game||!country)return;
 const put=(selector,a)=>{const el=$(selector);if(el)el.innerHTML=acceptanceMeterHTML1300(a.score,a.note);};
 put('#dip-alliance-acceptance',allianceAssessment1300(game,country));
 put('#dip-money-acceptance',moneyRequestAssessment1300(game,country,$('#dip-money-amount')?.value));
 put('#dip-independence-acceptance',independenceAssessment1300(game,country));
 put('#dip-sell-acceptance',citySaleAssessment1300(game,country,$('#dip-sell-city')?.value,$('#dip-sell-price')?.value));
 put('#dip-trade-acceptance',tradeAssessment1300(game,country,$('#dip-offer-asset')?.value,$('#dip-offer-amount')?.value,$('#dip-request-asset')?.value,$('#dip-request-amount')?.value));
}
function diplomacyCountryPanelHTML1300(country){
 const game=profile.activeGame;if(!game||!country)return '';
 const {d,stats,model}=ensureDiplomacyCountry1300(game,country),rel=diplomacyRelation1300(game,country),war=!!d.wars[country],ally=!!d.alliances[country],cities=diplomacyCountryCities1300(country).filter(c=>!c.supportTerritory),pending=(game.ownedCities||[]).filter(id=>(game.originCountryByCity?.[id]||CITY_1300[id]?.country)===country&&game.independenceByCity?.[id]!==true),ownCities=(game.ownedCities||[]).map(id=>CITY_1300[id]).filter(Boolean),stock=GOODS_1300.map(g=>({g,n:Number(d.tradeStockpile[g.id])||0})).filter(x=>x.n>.005).sort((a,b)=>b.n-a.n),needs=GOODS_1300.map(g=>({g,b:model.balances[g.id]||0})).filter(x=>x.b<-.5).sort((a,b)=>a.b-b.b).slice(0,6),surplus=GOODS_1300.map(g=>({g,b:model.balances[g.id]||0})).filter(x=>x.b>.5).sort((a,b)=>b.b-a.b).slice(0,6),history=d.history.filter(x=>x.country===country).slice(-7).reverse();
 const relationClass=rel>=35?'positive':rel<=-35?'negative':'neutral',status=war?'AT WAR':ally?'ALLIANCE':d.recognitions[country]?'RECOGNISES YOUR INDEPENDENCE':'NO TREATY',defaultTradeRequest=needs[0]?.g.id||surplus[0]?.g.id||'grain',allianceA=allianceAssessment1300(game,country),moneyA=moneyRequestAssessment1300(game,country,5),independenceA=independenceAssessment1300(game,country),saleA=citySaleAssessment1300(game,country,ownCities[0]?.id,10),tradeA=tradeAssessment1300(game,country,'florins',5,defaultTradeRequest,5);
 return `<div class="dip-panel-head"><button class="country-panel-close" data-action="game-diplomacy-close">×</button><div class="dip-realm-seal">${icon('crown')}</div><div><span>${esc(polityType(country).toUpperCase())}</span><h2>${esc(country)}</h2><small class="${war?'negative':ally?'positive':''}">${status}</small></div></div>
 <div class="dip-scroll">
  <section class="dip-relation-card"><div><span>RELATIONSHIP</span><strong class="${relationClass}">${rel>0?'+':''}${rel}</strong><small>${diplomacyRelationLabel1300(rel)}</small></div><i><b style="width:${(rel+100)/2}%"></b></i></section>
  <section class="dip-stat-grid"><div><span>Provinces</span><strong>${stats.cityCount||cities.length||'—'}</strong></div><div><span>Population</span><strong>${strengthNumber(stats.population||0)}</strong></div><div><span>Army</span><strong>${strengthNumber(stats.army||0)}</strong></div><div><span>Navy</span><strong>${strengthNumber(stats.navy||0)}</strong></div><div><span>Economy</span><strong>${stats.economyAvg??'—'}/100</strong></div><div><span>Stability</span><strong>${stats.stabilityAvg??'—'}/100</strong></div></section>
  <div class="dip-section-title"><span>DIPLOMATIC ACTIONS</span><small>AI decisions use relations, power and self-interest</small></div>
  <section class="dip-action-grid">
   <button data-action="dip-improve" ${war?'disabled':''}><strong>Improve relationship</strong><small>Send envoys & gifts · costs ƒ5 · +12 relation</small></button>
   <button data-action="dip-insult"><strong>Insult</strong><small>−20 relation and breaks an alliance</small></button>
   <button class="danger" data-action="dip-war" ${war?'disabled':''}><strong>${war?'Already at war':'Declare war'}</strong><small>Sets relations to −100 and ends treaties</small></button>
   <button data-action="dip-alliance" ${war||ally?'disabled':''}><strong>${ally?'Alliance active':'Request alliance'}</strong><small>They weigh relations and whether you are strategically useful</small></button>
  </section>
  <div id="dip-alliance-acceptance" class="dip-acceptance-wrap"><span class="dip-acceptance-title">ALLIANCE PROPOSAL</span>${acceptanceMeterHTML1300(allianceA.score,allianceA.note)}</div>

  <section class="dip-request-row"><div><strong>Ask for Florins</strong><small>Their available diplomatic treasury: ƒ${money1300(d.aiTreasuries[country])}</small></div><input id="dip-money-amount" type="number" min="0.01" step="0.01" value="5"><button data-action="dip-money" ${war?'disabled':''}>REQUEST</button></section>
  <div id="dip-money-acceptance" class="dip-acceptance-wrap compact">${acceptanceMeterHTML1300(moneyA.score,moneyA.note)}</div>

  <section class="dip-request-row independence"><div><strong>Ask for independence</strong><small>${pending.length?pending.length+' rebel province'+(pending.length===1?'':'s')+' still need recognition':'No pending provinces from this country'}</small></div><button data-action="dip-independence" ${!pending.length||war?'disabled':''}>ASK RECOGNITION</button></section>
  <div id="dip-independence-acceptance" class="dip-acceptance-wrap compact">${acceptanceMeterHTML1300(independenceA.score,independenceA.note)}</div>

  <div class="dip-section-title"><span>SELL A CITY</span><small>Price, historical ownership and relations affect their valuation</small></div>
  <section class="dip-sell-row"><select id="dip-sell-city">${ownCities.map(c=>`<option value="${c.id}">${esc(displayCityName1300(c))}</option>`).join('')}</select><label>Price ƒ<input id="dip-sell-price" type="number" min="0" step="0.01" value="10"></label><button data-action="dip-sell-city" ${ownCities.length<=1||war?'disabled':''}>MAKE OFFER</button></section>
  <div id="dip-sell-acceptance" class="dip-acceptance-wrap compact">${acceptanceMeterHTML1300(saleA.score,saleA.note)}</div>

  <div class="dip-section-title"><span>TRADE</span><small>Countries want scarce goods and prefer exporting their surpluses</small></div>
  <section class="dip-market-signals"><div><span>THEY NEED MOST</span>${needs.length?needs.map(x=>`<b>${esc(x.g.name)} <small>shortage ${money1300(Math.abs(x.b))}</small></b>`).join(''):'<small>No major shortages detected</small>'}</div><div><span>EASIEST FOR THEM TO EXPORT</span>${surplus.length?surplus.map(x=>`<b>${esc(x.g.name)} <small>surplus +${money1300(x.b)}</small></b>`).join(''):'<small>No major surplus detected</small>'}</div></section>
  <section class="dip-your-stock"><span>YOUR TRADE STOCK</span><div>${stock.length?stock.map(x=>`<b>${esc(x.g.name)} <small>${money1300(x.n)}</small></b>`).join(''):'<small>Your economy has not accumulated a tradable surplus yet.</small>'}</div></section>
  <section class="dip-trade-builder"><div><span>YOU OFFER</span><select id="dip-offer-asset">${diplomacyAssetOptions1300('florins')}</select><input id="dip-offer-amount" type="number" min="0.01" step="0.01" value="5"></div><em>⇄</em><div><span>YOU REQUEST</span><select id="dip-request-asset">${diplomacyAssetOptions1300(defaultTradeRequest)}</select><input id="dip-request-amount" type="number" min="0.01" step="0.01" value="5"></div><button data-action="dip-trade" ${war?'disabled':''}>PROPOSE TRADE</button></section>
  <div id="dip-trade-acceptance" class="dip-acceptance-wrap trade">${acceptanceMeterHTML1300(tradeA.score,tradeA.note)}</div>

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
 const game=profile.activeGame,country=String(region?.name||region?.realm||'').trim();if(!game||!country)return;if(country===gameCountryName1300(game)){openGameCountryPanel1300();return;}ensureDiplomacyCountry1300(game,country);gameProvincePanel=null;gameProvinceBuildingDetail=null;gameCountryPanel=false;renderGameProvincePanel();renderGameCountryPanel1300();gameDiplomacyCountry=country;renderGameDiplomacyPanel1300();
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
 if(!profile.activeGame)return;gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();gameProvincePanel=null;gameProvinceBuildingDetail=null;renderGameProvincePanel();gameCountryPanel=true;renderGameCountryPanel1300();
}
function gamePage(){
 if(!profile.activeGame){
  const selected=profile.deck.map(id=>CITY_1300[id]).filter(Boolean);
  return `<main class="game-start-page"><div class="game-start-card"><span class="eyebrow">NEW CAMPAIGN · 1300 CE</span><h1>Start a rebellion<span class="title-dot">.</span></h1><p>On <strong>1 January 1300</strong>, four random cities from your 16-card deck rebel together against their parent countries. Win independence for every city, become Free Cities, form a nation, then reach the Overall Top 5 to become a Great Power and win.</p><div class="game-deck-status"><span><strong>${profile.deck.length}</strong><small>/16 cards</small></span><div><b style="width:${Math.min(100,profile.deck.length/16*100)}%"></b></div></div><div class="game-start-preview">${selected.slice(0,8).map(c=>`<span>${esc(displayCityName1300(c))}</span>`).join('')}${selected.length>8?`<span>+${selected.length-8} more</span>`:''}</div><div class="game-color-picker"><div><span>YOUR REALM COLOR</span><small>Your four opening provinces become this color when the campaign starts.</small></div><div class="game-color-swatches">${PLAYER_REALM_COLORS.map(([hex,name])=>`<button class="${profile.playerColor===hex?'active':''}" data-action="game-color" data-color="${hex}" title="${name}" aria-label="Choose ${name} realm color" style="--swatch:${hex}"></button>`).join('')}</div></div><div class="game-flag-editor"><div class="game-flag-copy"><span>YOUR FLAG</span><strong>Draw your realm flag</strong><small>Default is red. Choose a colour and paint the grid.</small><div class="flag-palette">${FLAG_COLORS_1300.map(c=>`<button class="${flagPaintColor===c?'active':''}" data-action="flag-color" data-color="${c}" style="--flag-paint:${c}" aria-label="Choose flag colour"></button>`).join('')}</div><button class="text-btn flag-reset-btn" data-action="flag-reset">Reset to red</button></div><div class="game-flag-canvas">${flagShieldHTML1300(profile.playerFlag,'editor-preview')}<div class="flag-editor-grid">${flagGridHTML1300(profile.playerFlag,true)}</div></div></div><div class="game-start-actions"><button class="btn primary large-button" data-action="start-game" ${profile.deck.length===16?'':'disabled'}><span>Start Game</span>${icon('arrow')}</button>${profile.deck.length===16?'':`<button class="text-btn" data-action="deck">Choose your 16-card deck</button>`}</div></div></main>`;
 }
 if(gameScreen==='development')return developmentPage();
 const gameDate=gameDate1300(profile.activeGame.day);
 return `<div class="game-map-shell"><main class="map-surface" id="game-map-host"></main>
  <div class="game-date-panel"><span>CAMPAIGN DATE</span><strong id="game-date-main">${gameDate.day} ${gameDate.month}</strong><small id="game-date-year">${gameDate.year}</small><em id="game-clock-status"></em></div><div class="game-treasury-panel"><span>IN-GAME TREASURY</span><strong id="game-treasury-amount">ƒ${money1300(profile.activeGame.florins)}</strong><small id="game-daily-tax">Month balance: ƒ${money1300((profile.activeGame.economy?.monthRevenue||0)-(profile.activeGame.economy?.monthExpenses||0))}</small></div>
  <button class="game-country-shield" data-action="game-country-open" data-country-shield="1" aria-label="Open your country">${flagShieldHTML1300(profile.activeGame.flag,'map-shield')}</button>
  <div class="game-map-actions"><span class="player-realm-chip" style="--player-realm:${profile.activeGame.playerColor}"><i></i>Your Realm · ${profile.activeGame.ownedCities.length} provinces</span></div><button class="game-quit-button" data-action="quit-game">Quit</button>
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
 if(a==='start-game'){gameProvincePanel=null;gameProvinceBuildingDetail=null;gameCountryPanel=false;gameDiplomacyCountry=null;startGame1300();return;}
 if(a==='game-map'){gameScreen='map';render();return;}
 if(a==='close-game-province'){gameProvincePanel=null;gameProvinceBuildingDetail=null;renderGameProvincePanel();return;}
 if(a==='game-building-detail'){if(BUILDING_1300[id]&&CITY_1300[b.dataset.city]){gameProvincePanel=b.dataset.city;gameProvinceBuildingDetail=id;renderGameProvincePanel();}return;}
 if(a==='game-building-detail-back'){gameProvinceBuildingDetail=null;renderGameProvincePanel();return;}
 if(a==='game-country-open'){openGameCountryPanel1300();return;}
 if(a==='game-country-close'){gameCountryPanel=false;renderGameCountryPanel1300();return;}
 if(a==='game-country-tab'){if(GAME_COUNTRY_TABS.some(([x])=>x===id)){gameCountryTab=id;renderGameCountryPanel1300();}return;}
 if(a==='game-diplomacy-close'){gameDiplomacyCountry=null;renderGameDiplomacyPanel1300();return;}
 if(a==='dip-improve'){improveRelations1300(gameDiplomacyCountry);return;}
 if(a==='dip-insult'){insultCountry1300(gameDiplomacyCountry);return;}
 if(a==='dip-war'){declareWar1300(gameDiplomacyCountry);return;}
 if(a==='dip-alliance'){requestAlliance1300(gameDiplomacyCountry);return;}
 if(a==='dip-money'){requestMoney1300(gameDiplomacyCountry,$('#dip-money-amount')?.value);return;}
 if(a==='dip-independence'){requestIndependence1300(gameDiplomacyCountry);return;}
 if(a==='dip-sell-city'){sellCityToCountry1300(gameDiplomacyCountry,$('#dip-sell-city')?.value,$('#dip-sell-price')?.value);return;}
 if(a==='dip-trade'){executeDiplomaticTrade1300(gameDiplomacyCountry,$('#dip-offer-asset')?.value,$('#dip-offer-amount')?.value,$('#dip-request-asset')?.value,$('#dip-request-amount')?.value);return;}
 if(a==='form-country'){formCampaignNation1300(b.dataset.country);return;}
 if(a==='game-ranking-category'){if(RANKING_CATEGORIES_1300.some(([x])=>x===id)){gameRankingCategory=id;renderGameCountryPanel1300();}return;}
 if(a==='game-build-province'){buyGameProvinceBuilding(b.dataset.city,id);return;}
 if(a==='game-tax-adjust'){changeGameTax1300(b.dataset.delta);return;}
 if(a==='game-national-wage-adjust'){changeNationalWage1300(b.dataset.delta);return;}
 if(a==='game-city-wage-adjust'){changeCityWage1300(b.dataset.city,b.dataset.delta);return;}
 if(a==='game-city-wage-reset'){resetCityWage1300(b.dataset.city);return;}
 if(a==='game-building-wage-adjust'){changeBuildingWage1300(b.dataset.city,id,b.dataset.delta);return;}
 if(a==='game-building-wage-reset'){resetBuildingWage1300(b.dataset.city,id);return;}
 if(a==='quit-game'){profile.activeGame=null;gameScreen='map';gameProvincePanel=null;gameProvinceBuildingDetail=null;gameCountryPanel=false;gameDiplomacyCountry=null;save();render();toast('You left the campaign. Your deck was kept.');return;}
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
document.addEventListener('contextmenu',e=>{const shield=e.target.closest('[data-country-shield]');if(shield&&profile.activeGame){e.preventDefault();openGameCountryPanel1300();}});
document.addEventListener('input',e=>{if(e.target.id==='city-search-1300'){search1300=e.target.value;renderGrid();}if(e.target.id==='deck-search'){deckSearch=e.target.value;render();}if(e.target.id==='atlas-search'){atlasSearch=e.target.value;const list=CITIES_1300.filter(c=>`${c.name} ${c.subrealm} ${c.historicalRole}`.toLowerCase().includes(atlasSearch.toLowerCase()));$('#atlas-city-list').innerHTML=mapList(list);}if(e.target.id==='stability-budget-range'){setStabilityBudget1300(e.target.value);}if(['dip-money-amount','dip-sell-price','dip-offer-amount','dip-request-amount'].includes(e.target.id))updateDiplomacyAcceptancePreview1300();});
document.addEventListener('change',e=>{if(e.target.id==='building-city-select'){buildingCity=e.target.value;render();}if(e.target.id==='country-filter-1300'){country1300=e.target.value;render();}if(e.target.id==='deck-country-filter'){deckCountry=e.target.value;render();}if(['dip-sell-city','dip-offer-asset','dip-request-asset'].includes(e.target.id))updateDiplomacyAcceptancePreview1300();});
$('#import-file').addEventListener('change',async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;try{if(file.size>1000000)throw new Error();const p=migrateProfile(JSON.parse(await file.text()));if(!p||!validateProfile(p))throw new Error();ensureEconomyProfile(p);ensureGameProfile(p);showDialog(`<div class="simple-dialog"><span class="eyebrow">RESTORE CAMPAIGN</span><h2>Import this 1300 campaign?</h2><p>This replaces your current building progress and treasury with <strong>ƒ ${p.florins.toLocaleString('en-GB')}</strong>.</p><div class="dialog-actions">${button('Cancel','close')}${button('Import and replace','confirm-import','primary')}</div></div>`);modal.querySelector('[data-action="confirm-import"]').addEventListener('click',()=>{profile=p;save();navigate('collection');toast('1300 campaign imported.');},{once:true});}catch{toast('Invalid campaign file. Your existing progress was kept.');}});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
render();window.__CARDWARS_BOOTED__=true;if(storageFailed)toast('A saved collection could not be loaded. You can import a backup from the guide.');
