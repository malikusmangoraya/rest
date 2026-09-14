const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));
  await page.goto('https://malikusmangoraya.github.io/rest/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  const out = {
    title: await page.title(),
    h1: (await page.locator('h1').first().innerText()).replace(/\n/g, ' '),
    heroCar: await page.locator('.car-wheel').count() > 0,
    marquee: await page.locator('.marquee-track').count(),
    footer: await page.locator('footer[aria-label="Site footer"]').count(),
    navBrand: (await page.locator('nav[aria-label="Main navigation"]').innerText()).includes('VelonDrive'),
    faviconOk: (await page.locator('link[rel="icon"]').count()) > 0,
    pageErrors: errs,
  };
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });