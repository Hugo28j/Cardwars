import {PLAYER_REALM,diplomacyState,relation,opinion,performAction} from './diplomacy1300.js?v=20260926-country-ai-v23';

const clamp=(n,min,max)=>Math.max(min,Math.min(max,Number(n)||0));
const round=n=>Math.round((Number(n)||0)*100)/100;
const PROJECT_IDS=['agriculture','commerce','learning','administration','military','navy'];

function hashText1300(value){
 let h=2166136261;
 for(const ch of String(value||'')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}
 return h>>>0;
}
function unitNoise1300(country,salt=0){
 const h=hashText1300(String(country)+'|'+String(salt));
 return (h%100000)/99999;
}
export function countryAIPersonality1300(country){
 return {
  aggression:round(.25+unitNoise1300(country,11)*.55),
  caution:round(.30+unitNoise1300(country,23)*.55),
  development:round(.35+unitNoise1300(country,37)*.55),
  diplomacy:round(.30+unitNoise1300(country,51)*.60),
  trade:round(.30+unitNoise1300(country,67)*.60)
 };
}
function freshModifiers1300(){return {food:0,economy:0,technology:0,stability:0,armyPct:0,navyPct:0};}
function freshLevels1300(){return {agriculture:0,commerce:0,learning:0,administration:0,military:0,navy:0};}
function normaliseNumberMap1300(raw,keys){
 const out={};
 for(const key of keys)out[key]=Math.max(0,Number(raw?.[key])||0);
 return out;
}
export function freshCountryAI1300(){return {version:1,lastWeek:null,countries:{}};}
export function normaliseCountryAI1300(raw){
 const ai=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshCountryAI1300();
 ai.version=1;
 ai.lastWeek=Number.isFinite(Number(ai.lastWeek))?Number(ai.lastWeek):null;
 if(!ai.countries||typeof ai.countries!=='object'||Array.isArray(ai.countries))ai.countries={};
 for(const [country,stateRaw] of Object.entries({...ai.countries})){
  if(!stateRaw||typeof stateRaw!=='object'||Array.isArray(stateRaw)){delete ai.countries[country];continue;}
  const state=stateRaw;
  state.personality={...countryAIPersonality1300(country),...(state.personality||{})};
  for(const key of ['aggression','caution','development','diplomacy','trade'])state.personality[key]=clamp(state.personality[key],0,1);
  state.levels=normaliseNumberMap1300(state.levels,PROJECT_IDS);
  state.modifiers={...freshModifiers1300(),...normaliseNumberMap1300(state.modifiers,['food','economy','technology','stability','armyPct','navyPct'])};
  state.focus=PROJECT_IDS.includes(state.focus)?state.focus:'balanced';
  state.lastDecisionWeek=Number.isFinite(Number(state.lastDecisionWeek))?Number(state.lastDecisionWeek):-9999;
  state.decisionOffset=Math.max(0,Math.min(3,Math.floor(Number.isFinite(Number(state.decisionOffset))?Number(state.decisionOffset):hashText1300(country)%4)));
  state.lastBudget=state.lastBudget&&typeof state.lastBudget==='object'&&!Array.isArray(state.lastBudget)?state.lastBudget:{income:0,upkeep:0,balance:0};
  state.decisions=Array.isArray(state.decisions)?state.decisions.slice(-12):[];
 }
 return ai;
}
function ensureCountryState1300(ai,country){
 if(!ai.countries[country])ai.countries[country]={
  personality:countryAIPersonality1300(country),
  levels:freshLevels1300(),
  modifiers:freshModifiers1300(),
  focus:'balanced',
  lastDecisionWeek:-9999,
  decisionOffset:hashText1300(country)%4,
  lastBudget:{income:0,upkeep:0,balance:0},
  decisions:[]
 };
 return ai.countries[country];
}
function recordDecision1300(state,week,text){
 state.decisions.unshift({week:Number(week)||0,text:String(text||'')});
 state.decisions=state.decisions.slice(0,12);
}
export function countryAIModifiers1300(game,country){
 if(!game||!country)return freshModifiers1300();
 game.ai=normaliseCountryAI1300(game.ai);
 return ensureCountryState1300(game.ai,country).modifiers;
}
export function applyCountryAIStats1300(game,country,base={}){
 const m=countryAIModifiers1300(game,country);
 return {
  ...base,
  food:round(clamp((Number(base.food)||0)+m.food,0,110)),
  economy:round(clamp((Number(base.economy)||0)+m.economy,0,110)),
  technology:round(clamp((Number(base.technology)||0)+m.technology,0,110)),
  stability:round(clamp((Number(base.stability)||0)+m.stability,0,110)),
  population:Math.max(0,Number(base.population)||0),
  army:Math.max(0,Math.round((Number(base.army)||0)*(1+m.armyPct/100))),
  navy:Math.max(0,Math.round((Number(base.navy)||0)*(1+m.navyPct/100)))
 };
}
function weeklyBudget1300(snapshot){
 const cityCount=Math.max(1,Number(snapshot.cityCount)||1);
 const population=Math.max(0,Number(snapshot.population)||0);
 const economy=Math.max(0,Number(snapshot.economyAvg)||0);
 const army=Math.max(0,Number(snapshot.army)||0);
 const navy=Math.max(0,Number(snapshot.navy)||0);
 const income=.35*cityCount+population/180000+economy/35;
 const upkeep=army*.0011+navy*.018;
 return {income:round(Math.max(.25,income)),upkeep:round(Math.max(0,upkeep)),balance:round(income-upkeep)};
}
function initialTreasury1300(snapshot){
 return round(Math.max(25,40+(Number(snapshot.economyAvg)||50)*1.5+(Number(snapshot.cityCount)||1)*10+(Number(snapshot.population)||0)/25000));
}
function reserveTarget1300(snapshot,budget){
 return round(Math.max(25,20+(Number(snapshot.cityCount)||1)*5+Math.max(0,budget.upkeep)*10));
}
function projectCost1300(snapshot,state,project){
 const population=Math.max(0,Number(snapshot.population)||0),cityCount=Math.max(1,Number(snapshot.cityCount)||1),level=Math.max(0,Number(state.levels[project])||0);
 return round(18+cityCount*3+Math.sqrt(population/1000)*1.4+level*8);
}
function projectScore1300(state,snapshot,project,playerStrength,atWar,week){
 const p=state.personality,food=Number(snapshot.foodAvg)||0,econ=Number(snapshot.economyAvg)||0,tech=Number(snapshot.technologyAvg)||0,stab=Number(snapshot.stabilityAvg)||0,strength=Math.max(1,Number(snapshot.strength)||1),pressure=Math.max(0,Math.min(2,Number(playerStrength)||1)/strength-1);
 let score=0;
 if(project==='agriculture')score=(64-food)*1.15+(1-p.aggression)*5;
 if(project==='commerce')score=(68-econ)*1.05+p.development*10+p.trade*4;
 if(project==='learning')score=(66-tech)*1.05+p.development*8;
 if(project==='administration')score=(62-stab)*1.15+p.caution*10;
 if(project==='military')score=p.aggression*20+p.caution*5+pressure*18+(atWar?42:0);
 if(project==='navy')score=(snapshot.coastal||Number(snapshot.navy)>0)?p.trade*12+p.aggression*8+(atWar?10:0):-999;
 score-=Math.max(0,Number(state.levels[project])||0)*1.8;
 score+=(unitNoise1300(snapshot.country,week*97+PROJECT_IDS.indexOf(project)*13)-.5)*8;
 return score;
}
function chooseProject1300(state,snapshot,playerStrength,atWar,week){
 return PROJECT_IDS.map(project=>({project,score:projectScore1300(state,snapshot,project,playerStrength,atWar,week)})).sort((a,b)=>b.score-a.score)[0]?.project||'commerce';
}
function applyInvestment1300(state,project){
 state.levels[project]=(Number(state.levels[project])||0)+1;
 if(project==='agriculture')state.modifiers.food=clamp(state.modifiers.food+.30,0,12);
 if(project==='commerce')state.modifiers.economy=clamp(state.modifiers.economy+.30,0,12);
 if(project==='learning')state.modifiers.technology=clamp(state.modifiers.technology+.25,0,10);
 if(project==='administration')state.modifiers.stability=clamp(state.modifiers.stability+.25,0,10);
 if(project==='military')state.modifiers.armyPct=clamp(state.modifiers.armyPct+1.5,0,30);
 if(project==='navy')state.modifiers.navyPct=clamp(state.modifiers.navyPct+2,0,35);
 state.focus=project;
}
function managePlayerDiplomacy1300(game,country,state,week){
 const events=[],r=relation(game,country,PLAYER_REALM),view=opinion(r.ours),atWar=!!r.pair.war;
 if(atWar)return events;
 if(view<=-90&&!r.ours.rival&&state.personality.aggression>=.55){
  const result=performAction(game,country,PLAYER_REALM,'rival',{},{});if(result.ok)events.push(country+' now considers your realm a rival.');
 }else if(view>=20&&r.ours.rival){
  const result=performAction(game,country,PLAYER_REALM,'rival',{},{});if(result.ok)events.push(country+' ended its rivalry with your realm.');
 }
 if(view<=-120&&state.personality.aggression>=.72&&unitNoise1300(country,week*191)<.30){
  const result=performAction(game,country,PLAYER_REALM,'insult',{},{});if(result.ok)events.push(country+' sent an insult to your court.');
 }
 if(view>=25&&!r.ours.mission&&state.personality.diplomacy>=.65){
  const result=performAction(game,country,PLAYER_REALM,'improve',{}, {maxDiplomats:2});if(result.ok)events.push(country+' assigned diplomats to improve relations with your realm.');
 }
 return events;
}
export function runCountryAIWeek1300(game,{week=0,countries=[],playerStrength=1}={}){
 if(!game)return [];
 game.ai=normaliseCountryAI1300(game.ai);
 const ai=game.ai,n=Number(week)||0;
 if(ai.lastWeek!==null&&n<=ai.lastWeek)return [];
 ai.lastWeek=n;
 const d=game.diplomacy??={};d.aiTreasuries??={};
 const events=[];
 for(const snapshot of countries){
  const country=String(snapshot?.country||'');if(!country||country===PLAYER_REALM||snapshot.player)continue;
  const state=ensureCountryState1300(ai,country),budget=weeklyBudget1300(snapshot);
  if(!Number.isFinite(Number(d.aiTreasuries[country])))d.aiTreasuries[country]=initialTreasury1300(snapshot);
  d.aiTreasuries[country]=round(Math.max(0,(Number(d.aiTreasuries[country])||0)+budget.balance));
  state.lastBudget=budget;
  const pair=relation(game,country,PLAYER_REALM).pair,atWar=!!pair.war;
  const due=(n-state.decisionOffset)%4===0&&n>state.lastDecisionWeek;
  if(due){
   const project=chooseProject1300(state,snapshot,playerStrength,atWar,n),cost=projectCost1300(snapshot,state,project),reserve=reserveTarget1300(snapshot,budget);
   if(d.aiTreasuries[country]>=cost+reserve){
    d.aiTreasuries[country]=round(d.aiTreasuries[country]-cost);
    applyInvestment1300(state,project);
    state.lastDecisionWeek=n;
    recordDecision1300(state,n,'Invested in '+project+' for '+cost.toFixed(2)+' florins.');
   }else{
    state.lastDecisionWeek=n;
    recordDecision1300(state,n,'Saved treasury reserves instead of starting a new '+project+' investment.');
   }
  }
  if(n%13===0)events.push(...managePlayerDiplomacy1300(game,country,state,n));
 }
 diplomacyState(game);
 return events;
}
export function countryAISummary1300(game,country){
 if(!game||!country)return null;
 game.ai=normaliseCountryAI1300(game.ai);
 const state=ensureCountryState1300(game.ai,country);
 return {country,focus:state.focus,levels:{...state.levels},modifiers:{...state.modifiers},personality:{...state.personality},lastBudget:{...state.lastBudget},decisions:[...state.decisions]};
}
