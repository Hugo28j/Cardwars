import {CITIES_1300,CITY_1300} from '../src/data1300.js';
import {BUILDINGS_1300,startingBuildingLevel1300} from '../src/buildings1300.js';

export const MULTIPLAYER_GOODS_1300=[
 ['grain','Grain',20],['fish','Fish',24],['meat','Meat',32],['wool','Wool',22],
 ['cloth','Cloth',38],['wood','Wood',25],['stone','Stone',24],['iron','Iron',34],
 ['tools','Tools',42],['leather','Leather',36],['salt','Salt',28],['ale','Beer',30],
 ['services','Services',26],['manuscripts','Manuscripts',55],['arms','Arms',58],['ships','Ships',75]
];
export const MULTIPLAYER_GOOD_IDS_1300=MULTIPLAYER_GOODS_1300.map(x=>x[0]);
const GOOD_META=Object.fromEntries(MULTIPLAYER_GOODS_1300.map(([id,name,basePrice])=>[id,{id,name,basePrice}]));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,Number(n)||0));
const round2=n=>Math.round((Number(n)||0)*100)/100;
const level=(state,cityId,buildingId)=>Math.max(0,startingBuildingLevel1300(CITY_1300[cityId],buildingId)+(Number(state?.buildings?.[cityId]?.[buildingId])||0));
const PRODUCTION={
 fields:{grain:80},pastures:{meat:11.25,wool:18.75},textiles:{cloth:15},forge:{tools:8,arms:4},
 market:{services:22.5},barracks:{services:11},dockyard:{ships:6,fish:8,services:4},
 guildhall:{services:17.5},university:{services:9,manuscripts:3},watermill:{grain:18},
 brewery:{ale:14},tannery:{leather:8},fishery:{fish:22},saltworks:{salt:15},quarry:{stone:20},
 lumberyard:{wood:21},ironworks:{iron:10},mint:{services:7},monastery:{manuscripts:4.5,services:9},
 cathedral:{services:10,manuscripts:2},hospital:{services:9}
};
const DIRECT_FLORINS={mint:1.5};
const NEED_PER_PERSON={grain:.00038,fish:.00007,meat:.000055,cloth:.000035,wood:.00002,tools:.000018,leather:.000015,salt:.000025,ale:.000025,services:.00016,arms:.000004,manuscripts:.000002};
function population(state){return (state?.ownedCities||[]).reduce((n,id)=>n+Math.max(0,Number(state?.populationByCity?.[id]??CITY_1300[id]?.people)||0),0);}
function army(state){return Object.values(state?.armyByCity||{}).reduce((n,x)=>n+Math.max(0,Number(x?.army)||0),0)+Object.values(state?.fieldArmies||{}).reduce((n,x)=>n+Math.max(0,Number(x?.count)||0),0)+(state?.movements||[]).reduce((n,x)=>n+Math.max(0,Number(x?.count)||0),0);}
function navy(state){return Object.values(state?.armyByCity||{}).reduce((n,x)=>n+Math.max(0,Number(x?.navy)||0),0);}
function blankGood(id,pop=0){
 const meta=GOOD_META[id],seed=Math.max(0,round2(pop*(NEED_PER_PERSON[id]||.00001)*2));
 return {id,name:meta.name,basePrice:meta.basePrice,stock:seed,produced:0,need:0,bought:0,sold:0,price:meta.basePrice,shortage:0};
}
export function ensureMultiplayerEconomy1300(campaign){
 if(!campaign)return campaign;
 for(const state of Object.values(campaign.playerStates||{})){
  state.economy=state.economy&&typeof state.economy==='object'&&!Array.isArray(state.economy)?state.economy:{};
  const e=state.economy,pop=population(state);
  e.taxRate=clamp(Number.isFinite(Number(e.taxRate))?e.taxRate:10,0,25);
  e.tariffRate=clamp(Number.isFinite(Number(e.tariffRate))?e.tariffRate:5,0,25);
  e.lastWeek=Number.isFinite(Number(e.lastWeek))?Number(e.lastWeek):-1;
  e.weeklyIncome=round2(e.weeklyIncome||0);e.weeklyUpkeep=round2(e.weeklyUpkeep||0);e.weeklyBalance=round2(e.weeklyBalance||0);
  e.taxIncome=round2(e.taxIncome||0);e.tradeIncome=round2(e.tradeIncome||0);e.buildingIncome=round2(e.buildingIncome||0);e.armyUpkeep=round2(e.armyUpkeep||0);e.navyUpkeep=round2(e.navyUpkeep||0);e.buildingUpkeep=round2(e.buildingUpkeep||0);
  e.goods=e.goods&&typeof e.goods==='object'&&!Array.isArray(e.goods)?e.goods:{};
  for(const id of MULTIPLAYER_GOOD_IDS_1300){if(!e.goods[id])e.goods[id]=blankGood(id,pop);else e.goods[id]={...blankGood(id,pop),...e.goods[id],id,name:GOOD_META[id].name,basePrice:GOOD_META[id].basePrice};}
 }
 ensureMultiplayerAI1300(campaign);
 return campaign;
}
function productionForState(state){
 const out=Object.fromEntries(MULTIPLAYER_GOOD_IDS_1300.map(id=>[id,0]));let direct=0,levels=0;
 for(const cityId of state.ownedCities||[]){const city=CITY_1300[cityId];if(!city)continue;const cityFactor=clamp(.75+(Number(city.economyScore)||50)/200,.85,1.25);
  for(const b of BUILDINGS_1300){const lv=level(state,cityId,b.id);if(lv<=0)continue;levels+=lv;const recipe=PRODUCTION[b.id];if(recipe)for(const [id,qty] of Object.entries(recipe))out[id]=(out[id]||0)+qty*lv*cityFactor;if(DIRECT_FLORINS[b.id])direct+=DIRECT_FLORINS[b.id]*lv;}
 }
 return {goods:out,direct:round2(direct),levels};
}
function weeklyNeeds(state){
 const pop=population(state),out={};for(const id of MULTIPLAYER_GOOD_IDS_1300)out[id]=pop*(NEED_PER_PERSON[id]||0);
 const military=army(state);out.grain+=military*.008;out.arms+=military*.002;out.services+=military*.003;return out;
}
export function processMultiplayerEconomyWeek1300(campaign,day){
 ensureMultiplayerEconomy1300(campaign);if(day%7!==0)return false;let changed=false;
 for(const state of Object.values(campaign.playerStates||{})){
  const e=state.economy,week=Math.floor(day/7);if(e.lastWeek>=week)continue;e.lastWeek=week;
  const pop=population(state),prod=productionForState(state),needs=weeklyNeeds(state);let shortagePressure=0,tradeIncome=0;
  for(const id of MULTIPLAYER_GOOD_IDS_1300){const row=e.goods[id],produced=Number(prod.goods[id])||0,need=Number(needs[id])||0,before=Math.max(0,Number(row.stock)||0),available=before+produced,consumed=Math.min(available,need),shortage=Math.max(0,need-consumed),after=Math.max(0,available-consumed),ratio=need>0?shortage/need:0;shortagePressure+=ratio;
   row.produced=round2(produced);row.need=round2(need);row.bought=0;row.sold=0;row.stock=round2(after);row.shortage=round2(ratio*100);row.price=round2(row.basePrice*clamp(1+ratio*1.5-Math.min(.25,after/Math.max(1,need)*.05),.65,2.5));
   const surplus=Math.max(0,after-need*2);if(surplus>0){const sold=Math.min(surplus,Math.max(1,need*.25));row.stock=round2(row.stock-sold);row.sold=round2(sold);tradeIncome+=sold*row.price*.002*(1+e.tariffRate/100);}
  }
  const taxIncome=pop/50000*(e.taxRate/10),aUp=army(state)*.001,nUp=navy(state)*.003,bUp=prod.levels*.025,foodPenalty=shortagePressure/Math.max(1,MULTIPLAYER_GOOD_IDS_1300.length),income=Math.max(0,taxIncome+prod.direct+tradeIncome),upkeep=aUp+nUp+bUp,balance=income-upkeep;
  e.taxIncome=round2(taxIncome);e.tradeIncome=round2(tradeIncome);e.buildingIncome=round2(prod.direct);e.armyUpkeep=round2(aUp);e.navyUpkeep=round2(nUp);e.buildingUpkeep=round2(bUp);e.weeklyIncome=round2(income);e.weeklyUpkeep=round2(upkeep);e.weeklyBalance=round2(balance);e.shortagePressure=round2(foodPenalty*100);state.florins=round2(Math.max(0,Number(state.florins)||0)+balance);changed=true;
 }
 if(processMultiplayerAIWeek1300(campaign,day))changed=true;return changed;
}
export function handleEconomyCommand1300(campaign,clientId,action,payload,day){
 ensureMultiplayerEconomy1300(campaign);const state=campaign?.playerStates?.[clientId];if(!state)return null;
 if(action==='set_economy_policy'){const e=state.economy;if(payload.taxRate!==undefined)e.taxRate=round2(clamp(payload.taxRate,0,25));if(payload.tariffRate!==undefined)e.tariffRate=round2(clamp(payload.tariffRate,0,25));return {message:'Economy policy updated: tax '+e.taxRate+'%, tariffs '+e.tariffRate+'%.'};}
 return null;
}
export function normaliseTradeGoods1300(raw){
 const out={};if(!raw||typeof raw!=='object'||Array.isArray(raw))return out;
 for(const id of MULTIPLAYER_GOOD_IDS_1300){const n=round2(Math.max(0,Number(raw[id])||0));if(n>0)out[id]=n;}return out;
}
export function goodStock1300(state,id){ensureStateEconomy(state);return Math.max(0,Number(state?.economy?.goods?.[id]?.stock)||0);}
function ensureStateEconomy(state){
 if(!state)return;state.economy=state.economy&&typeof state.economy==='object'?state.economy:{goods:{}};state.economy.goods=state.economy.goods&&typeof state.economy.goods==='object'?state.economy.goods:{};
 for(const id of MULTIPLAYER_GOOD_IDS_1300)if(!state.economy.goods[id])state.economy.goods[id]=blankGood(id,population(state));
}
export function transferTradeGoods1300(from,to,goods){
 ensureStateEconomy(from);ensureStateEconomy(to);
 for(const [id,qtyRaw] of Object.entries(normaliseTradeGoods1300(goods))){const qty=round2(qtyRaw);if(goodStock1300(from,id)+1e-9<qty)throw new Error('Not enough '+GOOD_META[id].name+' stock for this trade.');}
 for(const [id,qtyRaw] of Object.entries(normaliseTradeGoods1300(goods))){const qty=round2(qtyRaw);from.economy.goods[id].stock=round2(goodStock1300(from,id)-qty);to.economy.goods[id].stock=round2(goodStock1300(to,id)+qty);}
}
function aggregateAICountries(campaign){
 const human=new Set(Object.keys(campaign.cityOwners||{})),groups={};
 for(const city of CITIES_1300){if(human.has(city.id))continue;const key=city.country;if(!groups[key])groups[key]={country:key,cityCount:0,population:0,army:0,navy:0,economy:0,food:0,technology:0,stability:0};const g=groups[key];g.cityCount++;g.population+=Number(city.people)||0;g.army+=Number(city.army)||0;g.navy+=Number(city.navy)||0;g.economy+=Number(city.economyScore)||0;g.food+=Number(city.food)||0;g.technology+=Number(city.technology)||0;g.stability+=Number(city.stability)||0;}
 for(const g of Object.values(groups)){for(const k of ['economy','food','technology','stability'])g[k]=round2(g[k]/Math.max(1,g.cityCount));}return groups;
}
export function ensureMultiplayerAI1300(campaign){
 campaign.aiCountries=campaign.aiCountries&&typeof campaign.aiCountries==='object'&&!Array.isArray(campaign.aiCountries)?campaign.aiCountries:{};
 const groups=aggregateAICountries(campaign);
 for(const [country,g] of Object.entries(groups)){const s=campaign.aiCountries[country]||{};campaign.aiCountries[country]={...g,treasury:round2(Number.isFinite(Number(s.treasury))?s.treasury:Math.max(25,40+g.economy*1.5+g.cityCount*10+g.population/25000)),development:Math.max(0,Number(s.development)||0),militaryInvestment:Math.max(0,Number(s.militaryInvestment)||0),lastWeek:Number.isFinite(Number(s.lastWeek))?Number(s.lastWeek):-1,lastDecision:String(s.lastDecision||'Holding reserves')};}
 for(const key of Object.keys(campaign.aiCountries))if(!groups[key])delete campaign.aiCountries[key];return campaign.aiCountries;
}
export function processMultiplayerAIWeek1300(campaign,day){
 if(day%7!==0)return false;const states=ensureMultiplayerAI1300(campaign),week=Math.floor(day/7);let changed=false;
 for(const s of Object.values(states)){if(s.lastWeek>=week)continue;s.lastWeek=week;const income=.35*s.cityCount+s.population/180000+s.economy/35,upkeep=s.army*.0011+s.navy*.018,balance=income-upkeep;s.treasury=round2(Math.max(0,s.treasury+balance));if(week%4===Math.abs(hashCountry(s.country))%4){const cost=round2(18+s.cityCount*3+Math.sqrt(s.population/1000)*1.4+s.development*8);if(s.treasury>cost+25){s.treasury=round2(s.treasury-cost);s.development=round2(s.development+1);if(s.army/Math.max(1,s.population)<.02){const add=Math.max(1,Math.round(s.population*.00025));s.army+=add;s.militaryInvestment=round2(s.militaryInvestment+1);s.lastDecision='Recruited '+add+' professional soldiers';}else{s.economy=round2(clamp(s.economy+.3,0,110));s.lastDecision='Invested in commerce and infrastructure';}}else s.lastDecision='Saved treasury reserves';}changed=true;}
 return changed;
}
function hashCountry(value){let h=0;for(const ch of String(value||''))h=(Math.imul(h,31)+ch.charCodeAt(0))|0;return h;}
