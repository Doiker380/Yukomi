// Guardado local. Sin servidor, cuentas ni librerías externas.
const KEY = "yukoverso_progress_v1";

const defaults = () => ({ introSeen: false, visited: [], lastRegion: null, discoveries: [], memoriesFound: [] });

export function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!data || typeof data !== "object") return defaults();
    const oldVisited=Array.isArray(data.visited) ? data.visited.filter(x => typeof x === 'string') : [];
    // Yukolandia desapareció del mapa; se conserva el ID histórico y se marca
    // Yukópolis como visitada para no perder el avance anterior.
    const visited=[...new Set(oldVisited.includes('yukolandia') ? [...oldVisited,'yukopolis'] : oldVisited)];
    const previous=Array.isArray(data.discoveries) ? data.discoveries : [];
    const legacyMuseum=previous.includes('yukolandia:reliquias') || previous.includes('yukolandia:2');
    const safeDiscovered=legacyMuseum ? [...previous,'yukopolis:partidas'] : previous;
    return {
      memoriesFound: Array.isArray(data.memoriesFound) ? [...new Set(data.memoriesFound.filter(x=>typeof x==='string'))] : [],
      introSeen: data.introSeen === true,
      visited,
      lastRegion: data.lastRegion === "yukolandia" ? "yukopolis" : (typeof data.lastRegion === "string" ? data.lastRegion : null),
      // Migración silenciosa desde Fase 1.2: conserva los dos objetos originales.
      discoveries: Array.isArray(data.discoveries)
        ? [...new Set(safeDiscovered.filter(x => typeof x === "string").map(id => ({
            "yukofauna:0": "yukofauna:pinguino",
            "yukofauna:1": "yukofauna:buho",
            "yukopolis:0": "yukopolis:calendario",
            "yukopolis:1": "yukopolis:correo",
            "yukoteca:0": "yukoteca:albumes",
            "yukoteca:1": "yukoteca:proyector",
            "yukocine:0": "yukocine:cartelera",
            "yukocine:1": "yukocine:proyector",
            "yukolandia:0": "yukolandia:estrellas",
            "yukolandia:1": "yukolandia:ruleta",
            "yukobservatorio:0": "yukobservatorio:carta",
            "yukobservatorio:1": "yukobservatorio:telescopio"
          })[id] ?? id))]
        : [],
    };
  } catch {
    return defaults();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
    return true;
  } catch {
    // En modo privado o con almacenamiento restringido podría fallar.
    return false;
  }
}
