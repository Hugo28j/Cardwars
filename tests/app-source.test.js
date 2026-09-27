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


test('campaign province clicks do not force a full synchronous map refresh',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 const start=source.indexOf("world=new WorldMap($('#game-map-host')");
 const end=source.indexOf("setupGameClock1300()",start);
 const block=source.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.doesNotMatch(block,/mapState\.selected=id;world\.refresh\(\)/);
 assert.match(block,/mapState\.selected=id;renderGameProvincePanel\(\)/);
});


test('right-click country panels open without a synchronous full map refresh',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 assert.match(source,/function clearCampaignArmySelectionVisual1300/);
 assert.match(source,/function renderGameProvincePanel\(skipMapRefresh=false\)/);
 const dipStart=source.indexOf('function openGameDiplomacyPanel1300');
 const dipEnd=source.indexOf('function gameCountryPanelHTML1300',dipStart);
 const dipBlock=source.slice(dipStart,dipEnd);
 assert.match(dipBlock,/renderGameProvincePanel\(true\)/);
 assert.doesNotMatch(dipBlock,/world\.refresh\(\)/);
});


test('right-click diplomacy stats avoid rebuilding the entire campaign ranking',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 const statsStart=source.indexOf('function diplomacyCountryStats1300');
 const statsEnd=source.indexOf('function openingVictimCountry1300',statsStart);
 const statsBlock=source.slice(statsStart,statsEnd);
 assert.doesNotMatch(statsBlock,/buildCampaignRankings1300\(/);
 assert.match(statsBlock,/campaignCityStats1300\(game,c,isPlayer\)/);
 const openStart=source.indexOf('function openGameDiplomacyPanel1300');
 const openEnd=source.indexOf('function gameCountryPanelHTML1300',openStart);
 const openBlock=source.slice(openStart,openEnd);
 assert.doesNotMatch(openBlock,/ensureDiplomacyCountry1300\(/);
});


test('right click country panel paints a shell before full diplomacy rendering',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 const start=source.indexOf('function openGameDiplomacyPanel1300');
 const end=source.indexOf('function gameCountryPanelHTML1300',start);
 const block=source.slice(start,end);
 assert.match(block,/panel\.classList\.add\('open'\)/);
 assert.match(block,/requestAnimationFrame\(\(\)=>requestAnimationFrame/);
 assert.match(source,/function diplomacyCountryPanelShellHTML1300/);
});

test('diplomacy action rendering reuses one diplomat summary and ranking snapshot',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 assert.match(source,/diplomacyActionCanStart1300\(game,country,id,dip\)/);
 assert.match(source,/diplomacyActionMeta1300\(game,country,x\.id,dip\)/);
 assert.match(source,/game\?\.rankingSnapshot\?\.rows/);
});
