import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(PRODUCTS.slice(0, 4)); // default suggested items
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 4));
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.gsm.toLowerCase().includes(q) ||
        p.fitArchitecture.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-surface-container-lowest shadow-2xl overflow-hidden border border-surface-container-high flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-space-md border-b border-surface-container-high flex items-center gap-space-sm bg-surface-container-low">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, SILHOUETTES, GSM, OR CATEGORIES..."
            className="flex-1 bg-transparent font-title-sm text-title-sm uppercase tracking-wide text-primary placeholder:text-on-surface-variant/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="font-label-code text-label-code px-2 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors uppercase"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-space-md py-2 border-b border-surface-container-high flex items-center gap-2 overflow-x-auto no-scrollbar font-label-code text-[11px] uppercase text-on-surface-variant">
          <span className="shrink-0 text-primary font-bold">TRENDING:</span>
          {['M-65 JACKET', 'HEAVYWEIGHT HOODIES', 'TACTICAL CARGOS', 'OVERSIZED TEES', '500 GSM'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="shrink-0 px-2 py-0.5 bg-surface-container-low hover:bg-surface-container-high transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-space-md flex flex-col gap-space-sm">
          <div className="font-label-meta text-label-meta uppercase tracking-wider text-on-surface-variant mb-1">
            {query.trim() ? `RESULTS (${results.length})` : 'POPULAR IN ARCHIVE'}
          </div>

          {results.length === 0 ? (
            <div className="py-space-xl text-center flex flex-col items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[36px]">search_off</span>
              <p className="font-body-md text-body-md">NO ARCHIVE PRODUCTS FOUND FOR "{query}"</p>
              <span className="font-label-meta text-label-meta uppercase">Try searching by category or fabric gsm</span>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.slug)}
                className="flex items-center gap-space-md p-space-sm hover:bg-surface-container-low transition-colors cursor-pointer group"
              >
                <div className="w-14 h-16 bg-surface-container overflow-hidden shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-space-xs font-label-meta text-label-meta uppercase tracking-wider text-secondary">
                    <span>{product.categoryLabel}</span>
                    <span>•</span>
                    <span>{product.gsm}</span>
                  </div>
                  <h4 className="font-title-sm text-title-sm text-primary uppercase group-hover:text-secondary transition-colors">
                    {product.name}
                  </h4>
                  <p className="font-label-code text-label-code text-on-surface-variant">
                    {product.subtitle}
                  </p>
                </div>
                <div className="font-label-code text-label-code font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-space-sm bg-surface-container-low border-t border-surface-container-high flex justify-between items-center font-label-meta text-label-meta uppercase text-on-surface-variant">
          <span>{PRODUCTS.length} TOTAL ARCHIVE UNITS</span>
          <button
            onClick={() => {
              onClose();
              navigate('/shop');
            }}
            className="text-primary hover:text-secondary font-bold flex items-center gap-1"
          >
            VIEW ALL CATALOG
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
