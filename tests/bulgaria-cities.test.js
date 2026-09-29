import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CITY_1300} from '../src/data1300.js';

test('Tarnovo and Vidin are playable Bulgarian city cards',()=>{
 const tarnovo=CITY_1300['1300-tarnovo'],vidin=CITY_1300['1300-vidin'];
 for(const city of [tarnovo,vidin]){
  assert.ok(city);
  assert.equal(city.country,'Second Bulgarian Empire');
  assert.ok(city.people>0);
  assert.ok(city.rarity>=0&&city.rarity<=4);
  assert.ok(Array.isArray(city.sources)&&city.sources.length>=2);
  for(const key of ['food','technology','economyScore','stability'])assert.ok(city[key]>=0&&city[key]<=100);
 }
 assert.equal(tarnovo.modern,'Veliko Tarnovo');
 assert.equal(vidin.historicalCountry,'Despotate of Vidin');
});

test('both Bulgarian city coordinates lie inside the Bulgarian atlas realm',()=>{
 const atlas=JSON.parse(fs.readFileSync(new URL('../assets/atlas.json',import.meta.url)));
 const insidePolygon=(point,polygon)=>{
  let hit=false;
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
   const a=polygon[i],b=polygon[j];
   if(((a[1]>point[1])!==(b[1]>point[1]))&&(point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]))hit=!hit;
  }
  return hit;
 };
 for(const id of ['1300-tarnovo','1300-vidin']){
  const realm=atlas.find(feature=>feature.realm==='Second Bulgarian Empire'&&feature.cityId===id);
  assert.ok(realm?.d);
  const polygons=(realm.d.match(/M[^M]+?Z/g)||[]).map(segment=>(segment.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number).reduce((points,n,index,all)=>{
   if(index%2===0&&index+1<all.length)points.push([n,all[index+1]]);
   return points;
  },[]));
  const city=CITY_1300[id],point=[((city.mapLon??city.lon)+22)*12,(72-(city.mapLat??city.lat))*15];
  assert.equal(polygons.some(polygon=>insidePolygon(point,polygon)),true,id);
 }
});
