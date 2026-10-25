import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCampaignFrontTopology1300,tickCampaignFront1300,frontSiegeSupport1300} from '../src/campaign-front1300.js';
const sum=u=>Object.values(u).reduce((a,b)=>a+b,0);
function fixture(){
 const provinces=['a','b','c'].map((id,i)=>({id,poly:[[i*8,0],[i*8+8,0],[i*8+8,8],[i*8,8]],center:[i*8+3,3],neighbors:i===0?['b']:i===1?['a','c']:['b']}));
 const topology=buildCampaignFrontTopology1300(provinces),military={},sources=[{key:'army',country:'A',city:'a',units:{swords:80,bows:40},garrison:30},{key:'enemy',country:'B',city:'b',units:{swords:50},garrison:10}];
 const ctx={day:1,sources,orders:[],active:c=>c!=='C',owner:id=>id.toUpperCase(),atWar:(a,b)=>a!==b&&a!=='C'&&b!=='C',allied:(a,b)=>a===b,combat:()=>({attack:100,avgHp:10,defense:1,range:1}),casualty:(s,u,n)=>s.units[u]-=n};
 return {topology,military,ctx};
}
test('mobilisation preserves every unit type and keeps the chosen castle garrison',()=>{
 const {topology,military,ctx}=fixture();tickCampaignFront1300(military,topology,ctx);
 const groups=military.front.formations.filter(f=>f.source==='army');assert.equal(sum(groups.find(f=>f.guard).units),30);
 for(const [id,n] of Object.entries(ctx.sources[0].units))assert.equal(groups.reduce((s,f)=>s+(f.units[id]||0),0),n);
 assert.equal(tickCampaignFront1300(military,topology,ctx),false);
});
test('daily fronts use connected steps, never capture neutral land or castles, and survive reload',()=>{
 const {topology,military,ctx}=fixture();
 for(let day=1;day<=35;day++){ctx.day=day;const previous=new Map((military.front?.formations||[]).map(f=>[f.id,f.node]));tickCampaignFront1300(military,topology,ctx);
  for(const f of military.front.formations){const old=previous.get(f.id);if(old&&old!==f.node)assert.ok(topology.byId.get(old).links.includes(f.node));assert.notEqual(topology.byId.get(f.node).city,'c');}
  for(const id of Object.keys(military.front.control))assert.equal(topology.byId.get(id).castle,false);
  for(const source of ctx.sources)for(const [id,n] of Object.entries(source.units))assert.equal(military.front.formations.filter(f=>f.source===source.key).reduce((s,f)=>s+(f.units[id]||0),0),n);
 }
 const saved=JSON.parse(JSON.stringify(military));ctx.day++;tickCampaignFront1300(saved,topology,ctx);assert.ok(saved.front.formations.length);
 ctx.active=()=>false;ctx.atWar=()=>false;ctx.day++;tickCampaignFront1300(saved,topology,ctx);assert.equal(saved.front.formations.length,0);assert.deepEqual(saved.front.control,{});
});
test('siege requires encirclement and living nearby attackers; relief lifts support',()=>{
 const {topology}=fixture(),castle=topology.castles.get('b'),ring=castle.links,front={control:Object.fromEntries(ring.map(id=>[id,'A'])),formations:[{source:'army',country:'A',node:ring[0],units:{swords:40}}]};
 assert.equal(frontSiegeSupport1300(front,topology,'b','A').length,1);front.control={};assert.equal(frontSiegeSupport1300(front,topology,'b','A').length,0);
});
test('encircling troops hold for the existing siege resolver rather than abandoning the castle',()=>{
 const {topology,military,ctx}=fixture(),castle=topology.castles.get('b');ctx.sources=[{key:'army',country:'A',city:'a',units:{swords:60},garrison:0}];
 military.front={version:1,lastDay:0,control:Object.fromEntries(castle.links.map(id=>[id,'A'])),formations:[{id:'army:0',source:'army',country:'A',node:castle.links[0],units:{swords:60}}]};
 const old=military.front.formations[0].node;tickCampaignFront1300(military,topology,ctx);assert.equal(military.front.formations[0].node,old);assert.equal(frontSiegeSupport1300(military.front,topology,'b','A').length,1);
});
test('front combat applies simultaneous casualties to the original typed ledgers',()=>{
 const {topology,military,ctx}=fixture(),node=topology.castles.get('a').links[0];
 ctx.sources.forEach(s=>s.garrison=0);ctx.combat=()=>({attack:9000,avgHp:10,defense:1});
 military.front={version:1,lastDay:0,control:{},formations:ctx.sources.map((s,i)=>({id:s.key+':0',source:s.key,country:s.country,node,units:{...s.units}}))};
 const totals=ctx.sources.map(s=>sum(s.units));tickCampaignFront1300(military,topology,ctx);
 ctx.sources.forEach((s,i)=>{assert.ok(sum(s.units)<totals[i]);for(const [id,n] of Object.entries(s.units))assert.equal(military.front.formations.filter(f=>f.source===s.key).reduce((v,f)=>v+(f.units[id]||0),0),n);});
});
