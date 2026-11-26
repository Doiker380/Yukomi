# Pruebas de aceptación — Yukoverso 2.1

## Comprobaciones realizadas en desarrollo

Se verificó sintaxis JavaScript (`node --check`) y consistencia del catálogo (ID únicos, referencias y regiones válidas). Se ejecutó una simulación de navegación con Chromium con código y estilos autocontenidos para 360×690, 390×844 y 1280×800: la introducción permanece hasta pulsar el botón; el mapa tiene cinco regiones; Yukofauna, Yukópolis, Yukoteca, Yukocine y Yukobservatorio abren sin excepciones JS; el museo de partidas presenta cuatro referencias de prueba; la computadora presenta el mismo ID de vídeo que el cine; los álbumes usan las rutas del catálogo; la carta y las 18 estrellas siguen operativas; se conserva la lista de recuerdos abiertos; la migración histórica identifica Yukolandia y traslada el museo a Yukópolis.

Prueba adicional con **31 entradas simuladas**: Yukocine paginó en lotes de 12→24→31, filtró por categoría y **no creó elementos de vídeo al listar tarjetas**. Estas comprobaciones **no** garantizan el funcionamiento de la versión servida por HTTP en tu teléfono, que debe probarse manualmente.

## Probar en PC y teléfono

- [ ] 1. Intro siempre visible hasta pulsar **Explorar** o **Entrar sin animación**.
- [ ] 2. El mapa muestra **cinco** regiones, sin isla ni acceso de Yukolandia.
- [ ] 3. En Yukofauna siguen funcionando las cinco actividades y el modo nocturno; ahora hay una ilustración contextual.
- [ ] 4. En Yukópolis siguen disponibles plaza, 12 meses, correo y teatro; el **museo** abre cuatro registros de prueba y la **computadora** abre el clip demo.
- [ ] 5. El museo de partidas cuenta como cuarto descubrimiento de Yukópolis (4/4 con plaza, correo y calendario).
- [ ] 6. En Yukoteca se pueden abrir tres dibujos, ambos álbumes, sus páginas, el proyector y el botón para ver la historia de un dibujo.
- [ ] 7. En Yukocine se abre la videoteca; el filtro cambia categorías; el MP4 **no** se reproduce solo. Al cerrar se detiene.
- [ ] 8. En Yukobservatorio constelaciones, carta directa, postal y celebración de **18 estrellas** funcionan.
- [ ] 9. Al cerrar una imagen o un clip y abrir otro enseguida, el nuevo contenido sigue visible.
- [ ] 10. Pasaporte: **5/5** al visitar las cinco regiones; presenta contador de recuerdos únicos abiertos.
- [ ] 11. Recargar y regresar no borra las visitas ni los descubrimientos previos.
- [ ] 12. En teléfono: desplazamientos, botones, diálogos y vídeo son accesibles sin trabas ni solapamientos.

## Comprobación de datos guardados antiguos

Si ya visitaste Yukolandia en 2.0, el histórico se conserva dentro de la misma clave local `yukoverso_progress_v1`, aunque el pasaporte nuevo sólo cuente las cinco regiones activas. Quien descubrió `yukolandia:reliquias` obtiene `yukopolis:partidas` en la carga. **No borres datos para hacer la prueba.** Si necesitas un respaldo manual, en la consola del navegador puedes consultar:

```js
localStorage.getItem('yukoverso_progress_v1')
```

Guarda el texto en un lugar privado antes de pruebas riesgosas. La misma dirección (protocolo + dominio/IP + puerto) conserva almacenamiento; `localhost` y una IP local son orígenes distintos.

## Comprobaciones aún no efectuadas por esta entrega

- Prueba desde tu teléfono real de la instalación extraída.
- Validación del enlace publicado y su conexión móvil fuera de la Wi-Fi local.
- Revisión de la carta definitiva, privacidad, licencia y selección del contenido personal.
- Prueba de carga y tiempo de espera con 10–30 vídeos reales y sus tamaños finales.
