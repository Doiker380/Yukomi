# Cómo rellenar el Yukoverso sin reprogramar regiones

## 1. Un archivo = un recuerdo

Edita **`js/data/memories.js`**. Cada recuerdo lleva un ID único y puede mostrarse en varios lugares. **El clip se guarda una sola vez en `assets/videos`.**

Ejemplo (aún no está incluido; úsalo sólo cuando exista el archivo real):

```js
{
  id: 'partida-repo-01',
  type: 'video',
  title: 'Una partida inolvidable',
  description: 'Explica qué sucedió realmente en el clip.',
  src: 'assets/videos/partida-repo-01.mp4',
  thumbnail: 'assets/images/partida-repo-01.webp',
  category: 'Partidas',
  tags: ['repo', 'humor', 'conversacion'],
  primaryRegion: 'yukocine',
  locations: [
    { region: 'yukocine', object: 'proyector' },
    { region: 'yukopolis', object: 'computadora' },
    { region: 'yukopolis', object: 'museo' }
  ]
}
```

En este ejemplo la tarjeta aparece en el proyector del cine, en la PC de la capital y en el museo. Todas abren el **mismo archivo**, con el **mismo ID**. El Yukopasaporte lo cuenta como un recuerdo abierto una sola vez.

`type` admite `video`, `image`, `audio` y `text`. Si es `text`, no necesitas `src`; escribe el contenido en `description`. Para los demás tipos incluye un `src` válido y, si quieres, `thumbnail`.

## 2. Lugares existentes que ya aceptan recuerdos

| Región | object | Aparece en |
|---|---|---|
| yukocine | `proyector` | Videoteca, con filtro por categorías y mostrar más |
| yukopolis | `museo` | Museo de partidas, convertido desde Yukolandia |
| yukopolis | `computadora` | Computadora de recuerdos |
| yukoteca | `taller` | Galería de obras ampliables (tipo `image`) |
| yukoteca | `albumes` | Objeto de recuerdo y páginas vinculadas de álbum |
| yukoteca | `fotos` | Galería de fotografías o capturas (`image`) |
| yukoteca | `marco` | Cuadro contextual que abre un recuerdo de imagen |
| yukofauna | `cuadro` | Objeto oculto del santuario |
| yukobservatorio | `recuerdo` | Postal estelar |

Los ejemplos que ya están en `memories.js` muestran la estructura. **No es necesario inventar 30 entradas vacías:** añade los recuerdos reales cuando estén seleccionados.

## 3. Agregar un objeto totalmente nuevo

En `js/data/memory-anchors.js`, añade una ubicación en la región pertinente, por ejemplo:

```js
// Dentro de yukofauna: [ ... ]
{ id:'radio-bosque', label:'Radio del bosque', icon:'📻', x:72, y:37 }
```

Después registra en `memories.js` un audio con `locations:[{region:'yukofauna',object:'radio-bosque'}]`. El botón sólo aparece si hay al menos un recuerdo con esa ubicación. **No hay que editar `fauna.js` ni las misiones.** Puedes hacer lo mismo con cuadros, personajes ilustrados o documentos en otras regiones panorámicas.

Las apariciones de Demian, Aokari, Andy, Nixie y Suki se deciden por separado en `js/data/characters.js`, para no confundir personajes del mundo con entradas del archivo de recuerdos.

## 4. Álbumes que cuentan historias

`js/data/library-content.js` contiene la **estructura de los álbumes**. Una página con imagen puede referir al catálogo mediante `memoryId`:

```js
{ id:'recuerdo-repo', type:'image', memoryId:'mi-foto-repo', title:'La captura de aquella noche' }
```

El archivo real se declara **sólo en `memories.js`**, no en la página. Puedes conservar las páginas de texto para una anécdota o una explicación. Si necesitas añadir una página a un álbum, edita la lista `pages` de ese álbum. Para dibujos agrega la ubicación `yukoteca/taller`; para fotos o capturas, `yukoteca/fotos`. Los marcos de recuerdos opcionales utilizan `yukoteca/marco`. Los clips de vídeo se registran en `yukocine/proyector`, no como sección de Yukoteca.

## 5. De 10 a 30 clips (o más)

El proyector de Yukocine organiza los recuerdos por `category`. La lista inicial muestra 12 tarjetas; el botón «Mostrar más recuerdos» añade otros 12. Las miniaturas se cargan de forma diferida, los vídeos no se crean ni cargan en lote y **no se reproducen automáticamente**. Para añadir clips, agrega entradas en `memories.js` sin tocar `cinema.js`.

**Consejo editorial:** 30 clips sin criterio pueden resultar pesados incluso si técnicamente funcionan. Es preferible 10–15 clips memorables, bien agrupados y con una frase auténtica, que una biblioteca con vídeos repetidos o sin contexto.

## 6. Antes de publicar

- Elimina o reemplaza todos los elementos `demo: true`, especialmente el MP4 de cuatro segundos.
- Comprueba que cada ruta exista y su nombre coincida exactamente (mayúsculas, extensiones).
- Evita fotos con metadatos de ubicación, capturas con datos privados o vídeos que no puedan compartirse.
- Abre el enlace final en un teléfono con datos móviles, revisando audio, pantalla completa y cierre de vídeos.
- La carta de `js/data/experience-content.js` y la página `carta_yuko.html` deben coincidir.
