import { REGIONS, createMap } from "./map.js?v=2.9.15";
import { loadProgress, saveProgress } from "./storage.js?v=2.1";
import { createFaunaScene } from "./scenes/fauna.js?v=2.9.15";
import { createCityScene } from "./scenes/city.js?v=2.9.16";
import { createLibraryScene } from "./scenes/library.js?v=2.9.14";
import { createObservatoryScene } from "./scenes/observatory.js?v=2.9.15";
import { createCinemaScene } from "./scenes/cinema.js?v=2.9.14";
import { createMemoryViewer } from "./world/memory-viewer.js?v=2.9.14";
import { MEMORIES } from "./data/memories.js?v=2.9.14";

const $ = id => document.getElementById(id);
const progress = loadProgress();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const intro = $("introScreen");
const mapScreen = $("mapScreen");
const regionScreen = $("regionScreen");
const dialog = $("infoDialog");
let selected = null;
let launchTimer = null;
let faunaScene = null;
let cityScene = null;
let libraryScene = null;
let observatoryScene = null;
let cinemaScene = null;
const memories = createMemoryViewer({
  isFound:id => progress.memoriesFound.includes(id),
  onFound:id=>{ if(!progress.memoriesFound.includes(id)){
    progress.memoriesFound.push(id);
    saveProgress(progress);
  }}
});

const map = createMap({
  viewport: $("mapViewport"),
  layer: $("worldLayer"),
  onSelect(region) {
    selected = region;
    $("regionCard").hidden = false;
    $("mapHint").hidden = true;
    $("regionCardIcon").textContent = region.icon;
    $("regionCardType").textContent = region.type;
    $("regionCardTitle").textContent = region.name;
    $("regionCardDescription").textContent = region.description;
  }
});

function hideScreens() {
  faunaScene?.hide();
  cityScene?.hide();
  libraryScene?.hide();
  observatoryScene?.hide();
  cinemaScene?.hide();
  memories.close();
  intro.hidden = true;
  mapScreen.hidden = true;
  regionScreen.hidden = true;
}
function closeRegionCard() {
  selected = null;
  $("regionCard").hidden = true;
  $("mapHint").hidden = false;
  map.select(null);
}
function showMap({ keepView = true } = {}) {
  clearTimeout(launchTimer);
  intro.classList.remove("is-launching");
  hideScreens();
  mapScreen.hidden = false;
  closeRegionCard();
  document.title = "Yukoverso · Mapa de Yukoplaneta";
  requestAnimationFrame(() => {
    if (keepView) map.updateSize(); else map.reset();
  });
}
function showIntro() {
  clearTimeout(launchTimer);
  intro.classList.remove("is-launching");
  hideScreens();
  intro.hidden = false;
  document.title = "Yukoverso · Para ti, Yuko";
  $("exploreButton").focus();
}
function enterMap(animated = true) {
  if (intro.classList.contains("is-launching")) return;
  progress.introSeen = true;
  saveProgress(progress);
  if (!animated || reducedMotion.matches) { showMap({ keepView: false }); return; }
  intro.classList.add("is-launching");
  launchTimer = setTimeout(() => showMap({ keepView: false }), 760);
}
function visitRegion(region) {
  if (!region) return;
  progress.lastRegion = region.id;
  if (!progress.visited.includes(region.id)) progress.visited.push(region.id);
  saveProgress(progress);
  hideScreens();
  regionScreen.hidden = false;
  regionScreen.dataset.theme = region.theme;
  $("regionType").textContent = region.type;
  $("regionTitle").textContent = region.name;
  $("regionDescription").textContent = region.description;
  $("regionBigIcon").textContent = region.icon;
  $("objectResponse").hidden = true;
  const isFauna = region.id === "yukofauna";
  const isCity = region.id === "yukopolis";
  const isLibrary = region.id === "yukoteca";
  const isObservatory = region.id === "yukobservatorio";
  const isCinema = region.id === "yukocine";
  const isDetailed = isFauna || isCity || isLibrary || isObservatory || isCinema;
  $("regionScenery").hidden = isDetailed;
  $("genericObjects").hidden = isDetailed;
  $("faunaExperience").hidden = !isFauna;
  $("cityExperience").hidden = !isCity;
  $("libraryExperience").hidden = !isLibrary;
  $("observatoryExperience").hidden = !isObservatory;
  $("cinemaExperience").hidden = !isCinema;
  if (isFauna) {
    if (!faunaScene) {
      faunaScene = createFaunaScene({
        host: $("faunaExperience"),
        objects: region.objects,
        memories,
        hasDiscovered: id => progress.discoveries.includes(`yukofauna:${id}`),
        discover: id => {
          const key = `yukofauna:${id}`;
          if (!progress.discoveries.includes(key)) {
            progress.discoveries.push(key);
            saveProgress(progress);
          }
        }
      });
    }
    faunaScene.show();
      document.title = `Yukoverso · ${region.name}`;
    window.scrollTo(0, 0);
    return;
  }
  if (isCity) {
    if (!cityScene) {
      cityScene = createCityScene({
        host: $("cityExperience"),
        objects: region.objects,
        memories,
        hasDiscovered: id => progress.discoveries.includes(`yukopolis:${id}`),
        discover: id => {
          const key = `yukopolis:${id}`;
          if (!progress.discoveries.includes(key)) {
            progress.discoveries.push(key);
            saveProgress(progress);
          }
        }
      });
    }
    cityScene.show();
      document.title = `Yukoverso · ${region.name}`;
    window.scrollTo(0, 0);
    return;
  }
  if (isLibrary) {
    if (!libraryScene) {
      libraryScene = createLibraryScene({
        host: $("libraryExperience"),
        memories,
        hasDiscovered: id => progress.discoveries.includes(`yukoteca:${id}`),
        discover: id => {
          const key = `yukoteca:${id}`;
          if (!progress.discoveries.includes(key)) {
            progress.discoveries.push(key);
            saveProgress(progress);
          }
        }
      });
    }
    libraryScene.show();
      document.title = `Yukoverso · ${region.name}`;
    window.scrollTo(0, 0);
    return;
  }
  const sceneFactories = [
    [isObservatory, 'yukobservatorio', 'observatoryExperience', () => observatoryScene, value => { observatoryScene = value; }, createObservatoryScene],
    [isCinema, 'yukocine', 'cinemaExperience', () => cinemaScene, value => { cinemaScene = value; }, createCinemaScene]
  ];
  for (const [matches, regionId, hostId, getScene, setScene, createScene] of sceneFactories) {
    if (!matches) continue;
    let scene = getScene();
    if (!scene) {
      scene = createScene({
        host: $(hostId),
        memories,
        hasDiscovered: id => progress.discoveries.includes(`${regionId}:${id}`),
        discover: id => {
          const key = `${regionId}:${id}`;
          if (!progress.discoveries.includes(key)) {
            progress.discoveries.push(key);
            saveProgress(progress);
          }
        }
      });
      setScene(scene);
    }
    scene.show();
      document.title = `Yukoverso · ${region.name}`;
    window.scrollTo(0, 0);
    return;
  }
  const list = $("objectList");
  list.replaceChildren();
  const discoveredInRegion = () => region.objects.filter((obj, index) =>
    progress.discoveries.includes(`${region.id}:${obj.id ?? index}`)).length;
  const updateDiscoveries = () => {
    $("regionDiscoveryCount").textContent = `${discoveredInRegion()}/${region.objects.length}`;
  };
  region.objects.forEach((object, index) => {
    const key = `${region.id}:${object.id ?? index}`;
    const button = document.createElement("button");
    button.className = "object-button";
    button.type = "button";
    if (progress.discoveries.includes(key)) button.classList.add("is-discovered");
    const emoji = document.createElement("span");
    emoji.textContent = object.icon;
    const label = document.createElement("strong");
    label.textContent = object.name;
    button.append(emoji, label);
    button.addEventListener("click", () => {
      if (!progress.discoveries.includes(key)) {
        progress.discoveries.push(key);
        saveProgress(progress);
      }
      button.classList.add("is-discovered");
      updateDiscoveries();
      const response = $("objectResponse");
      response.textContent = object.message;
      response.hidden = false;
      response.style.animation = "none";
      // Reinicia solo la animación de un mensaje breve, no el mapa.
      requestAnimationFrame(() => { response.style.animation = ""; });
    });
    list.append(button);
  });
  updateDiscoveries();
  document.title = `Yukoverso · ${region.name}`;
  window.scrollTo(0, 0);
}

function dialogRegionButton(region, description, onClick, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "dialog-region";
  button.disabled = disabled;
  const icon = document.createElement("span");
  icon.className = "dialog-region-icon";
  icon.textContent = region.icon;
  const text = document.createElement("span");
  const name = document.createElement("strong");
  name.textContent = region.name;
  const sub = document.createElement("small");
  sub.textContent = description;
  text.append(name, sub);
  button.append(icon, text);
  if (onClick) button.addEventListener("click", onClick);
  return button;
}
function showRegions() {
  $("dialogTitle").textContent = "Los lugares del Yukoplaneta";
  const content = $("dialogContent");
  content.replaceChildren();
  const introText = document.createElement("p");
  introText.className = "dialog-intro";
  introText.textContent = "¿A dónde vamos ahora, Yuko?";
  content.append(introText);
  for (const region of REGIONS) {
    content.append(dialogRegionButton(region, region.type, () => {
      dialog.close();
      showMap();
      requestAnimationFrame(() => map.focusRegion(region.id));
    }));
  }
  dialog.showModal();
}
function showPassport() {
  $("dialogTitle").textContent = "Tu Yukopasaporte";
  const content = $("dialogContent");
  content.replaceChildren();
  const count = document.createElement("div");
  count.className = "passport-count";
  const number = document.createElement("strong");
  number.textContent = `${progress.visited.filter(id => REGIONS.some(r => r.id === id)).length} / ${REGIONS.length}`;
  const description = document.createElement("span");
  description.textContent = "lugares que ya visitaste";
  count.append(number, description);
  content.append(count);
  const note = document.createElement("p");
  note.className = "dialog-intro";
  note.textContent = "Lo que vas descubriendo se guarda solito. Y puedes ir a cualquier lugar cuando quieras.";
  content.append(note);
  const discoveriesCount = document.createElement("p");
  discoveriesCount.className = "dialog-intro";
  const possible = REGIONS.reduce((n, r) => n + r.objects.length, 0);
  const known = new Set(REGIONS.flatMap(r => r.objects.map((obj, index) => `${r.id}:${obj.id ?? index}`)));
  discoveriesCount.textContent = `Cositas descubiertas: ${progress.discoveries.filter(key => known.has(key)).length} / ${possible}`;
  content.append(discoveriesCount);
  const found=MEMORIES.filter(m=>progress.memoriesFound.includes(m.id)).length;
  const memoryCount=document.createElement('p');memoryCount.className='dialog-intro';
  memoryCount.textContent=`Fotitos y recuerdos vistos: ${found} / ${MEMORIES.length}. A ver cuántos encuentras jaja.`;
  content.append(memoryCount);
  for (const region of REGIONS) {
    const visited = progress.visited.includes(region.id);
    content.append(dialogRegionButton(region, visited ? "✓ Ya estuviste aquí" : "Todavía no lo visitas", null, true));
  }
  dialog.showModal();
}

$("exploreButton").addEventListener("click", () => enterMap(true));
$("skipButton").addEventListener("click", () => enterMap(false));
$("zoomIn").addEventListener("click", () => map.zoom(1.25));
$("zoomOut").addEventListener("click", () => map.zoom(1 / 1.25));
$("resetView").addEventListener("click", () => map.reset());
$("visitButton").addEventListener("click", () => visitRegion(selected));
$("closeRegionCard").addEventListener("click", closeRegionCard);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !mapScreen.hidden && !$('regionCard').hidden && !dialog.open) {
    closeRegionCard();
  }
});
$("backToMap").addEventListener("click", () => showMap());
$("regionsButton").addEventListener("click", showRegions);
$("listNavButton").addEventListener("click", showRegions);
$("passportButton").addEventListener("click", showPassport);
$("passportNavButton").addEventListener("click", showPassport);
$("introNavButton").addEventListener("click", showIntro);
$("mapNavButton").addEventListener("click", () => { $("mapViewport").focus(); });
$("closeDialog").addEventListener("click", () => dialog.close());
window.addEventListener("resize", () => { if (!mapScreen.hidden) map.updateSize(); });

// La introducción se muestra siempre al abrir o recargar la web.
// El mapa solo se abre por acción explícita: Explorar o Entrar sin animación.
// Conservamos introSeen en el progreso por compatibilidad, pero NO controla el inicio.
showIntro();
