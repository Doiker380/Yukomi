# Yukópolis ilustrada y ajuste del Marco de Yukoteca

## Respaldo
`C:\Users\david\Desktop\Yukoverso_Respaldos\Yukoverso_antes_yukopolis_20261120_170510`

Copia completa de los 84 archivos anteriores, incluido Yukofauna aprobado, verificada con SHA-256 sin diferencias. No hay repositorio Git. Para revertir sin perder esta etapa, sirve esa carpeta o cópiala a una carpeta nueva. No borres los datos del navegador: el respaldo de archivos no incluye localStorage.

## Recursos reales
Generados con image_gen integrado a partir de las referencias visuales de Yukoteca y Yukofauna aprobadas:

| Recurso publicado localmente | Dimensiones | Bytes |
|---|---|---:|
| assets/regions/yukopolis/capital_ilustrada_v1.webp | 1663 × 946 | 683540 |
| assets/characters/yukopolis/habitante_v1.webp | 341 × 512, alpha real | 37324 |

Total de recursos nuevos: 720864 bytes (704 KiB aproximadamente). La escena conserva su lienzo lógico de 1800 × 1000; el fondo se adapta a él, con una diferencia de proporción aproximada del 2,4 %. Los PNG originales y prompts exactos están fuera de la carpeta servida, en `C:\Users\david\Desktop\Yukoverso_Trabajo\Yukopolis_integracion`. Se conserva `capital.svg` como fallback. No se reemplazó ni eliminó ningún recurso anterior.

La ilustración incluye plaza y fuente, café con un pequeño Pompompurin, Ayuntamiento, correo, teatro, museo de partidas y quiosco con computadora. Los bloques decorativos evocan juegos de construcción. No se inventaron vídeos ni recuerdos. La habitante ilustrada reemplaza el emoji genérico existente y conserva sus mensajes; no representa a Demian, Aokari, Andy, Nixie o Suki.

## Interacciones
Ayuntamiento, correo, teatro, museo y PC utilizan zonas transparentes sobre objetos ya dibujados, con destellos discretos y foco visible. No hay botones ni textos funcionales incrustados en el fondo. Los rótulos son HTML. La habitante mantiene un sprite independiente. Se conservan los cuatro descubrimientos `plaza`, `calendario`, `correo`, `partidas`, el teatro y los reproductores existentes.

Los controles de zoom están debajo del paisaje, fuera de los objetos. El encuadre inicial cabe verticalmente y permite desplazamiento horizontal móvil. Las áreas táctiles compensan la escala para conservar al menos 44 px. El modo de movimiento reducido desactiva las animaciones del glow. Se mantienen el motor de extras, el catálogo de recuerdos y los adaptadores de personajes existentes.

## Posiciones anteriores y nuevas
Coordenadas porcentuales del escenario, no de pantalla:

| Objeto | Antes | Ahora | Motivo |
|---|---|---|---|
| Habitante / plaza | 24,76 | 33,79 | Zona pavimentada libre, separada de la fuente |
| Ayuntamiento | 36,52 | 35,51 | Puerta del edificio ilustrado |
| Correo | 69,54 | 69,53 | Entrada de la oficina |
| Teatro | 90,54 | 89,52 | Acceso entre cortinas |
| Museo | 51,36 | 54.5,34 | Puerta al fondo de la escalinata |
| Computadora | 57,79 | 57,71 | Pantalla y teclado del quiosco pintado |
| Marco de Yukoteca | 73,28 | 13.8,74 | Cuadro ya ilustrado sobre la mesa izquierda |

Focos de Yukópolis anteriores: plaza [390,735], calendario [655,510], correo [1250,525], teatro [1600,540], museo [920,370], computadora [1040,810]. Nuevos: [540,760], [630,510], [1242,530], [1602,520], [981,340], [1026,710].

El marco de Yukoteca utiliza un área de 110 × 150 unidades y no dibuja otro PNG encima. Su recurso independiente queda conservado en el manifiesto y en disco. Su ID sigue siendo `marco` y abre `postal-estelar`. No se alteraron el fondo de Yukoteca ni sus tres botones principales.

## Archivos
Nuevos: dos WebP, `css/city-illustrated.css`, `js/data/city-scene.js`, `tests/city-browser.cjs`, este informe.

Modificados: `index.html`, `js/app.js`, `js/data/asset-manifest.js`, `js/data/city-content.js`, `js/data/memory-anchors.js`, `js/scenes/city.js`, `js/scenes/library.js`, `js/world/memory-viewer.js`, `tests/architecture.mjs`, `tests/validate.mjs`, `COMO_EDITAR_TEXTOS.md`.

El visor compartido añade un modo optativo `painted:true`, con dimensiones independientes del objeto. Las demás anclas conservan su comportamiento. Las pruebas que fijaban la posición antigua del marco se actualizaron a la nueva zona y mantienen las verificaciones de ID, recurso conservado y recuerdo asociado.

## Pruebas efectuadas
- Validación de recursos, arquitectura y distribución de Yukoteca: pasan las tres pruebas estáticas existentes.
- Chromium a 1440 × 1050, 390 × 844 y 360 × 740: pasan los doce meses, la festividad, las tres cartas, diálogos de habitante, teatro, cuatro recuerdos del museo y reproducción del vídeo existente de la PC.
- Vídeo sin autoplay, reproducción mediante prueba explícita y eliminación del reproductor al cerrar comprobadas.
- Zoom, persistencia 4/4 tras recargar, teclado, áreas mínimas de 44 px y modo de movimiento reducido: pasan.
- Marco de Yukoteca mediante toque y Enter abre «Postal de las estrellas» y no duplica la imagen del marco: pasa en los tres tamaños.
- Sin errores JavaScript/HTTP durante esos recorridos. Primera inspección visual sin imágenes fallidas ni desbordamiento horizontal del documento.
- Interrupción de carga del fondo y habitante: fallback SVG y acción de calendario conservados.
- Regresión completa de Yukofauna en los tres tamaños, incluidas sus cinco actividades, recuerdo, guardado y fallback: pasa.

Para repetir las pruebas de navegador con el servidor activo:

```powershell
$env:PLAYWRIGHT_MODULE='C:\Users\david\Desktop\Yukoverso_Trabajo\herramientas\node_modules\playwright'
$env:YUKO_TEST_OUTPUT='C:\Users\david\Desktop\Yukoverso_Trabajo\Yukopolis_integracion\capturas'
node tests/city-browser.cjs
```

## Capturas y prueba manual
Capturas en `C:\Users\david\Desktop\Yukoverso_Trabajo\Yukopolis_integracion\capturas`: `yukopolis-antes.png`, `yukoteca-antes.png`, `desktop-plaza.png`, `mobile-plaza.png`, `mobile-teatro.png`, calendarios y marco de Yukoteca en tres tamaños. Algunas capturas muestran 4/4 porque se tomaron tras completar las pruebas.

Desde la raíz: `py -m http.server 8000 --bind 0.0.0.0`. En PC abre `http://localhost:8000`; en teléfono en la misma red, `http://192.168.100.10:8000`. Recarga con Ctrl+F5 si hay caché anterior. Recorre los seis accesos de Yukópolis; entra a Yukoteca y toca el cuadro de la mesa izquierda para comprobar el marco.

No se ha probado un teléfono físico, Safari ni rendimiento en red celular real. Las pruebas móviles son emulación Chromium. La publicación remota no se ha realizado. Yukocine y Yukobservatorio no recibieron cambios visuales; la siguiente región del orden de trabajo es Yukocine.
