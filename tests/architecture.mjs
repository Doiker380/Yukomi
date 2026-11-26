import assert from 'node:assert/strict';
import {ASSET_MANIFEST, assetUrl,validateAssets} from '../js/data/asset-manifest.js';
import {LIBRARY_SCENE,USE_YUKOTECA_PNG_BUTTONS} from '../js/data/library-scene.js';
import {validateSceneConfig} from '../js/world/scene-layers.js';
import {getCharacterLayerEntries,CHARACTER_REGISTRY} from '../js/data/characters.js';
import {MEMORY_ANCHORS} from '../js/data/memory-anchors.js';
import {getMemory,memoriesAt} from '../js/data/memories.js';
import {loadProgress,saveProgress} from '../js/storage.js';

assert.deepEqual(validateAssets(),[]);
assert.deepEqual(validateSceneConfig(LIBRARY_SCENE,id=>!!assetUrl(id)),[]);
assert.equal(LIBRARY_SCENE.size.width,1800);
assert.equal(LIBRARY_SCENE.size.height,1000);
assert.equal(LIBRARY_SCENE.navigation.length,3);
assert.deepEqual(LIBRARY_SCENE.navigation.map(e=>e.id),['taller','albumes','fotos']);
assert(!LIBRARY_SCENE.navigation.some(e=>e.id==='proyector'));
const frame=MEMORY_ANCHORS.yukoteca.find(e=>e.id==='marco');
assert(frame);
assert.deepEqual([frame.x,frame.y],[13.8,74]);
assert.equal(frame.painted,true);
assert.equal(frame.width,142);
assert.equal(frame.height,156);
assert(frame.glow?.path, 'El marco usa contorno luminoso según su perspectiva');
assert.equal(frame.assetId,undefined, 'El marco pintado no debe cargar otro PNG');
assert.equal(assetUrl('object.yukoteca.marco_recuerdos'),null);
assert(memoriesAt('yukoteca','marco').some(m=>m.id==='postal-estelar'));
const buttonAssets = {
  taller: ['ui.yukoteca.btn_dibujos','assets/ui/yukoteca/btn_dibujos.png'],
  fotos: ['ui.yukoteca.btn_fotos','assets/ui/yukoteca/btn_fotos.png'],
  albumes: ['ui.yukoteca.btn_albumes','assets/ui/yukoteca/btn_albumes.png']
};
for(const item of LIBRARY_SCENE.navigation){
  const [id,path]=buttonAssets[item.id];
  assert.equal(assetUrl(id),path);
  assert.equal(ASSET_MANIFEST[id].optional,true);
  assert.equal(item.assetId,USE_YUKOTECA_PNG_BUTTONS?id:null);
}
assert.equal(LIBRARY_SCENE.navigation.find(e=>e.id==='taller').action.type,'gallery');
assert.equal(LIBRARY_SCENE.navigation.find(e=>e.id==='taller').action.target,'taller');
assert.equal(LIBRARY_SCENE.navigation.find(e=>e.id==='fotos').action.target,'fotos');
assert.equal(LIBRARY_SCENE.navigation.find(e=>e.id==='albumes').action.type,'albums');

for(const element of LIBRARY_SCENE.navigation){
  assert(Number.isFinite(element.x)&&Number.isFinite(element.y));
  assert(element.action && typeof element.action.type==='string');
  assert(element.x>=0 && element.x<=100 && element.y>=0 && element.y<=100);
  const [fx,fy]=LIBRARY_SCENE.focusPoints[element.id];
  assert(Math.abs(fx-element.x*18)<40 && Math.abs(fy-element.y*10)<40);
}
assert.deepEqual(getCharacterLayerEntries('yukoteca'),[]);
assert(Object.keys(CHARACTER_REGISTRY).includes('suki'));
assert.equal(getMemory('boceto-pinguino').src,assetUrl('demo.pinguino'));
assert(memoriesAt('yukoteca','taller').some(e=>e.id==='boceto-pinguino'));
const legacyProgress={visited:['yukofauna','yukolandia'],lastRegion:'yukolandia',discoveries:['yukoteca:taller','yukolandia:reliquias'],memoriesFound:['boceto-pinguino']};
const store=new Map([['yukoverso_progress_v1',JSON.stringify(legacyProgress)]]);
globalThis.localStorage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
const loaded=loadProgress();
assert(loaded.visited.includes('yukopolis'));
assert(loaded.discoveries.includes('yukoteca:taller'));
assert(loaded.discoveries.includes('yukopolis:partidas'));
assert(loaded.memoriesFound.includes('boceto-pinguino'));
assert(saveProgress(loaded));
assert(JSON.parse(store.get('yukoverso_progress_v1')).visited.includes('yukofauna'));
console.log(`OK arquitectura 2.3: ${Object.keys(ASSET_MANIFEST).length} recursos, tres accesos y migración antigua preservada.`);
