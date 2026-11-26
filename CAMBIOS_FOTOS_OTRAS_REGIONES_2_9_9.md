# Yukoverso 2.9.9 — Fotos en otras regiones

Esta versión procede de la integración de fotos de Yukoteca 2.9.8.

## Ubicaciones nuevas (sin copiar fotos)
- Yukópolis / Museo: foto-02, foto-08, foto-10, foto-14, foto-23 y captura-skin-01/02/03.
- Yukópolis / Computadora: foto-04, foto-07, foto-11, foto-15, foto-16, foto-18, foto-21.
- Yukobservatorio / Postal estelar: foto-01, foto-09, foto-22.
- Yukoteca sigue mostrando las 43 fotos y capturas con sus álbumes.
- Yukofauna queda reservada para dibujos o recuerdos de animales.
- Los ejemplos existentes permanecen disponibles, pero los recuerdos reales aparecen primero.

## Riesgo de concurrencia con Codex
**NO sobreescribas `js/data/memories.js` con el archivo de esta versión si Codex
ya añadió videos.** Para ese caso, ejecuta `Integrar_Fotos_Otras_Regiones_2_9_9.ps1`:
solo agrega referencias secundarias y actualiza URLs de caché. Conserva los clips
registrados por Codex.

## Comprobaciones en el móvil
- Yukópolis: toca Museo y Computadora; deben mostrar sus fotos nuevas.
- Yukobservatorio: toca la postal enmarcada para abrir las tres fotos nuevas,
  además de su postal anterior.
- Yukoteca: revisa que la galería y los álbumes sigan funcionando.
- Yukocine: si Codex ya lo editó, comprueba que los videos permanezcan.
