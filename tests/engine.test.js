import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CITIES,CITY,MODERN_COUNTRIES,RARITIES,PACK,DUPLICATE_COINS} from '../src/data.js';
import {freshProfile,formatNumber,openPack,validateProfile} from '../src/engine.js';
import {CITIES_1300,CITY_1300} from '../src/data1300.js';

test('catalogue contains 123 unique European cities with bounded scores and historical realms',()=>{
 assert.equal(CITIES.length,123);assert.equal(new Set(CITIES.map(c=>c.id)).size,123);
 assert.equal(Object.keys(MODERN_COUNTRIES).length,17);assert.equal(PACK.odds.reduce((a,b)=>a+b),100);
 for(const c of CITIES){
  for(const k of ['food','technology','satisfaction'])assert.ok(c[k]>=0&&c[k]<=100,`${c.id} ${k}`);
  for(const k of ['army','navy','people','size'])assert.ok(Number.isInteger(c[k])&&c[k]>=0,`${c.id} ${k}`);
  assert.equal(c.modernCountry,MODERN_COUNTRIES[c.countryCode]);assert.equal(c.country,c.realm);assert.ok(c.mapRealm);assert.ok(RARITIES[c.rarity]);
  assert.ok(c.lon>-10&&c.lon<30&&c.lat>36&&c.lat<54,c.id);
 }
 for(let r=0;r<5;r++)assert.ok(CITIES.some(c=>c.rarity===r));
});
test('number formats respect requested thresholds',()=>{
 assert.equal(formatNumber(9999),'9,999');assert.equal(formatNumber(10000),'10.0 K');
 assert.equal(formatNumber(9999999),'10000.0 K');assert.equal(formatNumber(10000000),'10.00 mil');
 assert.equal(formatNumber(12550000),'12.55 mil');assert.equal(formatNumber(10000,'army'),'10.0 K');
 assert.equal(formatNumber(9999,'navy'),'9,999');assert.equal(formatNumber(1500,'size'),'1,500 km²');
});
test('free packs draw five cards and award within-pack duplicates immediately',()=>{
 const p=freshProfile(),r=openPack(p,()=>0);
 assert.equal(r.length,5);assert.equal(r[0].duplicate,false);assert.ok(r.slice(1).every(x=>x.duplicate));
 assert.equal(p.coins,40);assert.equal(p.drawn,5);assert.equal(p.packsOpened,1);assert.equal(p.collection[r[0].id],5);
 openPack(p,()=>0);assert.equal(p.coins,90);assert.equal(p.drawn,10);assert.ok(validateProfile(p));
});
test('rarity boundaries select the advertised tier and pay correct duplicate rewards',()=>{
 for(const [roll,tier] of [[0,0],[.49999,0],[.5,1],[.77999,1],[.78,2],[.92999,2],[.93,3],[.98999,3],[.99,4],[1,4]]){
  const p=freshProfile();let call=0;const r=openPack(p,()=>call++%2===0?roll:0);
  assert.ok(r.every(x=>CITY[x.id].rarity===tier),`${roll} should draw ${tier}`);
  assert.equal(p.coins,4*DUPLICATE_COINS[tier]);assert.ok(validateProfile(p));
 }
});
test('saving and importing preserve a real multi-pack collection',()=>{
 let seed=427;const rng=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/2**32);
 const p=freshProfile();for(let i=0;i<80;i++)openPack(p,rng);
 const copy=JSON.parse(JSON.stringify(p));assert.ok(validateProfile(copy));assert.equal(copy.drawn,400);
 const expected=Object.entries(copy.collection).reduce((s,[id,n])=>s+(n-1)*DUPLICATE_COINS[CITY[id].rarity],0);
 assert.equal(copy.coins,expected);assert.deepEqual(copy,p);
});
test('invalid imports are rejected without throwing',()=>{
 const good=freshProfile();openPack(good,()=>0);
 const bads=[null,{},[],{...good,coins:-1},{...good,packsOpened:4},{...good,drawn:0},{...good,collection:{rome:0}},
  {...good,collection:{toString:5}},{...good,lastPack:[null,null,null,null,null]},
  {...good,lastPack:good.lastPack.map(x=>({...x,coins:999}))}];
 for(const p of bads)assert.equal(validateProfile(p),false);
});
test('reset returns an independent empty valid profile',()=>{
 const p=freshProfile();openPack(p,()=>0);const reset=freshProfile();
 assert.equal(reset.coins,0);assert.equal(reset.drawn,0);assert.equal(reset.packsOpened,0);
 assert.deepEqual(reset.collection,{});assert.deepEqual(reset.lastPack,[]);assert.ok(validateProfile(reset));
});
test('every card has a local photo and attributed image licence',()=>{
 const credits=JSON.parse(fs.readFileSync(new URL('../assets/photo-credits.json',import.meta.url)));
 for(const c of CITIES){
  assert.ok(fs.statSync(new URL('../'+c.image,import.meta.url)).size>100,c.image);
  const p=credits.find(p=>p.city===c.id);assert.ok(p?.license,c.id+' licence');assert.ok(p?.source,c.id+' source');
 }
 assert.equal(credits.length,CITIES.length);
});


test('1300 research collection contains one hundred ninety-nine researched European cards with bounded modeled scores',()=>{
 assert.equal(CITIES_1300.length,199);assert.equal(new Set(CITIES_1300.map(c=>c.id)).size,199);
 for(const c of CITIES_1300){
  assert.ok(['Crown of Castile','Crown of Aragon','Kingdom of Portugal','Kingdom of Navarre','Emirate of Granada','Duchy of Brittany','Kingdom of France','County of Champagne','Duchy of Burgundy','County of Anjou','Viscounty of Limoges','Duchy of Aquitaine (English Crown)','Kingdom of Majorca','Archbishopric of Lyon (Holy Roman Empire)','Archbishopric of Vienne (Holy Roman Empire)','County of Provence','County of Flanders','Duchy of Brabant','County of Hainaut','County of Holland','County of Guelders','Frisian Freedom','County of Oldenburg','County of Cleves','County of Jülich','County of Berg','County of Mark','County of Luxembourg','County of Nassau','Duchy of Lorraine','Archbishopric of Trier','Archbishopric of Mainz','Archbishopric of Cologne','Independent City of Cologne','County Palatine of the Rhine','Margraviate of Baden','County of Württemberg','Landgraviate of Hesse','Landgraviate of Thuringia','Margraviate of Meissen','Margraviate of Brandenburg','Duchy of Saxony-Wittenberg','Duchy of Saxe-Lauenburg','Duchy of Brunswick-Lüneburg','Principality of Anhalt','County of Holstein','Lordship of Mecklenburg','Lordship of Werle','Duchy of Pomerania-Stettin','Duchy of Pomerania-Wolgast','Duchy of Upper Bavaria','Duchy of Lower Bavaria','Archbishopric of Salzburg','Duchy of Austria','Duchy of Styria','Duchy of Carinthia','County of Tyrol','Kingdom of Bohemia','Margraviate of Moravia','Waldstätte','County of Freiburg','Prince-Bishopric of Basel','Prince-Bishopric of Münster','Prince-Bishopric of Osnabrück','Prince-Bishopric of Paderborn','Prince-Bishopric of Würzburg','Prince-Bishopric of Bamberg','Prince-Bishopric of Passau','Prince-Bishopric of Augsburg','Prince-Bishopric of Regensburg','Prince-Bishopric of Speyer','Prince-Bishopric of Strasbourg','Free Imperial City of Lübeck','Archbishopric of Bremen','Imperial City of Frankfurt','Free Imperial City of Nuremberg','Free Imperial City of Regensburg','Free Imperial City of Augsburg','Free Imperial City of Strasbourg','Free Imperial City of Speyer','Free Imperial City of Worms','Free Imperial City of Ulm','County of Savoy','Marquisate of Montferrat','Marquisate of Saluzzo','Lordship of Milan','Commune of Como','Commune of Brescia','Commune of Pavia','Commune of Cremona','Commune of Alessandria','Commune of Piacenza','Commune of Parma','Lordship of Verona','Commune of Padua','Lordship of Mantua','Marquisate of Ferrara','Lordship of Modena','Commune of Bologna','Patriarchate of Aquileia','County of Gorizia','Republic of Venice','Republic of Genoa','Republic of Florence','Republic of Pisa'].includes(c.country));assert.equal(CITY_1300[c.id].id,c.id);
  assert.ok(c.people>0&&Number.isInteger(c.people),c.id+' people');
  for(const k of ['food','technology','satisfaction'])assert.ok(c[k]>=0&&c[k]<=100,c.id+' '+k);
  assert.ok(c.lon>-10&&c.lon<18&&c.lat>36&&c.lat<55,c.id+' coordinates');
  assert.equal(c.image,undefined,c.id+' must not have artwork yet');
  assert.ok(Array.isArray(c.sources)&&c.sources.length>=2,c.id+' research sources');
 }
});

test('1300 map uses the separate research catalogue instead of the 600 CE cards',()=>{
 const map=fs.readFileSync(new URL('../src/map.js',import.meta.url),'utf8');
 assert.match(map,/data1300\.js/);assert.doesNotMatch(map,/from '\.\/data\.js'/);
});


test('Murcia belongs to Aragon in the exact 1300 snapshot and new western cards are present',()=>{
 assert.equal(CITY_1300['1300-murcia'].country,'Crown of Aragon');
 assert.match(CITY_1300['1300-murcia'].subrealm,/1296–1304/);
 assert.equal(CITY_1300['1300-santiago'].country,'Crown of Castile');
 assert.equal(CITY_1300['1300-plasencia'].country,'Crown of Castile');
});


test('all nineteen requested expansion cities are present in the 1300 catalogue',()=>{
 const ids=['porto','braga','guimaraes','coimbra','lisbon','evora','santarem','silves','pamplona','barcelona','zaragoza','girona','valencia','alicante','badajoz','cuenca','guadalajara','granada','malaga'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-alicante'].country,'Crown of Aragon');
 assert.equal(CITY_1300['1300-pamplona'].country,'Kingdom of Navarre');
 assert.equal(CITY_1300['1300-granada'].country,'Emirate of Granada');
});


test('map-only position offsets keep true city coordinates unchanged',()=>{
 const expected={
  '1300-lisbon':[-9.1393,38.7223],
  '1300-barcelona':[2.1734,41.3851],
  '1300-valencia':[-0.3763,39.4699],
  '1300-alicante':[-0.4810,38.3452],
  '1300-malaga':[-4.4214,36.7213],
 };
 for(const [id,[lon,lat]] of Object.entries(expected)){
  const c=CITY_1300[id];
  assert.equal(c.lon,lon);assert.equal(c.lat,lat);
  assert.ok(Number.isFinite(c.mapLon)&&Number.isFinite(c.mapLat),id+' display coords');
  assert.ok(Math.abs(c.mapLon-c.lon)<0.2&&Math.abs(c.mapLat-c.lat)<0.2,id+' display shift too large');
 }
});


test('all twenty-seven requested France-region expansion cities are present with exact-1300 owners',()=>{
 const ids=['nantes','rennes','vannes','rouen','caen','amiens','paris','reims','troyes','provins','dijon','tours','angers','poitiers','la-rochelle','orleans','bourges','limoges','bordeaux','bayonne','toulouse','carcassonne','montpellier','lyon','vienne','marseille','aix-en-provence'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-nantes'].country,'Duchy of Brittany');
 assert.equal(CITY_1300['1300-dijon'].country,'Duchy of Burgundy');
 assert.equal(CITY_1300['1300-bordeaux'].country,'Duchy of Aquitaine (English Crown)');
 assert.equal(CITY_1300['1300-montpellier'].country,'Kingdom of Majorca');
 assert.equal(CITY_1300['1300-lyon'].country,'Archbishopric of Lyon (Holy Roman Empire)');
 assert.equal(CITY_1300['1300-vienne'].country,'Archbishopric of Vienne (Holy Roman Empire)');
 assert.equal(CITY_1300['1300-marseille'].country,'County of Provence');
 assert.equal(CITY_1300['1300-aix-en-provence'].country,'County of Provence');
});


test('all thirty-six requested Low Countries and western German cards are present with exact-1300 owners',()=>{
 const ids=['bruges','ghent','ypres','leuven','brussels','antwerp','s-hertogenbosch','mons','valenciennes','dordrecht','haarlem','leiden','delft','nijmegen','zutphen','arnhem','stavoren','oldenburg','kleve','julich','dusseldorf','hamm','luxembourg','idstein','siegen','nancy','epinal','trier','mainz','bonn','cologne','heidelberg','pforzheim','baden-baden','stuttgart','tubingen'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-bruges'].country,'County of Flanders');
 assert.equal(CITY_1300['1300-antwerp'].country,'Duchy of Brabant');
 assert.equal(CITY_1300['1300-dordrecht'].country,'County of Holland');
 assert.equal(CITY_1300['1300-stavoren'].country,'Frisian Freedom');
 assert.equal(CITY_1300['1300-cologne'].country,'Independent City of Cologne');
 assert.equal(CITY_1300['1300-mainz'].country,'Archbishopric of Mainz');
 assert.equal(CITY_1300['1300-stuttgart'].country,'County of Württemberg');
});


test('all thirty-one requested central Europe batch A cards are present with exact-1300 owners',()=>{
 const ids=['marburg','kassel','eisenach','gotha','meissen','leipzig','dresden','brandenburg','berlin-colln','frankfurt-oder','wittenberg','lauenburg','brunswick','luneburg','zerbst','bernburg','aschersleben','kiel','wismar','gustrow','stettin','stargard','wolgast','greifswald','stralsund','munich','ingolstadt','landshut','straubing','salzburg','hallein'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-marburg'].country,'Landgraviate of Hesse');
 assert.equal(CITY_1300['1300-wittenberg'].country,'Duchy of Saxony-Wittenberg');
 assert.equal(CITY_1300['1300-wismar'].country,'Lordship of Mecklenburg');
 assert.equal(CITY_1300['1300-gustrow'].country,'Lordship of Werle');
 assert.equal(CITY_1300['1300-stettin'].country,'Duchy of Pomerania-Stettin');
 assert.equal(CITY_1300['1300-munich'].country,'Duchy of Upper Bavaria');
 assert.equal(CITY_1300['1300-salzburg'].country,'Archbishopric of Salzburg');
});


test('all twenty-two requested central Europe batch B1 cards are present with exact-1300 owners',()=>{
 const ids=['vienna','krems','wiener-neustadt','linz','graz','judenburg','st-veit','klagenfurt','merano','innsbruck','prague','kutna-hora','plzen','ceske-budejovice','hradec-kralove','brno','olomouc','znojmo','jihlava','schwyz','altdorf','freiburg-breisgau'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-vienna'].country,'Duchy of Austria');
 assert.equal(CITY_1300['1300-st-veit'].country,'Duchy of Carinthia');
 assert.equal(CITY_1300['1300-prague'].country,'Kingdom of Bohemia');
 assert.equal(CITY_1300['1300-brno'].country,'Margraviate of Moravia');
 assert.equal(CITY_1300['1300-schwyz'].country,'Waldstätte');
 assert.equal(CITY_1300['1300-freiburg-breisgau'].country,'County of Freiburg');
});


test('all final twenty-two central Europe cards are present with exact-1300 owners',()=>{
 const ids=['basel','munster','osnabruck','paderborn','wurzburg','bamberg','passau','dillingen','donaustauf','bruchsal','saverne','lubeck','hamburg','bremen','frankfurt-main','nuremberg','regensburg','augsburg','strasbourg','speyer','worms','ulm'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-basel'].country,'Prince-Bishopric of Basel');
 assert.equal(CITY_1300['1300-lubeck'].country,'Free Imperial City of Lübeck');
 assert.equal(CITY_1300['1300-hamburg'].country,'County of Holstein');
 assert.equal(CITY_1300['1300-bremen'].country,'Archbishopric of Bremen');
 assert.equal(CITY_1300['1300-frankfurt-main'].country,'Imperial City of Frankfurt');
 assert.equal(CITY_1300['1300-regensburg'].country,'Free Imperial City of Regensburg');
 assert.equal(CITY_1300['1300-strasbourg'].country,'Free Imperial City of Strasbourg');
 assert.equal(CITY_1300['1300-speyer'].country,'Free Imperial City of Speyer');
});


test('all thirty requested Italy batch A cards are present with exact-1300 owners',()=>{
 const ids=['chambery','susa','aosta','casale-monferrato','saluzzo','milan','monza','como','brescia','pavia','cremona','alessandria','piacenza','parma','verona','padua','vicenza','mantua','ferrara','modena','bologna','udine','aquileia','cividale','gorizia','venice','chioggia','genoa','florence','pisa'].map(x=>'1300-'+x);
 for(const id of ids){assert.ok(CITY_1300[id],id);assert.equal(CITY_1300[id].image,undefined,id+' must remain image-free');}
 assert.equal(CITY_1300['1300-milan'].country,'Lordship of Milan');
 assert.equal(CITY_1300['1300-padua'].country,'Commune of Padua');
 assert.equal(CITY_1300['1300-venice'].country,'Republic of Venice');
 assert.equal(CITY_1300['1300-genoa'].country,'Republic of Genoa');
 assert.equal(CITY_1300['1300-florence'].country,'Republic of Florence');
 assert.equal(CITY_1300['1300-pisa'].country,'Republic of Pisa');
});
