import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenSizeGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high">
      {/* Newsletter Initiative Section */}
      <div className="w-full px-margin-mobile md:px-margin py-space-2xl border-b border-surface-container-high">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold mb-space-xs">
            NEWSLETTER INITIATIVE
          </span>
          <h3 className="font-headline-md text-headline-md uppercase text-primary mb-space-sm">
            JOIN THE INNER CIRCLE — EARLY ACCESS TO LIMITED DROPS
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-space-lg">
            Be the first to access curated archive releases, private warehouse clearances, and seasonal runway capsules before public availability.
          </p>

          {subscribed ? (
            <div className="p-4 bg-surface-container-low border border-secondary text-primary font-label-code text-label-code flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              <span>WELCOME TO THE INNER CIRCLE. CHECK YOUR INBOX FOR DROP NOTIFICATIONS.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-0 border border-primary">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="flex-1 px-space-md py-space-sm font-body-md text-body-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="submit"
                className="px-space-lg py-space-sm bg-primary text-on-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 4-Column Navigation Links */}
      <div className="w-full px-margin-mobile md:px-margin py-space-2xl grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {/* Col 1 */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wide">
            COLLECTIONS
          </span>
          <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
            <li>
              <Link to="/shop?cat=tees" className="hover:text-primary transition-colors">
                Oversized Tees
              </Link>
            </li>
            <li>
              <Link to="/shop?cat=hoodies" className="hover:text-primary transition-colors">
                Hoodies &amp; Sweats
              </Link>
            </li>
            <li>
              <Link to="/shop?cat=cargos" className="hover:text-primary transition-colors">
                Utility Cargos
              </Link>
            </li>
            <li>
              <Link to="/shop?cat=outerwear" className="hover:text-primary transition-colors">
                Surplus Jackets
              </Link>
            </li>
            <li>
              <Link to="/shop?cat=formals" className="hover:text-primary transition-colors">
                Editorial Formals
              </Link>
            </li>
            <li>
              <Link to="/shop?cat=accessories" className="hover:text-primary transition-colors">
                Hardware &amp; Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wide">
            CLIENT CARE
          </span>
          <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
            <li>
              <Link to="/checkout" className="hover:text-primary transition-colors">
                Shipping &amp; Tracking
              </Link>
            </li>
            <li>
              <span className="cursor-default">Returns &amp; Exchanges (7 Days)</span>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="text-left hover:text-primary transition-colors"
              >
                Size Matrix &amp; Fit Guide
              </button>
            </li>
            <li>
              <span className="cursor-default">Authentic Guarantee</span>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wide">
            BRAND
          </span>
          <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
            <li>
              <span className="cursor-default">About Downtown Originals</span>
            </li>
            <li>
              <span className="cursor-default">Flagship Concept Store</span>
            </li>
            <li>
              <Link to="/#campaign" className="hover:text-primary transition-colors">
                Editorial Studio
              </Link>
            </li>
            <li>
              <span className="cursor-default">Careers &amp; Apprenticeship</span>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wide">
            LEGAL
          </span>
          <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
            <li>
              <span className="cursor-default">Privacy Policy</span>
            </li>
            <li>
              <span className="cursor-default">Terms of Service</span>
            </li>
            <li>
              <span className="cursor-default">Accessibility Matrix</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ELEVORA Studio Concept Disclosure Notice */}
      <div className="w-full px-margin-mobile md:px-margin py-space-lg bg-surface-container-low border-t border-surface-container-high">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md p-space-md bg-surface-container-lowest border border-surface-container-high shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-label-code text-xs uppercase font-bold text-secondary">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>CONCEPT DISCLOSURE // ELEVORA DIGITAL STUDIO</span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed max-w-2xl">
              This website is an unofficial creative direction and e-commerce flagship concept prepared by <strong>ELEVORA</strong> for prospective client review. It is not an officially owned, approved, or endorsed platform of Downtown Originals. All trademarks, photography, product names, inventory quantities, and prices are illustrative prototype data.
            </p>
          </div>
          <div className="shrink-0 font-label-code text-[11px] uppercase bg-surface-container-high px-3 py-1.5 text-primary font-bold border border-surface-container-highest">
            PORTFOLIO CONCEPT PREVIEW
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="w-full px-margin-mobile md:px-margin py-space-md border-t border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-space-md font-label-meta text-label-meta uppercase text-on-surface-variant">
        <div>
          © 2025 DOWNTOWN ORIGINALS. UNOFFICIAL DIGITAL CONCEPT BY ELEVORA. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-space-md">
          <span className="text-on-surface font-semibold">CURRENCY: INR ₹ / INDIA</span>
          <span className="text-outline">|</span>
          <span>EN</span>
        </div>
      </div>
    </footer>
  );
};
