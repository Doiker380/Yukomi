// Dos composiciones: escritorio 1280 × 900 y móvil 941 × 1672.
export const MAP_SCENE = Object.freeze({
  background: 'background.map.illustrated',
  // Arquitectura de sprites opcionales. No se muestran sobre ilustraciones que ya incluyen edificios.
  landmarkSprites: [],
  landmarks: {
    yukofauna: {x:280,y:220,width:300,height:220,color:'#d9f5ae'},
    yukocine: {x:1000,y:210,width:300,height:230,color:'#ffd49b'},
    yukopolis: {x:635,y:424,width:330,height:240,color:'#ffe39a'},
    yukoteca: {x:1005,y:643,width:300,height:235,color:'#f3d0ff'},
    yukobservatorio: {x:260,y:650,width:280,height:235,color:'#c8d5ff'}
  },
  mobile: {
    background: 'background.map.mobile.clean.v3',
    // Staging seguro: habilitar SOLO después de sustituir el mapa por un fondo limpio
    // donde este edificio no esté ya pintado. x/y centro, medidas en unidades 941×1672.
    landmarkSprites: [
      {id:'yukofauna', assetId:'landmark.map.mobile.yukofauna', x:210, y:286, width:336, height:234, enabled:true},
      {id:'yukocine', assetId:'landmark.map.mobile.yukocine', x:748, y:278, width:300, height:300, enabled:true},
      {id:'yukopolis', assetId:'landmark.map.mobile.yukopolis', x:468, y:708, width:430, height:428, enabled:true},
      {id:'yukoteca', assetId:'landmark.map.mobile.yukoteca', x:742, y:1211, width:348, height:348, enabled:true},
      {id:'yukobservatorio', assetId:'landmark.map.mobile.yukobservatorio', x:192, y:1260, width:352, height:356, enabled:true}
    ],
    width: 941,
    height: 1672,
    // Hotspots de la ilustración vertical (centros en coordenadas del propio lienzo).
    // Futura silueta/halo: añadir recurso opcional por ID de región sin duplicar edificios.
    landmarks: {
      yukofauna: { x: 209, y: 273, width: 320, height: 315, color: '#d9f5ae' },
      yukocine: { x: 752, y: 269, width: 315, height: 315, color: '#ffd49b' },
      yukopolis: { x: 467, y: 713, width: 404, height: 430, color: '#ffe39a' },
      yukoteca: { x: 743, y: 1214, width: 330, height: 340, color: '#f3d0ff' },
      yukobservatorio: { x: 191, y: 1260, width: 322, height: 341, color: '#c8d5ff' }
    }
  }
});
