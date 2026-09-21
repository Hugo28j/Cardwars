export const ECONOMY_1300={
 currency:'Florins',
 symbol:'ƒ',
 startFlorins:0,
 maxBuildingLevel:3
};

export const BUILDINGS_1300=[
 {
  id:'fields',name:'Manorial Fields',category:'Food',cost:50,maxWorkers:1600,normalWage:0.08,monthlyRevenue:3.0,
  description:'Expand cultivated land, drainage and crop rotation around the city.',
  effects:{food:4}
 },
 {
  id:'pastures',name:'Sheep Pastures',category:'Food / Production',cost:65,maxWorkers:1100,normalWage:0.09,monthlyRevenue:3.4,
  description:'Organised grazing grounds supply meat, wool and hides to local workshops.',
  effects:{food:2,economy:1}
 },
 {
  id:'textiles',name:'Textile Workshop',category:'Production',cost:90,maxWorkers:750,normalWage:0.12,monthlyRevenue:5.5,
  description:'Urban looms turn wool and flax into higher-value cloth for local and export markets.',
  effects:{economy:4}
 },
 {
  id:'forge',name:'Weapons Forge',category:'Military / Production',cost:115,maxWorkers:480,normalWage:0.15,monthlyRevenue:5.8,
  description:'Smiths produce arms, armour and tools while improving military supply.',
  effects:{technology:1,army:150}
 },
 {
  id:'market',name:'Market Hall',category:'Trade',cost:135,maxWorkers:520,normalWage:0.13,monthlyRevenue:6.5,
  description:'A regulated central market raises trade volume, tolls and commercial stability.',
  effects:{economy:3,stability:1}
 },
 {
  id:'barracks',name:'Professional Barracks',category:'Army',cost:165,maxWorkers:380,normalWage:0.16,monthlyRevenue:1.0,
  description:'Permanent quarters and training grounds support a larger professional military core.',
  effects:{army:300,stability:1}
 },
 {
  id:'dockyard',name:'Royal Dockyard',category:'Navy',cost:200,requiresCoast:true,maxWorkers:560,normalWage:0.16,monthlyRevenue:4.0,
  description:'Slipways, stores and naval craftsmen expand dedicated military shipping capacity.',
  effects:{navy:3,economy:1}
 },
 {
  id:'walls',name:'Stone Fortifications',category:'Defence',cost:230,maxWorkers:260,normalWage:0.13,monthlyRevenue:0.8,
  description:'Improved walls, towers and gates make the province harder to capture and easier to control.',
  effects:{stability:4}
 },
 {
  id:'guildhall',name:'Guild Hall',category:'Civic / Production',cost:270,maxWorkers:340,normalWage:0.15,monthlyRevenue:5.5,
  description:'Recognised guilds coordinate skilled labour, quality standards and urban commerce.',
  effects:{economy:2,stability:2}
 },
 {
  id:'university',name:'University & Scriptorium',category:'Knowledge',cost:300,maxWorkers:220,normalWage:0.18,monthlyRevenue:2.5,
  description:'Schools, scholars and manuscript production accelerate administration and technical knowledge.',
  effects:{technology:5,economy:1}
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
 const level=Math.max(0,Number(currentLevel)||0);
 const raw=building.cost*(1+level*.35);
 return Math.min(400,Math.max(50,Math.round(raw/5)*5));
}
