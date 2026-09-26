export const MILITARY_UNITS_1300=[
 {id:'levy-swordsmen',name:'Levy Swordsmen',category:'Levy',professional:false,hp:8,attack:2.5,range:0,upkeep:.001,trainingDays:0,tech:null},
 {id:'shield-spearmen',name:'Shield Spearmen',category:'Professional infantry',professional:true,hp:12,attack:4,range:1,upkeep:.012,trainingDays:30,tech:null},
 {id:'archers',name:'Archers',category:'Professional ranged',professional:true,hp:8,attack:4,range:5,upkeep:.014,trainingDays:40,tech:null},
 {id:'crossbowmen',name:'Crossbowmen',category:'Professional ranged',professional:true,hp:9,attack:6,range:4,upkeep:.018,trainingDays:55,tech:'crossbow-corps'},
 {id:'men-at-arms',name:'Men-at-Arms',category:'Heavy infantry',professional:true,hp:16,attack:6,range:0,upkeep:.024,trainingDays:70,tech:'organized-retinues'},
 {id:'knights',name:'Knights',category:'Heavy cavalry',professional:true,hp:20,attack:8,range:0,upkeep:.030,trainingDays:90,tech:'combined-arms'}
];
export const MILITARY_UNIT_1300=Object.fromEntries(MILITARY_UNITS_1300.map(x=>[x.id,x]));
export const PROFESSIONAL_MILITARY_UNITS_1300=MILITARY_UNITS_1300.filter(x=>x.professional).map(x=>x.id);

export function freshMilitaryState1300(){return {armiesByCity:{},trainingQueues:[],levyOrders:[],nextOrderId:1,seededV1:false};}

export function startingComposition1300(total,technology=50){
 const n=Math.max(0,Math.floor(Number(total)||0)),share=Math.max(.25,Math.min(.40,.28+(Number(technology||50)-50)*.0025)),archers=Math.min(n,Math.round(n*share));
 return {'shield-spearmen':n-archers,archers};
}

export function normaliseMilitaryState1300(raw,{ownedCities=[],startingByCity={},cityName=()=>'',technologyByCity={}}={}){
 const m=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:freshMilitaryState1300();
 m.armiesByCity=m.armiesByCity&&typeof m.armiesByCity==='object'&&!Array.isArray(m.armiesByCity)?m.armiesByCity:{};
 m.trainingQueues=Array.isArray(m.trainingQueues)?m.trainingQueues:[];
 m.levyOrders=Array.isArray(m.levyOrders)?m.levyOrders:[];
 m.nextOrderId=Math.max(1,Math.floor(Number(m.nextOrderId)||1));
 if(!m.seededV1){
  for(const id of ownedCities)m.armiesByCity[id]={id:'army-'+id,name:'Army of '+cityName(id),location:id,units:startingComposition1300(startingByCity[id]||0,technologyByCity[id]||50)};
  m.seededV1=true;
 }
 const valid=new Set(MILITARY_UNITS_1300.map(x=>x.id));
 for(const id of ownedCities){
  const army=m.armiesByCity[id]&&typeof m.armiesByCity[id]==='object'?m.armiesByCity[id]:{id:'army-'+id,name:'Army of '+cityName(id),location:id,units:{}};
  army.id=army.id||'army-'+id;army.name=army.name||'Army of '+cityName(id);army.location=typeof army.location==='string'&&army.location?army.location:id;army.units=army.units&&typeof army.units==='object'&&!Array.isArray(army.units)?army.units:{};
  for(const key of Object.keys({...army.units}))if(!valid.has(key))delete army.units[key];else army.units[key]=Math.max(0,Math.floor(Number(army.units[key])||0));
  for(const u of MILITARY_UNITS_1300)if(!Number.isFinite(Number(army.units[u.id])))army.units[u.id]=0;
  m.armiesByCity[id]=army;
 }
 m.trainingQueues=m.trainingQueues.filter(q=>q&&ownedCities.includes(q.cityId)&&MILITARY_UNIT_1300[q.unitId]?.professional&&Number(q.amount)>0).map(q=>({id:String(q.id||'training-'+m.nextOrderId++),cityId:q.cityId,unitId:q.unitId,amount:Math.max(1,Math.floor(Number(q.amount)||1)),startDay:Math.max(0,Math.floor(Number(q.startDay)||0)),finishDay:Math.max(0,Math.floor(Number(q.finishDay)||0))}));
 m.levyOrders=m.levyOrders.filter(q=>q&&ownedCities.includes(q.cityId)&&Number(q.remaining)>0).map(q=>({id:String(q.id||'levy-'+m.nextOrderId++),cityId:q.cityId,remaining:Math.max(1,Math.floor(Number(q.remaining)||1)),requested:Math.max(1,Math.floor(Number(q.requested)||Number(q.remaining)||1)),startDay:Math.max(0,Math.floor(Number(q.startDay)||0))}));
 return m;
}

export function unitCount1300(state,cityId,unitId){return Math.max(0,Math.floor(Number(state?.armiesByCity?.[cityId]?.units?.[unitId])||0));}
export function professionalCount1300(state,cityId){return PROFESSIONAL_MILITARY_UNITS_1300.reduce((n,id)=>n+unitCount1300(state,cityId,id),0);}
export function levyCount1300(state,cityId){return unitCount1300(state,cityId,'levy-swordsmen');}
export function pendingProfessional1300(state,cityId){return (state?.trainingQueues||[]).filter(q=>q.cityId===cityId).reduce((n,q)=>n+q.amount,0);}
export function addTrainingOrder1300(state,{cityId,unitId,amount,day}){
 const u=MILITARY_UNIT_1300[unitId],n=Math.max(1,Math.floor(Number(amount)||0));if(!u?.professional)return null;
 const id='training-'+state.nextOrderId++;state.trainingQueues.push({id,cityId,unitId,amount:n,startDay:day,finishDay:day+u.trainingDays});return state.trainingQueues.at(-1);
}
export function addLevyOrder1300(state,{cityId,amount,day}){
 const n=Math.max(1,Math.floor(Number(amount)||0)),id='levy-'+state.nextOrderId++;state.levyOrders.push({id,cityId,remaining:n,requested:n,startDay:day});return state.levyOrders.at(-1);
}
export function cancelOrder1300(state,id){const before=state.trainingQueues.length+state.levyOrders.length;state.trainingQueues=state.trainingQueues.filter(q=>q.id!==id);state.levyOrders=state.levyOrders.filter(q=>q.id!==id);return before!==state.trainingQueues.length+state.levyOrders.length;}
export function disbandUnits1300(state,cityId,unitId,amount){const army=state?.armiesByCity?.[cityId],u=MILITARY_UNIT_1300[unitId];if(!army||!u)return 0;const current=unitCount1300(state,cityId,unitId),n=Math.min(current,Math.max(1,Math.floor(Number(amount)||0)));army.units[unitId]=current-n;return n;}
export function applyUnitLosses1300(state,cityId,unitId,amount){return disbandUnits1300(state,cityId,unitId,amount);}
export function completeTrainingForDay1300(state,day){
 const done=state.trainingQueues.filter(q=>day>=q.finishDay);for(const q of done){const army=state.armiesByCity[q.cityId];if(army)army.units[q.unitId]=(Number(army.units[q.unitId])||0)+q.amount;}
 state.trainingQueues=state.trainingQueues.filter(q=>day<q.finishDay);return done;
}
