export const freshProfile=()=>({version:4,florins:18000,buildings:{},deck:[],activeGame:null});

export function migrateProfile(p){
 if(!p||typeof p!=='object'||Array.isArray(p))return null;
 if(p.version===4)return p;
 if(p.version===3){
  return {
   version:4,
   florins:Number.isSafeInteger(p.florins)&&p.florins>=0?p.florins:18000,
   buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{},
   deck:[],
   activeGame:null
  };
 }
 if(p.version===2){
  return {
   version:4,
   florins:Number.isSafeInteger(p.florins)&&p.florins>=0?p.florins:18000,
   buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{},
   deck:[],
   activeGame:null
  };
 }
 return null;
}

export function validateProfile(p){
 if(!p||p.version!==4||!Number.isSafeInteger(p.florins)||p.florins<0||p.florins>1e12)return false;
 if(!p.buildings||typeof p.buildings!=='object'||Array.isArray(p.buildings))return false;
 if(!Array.isArray(p.deck)||p.deck.length>20||p.deck.some(id=>typeof id!=='string'))return false;
 if(p.activeGame!==null&&typeof p.activeGame!=='object')return false;
 return true;
}
