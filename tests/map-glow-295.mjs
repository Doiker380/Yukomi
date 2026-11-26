import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAP_SCENE } from '../js/data/map-scene.js';
import { assetUrl } from '../js/data/asset-manifest.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sprites=MAP_SCENE.mobile.landmarkSprites;
assert.equal(sprites.length,5);
assert(sprites.every(s=>s.enabled));
for(const sprite of sprites) {
  assert(MAP_SCENE.mobile.landmarks[sprite.id],`No hotspot para ${sprite.id}`);
  assert(existsSync(resolve(root,assetUrl(sprite.assetId))),`No existe ${sprite.id}`);
}
const css=readFileSync(resolve(root,'css/styles.css'),'utf8');
assert(css.includes('.map-landmark-sprite'));
assert(css.includes('drop-shadow('));
assert(css.includes('.world-illustrated.world-mobile .region-marker::before { opacity: .12; }'));
console.log('OK mapa 2.9.5a: cinco sprites, hotspots y glow permanente definidos.');
