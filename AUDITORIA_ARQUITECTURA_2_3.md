# Auditoría de arquitectura — Yukoverso 2.3

**Base inspeccionada:** Yukoverso 2.2 (`Yukoverso_Fase2_2_Yukoteca_Reorganizada.zip`). No se rehízo el proyecto. Permanecen cinco regiones.

## Componentes que ya existían (reutilizados, sin sustitución)

| Sistema | Archivo | Situación |
|---|---|---|
| Entrada, mapa, regiones, Yukopasaporte | `js/app.js`, `js/map.js`, `js/storage.js` | Conservado; el almacenamiento sigue usando `yukoverso_progress_v1` |
| Escenario con scroll nativo y zoom | `js/world/explorer.js` | Reutilizado sin cambios |
| Visor reutilizable de recuerdos y colecciones | `js/world/memory-viewer.js` | Reutilizado sin cambios; vídeo y audio se crean al abrir, se detienen al cerrar |
| Catálogo de recuerdos / ubicaciones | `js/data/memories.js` y `memory-anchors.js` | Conservado y ampliado con soporte opcional de `assetId` y `thumbnailAssetId` |
| Add-ons antiguos de escenario | `js/world/scene-addons.js` | Conservado, no eliminado de otras regiones |
| Tres galerías de Yukoteca | `js/scenes/library.js` y `js/data/library-content.js` | Conservadas: Dibujos, Fotos y Álbumes |
| Registros de personajes | `js/data/characters.js` | Conservados; añade adaptador opt-in para las nuevas capas |

## Limitaciones antes de la intervención

- En Yukoteca, el archivo del fondo estaba escrito directamente en el módulo de escena.
- Las posiciones de las tres acciones aparecían en CSS y también en los puntos de enfoque del código.
- Los íconos y textos de las acciones se repetían en el HTML y en el SVG de escena.
- No existía un registro de IDs para sustituir un archivo gráfico desde un solo lugar.
- Los personajes estaban registrados, pero faltaba un formato de colocación integrado con un esquema de capas reutilizable.
- Mezclar un reproductor nuevo con cada región duplicaría responsabilidades que ya cubre el visor de recuerdos.

## Cambios mínimos aplicados

1. `asset-manifest.js`: un identificador estable representa cada ruta de un recurso; se registraron **solo archivos existentes**.
2. `library-scene.js`: dimensiones y tres accesos, foco, decoraciones y objetos futuros configurables.
3. `scene-layers.js`: fondo, decoraciones, personajes, objetos y navegación se renderizan dentro del mismo `.library-stage`, que controla `createExplorer`.
4. `scene-layers.css`: estilos encapsulados para capas e interacciones (sin afectar las otras regiones).
5. `library.js`: lee el manifiesto, conserva las galerías/álbumes, muestra el mismo progreso y enlaza acciones mediante un único manejador por elemento.
6. `characters.js`: añade `getCharacterLayerEntries()` optativo; ninguno de los cinco personajes está activo por defecto.
7. `memories.js`: permite que **nuevos** recuerdos indiquen `assetId` en vez de escribir la ruta; los registros actuales se conservan.

## Efecto en otras regiones

- **No se modificaron** `fauna.js`, `city.js`, `cinema.js`, `observatory.js`, `explorer.js`, `memory-viewer.js` ni `storage.js`.
- Yukocine conserva su proyector; Yukoteca sigue sin acceso principal a Clips.
- El sistema anterior de add-ons sigue disponible para las cuatro regiones no migradas.
- El nuevo renderizador de capas se aplica **únicamente a Yukoteca**. No es una migración del resto del mundo.
- La clave `yukoverso_progress_v1` y los IDs `yukoteca:taller`, `yukoteca:fotos`, `yukoteca:albumes` se mantienen.

## Riesgos y límites explícitos

- El zoom de las regiones sigue limitado según `createExplorer` (`0.8` a `1.35`) y el desplazamiento táctil sigue siendo nativo. En la fase piloto no se cambió su implementación.
- Un fondo con diferente relación de aspecto requiere ajustar `size` y `focusPoints`; cambiar solo el archivo funciona sin modificar coordenadas **si mantiene el mismo lienzo 1800×1000**.
- Las acciones nuevas en Yukoteca admiten galería, álbum, recuerdo multimedia, colección, mensaje y diálogo. Todavía no migran automáticamente las actividades especiales de Fauna o la lógica de Ciudad.
- Los personajes necesitan archivos reales y posiciones explícitas antes de mostrarse. Ni sus historias ni sus diálogos fueron inventados.
- El navegador de automatización del entorno bloqueó la navegación HTTP. Se verificó el HTML/CSS/JS ensamblados en memoria con Chromium, y las dependencias ESM con Node; la prueba por servidor real y dispositivo sigue pendiente.
- Los archivos personales son responsabilidad del proyecto local: no se subieron ni copiaron desde fuentes externas.
