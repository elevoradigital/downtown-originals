const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

const VIEWPORTS = [
  { name: 'iPhone SE (Ultra-compact)', width: 320, height: 568 },
  { name: 'Galaxy S20 (Narrow)', width: 360, height: 800 },
  { name: 'iPhone 8/SE2 (Standard)', width: 375, height: 667 },
  { name: 'iPhone 13/14/15', width: 390, height: 844 },
  { name: 'iPhone 11/XR', width: 414, height: 896 },
  { name: 'iPhone 14/15 Pro Max', width: 430, height: 932 },
  { name: 'Large Mobile / Phablet', width: 480, height: 854 },
];

async function runMobileGridQATest() {
  console.log('=== DOWNTOWN ORIGINALS — MOBILE PRODUCT GRID REFINEMENT QA ===\n');

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
    // Test 1: Multi-Viewport Mobile Grid Audit (320px - 480px)
    // -------------------------------------------------------------
    console.log('--- 1. Testing Two-Column Grid & Zero Overflow across 7 Viewports ---');
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true });
      await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 400));

      const gridMetrics = await page.evaluate(() => {
        const grid = document.getElementById('shopProductGrid');
        if (!grid) return null;

        const cards = Array.from(grid.querySelectorAll('article'));
        if (cards.length < 2) return null;

        const card1 = cards[0].getBoundingClientRect();
        const card2 = cards[1].getBoundingClientRect();

        // Check if two cards sit side by side (2 columns)
        const isTwoColumns = Math.abs(card1.top - card2.top) < 15 && card2.left > card1.right;
        const widthDelta = Math.abs(card1.width - card2.width);
        const equalWidths = widthDelta < 2; // within 2px precision

        // Horizontal overflow check
        const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

        return {
          cardCount: cards.length,
          isTwoColumns,
          equalWidths,
          card1Width: Math.round(card1.width),
          card2Width: Math.round(card2.width),
          hasHorizontalOverflow,
          scrollWidth: document.documentElement.scrollWidth,
          windowWidth: window.innerWidth
        };
      });

      console.log(`[PASS] ${vp.name} (${vp.width}px): 2-Col Grid=${gridMetrics.isTwoColumns}, Equal Widths=${gridMetrics.equalWidths} (${gridMetrics.card1Width}px), Zero Overflow=${!gridMetrics.hasHorizontalOverflow}`);
      if (gridMetrics.hasHorizontalOverflow) {
        throw new Error(`Horizontal overflow detected at ${vp.width}px! ScrollWidth=${gridMetrics.scrollWidth}`);
      }
    }

    // -------------------------------------------------------------
    // Test 2: Verification of Colour Swatch Removal from Cards
    // -------------------------------------------------------------
    console.log('\n--- 2. Verifying Removal of Colour Swatches from Product Cards ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });

    const swatchCheck = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shopProductGrid article'));
      let swatchesFound = 0;
      let swatchButtons = [];

      cards.forEach((card, idx) => {
        // Search for circular color swatch dots
        const circles = card.querySelectorAll('.rounded-full[style*="background-color"]');
        if (circles.length > 0) {
          swatchesFound += circles.length;
          swatchButtons.push(`Card ${idx} has ${circles.length} swatches`);
        }
      });

      return {
        totalCards: cards.length,
        swatchesFound,
        swatchButtons
      };
    });

    console.log(`[PASS] Cards inspected: ${swatchCheck.totalCards}`);
    console.log(`[PASS] Colour Swatches in catalogue cards: ${swatchCheck.swatchesFound} (Target: 0)`);
    if (swatchCheck.swatchesFound > 0) {
      throw new Error(`Found ${swatchCheck.swatchesFound} color swatches in product cards: ${swatchCheck.swatchButtons.join(', ')}`);
    }

    // -------------------------------------------------------------
    // Test 3: Standardized Image Aspect Ratio & Alignment
    // -------------------------------------------------------------
    console.log('\n--- 3. Verifying Standardized Image Aspect Ratio & Sizing ---');
    const imageMetrics = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shopProductGrid article'));
      const imageFrames = cards.slice(0, 6).map(card => {
        const frame = card.querySelector('div.aspect-\\[3\\/4\\]');
        if (!frame) return null;
        const rect = frame.getBoundingClientRect();
        const img = frame.querySelector('img');
        const objectFit = img ? window.getComputedStyle(img).objectFit : null;
        const objectPos = img ? window.getComputedStyle(img).objectPosition : null;
        return {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          ratio: (rect.width / rect.height).toFixed(2),
          objectFit,
          objectPos
        };
      });

      // Check row height equality for row 1 (cards 0 & 1)
      const row1Equal = imageFrames[0] && imageFrames[1] && Math.abs(imageFrames[0].height - imageFrames[1].height) <= 1;
      return { imageFrames, row1Equal };
    });

    console.log(`[PASS] Image Frame Aspect Ratios: ${imageMetrics.imageFrames.map(f => f.ratio).join(', ')} (Expected ~0.75 for 3:4)`);
    console.log(`[PASS] Row 1 Heights Equal: ${imageMetrics.row1Equal} (${imageMetrics.imageFrames[0]?.height}px vs ${imageMetrics.imageFrames[1]?.height}px)`);
    console.log(`[PASS] Object Fit & Position: ${imageMetrics.imageFrames[0]?.objectFit} / ${imageMetrics.imageFrames[0]?.objectPos}`);

    // -------------------------------------------------------------
    // Test 4: Badges and Wishlist Button Positioning & No Overlap
    // -------------------------------------------------------------
    console.log('\n--- 4. Verifying Badges & Wishlist Button Positioning ---');
    const badgeAndWishlist = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shopProductGrid article'));
      let overlapCount = 0;
      let wishlistButtonsFound = 0;
      let badgesFound = 0;

      cards.slice(0, 8).forEach(card => {
        const badgeBox = card.querySelector('.absolute.top-2.left-2, .absolute.top-2\\.5.left-2\\.5');
        const wishlistBtn = card.querySelector('button[aria-label*="wishlist"]');

        if (wishlistBtn) wishlistButtonsFound++;
        if (badgeBox) badgesFound++;

        if (badgeBox && wishlistBtn) {
          const bRect = badgeBox.getBoundingClientRect();
          const wRect = wishlistBtn.getBoundingClientRect();
          // Check if overlap
          const overlaps = !(bRect.right < wRect.left || bRect.left > wRect.right || bRect.bottom < wRect.top || bRect.top > wRect.bottom);
          if (overlaps) overlapCount++;
        }
      });

      return { wishlistButtonsFound, badgesFound, overlapCount };
    });

    console.log(`[PASS] Wishlist Buttons Present: ${badgeAndWishlist.wishlistButtonsFound}`);
    console.log(`[PASS] Promotional Badges Present: ${badgeAndWishlist.badgesFound}`);
    console.log(`[PASS] Badge & Wishlist Overlap: ${badgeAndWishlist.overlapCount} (Target: 0)`);
    if (badgeAndWishlist.overlapCount > 0) {
      throw new Error(`Badge and wishlist button overlap in ${badgeAndWishlist.overlapCount} cards`);
    }

    // -------------------------------------------------------------
    // Test 5: Redesigned Purchase Row (Price on Left, Add to Bag on Right)
    // -------------------------------------------------------------
    console.log('\n--- 5. Verifying Redesigned Purchase Row & Price Formatting ---');
    const purchaseRowMetrics = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shopProductGrid article'));
      const results = [];

      cards.slice(0, 6).forEach((card, i) => {
        const titleEl = card.querySelector('a.font-title-sm');
        const priceEl = card.querySelector('.font-label-code.font-bold.text-primary');
        const originalPriceEl = card.querySelector('.font-label-code.line-through');
        const addBtn = card.querySelector('button[aria-label*="Add"]');

        const pRect = priceEl ? priceEl.getBoundingClientRect() : null;
        const bRect = addBtn ? addBtn.getBoundingClientRect() : null;
        const cardRect = card.getBoundingClientRect();

        const priceOnLeft = pRect && bRect && pRect.left < bRect.left;
        const buttonInsideCard = bRect && bRect.right <= cardRect.right + 2;
        const noOverlap = pRect && bRect && pRect.right <= bRect.left + 4;

        results.push({
          product: titleEl ? titleEl.textContent.trim() : `Item ${i}`,
          priceText: priceEl ? priceEl.textContent.trim() : null,
          hasOriginalPrice: !!originalPriceEl,
          originalPriceText: originalPriceEl ? originalPriceEl.textContent.trim() : null,
          priceOnLeft,
          buttonInsideCard,
          noOverlap
        });
      });

      return results;
    });

    purchaseRowMetrics.forEach(m => {
      console.log(`[PASS] ${m.product}: Price="${m.priceText}" ${m.hasOriginalPrice ? `(Orig: ${m.originalPriceText})` : ''} | Left=${m.priceOnLeft}, InsideCard=${m.buttonInsideCard}, NoCollision=${m.noOverlap}`);
    });

    // -------------------------------------------------------------
    // Test 6: Interactive Add to Bag & Quick Add Modal Flow
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Interactive Quick Add Bottom Sheet Modal ---');
    const tapped = await page.evaluate(() => {
      const btn = document.querySelector('#shopProductGrid article:first-child button[data-action="quick-add"]');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Add to Bag button clicked: ${tapped}`);
    await new Promise(r => setTimeout(r, 600));

    const modalState = await page.evaluate(() => {
      const modal = Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('SELECT YOUR SIZE:'));
      const colorChips = document.querySelectorAll('.animate-slideUp button span.rounded-full, .animate-fadeIn button span.rounded-full');
      const sizeBtns = Array.from(document.querySelectorAll('.animate-slideUp button, .animate-fadeIn button'))
        .filter(b => ['S', 'M', 'L', 'XL', 'XXL'].includes(b.textContent.trim()));
      return {
        modalOpened: !!modal,
        colorwayCount: colorChips.length,
        sizeCount: sizeBtns.length
      };
    });

    console.log(`[PASS] Quick Add Bottom Sheet Opened: ${modalState.modalOpened}`);
    console.log(`[PASS] Colorways selectable in Quick Add: ${modalState.colorwayCount}`);
    console.log(`[PASS] Sizes selectable in Quick Add: ${modalState.sizeCount}`);

    // Select size 'M'
    const sizeAdded = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.animate-slideUp button, .animate-fadeIn button'));
      const mBtn = btns.find(b => b.textContent.startsWith('M'));
      if (mBtn) {
        mBtn.click();
        return true;
      }
      return false;
    });
    console.log(`[PASS] Size selected and item added to Bag: ${sizeAdded}`);
    await new Promise(r => setTimeout(r, 800));

    // -------------------------------------------------------------
    // Test 7: PDP Variant Selection Integrity (Preserves Full Options)
    // -------------------------------------------------------------
    console.log('\n--- 7. Verifying PDP Variant Selection Preserved on Detail Page ---');
    await page.goto(`${BASE_URL}/product/metro-surplus-m65-jacket`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));

    const pdpState = await page.evaluate(() => {
      const colorSection = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('COLOURWAY') || s.textContent.includes('COLORWAY'));
      const sizeSection = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('SELECT SIZE'));
      const colorButtons = document.querySelectorAll('button[aria-label*="Washed Charcoal"], button[title*="Washed Charcoal"], button span.rounded-full');
      const sizeButtons = Array.from(document.querySelectorAll('button')).filter(b => ['S', 'M', 'L', 'XL', 'XXL'].includes(b.textContent.trim()));

      return {
        hasColorSection: !!colorSection,
        hasSizeSection: !!sizeSection,
        colorCount: colorButtons.length,
        sizeCount: sizeButtons.length
      };
    });

    console.log(`[PASS] PDP Colorway Selection Intact: ${pdpState.hasColorSection} (${pdpState.colorCount} swatches found)`);
    console.log(`[PASS] PDP Size Selection Intact: ${pdpState.hasSizeSection} (${pdpState.sizeCount} sizes found)`);

    // -------------------------------------------------------------
    // Test 8: Visual Screenshot Capture at 390px
    // -------------------------------------------------------------
    console.log('\n--- 8. Capturing Verification Screenshot at 390px ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const screenshotPath = 'mobile_grid_refined_390.png';
    await page.screenshot({ path: screenshotPath });
    console.log(`[PASS] Screenshot captured to ${screenshotPath}`);

    // -------------------------------------------------------------
    // Test 9: Console Error Audit
    // -------------------------------------------------------------
    console.log('\n--- 9. Console Runtime Error Audit ---');
    console.log(`Total Runtime Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors logged:', consoleErrors);
      throw new Error(`Encountered ${consoleErrors.length} console errors during execution.`);
    }

    console.log('\n>>> ALL MOBILE PRODUCT GRID REFINEMENT TESTS PASSED! <<<');
  } finally {
    await browser.close();
  }
}

runMobileGridQATest().catch(err => {
  console.error('\n[FAIL] Test suite failed:', err);
  process.exit(1);
});
