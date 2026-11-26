import { memoriesAt } from '../data/memories.js?v=2.9.14';
import { CINEMA_FEATURES, CINEMA_TICKETS } from '../data/cinema-features.js?v=2.9.14';
import { createStoryWorld } from './story-world.js?v=2.9.12';
import { CINEMA_SCENE } from '../data/cinema-scene.js?v=2.8.0';
import { assetUrl } from '../data/asset-manifest.js?v=2.8.0';

export function createCinemaScene({host,hasDiscovered,discover,memories}){
  const world=createStoryWorld({
    host,id:'yukocine',label:'Yukocine',subtitle:'Clips, risas, gritos y un montón de historias JAJA',
    backdrop:assetUrl(CINEMA_SCENE.backgroundId) || assetUrl(CINEMA_SCENE.fallbackId),
    markers:CINEMA_SCENE.markers,
    discoveryIds:CINEMA_SCENE.discoveryIds,hasDiscovered,discover,
    focusPoints:CINEMA_SCENE.focusPoints,initial:CINEMA_SCENE.initial,
    fitHeightOnReset:CINEMA_SCENE.fitHeightOnReset
  });
  world.root.classList.add('cinema-final-art');
  world.stage.querySelector('.story-landscape').addEventListener('error',function(){
    if(this.dataset.fallback)return;this.dataset.fallback='true';this.src=assetUrl(CINEMA_SCENE.fallbackId);world.root.classList.remove('cinema-final-art');
  });
  const {make,openDialog,mark}=world;
  const youtubeId=url=>{
    try {
      const parsed=new URL(url);
      const host=parsed.hostname.toLowerCase();
      const id=host==='youtu.be' ? parsed.pathname.slice(1) :
        ['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(host) ?
          (parsed.pathname.startsWith('/shorts/')||parsed.pathname.startsWith('/embed/') ? parsed.pathname.split('/')[2] : parsed.searchParams.get('v')) : '';
      return /^[\w-]{11}$/.test(id||'') ? id : null;
    } catch { return null; }
  };
  const features=CINEMA_FEATURES.map(feature=>({...feature,videoId:youtubeId(feature.youtubeUrl)})).filter(feature=>feature.videoId);
  function openFeature(feature){
    mark('cartelera');
    openDialog(`🎬 ${feature.title}`,body=>{
      const frame=document.createElement('iframe');
      frame.className='cinema-youtube-frame';frame.title=feature.title;
      frame.src=`https://www.youtube-nocookie.com/embed/${feature.videoId}?rel=0`;
      frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
      body.append(frame);
      const back=make('button','story-control','← Volver a la cartelera');back.type='button';
      back.addEventListener('click',()=>world.root.querySelector('[data-id="cartelera"]').click());
      body.append(back);
    });
  }
  world.on('cartelera',()=>{
    openDialog('🎬 Funciones especiales',body=>{
      const grid=make('div','story-cards cinema-edit-grid');
      features.forEach(feature=>{
        const card=make('button','story-card story-action cinema-edit-card');card.type='button';
        card.append(make('span','cinema-edit-art','✦ 🎞 ✦'),make('strong','',feature.title),make('small','','Abrir función'));
        card.addEventListener('click',()=>openFeature(feature));grid.append(card);
      });
      if(grid.childElementCount)body.append(grid);
      else body.append(make('p','story-note','Todavía no hay funciones disponibles.'));
    });
  });
  world.on('taquilla',()=>{
    openDialog('🎟️ Taquilla de clips',body=>{
      if(!memories){body.append(make('p','story-note','Los videos no cargaron.'));return;}
      const available=memoriesAt('yukocine','proyector');
      const entries=CINEMA_TICKETS.map(id=>available.find(item=>item.id===id)).filter(Boolean);
      if(!entries.length){body.append(make('p','story-note','Todavía no hay clips disponibles.'));return;}
      memories.collection(body,entries,{pageSize:entries.length,onOpen:item=>{
        mark('taquilla');world.closeDialog();memories.open(item.id);
      }});
    });
  });
  world.on('proyector',()=>{
    openDialog('🎞️ Los videos del Yukocine',body=>{
      body.append(make('p','story-note','Aquí van los clips que guardé. Elige uno y dale play; no se reproduce nada hasta que tú quieras.'));
      const entries=memoriesAt('yukocine','proyector').filter(item=>item.type==='video' && !item.demo);
      if(!memories){body.append(make('p','story-note','Ups, los recuerdos no cargaron bien.'));return;}
      memories.collection(body,entries,{categoryFilter:true,pageSize:12,onOpen:item=>{
        mark('proyector');
        world.closeDialog();
        memories.open(item.id);
      }});
    });
  });

  return world;
}
