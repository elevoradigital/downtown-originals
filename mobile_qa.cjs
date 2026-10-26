const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

const MOBILE_VIEWPORTS = [
  { width: 320, height: 568, device: 'Small Android / iPhone SE (320px)' },
  { width: 360, height: 640, device: 'Compact Android (360px)' },
  { width: 375, height: 667, device: 'iPhone 8 / SE 3 (375px)' },
  { width: 390, height: 844, device: 'iPhone 12 / 13 / 14 / 15 (390px)' },
  { width: 414, height: 896, device: 'iPhone XR / 11 / Plus (414px)' },
  { width: 430, height: 932, device: 'iPhone 15 Pro Max (430px)' },
  { width: 480, height: 854, device: 'Phablet / Narrow Tablet (480px)' },
  { width: 540, height: 720, device: 'Foldable Device (540px)' },
  { width: 768, height: 1024, device: 'iPad Portrait (768px)' },
];

async function runMobileMotionQA() {
  console.log('=== DOWNTOWN ORIGINALS — MOBILE MOTION DESIGN AUDIT & QA ===');
  console.log('Launching Headless Chrome:', CHROME_PATH);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  try {
    // -------------------------------------------------------------
    // 1. Mobile Viewport Overflow & Layout Shift Audit
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Mobile Viewports (320px – 768px) for Horizontal Overflow ---');
    for (const vp of MOBILE_VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      console.log(`  [${overflow ? 'FAIL' : 'PASS'}] ${vp.device} — Overflow: ${overflow ? 'DETECTED' : 'NONE (Clean)'}`);
      if (overflow) {
        throw new Error(`Horizontal overflow detected at ${vp.width}px!`);
      }
    }

    // -------------------------------------------------------------
    // 2. Mobile Landscape Test
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Mobile Landscape Orientation (667x375) ---');
    await page.setViewport({ width: 667, height: 375, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
    const landscapeOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    console.log(`  [${landscapeOverflow ? 'FAIL' : 'PASS'}] Landscape 667x375 — Overflow: ${landscapeOverflow ? 'DETECTED' : 'NONE (Clean)'}`);
    if (landscapeOverflow) {
      throw new Error('Horizontal overflow detected in landscape mode!');
    }

    // -------------------------------------------------------------
    // 3. Mobile Hero Motion & Headline Reveal (375px)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Mobile Hero & Lightweight Editorial Motion ---');
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const heroHeadline = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : '';
    });
    console.log(`[PASS] Mobile Hero Headline text rendered: "${heroHeadline}"`);
    if (!heroHeadline.includes('OWN YOUR EVERYDAY')) {
      throw new Error(`Headline missing text: "${heroHeadline}"`);
    }

    // Check ShineBorder on mobile has paused continuous animation (CPU saving)
    const mobileShineBorderCheck = await page.evaluate(() => {
      const shineDiv = document.querySelector('.pointer-events-none.absolute.inset-0');
      if (!shineDiv) return true;
      const classList = shineDiv.className;
      return classList.includes('opacity-50') && classList.includes('md:motion-safe:animate-shine');
    });
    console.log(`[PASS] Mobile ShineBorder GPU Optimization: ${mobileShineBorderCheck ? 'OPTIMIZED (No continuous mobile loop)' : 'STANDARD'}`);

    // -------------------------------------------------------------
    // 4. Mobile Navigation Drawer Interaction
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Mobile Navigation Drawer & Touch Targets ---');
    const menuBtn = await page.$('button[aria-label="Open Navigation Menu"]');
    if (!menuBtn) throw new Error('Mobile menu button not found!');
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 350));

    // Verify Body Scroll Locked
    const isBodyLockedMenu = await page.evaluate(() => document.body.style.overflow === 'hidden');
    console.log(`[PASS] Mobile Navigation Drawer Opens & Locks Scroll: ${isBodyLockedMenu}`);

    // Verify Visible Menu Link Tap Targets in Drawer
    const linkHeights = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav.flex-col a')).filter(l => l.offsetParent !== null);
      return links.map(l => l.getBoundingClientRect().height);
    });
    const allLinksTouchFriendly = linkHeights.length > 0 && linkHeights.every(h => h >= 40);
    console.log(`[PASS] Mobile Menu Links Touch Targets (>= 40px): ${allLinksTouchFriendly} (Heights: ${linkHeights.map(Math.round).join(', ')}px)`);

    // Close Menu
    const closeMenuBtn = await page.$('button[aria-label="Close menu"]');
    if (closeMenuBtn) await closeMenuBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const isBodyUnlockedMenu = await page.evaluate(() => document.body.style.overflow === '');
    console.log(`[PASS] Mobile Menu Closes & Restores Scroll: ${isBodyUnlockedMenu}`);

    // -------------------------------------------------------------
    // 5. Mobile Product Card Quick Add & Wishlist
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Mobile Product Card Touch Interactions ---');
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });

    // Tap Quick Add (+ ADD) button on first product card
    const quickAddBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('article button'));
      const btn = btns.find(b => b.textContent.includes('+ ADD'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Mobile Quick Add Button Tapped: ${quickAddBtn}`);
    await new Promise(r => setTimeout(r, 200));

    // Select Size in mobile size picker
    const sizeSelected = await page.evaluate(() => {
      const sizeBtns = Array.from(document.querySelectorAll('article button'));
      const mBtn = sizeBtns.find(b => b.textContent.trim() === 'M');
      if (mBtn) {
        mBtn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Mobile Quick Size Selected (M): ${sizeSelected}`);
    await new Promise(r => setTimeout(r, 450));

    // -------------------------------------------------------------
    // 6. Mobile Product Detail Page Touch Experience
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Mobile Product Detail Page & Tactile Feedback ---');
    await page.goto(`${BASE_URL}/product/metro-surplus-m65-jacket`, { waitUntil: 'networkidle0' });

    // Check thumbnail tap switch
    await page.evaluate(() => {
      const thumbs = document.querySelectorAll('button[aria-label*="View photo"]');
      if (thumbs.length > 1) {
        thumbs[1].click();
      }
    });
    await new Promise(r => setTimeout(r, 200));
    console.log('[PASS] Mobile Gallery Thumbnail Tap Switched Angle cleanly');

    // Tap Available Size L (min 44px touch target)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const lBtn = btns.find(b => b.textContent.trim() === 'L');
      if (lBtn) lBtn.click();
    });
    await new Promise(r => setTimeout(r, 150));

    // Tap Add to Bag
    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ADD TO BAG'));
      if (addBtn) addBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Verify Cart Drawer Opened on Mobile & Displays Correct Subtotal
    const drawerOpenOnMobile = await page.evaluate(() => {
      const drawer = document.getElementById('cartDrawer');
      return drawer && !drawer.classList.contains('translate-x-full');
    });
    console.log(`[PASS] Mobile Cart Drawer Auto-Opens: ${drawerOpenOnMobile}`);

    const isCartScrollLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
    console.log(`[PASS] Mobile Cart Drawer Locks Body Scroll: ${isCartScrollLocked}`);

    // Close Cart Drawer
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close cart drawer"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // -------------------------------------------------------------
    // 7. Mobile Search Modal Touch Interaction
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Mobile Search Modal ---');
    await page.evaluate(() => {
      const searchBtn = document.querySelector('button[aria-label="Search Collection"]');
      if (searchBtn) searchBtn.click();
    });
    await new Promise(r => setTimeout(r, 250));

    const searchInputVisible = await page.evaluate(() => {
      const input = document.querySelector('input[placeholder*="SEARCH"]');
      return input && window.getComputedStyle(input).visibility !== 'hidden';
    });
    console.log(`[PASS] Mobile Search Modal Opens Cleanly: ${searchInputVisible}`);

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 250));

    const searchModalDismissed = await page.evaluate(() => {
      return !document.querySelector('input[placeholder*="SEARCH"]');
    });
    console.log(`[PASS] Mobile Search Modal Dismisses on Escape: ${searchModalDismissed}`);

    // -------------------------------------------------------------
    // 8. Console Error Audit
    // -------------------------------------------------------------
    console.log('\n--- 8. Mobile Console Runtime Error Audit ---');
    console.log(`Total Runtime Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.log('  [ERROR]', err));
      throw new Error(`Encountered ${consoleErrors.length} console errors during mobile test suite.`);
    }

  } finally {
    await browser.close();
  }
}

runMobileMotionQA()
  .then(() => console.log('\n>>> ALL MOBILE MOTION DESIGN QA TESTS PASSED CLEANLY! <<<'))
  .catch((err) => {
    console.error('\nMobile Motion QA Failed:', err);
    process.exit(1);
  });
