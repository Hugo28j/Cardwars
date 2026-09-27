import crypto from 'node:crypto';
import {CITY_1300} from '../src/data1300.js';
import {startingBuildingLevel1300} from '../src/buildings1300.js';

const clamp=(n,a,b)=>Math.max(a,Math.min(b,Number(n)||0));
const round2=n=>Math.round((Number(n)||0)*100)/100;
const pairKey=(a,b)=>[String(a),String(b)].sort().join('|');
const cityName=id=>CITY_1300[id]?.name||id;
const addEvent=(state,text,day)=>{state.events=Array.isArray(state.events)?state.events:[];state.events.unshift({day:Math.max(0,Math.floor(Number(day)||0)),text:String(text||'').slice(0,220)});state.events=state.events.slice(0,20);};
const km=(a,b)=>{const rad=x=>x*Math.PI/180,lat1=rad(Number(a?.lat)||0),lat2=rad(Number(b?.lat)||0),dLat=lat2-lat1,dLon=rad((Number(b?.lon)||0)-(Number(a?.lon)||0)),h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));};
const travelDays=(a,b)=>Math.max(3,Math.min(10,Math.round(3+km(a,b)/300)));
const averageTech=state=>{const ids=state?.ownedCities||[];if(!ids.length)return 50;return ids.reduce((n,id)=>n+(Number(CITY_1300[id]?.technology)||50),0)/ids.length;};

export function ensurePvPRuntime(c){
 if(!c)return c;c.wars=c.wars&&typeof c.wars==='object'&&!Array.isArray(c.wars)?c.wars:{};c.truces=c.truces&&typeof c.truces==='object'&&!Array.isArray(c.truces)?c.truces:{};c.battles=Array.isArray(c.battles)?c.battles:[];c.sieges=Array.isArray(c.sieges)?c.sieges:[];c.occupations=c.occupations&&typeof c.occupations==='object'&&!Array.isArray(c.occupations)?c.occupations:{};c.peaceOffers=Array.isArray(c.peaceOffers)?c.peaceOffers:[];c.nextBattleId=Math.max(1,Math.floor(Number(c.nextBattleId)||1));c.nextSiegeId=Math.max(1,Math.floor(Number(c.nextSiegeId)||1));c.nextPeaceOfferId=Math.max(1,Math.floor(Number(c.nextPeaceOfferId)||1));
 for(const state of Object.values(c.playerStates||{})){
  state.fieldArmies=state.fieldArmies&&typeof state.fieldArmies==='object'&&!Array.isArray(state.fieldArmies)?state.fieldArmies:{};state.populationByCity=state.populationByCity&&typeof state.populationByCity==='object'&&!Array.isArray(state.populationByCity)?state.populationByCity:{};
  for(const id of state.ownedCities||[])if(!Number.isFinite(Number(state.populationByCity[id])))state.populationByCity[id]=Math.max(1,Math.round(Number(CITY_1300[id]?.people)||1));
  for(const [id,row] of Object.entries({...state.fieldArmies})){if(!CITY_1300[id]||!row||Math.max(0,Number(row.count)||0)<=0){delete state.fieldArmies[id];continue;}row.count=Math.max(0,Math.floor(Number(row.count)||0));row.morale=clamp(Number.isFinite(Number(row.morale))?Number(row.morale):100,0,100);row.originCityId=CITY_1300[row.originCityId]?row.originCityId:(state.ownedCities||[])[0]||id;}
 }
 c.battles=c.battles.filter(b=>b&&CITY_1300[b.cityId]&&['active','attacker_won','defender_won','retreated'].includes(b.status||'active')).slice(-50);
 c.sieges=c.sieges.filter(s=>s&&CITY_1300[s.cityId]&&['active','won','lifted'].includes(s.status||'active')).slice(-60);
 return c;
}
export function activePvPWar(c,a,b){ensurePvPRuntime(c);const w=c?.wars?.[pairKey(a,b)];return w?.status==='active'?w:null;}
export function pvpPairKey(a,b){return pairKey(a,b);}

function playerState(c,id){return c?.playerStates?.[id]||null;}
function activeBattleAt(c,cityId){return (c.battles||[]).find(b=>b.cityId===cityId&&b.status==='active')||null;}
function activeSiegeAt(c,cityId){return (c.sieges||[]).find(s=>s.cityId===cityId&&s.status==='active')||null;}
function field(c,playerId,cityId){return playerState(c,playerId)?.fieldArmies?.[cityId]||null;}
function mergeField(c,playerId,cityId,count,originCityId,morale=100){
 const state=playerState(c,playerId);if(!state||count<=0)return null;const old=state.fieldArmies[cityId];if(old){old.count+=count;old.morale=clamp(Math.max(Number(old.morale)||0,morale),0,100);return old;}return state.fieldArmies[cityId]={count:Math.max(0,Math.floor(count)),morale:clamp(morale,0,100),originCityId:CITY_1300[originCityId]?originCityId:(state.ownedCities||[])[0]||cityId};
}
function nearestOwn(state,fromId,exclude=fromId){const from=CITY_1300[fromId],ids=(state?.ownedCities||[]).filter(id=>id!==exclude&&CITY_1300[id]);if(!ids.length)return null;return ids.map(id=>({id,d:km(from,CITY_1300[id])})).sort((a,b)=>a.d-b.d)[0]?.id||null;}
function retreatCount(c,playerId,count,fromId,day){
 const state=playerState(c,playerId),dest=nearestOwn(state,fromId);if(!state||count<=0)return null;if(!dest){addEvent(state,count+' soldiers surrendered because no friendly retreat province was available.',day);return null;}state.armyByCity[dest]??={army:0,navy:0};state.armyByCity[dest].army=Math.max(0,Number(state.armyByCity[dest].army)||0)+count;addEvent(state,count+' soldiers retreated to '+cityName(dest)+'.',day);return dest;
}
function applyPopulationLoss(c,playerId,originId,loss){
 const state=playerState(c,playerId);if(!state||loss<=0)return;const id=CITY_1300[originId]?originId:(state.ownedCities||[])[0];if(!id)return;const base=Number(state.populationByCity[id]??CITY_1300[id]?.people)||1;state.populationByCity[id]=Math.max(1,Math.round(base-loss));
}
function adjustWarScore(c,winnerId,opponentId,points){
 if(!points)return;const w=activePvPWar(c,winnerId,opponentId);if(!w)return;w.score=clamp((Number(w.score)||0)+(winnerId===w.attackerId?points:-points),-100,100);
}
function startSiege(c,attackerId,defenderId,cityId,day){
 if(!activePvPWar(c,attackerId,defenderId)||c.cityOwners?.[cityId]!==defenderId||c.occupations?.[cityId]===attackerId)return null;let s=(c.sieges||[]).find(x=>x.status==='active'&&x.cityId===cityId&&x.attackerId===attackerId);if(s)return s;
 s={id:'mp-siege-'+c.nextSiegeId++,cityId,attackerId,defenderId,startedDay:day,lastTickDay:day,progress:0,foodPct:100,unrestPct:10,status:'active',log:[]};c.sieges.push(s);addEvent(playerState(c,attackerId),'Siege of '+cityName(cityId)+' began.',day);addEvent(playerState(c,defenderId),cityName(cityId)+' is under siege.',day);return s;
}
function battleLog(b,text){b.log=Array.isArray(b.log)?b.log:[];b.log.unshift(String(text).slice(0,180));b.log=b.log.slice(0,14);}
function startBattle(c,{cityId,attackerId,defenderId,attackerCount,defenderCount,attackerOriginCityId,defenderOriginCityId,day}){
 let existing=activeBattleAt(c,cityId);if(existing){
  if(existing.attackerId===attackerId){existing.attackerCount+=attackerCount;battleLog(existing,attackerCount+' attacker reinforcements arrived.');return existing;}
  if(existing.defenderId===attackerId){existing.defenderCount+=attackerCount;battleLog(existing,attackerCount+' defender reinforcements arrived.');return existing;}
  retreatCount(c,attackerId,attackerCount,cityId,day);return existing;
 }
 const b={id:'mp-battle-'+c.nextBattleId++,cityId,attackerId,defenderId,attackerCount:Math.max(0,Math.floor(attackerCount)),defenderCount:Math.max(0,Math.floor(defenderCount)),attackerMorale:100,defenderMorale:100,attackerOriginCityId,defenderOriginCityId,startedDay:day,lastResolvedDay:day,status:'active',winnerId:null,log:[]};battleLog(b,'Battle started: '+b.attackerCount+' vs '+b.defenderCount+'.');c.battles.push(b);addEvent(playerState(c,attackerId),'Battle started at '+cityName(cityId)+'.',day);addEvent(playerState(c,defenderId),'Battle started at '+cityName(cityId)+'.',day);return b;
}
function placeWinner(c,b,winnerId,count,day){
 if(count<=0)return;const cityId=b.cityId,owner=c.cityOwners?.[cityId],state=playerState(c,winnerId);if(!state)return;
 if(owner===winnerId){state.armyByCity[cityId]??={army:0,navy:0};state.armyByCity[cityId].army=Math.max(0,Number(state.armyByCity[cityId].army)||0)+count;if(c.occupations?.[cityId]&&c.occupations[cityId]!==winnerId)delete c.occupations[cityId];for(const s of c.sieges||[])if(s.cityId===cityId&&s.status==='active'&&s.attackerId!==winnerId)s.status='lifted';}
 else{mergeField(c,winnerId,cityId,count,b[winnerId===b.attackerId?'attackerOriginCityId':'defenderOriginCityId'],Math.max(25,winnerId===b.attackerId?b.attackerMorale:b.defenderMorale));if(owner&&activePvPWar(c,winnerId,owner)&&c.occupations?.[cityId]!==winnerId)startSiege(c,winnerId,owner,cityId,day);}
}
function finishBattle(c,b,winnerId,reason,day,forcedRetreatId=null){
 if(!b||b.status!=='active')return false;const loserId=winnerId===b.attackerId?b.defenderId:b.attackerId,winnerCount=winnerId===b.attackerId?b.attackerCount:b.defenderCount,loserCount=winnerId===b.attackerId?b.defenderCount:b.attackerCount;
 const retreat=loserCount>0?retreatCount(c,loserId,loserCount,b.cityId,day):null;placeWinner(c,b,winnerId,winnerCount,day);b.status=winnerId===b.attackerId?'attacker_won':'defender_won';if(reason==='retreat')b.status='retreated';b.winnerId=winnerId;b.endedDay=day;b.reason=reason;b.retreatCityId=retreat||forcedRetreatId||null;battleLog(b,(playerState(c,winnerId)?.name||'Winner')+' won; '+(retreat?'enemy retreated to '+cityName(retreat):'enemy force surrendered/wiped')+'.');adjustWarScore(c,winnerId,loserId,5);addEvent(playerState(c,winnerId),'Victory at '+cityName(b.cityId)+'.',day);addEvent(playerState(c,loserId),'Defeat at '+cityName(b.cityId)+'.',day);return true;
}
function resolveBattleDay(c,b,day){
 if(!b||b.status!=='active'||Number(b.lastResolvedDay)>=day)return false;let a=Math.max(0,Math.floor(Number(b.attackerCount)||0)),d=Math.max(0,Math.floor(Number(b.defenderCount)||0));if(!a||!d){return finishBattle(c,b,a?b.attackerId:b.defenderId,'destroyed',day);}
 const cityOwner=c.cityOwners?.[b.cityId],rollA=crypto.randomInt(1,11),rollD=crypto.randomInt(1,11),techA=clamp(1+(averageTech(playerState(c,b.attackerId))-50)*.003,.85,1.15),techD=clamp(1+(averageTech(playerState(c,b.defenderId))-50)*.003,.85,1.15),aBonus=cityOwner===b.attackerId?1.15:1,dBonus=cityOwner===b.defenderId?1.15:1,aPower=a*techA*aBonus*(.9+rollA*.03),dPower=d*techD*dBonus*(.9+rollD*.03),lossA=Math.min(a,Math.max(1,Math.round(a*.012*clamp(dPower/Math.max(1,aPower),.45,3)*(.9+rollD*.035)))),lossD=Math.min(d,Math.max(1,Math.round(d*.012*clamp(aPower/Math.max(1,dPower),.45,3)*(.9+rollA*.035))));
 b.attackerCount=a-lossA;b.defenderCount=d-lossD;applyPopulationLoss(c,b.attackerId,b.attackerOriginCityId,lossA);applyPopulationLoss(c,b.defenderId,b.defenderOriginCityId,lossD);b.attackerMorale=clamp((Number(b.attackerMorale)||100)-(4+lossA/a*90+Math.max(0,dPower/aPower-1)*3),0,100);b.defenderMorale=clamp((Number(b.defenderMorale)||100)-(4+lossD/d*90+Math.max(0,aPower/dPower-1)*3),0,100);b.lastResolvedDay=day;battleLog(b,'Day '+day+': rolls '+rollA+'–'+rollD+', casualties '+lossA+'–'+lossD+', morale '+Math.round(b.attackerMorale)+'–'+Math.round(b.defenderMorale)+'.');
 if(b.attackerCount<=0||b.attackerMorale<=0)return finishBattle(c,b,b.defenderId,b.attackerMorale<=0?'morale':'destroyed',day);
 if(b.defenderCount<=0||b.defenderMorale<=0)return finishBattle(c,b,b.attackerId,b.defenderMorale<=0?'morale':'destroyed',day);
 return true;
}
function enemyFieldAt(c,playerId,cityId){for(const [id,state] of Object.entries(c.playerStates||{})){if(id===playerId||!activePvPWar(c,playerId,id))continue;const row=state.fieldArmies?.[cityId];if(row&&Number(row.count)>0)return {id,state,row};}return null;}
function bounceHome(c,state,count,fromId,day,reason){const dest=nearestOwn(state,fromId,null);if(dest){state.armyByCity[dest]??={army:0,navy:0};state.armyByCity[dest].army+=count;addEvent(state,reason+' Army returned to '+cityName(dest)+'.',day);}else addEvent(state,reason+' '+count+' soldiers were lost with no friendly province available.',day);}
function resolveArrival(c,state,m,day){
 const count=Math.max(0,Math.floor(Number(m.count)||0));if(!count)return false;const to=m.to,owner=c.cityOwners?.[to];if(!CITY_1300[to]||!owner){bounceHome(c,state,count,m.from,day,'Invalid destination.');return true;}
 const existingBattle=activeBattleAt(c,to);if(existingBattle&&[existingBattle.attackerId,existingBattle.defenderId].includes(state.id)){if(existingBattle.attackerId===state.id)existingBattle.attackerCount+=count;else existingBattle.defenderCount+=count;battleLog(existingBattle,count+' reinforcements arrived for '+state.name+'.');return true;}
 const foreign=enemyFieldAt(c,state.id,to);if(foreign){const defCount=foreign.row.count;delete foreign.state.fieldArmies[to];startBattle(c,{cityId:to,attackerId:state.id,defenderId:foreign.id,attackerCount:count,defenderCount:defCount,attackerOriginCityId:m.originCityId||m.from,defenderOriginCityId:foreign.row.originCityId||to,day});return true;}
 if(owner===state.id){state.armyByCity[to]??={army:0,navy:0};state.armyByCity[to].army+=count;if(c.occupations?.[to]===state.id)delete c.occupations[to];return true;}
 if(!activePvPWar(c,state.id,owner)){bounceHome(c,state,count,m.from,day,'War ended before arrival.');return true;}
 const def=playerState(c,owner),garrison=Math.max(0,Number(def?.armyByCity?.[to]?.army)||0);if(garrison>0){def.armyByCity[to].army=0;startBattle(c,{cityId:to,attackerId:state.id,defenderId:owner,attackerCount:count,defenderCount:garrison,attackerOriginCityId:m.originCityId||m.from,defenderOriginCityId:to,day});}
 else{mergeField(c,state.id,to,count,m.originCityId||m.from,100);startSiege(c,state.id,owner,to,day);}return true;
}
function processSieges(c,day){
 let changed=false;for(const s of c.sieges||[]){if(s.status!=='active')continue;if(activeBattleAt(c,s.cityId))continue;const attacker=playerState(c,s.attackerId),defender=playerState(c,s.defenderId),fieldArmy=attacker?.fieldArmies?.[s.cityId],owner=c.cityOwners?.[s.cityId];if(!fieldArmy||fieldArmy.count<=0||owner!==s.defenderId||!activePvPWar(c,s.attackerId,s.defenderId)){s.status='lifted';changed=true;continue;}
  const freshGarrison=Math.max(0,Number(defender?.armyByCity?.[s.cityId]?.army)||0);if(freshGarrison>0){const attackers=fieldArmy.count,origin=fieldArmy.originCityId;delete attacker.fieldArmies[s.cityId];defender.armyByCity[s.cityId].army=0;startBattle(c,{cityId:s.cityId,attackerId:s.attackerId,defenderId:s.defenderId,attackerCount:attackers,defenderCount:freshGarrison,attackerOriginCityId:origin,defenderOriginCityId:s.cityId,day});changed=true;continue;}
  while(day-Number(s.lastTickDay)>=7&&s.status==='active'){s.lastTickDay+=7;const army=Math.max(1,Number(fieldArmy.count)||1),walls=startingBuildingLevel1300(CITY_1300[s.cityId],'walls')+(Number(defender?.buildings?.[s.cityId]?.walls)||0),roll=crypto.randomInt(1,11),armyFactor=Math.min(12,Math.log10(army+1)*4),gain=clamp(Math.round(7+armyFactor+roll*1.2-walls*3),4,26),foodLoss=clamp(Math.round(7+armyFactor*.5+roll*.5),5,20);s.progress=clamp((Number(s.progress)||0)+gain,0,100);s.foodPct=clamp((Number(s.foodPct)||100)-foodLoss,0,100);s.unrestPct=clamp((Number(s.unrestPct)||10)+Math.max(2,Math.round(gain/3)),0,100);s.log=Array.isArray(s.log)?s.log:[];s.log.unshift('Week '+Math.ceil((s.lastTickDay-s.startedDay)/7)+': roll '+roll+', progress +'+gain+'%, food -'+foodLoss+'%.');s.log=s.log.slice(0,12);changed=true;if(s.progress>=100||s.foodPct<=0){s.status='won';s.endedDay=day;c.occupations[s.cityId]=s.attackerId;adjustWarScore(c,s.attackerId,s.defenderId,10);addEvent(attacker,cityName(s.cityId)+' is now occupied after a successful siege.',day);addEvent(defender,cityName(s.cityId)+' has fallen under enemy occupation.',day);break;}}
 }return changed;
}
function processBattles(c,day){let changed=false;for(const b of c.battles||[])if(b.status==='active'&&resolveBattleDay(c,b,day))changed=true;return changed;}

export function processPvPDay(c,day){
 ensurePvPRuntime(c);let changed=false;
 for(const state of Object.values(c.playerStates||{})){const arrivals=(state.movements||[]).filter(m=>day>=Number(m.finishDay));if(arrivals.length){for(const m of arrivals)resolveArrival(c,state,m,day);state.movements=state.movements.filter(m=>day<Number(m.finishDay));changed=true;}}
 if(processBattles(c,day))changed=true;if(processSieges(c,day))changed=true;return changed;
}

export function startPvPMovement(c,clientId,payload,day){
 ensurePvPRuntime(c);const state=playerState(c,clientId);if(!state)throw new Error('Player realm not found.');const from=String(payload.from||''),to=String(payload.to||''),amount=Math.max(1,Math.min(1000000,Math.floor(Number(payload.amount)||0)));if(from===to)throw new Error('Choose a different destination.');if(activeBattleAt(c,from)&&[activeBattleAt(c,from).attackerId,activeBattleAt(c,from).defenderId].includes(clientId))throw new Error('This army is currently in battle.');
 let sourceType='city',source=state.armyByCity?.[from],available=Math.max(0,Number(source?.army)||0);if(!state.ownedCities?.includes(from)){sourceType='field';source=state.fieldArmies?.[from];available=Math.max(0,Number(source?.count)||0);}if(!source||amount>available)throw new Error('Not enough soldiers at '+cityName(from)+'.');const targetOwner=c.cityOwners?.[to];if(!targetOwner)throw new Error('Multiplayer armies can currently target human-controlled provinces only.');if(targetOwner!==clientId&&!activePvPWar(c,clientId,targetOwner))throw new Error('Declare war on that player before invading their province.');
 if(sourceType==='city')source.army-=amount;else{source.count-=amount;if(source.count<=0){delete state.fieldArmies[from];for(const s of c.sieges||[])if(s.cityId===from&&s.attackerId===clientId&&s.status==='active')s.status='lifted';if(c.occupations?.[from]===clientId)delete c.occupations[from];}}
 const days=travelDays(CITY_1300[from],CITY_1300[to]),m={id:'mp-move-'+state.nextMovementId++,from,to,count:amount,startDay:day,visualStartDay:day,finishDay:day+days,route:[from,to],routeIndex:0,name:'Army of '+cityName(from),originCityId:source.originCityId||from,sourceType};state.movements.push(m);addEvent(state,amount+' soldiers began marching from '+cityName(from)+' to '+cityName(to)+'.',day);return {message:amount+' soldiers are marching to '+cityName(to)+'. Arrival in '+days+' game-days.'};
}

function transferCity(c,fromId,toId,cityId,day){
 const from=playerState(c,fromId),to=playerState(c,toId);if(!from||!to||c.cityOwners?.[cityId]!==fromId||from.ownedCities.length<=1)return false;const fallback=nearestOwn(from,cityId),garrison=from.armyByCity?.[cityId],mods=from.buildings?.[cityId]||{},pop=Number(from.populationByCity?.[cityId]??CITY_1300[cityId]?.people)||1;if(fallback&&garrison){from.armyByCity[fallback]??={army:0,navy:0};from.armyByCity[fallback].army+=Math.max(0,Number(garrison.army)||0);from.armyByCity[fallback].navy+=Math.max(0,Number(garrison.navy)||0);}
 from.ownedCities=from.ownedCities.filter(id=>id!==cityId);delete from.armyByCity[cityId];delete from.buildings[cityId];delete from.populationByCity[cityId];delete from.trainedUnitsByCity?.[cityId];from.trainingQueues=(from.trainingQueues||[]).filter(q=>q.cityId!==cityId);from.construction=(from.construction||[]).filter(j=>j.cityId!==cityId);from.movements=(from.movements||[]).filter(m=>m.from!==cityId);
 if(!to.ownedCities.includes(cityId))to.ownedCities.push(cityId);const occupying=to.fieldArmies?.[cityId],occupyingCount=Math.max(0,Number(occupying?.count)||0);delete to.fieldArmies?.[cityId];to.armyByCity[cityId]={army:occupyingCount,navy:0};to.buildings[cityId]={...mods};to.populationByCity[cityId]=pop;to.trainedUnitsByCity[cityId]??={};to.originCountryByCity[cityId]??=from.originCountryByCity?.[cityId]||CITY_1300[cityId]?.country;c.cityOwners[cityId]=toId;delete c.occupations[cityId];addEvent(from,cityName(cityId)+' was ceded in a peace treaty.',day);addEvent(to,cityName(cityId)+' was received in a peace treaty.',day);return true;
}
function endWar(c,w,day){
 w.status='ended';w.endedDay=day;c.truces[pairKey(w.attackerId,w.defenderId)]=day+365*5;for(const b of c.battles||[])if(b.status==='active'&&[b.attackerId,b.defenderId].every(id=>[w.attackerId,w.defenderId].includes(id)))b.status='retreated';for(const s of c.sieges||[])if(s.status==='active'&&[s.attackerId,s.defenderId].every(id=>[w.attackerId,w.defenderId].includes(id)))s.status='lifted';
 for(const pid of [w.attackerId,w.defenderId]){const state=playerState(c,pid),other=pid===w.attackerId?w.defenderId:w.attackerId;if(!state)continue;for(const [cityId,row] of Object.entries({...state.fieldArmies})){if(c.cityOwners?.[cityId]===other){delete state.fieldArmies[cityId];retreatCount(c,pid,row.count,cityId,day);}}const cancelled=(state.movements||[]).filter(m=>c.cityOwners?.[m.to]===other);for(const m of cancelled)retreatCount(c,pid,m.count,m.from,day);state.movements=(state.movements||[]).filter(m=>c.cityOwners?.[m.to]!==other);}
 for(const [cityId,occupier] of Object.entries({...c.occupations}))if([w.attackerId,w.defenderId].includes(occupier)&&[w.attackerId,w.defenderId].includes(c.cityOwners?.[cityId]))delete c.occupations[cityId];c.peaceOffers=(c.peaceOffers||[]).filter(o=>pairKey(o.fromId,o.toId)!==pairKey(w.attackerId,w.defenderId));
}

export function handlePvPCommand(c,clientId,action,payload,day){
 ensurePvPRuntime(c);const state=playerState(c,clientId);if(!state)return null;
 if(action==='declare_war'){const targetId=String(payload.targetId||''),target=playerState(c,targetId);if(!target||targetId===clientId)throw new Error('Choose another human player.');if(activePvPWar(c,clientId,targetId))throw new Error('You are already at war.');const key=pairKey(clientId,targetId),truce=Math.max(0,Number(c.truces[key])||0);if(day<truce)throw new Error('The truce lasts another '+Math.ceil(truce-day)+' game-days.');c.wars[key]={id:'mp-war-'+key+'-'+day,attackerId:clientId,defenderId:targetId,startedDay:day,status:'active',score:0};addEvent(state,'War declared on '+target.name+'.',day);addEvent(target,state.name+' declared war on you.',day);return {message:'War declared on '+target.name+'.'};
 }
 if(action==='retreat_battle'){const id=String(payload.battleId||''),b=(c.battles||[]).find(x=>x.id===id&&x.status==='active');if(!b||![b.attackerId,b.defenderId].includes(clientId))throw new Error('Active battle not found.');const winner=clientId===b.attackerId?b.defenderId:b.attackerId;finishBattle(c,b,winner,'retreat',day);return {message:'Your army retreated from '+cityName(b.cityId)+'.'};}
 if(action==='offer_peace'){const targetId=String(payload.targetId||''),w=activePvPWar(c,clientId,targetId);if(!w)throw new Error('You are not at war with that player.');const target=playerState(c,targetId),demandCities=[...new Set(Array.isArray(payload.demandCityIds)?payload.demandCityIds:[])].filter(id=>c.cityOwners?.[id]===targetId&&c.occupations?.[id]===clientId),offerCities=[...new Set(Array.isArray(payload.offerCityIds)?payload.offerCityIds:[])].filter(id=>c.cityOwners?.[id]===clientId),demandFlorins=round2(Math.max(0,Number(payload.demandFlorins)||0)),offerFlorins=round2(Math.max(0,Number(payload.offerFlorins)||0));if(state.ownedCities.length-offerCities.length+demandCities.length<1||target.ownedCities.length-demandCities.length+offerCities.length<1)throw new Error('Peace terms cannot leave either player with zero provinces.');if(offerFlorins>Number(state.florins))throw new Error('You do not have enough Florins for that offer.');if(demandFlorins>Number(target.florins))throw new Error('The other player does not currently have that many Florins.');c.peaceOffers=c.peaceOffers.filter(o=>!(o.status==='pending'&&o.fromId===clientId&&o.toId===targetId));const offer={id:'mp-peace-'+c.nextPeaceOfferId++,fromId:clientId,toId:targetId,warKey:pairKey(clientId,targetId),createdDay:day,status:'pending',demandCityIds:demandCities,offerCityIds:offerCities,demandFlorins,offerFlorins};c.peaceOffers.push(offer);addEvent(target,state.name+' sent you a peace treaty.',day);return {message:'Peace terms sent to '+target.name+'.'};}
 if(action==='respond_peace'){const offer=(c.peaceOffers||[]).find(o=>o.id===String(payload.offerId||'')&&o.toId===clientId&&o.status==='pending');if(!offer)throw new Error('That peace offer is no longer available.');const proposer=playerState(c,offer.fromId),recipient=state,w=activePvPWar(c,offer.fromId,clientId);if(!w){offer.status='expired';throw new Error('The war has already ended.');}if(!payload.accept){offer.status='rejected';addEvent(proposer,recipient.name+' rejected your peace terms.',day);return {message:'Peace offer rejected.'};}
  const demand=offer.demandCityIds.filter(id=>c.cityOwners?.[id]===clientId&&c.occupations?.[id]===offer.fromId),give=offer.offerCityIds.filter(id=>c.cityOwners?.[id]===offer.fromId);if(proposer.ownedCities.length-give.length+demand.length<1||recipient.ownedCities.length-demand.length+give.length<1)throw new Error('Those terms would now leave a player with zero provinces.');if(Number(proposer.florins)<offer.offerFlorins||Number(recipient.florins)<offer.demandFlorins)throw new Error('One side no longer has the promised Florins.');
  for(const id of demand)transferCity(c,clientId,offer.fromId,id,day);for(const id of give)transferCity(c,offer.fromId,clientId,id,day);proposer.florins=round2(Number(proposer.florins)-offer.offerFlorins+offer.demandFlorins);recipient.florins=round2(Number(recipient.florins)+offer.offerFlorins-offer.demandFlorins);offer.status='accepted';offer.acceptedDay=day;endWar(c,w,day);addEvent(proposer,'Peace treaty accepted by '+recipient.name+'.',day);addEvent(recipient,'Peace treaty accepted with '+proposer.name+'.',day);return {message:'Peace treaty accepted. The war is over.'};}
 return null;
}
