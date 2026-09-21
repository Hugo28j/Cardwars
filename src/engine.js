export const freshProfile=()=>({
 version:7,florins:0,buildings:{},deck:[],activeGame:null,collection1300:{},playerColor:'#c6534d',
 packsOpened1300:0,drawn1300:0,lastPack1300:[],
 starterRegion:null,starterRegionClaimed:false,welcomePackClaimed:false,onboardingComplete:false,
 starterCardIds:[],welcomeCardIds:[]
});

export function migrateProfile(p){
 if(!p||typeof p!=='object'||Array.isArray(p))return null;
 if(p.version===7)return p;
 if(p.version===6){
  return {...p,version:7,playerColor:typeof p.playerColor==='string'?p.playerColor:'#c6534d'};
 }
 if(p.version===5){
  return {
   version:7,florins:0,playerColor:'#c6534d',
   buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{},
   deck:[],activeGame:null,
   collection1300:p.collection1300&&typeof p.collection1300==='object'&&!Array.isArray(p.collection1300)?p.collection1300:{},
   packsOpened1300:Number.isSafeInteger(p.packsOpened1300)?p.packsOpened1300:0,
   drawn1300:Number.isSafeInteger(p.drawn1300)?p.drawn1300:0,
   lastPack1300:Array.isArray(p.lastPack1300)?p.lastPack1300:[],
   starterRegion:null,starterRegionClaimed:false,welcomePackClaimed:false,onboardingComplete:false,
   starterCardIds:[],welcomeCardIds:[]
  };
 }
 if([2,3,4].includes(p.version)){
  return {...freshProfile(),buildings:p.buildings&&typeof p.buildings==='object'&&!Array.isArray(p.buildings)?p.buildings:{}};
 }
 return null;
}

export function validateProfile(p){
 if(!p||p.version!==7||!Number.isSafeInteger(p.florins)||p.florins<0||p.florins>1e12)return false;
 if(!p.buildings||typeof p.buildings!=='object'||Array.isArray(p.buildings))return false;
 if(!Array.isArray(p.deck)||p.deck.length>16||p.deck.some(id=>typeof id!=='string'))return false;
 if(p.activeGame!==null&&typeof p.activeGame!=='object')return false;
 if(!p.collection1300||typeof p.collection1300!=='object'||Array.isArray(p.collection1300))return false;
 if(typeof p.playerColor!=='string')return false;
 if(!Number.isSafeInteger(p.packsOpened1300)||p.packsOpened1300<0)return false;
 if(!Number.isSafeInteger(p.drawn1300)||p.drawn1300<0)return false;
 if(!Array.isArray(p.lastPack1300)||!Array.isArray(p.starterCardIds)||!Array.isArray(p.welcomeCardIds))return false;
 if(p.starterRegion!==null&&typeof p.starterRegion!=='string')return false;
 if(typeof p.starterRegionClaimed!=='boolean'||typeof p.welcomePackClaimed!=='boolean'||typeof p.onboardingComplete!=='boolean')return false;
 return true;
}
