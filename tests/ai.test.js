import test from 'node:test';
import assert from 'node:assert/strict';
import {PLAYER_REALM,relation} from '../src/diplomacy1300.js';
import {freshCountryAI1300,normaliseCountryAI1300,applyCountryAIStats1300,runCountryAIWeek1300,countryAISummary1300} from '../src/ai1300.js';

const snapshot=(overrides={})=>({country:'Testland',cityCount:3,population:180000,army:300,navy:8,foodAvg:55,economyAvg:58,technologyAvg:52,stabilityAvg:60,strength:1000,coastal:true,...overrides});

test('country AI state normalises and modifiers affect foreign stats',()=>{
 const game={ai:freshCountryAI1300(),diplomacy:{aiTreasuries:{}}};
 game.ai.countries.Testland={modifiers:{food:2,economy:3,technology:1,stability:4,armyPct:10,navyPct:25},levels:{},personality:{},decisions:[]};
 normaliseCountryAI1300(game.ai);
 const out=applyCountryAIStats1300(game,'Testland',{food:50,economy:50,technology:50,stability:50,population:1000,army:100,navy:4});
 assert.equal(out.food,52);
 assert.equal(out.economy,53);
 assert.equal(out.army,110);
 assert.equal(out.navy,5);
});

test('country AI runs once per week, pays its budget and eventually invests',()=>{
 const game={day:7,ai:freshCountryAI1300(),diplomacy:{aiTreasuries:{Testland:1000}}};
 for(let week=1;week<=8;week++){
  runCountryAIWeek1300(game,{week,countries:[snapshot()],playerStrength:900});
  assert.ok(Number.isFinite(game.diplomacy.aiTreasuries.Testland));
  const same=game.diplomacy.aiTreasuries.Testland;
  runCountryAIWeek1300(game,{week,countries:[snapshot()],playerStrength:900});
  assert.equal(game.diplomacy.aiTreasuries.Testland,same);
 }
 const summary=countryAISummary1300(game,'Testland');
 assert.ok(Object.values(summary.levels).some(x=>x>0));
 assert.ok(summary.decisions.length>0);
});

test('a strongly hostile aggressive AI can make a one-sided rivalry decision',()=>{
 const game={day:91,ai:freshCountryAI1300(),diplomacy:{aiTreasuries:{Testland:100}}};
 game.ai.countries.Testland={personality:{aggression:.95,caution:.4,development:.5,diplomacy:.3,trade:.3},levels:{},modifiers:{},focus:'balanced',lastDecisionWeek:-9999,decisionOffset:1,lastBudget:{},decisions:[]};
 const r=relation(game,'Testland',PLAYER_REALM);r.ours.opinion=-150;
 const events=runCountryAIWeek1300(game,{week:13,countries:[snapshot()],playerStrength:900});
 assert.equal(relation(game,'Testland',PLAYER_REALM).ours.rival,true);
 assert.ok(events.some(x=>x.includes('rival')));
});
