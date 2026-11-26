# Yukoverso 2.6 — Yukocine, piloto visual y de navegación

## Alcance
Esta versión es un cambio conservador realizado sobre **Yukoverso 2.5.1**. El mapa del planeta no se modifica.

### Qué cambió
- `js/data/cinema-scene.js` (nuevo): posiciones porcentuales, puntos de enfoque y IDs estables del cine.
- `js/scenes/cinema.js`: utiliza esa configuración y resuelve el SVG actual desde el manifiesto existente. Conserva las mismas tres acciones. Selección de género ahora indica una sola opción seleccionada.
- `js/scenes/story-world.js`: añade `fitHeightOnReset` **optativo** para que solo el cine arranque sin desplazamiento vertical y sin reajuste de fotogramas. Yukobservatorio conserva su funcionamiento anterior.
- `css/cinema-illustrated.css` (nuevo): accesos de escena como áreas interactivas doradas sobre los lugares existentes, en lugar de grandes burbujas que ocultan el decorado; barra superior más legible en celular.
- `index.html` y `js/app.js`: referencias nuevas de CSS y JS que evitan reutilizar versiones anteriores en caché.

### Qué no cambió
- `js/storage.js`, el identificador de progreso y el pasaporte.
- El mapa, Yukoteca, Yukofauna y Yukópolis.
- `js/data/memories.js` ni `js/world/memory-viewer.js`.
- Los IDs `cartelera`, `taquilla`, `proyector` ni los recuerdos asociados.
- El SVG `assets/regions/yukocine/cinema.svg`, porque aún **no hay fondo ilustrado definitivo**.

### Pendiente visual
Un fondo limpio de Yukocine (lienzo de referencia 1800×1000) que represente cartelera, taquilla y sala/proyector, pero SIN botones funcionales incrustados. Los elementos HTML se pueden mover editando los porcentajes de `js/data/cinema-scene.js`.

### Riesgos conocidos
- Los botones se escalan junto con el escenario y deben probarse en un teléfono real.
- El SVG provisional ya incluye textos de decorado; no se han borrado porque forman parte del recurso existente.
- El navegador puede memorizar el zoom/scroll anterior; usar el botón ⌖ para regresar al encuadre definido por altura.
