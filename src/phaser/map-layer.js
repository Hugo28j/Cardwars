// Shared by the campaign, atlas and map editor. Phaser assets use document-root URLs.
import {CITIES_1300} from '../data1300.js?v=20260928-anatolia-v8';
const ROOT = new URL('../../', import.meta.url);
const ASSET_VERSION = '20261025-watchpost-roof-v1';
let runtimePromise;
export function expandMapObjectSpecs(objects=[]) {
  return objects.flatMap(spec => spec.repeat === 'cities'
    ? CITIES_1300.map(city => ({...spec, id:`${spec.id}-${city.id}`, city:city.id, repeat:undefined}))
    : [spec]);
}
function loadRuntime() {
  if (globalThis.Phaser) return Promise.resolve(globalThis.Phaser);
  return runtimePromise ||= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL('vendor/phaser/phaser-3.90.0.min.js', ROOT).href;
    script.onload = () => resolve(globalThis.Phaser);
    script.onerror = () => { script.remove(); runtimePromise = null; reject(new Error('Phaser runtime unavailable')); };
    document.head.append(script);
  });
}
// Match SVG's default xMidYMid meet, including letterboxing.
export function mapToScreen(x, y, view, width, height) {
  const scale = Math.min(width / view.w, height / view.h);
  return { x: (width - view.w * scale) / 2 + (x - view.x) * scale,
    y: (height - view.h * scale) / 2 + (y - view.y) * scale };
}
export function cityCastleVisual(viewWidth, selected=false) {
  const zoom = Math.max(0, Math.min(1, (500 - Number(viewWidth || 0)) / 380));
  if (zoom <= 0) return {visible:false, width:0, height:0, alpha:0};
  const eased = zoom * zoom * (3 - 2 * zoom), boost = selected ? 1.12 : 1;
  return {
    visible:true,
    width:(4 + 24 * eased) * boost,
    height:(5 + 27 * eased) * boost,
    alpha:Math.min(1, .18 + zoom * 1.35)
  };
}
export class PhaserMapLayer {
  constructor(map) {
    this.map = map;
    this.destroyed = false;
    this.items = [];
    this.ready = this.start().catch(error => {
      console.warn('Cardwars 2D layer:', error);
      this.destroy(); // SVG map remains fully usable if optional visuals fail.
    });
  }
  async start() {
    const [Phaser, response] = await Promise.all([loadRuntime(), fetch(new URL(`assets/phaser/map-objects.json?v=${ASSET_VERSION}`, ROOT))]);
    if (!response.ok) throw new Error('Map object manifest unavailable');
    const manifest = await response.json();
    if (this.destroyed) return;
    const owner = this;
    this.host = document.createElement('div');
    this.host.className = 'phaser-map-layer';
    this.host.setAttribute('aria-hidden', 'true');
    Object.assign(this.host.style, {position:'absolute', inset:'0', pointerEvents:'none', overflow:'hidden'});
    this.map.svg.after(this.host);
    const width = Math.max(1, this.map.host.clientWidth), height = Math.max(1, this.map.host.clientHeight);
    class MapObjects extends Phaser.Scene {
      preload() {
        this.load.setBaseURL(ROOT.href);
        this.load.pack('cardwars-map', `assets/phaser/asset-pack.json?v=${ASSET_VERSION}`);
      }
      create() {
        for (const spec of expandMapObjectSpecs(manifest.objects)) {
          if (!this.textures.exists(spec.texture)) continue;
          const sprite = this.add.sprite(0, 0, spec.texture, spec.frame).setOrigin(.5, 1).setVisible(false);
          sprite.setDisplaySize(spec.width || 32, spec.height || 48);
          sprite.setDepth(spec.depth || 0);
          if (spec.animation && this.anims.exists(spec.animation)) sprite.play(spec.animation);
          if (spec.motion === 'banner' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.tweens.add({targets:sprite, angle:{from:-3,to:3}, duration:950, yoyo:true, repeat:-1, ease:'Sine.easeInOut'});
          }
          owner.items.push({sprite, spec});
        }
        owner.scene = this;
        owner.host.dataset.ready = 'true';
      }
      update() { owner.sync(); }
    }
    this.game = new Phaser.Game({type:Phaser.CANVAS, parent:this.host, width, height,
      transparent:true, banner:false, audio:{noAudio:true}, input:{mouse:false,touch:false,keyboard:false},
      fps:{target:30}, scene:MapObjects});
  }
  sync() {
    if (this.destroyed || !this.game) return;
    const map = this.map, width = Math.max(1,map.host.clientWidth), height = Math.max(1,map.host.clientHeight);
    if (this.game.scale.width !== width || this.game.scale.height !== height) this.game.scale.resize(width,height);
    for (const {sprite,spec} of this.items) {
      const id = spec.city === 'selected' ? map.state.selected : spec.city;
      const point = map.cityCenters?.get(id);
      const allowed = !map.state.game?.fogOfWar || map.phaserVisibleCities?.has(id);
      if (!point || !allowed) { sprite.setVisible(false); continue; }
      const q = mapToScreen(point[0],point[1],map.view,width,height);
      sprite.setPosition(q.x+(spec.offsetX||0),q.y+(spec.offsetY||0));
      let decorationVisible = true;
      if (spec.role === 'city-castle') {
        const selected = map.state.selected === id, visual = cityCastleVisual(map.view.w, selected);
        decorationVisible = visual.visible;
        sprite.setDisplaySize(visual.width, visual.height);
        sprite.setAlpha(visual.alpha);
        sprite.setDepth(selected ? 8 : (spec.depth || 0));
      }
      sprite.setVisible(decorationVisible&&q.x>=-50&&q.y>=-50&&q.x<=width+50&&q.y<=height+50);
    }
  }
  destroy() {
    this.destroyed = true;
    this.game?.destroy(true);
    this.host?.remove();
    this.items = [];
  }
}
