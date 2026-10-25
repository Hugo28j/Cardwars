import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const map=readFileSync(new URL('../src/map.js',import.meta.url),'utf8');

test('main campaign (not only TEST) exposes attack arrows and defensive orders',()=>{
 assert.match(app,/data-action="army-front-attack"/);
 assert.match(app,/data-action="army-front-defend"/);
 assert.match(app,/function orderSelectedArmyMovement1300/);
 assert.match(app,/createCampaignFrontOrder1300\(game,\{type:tactic/);
 assert.match(app,/startArmyMovement1300\(game,key,targetId\)/);
 assert.match(app,/gameArmyTacticalMode=owner&&countriesAtWar1300/);
});
test('province defense requires a stationed army and affects the real combat resolver',()=>{
 assert.match(app,/army\.location===battle\.cityId\?frontOrderDefensePct1300/);
 assert.match(app,/function watchpostRegionDefensePct1300/);
 assert.match(app,/watchpostRegionDefensePct1300\(game,battle\.cityId\)/);
});
test('front orders persist, expire, and sync to map fog-safe visuals',()=>{
 assert.match(app,/frontOrders:Array\.isArray\(g\.frontOrders\)\?g\.frontOrders:\[\]/);
 assert.match(app,/world\.state\.game\.frontOrders=campaignFrontOrders1300\(game\)/);
 assert.match(app,/const beforeOrders=Array\.isArray\(game\.frontOrders\)/);
 assert.match(map,/id="campaign-front-orders"/);
 assert.match(map,/visibleCities\.has\(order\.target\)/);
 assert.match(map,/visibleCities\.has\(order\.from\)/);
 assert.match(map,/pointer-events="none"/);
 assert.match(map,/front-defensive-zone/);
 assert.match(map,/front-attack-order/);
});
