import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname,resolve } from 'node:path';
import { CINEMA_SCENE } from '../js/data/cinema-scene.js';
import { assetUrl } from '../js/data/asset-manifest.js';
import { MEMORIES } from '../js/data/memories.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const scene=readFileSync(resolve(root,'js/scenes/story-world.js'),'utf8');
const cinema=readFileSync(resolve(root,'js/scenes/cinema.js'),'utf8');
const styles=readFileSync(resolve(root,'css/cinema-illustrated.css'),'utf8');
assert.equal(CINEMA_SCENE.size.width,1800);
assert.equal(CINEMA_SCENE.size.height,1000);
assert.equal(CINEMA_SCENE.fitHeightOnReset,true);
assert.equal(CINEMA_SCENE.markers.length,3);
assert.deepEqual(CINEMA_SCENE.discoveryIds,['cartelera','taquilla','proyector']);
assert.deepEqual(CINEMA_SCENE.markers.map(x=>x.id),CINEMA_SCENE.discoveryIds);
for (const m of CINEMA_SCENE.markers) {
  assert.ok(m.x>0 && m.x<100 && m.y>0 && m.y<100);
  assert.ok(CINEMA_SCENE.focusPoints[m.id]);
}
assert.ok(assetUrl(CINEMA_SCENE.backgroundId));
assert.match(scene,/fitHeightOnReset = false/);
assert.match(scene,/if\(fitHeightOnReset\)\{explorer\.reset\(\);focusTabs\(\);\}/);
assert.match(cinema,/memories\.collection/);
assert.match(cinema,/pageSize:12/);
assert.ok(MEMORIES.some(m=>m.locations.some(p=>p.region==='yukocine'&&p.object==='proyector')));
assert.match(styles,/story-world-yukocine \.story-hotspot/);
console.log('OK: Yukocine 2.6, acciones, configuracion, carga diferida y compatibilidad');
