# Yukoverso 2.5.1 — Yukoteca estable y cuadro izquierdo resaltado

Versión basada en **el ZIP real del usuario del 20 de noviembre de 2026**. Conserva las cinco regiones y los recursos de Yukofauna 2.4 y Yukópolis 2.5. Se corrigió únicamente el montaje/zoom inicial de Yukoteca y se retiraron los dos PNG de un marco duplicado. El **marco pintado de la mesa izquierda** sigue siendo un botón con borde dorado y abre «Postal de las estrellas».

**Arranque local (PowerShell):**

```powershell
cd "$HOME\Desktop\Yukoverso_Fase1"
py -m http.server 8765 --bind 0.0.0.0
```

PC: `http://127.0.0.1:8765/`; teléfono: `http://IP_LOCAL_DEL_PC:8765/` en la misma red, si el Firewall lo permite.

**Pruebas:**

```powershell
node tests/validate.mjs
node tests/architecture.mjs
node tests/yukoteca-layout.mjs
node tests/library-stability.mjs
```

Consulta `CORRECCION_YUKOTECA_2_5_1.md` para cambios, detalles de instalación y pruebas manuales. Nunca borres el almacenamiento del navegador: el pasaporte permanece en `yukoverso_progress_v1`.

---

# Yukoverso — Fase 2.3: arquitectura visual y multimedia (Yukoteca piloto)

**Base:** Fase 2.2. No rehicimos el proyecto ni rediseñamos las cinco regiones. Esta versión añade recursos por ID y capas configurables **solo en Yukoteca**.

## Documentos nuevos

- `AUDITORIA_ARQUITECTURA_2_3.md` — qué reutilizamos y cuáles son las limitaciones.
- `GUIA_INTEGRACION_VISUAL_2_3.md` — añadir fondos, botones, personajes, objetos y recuerdos.
- `CAMBIOS_FASE2_3.md` — listado de archivos modificados.
- `PRUEBAS_FASE2_3.md` — pruebas efectuadas y por realizar en móvil.

## Comprobación rápida

```powershell
node tests/validate.mjs
node tests/architecture.mjs
py -m http.server 8000 --bind 0.0.0.0
```

En la computadora visita `http://localhost:8000`; en el teléfono abre la IP local y el puerto 8000, con ambos en la misma red. Usa una nueva carpeta para la fase 2.3 y **conserva un respaldo de 2.2**. No borres los datos del navegador.

---

# YUKOVERSO · FASE 2.1 — CINCO REGIONES Y RECUERDOS INTERACTIVOS

**Esta versión deriva directamente de Yukoverso 2.0. No reconstruye el proyecto.** El propósito es conservar todo lo que ya funcionaba, retirar la región genérica Yukolandia, trasladar el museo a Yukópolis y permitir usar un solo archivo multimedia en varios lugares.

## Ejecutar

Descomprime el ZIP en la carpeta de trabajo habitual (por ejemplo `Desktop\Yukoverso_Fase1`). Primero haz un respaldo de la fase 2.0. En PowerShell:

```powershell
cd "$HOME\Desktop\Yukoverso_Fase1"
py -m http.server 8000 --bind 0.0.0.0
```

En PC abre `http://localhost:8000`. En el teléfono, conectado a la misma Wi-Fi, usa `http://IP_LOCAL_DE_TU_PC:8000`. La IP puede verse con `Get-NetIPConfiguration`. Para detener el servidor, pulsa `Ctrl + C`.

**No abras index.html con doble clic:** los módulos JS necesitan un servidor HTTP. **No borres los datos del sitio:** el guardado conserva la clave histórica `yukoverso_progress_v1`.

## Las cinco regiones activas

| Región | Estado |
|---|---|
| Yukofauna | Santuario y 5 actividades originales; objeto para descubrir una ilustración |
| Yukópolis | Plaza, calendario, correo y teatro conservados; **museo de partidas** y computadora de recuerdos nuevos |
| Yukoteca | Tres accesos: Dibujos, Fotos y Álbumes; fondo SVG sin controles incrustados y visor de imágenes compartido |
| Yukocine | Cartelera y taquilla conservadas; catálogo audiovisual filtrable y paginado (12 por bloque) |
| Yukobservatorio | Carta directa, constelaciones y cielo de 18 estrellas conservados; postal contextual |

Yukolandia ya no aparece en el mapa ni en los listados. El archivo `js/scenes/arcade.js` y el arte de la antigua región se retiraron. Su museo ahora está en Yukópolis; el cazayukostrellas no se mantiene por ser una tarea genérica. Las frases interesantes del antiguo caos se pueden recrear como recuerdos personales, pero no se duplicaron como minijuego.

## Sistema de recuerdos: archivos principales

- `js/data/memories.js`: **catálogo maestro**. Cada recuerdo tiene `id`, `type`, `title`, `description`, `src` cuando aplica, `category`, `tags`, `primaryRegion`, `locations`, y opcionalmente `thumbnail`.
- `js/data/memory-anchors.js`: **ubicaciones físicas de objetos** en los escenarios (x/y en porcentajes). Añadir un objeto aquí no exige modificar la lógica interna de la región.
- `js/world/memory-viewer.js`: visor único; crea imagen, vídeo, audio o nota sólo cuando se abre el recuerdo; detiene y libera reproductores al cerrar. Muestra listas y colecciones.
- `css/memories.css`: estilos accesibles para teléfono, PC y diálogos.
- `js/data/library-content.js`: álbumes y vistas existentes, ahora referencian recuerdos del catálogo cuando muestran archivos.
- `js/scenes/city.js`: conserva funciones anteriores y ahora tiene cuatro descubrimientos (`plaza`, `calendario`, `correo`, `partidas`).
- `js/scenes/cinema.js`: películas/taquilla y **colección audiovisual** filtrable por categoría. **No crea vídeos hasta que se selecciona uno**; la lista muestra sólo 12 tarjetas a la vez.
- `js/storage.js`: conserva historial antiguo y migra el descubrimiento `yukolandia:reliquias` a `yukopolis:partidas`. La nueva lista `memoriesFound` no rompe las visitas ni los descubrimientos anteriores.
- `js/data/characters.js`: mantiene registrados Demian, Aokari, Andy, Nixie y Suki, sin apariciones ni diálogos inventados.

## Cómo sustituir y ampliar recuerdos

Lee **`GUIA_DE_RECUERDOS.md`**. Los ocho ejemplos del catálogo son **provisionales**, no recuerdos de Yuko. Un mismo ID puede aparecer en Yukocine, Yukópolis y Yukoteca sin repetir `src` ni copiar el archivo.

Si vas a usar fotografías privadas o grabaciones personales, revisa que tengas permiso antes de publicarlas. GitHub Pages es público: la URL no protege su contenido. Evita subir metadatos de ubicación, conversaciones privadas o archivos cuya difusión no esté autorizada.

## Archivos y formatos

- Fotos optimizadas `.webp`/`.jpg` (imagen por lo general menor que 1600 px de ancho si no se requiere más).
- Dibujos transparentes `.webp` o `.png`.
- Vídeos breves `.mp4` H.264/AAC, con miniatura `.webp` si es posible.
- Audios propios `.mp3`/`.m4a`; reproducción siempre bajo acción del visitante.
- Usa rutas relativas desde la raíz: `assets/videos/mi-clip.mp4`.

## Pruebas y pendientes

Consulta `PRUEBAS_FASE2_1.md` para validar en PC y teléfono. Se hicieron pruebas de interacción con Chromium en composición autocontenida para tres tamaños de pantalla. **Aún debes validar esta versión en tu servidor real, el teléfono y la publicación definitiva.**

Antes de compartir, sustituye el material de muestra, escribe la carta final, revisa privacidad y comprueba la versión publicada desde una conexión distinta a tu red de casa.

## Fase 2.2: Yukoteca sin proyector

La sección de clips se retiró **solo de Yukoteca**. Dibujos, Álbumes y Fotos son ahora los tres accesos; las miniaturas y los objetos interactivos son elementos DOM independientes de `assets/regions/yukoteca/archive.svg`. Yukocine mantiene el reproductor.

La antigua recompensa `yukoteca:proyector` se conserva en el historial del navegador, pero deja de contar como uno de los tres descubrimientos actuales. Para completar 3/3, abre una foto en la nueva galería. El progreso usa la misma clave `yukoverso_progress_v1`.

Consulta `CAMBIOS_FASE2_2.md` y `PRUEBAS_FASE2_2.md`.

## Fase 2.3.1: botones PNG opcionales para Yukoteca

La ruta pública es `assets/ui/yukoteca/`. Copia allí `btn_dibujos.png`, `btn_fotos.png` y `btn_albumes.png` desde tu carpeta de materiales. El manifiesto y `library-scene.js` ya están preparados. Si alguno falta, se conserva el icono anterior. Para desactivar todas las imágenes cambia `USE_YUKOTECA_PNG_BUTTONS = false` en `js/data/library-scene.js`. Las acciones y el pasaporte no cambian. Consulta `INTEGRACION_BOTONES_YUKOTECA.md`.
