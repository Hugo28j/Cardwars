import test from 'node:test';
import assert from 'node:assert/strict';
import {mapToScreen} from '../src/phaser/map-layer.js';
test('Phaser overlays align with SVG letterboxing, panning and mobile portrait',()=>{
 assert.deepEqual(mapToScreen(400,250,{x:0,y:0,w:800,h:500},1000,500),{x:500,y:250});
 assert.deepEqual(mapToScreen(0,0,{x:0,y:0,w:800,h:500},400,800),{x:0,y:275});
 assert.deepEqual(mapToScreen(200,150,{x:100,y:100,w:200,h:100},800,400),{x:400,y:200});
});
import {PhaserMapLayer} from '../src/phaser/map-layer.js';
function overlayFixture() {
 const sprite={visible:false,x:0,y:0,setPosition(x,y){this.x=x;this.y=y;},setVisible(v){this.visible=v;}};
 const layer=Object.create(PhaserMapLayer.prototype);
 layer.map={host:{clientWidth:400,clientHeight:800},view:{x:0,y:0,w:800,h:500},state:{selected:'a',game:{fogOfWar:true}},cityCenters:new Map([['a',[400,250]]]),phaserVisibleCities:new Set()};
 layer.game={scale:{width:1,height:1,resize(w,h){this.width=w;this.height=h;}},destroy(){this.destroyed=true;}};
 layer.items=[{sprite,spec:{city:'selected',offsetX:16,offsetY:-24}}];
 return {layer,sprite};
}
test('campaign fog hides decorative objects and visibility returns at the mapped position',()=>{
 const {layer,sprite}=overlayFixture();layer.sync();assert.equal(sprite.visible,false);
 layer.map.phaserVisibleCities.add('a');layer.sync();assert.equal(sprite.visible,true);
 assert.equal(sprite.x,216);assert.equal(sprite.y,376);assert.equal(layer.game.scale.width,400);
 layer.map.phaserVisibleCities.clear();layer.sync();assert.equal(sprite.visible,false);
 layer.map.state.game=null;layer.sync();assert.equal(sprite.visible,true);
 layer.map.state.selected='missing';layer.sync();assert.equal(sprite.visible,false);
});
test('disposing a map removes its Phaser game and prevents further synchronization',()=>{
 const {layer}=overlayFixture();let removed=false;layer.host={remove(){removed=true;}};
 layer.destroy();assert.equal(removed,true);assert.equal(layer.game.destroyed,true);
 assert.deepEqual(layer.items,[]);layer.sync();
});
