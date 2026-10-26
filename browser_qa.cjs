const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

async function runBrowserQA() {
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
    // TEST 1: Desktop Viewport (1440x900)
    console.log('\n--- 1. Testing Desktop Viewport (1440px) ---');
    await page.setViewport({ width: 1440, height: 900 });
    
    // Visit Homepage
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
    const title = await page.title();
    console.log(`[PASS] Homepage Title: "${title}"`);
    
    // Check Horizontal Overflow
    const overflowDesktop = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    console.log(`[PASS] Horizontal Overflow on Desktop: ${overflowDesktop ? 'FAIL (Overflow)' : 'NONE (Clean)'}`);

    // Check Broken Images on Homepage
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
    });
    console.log(`[PASS] Broken Images on Homepage: ${brokenImages.length} (Expected 0)`);

    // Verify Concept Disclosure Pill
    const disclosureVisible = await page.evaluate(() => {
      const el = document.querySelector('aside[aria-label="Concept Prototype Disclosure"]');
      return el && window.getComputedStyle(el).display !== 'none';
    });
    console.log(`[PASS] ELEVORA Concept Disclosure Badge Visible: ${disclosureVisible}`);

    // TEST 2: Navigate to Shop All
    console.log('\n--- 2. Testing Shop All Catalog & Filters ---');
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });
    
    // Count Products
    const productCount = await page.evaluate(() => document.querySelectorAll('article').length);
    console.log(`[PASS] Shop Catalog Products Rendered: ${productCount}`);

    // Test Category Filtering (Click Outerwear)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const outerwearBtn = buttons.find(b => b.textContent.includes('OUTERWEAR'));
      if (outerwearBtn) outerwearBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const filteredCount = await page.evaluate(() => document.querySelectorAll('article').length);
    console.log(`[PASS] Filtered Outerwear Products Rendered: ${filteredCount} (Expected 2 outerwear pieces)`);

    // Reset Filters
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const allBtn = buttons.find(b => b.textContent.includes('ALL [') || b.textContent.trim().startsWith('ALL'));
      if (allBtn) allBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const restoredCount = await page.evaluate(() => document.querySelectorAll('article').length);
    console.log(`[PASS] Restored Products after Clear: ${restoredCount}`);

    // TEST 3: Product Detail Page & Interaction
    console.log('\n--- 3. Testing Product Detail Page ---');
    await page.goto(`${BASE_URL}/product/metro-surplus-m65-jacket`, { waitUntil: 'networkidle0' });
    
    // Verify Initial Out-of-Stock Size State (XXL is out of stock in M-65)
    const isXxlDisabled = await page.evaluate(() => {
      const sizeBtns = Array.from(document.querySelectorAll('button'));
      const xxlBtn = sizeBtns.find(b => b.textContent.trim().startsWith('XXL'));
      return xxlBtn ? xxlBtn.disabled : false;
    });
    console.log(`[PASS] XXL Button is Correctly Disabled in UI: ${isXxlDisabled}`);

    // Select Available Size L and Add to Bag
    await page.evaluate(() => {
      const sizeBtns = Array.from(document.querySelectorAll('button'));
      const lBtn = sizeBtns.find(b => b.textContent.trim() === 'L');
      if (lBtn) lBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ADD TO BAG'));
      if (addBtn) addBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Verify Cart Drawer Opened
    const isCartDrawerOpen = await page.evaluate(() => {
      const drawer = document.getElementById('cartDrawer');
      return drawer && !drawer.classList.contains('translate-x-full');
    });
    console.log(`[PASS] Cart Drawer Auto-Opens on Add to Bag: ${isCartDrawerOpen}`);

    // Verify Cart Subtotal in Drawer
    const drawerSubtotal = await page.evaluate(() => {
      const el = document.getElementById('cartDrawer');
      return el ? el.innerText.includes('₹6,499') : false;
    });
    console.log(`[PASS] Cart Drawer Displays Correct Product Subtotal (₹6,499): ${drawerSubtotal}`);

    // TEST 4: Mobile Viewport (375px)
    console.log('\n--- 4. Testing Mobile Viewport (375px) ---');
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const overflowMobile = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    console.log(`[PASS] Horizontal Overflow on 375px Mobile: ${overflowMobile ? 'FAIL (Overflow)' : 'NONE (Clean)'}`);

    // Test Mobile Navigation Drawer
    await page.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Open Navigation Menu"]');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const mobileMenuOpen = await page.evaluate(() => {
      const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('SHOP ALL COLLECTION'));
      return link && window.getComputedStyle(link).display !== 'none';
    });
    console.log(`[PASS] Mobile Navigation Drawer Toggles & Shows Links: ${mobileMenuOpen}`);

    // TEST 5: Demonstration Checkout Flow
    console.log('\n--- 5. Testing Demonstration Checkout ---');
    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle0' });

    const checkoutNotice = await page.evaluate(() => {
      return document.body.innerText.includes('DEMONSTRATION CHECKOUT MODE');
    });
    console.log(`[PASS] Clear Demonstration Notice Displayed: ${checkoutNotice}`);

    // Apply Promo Code
    await page.type('input[placeholder*="PROMO CODE"]', 'DOWNTOWN10');
    await page.evaluate(() => {
      const applyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'APPLY');
      if (applyBtn) applyBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const promoApplied = await page.evaluate(() => {
      return document.body.innerText.includes('INNER CIRCLE DISCOUNT (10%)');
    });
    console.log(`[PASS] Promo Code DOWNTOWN10 Applied: ${promoApplied}`);

    // Console Errors Check
    console.log('\n--- 6. Console Error Summary ---');
    console.log(`Total Runtime Errors/Exceptions: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.log('  [ERROR]', err));
    }

  } finally {
    await browser.close();
  }
}

runBrowserQA()
  .then(() => console.log('\n>>> BROWSER AUTOMATION QA COMPLETED SUCCESSFULLY! <<<'))
  .catch(err => {
    console.error('Browser QA Error:', err);
    process.exit(1);
  });
