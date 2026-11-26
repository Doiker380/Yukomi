# Pruebas — Fase 2.3 (piloto Yukoteca)

## Automatizadas

- `node tests/validate.mjs` — PASS: 5 regiones, 8 recuerdos, 5 anclas, 2 álbumes, manifiestos y archivos presentes.
- `node tests/architecture.mjs` — PASS: IDs de recursos, posiciones y tres accesos, importación de recuerdos, personajes opcionales y migración antigua de Yukopasaporte.
- `node --check js/...` — PASS: todos los archivos de JavaScript.
- Chromium con HTML/CSS/JS ensamblados en memoria (no publicado) — PASS, tamaños 390×844, 360×690 y 1280×800:
  - Presentación manual y entrada al mapa.
  - Cinco marcadores de región.
  - Fondo y cuatro capas presentes dentro del lienzo 1800×1000 de Yukoteca.
  - Tres accesos: Dibujos, Álbumes y Fotos.
  - Visores y avance de páginas de álbum.
  - Yukopasaporte registra 3/3 descubrimientos.
  - Regreso al mapa y acceso a las otras cuatro regiones.
  - Prueba temporal de un botón con imagen, un objeto con recuerdo y un personaje con diálogo, sin modificar los archivos del proyecto.
  - Sin excepciones JavaScript en las comprobaciones anteriores.

**Límite:** el entorno de Chromium bloqueó la navegación directa a URLs HTTP, `file:` y `data:`. Se utilizó `page.set_content()` con HTML/CSS/JS ensamblado para la prueba de interacción. No es una prueba de carga de módulos servidos por HTTP ni de gestos en un teléfono físico.

## Pruebas manuales por realizar (PC + teléfono)

1. La introducción se muestra hasta pulsar «Explorar».
2. El mapa principal mantiene cinco regiones y el zoom táctil habitual.
3. Yukoteca abre con fondo actual, únicamente Dibujos, Álbumes y Fotos.
4. Los tres botones del mundo y sus tres accesos rápidos funcionan una sola vez por pulsación.
5. Los controles `+`, `−`, `⌖`, el scroll táctil y el ratón se comportan como en 2.2.
6. El marco de recuerdo anterior sigue disponible y abre el visor.
7. Los dibujos y las fotos se amplían, y los dos álbumes pasan páginas.
8. Al regresar o recargar se conserva `yukoteca:taller`, `yukoteca:fotos` y `yukoteca:albumes`.
9. Yukocine sigue reproduciendo el vídeo de prueba y lo detiene al cerrar.
10. Yukofauna, Yukópolis y Yukobservatorio conservan sus actividades, además de la carta y las 18 estrellas.
11. Al añadir un recurso real, ver que está en su ubicación y que no tapa los accesos táctiles.
12. Comprobar una vez más la fluidez después de incorporar el fondo final; el tamaño de la imagen influye en el rendimiento.

Si alguna prueba falla, restaura el respaldo 2.2 y comparte la prueba exacta, teléfono/navegador, captura y el error de la consola si existe.
