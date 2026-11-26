/**
 * Yukoteca piloto: TODOS los elementos comparten coordenadas del escenario 1800x1000.
 * x/y son porcentajes del escenario, nunca coordenadas de pantalla.
 * La imagen de fondo no incluye botones. Puedes cambiar los IDs de recurso en este archivo.
 * Cambiar un recurso visual no altera las acciones ni los IDs del Yukopasaporte.
 */
// Reversión inmediata: cambia a false para recuperar los iconos de la fase 2.3.
// Incluso cuando es true, cada botón vuelve al icono si falta o falla su PNG.
export const USE_YUKOTECA_PNG_BUTTONS = true;
// Reversible. Si el fondo PNG todavía no existe o falla, se ve archive.svg.
export const USE_YUKOTECA_CLEAN_BACKGROUND = true;
const buttonAsset = key => USE_YUKOTECA_PNG_BUTTONS ? `ui.yukoteca.btn_${key}` : null;

export const LIBRARY_SCENE = {
  id: 'yukoteca',
  size: { width:1800, height:1000 },
  backgroundId: USE_YUKOTECA_CLEAN_BACKGROUND ? 'background.yukoteca.clean' : 'background.yukoteca',
  backgroundFallbackId: 'background.yukoteca',
  start: 'fotos',
  focusPoints: {taller:[435,620], albumes:[920,575], fotos:[1490,620]},
  navigation: [
    {id:'taller',label:'Dibujos',icon:'🎨', enabled:false, action:{type:'gallery',target:'taller'}, x:24,y:62,scale:1, assetId:buttonAsset('dibujos'), className:'library-art'},
    {id:'albumes',label:'Álbumes',icon:'📖',action:{type:'albums'},x:51,y:58,scale:1,assetId:buttonAsset('albumes'),className:'library-albums'},
    {id:'fotos',label:'Fotos',icon:'📷',action:{type:'gallery',target:'fotos'},x:82,y:62,scale:1,assetId:buttonAsset('fotos'),className:'library-photos'}
  ],
  decorations: [
    {id:'floating-pages',x:35,y:19,text:'✧　✦　✧',className:'library-floating-page'},
    {id:'library-sign',x:32,y:1.6,text:'✦ Yukoteca · fotos & recuerdos ✦',className:'library-sign',anchor:'top-left'}
  ],
  // Personalización futura. No agregamos personajes o elementos sin recursos aprobados.
  objects: []
};
