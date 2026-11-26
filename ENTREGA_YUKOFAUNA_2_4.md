# Yukofauna ilustrada — integración pendiente de aprobación visual

## Recuperación
Respaldo inmediatamente anterior a la integración: `C:\Users\david\Desktop\Yukoverso_Respaldos\Yukoverso_antes_integracion_20261120_165322`. Copia completa de 73 archivos, verificada por SHA-256 sin diferencias. Respaldo de la primera auditoría: `C:\Users\david\Desktop\Yukoverso_Respaldos\Yukoverso_Fase1_20261120_164521`. No existe repositorio Git.
Para revertir sin perder esta etapa, detener el servidor y servir la carpeta de respaldo o copiarla a una carpeta nueva. Conservar esta carpeta para revisar las diferencias. Los respaldos de archivos no incluyen localStorage; no borrar los datos del navegador.

## Arte y recursos
Generación mediante herramienta integrada image_gen, usando el fondo aprobado de Yukoteca y luego la propuesta aprobada de Yukofauna como referencia artística. El fondo aprobado se conserva sin cambios de composición. Los originales de los sprites y prompts están en `C:\Users\david\Desktop\Yukoverso_Trabajo\Yukofauna_integracion`; el fondo PNG original y su prompt están en `C:\Users\david\Desktop\Yukoverso_Trabajo\Yukofauna_propuesta_01`. No se publicaron los originales pesados.

| Recurso web | Bytes |
|---|---:|
| assets/regions/yukofauna/santuario_ilustrado_v1.webp | 692140 |
| assets/objects/yukofauna/pinguino_v1.webp | 44466 |
| assets/objects/yukofauna/buho_v1.webp | 40436 |
| assets/objects/yukofauna/gato_v1.webp | 28076 |
| assets/objects/yukofauna/pez_v1.webp | 8834 |

Total: 813952 bytes, aproximadamente 795 KiB. Fondo 1681 × 936 sobre escenario lógico 1760 × 980; proporción prácticamente idéntica. Sprites reducidos para web conservando alpha, PNG originales intactos. Pingüino emperador bebé con plumón gris, sombrilla y cristal de frío mágico para el ambiente cálido. El búho y gato son animales genéricos del santuario, no apariencias inventadas de los personajes originales.

Los peces comparten un recurso. Las flores utilizan una zona transparente sobre el jardín pintado, sin duplicar flores. Carta, ovillo, notas y estrella mantienen sus SVG independientes. Botones de navegación y rótulos son HTML/CSS editables, sin textos incrustados. Faroles, setas y piedras del fondo reemplazan visualmente sus emojis decorativos en esta región; sus registros se conservan.

## Posiciones ajustadas (porcentajes x,y)

| Elemento | Antes | Ahora | Motivo |
|---|---|---|---|
| Pingüino al entrar/repetir | 13,60 | 12,55 | Pies sobre la piedra de la laguna |
| Pingüino al completar | 43,60 | 43,56 | Explanada del refugio |
| Familia decorativa | 43,60 | 47,57 | Separa ambos sprites; elimina iglú redundante |
| Búho en reposo | 78,33 | 78,26 | Apoyo próximo a rama ilustrada |
| Flores | 56,82 | 50,82 | Zona transparente sobre jardín existente |
| Cuadro de recuerdo | 51,18 | 58,48 | Marco en fachada del refugio, fuera del cielo |
| Cartel de laguna | 9,49 | 7,48 | Separa cartel y pingüino |
| Rótulos laguna/refugio/bosque/jardín | 6,49 / 39,37 / 72,15 / 57,90 | 16,76 / 43,40 / 75,17 / 53,91 | Asociación con terreno y edificio |

Focos anteriores en píxeles: laguna 290,635; refugio 830,415; bosque 1385,378; jardín 1120,800. Nuevos: 390,580; 850,480; 1370,320; 1130,760. Peces, gato, carta, estrella y recorridos de minijuegos conservan sus coordenadas; el reinicio de animales usa ahora la configuración central. Sin cambios de identificadores, acciones ni clave de progreso.

## Integración y edición
Nuevos: `js/data/fauna-scene.js`, `js/data/fauna-content.js`, `css/fauna-illustrated.css`, cinco WebP, `tests/fauna-browser.cjs`, `COMO_EDITAR_TEXTOS.md` y este informe.
Modificados: `index.html`, `js/app.js`, `js/data/asset-manifest.js`, `js/data/characters.js`, `js/data/memory-anchors.js`, `js/scenes/fauna.js`, `js/scenes/fauna-addons.js`, `js/world/explorer.js`, `js/world/scene-addons.js`.
El motor de zoom expone su escala como variable CSS y Yukofauna adopta ajuste a altura. Las áreas táctiles compensan la escala para conservar al menos 44 px. Los controles de zoom están debajo del paisaje para no cubrir objetos. Glow discreto, foco visible, respuesta táctil y movimiento reducido; los elementos decorativos no reciben indicadores de acción.
La escena utiliza el manifiesto y conserva el fondo/SVG anteriores como fallback. Las apariciones opcionales reutilizan characters.js y el motor de extras: escala, enabled y diálogos cíclicos con texto seguro. No se activaron personajes originales ni se escribieron conversaciones para ellos. Guía de edición en `COMO_EDITAR_TEXTOS.md`.

## Pruebas realizadas
- `node tests/validate.mjs`: pasa.
- `node tests/architecture.mjs`: pasa.
- `node tests/yukoteca-layout.mjs`: pasa.
- `tests/fauna-browser.cjs` con Chromium: pasa a 1440 × 1050, 390 × 844 y 360 × 740. Ratón en escritorio y taps en emulación móvil.
- En cada tamaño: cinco descubrimientos completos, apertura/cierre de recuerdo, día/noche, zoom, teclado, reload con progreso intacto, repetición sin perder 5/5, áreas mínimas de 44 px, ausencia de desbordamiento horizontal del documento, imágenes cargadas y sin errores JS/HTTP.
- Prueba de interrupción de recursos nuevos: fondo original y SVG interactivo siguen disponibles.
- Navegación básica hacia y desde las otras cuatro regiones: pasa sin errores JavaScript. No equivale a repetir todos sus minijuegos.
- Adaptador de conversaciones: secuencia cíclica y aparición deshabilitada comprobadas.

Playwright está instalado fuera del proyecto. Para repetir:

```powershell
$env:PLAYWRIGHT_MODULE='C:\Users\david\Desktop\Yukoverso_Trabajo\herramientas\node_modules\playwright'
$env:YUKO_TEST_OUTPUT='C:\Users\david\Desktop\Yukoverso_Trabajo\Yukofauna_integracion\capturas'
node tests/fauna-browser.cjs
```

Servidor local en puerto 8000 requerido. Las pruebas usan perfiles de navegador nuevos y no cambian el progreso del navegador personal.

## Capturas y prueba manual
Carpeta: `C:\Users\david\Desktop\Yukoverso_Trabajo\Yukofauna_integracion\capturas`.
`desktop-antes.png` y `mobile-antes.png`: versión respaldada. `desktop-laguna.png`, `mobile-laguna.png`, `mobile-jardin.png` y variantes noche/360 px: integración real. Algunas capturas muestran 5/5 porque se tomaron tras completar las actividades de prueba.

PC: `http://localhost:8000`. Teléfono en la misma red: `http://192.168.100.10:8000` mientras el servidor siga activo. Para iniciarlo: `py -m http.server 8000 --bind 0.0.0.0` desde la raíz. Recarga con Ctrl+F5 si el navegador conserva archivos previos. En móvil usa Laguna/Refugio/Bosque/Jardín o desliza lateralmente.

## Pendientes y límites
Se requiere aprobación visual de Yukofauna integrada antes de rediseñar cualquier otra región. Falta validación en teléfono físico/Safari y red móvil real; emulación de Chromium no sustituye esas pruebas. No se midieron Core Web Vitals ni velocidades sobre red celular. Los textos específicos de las otras regiones y la revisión del marco de Yukoteca quedan para sus etapas autorizadas. Las otras regiones no recibieron cambios artísticos.
