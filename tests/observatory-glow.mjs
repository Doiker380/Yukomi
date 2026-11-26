import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { OBSERVATORY_GLOWS } from '../js/data/observatory-glows.js';
import { mountPaintedSceneGlow, attachPaintedGlow } from '../js/world/painted-glow.js';
import { memoriesAt } from '../js/data/memories.js';

assert.deepEqual(OBSERVATORY_GLOWS.map(g=>g.id),['camino','telescopio','carta']);
assert(OBSERVATORY_GLOWS.every(g=>g.color && g.path.length > 30));
assert(OBSERVATORY_GLOWS.find(g=>g.id==='telescopio').transform);

class Node {
  constructor(tag) {
    this.tagName=tag;this.attrs={};this.children=[];this.classes=[];this.properties={};
    this.classList={add:cls=>this.classes.push(cls)};
    this.style={setProperty:(key,value)=>{this.properties[key]=value}};
  }
  setAttribute(k,v){this.attrs[k]=v;}
  append(node){this.children.push(node);}
}
const previous=globalThis.document;
globalThis.document={createElementNS:(_ns,tag)=>new Node(tag)};
try {
  const stage=new Node('div');
  assert.equal(mountPaintedSceneGlow(stage,OBSERVATORY_GLOWS),3);
  const svg=stage.children[0];
  assert(svg.classes.includes('scene-painted-glow-layer'));
  assert.equal(svg.attrs.viewBox,'0 0 1800 1000');
  assert.equal(svg.attrs['aria-hidden'],'true');
  assert.equal(svg.children.length,3);
  assert(svg.children.every(g=>g.children.length===2));
  assert(svg.children.every(g=>g.children.every(p=>p.attrs.fill==='none')));
  assert(svg.children.every(g=>g.children[0].attrs.d===g.children[1].attrs.d));
  assert.equal(svg.children[1].attrs.transform,OBSERVATORY_GLOWS[1].transform);
  const frame=new Node('button');
  const poster={viewBox:'0 0 160 175',path:'M 9 157 L 42 25 L 152 32 L 131 164 Z'};
  assert.equal(attachPaintedGlow(frame,poster),true);
  assert(frame.classes.includes('has-painted-glow'));
  assert.equal(mountPaintedSceneGlow(stage,[]),0);
} finally {globalThis.document=previous;}

const scene=readFileSync(new URL('../js/scenes/observatory.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../css/painted-glow.css',import.meta.url),'utf8');
assert(scene.includes('mountPaintedSceneGlow(world.stage, OBSERVATORY_GLOWS)'));
assert(scene.includes("world.on('camino'"));
assert(scene.includes("world.on('telescopio'"));
assert(scene.includes("world.on('carta'"));
assert(!scene.includes("world.on('celebracion'"));
assert(scene.includes("anchorsFor('yukobservatorio')"));
assert(scene.includes("viewBox:'0 0 160 175'"));
assert(memoriesAt('yukobservatorio','recuerdo').some(m=>m.id==='postal-estelar'));
assert(css.includes('.scene-painted-glow-layer'));
assert(css.includes('pointer-events:none'));
assert(css.includes('.observatory-fallback .scene-painted-glow-layer {display:none;}'));
console.log('OK Yukobservatorio: tres brillos del escenario + postal, acciones y recuerdo intactos.');
