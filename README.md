# DOWNTOWN ORIGINALS — Contemporary Streetwear & Surplus Apparel

A high-performance contemporary streetwear e-commerce web application translated from the official Google Stitch design system (`projects/6498205334491974851`).

## Creative Direction
**CONTEMPORARY STREETWEAR × FASHION EDITORIAL × MINIMALIST E-COMMERCE**
- Primary palette: `#000000` (Near Black), `#F9F9F9` (Surface Bright), `#FFFFFF` (Surface Lowest), `#245BFF` / `#265CFF` (Electric Blue Accent), `#747878` (Outline).
- Typography system:
  - **Oswald**: High-impact editorial headlines (`display-hero`, `headline-lg`, `headline-md`, `headline-sm`).
  - **Space Grotesk**: Refined body copy, category labels, navigation (`title-md`, `title-sm`, `body-lg`, `body-md`, `body-sm`).
  - **JetBrains Mono**: Technical garment specifications, GSM, SKU, metadata badges (`label-code`, `label-meta`).
  - **Material Symbols Outlined**: Clean iconography.

## Features & Implementation
- **Homepage (`/`)**:
  - Top animated announcement marquee (`DROP 04: SURPLUS METROPOLIS`, free express shipping).
  - Editorial split hero section with `OWN YOUR EVERYDAY.` typography, lookbook photography, and metric pulse ticker.
  - "FRESH OFF THE DROP" (New arrivals) with real-time category filtering.
  - "CURATED STREETWEAR" (5 core streetwear divisions: Foundational Essentials, Fleece Division, Tactical Utility, Hybrid Tailoring, Hardware Archive).
  - Campaign Editorial: `LESS ORDINARY. MORE YOU.`
  - Why Downtown Originals manufacturing pillars (500 GSM loopback cotton, limited batch runs, modular utility, archive longevity).
  - Global Street Style tastemaker spotlight (London, Tokyo, New York, Seoul).
  - Inner Circle newsletter subscription form with instant confirmation.
- **Shop All Collection (`/shop`)**:
  - Parametric Matrix sidebar filter (Fit Architecture, Textile Density / GSM, Size Matrix, Price Ceiling slider).
  - Dynamic stock counter (e.g. `8 OF 24 ARCHIVED PIECES AVAILABLE`).
  - Sort by Featured, Newest, Price Low to High, Price High to Low.
  - Category pill strip (`ALL`, `OUTERWEAR`, `TEES`, `HOODIES`, `CARGOS`, `FORMALS`, `ACCESSORIES`).
  - Interactive product cards with hover zoom, quick size selector, and color swatches.
  - Touch-friendly mobile filter drawer.
  - Full empty state with reset filters button.
- **Product Detail Page (`/product/:slug`)**:
  - Live editorial image gallery with main viewport and interactive multi-angle thumbnails.
  - Color selector with color swatch previews and variant selection.
  - Size selector with live stock indicators (In Stock, Low Stock, Sold Out).
  - Size Matrix modal popup with complete flat garment measurement table (CM / Inches toggle).
  - Quantity control stepper with boundary protection.
  - `ADD TO BAG` with automatic slide-out drawer confirmation.
  - `BUY NOW` express checkout transition.
  - Anatomy of the Shell garment specifications, size & fit advice, and textile care guide.
  - Curated cross-sell section ("STYLED IN THIS LOOK").
- **Shopping Bag & Cart Drawer**:
  - Accessible slide-out quick cart drawer (`CartDrawer.tsx`) and dedicated mobile page (`/cart`).
  - Free shipping progress bar (`₹3,999` threshold calculation).
  - Real-time quantity increment/decrement and line item removal.
  - Subtotal and estimated shipping calculation.
  - LocalStorage persistence with seeded initial state (`[ 2 ]` items matching the Stitch mockup).
- **Checkout Experience (`/checkout`)**:
  - Clearly labelled demonstration checkout for portfolio/client review.
  - 4-step structured form: Contact Profile, Shipping Destination (India), Delivery Speed (Standard Express vs Metropolis Priority), Payment Mode (UPI QR, Card, COD).
  - Inner circle promo code integration (`DOWNTOWN10` for 10% discount).
  - Order review and confirmation modal with generated reference order ID.
- **Global Search (`SearchModal.tsx`)**:
  - Triggered via search icon or keyboard shortcut (`/` or `Ctrl+K`).
  - Instant live filter across names, silhouettes, categories, and GSM specs.

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
