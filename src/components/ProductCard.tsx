import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductSize } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleSizeSelect = (size: ProductSize, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, activeColor.name, size, 1);
    setShowSizePicker(false);
  };

  return (
    <article className="group flex flex-col bg-surface-container-lowest border border-surface-container-high transition-all duration-300 hover:shadow-xl relative">
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-surface-container-low overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[selectedColorIndex] || product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-space-xs left-space-xs sm:top-space-sm sm:left-space-sm flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 bg-primary text-on-primary font-label-code text-[10px] sm:text-label-code uppercase tracking-widest font-semibold shadow-sm">
              {product.badge}
            </span>
          )}
          {product.runNumber && (
            <span className="px-2 py-0.5 bg-secondary text-on-secondary font-label-meta text-[9px] uppercase tracking-widest font-medium shadow-sm">
              {product.runNumber}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-space-xs right-space-xs sm:top-space-sm sm:right-space-sm w-9 h-9 flex items-center justify-center transition-colors z-10 ${
            isFavorited
              ? 'bg-secondary text-on-secondary'
              : 'bg-surface-container-lowest/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-on-primary'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isFavorited ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Quick Add Overlay on Hover / Action */}
        <div className="absolute bottom-0 inset-x-0 p-space-xs sm:p-space-sm bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 flex flex-col justify-end">
          {showSizePicker ? (
            <div
              className="bg-surface-container-lowest p-2 shadow-lg border border-surface-container-high animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-1.5 font-label-meta text-[10px] uppercase text-on-surface-variant">
                <span>SELECT SIZE:</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSizePicker(false);
                  }}
                  className="hover:text-primary"
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
                    className={`py-1 text-center font-label-code text-[11px] font-bold border transition-colors ${
                      !s.inStock
                        ? 'opacity-30 border-surface-container-high bg-surface-container text-outline line-through cursor-not-allowed'
                        : 'border-primary hover:bg-secondary hover:text-on-secondary hover:border-secondary bg-surface-container-lowest text-primary'
                    }`}
                  >
                    {s.size}
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
              className="w-full py-2.5 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary font-title-sm text-xs sm:text-title-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>QUICK ADD — ₹{product.price.toLocaleString('en-IN')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Meta Information Container */}
      <div className="p-space-sm sm:p-space-md flex flex-col justify-between flex-1 gap-2">
        <div>
          {/* Category & GSM Meta */}
          <div className="flex items-center justify-between font-label-meta text-[10px] uppercase tracking-wider text-on-surface-variant mb-1">
            <span>{product.categoryLabel}</span>
            <span>{product.gsm}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="font-title-sm text-title-sm sm:text-base text-primary uppercase font-bold tracking-tight hover:text-secondary transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Subtitle / Spec Note */}
          {product.subtitle && (
            <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Color Swatches Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-surface-container-high">
          <div className="flex items-baseline gap-2">
            <span className="font-label-code text-label-code sm:text-sm font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-label-code text-[11px] text-outline line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5">
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
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColorIndex === index
                    ? 'ring-1 ring-offset-1 ring-primary scale-110'
                    : 'border-outline-variant hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
