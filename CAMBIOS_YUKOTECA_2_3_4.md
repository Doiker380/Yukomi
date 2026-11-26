# Yukoverso 2.3.4 — Ajustes de interfaz de Yukoteca

Base: ZIP enviado por el usuario (`Yukoverso_Fase1(1).zip`). Se conservaron el PNG definitivo `yukoteca_bg_clean_v1.png`, los tres PNG originales y los cinco escenarios.

## Cambios

1. **Etiquetas duplicadas:** se ocultan las etiquetas blancas solamente cuando un botón PNG carga; si no carga se mantiene el botón antiguo con su etiqueta. Los `aria-label`, los eventos y los ID de descubrimiento se conservan.
2. **Zoom inicial:** Yukoteca activa `fitHeightOnReset`, modo opcional en `createExplorer`. Calcula la escala según la altura real del viewport, con margen de 12 píxeles; el desplazamiento inicial queda horizontal. Los zoom +/- permiten acercar y recorrer verticalmente si es necesario.
3. **Botones:** botones ilustrados crecen a 380 × 220 unidades del lienzo de 1800 × 1000, sin alterar sus coordenadas ni las acciones. Sus áreas táctiles se agrandan.
4. **Encuadre/título:** el título de Yukoteca permanece legible en la cabecera, independientemente del zoom. Al cambiar el tamaño de ventana, se vuelve a ajustar si el usuario no ha realizado zoom manual.

## Archivos editados
- `js/world/explorer.js` (opción no intrusiva; otras regiones siguen con `reset` escala 1)
- `js/scenes/library.js` (activa la opción y título)
- `css/scene-layers.css` (tamaño PNG y etiqueta)
- `css/library.css` (visibilidad del título y ajuste de panorama)
- `index.html` y `js/app.js` (versionado de caché)

Nuevo: `tests/yukoteca-layout.mjs`. No se modifica almacenamiento, catálogo de recuerdos, contenido de galerías, ni el manifiesto.

## Pruebas en PC y teléfono
1. Entrar a Yukoteca: comprobar que el alto completo del fondo cabe en el visor y que se explora horizontalmente.
2. Confirmar que solo se ven los letreros PNG; no los chips blancos duplicados.
3. Probar Dibujos, Fotos y Álbumes, abrir galerías y páginas; conservar progreso después de recargar.
4. Acercar con `+` (ahora puede desplazarse verticalmente), alejar con `−` y pulsar `⌖` (vuelve al encuadre inicial).
5. Girar el teléfono o cambiar el ancho de ventana: el encuadre se adapta sin perder los objetos.
6. Visitar las otras cuatro regiones y Yukopasaporte. Verificar también la página publicada en GitHub Pages tras subir los cambios.

## Consideraciones
- En modo panorámico inicial (altura completa) los botones también se reducen con el fondo. Se compensa ampliando su tamaño dentro del escenario. Revisar que no tapen elementos importantes del diseño definitivo.
- No se borra ni se altera ninguna entrada de `localStorage`.
- Con PNG roto/ausente, el botón muestra icono y etiqueta originales.
