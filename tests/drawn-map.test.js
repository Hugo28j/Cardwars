import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CITIES_1300} from '../src/data1300.js';

const atlas=JSON.parse(fs.readFileSync(new URL('../assets/atlas.json',import.meta.url)));
const borders=JSON.parse(fs.readFileSync(new URL('../assets/map-user-borders.json',import.meta.url)));
const sharedBorders=JSON.parse(fs.readFileSync(new URL('../assets/map-shared-borders.json',import.meta.url)));
const report=JSON.parse(fs.readFileSync(new URL('../assets/map-user-borders-report.json',import.meta.url)));
const cityFeatures=atlas.filter(feature=>feature.cityId);

test('Hugo drawn map has exactly one province for every city card',()=>{
 const expected=new Set(CITIES_1300.map(city=>city.id));
 const actual=new Set(cityFeatures.map(feature=>feature.cityId));
 assert.equal(cityFeatures.length,CITIES_1300.length);
 assert.equal(actual.size,expected.size);
 assert.deepEqual([...actual].sort(),[...expected].sort());
 for(const feature of cityFeatures){
  assert.match(feature.d,/^M/);
  assert.match(feature.d,/Z$/);
  assert.ok(Array.isArray(feature.neighbors));
 }
});

test('every city marker remains inside its visible clickable province',()=>{
 const polygons=d=>d.split(/(?=M)/).map(part=>(part.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number).reduce((out,n,i,a)=>{if(i%2===0)out.push([n,a[i+1]]);return out;},[])).filter(p=>p.length>2);
 const inside=(point,polygon)=>{let hit=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if(((a[1]>point[1])!==(b[1]>point[1]))&&(point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]))hit=!hit;}return hit;};
 const byId=new Map(cityFeatures.map(feature=>[feature.cityId,feature]));
 for(const city of CITIES_1300){
  const feature=byId.get(city.id),point=[((city.mapLon??city.lon)+22)*12,(72-(city.mapLat??city.lat))*15];
  assert.equal(polygons(feature.d).some(polygon=>inside(point,polygon)),true,city.id);
 }
});

test('drawn province adjacency is valid and symmetric',()=>{
 const byId=new Map(cityFeatures.map(feature=>[feature.cityId,feature]));
 let links=0;
 for(const feature of cityFeatures){
  for(const neighbor of feature.neighbors){
   assert.ok(byId.has(neighbor),`${feature.cityId} references unknown neighbour ${neighbor}`);
   assert.ok(byId.get(neighbor).neighbors.includes(feature.cityId),`${feature.cityId} ↔ ${neighbor} must be symmetric`);
   links++;
  }
 }
 assert.equal(links/2,report.adjacencyLinks);
});

test('original drawing and the required non-playable realms are present',()=>{
 assert.equal(borders.source,'cardwars-nieuwe-kaart (1).json');
 assert.ok(borders.d.length>100000);
 assert.ok(borders.nonPlayableD.length>50000);
 const realms=new Set(atlas.map(feature=>feature.realm));
 for(const realm of report.nonPlayableRealms)assert.ok(realms.has(realm),`missing non-playable realm: ${realm}`);
 assert.ok(realms.has('Khanate of the Golden Horde'));
 assert.ok(realms.has('Mamluke Sultanate'));
});

test('old atlas and engine are retained as recovery copies',()=>{
 assert.ok(fs.statSync(new URL('../assets/map-backups/atlas-before-hugo-drawing-20260929.json',import.meta.url)).size>100000);
 assert.ok(fs.statSync(new URL('../assets/map-backups/map-engine-before-hugo-drawing-20260929.js',import.meta.url)).size>10000);
});


test('map renders exact province outlines below a separate political-border layer',()=>{
 const source=fs.readFileSync(new URL('../src/map.js',import.meta.url),'utf8');
 const css=fs.readFileSync(new URL('../drawn-map.css',import.meta.url),'utf8');
 assert.match(source,/<g id="city-territories"><\/g><g id="country-borders"><\/g>/);
 assert.match(source,/assets\/map-shared-borders\.json/);
 assert.doesNotMatch(source,/assets\/map-user-borders\.json/);
 assert.doesNotMatch(source,/class="drawn-city-border" d="\$\{feature\.d\}"/);
 assert.match(source,/querySelector\('#country-borders'\)\.innerHTML=countryLinework/);
 assert.match(source,/clip-path="url\(#map-land-clip\)"/);
 assert.match(source,/style="--territory-fill:\$\{fill\}"/);
 assert.match(css,/\.drawn-city-border[\s\S]*--city-border-zoom-opacity/);
 assert.match(css,/\.drawn-map-border,[\s\S]*stroke: #050706;[\s\S]*stroke-width: \.85/);
 assert.match(css,/\.drawn-map-territory\.realm-hover[\s\S]*filter: none/);
 assert.doesNotMatch(css,/drawn-map-border-support/);
});

test('province borders disappear at overview and become clearer while zooming',()=>{
 const source=fs.readFileSync(new URL('../src/map.js',import.meta.url),'utf8');
 assert.match(source,/reveal=Math\.max\(0,Math\.min\(1,\(\.34-unit\)\/\.26\)\)/);
 assert.match(source,/--city-border-zoom-opacity',\(reveal\*\.42\)/);
 assert.match(source,/Math\.max\(12,Math\.min/);
});

test('lighter city linework contains only real shared borders inside one realm',()=>{
 assert.match(sharedBorders.source,/shared boundaries/);
 assert.ok(sharedBorders.cityD.length>10000);
 assert.ok(sharedBorders.cityD.split('M').length>200);
 assert.ok(sharedBorders.countryD.length>30000);
 assert.ok(sharedBorders.countryD.split('M').length>300);
});

test('current-region overrides preserve exact visible and clickable polygons',()=>{
 const overrides=JSON.parse(fs.readFileSync(new URL('../assets/map-current-region-overrides.json',import.meta.url)));
 assert.match(overrides.source,/Current Belgian province boundaries/);
 assert.match(overrides.belgianHainautD,/^M/);
 assert.match(overrides.belgianLuxembourgD,/^M/);
 assert.match(overrides.avignonD,/^M/);
 const source=fs.readFileSync(new URL('../scripts/rebuild-drawn-map.py',import.meta.url),'utf8');
 assert.match(source,/apply_current_belgium_layout/);
 assert.match(source,/LOCKED_GAP_CITY_IDS/);
});
