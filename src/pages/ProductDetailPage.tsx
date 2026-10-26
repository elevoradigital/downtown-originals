import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { ProductSize } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';
import { Marquee } from '../components/magicui/marquee';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product from centralized catalog
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>('L');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  // When slug changes, reset defaults
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColorIndex(0);
    const availableSize = product.sizes.find(s => s.inStock)?.size || 'M';
    setSelectedSize(availableSize);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug, product]);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
  const isSelectedSizeAvailable = selectedSizeObj ? selectedSizeObj.inStock : false;

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index);
    if (product.images[index]) {
      setSelectedImageIndex(index);
    }
  };

  const handleAddToCart = () => {
    if (!isSelectedSizeAvailable) return;
    setAddedRecently(true);
    addToCart(product, activeColor.name, selectedSize, quantity);
    setTimeout(() => {
      setAddedRecently(false);
    }, 1200);
  };

  const handleBuyNow = () => {
    if (!isSelectedSizeAvailable) return;
    addToCart(product, activeColor.name, selectedSize, quantity);
    navigate('/checkout');
  };

  // Cross-sell items
  const styledLookProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full pt-24 sm:pt-28 bg-surface">
      {/* Top Marquee Ticker: Product Status & Stock Alert */}
      <section className="w-full bg-primary text-on-primary py-1 sm:py-1.5 overflow-hidden select-none border-b border-primary">
        <Marquee
          pauseOnHover
          repeat={4}
          className="[--duration:24s] font-label-code text-[10px] sm:text-[11px] uppercase tracking-widest text-on-primary py-0"
        >
          <div className="flex items-center gap-6 whitespace-nowrap px-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            <span>DROP 04 // SURPLUS METROPOLIS CAPSULE</span>
            <span className="text-outline">/</span>
            <span>LIMITED RUN // 250 UNITS NUMBERED ARCHIVE</span>
            <span className="text-outline">/</span>
            <span className="text-secondary-fixed">WATER REPELLENT DWR FINISH VERIFIED</span>
            <span className="text-outline">/</span>
            <span>JAPANESE TECHNICAL TEXTILES</span>
          </div>
        </Marquee>
      </section>

      {/* Breadcrumbs & Meta Bar */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 bg-surface-container-lowest border-b border-surface-container-high">
        <div className="flex flex-wrap items-center justify-between gap-3 font-label-code text-xs uppercase text-on-surface-variant">
          <nav className="flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
            <span className="text-outline-variant">/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">SHOP ALL</Link>
            <span className="text-outline-variant">/</span>
            <Link to={`/shop?cat=${product.category}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 bg-surface-container text-primary font-label-code text-[11px] tracking-wider uppercase border border-surface-container-high">
              SKU: {product.sku}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 bg-secondary text-on-secondary font-label-code text-[11px] tracking-wider uppercase font-semibold">
              {product.runNumber || 'LIMITED DROP'}
            </span>
          </div>
        </div>
      </section>

      {/* Main 2-Column Product Studio Viewport */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Multi-Angle Editorial Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image Viewport Frame with Smooth Crossfade */}
            <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden border border-surface-container-high shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={`${product.name} in ${activeColor.name}`}
                  initial={{ opacity: 0.85, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.85 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Float Badges Top Left */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="px-2.5 py-1 bg-primary text-on-primary font-label-code text-xs uppercase tracking-wider font-bold shadow-sm">
                  {product.badge || 'LIMITED'}
                </span>
                <span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-code text-xs uppercase tracking-wider border border-surface-container-high shadow-sm font-semibold">
                  {product.gsm}
                </span>
              </div>

              {/* Wishlist Button on Image with Tactile Feedback */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist toggle"
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all duration-200 active:scale-85 shadow-md z-10 border ${
                  isFavorited
                    ? 'bg-secondary text-on-secondary border-secondary'
                    : 'bg-surface-container-lowest/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-on-primary border-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isFavorited ? 'favorite' : 'favorite_border'}
                </span>
              </button>

              {/* Image Counter Overlay */}
              <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/80 backdrop-blur-sm text-on-primary font-label-code text-xs font-semibold">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Strip with Micro-Interactions */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-[4/5] bg-surface-container-low overflow-hidden border-2 transition-all duration-200 active:scale-90 ${
                    selectedImageIndex === idx
                      ? 'border-secondary scale-95 shadow-sm'
                      : 'border-surface-container-high opacity-70 hover:opacity-100 hover:border-primary'
                  }`}
                  type="button"
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Buy Box & Commerce Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28 sm:top-36 bg-surface-container-lowest p-6 sm:p-8 border border-surface-container-high shadow-sm">
            {/* Title & Price Header */}
            <div>
              <div className="flex items-center gap-2 font-label-code text-xs uppercase tracking-wider text-secondary font-bold mb-1">
                <span>{product.categoryLabel}</span>
                <span>•</span>
                <span>{product.fitArchitecture}</span>
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-4xl uppercase text-primary tracking-tight leading-tight font-bold">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Price Row */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 mt-4 pt-4 border-t border-surface-container-high">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-sm text-2xl sm:text-3xl font-bold text-primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="font-label-code text-sm text-outline line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <span className="font-label-code text-xs text-secondary font-bold">
                  INCL. TAXES • FREE SHIPPING OVER ₹3,999
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-label-code text-[11px] uppercase text-on-surface-variant/80 pt-2">
                <span className="material-symbols-outlined text-[14px] text-secondary">info</span>
                <span>ILLUSTRATIVE DEMO PRICE &amp; CONCEPT SPECIFICATIONS</span>
              </div>
            </div>

            {/* Colour Selector */}
            <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-xs uppercase text-primary">
                <span className="font-bold">COLOURWAY:</span>
                <span className="text-secondary font-bold">{activeColor.name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorChange(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-label-code transition-all ${
                      selectedColorIndex === idx
                        ? 'border-primary bg-surface-container-low font-bold shadow-sm'
                        : 'border-surface-container-high hover:border-primary'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="uppercase">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-xs uppercase text-primary">
                <div className="flex items-center gap-2">
                  <span className="font-bold">SELECT SIZE:</span>
                  <span className="text-secondary font-bold">{selectedSize}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-on-surface-variant hover:text-secondary underline underline-offset-4 flex items-center gap-1 text-xs"
                >
                  <span className="material-symbols-outlined text-[14px]">straighten</span>
                  SIZE MATRIX &amp; FIT GUIDE
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2.5 sm:py-3 text-center font-label-code text-xs font-bold border transition-all duration-150 active:scale-90 relative ${
                        !s.inStock
                          ? 'opacity-30 border-surface-container-high bg-surface-container text-outline line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-primary text-on-primary border-primary shadow-sm scale-[1.02]'
                          : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary'
                      }`}
                    >
                      {s.size}
                      {s.lowStock && (
                        <span className="absolute -top-2 right-1 px-1 bg-secondary text-on-secondary text-[8px] font-bold">
                          LOW
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="flex flex-col gap-3 pt-2 border-t border-surface-container-high">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                {/* Stepper */}
                <div className="flex items-center justify-between sm:justify-start border border-primary bg-surface-container-lowest h-12 px-2 sm:px-0">
                  <span className="sm:hidden font-label-code text-xs text-on-surface-variant uppercase font-semibold">QUANTITY:</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-12 flex items-center justify-center text-primary hover:bg-surface-container-low active:scale-90 transition-all text-lg"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-label-code text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={quantity >= 10}
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className={`w-10 h-12 flex items-center justify-center active:scale-90 transition-all text-lg ${
                        quantity >= 10 ? 'opacity-30 cursor-not-allowed text-outline' : 'text-primary hover:bg-surface-container-low'
                      }`}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Bag Button with Tactile Feedback */}
                <button
                  type="button"
                  disabled={!isSelectedSizeAvailable}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 sm:py-4 font-title-sm text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.98] ${
                    !isSelectedSizeAvailable
                      ? 'bg-surface-container-high text-outline cursor-not-allowed border border-outline-variant shadow-none'
                      : addedRecently
                      ? 'bg-secondary text-on-secondary border border-secondary shadow-lg'
                      : 'bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {!isSelectedSizeAvailable ? 'block' : addedRecently ? 'check_circle' : 'shopping_bag'}
                  </span>
                  <span>
                    {!isSelectedSizeAvailable
                      ? `OUT OF STOCK (${selectedSize})`
                      : addedRecently
                      ? 'ADDED TO BAG [ ✓ ]'
                      : `ADD TO BAG — ₹${(product.price * quantity).toLocaleString('en-IN')}`}
                  </span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                type="button"
                disabled={!isSelectedSizeAvailable}
                onClick={handleBuyNow}
                className={`w-full py-3.5 font-title-sm text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.98] ${
                  !isSelectedSizeAvailable
                    ? 'bg-surface-container text-outline cursor-not-allowed border border-outline-variant shadow-none'
                    : 'bg-secondary text-on-secondary hover:bg-secondary-container'
                }`}
              >
                <span>
                  {!isSelectedSizeAvailable ? 'VARIANT CURRENTLY UNAVAILABLE' : 'BUY NOW (EXPRESS CHECKOUT)'}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  {!isSelectedSizeAvailable ? 'error_outline' : 'bolt'}
                </span>
              </button>
            </div>

            {/* Fast Assurance Bullets */}
            <div className="pt-4 border-t border-surface-container-high grid grid-cols-1 sm:grid-cols-2 gap-3 font-label-code text-xs uppercase text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>AUTHENTIC METROPOLIS GRADE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                <span>DISPATCH IN 24-48 HRS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">sync</span>
                <span>7-DAY NO-QUESTIONS EXCHANGE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
                <span>ENCRYPTED DEMO CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ANATOMY & TECHNICAL SPECIFICATIONS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 bg-surface-container-lowest border-y border-surface-container-high">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
              TECHNICAL SPECIFICATION
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl uppercase text-primary mt-1 font-bold">
              ANATOMY OF THE {product.name}
            </h2>
          </div>
          <div className="font-label-code text-xs uppercase text-on-surface-variant max-w-sm">
            EVERY SEAM REINFORCED WITH 12-SPI LOCKSTITCHING. TECHNICAL SPECIFICATIONS &amp; MEASUREMENTS ARE ILLUSTRATIVE CONCEPT DATA.
          </div>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1: Specifications */}
          <div className="p-6 bg-surface border border-surface-container-high hover:border-primary transition-colors flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-base sm:text-lg uppercase text-primary font-bold">
                GARMENT SPECIFICATIONS
              </h3>
              <span className="material-symbols-outlined text-secondary">tune</span>
            </div>
            <ul className="flex flex-col gap-2.5 font-body-md text-xs sm:text-sm text-on-surface-variant">
              {product.specifications.map((spec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-label-code text-xs text-secondary font-bold">
                    0{i + 1}.
                  </span>
                  <span>
                    <strong className="text-primary">{spec.label}:</strong> {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Item 2: Fit Advice */}
          <div className="p-6 bg-surface border border-surface-container-high hover:border-primary transition-colors flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-base sm:text-lg uppercase text-primary font-bold">
                SIZE &amp; FIT ADVICE
              </h3>
              <span className="material-symbols-outlined text-secondary">accessibility_new</span>
            </div>
            <div className="flex flex-col gap-3 font-body-md text-xs sm:text-sm text-on-surface-variant flex-1 justify-between">
              <div className="p-3 bg-surface-container text-primary font-label-code text-xs border border-surface-container-high">
                MODEL HEIGHT: 186CM / 6'1" WEARING SIZE LARGE
              </div>
              <p className="leading-relaxed">
                Engineered with dropped shoulders and a boxy contemporary torso drape. Deliberately oversized to allow comfortable layering over our 500 GSM loopback fleece hoodies.
              </p>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-secondary font-bold font-label-code text-xs uppercase text-left hover:underline flex items-center gap-1 mt-auto pt-2"
                type="button"
              >
                <span>OPEN COMPLETE MATRIX MEASUREMENTS</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Item 3: Care Guide */}
          <div className="p-6 bg-surface border border-surface-container-high hover:border-primary transition-colors flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-base sm:text-lg uppercase text-primary font-bold">
                FABRIC &amp; TEXTILE CARE
              </h3>
              <span className="material-symbols-outlined text-secondary">dry_cleaning</span>
            </div>
            <div className="flex flex-col gap-3 font-body-md text-xs sm:text-sm text-on-surface-variant">
              <p className="font-semibold text-primary">
                {product.material}
              </p>
              <ul className="flex flex-col gap-2">
                <li>• Machine wash cold at 30°C on gentle cycle</li>
                <li>• Do not use fabric softeners or chlorine bleach</li>
                <li>• Dry flat or hang in shade away from direct sunlight</li>
                <li>• Cool iron inside-out; do not iron technical hardware</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STYLED IN THIS LOOK / CROSS-SELL */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 bg-surface">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
              CURATED CAPSULE
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl uppercase text-primary mt-1 font-bold">
              STYLED IN THIS LOOK
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-title-sm text-xs sm:text-sm uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL COMPATIBLE PIECES</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {styledLookProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productName={product.name}
      />
    </div>
  );
};
