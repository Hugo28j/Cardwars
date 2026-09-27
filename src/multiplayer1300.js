const STORAGE_KEY='cardwars.multiplayerServerUrl';
const CLIENT_KEY='cardwars.multiplayerClientId';
const LOBBY_KEY='cardwars.multiplayerLobbyCode';
const cleanCode=value=>String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);

export function defaultMultiplayerServerURL1300(){
 try{const saved=localStorage.getItem(STORAGE_KEY);if(saved)return saved;}catch{}
 if(location.hostname==='localhost'||location.hostname==='127.0.0.1')return `ws://${location.hostname}:8787`;
 return '';
}
export function multiplayerClientId1300(){
 try{let id=sessionStorage.getItem(CLIENT_KEY);if(id)return id;id=crypto.randomUUID?.()||('cw-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));sessionStorage.setItem(CLIENT_KEY,id);return id;}catch{return 'cw-'+Math.random().toString(36).slice(2);}
}
export class MultiplayerLobbyClient1300{
 constructor({onChange=()=>{},onError=()=>{}}={}){this.onChange=onChange;this.onError=onError;this.ws=null;this.serverUrl=defaultMultiplayerServerURL1300();this.clientId=multiplayerClientId1300();this.player=null;this.reconnectTimer=null;this.resumePending=false;this.resumeCode=this._savedLobby();this.state={status:'idle',lobby:null,campaign:null,error:null,started:false,lastEvent:'init'};}
 snapshot(){return this.state;}
 hasSession(){return !!this.resumeCode;}
 configureServer(url){const value=String(url||'').trim().replace(/^http:/,'ws:').replace(/^https:/,'wss:').replace(/\/$/,'');this.serverUrl=value;try{if(value)localStorage.setItem(STORAGE_KEY,value);else localStorage.removeItem(STORAGE_KEY);}catch{}this.disconnect(false);this._clearLobby();this._set({status:'idle',error:null,lobby:null,campaign:null,started:false},'server');return value;}
 async connect(player){this.player=player||this.player;if(this.ws?.readyState===WebSocket.OPEN)return true;if(!this.serverUrl){this._fail('No multiplayer server configured. Run npm run multiplayer locally or add a hosted WebSocket URL.');return false;}if(this.ws?.readyState===WebSocket.CONNECTING)return false;
  this._set({status:'connecting',error:null},'connection');return new Promise(resolve=>{let ws;try{ws=new WebSocket(this.serverUrl);}catch{this._fail('Could not open multiplayer server.');resolve(false);return;}this.ws=ws;
   ws.addEventListener('open',()=>{this._set({status:'connected',error:null},'connection');this._send({type:'identify',clientId:this.clientId,player:this.player});resolve(true);});
   ws.addEventListener('message',e=>this._message(e.data));
   ws.addEventListener('close',()=>{if(this.ws===ws)this.ws=null;if(this.hasSession()){this._set({status:'disconnected'},'connection');this._scheduleReconnect();}else this._set({status:'idle'},'connection');});
   ws.addEventListener('error',()=>{this._fail('Multiplayer server connection failed.');resolve(false);});
  });
 }
 async create(player){this._clearLobby();if(!await this.connect(player))return false;this._send({type:'create_lobby',clientId:this.clientId,player});return true;}
 async join(code,player){const clean=cleanCode(code);if(clean.length!==6){this._fail('Lobby codes contain 6 characters.');return false;}this.resumeCode=clean;this._saveLobby(clean);if(!await this.connect(player))return false;this._send({type:'join_lobby',clientId:this.clientId,code:clean,player});return true;}
 async resume(player){if(this.resumePending||!this.hasSession())return false;this.resumePending=true;const ok=await this.connect(player);if(ok)this._send({type:'resume_lobby',clientId:this.clientId,code:this.resumeCode,player});this.resumePending=false;return ok;}
 ready(value){this._send({type:'set_ready',clientId:this.clientId,ready:!!value});}
 start(){this._send({type:'start_lobby',clientId:this.clientId});}
 command(action,payload={}){const commandId='cmd-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);this._send({type:'campaign_command',clientId:this.clientId,commandId,action:String(action||''),payload});return commandId;}
 leave(){if(this.ws?.readyState===WebSocket.OPEN)this._send({type:'leave_lobby',clientId:this.clientId});this._clearLobby();this._set({lobby:null,campaign:null,started:false,error:null},'leave');}
 disconnect(clearLobby=true){if(this.reconnectTimer){clearTimeout(this.reconnectTimer);this.reconnectTimer=null;}if(this.ws){try{this.ws.close();}catch{}this.ws=null;}if(clearLobby){this._clearLobby();this._set({status:'idle',lobby:null,campaign:null,started:false},'disconnect');}}
 _send(payload){if(this.ws?.readyState===WebSocket.OPEN)this.ws.send(JSON.stringify(payload));else this._fail('Not connected to the multiplayer server.');}
 _message(raw){let msg;try{msg=JSON.parse(raw);}catch{return;}
  if(msg.type==='lobby_state'){this._rememberLobby(msg.lobby?.code);this._set({status:'connected',lobby:msg.lobby,campaign:msg.lobby?.campaign||null,error:null,started:msg.lobby?.status==='started'},'lobby_state');}
  else if(msg.type==='campaign_state')this._set({status:'connected',campaign:msg.campaign,lobby:msg.lobby||this.state.lobby,started:true,error:null},'campaign_state');
  else if(msg.type==='game_started'){this._rememberLobby(msg.lobby?.code);this._set({status:'connected',lobby:msg.lobby,campaign:msg.campaign||msg.lobby?.campaign||null,error:null,started:true},'game_started');}
  else if(msg.type==='campaign_update')this._set({status:'connected',campaign:msg.campaign,lobby:msg.lobby||this.state.lobby,started:true,error:null},'campaign_update');
  else if(msg.type==='command_result')this._set({lastCommand:msg,error:null},'command_result');
  else if(msg.type==='left_lobby'){this._clearLobby();this._set({lobby:null,campaign:null,started:false,error:null},'leave');}
  else if(msg.type==='error'){if(/not found|no longer/i.test(msg.message||''))this._clearLobby();this._fail(msg.message||'Multiplayer error.');}
 }
 _scheduleReconnect(){if(this.reconnectTimer||!this.player||!this.hasSession())return;this.reconnectTimer=setTimeout(async()=>{this.reconnectTimer=null;const ok=await this.connect(this.player);if(ok)this._send({type:'resume_lobby',clientId:this.clientId,code:this.resumeCode,player:this.player});else this._scheduleReconnect();},1200);}
 _savedLobby(){try{return cleanCode(sessionStorage.getItem(LOBBY_KEY));}catch{return '';}}
 _saveLobby(code){try{sessionStorage.setItem(LOBBY_KEY,cleanCode(code));}catch{}}
 _rememberLobby(code){const clean=cleanCode(code);if(clean){this.resumeCode=clean;this._saveLobby(clean);}}
 _clearLobby(){this.resumeCode='';try{sessionStorage.removeItem(LOBBY_KEY);}catch{}}
 _set(patch,event='state'){this.state={...this.state,...patch,lastEvent:event};this.onChange(this.state);}
 _fail(message){this.state={...this.state,error:String(message||'Multiplayer error.'),lastEvent:'error'};this.onError(this.state.error);this.onChange(this.state);}
}
export {cleanCode as cleanLobbyCode1300};
