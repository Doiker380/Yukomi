/**
 * Yukocine 2.6 · Configuración espacial, no contenido de vídeos.
 * Coordenadas porcentuales del escenario de 1800 × 1000.
 * Mantener IDs de descubrimiento para preservar Yukopasaporte.
 */
export const CINEMA_SCENE = Object.freeze({
  size: {width:1800,height:1000},
  backgroundId:'background.yukocine.illustrated',
  fallbackId:'background.yukocine',
  initial:'taquilla',
  fitHeightOnReset:true,
  markers:[
    {id:'cartelera',icon:'🎭',label:'Cartelera de historias',stageLabel:'Cartelera',tab:'Cartelera',x:19,y:54},
    {id:'taquilla',icon:'🎟️',label:'Taquilla fantástica',stageLabel:'Taquilla',tab:'Taquilla',x:53,y:66},
    {id:'proyector',icon:'🎞️',label:'Sala de proyección',stageLabel:'Proyecciones',tab:'Proyector',x:82,y:42}
  ],
  focusPoints:{cartelera:[342,540],taquilla:[950,660],proyector:[1476,420]},
  discoveryIds:['cartelera','taquilla','proyector']
});
