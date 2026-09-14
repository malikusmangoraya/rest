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
    return { src: v.getAttribute('src'), playing: v.readyState >= 3, loop: v.loop, muted: v.muted };
  });
  out.videoLength = await page.evaluate(() => {
    const v = document.querySelector('.hero-video');
    return v ? { ready: v.readyState, network: v.networkState, duration: v.duration } : null;
  });

  out.realCar = await page.evaluate(() => {
    const c = document.querySelector('.real-car');
    return { src: c.getAttribute('src'), anim: getComputedStyle(c).animationName, w: c.naturalWidth, h: c.naturalHeight };
  });
  out.roadAnim = await page.evaluate(() => {
    const r = document.querySelector('.real-road');
    return r ? getComputedStyle(r).animationName : 'MISSING';
  });

  out.heroImages = await page.evaluate(() => {
    const host = location.host;
    return Array.from(document.images).map((i) => {
      const u = new URL(i.src, location.href);
      return { local: u.host === host, src: u.pathname.split('/').pop(), ok: i.complete && i.naturalWidth > 0 };
    });
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