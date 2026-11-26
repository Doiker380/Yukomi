import { assetUrl } from "./data/asset-manifest.js?v=2.9.5a";
import { MAP_SCENE } from "./data/map-scene.js?v=2.9.5a";

export const REGIONS = [
  { id: "yukofauna", name: "Yukofauna", icon: "🐧", type: "Un lugar lleno de animalitos", x: 265, y: 216, mx: 195, my: 167, theme: "fauna", description: "Yukooo, hice un lugar con pingüinos bebés y búhos porque obvio tenían que estar aquí JAJA.", objects: [
    { id: "pinguino", icon: "🐧", name: "Pingüino bebé", message: "Mira ese pingüinitooo. Se ve bien feliz de que hayas venido JAJA." },
    { id: "buho", icon: "🦉", name: "Búho guardián", message: "El búho dice que aquí se vale reírse a gritos. Literalmente tu especialidad JAJA." },
    { id: "gato", icon: "🐱", name: "Gato dormilón", message: "El gato vino a dormir, como siempre. Pero al menos vino a tu cumpleaños JAJA." },
    { id: "flores", icon: "🌷", name: "Flores danzantes", message: "Estas florecitas despiertan si encuentras sus brillitos." },
    { id: "estrella", icon: "⭐", name: "Estrella escondida", message: "Aaaa encontraste la estrellita secreta. Que goood JAJA." }
  ] },
  { id: "yukocine", name: "Yukocine", icon: "🎬", type: "Para ver clips y otras cositas", x: 982, y: 234, mx: 518, my: 172, theme: "cine", description: "Aquí van tus gritos, tus risas, pelis y otras cosas que había que guardar JAJA.", objects: [
    { id:"cartelera", icon: "🎟️", name: "Cartelera", message: "Historias y carteles interactivos." },
    { id:"taquilla", icon: "🎫", name: "Taquilla de géneros", message: "Elige una función especial." },
    { id:"proyector", icon: "🍿", name: "Proyector", message: "Clips con reproducción manual." }
  ] },
  { id: "yukopolis", name: "Yukópolis", icon: "🏰", type: "La ciudad más Yuko de todas", x: 644, y: 416, mx: 360, my: 414, theme: "capital", description: "Esta ciudad está llena de nombres bien raros. Sí, fui yo el de las ideas JAJA.", objects: [
    { id: "plaza", icon: "⛲", name: "Plaza Yukocéntrica", message: "Yukoooo, bienvenida a tu ciudad JAJA." },
    { id: "calendario", icon: "📅", name: "Yukocalendario", message: "Sí, cambié todos los meses del calendario JAJA." },
    { id: "correo", icon: "📮", name: "Yukocorreo", message: "Dejé unos sobrecitos para ti." },
    { id: "partidas", icon: "🏆", name: "Museo de partidas", message: "Aquí guardé las partidas y skins que me gustaban mucho." }
  ] },
  { id: "yukoteca", name: "Yukoteca", icon: "📚", type: "Fotitos y recuerdos nuestros", x: 1012, y: 656, mx: 518, my: 662, theme: "library", description: "Puse aquí las capturas que guardé, las skins match y álbumes para que los veas cuando quieras.", objects: [
    { id: "albumes", icon: "📖", name: "Álbumes de recuerdos", message: "Álbumes para ver fotitos y recordar cositas." },
    { id: "fotos", icon: "📷", name: "Galería de fotos", message: "Un montóoon de fotos que guardé de nosotros JAJA." }
  ] },
  { id: "yukobservatorio", name: "Yukobservatorio", icon: "🔭", type: "Un rinconcito bajo las estrellas", x: 272, y: 652, mx: 191, my: 662, theme: "observatory", description: "Aquí sí quería dejarte unos mensajitos más personales. Pásate, Yuko 💜.", objects: [
    { id:"camino", icon: "🌙", name: "Camino estelar", message: "Te dejé unas frases en el caminito." },
    { id:"telescopio", icon: "🔭", name: "Telescopio", message: "Mira las constelaciones que hice para ti." },
    { id:"carta", icon: "💌", name: "Carta estelar", message: "La cartita está aquí, no tienes que hacer ninguna misión." }
  ] },
];

const DESKTOP_W = 1280;
const DESKTOP_H = 900;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const MOBILE_W = MAP_SCENE.mobile.width;
const MOBILE_H = MAP_SCENE.mobile.height;
const MOBILE_MATCH = "(max-width: 650px) and (orientation: portrait)";

/**
 * Navegación del mapa — v1.2
 * La geografía ilustrada se conserva en todos los tamaños de pantalla.
 * El desplazamiento y el zoom táctil se agrupan en requestAnimationFrame.
 */
export function createMap({ viewport, layer, onSelect }) {
  // <picture> selecciona SOLO el archivo que corresponde a la orientación.
  // No descargamos el mapa horizontal en teléfonos cuando se usa el vertical.
  const artPicture = document.createElement("picture");
  artPicture.className = "map-picture";
  const mobileSource = document.createElement("source");
  mobileSource.media = MOBILE_MATCH;
  mobileSource.srcset = assetUrl(MAP_SCENE.mobile.background);
  const art = document.createElement("img");
  art.className = "map-illustration";
  art.alt = "";
  art.draggable = false;
  art.decoding = "async";
  art.addEventListener("load", () => {
    layer.classList.add("world-illustrated");
    viewport.classList.add("map-illustrated-viewport");
  });
  art.addEventListener("error", () => {
    // SVG anterior de respaldo si la imagen ilustrada no está disponible.
    layer.classList.remove("world-illustrated");
    viewport.classList.remove("map-illustrated-viewport");
  });
  artPicture.append(mobileSource, art);
  layer.prepend(artPicture);
  // Sprites opcionales en coordenadas de escena, detrás de los hotspots HTML.
  // No se activan sobre un fondo que ya tiene el edificio pintado.
  const spriteLayer = document.createElement("div");
  spriteLayer.className = "map-sprite-layer";
  spriteLayer.setAttribute("aria-hidden", "true");
  artPicture.after(spriteLayer);

  // Establecer src después de montar <picture> evita solicitar el fondo
  // horizontal antes de que el navegador evalúe <source media>.
  art.src = assetUrl(MAP_SCENE.background);
  const buttons = new Map();
  const pointerPositions = new Map();
  const point = event => ({ x: event.clientX, y: event.clientY });
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const prefersMobile = window.matchMedia(MOBILE_MATCH);

  let worldW = DESKTOP_W, worldH = DESKTOP_H;
  let mobile = false;
  let box = { left: 0, top: 0, width: 1, height: 1 };
  let scale = 1, x = 0, y = 0, minZoom = .25, maxZoom = 1.5;
  let ready = false, frame = 0;
  let lastDragAt = -1000, pan = null, pinch = null;
  let lastMarkerScale = 0;

  for (const region of REGIONS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "region-marker";
    button.dataset.region = region.id;
    const landmark = MAP_SCENE.landmarks[region.id];
    button.style.setProperty("--landmark-width", `${landmark.width}px`);
    button.style.setProperty("--landmark-height", `${landmark.height}px`);
    button.style.setProperty("--landmark-color", landmark.color);
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `Seleccionar ${region.name}`);
    const symbol = document.createElement("span");
    symbol.className = "marker-symbol";
    symbol.textContent = region.icon;
    const label = document.createElement("span");
    label.className = "marker-label";
    label.textContent = region.name;
    button.append(symbol, label);
    button.addEventListener("click", event => {
      if (performance.now() - lastDragAt < 350) {
        event.preventDefault();
        return;
      }
      onSelect(region);
      select(region.id);
    });
    layer.append(button);
    buttons.set(region.id, button);
  }

  function refreshSpriteLayers() {
    const sprites = mobile ? MAP_SCENE.mobile.landmarkSprites : MAP_SCENE.landmarkSprites;
    spriteLayer.replaceChildren();
    for (const sprite of sprites ?? []) {
      if (!sprite.enabled) continue;
      const src = assetUrl(sprite.assetId);
      if (!src) continue;
      const img = document.createElement("img");
      img.className = "map-landmark-sprite";
      img.dataset.region = sprite.id;
      img.src = src;
      img.alt = "";
      img.draggable = false;
      img.decoding = "async";
      img.loading = "lazy";
      img.style.left = `${sprite.x}px`;
      img.style.top = `${sprite.y}px`;
      img.style.width = `${sprite.width}px`;
      img.style.height = `${sprite.height}px`;
      const glowSource = mobile ? MAP_SCENE.mobile.landmarks[sprite.id] : MAP_SCENE.landmarks[sprite.id];
      if (glowSource?.color) img.style.setProperty('--sprite-glow-color', glowSource.color);
      // Sprite decorativo: las acciones y el progreso siguen en el botón HTML existente.
      spriteLayer.append(img);
    }
  }

  function regionCoords(region) {
    return mobile ? MAP_SCENE.mobile.landmarks[region.id] : MAP_SCENE.landmarks[region.id];
  }

  function refreshViewport() {
    const r = viewport.getBoundingClientRect();
    box = { left: r.left, top: r.top, width: r.width, height: r.height };
  }

  function applyLayout() {
    const nextMobile = prefersMobile.matches;
    const changed = nextMobile !== mobile;
    mobile = nextMobile;
    worldW = mobile ? MOBILE_W : DESKTOP_W;
    worldH = mobile ? MOBILE_H : DESKTOP_H;
    layer.style.width = `${worldW}px`;
    layer.style.height = `${worldH}px`;
    layer.classList.toggle("world-mobile", mobile);
    if (changed || !ready) refreshSpriteLayers();
    // Al pasar de escritorio a móvil o viceversa, también cambia el tamaño
    // de las zonas interactivas; antes solo se actualizaba su posición.
    if (changed || !ready) {
      for (const region of REGIONS) {
        const pos = regionCoords(region);
        const button = buttons.get(region.id);
        button.style.left = `${pos.x}px`;
        button.style.top = `${pos.y}px`;
        button.style.setProperty("--landmark-width", `${pos.width}px`);
        button.style.setProperty("--landmark-height", `${pos.height}px`);
        button.style.setProperty("--landmark-color", pos.color);
      }
      const hint = viewport.closest(".map-main")?.querySelector("#mapHint");
      if (hint) hint.textContent = mobile
        ? "↑ ↓ Desliza el mapa · Toca un edificio"
        : "Mueve el mapa · Toca una región";
    }
    return changed;
  }

  function select(id) {
    buttons.forEach((button, key) => {
      button.classList.toggle("is-selected", key === id);
      button.setAttribute("aria-pressed", String(key === id));
    });
  }

  function constrain() {
    if (!box.width || !box.height) return;
    const w = worldW * scale, h = worldH * scale;
    x = w <= box.width ? (box.width - w) / 2 : clamp(x, box.width - w, 0);
    y = h <= box.height ? (box.height - h) / 2 : clamp(y, box.height - h, 0);
  }

  function render() {
    frame = 0;
    constrain();
    // Se actualiza solamente la transformación de una capa en cada fotograma.
    layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    layer.style.setProperty("--map-scale", scale);
    // El tamaño visual de los marcadores se compensa sin invalidar estilos del SVG.
    const labelPx = box.height < 350 ? 12 : 14;
    const markerScale = clamp(labelPx / (20 * scale), 1, 3.3);
    if (Math.abs(markerScale - lastMarkerScale) > .025) {
      for (const button of buttons.values()) {
        button.style.setProperty("--marker-ui-scale", markerScale.toFixed(3));
      }
      lastMarkerScale = markerScale;
    }
  }

  function requestRender() {
    if (frame) return;
    frame = requestAnimationFrame(render);
  }

  function renderNow() {
    if (frame) cancelAnimationFrame(frame);
    render();
  }

  function overviewScale() {
    return Math.min(box.width / (worldW + 60), box.height / (worldH + 60));
  }

  function updateZoomLimits() {
    minZoom = overviewScale();
    maxZoom = minZoom * 2.85;
  }

  function reset() {
    refreshViewport();
    if (!box.width || !box.height) return;
    applyLayout();
    updateZoomLimits();
    // Móvil: abrir un poco más lejos; descubrir las zonas deslizando
    // en una única pantalla. El recorrido se descubre de arriba hacia abajo.
    // Mostrar los edificios algo más lejos que en 2.9.3, sin reducir el mapa
    // entero a una miniatura: debe quedar recorrido vertical por descubrir.
    scale = mobile ? clamp((box.width / worldW) * 1.04, minZoom, maxZoom) : minZoom;
    x = (box.width - worldW * scale) / 2;
    y = mobile ? 0 : (box.height - worldH * scale) / 2;
    ready = true;
    renderNow();
  }

  function updateSize() {
    const oldCenter = ready ? {
      x: (box.width / 2 - x) / scale,
      y: (box.height / 2 - y) / scale,
      oldW: worldW, oldH: worldH,
      zoomRatio: scale / minZoom
    } : null;
    refreshViewport();
    if (!box.width || !box.height) return;
    const changed = applyLayout();
    if (!oldCenter) return reset();
    updateZoomLimits();
    if (changed) {
      // Al rotar pantalla, recuperar el mapa completo.
      return reset();
    }
    scale = clamp(minZoom * oldCenter.zoomRatio, minZoom, maxZoom);
    x = box.width / 2 - oldCenter.x * scale;
    y = box.height / 2 - oldCenter.y * scale;
    renderNow();
  }

  function zoomAt(factor, clientX, clientY) {
    refreshViewport();
    if (!box.width || !box.height) return;
    const px = clientX - box.left, py = clientY - box.top;
    const worldX = (px - x) / scale, worldY = (py - y) / scale;
    scale = clamp(scale * factor, minZoom, maxZoom);
    x = px - worldX * scale;
    y = py - worldY * scale;
    requestRender();
  }

  function zoom(factor) {
    refreshViewport();
    zoomAt(factor, box.left + box.width / 2, box.top + box.height / 2);
  }

  function focusRegion(id) {
    const region = REGIONS.find(r => r.id === id);
    if (!region) return;
    refreshViewport();
    const pos = regionCoords(region);
    x = box.width / 2 - pos.x * scale;
    y = box.height / 2 - pos.y * scale;
    renderNow();
    select(id);
    onSelect(region);
  }

  viewport.addEventListener("wheel", event => {
    event.preventDefault();
    zoomAt(event.deltaY < 0 ? 1.12 : 1 / 1.12, event.clientX, event.clientY);
  }, { passive: false });

  viewport.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    refreshViewport();
    pointerPositions.set(event.pointerId, point(event));
    if (pointerPositions.size === 1) {
      pan = { start: point(event), x, y, moved: false };
      pinch = null;
      if (!event.target.closest(".region-marker")) {
        try { viewport.setPointerCapture(event.pointerId); } catch { /* no capturable */ }
      }
    } else if (pointerPositions.size === 2) {
      const [a, b] = [...pointerPositions.values()];
      const mid = midpoint(a, b);
      pinch = {
        distance: Math.max(1, distance(a, b)),
        scale,
        worldX: (mid.x - box.left - x) / scale,
        worldY: (mid.y - box.top - y) / scale
      };
      pan = null;
    }
  });

  viewport.addEventListener("pointermove", event => {
    if (!pointerPositions.has(event.pointerId)) return;
    pointerPositions.set(event.pointerId, point(event));
    if (pointerPositions.size === 2 && pinch) {
      const [a, b] = [...pointerPositions.values()];
      const mid = midpoint(a, b);
      const candidate = pinch.scale * distance(a, b) / pinch.distance;
      scale = clamp(candidate, minZoom, maxZoom);
      x = mid.x - box.left - pinch.worldX * scale;
      y = mid.y - box.top - pinch.worldY * scale;
      lastDragAt = performance.now();
      requestRender();
    } else if (pointerPositions.size === 1 && pan) {
      const dx = event.clientX - pan.start.x;
      const dy = event.clientY - pan.start.y;
      if (!pan.moved && Math.hypot(dx, dy) > 7) {
        pan.moved = true;
        try { viewport.setPointerCapture(event.pointerId); } catch { /* dedo levantado */ }
      }
      if (pan.moved) {
        x = pan.x + dx;
        y = pan.y + dy;
        lastDragAt = performance.now();
        requestRender();
      }
    }
  }, { passive: true });

  function endPointer(event) {
    if (!pointerPositions.has(event.pointerId)) return;
    if (pan?.moved || pinch) lastDragAt = performance.now();
    pointerPositions.delete(event.pointerId);
    pinch = null;
    if (pointerPositions.size === 1) {
      const [p] = [...pointerPositions.values()];
      pan = { start: p, x, y, moved: true };
    } else pan = null;
    renderNow();
  }
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);
  viewport.addEventListener("lostpointercapture", event => {
    if (pointerPositions.has(event.pointerId)) endPointer(event);
  });

  viewport.addEventListener("keydown", event => {
    if (event.target !== viewport) return;
    const step = 65;
    if (event.key === "+" || event.key === "=") zoom(1.2);
    else if (event.key === "-") zoom(1 / 1.2);
    else if (event.key === "ArrowLeft") x += step;
    else if (event.key === "ArrowRight") x -= step;
    else if (event.key === "ArrowUp") y += step;
    else if (event.key === "ArrowDown") y -= step;
    else return;
    event.preventDefault();
    requestRender();
  });

  // Evitar dejar un frame pendiente si el navegador se pone en segundo plano.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else if (!document.hidden && ready) requestRender();
  });

  return { reset, zoom, focusRegion, select, updateSize };
}
