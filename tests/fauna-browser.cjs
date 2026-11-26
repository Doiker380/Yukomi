// PLAYWRIGHT_MODULE can point to an external installation; no runtime dependency.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const out=process.env.YUKO_TEST_OUTPUT || 'test-results';fs.mkdirSync(out,{recursive:true});
const base=process.env.YUKO_TEST_URL || 'http://localhost:8000';
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
 for(const [name,viewport] of [['desktop',{width:1440,height:1050}],['mobile',{width:390,height:844}],['small',{width:360,height:740}]]){
  const p=await browser.newPage({viewport,hasTouch:name!=='desktop',isMobile:name!=='desktop',reducedMotion:'reduce'});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400 && !r.url().includes('favicon')) errors.push(`${r.status()} ${r.url()}`)});
  const enter=async()=>{await p.goto(base);await p.locator('#skipButton').click();await p.locator('[data-region="yukofauna"]').click();await p.locator('#visitButton').click();await p.locator('.fauna-penguin img').waitFor();await p.locator('#faunaStageClose').click();};
  const click=async(selector)=>{const el=p.locator(selector);await el.scrollIntoViewIfNeeded();if(name==='desktop')await el.click();else await el.tap();};
  const obj=id=>`[data-object="${id}"]`;
  const found=async(id)=>{await p.waitForFunction(key=>JSON.parse(localStorage.getItem('yukoverso_progress_v1')).discoveries.includes(`yukofauna:${key}`),id);};
  await enter();
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.locator('.fauna-explorer').scrollIntoViewIfNeeded();
  await p.screenshot({path:`${out}/${name}-laguna.png`,fullPage:true});
  for(const id of ['pinguino','buho','gato','flores','pez1','pez2','pez3']){
   const box=await p.locator(obj(id)).boundingBox();assert(box.width>=43.8 && box.height>=43.8,`${name}: target ${id} ${JSON.stringify(box)}`);
  }
  await click(obj('pinguino'));assert.match(await p.locator('#faunaResponseText').textContent(),/tres pececitos/);
  for(const id of ['pez1','pez2','pez3']){await click(obj(id));await p.waitForTimeout(620);}
  await found('pinguino');assert.equal(await p.locator('.fauna-fish:visible').count(),0);
  await click('[data-fauna-zone="bosque"]');await click(obj('buho'));
  await p.locator(obj('buhocarta')).waitFor({state:'visible'});await click(obj('buhocarta'));await found('buho');
  await click('[data-fauna-zone="jardin"]');await click(obj('gato'));
  for(let i=0;i<3;i++)await click(obj('ovillo'));await found('gato');
  await click(obj('flores'));for(let i=0;i<3;i++)await click(obj('flornota'));await found('flores');
  await click('#faunaTimeButton');await click(obj('estrella'));await found('estrella');
  assert.equal(await p.locator('#faunaCount').textContent(),'5/5');
  await p.locator('#faunaStageClose').click();await click('[data-fauna-zone="bosque"]');
  await p.screenshot({path:`${out}/${name}-noche.png`,fullPage:true});
  await click('#faunaTimeButton');
  assert.equal(await p.locator('[data-memory-anchor="yukofauna:cuadro"]').count(),0,'No debe aparecer la imagen provisional');
  const before=await p.locator('.fauna-scene').evaluate(e=>e.style.transform);await click('#faunaZoomIn');
  assert.notEqual(await p.locator('.fauna-scene').evaluate(e=>e.style.transform),before);
  await click(obj('gato'));assert.match(await p.locator('#faunaResponseText').textContent(),/ovillo/);
  await click('#faunaZoomReset');await click('[data-fauna-zone="jardin"]');
  await p.locator('#faunaStageClose').click();
  await p.screenshot({path:`${out}/${name}-jardin.png`,fullPage:true});
  await enter();assert.equal(await p.locator('#faunaCount').textContent(),'5/5');
  await click('#faunaRestartFish');assert.equal(await p.locator('.fauna-fish:visible').count(),3);
  assert.equal(await p.locator('#faunaCount').textContent(),'5/5');
  await p.locator(obj('pinguino')).focus();await p.keyboard.press('Enter');
  assert.match(await p.locator('#faunaResponseText').textContent(),/tres pececitos/);
  assert.equal(await p.locator(obj('pinguino')).evaluate(e=>getComputedStyle(e,'::before').animationName),'none');
  assert.equal(await p.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.offsetParent && (!i.complete||!i.naturalWidth)).length),0);
  assert.deepEqual(errors,[]);console.log(`PASS ${name}: five missions, memory, zoom, keyboard, persistence, replay, 44px targets, no overflow/load errors`);
  await p.close();
 }
 // Broken optional art must leave a usable background and SVG characters.
 const p=await browser.newPage();await p.route('**/assets/objects/yukofauna/**',r=>r.abort());await p.route('**/santuario_ilustrado_v1.webp',r=>r.abort());
 await p.goto(base);await p.locator('#skipButton').click();await p.locator('[data-region="yukofauna"]').click();await p.locator('#visitButton').click();
 await p.waitForFunction(()=>document.querySelector('.fauna-landscape')?.src.endsWith('santuario.svg'));
 assert.equal(await p.locator('.fauna-penguin svg').count(),1);await p.close();console.log('PASS fallback background and character');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
