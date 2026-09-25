export const ECONOMY_1300={
 currency:'Florins',
 symbol:'ƒ',
 startFlorins:0,
 maxBuildingLevel:3
};

export const BUILDINGS_1300=[
 {
  id:'fields',name:'Manorial Fields',category:'Food',cost:50,maxWorkers:1600,normalWage:0.02,monthlyRevenue:3.0,
  description:'Expand cultivated land, drainage and crop rotation around the city.',
  effects:{}
 },
 {
  id:'pastures',name:'Sheep Pastures',category:'Food / Production',cost:65,maxWorkers:1100,normalWage:0.02,monthlyRevenue:3.4,
  description:'Organised grazing grounds supply meat, wool and hides to local workshops.',
  effects:{economy:1}
 },
 {
  id:'textiles',name:'Textile Workshop',category:'Production',cost:90,maxWorkers:750,normalWage:0.02,monthlyRevenue:5.5,
  description:'Urban looms turn wool and flax into higher-value cloth for local and export markets.',
  effects:{economy:4}
 },
 {
  id:'forge',name:'Weapons Forge',category:'Military / Production',cost:115,maxWorkers:480,normalWage:0.02,monthlyRevenue:5.8,
  description:'Smiths produce arms, armour and tools while improving military supply.',
  effects:{}
 },
 {
  id:'market',name:'Market Hall',category:'Trade',cost:135,maxWorkers:520,normalWage:0.02,monthlyRevenue:6.5,
  description:'A regulated central market raises trade volume, tolls and commercial stability.',
  effects:{economy:3,stability:1}
 },
 {
  id:'barracks',name:'Professional Barracks',category:'Army',cost:165,maxWorkers:380,normalWage:0.02,monthlyRevenue:1.0,
  description:'Permanent quarters and training grounds improve professional recruitment and reduce army upkeep at higher levels.',
  effects:{stability:1}
 },
 {
  id:'dockyard',name:'Royal Dockyard',category:'Navy',cost:200,requiresCoast:true,maxWorkers:560,normalWage:0.02,monthlyRevenue:4.0,
  description:'Slipways, stores and naval craftsmen reduce ship construction time and naval upkeep while producing ships, fish and services.',
  effects:{navy:3,economy:1}
 },
 {
  id:'walls',name:'Stone Fortifications',category:'Defence',cost:230,maxLevel:4,maxWorkers:260,normalWage:0.02,monthlyRevenue:0,
  description:'Improved walls, towers and gates increase siege difficulty. Fortifications produce no goods and require direct weekly state upkeep.',
  effects:{stability:4}
 },
 {
  id:'guildhall',name:'Guild Hall',category:'Civic / Production',cost:270,maxWorkers:340,normalWage:0.02,monthlyRevenue:5.5,
  description:'Recognised guilds coordinate skilled labour, quality standards and urban commerce.',
  effects:{economy:2,stability:2}
 },
 {
  id:'university',name:'University & Scriptorium',category:'Knowledge',cost:300,maxWorkers:220,normalWage:0.02,monthlyRevenue:2.5,
  description:'Schools, scholars and larger scriptoria produce manuscripts and make provincial technology investment more effective.',
  effects:{economy:1}
 }
 ,
 {
  id:'watermill',name:'Watermill',category:'Food / Production',cost:80,maxWorkers:260,normalWage:0.02,monthlyRevenue:4.2,
  description:'River-driven mills grind grain faster and support bakers, brewers and urban food supply.',
  effects:{economy:1}
 },
 {
  id:'brewery',name:'Brewery & Tavern',category:'Food / Urban',cost:85,maxWorkers:300,normalWage:0.02,monthlyRevenue:4.4,
  description:'Brewers turn grain into beer while taverns create a dependable urban market.',
  effects:{economy:2,stability:1}
 },
 {
  id:'tannery',name:'Tannery',category:'Production',cost:95,maxWorkers:360,normalWage:0.02,monthlyRevenue:5.0,
  description:'Tanners process hides into leather for shoes, harnesses, armour fittings and export.',
  effects:{economy:3}
 },
 {
  id:'fishery',name:'Fishing Wharf',category:'Food / Maritime',cost:90,requiresCoast:true,maxWorkers:500,normalWage:0.02,monthlyRevenue:4.8,
  description:'Wharves, boats and curing sheds expand coastal fishing and preserved-food trade.',
  effects:{economy:1}
 },
 {
  id:'saltworks',name:'Saltworks',category:'Resource / Trade',cost:120,maxWorkers:420,normalWage:0.02,monthlyRevenue:6.4,
  description:'Salt pans, brine works and salt depots supply food preservation and long-distance trade.',
  effects:{economy:4}
 },
 {
  id:'quarry',name:'Stone Quarry',category:'Resource',cost:105,maxWorkers:650,normalWage:0.02,monthlyRevenue:4.7,
  description:'Organised quarrying supplies stone for walls, churches, bridges and urban construction.',
  effects:{economy:2,stability:1}
 },
 {
  id:'lumberyard',name:'Timber Yard',category:'Resource',cost:90,maxWorkers:700,normalWage:0.02,monthlyRevenue:4.3,
  description:'Managed timber cutting and storage support construction, carts, barrels and ships.',
  effects:{economy:2}
 },
 {
  id:'ironworks',name:'Ironworks',category:'Resource / Production',cost:135,maxWorkers:620,normalWage:0.02,monthlyRevenue:5.4,
  description:'Tool-equipped iron workers expand extraction, smelting and processing to supply usable iron.',
  effects:{economy:2}
 },
 {
  id:'mint',name:'Royal Mint',category:'Finance / Administration',cost:220,maxWorkers:160,normalWage:0.02,monthlyRevenue:7.0,
  description:'A licensed mint strikes coin, strengthens fiscal administration and supports larger commercial transactions.',
  effects:{economy:4,stability:1}
 },
 {
  id:'monastery',name:'Monastery',category:'Clergy / Knowledge',cost:160,maxWorkers:280,normalWage:0.02,monthlyRevenue:2.4,
  description:'Monastic houses organise estates, education and expanded manuscript copying while improving technology investment.',
  effects:{stability:3}
 },
 {
  id:'cathedral',name:'Cathedral Chapter',category:'Clergy / Civic',cost:240,maxWorkers:240,normalWage:0.02,monthlyRevenue:2.8,
  description:'A major cathedral chapter concentrates clergy, schools, manuscript work and stronger technology investment.',
  effects:{stability:4,economy:1}
 },
 {
  id:'hospital',name:'Hospital & Hospice',category:'Civic / Welfare',cost:150,maxWorkers:220,normalWage:0.02,monthlyRevenue:1.6,
  description:'Religious and civic hospitals improve public happiness and raise average life expectancy through basic care and relief.',
  effects:{stability:4}
 }
];

export const BUILDING_1300=Object.fromEntries(BUILDINGS_1300.map(b=>[b.id,b]));

export function isCoastalCity1300(c){
 const text=[c.subrealm,c.historicalRole,c.economy,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase();
 // River ports (Danube/Rhine/etc.) are not sea access. A city only counts as coastal
 // when it has historical naval activity or explicit sea/coast language.
 return (Number(c.navy)||0)>0||/(coast|coastal|maritime|seaport|sea port|harbou?r on the sea|adriatic|mediterranean|atlantic|baltic|black sea|north sea|english channel|strait of|ocean)/i.test(text);
}

export function startingBuildingLevel1300(c,id){
 const food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0;
 const people=Number(c.people)||0,army=Number(c.army)||0,navy=Number(c.navy)||0,coastal=isCoastalCity1300(c);
 const text=[c.name,c.subrealm,c.economy,c.historicalRole,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase();
 const trade=/trade|merchant|market|fair|commerce|emporium|port|shipping/.test(text),river=/river|rhine|danube|seine|thames|po |elbe|meuse|loire|douro|tagus|crossing|bridge/.test(text),cloth=/cloth|textile|wool|flax|weav/.test(text),leather=/leather|hide|tanner/.test(text),salt=/salt|brine/.test(text),timber=/timber|wood|forest|lumber/.test(text),stone=/stone|quarr|marble/.test(text),religious=/cathedral|bishop|archbishop|abbey|monastery|monastic|pilgrim|church/.test(text),finance=/mint|coin|bank|finance|money|royal capital|court/.test(text);
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
  case 'watermill': return river&&food>=65?2:(river||food>=78)?1:0;
  case 'brewery': return people>=18000&&food>=65?2:people>=6000&&food>=55?1:0;
  case 'tannery': return leather||people>=10000&&econ>=62?1:0;
  case 'fishery': return coastal&&(food>=72||navy>0)?1:0;
  case 'saltworks': return salt?2:coastal&&econ>=78?1:0;
  case 'quarry': return stone?2:people>=12000&&stab>=62?1:0;
  case 'lumberyard': return timber?2:food>=72&&people<20000?1:0;
  case 'ironworks': return 0;
  case 'mint': return finance&&econ>=78?2:(econ>=88&&people>=18000)?1:0;
  case 'monastery': return religious&&tech>=58?2:religious||tech>=72?1:0;
  case 'cathedral': return religious&&people>=18000?2:religious&&people>=7000?1:0;
  case 'hospital': return people>=25000&&stab>=62?2:people>=9000&&stab>=55?1:0;
  default:return 0;
 }
}

export function buildingCost1300(building,currentLevel){
 const level=Math.max(0,Number(currentLevel)||0);
 const raw=building.cost*(1+level*.35);
 return Math.min(400,Math.max(50,Math.round(raw/5)*5));
}
