import { anchorsFor } from '../data/memory-anchors.js?v=2.9.10';
import { getMemory } from '../data/memories.js?v=2.9.14';
import { addMemoryHotspots } from '../world/memory-viewer.js?v=2.9.12';
import { createExplorer } from '../world/explorer.js?v=2.5.1';
import { installSceneAddons } from '../world/scene-addons.js?v=1.6';
import { getCharacterLayerEntries } from '../data/characters.js?v=2.3';
import { LIBRARY_SCENE } from '../data/library-scene.js?v=2.9.10';
import { mountSceneLayers } from '../world/scene-layers.js?v=2.3.3';
import { LIBRARY_ADDONS } from './library-addons.js?v=1.8';
import { LIBRARY_ARTWORKS, LIBRARY_PHOTOS, LIBRARY_ALBUMS } from '../data/library-content.js?v=2.9.14';

/**
 * Yukoteca 2.3: piloto por capas, dibujos, fotos y álbumes. Solo contenido visual y álbumes.
 * Los descubrimientos anteriores siguen conservados en localStorage.
 * El contenido procede exclusivamente del archivo data/library-content.js.
 */
export function createLibraryScene({ host, hasDiscovered, discover, memories }) {
  const discoveryIds = ['fotos','albumes'];
  const root = document.createElement('div');
  root.className = 'library-explorer';
  root.innerHTML = `
    <div class="library-toolbar">
      <div class="library-toolbar-heading"><small>✦ UN MONTÓN DE FOTITOS ✦</small><strong>Yukoteca · Cositas que guardé de nosotros</strong><span>Mira las fotitos, las skins match y los álbumes. Hay un montónnn.</span></div>
      <div class="library-tabs" aria-label="Accesos rápidos de Yukoteca"></div>
    </div>
    <div class="library-message" role="status" aria-live="polite" hidden><span class="library-message-icon" aria-hidden="true">✨</span><div><strong class="library-message-title"></strong><p class="library-message-body"></p></div><button type="button" class="library-message-close" aria-label="Cerrar mensaje">✕</button></div>
    <div class="library-shell">
      <div class="library-viewport" tabindex="0" aria-label="Biblioteca explorable: arrastra o desliza para visitar sus dos salas"><div class="library-world-space"></div></div>
      <div class="library-zoom" aria-label="Controles de Yukoteca"><button type="button" data-zoom="in" aria-label="Acercar">+</button><button type="button" data-zoom="out" aria-label="Alejar">−</button><button type="button" data-zoom="reset" aria-label="Volver a Fotos">⌖</button></div>
      <div class="library-pan-hint">↔ Desliza para curiosear</div>
    </div>
    <div class="library-progress"><div><small>YUKOARCHIVO</small><h2>Lo que ya viste por aquí</h2></div><span class="library-count">0/2</span><p>Abre una foto y una página de álbum. Luego puedes volver cuando quieras.</p><div class="library-track"><div class="library-track-fill"></div></div><p class="library-progress-note">A ver qué foto encuentras primero jaja.</p><div class="library-stamp" hidden>✦ Ya viste las dos salas. Que goood, Yuko.</div></div>
    <dialog class="library-dialog" aria-labelledby="libraryDialogTitle"><div class="library-dialog-top"><h2 id="libraryDialogTitle"></h2><button type="button" class="library-dialog-close" aria-label="Cerrar visor">✕</button></div><div class="library-dialog-body"></div></dialog>
  `;
  host.replaceChildren(root);
  const $ = selector => root.querySelector(selector);
  const stage = document.createElement('div');
  stage.className = 'library-stage';
  // Fondo, decoración y controles proceden del manifiesto: capas independientes.
  const space = $('.library-world-space');
  space.append(stage);
  const explorer = createExplorer({
    viewport:$('.library-viewport'), space, stage,
    width:LIBRARY_SCENE.size.width,height:LIBRARY_SCENE.size.height,
    initial:LIBRARY_SCENE.start,focusPoints:LIBRARY_SCENE.focusPoints,
    fitHeightOnReset:true
  });
  if(memories)addMemoryHotspots({stage,region:'yukoteca',viewer:memories,anchors:anchorsFor('yukoteca')});
  // La navegación fija permanece accesible; los hotspots escalan con el fondo.
  for(const item of LIBRARY_SCENE.navigation){
    if(item.enabled===false)continue;
    const button=document.createElement('button');button.type='button';
    button.dataset.focus=item.id;
    button.textContent=`${item.icon||'✦'} ${item.label}`;
    $('.library-tabs').append(button);
  }
  let sceneLayers;
  function onSceneAction(action, entry){
    switch(action.type){
      case 'gallery': openGallery(action.target);break;
      case 'albums': openAlbums();break;
      case 'album': {
        const album=LIBRARY_ALBUMS.find(a=>a.id===action.albumId);
        if(album)openAlbumPage(album,0);
        break;
      }
      case 'memory':case 'image':case 'clip':case 'audio':
        if(memories && action.memoryId) memories.open(action.memoryId);
        break;
      case 'collection':
        if(!memories)break;
        openPopup(action.title||'Recuerdos',container=>{
          if(action.region && action.object){memories.at(container,action.region,action.object,{categoryFilter:true});}
          else if(Array.isArray(action.memoryIds)){
            const entries=action.memoryIds.map(getMemory).filter(Boolean);
            memories.collection(container,entries,{categoryFilter:true});
          }
        });
        break;
      case 'dialogue':{
        const lines=Array.isArray(action.lines)?action.lines:[];
        if(!lines.length)break;
        openPopup(entry.label||'Conversación',container=>{
          for(const line of lines){
            const p=document.createElement('p');p.className='library-dialog-description';
            p.textContent=typeof line==='string'?line:`${line.speaker||entry.label||''}: ${line.text||''}`;
            container.append(p);
          }
        });
        break;
      }
      case 'message':
        announce(action.title||entry.label||'Yukoteca',action.text||'',entry.icon||'✦');
        break;
      default:break;
    }
  }
  sceneLayers=mountSceneLayers({
    stage,scene:LIBRARY_SCENE,characters:getCharacterLayerEntries('yukoteca'),onAction:onSceneAction
  });
  const popup = $('.library-dialog');
  const popupTitle = $('.library-dialog-top h2');
  const body = $('.library-dialog-body');
  const message = $('.library-message');

  function el(tag, cls='', text='') {
    const node = document.createElement(tag);
    if(cls) node.className = cls;
    if(text) node.textContent = text;
    return node;
  }
  function announce(title, text, icon='📚') {
    $('.library-message-title').textContent=title;
    $('.library-message-body').textContent=text;
    $('.library-message-icon').textContent=icon;
    $('.library-progress-note').textContent=`${title}: ${text}`;
    message.hidden=false;
  }
  $('.library-message-close').addEventListener('click',()=>{message.hidden=true;});
  const addons = installSceneAddons({
    stage, entries:LIBRARY_ADDONS,
    onMessage:announce
  });
  function refresh() {
    const count=discoveryIds.filter(id=>hasDiscovered(id)).length;
    $('.library-count').textContent=`${count}/2`;
    $('.library-track-fill').style.width=`${count/2*100}%`;
    $('.library-stamp').hidden = count!==2;
    for(const id of discoveryIds) stage.querySelector(`[data-open="${id}"]`)?.classList.toggle('is-discovered',hasDiscovered(id));
  }
  function discoverOnce(id){if(!hasDiscovered(id)) discover(id);refresh();}
  function closePopup(){if(popup.open) popup.close();}
  $('.library-dialog-close').addEventListener('click',closePopup);
  function openPopup(title, render){
    closePopup();
    popupTitle.textContent=title;
    body.replaceChildren();
    render(body);
    popup.showModal();
  }
  function pill(text){const e=el('p','library-dialog-description',text);return e;}

  // Dibujos y fotos usan la misma galería; cada colección tiene su contenido y descubrimiento.
  const galleryTypes = {
    taller: {
      entries: LIBRARY_ARTWORKS, title: '🎨 Los dibujitos', icon: '🎨',
      name: 'dibujo', empty: 'Todavía no puse los dibujos aquí.',
      note: 'Toca el dibujo para verlo grandote.',
      label: 'Ilustración'
    },
    fotos: {
      entries: LIBRARY_PHOTOS, title: '📷 Nuestras fotitos', icon: '📷',
      name: 'foto', empty: 'Todavía no hay fotos por aquí.',
      note: 'Toca una fotito para verla grande. Algunas tienen mensajitos jaja.',
      label: 'Fotografía o captura'
    }
  };
  function openGallery(kind = 'taller'){
    const spec=galleryTypes[kind];
    if(!spec)return;
    openPopup(spec.title,container=>{
      container.append(pill(spec.note));
      if(!spec.entries.length){container.append(pill(spec.empty));return;}
      const grid=el('div','library-art-grid');
      spec.entries.forEach((art,index)=>{
        const button=el('button','library-art-card');button.type='button';
        const image=el('img');image.src=art.src;image.alt=art.alt || art.title;image.loading='lazy';
        button.append(image,el('strong','',art.title),el('span','',art.artist || spec.label));
        button.addEventListener('click',()=>showArtwork(kind,index));
        grid.append(button);
      });
      container.append(grid);
    });
    announce(spec.title.replace(/^\S+\s*/,''),spec.note,spec.icon);
  }
  function showArtwork(kind,index){
    const spec=galleryTypes[kind];
    const art=spec?.entries[index];if(!art)return;
    discoverOnce(kind);
    popupTitle.textContent=`${spec.icon} ${art.title}`;
    body.replaceChildren();
    const figure=el('figure','library-full-art');
    const image=el('img');image.src=art.src;image.alt=art.alt || art.title;image.decoding='async';
    const caption=el('figcaption','',art.caption || '');
    figure.append(image,caption);
    const nav=el('div','library-page-actions');
    const back=el('button','library-secondary-button',`← Volver a ${kind==='fotos'?'las fotos':'los dibujos'}`);
    back.type='button';back.addEventListener('click',()=>openGallery(kind));
    const prev=el('button','library-secondary-button','◀ Anterior');prev.type='button';prev.disabled=index===0;prev.addEventListener('click',()=>showArtwork(kind,index-1));
    const next=el('button','library-secondary-button','Siguiente ▶');next.type='button';next.disabled=index===spec.entries.length-1;next.addEventListener('click',()=>showArtwork(kind,index+1));
    nav.append(back,prev,next);
    body.append(figure,nav);
    if(memories && art.memoryId){
      const related=el('button','library-secondary-button',kind==='fotos'?'✦ Leer el mensajito':'✦ Leer el mensajito');
      related.type='button';related.addEventListener('click',()=>{closePopup();memories.open(art.memoryId);});body.append(related);
    }
  }

  function openAlbums(){
    openPopup('📖 Nuestros álbumes',container=>{
      container.append(pill('Hice unos álbumes con varias fotos nuestras. Elige uno y ve pasando las páginas jaja.'));
      if(!LIBRARY_ALBUMS.length){container.append(pill('Aquí todavía no hay álbumes.'));return;}
      const grid=el('div','library-album-grid');
      LIBRARY_ALBUMS.forEach(album=>{
        const card=el('button','library-album-card');card.type='button';
        card.append(el('span','library-album-icon',album.icon || '📖'),el('strong','',album.title),el('span','',album.description),el('small','',`${album.pages.length} páginas`));
        card.addEventListener('click',()=>openAlbumPage(album,0));
        grid.append(card);
      });
      container.append(grid);
    });
    announce('Nuestros álbumes','Abre el que quieras, hay fotitos nuestras por todos lados JAJA.','📖');
  }
  function openAlbumPage(album,index){
    const page=album.pages[index];if(!page)return;
    discoverOnce('albumes');
    popupTitle.textContent=`${album.icon || '📖'} ${album.title}`;
    body.replaceChildren();
    const header=el('div','library-page-info');
    header.append(el('strong','',page.title || `Página ${index+1}`),el('span','',`${index+1} / ${album.pages.length}`));
    body.append(header);
    const referenced = page.memoryId ? getMemory(page.memoryId) : null;
    if(referenced && memories){const see=el('button','library-secondary-button','✦ Ver esta fotito aparte');see.type='button';see.addEventListener('click',()=>{closePopup();memories.open(referenced.id);});body.append(see);}
    if(page.type==='image' && (referenced?.src || page.src)){
      const figure=el('figure','library-album-page');
      const img=el('img');img.src=referenced?.src || page.src;img.alt=page.alt || page.title || 'Página ilustrada';img.loading='eager';
      figure.append(img);
      const caption = page.caption || (referenced && !referenced.demo ? referenced.description : '');
      if(caption) figure.append(el('figcaption','',caption));
      body.append(figure);
    } else {
      body.append(el('div','library-album-text',page.text || 'Página por completar.'));
    }
    const actions=el('div','library-page-actions');
    const back=el('button','library-secondary-button','← Álbumes');back.type='button';back.addEventListener('click',openAlbums);
    const prev=el('button','library-secondary-button','◀ Página anterior');prev.type='button';prev.disabled=index===0;prev.addEventListener('click',()=>openAlbumPage(album,index-1));
    const next=el('button','library-secondary-button','Siguiente página ▶');next.type='button';next.disabled=index===album.pages.length-1;next.addEventListener('click',()=>openAlbumPage(album,index+1));
    actions.append(back,prev,next);body.append(actions);
  }

  // Los botones del escenario reciben UN solo manejador desde mountSceneLayers.
  root.querySelectorAll('[data-focus]').forEach(b=>b.addEventListener('click',()=>{
    explorer.focus(b.dataset.focus);
    root.querySelectorAll('[data-focus]').forEach(other=>other.classList.toggle('is-active',other===b));
  }));
  $('[data-zoom="in"]').addEventListener('click',()=>explorer.zoom(1.15));
  $('[data-zoom="out"]').addEventListener('click',()=>explorer.zoom(1/1.15));
  $('[data-zoom="reset"]').addEventListener('click',()=>explorer.reset());

  return {
    show(){
      host.hidden=false;
      refresh();
      message.hidden=true;
      root.querySelectorAll('[data-focus]').forEach(b=>b.classList.toggle('is-active',b.dataset.focus==='fotos'));
      // La primera escala se fija antes del repintado; evita el salto 1x → ajuste al entrar.
      explorer.reset();
    },
    hide(){
      closePopup();
      addons.close();
      message.hidden=true;
    }
  };
}
