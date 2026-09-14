const { chromium } = require('playwright');
const path = require('path');

const html = `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:#0b1220;display:flex;align-items:center;justify-content:center;font-family:Poppins,Arial,sans-serif;">
  <div style="position:relative;width:1200px;height:630px;overflow:hidden;">
    <div style="position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(255,215,106,0.35),transparent 70%);left:-80px;top:-100px;"></div>
    <div style="position:absolute;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(52,211,153,0.25),transparent 70%);right:-120px;bottom:-140px;"></div>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#ffd76a,#b8860b);display:flex;align-items:center;justify-content:center;margin-bottom:22px;">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M3 17 L7 14 L12 16 L17 12 L21 14 V20 H3 Z" fill="#0b1220"/><circle cx="17" cy="8" r="2.6" stroke="#0b1220" stroke-width="1.6"/><path d="M4 8 L10 8" stroke="#0b1220" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/></svg>
      </div>
      <div style="color:#f8fafc;font-weight:800;font-size:72px;letter-spacing:-1px;line-height:1.05;">
        Velon<span style="color:#ffd76a;">Drive</span>
      </div>
      <div style="color:#fde8ab;font-weight:600;font-size:30px;margin-top:14px;letter-spacing:4px;text-transform:uppercase;">Luxury Cars · Dubai</div>
      <div style="color:#94a3b8;font-size:22px;margin-top:18px;letter-spacing:2px;">Hypercars · Electric Flagships · Concierge</div>
    </div>
  </div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, 'public', 'og.jpg'), type: 'jpeg', quality: 88 });
  console.log('og.jpg written');
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });