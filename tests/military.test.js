import test from 'node:test';
import assert from 'node:assert/strict';
import {freshMilitaryState1300,normaliseMilitaryState1300,addTrainingOrder1300,addLevyOrder1300,cancelOrder1300,completeTrainingForDay1300,applyUnitLosses1300} from '../src/military1300.js';

const state=()=>normaliseMilitaryState1300(freshMilitaryState1300(),{ownedCities:['bruges'],startingByCity:{bruges:0},cityName:()=> 'Bruges',technologyByCity:{bruges:50}});

test('professional regiment joins as one group only when training finishes',()=>{const s=state(),q=addTrainingOrder1300(s,{cityId:'bruges',unitId:'men-at-arms',amount:80,day:10});assert.equal(q.finishDay,80);assert.equal(s.armiesByCity.bruges.units['men-at-arms'],0);assert.deepEqual(completeTrainingForDay1300(s,79),[]);assert.equal(s.armiesByCity.bruges.units['men-at-arms'],0);assert.equal(completeTrainingForDay1300(s,80).length,1);assert.equal(s.armiesByCity.bruges.units['men-at-arms'],80);});
test('cancelling a recruitment queue removes the reserved group',()=>{const s=state(),q=addTrainingOrder1300(s,{cityId:'bruges',unitId:'archers',amount:25,day:0});assert.equal(cancelOrder1300(s,q.id),true);assert.equal(s.trainingQueues.length,0);});
test('levies use their single swordsmen unit and casualties remove exact soldiers',()=>{const s=state(),q=addLevyOrder1300(s,{cityId:'bruges',amount:40,day:0});assert.equal(q.requested,40);s.armiesByCity.bruges.units['levy-swordsmen']=40;assert.equal(applyUnitLosses1300(s,'bruges','levy-swordsmen',13),13);assert.equal(s.armiesByCity.bruges.units['levy-swordsmen'],27);});
