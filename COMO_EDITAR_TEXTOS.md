# Cómo editar textos de Yukoverso

Haz una copia del archivo antes de editar. Guarda en UTF-8, conserva comillas, comas e identificadores. Los textos se muestran con `textContent`, sin interpretar HTML.

## 1. Dónde cambiar mensajes

| Contenido | Archivo |
|---|---|
| Bienvenida, rótulos, diario, postal y diálogos de las actividades de Yukofauna | `js/data/fauna-content.js` |
| Cartel de la laguna y objetos adicionales | `js/scenes/fauna-addons.js` |
| Calendario, cartas, diálogos de la habitante y textos de interfaz de Yukópolis | `js/data/city-content.js` |
| Posición, tamaño y etiqueta de entradas de Yukópolis | `js/data/city-scene.js` |
| Nombres, descripción de las cinco regiones y mensajes originales de sus descubrimientos | `js/map.js`, lista `REGIONS` al principio |
| Títulos, descripciones, notas y archivos de recuerdos | `js/data/memories.js` |
| Álbumes y colecciones de Yukoteca | `js/data/library-content.js` |
| Personajes y conversaciones futuras | `js/data/characters.js` |

La centralización nueva cubre Yukofauna y Yukópolis. Los textos particulares de cine y observatorio conservan su ubicación actual hasta su etapa; no se reescribieron esas regiones. La carta independiente sigue en `carta_yuko.html`.

En Yukópolis, `CITY_MONTHS` contiene los doce meses; `CITY_MAIL`, las tres cartas; `CITY_DIALOGUE.greeter`, los saludos existentes de la habitante genérica. Puedes añadir mensajes a ese arreglo sin cambiar la lógica. `CITY_UI` contiene rótulos, instrucciones y textos de ventanas con claves descriptivas, como `calendarTitle` y `theaterText`. Conserva `{subject}` y `{from}` en las plantillas: se sustituyen por texto seguro. Las etiquetas de los edificios están en `CITY_SCENE.objects`; museo y PC están en `memory-anchors.js`.

En `fauna-content.js`, `FAUNA_TEXT.intro` contiene la bienvenida; `labels` contiene carteles y textos del diario; `FAUNA_MESSAGES` contiene los mensajes por actividad (`owlLetter`, `catStart`, `flowersWin`, etc.); `FAUNA_COPY` contiene textos de estado y plantillas con `{count}`. Conserva ese marcador en contadores. Los símbolos de controles también son editables, pero conviene mantenerlos breves.

## 2. Modificar un diálogo

Por ejemplo, cambia solamente el valor de `FAUNA_MESSAGES.owlLetter.text` para editar la carta del búho. Cambia `title` para su encabezado. No cambies la clave `owlLetter`, porque la actividad la utiliza. Las apariciones del pingüino, búho y gato son animales del santuario, no los personajes originales registrados.

## 3. Añadir mensajes a un personaje existente

En `CHARACTER_PLACEMENTS`, cada aparición puede tener `dialogue: ['Primer mensaje aprobado', 'Segundo mensaje aprobado']`. Cada pulsación muestra el siguiente y al terminar vuelve al primero. Si no hay diálogos se utiliza `message`. No hay mensajes definitivos inventados en el registro actual.

## 4. Añadir un personaje nuevo

Añade un ID único a `CHARACTER_REGISTRY` con `name` e `image` (ruta de un recurso aprobado dentro de `assets/characters/`). Luego añade una aparición a `CHARACTER_PLACEMENTS`:

```js
// Plantilla de estructura: sustituir por datos y textos aprobados antes de activar.
{ id:'aparicion-unica', character:'id-del-registro', region:'yukofauna',
  x:62, y:63, scale:1, enabled:false,
  message:'', dialogue:[] }
```

`x` e `y` son porcentajes del escenario, no de la pantalla. `scale` ajusta el tamaño y `enabled:false` oculta la aparición. Añade otras entradas para apariciones adicionales. Yukofauna y Yukópolis conectan el registro al motor de extras. Yukoteca utiliza el adaptador de capas con `assetId`; registra también su imagen en `asset-manifest.js` si la usas allí. No actives un personaje sin referencia e imagen aprobadas.

## 5. Editar recuerdos

En `MEMORIES`, cambia `title`, `description` y el contenido correspondiente al tipo de recuerdo. Mantén `id`, `locations` y referencias funcionales. Los archivos compartidos no deben duplicarse. Las posiciones de los objetos se editan en `js/data/memory-anchors.js`. La guía detallada sigue en `GUIA_DE_RECUERDOS.md`.

## 6. Comprobar cambios

Desde la carpeta del proyecto ejecuta:

```powershell
node tests/validate.mjs
node tests/architecture.mjs
node tests/yukoteca-layout.mjs
py -m http.server 8000 --bind 0.0.0.0
```

Abre `http://localhost:8000`, recarga con Ctrl+F5, entra en Yukofauna y activa el objeto editado. Revisa un mensaje largo en móvil. No abras `index.html` mediante doble clic. No borres los datos del navegador: el progreso sigue en `yukoverso_progress_v1`.

Para probar desde teléfono utiliza `http://IP_LOCAL_PC:8000` en la misma Wi-Fi. El teléfono conserva su propio progreso. Si no conecta, revisa que el servidor esté activo y que la red permita acceder al puerto.
