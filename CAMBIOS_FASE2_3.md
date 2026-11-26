# Registro de cambios — Fase 2.3

## Archivos nuevos

- `js/data/asset-manifest.js`: registro de recursos con IDs y verificador.
- `js/data/library-scene.js`: manifiesto de Yukoteca: tamaño, fondo, decoraciones, controles y objetos futuros.
- `js/world/scene-layers.js`: renderizador compartible de capas, con acciones configurables.
- `css/scene-layers.css`: capas independientes y posicionamiento relativo al escenario.
- `tests/architecture.mjs`: pruebas de recursos, escenas y progreso.
- `AUDITORIA_ARQUITECTURA_2_3.md`, `GUIA_INTEGRACION_VISUAL_2_3.md`, `PRUEBAS_FASE2_3.md`.

## Archivos modificados

- `index.html`: importa estilos de capas y actualiza versión del módulo principal.
- `js/app.js`: versión del importador de Yukoteca.
- `js/scenes/library.js`: usa el manifiesto y una única ruta de acción para cada hotspot, sin alterar galerías ni álbumes.
- `js/data/characters.js`: soporte optativo `assetId`, `enabled` y `scale` para apariciones en capas.
- `js/data/memories.js`: `assetId`/`thumbnailAssetId` opcionales para nuevos registros; mantiene rutas existentes.
- `js/data/library-content.js`: importador del catálogo actualizado.
- `tests/validate.mjs`: verificaciones adicionales de manifiestos y capas.
- `README.md`: instrucciones de la versión piloto.

## Elementos que no se han reemplazado

- Los cinco fondos y los recursos de prueba originales.
- La navegación principal, el pasaporte y la persistencia.
- La implementación de Yukofauna, Yukópolis, Yukocine y Yukobservatorio.
- Las tres galerías de Yukoteca y sus datos originales.
- El visor audiovisual compartido, los motores de zoom y el sistema de anclas de recuerdos.

No se incluyeron dibujos, clips, fotos ni recursos privados nuevos.
