# Yukoverso 2.9.4 — Mapa móvil con dos sprites

- Fondo vertical limpio: `assets/map/mapa_ilustrado_mobile_clean_v3.webp` (941 × 1672).
- Sprite móvil Yukofauna: `assets/map/sprites/yukofauna_v1.webp`.
- Sprite móvil Yukocine: `assets/map/sprites/yukocine_v1.webp`.
- Ambos se pintan sobre el mismo escenario y siguen su zoom y desplazamiento.
- El mapa horizontal de escritorio sigue utilizando `assets/map/mapa_ilustrado_v1.webp`; sus marcadores y coordenadas no se cambian.
- El zoom inicial de móvil usa 1.04 veces el encuadre por ancho, sujeto a límites.
- Las otras tres regiones siguen funcionando como hotspots, pero aún no tienen sprites: el nuevo fondo muestra espacios vacíos provisionales para ellas.
- Los halos definitivos todavía no están implementados.

## Cómo probar
1. Ejecutar `node tests/mobile-map.mjs` y `node tests/map-sprites.mjs`.
2. Ejecutar `py -m http.server 8765 --bind 0.0.0.0`.
3. En móvil comprobar que Yukofauna y Yukocine aparecen una sola vez y se pueden seleccionar.
4. Deslizar hacia abajo para llegar a Yukópolis, Yukoteca y Yukobservatorio; comprobar que sus marcadores siguen funcionando aunque sus sprites aún falten.
5. En escritorio comprobar que se conserva el mapa horizontal.
