import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const file=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('campaign and war sandbox share one pitched-roof sprite registered in the editor pack',()=>{
 const svg=file('assets/phaser/watchpost.svg');
 const pack=JSON.parse(file('assets/phaser/asset-pack.json'));
 assert.match(svg,/viewBox="0 0 96 108"/);
 assert.match(svg,/Sloping roof planes share a ridge/);
 assert.match(svg,/Timber gable/);
 assert.ok(pack.map.files.some(a=>a.key==='watchpost-government'&&a.url==='assets/phaser/watchpost.svg'));
 const map=file('src/map.js'),testMap=file('war-grid-test.html');
 assert.match(map,/assets\/phaser\/watchpost\.svg\?v=/);
 assert.match(testMap,/watchpostSprite\.src='\.\/assets\/phaser\/watchpost\.svg\?v=/);
 assert.match(testMap,/ctx\.drawImage\(watchpostSprite/);
});

test('watchposts retain soldier counts without displaying level numbers on the map',()=>{
 const map=file('src/map.js'),testMap=file('war-grid-test.html');
 assert.match(map,/const text=complete\?String\(Math\.floor\(Number\(p\.men\)/);
 assert.doesNotMatch(map,/String\(Math\.floor\(Number\(p\.men\)\|\|0\)\)\+' · L'/);
 assert.match(testMap,/const label=done\?fmt\(p\.men\):/);
 assert.doesNotMatch(testMap,/fmt\(p\.men\)\+' L'\+p\.level/);
});

test('sandbox selected watchpost no longer has a yellow rectangular highlight',()=>{
 const sandbox=file('war-grid-test.html'),start=sandbox.indexOf('function paintPosts(){'),end=sandbox.indexOf('function formationMarkers(){',start);
 assert.ok(start>=0&&end>start);
 const paint=sandbox.slice(start,end);
 assert.doesNotMatch(paint,/strokeRect\(/);
 assert.doesNotMatch(paint,/ffe0a0|selectedPost/);
});
