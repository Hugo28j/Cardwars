import test from 'node:test';
import assert from 'node:assert/strict';
import {campaignFrontOrders1300,createCampaignFrontOrder1300,frontOrderDefensePct1300} from '../src/front-orders1300.js';

test('defense orders expire after 10 days and never add soldiers',()=>{
 const g={day:12,frontOrders:[],military:{armiesByCity:{'a':{units:{archers:22}}}}};
 const first=createCampaignFrontOrder1300(g,{type:'defend',armyKey:'a',from:'gent',target:'gent'});
 assert.equal(first.expiresDay,22);
 assert.equal(frontOrderDefensePct1300(g,'a','gent'),15);
 assert.equal(frontOrderDefensePct1300(g,'a','brugge'),0);
 assert.equal(g.military.armiesByCity.a.units.archers,22);
 g.day=22;assert.equal(frontOrderDefensePct1300(g,'a','gent'),0);
});
test('attacks replace earlier orders and preserve travel plus ten-day defense window',()=>{
 const g={day:1};createCampaignFrontOrder1300(g,{type:'defend',armyKey:'main',from:'gent',target:'gent'});
 const next=createCampaignFrontOrder1300(g,{type:'attack',armyKey:'main',from:'gent',target:'antwerpen',travelDays:28});
 assert.equal(next.expiresDay,39);
 assert.equal(campaignFrontOrders1300(g).length,1);
 assert.equal(frontOrderDefensePct1300(g,'main','gent'),0);
});
test('older saved games initialize without tactical orders and remove invalid entries',()=>{
 const g={day:20,frontOrders:[{type:'defend',armyKey:'a',target:'a',expiresDay:1},null,{type:'pirate',armyKey:'a',target:'b',expiresDay:30}]};
 assert.deepEqual(campaignFrontOrders1300(g),[]);
 const old={day:1};assert.deepEqual(campaignFrontOrders1300(old),[]);
});
