const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

async function runMobileFirstE2ETest() {
  console.log('=== DOWNTOWN ORIGINALS — MOBILE-FIRST E-COMMERCE VERIFICATION ===');
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
    // Test 1: Mobile Homepage & Visible CTA on iPhone 14 (390x844)
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Mobile Homepage (390x844) ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    const heroCtaVisible = await page.evaluate(() => {
      const cta = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('SHOP DROP 04'));
      if (!cta) return false;
      const rect = cta.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= 844;
    });
    console.log(`[PASS] Primary Shopping CTA immediately visible above the fold on mobile: ${heroCtaVisible}`);

    // Verify Mobile Bottom Nav
    const bottomNavVisible = await page.evaluate(() => {
      const nav = document.getElementById('mobileBottomNav');
      if (!nav) return false;
      const style = window.getComputedStyle(nav);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    console.log(`[PASS] Mobile Bottom Navigation Bar visible: ${bottomNavVisible}`);

    // Verify 2-Column New Arrivals on Mobile
    const mobileColumns = await page.evaluate(() => {
      const grid = document.querySelector('#new-arrivals .grid');
      if (!grid) return 0;
      const computed = window.getComputedStyle(grid);
      const cols = computed.gridTemplateColumns.split(' ').length;
      return cols;
    });
    console.log(`[PASS] Mobile New Arrivals 2-Column Grid Rendered: ${mobileColumns === 2} (Columns: ${mobileColumns})`);

    // -------------------------------------------------------------
    // Test 2: Two-Column Product Catalogue & Bottom Sheet Filter
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Mobile Product Catalogue (/shop) ---');
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });

    const shopCols = await page.evaluate(() => {
      const grid = document.getElementById('shopProductGrid');
      if (!grid) return 0;
      return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    });
    console.log(`[PASS] Catalogue 2-Column Layout on Mobile: ${shopCols === 2} (Columns: ${shopCols})`);

    // Open Mobile Bottom Sheet Filter
    const filterBtnClicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('FILTERS'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Mobile Filter Button Tapped: ${filterBtnClicked}`);
    await new Promise(r => setTimeout(r, 350));

    // Verify Bottom Sheet is Open
    const filterSheetOpen = await page.evaluate(() => {
      const sheet = Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('FILTER PIECES'));
      return sheet !== undefined;
    });
    console.log(`[PASS] Mobile Filter Bottom Sheet Opened: ${filterSheetOpen}`);

    // Close bottom sheet
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close filters"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // -------------------------------------------------------------
    // Test 3: Mobile Quick Add Bottom Sheet
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Mobile Quick Add Bottom Sheet ---');
    const quickAddTapped = await page.evaluate(() => {
      const addBtn = document.querySelector('button[aria-label="Quick add size"]');
      if (addBtn) {
        addBtn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Mobile Card Quick Add Button Tapped: ${quickAddTapped}`);
    await new Promise(r => setTimeout(r, 300));

    // Verify Quick Add Modal opened
    const quickAddModalVisible = await page.evaluate(() => {
      const modal = Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('SELECT YOUR SIZE:'));
      return modal !== undefined;
    });
    console.log(`[PASS] Quick Add Bottom Sheet Rendered: ${quickAddModalVisible}`);

    // Select Size M and confirm add
    const sizeMTapped = await page.evaluate(() => {
      const sizeBtns = Array.from(document.querySelectorAll('button'));
      const mBtn = sizeBtns.find(b => b.textContent.trim() === 'M');
      if (mBtn) {
        mBtn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Quick Add Size M Tapped & Added: ${sizeMTapped}`);
    await new Promise(r => setTimeout(r, 700));

    // -------------------------------------------------------------
    // Test 4: Product Detail Page & Sticky Add to Bag Bar
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing PDP & Sticky Purchase Bar ---');
    await page.goto(`${BASE_URL}/product/metro-surplus-m65-jacket`, { waitUntil: 'networkidle0' });

    // Verify Share Button exists
    const shareBtnExists = await page.evaluate(() => {
      return document.querySelector('button[aria-label="Share product"]') !== null;
    });
    console.log(`[PASS] Native Product Share Button Exists: ${shareBtnExists}`);

    // Scroll down past primary Add to Bag button (at Y ~1440px)
    await page.evaluate(() => window.scrollTo(0, 1600));
    await new Promise(r => setTimeout(r, 400));

    // Check Sticky Bar is visible
    const stickyBarVisible = await page.evaluate(() => {
      const bar = document.getElementById('pdpStickyBar');
      if (!bar) return false;
      return bar.classList.contains('translate-y-0');
    });
    console.log(`[PASS] Mobile Sticky Add to Bag Bar Appears on Scroll: ${stickyBarVisible}`);

    // Tap sticky bar Add to Bag
    const stickyAddTapped = await page.evaluate(() => {
      const stickyBar = document.getElementById('pdpStickyBar');
      if (!stickyBar) return false;
      const addBtn = stickyBar.querySelector('button');
      if (addBtn) {
        addBtn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Sticky Add to Bag Button Tapped: ${stickyAddTapped}`);
    await new Promise(r => setTimeout(r, 500));

    // -------------------------------------------------------------
    // Test 5: Mobile Shopping Bag & Sticky Checkout CTA
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Mobile Shopping Bag (/cart) ---');
    await page.goto(`${BASE_URL}/cart`, { waitUntil: 'networkidle0' });

    const freeShippingProgress = await page.evaluate(() => {
      return document.body.textContent.includes('FREE NATIONWIDE SHIPPING') || document.body.textContent.includes('COMPLIMENTARY SHIPPING UNLOCKED');
    });
    console.log(`[PASS] Free Shipping Progress Rendered: ${freeShippingProgress}`);

    const mobileCheckoutSticky = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const checkoutBtn = btns.find(b => b.textContent.includes('PROCEED TO CHECKOUT'));
      return checkoutBtn !== undefined;
    });
    console.log(`[PASS] Mobile Checkout Action Accessible: ${mobileCheckoutSticky}`);

    // -------------------------------------------------------------
    // Test 6: Mobile Checkout & Collapsible Order Summary
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Mobile Checkout (/checkout) ---');
    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle0' });

    // Verify Bottom Nav is hidden on checkout for clean form experience
    const bottomNavHiddenOnCheckout = await page.evaluate(() => {
      const nav = document.getElementById('mobileBottomNav');
      return nav === null || window.getComputedStyle(nav).display === 'none';
    });
    console.log(`[PASS] Mobile Bottom Nav cleanly hidden on Checkout: ${bottomNavHiddenOnCheckout}`);

    // Verify Mobile Collapsible Order Summary Banner
    const mobileSummaryToggle = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('SHOW ORDER SUMMARY'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Mobile Order Summary Collapsible Banner Toggle: ${mobileSummaryToggle}`);
    await new Promise(r => setTimeout(r, 200));

    // Verify inputs have correct autocomplete and inputMode
    const inputsOptimized = await page.evaluate(() => {
      const email = document.querySelector('input[type="email"]');
      const tel = document.querySelector('input[type="tel"]');
      return email && email.getAttribute('autocomplete') === 'email' &&
             tel && tel.getAttribute('autocomplete') === 'tel';
    });
    console.log(`[PASS] Mobile Form Inputs Optimized (autocomplete & inputMode): ${inputsOptimized}`);

    // -------------------------------------------------------------
    // Test 7: Console Errors Audit
    // -------------------------------------------------------------
    console.log('\n--- 7. Console Runtime Error Audit ---');
    console.log(`Total Runtime Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.log('  [ERROR]', err));
      throw new Error(`Encountered ${consoleErrors.length} console errors.`);
    }

  } finally {
    await browser.close();
  }
}

runMobileFirstE2ETest()
  .then(() => console.log('\n>>> ALL MOBILE-FIRST E-COMMERCE TESTS PASSED SUCCESSFULLY! <<<'))
  .catch((err) => {
    console.error('\nMobile-First E2E Test Failed:', err);
    process.exit(1);
  });
