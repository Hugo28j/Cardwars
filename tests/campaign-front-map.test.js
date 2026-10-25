import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildCampaignFrontTopology1300,tickCampaignFront1300} from '../src/campaign-front1300.js';
import {CITY_1300} from '../src/data1300.js';
test('campaign front builds on the full real map and can mobilise a country',()=>{
 const atlas=JSON.parse(fs.readFileSync(new URL('../assets/atlas.json',import.meta.url))),provinces=atlas.filter(f=>f.cityId).map(f=>{const nums=f.d.match(/-?\d+(?:\.\d+)?/g).map(Number),poly=[];for(let i=0;i<nums.length;i+=2)poly.push([nums[i],nums[i+1]]);return {id:f.cityId,poly,center:poly[0],neighbors:f.neighbors||[]};});
 const topology=buildCampaignFrontTopology1300(provinces);assert.equal(topology.castles.size,provinces.length);assert.ok(topology.nodes.length>provinces.length);
 const country=CITY_1300[provinces[0].id].country,sources=provinces.filter(p=>CITY_1300[p.id].country===country).map(p=>({key:p.id,country,city:p.id,units:{'levy-swordsmen':200,archers:100},garrison:40})),m={};
 const ctx={day:1,sources,orders:[],active:()=>true,owner:id=>CITY_1300[id].country,atWar:(a,b)=>a!==b,allied:(a,b)=>a===b,combat:()=>({attack:100,avgHp:10,defense:1}),casualty:()=>{}};
 for(let day=1;day<=5;day++){ctx.day=day;tickCampaignFront1300(m,topology,ctx);}
 assert.ok(m.front.formations.length);assert.ok(m.front.formations.every(f=>topology.byId.has(f.node)));
});
