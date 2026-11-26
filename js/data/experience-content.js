/**
 * YUKOVERSO 2.0 — ARCHIVO PARA PERSONALIZAR LAS NUEVAS REGIONES.
 * Textos personalizados para Yuko. Conservar las claves y el orden de las escenas.
 * Los medios siguen en assets/images, assets/videos y assets/audio.
 * Los elementos multimedia son opcionales; no uses enlaces privados expuestos.
 */
export const OBSERVATORY = {
  introduction: 'Yukooo, ven. Aquí guardé unas cositas que quería decirte, pero en versión estrellitas jaja.',
  pathNotes: [
    'Te juro que si me pongo a recordar nuestras partidas, no termino nunca jajaja.',
    'Aquí hay estrellas por tus risas, tus gritos, tus ideas y por todas esas cosas tan tuyas.',
    'Y sí, puedes volver cuando quieras. Este rinconcito es tuyo.'
  ],
  constellations: [
    {id:'voz', icon:'🎙️', title:'La de las canciones', text:'Me encanta cuando hacemos karaoke y cuando me enseñas música. Contigo hasta una canción random termina teniendo su historia jajaja.'},
    {id:'trazos', icon:'🎨', title:'La de tus ideas', text:'Me gusta muchísimo cómo dibujas y cómo se te ocurren personajes. Pensar que así empezaron Demian y Aokari... Que goood.'},
    {id:'risas', icon:'✨', title:'La de tus gritos JAJA', text:'Tus sustos, tus risas y esos gritos en medio de una partida... había que dedicarles una constelación, OBVIO.'}
  ],
  letter: {
    title:'Una cartita para ti',
    greeting:'Yukoooo, feliz cumpleaños 💜',
    paragraphs:[
      'No sé ni por dónde empezar jajaja. Quería hacerte algo bonito por tu cumpleaños y terminé haciendo un planeta entero. Sí, un planeta con nombres de Yuko por todos lados. Un poco exagerado, ¿no? Pero me hacía mucha ilusión que tuvieras un lugar lleno de cositas nuestras.',
      'Me pongo a pensar en todas las cosas que hemos hecho y me da mucha risa. Los juegos random que encontrábamos, cuando nos viciábamos con uno y después lo abandonábamos, las skins match, las partidas con Warrior, Minecraft, Corner, Fortnite... y ni hablar de los gritos y sustos JAJAJA. Que goood haber guardado tantos momentos.',
      'También me acuerdo de cuando hacíamos karaoke, de las películas que me enseñaste y de nuestras llamadas larguísimas. ¿Más de 200 horas? JAJA, es que ni nosotros. Me gusta mucho que contigo podemos pasar de una tontería a una conversación bonita sin darnos cuenta.',
      'Hay algo tuyo que me gusta muchísimo y es la imaginación que tienes. La forma en la que haces tus skins, los detalles que les pones, tus dibujos, los personajes que se nos ocurren... todavía me hace ilusión pensar en Demian y Aokari y en todas las historias que podemos inventar.',
      'Y no son solo los juegos o las risas. Me caes demasiado bien, Yuko, y te tengo muchísimo cariño. Has sido alguien muy importante para mí. Me alegra un montón que sigamos compartiendo ratos, aunque las cosas hayan cambiado con el tiempo. De verdad valoro mucho que estés en mi vida.',
      'Quería que al abrir esto encontraras un pedacito de todos esos recuerdos y, sobre todo, que supieras que me importas. Ojalá te rías con las tonterías que escondí por aquí. Si en algún momento dices «qué es esta cosa JAJA», misión cumplida.',
      'Feliz cumpleaños, Yuko. Espero que este nuevo año te traiga cosas bonitas, buenas partidas, música, dibujos, pelis y muchos momentos que te hagan feliz. Y acuérdate de comer bien, viciosa JAJA. Te quiero muchísimo. 💜'
    ],
    closing:'Con muchísimo cariño, David 💜'
  },
  finaleTitle:'Yukooo, feliz cumpleaños 💜',
  finaleMessage:'18 estrellitas para ti, porque hoy te toca brillar. Que goood poder celebrarte así JAJA. Gracias por tantos momentos bonitos, Yuko. Te quiero mucho 💜',
  // Opcional: agrega aquí un audio propio, por ejemplo 'assets/audio/felicitacion.mp3'.
  greetingAudio: '',
  // Cuando exista tu otra carta en GitHub Pages, pega aquí su URL completa HTTPS.
  // En blanco: no aparece ningún enlace roto.
  extraLetterUrl: ''
};

export const CINEMA = {
  posters:[
    {id:'musical',icon:'🎭',title:'La función musical',genre:'Musical',src:'assets/demo-art/estrellas.svg',description:'Obvio tenía que haber algo de musicales por aquí. Ya sabes cómo nos ponemos cuando sale una canción buena JAJA.'},
    {id:'terror',icon:'👻',title:'El rincón de los gritos',genre:'Terror',src:'assets/demo-art/espacio.svg',description:'Con los gritos que pegas en las partidas, cómo no iba a poner esto aquí JAJA.'},
    {id:'drama',icon:'💌',title:'Las historias que me muestras',genre:'Dramas',src:'assets/demo-art/flores.svg',description:'Me gusta un montón cuando me enseñas películas y series que yo ni conocía. Siempre terminamos encontrando otra para ver.'}
  ],
  genreReactions:{
    musical:'Yukomusical activadoooo. Ahora sí, pon tu mejor voz JAJA.',
    terror:'Yukosusto detectado JAJA. A ver quién grita primero.',
    drama:'Otra historia para ver. Yo llevo las palomitas, tú eliges la peli.'
  },
};
