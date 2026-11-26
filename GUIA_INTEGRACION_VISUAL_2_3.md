# Guía práctica de integración visual — Yukoverso 2.3

Este piloto conserva Yukoteca: **Dibujos, Álbumes y Fotos**, sin Clips como categoría principal.

## 1. Dónde colocar los recursos

Usa archivos locales y propios, con rutas relativas desde `index.html`:

```text
assets/
  regions/yukoteca/fondo.webp
  ui/yukoteca/dibujos.webp
  ui/yukoteca/fotos.webp
  ui/yukoteca/albumes.webp
  characters/demian.webp
  photos/recuerdo-001.webp
  videos/clip-001.mp4
  audio/mensaje-001.mp3
```

No es necesario crear todos los archivos. **No agregues una referencia hasta tener el archivo real.** Los nombres anteriores son ejemplos, no son recursos incluidos.

## 2. Formato de ilustraciones recomendado

| Recurso | Medidas orientativas | Formato y sugerencia |
|---|---|---|
| Fondo de Yukoteca | **1800×1000** (lienzo/base exactos) | WebP, o SVG cuando convenga; intenta dejarlo entre 250 KB y 1,5 MB |
| Fondo de otras regiones panorámicas | Revisa primero sus dimensiones existentes | Mantén la relación de aspecto del escenario antes de sustituirlo |
| Botón de región | 256×256 con transparencia | WebP o PNG, sin texto incrustado |
| Personaje de cuerpo completo | 400×600 aprox., con transparencia | WebP/PNG; área visual centrada para ubicar sus pies |
| Decoración | 128–800 px según uso | WebP/PNG; evita elementos transparentes inmensos |
| Fotografía/ilustración de galería | 1200–2000 px en lado largo | WebP/JPEG, conservando proporción |
| Miniatura de clip | 480×270, relación 16:9 | WebP/JPEG, tamaño reducido |
| Clips | 720p/1080p según el original | MP4 H.264 + AAC, archivo comprimido; evita convertir más de lo necesario |
| Audio propio | Según grabación | MP3 o AAC; no activar reproducción automática |

Si cambias de 1800×1000 a otro formato, modifica `LIBRARY_SCENE.size`, `focusPoints` y el lienzo del fondo juntos. Para evitarlo, genera el nuevo fondo **en las dimensiones del piloto**.

## 3. Registrar fondo, botones o personajes

Abre `js/data/asset-manifest.js` y añade dentro de `ASSET_MANIFEST`, por ejemplo:

```js
'background.yukoteca.final': {
  type: 'image', src: 'assets/regions/yukoteca/fondo.webp',
  width: 1800, height: 1000, role: 'background'
},
'ui.yukoteca.dibujos': {
  type: 'image', src: 'assets/ui/yukoteca/dibujos.webp', role: 'button'
},
'character.demian': {
  type: 'image', src: 'assets/characters/demian.webp', role: 'character'
},
```

Esto es un **ejemplo**, no lo pegues si los archivos todavía no existen. Para sustituir el fondo, edita únicamente `backgroundId` en `js/data/library-scene.js`:

```js
backgroundId: 'background.yukoteca.final',
```

Para cambiar la imagen del botón Dibujos, edita su registro en `LIBRARY_SCENE.navigation`:

```js
{id:'taller', label:'Dibujos', x:24, y:62, scale:1,
 assetId:'ui.yukoteca.dibujos', action:{type:'gallery',target:'taller'}},
```

El botón sigue siendo HTML independiente y mantiene su función, aunque el gráfico cambie.

## 4. Colocar y mover elementos

`js/data/library-scene.js` define las coordenadas de Yukoteca. `x` e `y` son **porcentajes del escenario**, no de la pantalla. Así, `x:50,y:50` representa su centro, y `scale:0.9` reduce el elemento visual.

Con el lienzo actual 1800×1000, una posición `x:25,y:60` corresponde al punto `(450 px, 600 px)`. Botones, decoraciones, personajes y objetos se colocan dentro del mismo `stage`, por lo que comparten zoom y desplazamiento.

`focusPoints` son coordenadas **en píxeles del lienzo** para que los botones rápidos de la barra superior lleven a lugares concretos; ajústalos cuando muevas las salas.

Para añadir una decoración, incorpora en `LIBRARY_SCENE.decorations`:

```js
{id:'estrella-decorativa', x:66, y:24,
 assetId:'decoracion.estrella', scale:0.8},
```

Su recurso debe existir en `asset-manifest.js`. Si no existe, la decoración no se dibuja.

## 5. Añadir personajes sin reprogramar Yukoteca

Los personajes **Demian, Aokari, Andy, Nixie y Suki** ya figuran en `js/data/characters.js`, pero no se muestran sin imagen y posición.

1. Registra el archivo visual en `asset-manifest.js`, como en el ejemplo anterior.
2. En `CHARACTER_REGISTRY`, asigna `assetId:'character.demian'` al personaje apropiado.
3. En `CHARACTER_PLACEMENTS`, agrega una aparición:

```js
{
 id:'demian-biblioteca', character:'demian', region:'yukoteca',
 x:46, y:61, scale:0.95, enabled:true,
 dialogue:[{speaker:'Demian',text:'Diálogo escrito y aprobado'}]
},
```

No tienes que introducir un número fijo de personajes. Un personaje puede aparecer en varias zonas mediante distintas entradas. El texto de arriba es solo un marcador instructivo; reemplázalo antes de mostrarlo al público.

## 6. Agregar objetos interactivos

En `LIBRARY_SCENE.objects`, añade entradas con `id`, coordenadas, `label`, `icon` o `assetId`, y `action`:

```js
{
 id:'marco-especial', x:68, y:44, icon:'🖼️', label:'Marco especial',
 action:{type:'memory',memoryId:'boceto-pinguino'}
},
```

Acciones compatibles en el piloto:

- `{type:'memory',memoryId:'...'}`: abre imagen, audio, vídeo o texto con el visor central (también sirven `image`, `clip`, `audio` con `memoryId`).
- `{type:'album',albumId:'cuaderno'}`: abre un álbum existente desde su portada.
- `{type:'gallery',target:'taller'}` o `{type:'gallery',target:'fotos'}`: abre una galería.
- `{type:'albums'}`: lista los álbumes.
- `{type:'collection',region:'yukoteca',object:'marco'}`: muestra todos los recuerdos vinculados a ese objeto.
- `{type:'collection',memoryIds:['boceto-pinguino','jardin-ilustrado']}`: lista recuerdos seleccionados por ID.
- `{type:'message',title:'...',text:'...'}`: mensaje no modal.
- `{type:'dialogue',lines:[{speaker:'...',text:'...'}]}`: ventana de diálogo.

El **marco antiguo** de Yukoteca continúa definido en `js/data/memory-anchors.js` para conservar su comportamiento. No reutilices `marco` como ID de un segundo objeto sin retirar primero el ancla correspondiente.

## 7. Registrar recuerdos multimedia una sola vez

En `js/data/memories.js` crea un ID de recuerdo único. A partir de esta versión puedes usar `assetId` y `thumbnailAssetId` además de las rutas `src`/`thumbnail` existentes:

```js
{
 id:'clip-robl-01', type:'video', title:'Una partida',
 description:'Descripción que tú escribirás',
 assetId:'video.clip-robl-01', thumbnailAssetId:'thumb.clip-robl-01',
 category:'Juegos', tags:['roblox'],primaryRegion:'yukocine',
 locations:[
  {region:'yukocine',object:'proyector'},
  {region:'yukopolis',object:'computadora'}
 ]
},
```

**Importante:** registra antes ambas referencias en `asset-manifest.js`. El visor lee un único archivo real y varias regiones pueden usar el mismo ID. Los vídeos usan `preload="none"` y se detienen al cerrar; las imágenes de las galerías usan carga diferida.

Los dibujos y fotos de Yukoteca se obtienen mediante las ubicaciones `taller` y `fotos` del catálogo. Los álbumes están configurados en `js/data/library-content.js` y enlazan páginas a recuerdos por `memoryId`.

## 8. Pruebas antes de entregar el regalo

Desde PowerShell, en la carpeta principal:

```powershell
node tests/validate.mjs
node tests/architecture.mjs
py -m http.server 8000 --bind 0.0.0.0
```

En teléfono, utiliza `http://IP_DE_TU_PC:8000` y la misma red Wi-Fi. Revisa gestos, zoom, clics, visores, guardado y reproducción. `localhost` y la IP local mantienen progresos separados.

Para preservar privacidad, trata los archivos estáticos publicados en GitHub Pages como **accesibles públicamente**, aunque la URL no se comparta abiertamente.

## Actualización 2.3.1: integración de botones PNG

Ya están registrados los tres IDs de botón como recursos **opcionales**; no es necesario agregar duplicados. Copia los PNG a `assets/ui/yukoteca/` con sus nombres exactos y recarga. Si falla su carga, permanece el botón anterior. Para instrucciones y reversión consulta `INTEGRACION_BOTONES_YUKOTECA.md`.
