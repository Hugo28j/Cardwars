import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('owned province military panel calls the existing war-target helper',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 assert.match(source,/for\(const row of warTargetCities1300\(game\)\)/);
 assert.doesNotMatch(source,/warTargetSCities1300/);
});


test('AI military campaign and right-click diplomacy network are wired into the app',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 const mapSource=readFileSync(new URL('../src/map.js',import.meta.url),'utf8');
 assert.match(source,/function processAIMilitaryDay1300/);
 assert.match(source,/enemyMovements/);
 assert.match(source,/enemySieges/);
 assert.match(source,/function diplomacyCountryNetworkHTML1300/);
 assert.match(source,/DIPLOMATIC RELATIONS/);
 assert.match(mapSource,/enemy-route-line/);
 assert.match(mapSource,/move\.side==='enemy'/);
});


test('fog of war uses friendly cities occupations alliances and player armies as vision sources',()=>{
 const mapSource=readFileSync(new URL('../src/map.js',import.meta.url),'utf8');
 assert.match(mapSource,/visionSources=new Set/);
 assert.match(mapSource,/alliedCountries=new Set\(game\?\.alliances/);
 assert.match(mapSource,/occupier===playerCountry/);
 assert.match(mapSource,/game\?\.militaryByCity/);
 assert.match(mapSource,/move\?\.side!=='enemy'/);
 assert.match(mapSource,/fogDetail&&!isVisible/);
});
