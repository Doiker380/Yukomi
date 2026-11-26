import assert from 'node:assert/strict';
import {MEMORIES, memoriesAt, getMemory} from '../js/data/memories.js';
const expectation={
 'yukopolis:museo':['foto-02','foto-08','foto-10','foto-14','foto-22','captura-skin-01','captura-skin-02','captura-skin-03'],
 'yukopolis:computadora':['foto-04','foto-07','foto-11','foto-15','foto-16','foto-18','foto-23'],
 'yukobservatorio:recuerdo':['foto-01','foto-09','foto-21']
};
for(const [location,ids] of Object.entries(expectation)){
 const [region,object]=location.split(':');
 const shown=memoriesAt(region,object);
 for(const id of ids){
   assert(shown.some(m=>m.id===id),`Falta ${id} en ${location}`);
   const m=getMemory(id);
   assert(m.locations.some(p=>p.region==='yukoteca' && p.object==='fotos'),`${id} ya no está en Yukoteca`);
   assert.equal(MEMORIES.filter(m=>m.id===id).length,1,`${id} se duplicó`);
 }
 assert(!shown.some((m,i)=>m.demo && shown.slice(i+1).some(n=>!n.demo)),`Demostraciones delante de fotos reales: ${location}`);
}
assert.equal(MEMORIES.filter(m=>m.type==='image' && (m.id.startsWith('foto-') || m.id.startsWith('captura-skin-'))).length,43);
console.log('OK fotos 2.9.9: 43 fotos únicas, 18 enlaces secundarios y orden con fotos reales primero.');
