import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductSize } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { QuickAddModal } from './QuickAddModal';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [justAddedSize, setJustAddedSize] = useState<ProductSize | null>(null);

  const isFavorited = isInWishlist(product.id);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  // Secondary editorial image for hover reveal (desktop only)
  const hasSecondaryImage = product.images.length > 1;
  const secondaryImageIndex = selectedColorIndex === 0 ? 1 : 0;
  const secondaryImage = product.images[secondaryImageIndex] || product.images[0];

  const handleSizeSelect = (size: ProductSize, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const sizeSpec = product.sizes.find(s => s.size === size);
    if (!sizeSpec || !sizeSpec.inStock) return;
    
    setJustAddedSize(size);
    addToCart(product, activeColor.name, size, 1);
    
    setTimeout(() => {
      setShowSizePicker(false);
      setJustAddedSize(null);
    }, 400);
  };

  return (
    <article className="group flex flex-col bg-surface-container-lowest border border-surface-container-high hover:border-primary transition-colors duration-200 relative select-none">
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-surface-container-low overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full relative overflow-hidden">
          {/* Primary Image */}
          <img
            src={product.images[selectedColorIndex] || product.images[0]}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-300 ease-out will-change-transform ${
              hasSecondaryImage ? 'md:group-hover:opacity-0' : 'md:group-hover:scale-[1.03]'
            }`}
          />

          {/* Secondary Editorial Image on Hover (Scoped to desktop pointer hover) */}
          {hasSecondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="w-full h-full object-cover absolute inset-0 opacity-0 md:group-hover:opacity-100 md:group-hover:scale-[1.03] transition-all duration-300 ease-out pointer-events-none will-change-transform hidden md:block"
            />
          )}
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 bg-primary text-on-primary font-label-code text-[9px] sm:text-[10px] uppercase tracking-widest font-bold shadow-sm">
              {product.badge}
            </span>
          )}
          {product.runNumber && (
            <span className="px-2 py-0.5 bg-surface-container-lowest/95 backdrop-blur-sm text-primary font-label-code text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold border border-surface-container-high shadow-sm">
              {product.runNumber}
            </span>
          )}
        </div>

        {/* Wishlist Button with Touch-Friendly Hit Target and Tactile Feedback */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-85 z-10 ${
            isFavorited
              ? 'bg-secondary text-on-secondary shadow-md'
              : 'bg-surface-container-lowest/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-on-primary border border-surface-container-high'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isFavorited ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="hidden sm:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 flex-col justify-end z-20">
          {showSizePicker ? (
            <div
              className="bg-surface-container-lowest p-2.5 shadow-xl border border-surface-container-high animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-1.5 font-label-meta text-[10px] uppercase text-on-surface-variant font-bold">
                <span>SELECT SIZE:</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSizePicker(false);
                  }}
                  className="p-1 hover:text-primary text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={(e) => handleSizeSelect(s.size, e)}
                    className={`py-1.5 text-center font-label-code text-[11px] font-bold border transition-all duration-150 active:scale-95 ${
                      !s.inStock
                        ? 'opacity-30 border-surface-container-high bg-surface-container text-outline line-through cursor-not-allowed'
                        : justAddedSize === s.size
                        ? 'bg-secondary text-on-secondary border-secondary scale-95 font-black'
                        : 'border-primary hover:bg-secondary hover:text-on-secondary hover:border-secondary bg-surface-container-lowest text-primary'
                    }`}
                  >
                    {justAddedSize === s.size ? '✓' : s.size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onQuickAdd) {
                  onQuickAdd(product);
                } else {
                  setShowSizePicker(true);
                }
              }}
              className="w-full py-2.5 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary font-title-sm text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>QUICK ADD — ₹{product.price.toLocaleString('en-IN')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Meta Information Container */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2">
        <div>
          {/* Category & GSM Meta */}
          <div className="flex items-center justify-between font-label-code text-[10px] uppercase tracking-wider text-on-surface-variant mb-1">
            <span className="font-semibold text-secondary">{product.categoryLabel}</span>
            <span>{product.gsm}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="font-title-sm text-sm sm:text-[15px] text-primary uppercase font-bold tracking-tight hover:text-secondary transition-colors duration-150 line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Subtitle / Technical Note */}
          {product.subtitle && (
            <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Color Swatches Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-container-high">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-label-code text-xs sm:text-sm font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-label-code text-[10px] sm:text-[11px] text-outline line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Quick Add Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizePicker(true);
              }}
              className="sm:hidden px-3 py-1.5 min-h-[34px] bg-primary text-on-primary font-label-code text-[11px] uppercase font-bold hover:bg-secondary active:scale-95 transition-all flex items-center justify-center shadow-sm"
              aria-label="Quick add size"
              type="button"
            >
              + ADD
            </button>

            {/* Color Swatch Dots with Touch-Friendly Hit Target */}
            <div className="flex items-center gap-1">
              {product.colors.map((color, index) => (
                <button
                  key={color.name}
                  aria-label={color.name}
                  title={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIndex(index);
                  }}
                  className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 ${
                      selectedColorIndex === index
                        ? 'ring-2 ring-offset-1 ring-primary scale-110'
                        : 'border-outline-variant hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Quick Add Bottom Sheet Modal */}
      <QuickAddModal
        product={product}
        isOpen={showSizePicker}
        onClose={() => setShowSizePicker(false)}
        initialColorIndex={selectedColorIndex}
      />
    </article>
  );
};
