/** Anclas del lienzo 1760 × 980, en porcentajes; independientes de pantalla y zoom. */
export const FAUNA_SCENE = {
  size:{width:1760,height:980}, backgroundId:'background.yukofauna.illustrated',
  focusPoints:{laguna:[390,580],refugio:[850,480],bosque:[1370,320],jardin:[1130,760]},
  objects:{
    pinguino:{x:12,y:55,assetId:'object.yukofauna.pinguino'},
    buho:{x:78,y:26,assetId:'object.yukofauna.buho'},
    gato:{x:76,y:78,assetId:'object.yukofauna.gato'},
    flores:{x:50,y:82,painted:true}, estrella:{x:53,y:22},
    buhocarta:{x:68,y:47}, ovillo:{x:67,y:80}, flornota:{x:52,y:73}
  },
  reunion:{x:43,y:56}, owlFlight:{x:70,y:28},
  fish:[{id:'pez1',x:20,y:61},{id:'pez2',x:29,y:64},{id:'pez3',x:38,y:59}],
  yarnPath:[{x:69,y:84,catX:72,catY:78},{x:82,y:81,catX:77,catY:78},{x:71,y:75,catX:73,catY:80}],
  notesPath:[{x:52,y:70},{x:64,y:72},{x:58,y:64}]
};
