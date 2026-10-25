import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const war=readFileSync(new URL('../war-grid-test.html',import.meta.url),'utf8');
const map=readFileSync(new URL('../src/map.js',import.meta.url),'utf8');
const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
function standaloneFunction(name){
 const start=war.indexOf('function '+name+'(');
 assert.ok(start>=0,'Function '+name+' exists');
 const end=war.indexOf('\nfunction ',start+10);
 return war.slice(start,end<0?war.length:end);
}

test('blue formation marker resolves to real grid source for arrow orders',()=>{
 assert.match(war,/drag=\{from:formationAtPointer\(e\)\?\.source\?\?mouseIndex\(e\)/);
 assert.match(war,/if\(origin\.owner===0&&scope==='city'&&origin\.city!==selected\)/);
 assert.match(war,/function orderScope\(start\)\{return grid\[start\]\?\.owner===0/);
 assert.match(war,/else drawOrder\(drag\.from,drag\.to\)/);
});
test('government watchpost has a real local military radius and spends soldiers',()=>{
 assert.match(war,/function postGarrisonResistance\(/);
 assert.match(war,/postGarrisonResistance\(dst\.owner,a\.to\)/);
 assert.match(war,/postDefenseSupport\(tile\.owner,n\)<\.05/);
 assert.match(war,/postDefenseSorties\(\);redistribute/);
 assert.match(war,/p\.men-=send;grid\[best\]\.troops\+=send/);
 const ix=(x,y)=>y*120+x,loc=i=>[i%120,Math.floor(i/120)];
 const grid=Array.from({length:120*48},()=>({owner:0,troops:0}));
 const post={tile:ix(20,12),owner:0,men:150,readyDay:31,level:1};
 grid[ix(24,12)].owner=1;
 const ctx={posts:[post],grid,day:40,wars:new Set(['0-1']),W:120,H:48,ix,loc,Math,
  mobilizedCells:new Set(),atWar:(a,b)=>a===0&&b===1,adjacent:i=>{const [x,y]=loc(i);return [[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([a,b])=>a>=0&&a<120&&b>=0&&b<48).map(([a,b])=>ix(a,b));}};
 vm.runInNewContext(standaloneFunction('postDefenseSupport')+'\n'+standaloneFunction('postGarrisonResistance')+'\n'+standaloneFunction('postDefenseSorties')+'\nthis.apply={postDefenseSupport,postGarrisonResistance,postDefenseSorties};',ctx);
 assert.ok(ctx.apply.postDefenseSupport(0,ix(21,12))>0);
 assert.ok(ctx.apply.postGarrisonResistance(0,ix(21,12))>0);
 assert.equal(ctx.apply.postDefenseSupport(0,ix(45,12)),0);
 const before=post.men;ctx.apply.postDefenseSorties();
 assert.ok(post.men<before);
 assert.equal(grid.reduce((sum,g)=>sum+g.troops,0),before-post.men,'No soldier is duplicated');
 post.disabled=true;
 assert.equal(ctx.apply.postDefenseSupport(0,ix(21,12)),0);
});
test('conquest animation never forces a full battlefield redraw per frame',()=>{
 assert.match(war,/id="capture-overlay"/);
 assert.match(war,/captureCtx\.clearRect/);
 assert.match(war,/lastCaptureFrame=now;paintCaptureWave\(now\)/);
 const start=war.indexOf('function animateCapturedTerritory(before){');
 const end=war.indexOf('function paint(){',start);
 assert.ok(start>=0&&end>start);
 assert.doesNotMatch(war.slice(start,end),/\bpaint\(\)/);
});

test('territory animations have hard visual caps and respect fog and reduced motion',()=>{
 assert.match(war,/const maxTiles=500/);
 assert.match(war,/reducedWarMotion/);
 assert.match(war,/animateCapturedTerritory\(ownerBefore\)/);
 assert.match(map,/this\.territoryVisiblePrevious\.has\(id\)&&isVisible/);
 assert.match(map,/changes\.slice\(0,16\)/);
 assert.match(map,/this\.captureGhosts\.size>=16/);
 assert.match(map,/prefers-reduced-motion: reduce/);
 assert.match(map,/ghost\.animate\(/);
 assert.match(app,/watchpostRegionDefensePct1300\(game,battle\.cityId\)/);
});
