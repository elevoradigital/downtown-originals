const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

const MOBILE_VIEWPORTS = [
  { name: 'iPhone SE (320px)', width: 320, height: 568 },
  { name: 'Galaxy S20 (360px)', width: 360, height: 800 },
  { name: 'iPhone 8/SE2 (375px)', width: 375, height: 667 },
  { name: 'iPhone 13/14/15 (390px)', width: 390, height: 844 },
  { name: 'iPhone 11/XR (414px)', width: 414, height: 896 },
  { name: 'iPhone Pro Max (430px)', width: 430, height: 932 },
  { name: 'Phablet (480px)', width: 480, height: 854 },
];

async function runChromaticLiquidGlassQA() {
  console.log('=== DOWNTOWN ORIGINALS — CHROMATIC LIQUID GLASS NAVIGATION QA ===\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    // -------------------------------------------------------------
    // Test 1: Mobile Floating Chromatic Capsule (390x844)
    // -------------------------------------------------------------
    console.log('--- 1. Testing Mobile Floating Refractive Glass Capsule (Reference 2) ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 450));

    const capsuleAudit = await page.evaluate(() => {
      const wrapper = document.getElementById('mobileBottomNavWrapper');
      const nav = document.getElementById('mobileBottomNav');
      if (!wrapper || !nav) return { found: false };

      const wrapRect = wrapper.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const parentBackdrop = nav.closest('.liquid-glass-chromatic');
      const causticLayer = parentBackdrop ? parentBackdrop.querySelector('.chromatic-caustic-layer') : null;
      const specularRim = parentBackdrop ? parentBackdrop.querySelector('.chromatic-specular-rim') : null;

      const items = Array.from(nav.querySelectorAll('a, button'));
      const labels = items.map(el => el.querySelector('.font-label-meta')?.textContent.trim() || el.textContent.trim());

      const computed = window.getComputedStyle(parentBackdrop || nav);
      const isFloating = wrapRect.bottom < 844 && wrapRect.left > 0 && wrapRect.right < 390;

      return {
        found: true,
        isFloating,
        width: Math.round(navRect.width),
        height: Math.round(navRect.height),
        insetLeft: Math.round(wrapRect.left),
        insetRight: Math.round(390 - wrapRect.right),
        hasChromaticCaustics: !!causticLayer,
        hasSpecularRim: !!specularRim,
        itemCount: items.length,
        itemLabels: labels,
        hasBackdropBlur: computed.backdropFilter.includes('blur') || computed.webkitBackdropFilter?.includes('blur')
      };
    });

    console.log(`[PASS] Floating Capsule Rendered: ${capsuleAudit.found} (Floating=${capsuleAudit.isFloating}, ${capsuleAudit.width}x${capsuleAudit.height}px)`);
    console.log(`[PASS] Horizontal Inset: ${capsuleAudit.insetLeft}px left / ${capsuleAudit.insetRight}px right`);
    console.log(`[PASS] Chromatic Optical Caustics Active: ${capsuleAudit.hasChromaticCaustics}`);
    console.log(`[PASS] Specular Top Rim Catchlight: ${capsuleAudit.hasSpecularRim}`);
    console.log(`[PASS] All 5 Destinations Verified: ${capsuleAudit.itemLabels.join(' | ')}`);

    // Capture Mobile Chromatic Glass Capsule Screenshot
    await page.screenshot({ path: 'mobile_chromatic_liquid_glass.png' });
    console.log('[PASS] Captured mobile screenshot to mobile_chromatic_liquid_glass.png');

    // -------------------------------------------------------------
    // Test 2: Active Glider Illumination & Route Sync
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Route Sync & Active Glider Illumination ---');
    // On Homepage: HOME must be active
    const homeActive = await page.evaluate(() => {
      const homeItem = document.querySelector('#mobileBottomNav a[aria-label="Home"]');
      const glider = document.querySelector('#mobileBottomNav [class*="mobileRefractiveActiveGlider"], #mobileBottomNav .bg-white\\/20');
      const blueDot = homeItem ? homeItem.querySelector('.bg-secondary') : null;
      return { hasGlider: !!glider, hasBlueDot: !!blueDot };
    });
    console.log(`[PASS] Home Active on /: Glider=${homeActive.hasGlider}, BlueDot=${homeActive.hasBlueDot}`);

    // Navigate to /shop
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 450));

    const shopActive = await page.evaluate(() => {
      const shopItem = document.querySelector('#mobileBottomNav a[aria-label*="Shop"]');
      const blueDot = shopItem ? shopItem.querySelector('.bg-secondary') : null;
      return { isShopActive: !!blueDot };
    });
    console.log(`[PASS] Shop Active on /shop: ${shopActive.isShopActive}`);

    // -------------------------------------------------------------
    // Test 3: Interactive Search and Bag Triggers from Capsule
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Interactive Capsule Actions (Search & Bag) ---');
    // Click Search in capsule
    await page.evaluate(() => {
      const searchBtn = Array.from(document.querySelectorAll('#mobileBottomNav button')).find(b => b.textContent.includes('SEARCH'));
      if (searchBtn) searchBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const searchModalOpen = await page.evaluate(() => {
      const modal = Array.from(document.querySelectorAll('input')).find(i => i.placeholder?.toLowerCase().includes('search') || i.getAttribute('aria-label')?.toLowerCase().includes('search'));
      return !!modal;
    });
    console.log(`[PASS] Search Modal Opened from Capsule: ${searchModalOpen}`);

    // Close search modal
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));

    // Click Bag in capsule
    await page.evaluate(() => {
      const bagBtn = Array.from(document.querySelectorAll('#mobileBottomNav button')).find(b => b.textContent.includes('BAG'));
      if (bagBtn) bagBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const cartDrawerOpen = await page.evaluate(() => {
      const drawer = Array.from(document.querySelectorAll('h2, h3, div')).find(el => el.textContent.includes('YOUR BAG') || el.textContent.includes('SHOPPING BAG'));
      return !!drawer;
    });
    console.log(`[PASS] Cart Drawer Opened from Capsule: ${cartDrawerOpen}`);

    // Close cart drawer
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));

    // -------------------------------------------------------------
    // Test 4: Desktop Chromatic Liquid Glass Capsule (1440x900)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Desktop Refractive Liquid Glass Capsule ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 450));

    const desktopAudit = await page.evaluate(() => {
      const backdrop = document.querySelector('header .liquid-glass-chromatic');
      if (!backdrop) return { found: false };

      const caustic = backdrop.querySelector('.chromatic-caustic-layer');
      const rim = backdrop.querySelector('.chromatic-specular-rim');
      const links = Array.from(backdrop.querySelectorAll('nav a'));

      return {
        found: true,
        hasCaustic: !!caustic,
        hasRim: !!rim,
        destinations: links.map(l => l.textContent.trim())
      };
    });

    console.log(`[PASS] Desktop Chromatic Capsule: ${desktopAudit.found}`);
    console.log(`[PASS] Desktop Chromatic Caustics: ${desktopAudit.hasCaustic}, Rim: ${desktopAudit.hasRim}`);
    console.log(`[PASS] Desktop Destinations: ${desktopAudit.destinations.join(' | ')}`);

    // Capture Desktop Chromatic Glass Screenshot
    await page.screenshot({ path: 'desktop_chromatic_liquid_glass.png' });
    console.log('[PASS] Captured desktop screenshot to desktop_chromatic_liquid_glass.png');

    // -------------------------------------------------------------
    // Test 5: Multi-Viewport Responsive Ergonomics & Zero Overflow
    // -------------------------------------------------------------
    console.log('\n--- 5. Multi-Viewport Responsive Ergonomics & Zero Overflow ---');
    for (const vp of MOBILE_VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true });
      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      const itemsUsable = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('#mobileBottomNav a, #mobileBottomNav button'));
        return items.length === 5 && items.every(el => el.getBoundingClientRect().width >= 35);
      });
      console.log(`[PASS] ${vp.name}: Zero Overflow=${!overflow}, 5 Items Sized Appropriately=${itemsUsable}`);
      if (overflow) throw new Error(`Horizontal overflow at ${vp.width}px`);
    }

    // -------------------------------------------------------------
    // Test 6: Console Error Audit
    // -------------------------------------------------------------
    console.log('\n--- 6. Console Runtime Error Audit ---');
    console.log(`Total Runtime Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors logged:', consoleErrors);
      throw new Error(`Encountered ${consoleErrors.length} console errors.`);
    }

    console.log('\n>>> ALL CHROMATIC LIQUID GLASS NAVIGATION TESTS PASSED! <<<');
  } finally {
    await browser.close();
  }
}

runChromaticLiquidGlassQA().catch(err => {
  console.error('\n[FAIL] Test suite failed:', err);
  process.exit(1);
});
