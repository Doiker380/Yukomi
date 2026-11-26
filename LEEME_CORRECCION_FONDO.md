# Yukoverso 2.3.3 — Corrección del fondo de Yukoteca

## Qué resuelve
- Con la versión 2.3.2 algunos navegadores mantenían el SVG `archive.svg` aunque el PNG existiera.
- Ahora el elemento de fondo usa directamente la ruta de `background.yukoteca.clean`; solo vuelve al SVG si el PNG falla.
- El resto de la escena, los botones PNG, el progreso, los recuerdos, los controles táctiles y Yukocine no cambian.

## Instalación (PARCHE incremental sobre 2.3.2)
1. Detener el servidor (`Ctrl + C`).
2. Respaldar la carpeta web actual.
3. Descomprimir este ZIP ENCIMA de la carpeta raíz del proyecto `Yukoverso_Fase1` (`Expand-Archive ... -DestinationPath ... -Force`).
4. NO borrar `assets`; los PNG se quedan en su lugar.
5. Reiniciar `py -m http.server 8000 --bind 0.0.0.0`.
6. Abrir el sitio y recargar con `Ctrl + F5`.

## Comprobación (Consola F12 estando en Yukoteca)
```javascript
const fondo = document.querySelector('#libraryExperience .scene-layer-background');
console.log({archivo: fondo?.getAttribute('src'), cargada: fondo?.complete, ancho: fondo?.naturalWidth, alto: fondo?.naturalHeight});
```
Esperado: `archivo: "assets/regions/yukoteca/yukoteca_bg_clean_v1.png"`; `ancho: 1672`, `alto: 941`.

## Volver atrás
- En `js/data/library-scene.js`, cambiar `USE_YUKOTECA_CLEAN_BACKGROUND` a `false` y recargar.
- Alternativamente, volver al respaldo del proyecto previo.

## Requisitos
Este parche no trae ni sobrescribe `assets/regions/yukoteca/yukoteca_bg_clean_v1.png` ni los tres PNG de botones. Ya deben estar copiados en el proyecto, como hizo el usuario.
