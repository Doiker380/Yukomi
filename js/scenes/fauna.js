import { assetUrl } from '../data/asset-manifest.js?v=2.4.0';
import { FAUNA_SCENE } from '../data/fauna-scene.js?v=2.4.0';
import { FAUNA_TEXT, FAUNA_MESSAGES, FAUNA_COPY, faunaCopy } from '../data/fauna-content.js?v=2.9.15';
import { getCharacterAddons } from '../data/characters.js?v=2.4.0';
import { anchorsFor } from '../data/memory-anchors.js?v=2.9.10';
import { addMemoryHotspots } from '../world/memory-viewer.js?v=2.9.14';
import { createExplorer } from "../world/explorer.js?v=2.4.0";
import { installSceneAddons } from "../world/scene-addons.js?v=2.4.0";
import { FAUNA_ADDONS } from "./fauna-addons.js?v=2.4.0";

/**
 * Yukofauna v1.6 — santuario panorámico accesible y ligero.
 * Mantiene los identificadores de descubrimiento históricos (pinguino,
 * buho, gato, flores, estrella), para no alterar el Yukopasaporte.
 * Arte local opcional, con SVG de respaldo. No requiere servicios externos al jugar.
 */

const FISH = FAUNA_SCENE.fish;

const SVGS = {
  penguin: `<svg viewBox="0 0 110 130" aria-hidden="true"><ellipse cx="55" cy="118" rx="35" ry="7" fill="#5c789b" opacity=".25"/><path d="M23 70Q7 64 11 88L34 100Z" fill="#31415f"/><path d="M87 70Q103 64 99 88L76 100Z" fill="#31415f"/><ellipse cx="55" cy="72" rx="34" ry="45" fill="#313e60"/><ellipse cx="55" cy="81" rx="25" ry="35" fill="#fdf7f7"/><circle cx="55" cy="32" r="29" fill="#313e60"/><path d="M32 22Q53 10 78 23L76 35Q55 28 34 36Z" fill="#e2e5fa"/><ellipse cx="44" cy="36" rx="5" ry="6" fill="#fff"/><ellipse cx="67" cy="36" rx="5" ry="6" fill="#fff"/><circle cx="45" cy="37" r="2.5" fill="#1c2540"/><circle cx="68" cy="37" r="2.5" fill="#1c2540"/><path d="M49 47L62 47 55 57Z" fill="#ffb464"/><ellipse cx="41" cy="117" rx="17" ry="7" fill="#f5ad76"/><ellipse cx="70" cy="117" rx="17" ry="7" fill="#f5ad76"/><circle cx="31" cy="52" r="5" fill="#f5b7c8" opacity=".6"/><circle cx="79" cy="52" r="5" fill="#f5b7c8" opacity=".6"/></svg>`,
  owl: `<svg viewBox="0 0 110 126" aria-hidden="true"><path d="M17 110Q54 104 97 113" fill="none" stroke="#66527b" stroke-width="9" stroke-linecap="round"/><path d="M22 26L22 7 46 21Q53 17 63 21L89 7 88 28Q101 48 94 75Q91 105 54 108Q19 107 15 76Q6 48 22 26Z" fill="#af86ad"/><ellipse cx="37" cy="60" rx="19" ry="24" fill="#f3d9d8"/><ellipse cx="72" cy="60" rx="19" ry="24" fill="#f3d9d8"/><circle cx="38" cy="57" r="10" fill="#fff"/><circle cx="73" cy="57" r="10" fill="#fff"/><circle cx="40" cy="57" r="5" fill="#29304e"/><circle cx="71" cy="57" r="5" fill="#29304e"/><path d="M49 70L59 70 54 80Z" fill="#f6ba70"/><path d="M35 104L32 114 M45 105L45 115 M67 105L67 115 M77 103L80 113" stroke="#edb378" stroke-width="4" stroke-linecap="round"/><path d="M11 68Q3 88 26 93M97 68Q105 88 82 93" stroke="#9a75a0" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`,
  cat: `<svg viewBox="0 0 130 110" aria-hidden="true"><ellipse cx="65" cy="94" rx="55" ry="11" fill="#65799a" opacity=".18"/><path d="M19 72Q-1 27 20 28Q36 35 24 56" fill="none" stroke="#ba98c5" stroke-width="15" stroke-linecap="round"/><ellipse cx="74" cy="73" rx="46" ry="29" fill="#ccb0d5"/><path d="M37 37L34 8 59 22Q77 15 94 23L114 9 108 44Q125 75 86 83L57 82Q25 69 37 37Z" fill="#d9bbdf"/><path d="M43 32L42 21 54 29 M95 29L108 21 102 35" fill="#eaa9c2"/><path d="M53 54q8 10 16 0 M86 54q8 10 16 0" fill="none" stroke="#6c5376" stroke-width="4" stroke-linecap="round"/><path d="M70 65l7 4 7-4M77 69v4" stroke="#6c5376" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M52 69L27 66 M53 75L28 78 M97 69L118 65 M98 75L120 79" stroke="#8c7597" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="63" cy="88" rx="14" ry="7" fill="#e8d3eb"/></svg>`,
  flowers: `<svg viewBox="0 0 125 122" aria-hidden="true"><path d="M30 111Q33 76 39 44M63 111Q66 65 62 33M96 111Q87 71 86 52" stroke="#5e9b81" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M31 85Q13 65 15 92 Q25 105 31 96M62 82Q83 65 87 90Q72 98 62 94M89 81Q105 68 108 91Q100 100 91 97" fill="#78b7a0"/><g fill="#f2add1"><ellipse cx="39" cy="26" rx="11" ry="19"/><ellipse cx="39" cy="59" rx="11" ry="19"/><ellipse cx="23" cy="43" rx="18" ry="11"/><ellipse cx="55" cy="43" rx="18" ry="11"/></g><g fill="#bd99ec"><ellipse cx="65" cy="18" rx="11" ry="17"/><ellipse cx="65" cy="48" rx="11" ry="17"/><ellipse cx="50" cy="34" rx="17" ry="11"/><ellipse cx="80" cy="34" rx="17" ry="11"/></g><g fill="#ffc48c"><ellipse cx="92" cy="39" rx="10" ry="15"/><ellipse cx="92" cy="66" rx="10" ry="15"/><ellipse cx="79" cy="53" rx="15" ry="10"/><ellipse cx="105" cy="53" rx="15" ry="10"/></g><circle cx="39" cy="43" r="11" fill="#fff2b0"/><circle cx="65" cy="34" r="10" fill="#fff2b0"/><circle cx="92" cy="53" r="9" fill="#fff2b0"/></svg>`,
  fish: `<svg viewBox="0 0 72 50" aria-hidden="true"><path d="M13 25L2 8V42Z" fill="#fff2b8"/><ellipse cx="40" cy="25" rx="28" ry="18" fill="#f7b579"/><path d="M36 9L46 1 51 12" fill="#f7b579"/><circle cx="51" cy="21" r="3.5" fill="#334767"/><path d="M58 29Q62 34 66 28" fill="none" stroke="#c87662" stroke-width="2"/></svg>`,
  mail: `<svg viewBox="0 0 90 75" aria-hidden="true"><rect x="7" y="11" width="76" height="52" rx="11" fill="#fff5d8" stroke="#c79ddf" stroke-width="4"/><path d="M9 17L45 43 81 17" fill="none" stroke="#d6acdb" stroke-width="4"/><circle cx="45" cy="43" r="9" fill="#f6aabf"/><path d="M42 42q3 5 6 0" fill="none" stroke="#9a6787" stroke-width="2"/></svg>`,
  yarn: `<svg viewBox="0 0 90 90" aria-hidden="true"><circle cx="44" cy="44" r="30" fill="#ebacdf" stroke="#b981ce" stroke-width="4"/><path d="M24 28q45 10 35 34 M24 48q37-31 47-2 M34 71q-10-30 20-51 M55 66q20 2 26 13" fill="none" stroke="#fff1fc" stroke-width="5" stroke-linecap="round"/></svg>`,
  note: `<svg viewBox="0 0 80 95" aria-hidden="true"><path d="M40 7L49 36 75 44 49 53 40 84 31 53 5 44 31 36Z" fill="#fff1b0" stroke="#b48bd5" stroke-width="4" stroke-linejoin="round"/><circle cx="40" cy="44" r="9" fill="#fffef5"/></svg>`,
  star: `<svg viewBox="0 0 90 90" aria-hidden="true"><path d="M45 4L57 29 85 33 64 52 69 82 45 68 20 82 25 52 4 33 32 29Z" fill="#fff1af" stroke="#ffe2a0" stroke-width="4"/><circle cx="36" cy="45" r="3" fill="#8a6ba0"/><circle cx="53" cy="45" r="3" fill="#8a6ba0"/><path d="M40 54Q45 58 50 54" stroke="#8a6ba0" fill="none" stroke-width="2.5" stroke-linecap="round"/></svg>`,
};

const INTRO = FAUNA_TEXT.intro;

export function createFaunaScene({ host, objects, hasDiscovered, discover, memories }) {
  const expectedIds = ['pinguino', 'buho', 'gato', 'flores', 'estrella'];
  const byId = new Map(objects.map(obj => [obj.id, obj]));
  const getObject = id => byId.get(id);
  let night = false;
  let owlSteps = 0;
  let flowerSteps = 0;
  let flowerPlaying = false;
  let owlMailReady = false;
  let owlLetterOpen = false;
  let catPlaying = false;
  let catSteps = 0;
  let effectTimer = null;
  let catTimer = null;
  let fishFound = new Set();
  let fishMissionComplete = false;
  let flightTimer = null;
  let messageTimer = null;
  let actionTimer = null;
  let animationRun = 0;
  let owlBusy = false;
  let penguinBusy = false;

  const scene = document.createElement('div');
  scene.className = 'fauna-scene fauna-v2 fauna-illustrated';
  scene.innerHTML = `
    <img class="fauna-landscape" src="${assetUrl(FAUNA_SCENE.backgroundId)}" alt="" draggable="false" decoding="async" />
    <div class="fauna-zone-sign fauna-sign-laguna" aria-hidden="true" data-fauna-text="laguna"></div>
    <div class="fauna-zone-sign fauna-sign-refugio" aria-hidden="true" data-fauna-text="refugio"></div>
    <div class="fauna-zone-sign fauna-sign-bosque" aria-hidden="true" data-fauna-text="bosque"></div>
    <div class="fauna-zone-sign fauna-sign-jardin" aria-hidden="true" data-fauna-text="jardin"></div>
    <div class="fauna-night-overlay" aria-hidden="true"></div>
    <div class="fauna-sky-dots" aria-hidden="true" data-fauna-text="skyDots"></div>
    <div class="fauna-glimmers" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="fauna-family" aria-hidden="true"><div class="fauna-family-penguin"><img src="${assetUrl('object.yukofauna.pinguino')}" alt="" /></div></div>
    <div class="fauna-scene-title" aria-hidden="true" ><span data-fauna-text="sceneTitle"></span><span data-fauna-text="titleStar"></span><small data-fauna-text="sceneSubtitle"></small></div>
    <div id="faunaHotspots" class="fauna-hotspots"></div>
    <div class="fauna-hint" id="faunaHint" data-fauna-text="exploreHint"></div>
    <div class="fauna-flight-trail" id="faunaFlightTrail" aria-hidden="true" data-fauna-text="flightTrail"></div>
    <div class="fauna-butterfly" id="faunaButterfly" hidden aria-hidden="true" data-fauna-text="butterflies"></div>
    <div class="fauna-hearts" id="faunaHearts" hidden aria-hidden="true" data-fauna-text="hearts"></div>

  `;

  scene.querySelector('.fauna-landscape').addEventListener('error', function() {
    if (!this.dataset.fallback) { this.dataset.fallback='true'; this.src=assetUrl('background.yukofauna'); }
  });
  scene.querySelector('.fauna-family-penguin img').addEventListener('error', function() {
    this.parentElement.innerHTML=SVGS.penguin;
  },{once:true});
  const panel = document.createElement('section');
  panel.className = 'fauna-panel fauna-panel-v2';
  panel.innerHTML = `
    <div class="fauna-panel-top"><div><span class="fauna-overline" data-fauna-text="diaryEyebrow"></span><h2 data-fauna-text="diaryTitle"></h2></div><span id="faunaCount" class="fauna-count" data-fauna-text="initialCount"></span></div>
    <div class="fauna-progress"><span data-fauna-text="discoveries"></span><div class="fauna-track" aria-hidden="true"><div id="faunaTrackFill"></div></div></div>
    <div id="faunaResponse" class="fauna-response fauna-dialogue" role="status" aria-live="polite" aria-atomic="true">
      <span id="faunaResponseIcon" class="fauna-response-icon" aria-hidden="true" data-fauna-text="responseIcon"></span>
      <div><strong id="faunaResponseTitle"></strong><p id="faunaResponseText"></p><a id="faunaResponseStarLink" class="fauna-star-link" target="_blank" rel="noopener noreferrer" hidden></a></div>
    </div>
    <p id="faunaQuestHint" class="fauna-quest-hint" data-fauna-text="initialQuest"></p>
    <p class="fauna-diary-tip" data-fauna-text="diaryTip"></p>
    <button id="faunaRestartFish" class="fauna-replay" type="button" hidden data-fauna-text="replay"></button>
    <section id="faunaPostcard" class="fauna-postcard" hidden>
      <div aria-hidden="true" data-fauna-text="postcardIcon"></div><h3 data-fauna-text="postcardTitle"></h3>
      <p data-fauna-text="postcardText"></p>
    </section>
    <p class="fauna-footnote" data-fauna-text="saveHint"></p>
  `;

  const explorer = document.createElement('section');
  explorer.className = 'fauna-explorer';
  explorer.innerHTML = `
    <div class="fauna-tools">
      <div class="fauna-explore-caption"><strong data-fauna-text="exploreTitle"></strong><small data-fauna-text="exploreInstructions"></small></div>
      <div class="fauna-zone-tabs" aria-label="Viajar por el santuario">
        <button type="button" data-fauna-zone="laguna" data-fauna-text="tabLaguna"></button>
        <button type="button" data-fauna-zone="refugio" data-fauna-text="tabRefugio"></button>
        <button type="button" data-fauna-zone="bosque" data-fauna-text="tabBosque"></button>
        <button type="button" data-fauna-zone="jardin" data-fauna-text="tabJardin"></button>
      </div>
    </div>
    <div class="fauna-message-dock" aria-label="Mensajes de los habitantes"></div>
    <div class="fauna-explore-shell">
      <div id="faunaExplorerViewport" class="fauna-explore-viewport" tabindex="0" aria-label="Santuario desplazable. Desliza con el dedo en horizontal o vertical y usa los botones para acercar.">
        <div id="faunaWorldSpace" class="fauna-world-space"></div>
      </div>
      <div class="fauna-explore-controls" aria-label="Herramientas del santuario">
        <button id="faunaZoomIn" type="button" aria-label="Acercar santuario" data-fauna-text="zoomIn"></button>
        <button id="faunaZoomOut" type="button" aria-label="Alejar santuario" data-fauna-text="zoomOut"></button>
        <button id="faunaZoomReset" type="button" aria-label="Volver a la laguna" data-fauna-text="reset"></button>
      </div>
      <span class="fauna-explore-cue" aria-hidden="true" data-fauna-text="panHint"></span>
    </div>
    <div class="fauna-explore-actionbar">
      <button id="faunaTimeButton" type="button" class="fauna-time-button" aria-pressed="false" data-fauna-text="nightButton"></button>
      <span class="fauna-fish-counter" id="faunaFishCounter" aria-live="polite" data-fauna-text="initialFishCount"></span>
    </div>
  `;
  explorer.querySelector('.fauna-message-dock').innerHTML = `    <aside id="faunaStageDialogue" class="fauna-stage-dialogue" hidden aria-label="Mensajito de Yukofauna">
      <span id="faunaStageIcon" class="fauna-stage-icon" aria-hidden="true" data-fauna-text="stageIcon"></span>
      <div class="fauna-stage-copy"><strong id="faunaStageTitle"></strong><p id="faunaStageText"></p>
        <a id="faunaStageStarLink" class="fauna-star-link" target="_blank" rel="noopener noreferrer" hidden></a>
        <button id="faunaSeeDiary" type="button" class="fauna-stage-diary" data-fauna-text="seeDiary"></button>
      </div>
      <button id="faunaStageClose" type="button" class="fauna-stage-close" aria-label="Cerrar mensaje" data-fauna-text="close"></button>
    </aside>`;
  explorer.querySelector('#faunaWorldSpace').append(scene);
  host.append(explorer, panel);
  host.querySelectorAll('[data-fauna-text]').forEach(el=>el.textContent=FAUNA_TEXT.labels[el.dataset.faunaText]);
  host.querySelectorAll('.fauna-star-link').forEach(el=>{
    el.href=FAUNA_COPY.starLinkUrl;
    el.textContent=FAUNA_COPY.starLinkLabel;
  });
  const nav = createExplorer({
    viewport: explorer.querySelector('#faunaExplorerViewport'),
    space: explorer.querySelector('#faunaWorldSpace'),
    stage: scene,
    width:FAUNA_SCENE.size.width, height:FAUNA_SCENE.size.height, initial:'laguna',
    fitHeightOnReset:true, focusPoints:FAUNA_SCENE.focusPoints
  });
  explorer.querySelectorAll('[data-fauna-zone]').forEach(button => button.addEventListener('click', () => {
    explorer.querySelectorAll('[data-fauna-zone]').forEach(b=>b.classList.toggle('is-active',b===button));
    nav.focus(button.dataset.faunaZone);
  }));
  explorer.querySelector('#faunaZoomIn').addEventListener('click', () => nav.zoom(1.2));
  explorer.querySelector('#faunaZoomOut').addEventListener('click', () => nav.zoom(1/1.2));
  explorer.querySelector('#faunaZoomReset').addEventListener('click', () => nav.reset());
  const q = sel => host.querySelector(sel);
  const spots = q('#faunaHotspots');
  const buttons = new Map();

  function place(node, point) { node.style.left=`${point.x}%`; node.style.top=`${point.y}%`; }

  function makeHotspot(id, x, y, icon, label, variant = '') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `fauna-hotspot fauna-character ${variant}`.trim();
    button.dataset.object = id;
    const entry = FAUNA_SCENE.objects[id] ?? (icon==='fish' ? {assetId:'object.yukofauna.pez'} : null);
    button.style.left = `${entry?.x ?? x}%`;
    button.style.top = `${entry?.y ?? y}%`;
    button.setAttribute('aria-label', label);
    button.innerHTML = `<span class="fauna-figure" aria-hidden="true">${SVGS[icon]}</span><span class="fauna-hotspot-label"></span>`;
    button.querySelector('.fauna-hotspot-label').textContent = label;
    if (entry?.assetId) {
      const image=document.createElement('img'); image.alt=''; image.draggable=false; image.src=assetUrl(entry.assetId);
      image.addEventListener('load',()=>button.querySelector('.fauna-figure').replaceChildren(image),{once:true});
    }
    if (entry?.painted) button.classList.add('fauna-painted-hotspot');
    spots.append(button);
    buttons.set(id, button);
    return button;
  }

  const penguin = makeHotspot('pinguino', 13, 69, 'penguin', 'Pingüino bebé', 'fauna-penguin');
  const owl = makeHotspot('buho', 78, 33, 'owl', 'Búho mensajero', 'fauna-owl');
  const cat = makeHotspot('gato', 76, 78, 'cat', 'Gato dormilón', 'fauna-cat');
  const flowers = makeHotspot('flores', 56, 82, 'flowers', 'Flores danzantes', 'fauna-flowers');
  const star = makeHotspot('estrella', 53, 22, 'star', 'Estrella escondida', 'fauna-star');
  const mail = makeHotspot('buhocarta', 68, 47, 'mail', 'Abrir carta del búho', 'fauna-mail');
  const yarn = makeHotspot('ovillo', 67, 80, 'yarn', 'Jugar con el ovillo', 'fauna-yarn');
  const note = makeHotspot('flornota', 52, 73, 'note', 'Tocar destello de las flores', 'fauna-note');
  mail.hidden = true;
  yarn.hidden = true;
  note.hidden = true;
  const fishButtons = FISH.map((fish, i) => {
    const button = makeHotspot(fish.id, fish.x, fish.y, 'fish', `Recoger pececito ${i + 1}`, 'fauna-fish');
    button.addEventListener('click', () => collectFish(fish.id));
    return button;
  });

  function announce(title, text, icon = '✨', source = null, inScene = true) {
    const response = q('#faunaResponse');
    q('#faunaResponseTitle').textContent = title;
    q('#faunaResponseText').textContent = text;
    q('#faunaResponseIcon').textContent = icon;
    q('#faunaResponseStarLink').hidden = source !== star;
    response.classList.remove('fauna-bounce');
    requestAnimationFrame(() => response.classList.add('fauna-bounce'));

    const speech = q('#faunaStageDialogue');
    if (!inScene) { speech.hidden = true; return; }
    q('#faunaStageTitle').textContent = title;
    // Mensaje completo en el muelle: no necesita desplazarse al diario para leerlo.
    q('#faunaStageText').textContent = text;
    q('#faunaStageIcon').textContent = icon;
    q('#faunaStageStarLink').hidden = source !== star;
    // Mensaje en el muelle exterior del escenario: no tapa animales ni objetos.
    speech.hidden = false;
    speech.classList.remove('is-appearing');
    requestAnimationFrame(() => speech.classList.add('is-appearing'));
  }

  if(memories) addMemoryHotspots({stage:scene,region:'yukofauna',viewer:memories,anchors:anchorsFor('yukofauna')});
  const addOns = installSceneAddons({stage:scene,entries:[...FAUNA_ADDONS,...getCharacterAddons('yukofauna')],
    onMessage:(title,message,icon) => announce(title,message,icon)});

  q('#faunaStageClose').addEventListener('click', () => { q('#faunaStageDialogue').hidden = true; });
  q('#faunaSeeDiary').addEventListener('click', () => {
    panel.scrollIntoView({ behavior: 'auto', block: 'start' });
  });

  function displayEffect(id, duration = 2600) {
    const effect = q(`#${id}`);
    clearTimeout(effectTimer);
    effect.hidden = false;
    effect.classList.remove('effect-play');
    requestAnimationFrame(() => effect.classList.add('effect-play'));
    effectTimer = setTimeout(() => { effect.hidden = true; effect.classList.remove('effect-play'); }, duration);
  }

  function discoverOnce(id) {
    if (!hasDiscovered(id)) discover(id);
    refresh();
  }

  function refresh() {
    const count = expectedIds.filter(id => hasDiscovered(id)).length;
    q('#faunaCount').textContent = `${count}/${expectedIds.length}`;
    q('#faunaTrackFill').style.width = `${count / expectedIds.length * 100}%`;
    q('#faunaPostcard').hidden = count < expectedIds.length;
    for (const id of expectedIds) {
      const button = buttons.get(id);
      button?.classList.toggle('is-discovered', hasDiscovered(id));
    }
    star.hidden = !night;
    q('#faunaFishCounter').textContent = fishMissionComplete ? FAUNA_COPY.familyCount : faunaCopy('fishCount', fishFound.size);
    q('#faunaQuestHint').textContent = fishMissionComplete
      ? FAUNA_COPY.questDone
      : FAUNA_COPY.questActive;
    fishButtons.forEach((button, i) => { button.hidden = fishMissionComplete || fishFound.has(FISH[i].id); });
    mail.hidden = !owlMailReady || owlLetterOpen;
    yarn.hidden = !catPlaying;
    note.hidden = !flowerPlaying;
    flowers.dataset.blooms = String(flowerSteps);
    q('#faunaRestartFish').hidden = !fishMissionComplete;
    penguin.classList.toggle('is-reunited', fishMissionComplete);
  }

  function collectFish(id) {
    if (fishMissionComplete || fishFound.has(id) || penguinBusy) return;
    fishFound.add(id);
    const fish = FISH.find(f => f.id === id);
    penguinBusy = true;
    penguin.style.left = `${fish.x - 6}%`;
    penguin.style.top = `${fish.y - 8}%`;
    penguin.classList.add('is-hopping');
    refresh();
    announce(FAUNA_COPY.fishTitle, faunaCopy('fishStep', fishFound.size), '🐟', penguin);
    clearTimeout(actionTimer);
    const thisRun = animationRun;
    actionTimer = setTimeout(() => {
      if (thisRun !== animationRun) return;
      penguinBusy = false;
      penguin.classList.remove('is-hopping');
      if (fishFound.size === FISH.length) {
        fishMissionComplete = true;
        discoverOnce('pinguino');
        place(penguin, FAUNA_SCENE.reunion);
        
        announce(FAUNA_MESSAGES.reunion.title, FAUNA_MESSAGES.reunion.text, '🐧', penguin);
      }
    }, 560);
  }

  penguin.addEventListener('click', () => {
    announce(FAUNA_COPY.penguinTitle, fishMissionComplete
      ? FAUNA_COPY.penguinDone
      : FAUNA_COPY.penguinQuest, '🐧', penguin);
  });

  q('#faunaRestartFish').addEventListener('click', () => {
    if (!fishMissionComplete) return;
    clearTimeout(actionTimer);
    penguinBusy = false;
    fishMissionComplete = false;
    fishFound = new Set();
    place(penguin, FAUNA_SCENE.objects.pinguino);
    
    refresh();
    announce(FAUNA_MESSAGES.replay.title, FAUNA_MESSAGES.replay.text, '🐧', penguin);
  });

  // EL BÚHO: un vuelo cruzando el santuario que deja una carta tangible.
  owl.addEventListener('click', () => {
    if (owlBusy) return;
    if (owlMailReady && !owlLetterOpen) {
      announce(FAUNA_MESSAGES.owlReminder.title, FAUNA_MESSAGES.owlReminder.text, '💌', owl);
      return;
    }
    owlBusy = true;
    owlSteps++;
    owlMailReady = false;
    owlLetterOpen = false;
    place(owl,FAUNA_SCENE.objects.buho);
    owl.classList.add('is-flying');
    q('#faunaFlightTrail').classList.remove('is-flying');
    void q('#faunaFlightTrail').offsetWidth;
    q('#faunaFlightTrail').classList.add('is-flying');
    place(owl,FAUNA_SCENE.owlFlight);
    announce(FAUNA_MESSAGES.owlFlight.title, FAUNA_MESSAGES.owlFlight.text, '🦉', owl);
    clearTimeout(flightTimer);
    const thisRun = animationRun;
    flightTimer = setTimeout(() => {
      if (thisRun !== animationRun) return;
      owlBusy = false;
      owl.classList.remove('is-flying');
      owlMailReady = true;
      refresh();
      announce(FAUNA_MESSAGES.owlDelivery.title, FAUNA_MESSAGES.owlDelivery.text, '💌', mail);
    }, 1050);
  });

  mail.addEventListener('click', () => {
    if (!owlMailReady || owlLetterOpen) return;
    owlLetterOpen = true;
    owlMailReady = false;
    discoverOnce('buho');
    announce(FAUNA_MESSAGES.owlLetter.title, FAUNA_MESSAGES.owlLetter.text, '💌', mail);
    refresh();
  });

  // EL GATO: tres lanzamientos de ovillo, un salto y corazones al completar.
  const yarnPath = FAUNA_SCENE.yarnPath;
  cat.addEventListener('click', () => {
    if (catPlaying) {
      announce(FAUNA_MESSAGES.catReminder.title, FAUNA_MESSAGES.catReminder.text, '🧶', cat);
      return;
    }
    catPlaying = true;
    catSteps = 0;
    yarn.style.left = `${yarnPath[0].x}%`;
    yarn.style.top = `${yarnPath[0].y}%`;
    cat.classList.remove('is-napping');
    refresh();
    announce(FAUNA_MESSAGES.catStart.title, FAUNA_MESSAGES.catStart.text, '🐱', cat);
  });
  yarn.addEventListener('click', () => {
    if (!catPlaying) return;
    catSteps++;
    const step = yarnPath[catSteps - 1];
    cat.style.left = `${step.catX}%`;
    cat.style.top = `${step.catY}%`;
    cat.classList.add('is-chasing');
    yarn.classList.remove('is-rolling');
    requestAnimationFrame(() => yarn.classList.add('is-rolling'));
    clearTimeout(catTimer);
    if (catSteps >= 3) {
      catPlaying = false;
      yarn.hidden = true;
      cat.classList.remove('is-chasing');
      discoverOnce('gato');
      displayEffect('faunaHearts', 2500);
      announce(FAUNA_MESSAGES.catWin.title, FAUNA_MESSAGES.catWin.text, '🐱', cat);
      catTimer = setTimeout(() => { place(cat,FAUNA_SCENE.objects.gato); cat.classList.add('is-napping'); }, 1300);
    } else {
      const next = yarnPath[catSteps];
      yarn.style.left = `${next.x}%`;
      yarn.style.top = `${next.y}%`;
      announce(FAUNA_COPY.catStepTitle, faunaCopy('catStep', catSteps), '🧶', yarn);
      catTimer = setTimeout(() => cat.classList.remove('is-chasing'), 750);
    }
    refresh();
  });

  // LAS FLORES: destellos que despiertan tres pétalos, sin sección musical.
  const notesPath = FAUNA_SCENE.notesPath;
  flowers.addEventListener('click', () => {
    if (flowerPlaying) {
      announce(FAUNA_MESSAGES.flowersReminder.title, FAUNA_MESSAGES.flowersReminder.text, '🌷', flowers);
      return;
    }
    flowerPlaying = true;
    flowerSteps = 0;
    note.style.left = `${notesPath[0].x}%`;
    note.style.top = `${notesPath[0].y}%`;
    flowers.classList.remove('is-finale');
    refresh();
    announce(FAUNA_MESSAGES.flowersStart.title, FAUNA_MESSAGES.flowersStart.text, '✨', flowers);
  });
  note.addEventListener('click', () => {
    if (!flowerPlaying) return;
    flowerSteps++;
    flowers.classList.add('is-dancing');
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => flowers.classList.remove('is-dancing'), 850);
    if (flowerSteps >= 3) {
      flowerPlaying = false;
      discoverOnce('flores');
      flowers.classList.add('is-finale');
      displayEffect('faunaButterfly', 3900);
      announce(FAUNA_MESSAGES.flowersWin.title, FAUNA_MESSAGES.flowersWin.text, '🦋', flowers);
    } else {
      const next = notesPath[flowerSteps];
      note.style.left = `${next.x}%`;
      note.style.top = `${next.y}%`;
      announce(FAUNA_COPY.flowerStepTitle, faunaCopy('flowerStep', flowerSteps), '✨', note);
    }
    refresh();
  });

  star.addEventListener('click', () => {
    if (!night) return;
    discoverOnce('estrella');
    star.classList.add('is-twinkling');
    announce(FAUNA_COPY.starTitle, getObject('estrella')?.message || FAUNA_COPY.starFallback, '⭐', star);
  });

  q('#faunaTimeButton').addEventListener('click', () => {
    night = !night;
    scene.classList.toggle('is-night', night);
    const button = q('#faunaTimeButton');
    button.textContent = night ? FAUNA_COPY.dayButton : FAUNA_COPY.nightButton;
    button.setAttribute('aria-pressed', String(night));
    q('#faunaHint').textContent = night ? FAUNA_COPY.nightHint : FAUNA_COPY.dayHint;
    announce(night ? FAUNA_COPY.nightTitle : FAUNA_COPY.dayTitle,
      night ? FAUNA_COPY.nightText : FAUNA_COPY.dayText, night ? '🌙' : '☀️', night ? star : q('#faunaTimeButton'));
    refresh();
  });

  function show() {
    ++animationRun;
    clearTimeout(flightTimer);
    clearTimeout(messageTimer);
    clearTimeout(actionTimer);
    clearTimeout(effectTimer);
    clearTimeout(catTimer);
    owlBusy = false;
    penguinBusy = false;
    night = false;
    fishFound = new Set();
    fishMissionComplete = hasDiscovered('pinguino');
    owlSteps = 0;
    owlMailReady = false;
    owlLetterOpen = false;
    catPlaying = false;
    catSteps = 0;
    flowerPlaying = false;
    flowerSteps = 0;
    q('#faunaButterfly').hidden = true;
    q('#faunaHearts').hidden = true;
    q('#faunaFlightTrail').classList.remove('is-flying');
    flowers.classList.remove('is-finale');
    cat.classList.add('is-napping');
    cat.classList.remove('is-chasing');
    yarn.classList.remove('is-rolling');
    place(cat,FAUNA_SCENE.objects.gato);
    mail.hidden = true;
    yarn.hidden = true;
    note.hidden = true;
    penguin.classList.remove('is-hopping');
    owl.classList.remove('is-flying');
    cat.classList.remove('is-purring');
    flowers.classList.remove('is-dancing');
    star.classList.remove('is-twinkling');
    place(penguin, fishMissionComplete ? FAUNA_SCENE.reunion : FAUNA_SCENE.objects.pinguino);
    
    place(owl,FAUNA_SCENE.objects.buho);
    scene.classList.remove('is-night');
    q('#faunaTimeButton').textContent = FAUNA_COPY.nightButton;
    q('#faunaTimeButton').setAttribute('aria-pressed', 'false');
    q('#faunaHint').textContent = FAUNA_COPY.dayHint;
    announce(INTRO.title, INTRO.text, INTRO.icon, null, true);
    refresh();
    requestAnimationFrame(()=>{
      nav.reset();
      explorer.querySelectorAll('[data-fauna-zone]').forEach(b=>b.classList.toggle('is-active',b.dataset.faunaZone==='laguna'));
    });
  }

  function hide() {
    ++animationRun;
    for (const timer of [flightTimer,messageTimer,actionTimer,effectTimer,catTimer]) clearTimeout(timer);
    addOns.close();
  }
  return { show, hide };
}
