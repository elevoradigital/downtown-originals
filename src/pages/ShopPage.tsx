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
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-8 pb-6 bg-surface-container-lowest border-b border-surface-container-high">
        <BlurFade delay={0.05} duration={0.4} yOffset={6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-label-code text-xs uppercase tracking-widest text-secondary font-bold mb-1">
                <span>ARCHIVE CATALOG // DROP 04</span>
                <span>•</span>
                <span>SURPLUS METROPOLIS</span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary leading-none">
                {filterParam === 'wishlist' ? 'SAVED ARCHIVE PIECES' : 'SHOP ALL COLLECTION'}
              </h1>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl mt-2">
                Engineered silhouettes, custom heavyweights, and tailored surplus staples crafted for post-industrial movement.
              </p>
            </div>

            <div className="flex items-baseline gap-2 font-label-code text-xs uppercase text-on-surface-variant bg-surface-container-low px-3 py-1.5 border border-surface-container-high shrink-0 self-start md:self-auto">
              <span className="text-primary font-bold">{filteredProducts.length} OF {PRODUCTS.length}</span>
              <span>ARCHIVED PIECES AVAILABLE</span>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Category Pill Strip & Controls Bar */}
      <section className="sticky top-20 sm:top-24 z-30 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high shadow-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
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
      <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
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
                    NO ARCHIVED PIECES MATCH YOUR CRITERIA
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant max-w-md mt-1">
                    Try loosening your GSM specs, fit architecture, or price ceiling to view more garments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-primary text-on-primary font-title-sm text-xs uppercase tracking-wider hover:bg-secondary transition-colors"
                >
                  RESET MATRIX TO DEFAULT
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Responsive Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileFilterOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-surface-container-lowest p-6 overflow-y-auto flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out border-l border-surface-container-high ${
            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <span className="font-headline-sm text-lg uppercase text-primary font-bold">
                PARAMETRIC FILTERS
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-primary hover:text-secondary"
                type="button"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Fit Architecture */}
            <div className="py-4 border-b border-surface-container-high flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                FIT ARCHITECTURE
              </span>
              {FIT_ARCHITECTURES.map((fit) => (
                <label key={fit.label} className="flex items-center justify-between py-1 cursor-pointer">
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

            {/* GSM */}
            <div className="py-4 border-b border-surface-container-high flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                TEXTILE DENSITY
              </span>
              {FABRIC_GSM_OPTIONS.map((gsm) => (
                <label key={gsm} className="flex items-center justify-between py-1 cursor-pointer">
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

            {/* Sizes */}
            <div className="py-4 border-b border-surface-container-high flex flex-col gap-2">
              <span className="font-label-code text-xs uppercase font-bold text-primary">
                SIZE
              </span>
              <div className="grid grid-cols-5 gap-1 pt-1">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-center font-label-code text-xs font-bold border transition-colors ${
                        active
                          ? 'bg-secondary text-on-secondary border-secondary'
                          : 'bg-surface-container-lowest text-primary border-outline-variant'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Ceiling */}
            <div className="py-4 border-b border-surface-container-high flex flex-col gap-2">
              <div className="flex justify-between font-label-code text-xs font-bold text-primary">
                <span>PRICE CEILING</span>
                <span className="text-secondary">UP TO ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-secondary"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3.5 bg-primary text-on-primary font-title-sm text-xs uppercase tracking-wider hover:bg-secondary transition-colors"
              type="button"
            >
              SHOW {filteredProducts.length} PIECES
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 bg-surface-container-low border border-surface-container-high text-primary font-label-code text-xs uppercase"
                type="button"
              >
                RESET FILTERS
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
