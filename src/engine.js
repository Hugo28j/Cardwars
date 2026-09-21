export const freshProfile=()=>({version:3,florins:18000,buildings:{}});

export function migrateProfile(p){
 if(!p||typeof p!=='object'||Array.isArray(p))return null;
 if(p.version===3)return p;
 if(p.version===2){
  return {
   version:3,
   florins:Number.isSafeInteger(p.florins)&&p.florins>=0?p.florins:18000,
   buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{}
  };
 }
 return null;
}

export function validateProfile(p){
 if(!p||p.version!==3||!Number.isSafeInteger(p.florins)||p.florins<0||p.florins>1e12)return false;
 if(!p.buildings||typeof p.buildings!=='object'||Array.isArray(p.buildings))return false;
 return true;
}
