> **DOCUMENTO HISTÓRICO (2.3.5).** Desde 2.5.1 esta integración PNG se retiró por duplicar el cuadro ya pintado en el fondo. **No sigas las instrucciones de este documento para la versión actual**. Consulta `CORRECCION_YUKOTECA_2_5_1.md`. El hotspot izquierdo `marco` sigue activo y tiene borde dorado.

---

# Yukoverso 2.3.5 — Marco de recuerdos

## Integración

- Archivo: `assets/objects/yukoteca/marco_recuerdos.png` (1086 × 1448 PNG RGBA original).
- ID de recurso: `object.yukoteca.marco_recuerdos` en `js/data/asset-manifest.js`.
- Ancla: `js/data/memory-anchors.js` → `yukoteca` → `marco`.
- Posición preservada: `x:73`, `y:28`, relativa al escenario 1800 × 1000.
- Tamaño visual inicial: `width:160`, `height:215` unidades del escenario.
- Acción preservada: abre `postal-estelar` mediante el visor compartido; se conserva la lógica de colecciones.
- Si el PNG no carga, se mantiene icono y etiqueta previos. No se modifica el progreso.

## Ajustar el tamaño sin tocar lógica

En `js/data/memory-anchors.js` modifica **únicamente** `width` y `height` de la entrada `marco`, manteniendo la proporción aproximada 3:4. Si quieres moverlo, ajusta `x`/`y` en porcentajes.

## Instalación del parche

Con el servidor apagado, haz respaldo y descomprime el ZIP de parche en la carpeta del proyecto con `-Force`. No borra los botones o el fondo. Reinicia servidor y actualiza caché con Ctrl+F5.

## Pruebas manuales

1. Yukoteca muestra el marco ilustrado junto a los botones Dibujos, Fotos y Álbumes.
2. Al tocar el marco abre «Postal de las estrellas».
3. Se puede cerrar el visor; zoom y desplazamiento conservan la ubicación del marco.
4. Yukopasaporte mantiene progreso tras recargar.
5. Las otras regiones funcionan con sus hotspots anteriores.
6. Prueba también en teléfono.

**Advertencia estética:** antes de fijar la posición final, comprueba que el marco no se superponga a un cuadro ya dibujado en el fondo.
