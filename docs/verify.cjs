const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const url = process.argv[2] || 'http://localhost:4174';
  const errs = [];
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));

  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(4500);

  const out = {};
  out.title = await page.title();
  out.h1 = (await page.locator('h1').first().innerText()).replace(/\n/g, ' ');

  out.video = await page.evaluate(() => {
    const v = document.querySelector('.hero-video');
    if (!v) return 'MISSING';
    return { src: v.getAttribute('src'), playing: v.readyState >= 3, loop: v.loop, muted: v.muted, duration: v.duration };
  });

  out.depthLayers = await page.evaluate(() => {
    const layers = [];
    const d2 = document.querySelector('.hero-depth-2');
    if (d2) layers.push({ name: 'showroom', src: d2.getAttribute('src'), od: getComputedStyle(d2).transform });
    const scene = document.querySelector('.hero-3d-scene');
    if (scene) layers.push({ name: 'scene', transformStyle: getComputedStyle(scene).transformStyle });
    const content = document.querySelector('.hero-3d-content');
    if (content) layers.push({ name: 'content', transformStyle: getComputedStyle(content).transformStyle });
    return layers;
  });

  out.realCar = await page.evaluate(() => {
    const c = document.querySelector('.real-car');
    return { src: c.getAttribute('src'), anim: getComputedStyle(c).animationName, w: c.naturalWidth };
  });
  out.roadAnim = await page.evaluate(() => {
    const r = document.querySelector('.real-road');
    return r ? getComputedStyle(r).animationName : 'MISSING';
  });

  out.heroImages = await page.evaluate(() => {
    const host = location.host;
    const imgs = Array.from(document.images).map((i) => {
      const u = new URL(i.src, location.href);
      return { local: u.host === host, src: u.pathname.split('/').pop(), ok: i.complete && i.naturalWidth > 0 };
    });
    const unique = {};
    imgs.forEach((i) => { if (!unique[i.src]) unique[i.src] = i; });
    return Object.values(unique);
  });
  out.externalImageRequests = await page.evaluate(() => {
    const host = location.host;
    return performance.getEntriesByType('resource').filter((r) => r.initiatorType === 'img' && !r.name.includes(host)).map((r) => r.name);
  });
  out.inventoryCards = await page.locator('article.tilt-card').count();
  out.consoleErrors = errs;
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });