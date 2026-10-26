import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search, hash]);

  return null;
};

const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGlobalSizeGuideOpen, setIsGlobalSizeGuideOpen] = useState(false);

  // Global keyboard shortcut for search (e.g. '/' or 'Cmd+K')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !isSearchOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsGlobalSizeGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <ScrollToTop />
      
      {/* Site Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Routed View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Site Footer */}
      <Footer onOpenSizeGuide={() => setIsGlobalSizeGuideOpen(true)} />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SizeGuideModal isOpen={isGlobalSizeGuideOpen} onClose={() => setIsGlobalSizeGuideOpen(false)} />

      {/* Floating Concept Disclosure Badge */}
      <aside
        aria-label="Concept Prototype Disclosure"
        className="fixed bottom-4 left-4 z-30 hidden md:flex items-center gap-2.5 px-3.5 py-2 bg-primary/95 text-on-primary backdrop-blur-md border border-white/20 shadow-2xl font-label-meta text-[11px] uppercase tracking-wider select-none pointer-events-auto"
      >
        <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
        <span className="font-bold text-secondary-fixed">ELEVORA CONCEPT</span>
        <span className="text-outline-variant">|</span>
        <span className="text-white/80">Unofficial Prototype • Illustrative Data</span>
      </aside>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
