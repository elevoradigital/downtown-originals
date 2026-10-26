import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    cartCount,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  // Body scroll lock & Escape listener
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeCart();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        id="cartDrawer"
        aria-label="Shopping Cart Drawer"
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-surface-container-lowest z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-surface-container-high ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 bg-surface-container-lowest flex items-center justify-between border-b border-surface-container-high shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-headline-sm text-lg sm:text-xl uppercase text-primary font-bold">
              SHOPPING BAG
            </span>
            <span className="font-label-code text-xs px-2.5 py-0.5 bg-secondary text-on-secondary font-bold">
              {cartCount}
            </span>
          </div>
          <button
            aria-label="Close cart drawer"
            onClick={closeCart}
            className="w-11 h-11 flex items-center justify-center text-primary hover:text-secondary active:scale-90 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Visible when items exist) */}
        {cart.length > 0 && (
          <div className="px-6 py-3 bg-surface-container-low border-b border-surface-container-high">
            {amountNeededForFreeShipping > 0 ? (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center font-label-code text-xs uppercase tracking-wider text-on-surface">
                  <span>ADD ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} FOR FREE SHIPPING</span>
                  <span className="font-bold text-secondary">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>UNLOCKED: COMPLIMENTARY EXPRESS METRO SHIPPING</span>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-xl uppercase text-primary font-bold">
                  YOUR BAG IS EMPTY
                </h4>
                <p className="font-body-md text-sm text-on-surface-variant max-w-xs mt-1">
                  Discover Drop 04 and limited surplus capsule editions before archive closure.
                </p>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="mt-2 px-6 py-3 bg-primary text-on-primary font-title-sm text-xs uppercase tracking-wider hover:bg-secondary transition-colors"
                type="button"
              >
                BROWSE NEW DROP
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-4 border-b border-surface-container-high last:border-b-0 group"
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${item.product.slug}`}
                  onClick={closeCart}
                  className="w-20 h-24 sm:w-24 sm:h-28 bg-surface-container-low shrink-0 overflow-hidden border border-surface-container-high"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-title-sm text-xs sm:text-sm text-primary uppercase line-clamp-1 hover:text-secondary transition-colors font-bold"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error active:scale-90 transition-all p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
                        aria-label="Remove item"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 font-label-code text-[11px] uppercase tracking-wider text-on-surface-variant mt-1">
                      <span>{item.selectedColor}</span>
                      <span>/</span>
                      <span className="font-bold text-primary">SIZE {item.selectedSize}</span>
                    </div>

                    <div className="font-label-code text-xs text-primary font-bold mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-outline-variant bg-surface-container-lowest">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container-low active:scale-90 transition-all font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-label-code text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={item.quantity >= 10}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={`w-8 h-8 flex items-center justify-center active:scale-90 transition-all font-bold ${
                          item.quantity >= 10 ? 'opacity-30 cursor-not-allowed text-outline' : 'text-primary hover:bg-surface-container-low'
                        }`}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-label-code text-xs sm:text-sm font-bold text-primary">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-surface-container-lowest border-t border-surface-container-high flex flex-col gap-4 shadow-lg">
            <div className="flex flex-col gap-2 font-label-code text-xs text-on-surface">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">SUBTOTAL</span>
                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">ESTIMATED SHIPPING</span>
                <span className="font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-secondary uppercase">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-container-high font-headline-sm text-base text-primary font-bold">
                <span>ESTIMATED TOTAL</span>
                <span>₹{(subtotal + shippingFee).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="font-label-code text-[11px] text-on-surface-variant leading-tight">
              Taxes calculated at checkout. Illustrative e-commerce prototype for Downtown Originals.
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-primary text-on-primary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary transition-all flex items-center justify-center gap-2 group shadow-md active:scale-[0.98]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="w-full py-2.5 text-on-surface-variant font-label-code text-xs uppercase tracking-wider hover:text-primary transition-colors text-center"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
