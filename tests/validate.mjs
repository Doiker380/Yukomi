// Opcional: ejecuta `node tests/validate.mjs` desde la raíz.
import { existsSync, readFileSync } from 'node:fs';
import { ASSET_MANIFEST, assetUrl, validateAssets } from '../js/data/asset-manifest.js';
import { LIBRARY_SCENE } from '../js/data/library-scene.js';
import { validateSceneConfig } from '../js/world/scene-layers.js';
import { getCharacterLayerEntries } from '../js/data/characters.js';
import { resolve } from 'node:path';
import { MEMORIES, validateMemories } from '../js/data/memories.js';
import { MEMORY_ANCHORS } from '../js/data/memory-anchors.js';
import { REGIONS } from '../js/map.js';
import { LIBRARY_ALBUMS, LIBRARY_ARTWORKS, LIBRARY_PHOTOS } from '../js/data/library-content.js';
const root = resolve(import.meta.dirname, '..');
const errors = [...validateMemories(), ...validateAssets(), ...validateSceneConfig(LIBRARY_SCENE,id=>!!assetUrl(id))];
const optionalMissing=[];
for(const [id,a] of Object.entries(ASSET_MANIFEST)){
  if(!existsSync(resolve(root,a.src))){
    if(a.optional) optionalMissing.push(`${id} -> ${a.src}`);
    else errors.push(`Falta recurso: ${id} -> ${a.src}`);
  }
}
if(optionalMissing.length) console.warn(`RECURSOS OPCIONALES POR COPIAR (se usan los botones originales):\n${optionalMissing.join('\n')}`);
if(LIBRARY_SCENE.navigation.map(n=>n.id).join(',')!=='taller,albumes,fotos')errors.push('Yukoteca debe incluir solo Dibujos, Álbumes y Fotos');
if(LIBRARY_SCENE.size.width!==1800||LIBRARY_SCENE.size.height!==1000)errors.push('Dimensiones distintas del fondo actual');
if(getCharacterLayerEntries('yukoteca').length!==0)errors.push('Aparecen personajes sin configuración aprobada');

const illustratedFrame=MEMORY_ANCHORS.yukoteca.find(a=>a.id==='marco');
if(!illustratedFrame || illustratedFrame.x!==13.8 || illustratedFrame.y!==74 || !illustratedFrame.painted || illustratedFrame.width!==142 || illustratedFrame.height!==156 || !illustratedFrame.glow?.path) errors.push('El marco no coincide con el cuadro pintado en la mesa');
if(illustratedFrame?.painted!==true || illustratedFrame?.assetId) errors.push('El marco pintado debe conservar solo la zona interactiva');
if(assetUrl('object.yukoteca.marco_recuerdos')) errors.push('No debe registrarse un PNG duplicado del marco pintado');
if(!MEMORIES.some(m=>m.id==='postal-estelar' && m.locations.some(p=>p.region==='yukoteca' && p.object==='marco')))errors.push('Se perdió la acción del marco');
const regions = new Set(REGIONS.map(r => r.id));
const anchors = new Set();
for (const [region, list] of Object.entries(MEMORY_ANCHORS)) {
  if (!regions.has(region)) errors.push(`Anclas en región inválida: ${region}`);
  for (const a of list) {
    const key = `${region}:${a.id}`;
    if (anchors.has(key)) errors.push(`Ancla duplicada: ${key}`);
    anchors.add(key);
    if (![a.x,a.y].every(Number.isFinite) || a.x<0 || a.x>100 || a.y<0 || a.y>100) errors.push(`Coordenadas: ${key}`);
  }
}
for (const m of MEMORIES) {
  if (!regions.has(m.primaryRegion)) errors.push(`Región principal inválida: ${m.id}`);
  if ((m.src || m.assetId) && !existsSync(resolve(root, m.assetId?assetUrl(m.assetId):m.src))) errors.push(`Archivo sin encontrar: ${m.id}`);
  if ((m.thumbnail || m.thumbnailAssetId) && !existsSync(resolve(root, m.thumbnailAssetId?assetUrl(m.thumbnailAssetId):m.thumbnail))) errors.push(`Miniatura sin encontrar: ${m.id}`);
  for (const p of m.locations) {
    if (!regions.has(p.region)) errors.push(`Región secundaria inválida: ${m.id}/${p.region}`);
    if (p.region !== 'yukocine' && !anchors.has(`${p.region}:${p.object}`)
        && !(p.region === 'yukoteca' && ['taller','fotos','albumes'].includes(p.object))) {
      errors.push(`Objeto de recuerdo no registrado: ${m.id}/${p.region}:${p.object}`);
    }
  }
}
for (const a of LIBRARY_ALBUMS) for (const p of a.pages) {
  if (p.memoryId && !MEMORIES.some(m=>m.id===p.memoryId)) errors.push(`Página de álbum rota: ${p.memoryId}`);
}
if (REGIONS.find(r=>r.id==='yukoteca')?.objects.some(o=>o.id==='proyector')) errors.push('Yukoteca no debe tener proyector.');
if (MEMORIES.some(m=>m.locations?.some(p=>p.region==='yukoteca'&&p.object==='proyector'))) errors.push('Recuerdos obsoletos del proyector en Yukoteca.');
if (LIBRARY_ARTWORKS.some(a=>!a.src) || LIBRARY_PHOTOS.some(a=>!a.src)) errors.push('Galería con archivo faltante.');
if (!LIBRARY_ARTWORKS.length || !LIBRARY_PHOTOS.length) errors.push('Dibujos y fotos deben tener al menos una muestra.');
const sceneSource = readFileSync(resolve(root,'js/scenes/library.js'),'utf8');
const backdropSource = readFileSync(resolve(root,'assets/regions/yukoteca/archive.svg'),'utf8');
if (/LIBRARY_CLIPS|openProjector|data-open=["']proyector["']|data-focus=["']proyector["']/.test(sceneSource)) errors.push('Restos del proyector en Yukoteca.');
if (/<text(?:\s|>)/i.test(backdropSource)) errors.push('El fondo de Yukoteca aún tiene rótulos incrustados.');
if (REGIONS.length !== 5 || regions.has('yukolandia')) errors.push('El mapa debe tener exactamente cinco regiones sin Yukolandia.');
if (!sceneSource.includes('mountSceneLayers'))errors.push('Yukoteca no usa sistema de capas');
if (errors.length) {console.error(errors.join('\n')); process.exitCode=1;}
else console.log(`OK: ${REGIONS.length} regiones, ${MEMORIES.length} recuerdos, ${anchors.size} anclas y ${LIBRARY_ALBUMS.length} álbumes.`);
