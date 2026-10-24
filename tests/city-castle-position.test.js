import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CITIES_1300} from '../src/data1300.js';
import {cityPointInProvince,pointInPolygon} from '../src/map.js';

const atlas=JSON.parse(fs.readFileSync(new URL('../assets/atlas.json',import.meta.url)));
const byCity=new Map(atlas.filter(feature=>feature.cityId).map(feature=>[feature.cityId,feature]));
const polygons=d=>(String(d).match(/M[^M]+?Z/g)||[]).map(segment=>{
 const values=(segment.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number),points=[];
 for(let i=0;i+1<values.length;i+=2)points.push([values[i],values[i+1]]);
 return points;
}).filter(poly=>poly.length>=3);

test('every city castle receives a point inside its clickable province',()=>{
 for(const city of CITIES_1300){
  const feature=byCity.get(city.id);assert.ok(feature,city.id);
  const areas=polygons(feature.d),raw=[((city.mapLon??city.lon)+22)*12,(72-(city.mapLat??city.lat))*15];
  const placed=cityPointInProvince(raw,areas);
  assert.ok(areas.some(poly=>pointInPolygon(placed,poly)),`${city.id} castle is outside its province`);
 }
});

test('an out-of-border city is nudged to the nearest valid interior',()=>{
 const square=[[0,0],[10,0],[10,10],[0,10]],placed=cityPointInProvince([12,5],[square]);
 assert.ok(pointInPolygon(placed,square));
 assert.ok(placed[0]>9&&placed[0]<10,'placement stays close to the real location');
 assert.ok(Math.abs(placed[1]-5)<.2);
});
