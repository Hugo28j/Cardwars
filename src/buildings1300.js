export const ECONOMY_1300={
 currency:'Florins',
 symbol:'ƒ',
 startFlorins:0,
 maxBuildingLevel:5
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
 ,
 {
  id:'watermill',name:'Watermill',category:'Food / Production',cost:80,maxWorkers:260,normalWage:0.10,monthlyRevenue:4.2,
  description:'River-driven mills grind grain faster and support bakers, brewers and urban food supply.',
  effects:{food:2,economy:1}
 },
 {
  id:'brewery',name:'Brewery & Alehouse',category:'Food / Urban',cost:85,maxWorkers:300,normalWage:0.11,monthlyRevenue:4.4,
  description:'Brewers turn grain into durable drink while alehouses create a dependable urban market.',
  effects:{food:1,economy:2,stability:1}
 },
 {
  id:'tannery',name:'Tannery',category:'Production',cost:95,maxWorkers:360,normalWage:0.11,monthlyRevenue:5.0,
  description:'Tanners process hides into leather for shoes, harnesses, armour fittings and export.',
  effects:{economy:3}
 },
 {
  id:'fishery',name:'Fishing Wharf',category:'Food / Maritime',cost:90,requiresCoast:true,maxWorkers:500,normalWage:0.10,monthlyRevenue:4.8,
  description:'Wharves, boats and curing sheds expand coastal fishing and preserved-food trade.',
  effects:{food:3,economy:1}
 },
 {
  id:'saltworks',name:'Saltworks',category:'Resource / Trade',cost:120,maxWorkers:420,normalWage:0.12,monthlyRevenue:6.4,
  description:'Salt pans, brine works and salt depots supply food preservation and long-distance trade.',
  effects:{food:1,economy:4}
 },
 {
  id:'quarry',name:'Stone Quarry',category:'Resource',cost:105,maxWorkers:650,normalWage:0.11,monthlyRevenue:4.7,
  description:'Organised quarrying supplies stone for walls, churches, bridges and urban construction.',
  effects:{economy:2,stability:1}
 },
 {
  id:'lumberyard',name:'Timber Yard',category:'Resource',cost:90,maxWorkers:700,normalWage:0.10,monthlyRevenue:4.3,
  description:'Managed timber cutting and storage support construction, carts, barrels and ships.',
  effects:{economy:2}
 },
 {
  id:'warehouse',name:'Merchant Warehouse',category:'Trade',cost:145,maxWorkers:320,normalWage:0.13,monthlyRevenue:7.2,
  description:'Large storage houses let merchants hold grain, cloth, wine and imported goods between fairs and voyages.',
  effects:{economy:4,stability:1}
 },
 {
  id:'merchantquarter',name:'Merchant Quarter',category:'Trade / Urban',cost:180,maxWorkers:600,normalWage:0.14,monthlyRevenue:8.2,
  description:'Foreign and local merchants cluster around counting houses, inns, brokers and wholesale markets.',
  effects:{economy:5,technology:1}
 },
 {
  id:'customshouse',name:'Customs House',category:'Trade / Administration',cost:155,maxWorkers:180,normalWage:0.15,monthlyRevenue:6.8,
  description:'Officials record cargoes, levy tolls and standardise duties at ports and major trade gates.',
  effects:{economy:3,stability:2}
 },
 {
  id:'mint',name:'Royal Mint',category:'Finance / Administration',cost:220,maxWorkers:160,normalWage:0.18,monthlyRevenue:7.0,
  description:'A licensed mint strikes coin, strengthens fiscal administration and supports larger commercial transactions.',
  effects:{economy:4,technology:1,stability:1}
 },
 {
  id:'bridge',name:'Bridge & River Toll',category:'Infrastructure / Trade',cost:130,maxWorkers:180,normalWage:0.12,monthlyRevenue:5.6,
  description:'Maintained crossings and toll stations concentrate road and river traffic through the city.',
  effects:{economy:3,stability:1}
 },
 {
  id:'monastery',name:'Monastery',category:'Clergy / Knowledge',cost:160,maxWorkers:280,normalWage:0.11,monthlyRevenue:2.4,
  description:'Monastic houses organise estates, charity, manuscript copying and local education.',
  effects:{technology:2,stability:3,food:1}
 },
 {
  id:'cathedral',name:'Cathedral Chapter',category:'Clergy / Civic',cost:240,maxWorkers:240,normalWage:0.15,monthlyRevenue:2.8,
  description:'A major cathedral chapter concentrates clergy, patronage, schools and civic prestige.',
  effects:{stability:4,technology:2,economy:1}
 },
 {
  id:'hospital',name:'Hospital & Hospice',category:'Civic / Welfare',cost:150,maxWorkers:220,normalWage:0.12,monthlyRevenue:1.6,
  description:'Religious and civic hospitals provide lodging, poor relief and basic care to travellers and residents.',
  effects:{stability:4,food:1}
 }
,
 {id:'ironmine',name:'Iron Mine',category:'Resource',cost:140,maxWorkers:650,normalWage:.13,monthlyRevenue:5,effects:{economy:2},description:'Extract iron ore for tools, weapons and skilled metalwork.'},
 {id:'charcoal',name:'Charcoal Burners',category:'Resource',cost:65,maxWorkers:350,normalWage:.09,monthlyRevenue:4,effects:{economy:1},description:'Turn timber into the fuel required by medieval furnaces.'},
 {id:'tools',name:'Toolsmiths',category:'Production',cost:120,maxWorkers:420,normalWage:.15,monthlyRevenue:6,effects:{technology:2,economy:2},description:'Forge iron and charcoal into tools for farms, mines and construction.'},
 {id:'bakery',name:'Bakers Guild',category:'Food / Production',cost:75,maxWorkers:320,normalWage:.11,monthlyRevenue:4,effects:{food:3},description:'Bake milled flour into staple food for the growing towns.'},
 {id:'vineyard',name:'Vineyards & Wine Press',category:'Food / Trade',cost:110,maxWorkers:520,normalWage:.11,monthlyRevenue:5,effects:{economy:2,food:1},description:'Cultivate grapes and press wine for prosperous households and export.'},
 {id:'glassworks',name:'Glassmakers',category:'Production',cost:170,maxWorkers:280,normalWage:.16,monthlyRevenue:6,effects:{technology:2,economy:3},description:'Use fuel and minerals to supply glass vessels and windows.'},
 {id:'roads',name:'Roads & Caravan Inns',category:'Infrastructure',cost:110,maxWorkers:220,normalWage:.10,monthlyRevenue:3,effects:{economy:2,stability:1},description:'Connect rural suppliers, towns and caravans; improve market access.'},
 {id:'builders',name:'Masons & Builders Guild',category:'Construction',cost:125,maxWorkers:400,normalWage:.14,monthlyRevenue:4,effects:{economy:1},description:'Skilled masons and carpenters accelerate the national construction queue.'},

];

export const BUILDING_1300=Object.fromEntries(BUILDINGS_1300.map(b=>[b.id,b]));

export function isCoastalCity1300(c){
 const text=[c.subrealm,c.historicalRole,c.economy,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase();
 return (Number(c.navy)||0)>0||/(port|harbou?r|coast|maritime|shipping|adriatic|mediterranean|atlantic|baltic|black sea|north sea|strait|channel)/i.test(text);
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
  case 'warehouse': return trade&&econ>=78?2:trade&&econ>=62?1:0;
  case 'merchantquarter': return trade&&econ>=86?2:trade&&econ>=72&&people>=10000?1:0;
  case 'customshouse': return (coastal||river)&&trade&&econ>=68?1:0;
  case 'mint': return finance&&econ>=78?2:(econ>=88&&people>=18000)?1:0;
  case 'bridge': return river&&econ>=58?1:0;
  case 'monastery': return religious&&tech>=58?2:religious||tech>=72?1:0;
  case 'cathedral': return religious&&people>=18000?2:religious&&people>=7000?1:0;
  case 'hospital': return people>=25000&&stab>=62?2:people>=9000&&stab>=55?1:0;
  case 'ironmine':return /iron|ore|mining/.test(text)?1:0;
  case 'charcoal':return timber||tech>=65?1:0;
  case 'tools':return tech>=65&&people>=5000?1:0;
  case 'bakery':return people>=6000?1:0;
  case 'vineyard':return /wine|vineyard|grape/.test(text)?1:0;
  case 'glassworks':return /glass/.test(text)?1:0;
  case 'roads':return trade?1:0;
  case 'builders':return people>=15000?1:0;
  default:return 0;
 }
}

export function buildingCost1300(building,currentLevel){
 const level=Math.max(0,Number(currentLevel)||0);
 const raw=building.cost*(1+level*.35);
 return Math.min(400,Math.max(50,Math.round(raw/5)*5));
}

export function buildingAvailability1300(c,b){
 if(startingBuildingLevel1300(c,b.id)>0)return {ok:true,reason:'Historical sector already present'};
 const people=Number(c.people)||0,food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0,army=Number(c.army)||0,navy=Number(c.navy)||0,coastal=isCoastalCity1300(c);
 const text=[c.name,c.subrealm,c.economy,c.historicalRole,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase(),trade=/trade|market|merchant|fair|commerce|emporium|port|shipping/.test(text),cloth=/cloth|textile|wool|flax|weav/.test(text),pasture=/sheep|wool|pasture|livestock|cattle/.test(text),river=/river|rhine|danube|seine|thames|po |elbe|meuse|loire|douro|tagus|crossing|bridge/.test(text),leather=/leather|hide|tanner/.test(text),salt=/salt|brine/.test(text),timber=/timber|wood|forest|lumber/.test(text),stone=/stone|quarr|marble/.test(text),religious=/cathedral|bishop|archbishop|abbey|monastery|monastic|pilgrim|church/.test(text),finance=/mint|coin|bank|finance|money|royal capital|court/.test(text);
 switch(b.id){
  case 'fields':return {ok:food>=48,reason:'Needs a stronger agricultural base'};
  case 'pastures':return {ok:food>=60||pasture,reason:'Needs grazing or livestock potential'};
  case 'textiles':return {ok:(econ>=56&&people>=4500)||cloth,reason:'Needs urban craft labour or a cloth economy'};
  case 'forge':return {ok:tech>=58&&people>=3500,reason:'Needs skilled metalworkers and technical capacity'};
  case 'market':return {ok:(econ>=50&&people>=3000)||trade,reason:'Needs a viable commercial population'};
  case 'barracks':return {ok:army>=70||stab>=62,reason:'Needs an established military or administrative base'};
  case 'dockyard':return {ok:isCoastalCity1300(c),reason:'Requires a coast or major port'};
  case 'walls':return {ok:stab>=48||people>=7000,reason:'Needs enough population or administration to maintain fortifications'};
  case 'guildhall':return {ok:econ>=66&&people>=8000,reason:'Needs a developed urban craft economy'};
  case 'university':return {ok:tech>=77&&people>=9000,reason:'Needs a large, advanced scholarly centre'};
  case 'watermill':return {ok:river||food>=68,reason:'Needs a useful river/water source or a strong grain economy'};
  case 'brewery':return {ok:food>=52&&people>=3500,reason:'Needs grain supply and a sizeable local market'};
  case 'tannery':return {ok:leather||pasture||people>=6000&&econ>=54,reason:'Needs hides/livestock or enough urban craft demand'};
  case 'fishery':return {ok:coastal,reason:'Requires a coastal or major port province'};
  case 'saltworks':return {ok:salt||coastal&&econ>=72,reason:'Needs salt/brine resources or a strong coastal trade economy'};
  case 'quarry':return {ok:stone||people>=8000&&stab>=55,reason:'Needs workable stone deposits and organised labour'};
  case 'lumberyard':return {ok:timber||food>=60,reason:'Needs nearby woodland or a strong rural hinterland'};
  case 'warehouse':return {ok:trade&&econ>=58,reason:'Needs established trade, markets or a port'};
  case 'merchantquarter':return {ok:trade&&econ>=70&&people>=7000,reason:'Needs a wealthy commercial city with sustained merchant traffic'};
  case 'customshouse':return {ok:(coastal||river)&&trade&&econ>=60,reason:'Needs a port, river crossing or major trade route'};
  case 'mint':return {ok:finance||econ>=82&&tech>=68&&people>=12000,reason:'Needs strong fiscal authority, skilled metalwork and major commerce'};
  case 'bridge':return {ok:river||/crossing|bridge/.test(text),reason:'Needs a major river or strategic crossing'};
  case 'monastery':return {ok:religious||tech>=65&&stab>=55,reason:'Needs a strong ecclesiastical or scholarly base'};
  case 'cathedral':return {ok:religious&&people>=6000,reason:'Requires an important bishopric, archbishopric or major church centre'};
  case 'hospital':return {ok:people>=7000&&stab>=48,reason:'Needs a sufficiently large and organised urban population'};
  case 'ironmine':return {ok:/iron|ore|mining|mine|metal|mountain/.test(text)||tech>=65,reason:'Needs ore deposits or developed metalworking'};
  case 'charcoal':return {ok:timber||food>=55,reason:'Needs woodland in the rural hinterland'};
  case 'tools':return {ok:tech>=55&&people>=3000,reason:'Needs skilled metalworkers'};
  case 'bakery':return {ok:people>=2000,reason:'Needs an urban food market'};
  case 'vineyard':return {ok:/wine|vine|grape/.test(text)||(Number(c.lat)<49&&food>=60),reason:'Needs suitable viticulture land'};
  case 'glassworks':return {ok:tech>=70&&econ>=65,reason:'Needs advanced crafts and commerce'};
  case 'roads':case 'builders':return {ok:true,reason:''};
  default:return {ok:false,reason:'Unknown sector'};
 }
}
