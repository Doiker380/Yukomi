import { assetUrl } from './asset-manifest.js';
/**
 * YUKOVERSO · Catálogo ÚNICO de recuerdos.
 * Un ID corresponde a un solo archivo. Las apariciones son referencias,
 * nunca copias del fichero.
 *
 * Tipos: image | video | audio | text.
 * location: zona lógica; cada objeto del mundo puede ofrecer varios recuerdos.
 */

const BASE_MEMORIES = [
  {
    id: 'demo-video', type: 'video', title: 'Un videíto de prueba',
    description: 'Este es un videíto de prueba. Los videos de verdad van en este mismo lugar.',
    src: 'assets/videos/demo-yukocine.mp4', thumbnail: 'assets/demo-art/espacio.svg',
    category: 'Ensayos', tags: ['demo', 'video'], primaryRegion: 'yukocine',
    locations: [
      { region: 'yukocine', object: 'proyector' },
      { region: 'yukopolis', object: 'computadora' },
    ], demo: true
  },
  {
    id: 'ejemplo-roblox', type: 'image', title: 'Rinconcito de Roblox',
    description: 'Por aquí también guardé unas cuantas partidas de Roblox. Ve a ver las fotitos jaja.',
    src: 'assets/demo-art/espacio.svg', thumbnail: 'assets/demo-art/espacio.svg',
    category: 'Partidas', tags: ['roblox', 'captura', 'demo'], primaryRegion: 'yukopolis',
    locations: [{ region: 'yukopolis', object: 'museo' }, { region: 'yukocine', object: 'proyector' }, { region: 'yukoteca', object: 'fotos' }], demo: true
  },
  {
    id: 'ejemplo-repo', type: 'text', title: 'R.E.P.O. y sus sustos',
    description: 'El rincón de R.E.P.O. todavía espera su clip. Pero con los sustos que nos pegamos, cómo no iba a mencionarlo JAJA.',
    category: 'Partidas', tags: ['repo', 'demo'], primaryRegion: 'yukopolis',
    locations: [{ region: 'yukopolis', object: 'museo' }], demo: true
  },
  {
    id: 'ejemplo-peak', type: 'text', title: 'PEAK y las caídas',
    description: 'Otro juego de los que nos da por probar. Aquí falta el clip, pero quería dejarle un rinconcito.',
    category: 'Partidas', tags: ['peak', 'demo'], primaryRegion: 'yukopolis',
    locations: [{ region: 'yukopolis', object: 'museo' }], demo: true
  },
  {
    id: 'ejemplo-minecraft', type: 'text', title: 'Nuestra época de Minecraft',
    description: 'Que goood jugar Minecraft contigo. Me encanta acordarme de nuestras partidas.',
    category: 'Partidas', tags: ['minecraft', 'demo'], primaryRegion: 'yukopolis',
    locations: [{ region: 'yukopolis', object: 'museo' }], demo: true
  },
  {
    id: 'boceto-pinguino', type: 'image', title: 'Boceto de pingüino',
    description: 'Este pingüinito solo está de ejemplo mientras llegan los dibujos.',
    src: 'assets/demo-art/pinguino.svg', thumbnail: 'assets/demo-art/pinguino.svg',
    category: 'Dibujos', tags: ['fauna', 'dibujo', 'demo'], primaryRegion: 'yukoteca',
    locations: [
      { region: 'yukoteca', object: 'taller' },
      { region: 'yukoteca', object: 'albumes' }
    ], demo: true
  },
  {
    id: 'jardin-ilustrado', type: 'image', title: 'Flores de muestra',
    description: 'Unas florecitas de prueba, por ahora.',
    src: 'assets/demo-art/flores.svg', thumbnail: 'assets/demo-art/flores.svg',
    category: 'Dibujos', tags: ['flores', 'dibujo', 'demo'], primaryRegion: 'yukoteca',
    locations: [{ region: 'yukoteca', object: 'taller' }, { region: 'yukoteca', object: 'albumes' }], demo: true
  },
  {
    id: 'postal-estelar', type: 'image', title: 'Postal de las estrellas',
    description: 'Una postal de estrellitas para ti, Yuko. Te dejé más recuerdos por aquí 💜.',
    src: 'assets/demo-art/estrellas.svg', thumbnail: 'assets/demo-art/estrellas.svg',
    category: 'Postales', tags: ['estrellas', 'demo'], primaryRegion: 'yukobservatorio',
    locations: [
      { region: 'yukobservatorio', object: 'recuerdo' },
      { region: 'yukoteca', object: 'albumes' },
      { region: 'yukoteca', object: 'fotos' }
    ], demo: true
  }
];

const MARCO_PHOTO = {
  id: 'marco-captura-2026-05-01', type: 'image', title: 'Una foto especial', description: '',
  src: 'assets/images/yukoteca/marco/captura_2026-05-01_202559.png',
  thumbnail: 'assets/images/yukoteca/marco/captura_2026-05-01_202559.png',
  category: 'Momentos', tags: ['foto', 'yukoteca', 'marco'], primaryRegion: 'yukoteca',
  locations: [{ region: 'yukoteca', object: 'marco' }]
};

const YUKOTECA_PHOTOS = [
  { n: 1, title: 'Nuestra primera foto', description: 'Miraaa, nuestra primera fotito en uno de esos juegos random que encontrábamos.' },
  { n: 2, title: 'Nuestro equipo con Warrior', description: 'Aquí ya jugábamos seguido tú, Warrior y yo. Que goood esos ratos.' },
  { n: 3, title: 'Cuando empezamos a jugar más', description: 'Aquí ya empezábamos a agarrar confianza para probar cualquier juego random JAJA.' },
  { n: 4, title: 'La pro del voleibol', description: 'En Leyendas del Voleibol me carreabas demasiado JAJA. No me digas que no eres pro.' },
  { n: 5, title: 'Uno de esos días', description: 'Mira esta fotito. Ya me gustabas en ese entonces y ni modo, la guardé jaja.' },
  { n: 6, title: 'Karaoke', description: 'Cuando nos daba por hacer karaoke JAJA. Que goood.' },
  { n: 7, title: 'Corner', description: 'Aquí nos la pasábamos bien goood en Corner.' },
  { n: 8, title: 'Nuestro primer match', description: 'Nuestro primer match de skins, míralooo.' },
  { n: 9, title: 'Las películas que me mostraste', description: 'Contigo vi un montón de películas que yo ni conocía, y eso me encanta. Gracias por enseñármelas.' },
  { n:10, title: 'Skins con Warrior', description: 'Nuestro primer match de skins con Warrior. Que goood JAJA.' },
  { n:11, title: 'La época de Brainrot', description: 'Cuando nos viciamos a Roba un Brainrot JAJA. Lo abandonamos como mil juegos más, pero fue divertido.' },
  { n:12, title: 'Otra vez combinando skins', description: 'Otra vez haciendo match de skins. Es que no podíamos parar JAJA.' },
  { n:13, title: 'Para nada lo obligaron', description: 'Tú me pediste que me hiciera una skin de maid... para nada lo obligaron JAJAJA.' },
  { n:14, title: 'Demian y Aokari', description: 'Miraaa, aquí aparecieron Demian y Aokari por primera vez. Todavía ni teníamos todo pensado. Que goood.' },
  { n:15, title: 'Juegos random', description: 'Otro juego random que nos dio por probar JAJA.' },
  { n:16, title: 'Minecraft contigo', description: 'Que goood jugar Minecraft a tu lado. Me encantaban esos ratos.' },
  { n:17, title: 'Un rato tranquilo', description: 'También me encantaban estos ratitos chill contigo.' },
  { n:18, title: 'Fortnite', description: 'Nuestra época de Fortnite JAJA. Dices que eres mala pero yo sé que eres bien pro.' },
  { n:19, title: 'Una foto más de tu skin', description: 'Me encanta tomarle fotos a tus skins, de verdad. Y me gusta muchísimo que siguiéramos jugando y pasando ratos juntos.' },
  { n:20, title: 'Otra partida para el álbum', description: 'Un recuerdo más de nuestros juegos.' },
  { n:21, title: 'Más de 200 horas', description: '¿Te acuerdas cuando pasamos de las 200 horas en llamada? JAJA. Que goood haber compartido tanto tiempo contigo.' },
  { n:22, title: 'Berry', description: 'Tu skin de Berry, la chica helado. Me encanta cómo haces tus skins, los detalles y todo el tiempo que les dedicas. Que goood te quedó.' },
  { n:23, title: 'Jugando a tu lado', description: 'Otro ratito jugando contigo. Me gusta un montón guardar estas fotitos.' },
  { n:24, title: 'Una partida más contigo', description: 'Y otra partida contigo JAJA. Ya ves que tenemos un montóoon de fotos.' }
].map(item => ({
  id: `foto-${String(item.n).padStart(2,'0')}`,
  type: 'image',
  title: item.title,
  description: item.description,
  src: `assets/images/yukoteca/fotos/foto${String(item.n).padStart(2,'0')}.png`,
  thumbnail: `assets/images/yukoteca/fotos/foto${String(item.n).padStart(2,'0')}.png`,
  category: 'Momentos',
  tags: ['foto', 'yukoteca', 'recuerdo'],
  primaryRegion: 'yukoteca',
  locations: [
    { region: 'yukoteca', object: 'fotos' },
    { region: 'yukoteca', object: 'albumes' }
  ]
}));

const YUKOTECA_CAPTURES = Array.from({length:19}, (_, index) => {
  const n = index + 1;
  return {
    id: `captura-skin-${String(n).padStart(2,'0')}`,
    type: 'image',
    title: `Skin match ${String(n).padStart(2,'0')}`,
    description: 'Una de nuestras skins match. Que goood se veían juntas JAJA.',
    src: `assets/images/yukoteca/capturas/captura_skin_${String(n).padStart(2,'0')}.png`,
    thumbnail: `assets/images/yukoteca/capturas/captura_skin_${String(n).padStart(2,'0')}.png`,
    category: 'Skins match',
    tags: ['captura', 'skins', 'match', 'yukoteca'],
    primaryRegion: 'yukoteca',
    locations: [
      { region: 'yukoteca', object: 'fotos' },
      { region: 'yukoteca', object: 'albumes' }
    ]
  };
});

// Clips originales: un registro por archivo; las ubicaciones comparten la misma ruta.
const YUKOCINE_CLIPS = [
  {
    "id": "clip-001",
    "type": "video",
    "title": "Clip 01",
    "description": "",
    "src": "assets/videos/yukocine/clip_001.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_001.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-002",
    "type": "video",
    "title": "Clip 02",
    "description": "",
    "src": "assets/videos/yukocine/clip_002.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_002.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-003",
    "type": "video",
    "title": "Clip 03",
    "description": "",
    "src": "assets/videos/yukocine/clip_003.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_003.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-004",
    "type": "video",
    "title": "Clip 04",
    "description": "",
    "src": "assets/videos/yukocine/clip_004.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_004.webp",
    "category": "Partidas",
    "tags": [
      "video",
      "tomodachi"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      },
      {
        "region": "yukopolis",
        "object": "computadora"
      },
      {
        "region": "yukopolis",
        "object": "museo"
      }
    ]
  },
  {
    "id": "clip-005",
    "type": "video",
    "title": "Clip 05",
    "description": "",
    "src": "assets/videos/yukocine/clip_005.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_005.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-006",
    "type": "video",
    "title": "Clip 06",
    "description": "",
    "src": "assets/videos/yukocine/clip_006.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_006.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-007",
    "type": "video",
    "title": "Clip 07",
    "description": "",
    "src": "assets/videos/yukocine/clip_007.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_007.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-008",
    "type": "video",
    "title": "Clip 08",
    "description": "",
    "src": "assets/videos/yukocine/clip_008.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_008.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-009",
    "type": "video",
    "title": "Clip 09",
    "description": "",
    "src": "assets/videos/yukocine/clip_009.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_009.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-010",
    "type": "video",
    "title": "Clip 10",
    "description": "",
    "src": "assets/videos/yukocine/clip_010.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_010.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-011",
    "type": "video",
    "title": "Clip 11",
    "description": "",
    "src": "assets/videos/yukocine/clip_011.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_011.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-012",
    "type": "video",
    "title": "Clip 12",
    "description": "",
    "src": "assets/videos/yukocine/clip_012.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_012.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-013",
    "type": "video",
    "title": "Clip 13",
    "description": "",
    "src": "assets/videos/yukocine/clip_013.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_013.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-014",
    "type": "video",
    "title": "Clip 14",
    "description": "",
    "src": "assets/videos/yukocine/clip_014.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_014.webp",
    "category": "Partidas",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      },
      {
        "region": "yukopolis",
        "object": "computadora"
      },
      {
        "region": "yukopolis",
        "object": "museo"
      }
    ]
  },
  {
    "id": "clip-015",
    "type": "video",
    "title": "Clip 15",
    "description": "",
    "src": "assets/videos/yukocine/clip_015.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_015.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-016",
    "type": "video",
    "title": "Clip 16",
    "description": "",
    "src": "assets/videos/yukocine/clip_016.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_016.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-017",
    "type": "video",
    "title": "Clip 17",
    "description": "",
    "src": "assets/videos/yukocine/clip_017.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_017.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-018",
    "type": "video",
    "title": "Clip 18",
    "description": "",
    "src": "assets/videos/yukocine/clip_018.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_018.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-019",
    "type": "video",
    "title": "Clip 19",
    "description": "",
    "src": "assets/videos/yukocine/clip_019.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_019.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-020",
    "type": "video",
    "title": "Clip 20",
    "description": "",
    "src": "assets/videos/yukocine/clip_020.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_020.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-021",
    "type": "video",
    "title": "Clip 21",
    "description": "",
    "src": "assets/videos/yukocine/clip_021.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_021.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-022",
    "type": "video",
    "title": "Clip 22",
    "description": "",
    "src": "assets/videos/yukocine/clip_022.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_022.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-023",
    "type": "video",
    "title": "Clip 23",
    "description": "",
    "src": "assets/videos/yukocine/clip_023.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_023.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-024",
    "type": "video",
    "title": "Clip 24",
    "description": "",
    "src": "assets/videos/yukocine/clip_024.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_024.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-025",
    "type": "video",
    "title": "Clip 25",
    "description": "",
    "src": "assets/videos/yukocine/clip_025.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_025.webp",
    "category": "Partidas",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      },
      {
        "region": "yukopolis",
        "object": "computadora"
      },
      {
        "region": "yukopolis",
        "object": "museo"
      }
    ]
  },
  {
    "id": "clip-026",
    "type": "video",
    "title": "Clip 26",
    "description": "",
    "src": "assets/videos/yukocine/clip_026.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_026.webp",
    "category": "Partidas",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      },
      {
        "region": "yukopolis",
        "object": "computadora"
      },
      {
        "region": "yukopolis",
        "object": "museo"
      }
    ]
  },
  {
    "id": "clip-027",
    "type": "video",
    "title": "Clip 27",
    "description": "",
    "src": "assets/videos/yukocine/clip_027.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_027.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-028",
    "type": "video",
    "title": "Clip 28",
    "description": "",
    "src": "assets/videos/yukocine/clip_028.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_028.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-029",
    "type": "video",
    "title": "Clip 29",
    "description": "",
    "src": "assets/videos/yukocine/clip_029.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_029.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-030",
    "type": "video",
    "title": "Clip 30",
    "description": "",
    "src": "assets/videos/yukocine/clip_030.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_030.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-031",
    "type": "video",
    "title": "Clip 31",
    "description": "",
    "src": "assets/videos/yukocine/clip_031.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_031.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-032",
    "type": "video",
    "title": "Clip 32",
    "description": "",
    "src": "assets/videos/yukocine/clip_032.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_032.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-033",
    "type": "video",
    "title": "Clip 33",
    "description": "",
    "src": "assets/videos/yukocine/clip_033.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_033.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-034",
    "type": "video",
    "title": "Clip 34",
    "description": "",
    "src": "assets/videos/yukocine/clip_034.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_034.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-035",
    "type": "video",
    "title": "Clip 35",
    "description": "",
    "src": "assets/videos/yukocine/clip_035.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_035.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-036",
    "type": "video",
    "title": "Clip 36",
    "description": "",
    "src": "assets/videos/yukocine/clip_036.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_036.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-037",
    "type": "video",
    "title": "Clip 37",
    "description": "",
    "src": "assets/videos/yukocine/clip_037.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_037.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-038",
    "type": "video",
    "title": "Clip 38",
    "description": "",
    "src": "assets/videos/yukocine/clip_038.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_038.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-039",
    "type": "video",
    "title": "Clip 39",
    "description": "",
    "src": "assets/videos/yukocine/clip_039.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_039.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-040",
    "type": "video",
    "title": "Clip 40",
    "description": "",
    "src": "assets/videos/yukocine/clip_040.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_040.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-041",
    "type": "video",
    "title": "Clip 41",
    "description": "",
    "src": "assets/videos/yukocine/clip_041.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_041.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-042",
    "type": "video",
    "title": "Clip 42",
    "description": "",
    "src": "assets/videos/yukocine/clip_042.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_042.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-043",
    "type": "video",
    "title": "Clip 43",
    "description": "",
    "src": "assets/videos/yukocine/clip_043.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_043.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-044",
    "type": "video",
    "title": "Clip 44",
    "description": "",
    "src": "assets/videos/yukocine/clip_044.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_044.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-045",
    "type": "video",
    "title": "Clip 45",
    "description": "",
    "src": "assets/videos/yukocine/clip_045.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_045.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-046",
    "type": "video",
    "title": "Clip 46",
    "description": "",
    "src": "assets/videos/yukocine/clip_046.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_046.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-047",
    "type": "video",
    "title": "Clip 47",
    "description": "",
    "src": "assets/videos/yukocine/clip_047.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_047.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-048",
    "type": "video",
    "title": "Clip 48",
    "description": "",
    "src": "assets/videos/yukocine/clip_048.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_048.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-049",
    "type": "video",
    "title": "Clip 49",
    "description": "",
    "src": "assets/videos/yukocine/clip_049.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_049.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-050",
    "type": "video",
    "title": "Clip 50",
    "description": "",
    "src": "assets/videos/yukocine/clip_050.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_050.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-051",
    "type": "video",
    "title": "Clip 51",
    "description": "",
    "src": "assets/videos/yukocine/clip_051.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_051.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-052",
    "type": "video",
    "title": "Clip 52",
    "description": "",
    "src": "assets/videos/yukocine/clip_052.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_052.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-053",
    "type": "video",
    "title": "Clip 53",
    "description": "",
    "src": "assets/videos/yukocine/clip_053.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_053.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-054",
    "type": "video",
    "title": "Clip 54",
    "description": "",
    "src": "assets/videos/yukocine/clip_054.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_054.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-055",
    "type": "video",
    "title": "Clip 55",
    "description": "",
    "src": "assets/videos/yukocine/clip_055.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_055.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-056",
    "type": "video",
    "title": "Clip 56",
    "description": "",
    "src": "assets/videos/yukocine/clip_056.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_056.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-057",
    "type": "video",
    "title": "Clip 57",
    "description": "",
    "src": "assets/videos/yukocine/clip_057.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_057.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-058",
    "type": "video",
    "title": "Clip 58",
    "description": "",
    "src": "assets/videos/yukocine/clip_058.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_058.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-059",
    "type": "video",
    "title": "Clip 59",
    "description": "",
    "src": "assets/videos/yukocine/clip_059.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_059.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-060",
    "type": "video",
    "title": "Clip 60",
    "description": "",
    "src": "assets/videos/yukocine/clip_060.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_060.webp",
    "category": "Partidas",
    "tags": [
      "video",
      "lethal company"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      },
      {
        "region": "yukopolis",
        "object": "computadora"
      },
      {
        "region": "yukopolis",
        "object": "museo"
      }
    ]
  },
  {
    "id": "clip-061",
    "type": "video",
    "title": "Clip 61",
    "description": "",
    "src": "assets/videos/yukocine/clip_061.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_061.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-062",
    "type": "video",
    "title": "Clip 62",
    "description": "",
    "src": "assets/videos/yukocine/clip_062.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_062.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-063",
    "type": "video",
    "title": "Clip 63",
    "description": "",
    "src": "assets/videos/yukocine/clip_063.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_063.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-064",
    "type": "video",
    "title": "Clip 64",
    "description": "",
    "src": "assets/videos/yukocine/clip_064.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_064.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-065",
    "type": "video",
    "title": "Clip 65",
    "description": "",
    "src": "assets/videos/yukocine/clip_065.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_065.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-066",
    "type": "video",
    "title": "Clip 66",
    "description": "",
    "src": "assets/videos/yukocine/clip_066.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_066.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-067",
    "type": "video",
    "title": "Clip 67",
    "description": "",
    "src": "assets/videos/yukocine/clip_067.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_067.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-068",
    "type": "video",
    "title": "Clip 68",
    "description": "",
    "src": "assets/videos/yukocine/clip_068.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_068.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-069",
    "type": "video",
    "title": "Clip 69",
    "description": "",
    "src": "assets/videos/yukocine/clip_069.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_069.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-070",
    "type": "video",
    "title": "Clip 70",
    "description": "",
    "src": "assets/videos/yukocine/clip_070.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_070.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-071",
    "type": "video",
    "title": "Clip 71",
    "description": "",
    "src": "assets/videos/yukocine/clip_071.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_071.webp",
    "category": "Momentos graciosos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-072",
    "type": "video",
    "title": "Clip 72",
    "description": "",
    "src": "assets/videos/yukocine/clip_072.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_072.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  },
  {
    "id": "clip-073",
    "type": "video",
    "title": "Clip 73",
    "description": "",
    "src": "assets/videos/yukocine/clip_073.mp4",
    "thumbnail": "assets/images/yukocine/clips/clip_073.webp",
    "category": "Sustos y gritos",
    "tags": [
      "video"
    ],
    "primaryRegion": "yukocine",
    "locations": [
      {
        "region": "yukocine",
        "object": "proyector"
      }
    ]
  }
];

export const MEMORIES = [
  ...YUKOCINE_CLIPS,
  MARCO_PHOTO,
  ...BASE_MEMORIES,
  ...YUKOTECA_PHOTOS,
  ...YUKOTECA_CAPTURES
];

const byId = new Map(MEMORIES.map(item => [item.id, item]));
function withResources(item){
  if(!item)return null;
  return {
    ...item,
    src: item.assetId ? assetUrl(item.assetId) : item.src,
    thumbnail: item.thumbnailAssetId ? assetUrl(item.thumbnailAssetId) : item.thumbnail
  };
}
export function getMemory(id) { return withResources(byId.get(id)); }
export function memoriesAt(region, object) {
  return MEMORIES.filter(item => item.locations?.some(p => p.region === region && p.object === object)).map(withResources);
}
export function memoriesInRegion(region) {
  return MEMORIES.filter(item => item.primaryRegion === region || item.locations?.some(p => p.region === region)).map(withResources);
}
export function validateMemories() {
  const errors=[];
  const ids=new Set();
  for(const m of MEMORIES){
    if(!m.id || ids.has(m.id))errors.push(`ID duplicado o vacío: ${m.id}`);
    ids.add(m.id);
    if(!['image','video','audio','text'].includes(m.type))errors.push(`Tipo inválido: ${m.id}`);
    if(m.type !== 'text' && !m.src && !m.assetId)errors.push(`Archivo faltante: ${m.id}`);
    if(m.assetId && !assetUrl(m.assetId)) errors.push(`Recurso no registrado: ${m.id}`);
    if(m.thumbnailAssetId && !assetUrl(m.thumbnailAssetId)) errors.push(`Miniatura no registrada: ${m.id}`);
    if(!Array.isArray(m.locations) || !m.locations.length)errors.push(`Sin ubicaciones: ${m.id}`);
  }
  return errors;
}

/* YUKOVERSO_PHOTO_CROSSREGIONS_2_9_9_START
 * Apariciones secundarias de fotos reales, sin duplicar archivos, sin crear IDs
 * nuevos y conservando todas las ubicaciones originales de Yukoteca.
 * Modificación idempotente compatible con futuros recuerdos y clips.
 */
const PHOTO_CROSSREGIONS_299 = Object.freeze({
  'yukopolis:museo': [
    'foto-02', 'foto-08', 'foto-10', 'foto-14', 'foto-22',
    'captura-skin-01', 'captura-skin-02', 'captura-skin-03'
  ],
  'yukopolis:computadora': [
    'foto-04', 'foto-07', 'foto-11', 'foto-15',
    'foto-16', 'foto-18', 'foto-23'
  ],
  'yukobservatorio:recuerdo': ['foto-01', 'foto-09', 'foto-21']
});
for (const [destination, memoryIds] of Object.entries(PHOTO_CROSSREGIONS_299)) {
  const [region, object] = destination.split(':');
  for (const memoryId of memoryIds) {
    const memory = MEMORIES.find(item => item.id === memoryId && item.type === 'image');
    if (!memory) continue; // La instalación sin fotos no altera el catálogo.
    if (!Array.isArray(memory.locations)) memory.locations = [];
    if (!memory.locations.some(location => location.region === region && location.object === object)) {
      memory.locations.push({ region, object });
    }
  }
}
// Poner los recuerdos reales antes de los ejemplos, conservando el orden entre
// recuerdos reales. La postal-estelar y demás ejemplos siguen accesibles.
MEMORIES.sort((a, b) => Number(Boolean(a.demo)) - Number(Boolean(b.demo)));
/* YUKOVERSO_PHOTO_CROSSREGIONS_2_9_9_END */
