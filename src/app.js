import {CITIES_1300,CITY_1300,SUPPORT_TERRITORIES_1300,RARITIES_1300,RARITY_COLORS_1300,RESEARCH_1300_NOTE} from './data1300.js?v=20260921-england-home-support-v3';
import {freshProfile,migrateProfile,validateProfile} from './engine.js?v=20260921-onboarding-auth-v6';
import {ECONOMY_1300,BUILDINGS_1300,BUILDING_1300,isCoastalCity1300,startingBuildingLevel1300,buildingCost1300} from './buildings1300.js?v=20260921-buildings-v1';
import {icon} from './icons.js';
import {GOOGLE_CLIENT_ID} from './auth-config.js?v=20260921-auth-v1';
import {WorldMap} from './map.js?v=20260921-city-borders-dark-030-060-v9';
const $=s=>document.querySelector(s),app=$('#app'),modal=$('#modal'),
 LEGACY_KEY='cardwars.collection.v2',ACCOUNTS_KEY='cardwars.accounts.v1',SESSION_KEY='cardwars.session.v1',PROFILE_PREFIX='cardwars.profile.';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CITY_DISPLAY_NAMES_1300=new Map([
 ['1300-pozsony','Bratislava'],['1300-kassa','Košice'],['1300-gradec','Gradec'],
 ['1300-oradea','Oradea'],['1300-cluj','Cluj'],['1300-alba-iulia','Alba Iulia'],
 ['1300-sibiu','Sibiu'],['1300-brasov','Brașov'],['1300-stettin','Szczecin'],
 ['1300-saverne','Saverne'],['1300-olbia','Olbia'],['1300-cagliari','Cagliari'],
 ['1300-wroclaw','Wrocław']
]);
const displayCityName1300=c=>CITY_DISPLAY_NAMES_1300.get(c.id)||String(c.name||'').split('/')[0].trim();
const CARD_ART_1300={
 '1300-seville':'assets/cards1300/000-seville.svg',
 '1300-cordoba':'assets/cards1300/001-cordoba.svg',
 '1300-toledo':'assets/cards1300/002-toledo.svg',
 '1300-valladolid':'assets/cards1300/003-valladolid.svg',
 '1300-burgos':'assets/cards1300/004-burgos.svg',
 '1300-murcia':'assets/cards1300/005-murcia.svg',
 '1300-salamanca':'assets/cards1300/006-salamanca.svg',
 '1300-segovia':'assets/cards1300/007-segovia.svg',
 '1300-leon':'assets/cards1300/008-leon.svg',
 '1300-jaen':'assets/cards1300/009-jaen.svg',
 '1300-santiago':'assets/cards1300/010-santiago.svg'
};
let profile=freshProfile(),storageFailed=false,accounts={},currentAccountKey=null,authUser=null,legacyProfile=null;
try{
 accounts=JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||'{}');
 if(!accounts||typeof accounts!=='object'||Array.isArray(accounts))accounts={};
 currentAccountKey=localStorage.getItem(SESSION_KEY);
 if(currentAccountKey&&accounts[currentAccountKey]){
  authUser=accounts[currentAccountKey];
  const raw=localStorage.getItem(PROFILE_PREFIX+currentAccountKey);
  if(raw){const p=migrateProfile(JSON.parse(raw));if(p&&validateProfile(p))profile=p;else storageFailed=true;}
 }else currentAccountKey=null;
 const legacyRaw=localStorage.getItem(LEGACY_KEY);
 if(legacyRaw){const p=migrateProfile(JSON.parse(legacyRaw));if(p&&validateProfile(p))legacyProfile=p;}
}catch{storageFailed=true;accounts={};currentAccountKey=null;authUser=null;}
let view='collection',country1300='all',search1300='',deckCountry='all',deckSearch='',world=null,selected1300='1300-seville',buildingCity='1300-seville',gameScreen='map',atlasRegion=null,atlasSearch='',rankingCategory='overall',toastTimer;
const mapState={selected:selected1300,collection:{}};
const COUNTRIES_1300=[...new Set(CITIES_1300.map(c=>c.country))].sort((a,b)=>a.localeCompare(b));
const STARTER_REGIONS_1300=[
 {id:'iberia',name:'Iberian Region',short:'Iberia',description:'Castile, Aragon, Portugal, Navarre, Granada and the western Mediterranean edge.'},
 {id:'italy',name:'Italian Region',short:'Italy',description:'The Italian peninsula, Alpine approaches and the city-rich northern Italian sphere.'},
 {id:'west',name:'Western Europe',short:'West',description:'France, England, the Low Countries and the western imperial frontier.'},
 {id:'central',name:'Central Europe',short:'Central',description:'The German lands, Bohemia, Austria and the central imperial heartlands.'},
 {id:'east',name:'Eastern Europe',short:'East',description:'Poland, Hungary and the eastern side of the current 1300 map.'}
];
const STARTER_REGION_BY_ID=Object.fromEntries(STARTER_REGIONS_1300.map(r=>[r.id,r]));
function regionForCity1300(c){
 const lat=Number(c.lat),lon=Number(c.lon);
 if(lat<44.8&&lon<4.5)return 'iberia';
 if(lat<46.9&&lon>=6.5&&lon<18.5)return 'italy';
 if(lon<7.5)return 'west';
 if(lon<18)return 'central';
 return 'east';
}
function shuffle1300(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function guaranteedEight1300(pool,exclude=new Set()){
 const result=[],used=new Set(exclude);
 for(const [rarity,count] of [[0,5],[1,2],[2,1]]){
  const available=shuffle1300(pool.filter(c=>c.rarity===rarity&&!used.has(c.id)));
  if(available.length<count)throw new Error('Not enough cards for starter pack');
  available.slice(0,count).forEach(c=>{result.push({id:c.id,duplicate:false});used.add(c.id);});
 }
 return shuffle1300(result);
}
function grantCards1300(cards){for(const r of cards)profile.collection1300[r.id]=(profile.collection1300[r.id]||0)+1;profile.packsOpened1300++;profile.drawn1300+=cards.length;profile.lastPack1300=cards;}
function showStarterPack1300(cards,title,subtitle,nextLabel='Continue'){
 showDialog(`<div class="starter-pack-reveal"><span class="eyebrow">FREE STARTER PACK · 1300 CE</span><h2>${esc(title)}</h2><p>${esc(subtitle)}</p><div class="starter-pack-grid">${cards.map(r=>`<div>${card1300(CITY_1300[r.id],true)}</div>`).join('')}</div><div class="dialog-actions">${button(nextLabel,'close','primary')}</div></div>`,'starter-pack-dialog');
}
function chooseStarterRegion1300(regionId){
 if(profile.starterRegionClaimed)return;
 const region=STARTER_REGION_BY_ID[regionId];if(!region)return;
 const pool=CITIES_1300.filter(c=>regionForCity1300(c)===regionId);
 const cards=guaranteedEight1300(pool);
 grantCards1300(cards);
 profile.starterRegion=regionId;profile.starterRegionClaimed=true;profile.starterCardIds=cards.map(x=>x.id);
 save();render();
 showStarterPack1300(cards,`${region.name} Pack`,'Guaranteed: 5 Common · 2 Uncommon · 1 Rare','Next: free welcome pack');
}
function claimWelcomePack1300(){
 if(!profile.starterRegionClaimed||profile.welcomePackClaimed)return;
 const owned=new Set(Object.keys(profile.collection1300));
 const cards=guaranteedEight1300(CITIES_1300,owned);
 grantCards1300(cards);
 profile.welcomePackClaimed=true;profile.welcomeCardIds=cards.map(x=>x.id);profile.onboardingComplete=true;
 profile.deck=[...profile.starterCardIds,...profile.welcomeCardIds].filter((id,i,a)=>a.indexOf(id)===i).slice(0,16);
 save();view='deck';render();
 showStarterPack1300(cards,'Welcome Pack','Eight extra unique 1300 cards. Your first 16-card deck is ready.','Build my deck');
}

function ensureEconomyProfile(p){
 if(!Number.isSafeInteger(p.florins)||p.florins<0)p.florins=ECONOMY_1300.startFlorins;
 if(!p.buildings||typeof p.buildings!=='object'||Array.isArray(p.buildings))p.buildings={};
 const validBuildings=new Set(BUILDINGS_1300.map(b=>b.id));
 for(const [cityId,levels] of Object.entries({...p.buildings})){
  if(!Object.hasOwn(CITY_1300,cityId)||!levels||typeof levels!=='object'||Array.isArray(levels)){delete p.buildings[cityId];continue;}
  const clean={};
  for(const [buildingId,n] of Object.entries(levels))if(validBuildings.has(buildingId)&&Number.isSafeInteger(n)&&n>0)clean[buildingId]=Math.min(ECONOMY_1300.maxBuildingLevel,n);
  if(Object.keys(clean).length)p.buildings[cityId]=clean;else delete p.buildings[cityId];
 }
}
ensureEconomyProfile(profile);
function ensureGameProfile(p){
 p.collection1300=p.collection1300&&typeof p.collection1300==='object'&&!Array.isArray(p.collection1300)?p.collection1300:{};
 if(!Array.isArray(p.deck))p.deck=[];
 const owned=id=>Object.hasOwn(CITY_1300,id)&&(Number(p.collection1300[id])||0)>0;
 p.deck=[...new Set(p.deck)].filter(owned).slice(0,16);
 if(!Array.isArray(p.starterCardIds))p.starterCardIds=[];
 if(!Array.isArray(p.welcomeCardIds))p.welcomeCardIds=[];
 p.starterCardIds=[...new Set(p.starterCardIds)].filter(owned).slice(0,8);
 p.welcomeCardIds=[...new Set(p.welcomeCardIds)].filter(owned).slice(0,8);
 if(p.activeGame){
  const g=p.activeGame;
  const validDeck=Array.isArray(g.deck)?[...new Set(g.deck)].filter(owned).slice(0,16):[];
  const validHand=Array.isArray(g.hand)?[...new Set(g.hand)].filter(id=>validDeck.includes(id)).slice(0,4):[];
  if(validDeck.length!==16||validHand.length!==4)p.activeGame=null;
  else p.activeGame={date:'1300-01-01',deck:validDeck,hand:validHand};
 }
}
ensureGameProfile(profile);
function toggleDeckCard1300(id){
 if(profile.activeGame){toast('Quit the active campaign before changing your deck.');return;}
 if(!Object.hasOwn(CITY_1300,id)||(Number(profile.collection1300[id])||0)<=0){toast('You can only use cards you own.');return;}
 const i=profile.deck.indexOf(id);
 if(i>=0)profile.deck.splice(i,1);
 else if(profile.deck.length<16)profile.deck.push(id);
 else{toast('Your deck already contains 16 cards. Remove one first.');return;}
 save();render();
}
function startGame1300(){
 if(profile.deck.length!==16){toast(`Choose exactly 16 owned cards first. You currently have ${profile.deck.length}.`);return;}
 const shuffled=shuffle1300(profile.deck);
 profile.activeGame={date:'1300-01-01',deck:[...profile.deck],hand:shuffled.slice(0,4)};
 selected1300=profile.activeGame.hand[0];mapState.selected=selected1300;gameScreen='map';save();navigate('game');
}

const purchasedBuildingLevel=(cityId,buildingId)=>Math.max(0,Number(profile.buildings?.[cityId]?.[buildingId])||0);
function cityBuildingState(c){
 const bonuses={food:0,economy:0,technology:0,stability:0,army:0,navy:0,income:0};
 const buildings=BUILDINGS_1300.map(b=>{
  const historical=startingBuildingLevel1300(c,b.id),purchased=purchasedBuildingLevel(c.id,b.id),level=Math.min(ECONOMY_1300.maxBuildingLevel,historical+purchased);
  for(const [key,value] of Object.entries(b.effects))bonuses[key]=(bonuses[key]||0)+value*level;
  return {...b,historical,purchased,level,cost:level<ECONOMY_1300.maxBuildingLevel?buildingCost1300(b,level):null};
 });
 return {buildings,bonuses,totalLevels:buildings.reduce((sum,b)=>sum+b.level,0),historicalLevels:buildings.reduce((sum,b)=>sum+b.historical,0)};
}
function buildingEffectText(b){
 const labels={food:'Food',economy:'Economy',technology:'Technology',stability:'Stability',army:'Professional army',navy:'Navy',income:'Annual income'};
 return Object.entries(b.effects).map(([key,value])=>`${labels[key]} ${value>0?'+':''}${value}${key==='income'?' ƒ':''}`).join(' · ');
}
function buildBuilding1300(cityId,buildingId){
 const c=CITY_1300[cityId],building=BUILDING_1300[buildingId];if(!c||!building)return;
 const state=cityBuildingState(c),row=state.buildings.find(b=>b.id===buildingId);if(!row||row.level>=ECONOMY_1300.maxBuildingLevel)return;
 if(building.requiresCoast&&!isCoastalCity1300(c)){toast('A Royal Dockyard requires a coastal or major port city.');return;}
 if(profile.florins<row.cost){toast(`You need ${(row.cost-profile.florins).toLocaleString('en-GB')} more florins.`);return;}
 profile.florins-=row.cost;
 profile.buildings[c.id]??={};profile.buildings[c.id][buildingId]=(profile.buildings[c.id][buildingId]||0)+1;
 save();render();toast(`${building.name} expanded in ${displayCityName1300(c)} for ${row.cost.toLocaleString('en-GB')} florins.`);
}

const countryRankings1300=()=>{
 const grouped=new Map();
 for(const c of [...CITIES_1300,...SUPPORT_TERRITORIES_1300]){
  const entry=grouped.get(c.country)||{country:c.country,cities:[],supportTerritories:[],population:0,army:0,navy:0,foodTotal:0,economyTotal:0,technologyTotal:0,stabilityTotal:0};
  entry.cities.push(c);
  if(c.supportTerritory)entry.supportTerritories.push(c);
  entry.population+=Number(c.people)||0;
  entry.army+=Number(c.army)||0;
  entry.navy+=Number(c.navy)||0;
  entry.foodTotal+=Number(c.food)||0;
  entry.economyTotal+=Number(c.economyScore)||0;
  entry.technologyTotal+=Number(c.technology)||0;
  entry.stabilityTotal+=Number(c.stability)||0;
  grouped.set(c.country,entry);
 }
 return [...grouped.values()].map(entry=>{
  const cityCount=entry.cities.length||1;
  const playableCityCount=entry.cities.filter(c=>!c.supportTerritory).length;
  const foodAvg=Math.round(entry.foodTotal/cityCount);
  const economyAvg=Math.round(entry.economyTotal/cityCount);
  const technologyAvg=Math.round(entry.technologyTotal/cityCount);
  const stabilityAvg=Math.round(entry.stabilityTotal/cityCount);
  const foodScore=foodAvg*50,economyScore=economyAvg*50,technologyScore=technologyAvg*50,stabilityScore=stabilityAvg*50;
  const populationScore=Math.round(entry.population/50),armyScore=Math.round(entry.army*2),navyScore=Math.round(entry.navy*10);
  const baseScore=foodScore+economyScore+technologyScore+stabilityScore+populationScore+armyScore+navyScore;
  const cityMultiplier=1+cityCount/50;
  const strength=Math.round(baseScore*cityMultiplier);
  return {...entry,cityCount,playableCityCount,foodAvg,economyAvg,technologyAvg,stabilityAvg,foodScore,economyScore,technologyScore,stabilityScore,populationScore,armyScore,navyScore,baseScore,cityMultiplier,strength};
 }).sort((a,b)=>b.strength-a.strength||a.country.localeCompare(b.country)).map((entry,i)=>({...entry,rank:i+1}));
};
const RANKING_CATEGORIES_1300=[
 ['overall','Overall','strength','Total strength'],
 ['food','Food','foodAvg','Average /100'],
 ['economy','Economy','economyAvg','Average /100'],
 ['technology','Technology','technologyAvg','Average /100'],
 ['stability','Stability','stabilityAvg','Average /100'],
 ['population','Population','population','Total population'],
 ['army','Army','army','Total army'],
 ['navy','Navy','navy','Total navy']
];
const strengthNumber=n=>Math.round(n).toLocaleString('en-GB');
const rankingCategoryMeta=()=>RANKING_CATEGORIES_1300.find(([id])=>id===rankingCategory)||RANKING_CATEGORIES_1300[0];
const rankingRows1300=()=>{
 const [,label,key,unit]=rankingCategoryMeta();
 const rows=countryRankings1300().sort((a,b)=>b[key]-a[key]||b.strength-a.strength||a.country.localeCompare(b.country));
 return {label,key,unit,rows:rows.map((r,i)=>({...r,categoryRank:i+1,categoryValue:r[key]}))};
};
function button(text,action,cls='secondary',extra=''){return `<button class="btn ${cls}" data-action="${action}" ${extra}>${text}</button>`;}
function toast(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4200);}
function save(){
 if(!authUser||!currentAccountKey)return;
 try{localStorage.setItem(PROFILE_PREFIX+currentAccountKey,JSON.stringify(profile));}
 catch{storageFailed=true;toast('Browser storage is unavailable. Export your campaign from the guide.');}
}
function saveAccounts(){try{localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(accounts));}catch{storageFailed=true;}}
async function codeHash(name,code){
 const bytes=new TextEncoder().encode(name.toLowerCase()+'|'+code);
 const hash=await crypto.subtle.digest('SHA-256',bytes);
 return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function loginPage(){return `<main class="login-page"><section class="login-card"><div class="login-brand"><span class="brand-mark">${icon('crown')}</span><div><strong>CARDWARS</strong><small>THE AGE OF REALMS</small></div></div><span class="eyebrow">PLAYER PROFILE</span><h1>Enter the realm<span class="title-dot">.</span></h1><p>Use a player name and private code for a local profile on this device, or continue with Google once a Google OAuth Client ID is configured.</p><label>Player name<input id="login-name" maxlength="28" autocomplete="username" placeholder="Your name"></label><label>Code<input id="login-code" type="password" maxlength="32" autocomplete="current-password" placeholder="At least 4 characters"></label><button class="btn primary login-continue" data-action="auth-local">Continue</button><div class="login-separator"><span>or</span></div><div id="google-signin" class="google-signin-slot">${GOOGLE_CLIENT_ID?'Loading Google sign-in…':'<button disabled>Continue with Google</button><small>Add your Google OAuth Client ID to src/auth-config.js to activate this.</small>'}</div><small class="login-footnote">Local name + code accounts are stored only in this browser. They are a prototype login, not server-backed authentication.</small></section></main>`;}
function persistSession(key){currentAccountKey=key;authUser=accounts[key];localStorage.setItem(SESSION_KEY,key);}
function loadAccountProfile(key){
 const raw=localStorage.getItem(PROFILE_PREFIX+key);
 if(raw){const p=migrateProfile(JSON.parse(raw));if(p&&validateProfile(p))return p;}
 return freshProfile();
}
async function localAuth(){
 const name=$('#login-name')?.value.trim(),code=$('#login-code')?.value||'';
 if(!name||name.length<2){toast('Enter a player name of at least 2 characters.');return;}
 if(code.length<4){toast('Your code needs at least 4 characters.');return;}
 const key='local:'+name.toLowerCase(),hash=await codeHash(name,code),existing=accounts[key];
 if(existing&&existing.codeHash!==hash){toast('That code is not correct for this player name.');return;}
 if(!existing){
  accounts[key]={type:'local',name,codeHash:hash};
  saveAccounts();
  const firstLocal=Object.keys(accounts).filter(k=>k.startsWith('local:')).length===1;
  profile=firstLocal&&legacyProfile?legacyProfile:freshProfile();
 }else profile=loadAccountProfile(key);
 persistSession(key);ensureEconomyProfile(profile);ensureGameProfile(profile);save();render();
}
function decodeGoogleCredential(token){try{const payload=token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(decodeURIComponent(atob(payload).split('').map(c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('')));}catch{return null;}}
function handleGoogleCredential(response){
 const p=decodeGoogleCredential(response.credential);if(!p?.sub)return;
 const key='google:'+p.sub;
 accounts[key]={type:'google',name:p.name||p.email||'Google player',email:p.email||''};saveAccounts();
 profile=loadAccountProfile(key);persistSession(key);ensureEconomyProfile(profile);ensureGameProfile(profile);save();render();
}
function loadGoogleScript(){return new Promise((resolve,reject)=>{if(window.google?.accounts?.id)return resolve();const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;s.defer=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
async function setupGoogleLogin(){
 if(!GOOGLE_CLIENT_ID||!$('#google-signin'))return;
 try{await loadGoogleScript();if(!$('#google-signin'))return;google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:handleGoogleCredential});$('#google-signin').innerHTML='';google.accounts.id.renderButton($('#google-signin'),{theme:'outline',size:'large',width:320,text:'continue_with'});}catch{if($('#google-signin'))$('#google-signin').textContent='Google sign-in could not load.';}
}
function logoutAccount(){try{localStorage.removeItem(SESSION_KEY);}catch{}currentAccountKey=null;authUser=null;profile=freshProfile();view='collection';render();}
function onboardingPage(){
 const region=STARTER_REGION_BY_ID[profile.starterRegion];
 if(!profile.starterRegionClaimed)return `<main class="onboarding-page"><section class="onboarding-intro"><span class="eyebrow">FIRST CAMPAIGN · FREE STARTER PACK 1/2</span><h1>Choose your region<span class="title-dot">.</span></h1><p>Your region pack contains exactly <strong>5 Common, 2 Uncommon and 1 Rare</strong> city from that part of Europe.</p></section><section class="region-choice-grid">${STARTER_REGIONS_1300.map(r=>{const pool=CITIES_1300.filter(c=>regionForCity1300(c)===r.id);return `<button data-action="starter-region" data-id="${r.id}"><span>${r.short}</span><strong>${r.name}</strong><p>${r.description}</p><small>${pool.length} possible 1300 cards · 8 free starter cards</small></button>`;}).join('')}</section></main>`;
 return `<main class="onboarding-page welcome-pack-page"><section class="welcome-pack-card"><span class="eyebrow">FREE STARTER PACK 2/2</span><h1>Your ${esc(region?.name||'regional')} cards are secured<span class="title-dot">.</span></h1><p>Now open one final free 8-card welcome pack. It avoids every card you already received, so your first two packs give you <strong>16 unique owned cards</strong> — exactly enough for your first deck.</p><div class="starter-progress"><span class="done">1 <small>REGION PACK</small></span><i></i><span>2 <small>WELCOME PACK</small></span></div><button class="btn primary large-button" data-action="starter-welcome">Open free welcome pack ${icon('arrow')}</button></section></main>`;
}
function flag(){return `<span class="realm-sigil" aria-hidden="true">${icon('crown')}</span>`;}
function header(){return `<header class="lobby-header"><button class="brand" data-action="collection" aria-label="Cardwars home"><span class="brand-mark">${icon('crown')}</span><span>CARDWARS<small>THE AGE OF REALMS</small></span></button><nav aria-label="Main navigation">${[['collection','cards','Collection'],['packs','pack','Packs'],['deck','cards','Deck'],['game','army','Game'],['rankings','star','Rankings'],['atlas','globe','Map']].map(([id,i,label])=>`<button class="${view===id?'active':''}" data-action="${id}">${icon(i)}<span>${label}</span></button>`).join('')}</nav><div class="header-tools"><span class="seal-count campaign-florins" title="Campaign treasury"><b>ƒ</b> <strong id="florin-total">${profile.florins.toLocaleString('en-GB')}</strong> <small>florins</small></span><button class="player-chip" data-action="logout" title="Log out"><strong>${esc(authUser?.name||'Player')}</strong><small>Log out</small></button><button class="reset-button" data-action="reset" title="Reset 1300 campaign progress">Reset</button><button class="icon-btn" data-action="help" aria-label="Game guide and saves">${icon('help')}</button></div></header>`;}
function footer(){const era=view==='rankings'?'COUNTRY STRENGTH · c. 1300 CE':'EUROPE · c. 1300 CE';return `<footer class="lobby-footer"><span>${era}</span><span class="save-note">${icon('save')} ${storageFailed?'Export a save to keep your progress':'Saved on this device'}</span><button data-action="sources">Historical notes & sources ${icon('arrow')}</button></footer>`;}
function stat(key,label,value){const icons={food:'wheat',army:'army',navy:'navy',people:'people',size:'size',technology:'tech',satisfaction:'happy'};return `<div class="stat"><span>${icon(icons[key])}${label}</span><strong>${value}</strong></div>`;}
function card1300(c,compact=false){const displayName=displayCityName1300(c),number=String(CITIES_1300.findIndex(x=>x.id===c.id)).padStart(3,'0'),upgraded=Number.isFinite(c.economyScore)&&Number.isFinite(c.stability),scores=upgraded?[['Food',c.food],['Economy',c.economyScore],['Technology',c.technology],['Stability',c.stability]]:[['Food',c.food],['Technology',c.technology],['Satisfaction',c.satisfaction]],art=CARD_ART_1300[c.id];return `<button class="city-card card-1300 rarity-${c.rarity} ${compact?'compact':''}" style="--rarity:${RARITY_COLORS_1300[c.rarity]}" data-action="card1300" data-id="${c.id}" aria-label="Inspect ${esc(displayName)}, ${esc(c.country)}, c. 1300"><div class="card-photo ${art?'card-photo-1300-art':'card-photo-placeholder'}">${art?`<img src="${art}" alt="Stylised historical reconstruction of ${esc(displayName)} around 1300" loading="${compact?'eager':'lazy'}">`:`<div class="photo-placeholder"><span>${icon('globe')}</span><strong>IMAGE RESERVED</strong><small>Historical artwork will be added later</small></div>`}<span class="rarity-chip">${icon(c.rarity>2?'star':'globe')}${RARITIES_1300[c.rarity]}</span><span class="card-number">1300-${number}</span><div class="card-city"><span class="card-country">${flag(c)} ${c.country}</span><h3 class="${displayName.length>16?'long-name':''}">${displayName}</h3><small>${c.subrealm} · c. 1300 CE</small></div></div><div class="card-stats">${stat('army','Army',c.armyText)}${stat('navy','Navy',c.navyText)}${stat('people','People',c.populationText)}${stat('size','Size',c.sizeText)}<div class="card-scores ${upgraded?'card-scores-4':''}">${scores.map(([label,n])=>`<div><span>${label}</span><strong>${n}<small>/100</small></strong><i style="--value:${n}%"></i></div>`).join('')}</div></div><div class="card-foot"><span>${icon('check')} Researched 1300 card</span><span>Population confidence: ${c.populationConfidence}</span></div></button>`;}
function render(){world?.destroy();world=null;if(!authUser){app.className='lobby auth-view';app.innerHTML=loginPage();setupGoogleLogin();return;}if(!profile.onboardingComplete){app.className='lobby onboarding-view';app.innerHTML=onboardingPage();return;}const campaignMap=view==='game'&&!!profile.activeGame&&gameScreen==='map';app.className=view==='atlas'?'lobby atlas-view':campaignMap?'lobby atlas-view game-campaign-view':'lobby';app.innerHTML=header()+(view==='collection'?collectionPage():view==='packs'?packs1300Page():view==='deck'?deckPage():view==='game'?gamePage():view==='rankings'?rankingsPage():atlasPage())+((view==='atlas'||campaignMap)?'':footer());if(view==='collection')renderGrid();if(view==='atlas'){renderAtlasPanel();mapState.selected=selected1300;mapState.collection={};world=new WorldMap($('#map-host'),mapState,id=>{selected1300=id;mapState.selected=id;atlasRegion=null;renderAtlasPanel();world.refresh();app.classList.add('show-panel');},region=>{atlasRegion=region;atlasSearch='';renderAtlasPanel();app.classList.add('show-panel');});}if(campaignMap){mapState.selected=selected1300;mapState.collection={};world=new WorldMap($('#game-map-host'),mapState,id=>{selected1300=id;mapState.selected=id;world.refresh();},()=>{});}}
const PACK_ODDS_1300=[40,30,17,9,4],PACK_PRICE_1300=200;
function owned1300Count(){return Object.keys(profile.collection1300||{}).length;}
function drawPack1300(){
 if(profile.florins<PACK_PRICE_1300){toast(`You need ${(PACK_PRICE_1300-profile.florins).toLocaleString('en-GB')} more florins for this pack.`);return null;}
 profile.florins-=PACK_PRICE_1300;
 const cards=[];
 for(let i=0;i<5;i++){
  let roll=Math.random()*100,tier=0;
  for(;tier<PACK_ODDS_1300.length-1;tier++){if(roll<PACK_ODDS_1300[tier])break;roll-=PACK_ODDS_1300[tier];}
  let pool=CITIES_1300.filter(c=>c.rarity===tier);
  if(!pool.length)pool=CITIES_1300;
  const c=pool[Math.floor(Math.random()*pool.length)];
  const duplicate=!!profile.collection1300[c.id];
  profile.collection1300[c.id]=(profile.collection1300[c.id]||0)+1;
  cards.push({id:c.id,duplicate});
 }
 profile.packsOpened1300++;
 profile.drawn1300+=cards.length;
 profile.lastPack1300=cards;
 save();
 return cards;
}
function showPack1300(cards){
 const fresh=cards.filter(x=>!x.duplicate).length;
 showDialog(`<div class="pack1300-reveal"><span class="eyebrow">1300 EUROPE PACK</span><h2>${fresh?fresh+' new '+(fresh===1?'city':'cities'):'Five familiar cities'}</h2><p>Every card in this pack comes from the active c. 1300 collection.</p><div class="pack1300-reveal-grid">${cards.map(r=>{const c=CITY_1300[r.id];return `<div class="pack1300-reveal-card">${card1300(c,true)}<span class="${r.duplicate?'duplicate':''}">${r.duplicate?'DUPLICATE':'NEW CARD'}</span></div>`;}).join('')}</div><div class="dialog-actions">${button('Close','close')}${button('Buy another pack · ƒ200','open-pack-1300','primary')}</div></div>`,'pack1300-dialog');
}
function packs1300Page(){
 const canBuy=profile.florins>=PACK_PRICE_1300;
 return `<main class="packs1300-page">
  <div class="page-title packs1300-title"><div><span class="eyebrow">PACKS · c. 1300 CE</span><h1>Grow your collection<span class="title-dot">.</span></h1><p>Your two starter packs were free once. From now on the standard Common Pack costs <strong>ƒ200</strong> and contains only packable 1300 city cards.</p></div><div class="pack1300-count"><strong>${owned1300Count()}<small>/${CITIES_1300.length}</small></strong><span>UNIQUE 1300 CARDS OWNED</span></div></div>
  <div class="packs1300-layout">
   <section class="pack1300-stage"><div class="pack1300-orbit"></div><div class="pack1300-art"><span>THE AGE OF REALMS</span><i>${icon('crown')}</i><strong>COMMON PACK</strong><b>ƒ200</b><small>5 CITY CARDS · 1300</small></div></section>
   <section class="pack1300-copy"><span class="eyebrow">STANDARD PAID PACK</span><h2>Common Pack</h2><p>Draw five cards from the researched 1300 set. The hidden England support territory and every other non-playable support entry are excluded.</p><div class="pack1300-highlights"><span>${icon('cards')} 5 cards per pack</span><span>${icon('coins')} Cost: ƒ200</span><span>${icon('globe')} ${CITIES_1300.length} packable cities</span></div><button class="btn primary large-button" data-action="open-pack-1300" ${canBuy?'':'disabled'}><span>${canBuy?'Buy Common Pack':'Not enough florins'}</span><strong>ƒ200</strong></button><div class="pack1300-stats"><span><strong>${profile.packsOpened1300}</strong><small>PACKS OPENED</small></span><span><strong>${profile.drawn1300}</strong><small>CARDS DRAWN</small></span><span><strong>${owned1300Count()}</strong><small>UNIQUE OWNED</small></span></div>${profile.lastPack1300.length?'<button class="text-btn" data-action="last-pack-1300">View last pack</button>':''}</section>
   <aside class="pack1300-odds"><span class="eyebrow">RARITY ODDS</span><h3>Five independent draws.</h3>${RARITIES_1300.map((name,i)=>`<div><span>${name}</span><strong>${PACK_ODDS_1300[i]}%</strong></div>`).join('')}</aside>
  </div>
 </main>`;
}
function deckPage(){
 const locked=!!profile.activeGame,q=deckSearch.toLowerCase().trim();
 const list=CITIES_1300.filter(c=>(Number(profile.collection1300[c.id])||0)>0&&(deckCountry==='all'||c.country===deckCountry)&&(!q||`${c.name} ${c.country} ${c.subrealm}`.toLowerCase().includes(q))).sort((a,b)=>profile.deck.includes(a.id)-profile.deck.includes(b.id)||b.rarity-a.rarity||b.people-a.people);
 const selected=profile.deck.map(id=>CITY_1300[id]).filter(Boolean);
 return `<main class="deck-page">
  <div class="page-title deck-title"><div><span class="eyebrow">YOUR CAMPAIGN DECK · 1300 CE</span><h1>Build your deck<span class="title-dot">.</span></h1><p>Choose exactly 16 owned city cards. When a campaign starts, four random cities from these 16 become your opening hand.</p></div><div class="deck-counter ${profile.deck.length===20?'ready':''}"><strong>${profile.deck.length}<small>/16</small></strong><span>${profile.deck.length===16?'READY TO PLAY':'CARDS SELECTED'}</span></div></div>
  ${locked?`<div class="deck-lock-note">${icon('lock')}<div><strong>Deck locked</strong><p>A campaign is currently active. End it from the Game tab before changing these 20 cards.</p></div></div>`:''}
  <section class="deck-selected-strip">
   <div class="deck-strip-head"><span>Selected deck</span><strong>${profile.deck.length}/16</strong></div>
   <div class="deck-slots">${Array.from({length:16},(_,i)=>{const c=selected[i];return c?`<button data-action="deck-toggle" data-id="${c.id}" ${locked?'disabled':''} title="${esc(displayCityName1300(c))}"><b>${String(CITIES_1300.findIndex(x=>x.id===c.id)).padStart(3,'0')}</b><span>${esc(displayCityName1300(c))}</span></button>`:`<i><b>${String(i+1).padStart(2,'0')}</b><span>Empty</span></i>`;}).join('')}</div>
  </section>
  <div class="deck-toolbar">
   <label class="search-input">${icon('search')}<input id="deck-search" aria-label="Search deck cards" placeholder="Find a city…" value="${esc(deckSearch)}"></label>
   <select id="deck-country-filter" aria-label="Filter deck cards by realm"><option value="all">All realms</option>${COUNTRIES_1300.map(name=>`<option value="${esc(name)}" ${deckCountry===name?'selected':''}>${esc(name.replace('Crown of ','').replace('Kingdom of ','').replace('Emirate of ',''))}</option>`).join('')}</select>
   <span>${list.length} available cards</span>
  </div>
  <section class="deck-card-grid">${list.map(c=>{const selectedCard=profile.deck.includes(c.id),art=CARD_ART_1300[c.id];return `<button class="deck-choice ${selectedCard?'selected':''}" data-action="deck-toggle" data-id="${c.id}" ${locked?'disabled':''}>
   <div class="deck-choice-art" ${art?`style="background-image:linear-gradient(0deg,#15211dee,#15211d22),url('${art}')"`:''}><span>${RARITIES_1300[c.rarity]}</span><b>1300-${String(CITIES_1300.findIndex(x=>x.id===c.id)).padStart(3,'0')}</b></div>
   <div class="deck-choice-copy"><strong>${esc(displayCityName1300(c))}</strong><small>${esc(c.country)}</small><span>F ${c.food} · E ${c.economyScore} · T ${c.technology} · S ${c.stability}</span></div>
   <i>${selectedCard?'✓':'+'}</i>
  </button>`;}).join('')}</section>
 </main>`;
}
function collectionPage(){return collection1300Page();}
function collection1300Page(){return `<main class="collection-page collection-1300-page">
 <section class="collection-hero-1300">
  <div class="collection-hero-copy">
   <span class="eyebrow">THE 1300 RESEARCH EDITION · EUROPE</span>
   <h1>The collection<span class="title-dot">.</span></h1>
   <p>${CITIES_1300.length} researched medieval city cards across ${COUNTRIES_1300.length} realms and political entities.</p>
   <div class="collection-hero-tags"><span>c. 1300 CE</span><span>Historical research set</span><span>Europe</span></div>
  </div>
  <div class="collection-progress research-progress collection-progress-1300">
   <strong>${String(CITIES_1300.length).padStart(3,'0')}</strong>
   <span>RESEARCHED CARDS</span>
   <div><i style="width:100%"></i></div>
   <small>${COUNTRIES_1300.length} realms represented</small>
  </div>
 </section>
 <div class="research-notice research-notice-1300">${icon('help')}<div><strong>Historical accuracy note</strong><p>Population figures are historical estimates. Army, navy and the four 0–100 scores are comparative Cardwars gameplay values calibrated across the c. 1300 set.</p></div></div>
 <div class="collection-toolbar collection-toolbar-1300">
  <div class="segmented collection-all-segment"><button class="${country1300==='all'?'active':''}" data-action="country1300" data-id="all">All cities <small>${CITIES_1300.length}</small></button></div>
  <div class="filters collection-filters-1300">
   <label class="search-input">${icon('search')}<input id="city-search-1300" aria-label="Search 1300 cards" placeholder="Find a city…" value="${esc(search1300)}"></label>
   <select id="country-filter-1300" aria-label="Filter by 1300 realm"><option value="all">All realms</option>${COUNTRIES_1300.map(name=>`<option value="${esc(name)}" ${country1300===name?'selected':''}>${esc(name.replace('Crown of ','').replace('Kingdom of ','').replace('Emirate of ',''))} (${CITIES_1300.filter(c=>c.country===name).length})</option>`).join('')}</select>
  </div>
 </div>
 <div class="collection-meta collection-meta-1300"><span id="result-count"></span><span>Research edition · c. 1300 CE</span></div>
 <div id="card-grid" class="card-grid"></div>
</main>`;}
function renderGrid(){render1300Grid();}
function render1300Grid(){const q=search1300.toLowerCase().trim(),list=CITIES_1300.filter(c=>(country1300==='all'||c.country===country1300)&&(!q||`${c.name} ${c.country} ${c.subrealm} ${c.historicalRole} ${c.economy}`.toLowerCase().includes(q))).sort((a,b)=>b.rarity-a.rarity||b.people-a.people);$('#result-count').textContent=`${list.length} ${list.length===1?'card':'cards'}`;$('#card-grid').innerHTML=list.length?list.map(c=>card1300(c)).join(''):`<div class="no-results">${icon('search')}<h3>No 1300 cards found</h3><p>Try another city or historical role.</p></div>`;}
function developmentPage(){
 const c=CITY_1300[buildingCity]||CITIES_1300[0];buildingCity=c.id;
 const state=cityBuildingState(c),b=state.bonuses;
 const developed={food:Math.min(100,c.food+b.food),economy:Math.min(100,c.economyScore+b.economy),technology:Math.min(100,c.technology+b.technology),stability:Math.min(100,c.stability+b.stability),army:c.army+b.army,navy:c.navy+b.navy};
 const countryOptions=COUNTRIES_1300.map(countryName=>`<optgroup label="${esc(countryName)}">${CITIES_1300.filter(x=>x.country===countryName).sort((a,z)=>displayCityName1300(a).localeCompare(displayCityName1300(z))).map(x=>`<option value="${x.id}" ${x.id===c.id?'selected':''}>${esc(displayCityName1300(x))}</option>`).join('')}</optgroup>`).join('');
 const statBox=(label,base,value)=>`<div><span>${label}</span><strong>${strengthNumber(value)}</strong><small>Base ${strengthNumber(base)}${value!==base?` · +${strengthNumber(value-base)} buildings`:''}</small></div>`;
 return `<main class="buildings-page">
  <div class="game-subnav"><button data-action="game-map">← Back to campaign map</button></div><div class="page-title buildings-title"><div><span class="eyebrow">CAMPAIGN ECONOMY · c. 1300 CE</span><h1>Build the realm<span class="title-dot">.</span></h1><p>Develop provinces with farms, workshops, military infrastructure and institutions. Historical starting buildings are free; new construction is paid from the campaign treasury.</p></div><div class="treasury-card"><span>TREASURY</span><strong>ƒ ${profile.florins.toLocaleString('en-GB')}</strong><small>Florins · construction currency</small></div></div>
  <div class="building-system-note">${icon('help')}<div><strong>Campaign prototype</strong><p>Buildings currently modify the local campaign version of a city. Historical country rankings remain based on the researched 1300 baseline, so construction does not rewrite the historical scoreboard yet.</p></div></div>
  <section class="city-development-head">
   <div><span class="eyebrow">DEVELOP A PROVINCE</span><h2>${esc(displayCityName1300(c))}</h2><p>${esc(c.country)} · ${esc(c.subrealm)}</p></div>
   <label>Selected province<select id="building-city-select">${countryOptions}</select></label>
  </section>
  <div class="development-overview">
   <span><strong>${state.totalLevels}</strong><small>BUILDING LEVELS</small></span>
   <span><strong>${state.historicalLevels}</strong><small>HISTORICAL START LEVELS</small></span>
   <span><strong>${b.income>=0?'+':''}${strengthNumber(b.income)} ƒ</strong><small>BUILDING INCOME / YEAR</small></span>
   <span><strong>${isCoastalCity1300(c)?'YES':'NO'}</strong><small>NAVAL CONSTRUCTION</small></span>
  </div>
  <section class="developed-stats">
   ${statBox('Food',c.food,developed.food)}
   ${statBox('Economy',c.economyScore,developed.economy)}
   ${statBox('Technology',c.technology,developed.technology)}
   ${statBox('Stability',c.stability,developed.stability)}
   ${statBox('Professional army',c.army,developed.army)}
   ${statBox('Navy',c.navy,developed.navy)}
  </section>
  <div class="building-catalog-head"><div><span class="eyebrow">BUILDING CATALOGUE</span><h2>10 province buildings</h2></div><p>Maximum level ${ECONOMY_1300.maxBuildingLevel}. Costs rise as a building becomes more developed.</p></div>
  <section class="building-grid">
   ${state.buildings.map(row=>{const blocked=row.requiresCoast&&!isCoastalCity1300(c),maxed=row.level>=ECONOMY_1300.maxBuildingLevel,canAfford=!maxed&&!blocked&&profile.florins>=row.cost;return `<article class="building-card ${blocked?'blocked':''} ${maxed?'maxed':''}">
    <div class="building-card-top"><span class="building-category">${esc(row.category)}</span><span class="building-level">LEVEL ${row.level}/${ECONOMY_1300.maxBuildingLevel}</span></div>
    <h3>${esc(row.name)}</h3><p>${esc(row.description)}</p>
    <div class="building-effects">${esc(buildingEffectText(row))}</div>
    <div class="building-origin"><span>Historical start <strong>${row.historical}</strong></span><span>Player built <strong>${row.purchased}</strong></span></div>
    <div class="building-level-pips">${Array.from({length:ECONOMY_1300.maxBuildingLevel},(_,i)=>`<i class="${i<row.level?'filled':''}"></i>`).join('')}</div>
    ${maxed?'<button disabled>MAX LEVEL</button>':blocked?'<button disabled>REQUIRES PORT / COAST</button>':`<button class="${canAfford?'can-build':''}" data-action="build-building" data-id="${row.id}" data-city="${c.id}"><span>Build level ${row.level+1}</span><strong>ƒ ${row.cost.toLocaleString('en-GB')}</strong></button>`}
   </article>`;}).join('')}
  </section>
 </main>`;
}
function gamePage(){
 if(!profile.activeGame){
  const selected=profile.deck.map(id=>CITY_1300[id]).filter(Boolean);
  return `<main class="game-start-page"><div class="game-start-card"><span class="eyebrow">NEW CAMPAIGN · 1300 CE</span><h1>Ready for war<span class="title-dot">.</span></h1><p>Your campaign begins on <strong>1 January 1300</strong>. Four random cities are drawn from your 16-card deck as your opening hand.</p><div class="game-deck-status"><span><strong>${profile.deck.length}</strong><small>/20 cards</small></span><div><b style="width:${Math.min(100,profile.deck.length/16*100)}%"></b></div></div><div class="game-start-preview">${selected.slice(0,8).map(c=>`<span>${esc(displayCityName1300(c))}</span>`).join('')}${selected.length>8?`<span>+${selected.length-8} more</span>`:''}</div><div class="game-start-actions"><button class="btn primary large-button" data-action="start-game" ${profile.deck.length===16?'':'disabled'}><span>Start Game</span>${icon('arrow')}</button>${profile.deck.length===16?'':`<button class="text-btn" data-action="deck">Choose your 16-card deck</button>`}</div></div></main>`;
 }
 if(gameScreen==='development')return developmentPage();
 const hand=profile.activeGame.hand.map(id=>CITY_1300[id]).filter(Boolean);
 return `<div class="game-map-shell"><main class="map-surface" id="game-map-host"></main>
  <div class="game-date-panel"><span>CAMPAIGN DATE</span><strong>1 January</strong><small>1300</small></div>
  <div class="game-map-actions"><button data-action="game-development">Development</button></div><button class="game-quit-button" data-action="quit-game">Quit</button>
  <section class="game-hand"><div class="game-hand-label"><span>YOUR HAND</span><strong>4 / 16</strong></div><div class="game-hand-cards">${hand.map(c=>`<button data-action="game-hand-card" data-id="${c.id}"><span class="hand-rarity">${RARITIES_1300[c.rarity]}</span><strong>${esc(displayCityName1300(c))}</strong><small>${esc(c.country)}</small><i>F ${c.food} · E ${c.economyScore} · T ${c.technology} · S ${c.stability}</i></button>`).join('')}</div></section>
 </div>`;
}
function rankingsPage(){
 const overall=countryRankings1300(),leader=overall[0],board=rankingRows1300(),meta=rankingCategoryMeta();
 const categoryValue=(r,key)=>key==='strength'?strengthNumber(r.strength):['foodAvg','economyAvg','technologyAvg','stabilityAvg'].includes(key)?strengthNumber(r[key])+'/100':strengthNumber(r[key]);
 return `<main class="rankings-page">
  <div class="page-title rankings-title"><div><span class="eyebrow">COUNTRY POWER · c. 1300 CE</span><h1>Rankings<span class="title-dot">.</span></h1><p>Country strength now uses national averages for the four 0–100 stats, total population, army and navy, followed by a bonus for the number of cities.</p></div><div class="ranking-leader"><span>#1 OVERALL</span><strong>${esc(leader?.country||'—')}</strong><small>${leader?strengthNumber(leader.strength):'—'} strength</small></div></div>
  <div class="ranking-formula">${icon('help')}<div><strong>Country strength formula</strong><p><b>(Average Food × 50 + Average Economy × 50 + Average Technology × 50 + Average Stability × 50 + Total Population ÷ 50 + Total Army × 2 + Total Navy × 10) × city bonus.</b> The city bonus is <b>1 + (cities × 0.02)</b>, so 12 cities = <b>×1.24</b> and 4 cities = <b>×1.08</b>. All displayed scores are rounded to whole numbers.</p></div></div>
  <div class="ranking-overview"><span><strong>${overall.length}</strong><small>COUNTRIES</small></span><span><strong>${CITIES_1300.length}</strong><small>CITIES</small></span><span><strong>${leader?strengthNumber(leader.cityMultiplier*100-100):'0'}%</strong><small>#1 CITY BONUS</small></span></div>
  <div class="ranking-category-tabs" aria-label="Ranking category">
   ${RANKING_CATEGORIES_1300.map(([id,label])=>`<button class="${rankingCategory===id?'active':''}" data-action="ranking-category" data-id="${id}">${label}</button>`).join('')}
  </div>
  <div class="ranking-board-title"><div><span class="eyebrow">${esc(board.label.toUpperCase())} SCOREBOARD</span><h2>${esc(board.label)} ranking</h2></div><span>${esc(board.unit)}</span></div>
  <section class="country-ranking-list" aria-label="${esc(board.label)} country ranking">
   <div class="country-ranking-head"><span>Rank</span><span>Country</span><span>Cities</span><span>${esc(board.label)}</span></div>
   ${board.rows.map(r=>`<details class="country-ranking-row ${r.categoryRank<=3?'top-three':''}">
    <summary><span class="rank-number">#${String(r.categoryRank).padStart(2,'0')}</span><span class="rank-country">${r.categoryRank<=3?icon('star'):flag()}<strong>${esc(r.country)}</strong></span><span class="rank-provinces">${r.cityCount}</span><span class="rank-strength">${categoryValue(r,board.key)}</span></summary>
    <div class="country-score-breakdown">
      <div><span>Average Food</span><strong>${strengthNumber(r.foodAvg)} /100</strong><small>×50 = ${strengthNumber(r.foodScore)}</small></div>
      <div><span>Average Economy</span><strong>${strengthNumber(r.economyAvg)} /100</strong><small>×50 = ${strengthNumber(r.economyScore)}</small></div>
      <div><span>Average Technology</span><strong>${strengthNumber(r.technologyAvg)} /100</strong><small>×50 = ${strengthNumber(r.technologyScore)}</small></div>
      <div><span>Average Stability</span><strong>${strengthNumber(r.stabilityAvg)} /100</strong><small>×50 = ${strengthNumber(r.stabilityScore)}</small></div>
      <div><span>Total Population</span><strong>${strengthNumber(r.population)}</strong><small>÷50 = ${strengthNumber(r.populationScore)}</small></div>
      <div><span>Total Army</span><strong>${strengthNumber(r.army)}</strong><small>×2 = ${strengthNumber(r.armyScore)}</small></div>
      <div><span>Total Navy</span><strong>${strengthNumber(r.navy)}</strong><small>×10 = ${strengthNumber(r.navyScore)}</small></div>
      <div><span>Base score</span><strong>${strengthNumber(r.baseScore)}</strong><small>Before city bonus</small></div>
      <div class="city-bonus-box"><span>City bonus</span><strong>×${r.cityMultiplier.toFixed(2)}</strong><small>${r.cityCount} cities</small></div>
      <div class="final-score-box"><span>Overall strength</span><strong>${strengthNumber(r.strength)}</strong><small>${strengthNumber(r.baseScore)} × ${r.cityMultiplier.toFixed(2)}</small></div>
      ${r.supportTerritories.length?r.supportTerritories.map(s=>`<div class="support-territory-box"><span>Non-playable support territory</span><strong>${esc(s.name)}</strong><small>${strengthNumber(s.people)} population · ${strengthNumber(s.army)} army · ${strengthNumber(s.navy)} navy · linked to ${r.playableCityCount} playable English city cards · never appears in packs</small></div>`).join(''):''}
    </div>
   </details>`).join('')}
  </section>
 </main>`;
}
function atlasPage(){return `<div class="atlas-layout"><aside class="realm-panel" id="atlas-panel"></aside><main class="map-surface" id="map-host"></main><button class="atlas-panel-toggle" data-action="toggle-panel" aria-label="Show or hide city information">${icon('list')}</button></div>`;}
function polityType(name){for(const [needle,type] of [['Free Imperial City','Free Imperial City'],['Prince-Bishopric','Prince-Bishopric'],['Archbishopric','Archbishopric'],['Grand Duchy','Grand Duchy'],['Margraviate','Margraviate'],['Marquisate','Marquisate'],['Principality','Principality'],['Patriarchate','Patriarchate'],['Lordship','Lordship'],['Commune','Commune'],['Judicate','Judicate'],['Duchy','Duchy'],['County','County'],['Kingdom','Kingdom'],['Empire','Empire'],['Republic','Republic'],['Beylik','Beylik'],['Khanate','Khanate'],['Ilkhanate','Ilkhanate'],['Sultanate','Sultanate'],['Emirate','Emirate'],['Crown of','Composite monarchy'],['Order','Military Order'],['Papal States','Papal State'],['Waldstatte','Confederated communities']])if(name.includes(needle))return type;return 'Political entity';}
function polityDescription(name,detail){const type=polityType(name);if(type==='Free Imperial City')return 'A self-governing imperial city within the Holy Roman Empire, shown separately because it had substantial local autonomy.';if(type==='Prince-Bishopric'||type==='Archbishopric')return 'An ecclesiastical territory where the ruling bishop or archbishop also exercised temporal political power.';if(type==='Beylik')return 'A Turkish principality in the fragmented political landscape of Anatolia around 1300.';if(type==='Republic')return 'A republican polity represented as a separate power on the c. 1300 political map.';if(type==='Papal State')return 'Territory under the temporal rule of the papacy, represented separately from neighbouring Italian states.';return detail?'A distinct medieval polity in the detailed c. 1300 gameplay layer. Its fine borders are schematic approximations for map readability.':'A political entity shown on the approximate c. 1300 historical map.';}
function inAtlasRegion(){return true;}
function atlasRealmForCity(c){return c.country==='Emirate of Granada'?'Granada':c.country;}
function renderAtlasPanel(){const c=CITY_1300[selected1300]||CITIES_1300[0];if(atlasRegion){const type=polityType(atlasRegion.name),realmKey=atlasRegion.realm||atlasRegion.name,realmCities=CITIES_1300.filter(city=>atlasRealmForCity(city)===realmKey).sort((a,b)=>b.rarity-a.rarity||b.people-a.people),urbanPop=realmCities.reduce((sum,city)=>sum+city.people,0),support=SUPPORT_TERRITORIES_1300.find(x=>x.country===realmKey);$('#atlas-panel').innerHTML=`<div class="atlas-panel-head polity-panel-head"><span class="eyebrow">COUNTRY / REALM · c. 1300 CE</span><h2>${esc(atlasRegion.name)}</h2><p>${esc(type)}</p><div class="atlas-panel-switch"><button data-action="all-map-cities">Back to 1300 cards</button><button data-action="inspect-selected">Selected 1300 card ${icon('arrow')}</button></div></div><div class="polity-panel-body"><div class="polity-map-seal">${icon('crown')}<span><strong>${esc(type)}</strong><small>Right-click country information · c. 1300</small></span></div><p>${esc(polityDescription(atlasRegion.name,atlasRegion.detail))}</p>${atlasRegion.gameplayNote?`<p>${esc(atlasRegion.gameplayNote)}</p>`:``}<div class="polity-facts"><span>Playable city territories<strong>${realmCities.length||'—'}</strong></span><span>Playable-city population<strong>${realmCities.length?urbanPop.toLocaleString('en-GB'):'—'}</strong></span>${support?`<span>Home realm population<strong>${support.people.toLocaleString('en-GB')}</strong></span><span>Home realm army<strong>${support.army.toLocaleString('en-GB')}</strong></span><span>Home realm navy<strong>${support.navy.toLocaleString('en-GB')}</strong></span><span>Ranking link<strong>${realmCities.length} playable + 1 support</strong></span>`:''}</div>${realmCities.length?`<div class="panel-section"><span class="section-label">CITY TERRITORIES</span><div class="city-links">${realmCities.map(city=>`<button data-action="map-city" data-id="${city.id}"><span>${esc(city.name)} · ${city.populationText}</span>${icon('arrow')}</button>`).join('')}</div></div>`:''}<p class="atlas-footnote">${support?'England also has one non-playable home-realm support entity. It contributes national population, army and navy to rankings but is never a card or pack result. ':'Population here is only the sum of researched city cards, not the total population of the whole country. '}Left-click a playable city territory for its card and right-click for this country view.</p></div>`;return;}const list=CITIES_1300.filter(c=>`${c.name} ${c.subrealm} ${c.historicalRole}`.toLowerCase().includes(atlasSearch.toLowerCase()));$('#atlas-panel').innerHTML=`<div class="atlas-panel-head"><span class="eyebrow">1300 CITY ATLAS</span><h2>Europe · research set</h2><p>${CITIES_1300.length} researched city cards</p><div class="atlas-panel-switch"><button class="active" data-action="all-map-cities">All 1300 cards</button><button data-action="inspect-selected">Selected card ${icon('arrow')}</button></div></div><div class="atlas-feature atlas-feature-placeholder"><div class="atlas-placeholder-art">${icon('globe')}<small>IMAGE RESERVED</small></div><div><span class="card-country">${flag(c)}${c.country}</span><h3>${c.name}</h3><p>${c.subrealm} · ${c.populationText} people</p>${button('Inspect 1300 card '+icon('arrow'),'card1300','small-btn',`data-id="${c.id}"`)}</div></div><div class="atlas-search-wrap"><label class="search-input">${icon('search')}<input id="atlas-search" aria-label="Find a 1300 city on the map" placeholder="Find a researched city…" value="${esc(atlasSearch)}"></label></div><div class="atlas-city-list" id="atlas-city-list">${mapList(list)}</div><p class="atlas-footnote">The 1300 set is being built polity by polity across Europe. Political ownership is based on 1300, with selected states grouped and borders simplified for gameplay.</p>`;}
function mapList(list){return list.length?list.map(c=>`<button class="${selected1300===c.id?'selected':''}" data-action="map-city" data-id="${c.id}">${flag(c)}<span><strong>${c.name}</strong><small>${c.subrealm} · ${c.populationText}</small></span>${icon('arrow')}</button>`).join(''):'<p class="empty-map-list">No researched 1300 cards match this search.</p>';}
function showDialog(html,cls=''){modal.className=cls;modal.innerHTML=`<button class="modal-close icon-btn" data-action="close" aria-label="Close dialog">${icon('close')}</button>${html}`;if(!modal.open)modal.showModal();modal.setAttribute('aria-label',modal.querySelector('h2')?.textContent||'Cardwars dialog');}
function inspectCard1300(id){const c=CITY_1300[id];if(!c)return;const sources=c.sources.map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(' · ');showDialog(`<div class="detail-card">${card1300(c,true)}</div><div class="detail-copy detail-copy-1300"><span class="eyebrow">RESEARCHED CITY CARD · c. 1300 CE</span><h2>${c.name}</h2><div class="detail-country">${flag(c)}<span>${c.country}<small>${c.subrealm}</small></span></div>${c.gameplayNote?`<p class="small muted">${esc(c.gameplayNote)} Historical affiliation: ${esc(c.historicalCountry)} — ${esc(c.historicalSubrealm)}.</p>`:``}<p class="lead">${esc(c.researchSummary)}</p><div class="detail-facts"><span>Population<strong>${c.populationRange||c.populationText} · ${c.populationConfidence} confidence</strong></span><span>Historical role<strong>${esc(c.historicalRole)}</strong></span><span>Economy<strong>${esc(c.economy)}</strong></span><span>Military role<strong>${esc(c.militaryRole)}</strong></span></div><div class="research-evidence"><strong>How to read the stats</strong><p>${esc(c.evidenceNote)}</p><p>${esc(RESEARCH_1300_NOTE)}</p></div>${button('Locate on the 1300 map '+icon('globe'),'locate1300','primary',`data-id="${id}"`)}<div class="research-sources"><strong>Research sources</strong><p>${sources}</p></div></div>`,'card-dialog card-dialog-1300');}

function showReset(){showDialog(`<div class="simple-dialog"><span class="eyebrow">START AGAIN</span><h2>Reset campaign progress?</h2><p>This resets your Florin treasury and every player-built province building. The researched 1300 card set itself remains available.</p><p>You can export a backup before resetting.</p><div class="dialog-actions">${button('Cancel','close')}${button('Reset campaign','confirm-reset','danger')}</div></div>`);}
function showHelp(){showDialog(`<div class="simple-dialog"><span class="eyebrow">CARDWARS · c. 1300 CE</span><h2>Build your medieval realm.</h2><div class="help-list"><div><b>01</b><span><strong>Explore the 1300 collection</strong>Browse the researched European city cards by country and inspect their historical stats and sources.</span></div><div><b>02</b><span><strong>Build a 20-card deck</strong>Choose your campaign cities in the Deck tab. A new game draws four random cities as your opening hand.</span></div><div><b>03</b><span><strong>Play and develop</strong>Your campaign starts on 1 January 1300. Use the map and develop provinces with Florins and buildings.</span></div><div><b>04</b><span><strong>Compare the great powers</strong>The Rankings tab compares countries by Food, Economy, Technology, Stability, Population, Army, Navy and overall strength.</span></div><div><b>05</b><span><strong>Explore the map</strong>Drag to pan, scroll or pinch to zoom. Left-click a playable city territory for its card and right-click a realm for country information.</span></div></div><div class="save-help"><h3>Your campaign save</h3><p>Florins and player-built buildings are saved in this browser. Export a backup to keep or transfer them.</p><div class="dialog-actions">${button(icon('download')+' Export campaign','export')}${button('Import campaign','import')}</div></div><button class="text-btn" data-action="sources">Historical notes & sources</button></div>`);}
function showSources(){showDialog(`<div class="simple-dialog"><span class="eyebrow">HISTORY & GEOGRAPHY</span><h2>Behind the 1300 set.</h2><p>The active Cardwars collection now focuses entirely on <strong>Europe around 1300 CE</strong>. Population figures are historical estimates; military values and the four 0–100 gameplay scores are comparative modelling values.</p><p>${esc(RESEARCH_1300_NOTE)}</p><h3>Historical map</h3><p>The atlas uses the c. 1300 layer from <a href="https://github.com/aourednik/historical-basemaps" target="_blank" rel="noopener">Historical Basemaps, André Ourednik and contributors</a>, under <a href="assets/historical-basemaps-LICENSE.txt" target="_blank" rel="noopener">GPL-3.0</a>. Borders are approximate and simplified for gameplay.</p><h3>Card research</h3><p>Each 1300 city card includes its own research sources in the card detail view. Generated historical artwork is illustrative rather than documentary evidence.</p></div>`,'credits-dialog');}
function exportSave(){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(profile,null,2)],{type:'application/json'}));a.href=url;a.download='cardwars-1300-campaign.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Campaign exported.');}
function navigate(next){modal.close();view=next;render();window.scrollTo(0,0);}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action,id=b.dataset.id;
 if(a==='auth-local'){await localAuth();return;}
 if(a==='logout'){logoutAccount();return;}
 if(a==='starter-region'){chooseStarterRegion1300(id);return;}
 if(a==='starter-welcome'){claimWelcomePack1300();return;}
 if(['collection','packs','deck','game','rankings','atlas'].includes(a)){navigate(a);return;}
 if(a==='ranking-category'){rankingCategory=id;render();return;}
 if(a==='open-pack-1300'){const cards=drawPack1300();if(!cards)return;render();showPack1300(cards);return;}
 if(a==='last-pack-1300'){showPack1300(profile.lastPack1300);return;}
 if(a==='deck-toggle'){toggleDeckCard1300(id);return;}
 if(a==='start-game'){startGame1300();return;}
 if(a==='game-map'){gameScreen='map';render();return;}
 if(a==='game-development'){gameScreen='development';const first=profile.activeGame?.hand?.[0];if(first)buildingCity=first;render();return;}
 if(a==='game-hand-card'){selected1300=id;mapState.selected=id;inspectCard1300(id);return;}
 if(a==='quit-game'){profile.activeGame=null;gameScreen='map';save();render();toast('You left the campaign. Your deck and buildings were kept.');return;}
 if(a==='build-building'){buildBuilding1300(b.dataset.city,id);return;}
 if(a==='close')modal.close();
 if(a==='country1300'){country1300=id;render();}
 if(a==='card1300'&&!(modal.open&&modal.classList.contains('card-dialog-1300')))inspectCard1300(id);
 if(a==='reset')showReset();
 if(a==='confirm-reset'){profile=freshProfile();ensureEconomyProfile(profile);ensureGameProfile(profile);mapState.collection={};search1300='';country1300='all';deckSearch='';deckCountry='all';atlasSearch='';atlasRegion=null;selected1300='1300-seville';buildingCity='1300-seville';gameScreen='map';save();render();toast('Player progress reset. Choose a starter region again.');}
 if(a==='locate1300'){selected1300=id;mapState.selected=id;atlasRegion=null;atlasSearch='';navigate('atlas');world.focus(id);app.classList.add('show-panel');}
 if(a==='map-city'){selected1300=id;mapState.selected=id;atlasRegion=null;renderAtlasPanel();world.focus(id);app.classList.add('show-panel');}
 if(a==='inspect-selected')inspectCard1300(selected1300);
 if(a==='all-map-cities'){atlasRegion=null;atlasSearch='';renderAtlasPanel();}
 if(a==='toggle-panel')app.classList.toggle('show-panel');
 if(a==='help')showHelp();
 if(a==='sources')showSources();
 if(a==='export')exportSave();
 if(a==='import')$('#import-file').click();
});
document.addEventListener('input',e=>{if(e.target.id==='city-search-1300'){search1300=e.target.value;renderGrid();}if(e.target.id==='deck-search'){deckSearch=e.target.value;render();}if(e.target.id==='atlas-search'){atlasSearch=e.target.value;const list=CITIES_1300.filter(c=>`${c.name} ${c.subrealm} ${c.historicalRole}`.toLowerCase().includes(atlasSearch.toLowerCase()));$('#atlas-city-list').innerHTML=mapList(list);}});
document.addEventListener('change',e=>{if(e.target.id==='building-city-select'){buildingCity=e.target.value;render();}if(e.target.id==='country-filter-1300'){country1300=e.target.value;render();}if(e.target.id==='deck-country-filter'){deckCountry=e.target.value;render();}});
$('#import-file').addEventListener('change',async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;try{if(file.size>1000000)throw new Error();const p=migrateProfile(JSON.parse(await file.text()));if(!p||!validateProfile(p))throw new Error();ensureEconomyProfile(p);ensureGameProfile(p);showDialog(`<div class="simple-dialog"><span class="eyebrow">RESTORE CAMPAIGN</span><h2>Import this 1300 campaign?</h2><p>This replaces your current building progress and treasury with <strong>ƒ ${p.florins.toLocaleString('en-GB')}</strong>.</p><div class="dialog-actions">${button('Cancel','close')}${button('Import and replace','confirm-import','primary')}</div></div>`);modal.querySelector('[data-action="confirm-import"]').addEventListener('click',()=>{profile=p;save();navigate('collection');toast('1300 campaign imported.');},{once:true});}catch{toast('Invalid campaign file. Your existing progress was kept.');}});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
render();if(storageFailed)toast('A saved collection could not be loaded. You can import a backup from the guide.');
