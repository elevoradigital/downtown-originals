import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Marquee } from './magicui/marquee';

interface HeaderProps {
  onOpenSearch: () => void;
  splineSceneUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bagAnimated, setBagAnimated] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'SHOP ALL', path: '/shop' },
    { label: 'NEW ARRIVALS', path: '/shop?cat=all' },
    { label: 'OUTERWEAR', path: '/shop?cat=outerwear' },
    { label: 'TEES', path: '/shop?cat=tees' },
    { label: 'FORMALS', path: '/shop?cat=formals' },
    { label: 'EDITORIAL', path: '/#campaign' }
  ];

  const mobileNavLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP ALL COLLECTION', path: '/shop' },
    { label: 'OUTERWEAR & JACKETS', path: '/shop?cat=outerwear' },
    { label: 'HEAVYWEIGHT TEES', path: '/shop?cat=tees' },
    { label: 'FLEECE & HOODIES', path: '/shop?cat=hoodies' },
    { label: 'TACTICAL CARGOS', path: '/shop?cat=cargos' },
    { label: 'REFINED FORMALS', path: '/shop?cat=formals' },
    { label: 'SURPLUS ACCESSORIES', path: '/shop?cat=accessories' }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    const currentFull = location.pathname + location.search;
    if (path === '/shop?cat=all') return currentFull === '/shop?cat=all';
    if (path === '/shop') return location.pathname === '/shop' && (!location.search || location.search === '');
    return currentFull === path;
  };

  // Body scroll lock & Escape listener for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Micro-interaction: Pulse bag indicator when cart count updates
  useEffect(() => {
    if (cartCount > 0) {
      setBagAnimated(true);
      const timer = setTimeout(() => setBagAnimated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container-high transition-all">
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
              <span>COMPLIMENTARY SHIPPING OVER ₹3,999</span>
              <span className="text-outline">/</span>
              <span>7-DAY HASSLE-FREE EXCHANGES</span>
              <span className="text-outline">/</span>
              <span className="text-outline-variant">ELEVORA CONCEPT PREVIEW</span>
            </div>
          </Marquee>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-16 sm:h-20 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Mobile Liquid Glass Circular Trigger & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            {/* Mobile Liquid Glass Circular Control (Element A) */}
            <button
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden shrink-0 w-11 h-11 liquid-glass-circle flex items-center justify-center text-primary hover:text-secondary active:scale-90 transition-transform relative z-10 group"
              type="button"
            >
              {/* Internal optical reflection sheen */}
              <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-white/60 opacity-80" />

              {/* Central Morphing Icon */}
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center text-primary"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </motion.div>
            </button>

            {/* Brand Logo */}
            <Link
              to="/"
              className="font-headline-sm text-xl sm:text-2xl lg:text-[26px] uppercase tracking-tight text-primary hover:opacity-80 active:scale-[0.99] transition-all font-bold truncate whitespace-nowrap flex items-center gap-2"
            >
              <span>DOWNTOWN ORIGINALS</span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-secondary mb-1"></span>
            </Link>
          </div>

          {/* Center: Desktop Liquid Glass Floating Capsule Navigation */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full liquid-glass-pill relative">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative font-title-sm text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-colors duration-200 z-10 flex items-center gap-1.5 select-none ${
                    active ? 'text-white font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="desktopLiquidGlassActivePill"
                      className="absolute inset-0 bg-primary rounded-full shadow-md z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>{link.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Liquid Glass Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger (Circular Glass Button) */}
            <button
              aria-label="Search collection"
              onClick={onOpenSearch}
              className="w-10 h-10 sm:w-11 sm:h-11 liquid-glass-circle flex items-center justify-center text-primary hover:text-secondary active:scale-90 transition-transform shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">search</span>
            </button>

            {/* Wishlist Link (Circular Glass Button with Reactive Badge) */}
            <Link
              to="/shop?filter=wishlist"
              aria-label={`Wishlist (${wishlistCount} saved pieces)`}
              className="relative w-10 h-10 sm:w-11 sm:h-11 liquid-glass-circle hidden sm:flex items-center justify-center text-primary hover:text-secondary active:scale-90 transition-transform shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">favorite_border</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 font-label-code text-[9px] bg-secondary text-on-secondary w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag (Pill Glass Button with Reactive Micro-Interaction) */}
            <button
              aria-label={`Shopping bag with ${cartCount} items`}
              onClick={openCart}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 liquid-glass-pill rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-200 group shadow-sm active:scale-95 ${
                bagAnimated ? 'scale-105 border-secondary ring-1 ring-secondary' : ''
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span className={`font-label-code text-xs font-bold transition-all ${
                bagAnimated ? 'text-secondary font-black' : 'text-secondary group-hover:text-white'
              }`}>
                [ {cartCount} ]
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Liquid Glass Fluid Morphing Menu (Element B & C) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col justify-start p-3 sm:p-5 lg:hidden overflow-y-auto"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              id="mobileGlassMenu"
              initial={{ opacity: 0, scale: 0.94, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="w-full max-w-sm mx-auto liquid-glass-surface rounded-3xl p-5 shadow-2xl flex flex-col gap-4 mt-16 sm:mt-20 border border-white/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Capsule Header */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high/60">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-base uppercase text-primary font-bold">
                    DOWNTOWN ORIGINALS
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-label-code text-[9px] font-bold">
                    DROP 04
                  </span>
                </div>

                {/* Circular Glass Close Button */}
                <button
                  aria-label="Close navigation menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 liquid-glass-circle flex items-center justify-center text-primary hover:text-secondary active:scale-90 transition-transform"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Navigation Destinations */}
              <nav className="flex flex-col gap-1 py-1">
                {mobileNavLinks.map((item) => {
                  const currentFull = location.pathname + location.search;
                  const active =
                    item.path === currentFull ||
                    (item.path === '/shop' && location.pathname === '/shop' && !location.search);

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative min-h-[44px] px-3.5 py-2.5 rounded-xl flex items-center justify-between font-title-sm text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        active
                          ? 'bg-primary text-white font-bold shadow-sm'
                          : 'text-primary/90 hover:bg-white/40 active:bg-white/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Quick Action Strip */}
              <div className="pt-3 border-t border-surface-container-high/60 grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="py-2.5 px-2 liquid-glass-pill rounded-xl flex items-center justify-center gap-1 font-label-code text-[11px] uppercase font-bold text-primary hover:bg-white/80 active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">search</span>
                  <span>SEARCH</span>
                </button>

                <Link
                  to="/shop?filter=wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-2 liquid-glass-pill rounded-xl flex items-center justify-center gap-1 font-label-code text-[11px] uppercase font-bold text-primary hover:bg-white/80 active:scale-95 transition-all relative"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite_border</span>
                  <span>SAVED</span>
                  {wishlistCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-secondary text-on-secondary rounded-full text-[9px] font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="py-2.5 px-2 liquid-glass-pill rounded-xl flex items-center justify-center gap-1 font-label-code text-[11px] uppercase font-bold text-primary hover:bg-white/80 active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>BAG ({cartCount})</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
