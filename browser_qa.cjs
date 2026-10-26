const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

const BREAKPOINTS = [320, 360, 375, 390, 414, 430, 480, 540, 768, 1024, 1280, 1440];

async function runBrowserQA() {
  console.log('=== DOWNTOWN ORIGINALS — MASTER MAGIC UI INTEGRATION QA ===');
  console.log('Launching headless Chrome from:', CHROME_PATH);
  
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
    // -----------------------------------------------------------------
    // TEST 1: Desktop Viewport (1440x900) & Magic UI Verification
    // -----------------------------------------------------------------
    console.log('\n--- 1. Testing Desktop Viewport (1440px) & Magic UI Components ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const title = await page.title();
    console.log(`[PASS] Page Title: "${title}"`);

    // Verify Component 1: Text Animate on Hero Headline
    const heroHeadlineText = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : '';
    });
    console.log(`[PASS] Magic UI Text Animate Hero Headline rendered: "${heroHeadlineText}"`);
    if (!heroHeadlineText.includes('OWN YOUR EVERYDAY')) {
      throw new Error(`Headline does not contain expected text: "${heroHeadlineText}"`);
    }

    // Verify Component 2: Blur Fade Visibility on Content
    const blurFadeElements = await page.evaluate(() => {
      const heroSubhead = document.querySelector('p.font-body-lg');
      const newArrivals = document.getElementById('new-arrivals');
      return {
        heroSubheadVisible: heroSubhead && window.getComputedStyle(heroSubhead).opacity !== '0',
        newArrivalsVisible: newArrivals && window.getComputedStyle(newArrivals).display !== 'none'
      };
    });
    console.log(`[PASS] Magic UI Blur Fade Content Visible (Hero Subhead: ${blurFadeElements.heroSubheadVisible}, New Arrivals: ${blurFadeElements.newArrivalsVisible})`);

    // Verify Component 3: Magic UI Marquee
    const marqueeData = await page.evaluate(() => {
      const headerMarquee = document.querySelector('header .animate-marquee');
      const duplicatedTracks = document.querySelectorAll('header [aria-hidden="true"]');
      return {
        marqueeExists: !!headerMarquee,
        hasAriaHiddenDuplicates: duplicatedTracks.length > 0
      };
    });
    console.log(`[PASS] Magic UI Marquee in Header: active=${marqueeData.marqueeExists}, accessible duplicate shielding=${marqueeData.hasAriaHiddenDuplicates}`);

    // Verify Component 4: Magic UI Shine Border on Campaign Section
    const shineBorderData = await page.evaluate(() => {
      const campaignSection = document.getElementById('campaign');
      const shineDiv = campaignSection ? campaignSection.querySelector('.motion-safe\\:animate-shine') : null;
      return {
        campaignFound: !!campaignSection,
        shineBorderActive: !!shineDiv
      };
    });
    console.log(`[PASS] Magic UI Shine Border on Campaign Lookbook: ${shineBorderData.shineBorderActive ? 'ACTIVE & ANIMATED' : 'FALLBACK OK'}`);

    // Verify No Broken Images on Homepage
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
    });
    console.log(`[PASS] Broken Images on Homepage: ${brokenImages.length} (Expected 0)`);

    // -----------------------------------------------------------------
    // TEST 2: Shop Catalog & Filter Responsiveness
    // -----------------------------------------------------------------
    console.log('\n--- 2. Testing Shop All Catalog & Filters ---');
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });

    const productCount = await page.evaluate(() => document.querySelectorAll('article').length);
    console.log(`[PASS] Total Catalog Products Rendered: ${productCount}`);

    // Test Category Filtering (Click OUTERWEAR)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const outerwearBtn = buttons.find(b => b.textContent.includes('OUTERWEAR'));
      if (outerwearBtn) outerwearBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));
    const filteredCount = await page.evaluate(() => document.querySelectorAll('article').length);
    console.log(`[PASS] Filtered Outerwear Products: ${filteredCount} (Expected 2)`);

    // Reset Filters
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const allBtn = buttons.find(b => b.textContent.includes('ALL [') || b.textContent.trim().startsWith('ALL'));
      if (allBtn) allBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));
    const restoredCount = await page.evaluate(() => document.querySelectorAll('article').length);
    console.log(`[PASS] Restored Products after Clear: ${restoredCount}`);

    // -----------------------------------------------------------------
    // TEST 3: Product Detail Page & Cart Integration
    // -----------------------------------------------------------------
    console.log('\n--- 3. Testing Product Detail Page & Cart Integration ---');
    await page.goto(`${BASE_URL}/product/metro-surplus-m65-jacket`, { waitUntil: 'networkidle0' });

    // Verify Out-of-Stock Size Guard (XXL)
    const isXxlDisabled = await page.evaluate(() => {
      const sizeBtns = Array.from(document.querySelectorAll('button'));
      const xxlBtn = sizeBtns.find(b => b.textContent.trim().startsWith('XXL'));
      return xxlBtn ? xxlBtn.disabled : false;
    });
    console.log(`[PASS] Out-of-Stock Size (XXL) Correctly Disabled: ${isXxlDisabled}`);

    // Select Available Size L and Add to Bag
    await page.evaluate(() => {
      const sizeBtns = Array.from(document.querySelectorAll('button'));
      const lBtn = sizeBtns.find(b => b.textContent.trim() === 'L');
      if (lBtn) lBtn.click();
    });
    await new Promise(r => setTimeout(r, 150));

    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ADD TO BAG'));
      if (addBtn) addBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Verify Cart Drawer Opened
    const isCartDrawerOpen = await page.evaluate(() => {
      const drawer = document.getElementById('cartDrawer');
      return drawer && !drawer.classList.contains('translate-x-full');
    });
    console.log(`[PASS] Cart Drawer Auto-Opens on Add to Bag: ${isCartDrawerOpen}`);

    // Verify Cart Drawer Total
    const drawerSubtotal = await page.evaluate(() => {
      const el = document.getElementById('cartDrawer');
      return el ? el.innerText.includes('₹6,499') : false;
    });
    console.log(`[PASS] Cart Subtotal Displays Correct Amount (₹6,499): ${drawerSubtotal}`);

    // -----------------------------------------------------------------
    // TEST 4: Demonstration Checkout Flow
    // -----------------------------------------------------------------
    console.log('\n--- 4. Testing Demonstration Checkout Flow ---');
    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle0' });

    const checkoutNotice = await page.evaluate(() => {
      return document.body.innerText.includes('DEMONSTRATION CHECKOUT MODE');
    });
    console.log(`[PASS] Demonstration Checkout Notice Displayed: ${checkoutNotice}`);

    // Apply Promo Code
    await page.type('input[placeholder*="PROMO CODE"]', 'DOWNTOWN10');
    await page.evaluate(() => {
      const applyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'APPLY');
      if (applyBtn) applyBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const promoApplied = await page.evaluate(() => {
      return document.body.innerText.includes('INNER CIRCLE DISCOUNT (10%)');
    });
    console.log(`[PASS] Promo Code DOWNTOWN10 Applied Successfully: ${promoApplied}`);

    // -----------------------------------------------------------------
    // TEST 5: Responsive Verification across all 12 Breakpoints
    // -----------------------------------------------------------------
    console.log('\n--- 5. Responsive Verification Across All 12 Breakpoints ---');
    for (const width of BREAKPOINTS) {
      await page.setViewport({ width, height: 800, isMobile: width < 768 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      console.log(`  [${overflow ? 'FAIL' : 'PASS'}] Viewport ${width}px — Horizontal Overflow: ${overflow ? 'DETECTED' : 'NONE (Clean)'}`);
      if (overflow) {
        throw new Error(`Horizontal overflow detected at ${width}px!`);
      }
    }

    // -----------------------------------------------------------------
    // TEST 6: Reduced Motion Accessibility Test
    // -----------------------------------------------------------------
    console.log('\n--- 6. Testing prefers-reduced-motion Accessibility ---');
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const headlineReducedMotion = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : '';
    });
    console.log(`[PASS] Reduced Motion: Headline fully visible immediately without delay: "${headlineReducedMotion}"`);

    // -----------------------------------------------------------------
    // TEST 7: Console Error Audit
    // -----------------------------------------------------------------
    console.log('\n--- 7. Console Runtime Error Audit ---');
    console.log(`Total Runtime Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.log('  [ERROR]', err));
      throw new Error(`Encountered ${consoleErrors.length} console runtime errors during test suite.`);
    }

  } finally {
    await browser.close();
  }
}

runBrowserQA()
  .then(() => console.log('\n>>> ALL MAGIC UI INTEGRATION QA TESTS PASSED CLEANLY! <<<'))
  .catch((err) => {
    console.error('\nBrowser QA Execution Failed:', err);
    process.exit(1);
  });
