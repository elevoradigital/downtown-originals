import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="w-full pt-32 sm:pt-36 pb-16 px-4 sm:px-8 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
          <span className="material-symbols-outlined text-[40px]">shopping_bag</span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-4xl uppercase text-primary font-bold">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-md mt-2 mb-8">
          No archive pieces currently in your cart. Explore Drop 04 before limited production runs sell out.
        </p>
        <Link
          to="/shop"
          className="px-8 py-4 bg-primary text-on-primary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary transition-colors shadow-md"
        >
          EXPLORE NEW ARRIVALS
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-12 bg-surface">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b-2 border-primary mb-6">
          <h1 className="font-headline-lg text-2xl sm:text-4xl uppercase text-primary font-bold">
            SHOPPING BAG
          </h1>
          <span className="font-label-code text-xs text-secondary font-bold">
            {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'} RESERVED FOR YOUR SESSION
          </span>
        </div>

        {/* Free Shipping Banner */}
        <div className="p-4 bg-surface-container-low border border-surface-container-high mb-6">
          {amountNeededForFreeShipping > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-label-code text-xs uppercase text-on-surface">
                <span>ADD ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} TO UNLOCK FREE NATIONWIDE SHIPPING</span>
                <span className="font-bold text-secondary">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-label-code text-xs uppercase text-secondary font-bold">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>UNLOCKED: COMPLIMENTARY EXPRESS METRO SHIPPING INCLUDED</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-surface-container-lowest border border-surface-container-high shadow-sm"
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-24 h-32 sm:w-28 sm:h-36 bg-surface-container-low shrink-0 overflow-hidden border border-surface-container-high"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-title-sm text-sm sm:text-base text-primary uppercase font-bold hover:text-secondary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-label-code text-xs uppercase text-on-surface-variant mt-1">
                      <span>COLOR: {item.selectedColor}</span>
                      <span>•</span>
                      <span className="font-bold text-primary">SIZE: {item.selectedSize}</span>
                      <span>•</span>
                      <span>SKU: {item.product.sku}</span>
                    </div>

                    <div className="font-label-code text-sm font-bold text-primary mt-2">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity & Line Total */}
                  <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
                    <div className="flex items-center border border-primary bg-surface-container-lowest">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container-low"
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
                        className={`w-8 h-8 flex items-center justify-center transition-colors ${
                          item.quantity >= 10 ? 'opacity-30 cursor-not-allowed text-outline' : 'text-primary hover:bg-surface-container-low'
                        }`}
                      >
                        +
                      </button>
                    </div>

                    <div className="font-label-code text-sm sm:text-base font-bold text-primary">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="font-label-code text-xs uppercase text-primary hover:text-secondary flex items-center gap-1 font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                CONTINUE BROWSING CATALOG
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-6 border border-surface-container-high shadow-sm flex flex-col gap-4">
            <h2 className="font-headline-sm text-lg uppercase text-primary border-b border-surface-container-high pb-3 font-bold">
              ORDER SUMMARY
            </h2>

            <div className="flex flex-col gap-2 font-label-code text-xs text-on-surface">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">SUBTOTAL</span>
                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">ESTIMATED SHIPPING</span>
                <span className="font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-secondary font-bold uppercase">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">ESTIMATED GST (18%)</span>
                <span className="text-outline">INCLUDED</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-surface-container-high font-headline-sm text-base text-primary font-bold">
                <span>TOTAL</span>
                <span>₹{(subtotal + shippingFee).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-primary text-on-primary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2 group shadow-md"
              type="button"
            >
              <span>PROCEED TO CHECKOUT</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <div className="pt-2 border-t border-surface-container-high flex flex-col gap-2 font-label-code text-[11px] text-on-surface-variant uppercase">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">local_shipping</span>
                <span>FAST DISPATCH WITHIN 24-48 HRS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">published_with_changes</span>
                <span>VERIFIED 7-DAY EASY SIZE EXCHANGES</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">security</span>
                <span>DEMONSTRATION CHECKOUT SYSTEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
