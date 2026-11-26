/**
 * Personajes originales de Yuko y del usuario. SOLO se registran sus nombres.
 * Ninguna aparición, relación, imagen, historia o diálogo se inventa aquí.
 * Para activar uno, añade su imagen y un registro en CHARACTER_PLACEMENTS.
 */
export const CHARACTER_REGISTRY = Object.freeze({
  demian: { name:'Demian', image:null, description:null, assetId:null },
  aokari: { name:'Aokari', image:null, description:null, assetId:null },
  andy: { name:'Andy', image:null, description:null, assetId:null },
  nixie: { name:'Nixie', image:null, description:null, assetId:null },
  suki: { name:'Suki', image:null, description:null, assetId:null }
});

// Futuras apariciones. "pair" es un identificador compartido OPCIONAL
// para mostrar dos personajes juntos sin alterar ninguna misión de región.
export const CHARACTER_PLACEMENTS = [
  // { id:'demian-en-plaza', character:'demian', region:'yukopolis', x:55, y:72,
  //   message:'Diálogo aprobado', pair:'demian-aokari' },
  // { id:'aokari-en-plaza', character:'aokari', region:'yukopolis', x:59, y:72,
  //   message:'Diálogo aprobado', pair:'demian-aokari' },
];

/** Adaptador del registro de personajes al motor de extras existente. */
export function getCharacterAddons(regionId) {
  return CHARACTER_PLACEMENTS.filter(p=>p.region===regionId && p.enabled!==false).flatMap(p=>{
    const data = CHARACTER_REGISTRY[p.character];
    if (!data || !data.image || !p.id || !Number.isFinite(p.x) || !Number.isFinite(p.y)) return [];
    return [{id:p.id,kind:'character',image:data.image,x:p.x,y:p.y,label:data.name,message:p.message||'',dialogue:p.dialogue||[],scale:p.scale??1}];
  });
}

/** Para el nuevo sistema de capas. Las apariciones son OPCIONALES.
 * Las antiguas getCharacterAddons siguen disponibles para otras regiones.
 * El personaje no aparece si no tiene recurso, posición o está deshabilitado.
 */
export function getCharacterLayerEntries(regionId) {
  return CHARACTER_PLACEMENTS.filter(p=>p.region===regionId && p.enabled!==false).flatMap(p=>{
    const character=CHARACTER_REGISTRY[p.character];
    const assetId=p.assetId??character?.assetId;
    if(!character || !p.id || !assetId || !Number.isFinite(p.x)||!Number.isFinite(p.y))return [];
    return [{id:p.id,kind:'character',label:character.name,assetId,x:p.x,y:p.y,scale:p.scale??1,
      action: p.dialogue ? {type:'dialogue',lines:p.dialogue} : {type:'message',title:character.name,text:p.message||''}}];
  });
}
