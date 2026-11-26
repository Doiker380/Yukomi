# Yukoverso 2.9.2 · Primera etapa de sprites del mapa

## Cambios visibles
- El zoom inicial del mapa móvil usa un multiplicador **1.1** en lugar de 1.3 (aproximadamente 15% menos ampliación).
- El escritorio conserva su encuadre anterior. El mapa conserva exactamente cinco regiones, IDs, hotspots y pasaporte.

## Primer sprite disponible
- `assets/map/sprites/yukofauna_v1.webp` — primer edificio independiente, con transparencia, optimizado.
- Registrado como `landmark.map.mobile.yukofauna` en `js/data/asset-manifest.js`.
- Configurado en `js/data/map-scene.js` con la posición `x:209, y:273`.
- **`enabled:false` por diseño**: el mapa móvil actual (`assets/map/mapa_ilustrado_mobile_v1.webp`) incluye el santuario pintado. Activarlo ahora dibujaría dos edificios. Para usarlo hay que preparar primero un fondo limpio, retirando esa construcción del paisaje conservando terreno, caminos y río.
- Los sprites se dibujan con `map-sprite-layer` y `map-landmark-sprite`. Son decorativos y no capturan clics; los hotspots HTML originales mantienen la navegación y progreso.

## Próximas etapas
1. Crear base móvil limpia (sin edificios), coherente con la ilustración actual y con puntos de aterrizaje de sprites.
2. Generar los otros cuatro edificios en archivos transparentes; ajustar tamaño y ubicación por separado.
3. Solo cuando todos los edificios estén listos activar los sprites al sustituir el fondo con un mapa limpio en `asset-manifest.js` y `map-scene.js`.
4. Preparar arquitectura equivalente para el mapa horizontal. Los mismos cinco IDs y acciones sirven en ambas orientaciones.
5. Revisar halos sutiles y rendimiento móvil.

## Pruebas
`node tests/mobile-map.mjs` y `node tests/map-sprites.mjs`.
En el teléfono revisar primer encuadre, gestos y botón ⌖.
