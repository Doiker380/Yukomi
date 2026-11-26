const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const out=process.env.YUKO_TEST_OUTPUT || 'test-results';fs.mkdirSync(out,{recursive:true});
const base=process.env.YUKO_TEST_URL || 'http://localhost:8000';
(async()=>{const b=await chromium.launch({headless:true});try{
for(const [name,viewport] of [['desktop',{width:1440,height:1050}],['mobile',{width:390,height:844}],['small',{width:360,height:740}]]){
 const p=await b.newPage({viewport,isMobile:name!=='desktop',hasTouch:name!=='desktop',reducedMotion:'reduce'});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&!r.url().includes('favicon'))errors.push(`${r.status()} ${r.url()}`)});
 const enter=async(region)=>{await p.goto(base);await p.locator('#skipButton').click();await p.locator(`[data-region="${region}"]`).click();await p.locator('#visitButton').click();};
 const click=async selector=>{const el=p.locator(selector);await el.scrollIntoViewIfNeeded();if(name==='desktop')await el.click();else await el.tap();};
 const closeMessage=async()=>{if(await p.locator('.city-message-close').isVisible())await click('.city-message-close');};
 const found=async id=>assert(await p.evaluate(key=>JSON.parse(localStorage.getItem('yukoverso_progress_v1')).discoveries.includes(`yukopolis:${key}`),id));
 await enter('yukopolis');await p.locator('.city-plaza img').waitFor();
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.equal(await p.locator('video').count(),0);
 await p.screenshot({path:`${out}/${name}-plaza.png`,fullPage:true});
 for(const selector of ['.city-plaza','.city-calendar','.city-mail','.city-theater','[data-memory-anchor="yukopolis:museo"]','[data-memory-anchor="yukopolis:computadora"]']){
  const box=await p.locator(selector).boundingBox();assert(box.width>=43.8 && box.height>=43.8,`${name}: ${selector} target too small`);
 }
 await click('.city-plaza');await found('plaza');const first=await p.locator('.city-message-text').textContent();await click('.city-plaza');assert.notEqual(await p.locator('.city-message-text').textContent(),first);await closeMessage();
 await click('.city-calendar');assert.equal(await p.locator('.city-month').count(),12);
 for(let i=0;i<12;i++) {await click(`.city-month:nth-child(${i+1})`);assert.notEqual(await p.locator('.city-month-details p').textContent(),'');}
 await click('.city-month:nth-child(11)');await click('.city-festival');assert.match(await p.locator('.city-festival').textContent(),/Yukofelicidades/);await found('calendario');
 await p.screenshot({path:`${out}/${name}-calendario.png`,fullPage:true});await click('.city-popup-close');await closeMessage();
 await click('.city-mail');assert.equal(await p.locator('.city-envelope').count(),3);for(let i=0;i<3;i++)await click(`.city-envelope:nth-child(${i+1})`);assert.equal(await p.locator('.city-envelope.is-opened').count(),3);await found('correo');await click('.city-popup-close');await closeMessage();
 await click('.city-theater');assert.match(await p.locator('.city-message-text').textContent(),/telón/);await closeMessage();
 await click('[data-memory-anchor="yukopolis:museo"]');await found('partidas');assert.equal(await p.locator('.memory-list-dialog .memory-card').count(),4);
 await click('.memory-list-dialog [data-memory-id="ejemplo-minecraft"]');assert.match(await p.locator('.memory-dialog[open] .memory-title').textContent(),/Minecraft/);await click('.memory-dialog[open] .memory-close');
 await click('[data-memory-anchor="yukopolis:computadora"]');const video=p.locator('.memory-dialog[open] video');assert.equal(await video.count(),1);assert.equal(await video.evaluate(e=>e.autoplay),false);
 await video.evaluate(async e=>{await e.play()});await p.waitForTimeout(300);assert(await video.evaluate(e=>e.currentTime>0));await click('.memory-dialog[open] .memory-close');assert.equal(await p.locator('video').count(),0);
 assert.equal(await p.locator('.city-count').textContent(),'4/4');
 const before=await p.locator('.city-scene').evaluate(e=>e.style.transform);await click('.city-zoom [data-zoom="in"]');assert.notEqual(await p.locator('.city-scene').evaluate(e=>e.style.transform),before);
 await click('.city-mail');await click('.city-popup-close');await closeMessage();await click('.city-zoom [data-zoom="reset"]');
 await click('.city-tabs [data-focus="teatro"]');await p.screenshot({path:`${out}/${name}-teatro.png`,fullPage:true});
 await enter('yukopolis');assert.equal(await p.locator('.city-count').textContent(),'4/4');await p.locator('.city-plaza').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.city-message-dock').isVisible(),true);
 assert.equal(await p.locator('.city-calendar').evaluate(e=>getComputedStyle(e,'::before').animationName),'none');
 // Same memory/action, now attached to the frame already painted on the table.
 await enter('yukoteca');const frame=p.locator('[data-memory-anchor="yukoteca:marco"]');assert.equal(await frame.locator('img').count(),0);assert(await frame.evaluate(e=>e.classList.contains('scene-painted-hotspot')));
 await click('[data-memory-anchor="yukoteca:marco"]');assert.equal(await p.locator('.memory-dialog[open] .memory-title').textContent(),'Postal de las estrellas');await click('.memory-dialog[open] .memory-close');
 await frame.focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.memory-dialog[open]').count(),1);await click('.memory-dialog[open] .memory-close');
 const frameBox=await frame.boundingBox();assert(frameBox.width>=43.8&&frameBox.height>=43.8);
 await p.screenshot({path:`${out}/${name}-yukoteca-marco.png`,fullPage:true});
 assert.deepEqual(errors,[]);console.log(`PASS ${name}: 12 months, birthday, 3 letters, greeter, theater, 4 museum memories, video play/cleanup, zoom, reload, keyboard, 44px, Yukoteca frame action`);await p.close();
}
const p=await b.newPage();await p.route('**/capital_ilustrada_v1.webp',r=>r.abort());await p.route('**/habitante_v1.webp',r=>r.abort());await p.goto(base);await p.locator('#skipButton').click();await p.locator('[data-region="yukopolis"]').click();await p.locator('#visitButton').click();await p.waitForFunction(()=>document.querySelector('.city-landscape')?.src.endsWith('capital.svg'));assert.equal(await p.locator('.city-calendar .city-hotspot-symbol').evaluate(e=>getComputedStyle(e).visibility),'visible');await p.locator('.city-calendar').click();assert.equal(await p.locator('.city-popup[open]').count(),1);await p.close();console.log('PASS city fallback actions');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
