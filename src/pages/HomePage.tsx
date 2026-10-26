import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, LOOKBOOK_HERO_IMAGE, CAMPAIGN_IMAGE, CURATED_CATEGORIES, COMMUNITY_POSTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const [activeNewArrivalTab, setActiveNewArrivalTab] = useState<string>('all');

  const newArrivalTabs = [
    { id: 'all', label: 'ALL RELEASES' },
    { id: 'outerwear', label: 'OUTERWEAR' },
    { id: 'tees', label: 'HEAVYWEIGHT TEES' },
    { id: 'cargos', label: 'MODULAR CARGOS' },
    { id: 'formals', label: 'TAILORED SURPLUS' }
  ];

  const filteredNewArrivals = PRODUCTS.filter((p) => {
    if (activeNewArrivalTab === 'all') return p.isNewArrival || p.isFeatured;
    return p.category === activeNewArrivalTab;
  }).slice(0, 4);

  return (
    <div className="w-full pt-28 bg-surface">
      <div className="flex flex-col w-full">
        {/* HERO SECTION: High-contrast Editorial Split */}
        <section className="relative w-full bg-surface-container-lowest -mt-28 pt-28 pb-space-2xl overflow-hidden border-b border-surface-container-high">
          <div className="w-full px-margin-mobile md:px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[calc(100vh-7rem)]">
            {/* Left Column: Typography & Intent */}
            <div className="lg:col-span-7 flex flex-col justify-center py-space-xl pr-0 lg:pr-space-xl">
              {/* Editorial Micro Indicators */}
              <div className="flex flex-wrap items-center gap-space-sm mb-space-md font-label-meta text-label-meta uppercase tracking-widest text-on-surface-variant">
                <span className="inline-flex items-center px-space-xs py-0.5 bg-secondary text-on-secondary font-medium tracking-widest">
                  DROP 04 / SURPLUS &amp; FORMAL HYBRID
                </span>
                <span className="text-outline">|</span>
                <span className="text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                  LIMITED PRODUCTION RUN
                </span>
              </div>

              {/* Master Title */}
              <h1 className="font-display-hero text-5xl sm:text-7xl lg:text-display-hero uppercase tracking-tight text-primary leading-none mb-space-md">
                OWN YOUR<br />
                <span className="text-on-surface-variant/40 hover:text-primary transition-colors duration-300">
                  EVERYDAY.
                </span>
              </h1>

              {/* Subhead */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-xl leading-relaxed">
                Streetwear engineered for uncompromising individuality. Raw military surplus silhouettes and Japanese technical textiles re-engineered for the hyper-dense modern metropolis.
              </p>

              {/* CTA Cluster */}
              <div className="flex flex-wrap items-center gap-space-md mb-space-2xl">
                <a
                  href="#new-arrivals"
                  className="px-space-xl py-4 bg-primary text-on-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-all flex items-center gap-space-sm group"
                >
                  <span>SHOP NEW ARRIVALS</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
                <a
                  href="#campaign"
                  className="px-space-lg py-4 bg-surface-container-low text-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-surface-container-highest transition-colors flex items-center gap-space-xs"
                >
                  <span>EXPLORE THE COLLECTION</span>
                </a>
              </div>

              {/* Metric Pulse Ticker */}
              <div className="bg-surface-container-low p-space-md border border-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm font-label-meta text-label-meta uppercase text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                  <span>DISPATCH WITHIN 24-48 HRS NATIONWIDE</span>
                </div>
                <div className="flex items-center gap-space-sm font-label-meta text-label-meta uppercase text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]">published_with_changes</span>
                  <span>VERIFIED 7-DAY EASY SIZE EXCHANGES</span>
                </div>
                <div className="flex items-center gap-space-sm font-label-meta text-label-meta uppercase text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  <span>100% AUTHENTIC METROPOLIS GRADE</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Fashion Photography */}
            <div className="lg:col-span-5 relative w-full h-[520px] sm:h-[640px] lg:h-[760px] bg-surface-container-low overflow-hidden group shadow-lg">
              <img
                src={LOOKBOOK_HERO_IMAGE}
                alt="Downtown Originals Metropolis '25 Lookbook Model"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Spec Badges */}
              <div className="absolute bottom-space-md left-space-md right-space-md flex flex-wrap items-center justify-between gap-space-xs text-on-primary">
                <div className="bg-primary/90 backdrop-blur-sm px-space-sm py-1 font-label-code text-label-code uppercase tracking-wider">
                  SERIES 04 // LOOK 01
                </div>
                <div className="bg-secondary/90 backdrop-blur-sm px-space-sm py-1 font-label-code text-label-code uppercase tracking-wider font-bold">
                  METRO SURPLUS M-65 HYBRID
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: NEW ARRIVALS */}
        <section id="new-arrivals" className="w-full px-margin-mobile md:px-margin py-space-2xl bg-surface border-b border-surface-container-high">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold">
                LIMITED PRODUCTION
              </span>
              <h2 className="font-headline-lg text-4xl sm:text-headline-lg uppercase text-primary leading-none mt-1">
                FRESH OFF THE DROP.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs">
                The latest pieces worth making room for. Engineered for daily wear, built for endurance.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar shrink-0">
              {newArrivalTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveNewArrivalTab(tab.id)}
                  className={`px-space-md py-space-xs font-title-sm text-title-sm uppercase tracking-wider transition-colors whitespace-nowrap ${
                    activeNewArrivalTab === tab.id
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredNewArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Explore All CTA */}
          <div className="mt-space-2xl text-center flex flex-col sm:flex-row justify-center items-center gap-space-md">
            <Link
              to="/shop"
              className="px-space-2xl py-4 bg-primary text-on-primary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-all flex items-center gap-space-sm group"
            >
              <span>VIEW FULL CATALOG (24 PIECES)</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* SECTION 3: CURATED STREETWEAR */}
        <section className="w-full px-margin-mobile md:px-margin py-space-2xl bg-surface-container-lowest border-b border-surface-container-high">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold">
                DIRECTORY 2025
              </span>
              <h2 className="font-headline-lg text-4xl sm:text-headline-lg uppercase text-primary leading-none mt-1">
                CURATED STREETWEAR.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-xs">
                Core apparel categories crafted from heavyweight textiles, surplus silhouettes, and modern ergonomics.
              </p>
            </div>
            <Link
              to="/shop"
              className="font-title-sm text-title-sm uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-1 transition-colors"
            >
              <span>EXPLORE ALL ARCHIVES</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* 5 Categories Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter">
            {CURATED_CATEGORIES.map((cat) => (
              <Link
                key={cat.num}
                to={`/shop?cat=${cat.categoryFilter}`}
                className="group flex flex-col bg-surface border border-surface-container-high overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-space-xs left-space-xs px-2 py-0.5 bg-primary text-on-primary font-label-code text-label-code font-bold">
                    {cat.num}
                  </div>
                </div>
                <div className="p-space-md flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <span className="font-label-meta text-[10px] uppercase text-secondary font-bold">
                      {cat.category}
                    </span>
                    <h3 className="font-title-sm text-title-sm uppercase text-primary font-bold mt-0.5 group-hover:text-secondary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-surface-container-high flex items-center justify-between font-label-code text-label-code text-primary uppercase">
                    <span>EXPLORE DROP</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 4: CAMPAIGN EDITORIAL */}
        <section id="campaign" className="relative w-full bg-primary text-on-primary py-space-2xl overflow-hidden">
          <div className="w-full px-margin-mobile md:px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center py-space-lg">
              <span className="font-label-code text-label-code uppercase tracking-widest text-secondary-container font-bold mb-space-xs">
                CAMPAIGN EDITORIAL // METROPOLIS '25
              </span>
              <div className="font-label-meta text-label-meta uppercase tracking-wider text-outline-variant mb-space-md">
                CAPTURED ON 35MM FILM • SHIBUYA CONCRETE DIVISION
              </div>
              <h2 className="font-headline-lg text-4xl sm:text-headline-lg uppercase text-on-primary leading-none mb-space-md">
                LESS ORDINARY.<br />
                <span className="text-secondary-fixed">MORE YOU.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl mb-space-xl leading-relaxed">
                Style is never about blending into the collective backdrop. Built between the high-density networks of Tokyo, London, and downtown grid districts. Each garment is produced with surplus durability and technical tactility to endure everyday metropolitan existence.
              </p>
              <div className="flex flex-wrap items-center gap-space-md">
                <Link
                  to="/shop"
                  className="px-space-xl py-4 bg-secondary text-on-secondary font-title-sm text-title-sm uppercase tracking-wider hover:bg-secondary-container transition-colors flex items-center gap-space-sm"
                >
                  <span>SHOP THE EDITORIAL LOOKS</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 relative aspect-[4/5] bg-surface-container-highest/10 overflow-hidden shadow-2xl">
              <img
                src={CAMPAIGN_IMAGE}
                alt="Campaign Editorial Metropolis '25 Lookbook"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-on-primary/20 pointer-events-none" />
              <div className="absolute bottom-space-md right-space-md bg-black/80 backdrop-blur-sm px-space-sm py-1 font-label-code text-label-code text-on-primary uppercase">
                35MM ARCHIVE / DO-25-CAPSULE
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: WHY DOWNTOWN ORIGINALS */}
        <section className="w-full px-margin-mobile md:px-margin py-space-2xl bg-surface border-b border-surface-container-high">
          <div className="mb-space-xl">
            <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold">
              MANUFACTURING CODE
            </span>
            <h2 className="font-headline-lg text-4xl sm:text-headline-lg uppercase text-primary leading-none mt-1">
              WHY DOWNTOWN ORIGINALS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Pillar 1 */}
            <div className="p-space-lg bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-surface-container-high">
              <div>
                <div className="font-headline-md text-headline-md text-secondary mb-space-sm leading-none font-bold">
                  01
                </div>
                <h3 className="font-title-md text-title-md uppercase text-primary mb-space-xs font-bold">
                  PREMIUM TEXTILE DENSITY
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Milled from custom 500GSM loopback cotton, Japanese selvedge twill, and high-tensile ripstop nylon. No corner cutting on seam strength or weight.
                </p>
              </div>
              <div className="mt-space-lg pt-space-xs flex items-center gap-1 font-label-meta text-label-meta text-outline uppercase border-t border-surface-container-high">
                <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                <span>CUSTOM SPECS</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-space-lg bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-surface-container-high">
              <div>
                <div className="font-headline-md text-headline-md text-secondary mb-space-sm leading-none font-bold">
                  02
                </div>
                <h3 className="font-title-md text-title-md uppercase text-primary mb-space-xs font-bold">
                  LIMITED BATCH RUNS
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  We never overproduce for seasonal discount racks. Every capsule drop is limited to 150–500 numbered units worldwide, safeguarding rarity.
                </p>
              </div>
              <div className="mt-space-lg pt-space-xs flex items-center gap-1 font-label-meta text-label-meta text-outline uppercase border-t border-surface-container-high">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                <span>NUMBERED ARCHIVE</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-space-lg bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-surface-container-high">
              <div>
                <div className="font-headline-md text-headline-md text-secondary mb-space-sm leading-none font-bold">
                  03
                </div>
                <h3 className="font-title-md text-title-md uppercase text-primary mb-space-xs font-bold">
                  MODULAR UTILITY PATTERNING
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Engineered with articulated knees, dual-entry bellows cargo pockets, and adjustable shock cords to adapt across shifting city climates.
                </p>
              </div>
              <div className="mt-space-lg pt-space-xs flex items-center gap-1 font-label-meta text-label-meta text-outline uppercase border-t border-surface-container-high">
                <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
                <span>ERGONOMIC FIT</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-space-lg bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-surface-container-high">
              <div>
                <div className="font-headline-md text-headline-md text-secondary mb-space-sm leading-none font-bold">
                  04
                </div>
                <h3 className="font-title-md text-title-md uppercase text-primary mb-space-xs font-bold">
                  ARCHIVE LONGEVITY
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Designed outside the frantic trend cycle. Every garment develops richer character through years of authentic metropolitan abrasion.
                </p>
              </div>
              <div className="mt-space-lg pt-space-xs flex items-center gap-1 font-label-meta text-label-meta text-outline uppercase border-t border-surface-container-high">
                <span className="material-symbols-outlined text-[16px] text-secondary">all_inclusive</span>
                <span>LIFETIME RESILIENCE</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: GLOBAL STREET STYLE SPOTLIGHT */}
        <section className="w-full px-margin-mobile md:px-margin py-space-2xl bg-surface-container-lowest">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-label-code text-label-code uppercase tracking-widest text-secondary font-bold">
                COMMUNITY SPOTLIGHT
              </span>
              <h2 className="font-headline-lg text-4xl sm:text-headline-lg uppercase text-primary leading-none mt-1">
                GLOBAL STREET STYLE.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Styled by tastemakers worldwide. Tag <span className="text-primary font-semibold">#DOWNTOWNORIGINALS</span> on Instagram to be featured.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-space-xs font-title-sm text-title-sm uppercase tracking-wider text-primary hover:text-secondary transition-colors"
            >
              <span>FOLLOW @DOWNTOWNORIGINALS</span>
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-gutter-sm">
            {COMMUNITY_POSTS.map((post, idx) => (
              <div key={idx} className="relative aspect-square bg-surface-container-low group overflow-hidden shadow-sm">
                <img
                  src={post.image}
                  alt={`${post.handle} in ${post.location}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-space-sm left-space-sm right-space-sm text-on-primary">
                  <div className="font-label-meta text-[10px] text-secondary-fixed uppercase tracking-wider">
                    {post.location}
                  </div>
                  <div className="font-title-sm text-sm uppercase font-bold">
                    {post.handle}
                  </div>
                  <div className="font-label-code text-[10px] text-on-secondary-container truncate">
                    {post.item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
