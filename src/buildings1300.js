export const ECONOMY_1300={
 currency:'Florins',
 symbol:'ƒ',
 startFlorins:0,
 maxBuildingLevel:3
};

export const BUILDINGS_1300=[
 {
  id:'fields',name:'Manorial Fields',category:'Food',cost:500,
  description:'Expand cultivated land, drainage and crop rotation around the city.',
  effects:{food:4,income:50}
 },
 {
  id:'pastures',name:'Sheep Pastures',category:'Food / Production',cost:700,
  description:'Organised grazing grounds supply meat, wool and hides to local workshops.',
  effects:{food:2,economy:1,income:80}
 },
 {
  id:'textiles',name:'Textile Workshop',category:'Production',cost:1000,
  description:'Urban looms turn wool and flax into higher-value cloth for local and export markets.',
  effects:{economy:4,income:220}
 },
 {
  id:'forge',name:'Weapons Forge',category:'Military / Production',cost:1250,
  description:'Smiths produce arms, armour and tools while improving military supply.',
  effects:{technology:1,army:150,income:120}
 },
 {
  id:'market',name:'Market Hall',category:'Trade',cost:1450,
  description:'A regulated central market raises trade volume, tolls and commercial stability.',
  effects:{economy:3,stability:1,income:250}
 },
 {
  id:'barracks',name:'Professional Barracks',category:'Army',cost:1700,
  description:'Permanent quarters and training grounds support a larger professional military core.',
  effects:{army:300,stability:1,income:-90}
 },
 {
  id:'dockyard',name:'Royal Dockyard',category:'Navy',cost:1950,requiresCoast:true,
  description:'Slipways, stores and naval craftsmen expand dedicated military shipping capacity.',
  effects:{navy:3,economy:1,income:-70}
 },
 {
  id:'walls',name:'Stone Fortifications',category:'Defence',cost:2100,
  description:'Improved walls, towers and gates make the province harder to capture and easier to control.',
  effects:{stability:4,income:-40}
 },
 {
  id:'guildhall',name:'Guild Hall',category:'Civic / Production',cost:2350,
  description:'Recognised guilds coordinate skilled labour, quality standards and urban commerce.',
  effects:{economy:2,stability:2,income:180}
 },
 {
  id:'university',name:'University & Scriptorium',category:'Knowledge',cost:3200,
  description:'Schools, scholars and manuscript production accelerate administration and technical knowledge.',
  effects:{technology:5,economy:1,income:-30}
 }
];

export const BUILDING_1300=Object.fromEntries(BUILDINGS_1300.map(b=>[b.id,b]));

export function isCoastalCity1300(c){
 const text=[c.subrealm,c.historicalRole,c.economy,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase();
 return (Number(c.navy)||0)>0||/(port|harbou?r|coast|maritime|shipping|adriatic|mediterranean|atlantic|baltic|black sea|north sea|strait|channel)/i.test(text);
}

export function startingBuildingLevel1300(c,id){
 const food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0;
 const people=Number(c.people)||0,army=Number(c.army)||0,navy=Number(c.navy)||0,coastal=isCoastalCity1300(c);
 switch(id){
  case 'fields': return food>=82?2:food>=62?1:0;
  case 'pastures': return food>=88?2:food>=70?1:0;
  case 'textiles': return econ>=84?2:econ>=69?1:0;
  case 'forge': return army>=450||tech>=88?2:army>=120||tech>=70?1:0;
  case 'market': return econ>=82?2:econ>=63?1:0;
  case 'barracks': return army>=450?2:army>=100?1:0;
  case 'dockyard': return coastal&&(navy>=8?2:(navy>0||econ>=72)?1:0);
  case 'walls': return stab>=78||army>=500?2:stab>=55||army>=150?1:0;
  case 'guildhall': return econ>=82&&people>=15000?2:econ>=67?1:0;
  case 'university': return tech>=90?2:tech>=78?1:0;
  default:return 0;
 }
}

export function buildingCost1300(building,currentLevel){
 const raw=building.cost*(1+Math.max(0,currentLevel)*.65);
 return Math.round(raw/50)*50;
}
