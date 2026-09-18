import {CITIES,CITY,PACK,DUPLICATE_COINS} from './data.js';
export function formatNumber(n,kind='people'){
 n=Math.round(Number(n)||0);
 if(kind==='size')return n.toLocaleString('en-GB')+' km²';
 if(kind==='people'&&Math.abs(n)>=10000000)return (n/1000000).toFixed(2)+' mil';
 if(Math.abs(n)>=10000)return (n/1000).toFixed(1)+' K';
 return n.toLocaleString('en-GB');
}
export const freshProfile=()=>({version:2,collection:{},coins:0,packsOpened:0,drawn:0,lastPack:[]});
export function openPack(profile,rng=Math.random){
 const result=[];
 for(let i=0;i<PACK.cards;i++){
  let roll=Math.min(.999999999,Math.max(0,rng()))*100,tier=0;
  for(;tier<4;tier++){if(roll<PACK.odds[tier])break;roll-=PACK.odds[tier];}
  const pool=CITIES.filter(c=>c.rarity===tier);const c=pool[Math.min(pool.length-1,Math.max(0,Math.floor(rng()*pool.length)))];
  const duplicate=!!profile.collection[c.id],coins=duplicate?DUPLICATE_COINS[tier]:0;
  profile.collection[c.id]=(profile.collection[c.id]||0)+1;profile.coins+=coins;result.push({id:c.id,duplicate,coins});
 }
 profile.packsOpened++;profile.drawn+=PACK.cards;profile.lastPack=result;return result;
}
export function validateProfile(p){
 const int=(n,max=1e12)=>Number.isSafeInteger(n)&&n>=0&&n<=max;
 if(!p||p.version!==2||!p.collection||typeof p.collection!=='object'||Array.isArray(p.collection)||!int(p.coins)||!int(p.packsOpened)||!int(p.drawn)||p.drawn!==p.packsOpened*5)return false;
 if(Object.entries(p.collection).some(([id,n])=>!Object.hasOwn(CITY,id)||!int(n)||n===0))return false;
 if(Object.values(p.collection).reduce((a,b)=>a+b,0)!==p.drawn)return false;
 if(!Array.isArray(p.lastPack)||![0,5].includes(p.lastPack.length)||p.lastPack.some(r=>!r||typeof r!=='object'||!Object.hasOwn(CITY,r.id)||!p.collection[r.id]||typeof r.duplicate!=='boolean'||r.coins!==(r.duplicate?DUPLICATE_COINS[CITY[r.id].rarity]:0)))return false;
 return true;
}
