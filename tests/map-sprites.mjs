import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { MAP_SCENE } from '../js/data/map-scene.js';
import { ASSET_MANIFEST, validateAssets } from '../js/data/asset-manifest.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)), '..');
assert.deepEqual(validateAssets(), []);
assert.equal(MAP_SCENE.landmarkSprites.length, 0, 'Mapa de escritorio no debe crear sprites nuevos');
const sprites=MAP_SCENE.mobile.landmarkSprites;
assert.equal(sprites.length,5);
assert.deepEqual(sprites.map(s => s.id), ['yukofauna','yukocine','yukopolis','yukoteca','yukobservatorio']);
for(const a of sprites){
  assert.equal(a.enabled, true, `${a.id} debe mostrarse sobre el fondo limpio`);
  assert(a.x>=0 && a.x<=941 && a.y>=0 && a.y<=1672);
  const path=ASSET_MANIFEST[a.assetId]?.src;
  assert(path && existsSync(resolve(root,path)));
  assert(statSync(resolve(root,path)).size < 650000, `${a.id}: sprite sin optimizar`);
}
const bg=ASSET_MANIFEST[MAP_SCENE.mobile.background]?.src;
assert(bg && existsSync(resolve(root,bg)));
const src=readFileSync(resolve(root,'js/map.js'),'utf8');
assert(src.includes('function refreshSpriteLayers()'));
assert(src.includes('if (!sprite.enabled) continue'));
assert(src.includes('(box.width / worldW) * 1.04'));
console.log('OK mapa 2.9.4: fondo móvil limpio, cinco sprites activos, zoom 1.04 y escritorio intacto.');
