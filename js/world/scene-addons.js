/**
 * Renderizador independiente de extras. Opcional, no modifica descubrimientos.
 * Si se indica media, se abre un diálogo accesible con controles y SIN autoplay.
 * Solo usar rutas locales confiables del propio proyecto.
 */
export function installSceneAddons({stage, entries, onMessage}) {
  const surface = document.createElement('div');
  surface.className = 'fauna-addon-layer';
  stage.append(surface);
  const player = document.createElement('dialog');
  player.className = 'fauna-media-dialog';
  player.setAttribute('aria-label', 'Contenido del santuario');
  player.innerHTML = '<div class="fauna-media-toolbar"><strong class="fauna-media-title"></strong><button type="button" class="fauna-media-close" aria-label="Cerrar contenido">✕ Cerrar</button></div><div class="fauna-media-body"></div>';
  document.body.append(player);
  const body = player.querySelector('.fauna-media-body');
  function stopMedia() {
    for (const media of body.querySelectorAll('audio,video')) media.pause();
    body.replaceChildren();
  }
  const close = () => {if (player.open) player.close();stopMedia();};
  player.querySelector('.fauna-media-close').addEventListener('click', close);
  player.addEventListener('close', stopMedia);
  for (const item of entries) {
    if (!item || typeof item.id !== 'string' || item.enabled===false) continue;
    const interactive = item.kind !== 'decoration';
    const el = document.createElement(interactive ? 'button':'div');
    el.className = `fauna-addon ${interactive?'fauna-addon-action':'fauna-addon-decoration'}`;
    el.style.left = `${item.x}%`;
    el.style.top = `${item.y}%`;
    if(Number.isFinite(item.scale) && item.scale>0) el.style.transform=`translate(-50%,-50%) scale(${item.scale})`;
    let dialogueIndex=0;
    if (interactive) {el.type = 'button';el.setAttribute('aria-label',item.label || item.id);} else el.setAttribute('aria-hidden','true');
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image; img.alt = '';img.loading = 'lazy'; img.decoding = 'async';
      el.append(img);
    } else {
      const icon = document.createElement('span');icon.className='fauna-addon-icon';icon.textContent = item.icon || '✦';el.append(icon);
    }
    if (item.label && interactive) {
      const label = document.createElement('span');label.className='fauna-addon-label';label.textContent=item.label;el.append(label);
    }
    if (interactive) el.addEventListener('click', () => {
      if (Array.isArray(item.dialogue) && item.dialogue.length) {
        onMessage(item.label || 'Personaje',String(item.dialogue[dialogueIndex++ % item.dialogue.length]),item.icon || '✦');
      } else if (item.message) onMessage(item.label || 'Descubrimiento', item.message, item.icon || '✦');
      if (item.media && ['audio','video','image'].includes(item.media.type) && item.media.src) {
        stopMedia();
        const m = item.media;
        player.querySelector('.fauna-media-title').textContent = m.title || item.label || 'Recuerdo';
        const element = document.createElement(m.type === 'image'?'img':m.type);
        element.src=m.src;
        if (m.type === 'image') element.alt = m.title || 'Ilustración del Yukoverso';
        else {element.controls = true;element.preload='none';if(m.type==='video')element.playsInline=true;}
        body.append(element);
        if (!player.open) player.showModal();
      }
    });
    surface.append(el);
  }
  return {close};
}
