import { assetUrl, getAsset } from '../data/asset-manifest.js?v=2.3.3';

/** Renderiza capas encima del fondo DENTRO del escenario escalado por createExplorer.
 * No escucha gestos ni modifica el progreso: es compatible con las otras regiones.
 * Entradas: {id,x,y,scale,assetId?,icon?,label?,enabled?,action?}
 * Las capas comparten espacio (0..100 % sobre width/height del escenario).
 */
export function mountSceneLayers({stage,scene,characters=[],onAction=()=>{}}) {
  const background=document.createElement('img');
  background.className='scene-layer-background library-landscape';
  background.alt=''; background.draggable=false; background.decoding='async';
  const backgroundAsset=getAsset(scene.backgroundId);
  if(!backgroundAsset || backgroundAsset.type!=='image') throw new Error(`Fondo inexistente: ${scene.backgroundId}`);
  // Mantener siempre visible el SVG anterior hasta que el fondo opcional cargue.
  // Si el PNG no existe todavía (404), no se pierde el escenario ni se rompe nada.
  const fallbackAsset=scene.backgroundFallbackId ? getAsset(scene.backgroundFallbackId) : null;
  if(scene.backgroundFallbackId && (!fallbackAsset || fallbackAsset.type!=='image')) {
    throw new Error(`Fondo de respaldo inexistente: ${scene.backgroundFallbackId}`);
  }
  let disposed=false;
  // Usar el recurso seleccionado directamente: evita depender de que un
  // Image() de precarga (sin referencia persistente) termine su petición.
  // Si la ruta es incorrecta o falta el PNG, regresar al fondo SVG existente.
  background.addEventListener('error',()=>{
    if(disposed || !fallbackAsset || background.getAttribute('src')===fallbackAsset.src) return;
    background.src=fallbackAsset.src;
  });
  background.src=backgroundAsset.src;
  stage.prepend(background);
  const layerRoot=document.createElement('div');
  layerRoot.className='scene-layer-root';
  stage.append(layerRoot);
  const layers={decorations:make('decorations'),characters:make('characters'),objects:make('objects'),navigation:make('navigation')};
  function make(type) {
    const layer=document.createElement('div');
    layer.className=`scene-layer scene-layer-${type}`;
    layerRoot.append(layer);
    return layer;
  }
  function place(node,entry){
    node.style.left=`${entry.x}%`;node.style.top=`${entry.y}%`;
    const scale=Number.isFinite(entry.scale)&&entry.scale>0?entry.scale:1;
    node.style.setProperty('--element-scale',String(scale));
    if(entry.anchor==='top-left')node.classList.add('scene-position-top-left');
    return node;
  }
  function fillVisual(node,entry,symbolClass) {
    const visual=document.createElement('span'); visual.className=symbolClass;
    const path=entry.assetId ? assetUrl(entry.assetId) : null;
    // El botón original permanece visible hasta comprobar que el PNG carga.
    // Si el archivo aún no se ha copiado o GitHub Pages devuelve 404,
    // el control sigue funcionando y conserva su icono y etiqueta.
    visual.textContent=entry.icon||'✦';
    if(path){
      const image=document.createElement('img');
      image.alt=''; image.decoding='async';
      // No lazy-load para botones: una imagen fuera del DOM debe poder cargar.
      image.addEventListener('load',()=>{
        if(image.naturalWidth>0){
          visual.replaceChildren(image);
          if(symbolClass==='library-hotspot-symbol') node.classList.add('has-artwork');
        }
      },{once:true});
      image.addEventListener('error',()=>{
        // No hay que hacer nada: el icono de respaldo sigue presente.
      },{once:true});
      image.src=path;
    }
    node.append(visual);
  }
  const created=[];
  function renderEntries(entries,type) {
    for(const entry of entries||[]) {
      if(!entry || entry.enabled===false)continue;
      if(!entry.id || !Number.isFinite(entry.x) || !Number.isFinite(entry.y) || entry.x<0 || entry.x>100 || entry.y<0 || entry.y>100)continue;
      if(entry.assetId && !assetUrl(entry.assetId))continue; // no dibujar recursos pendientes
      const interactive=type!=='decorations';
      const node=document.createElement(interactive?'button':'div');
      node.className=`scene-element scene-element-${type} ${entry.className||''}`.trim();
      node.dataset.sceneId=entry.id;
      place(node,entry);
      if(interactive){
        node.type='button';node.classList.add(type==='navigation'?'library-hotspot':'scene-object');
        node.setAttribute('aria-label',entry.label||entry.id);
        if(type==='navigation')node.dataset.open=entry.id;
        fillVisual(node,entry,type==='navigation'?'library-hotspot-symbol':'scene-object-symbol');
        if(entry.label){const label=document.createElement('span');label.className=type==='navigation'?'library-hotspot-label':'scene-object-label';label.textContent=entry.label;node.append(label);}
        node.addEventListener('click',()=>onAction(entry.action||{},entry));
      }else{
        node.setAttribute('aria-hidden','true');
        if(entry.assetId){const img=document.createElement('img');img.src=assetUrl(entry.assetId);img.alt='';img.loading='lazy';img.decoding='async';node.append(img);}
        else if(entry.text)node.textContent=entry.text;
      }
      layers[type].append(node);
      created.push(node);
    }
  }
  renderEntries(scene.decorations,'decorations');
  renderEntries(characters,'characters');
  renderEntries(scene.objects,'objects');
  renderEntries(scene.navigation,'navigation');
  return {background,layers,created,destroy(){disposed=true;layerRoot.remove();background.remove();}};
}

export function validateSceneConfig(scene,knownAssets=()=>true) {
  const errors=[];const ids=new Set();
  if(!Number.isFinite(scene.size?.width)||!Number.isFinite(scene.size?.height)||scene.size.width<=0||scene.size.height<=0)errors.push('Dimensiones del escenario inválidas');
  if(!knownAssets(scene.backgroundId)) errors.push('Fondo no registrado');
  if(scene.backgroundFallbackId && !knownAssets(scene.backgroundFallbackId)) errors.push('Fondo de respaldo no registrado');
  for(const entry of [...(scene.navigation||[]),...(scene.objects||[]),...(scene.decorations||[])]) {
    if(!entry.id || ids.has(entry.id))errors.push(`ID de objeto duplicado: ${entry.id}`);
    ids.add(entry.id);
    if(!Number.isFinite(entry.x)||!Number.isFinite(entry.y)||entry.x<0||entry.x>100||entry.y<0||entry.y>100)errors.push(`Coordenadas inválidas: ${entry.id}`);
    if(entry.assetId && !knownAssets(entry.assetId))errors.push(`Recurso no registrado: ${entry.id}`);
  }
  return errors;
}
