import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SplineGlassBackdrop } from './SplineGlassBackdrop';

interface BottomNavProps {
  onOpenSearch: () => void;
  splineSceneUrl?: string;
  hideOnRoutes?: string[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenSearch, splineSceneUrl }) => {
  const location = useLocation();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide on checkout to maximize screen focus for form inputs
  if (location.pathname === '/checkout') {
    return null;
  }

  const isHomeActive = location.pathname === '/';
  const isShopActive = location.pathname === '/shop' && !location.search.includes('wishlist');
  const isWishlistActive = location.search.includes('filter=wishlist');
  const isCartActive = location.pathname === '/cart';

  const navItems = [
    {
      id: 'home',
      label: 'HOME',
      icon: 'home',
      active: isHomeActive,
      type: 'link' as const,
      to: '/',
      ariaLabel: 'Home'
    },
    {
      id: 'shop',
      label: 'SHOP',
      icon: 'grid_view',
      active: isShopActive,
      type: 'link' as const,
      to: '/shop',
      ariaLabel: 'Shop Collection'
    },
    {
      id: 'search',
      label: 'SEARCH',
      icon: 'search',
      active: false,
      type: 'button' as const,
      onClick: onOpenSearch,
      ariaLabel: 'Search Collection'
    },
    {
      id: 'saved',
      label: 'SAVED',
      icon: isWishlistActive ? 'favorite' : 'favorite_border',
      active: isWishlistActive,
      type: 'link' as const,
      to: '/shop?filter=wishlist',
      badge: wishlistCount,
      ariaLabel: `Wishlist, ${wishlistCount} saved items`
    },
    {
      id: 'bag',
      label: 'BAG',
      icon: 'shopping_bag',
      active: isCartActive,
      type: 'button' as const,
      onClick: openCart,
      badge: cartCount,
      ariaLabel: `Shopping Bag, ${cartCount} items`
    }
  ];

  return (
    <div
      id="mobileBottomNavWrapper"
      className="fixed bottom-3.5 inset-x-3 sm:bottom-5 sm:inset-x-6 max-w-md mx-auto z-40 md:hidden transition-transform duration-300 pointer-events-none"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      {/* Floating Refractive Liquid Glass Capsule (Reference 2 Aesthetic) */}
      <SplineGlassBackdrop
        sceneUrl={splineSceneUrl}
        variant="chromatic"
        className="w-full h-[68px] sm:h-[72px] rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.4),0_8px_20px_rgba(36,91,255,0.25)] pointer-events-auto"
      >
        <nav
          aria-label="Mobile Navigation Capsule"
          id="mobileBottomNav"
          className="w-full h-full px-1.5 sm:px-3 flex items-center justify-around relative"
        >
          {navItems.map((item) => {
            const content = (
              <div className="relative flex flex-col items-center justify-center gap-1 z-10 w-full py-1">
                {/* Active Illuminated Glass Glider */}
                {item.active && (
                  <motion.div
                    layoutId="mobileRefractiveActiveGlider"
                    className="absolute inset-0 -m-1 rounded-full bg-white/20 border border-white/40 shadow-[0_2px_12px_rgba(255,255,255,0.3)] z-[-1]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}

                {/* Icon with Live Badge */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-[22px] transition-transform ${
                      item.active
                        ? 'text-white scale-105 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]'
                        : 'text-white/80'
                    }`}
                  >
                    {item.icon}
                  </span>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 font-label-code text-[8px] bg-secondary text-on-secondary w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold shadow-md border border-white/40">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Label & Active Electric-Blue Indicator Dot */}
                <div className="flex items-center gap-1">
                  <span
                    className={`font-label-meta text-[9.5px] uppercase tracking-wider transition-colors ${
                      item.active ? 'text-white font-bold drop-shadow-sm' : 'text-white/70'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.active && (
                    <span className="w-1 h-1 rounded-full bg-secondary inline-block animate-pulse" />
                  )}
                </div>
              </div>
            );

            if (item.type === 'link' && item.to) {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className="flex-1 h-full flex items-center justify-center relative active:scale-90 transition-transform py-1 px-0.5 select-none"
                  aria-label={item.ariaLabel}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className="flex-1 h-full flex items-center justify-center relative active:scale-90 transition-transform py-1 px-0.5 select-none"
                aria-label={item.ariaLabel}
              >
                {content}
              </button>
            );
          })}
        </nav>
      </SplineGlassBackdrop>
    </div>
  );
};
