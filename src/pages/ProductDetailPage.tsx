import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductSize } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';

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

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index);
    if (product.images[index]) {
      setSelectedImageIndex(index);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, activeColor.name, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, activeColor.name, selectedSize, quantity);
    navigate('/checkout');
  };

  // Cross-sell items
  const styledLookProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full pt-28 bg-surface">
      {/* Top Marquee Ticker: Product Status & Stock Alert */}
      <section className="w-full bg-primary text-on-primary py-space-xs overflow-hidden select-none border-b border-primary">
        <div className="animate-marquee font-label-code text-label-code uppercase tracking-widest flex items-center gap-space-2xl text-on-primary">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-space-xs whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                DROP 04 // SURPLUS METROPOLIS CAPSULE
              </span>
              <span className="flex items-center gap-space-xs whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                LIMITED RUN // 250 UNITS NUMBERED ARCHIVE
              </span>
              <span className="flex items-center gap-space-xs whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                WATER REPELLENT DWR FINISH VERIFIED
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Breadcrumbs & Meta Bar */}
      <section className="w-full px-margin-mobile md:px-margin py-space-md bg-surface-container-lowest border-b border-surface-container-high">
        <div className="flex flex-wrap items-center justify-between gap-space-sm font-label-code text-label-code uppercase text-on-surface-variant">
          <nav className="flex items-center gap-space-xs">
            <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
            <span className="text-outline-variant">/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">SHOP ALL</Link>
            <span className="text-outline-variant">/</span>
            <Link to={`/shop?cat=${product.category}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-bold">{product.name}</span>
          </nav>
          <div className="flex items-center gap-space-md">
            <span className="inline-flex items-center gap-space-xs px-space-xs py-0.5 bg-surface-container-high text-primary font-label-meta text-label-meta tracking-widest uppercase">
              SKU: {product.sku}
            </span>
            <span className="inline-flex items-center gap-space-xs px-space-xs py-0.5 bg-secondary text-on-secondary font-label-meta text-label-meta tracking-widest uppercase font-semibold">
              {product.runNumber || 'LIMITED DROP'}
            </span>
          </div>
        </div>
      </section>

      {/* Main 2-Column Product Studio Viewport */}
      <section className="w-full px-margin-mobile md:px-margin py-space-lg bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* LEFT COLUMN: Multi-Angle Editorial Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Main Image Viewport Frame */}
            <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden group shadow-md border border-surface-container-high">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} in ${activeColor.name}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Float Badges Top Left */}
              <div className="absolute top-space-md left-space-md flex flex-col gap-space-xs z-10 pointer-events-none">
                <span className="px-space-sm py-space-xs bg-primary text-on-primary font-label-code text-label-code uppercase tracking-wider shadow-sm">
                  {product.badge || 'LIMITED'}
                </span>
                <span className="px-space-sm py-space-xs bg-surface-container-lowest text-primary font-label-code text-label-code uppercase tracking-wider border border-surface-container-high shadow-sm">
                  {product.gsm}
                </span>
              </div>

              {/* Wishlist Button on Image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist toggle"
                className={`absolute top-space-md right-space-md w-11 h-11 flex items-center justify-center transition-colors shadow-md z-10 ${
                  isFavorited
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isFavorited ? 'favorite' : 'favorite_border'}
                </span>
              </button>

              {/* Image Counter Overlay */}
              <div className="absolute bottom-space-md right-space-md px-space-sm py-1 bg-black/75 backdrop-blur-sm text-on-primary font-label-code text-label-code">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-5 gap-space-sm">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-[4/5] bg-surface-container-low overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-secondary scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
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
          <div className="lg:col-span-5 flex flex-col gap-space-lg sticky top-36 bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
            {/* Title & Price Header */}
            <div>
              <div className="flex items-center gap-space-xs font-label-meta text-label-meta uppercase tracking-wider text-secondary font-bold mb-1">
                <span>{product.categoryLabel}</span>
                <span>•</span>
                <span>{product.fitArchitecture}</span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-4xl uppercase text-primary tracking-tight leading-tight">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Price Row */}
              <div className="flex items-baseline gap-space-sm mt-space-md pt-space-sm border-t border-surface-container-high">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="font-label-code text-label-code text-outline line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="font-label-meta text-[11px] text-secondary font-semibold ml-auto">
                  INCL. OF ALL TAXES • FREE SHIPPING OVER ₹3,999
                </span>
              </div>
            </div>

            {/* Colour Selector */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex items-center justify-between font-label-code text-label-code uppercase text-primary">
                <span className="font-semibold">COLOURWAY:</span>
                <span className="text-secondary font-bold">{activeColor.name}</span>
              </div>
              <div className="flex items-center gap-space-sm pt-1">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorChange(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-label-code transition-all ${
                      selectedColorIndex === idx
                        ? 'border-primary bg-surface-container-low shadow-sm'
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
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex items-center justify-between font-label-code text-label-code uppercase text-primary">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">SELECT SIZE:</span>
                  <span className="text-secondary font-bold">{selectedSize}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-on-surface-variant hover:text-secondary underline underline-offset-4 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">straighten</span>
                  SIZE MATRIX &amp; FIT GUIDE
                </button>
              </div>

              <div className="grid grid-cols-5 gap-space-xs pt-1">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 text-center font-label-code text-label-code font-bold border transition-all relative ${
                        !s.inStock
                          ? 'opacity-30 border-surface-container-high bg-surface-container text-outline line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
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
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <div className="flex items-stretch gap-space-sm">
                {/* Stepper */}
                <div className="flex items-center border border-primary bg-surface-container-lowest">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-label-code text-label-code font-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-12 flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-primary text-on-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-all flex items-center justify-center gap-space-sm shadow-md group"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>ADD TO BAG — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-secondary text-on-secondary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary-container transition-all flex items-center justify-center gap-space-sm shadow-md"
              >
                <span>BUY NOW (EXPRESS CHECKOUT)</span>
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </button>
            </div>

            {/* Fast Assurance Bullets */}
            <div className="pt-space-md border-t border-surface-container-high grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-label-meta text-label-meta uppercase text-on-surface-variant">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>AUTHENTIC METROPOLIS GRADE</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                <span>DISPATCH IN 24-48 HRS</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">sync</span>
                <span>7-DAY NO-QUESTIONS EXCHANGE</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
                <span>ENCRYPTED DEMO CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ANATOMY & TECHNICAL SPECIFICATIONS */}
      <section className="w-full px-margin-mobile md:px-margin py-space-2xl bg-surface-container-lowest border-y border-surface-container-high">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold">
              TECHNICAL SPECIFICATION
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-headline-lg uppercase text-primary mt-1">
              ANATOMY OF THE {product.name}
            </h2>
          </div>
          <div className="font-label-meta text-label-meta uppercase text-on-surface-variant max-w-sm">
            EVERY SEAM REINFORCED WITH 12-SPI LOCKSTITCHING. TECHNICAL SPECIFICATIONS &amp; MEASUREMENTS ARE ILLUSTRATIVE CONCEPT DATA.
          </div>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Item 1: Specifications */}
          <div className="p-space-lg bg-surface border border-surface-container-high shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md uppercase text-primary font-bold">
                GARMENT SPECIFICATIONS
              </h3>
              <span className="material-symbols-outlined text-secondary">tune</span>
            </div>
            <ul className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant">
              {product.specifications.map((spec, i) => (
                <li key={i} className="flex items-start gap-space-xs">
                  <span className="font-label-code text-label-code text-secondary font-bold">
                    0{i + 1}.
                  </span>
                  <span>
                    <strong>{spec.label}:</strong> {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Item 2: Fit Advice */}
          <div className="p-space-lg bg-surface border border-surface-container-high shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md uppercase text-primary font-bold">
                SIZE &amp; FIT ADVICE
              </h3>
              <span className="material-symbols-outlined text-secondary">accessibility_new</span>
            </div>
            <div className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant">
              <div className="p-space-sm bg-surface-container text-primary font-label-code text-label-code border border-surface-container-high">
                MODEL HEIGHT: 186CM / 6'1" WEARING SIZE LARGE
              </div>
              <p>
                Engineered with dropped shoulders and a boxy contemporary torso drape. Deliberately oversized to allow comfortable layering over our 500 GSM loopback fleece hoodies.
              </p>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-secondary font-bold font-label-code text-label-code uppercase text-left hover:underline flex items-center gap-1 mt-auto"
              >
                <span>OPEN COMPLETE MATRIX MEASUREMENTS</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Item 3: Care Guide */}
          <div className="p-space-lg bg-surface border border-surface-container-high shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md uppercase text-primary font-bold">
                FABRIC &amp; TEXTILE CARE
              </h3>
              <span className="material-symbols-outlined text-secondary">dry_cleaning</span>
            </div>
            <div className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant">
              <p className="font-semibold text-primary">
                {product.material}
              </p>
              <ul className="flex flex-col gap-1.5 text-body-sm">
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
      <section className="w-full px-margin-mobile md:px-margin py-space-2xl bg-surface">
        <div className="flex items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold">
              CURATED CAPSULE
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-headline-lg uppercase text-primary mt-1">
              STYLED IN THIS LOOK
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-title-sm text-title-sm uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL COMPATIBLE PIECES</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
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
