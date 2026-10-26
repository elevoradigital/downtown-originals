import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'SHOP ALL', path: '/shop' },
    { label: 'NEW ARRIVALS', path: '/shop?cat=all' },
    { label: 'STREETWEAR', path: '/shop?cat=tees' },
    { label: 'FORMALS', path: '/shop?cat=formals' },
    { label: 'ARCHIVE', path: '/shop?cat=outerwear' },
    { label: 'EDITORIAL', path: '/#campaign' }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high transition-all">
        {/* Top Announcement Marquee Bar */}
        <div className="bg-primary text-on-primary overflow-hidden border-b border-primary py-space-xs select-none">
          <div className="animate-marquee font-label-meta text-label-meta uppercase tracking-widest flex items-center gap-space-xl">
            {[1, 2, 3, 4].map((idx) => (
              <span key={idx} className="flex items-center gap-space-sm whitespace-nowrap">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                ELEVORA CONCEPT PREVIEW • UNOFFICIAL PROTOTYPE PREPARED FOR DOWNTOWN ORIGINALS • DROP 04: SURPLUS METROPOLIS • FREE SHIPPING OVER ₹3,999
              </span>
            ))}
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-16 sm:h-20 w-full px-3 sm:px-margin-mobile md:px-margin flex items-center justify-between gap-2 sm:gap-space-md">
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-space-xs lg:hidden shrink-0">
            <button
              aria-label="Open Navigation Menu"
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-primary hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-space-lg min-w-0">
            <Link
              to="/"
              className="font-headline-sm text-lg sm:text-headline-sm uppercase tracking-tight text-primary hover:opacity-80 transition-opacity truncate whitespace-nowrap"
            >
              DOWNTOWN ORIGINALS
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-space-lg">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`font-title-sm text-title-sm uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-bold underline decoration-2 underline-offset-8'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-space-sm md:gap-space-md">
            {/* Search Trigger */}
            <button
              aria-label="Search Collection"
              onClick={onOpenSearch}
              className="p-space-xs text-on-surface hover:text-secondary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop?filter=wishlist"
              aria-label="Wishlist"
              className="relative p-space-xs text-on-surface hover:text-secondary transition-colors hidden sm:flex"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 font-label-meta text-label-meta bg-secondary text-on-secondary w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              aria-label="Shopping Bag"
              onClick={openCart}
              className="flex items-center gap-space-xs px-space-sm py-space-xs border border-primary bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-all group"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="font-label-code text-label-code text-secondary font-bold group-hover:text-secondary-fixed">
                [ {cartCount} ]
              </span>
            </button>

            {/* Profile Avatar Indicator */}
            <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-surface-container-lowest flex flex-col justify-between p-space-lg shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drawer Top */}
          <div className="flex flex-col gap-space-lg">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-space-md">
              <span className="font-headline-sm text-headline-sm uppercase text-primary">
                DOWNTOWN ORIGINALS
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-space-xs text-primary hover:text-secondary"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-space-md font-headline-sm text-[22px] uppercase">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors"
              >
                HOME
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors"
              >
                SHOP ALL COLLECTION
              </Link>
              <Link
                to="/shop?cat=outerwear"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant"
              >
                OUTERWEAR &amp; JACKETS
              </Link>
              <Link
                to="/shop?cat=tees"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant"
              >
                HEAVYWEIGHT TEES
              </Link>
              <Link
                to="/shop?cat=hoodies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant"
              >
                FLEECE &amp; HOODIES
              </Link>
              <Link
                to="/shop?cat=cargos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant"
              >
                TACTICAL CARGOS
              </Link>
              <Link
                to="/shop?cat=formals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant"
              >
                REFINED FORMALS
              </Link>
              <Link
                to="/shop?cat=accessories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant"
              >
                SURPLUS ACCESSORIES
              </Link>
            </div>
          </div>

          {/* Mobile Drawer Bottom */}
          <div className="pt-space-lg border-t border-surface-container-high flex flex-col gap-space-md font-label-code text-label-code text-on-surface-variant uppercase">
            <div className="flex items-center gap-space-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span>DROP 04 // SURPLUS METROPOLIS</span>
            </div>
            <p className="text-body-sm normal-case text-on-surface-variant">
              Free express courier delivery across India on all orders exceeding ₹3,999.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-space-xs text-primary hover:text-secondary"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                SEARCH
              </button>
              <span>|</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="flex items-center gap-space-xs text-primary hover:text-secondary"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                BAG ({cartCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
