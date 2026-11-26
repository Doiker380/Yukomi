# Pruebas — Yukoverso 2.2

## Comprobaciones ejecutadas

- `node tests/validate.mjs` → catálogo, 5 regiones, anclas y álbumes válidos.
- `node --check` → archivos JavaScript modificados válidos.
- XML de `assets/regions/yukoteca/archive.svg` → parsea correctamente.
- Prueba de interacción en Chromium con HTML y JS integrados en memoria (no HTTP) en 360×690, 390×844 y 1280×800:
  - Entrada a Yukoteca y tres botones/hotspots.
  - Dibujos: abrir galería, ampliar imagen y cerrar.
  - Fotos: abrir galería, ampliar imagen y abrir el recuerdo en el visor compartido.
  - Álbumes: abrir, pasar páginas y cerrar.
  - Progreso 3/3 tras visitar las tres secciones.
  - Regreso al mapa, pasaporte y navegación a Yukocine.
  - Yukocine conserva el proyector y crea un reproductor bajo demanda.
  - Sin errores JavaScript en los casos probados.
- Progreso legado: `yukoteca:proyector` permanece guardado; Fotos se registra cuando se visita y no antes.

**Alcance:** las pruebas de Chromium se ejecutaron inyectando el código y CSS en memoria porque el navegador de pruebas bloqueó la navegación por red. No equivalen a una prueba de extremo a extremo servida por HTTP en teléfono.

## Pruebas manuales en PC y teléfono

1. Al abrir Yukoteca aparecen únicamente Dibujos, Álbumes y Fotos, tanto arriba como sobre el escenario.
2. El fondo se desplaza y escala sin romper los botones independientes, y se muestra la nueva pared de fotografías en lugar del proyector.
3. Cada acceso rápido enfoca correctamente su zona; cada botón del escenario abre la actividad correcta.
4. Dibujos permite ampliar obras y volver a la galería.
5. Fotos permite ampliar fotos/capturas y abrir su historia vinculada.
6. Álbumes permite navegar las páginas, incluso las vinculadas a `memoryId`.
7. El marco decorativo de recuerdo sigue funcionando.
8. El Yukopasaporte cuenta 5 regiones y Yukoteca 3 descubrimientos; al recargar se conservan.
9. Si tenías `yukoteca:proyector`, ese dato no desaparece aunque el nuevo apartado Fotos requiera descubrirse.
10. Yukocine sigue reproduciendo el clip de prueba, que se detiene al cerrar.
11. Yukofauna, Yukópolis y Yukobservatorio conservan sus rutas y actividades.
12. Comprueba que en el teléfono las etiquetas no se encimen y se pueden tocar sin precisión excesiva.
