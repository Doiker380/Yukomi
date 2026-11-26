# Yukoverso 2.9.5a — verificación

- Es una revisión técnica de 2.9.5, con las mismas cinco ilustraciones, versiones de caché nuevas y pruebas actualizadas.
- El parche contiene rutas relativas al **directorio del proyecto**, no una carpeta adicional Yukoverso_Fase1. Descomprime dentro de `Yukoverso_Fase1`.
- El proyecto completo conserva una carpeta raíz `Yukoverso_Fase1`; para instalarlo, descomprime en el Escritorio o una carpeta nueva.
- Pruebas: `node tests/validate.mjs`, `node tests/architecture.mjs`, `node tests/mobile-map.mjs`, `node tests/map-layers-294.mjs`, `node tests/map-sprites.mjs`, `node tests/map-glow-295.mjs`.
- El servidor local recomendado es `py -m http.server 8765 --bind 0.0.0.0`, desde el directorio del proyecto.
