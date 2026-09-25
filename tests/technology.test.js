import test from 'node:test';
import assert from 'node:assert/strict';
import {TECHNOLOGIES_1300,TECHNOLOGY_1300,freshTechnologyState1300,normaliseTechnologyState1300,technologyAvailable1300,technologyResearchCost1300,technologyBonuses1300,applyWeeklyResearch1300} from '../src/technology1300.js';

test('technology tree has five complete branches and twenty-five unique technologies',()=>{
 assert.equal(TECHNOLOGIES_1300.length,25);
 assert.equal(new Set(TECHNOLOGIES_1300.map(x=>x.id)).size,25);
 for(const branch of ['agriculture','economy','army','navy','administration'])assert.equal(TECHNOLOGIES_1300.filter(x=>x.branch===branch).length,5);
});

test('requirements open both tier-three routes and either route opens the capstone',()=>{
 const state=normaliseTechnologyState1300({...freshTechnologyState1300(),unlocked:['crop-rotation','heavy-tools']});
 assert.equal(technologyAvailable1300(state,'intensive-cultivation'),true);
 assert.equal(technologyAvailable1300(state,'water-wind-power'),true);
 assert.equal(technologyAvailable1300(state,'agricultural-surplus'),false);
 state.unlocked.push('intensive-cultivation');
 assert.equal(technologyAvailable1300(state,'agricultural-surplus'),true);
});

test('specialisation, alternate-route and diffusion modifiers affect research cost',()=>{
 const state=normaliseTechnologyState1300({...freshTechnologyState1300(),unlocked:['crop-rotation','heavy-tools','intensive-cultivation']});
 assert.equal(technologyResearchCost1300(state,TECHNOLOGY_1300['water-wind-power']),345);
 assert.equal(technologyResearchCost1300(state,TECHNOLOGY_1300['agricultural-surplus'],{diffusionDiscount:.15,tradeDiscount:.10}),360);
});

test('weekly research banks points and completes the selected technology',()=>{
 const state=freshTechnologyState1300();state.activeResearch='crop-rotation';
 const first=applyWeeklyResearch1300(state,60);assert.equal(first.completed.length,0);assert.equal(first.state.progressByTech['crop-rotation'],60);
 const second=applyWeeklyResearch1300(first.state,50);assert.deepEqual(second.completed,['crop-rotation']);assert.ok(second.state.unlocked.includes('crop-rotation'));assert.equal(second.state.researchPoints,10);
});

test('branch specialisation and cross-branch combinations aggregate gameplay bonuses',()=>{
 const state=normaliseTechnologyState1300({...freshTechnologyState1300(),unlocked:['crop-rotation','heavy-tools','water-wind-power','craft-guilds','specialized-workshops','advanced-workshops']});
 const bonuses=technologyBonuses1300(state);assert.equal(bonuses.foodOutputPct,10);assert.equal(bonuses.manufacturedOutputPct,25);assert.equal(bonuses.companyOutputPct,25);
});
