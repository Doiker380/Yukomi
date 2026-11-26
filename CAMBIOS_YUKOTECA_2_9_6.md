# Yukoverso 2.9.6 · Marco de recuerdos con contorno luminoso

## Qué cambió
- El cuadro del gato a la izquierda de Yukoteca **sigue dibujado en el fondo**. No se coloca ninguna imagen adicional sobre él.
- Se eliminó el borde rectangular dorado de 3px.
- El nuevo brillo es un trazo SVG suave que sigue aproximadamente el borde inclinado del cuadro.
- El brillo depende de `glow.path` y `glow.viewBox` de la entrada `marco` en `js/data/memory-anchors.js`.
- Nuevo helper opt-in `js/world/painted-glow.js` y estilos `css/painted-glow.css`, disponibles para el telescopio de Yukobservatorio y otros objetos en una futura revisión.
- Se conserva la interacción original con `postal-estelar`, `id=marco`, x=13.8%, y=74%, pasaporte, zoom y navegación. El área táctil se amplió de 110×150 a 142×156 para cubrir el marco inclinado.
- Se retiró del manifiesto un ID histórico del mapa móvil cuya imagen ya no existe y no se usaba (el mapa continúa utilizando la variante v3).

## Personalización futura
Para otro objeto ya pintado en el fondo, añadir `glow: {viewBox: '0 0 ANCHO ALTO', path: 'M ... Z', color:'#ffe3a1'}` a su ancla con `painted:true`. La acción y el progreso se mantienen independientes del efecto.

## Validación recomendada
1. Abrir Yukoteca por primera vez en teléfono y PC.
2. Confirmar que el contorno dorado sigue al cuadro del gato, sin recuadro rectangular.
3. Tocar el cuadro: debe abrir «Postal de las estrellas».
4. Arrastrar, zoom +/−/reiniciar y volver al mapa.
5. Revisar las otras cuatro regiones y el mapa móvil de cinco edificios.

## Nota
Los antiguos PNG del marco permanecen en el ZIP original del usuario como archivos sin referencias; no se descargan ni renderizan. No se eliminaron automáticamente.
