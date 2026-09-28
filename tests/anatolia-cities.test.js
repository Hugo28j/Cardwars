import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CITY_1300} from '../src/data1300.js';

const expected={
 'Sultanate of Rum':['1300-ankara','1300-kirsehir'],
 'Armenian Kingdom of Cilicia':['1300-sis','1300-tarsus'],
 'Alaiye':['1300-alanya'],
 'Karamanids':['1300-karaman','1300-ermenek'],
 'Beylik of Mentese':['1300-milas','1300-mugla'],
 'Hamidids':['1300-egirdir','1300-uluborlu'],
 'Ladik':['1300-denizli'],
 'Eshrefids':['1300-beysehir'],
 'Beylik of Germiyan':['1300-kutahya','1300-usak'],
 'Sahib Ataids':['1300-afyon'],
 'Pervane':['1300-sinop'],
 'Beylik of Karesi':['1300-balikesir','1300-bigadic'],
 'Ottoman Beylik':['1300-sogut','1300-bilecik'],
 'Candar Beylik':['1300-kastamonu','1300-safranbolu']
};

test('all pictured Anatolian realms have one or two playable province cards',()=>{
 assert.equal(Object.values(expected).flat().length,23);
 for(const [country,ids] of Object.entries(expected)){
  assert.ok(ids.length>=1&&ids.length<=2);
  for(const id of ids){
   const city=CITY_1300[id];
   assert.ok(city,id);
   assert.equal(city.country,country,id);
   assert.ok(city.people>0,id);
   assert.ok(city.sources.length>=1,id);
   for(const key of ['food','technology','economyScore','stability'])assert.ok(city[key]>=0&&city[key]<=100,id+' '+key);
  }
 }
});

test('all new province points lie inside their atlas realms',()=>{
 const atlas=JSON.parse(fs.readFileSync(new URL('../assets/atlas.json',import.meta.url)));
 const polygons=d=>d.split(/(?=M)/).map(part=>(part.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number).reduce((out,n,i,a)=>{if(i%2===0)out.push([n,a[i+1]]);return out;},[])).filter(p=>p.length>2);
 const inside=(point,polygon)=>{let hit=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if(((a[1]>point[1])!==(b[1]>point[1]))&&(point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1]||1e-9)+a[0]))hit=!hit;}return hit;};
 for(const [country,ids] of Object.entries(expected)){
  const realm=atlas.find(feature=>feature.realm===country);assert.ok(realm?.d,country);
  for(const id of ids){const city=CITY_1300[id],point=[((city.mapLon??city.lon)+22)*12,(72-(city.mapLat??city.lat))*15];assert.equal(polygons(realm.d).some(p=>inside(point,p)),true,id);}
 }
});
