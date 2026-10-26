import React, { useState, useEffect } from 'react';
import { Product, ProductSize } from '../types';
import { useCart } from '../context/CartContext';

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  initialColorIndex?: number;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  product,
  isOpen,
  onClose,
  initialColorIndex = 0
}) => {
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(initialColorIndex);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // Set default available size when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedColorIndex(initialColorIndex);
      const firstAvailable = product.sizes.find(s => s.inStock)?.size || null;
      setSelectedSize(firstAvailable);
      setIsAdded(false);
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, initialColorIndex, product]);

  if (!isOpen) return null;

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const activeImage = product.images[selectedColorIndex] || product.images[0];
  const selectedSizeSpec = product.sizes.find(s => s.size === selectedSize);
  const isAvailable = selectedSizeSpec ? selectedSizeSpec.inStock : false;

  const handleSizeClick = (size: ProductSize) => {
    setSelectedSize(size);
    const sizeSpec = product.sizes.find(s => s.size === size);
    if (!sizeSpec || !sizeSpec.inStock) return;
    addToCart(product, activeColor.name, size, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 500);
  };

  const handleAdd = () => {
    if (!selectedSize || !isAvailable) return;
    addToCart(product, activeColor.name, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-surface-container-lowest sm:border border-surface-container-high rounded-t-2xl sm:rounded-none shadow-2xl overflow-hidden p-5 max-h-[85vh] flex flex-col gap-4 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-surface-container-highest rounded-full mx-auto sm:hidden" />

        {/* Header: Product Preview & Close Button */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-3">
            <img
              src={activeImage}
              alt={product.name}
              className="w-14 h-16 object-cover bg-surface-container-low border border-surface-container-high shrink-0"
            />
            <div>
              <span className="font-label-code text-[10px] uppercase text-secondary font-bold">
                {product.categoryLabel} • {product.gsm}
              </span>
              <h3 className="font-title-sm text-sm uppercase text-primary font-bold line-clamp-1">
                {product.name}
              </h3>
              <div className="font-label-code text-xs font-bold text-primary mt-0.5">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform"
            aria-label="Close quick add sheet"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Color Selection (if multiple) */}
        {product.colors.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-label-code text-xs uppercase">
              <span className="text-on-surface-variant">COLORWAY:</span>
              <span className="text-primary font-bold">{activeColor.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColorIndex(i)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 border font-label-code text-[11px] uppercase transition-all ${
                    selectedColorIndex === i
                      ? 'border-primary bg-surface-container-low font-bold ring-1 ring-primary'
                      : 'border-surface-container-high hover:border-primary'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center font-label-code text-xs uppercase">
            <span className="text-on-surface-variant font-bold">SELECT YOUR SIZE:</span>
            {selectedSize && (
              <span className="text-secondary font-bold">
                {isAvailable ? `SIZE ${selectedSize}` : `SIZE ${selectedSize} (OUT OF STOCK)`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {product.sizes.map((s) => {
              const isSelected = selectedSize === s.size;
              return (
                <button
                  key={s.size}
                  type="button"
                  disabled={!s.inStock}
                  onClick={() => handleSizeClick(s.size)}
                  className={`min-h-[44px] py-2 text-center font-label-code text-xs font-bold border transition-all duration-120 active:scale-90 relative flex items-center justify-center ${
                    !s.inStock
                      ? 'opacity-30 border-surface-container-high bg-surface-container text-outline line-through cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-on-primary border-primary shadow-sm font-black'
                      : 'bg-surface-container-lowest text-primary border-surface-container-high hover:border-primary'
                  }`}
                >
                  {s.size}
                  {s.lowStock && (
                    <span className="absolute -top-1.5 right-0.5 px-1 bg-secondary text-on-secondary text-[7px] font-bold">
                      LOW
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add to Bag CTA */}
        <button
          type="button"
          disabled={!selectedSize || !isAvailable || isAdded}
          onClick={handleAdd}
          className={`w-full min-h-[48px] py-3.5 font-title-sm text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.98] mt-1 ${
            !selectedSize || !isAvailable
              ? 'bg-surface-container-high text-outline cursor-not-allowed border border-outline-variant shadow-none'
              : isAdded
              ? 'bg-secondary text-on-secondary border border-secondary shadow-lg font-black'
              : 'bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAdded ? 'check_circle' : 'shopping_bag'}
          </span>
          <span>
            {isAdded
              ? 'ADDED TO BAG [ ✓ ]'
              : !selectedSize
              ? 'SELECT A SIZE'
              : !isAvailable
              ? 'OUT OF STOCK'
              : `ADD TO BAG — ₹${product.price.toLocaleString('en-IN')}`}
          </span>
        </button>
      </div>
    </div>
  );
};
