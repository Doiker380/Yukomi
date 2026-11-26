/**
 * Resplandor opt-in para objetos PINTADOS en la ilustración del escenario.
 * No dibuja sprites ni modifica eventos: el hotspot original conserva la acción.
 * El trazado SVG puede adaptarse a cualquier silueta desde la configuración.
 */
const NS = 'http://www.w3.org/2000/svg';

export function attachPaintedGlow(button, config) {
  if (!button || !config || typeof config.path !== 'string' || !config.path.trim()) return false;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', config.viewBox || '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('painted-glow-shape');
  const createLine = (className) => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', config.path);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.classList.add(className);
    svg.append(path);
  };
  createLine('painted-glow-aura');
  createLine('painted-glow-edge');
  if (config.color) button.style.setProperty('--painted-glow-color', config.color);
  button.classList.add('has-painted-glow');
  button.append(svg);
  return true;
}

/**
 * Dibuja brillo sobre un decorado panorámico ya pintado.
 * A diferencia de attachPaintedGlow(), las coordenadas SVG usan todo el
 * escenario, por lo que el trazo no altera el tamaño ni el lugar del botón.
 * Los eventos de la escena quedan totalmente intactos.
 */
export function mountPaintedSceneGlow(stage, entries, viewBox = '0 0 1800 1000') {
  if (!stage || !Array.isArray(entries) || !entries.length) return 0;
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('scene-painted-glow-layer');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  let count = 0;
  for (const entry of entries) {
    if (!entry?.id || typeof entry.path !== 'string' || !entry.path.trim()) continue;
    const group = document.createElementNS(NS, 'g');
    group.classList.add('scene-painted-glow-object');
    if (entry.intensity === 'subtle') group.classList.add('is-subtle');
    group.setAttribute('data-glow-region-object', entry.id);
    if (entry.transform) group.setAttribute('transform', entry.transform);
    if (entry.color) group.style.setProperty('--scene-painted-color', entry.color);
    for (const cls of ['scene-painted-glow-aura','scene-painted-glow-edge']) {
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', entry.path);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.classList.add(cls);
      group.append(path);
    }
    svg.append(group);
    count++;
  }
  if (count) stage.append(svg);
  return count;
}
