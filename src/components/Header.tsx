import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Marquee } from './magicui/marquee';

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
    { label: 'OUTERWEAR', path: '/shop?cat=outerwear' },
    { label: 'TEES', path: '/shop?cat=tees' },
    { label: 'FORMALS', path: '/shop?cat=formals' },
    { label: 'EDITORIAL', path: '/#campaign' }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high transition-all">
        {/* Magic UI Announcement Marquee Bar */}
        <div className="bg-primary text-on-primary overflow-hidden border-b border-primary py-1 sm:py-1.5 select-none">
          <Marquee
            pauseOnHover
            repeat={4}
            className="[--duration:28s] font-label-code text-[10px] sm:text-[11px] uppercase tracking-widest font-medium py-0"
          >
            <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap px-3 sm:px-4">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
              <span className="font-bold text-white">DOWNTOWN ORIGINALS</span>
              <span className="text-outline">/</span>
              <span>STREETWEAR</span>
              <span className="text-outline">/</span>
              <span>FORMALS</span>
              <span className="text-outline">/</span>
              <span className="text-secondary-fixed font-bold">OWN YOUR EVERYDAY</span>
              <span className="text-outline">/</span>
              <span>NEW ARRIVALS</span>
              <span className="text-outline">/</span>
              <span className="text-secondary-fixed">DROP 04: SURPLUS METROPOLIS</span>
              <span className="text-outline">/</span>
              <span>FREE COMPLIMENTARY SHIPPING OVER ₹3,999</span>
              <span className="text-outline">/</span>
              <span className="text-outline-variant">ELEVORA CONCEPT PREVIEW</span>
            </div>
          </Marquee>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-16 sm:h-20 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            {/* Mobile Menu Toggle Button */}
            <button
              aria-label="Open Navigation Menu"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-primary hover:text-secondary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* Brand Logo */}
            <Link
              to="/"
              className="font-headline-sm text-xl sm:text-2xl lg:text-[26px] uppercase tracking-tight text-primary hover:opacity-80 transition-opacity font-bold truncate whitespace-nowrap flex items-center gap-2"
            >
              <span>DOWNTOWN ORIGINALS</span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-secondary mb-1"></span>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`font-title-sm text-xs tracking-widest uppercase transition-all duration-200 relative py-1 ${
                  isActive(link.path)
                    ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              aria-label="Search Collection"
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center text-primary hover:text-secondary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop?filter=wishlist"
              aria-label="Wishlist"
              className="relative w-10 h-10 hidden sm:flex items-center justify-center text-primary hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">favorite_border</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 font-label-code text-[10px] bg-secondary text-on-secondary w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              aria-label="Shopping Bag"
              onClick={openCart}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-primary bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-all duration-200 group shadow-sm active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
              <span className="font-label-code text-xs text-secondary font-bold group-hover:text-white transition-colors">
                [ {cartCount} ]
              </span>
            </button>
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
          className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-surface-container-lowest flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-out border-r border-surface-container-high ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drawer Top */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <span className="font-headline-sm text-xl uppercase text-primary font-bold">
                DOWNTOWN ORIGINALS
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-primary hover:text-secondary"
                type="button"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4 font-headline-sm text-2xl uppercase">
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
                className="hover:text-secondary transition-colors text-on-surface-variant text-xl"
              >
                OUTERWEAR &amp; JACKETS
              </Link>
              <Link
                to="/shop?cat=tees"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant text-xl"
              >
                HEAVYWEIGHT TEES
              </Link>
              <Link
                to="/shop?cat=hoodies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant text-xl"
              >
                FLEECE &amp; HOODIES
              </Link>
              <Link
                to="/shop?cat=cargos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant text-xl"
              >
                TACTICAL CARGOS
              </Link>
              <Link
                to="/shop?cat=formals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant text-xl"
              >
                REFINED FORMALS
              </Link>
              <Link
                to="/shop?cat=accessories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-secondary transition-colors text-on-surface-variant text-xl"
              >
                SURPLUS ACCESSORIES
              </Link>
            </div>
          </div>

          {/* Mobile Drawer Bottom */}
          <div className="pt-6 border-t border-surface-container-high flex flex-col gap-4 font-label-code text-xs text-on-surface-variant uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="text-secondary font-bold">DROP 04 // SURPLUS METROPOLIS</span>
            </div>
            <p className="text-body-sm normal-case text-on-surface-variant leading-relaxed">
              Complimentary courier delivery across India on all orders exceeding ₹3,999.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-1.5 text-primary hover:text-secondary font-bold"
                type="button"
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
                className="flex items-center gap-1.5 text-primary hover:text-secondary font-bold"
                type="button"
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
