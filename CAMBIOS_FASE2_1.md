# Qué cambió exactamente en Fase 2.1 (frente a 2.0)

## Modificados

- `index.html`: cinco regiones; nueva hoja de estilo de recuerdos; se elimina la sección dedicada al arcade; cartografía sin sexta isla.
- `js/map.js`: cinco puntos, con Yukobservatorio desplazado a la isla inferior izquierda; mantiene controles de arrastre y zoom.
- `js/app.js`: añade visor compartido y contador de recuerdos únicos; retira las referencias a la escena arcade y al bloque multimedia redundante.
- `js/storage.js`: conserva `yukoverso_progress_v1`; añade `memoriesFound`; migra museo antiguo a `yukopolis:partidas` sin eliminar IDs históricos.
- `js/scenes/city.js` y `css/city.css`: museo y computadora nuevos, cuatro descubrimientos, seis accesos rápidos adaptados a móvil; mantiene plaza, calendario, correo y teatro.
- `js/scenes/fauna.js`: ancla para dibujo sin modificar misiones.
- `js/scenes/library.js` y `js/data/library-content.js`: dibujos y álbumes pueden referenciar entradas del catálogo; se mantienen tres salas y proyector.
- `js/scenes/cinema.js`: archivo audiovisual central con categorías y paginación; conserva cartelera y taquilla.
- `js/scenes/observatory.js`: postal compartida; conserva carta, constelaciones y 18 estrellas.
- `js/scenes/story-world.js`: evita el cierre tardío de reproductores cuando se abre otro contenido.
- `js/data/experience-content.js`: retira datos de Yukolandia; mantiene observatorio y cine.
- `carta_yuko.html`: actualiza versión de importación sin cambiar el contenido.

## Añadidos

- `js/data/memories.js`: catálogo único de recuerdos, con ocho ejemplos.
- `js/data/memory-anchors.js`: posiciones modulares para objetos de recuerdos en escenarios panorámicos.
- `js/world/memory-viewer.js`: visor compartido para imágenes, vídeo, audio y texto; listas con paginación y filtros.
- `css/memories.css`: estilos del visor y anclas.
- `GUIA_DE_RECUERDOS.md`, `PRUEBAS_FASE2_1.md`, `tests/validate.mjs`: instrucciones y validaciones.

## Retirados

- `js/scenes/arcade.js`: minijuegos genéricos y su lógica, reemplazados por recuerdos en Yukópolis.
- `assets/regions/yukolandia/arcade.svg`: escenario que ya no tiene región.
- `js/content.js`: registro multimedia antiguo vacío, reemplazado por el catálogo único.

## Conservados

- Intro manual y animación; controles de zoom y exploración.
- Progreso local, Yukopasaporte, Yukofauna y sus cinco actividades.
- Yukópolis original y Yukocalendario; Yukoteca original y dos álbumes.
- Yukocine (cartelera y taquilla); Yukobservatorio y carta independiente.
- Registro de Demian, Aokari, Andy, Nixie y Suki, sin historia inventada.
