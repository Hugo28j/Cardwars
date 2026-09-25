export const TECH_BRANCHES_1300=[
 {id:'agriculture',name:'Agriculture & Resources',icon:'wheat',specialization:'Agricultural Specialization',specializationEffect:'+5% Food production'},
 {id:'economy',name:'Industry & Economy',icon:'coins',specialization:'Industrial Specialization',specializationEffect:'+5% company output'},
 {id:'army',name:'Army',icon:'swords',specialization:'Military Specialization',specializationEffect:'+5% army effectiveness'},
 {id:'navy',name:'Navy',icon:'anchor',specialization:'Naval Specialization',specializationEffect:'+5% naval effectiveness'},
 {id:'administration',name:'Administration & Infrastructure',icon:'landmark',specialization:'Administrative Specialization',specializationEffect:'+3% tax efficiency · +2 Stability'}
];

const t=(id,branch,name,tier,effects,requires=[],route='')=>({id,branch,name,tier,effects,requires,route,baseCost:tier===1?100:tier===2?175:tier===3?300:600,technologyGain:tier===1?.5:tier===2?.75:tier===3?1:2});

export const TECHNOLOGIES_1300=[
 t('crop-rotation','agriculture','Improved Crop Rotation',1,['+8% Grain production','+5% Food production','+2% population growth']),
 t('heavy-tools','agriculture','Heavy Agricultural Tools',2,['+10% Farm output','-5% farm workers required','+5% Livestock production'],['crop-rotation']),
 t('intensive-cultivation','agriculture','Intensive Cultivation',3,['+15% Grain output','+10% Food output','+5% maximum farm level','+5% Tools consumption'],['heavy-tools'],'Food route'),
 t('water-wind-power','agriculture','Water & Wind Power',3,['+10% Mill output','+10% Lumber processing','+10% workshop production','-10% Mill workers'],['heavy-tools'],'Mechanisation route'),
 t('agricultural-surplus','agriculture','Agricultural Surplus',5,['+10% total food production','+10% food storage','-15% food spoilage','+5% population growth','+5 Stability when food is sufficient'],['intensive-cultivation','water-wind-power']),

 t('craft-guilds','economy','Craft Guilds',1,['+5% company output','+5% product quality','+5% artisan productivity','-5% workshop production cost']),
 t('specialized-workshops','economy','Specialized Workshops',2,['+10% manufactured goods output','+10% Tools, Clothing and Weapons output','+5% maximum employment capacity'],['craft-guilds']),
 t('merchant-guilds','economy','Merchant Guilds',3,['+10% trade income','-10% trade transport cost','+10% merchant capacity','-5% import cost','+5% export revenue'],['specialized-workshops'],'Trade route'),
 t('advanced-workshops','economy','Advanced Workshops',3,['+15% company output','-5% resource inputs','+10% maximum company level'],['specialized-workshops'],'Industry route'),
 t('commercial-networks','economy','Commercial Networks',5,['+10% national Economy','+10% market efficiency','+10% trade volume','+5% company profits','-10% transportation cost','Markets give +5 Economy'],['merchant-guilds','advanced-workshops']),

 t('standardized-arms','army','Standardized Arms',1,['+5% army damage','-5% Weapons production cost','+5% Weapons production']),
 t('crossbow-corps','army','Crossbow Corps',2,['+10% ranged damage','+5% defensive battle strength','+15% Crossbowmen effectiveness','+5% army maintenance'],['standardized-arms']),
 t('organized-retinues','army','Organized Retinues',3,['+10% professional army effectiveness','+10% army morale','+5% reinforcement speed','-5% manpower losses'],['crossbow-corps'],'Field army route'),
 t('siege-engineering','army','Siege Engineering',3,['+20% siege speed','+10% fortification damage','-10% siege attrition'],['crossbow-corps'],'Siege route'),
 t('combined-arms','army','Combined Arms',5,['+10% army effectiveness','+10% battle organization','+5% movement speed','-5% battle casualties','+10% combat with Infantry + Ranged + Cavalry'],['organized-retinues','siege-engineering']),

 t('improved-shipwrights','navy','Improved Shipwrights',1,['-10% ship construction cost','+10% ship construction speed','+5% ship durability']),
 t('cog-construction','navy','Cog Construction',2,['+15% cargo capacity','+10% naval trade capacity','+5% ship durability'],['improved-shipwrights']),
 t('stern-rudder','navy','Stern Rudder',3,['+10% ship manoeuvrability','+10% naval combat effectiveness','+5% naval movement speed'],['cog-construction'],'Naval combat route'),
 t('mariners-compass','navy',"Mariners' Compass",3,['+10% naval movement speed','+15% maritime trade range','-10% naval attrition','+10% maritime trade efficiency'],['cog-construction'],'Trade & exploration route'),
 t('maritime-tradition','navy','Maritime Tradition',5,['+10% naval effectiveness','+15% naval trade income','+10% fleet capacity','-10% ship maintenance','Ports give +5 Economy','+10% Shipyard output'],['stern-rudder','mariners-compass']),

 t('weights-measures','administration','Standard Weights & Measures',1,['+5% market efficiency','+5% company efficiency','-5% internal trade cost']),
 t('improved-roads','administration','Improved Roads',2,['+10% land trade speed','+10% army movement speed','-10% transportation cost'],['weights-measures']),
 t('market-charters','administration','Market Charters',3,['+10% city trade','+5% tax income','+10% Market output','Markets give +3 Economy'],['improved-roads'],'Economic administration'),
 t('royal-administration','administration','Royal Administration',3,['+10% tax efficiency','+5 Stability','-10% administrative losses','-5% building time'],['improved-roads'],'State administration'),
 t('organized-realm','administration','Organized Realm',5,['+5% national Economy','+5 Stability','+5% tax income','+5% company output','-5% construction cost','-5% army maintenance','-5% transportation cost'],['market-charters','royal-administration'])
];

export const TECHNOLOGY_1300=Object.fromEntries(TECHNOLOGIES_1300.map(x=>[x.id,x]));

export function freshTechnologyState1300(){return {unlocked:[],activeResearch:null,progressByTech:{},researchPoints:0,lastWeeklyResearch:0,lastCompleted:null,completionLog:[]};}

export function normaliseTechnologyState1300(raw){
 const state=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshTechnologyState1300(),valid=new Set(TECHNOLOGIES_1300.map(x=>x.id));
 state.unlocked=Array.isArray(state.unlocked)?[...new Set(state.unlocked.filter(id=>valid.has(id)))]:[];
 state.activeResearch=valid.has(state.activeResearch)&&!state.unlocked.includes(state.activeResearch)?state.activeResearch:null;
 if(!state.progressByTech||typeof state.progressByTech!=='object'||Array.isArray(state.progressByTech))state.progressByTech={};
 for(const [id,value] of Object.entries({...state.progressByTech}))if(!valid.has(id)||state.unlocked.includes(id))delete state.progressByTech[id];else state.progressByTech[id]=Math.max(0,Number(value)||0);
 state.researchPoints=Math.max(0,Number(state.researchPoints)||0);state.lastWeeklyResearch=Math.max(0,Number(state.lastWeeklyResearch)||0);
 state.lastCompleted=valid.has(state.lastCompleted)?state.lastCompleted:null;state.completionLog=Array.isArray(state.completionLog)?state.completionLog.filter(id=>valid.has(id)).slice(-8):[];
 return state;
}

export function branchUnlockedCount1300(state,branch){const unlocked=new Set(normaliseTechnologyState1300(state).unlocked);return TECHNOLOGIES_1300.filter(x=>x.branch===branch&&unlocked.has(x.id)).length;}

export function technologyAvailable1300(state,technology){
 const s=normaliseTechnologyState1300(state),tech=typeof technology==='string'?TECHNOLOGY_1300[technology]:technology;if(!tech||s.unlocked.includes(tech.id))return false;
 if(!tech.requires.length)return true;
 return tech.tier===5?tech.requires.some(id=>s.unlocked.includes(id)):tech.requires.every(id=>s.unlocked.includes(id));
}

export function technologyResearchCost1300(state,technology,{diffusionDiscount=0,tradeDiscount=0}={}){
 const s=normaliseTechnologyState1300(state),tech=typeof technology==='string'?TECHNOLOGY_1300[technology]:technology;if(!tech)return 0;
 const branchCount=branchUnlockedCount1300(s,tech.branch),hasOtherRoute=tech.tier===3&&TECHNOLOGIES_1300.some(x=>x.branch===tech.branch&&x.tier===3&&x.id!==tech.id&&s.unlocked.includes(x.id));
 let multiplier=1;if(branchCount>=3)multiplier-=.15;if(!branchCount&&s.unlocked.length)multiplier+=.10;if(hasOtherRoute)multiplier+=.30;multiplier-=Math.min(.15,Math.max(0,diffusionDiscount));multiplier-=Math.min(.10,Math.max(0,tradeDiscount));
 return Math.max(25,Math.round(tech.baseCost*multiplier));
}

export function technologyBonuses1300(state){
 const u=new Set(normaliseTechnologyState1300(state).unlocked),b={companyOutputPct:0,foodOutputPct:0,populationGrowthPct:0,farmOutputPct:0,farmWorkersPct:0,millOutputPct:0,millWorkersPct:0,lumberOutputPct:0,manufacturedOutputPct:0,inputRequiredPct:0,tradeIncomePct:0,taxIncomePct:0,armyEffectivenessPct:0,navyEffectivenessPct:0,armyMaintenancePct:0,navyMaintenancePct:0,constructionCostPct:0,constructionTimePct:0,stabilityFlat:0,economyFlat:0,marketEconomyFlat:0};
 const add=(id,key,n)=>{if(u.has(id))b[key]+=n;};
 add('crop-rotation','foodOutputPct',5);add('crop-rotation','populationGrowthPct',2);add('heavy-tools','farmOutputPct',10);add('heavy-tools','farmWorkersPct',-5);add('intensive-cultivation','farmOutputPct',15);add('water-wind-power','millOutputPct',10);add('water-wind-power','millWorkersPct',-10);add('water-wind-power','lumberOutputPct',10);add('water-wind-power','manufacturedOutputPct',10);add('agricultural-surplus','foodOutputPct',10);add('agricultural-surplus','populationGrowthPct',5);
 add('craft-guilds','companyOutputPct',5);add('specialized-workshops','manufacturedOutputPct',10);add('merchant-guilds','tradeIncomePct',10);add('advanced-workshops','companyOutputPct',15);add('advanced-workshops','inputRequiredPct',-5);add('commercial-networks','economyFlat',10);add('commercial-networks','companyOutputPct',5);add('commercial-networks','tradeIncomePct',10);add('commercial-networks','marketEconomyFlat',5);
 add('standardized-arms','armyEffectivenessPct',5);add('crossbow-corps','armyMaintenancePct',5);add('organized-retinues','armyEffectivenessPct',10);add('combined-arms','armyEffectivenessPct',10);
 add('stern-rudder','navyEffectivenessPct',10);add('mariners-compass','tradeIncomePct',10);add('maritime-tradition','navyEffectivenessPct',10);add('maritime-tradition','tradeIncomePct',15);add('maritime-tradition','navyMaintenancePct',-10);
 add('weights-measures','companyOutputPct',5);add('market-charters','taxIncomePct',5);add('market-charters','marketEconomyFlat',3);add('royal-administration','taxIncomePct',10);add('royal-administration','stabilityFlat',5);add('royal-administration','constructionTimePct',-5);add('organized-realm','economyFlat',5);add('organized-realm','stabilityFlat',5);add('organized-realm','taxIncomePct',5);add('organized-realm','companyOutputPct',5);add('organized-realm','constructionCostPct',-5);add('organized-realm','armyMaintenancePct',-5);
 if(branchUnlockedCount1300(state,'agriculture')>=3)b.foodOutputPct+=5;if(branchUnlockedCount1300(state,'economy')>=3)b.companyOutputPct+=5;if(branchUnlockedCount1300(state,'army')>=3)b.armyEffectivenessPct+=5;if(branchUnlockedCount1300(state,'navy')>=3)b.navyEffectivenessPct+=5;if(branchUnlockedCount1300(state,'administration')>=3){b.taxIncomePct+=3;b.stabilityFlat+=2;}
 if(u.has('water-wind-power')&&u.has('advanced-workshops'))b.manufacturedOutputPct+=5;if(u.has('merchant-guilds')&&u.has('mariners-compass'))b.tradeIncomePct+=10;if(u.has('standardized-arms')&&u.has('advanced-workshops'))b.inputRequiredPct-=5;if(u.has('agricultural-surplus')&&u.has('commercial-networks'))b.tradeIncomePct+=10;if(u.has('cog-construction')&&u.has('merchant-guilds'))b.tradeIncomePct+=10;
 return b;
}

export function applyWeeklyResearch1300(state,points,costOptions={}){
 const s=normaliseTechnologyState1300(state),earned=Math.max(0,Number(points)||0);s.lastWeeklyResearch=earned;s.researchPoints+=earned;const completed=[];
 while(s.activeResearch&&technologyAvailable1300(s,s.activeResearch)){
  const id=s.activeResearch,cost=technologyResearchCost1300(s,id,costOptions),progress=Math.max(0,Number(s.progressByTech[id])||0),need=Math.max(0,cost-progress),spent=Math.min(s.researchPoints,need);s.researchPoints-=spent;s.progressByTech[id]=progress+spent;
  if(s.progressByTech[id]+1e-6<cost)break;
  delete s.progressByTech[id];s.unlocked.push(id);s.lastCompleted=id;s.completionLog.push(id);s.completionLog=s.completionLog.slice(-8);completed.push(id);s.activeResearch=null;
 }
 return {state:s,completed};
}
