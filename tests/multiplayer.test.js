import test from 'node:test';
import assert from 'node:assert/strict';
import {ensureMultiplayerEconomy1300,processMultiplayerEconomyWeek1300,handleEconomyCommand1300} from '../server/multiplayer-economy1300.js';
import {ensurePvPRuntime,handlePvPCommand,activePvPAlliance,activePvPWar} from '../server/pvp1300.js';

function player(id,cityId){
 return {id,name:id.toUpperCase(),ownedCities:[cityId],armyByCity:{[cityId]:{army:20,navy:0}},trainingQueues:[],movements:[],construction:[],buildings:{},trainedUnitsByCity:{},fieldArmies:{},populationByCity:{},florins:100,events:[],nextMovementId:1};
}
function campaign(){
 const a=player('a','1300-seville'),b=player('b','1300-cordoba');
 return {day:0,playerStates:{a,b},cityOwners:{'1300-seville':'a','1300-cordoba':'b'},wars:{},truces:{},battles:[],sieges:[],occupations:{},peaceOffers:[]};
}

test('multiplayer economy ticks weekly and policy is server-clamped',()=>{
 const c=campaign();ensureMultiplayerEconomy1300(c);
 const before=c.playerStates.a.florins;
 const result=handleEconomyCommand1300(c,'a','set_economy_policy',{taxRate:99,tariffRate:-5},0);
 assert.match(result.message,/tax 25%/);
 assert.equal(c.playerStates.a.economy.taxRate,25);
 assert.equal(c.playerStates.a.economy.tariffRate,0);
 assert.equal(processMultiplayerEconomyWeek1300(c,6),false);
 assert.equal(processMultiplayerEconomyWeek1300(c,7),true);
 assert.equal(c.playerStates.a.economy.lastWeek,1);
 assert.ok(Number.isFinite(c.playerStates.a.economy.weeklyBalance));
 assert.notEqual(c.playerStates.a.florins,before);
 assert.ok(Object.keys(c.aiCountries).length>0);
});

test('human alliance and accepted goods trade are authoritative',()=>{
 const c=campaign();ensurePvPRuntime(c);ensureMultiplayerEconomy1300(c);
 handlePvPCommand(c,'a','offer_alliance',{targetId:'b'},0);
 const allianceOffer=c.allianceOffers.find(x=>x.status==='pending');
 assert.ok(allianceOffer);
 handlePvPCommand(c,'b','respond_alliance',{offerId:allianceOffer.id,accept:true},0);
 assert.ok(activePvPAlliance(c,'a','b'));
 assert.throws(()=>handlePvPCommand(c,'a','declare_war',{targetId:'b'},1),/Break the alliance/);

 c.playerStates.a.economy.goods.grain.stock=100;
 c.playerStates.b.economy.goods.grain.stock=50;
 handlePvPCommand(c,'a','offer_trade',{targetId:'b',offerFlorins:2,requestFlorins:5,offerGoods:{grain:10},requestGoods:{}},1);
 const trade=c.tradeOffers.find(x=>x.status==='pending');
 assert.ok(trade);
 handlePvPCommand(c,'b','respond_trade',{offerId:trade.id,accept:true},1);
 assert.equal(c.playerStates.a.economy.goods.grain.stock,90);
 assert.equal(c.playerStates.b.economy.goods.grain.stock,60);
 assert.equal(c.playerStates.a.florins,103);
 assert.equal(c.playerStates.b.florins,97);

 handlePvPCommand(c,'a','break_alliance',{targetId:'b'},2);
 assert.equal(activePvPAlliance(c,'a','b'),null);
 handlePvPCommand(c,'a','declare_war',{targetId:'b'},2);
 assert.ok(activePvPWar(c,'a','b'));
});
