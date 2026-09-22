import test from 'node:test';
import assert from 'node:assert/strict';
import {CITIES_1300} from '../src/data1300.js';
import {BUILDINGS_1300,ECONOMY_1300} from '../src/buildings1300.js';
import {GOODS_1300,RECIPES_1300,ensureMarket1300,tickEconomy1300,settleMarketMonth1300,queueConstruction1300,cancelConstruction1300,provinceBuildings1300,constructionQuote1300,setSector1300,repayDebt1300,daysInMonth1300,creditLimit1300} from '../src/economy1300.js';
const cities=CITIES_1300.slice(0,4);
function game(cs=cities){return {ownedCities:cs.map(c=>c.id),day:0,florins:1000,buildings:{},economy:{taxRate:10,nationalWage:.12,corruption:20,cityWages:{},buildingWages:{}}};}
function run(g,cs,count){for(let i=0;i<count;i++){tickEconomy1300(g,cs,{baseExpenses:20});g.day++;}}
test('every buildable sector has valid recipes using known goods',()=>{
 assert.equal(BUILDINGS_1300.length,33);assert.equal(GOODS_1300.length,20);
 for(const b of BUILDINGS_1300){assert.ok(RECIPES_1300[b.id]);for(const [id,q] of Object.entries({...RECIPES_1300[b.id].input,...RECIPES_1300[b.id].output})){assert.ok(GOODS_1300.some(g=>g.id===id));assert.ok(q>0);}}
});
test('migration keeps treasury, completed buildings and economic settings; repeated reads do not grant reserves',()=>{
 const g=game();g.buildings[cities[0].id]={fields:1};g.economy.taxRate=23;
 ensureMarket1300(g,cities);const snapshot=JSON.stringify(g);ensureMarket1300(g,cities);assert.equal(JSON.stringify(g),snapshot);assert.equal(g.florins,1000);assert.equal(g.economy.taxRate,23);assert.equal(g.buildings[cities[0].id].fields,1);
});
test('same-day refresh is idempotent and JSON reload continues identically',()=>{
 const g=game();run(g,cities,10);tickEconomy1300(g,cities,{baseExpenses:20});const snapshot=JSON.stringify(g);tickEconomy1300(g,cities,{baseExpenses:20});assert.equal(JSON.stringify(g),snapshot);
 const copy=JSON.parse(snapshot);g.day++;copy.day++;tickEconomy1300(g,cities,{baseExpenses:20});tickEconomy1300(copy,cities,{baseExpenses:20});assert.deepEqual(copy,g);
});
test('labour stays within the province workforce after priorities and methods change',()=>{
 const cs=[{...cities[0],people:1500}],g=game(cs);ensureMarket1300(g,cs);
 for(let i=0;i<100;i++){if(i===10){setSector1300(g,cs[0],'fields','priorities',3);setSector1300(g,cs[0],'fields','methods','improved');}tickEconomy1300(g,cs);g.day++;const total=Object.values(g.economy.employment[cs[0].id]).reduce((a,b)=>a+b,0);assert.ok(total<=510);assert.ok(total>=0);}
});
test('pausing releases workers and removes sector output; subsidies cover losses',()=>{
 const g=game();run(g,cities,15);const c=cities[0];assert.equal(setSector1300(g,c,'forge','paused',true),null);tickEconomy1300(g,cities);assert.equal(g.economy.lastEconomy[c.id].forge.workers,0);assert.equal(g.economy.lastEconomy[c.id].forge.output.arms,0);
 g.economy.buildingWages[c.id]={market:.5};setSector1300(g,c,'market','subsidies',true);g.day++;tickEconomy1300(g,cities);const row=g.economy.lastEconomy[c.id].market;assert.equal(row.subsidy,Math.max(0,-row.profit));
});
test('closed borders stop all foreign trade and input shortages constrain outputs',()=>{
 const g=game();const m=ensureMarket1300(g,cities);m.tradeLaw='closed';for(const row of Object.values(m.goods))row.stock=0;
 tickEconomy1300(g,cities);for(const row of Object.values(m.goods)){assert.equal(row.imports,0);assert.equal(row.exports,0);}
 assert.ok(Object.values(g.economy.lastEconomy).some(rows=>Object.values(rows).some(s=>s.fulfilment<.5)));
});
test('open trade produces imports within the shared caravan capacity and creates no tariff',()=>{
 const g=game(),m=ensureMarket1300(g,cities);m.tradeLaw='free';for(const row of Object.values(m.goods))row.stock=0;tickEconomy1300(g,cities);
 const volume=Object.values(m.goods).reduce((n,r)=>n+r.imports+r.exports,0);assert.ok(volume>0);assert.ok(volume<=m.tradeCapacity+1e-6);assert.equal(m.budget.tariffs,0);
});
test('construction takes time and materials, has only two simultaneous slots and respects the level cap',()=>{
 const g=game();ensureMarket1300(g,cities);const c=cities[0],before=provinceBuildings1300(g,c).find(b=>b.id==='fields').level;
 assert.equal(queueConstruction1300(g,c,'fields'),null);assert.equal(queueConstruction1300(g,c,'roads'),null);assert.equal(queueConstruction1300(g,c,'builders'),null);
 tickEconomy1300(g,cities);assert.equal(g.buildings[c.id]?.fields,undefined);assert.equal(g.economy.market.queue[2].work,0);
 for(let i=0;i<100;i++){g.day++;for(const r of Object.values(g.economy.market.goods))r.stock=10000;tickEconomy1300(g,cities);}
 assert.equal(g.economy.market.queue.length,0);assert.equal(provinceBuildings1300(g,c).find(b=>b.id==='fields').level,before+1);
 g.florins=1e6;while(!queueConstruction1300(g,c,'fields')){}const quote=constructionQuote1300(g,c,'fields');assert.equal(quote.level+quote.pending,ECONOMY_1300.maxBuildingLevel);
});
test('missing construction tools halt progress and cancellation cannot mint money',()=>{
 const g=game(),m=ensureMarket1300(g,cities),c=cities[0];m.tradeLaw='closed';queueConstruction1300(g,c,'roads');
 for(const city of cities)for(const b of provinceBuildings1300(g,city).filter(b=>b.level))setSector1300(g,city,b.id,'paused',true);
 m.goods.tools.stock=0;tickEconomy1300(g,cities);assert.equal(m.queue[0].work,0);const cash=g.florins,cost=m.queue[0].cost;cancelConstruction1300(g,0);assert.equal(g.florins,Math.round((cash+cost*.75)*100)/100);assert.ok(g.florins<1000);
});
test('month settlement uses daily accruals, borrows deficits and keeps unpaid bills',()=>{
 const g=game(),m=ensureMarket1300(g,cities);g.florins=0;m.accrued={tax:10,tariffs:2,expenses:2000,subsidies:20,interest:3,days:31};g.economy.monthRevenue=99999;
 const result=settleMarketMonth1300(g,cities,'January 1300');assert.equal(result.balance,-2011);assert.equal(g.florins,0);assert.equal(m.debt,creditLimit1300(cities));assert.equal(m.debt+m.arrears,2011);assert.equal(m.accrued.days,0);
 g.florins=100;const oldArrears=m.arrears;repayDebt1300(g);assert.equal(g.florins,50);assert.equal(m.arrears,oldArrears-50);
});
test('calendar months and a multi-year simulation remain finite, bounded and solvent-accounted',()=>{
 assert.equal(daysInMonth1300(0),31);assert.equal(daysInMonth1300(31),28);assert.equal(daysInMonth1300(59),31);
 const g=game();for(let i=0;i<730;i++){g.day=i;const date=new Date(Date.UTC(1300,0,1+i));if(i&&date.getUTCDate()===1)settleMarketMonth1300(g,cities,`${date.getUTCMonth()} ${date.getUTCFullYear()}`);tickEconomy1300(g,cities,{baseExpenses:150});for(const good of GOODS_1300){const r=g.economy.market.goods[good.id];for(const v of Object.values(r))assert.ok(Number.isFinite(v)&&v>=0);assert.ok(r.price>=good.basePrice*.4&&r.price<=good.basePrice*2.8);}assert.ok(g.florins>=0);}
 assert.equal(g.economy.market.history.length,23);assert.ok(g.economy.market.sol>=0&&g.economy.market.sol<=100);
});
test('ownership and technology gates reject invalid industry commands',()=>{
 const g=game();ensureMarket1300(g,cities);assert.match(queueConstruction1300(g,CITIES_1300[10],'roads'),/own/);assert.match(setSector1300(g,cities[3],'fields','methods','guild'),/technology/);assert.match(setSector1300(g,cities[0],'fields','methods','nonexistent'),/technology/);
});
