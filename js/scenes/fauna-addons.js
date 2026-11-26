/**
 * Registro de elementos EXTRAS de Yukofauna.
 * Modifica este archivo para añadir personajes de fondo, objetos, imágenes,
 * diálogos o recuerdos multimedia SIN cambiar la lógica de las cinco misiones.
 * Coordenadas x/y: porcentaje del santuario virtual, NO de la pantalla.
 *
 * Formatos:
 *  {id:'...', kind:'decoration', icon:'🌳', x:10, y:20, label:'Árbol'}
 *  {id:'...', kind:'character', image:'assets/characters/ejemplo.webp', x:64, y:32,
 *   label:'Personaje', message:'Mensaje de ejemplo.'}
 *  {id:'...', kind:'object', icon:'📻', x:44, y:70, label:'Radio',
 *   media:{type:'audio',src:'assets/audio/melodia.mp3',title:'Una melodía'}}
 *  {id:'...', kind:'object', icon:'🎞️', x:44, y:70, label:'Recuerdo',
 *   media:{type:'video',src:'assets/videos/clip.mp4',title:'Nuestro recuerdo'}}
 *
 * Los personajes originales Demian, Aokari, Andy y Nixie NO se incluyen todavía.
 * Se elegirán sus apariciones y sus ilustraciones después.
 */
export const FAUNA_ADDONS = [
  {id:'cartel-laguna',kind:'object',icon:'🪧',x:7,y:48,label:'Cartel de la laguna',message:'El pingüinito necesita 3 peces para volver con su familia. Ayúdalo jaja.'},
  {id:'luz-bosque',kind:'decoration',icon:'🏮',x:67,y:49,label:'Farol del bosque'},
  {id:'setas',kind:'decoration',icon:'🍄',x:90,y:83,label:'Setas mágicas'},
  {id:'piedras',kind:'decoration',icon:'🪨',x:33,y:80,label:'Piedras del lago'}
];
