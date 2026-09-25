export const ECONOMY_1300={
 currency:'Florins',
 symbol:'ƒ',
 startFlorins:0,
 maxBuildingLevel:3
};

export const BUILDINGS_1300=[
 {
  id:'fields',name:'Manorial Fields',category:'Food',cost:50,maxWorkers:1600,normalWage:0.10,monthlyRevenue:3.0,
  description:'Expand cultivated land, drainage and crop rotation around the city.',
  effects:{}
 },
 {
  id:'pastures',name:'Sheep Pastures',category:'Food / Production',cost:65,maxWorkers:1100,normalWage:0.10,monthlyRevenue:3.4,
  description:'Organised grazing grounds supply meat, wool and hides to local workshops.',
  effects:{economy:1}
 },
 {
  id:'textiles',name:'Textile Workshop',category:'Production',cost:90,maxWorkers:750,normalWage:0.10,monthlyRevenue:5.5,
  description:'Urban looms turn wool and flax into higher-value cloth for local and export markets.',
  effects:{economy:4}
 },
 {
  id:'forge',name:'Weapons Forge',category:'Military / Production',cost:115,maxWorkers:480,normalWage:0.10,monthlyRevenue:5.8,
  description:'Smiths produce arms, armour and tools while improving military supply.',
  effects:{}
 },
 {
  id:'market',name:'Market Hall',category:'Trade',cost:135,maxWorkers:520,normalWage:0.10,monthlyRevenue:6.5,
  description:'A regulated central market raises trade volume, tolls and commercial stability.',
  effects:{economy:3,stability:1}
 },
 {
  id:'barracks',name:'Professional Barracks',category:'Army',cost:165,maxWorkers:380,normalWage:0.10,monthlyRevenue:1.0,
  description:'Permanent quarters and training grounds improve professional recruitment and reduce army upkeep at higher levels.',
  effects:{stability:1}
 },
 {
  id:'dockyard',name:'Royal Dockyard',category:'Navy',cost:200,requiresCoast:true,maxWorkers:560,normalWage:0.10,monthlyRevenue:4.0,
  description:'Slipways, stores and naval craftsmen reduce ship construction time and naval upkeep while producing ships, fish and services.',
  effects:{navy:3,economy:1}
 },
 {
  id:'walls',name:'Stone Fortifications',category:'Defence',cost:230,maxLevel:4,maxWorkers:260,normalWage:0.10,monthlyRevenue:0,
  description:'Improved walls, towers and gates increase siege difficulty. Fortifications produce no goods and require direct weekly state upkeep.',
  effects:{stability:4}
 },
 {
  id:'guildhall',name:'Guild Hall',category:'Civic / Production',cost:270,maxWorkers:340,normalWage:0.10,monthlyRevenue:5.5,
  description:'Recognised guilds coordinate skilled labour, quality standards and urban commerce.',
  effects:{economy:2,stability:2}
 },
 {
  id:'university',name:'University & Scriptorium',category:'Knowledge',cost:300,maxWorkers:220,normalWage:0.10,monthlyRevenue:2.5,
  description:'Schools, scholars and larger scriptoria produce manuscripts and make provincial technology investment more effective.',
  effects:{economy:1}
 }
 ,
 {
  id:'watermill',name:'Watermill',category:'Food / Production',cost:80,maxWorkers:260,normalWage:0.10,monthlyRevenue:4.2,
  description:'River-driven mills grind grain faster and support bakers, brewers and urban food supply.',
  effects:{economy:1}
 },
 {
  id:'brewery',name:'Brewery & Tavern',category:'Food / Urban',cost:85,maxWorkers:300,normalWage:0.10,monthlyRevenue:4.4,
  description:'Brewers turn grain into beer while taverns create a dependable urban market.',
  effects:{economy:2,stability:1}
 },
 {
  id:'tannery',name:'Tannery',category:'Production',cost:95,maxWorkers:360,normalWage:0.10,monthlyRevenue:5.0,
  description:'Tanners process hides into leather for shoes, harnesses, armour fittings and export.',
  effects:{economy:3}
 },
 {
  id:'fishery',name:'Fishing Wharf',category:'Food / Maritime',cost:90,requiresCoast:true,maxWorkers:500,normalWage:0.10,monthlyRevenue:4.8,
  description:'Wharves, boats and curing sheds expand coastal fishing and preserved-food trade.',
  effects:{economy:1}
 },
 {
  id:'saltworks',name:'Saltworks',category:'Resource / Trade',cost:120,maxWorkers:420,normalWage:0.10,monthlyRevenue:6.4,
  description:'Salt pans, brine works and salt depots supply food preservation and long-distance trade.',
  effects:{economy:4}
 },
 {
  id:'quarry',name:'Stone Quarry',category:'Resource',cost:105,maxWorkers:650,normalWage:0.10,monthlyRevenue:4.7,
  description:'Organised quarrying supplies stone for walls, churches, bridges and urban construction.',
  effects:{economy:2,stability:1}
 },
 {
  id:'lumberyard',name:'Timber Yard',category:'Resource',cost:90,maxWorkers:700,normalWage:0.10,monthlyRevenue:4.3,
  description:'Managed timber cutting and storage support construction, carts, barrels and ships.',
  effects:{economy:2}
 },
 {
  id:'ironworks',name:'Ironworks',category:'Resource / Production',cost:135,maxWorkers:620,normalWage:0.10,monthlyRevenue:5.4,
  description:'Tool-equipped iron workers expand extraction, smelting and processing to supply usable iron.',
  effects:{economy:2}
 },
 {
  id:'mint',name:'Royal Mint',category:'Finance / Administration',cost:220,maxWorkers:160,normalWage:0.10,monthlyRevenue:7.0,
  description:'A licensed mint strikes coin, strengthens fiscal administration and supports larger commercial transactions.',
  effects:{economy:4,stability:1}
 },
 {
  id:'monastery',name:'Monastery',category:'Clergy / Knowledge',cost:160,maxWorkers:280,normalWage:0.10,monthlyRevenue:2.4,
  description:'Monastic houses organise estates, education and expanded manuscript copying while improving technology investment.',
  effects:{stability:3}
 },
 {
  id:'cathedral',name:'Cathedral Chapter',category:'Clergy / Civic',cost:240,maxWorkers:240,normalWage:0.10,monthlyRevenue:2.8,
  description:'A major cathedral chapter concentrates clergy, schools, manuscript work and stronger technology investment.',
  effects:{stability:4,economy:1}
 },
 {
  id:'hospital',name:'Hospital & Hospice',category:'Civic / Welfare',cost:150,maxWorkers:220,normalWage:0.10,monthlyRevenue:1.6,
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

const STARTING_BUILDING_CACHE_1300=new WeakMap();

function rawStartingBuildingLevel1300(c,id){
 const food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0;
 const people=Number(c.people)||0,army=Number(c.army)||0,navy=Number(c.navy)||0,coastal=isCoastalCity1300(c);
 const text=[c.name,c.subrealm,c.economy,c.historicalRole,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase();
 const trade=/trade|merchant|market|fair|commerce|emporium|port|shipping/.test(text),river=/river|rhine|danube|seine|thames|po |elbe|meuse|loire|douro|tagus|crossing|bridge/.test(text),cloth=/cloth|textile|wool|flax|weav/.test(text),leather=/leather|hide|tanner/.test(text),salt=/salt|brine/.test(text),timber=/timber|wood|forest|lumber/.test(text),stone=/stone|quarr|marble/.test(text),religious=/cathedral|bishop|archbishop|abbey|monastery|monastic|pilgrim|church/.test(text),finance=/mint|coin|bank|finance|money|royal capital|court/.test(text);
 switch(id){
  case 'fields': return food>=82?2:food>=56?1:0;
  case 'pastures': return food>=88?2:food>=68?1:0;
  case 'textiles': return cloth&&econ>=66?2:econ>=72?1:0;
  case 'forge': return army>=450||tech>=88?2:army>=120||tech>=68?1:0;
  case 'market': return econ>=82?2:econ>=58||trade?1:0;
  case 'barracks': return army>=450?2:army>=100?1:0;
  case 'dockyard': return coastal&&(navy>=8?2:(navy>0||econ>=70)?1:0);
  case 'walls': return stab>=80||army>=500?2:stab>=60||army>=180?1:0;
  case 'guildhall': return econ>=84&&people>=15000?2:econ>=68?1:0;
  case 'university': return tech>=90?2:tech>=78?1:0;
  case 'watermill': return river&&food>=65?2:(river||food>=78)?1:0;
  case 'brewery': return people>=18000&&food>=65?2:people>=6000&&food>=55?1:0;
  case 'tannery': return leather||people>=10000&&econ>=62?1:0;
  case 'fishery': return coastal&&(food>=70||navy>0)?1:0;
  case 'saltworks': return salt?2:coastal&&econ>=78?1:0;
  case 'quarry': return stone?2:people>=12000&&stab>=62?1:0;
  case 'lumberyard': return timber?2:food>=72&&people<20000?1:0;
  case 'ironworks': return tech>=90&&econ>=82?2:tech>=76&&econ>=68?1:0;
  case 'mint': return finance&&econ>=78?2:(econ>=88&&people>=18000)?1:0;
  case 'monastery': return religious&&tech>=58?2:religious||tech>=72?1:0;
  case 'cathedral': return religious&&people>=18000?2:religious&&people>=7000?1:0;
  case 'hospital': return people>=25000&&stab>=62?2:people>=9000&&stab>=55?1:0;
  default:return 0;
 }
}

function startingCityDevelopmentScore1300(c){
 const food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0,people=Math.max(1000,Number(c.people)||0),army=Number(c.army)||0,navy=Number(c.navy)||0;
 const popScore=Math.max(0,Math.min(100,((Math.log10(people)-3)/2)*100));
 return econ*.28+tech*.20+stab*.16+food*.16+popScore*.15+Math.min(100,army/6)*.03+Math.min(100,navy*5)*.02;
}

function startingCompanySlots1300(c){
 const score=startingCityDevelopmentScore1300(c);
 if(score<60)return 1;
 if(score<65)return 2;
 if(score<70)return 3;
 if(score<75)return 4;
 if(score<80)return 5;
 if(score<84)return 6;
 return 7;
}

function startingBuildingFit1300(c,id){
 const food=Number(c.food)||0,econ=Number(c.economyScore)||0,tech=Number(c.technology)||0,stab=Number(c.stability)||0,people=Math.max(1000,Number(c.people)||0),army=Number(c.army)||0,navy=Number(c.navy)||0;
 const pop=Math.max(0,Math.min(100,((Math.log10(people)-3)/2)*100)),coastal=isCoastalCity1300(c),text=[c.name,c.subrealm,c.economy,c.historicalRole,c.militaryRole,c.researchSummary].filter(Boolean).join(' ').toLowerCase();
 const has=re=>re.test(text);
 switch(id){
  case 'fields':return food;
  case 'pastures':return food*.9+(people<18000?8:0);
  case 'textiles':return econ*.65+tech*.20+(has(/cloth|textile|wool|flax|weav/)?28:0);
  case 'forge':return tech*.45+econ*.20+Math.min(35,army/12);
  case 'market':return econ*.75+pop*.15+(has(/trade|merchant|market|fair|commerce|emporium|port|shipping/)?22:0);
  case 'barracks':return stab*.35+Math.min(60,army/8);
  case 'dockyard':return coastal?econ*.40+navy*4+25:-1000;
  case 'walls':return stab*.70+Math.min(30,army/18);
  case 'guildhall':return econ*.65+tech*.25+pop*.10;
  case 'university':return tech*.85+pop*.15;
  case 'watermill':return food*.55+econ*.20+(has(/river|rhine|danube|seine|thames|po |elbe|meuse|loire|douro|tagus/)?28:0);
  case 'brewery':return food*.35+econ*.30+pop*.35;
  case 'tannery':return econ*.55+pop*.20+(has(/leather|hide|tanner/)?30:0);
  case 'fishery':return coastal?food*.45+navy*3+25:-1000;
  case 'saltworks':return econ*.45+(has(/salt|brine/)?50:0)+(coastal?10:0);
  case 'quarry':return stab*.30+pop*.20+(has(/stone|quarr|marble/)?50:0);
  case 'lumberyard':return food*.35+(has(/timber|wood|forest|lumber/)?50:0);
  case 'ironworks':return tech*.50+econ*.40+Math.min(15,army/40);
  case 'mint':return econ*.50+tech*.30+(has(/mint|coin|bank|finance|money|royal capital|court/)?38:0);
  case 'monastery':return tech*.45+stab*.25+(has(/abbey|monastery|monastic|pilgrim|church|bishop/)?38:0);
  case 'cathedral':return stab*.30+pop*.30+(has(/cathedral|bishop|archbishop|church/)?42:0);
  case 'hospital':return pop*.40+stab*.40+tech*.20;
  default:return 0;
 }
}

function startingBuildingLevels1300(c){
 if(c&&typeof c==='object'&&STARTING_BUILDING_CACHE_1300.has(c))return STARTING_BUILDING_CACHE_1300.get(c);
 const slots=startingCompanySlots1300(c),candidates=BUILDINGS_1300.map(b=>({id:b.id,level:rawStartingBuildingLevel1300(c,b.id),fit:startingBuildingFit1300(c,b.id)})).filter(x=>x.level>0).sort((a,b)=>b.level-a.level||b.fit-a.fit);
 if(!candidates.length){
  const fallback=(Number(c.food)||0)>=(Number(c.economyScore)||0)?'fields':'market';
  candidates.push({id:fallback,level:1,fit:0});
 }
 const selectedRows=candidates.slice(0,slots),selected=new Set(selectedRows.map(x=>x.id)),levels={};
 if(!selectedRows.some(x=>x.id!=='walls')){
  const companyCandidate=candidates.find(x=>x.id!=='walls');
  selected.clear();
  if(companyCandidate)selected.add(companyCandidate.id);
  else selected.add((Number(c.food)||0)>=(Number(c.economyScore)||0)?'fields':'market');
 }
 for(const row of candidates)if(selected.has(row.id))levels[row.id]=row.level;
 for(const id of selected)if(!levels[id])levels[id]=1;
 if(c&&typeof c==='object')STARTING_BUILDING_CACHE_1300.set(c,levels);
 return levels;
}

export function startingBuildingLevel1300(c,id){
 return Number(startingBuildingLevels1300(c)?.[id])||0;
}

export function buildingCost1300(building,currentLevel){
 const level=Math.max(0,Number(currentLevel)||0);
 const raw=building.cost*(1+level*.35);
 return Math.min(400,Math.max(50,Math.round(raw/5)*5));
}
