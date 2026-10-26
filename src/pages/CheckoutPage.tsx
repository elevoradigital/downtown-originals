import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckoutForm } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'India',
    deliveryMethod: 'express',
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const deliveryCost = form.deliveryMethod === 'priority' ? 250 : shippingFee;
  const finalTotal = Math.max(0, subtotal + deliveryCost - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DOWNTOWN10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoSuccess('10% INNER CIRCLE PROMO CODE APPLIED (-₹' + disc.toLocaleString('en-IN') + ')');
      setPromoError('');
    } else {
      setPromoError('INVALID PROMO CODE. TRY "DOWNTOWN10"');
      setPromoSuccess('');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'DO-ORD-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedOrderId(orderId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="w-full pt-36 pb-space-2xl px-margin-mobile md:px-margin bg-surface min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-2xl bg-surface-container-lowest p-space-xl border-2 border-primary shadow-2xl flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm text-secondary">
            <span className="material-symbols-outlined text-[36px]">fact_check</span>
            <span className="font-label-code text-label-code uppercase tracking-widest font-bold">
              DEMONSTRATION ORDER SUMMARY
            </span>
          </div>

          <div>
            <h1 className="font-headline-lg text-3xl sm:text-4xl uppercase text-primary leading-tight">
              THANK YOU, {form.firstName.toUpperCase()}.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              This simulated order summary has been generated for client demonstration review:
            </p>
          </div>

          <div className="p-space-md bg-surface-container-low border border-surface-container-high flex flex-col gap-2 font-label-code text-label-code">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">REFERENCE ORDER NUMBER:</span>
              <span className="font-bold text-primary">{confirmedOrderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">SHIPPING DESTINATION:</span>
              <span className="font-bold text-primary">{form.city}, {form.state} ({form.postalCode})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">ESTIMATED DISPATCH:</span>
              <span className="font-bold text-secondary">24-48 HOURS METROPOLIS PRIORITY</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">SELECTED PAYMENT MODE:</span>
              <span className="font-bold text-primary uppercase">{form.paymentMethod} (DEMO MODE)</span>
            </div>
          </div>

          <div className="p-space-sm bg-secondary/10 border-l-4 border-secondary text-on-surface font-body-sm text-xs leading-relaxed">
            <strong>NOTICE:</strong> This is a portfolio concept demonstration for Downtown Originals. No financial transaction or payment was captured or processed.
          </div>

          <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
            <Link
              to="/shop"
              className="flex-1 py-4 bg-primary text-on-primary font-title-sm text-center uppercase tracking-wider hover:bg-secondary transition-colors"
            >
              CONTINUE BROWSING CATALOG
            </Link>
            <Link
              to="/"
              className="flex-1 py-4 bg-surface-container-low border border-primary text-primary font-title-sm text-center uppercase tracking-wider hover:bg-surface-container-highest transition-colors"
            >
              RETURN TO HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="w-full pt-36 pb-space-2xl px-margin-mobile md:px-margin text-center">
        <h1 className="font-headline-lg text-3xl uppercase text-primary">BAG IS EMPTY</h1>
        <p className="font-body-md text-on-surface-variant mt-2 mb-6">
          Add items to your shopping bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-primary text-on-primary font-title-sm uppercase hover:bg-secondary transition-colors"
        >
          EXPLORE DROP 04
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-space-2xl px-margin-mobile md:px-margin bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Concept Notice Banner */}
        <div className="mb-space-lg p-space-sm bg-primary text-on-primary flex items-center justify-between gap-space-sm font-label-meta text-label-meta uppercase tracking-wider">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            <span>DEMONSTRATION CHECKOUT MODE — ILLUSTRATIVE CONCEPT ONLY. NO REAL PAYMENTS CHARGED.</span>
          </div>
          <span className="hidden sm:inline font-bold text-secondary-fixed">ENCRYPTED TLS</span>
        </div>

        {/* Header Breadcrumb */}
        <div className="mb-space-lg pb-space-sm border-b border-surface-container-high flex items-center justify-between">
          <h1 className="font-headline-lg text-3xl sm:text-4xl uppercase text-primary">
            CHECKOUT ARCHITECTURE
          </h1>
          <Link
            to="/cart"
            className="font-label-code text-label-code text-primary hover:text-secondary uppercase font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            EDIT BAG ({cart.length})
          </Link>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* LEFT 7 COLS: Form Fields */}
          <div className="lg:col-span-7 flex flex-col gap-space-xl">
            {/* 1. Contact Information */}
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
                <span className="font-headline-sm text-headline-sm uppercase text-primary">
                  01. CONTACT DETAILS
                </span>
                <span className="font-label-code text-label-code text-secondary font-bold">CLIENT PROFILE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-label-code text-label-code">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-on-surface-variant uppercase font-semibold">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="marcus@metropolis.agency"
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-on-surface-variant uppercase font-semibold">PHONE NUMBER (FOR SMS DISPATCH ALERTS) *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
                <span className="font-headline-sm text-headline-sm uppercase text-primary">
                  02. SHIPPING DESTINATION
                </span>
                <span className="font-label-code text-label-code text-secondary font-bold">INDIA DISPATCH</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-label-code text-label-code">
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant uppercase font-semibold">FIRST NAME *</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Marcus"
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant uppercase font-semibold">LAST NAME *</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Vance"
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-on-surface-variant uppercase font-semibold">STREET ADDRESS *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Flat 402, Highline Industrial Lofts, Lower Parel"
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant uppercase font-semibold">CITY *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant uppercase font-semibold">STATE *</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant uppercase font-semibold">PIN CODE *</label>
                  <input
                    type="text"
                    required
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    className="p-3 bg-surface-container-low border border-surface-container-high text-primary font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant uppercase font-semibold">COUNTRY</label>
                  <input
                    type="text"
                    readOnly
                    value="India"
                    className="p-3 bg-surface-container text-on-surface-variant font-body-md border border-surface-container-high cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
                <span className="font-headline-sm text-headline-sm uppercase text-primary">
                  03. DELIVERY SPEED
                </span>
                <span className="font-label-code text-label-code text-secondary font-bold">COURIER NETWORK</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-label-code text-label-code">
                <label
                  className={`p-space-md border cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    form.deliveryMethod === 'express'
                      ? 'border-primary bg-surface-container-low shadow-sm'
                      : 'border-surface-container-high hover:border-primary'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={form.deliveryMethod === 'express'}
                        onChange={() => setForm({ ...form, deliveryMethod: 'express' })}
                        className="accent-secondary"
                      />
                      <span className="font-bold text-primary">STANDARD EXPRESS</span>
                    </div>
                    <span className="text-secondary font-bold">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <span className="text-body-sm text-on-surface-variant normal-case">
                    2 to 4 business days nationwide delivery via BlueDart / Delhivery.
                  </span>
                </label>

                <label
                  className={`p-space-md border cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    form.deliveryMethod === 'priority'
                      ? 'border-primary bg-surface-container-low shadow-sm'
                      : 'border-surface-container-high hover:border-primary'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={form.deliveryMethod === 'priority'}
                        onChange={() => setForm({ ...form, deliveryMethod: 'priority' })}
                        className="accent-secondary"
                      />
                      <span className="font-bold text-primary">METROPOLIS PRIORITY</span>
                    </div>
                    <span className="text-primary font-bold">₹250</span>
                  </div>
                  <span className="text-body-sm text-on-surface-variant normal-case">
                    Guaranteed 24-48 hours rapid courier dispatch with dedicated tracking.
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
                <span className="font-headline-sm text-headline-sm uppercase text-primary">
                  04. PAYMENT INTERFACE
                </span>
                <span className="font-label-code text-label-code text-secondary font-bold">DEMO GATEWAY</span>
              </div>

              <div className="flex flex-col gap-space-sm font-label-code text-label-code">
                {/* UPI Option */}
                <label
                  className={`p-space-md border cursor-pointer flex flex-col gap-2 ${
                    form.paymentMethod === 'upi' ? 'border-primary bg-surface-container-low' : 'border-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === 'upi'}
                      onChange={() => setForm({ ...form, paymentMethod: 'upi' })}
                      className="accent-secondary"
                    />
                    <span className="font-bold text-primary">UPI / QR SCANNER (GPay, PhonePe, Paytm)</span>
                  </div>
                  {form.paymentMethod === 'upi' && (
                    <div className="pt-2 flex flex-col gap-2">
                      <div className="p-2.5 bg-surface-container border border-surface-container-high font-label-meta text-[11px] text-on-surface-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[14px]">info</span>
                        <span>SANDBOX DEMO MODE: Enter an illustrative UPI VPA or leave blank for simulated intent.</span>
                      </div>
                      <input
                        type="text"
                        placeholder="concept.shopper@okhdfcbank"
                        value={form.upiId}
                        onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                        className="w-full p-2.5 bg-surface-container-lowest border border-surface-container-high font-body-md text-sm"
                      />
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label
                  className={`p-space-md border cursor-pointer flex flex-col gap-2 ${
                    form.paymentMethod === 'card' ? 'border-primary bg-surface-container-low' : 'border-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === 'card'}
                      onChange={() => setForm({ ...form, paymentMethod: 'card' })}
                      className="accent-secondary"
                    />
                    <span className="font-bold text-primary">DEBIT / CREDIT CARD (SANDBOX TEST CARD)</span>
                  </div>
                  {form.paymentMethod === 'card' && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="col-span-2 p-2.5 bg-surface-container border border-surface-container-high font-label-meta text-[11px] text-on-surface-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[14px]">info</span>
                        <span>DEMO GATEWAY PREVIEW: Simulated test card loaded. Real card numbers are not collected.</span>
                      </div>
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 4242 (TEST CARD)"
                        className="col-span-2 p-2.5 bg-surface-container-lowest border border-surface-container-high font-label-code text-xs text-primary cursor-not-allowed"
                      />
                      <input
                        type="text"
                        readOnly
                        value="12 / 28"
                        className="p-2.5 bg-surface-container-lowest border border-surface-container-high font-label-code text-xs text-primary cursor-not-allowed"
                      />
                      <input
                        type="text"
                        readOnly
                        value="CVV: •••"
                        className="p-2.5 bg-surface-container-lowest border border-surface-container-high font-label-code text-xs text-primary cursor-not-allowed"
                      />
                    </div>
                  )}
                </label>

                {/* COD Option */}
                <label
                  className={`p-space-md border cursor-pointer flex items-center gap-2 ${
                    form.paymentMethod === 'cod' ? 'border-primary bg-surface-container-low' : 'border-surface-container-high'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                    className="accent-secondary"
                  />
                  <span className="font-bold text-primary">CASH ON DELIVERY (METROPOLIS POST-INSPECTION)</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Order Summary */}
          <div className="lg:col-span-5 sticky top-36 bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col gap-space-md">
            <h2 className="font-headline-sm text-headline-sm uppercase text-primary border-b border-surface-container-high pb-space-sm">
              ORDER OVERVIEW ({cart.length})
            </h2>

            {/* Cart Items Miniature */}
            <div className="max-h-72 overflow-y-auto flex flex-col gap-space-sm pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-space-sm pb-space-sm border-b border-surface-container-high last:border-b-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 bg-surface-container object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-title-sm text-xs uppercase text-primary font-bold line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="font-label-meta text-[10px] uppercase text-on-surface-variant">
                        {item.selectedColor} • SIZE {item.selectedSize} • QTY: {item.quantity}
                      </p>
                    </div>
                    <div className="font-label-code text-xs font-bold text-primary">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-space-xs border-t border-surface-container-high">
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="PROMO CODE (TRY: DOWNTOWN10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 p-2 bg-surface-container-low border border-surface-container-high font-label-code text-xs uppercase focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 bg-primary text-on-primary font-label-code text-xs uppercase hover:bg-secondary"
                >
                  APPLY
                </button>
              </div>
              {promoError && (
                <span className="text-error font-label-meta text-[10px] mt-1 block font-bold">
                  {promoError}
                </span>
              )}
              {promoSuccess && (
                <span className="text-secondary font-label-meta text-[10px] mt-1 block font-bold">
                  {promoSuccess}
                </span>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="flex flex-col gap-2 pt-space-xs border-t border-surface-container-high font-label-code text-label-code">
              <div className="flex justify-between text-on-surface-variant">
                <span>SUBTOTAL</span>
                <span className="text-primary font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>SHIPPING</span>
                <span className="text-primary font-bold">
                  {deliveryCost === 0 ? <span className="text-secondary uppercase">FREE</span> : `₹${deliveryCost}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <span>INNER CIRCLE DISCOUNT (10%)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-surface-container-high font-headline-sm text-headline-sm text-primary">
                <span>TOTAL DUE</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-on-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary transition-all flex items-center justify-center gap-space-sm shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>SUBMITTING ORDER PROTOTYPE...</span>
              ) : (
                <>
                  <span>CONFIRM CONCEPT ORDER — ₹{finalTotal.toLocaleString('en-IN')}</span>
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </>
              )}
            </button>

            <p className="font-label-meta text-[10px] text-center text-on-surface-variant uppercase">
              By confirming, you acknowledge this is a design concept for Downtown Originals.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
