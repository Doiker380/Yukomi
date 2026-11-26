import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { MAP_SCENE } from '../js/data/map-scene.js';
import { assetUrl } from '../js/data/asset-manifest.js';
import { REGIONS } from '../js/map.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ids = new Set(REGIONS.map(region => region.id));
assert.equal(ids.size, 5);
assert.equal(Object.keys(MAP_SCENE.landmarks).length, 5);
assert.equal(Object.keys(MAP_SCENE.mobile.landmarks).length, 5);
assert.equal(MAP_SCENE.mobile.width, 941);
assert.equal(MAP_SCENE.mobile.height, 1672);
assert.notEqual(MAP_SCENE.mobile.background, MAP_SCENE.background);
for (const id of ids) {
  for (const [mode, markers, w, h] of [
    ['desktop', MAP_SCENE.landmarks, 1280, 900],
    ['mobile', MAP_SCENE.mobile.landmarks, MAP_SCENE.mobile.width, MAP_SCENE.mobile.height]
  ]) {
    const a = markers[id];
    assert(a, `${mode}: sin landmark ${id}`);
    assert(Object.values(a).filter(v => typeof v === 'number').every(Number.isFinite));
    assert(a.x >= 0 && a.x <= w && a.y >= 0 && a.y <= h);
    assert(a.width >= 130 && a.width <= w && a.height >= 130 && a.height <= h);
  }
}
const mobile = assetUrl(MAP_SCENE.mobile.background);
const desktop = assetUrl(MAP_SCENE.background);
for (const name of [mobile, desktop]) {
  assert(name && existsSync(resolve(root, name)), `Sin archivo: ${name}`);
  assert(statSync(resolve(root, name)).size > 10000, `Imagen vacía: ${name}`);
}
assert(statSync(resolve(root, mobile)).size < 900_000, 'El fondo móvil debe ser ligero');
const source=readFileSync(resolve(root,'js/map.js'),'utf8');
assert(source.includes('document.createElement("picture")'));
assert(source.includes('mobileSource.media = MOBILE_MATCH'));
assert(source.includes('MAP_SCENE.mobile.landmarks'));
assert(source.includes('layer.classList.toggle("world-mobile", mobile)'));
console.log('OK mapa móvil: dos imágenes independientes, cinco zonas, coordenadas, zoom y peso válido.');
