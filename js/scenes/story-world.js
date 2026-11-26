import { createExplorer } from '../world/explorer.js?v=1.6';
import { installSceneAddons } from '../world/scene-addons.js?v=1.6';
import { getCharacterAddons } from '../data/characters.js?v=1.7';

/**
 * Motor de regiones panorámicas. Se reutiliza en observatorio, cine y arcade.
 * La lógica de cada interacción se implementa en su módulo, sin modificar el mapa.
 */
export function createStoryWorld({host, id, label, subtitle, backdrop, markers, discoveryIds,
  hasDiscovered, discover, focusPoints = {}, initial, addons = [], fitHeightOnReset = false}) {
  const make=(tag,cls='',value='')=>{const e=document.createElement(tag);if(cls)e.className=cls;if(value)e.textContent=value;return e;};
  const root=make('div',`story-world story-world-${id}`);
  root.innerHTML=`
    <header class="story-header"><div class="story-headline"><small>✦ UN RINCÓN DEL YUKOVERSO ✦</small><strong></strong><span></span></div><div class="story-tabs" aria-label="Accesos de región"></div></header>
    <div class="story-notice" role="status" hidden><span class="story-notice-icon">✦</span><div><strong class="story-notice-title"></strong><p class="story-notice-text"></p></div><button class="story-notice-close" type="button" aria-label="Cerrar mensaje">✕</button></div>
    <div class="story-shell"><div class="story-viewport" tabindex="0" aria-label="Escenario explorable, desliza horizontal y verticalmente"><div class="story-space"></div></div><div class="story-zoom"><button type="button" data-zoom="in" aria-label="Acercar">+</button><button type="button" data-zoom="out" aria-label="Alejar">−</button><button type="button" data-zoom="reset" aria-label="Centrar escenario">⌖</button></div><div class="story-move-help">↔ Desliza para ver qué hay</div></div>
    <section class="story-progress"><div><small>YUKOPASAPORTE</small><h2>Cositas que encontraste</h2></div><strong class="story-progress-count"></strong><div class="story-progress-line"><span></span></div><p>Puedes volver cuando quieras, no hay prisa ni misiones obligatorias jaja.</p></section>
    <dialog class="story-dialog" aria-labelledby="storyDialogTitle"><div class="story-dialog-top"><h2 id="storyDialogTitle"></h2><button class="story-dialog-close" type="button" aria-label="Cerrar ventana">✕</button></div><div class="story-dialog-body"></div></dialog>`;
  host.replaceChildren(root);
  const uniqueTitleId = `storyDialogTitle-${id}`;
  root.querySelector('.story-dialog').setAttribute('aria-labelledby', uniqueTitleId);
  root.querySelector('.story-dialog-top h2').id = uniqueTitleId;
  const $=s=>root.querySelector(s);
  $('.story-headline strong').textContent=label;
  $('.story-headline span').textContent=subtitle;
  const stage=make('div','story-stage');
  const landscape=make('img','story-landscape');landscape.src=backdrop;landscape.alt='';landscape.draggable=false;
  stage.append(landscape);
  const callbacks=new Map();
  markers.forEach(m=>{
    const btn=make('button','story-hotspot');btn.type='button';btn.dataset.id=m.id;
    btn.style.left=`${m.x}%`;btn.style.top=`${m.y}%`;
    btn.setAttribute('aria-label',`Abrir ${m.label}`);
    btn.append(make('span','story-hotspot-symbol',m.icon),make('span','story-hotspot-label',m.stageLabel || m.label));
    btn.addEventListener('click',()=>callbacks.get(m.id)?.());stage.append(btn);
    const tab=make('button','story-tab',`${m.icon} ${m.tab || m.label}`);tab.type='button';tab.dataset.focus=m.id;
    $('.story-tabs').append(tab);
  });
  $('.story-space').append(stage);
  const explorer=createExplorer({viewport:$('.story-viewport'),space:$('.story-space'),stage,width:1800,height:1000,initial,focusPoints,fitHeightOnReset});
  root.querySelectorAll('[data-focus]').forEach(b=>b.addEventListener('click',()=>{
    explorer.focus(b.dataset.focus);
    root.querySelectorAll('[data-focus]').forEach(other=>other.classList.toggle('is-active',other===b));
  }));
  $('[data-zoom="in"]').addEventListener('click',()=>explorer.zoom(1.15));
  $('[data-zoom="out"]').addEventListener('click',()=>explorer.zoom(1/1.15));
  $('[data-zoom="reset"]').addEventListener('click',()=>explorer.reset());
  const dialog=$('.story-dialog'), dialogBody=$('.story-dialog-body');
  const media=new Set();
  let timers=new Set();
  const stopMedia=()=>{
    for(const el of media){try{el.pause();el.removeAttribute('src');el.load();}catch{}}
    dialogBody.querySelectorAll('iframe').forEach(frame=>frame.remove());
    media.clear();
  };
  function closeDialog(){if(dialog.open)dialog.close();stopMedia();}
  $('.story-dialog-close').addEventListener('click',closeDialog);
  dialog.addEventListener('close',()=>{if(!dialog.open)stopMedia();});
  const notice=$('.story-notice');
  $('.story-notice-close').addEventListener('click',()=>notice.hidden=true);
  function announce(title,body,icon='✦') {
    $('.story-notice-icon').textContent=icon;
    $('.story-notice-title').textContent=title;
    $('.story-notice-text').textContent=body;
    notice.hidden=false;
  }
  function openDialog(title,render){
    closeDialog();
    root.querySelector('.story-dialog-top h2').textContent=title;
    dialogBody.replaceChildren();
    render(dialogBody);
    dialog.showModal();
  }
  function refresh(){
    const count=discoveryIds.filter(id=>hasDiscovered(id)).length;
    $('.story-progress-count').textContent=`${count} / ${discoveryIds.length}`;
    $('.story-progress-line span').style.width=`${100*count/discoveryIds.length}%`;
    stage.querySelectorAll('.story-hotspot').forEach(btn=>btn.classList.toggle('is-discovered',hasDiscovered(btn.dataset.id)));
  }
  function mark(id){if(!hasDiscovered(id))discover(id);refresh();}
  const installedAddons=installSceneAddons({stage,entries:[...addons,...getCharacterAddons(id)],onMessage:announce});
  function renderMedia(container,{type='video',src,poster='',title=''}){
    if(!src) {container.append(make('p','story-note','Todavía no puse nada aquí, pero ya habrá cositas jaja.'));return;}
    if(type==='image'){
      const img=make('img','story-dialog-image');img.src=src;img.alt=title||'Ilustración';img.loading='lazy';container.append(img);return;
    }
    if(!['video','audio'].includes(type))return;
    const element=make(type,`story-${type}`);
    element.controls=true;element.preload='metadata';element.playsInline=true;
    element.setAttribute('aria-label',title||'Contenido multimedia');
    if(type==='video' && poster)element.poster=poster;
    const message=make('p','story-media-status','Dale play cuando quieras.');
    element.addEventListener('error',()=>message.textContent='Ups, este archivo no cargó. Habrá que revisarlo.');
    element.src=src;media.add(element);
    container.append(element,message);
  }
  const schedule=(callback,delay)=>{
    const t=setTimeout(()=>{timers.delete(t);callback();},delay);timers.add(t);return t;
  };
  return {
    root, stage, make, openDialog, announce, mark, renderMedia, schedule,
    on:(name,callback)=>callbacks.set(name,callback),
    closeDialog,
    show(){
      host.hidden=false;refresh();notice.hidden=true;
      const focusTabs=()=>root.querySelectorAll('[data-focus]').forEach(b=>b.classList.toggle('is-active',b.dataset.focus===initial));
      if(fitHeightOnReset){explorer.reset();focusTabs();}
      else requestAnimationFrame(()=>{explorer.reset();focusTabs();});
    },
    hide(){closeDialog();installedAddons.close();notice.hidden=true;for(const t of timers)clearTimeout(t);timers.clear();}
  };
}
