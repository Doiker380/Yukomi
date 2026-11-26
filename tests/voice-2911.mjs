import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { OBSERVATORY, CINEMA } from '../js/data/experience-content.js';
import { MEMORIES, validateMemories } from '../js/data/memories.js';
import { CITY_MAIL } from '../js/data/city-content.js';
import { FAUNA_TEXT } from '../js/data/fauna-content.js';
import { LIBRARY_ALBUMS } from '../js/data/library-content.js';
import { REGIONS } from '../js/map.js';
const root=resolve(import.meta.dirname,'..');
const load=rel=>readFileSync(resolve(root,rel),'utf8');
function assert(test, msg){if(!test) throw new Error(msg);}
assert(OBSERVATORY.letter.paragraphs.length>=5,'Carta demasiado corta');
assert(OBSERVATORY.letter.paragraphs.every(p=>p.length>50),'Hay párrafos vacíos');
assert(!JSON.stringify(OBSERVATORY).includes('[PENDIENTE]'),'Carta o experiencia pendiente');
assert(JSON.stringify(OBSERVATORY).includes('200 horas'),'Falta recuerdo de llamada');
assert(JSON.stringify(OBSERVATORY).includes('Demian')&&JSON.stringify(OBSERVATORY).includes('Aokari'),'Faltan personajes auténticos');
assert(OBSERVATORY.letter.paragraphs.some(p=>p.includes('te tengo muchísimo cariño')),'Falta cariño en la carta');
assert(OBSERVATORY.extraLetterUrl === '', 'Enlace extra futuro no debe inventarse');
const obs=load('js/scenes/observatory.js');
assert(obs.includes('addExtraLetterLink(body)'), 'No está preparado el botón extra en el observatorio');
assert(obs.includes("if (!href) return"), 'El enlace debe ocultarse si no hay URL');
assert(load('carta_yuko.html').includes('extraLetterUrl'), 'La carta independiente no usa el enlace extra');
assert(MEMORIES.filter(m=>m.id.startsWith('foto-')).length===24,'Deben mantenerse las 24 fotos');
assert(MEMORIES.filter(m=>m.id.startsWith('captura-skin-')).length===19,'Deben mantenerse las 19 capturas');
assert(MEMORIES.filter(m=>!m.id.startsWith('clip-') && m.id!=='marco-captura-2026-05-01').length===51, 'Conservar los 51 recuerdos anteriores');
assert(MEMORIES.some(m=>m.id==='marco-captura-2026-05-01'), 'Falta la captura elegida para el marco');
assert(MEMORIES.filter(m=>m.id.startsWith('clip-')).length===73, 'Deben aparecer los 73 clips nuevos');
assert(REGIONS.length===5, 'Se perdieron regiones');
assert(LIBRARY_ALBUMS.length===2, 'Se perdieron álbumes');
assert(CITY_MAIL.length===3, 'Se perdieron sobres');
assert(FAUNA_TEXT.labels.sceneTitle.trim()==='Yukofauna','El escenario cambió de nombre');
assert(validateMemories().length===0,'Catálogo inconsistente');
for(const rel of ['js/data/experience-content.js','js/data/city-content.js','js/data/fauna-content.js','js/data/memories.js']){
  const txt=load(rel);
  assert(!/Qué locura|qué locura|Qué goood/.test(txt),'No usa la expresión del usuario en '+rel);
}
assert(existsSync(resolve(root,'COMO_PONER_CARTA_EXTRA_2_9_11.md')),'Falta guía de carta');
console.log('OK voz 2.9.11: carta, mensajes, 43 imágenes, 5 regiones y enlace futuro preparado.');
