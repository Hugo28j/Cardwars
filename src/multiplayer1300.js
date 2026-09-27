const STORAGE_KEY='cardwars.multiplayerServerUrl';
const CLIENT_KEY='cardwars.multiplayerClientId';
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
 constructor({onChange=()=>{},onError=()=>{}}={}){this.onChange=onChange;this.onError=onError;this.ws=null;this.serverUrl=defaultMultiplayerServerURL1300();this.clientId=multiplayerClientId1300();this.state={status:'idle',lobby:null,error:null,started:false};this.player=null;}
 snapshot(){return this.state;}
 configureServer(url){const value=String(url||'').trim().replace(/^http:/,'ws:').replace(/^https:/,'wss:').replace(/\/$/,'');this.serverUrl=value;try{if(value)localStorage.setItem(STORAGE_KEY,value);else localStorage.removeItem(STORAGE_KEY);}catch{}this.disconnect(false);this._set({status:'idle',error:null,lobby:null,started:false});return value;}
 async connect(player){this.player=player;if(this.ws?.readyState===WebSocket.OPEN)return true;if(!this.serverUrl){this._fail('No multiplayer server configured. Run npm run multiplayer locally or add a hosted WebSocket URL.');return false;}if(this.ws?.readyState===WebSocket.CONNECTING)return new Promise(resolve=>{const timer=setInterval(()=>{if(this.ws?.readyState===WebSocket.OPEN){clearInterval(timer);resolve(true);}else if(!this.ws||this.ws.readyState>1){clearInterval(timer);resolve(false);}},40);});
  this._set({status:'connecting',error:null});return new Promise(resolve=>{let ws;try{ws=new WebSocket(this.serverUrl);}catch{this._fail('Could not open multiplayer server.');resolve(false);return;}this.ws=ws;
   ws.addEventListener('open',()=>{this._set({status:'connected',error:null});this._send({type:'identify',clientId:this.clientId,player:this.player});resolve(true);});
   ws.addEventListener('message',e=>this._message(e.data));
   ws.addEventListener('close',()=>{if(this.ws===ws)this.ws=null;if(this.state.lobby&&!this.state.started)this._set({status:'disconnected'});else if(!this.state.started)this._set({status:'idle'});});
   ws.addEventListener('error',()=>{this._fail('Multiplayer server connection failed.');resolve(false);});
  });
 }
 async create(player){if(!await this.connect(player))return false;this._send({type:'create_lobby',clientId:this.clientId,player});return true;}
 async join(code,player){const clean=cleanCode(code);if(clean.length!==6){this._fail('Lobby codes contain 6 characters.');return false;}if(!await this.connect(player))return false;this._send({type:'join_lobby',clientId:this.clientId,code:clean,player});return true;}
 ready(value){this._send({type:'set_ready',clientId:this.clientId,ready:!!value});}
 start(){this._send({type:'start_lobby',clientId:this.clientId});}
 leave(){if(this.ws?.readyState===WebSocket.OPEN)this._send({type:'leave_lobby',clientId:this.clientId});this._set({lobby:null,started:false,error:null});}
 disconnect(clearLobby=true){if(this.ws){try{this.ws.close();}catch{}this.ws=null;}if(clearLobby)this._set({status:'idle',lobby:null,started:false});}
 _send(payload){if(this.ws?.readyState===WebSocket.OPEN)this.ws.send(JSON.stringify(payload));else this._fail('Not connected to the multiplayer server.');}
 _message(raw){let msg;try{msg=JSON.parse(raw);}catch{return;}if(msg.type==='lobby_state')this._set({status:'connected',lobby:msg.lobby,error:null,started:msg.lobby?.status==='started'});else if(msg.type==='game_started')this._set({status:'connected',lobby:msg.lobby,error:null,started:true});else if(msg.type==='left_lobby')this._set({lobby:null,started:false,error:null});else if(msg.type==='error')this._fail(msg.message||'Multiplayer error.');}
 _set(patch){this.state={...this.state,...patch};this.onChange(this.state);}
 _fail(message){this.state={...this.state,error:String(message||'Multiplayer error.')};this.onError(this.state.error);this.onChange(this.state);}
}
export {cleanCode as cleanLobbyCode1300};
