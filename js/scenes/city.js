import { assetUrl } from '../data/asset-manifest.js?v=2.5.0';
import { CITY_SCENE } from '../data/city-scene.js?v=2.5.0';
import { anchorsFor } from '../data/memory-anchors.js?v=2.9.10';
import { createExplorer } from '../world/explorer.js?v=2.4.0';
import { installSceneAddons } from '../world/scene-addons.js?v=2.4.0';
import { CITY_ADDONS } from './city-addons.js?v=1.7';
import { getCharacterAddons } from '../data/characters.js?v=2.4.0';
import { CITY_MONTHS, CITY_MAIL, CITY_DIALOGUE, CITY_MUSICALS, CITY_UI, cityText } from '../data/city-content.js?v=2.9.16';
import { addMemoryHotspots } from '../world/memory-viewer.js?v=2.9.14';

/**
 * Fase 1.7 — Capital panorámica. Ninguna referencia a la lógica de Yukofauna.
 * Los IDs de descubrimiento son estables: plaza, calendario, correo.
 */
export function createCityScene({host, objects, hasDiscovered, discover, memories}) {
  const ids = ['plaza','calendario','correo','partidas'];
  const byId = new Map(objects.map(obj=>[obj.id,obj]));
  const scene = document.createElement('div');
  scene.className = 'city-scene city-illustrated';
  scene.innerHTML = `
    <img class="city-landscape" src="${assetUrl(CITY_SCENE.backgroundId)}" alt="" draggable="false" decoding="async" />
    <div class="city-floating-banners" aria-hidden="true" data-city-text="banners"></div>
    <div class="city-walker city-walker-left" aria-hidden="true" data-city-text="walkerLeft"></div>
    <div class="city-walker city-walker-right" aria-hidden="true" data-city-text="walkerRight"></div>
    <button class="city-hotspot city-plaza" data-action="plaza" type="button" aria-label="Hablar con una habitante de la plaza"><span class="city-hotspot-symbol" data-city-text="residentIcon"></span><span data-city-text="residentLabel"></span></button>
    <button class="city-hotspot city-calendar" data-action="calendario" type="button" aria-label="Entrar al Ayuntamiento y abrir Yukocalendario"><span class="city-hotspot-symbol" data-city-text="calendarIcon"></span><span data-city-text="calendarLabel"></span></button>
    <button class="city-hotspot city-mail" data-action="correo" type="button" aria-label="Entrar a la oficina Yukocorreo"><span class="city-hotspot-symbol" data-city-text="mailIcon"></span><span data-city-text="mailLabel"></span></button>
    <button class="city-hotspot city-theater" data-action="teatro" type="button" aria-label="Abrir el telón del teatro"><span class="city-hotspot-symbol" data-city-text="theaterIcon"></span><span data-city-text="theaterLabel"></span></button>
    <div class="city-scene-sign" aria-hidden="true" data-city-text="sceneSign"></div>
    <div class="city-confetti" hidden aria-hidden="true" data-city-text="confetti"></div>
  `;

  const background=scene.querySelector('.city-landscape');
  background.addEventListener('error',()=>{
    if(background.dataset.fallback)return;
    background.dataset.fallback='true';background.src=assetUrl(CITY_SCENE.fallbackId);
    scene.classList.add('city-art-fallback');
  });
  for(const [id,entry] of Object.entries(CITY_SCENE.objects)) {
    const button=scene.querySelector(`[data-action="${id}"]`);
    button.style.left=`${entry.x}%`;button.style.top=`${entry.y}%`;
    button.style.setProperty('--hotspot-width',`${entry.width}px`);
    button.style.setProperty('--hotspot-height',`${entry.height}px`);
    button.lastElementChild.textContent=entry.label;
    if(entry.painted)button.classList.add('scene-painted-hotspot');
    if(entry.assetId){
      const img=document.createElement('img');img.alt='';img.draggable=false;img.src=assetUrl(entry.assetId);
      img.addEventListener('load',()=>{button.firstElementChild.replaceChildren(img);button.classList.add('city-has-sprite');},{once:true});
    }
  }
  const root = document.createElement('div');
  root.className = 'city-explorer';
  root.innerHTML = `
    <div class="city-toolbar">
      <div><strong data-city-text="toolbarTitle"></strong><small data-city-text="toolbarHint"></small></div>
      <div class="city-tabs" aria-label="Accesos rápidos de la capital">
        <button type="button" data-focus="plaza" data-city-text="tabPlaza"></button>
        <button type="button" data-focus="calendario" data-city-text="tabCalendar"></button>
        <button type="button" data-focus="correo" data-city-text="tabMail"></button>
        <button type="button" data-focus="teatro" data-city-text="tabTheater"></button>
        <button type="button" data-focus="museo" data-city-text="tabMuseum"></button>
        <button type="button" data-focus="computadora" data-city-text="tabComputer"></button>
      </div>
    </div>
    <div class="city-message-dock" hidden role="status" aria-live="polite" aria-atomic="true">
      <span class="city-message-icon" aria-hidden="true" data-city-text="messageIcon"></span>
      <div><strong class="city-message-title"></strong><p class="city-message-text"></p></div>
      <button class="city-message-close" type="button" aria-label="Cerrar mensaje" data-city-text="closeMessage"></button>
    </div>
    <div class="city-shell">
      <div class="city-viewport" tabindex="0" aria-label="Ciudad explorable. Desliza para moverte o usa los botones de las zonas."><div class="city-world-space"></div></div>
      <div class="city-zoom" aria-label="Controles de zoom">
        <button type="button" data-zoom="in" title="Acercar" aria-label="Acercar" data-city-text="zoomIn"></button>
        <button type="button" data-zoom="out" title="Alejar" aria-label="Alejar" data-city-text="zoomOut"></button>
        <button type="button" data-zoom="reset" title="Volver a la plaza" aria-label="Volver a la plaza" data-city-text="reset"></button>
      </div>
      <div class="city-pan-hint" data-city-text="panHint"></div>
    </div>
    <div class="city-diary"><div class="city-diary-top"><div><small data-city-text="diaryEyebrow"></small><h2 data-city-text="diaryTitle"></h2></div><strong class="city-count" data-city-text="initialCount"></strong></div><p data-city-text="diaryHint"></p><div class="city-track"><div class="city-track-fill"></div></div><p class="city-diary-last" data-city-text="diaryInitial"></p><div class="city-citystamp" hidden data-city-text="stamp"></div></div>
    <dialog class="city-popup" aria-label="Actividad de Yukópolis"><div class="city-popup-header"><strong class="city-popup-title"></strong><button type="button" class="city-popup-close" aria-label="Cerrar actividad" data-city-text="closePopup"></button></div><div class="city-popup-body"></div></dialog>
  `;
  host.replaceChildren(root);
  const $ = selector => root.querySelector(selector);
  const sceneHost = $('.city-world-space');
  sceneHost.append(scene);
  root.querySelectorAll('[data-city-text]').forEach(el=>el.textContent=CITY_UI[el.dataset.cityText]);
  for(const [id,entry] of Object.entries(CITY_SCENE.objects))scene.querySelector(`[data-action="${id}"]`).lastElementChild.textContent=entry.label;
  const explorer = createExplorer({
    viewport:$('.city-viewport'), space:sceneHost, stage:scene,
    width:CITY_SCENE.size.width, height:CITY_SCENE.size.height, initial:'plaza',
    fitHeightOnReset:true, focusPoints:CITY_SCENE.focusPoints
  });
  const addons = installSceneAddons({
    stage:scene, entries:[...CITY_ADDONS,...getCharacterAddons('yukopolis')],
    onMessage:(name,message,icon)=>announce(name,message,icon)
  });
  if(memories){
    addMemoryHotspots({stage:scene,region:'yukopolis',viewer:memories,
      anchors:anchorsFor('yukopolis'),
      onVisited:id=>{if(id==='museo')discoverOnce('partidas');}
    });
  }
  const popup = $('.city-popup');
  const popupBody = $('.city-popup-body');
  const closePopup = () => {if(popup.open) popup.close();};
  $('.city-popup-close').addEventListener('click',closePopup);

  const message = $('.city-message-dock');
  const visitButton = scene.querySelector('[data-action="plaza"]');
  let dialogueIndex = 0;
  let curtainTimeout;

  function announce(title,body,icon='🏰') {
    $('.city-message-title').textContent=title;
    $('.city-message-text').textContent=body;
    $('.city-message-icon').textContent=icon;
    $('.city-diary-last').textContent=`${title}: ${body}`;
    message.hidden=false;
  }
  $('.city-message-close').addEventListener('click',()=>{message.hidden=true;});

  function refresh() {
    const count=ids.filter(hasDiscovered).length;
    $('.city-count').textContent=`${count}/4`;
    $('.city-track-fill').style.width=`${count/4*100}%`;
    $('.city-citystamp').hidden=count!==4;
    for(const id of ids) scene.querySelector(`[data-action="${id}"]`)?.classList.toggle('is-discovered',hasDiscovered(id));
    visitButton.classList.toggle('is-discovered',hasDiscovered('plaza'));
  }
  function discoverOnce(id){if(!hasDiscovered(id)) discover(id);refresh();}
  function openPopup(title,render) {
    closePopup();
    $('.city-popup-title').textContent=title;
    popupBody.replaceChildren();
    render(popupBody);
    popup.showModal();
  }
  function el(tag,className='',text='') {
    const element=document.createElement(tag);
    if(className) element.className=className;
    if(text) element.textContent=text;
    return element;
  }

  function openCalendar() {
    openPopup(CITY_UI.calendarTitle, body=>{
      body.append(el('p','city-popup-desc',CITY_UI.calendarDescription));
      const list=el('div','city-months');
      const info=el('div','city-month-details');
      const current=el('strong');
      const description=el('p');
      info.append(current,description);
      const buttons=[];
      function selectMonth(index){
        const month=CITY_MONTHS[index];
        buttons.forEach((b,i)=>b.classList.toggle('is-current',index===i));
        current.textContent=month.name;
        description.textContent=month.detail;
        const previous=info.querySelector('.city-festival');
        previous?.remove();
        if(index===10) {
          const birthday=el('button','city-festival',CITY_UI.birthdayButton);
          birthday.type='button';
          birthday.addEventListener('click',()=>{
            discoverOnce('calendario');
            announce(CITY_UI.birthdayTitle, CITY_UI.birthdayText, '🎂');
            birthday.textContent=CITY_UI.birthdayDone;
          });
          info.append(birthday);
        }
        discoverOnce('calendario');
      }
      CITY_MONTHS.forEach((month,index)=>{
        const button=el('button','city-month',month.name);
        button.type='button';
        button.addEventListener('click',()=>selectMonth(index));
        list.append(button);
        buttons.push(button);
      });
      body.append(list,info);
      // Se muestra Yukoviembre desde el inicio, pero el descubrimiento
      // se registra solo si Yuko elige tocar un mes o la festividad.
      current.textContent=CITY_MONTHS[10].name;
      description.textContent=CITY_MONTHS[10].detail;
      buttons[10].classList.add('is-current');
      const birthday=el('button','city-festival',CITY_UI.birthdayButton);
      birthday.type='button';
      birthday.addEventListener('click',()=>{
        discoverOnce('calendario');
        announce(CITY_UI.birthdayTitle, CITY_UI.birthdayText, '🎂');
        birthday.textContent=CITY_UI.birthdayDone;
      });
      info.append(birthday);
    });
    announce(CITY_UI.calendarAnnouncement,CITY_UI.calendarHint,'📅');
  }

  function openMail() {
    openPopup(CITY_UI.mailTitle,body=>{
      body.append(el('p','city-popup-desc',CITY_UI.mailDescription));
      const card=el('div','city-letters');
      const reading=el('article','city-letter-reading');
      reading.append(el('p','', CITY_UI.selectEnvelope));
      CITY_MAIL.forEach(letter=>{
        const button=el('button','city-envelope',`${letter.icon} ${letter.subject}`);
        button.type='button';
        button.setAttribute('aria-label',cityText('openLetter',letter));
        button.addEventListener('click',()=>{
          reading.replaceChildren();
          reading.append(el('small','',cityText('mailSender',letter)),el('h3','',letter.subject),el('p','',letter.message));
          button.classList.add('is-opened');
          discoverOnce('correo');
          announce(CITY_UI.mailOpenedTitle,cityText('mailOpened',letter),letter.icon);
        });
        card.append(button);
      });
      body.append(card,reading);
    });
    announce(CITY_UI.mailAnnouncement,CITY_UI.mailHint,'💌');
  }
  function visitPlaza(){
    const text=CITY_DIALOGUE.greeter[dialogueIndex++%CITY_DIALOGUE.greeter.length];
    discoverOnce('plaza');
    visitButton.classList.remove('city-speaking');
    void visitButton.offsetWidth;
    visitButton.classList.add('city-speaking');
    announce(CITY_UI.residentTitle,text,'👩‍💼');
  }
  function theaterTeaser(){
    const button=scene.querySelector('[data-action="teatro"]');
    button.classList.add('city-curtains-open');
    openPopup(CITY_UI.theaterTitle,body=>{
      body.append(el('p','city-popup-desc',CITY_UI.theaterText));
      const list=el('div','city-musicals');
      CITY_MUSICALS.forEach(musical=>{
        const link=el('a','city-musical');
        link.href=musical.url;
        link.target='_blank';
        link.rel='noopener noreferrer';
        link.append(el('strong','',musical.title),el('span','',`${musical.kind} · Abrir en YouTube ↗`));
        list.append(link);
      });
      body.append(list);
    });
    announce(CITY_UI.theaterTitle,CITY_UI.theaterText,'🎭');
    clearTimeout(curtainTimeout);
    curtainTimeout=setTimeout(()=>button.classList.remove('city-curtains-open'),1700);
  }
  scene.querySelector('[data-action="plaza"]').addEventListener('click',visitPlaza);
  scene.querySelector('[data-action="calendario"]').addEventListener('click',openCalendar);
  scene.querySelector('[data-action="correo"]').addEventListener('click',openMail);
  scene.querySelector('[data-action="teatro"]').addEventListener('click',theaterTeaser);

  root.querySelectorAll('[data-focus]').forEach(b=>b.addEventListener('click',()=>{
    explorer.focus(b.dataset.focus);
    root.querySelectorAll('[data-focus]').forEach(other=>other.classList.toggle('is-active',other===b));
  }));
  root.querySelector('[data-zoom="in"]').addEventListener('click',()=>explorer.zoom(1.15));
  root.querySelector('[data-zoom="out"]').addEventListener('click',()=>explorer.zoom(1/1.15));
  root.querySelector('[data-zoom="reset"]').addEventListener('click',()=>explorer.reset());

  return {
    show(){
      host.hidden=false;
      refresh();
      message.hidden=true;
      root.querySelectorAll('[data-focus]').forEach(b=>b.classList.toggle('is-active',b.dataset.focus==='plaza'));
      requestAnimationFrame(()=>explorer.reset());
    },
    hide(){
      closePopup();
      addons.close();
      clearTimeout(curtainTimeout);
      message.hidden=true;
    }
  };
}
