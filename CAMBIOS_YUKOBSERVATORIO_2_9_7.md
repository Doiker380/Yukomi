# Yukoverso 2.9.7 — Yukobservatorio: brillo por silueta

## Alcance

- Sólo la región Yukobservatorio y el componente compartido de brillo por silueta.
- Se conserva Yukoteca 2.9.6 y el mapa móvil 2.9.5a con sus cinco sprites.
- No se modifican contenidos de la carta, vídeos, recuerdos, IDs ni los datos del pasaporte.

## Ajustes visuales

1. Telescopio: perfiles dorados adaptados al tubo, buscador, lente y patas del trípode.
2. Camino estelar: destellos discretos sobre una curva del sendero.
3. Carta: resplandor alrededor del sobre pintado sobre la mesa.
4. Celebración: contornos luminosos de la esfera armilar y el soporte.
5. Postal estelar: el cuadro inclinado del pedestal usa el **mismo sistema** de brillo de Yukoteca. La zona táctil se alinea mejor con el objeto.

Los cuatro primeros trazos se definen en `js/data/observatory-glows.js`, en un lienzo de 1800 × 1000. El quinto utiliza `attachPaintedGlow` sobre el botón del recuerdo. No se duplican imágenes ni se agregan sprites.

Todos los resplandores son visibles antes de seleccionar. No hay animaciones continuas nuevas. La capa es `pointer-events:none`; los botones y sus funciones se mantienen. Si falta el fondo ilustrado, la capa se oculta para no quedar mal colocada sobre el SVG de respaldo.

## Archivos modificados

- `index.html` — carga de módulos/estilos versión 2.9.7
- `js/app.js` — importación actualizada del observatorio y visor
- `js/scenes/observatory.js` — montaje del glow y tamaños táctiles
- `js/world/painted-glow.js` — nueva función reutilizable `mountPaintedSceneGlow`
- `js/world/memory-viewer.js` — importación sincronizada de brillo 2.9.7
- `css/painted-glow.css` — estilos de los trazos, estados de foco y respaldo
- `js/data/observatory-glows.js` — **nuevo** archivo de configuración
- `tests/observatory-glow.mjs` — **nueva** prueba automatizada

## Pruebas

- `node tests/observatory-glow.mjs`
- `node tests/painted-glow.mjs`
- `node tests/validate.mjs`
- `node tests/architecture.mjs`

Comprobar en celular la navegación y el zoom del observatorio. El navegador de este entorno bloquea navegar a la página completa, por lo que la prueba visual se hizo con una composición aislada en Chromium que usa la ilustración real y la hoja de estilos.
