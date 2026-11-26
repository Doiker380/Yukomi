# Yukoverso 2.3.1 — Botones PNG de Yukoteca

## Ruta pública exacta

Desde la carpeta que contiene `index.html`:

```
assets/ui/yukoteca/btn_dibujos.png
assets/ui/yukoteca/btn_fotos.png
assets/ui/yukoteca/btn_albumes.png
```

No copies el directorio de materiales `F:\proyectos\Yukoverso_Material` entero dentro de la web: sólo copia los tres PNG aprobados.

## Copiar desde la unidad F: en PowerShell

Si el proyecto se mantiene en el Escritorio, tras instalar este ZIP ejecuta:

```powershell
$origen = 'F:\proyectos\Yukoverso_Material\01_Yukoteca\Botones'
$destino = Join-Path $HOME 'Desktop\Yukoverso_Fase1\assets\ui\yukoteca'
New-Item -ItemType Directory -Path $destino -Force | Out-Null
'btn_dibujos.png','btn_fotos.png','btn_albumes.png' | ForEach-Object {
    $archivo = Join-Path $origen $_
    if (-not (Test-Path $archivo)) { throw "No existe: $archivo" }
    Copy-Item -LiteralPath $archivo -Destination $destino -Force
}
Get-ChildItem -Path $destino -Filter '*.png' | Select-Object Name, Length
```

Si el proyecto se movió, sustituye `Yukoverso_Fase1` por la carpeta real que contiene `index.html`.

## Asociación mediante el sistema existente

- `js/data/asset-manifest.js`: rutas e IDs `ui.yukoteca.btn_dibujos`, `ui.yukoteca.btn_fotos`, `ui.yukoteca.btn_albumes`.
- `js/data/library-scene.js`: las entradas `taller`, `fotos`, `albumes` siguen conservando exactamente sus IDs y acciones; sólo cambia `assetId`.
- `js/world/scene-layers.js`: muestra el PNG cuando carga; hasta entonces utiliza el icono anterior. Si falla o falta un PNG, el botón original continúa disponible.
- `css/scene-layers.css`: muestra la imagen sin añadirle el fondo circular anterior. Conserva el rótulo HTML legible.

### Reversión sin perder recursos ni progreso

En `js/data/library-scene.js`:

```js
export const USE_YUKOTECA_PNG_BUTTONS = false;
```

Vuelve a `true` para reactivar imágenes. Recarga con Ctrl+F5 o prueba en una ventana privada para evitar versiones en caché.

## Pruebas

```
node tests/validate.mjs
node tests/architecture.mjs
py -m http.server 8000 --bind 0.0.0.0
```

La validación informa cuáles recursos opcionales faltan sin fallar. Si no copiaste aún los PNG, verás un aviso, no un error. Al copiar los tres, esos avisos deben desaparecer.

En `http://localhost:8000/`, visita Yukoteca y verifica que Dibujos, Fotos y Álbumes siguen abriendo sus visores; el pasaporte y los botones rápidos deben funcionar igual. Desde el móvil usa la IP local del PC y el mismo puerto.

### Publicación GitHub Pages

En el repositorio publicado deben estar `index.html`, los PNG bajo `assets/ui/yukoteca/` y el resto del proyecto. Las URLs empiezan por `assets/` (sin `/` inicial), por lo que funcionan también si la página está alojada en `https://usuario.github.io/nombre-repo/`. **Respeta minúsculas, guiones bajos y nombres exactos:** GitHub Pages distingue mayúsculas/minúsculas.

URLs de comprobación tras publicar:

```
https://usuario.github.io/nombre-repo/assets/ui/yukoteca/btn_dibujos.png
https://usuario.github.io/nombre-repo/assets/ui/yukoteca/btn_fotos.png
https://usuario.github.io/nombre-repo/assets/ui/yukoteca/btn_albumes.png
```

Cambia `usuario` y `nombre-repo` por los tuyos. Si una URL falla, revisa nombre, ruta y si el despliegue ya terminó. No uses rutas `F:\` dentro de HTML o JavaScript.

## Fondo limpio (pendiente)

Su configuración ya existe: `background.yukoteca` apunta a `assets/regions/yukoteca/archive.svg`. No se reemplazó en esta entrega. Cuando compartas el nombre/formato del fondo definitivo, se podrá registrar en el mismo manifiesto y cambiar `backgroundId` sin tocar los botones.
