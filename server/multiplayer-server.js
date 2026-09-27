import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {WebSocketServer,WebSocket} from 'ws';

const PORT=Number(process.env.PORT)||8787,MAX_PLAYERS=6,RECONNECT_GRACE_MS=45000,WAITING_TTL_MS=6*60*60*1000,CAMPAIGN_TTL_MS=7*24*60*60*1000;
const PREPARATION_MS=120000,DAY_MS=2000;
const __dirname=path.dirname(fileURLToPath(import.meta.url)),SAVE_FILE=process.env.CARDWARS_MULTIPLAYER_SAVE||path.join(__dirname,'data','multiplayer-state.json');
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const cleanName=v=>String(v||'Player').trim().replace(/[<>]/g,'').slice(0,28)||'Player';
const cleanColor=v=>/^#[0-9a-f]{6}$/i.test(String(v||''))?String(v):'#c6534d';
const cleanCode=v=>String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
const cleanDeck=v=>Array.isArray(v)?[...new Set(v.map(x=>String(x)).filter(Boolean))].slice(0,16):[];
const send=(ws,payload)=>{if(ws?.readyState===WebSocket.OPEN)ws.send(JSON.stringify(payload));};

class LobbyStore{
 constructor(){this.lobbies=new Map();this.clientLobby=new Map();this.saveTimer=null;this.load();}
 code(){for(let tries=0;tries<1000;tries++){let out='';for(let i=0;i<6;i++)out+=alphabet[crypto.randomInt(alphabet.length)];if(!this.lobbies.has(out))return out;}throw new Error('Unable to allocate lobby code');}
 player(clientId,raw={}){const deck=cleanDeck(raw.deck);return {id:clientId,name:cleanName(raw.name),color:cleanColor(raw.color),deck,deckCount:Math.max(0,Math.min(16,Number(raw.deckCount)||deck.length)),flag:Array.isArray(raw.flag)?raw.flag.slice(0,36):[],ready:false,connected:true,joinedAt:Date.now()};}
 create(clientId,raw){this.leave(clientId,false);const code=this.code(),p=this.player(clientId,raw),lobby={code,hostId:clientId,status:'waiting',createdAt:Date.now(),updatedAt:Date.now(),players:new Map([[clientId,p]]),campaign:null};this.lobbies.set(code,lobby);this.clientLobby.set(clientId,code);this.scheduleSave();return lobby;}
 join(clientId,codeRaw,raw){const code=cleanCode(codeRaw),lobby=this.lobbies.get(code);if(!lobby)throw new Error('Lobby not found. Check the invite code.');if(lobby.status!=='waiting')throw new Error('This lobby has already started.');const existing=lobby.players.get(clientId),deck=cleanDeck(raw.deck);if(existing){Object.assign(existing,{name:cleanName(raw.name),color:cleanColor(raw.color),deck,deckCount:Math.max(0,Math.min(16,Number(raw.deckCount)||deck.length)),flag:Array.isArray(raw.flag)?raw.flag.slice(0,36):[],connected:true});this.clientLobby.set(clientId,code);this.touch(lobby);return lobby;}if(lobby.players.size>=MAX_PLAYERS)throw new Error('This lobby is full (6/6).');this.leave(clientId,false);lobby.players.set(clientId,this.player(clientId,raw));this.clientLobby.set(clientId,code);this.touch(lobby);return lobby;}
 resume(clientId,codeRaw,raw){const code=cleanCode(codeRaw),lobby=this.lobbies.get(code);if(!lobby)throw new Error('Saved multiplayer lobby no longer exists.');const p=lobby.players.get(clientId);if(!p)throw new Error('Your saved player slot no longer exists in this lobby.');Object.assign(p,{name:cleanName(raw?.name||p.name),color:cleanColor(raw?.color||p.color),connected:true});this.clientLobby.set(clientId,code);this.touch(lobby);return lobby;}
 setReady(clientId,ready){const lobby=this.forClient(clientId);if(!lobby)throw new Error('You are not in a lobby.');if(lobby.status!=='waiting')throw new Error('Campaign already started.');lobby.players.get(clientId).ready=!!ready;this.touch(lobby);return lobby;}
 start(clientId){const lobby=this.forClient(clientId);if(!lobby)throw new Error('You are not in a lobby.');if(lobby.hostId!==clientId)throw new Error('Only the host can start the lobby.');if(lobby.status!=='waiting')throw new Error('Lobby already started.');const players=[...lobby.players.values()];if(players.some(p=>!p.ready))throw new Error('Every player must be Ready before starting.');const now=Date.now();lobby.status='started';lobby.gameId=crypto.randomUUID();lobby.campaign={id:lobby.gameId,phase:'preparing',day:0,createdAt:now,startedAt:null,prepEndsAt:now+PREPARATION_MS,nextDayAt:null,dayDurationMs:DAY_MS,preparationMs:PREPARATION_MS,lastBroadcastSecond:null};this.touch(lobby,true);return lobby;}
 markConnected(clientId,connected){const lobby=this.forClient(clientId),p=lobby?.players.get(clientId);if(p){p.connected=!!connected;this.touch(lobby);}return lobby;}
 leave(clientId,save=true){const code=this.clientLobby.get(clientId);if(!code)return null;const lobby=this.lobbies.get(code);this.clientLobby.delete(clientId);if(!lobby)return null;lobby.players.delete(clientId);if(!lobby.players.size){this.lobbies.delete(code);if(save)this.scheduleSave();return null;}if(lobby.hostId===clientId)lobby.hostId=lobby.players.keys().next().value;this.touch(lobby,save);return lobby;}
 forClient(clientId){const code=this.clientLobby.get(clientId);return code?this.lobbies.get(code):null;}
 campaignSnapshot(c){if(!c)return null;const now=Date.now();return {id:c.id,phase:c.phase,day:c.day,createdAt:c.createdAt,startedAt:c.startedAt,dayDurationMs:c.dayDurationMs,preparationMs:c.preparationMs,prepRemainingMs:c.phase==='preparing'?Math.max(0,c.prepEndsAt-now):0,nextDayInMs:c.phase==='running'?Math.max(0,c.nextDayAt-now):null,serverNow:now};}
 snapshot(lobby){return {code:lobby.code,hostId:lobby.hostId,status:lobby.status,gameId:lobby.gameId||null,players:[...lobby.players.values()].map(p=>({...p,host:p.id===lobby.hostId})),maxPlayers:MAX_PLAYERS,campaign:this.campaignSnapshot(lobby.campaign)};}
 touch(lobby,save=true){if(lobby)lobby.updatedAt=Date.now();if(save)this.scheduleSave();}
 tick(now=Date.now()){const changed=[];for(const lobby of this.lobbies.values()){const c=lobby.campaign;if(!c)continue;let stateChanged=false;if(c.phase==='preparing'){const sec=Math.ceil(Math.max(0,c.prepEndsAt-now)/1000);if(now>=c.prepEndsAt){c.phase='running';c.startedAt=now;c.nextDayAt=now+c.dayDurationMs;c.lastBroadcastSecond=null;stateChanged=true;}else if(sec!==c.lastBroadcastSecond){c.lastBroadcastSecond=sec;changed.push(lobby);}}
   if(c.phase==='running'&&now>=c.nextDayAt){const steps=Math.floor((now-c.nextDayAt)/c.dayDurationMs)+1;c.day+=steps;c.nextDayAt+=steps*c.dayDurationMs;stateChanged=true;}
   if(stateChanged){this.scheduleSave();changed.push(lobby);}
  }return [...new Set(changed)];}
 serializeLobby(lobby){const c=lobby.campaign,now=Date.now();return {code:lobby.code,hostId:lobby.hostId,status:lobby.status,gameId:lobby.gameId||null,createdAt:lobby.createdAt,updatedAt:lobby.updatedAt,players:[...lobby.players.values()].map(p=>({...p,connected:false})),campaign:c?{id:c.id,phase:c.phase,day:c.day,createdAt:c.createdAt,startedAt:c.startedAt,dayDurationMs:c.dayDurationMs,preparationMs:c.preparationMs,prepRemainingMs:c.phase==='preparing'?Math.max(0,c.prepEndsAt-now):0,nextDayInMs:c.phase==='running'?Math.max(1,c.nextDayAt-now):null}:null};}
 scheduleSave(){if(this.saveTimer)return;this.saveTimer=setTimeout(()=>{this.saveTimer=null;this.save();},250);}
 save(){try{fs.mkdirSync(path.dirname(SAVE_FILE),{recursive:true});const payload={version:1,savedAt:Date.now(),lobbies:[...this.lobbies.values()].map(l=>this.serializeLobby(l))},tmp=SAVE_FILE+'.tmp';fs.writeFileSync(tmp,JSON.stringify(payload,null,2));fs.renameSync(tmp,SAVE_FILE);}catch(e){console.error('Multiplayer save failed:',e.message);}}
 load(){try{if(!fs.existsSync(SAVE_FILE))return;const raw=JSON.parse(fs.readFileSync(SAVE_FILE,'utf8')),now=Date.now();for(const saved of raw.lobbies||[]){const maxAge=saved.status==='started'?CAMPAIGN_TTL_MS:WAITING_TTL_MS;if(now-(saved.updatedAt||saved.createdAt||now)>maxAge)continue;const players=new Map((saved.players||[]).map(p=>[p.id,{...p,connected:false}]));if(!players.size)continue;const c=saved.campaign?{...saved.campaign,prepEndsAt:null,nextDayAt:null,lastBroadcastSecond:null}:null;if(c){if(c.phase==='preparing')c.prepEndsAt=now+Math.max(0,Number(c.prepRemainingMs)||0);else if(c.phase==='running')c.nextDayAt=now+Math.max(1,Number(c.nextDayInMs)||c.dayDurationMs||DAY_MS);delete c.prepRemainingMs;delete c.nextDayInMs;}const lobby={...saved,players,campaign:c};this.lobbies.set(lobby.code,lobby);for(const id of players.keys())this.clientLobby.set(id,lobby.code);}}catch(e){console.error('Multiplayer save load failed:',e.message);}}
 cleanup(){const now=Date.now();for(const [code,lobby] of this.lobbies){const ttl=lobby.status==='started'?CAMPAIGN_TTL_MS:WAITING_TTL_MS;if(now-(lobby.updatedAt||lobby.createdAt)>ttl){for(const id of lobby.players.keys())this.clientLobby.delete(id);this.lobbies.delete(code);}}this.scheduleSave();}
}
const store=new LobbyStore(),connections=new Map();
const server=http.createServer((req,res)=>{if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json','access-control-allow-origin':'*'});res.end(JSON.stringify({ok:true,lobbies:store.lobbies.size,campaigns:[...store.lobbies.values()].filter(x=>x.campaign).length,maxPlayers:MAX_PLAYERS}));return;}res.writeHead(200,{'content-type':'text/plain'});res.end('Cardwars multiplayer server\n');});
const wss=new WebSocketServer({server});
const broadcast=lobby=>{if(!lobby)return;const payload={type:'lobby_state',lobby:store.snapshot(lobby)};for(const p of lobby.players.values())send(connections.get(p.id),payload);};
const broadcastCampaign=lobby=>{if(!lobby?.campaign)return;const payload={type:'campaign_state',campaign:store.campaignSnapshot(lobby.campaign),lobby:store.snapshot(lobby)};for(const p of lobby.players.values())send(connections.get(p.id),payload);};
const error=(ws,message)=>send(ws,{type:'error',message});

wss.on('connection',ws=>{let clientId=null;
 ws.on('message',raw=>{let msg;try{msg=JSON.parse(String(raw));}catch{return error(ws,'Invalid message.');}try{
  if(msg.type==='identify'){clientId=String(msg.clientId||'').slice(0,80);if(!clientId)throw new Error('Missing client ID.');const old=connections.get(clientId);if(old&&old!==ws){try{old.close();}catch{}}connections.set(clientId,ws);const lobby=store.markConnected(clientId,true);if(lobby){broadcast(lobby);if(lobby.campaign)broadcastCampaign(lobby);}return;}
  if(!clientId||String(msg.clientId||'')!==clientId)throw new Error('Identify before using multiplayer.');
  if(msg.type==='create_lobby'){broadcast(store.create(clientId,msg.player));return;}
  if(msg.type==='join_lobby'){broadcast(store.join(clientId,msg.code,msg.player));return;}
  if(msg.type==='resume_lobby'){const lobby=store.resume(clientId,msg.code,msg.player);broadcast(lobby);if(lobby.campaign)broadcastCampaign(lobby);return;}
  if(msg.type==='set_ready'){broadcast(store.setReady(clientId,msg.ready));return;}
  if(msg.type==='start_lobby'){const lobby=store.start(clientId);broadcast(lobby);const payload={type:'game_started',lobby:store.snapshot(lobby),campaign:store.campaignSnapshot(lobby.campaign)};for(const p of lobby.players.values())send(connections.get(p.id),payload);return;}
  if(msg.type==='leave_lobby'){const previous=store.forClient(clientId),remaining=store.leave(clientId);send(ws,{type:'left_lobby'});if(remaining)broadcast(remaining);else if(previous)store.scheduleSave();return;}
 }catch(e){error(ws,e.message||'Multiplayer action failed.');}});
 ws.on('close',()=>{if(!clientId)return;if(connections.get(clientId)===ws)connections.delete(clientId);const lobby=store.markConnected(clientId,false);broadcast(lobby);setTimeout(()=>{if(connections.has(clientId))return;const current=store.forClient(clientId);if(!current)return;if(current.status==='waiting'){const remaining=store.leave(clientId);if(remaining)broadcast(remaining);}else broadcast(current);},RECONNECT_GRACE_MS);});
});
setInterval(()=>{for(const lobby of store.tick())broadcastCampaign(lobby);},250).unref();
setInterval(()=>store.cleanup(),10*60*1000).unref();
const shutdown=()=>{store.save();server.close(()=>process.exit(0));setTimeout(()=>process.exit(0),1000).unref();};process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
server.listen(PORT,'0.0.0.0',()=>console.log(`Cardwars multiplayer server listening on :${PORT}`));
