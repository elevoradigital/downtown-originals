import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface BottomNavProps {
  onOpenSearch: () => void;
  hideOnRoutes?: string[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenSearch }) => {
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

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      id="mobileBottomNav"
      className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container-high md:hidden transition-transform duration-300"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="h-16 px-2 flex items-center justify-around">
        {/* Home */}
        <Link
          to="/"
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 active:scale-90 transition-transform ${
            isHomeActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'
          }`}
          aria-label="Home"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isHomeActive ? 'home' : 'home'}
          </span>
          <span className="font-label-meta text-[10px] uppercase tracking-wider">
            HOME
          </span>
        </Link>

        {/* Shop All */}
        <Link
          to="/shop"
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 active:scale-90 transition-transform ${
            isShopActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'
          }`}
          aria-label="Shop Collection"
        >
          <span className="material-symbols-outlined text-[22px]">
            grid_view
          </span>
          <span className="font-label-meta text-[10px] uppercase tracking-wider">
            SHOP
          </span>
        </Link>

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex-1 h-full flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-primary active:scale-90 transition-transform"
          aria-label="Search Collection"
        >
          <span className="material-symbols-outlined text-[22px]">
            search
          </span>
          <span className="font-label-meta text-[10px] uppercase tracking-wider">
            SEARCH
          </span>
        </button>

        {/* Wishlist */}
        <Link
          to="/shop?filter=wishlist"
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 relative active:scale-90 transition-transform ${
            isWishlistActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'
          }`}
          aria-label={`Wishlist, ${wishlistCount} items`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">
              {isWishlistActive ? 'favorite' : 'favorite_border'}
            </span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 font-label-code text-[9px] bg-secondary text-on-secondary w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="font-label-meta text-[10px] uppercase tracking-wider">
            SAVED
          </span>
        </Link>

        {/* Bag */}
        <button
          type="button"
          onClick={openCart}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 relative active:scale-90 transition-transform ${
            isCartActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'
          }`}
          aria-label={`Shopping Bag, ${cartCount} items`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 font-label-code text-[9px] bg-primary text-on-primary w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-label-meta text-[10px] uppercase tracking-wider">
            BAG
          </span>
        </button>
      </div>
    </nav>
  );
};
