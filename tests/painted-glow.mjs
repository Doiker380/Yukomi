import assert from 'node:assert/strict';
import { MEMORY_ANCHORS } from '../js/data/memory-anchors.js';
import { memoriesAt } from '../js/data/memories.js';
import { attachPaintedGlow } from '../js/world/painted-glow.js';
import { readFileSync } from 'node:fs';

const anchor = MEMORY_ANCHORS.yukoteca.find(a=>a.id==='marco');
assert(anchor && anchor.painted);
assert.deepEqual([anchor.x,anchor.y],[13.8,74]);
assert(anchor.glow?.path);
assert(memoriesAt('yukoteca','marco').some(m=>m.id==='postal-estelar'));

class Node {
  constructor(tag) {this.tagName=tag;this.attrs={};this.children=[];this.classes=[];
    this.classList={add:(name)=>this.classes.push(name)};
    this.style={setProperty:(key,value)=>this[key]=value};}
  setAttribute(key,value){this.attrs[key]=value;}
  append(child){this.children.push(child);}
}
const oldDocument=globalThis.document;
globalThis.document={createElementNS:(ns,tag)=>new Node(tag)};
try {
  const button=new Node('button');
  assert.equal(attachPaintedGlow(button,anchor.glow),true);
  assert(button.classes.includes('has-painted-glow'));
  assert.equal(button.children.length,1);
  const svg=button.children[0];
  assert.equal(svg.tagName,'svg');
  assert.equal(svg.attrs.viewBox,anchor.glow.viewBox);
  assert.equal(svg.attrs['aria-hidden'],'true');
  assert.equal(svg.children.length,2);
  assert(svg.children.every(p=>p.attrs.d===anchor.glow.path));
  assert.equal(attachPaintedGlow(new Node('button'),null),false);
} finally {globalThis.document=oldDocument;}

const css=readFileSync(new URL('../css/painted-glow.css',import.meta.url),'utf8');
const libraryCss=readFileSync(new URL('../css/library.css',import.meta.url),'utf8');
assert(css.includes('.painted-glow-aura') && css.includes('.painted-glow-edge'));
assert(css.includes('outline: none'));
assert(!libraryCss.includes('border:3px solid #f7cc74'));
console.log('OK: Yukoteca conserva el recuerdo y usa trazo SVG sin borde rectangular.');
