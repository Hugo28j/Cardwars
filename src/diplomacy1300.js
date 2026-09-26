// Directional relations; treaties are shared by an unordered country pair.
export const PLAYER_REALM = '@player';
export const CASUS_BELLI_1300={
 'no-casus-belli':{id:'no-casus-belli',name:'No Casus Belli',warGoal:'Conquest',aggressiveExpansion:15,reputation:-1,trust:-30},
 'fight-for-independence':{id:'fight-for-independence',name:'Fight for Independence',warGoal:'Secure recognition of the rebel provinces',aggressiveExpansion:0,reputation:0,trust:-10},
 'war-against-rebellion':{id:'war-against-rebellion',name:'War Against Rebellion',warGoal:'Return the rebel provinces',aggressiveExpansion:0,reputation:0,trust:-10}
};
const clamp = (n,a,b)=>Math.max(a,Math.min(b,Number(n)||0));
const round = n=>Math.round(n*100)/100;
const key = (a,b)=>JSON.stringify([a,b].sort());
export function diplomacyState(game){
 const d=game.diplomacy??={};d.network??={pairs:{},reputation:{},lastMonth:null,lastWeek:null};
 d.network.pairs??={};d.network.reputation??={};
 if(!Object.hasOwn(d.network,'lastWeek'))d.network.lastWeek=null;
 return d.network;
}
const direction=()=>({opinion:0,trust:50,favors:0,ae:0,rival:false,guarantee:false,access:false,embargo:false,mission:null,modifiers:[],cooldowns:{}});
export function relation(game,a,b){
 if(!a||!b||a===b)throw new Error('Two different countries are required.');
 const n=diplomacyState(game),k=key(a,b);
 if(!n.pairs[k]){
  const p=n.pairs[k]={countries:[a,b],directions:{[a]:direction(),[b]:direction()},alliance:false,marriage:false,trade:false,truceUntil:0,war:null};
  if(a===PLAYER_REALM||b===PLAYER_REALM){const other=a===PLAYER_REALM?b:a,d=game.diplomacy;
   p.directions[other].opinion=clamp(d.relations?.[other],-200,200);p.alliance=!!d.alliances?.[other];
   if(d.wars?.[other])p.war={started:Number(game.day)||0,attacker:PLAYER_REALM,defender:other};
  }
 }
 const p=n.pairs[k];return {pair:p,ours:p.directions[a],theirs:p.directions[b]};
}
export function opinion(r){return clamp(r.opinion-r.ae+r.modifiers.reduce((s,m)=>s+m.value,0),-200,200);}
function rebelCities(game,origin){return (game?.ownedCities||[]).filter(id=>(game?.originCountryByCity?.[id]===origin)&&game?.independenceByCity?.[id]!==true);}
export function availableCasusBelli1300(game,a,b){
 const out=[];
 if(a===PLAYER_REALM){const cities=rebelCities(game,b);if(cities.length)out.push({...CASUS_BELLI_1300['fight-for-independence'],targetCityIds:cities});}
 if(b===PLAYER_REALM){const cities=rebelCities(game,a);if(cities.length)out.push({...CASUS_BELLI_1300['war-against-rebellion'],targetCityIds:cities});}
 return out;
}
export function activeWarScore1300(game,a,b){const war=relation(game,a,b).pair.war;return war?clamp(war.warScore,-100,100):0;}
export function attitude(r,ratio=1){return r.ae>=50&&opinion(r)<0?'Outraged':r.rival?'Rival':opinion(r)<-50?'Hostile':ratio>1.8&&opinion(r)<50?'Threatened':opinion(r)>=50&&r.trust>=45?'Friendly':'Neutral';}
function memory(r,type,value,day,decay=1){const old=r.modifiers.find(m=>m.type===type);if(old){old.value=clamp(old.value+value,-100,100);old.day=day;}else r.modifiers.push({type,value,day,decay});}
export function relationSlots(game,a){return Object.values(diplomacyState(game).pairs).filter(p=>p.countries.includes(a)&&(p.alliance||p.marriage||p.directions[a].guarantee)).length;}
export function acceptance(game,a,b,action,powers={}){
 const {pair,ours,theirs}=relation(game,a,b),ratio=Math.max(1,powers[a]||1)/Math.max(1,powers[b]||1);
 const baseReluctance=action==='alliance'&&Number.isFinite(Number(powers.__baseReluctance))?Number(powers.__baseReluctance):-35;
 const reasons=[['Base reluctance',baseReluctance],['Their opinion',opinion(theirs)*.25],['Their trust',(theirs.trust-50)*.6]];
 const rankingModifier=Number(powers.__allianceRankingModifier),distanceModifier=Number(powers.__allianceDistanceModifier);
 if(action==='alliance'&&Number.isFinite(rankingModifier))reasons.push(['Ranking power difference',clamp(rankingModifier,-35,35)]);
 else reasons.push(['Relative strength',clamp(Math.log2(ratio)*10,-25,20)]);
 if(action==='alliance'&&Number.isFinite(distanceModifier))reasons.push(['Distance',clamp(distanceModifier,-35,20)]);
 reasons.push(['Your reputation',(diplomacyState(game).reputation[a]||0)*5]);
 if(action==='alliance'){
  reasons.push(['Diplomatic commitments',-Math.max(0,relationSlots(game,b)-3)*20],['Your commitments',-Math.max(0,relationSlots(game,a)-3)*20]);
  const rivals=x=>Object.values(diplomacyState(game).pairs).filter(p=>p.directions[x]?.rival).map(p=>p.countries.find(c=>c!==x));
  if(rivals(a).some(c=>rivals(b).includes(c)))reasons.push(['Common rival',25]);
 }
 if(pair.alliance&&action!=='alliance')reasons.push(['Alliance',30]);
 if(action==='access')reasons.push(['Limited commitment',25]);
 if(action==='trade')reasons.push(['Mutual trade benefit',15]);
 const blocked=pair.war?'At war':ours.rival||theirs.rival?'Rivalry prevents cooperation':action==='alliance'&&pair.truceUntil>(game.day||0)?'Truce still active':null;
 const score=Math.round(reasons.reduce((s,[,v])=>s+v,0));return {score,reasons:reasons.map(([label,v])=>({label,value:round(v)})),accepted:!blocked&&score>=0,blocked};
}

export const DIP_ACTIONS={
 improve:'Improve relations',curry:'Curry favors',gift:'Send gift',alliance:'Offer alliance',breakAlliance:'Break alliance',trust:'Spend 10 favors for trust',rival:'Declare / remove rival',insult:'Send insult',guarantee:'Guarantee / revoke independence',access:'Ask military access',offerAccess:'Offer / revoke military access',trade:'Offer trade agreement',peace:'Offer white peace',war:'Declare war (no casus belli)'
};
export function performAction(game,a,b,action,powers={},options={}){
 if(!DIP_ACTIONS[action])return {ok:false,message:'Unknown action.'};
 const {pair,ours,theirs}=relation(game,a,b),day=Number(game.day)||0;
 const fail=(message,attempted=false)=>({ok:false,message,attempted});
 if((ours.cooldowns[action]||0)>day)return fail(`Available in ${Math.ceil(ours.cooldowns[action]-day)} days.`);
 if(pair.war&&!['peace','insult'].includes(action))return fail('This action is unavailable during war.');
 if(['alliance','access','trade'].includes(action)){
  if(action==='alliance'&&pair.alliance||action==='access'&&ours.access||action==='trade'&&pair.trade)return fail('This treaty is already active.');
  const result=acceptance(game,a,b,action,powers);if(!result.accepted)return fail(result.blocked||`Proposal refused (score ${result.score}; requires 0).`,!result.blocked);
 }
 let customMessage='';
 if(action==='alliance'){pair.alliance=true;memory(theirs,'Alliance signed',15,day,.25);}
 if(action==='breakAlliance'){
  if(!pair.alliance)return fail('No alliance to end.');pair.alliance=false;theirs.trust=clamp(theirs.trust-15,0,100);memory(theirs,'Broke alliance',-40,day,.5);pair.truceUntil=Math.max(pair.truceUntil,day+365);
 }
 if(action==='improve'||action==='curry'){
  if(action==='curry'&&!pair.alliance)return fail('An alliance is required to curry favors.');
  const missions=Object.values(diplomacyState(game).pairs).filter(p=>p.directions[a]?.mission).length;
  const mission=action==='improve'?'improve':'curry';
  if(ours.mission===mission){ours.mission=null;customMessage=`${DIP_ACTIONS[action]}: envoy recalled.`;}
  else {const maxDiplomats=clamp(Math.floor(Number(options.maxDiplomats)||2),2,5);if(!ours.mission&&missions>=maxDiplomats)return fail(`All ${maxDiplomats} diplomats are busy. Recall one first.`);ours.mission=mission;customMessage=`${DIP_ACTIONS[action]}: diplomat assigned.`;}
 }
 if(action==='gift'){
  const amount=round(clamp(Number(options.amount)||5,1,100000));
  const balance=a===PLAYER_REALM?game.florins:game.diplomacy.aiTreasuries?.[a];
  if(!Number.isFinite(balance)||balance<amount)return fail('Not enough Florins.');
  if(a===PLAYER_REALM)game.florins=round(balance-amount);else game.diplomacy.aiTreasuries[a]=round(balance-amount);
  game.diplomacy.aiTreasuries??={};if(b===PLAYER_REALM)game.florins=round(game.florins+amount);else game.diplomacy.aiTreasuries[b]=round((game.diplomacy.aiTreasuries[b]||0)+amount);
  const opinionGain=clamp(Math.round(amount*3),1,60);memory(theirs,'Received gifts',opinionGain,day,1);ours.cooldowns.gift=day+90;customMessage=`Sent a gift of ƒ${amount.toFixed(2)}.`;
 }
 if(action==='trust'){if(!pair.alliance||ours.favors<10)return fail('Requires an alliance and 10 favors.');if(theirs.trust>=100)return fail('Trust is already at its maximum.');ours.favors=round(ours.favors-10);theirs.trust=clamp(theirs.trust+5,0,100);}
 if(action==='rival'){
  if(!ours.rival){if(pair.alliance)return fail('End the alliance first.');const count=Object.values(diplomacyState(game).pairs).filter(p=>p.directions[a]?.rival).length;if(count>=3)return fail('Maximum three rivals.');}
  ours.rival=!ours.rival;memory(theirs,'Declared rivalry',ours.rival?-40:20,day,.25);ours.cooldowns.rival=day+365;
 }
 if(action==='insult'){memory(theirs,'Insulted us',-50,day,1);theirs.trust=clamp(theirs.trust-10,0,100);ours.cooldowns.insult=day+90;}
 if(action==='guarantee')ours.guarantee=!ours.guarantee;
 if(action==='access')ours.access=true;
 if(action==='offerAccess')theirs.access=!theirs.access;
 if(action==='trade'){pair.trade=true;}
 if(action==='war'){
  if(pair.truceUntil>day)return fail(`Truce: ${pair.truceUntil-day} days remaining.`);
  if(pair.alliance)return fail('End the alliance first.');
  const requested=String(options.casusBelli||'no-casus-belli'),cb=CASUS_BELLI_1300[requested]||CASUS_BELLI_1300['no-casus-belli'],valid=cb.id==='no-casus-belli'?cb:availableCasusBelli1300(game,a,b).find(x=>x.id===cb.id);
  if(!valid)return fail('That casus belli is no longer valid.');
  const targetCityIds=[...(valid.targetCityIds||[])];
  pair.war={started:day,attacker:a,defender:b,casusBelli:cb.id,casusBelliName:cb.name,warGoal:cb.warGoal,targetCityIds,warScore:0,lastWarScoreWeek:null};pair.trade=false;ours.access=theirs.access=false;ours.mission=theirs.mission=null;
  memory(theirs,'Declared war',-100,day,.25);theirs.trust=clamp(theirs.trust+cb.trust,0,100);
  diplomacyState(game).reputation[a]=clamp((diplomacyState(game).reputation[a]||0)+cb.reputation,-5,5);
  if(cb.aggressiveExpansion)for(const p of Object.values(diplomacyState(game).pairs)){if(p.directions[a]){const other=p.countries.find(c=>c!==a);p.directions[other].ae=clamp(p.directions[other].ae+cb.aggressiveExpansion,0,200);}}
  customMessage=`Declared ${cb.name} against ${b}.`;
 }
 if(action==='peace'){
  if(!pair.war)return fail('You are not at war.');
  if(day-pair.war.started<180)return fail('White peace becomes available after 180 days of war.');
  pair.war=null;pair.truceUntil=day+365*5;memory(theirs,'Peace agreed',10,day,.25);
 }
 syncLegacy(game);return {ok:true,message:customMessage||`${DIP_ACTIONS[action]}: completed.`};
}
export function syncLegacy(game){
 const d=game.diplomacy;d.relations??={};d.alliances??={};d.wars??={};
 for(const p of Object.values(diplomacyState(game).pairs)){if(!p.countries.includes(PLAYER_REALM))continue;const b=p.countries.find(c=>c!==PLAYER_REALM);d.relations[b]=opinion(p.directions[b]);d.alliances[b]=p.alliance;d.wars[b]=!!p.war;}
}
export function weeklyDiplomacy(game,week,powers={}){
 const n=diplomacyState(game);if(n.lastWeek!==null&&week<=n.lastWeek)return [];
 n.lastWeek=week;const events=[];
 for(const p of Object.values(n.pairs))for(const a of p.countries){
  const b=p.countries.find(c=>c!==a),r=p.directions[a],other=p.directions[b];
  r.ae=round(Math.max(0,r.ae-.2));
  r.modifiers=r.modifiers.map(m=>({...m,value:round(Math.sign(m.value)*Math.max(0,Math.abs(m.value)-m.decay))})).filter(m=>m.value);
  if(!p.war&&r.mission==='improve') {const m=other.modifiers.find(m=>m.type==='Improved relations');if((m?.value||0)<100)memory(other,'Improved relations',Math.min(3,100-(m?.value||0)),game.day,.5);}
 if(p.alliance){r.favors=round(clamp(r.favors+.2+(r.mission==='curry'?.8:0),0,100));r.trust=round(clamp(r.trust+.05,0,100));}
 }
 for(const p of Object.values(n.pairs))if(p.war&&p.war.lastWarScoreWeek!==week){
  const w=p.war;w.lastWarScoreWeek=week;
  if(w.casusBelli==='fight-for-independence'){
   const held=(w.targetCityIds||[]).filter(id=>game?.ownedCities?.includes(id)).length,total=Math.max(1,(w.targetCityIds||[]).length),tick=held===total?.5:held/total-.5;
   w.warScore=round(clamp((Number(w.warScore)||0)+tick,-100,100));
  }else if(w.casusBelli==='war-against-rebellion'){
   const rebelHeld=(w.targetCityIds||[]).filter(id=>game?.ownedCities?.includes(id)).length,total=Math.max(1,(w.targetCityIds||[]).length),tick=rebelHeld===0?.5:.5-rebelHeld/total;
   w.warScore=round(clamp((Number(w.warScore)||0)+tick,-100,100));
  }
 }
 // AI agreements between countries are evaluated every 13 weeks, always on a Monday tick.
 if(week%13===0)for(const p of Object.values(n.pairs)){
  const [a,b]=p.countries;if(a===PLAYER_REALM||b===PLAYER_REALM||p.war)continue;
  if(!p.alliance&&acceptance(game,a,b,'alliance',powers).accepted&&acceptance(game,b,a,'alliance',powers).accepted){p.alliance=true;events.push(`${a} and ${b} formed an alliance.`);}
 }
 syncLegacy(game);return events;
}
// Backward-compatible alias for older imports/tests; cadence is weekly.
export const monthlyDiplomacy=weeklyDiplomacy;
