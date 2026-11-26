/** Configuración visual de Yukópolis. x/y en porcentaje del lienzo, nunca de pantalla. */
export const CITY_SCENE = {
  size:{width:1800,height:1000},
  backgroundId:'background.yukopolis.illustrated',fallbackId:'background.yukopolis',
  focusPoints:{plaza:[540,760],calendario:[630,510],correo:[1242,530],teatro:[1602,520],museo:[981,340],computadora:[1026,710]},
  objects:{
    plaza:{x:33,y:79,width:125,height:195,label:'Habitante',assetId:'character.yukopolis.greeter'},
    calendario:{x:35,y:51,width:140,height:170,label:'Ayuntamiento',painted:true},
    correo:{x:69,y:53,width:130,height:170,label:'Yukocorreo',painted:true},
    teatro:{x:89,y:52,width:200,height:180,label:'Teatro',painted:true}
  }
};
