# Yukoverso 2.9.5 — glow permanente y sprites restantes del mapa móvil

## Cambios
- Se añadieron los sprites móviles faltantes: Yukópolis, Yukoteca y Yukobservatorio.
- Se mantuvieron Yukofauna y Yukocine como sprites separados.
- Se activó un glow visible desde el inicio sobre cada sprite del mapa móvil.
- Se aumentó también el halo suave de los hotspots móviles para que las zonas se perciban mejor sin necesidad de selección.
- No se modificaron los IDs, acciones, progreso, ni navegación del mapa.

## Archivos nuevos
- assets/map/sprites/yukopolis_v1.webp
- assets/map/sprites/yukoteca_v1.webp
- assets/map/sprites/yukobservatorio_v1.webp

## Archivos modificados
- js/data/asset-manifest.js
- js/data/map-scene.js
- js/map.js
- css/styles.css

## Qué probar
1. Abrir el mapa en teléfono (360×800, 390×844 o similar).
2. Verificar que los cinco landmarks tengan glow desde el inicio.
3. Comprobar que tocar cada uno abre la región correcta.
4. Confirmar que el zoom y el desplazamiento vertical siguen funcionando bien.
5. Confirmar que en escritorio se conserva el mapa horizontal anterior.
