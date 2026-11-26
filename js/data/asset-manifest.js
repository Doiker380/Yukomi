/**
 * Yukoverso 2.3 - Registro central de recursos.
 * ID estable -> único archivo local. No descarga ni crea recursos.
 * Los recursos opcionales permanecen fuera del registro hasta que existan.
 */
export const ASSET_MANIFEST = Object.freeze({
  'background.map.illustrated': {type:'image',src:'assets/map/mapa_ilustrado_v1.webp',width:1495,height:1052,role:'background'},
  'background.map.mobile.illustrated': {type:'image',src:'assets/map/mapa_ilustrado_mobile_v1.webp',width:941,height:1672,role:'background'},
  'background.map.mobile.clean.v3': {type:'image',src:'assets/map/mapa_ilustrado_mobile_clean_v3.webp',width:941,height:1672,role:'background'},
  // Primer sprite independiente (apagado hasta disponer del mapa sin edificio pintado).
  'landmark.map.mobile.yukofauna': {type:'image',src:'assets/map/sprites/yukofauna_v1.webp',role:'landmark'},
  'landmark.map.mobile.yukocine': {type:'image',src:'assets/map/sprites/yukocine_v1.webp',role:'landmark'},
  'landmark.map.mobile.yukopolis': {type:'image',src:'assets/map/sprites/yukopolis_v1.webp',role:'landmark'},
  'landmark.map.mobile.yukoteca': {type:'image',src:'assets/map/sprites/yukoteca_v1.webp',role:'landmark'},
  'landmark.map.mobile.yukobservatorio': {type:'image',src:'assets/map/sprites/yukobservatorio_v1.webp',role:'landmark'},
  'background.yukoteca': { type:'image', src:'assets/regions/yukoteca/archive.svg', width:1800, height:1000, role:'background' },
  // Fondo definitivo opcional: conserva archive.svg como respaldo hasta que copies el PNG.
  'background.yukoteca.clean': { type:'image', src:'assets/regions/yukoteca/yukoteca_bg_clean_v1.png', width:1800, height:1000, role:'background', optional:true },
  // Opcionales: copiar los PNG reales en assets/ui/yukoteca/ para activarlos.
  'ui.yukoteca.btn_dibujos': { type:'image', src:'assets/ui/yukoteca/btn_dibujos.png', role:'button', optional:true },
  'ui.yukoteca.btn_fotos': { type:'image', src:'assets/ui/yukoteca/btn_fotos.png', role:'button', optional:true },
  'ui.yukoteca.btn_albumes': { type:'image', src:'assets/ui/yukoteca/btn_albumes.png', role:'button', optional:true },
  'background.yukofauna.illustrated': {type:'image',src:'assets/regions/yukofauna/santuario_ilustrado_v1.webp',width:1681,height:936,role:'background'},
  'object.yukofauna.pinguino': {type:'image',src:'assets/objects/yukofauna/pinguino_v1.webp',role:'object'},
  'object.yukofauna.buho': {type:'image',src:'assets/objects/yukofauna/buho_v1.webp',role:'object'},
  'object.yukofauna.pez': {type:'image',src:'assets/objects/yukofauna/pez_v1.webp',role:'object'},
  'object.yukofauna.gato': {type:'image',src:'assets/objects/yukofauna/gato_v1.webp',role:'object'},
  'background.yukofauna': { type:'image', src:'assets/regions/yukofauna/santuario.svg', role:'background' },
  'background.yukopolis.illustrated': {type:'image',src:'assets/regions/yukopolis/capital_ilustrada_v1.webp',role:'background'},
  'character.yukopolis.greeter': {type:'image',src:'assets/characters/yukopolis/habitante_v1.webp',role:'character'},
  'background.yukopolis': { type:'image', src:'assets/regions/yukopolis/capital.svg', role:'background' },
  'background.yukocine.illustrated': {type:'image',src:'assets/regions/yukocine/cine_v1.webp',role:'background'},
  'background.yukocine': { type:'image', src:'assets/regions/yukocine/cinema.svg', role:'background' },
  'background.yukobservatorio.illustrated': {type:'image',src:'assets/regions/yukobservatorio/observatorio_v1.webp',role:'background'},
  'background.yukobservatorio': { type:'image', src:'assets/regions/yukobservatorio/sky.svg', role:'background' },
  'demo.pinguino': { type:'image', src:'assets/demo-art/pinguino.svg', role:'art' },
  'demo.flores': { type:'image', src:'assets/demo-art/flores.svg', role:'art' },
  'demo.espacio': { type:'image', src:'assets/demo-art/espacio.svg', role:'art' },
  'demo.estrellas': { type:'image', src:'assets/demo-art/estrellas.svg', role:'art' },
  'demo.yukocine': { type:'video', src:'assets/videos/demo-yukocine.mp4', role:'clip' }
});

export function getAsset(id) { return ASSET_MANIFEST[id] ?? null; }
export function assetUrl(id) { return getAsset(id)?.src ?? null; }
export function validateAssets() {
  const errors=[]; const files=new Map();
  for(const [id,asset] of Object.entries(ASSET_MANIFEST)) {
    if(!/^[a-z0-9][a-z0-9._-]+$/.test(id)) errors.push(`ID inválido: ${id}`);
    if(!['image','video','audio'].includes(asset.type)) errors.push(`Tipo inválido: ${id}`);
    if(typeof asset.src!=='string' || !/^assets\/[a-z0-9_./-]+$/i.test(asset.src) || asset.src.includes('..')) errors.push(`Ruta insegura: ${id}`);
    if(files.has(asset.src)) errors.push(`Archivo duplicado bajo IDs distintos: ${id} y ${files.get(asset.src)}`);
    files.set(asset.src,id);
  }
  return errors;
}
