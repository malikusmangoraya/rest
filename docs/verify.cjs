const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const url = process.argv[2] || 'http://localhost:4174';
  const consoleIssues = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleIssues.push(m.text()); });
  page.on('pageerror', (e) => consoleIssues.push('PAGEERROR: ' + e.message));

  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);

  const report = {};

  // 1. Animated hero present
  report.h1 = (await page.locator('h1').first().innerText()).replace(/\n/g, ' ');
  report.svgCar = await page.locator('svg[aria-label]').count();
  report.wheelsAnimated = await page.evaluate(() => {
    const w = document.querySelector('.car-wheel');
    return w ? getComputedStyle(w).animationName : 'none';
  });
  report.speedLines = await page.locator('.speed-line').count();
  report.marquee = await page.locator('.marquee-track').count();

  // 2. Images loaded (no broken)
  report.brokenImages = await page.evaluate(() => {
    return Array.from(document.images).filter((img) => img.complete && img.naturalWidth === 0).map((i) => i.getAttribute('alt'));
  });

  // 3. Featured vehicles from live API (backend running → 8 cards)
  await page.waitForTimeout(500);
  report.tiltCards = await page.locator('article.tilt-card').count();

  // 4. Scroll-triggered stat counters
  await page.locator('section[aria-label="Hero"]').evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(2000);
  report.counterText = await page.locator('section[aria-label="Hero"] .text-3xl').first().innerText();

  // 5. Footer
  await page.locator('footer[aria-label="Site footer"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  report.footerColumns = await page.locator('footer[aria-label="Site footer"] nav').count();
  report.footerNewsletter = await page.locator('#newsletter-email:visible').count();
  report.footerStatus = (await page.locator('footer[aria-label="Site footer"]').innerText()).includes('99.99% Operational');

  // 6. Test-drive booking form → POST /api/vehicles/test-drive
  report.formVisible = await page.locator('#test-drive form').isVisible();
  report.consoleIssues = consoleIssues;

  console.log(JSON.stringify(report, null, 2));

  await page.locator('.shimmer-text').screenshot({ path: path.join(__dirname, 'hero-snippet.png') });
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });