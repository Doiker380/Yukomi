# Yukoverso — Mapa vertical móvil 2.9.1

## Base y alcance
Actualización basada en el ZIP `Yukoverso_Fase1(7).zip`. Conserva el fondo de escritorio y las cinco regiones originales. No toca la introducción, Yukopasaporte ni las escenas individuales.

## Recursos
- Escritorio: `assets/map/mapa_ilustrado_v1.webp` (sin modificar).
- Móvil vertical: `assets/map/mapa_ilustrado_mobile_v1.webp` (941 × 1672 píxeles). Imagen diseñada específicamente para 5 regiones: arriba Yukofauna y Yukocine, centro Yukópolis, abajo Yukobservatorio y Yukoteca.
- Selección de recurso: elemento HTML `picture` con `source media` y `img` de respaldo.

## Datos / coordenadas
`js/data/map-scene.js` define `landmarks` para escritorio y `mobile.landmarks` para la ilustración móvil; cada área incluye x/y/width/height/color. El lienzo móvil se mide en coordenadas naturales 941 × 1672. Los IDs de las regiones y las acciones no cambiaron. Al cambiar la orientación se vuelven a calcular posiciones y tamaños.

## Exploración
En teléfono vertical, el zoom inicial supera el ajuste completo para mostrar edificios más grandes. Comienza cerca de la parte superior y permite deslizar hacia abajo. Los controles +, −, ⌖ y el gesto de pinza permanecen. `⌖` reinicia al encuadre vertical inicial; con `−` se puede alejar para ver más mundo. En escritorio, el encuadre original se conserva.

## Halos futuros
Las zonas de interacción están separadas de la imagen. Tras aprobar la composición, se podrán registrar imágenes/máscaras de siluetas por región (escritorio y móvil por separado). No se implementan los halos definitivos ni se dibujan edificios duplicados ahora.

## Pruebas manuales
1. Visitar desde teléfono 360 × 800, 390 × 844 y 430 × 932; comprobar que el desplazamiento principal sea vertical y los edificios sean reconocibles.
2. Tocar cada una de las cinco regiones (cartela «Visitar» correcta), volver al mapa y repetir.
3. Comprobar arrastre y pinza, zoom +/−, reset ⌖, y orientación horizontal.
4. En escritorio, verificar que sigue el mapa horizontal anterior.
5. Recargar y revisar que Yukopasaporte conserve progreso.
6. Confirmar que no hay errores de consola ni peticiones 404; en móvil debe cargarse el WebP vertical, no el horizontal.

## Servidor local Windows
```powershell
cd "$HOME\Desktop\Yukoverso_Fase1"
py -m http.server 8765 --bind 0.0.0.0
```
Abrir `http://127.0.0.1:8765/` en PC; para móvil usar IP de la computadora en misma red. Detener con Ctrl+C.
