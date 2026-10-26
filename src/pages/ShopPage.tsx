import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, FIT_ARCHITECTURES, FABRIC_GSM_OPTIONS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductSize } from '../types';
import { useWishlist } from '../context/WishlistContext';

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
    <div className="w-full pt-28 bg-surface">
      {/* Top Header Section */}
      <section className="w-full px-margin-mobile md:px-margin pt-space-lg pb-space-md bg-surface-container-lowest border-b border-surface-container-high">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs font-label-meta text-label-meta uppercase tracking-widest text-secondary font-bold mb-1">
              <span>ARCHIVE CATALOG // DROP 04</span>
              <span>•</span>
              <span>SURPLUS METROPOLIS</span>
            </div>
            <h1 className="font-headline-lg text-4xl sm:text-headline-lg uppercase text-primary leading-none">
              {filterParam === 'wishlist' ? 'SAVED ARCHIVE PIECES' : 'SHOP ALL COLLECTION'}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-xs">
              Engineered silhouettes, custom heavyweights, and tailored surplus staples crafted for post-industrial movement.
            </p>
          </div>

          <div className="flex items-baseline gap-space-xs font-label-code text-label-code uppercase text-on-surface-variant bg-surface-container-low px-space-sm py-space-xs border border-surface-container-high shrink-0">
            <span className="text-primary font-bold">{filteredProducts.length} OF {PRODUCTS.length}</span>
            <span>ARCHIVED PIECES AVAILABLE</span>
          </div>
        </div>
      </section>

      {/* Category Pill Strip & Controls Bar */}
      <section className="sticky top-28 z-30 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high shadow-sm">
        <div className="px-margin-mobile md:px-margin py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm">
          {/* Category Pills */}
          <div className="w-full md:w-auto flex items-center gap-space-xs overflow-x-auto no-scrollbar shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`category-pill px-space-md py-space-xs font-title-sm text-title-sm uppercase tracking-wider transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat.name} [{cat.count}]
              </button>
            ))}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-space-sm">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-low border border-surface-container-high text-primary font-label-code text-label-code uppercase tracking-wider hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 font-label-code text-label-code text-primary uppercase">
              <span className="hidden sm:inline text-on-surface-variant">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-container-low border border-surface-container-high px-space-sm py-space-xs font-label-code text-label-code uppercase text-primary focus:outline-none cursor-pointer"
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
      <section className="w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Desktop Parametric Matrix Sidebar */}
          <aside
            id="filterSidebar"
            className="lg:col-span-3 hidden lg:flex flex-col gap-space-lg sticky top-52 bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm"
          >
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-space-sm bg-surface-container-low px-space-sm py-space-xs border border-surface-container-high">
              <span className="font-headline-sm text-headline-sm uppercase text-primary">
                PARAMETRIC MATRIX
              </span>
              <span className="font-label-code text-label-code text-secondary font-bold">
                REV.04
              </span>
            </div>

            {/* Fit Architecture Filter */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between font-label-code text-label-code uppercase font-semibold text-primary">
                <span>FIT ARCHITECTURE</span>
                <span className="text-on-surface-variant text-[10px]">SELECT MULTIPLE</span>
              </div>
              <div className="flex flex-col gap-1.5 pt-space-xs">
                {FIT_ARCHITECTURES.map((fit) => {
                  const checked = selectedFits.includes(fit.label);
                  return (
                    <label
                      key={fit.label}
                      className="flex items-center justify-between cursor-pointer p-space-xs hover:bg-surface-container-low transition-colors"
                    >
                      <span className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFit(fit.label)}
                          className="accent-secondary h-4 w-4 cursor-pointer"
                        />
                        {fit.label}
                      </span>
                      <span className="font-label-meta text-label-meta px-1.5 py-0.5 bg-surface-container text-on-surface-variant">
                        {fit.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Textile Density / GSM Filter */}
            <div className="flex flex-col gap-space-xs pt-space-sm border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-label-code uppercase font-semibold text-primary">
                <span>TEXTILE DENSITY</span>
                <span className="text-on-surface-variant text-[10px]">GSM SPECS</span>
              </div>
              <div className="flex flex-col gap-1.5 pt-space-xs">
                {FABRIC_GSM_OPTIONS.map((gsm) => {
                  const checked = selectedGsm.includes(gsm);
                  return (
                    <label
                      key={gsm}
                      className="flex items-center justify-between cursor-pointer p-space-xs hover:bg-surface-container-low transition-colors"
                    >
                      <span className="font-body-md text-body-md text-on-surface flex items-center gap-2">
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
            <div className="flex flex-col gap-space-xs pt-space-sm border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-label-code uppercase font-semibold text-primary">
                <span>SIZE MATRIX</span>
                <span className="text-on-surface-variant text-[10px]">STREET FIT</span>
              </div>
              <div className="grid grid-cols-5 gap-1 pt-space-xs">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-center font-label-code text-label-code font-bold border transition-colors ${
                        active
                          ? 'bg-secondary text-on-secondary border-secondary'
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
            <div className="flex flex-col gap-space-xs pt-space-sm border-t border-surface-container-high">
              <div className="flex items-center justify-between font-label-code text-label-code uppercase font-semibold text-primary">
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
              <div className="flex justify-between font-label-meta text-[10px] text-on-surface-variant">
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
          <div className="lg:col-span-9 flex flex-col gap-space-xl">
            {/* Active Filters Pill Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-space-sm bg-surface-container-lowest border border-surface-container-high font-label-code text-label-code uppercase">
                <span className="text-on-surface-variant font-bold">APPLIED FILTERS:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    CAT: {selectedCategory}
                    <button onClick={() => handleCategoryChange('all')}>✕</button>
                  </span>
                )}
                {selectedFits.map((fit) => (
                  <span key={fit} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    {fit}
                    <button onClick={() => toggleFit(fit)}>✕</button>
                  </span>
                ))}
                {selectedGsm.map((gsm) => (
                  <span key={gsm} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    {gsm}
                    <button onClick={() => toggleGsm(gsm)}>✕</button>
                  </span>
                ))}
                {selectedSizes.map((size) => (
                  <span key={size} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    SIZE: {size}
                    <button onClick={() => toggleSize(size)}>✕</button>
                  </span>
                ))}
                {maxPrice < 10000 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-low border border-outline-variant">
                    ≤ ₹{maxPrice}
                    <button onClick={() => setMaxPrice(10000)}>✕</button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-secondary font-bold hover:underline ml-auto"
                >
                  CLEAR ALL
                </button>
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-space-2xl px-space-lg bg-surface-container-lowest border border-surface-container-high text-center flex flex-col items-center justify-center gap-space-md">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[36px]">filter_alt_off</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm uppercase text-primary">
                    NO ARCHIVED PIECES MATCH YOUR CRITERIA
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1">
                    Try loosening your GSM specs, fit architecture, or price limit to view more garments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-space-lg py-3 bg-primary text-on-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary transition-colors"
                >
                  RESET MATRIX TO DEFAULT
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
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
          className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-surface-container-lowest p-space-lg overflow-y-auto flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out ${
            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
              <span className="font-headline-sm text-headline-sm uppercase text-primary">
                PARAMETRIC FILTERS
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-primary hover:text-secondary"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Fit Architecture */}
            <div className="py-space-md border-b border-surface-container-high flex flex-col gap-2">
              <span className="font-label-code text-label-code uppercase font-bold text-primary">
                FIT ARCHITECTURE
              </span>
              {FIT_ARCHITECTURES.map((fit) => (
                <label key={fit.label} className="flex items-center justify-between py-1 cursor-pointer">
                  <span className="font-body-md text-sm text-on-surface flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFits.includes(fit.label)}
                      onChange={() => toggleFit(fit.label)}
                      className="accent-secondary h-4 w-4"
                    />
                    {fit.label}
                  </span>
                  <span className="font-label-meta text-xs text-on-surface-variant">
                    {fit.count}
                  </span>
                </label>
              ))}
            </div>

            {/* GSM Filter */}
            <div className="py-space-md border-b border-surface-container-high flex flex-col gap-2">
              <span className="font-label-code text-label-code uppercase font-bold text-primary">
                TEXTILE DENSITY / GSM
              </span>
              {FABRIC_GSM_OPTIONS.map((gsm) => (
                <label key={gsm} className="flex items-center py-1 cursor-pointer">
                  <span className="font-body-md text-sm text-on-surface flex items-center gap-2">
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
            <div className="py-space-md border-b border-surface-container-high flex flex-col gap-2">
              <span className="font-label-code text-label-code uppercase font-bold text-primary">
                SIZE
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-center font-label-code text-xs font-bold border ${
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
            <div className="py-space-md flex flex-col gap-2">
              <div className="flex justify-between font-label-code text-xs font-bold text-primary">
                <span>PRICE CEILING</span>
                <span className="text-secondary">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-secondary mt-1"
              />
            </div>
          </div>

          <div className="pt-space-md border-t border-surface-container-high flex gap-2">
            <button
              onClick={clearAllFilters}
              className="flex-1 py-3 bg-surface-container-low border border-outline text-primary font-title-sm text-xs uppercase"
            >
              RESET
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 py-3 bg-primary text-on-primary font-title-sm text-xs uppercase hover:bg-secondary"
            >
              APPLY ({filteredProducts.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
