const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }));
  await page.waitForTimeout(600);
  const info = await page.evaluate(() => {
    const scrollBadge = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('scroll'));
    const badgeWrap = scrollBadge ? scrollBadge.parentElement : null;
    const bar = document.querySelector('.bg-surface-2');
    const barFill = bar ? bar.firstElementChild : null;
    return {
      badgeStyle: badgeWrap ? badgeWrap.getAttribute('style') : null,
      barFillStyle: barFill ? barFill.getAttribute('style') : null,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
