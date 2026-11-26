import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {computeHeightFitScale} from '../js/world/explorer.js';
import {LIBRARY_SCENE} from '../js/data/library-scene.js';
const root = new URL('../', import.meta.url);
const css = readFileSync(new URL('css/scene-layers.css',root),'utf8');
const libraryJs = readFileSync(new URL('js/scenes/library.js',root),'utf8');
for (const h of [420,560,660]) {
  const scale=computeHeightFitScale(h,1000);
  assert(scale<.8, `Debe iniciar alejado con ventana de ${h}px`);
  assert(1000*scale <= h-10, 'La escena debe caber verticalmente con margen');
  assert(1800*scale > 380 || h >= 660, 'En móvil debe existir desplazamiento horizontal');
}
assert.equal(computeHeightFitScale(2000,1000),1);
assert.equal(LIBRARY_SCENE.navigation.length,3);
assert.deepEqual(LIBRARY_SCENE.navigation.map(e=>e.id),['taller','albumes','fotos']);
assert(libraryJs.includes('fitHeightOnReset:true'));
assert(css.includes('.library-hotspot.has-artwork .library-hotspot-label'));
assert(css.includes('display:none'));
for(const n of LIBRARY_SCENE.navigation) assert(n.action && n.label);
console.log('OK Yukoteca 2.3.4: encuadre horizontal, botones con acción y etiquetas accesibles.');
