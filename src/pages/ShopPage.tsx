import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, FIT_ARCHITECTURES, FABRIC_GSM_OPTIONS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductSize } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { BlurFade } from '../components/magicui/blur-fade';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  // Read URL params
  const categoryParam = searchParams.get('cat') || 'all';
  const filterParam = searchParams.get('filter');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedGsm, setSelectedGsm] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category state with URL param if it changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Lock body scroll when mobile filter bottom sheet is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileFilterOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileFilterOpen]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSearchParams(catId === 'all' ? {} : { cat: catId });
  };

  const toggleFit = (fit: string) => {
    setSelectedFits(prev =>
      prev.includes(fit) ? prev.filter(f => f !== fit) : [...prev, fit]
    );
  };

  const toggleGsm = (gsm: string) => {
    setSelectedGsm(prev =>
      prev.includes(gsm) ? prev.filter(g => g !== gsm) : [...prev, gsm]
    );
  };

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedFits([]);
    setSelectedGsm([]);
    setSelectedSizes([]);
    setMaxPrice(10000);
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedFits.length +
    selectedGsm.length +
    selectedSizes.length +
    (maxPrice < 10000 ? 1 : 0) +
    (filterParam === 'wishlist' ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Wishlist filter mode
      if (filterParam === 'wishlist' && !wishlist.includes(product.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Fit Architecture
      if (selectedFits.length > 0 && !selectedFits.includes(product.fitArchitecture)) {
        return false;
      }

      // Fabric GSM
      if (selectedGsm.length > 0) {
        const matchesGsm = selectedGsm.some(gsmOption => {
          if (gsmOption.includes('280 GSM') && product.gsm.includes('280')) return true;
          if (gsmOption.includes('380 GSM') && product.gsm.includes('380')) return true;
          if (gsmOption.includes('450 GSM') && product.gsm.includes('450')) return true;
          if (gsmOption.includes('500 GSM') && product.gsm.includes('500')) return true;
          if (gsmOption.includes('14oz') && product.gsm.includes('14oz')) return true;
          if (gsmOption.includes('Ripstop') && product.gsm.toLowerCase().includes('ripstop')) return true;
          return false;
        });
        if (!matchesGsm) return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s.size) && s.inStock);
        if (!hasSize) return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default order
    });
  }, [selectedCategory, selectedFits, selectedGsm, selectedSizes, maxPrice, sortBy, filterParam, wishlist]);

  return (
    <div className="w-full pt-24 sm:pt-28 bg-surface">
      {/* Top Header Section */}
      <section className="w-full px-3 sm:px-8 lg:px-12 pt-8 pb-6 bg-surface-container-lowest border-b border-surface-container-high">
        <BlurFade delay={0.05} duration={0.4} yOffset={6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-label-code text-xs uppercase tracking-widest text-secondary font-bold mb-1">
                <span>ARCHIVE CATALOG // DROP 04</span>
                <span>•</span>
                <span>SURPLUS METROPOLIS</span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary leading-none">
                {filterParam === 'wishlist' ? 'SAVED ARCHIVE PIECES' : 'ALL PIECES'}
              </h1>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl mt-2">
                Heavyweight basics, tailored hybrid blazers, and modular utility trousers designed for everyday movement.
              </p>
            </div>

            <div className="flex items-baseline gap-2 font-label-code text-xs uppercase text-on-surface-variant bg-surface-container-low px-3 py-1.5 border border-surface-container-high shrink-0 self-start md:self-auto">
              <span className="text-primary font-bold">{filteredProducts.length} OF {PRODUCTS.length}</span>
              <span>PIECES AVAILABLE</span>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Category Pill Strip & Controls Bar */}
      <section className="sticky top-20 sm:top-24 z-30 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high shadow-sm">
        <div className="px-3 sm:px-8 lg:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`category-pill px-4 py-1.5 font-title-sm text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-surface-container-high hover:border-primary'
                }`}
                type="button"
              >
                {cat.name} [{cat.count}]
              </button>
            ))}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low border border-surface-container-high text-primary font-label-code text-xs uppercase tracking-wider hover:bg-surface-container transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 font-label-code text-xs text-primary uppercase">
              <span className="hidden sm:inline text-on-surface-variant">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-container-low border border-surface-container-high px-3 py-1.5 font-label-code text-xs uppercase text-primary focus:outline-none cursor-pointer"
              >
                <option value="featured">FEATURED</option>
                <option value="newest">NEWEST</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Products Grid */}
      <section className="w-full px-3 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-32 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Parametric Matrix Sidebar */}
          <aside
            id="filterSidebar"
            className="lg:col-span-3 hidden lg:flex flex-col gap-6 sticky top-44 bg-surface-container-lowest p-6 border border-surface-container-high shadow-sm"
          >
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-3 bg-surface-container-low px-3 py-2 border border-surface-container-high">
              <span className="font-headline-sm text-sm uppercase text-primary font-bold">
                PARAMETRIC MATRIX
              </span>
              <span className="font-label-code text-xs text-secondary font-bold">
                REV.04
              </span>
            </div>

            {/* Fit Architecture Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-label-code text-xs uppercase font-bold text-primary">
                <span>FIT ARCHITECTURE</span>
                <span className="text-on-surface-variant text-[10px]">MULTIPLE</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                {FIT_ARCHITECTURES.map((fit) => {
                  const checked = selectedFits.includes(fit.label);
                  return (
                    <label
                      key={fit.label}
                      className="flex items-center justify-between cursor-pointer p-1.5 hover:bg-surface-container-low transition-colors"
                    >
                      <span className="font-body-md text-xs sm:text-sm text-on-surface flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFit(fit.label)}
                          className="accent-secondary h-4 w-4 cursor-pointer"
                        />
                        {fit.label}
                      </span>
                      <span className="font-label-code text-[10px] px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-bold">
                        {fit.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Textile Density / GSM Filter */}
            <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-xs uppercase font-bold text-primary">
                <span>TEXTILE DENSITY</span>
                <span className="text-on-surface-variant text-[10px]">GSM SPECS</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                {FABRIC_GSM_OPTIONS.map((gsm) => {
                  const checked = selectedGsm.includes(gsm);
                  return (
                    <label
                      key={gsm}
                      className="flex items-center justify-between cursor-pointer p-1.5 hover:bg-surface-container-low transition-colors"
                    >
                      <span className="font-body-md text-xs sm:text-sm text-on-surface flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleGsm(gsm)}
                          className="accent-secondary h-4 w-4 cursor-pointer"
                        />
                        {gsm}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Size Filter Pills */}
            <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-xs uppercase font-bold text-primary">
                <span>SIZE MATRIX</span>
                <span className="text-on-surface-variant text-[10px]">STREET FIT</span>
              </div>
              <div className="grid grid-cols-5 gap-1 pt-1">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-center font-label-code text-xs font-bold border transition-colors ${
                        active
                          ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                          : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-xs uppercase font-bold text-primary">
                <span>PRICE CEILING</span>
                <span className="font-bold text-secondary">UP TO ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-secondary cursor-pointer mt-1"
              />
              <div className="flex justify-between font-label-code text-[10px] text-on-surface-variant">
                <span>₹2,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Clear Filters Action */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-full py-2.5 bg-surface-container-low border border-primary text-primary hover:bg-primary hover:text-on-primary font-title-sm text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>RESET MATRIX FILTERS ({activeFilterCount})</span>
              </button>
            )}
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Active Filters Pill Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-3 bg-surface-container-lowest border border-surface-container-high font-label-code text-xs uppercase">
                <span className="text-on-surface-variant font-bold">APPLIED FILTERS:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    CAT: {selectedCategory}
                    <button onClick={() => handleCategoryChange('all')} className="hover:text-primary">✕</button>
                  </span>
                )}
                {selectedFits.map((fit) => (
                  <span key={fit} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    {fit}
                    <button onClick={() => toggleFit(fit)} className="hover:text-primary">✕</button>
                  </span>
                ))}
                {selectedGsm.map((gsm) => (
                  <span key={gsm} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    {gsm}
                    <button onClick={() => toggleGsm(gsm)} className="hover:text-primary">✕</button>
                  </span>
                ))}
                {selectedSizes.map((size) => (
                  <span key={size} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    SIZE: {size}
                    <button onClick={() => toggleSize(size)} className="hover:text-primary">✕</button>
                  </span>
                ))}
                {maxPrice < 10000 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    ≤ ₹{maxPrice}
                    <button onClick={() => setMaxPrice(10000)} className="hover:text-primary">✕</button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-secondary font-bold hover:underline ml-auto"
                  type="button"
                >
                  CLEAR ALL
                </button>
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 px-8 bg-surface-container-lowest border border-surface-container-high text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[36px]">filter_alt_off</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-xl uppercase text-primary font-bold">
                    NO PIECES MATCH YOUR SELECTED FILTERS
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant max-w-md mt-1">
                    Try loosening your GSM specs, fit architecture, or price limit to view more garments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-primary text-on-primary font-title-sm text-xs uppercase tracking-wider hover:bg-secondary transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div id="shopProductGrid" className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Responsive Mobile Filter Bottom Sheet */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileFilterOpen(false)}
      >
        <div
          className={`fixed inset-x-0 bottom-0 max-h-[85vh] bg-surface-container-lowest rounded-t-2xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 ease-out border-t border-surface-container-high ${
            isMobileFilterOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bottom Sheet Handle */}
          <div className="pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1 bg-surface-container-highest rounded-full" />
          </div>

          {/* Sheet Header */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-surface-container-high">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-lg uppercase text-primary font-bold">
                FILTER PIECES
              </span>
              {activeFilterCount > 0 && (
                <span className="font-label-code text-xs px-2 py-0.5 bg-secondary text-on-secondary rounded-full font-bold">
                  {activeFilterCount} ACTIVE
                </span>
              )}
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-primary hover:text-secondary active:scale-90 transition-transform"
              aria-label="Close filters"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Scrollable Filter Sections */}
          <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col divide-y divide-surface-container-high">
            {/* Category Filter */}
            <div className="py-3 flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                CATEGORY
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-3 py-1.5 font-label-code text-xs uppercase border transition-all active:scale-95 ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-on-primary border-primary font-bold shadow-sm'
                        : 'bg-surface-container-low text-primary border-surface-container-high hover:border-primary'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Architecture */}
            <div className="py-3 flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                FIT ARCHITECTURE
              </span>
              <div className="grid grid-cols-1 gap-1">
                {FIT_ARCHITECTURES.map((fit) => (
                  <label key={fit.label} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-surface-container-low px-1 transition-colors">
                    <span className="font-body-md text-xs sm:text-sm text-on-surface flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFits.includes(fit.label)}
                        onChange={() => toggleFit(fit.label)}
                        className="accent-secondary h-4 w-4"
                      />
                      {fit.label}
                    </span>
                    <span className="font-label-code text-[10px] px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-bold">
                      {fit.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* GSM */}
            <div className="py-3 flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                TEXTILE DENSITY
              </span>
              <div className="grid grid-cols-1 gap-1">
                {FABRIC_GSM_OPTIONS.map((gsm) => (
                  <label key={gsm} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-surface-container-low px-1 transition-colors">
                    <span className="font-body-md text-xs sm:text-sm text-on-surface flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedGsm.includes(gsm)}
                        onChange={() => toggleGsm(gsm)}
                        className="accent-secondary h-4 w-4"
                      />
                      {gsm}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="py-3 flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                SIZE AVAILABILITY
              </span>
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`min-h-[44px] py-2 text-center font-label-code text-xs font-bold border transition-all active:scale-90 ${
                        active
                          ? 'bg-secondary text-on-secondary border-secondary font-black'
                          : 'bg-surface-container-lowest text-primary border-surface-container-high hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Ceiling */}
            <div className="py-3 flex flex-col gap-2">
              <div className="flex justify-between font-label-code text-xs font-bold text-primary">
                <span>MAX PRICE</span>
                <span className="text-secondary font-bold">≤ ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-secondary h-2 bg-surface-container-high rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Sticky Bottom Actions inside Bottom Sheet */}
          <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex-1 min-h-[48px] py-3 bg-surface-container border border-surface-container-high text-primary font-label-code text-xs uppercase font-bold hover:bg-surface-container-highest transition-colors active:scale-95"
                type="button"
              >
                RESET
              </button>
            )}
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-2 w-full min-h-[48px] py-3 bg-primary text-on-primary font-title-sm text-xs uppercase tracking-wider hover:bg-secondary transition-colors shadow-md active:scale-95 font-bold flex items-center justify-center gap-1.5"
              type="button"
            >
              <span>APPLY FILTERS</span>
              <span>({filteredProducts.length} PIECES)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
