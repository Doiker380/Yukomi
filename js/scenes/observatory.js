import { assetUrl } from '../data/asset-manifest.js?v=2.7';
import { anchorsFor } from '../data/memory-anchors.js?v=2.9.10';
import { addMemoryHotspots } from '../world/memory-viewer.js?v=2.9.17';
import { createStoryWorld } from './story-world.js?v=2.9.11';
import { OBSERVATORY } from '../data/experience-content.js?v=2.9.11';
import { OBSERVATORY_GLOWS } from '../data/observatory-glows.js?v=2.9.15';
import { mountPaintedSceneGlow } from '../world/painted-glow.js?v=2.9.7';

export function createObservatoryScene({host,hasDiscovered,discover,memories}){
  const world=createStoryWorld({
    host,id:'yukobservatorio',label:'Yukobservatorio',subtitle:'Unas estrellitas y cosas que te quería decir 💜',
    backdrop:assetUrl('background.yukobservatorio.illustrated'), fitHeightOnReset:true,
    markers:[
      {id:'camino',icon:'🌙',label:'Camino estelar',tab:'Sendero',x:15,y:65},
      {id:'telescopio',icon:'🔭',label:'Telescopio',tab:'Telescopio',x:44.8,y:46.5},
      {id:'carta',icon:'💌',label:'Carta de cumpleaños',tab:'Carta',x:74,y:56}
    ],
    discoveryIds:['camino','telescopio','carta'],hasDiscovered,discover,
    focusPoints:{camino:[280,650],telescopio:[780,430],carta:[1332,560]},initial:'telescopio'
  });
  world.root.classList.add('observatory-illustrated');
  // Hitboxes acordes con las piezas iluminadas; no cambian sus acciones.
  const sizes={camino:[240,195],telescopio:[510,470],carta:[170,120]};
  world.stage.querySelectorAll('.story-hotspot').forEach(b=>{
    const [w,h]=sizes[b.dataset.id];b.style.width=w+'px';b.style.height=h+'px';
  });
  // Brillo permanente sobre los contornos PINTADOS del escenario.
  // Capa no interactiva: tocar cada objeto sigue usando su botón existente.
  mountPaintedSceneGlow(world.stage, OBSERVATORY_GLOWS);
  world.stage.querySelector('.story-landscape').addEventListener('error',function(){
    if(this.dataset.fallback)return;this.dataset.fallback='true';this.src=assetUrl('background.yukobservatorio');world.root.classList.add('observatory-fallback');
  });
  const {make,openDialog,mark,renderMedia}=world;
  // La carta extra se publicará en otra página de GitHub Pages.
  // Hasta que el usuario añada una URL HTTPS, no mostramos enlaces vacíos.
  function addExtraLetterLink(container) {
    const href=OBSERVATORY.extraLetterUrl?.trim();
    if (!href) return;
    let target;
    try { target=new URL(href,window.location.href); } catch { return; }
    if (target.protocol!=='https:' && target.protocol!=='http:') return;
    const link=make('a','story-control','💜 Ver mi otra cartita (con fotitos)');
    link.href=target.href;
    link.target='_blank';
    link.rel='noopener noreferrer';
    container.append(link);
  }
  if(memories)addMemoryHotspots({
    stage:world.stage, region:'yukobservatorio', viewer:memories,
    anchors:anchorsFor('yukobservatorio').map(a=>({
      ...a, x:58.5, y:75, painted:true, width:160, height:175,
      // Marco inclinado de la postal dibujada sobre el pedestal, sin recuadro.
      glow:{
        viewBox:'0 0 160 175',
        path:'M 9 157 Q 18 122 34 54 L 42 25 L 70 23 L 92 5 L 104 14 L 126 28 L 152 32 L 143 116 L 131 164 Q 127 170 116 170 L 15 163 Z',
        color:'#ffe6b6'
      }
    }))
  });
  world.on('camino',()=>{
    mark('camino');
    openDialog('🌙 Camino estelar',body=>{
      body.append(make('p','story-note','Te dejé unos mensajitos por este caminito. Léelos cuando quieras 💜.'));
      const list=make('div','story-cards');
      OBSERVATORY.pathNotes.forEach((note,i)=>{
        const card=make('div','story-card');card.append(make('span','story-big-icon',['✦','☁️','⭐'][i%3]),make('p','',note));list.append(card);
      });body.append(list);
    });
  });
  world.on('telescopio',()=>{
    openDialog('🔭 Telescopio de las constelaciones',body=>{
      body.append(make('p','story-note','Toca una constelación, Yuko. Y tranqui, la carta puedes abrirla cuando quieras.'));
      const cards=make('div','story-cards');
      OBSERVATORY.constellations.forEach(c=>{
        const b=make('button','story-card story-action');b.type='button';
        b.append(make('span','story-big-icon',c.icon),make('strong','',c.title),make('span','',c.text));
        b.addEventListener('click',()=>{
          mark('telescopio');
          b.classList.add('story-star-selected');
          world.announce(c.title,c.text,c.icon);
        });cards.append(b);
      });body.append(cards);
    });
  });
  world.on('carta',()=>{
    mark('carta');
    openDialog('💌 '+OBSERVATORY.letter.title,body=>{
      const paper=make('article','story-letter');
      paper.append(make('h3','',OBSERVATORY.letter.greeting));
      OBSERVATORY.letter.paragraphs.forEach(p=>paper.append(make('p','',p)));
      paper.append(make('p','story-letter-signature',OBSERVATORY.letter.closing));
      body.append(paper);
      const standalone=make('a','story-control','↗ Ver esta carta solita');
      standalone.href='carta_yuko.html';standalone.target='_blank';standalone.rel='noopener noreferrer';body.append(standalone);
      addExtraLetterLink(body);
      const p=make('p','story-note','Esta cartita es para ti, Yuko. Espero que te guste 💜.');body.append(p);
      const print=make('button','story-control','Copiar texto de la carta');print.type='button';
      print.addEventListener('click',()=>{
        const text=[OBSERVATORY.letter.greeting,...OBSERVATORY.letter.paragraphs,OBSERVATORY.letter.closing].join('\n\n');
        if(navigator.clipboard?.writeText){navigator.clipboard.writeText(text).then(()=>{print.textContent='✓ Carta copiada';}).catch(()=>{print.textContent='No se pudo copiar';});}
        else print.textContent='La copia requiere conexión segura (HTTPS)';
      });body.append(print);
    });
  });
  return world;
}
