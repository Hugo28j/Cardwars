export const freshProfile=()=>({version:5,florins:18000,buildings:{},deck:[],activeGame:null,collection1300:{},packsOpened1300:0,drawn1300:0,lastPack1300:[]});

export function migrateProfile(p){
 if(!p||typeof p!=='object'||Array.isArray(p))return null;
 if(p.version===5)return p;
 if(p.version===4){
  return {
   version:5,
   florins:Number.isSafeInteger(p.florins)&&p.florins>=0?p.florins:18000,
   buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{},
   deck:Array.isArray(p.deck)?p.deck:[],
   activeGame:p.activeGame&&typeof p.activeGame==='object'?p.activeGame:null,
   collection1300:{},
   packsOpened1300:0,
   drawn1300:0,
   lastPack1300:[]
  };
 }
 if(p.version===3||p.version===2){
  return {
   version:5,
   florins:Number.isSafeInteger(p.florins)&&p.florins>=0?p.florins:18000,
   buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{},
   deck:[],
   activeGame:null,
   collection1300:{},
   packsOpened1300:0,
   drawn1300:0,
   lastPack1300:[]
  };
 }
 return null;
}

export function validateProfile(p){
 if(!p||p.version!==5||!Number.isSafeInteger(p.florins)||p.florins<0||p.florins>1e12)return false;
 if(!p.buildings||typeof p.buildings!=='object'||Array.isArray(p.buildings))return false;
 if(!Array.isArray(p.deck)||p.deck.length>20||p.deck.some(id=>typeof id!=='string'))return false;
 if(p.activeGame!==null&&typeof p.activeGame!=='object')return false;
 if(!p.collection1300||typeof p.collection1300!=='object'||Array.isArray(p.collection1300))return false;
 if(!Number.isSafeInteger(p.packsOpened1300)||p.packsOpened1300<0)return false;
 if(!Number.isSafeInteger(p.drawn1300)||p.drawn1300<0)return false;
 if(!Array.isArray(p.lastPack1300))return false;
 return true;
}
