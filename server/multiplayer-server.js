import http from 'node:http';
import crypto from 'node:crypto';
import {WebSocketServer,WebSocket} from 'ws';

const PORT=Number(process.env.PORT)||8787,MAX_PLAYERS=6,RECONNECT_GRACE_MS=45000,LOBBY_TTL_MS=6*60*60*1000;
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const cleanName=v=>String(v||'Player').trim().replace(/[<>]/g,'').slice(0,28)||'Player';
const cleanColor=v=>/^#[0-9a-f]{6}$/i.test(String(v||''))?String(v):'#c6534d';
const cleanCode=v=>String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
const send=(ws,payload)=>{if(ws?.readyState===WebSocket.OPEN)ws.send(JSON.stringify(payload));};

class LobbyStore{
 constructor(){this.lobbies=new Map();this.clientLobby=new Map();}
 code(){for(let tries=0;tries<1000;tries++){let out='';for(let i=0;i<6;i++)out+=alphabet[crypto.randomInt(alphabet.length)];if(!this.lobbies.has(out))return out;}throw new Error('Unable to allocate lobby code');}
 player(clientId,raw={}){return {id:clientId,name:cleanName(raw.name),color:cleanColor(raw.color),deckCount:Math.max(0,Math.min(16,Number(raw.deckCount)||0)),ready:false,connected:true,joinedAt:Date.now()};}
 create(clientId,raw){this.leave(clientId);const code=this.code(),p=this.player(clientId,raw),lobby={code,hostId:clientId,status:'waiting',createdAt:Date.now(),players:new Map([[clientId,p]])};this.lobbies.set(code,lobby);this.clientLobby.set(clientId,code);return lobby;}
 join(clientId,codeRaw,raw){const code=cleanCode(codeRaw),lobby=this.lobbies.get(code);if(!lobby)throw new Error('Lobby not found. Check the invite code.');if(lobby.status!=='waiting')throw new Error('This lobby has already started.');const existing=lobby.players.get(clientId);if(existing){Object.assign(existing,{name:cleanName(raw.name),color:cleanColor(raw.color),deckCount:Math.max(0,Math.min(16,Number(raw.deckCount)||0)),connected:true});this.clientLobby.set(clientId,code);return lobby;}if(lobby.players.size>=MAX_PLAYERS)throw new Error('This lobby is full (6/6).');this.leave(clientId);lobby.players.set(clientId,this.player(clientId,raw));this.clientLobby.set(clientId,code);return lobby;}
 setReady(clientId,ready){const lobby=this.forClient(clientId);if(!lobby)throw new Error('You are not in a lobby.');const p=lobby.players.get(clientId);if(!p)throw new Error('Player slot not found.');p.ready=!!ready;return lobby;}
 start(clientId){const lobby=this.forClient(clientId);if(!lobby)throw new Error('You are not in a lobby.');if(lobby.hostId!==clientId)throw new Error('Only the host can start the lobby.');if(lobby.status!=='waiting')throw new Error('Lobby already started.');const players=[...lobby.players.values()];if(!players.length)throw new Error('Lobby is empty.');if(players.some(p=>!p.ready))throw new Error('Every player must be Ready before starting.');lobby.status='started';lobby.startedAt=Date.now();lobby.gameId=crypto.randomUUID();return lobby;}
 markConnected(clientId,connected){const lobby=this.forClient(clientId);const p=lobby?.players.get(clientId);if(p)p.connected=!!connected;return lobby;}
 leave(clientId){const code=this.clientLobby.get(clientId);if(!code)return null;const lobby=this.lobbies.get(code);this.clientLobby.delete(clientId);if(!lobby)return null;lobby.players.delete(clientId);if(!lobby.players.size){this.lobbies.delete(code);return null;}if(lobby.hostId===clientId)lobby.hostId=lobby.players.keys().next().value;return lobby;}
 forClient(clientId){const code=this.clientLobby.get(clientId);return code?this.lobbies.get(code):null;}
 snapshot(lobby){return {code:lobby.code,hostId:lobby.hostId,status:lobby.status,gameId:lobby.gameId||null,players:[...lobby.players.values()].map(p=>({...p,host:p.id===lobby.hostId})),maxPlayers:MAX_PLAYERS};}
 cleanup(){const now=Date.now();for(const [code,lobby] of this.lobbies)if(now-lobby.createdAt>LOBBY_TTL_MS){for(const id of lobby.players.keys())this.clientLobby.delete(id);this.lobbies.delete(code);}}
}
const store=new LobbyStore(),connections=new Map();
const server=http.createServer((req,res)=>{if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json','access-control-allow-origin':'*'});res.end(JSON.stringify({ok:true,lobbies:store.lobbies.size,maxPlayers:MAX_PLAYERS}));return;}res.writeHead(200,{'content-type':'text/plain'});res.end('Cardwars multiplayer lobby server\n');});
const wss=new WebSocketServer({server});
const broadcast=lobby=>{if(!lobby)return;const payload={type:'lobby_state',lobby:store.snapshot(lobby)};for(const p of lobby.players.values())send(connections.get(p.id),payload);};
const error=(ws,message)=>send(ws,{type:'error',message});

wss.on('connection',ws=>{let clientId=null;
 ws.on('message',raw=>{let msg;try{msg=JSON.parse(String(raw));}catch{return error(ws,'Invalid message.');}try{
  if(msg.type==='identify'){clientId=String(msg.clientId||'').slice(0,80);if(!clientId)throw new Error('Missing client ID.');const old=connections.get(clientId);if(old&&old!==ws){try{old.close();}catch{}}connections.set(clientId,ws);const lobby=store.markConnected(clientId,true);if(lobby)broadcast(lobby);return;}
  if(!clientId||String(msg.clientId||'')!==clientId)throw new Error('Identify before using the lobby.');
  if(msg.type==='create_lobby'){const lobby=store.create(clientId,msg.player);broadcast(lobby);return;}
  if(msg.type==='join_lobby'){const lobby=store.join(clientId,msg.code,msg.player);broadcast(lobby);return;}
  if(msg.type==='set_ready'){const lobby=store.setReady(clientId,msg.ready);broadcast(lobby);return;}
  if(msg.type==='start_lobby'){const lobby=store.start(clientId);broadcast(lobby);const payload={type:'game_started',lobby:store.snapshot(lobby)};for(const p of lobby.players.values())send(connections.get(p.id),payload);return;}
  if(msg.type==='leave_lobby'){const previous=store.forClient(clientId);store.leave(clientId);send(ws,{type:'left_lobby'});if(previous&&store.lobbies.has(previous.code))broadcast(previous);return;}
 }catch(e){error(ws,e.message||'Lobby action failed.');}});
 ws.on('close',()=>{if(!clientId)return;if(connections.get(clientId)===ws)connections.delete(clientId);const lobby=store.markConnected(clientId,false);broadcast(lobby);setTimeout(()=>{if(connections.has(clientId))return;const current=store.forClient(clientId);if(!current)return;store.leave(clientId);if(store.lobbies.has(current.code))broadcast(current);},RECONNECT_GRACE_MS);});
});
setInterval(()=>store.cleanup(),10*60*1000).unref();
server.listen(PORT,'0.0.0.0',()=>console.log(`Cardwars multiplayer lobby server listening on :${PORT}`));
