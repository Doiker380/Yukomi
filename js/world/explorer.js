/**
 * Motor ligero reutilizable para regiones grandes.
 * Mantiene scroll NATIVO para gestos táctiles: no intercepta el movimiento de los dedos.
 * El zoom es opcional mediante botones, conserva el centro visible.
 */
/**
 * fitHeightOnReset es opt-in: solo Yukoteca lo utiliza.
 * En el encuadre inicial cabe toda la altura y el desplazamiento es horizontal;
 * al ampliar voluntariamente puede haber desplazamiento vertical.
 */
export function computeHeightFitScale(viewportHeight, worldHeight, inset=12) {
  if (!Number.isFinite(viewportHeight) || !Number.isFinite(worldHeight) || viewportHeight <= 0 || worldHeight <= 0) return 1;
  return Math.min(1, Math.max(.25, (viewportHeight - inset) / worldHeight));
}

export function createExplorer({viewport, space, stage, width, height, focusPoints = {}, initial = null, fitHeightOnReset = false}) {
  let scale = 1;
  const MIN = .8;
  const MAX = 1.35;
  let autoFitted = fitHeightOnReset;
  let lastFitWidth = 0, lastFitHeight = 0;
  const fittedScale = () => computeHeightFitScale(viewport.clientHeight, height);
  const minimumScale = () => fitHeightOnReset ? Math.min(MIN, fittedScale() * .88) : MIN;
  const apply = () => {
    // Sin transiciones: cambiar el encuadre no debe mostrar fotogramas intermedios.
    viewport.classList.toggle('is-height-fitted', fitHeightOnReset && autoFitted);
    stage.style.setProperty('--scene-scale',String(scale));
    space.style.width = `${Math.round(width * scale)}px`;
    space.style.height = `${Math.round(height * scale)}px`;
    stage.style.transform = `scale(${scale})`;
    stage.style.transformOrigin = 'top left';
  };
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  function focusPoint(x, y, smooth = true) {
    viewport.scrollTo({
      left: clamp(x * scale - viewport.clientWidth / 2, 0, Math.max(0, width*scale - viewport.clientWidth)),
      top: clamp(y * scale - viewport.clientHeight / 2, 0, Math.max(0, height*scale - viewport.clientHeight)),
      behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant'
    });
  }
  function focus(name, smooth = true) {
    const p = focusPoints[name];
    if (p) focusPoint(p[0], p[1], smooth);
  }
  function zoom(factor) {
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / scale;
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / scale;
    autoFitted = false;
    scale = clamp(Math.round(scale * factor * 1000) / 1000, minimumScale(), MAX);
    apply();
    focusPoint(centerX, centerY, false);
    return scale;
  }
  function reset() {
    // Si la región está oculta, no calcular a partir de un viewport de 0 px.
    if(fitHeightOnReset && (viewport.clientWidth < 40 || viewport.clientHeight < 40)) return;
    autoFitted = fitHeightOnReset;
    scale = fitHeightOnReset ? fittedScale() : 1;
    apply();
    if(fitHeightOnReset) {
      lastFitWidth = viewport.clientWidth;
      lastFitHeight = viewport.clientHeight;
    }
    if (initial) focus(initial, false);
    else viewport.scrollTo({left:0, top:0, behavior:'instant'});
  }
  // Solo recalcular ante cambios EXTERNOS de la ventana. La observación directa
  // del viewport causaba reajustes durante el primer montaje (scrollbars/layout),
  // haciendo que el fondo pareciera vibrar hasta abandonar y reabrir Yukoteca.
  // La región hace su primer reset SINCRÓNICAMENTE antes de mostrarse.
  if(fitHeightOnReset) {
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if(!autoFitted || !viewport.isConnected || viewport.clientHeight < 40) return;
      // Un debounce evita repetir ajustes al mostrar/ocultar barras del navegador.
      if(resizeTimer !== null) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        if(!autoFitted || viewport.clientHeight < 40) return;
        const nextWidth = viewport.clientWidth;
        const nextHeight = viewport.clientHeight;
        if(Math.abs(nextWidth-lastFitWidth)<2 && Math.abs(nextHeight-lastFitHeight)<2) return;
        reset();
      }, 160);
    }, {passive:true});
  }
  // Solo el ratón arrastra el fondo; en el teléfono scroll nativo (sin JS por frame).
  let dragging = false;
  let startX = 0, startY = 0, scrollX = 0, scrollY = 0;
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if (event.target.closest('button,a,[role="button"],dialog')) return;
    dragging = true;
    startX = event.clientX; startY = event.clientY;
    scrollX = viewport.scrollLeft; scrollY = viewport.scrollTop;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', event => {
    if (!dragging) return;
    viewport.scrollLeft = scrollX - (event.clientX - startX);
    viewport.scrollTop = scrollY - (event.clientY - startY);
  });
  function stop() {dragging = false; viewport.classList.remove('is-dragging');}
  viewport.addEventListener('pointerup', stop);
  viewport.addEventListener('pointercancel', stop);
  viewport.addEventListener('lostpointercapture', stop);
  viewport.addEventListener('keydown', event => {
    const deltas = {ArrowLeft:[-100,0], ArrowRight:[100,0], ArrowUp:[0,-100], ArrowDown:[0,100]};
    if (!deltas[event.key]) return;
    event.preventDefault();
    const [dx,dy] = deltas[event.key];
    viewport.scrollBy({left:dx,top:dy,behavior:'smooth'});
  });
  apply();
  return {focus, zoom, reset, getScale:()=>scale};
}
