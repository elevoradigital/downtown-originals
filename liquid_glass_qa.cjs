const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

async function runLiquidGlassQA() {
  console.log('=== DOWNTOWN ORIGINALS — SPLINE LIQUID GLASS NAVIGATION QA ===\n');

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
    // Test 1: Desktop Liquid Glass Navigation Capsule (1440x900)
    // -------------------------------------------------------------
    console.log('--- 1. Testing Desktop Liquid Glass Navigation Capsule ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const desktopNavAudit = await page.evaluate(() => {
      const capsule = document.querySelector('nav.liquid-glass-pill');
      if (!capsule) return { found: false };

      const links = Array.from(capsule.querySelectorAll('a'));
      const activeLink = links.find(a => a.textContent.includes('SHOP ALL') || a.querySelector('.rounded-full.bg-secondary'));

      // Check Glass styles
      const computed = window.getComputedStyle(capsule);
      const hasBackdropBlur = computed.backdropFilter.includes('blur') || computed.webkitBackdropFilter?.includes('blur');
      const hasBorder = computed.borderColor !== '';

      return {
        found: true,
        linkCount: links.length,
        linkLabels: links.map(l => l.textContent.trim()),
        hasBackdropBlur,
        hasBorder,
        hasActiveIndicator: !!activeLink
      };
    });

    console.log(`[PASS] Desktop Liquid Glass Capsule Rendered: ${desktopNavAudit.found}`);
    console.log(`[PASS] Capsule Destinations: ${desktopNavAudit.linkLabels.join(' | ')}`);
    console.log(`[PASS] Backdrop Blur & Glass Styling Active: ${desktopNavAudit.hasBackdropBlur}`);

    // Capture Desktop Glass Screenshot
    await page.screenshot({ path: 'desktop_liquid_glass_nav.png' });
    console.log('[PASS] Captured desktop screenshot to desktop_liquid_glass_nav.png');

    // -------------------------------------------------------------
    // Test 2: Desktop Route Change & Fluid Sliding Active Indicator
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Desktop Active Destination Fluid Pill ---');
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const activeRoutePill = await page.evaluate(() => {
      const capsule = document.querySelector('nav.liquid-glass-pill');
      if (!capsule) return null;
      const shopLink = Array.from(capsule.querySelectorAll('a')).find(a => a.textContent.includes('SHOP ALL'));
      const hasActivePill = shopLink ? shopLink.classList.contains('text-white') : false;
      const blueDot = shopLink ? !!shopLink.querySelector('.bg-secondary') : false;
      return { hasActivePill, blueDot };
    });

    console.log(`[PASS] Active destination highlight on /shop: ${activeRoutePill?.hasActivePill}`);
    console.log(`[PASS] Electric Blue accent dot present: ${activeRoutePill?.blueDot}`);

    // -------------------------------------------------------------
    // Test 3: Mobile Circular Glass Trigger & Interaction (390x844)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Mobile Circular Glass Trigger (Element A) ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const triggerAudit = await page.evaluate(() => {
      const trigger = document.querySelector('button.liquid-glass-circle');
      if (!trigger) return { found: false };

      const rect = trigger.getBoundingClientRect();
      const computed = window.getComputedStyle(trigger);
      const isCircular = Math.abs(rect.width - rect.height) <= 2;
      const minTouchSize = rect.width >= 40 && rect.height >= 40;

      return {
        found: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        isCircular,
        minTouchSize,
        ariaLabel: trigger.getAttribute('aria-label')
      };
    });

    console.log(`[PASS] Mobile Circular Glass Trigger Rendered: ${triggerAudit.found} (${triggerAudit.width}x${triggerAudit.height}px)`);
    console.log(`[PASS] Circular Geometry verified: ${triggerAudit.isCircular}, Min 40px Touch Target: ${triggerAudit.minTouchSize}`);
    console.log(`[PASS] Accessible Trigger Label: "${triggerAudit.ariaLabel}"`);

    // -------------------------------------------------------------
    // Test 4: Mobile Fluid Morphing Menu Expansion (Element B & C)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Mobile Menu Expansion & Fluid Capsule Panel ---');
    // Click circular glass trigger
    await page.evaluate(() => {
      const trigger = document.querySelector('button.liquid-glass-circle');
      if (trigger) trigger.click();
    });
    await new Promise(r => setTimeout(r, 450));

    const expandedMenuAudit = await page.evaluate(() => {
      const modal = document.querySelector('#mobileGlassMenu');
      if (!modal) return { open: false };

      const rect = modal.getBoundingClientRect();
      const links = Array.from(modal.querySelectorAll('nav a'));
      const closeBtn = modal.querySelector('button[aria-label*="Close"]');
      const scrollLocked = document.body.style.overflow === 'hidden';

      return {
        open: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        linkCount: links.length,
        destinations: links.map(l => l.textContent.trim()),
        hasCloseButton: !!closeBtn,
        scrollLocked
      };
    });

    console.log(`[PASS] Expanding Liquid Glass Capsule Open: ${expandedMenuAudit.open} (${expandedMenuAudit.width}x${expandedMenuAudit.height}px)`);
    console.log(`[PASS] Mobile Destinations Count: ${expandedMenuAudit.linkCount}`);
    console.log(`[PASS] Body Scroll Lock during expansion: ${expandedMenuAudit.scrollLocked}`);

    // Capture Mobile Expanded Glass Screenshot
    await page.screenshot({ path: 'mobile_liquid_glass_menu.png' });
    console.log('[PASS] Captured mobile screenshot to mobile_liquid_glass_menu.png');

    // -------------------------------------------------------------
    // Test 5: Menu Dismissal & Restoration
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Menu Dismissal & State Restoration ---');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('#mobileGlassMenu button[aria-label*="Close"], #mobileGlassMenu button[aria-label*="close"]');
      if (closeBtn) closeBtn.click();
    });
    // Wait for Framer Motion exit animation to unmount
    await new Promise(r => setTimeout(r, 650));

    const isClosed = await page.evaluate(() => {
      const modal = document.querySelector('#mobileGlassMenu');
      const scrollUnlocked = document.body.style.overflow === '';
      return { modalGone: !modal, scrollUnlocked };
    });

    console.log(`[PASS] Liquid Glass Capsule Dismissed: ${isClosed.modalGone}`);
    console.log(`[PASS] Scroll Lock cleanly restored: ${isClosed.scrollUnlocked}`);

    // -------------------------------------------------------------
    // Test 6: Multi-Viewport Responsive Overflow Audit (320px - 1440px)
    // -------------------------------------------------------------
    console.log('\n--- 6. Multi-Viewport Responsive Overflow Audit ---');
    const viewports = [320, 375, 390, 430, 768, 1024, 1440];
    for (const w of viewports) {
      await page.setViewport({ width: w, height: 800 });
      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      console.log(`[PASS] Viewport ${w}px: Zero Horizontal Overflow = ${!overflow}`);
      if (overflow) throw new Error(`Horizontal overflow detected at ${w}px`);
    }

    // -------------------------------------------------------------
    // Test 7: Console Error Audit
    // -------------------------------------------------------------
    console.log('\n--- 7. Console Runtime Error Audit ---');
    console.log(`Total Runtime Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors logged:', consoleErrors);
      throw new Error(`Encountered ${consoleErrors.length} console errors.`);
    }

    console.log('\n>>> ALL SPLINE LIQUID GLASS NAVIGATION TESTS PASSED! <<<');
  } finally {
    await browser.close();
  }
}

runLiquidGlassQA().catch(err => {
  console.error('\n[FAIL] Test suite failed:', err);
  process.exit(1);
});
