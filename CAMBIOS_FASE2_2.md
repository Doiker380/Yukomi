# Yukoverso 2.2 — Adaptación de Yukoteca

**Base:** ZIP íntegro de Yukoverso 2.1. No se ha recreado ninguna región.

## Archivos modificados

- `js/scenes/library.js`: se elimina la sección del proyector, sus eventos, su vídeo y el control de reproducción; añade la galería de fotos reutilizando la vista ampliada de dibujos. La barra de navegación y los tres hotspots son botones HTML independientes.
- `js/data/library-content.js`: elimina `LIBRARY_CLIPS` y añade `LIBRARY_PHOTOS` derivada del catálogo único.
- `js/data/memories.js`: retira la referencia al proyector de Yukoteca, asigna las imágenes provisionales a Fotos y Marco, y conserva el mismo vídeo demo en Yukocine y Yukópolis. Su archivo demo ahora se llama `assets/videos/demo-yukocine.mp4`.
- `js/data/memory-anchors.js`: reemplaza el antiguo objeto de postal de Yukoteca por un marco independiente.
- `js/map.js`: actualiza la descripción y objetos de Yukoteca para mostrar Dibujos, Fotos y Álbumes.
- `css/library.css`: redistribuye las posiciones y elimina reglas exclusivas de clips/vídeo; conserva la estética lavanda, crema y dorado.
- `assets/regions/yukoteca/archive.svg`: mantiene el fondo SVG editable, quita la rotulación integrada de salas y cambia la sala de proyecciones por una pared decorativa de marcos vacíos, sin zonas clicables horneadas.
- `index.html` y `js/app.js`: actualizan las versiones de recursos para reducir problemas de caché.
- `tests/validate.mjs`: refuerza las verificaciones de anclas y contenidos válidos de las nuevas galerías.
- Documentación: `README.md`, `GUIA_DE_RECUERDOS.md` y `CONTENIDO_PENDIENTE.md`.

## No modificados

- La lógica de Yukocine, Yukofauna, Yukópolis y Yukobservatorio.
- El motor compartido de zoom, desplazamiento, animaciones y escenas.
- La clave de guardado `yukoverso_progress_v1` y los registros históricos de descubrimientos.
- El visor global de recuerdos, que sigue admitiendo audio y vídeo en las demás regiones.

## Migración del progreso

El descubrimiento antiguo `yukoteca:proyector` permanece guardado pero deja de contarse entre los tres actuales, para no fingir que ya se visitó Fotos. Tras abrir una fotografía se agrega `yukoteca:fotos` y el contador vuelve a 3/3 si los otros dos ya estaban completos. No se eliminan ni reinician datos anteriores.

## Pendiente

- Sustituir el fondo SVG provisional por una ilustración final, sin botones dibujados en ella.
- Añadir fotografías, dibujos y textos reales al catálogo central, revisar permisos de publicación.
- Comprobar en el teléfono la distribución, el zoom y el progreso bajo la URL local estable.
