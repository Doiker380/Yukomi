import { getMemory, memoriesAt } from '../data/memories.js?v=2.9.17';
import { assetUrl } from '../data/asset-manifest.js?v=2.3.5';
import { attachPaintedGlow } from './painted-glow.js?v=2.9.7';

/** Un único visor de recuerdos para todas las regiones. NO clona archivos. */
export function createMemoryViewer({ isFound=()=>false, onFound=()=>{} }={}) {
  const dialog=document.createElement('dialog');
  dialog.className='memory-dialog';
  dialog.setAttribute('aria-label','Visor de recuerdos de Yukoverso');
  dialog.innerHTML=`<div class="memory-top"><div><small>✦ COSITAS QUE GUARDÉ</small><h2 class="memory-title"></h2></div><button type="button" class="memory-close" aria-label="Cerrar recuerdo">✕</button></div><div class="memory-body"></div>`;
  document.body.append(dialog);
  const body=dialog.querySelector('.memory-body');
  const closeButton=dialog.querySelector('.memory-close');
  function stop(){
    for(const media of body.querySelectorAll('audio,video')){
      try { media.pause();media.removeAttribute('src');media.load(); } catch {}
    }
    body.replaceChildren();
  }
  function close(){if(dialog.open)dialog.close();stop();}
  closeButton.addEventListener('click',close);
  dialog.addEventListener('close',()=>{if(!dialog.open)stop();});
  function txt(tag,cls,value){const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=value||'';return e;}
  function open(id){
    const memory=getMemory(id);
    if(!memory)return false;
    close();
    dialog.querySelector('.memory-title').textContent=memory.title;
    const info=txt('p','memory-description',memory.description);
    body.append(txt('p','memory-meta',`${memory.category || 'Recuerdo'}${memory.demo?' · De prueba':''}`));
    if(memory.type==='image'){
      const image=document.createElement('img');image.className='memory-image';image.src=memory.src;image.alt=memory.title;image.decoding='async';body.append(image);
    } else if(memory.type==='video' || memory.type==='audio'){
      const media=document.createElement(memory.type);media.className='memory-player';
      media.controls=true;media.preload='none';media.autoplay=false;
      if(memory.type==='video'){media.playsInline=true;if(memory.thumbnail)media.poster=memory.thumbnail;}
      const status=txt('p','memory-status','Dale play cuando quieras jaja.');
      media.addEventListener('error',()=>status.textContent='Ups, este archivo no cargó. Habrá que revisarlo.');
      media.src=memory.src;body.append(media,status);
    } else {
      body.append(txt('div','memory-text','✦ '+memory.description));
    }
    if(memory.type!=='text' && memory.description)body.append(info);
    if(memory.tags?.length)body.append(txt('p','memory-tags',memory.tags.map(t=>'#'+t).join('  ')));
    if(!isFound(memory.id)){onFound(memory.id);}
    dialog.showModal();
    return true;
  }
  function card(memory, onOpen = () => open(memory.id)){
    const b=txt('button','memory-card');b.type='button';b.dataset.memoryId=memory.id;
    if(memory.thumbnail){const img=document.createElement('img');img.src=memory.thumbnail;img.alt='';img.loading='lazy';img.decoding='async';b.append(img);}
    else b.append(txt('span','memory-symbol',memory.type==='audio'?'🎵':memory.type==='video'?'🎞️':memory.type==='image'?'🖼️':'📜'));
    const group=txt('span','memory-card-text');
    group.append(txt('strong','',memory.title),txt('small','',`${memory.category||'Recuerdo'}${memory.demo?' · Ejemplo':''}`));
    b.append(group);
    b.addEventListener('click',()=>onOpen(memory));
    return b;
  }
  function collection(container, entries,{title='',categoryFilter=false,pageSize=12,onOpen=null}={}){
    const root=txt('section','memory-collection');
    if(title)root.append(txt('h3','',title));
    let current='Todas', visible=pageSize;
    const available=Array.from(new Set(entries.map(m=>m.category||'Otros'))).sort();
    let select;
    if(categoryFilter && available.length>1){
      select=txt('select','memory-filter');select.setAttribute('aria-label','Filtrar recuerdos por categoría');
      for(const name of ['Todas',...available]){const o=document.createElement('option');o.value=name;o.textContent=name;select.append(o);}
      root.append(select);
    }
    const list=txt('div','memory-grid');const more=txt('button','memory-more','Ver más cositas');more.type='button';
    const count=txt('p','memory-summary');
    function paint(){
      const filtered=entries.filter(m=>current==='Todas'||m.category===current);
      list.replaceChildren();
      for(const memory of filtered.slice(0,visible))list.append(card(memory,onOpen?m=>onOpen(m):()=>open(memory.id)));
      count.textContent=`${filtered.length} recuerdo${filtered.length===1?'':'s'} por aquí`;
      more.hidden=visible>=filtered.length;
      if(!filtered.length)list.append(txt('p','memory-empty','Aquí todavía no puse recuerdos.'));
    }
    if(select)select.addEventListener('change',()=>{current=select.value;visible=pageSize;paint();});
    more.addEventListener('click',()=>{visible+=pageSize;paint();});
    root.append(count,list,more);container.append(root);paint();
    return {refresh:paint};
  }
  function at(container,region,object,options={}){return collection(container,memoriesAt(region,object),options);}
  return {open,close,card,collection,at,get dialog(){return dialog;}};
}

/** Ancla un recuerdo al decorado; el archivo está sólo en memories.js. */
export function addMemoryHotspots({stage,region,anchors,viewer,onVisited=()=>{}}){
  const buttons=[];
  for(const anchor of anchors){
    const entries=memoriesAt(region,anchor.id);
    if(!entries.length)continue;
    const button=document.createElement('button');button.type='button';button.className='memory-hotspot';
    button.style.left=`${anchor.x}%`;button.style.top=`${anchor.y}%`;
    button.dataset.memoryAnchor=`${region}:${anchor.id}`;
    button.setAttribute('aria-label',`Explorar ${anchor.label}`);
    button.innerHTML='<span class="memory-hotspot-icon" aria-hidden="true"></span><span class="memory-hotspot-label"></span>';
    button.querySelector('.memory-hotspot-icon').textContent=anchor.icon||'✦';
    button.querySelector('.memory-hotspot-label').textContent=anchor.label;
    // Visual opcional: el contenido y la acción permanecen idénticos.
    // La imagen sólo reemplaza al icono cuando termina de cargar correctamente.
    // En caso de error (incluido 404 en GitHub Pages), se conserva el botón anterior.
    if(anchor.painted){
      button.classList.add('scene-painted-hotspot');
      button.style.setProperty('--hotspot-width',`${anchor.width || 100}px`);
      button.style.setProperty('--hotspot-height',`${anchor.height || 100}px`);
      // Solo los objetos que definen una silueta usan el resplandor adaptado.
      // Los hotspots de otras regiones mantienen sus estilos anteriores.
      if(anchor.glow) attachPaintedGlow(button, anchor.glow);
    }
    const visualPath=!anchor.painted && anchor.assetId ? assetUrl(anchor.assetId) : null;
    if(visualPath){
      if(Number.isFinite(anchor.width) && anchor.width>0)
        button.style.setProperty('--memory-object-width',`${anchor.width}px`);
      if(Number.isFinite(anchor.height) && anchor.height>0)
        button.style.setProperty('--memory-object-height',`${anchor.height}px`);
      const image=document.createElement('img');
      image.className='memory-hotspot-artwork';
      image.alt=''; image.draggable=false; image.decoding='async';
      image.addEventListener('load',()=>{
        if(image.naturalWidth>0){
          button.append(image);
          button.classList.add('memory-hotspot--illustrated');
        }
      },{once:true});
      image.src=visualPath;
    }
    button.addEventListener('click',()=>{
      onVisited(anchor.id);
      if(entries.length===1){viewer.open(entries[0].id);return;}
      const panel=document.createElement('dialog');panel.className='memory-dialog memory-list-dialog';
      panel.setAttribute('aria-label',anchor.label);
      panel.innerHTML='<div class="memory-top"><h2></h2><button type="button" class="memory-close" aria-label="Cerrar selección">✕</button></div><div class="memory-body"></div>';
      panel.querySelector('h2').textContent=anchor.label;
      document.body.append(panel);
      const close=()=>{if(panel.open)panel.close();panel.remove();};
      panel.querySelector('.memory-close').addEventListener('click',close);
      panel.addEventListener('close',()=>panel.remove(),{once:true});
      viewer.collection(panel.querySelector('.memory-body'),entries,{onOpen:m=>{close();viewer.open(m.id);}});
      panel.showModal();
    });
    stage.append(button);buttons.push(button);
  }
  return {buttons};
}
