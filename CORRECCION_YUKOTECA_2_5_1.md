# Yukoverso 2.5.1 — Corrección localizada de Yukoteca

Base: ZIP `Yukoverso_Fase1(4).zip` que compartió el usuario, con Yukofauna 2.4 y Yukópolis 2.5.

## Qué se corrigió

- En el primer acceso a Yukoteca, `show()` establece el zoom **sincrónicamente** después de mostrar el contenedor, antes de que el navegador pinte el primer fotograma. Esto elimina el salto inicial de escala 1.0 al ajuste por altura.
- Se retiró `ResizeObserver` **solo para el comportamiento `fitHeightOnReset`**, porque estaba reajustando repetidamente en respuesta a reflujo/scrollbars. Se reajusta con `resize` externo de ventana, tras 160 ms, y solo si la ventana cambió realmente. Las otras regiones siguen con su configuración anterior.
- En el encuadre inicial no hay scroll vertical; al usar zoom manual se habilita otra vez.
- En Yukoteca solo existe el hotspot `marco`, en X 13.8%, Y 74%, sobre el cuadro del **fondo ilustrado izquierdo**. Conserva `postal-estelar` y la persistencia de recuerdos.
- Se añadió borde dorado, destello estático y respuesta visual hover/focus a la zona pintada. No se insertó otro marco PNG ni se cambiaron posiciones.
- Se retiraron las dos copias PNG sin uso (`assets/objects/yukoteca/marco_recuerdos.png` y `assets/ui/yukoteca/marco_recuerdos.png`) y el ID huérfano del manifiesto. **No se borraron dibujos del fondo ni contenidos del pasaporte**.
- Se actualizaron las versiones de CSS/JS para evitar caché antigua.

## Archivos modificados
`index.html`, `css/library.css`, `js/app.js`, `js/scenes/library.js`, `js/world/explorer.js`, `js/data/memory-anchors.js`, `js/data/asset-manifest.js`, `tests/architecture.mjs`, `tests/validate.mjs`.

Archivos nuevos: `tests/library-stability.mjs`, `CORRECCION_YUKOTECA_2_5_1.md`.

## Pruebas

```powershell
node tests/validate.mjs
node tests/architecture.mjs
node tests/yukoteca-layout.mjs
node tests/library-stability.mjs
```

En el teléfono o escritorio: entrar a Yukoteca **por primera vez tras recargar la página** y verificar que no salte el encuadre; salir/entrar; acercar y volver a centrar; pulsar marco izquierdo y verificar Postal de las estrellas; pulsar Dibujos, Fotos y Álbumes; revisar el pasaporte. Las verificaciones automáticas no sustituyen estas pruebas.

## Instalación
Usa el parche sobre la carpeta de tu proyecto actual. El parche solo agrega/sustituye archivos; para retirar las dos copias del marco, ejecuta las líneas `Remove-Item` incluidas en las instrucciones de entrega. El proyecto completo ya las omite.
