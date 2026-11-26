import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { MAP_SCENE } from '../js/data/map-scene.js';
import { assetUrl } from '../js/data/asset-manifest.js';
const root = resolve(import.meta.dirname, '..');
assert.deepEqual(MAP_SCENE.landmarkSprites, [], 'Escritorio no debe contener sprites móviles');
assert.equal(MAP_SCENE.mobile.background, 'background.map.mobile.clean.v3');
assert.equal(MAP_SCENE.mobile.landmarkSprites.length, 5);
for (const sprite of MAP_SCENE.mobile.landmarkSprites) {
  assert(sprite.enabled, `${sprite.id} debe estar activado`);
  assert(['yukofauna','yukocine','yukopolis','yukoteca','yukobservatorio'].includes(sprite.id));
  const src = assetUrl(sprite.assetId);
  assert(src && existsSync(resolve(root, src)), `Falta sprite de ${sprite.id}: ${src}`);
  assert(Math.abs(sprite.x - MAP_SCENE.mobile.landmarks[sprite.id].x) < 30,
    `${sprite.id}: sprite no coincide con hotspot X`);
  assert(Math.abs(sprite.y - MAP_SCENE.mobile.landmarks[sprite.id].y) < 30,
    `${sprite.id}: sprite no coincide con hotspot Y`);
}
const background=assetUrl(MAP_SCENE.mobile.background);
assert(background && existsSync(resolve(root, background)));
console.log('OK 2.9.4: mapa escritorio intacto, fondo móvil limpio y cinco sprites con hotspots alineados.');
