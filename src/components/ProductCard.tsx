import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { QuickAddModal } from './QuickAddModal';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Secondary editorial image for hover reveal (desktop only)
  const hasSecondaryImage = product.images.length > 1;
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
    } else {
      setShowQuickAddModal(true);
    }
  };

  return (
    <article className="group h-full flex flex-col justify-between bg-surface-container-lowest border border-surface-container-high hover:border-primary transition-colors duration-200 relative select-none">
      {/* 1. Standardized Product Image Frame */}
      <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden w-full">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full relative overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* Primary Editorial Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover object-top transition-all duration-300 ease-out will-change-transform ${
              hasSecondaryImage ? 'md:group-hover:opacity-0' : 'md:group-hover:scale-[1.03]'
            }`}
          />

          {/* Secondary Editorial Image on Hover (desktop only) */}
          {hasSecondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="w-full h-full object-cover object-top absolute inset-0 opacity-0 md:group-hover:opacity-100 md:group-hover:scale-[1.03] transition-all duration-300 ease-out pointer-events-none will-change-transform hidden md:block"
            />
          )}
        </Link>

        {/* Floating Badges (Top-Left, collision-guarded) */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none max-w-[calc(100%-44px)]">
          {product.badge && (
            <span className="px-1.5 sm:px-2 py-0.5 bg-primary text-on-primary font-label-code text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-bold shadow-sm whitespace-nowrap truncate inline-block">
              {product.badge}
            </span>
          )}
          {product.runNumber && (
            <span className="px-1.5 sm:px-2 py-0.5 bg-surface-container-lowest/95 backdrop-blur-sm text-primary font-label-code text-[7.5px] sm:text-[8.5px] uppercase tracking-wider font-semibold border border-surface-container-high shadow-sm whitespace-nowrap truncate inline-block">
              {product.runNumber}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top-Right with Touch-Friendly Hit Target) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center transition-all duration-150 active:scale-85 z-10 ${
            isFavorited
              ? 'bg-secondary text-on-secondary shadow-md'
              : 'bg-surface-container-lowest/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-on-primary border border-surface-container-high'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
            {isFavorited ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Desktop Quick Add Overlay on Hover */}
        <div className="hidden sm:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 flex-col justify-end z-20 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleQuickAddClick}
            className="w-full py-2.5 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary font-title-sm text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>QUICK ADD — ₹{product.price.toLocaleString('en-IN')}</span>
          </button>
        </div>
      </div>

      {/* 2. Standardized Product Information Area */}
      <div className="p-2.5 sm:p-3.5 flex flex-col justify-between flex-1 gap-2">
        <div className="flex flex-col">
          {/* Category & Verified Metadata Row */}
          <div className="flex items-center justify-between font-label-code text-[9px] sm:text-[10px] uppercase tracking-wider text-on-surface-variant gap-1.5 mb-1">
            <span className="font-semibold text-secondary truncate">{product.categoryLabel}</span>
            {product.gsm && (
              <span className="shrink-0 text-outline text-[9px] sm:text-[10px]">{product.gsm}</span>
            )}
          </div>

          {/* Product Title (Consistent 2-line reserved area prevents row misalignment) */}
          <Link
            to={`/product/${product.slug}`}
            className="font-title-sm text-xs sm:text-[14px] text-primary uppercase font-bold tracking-tight hover:text-secondary transition-colors duration-150 line-clamp-2 min-h-[2.1rem] sm:min-h-[2.4rem] leading-snug block"
          >
            {product.name}
          </Link>

          {/* Short Product Description Preview */}
          {product.subtitle ? (
            <p className="font-body-sm text-[10px] sm:text-[11px] text-on-surface-variant line-clamp-1 leading-normal mt-0.5">
              {product.subtitle}
            </p>
          ) : (
            <p className="font-body-sm text-[10px] sm:text-[11px] text-on-surface-variant line-clamp-1 leading-normal mt-0.5">
              {product.description}
            </p>
          )}
        </div>

        {/* 3. Redesigned Purchase Row: Price on Left, Add to Bag on Right (No Cluttered Swatches) */}
        <div className="pt-2 border-t border-surface-container-high flex items-center justify-between gap-1.5">
          {/* Price Block: Current price + optional genuine discount */}
          <div className="flex flex-col justify-center min-w-0 pr-1">
            <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5">
              <span className="font-label-code text-xs sm:text-sm font-bold text-primary tracking-tight whitespace-nowrap">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="font-label-code text-[10px] sm:text-[11px] text-outline line-through whitespace-nowrap">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Clean Add to Bag Button */}
          <button
            onClick={handleQuickAddClick}
            data-action="quick-add"
            className="shrink-0 px-2.5 sm:px-3 py-1.5 min-h-[32px] sm:min-h-[34px] bg-primary text-on-primary font-label-code text-[10.5px] sm:text-[11.5px] uppercase font-bold hover:bg-secondary hover:border-secondary active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm border border-primary focus:outline-none focus:ring-1 focus:ring-secondary"
            aria-label={`Add ${product.name} to bag`}
            type="button"
          >
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">add</span>
            <span className="tracking-wider">ADD</span>
          </button>
        </div>
      </div>

      {/* Responsive Quick Add Bottom Sheet Modal (Preserves full size and colorway selection) */}
      <QuickAddModal
        product={product}
        isOpen={showQuickAddModal}
        onClose={() => setShowQuickAddModal(false)}
        initialColorIndex={0}
      />
    </article>
  );
};
