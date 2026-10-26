import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, LOOKBOOK_HERO_IMAGE, CAMPAIGN_IMAGE, CURATED_CATEGORIES, COMMUNITY_POSTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { TextAnimate } from '../components/magicui/text-animate';
import { BlurFade } from '../components/magicui/blur-fade';
import { ShineBorder } from '../components/magicui/shine-border';

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
    <div className="w-full pt-24 sm:pt-28 bg-surface">
      <div className="flex flex-col w-full">
        {/* HERO SECTION: High-contrast Editorial Split */}
        <section className="relative w-full bg-surface-container-lowest -mt-24 sm:-mt-28 pt-24 sm:pt-28 pb-8 sm:pb-20 overflow-hidden border-b border-surface-container-high">
          <div className="w-full px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
            {/* Left Column: Typography & Intent */}
            <div className="lg:col-span-7 flex flex-col justify-center py-4 sm:py-8 lg:py-12 pr-0 lg:pr-8">
              {/* Editorial Micro Indicators */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 font-label-code text-[11px] sm:text-xs uppercase tracking-widest text-on-surface-variant">
                <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 bg-secondary text-on-secondary font-bold tracking-widest">
                  DROP 04 // SURPLUS &amp; FORMAL
                </span>
                <span className="text-outline">/</span>
                <span className="text-primary font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                  LIMITED RUN
                </span>
              </div>

              {/* Master Title with Magic UI Text Animate */}
              <h1 className="font-display-hero text-4xl sm:text-7xl lg:text-[88px] uppercase tracking-tight text-primary leading-[0.95] mb-4 sm:mb-6">
                <TextAnimate
                  by="word"
                  animation="blurInUp"
                  duration={0.45}
                  delay={0.08}
                  as="span"
                  className="block text-primary"
                >
                  OWN YOUR
                </TextAnimate>
                <TextAnimate
                  by="word"
                  animation="blurInUp"
                  duration={0.45}
                  delay={0.2}
                  as="span"
                  className="block text-outline-variant hover:text-primary transition-colors duration-300"
                >
                  EVERYDAY.
                </TextAnimate>
              </h1>

              {/* Subhead and CTAs with Magic UI Blur Fade */}
              <BlurFade delay={0.15} duration={0.4} yOffset={6}>
                <p className="font-body-lg text-sm sm:text-base lg:text-lg text-on-surface-variant max-w-xl mb-6 sm:mb-8 leading-relaxed">
                  Everyday streetwear engineered with structural integrity. Relaxed silhouettes, dense custom-milled textiles, and functional surplus details built to endure daily wear.
                </p>

                {/* CTA Cluster with High-Visibility Touch Targets */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                  <Link
                    to="/shop"
                    className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] bg-primary text-on-primary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-all flex items-center justify-center gap-2 group shadow-md active:scale-95"
                  >
                    <span>SHOP DROP 04</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                  <a
                    href="#new-arrivals"
                    className="flex-1 sm:flex-initial px-5 sm:px-6 py-3.5 sm:py-4 min-h-[48px] bg-surface-container-low text-primary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-surface-container-high active:scale-95"
                  >
                    <span>NEW ARRIVALS</span>
                  </a>
                </div>
              </BlurFade>

              {/* Metric Pulse Ticker */}
              <BlurFade delay={0.25} duration={0.4} yOffset={6}>
                <div className="bg-surface-container-low p-3 sm:p-4 border border-surface-container-high grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2 font-label-code text-[10px] sm:text-[11px] uppercase text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">local_shipping</span>
                    <span>DISPATCH IN 24-48 HRS</span>
                  </div>
                  <div className="flex items-center gap-2 font-label-code text-[10px] sm:text-[11px] uppercase text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[16px] sm:text-[18px]">published_with_changes</span>
                    <span>7-DAY HASSLE-FREE EXCHANGES</span>
                  </div>
                  <div className="flex items-center gap-2 font-label-code text-[10px] sm:text-[11px] uppercase text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">verified</span>
                    <span>FREE SHIPPING OVER ₹3,999</span>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Right Column: Hero Fashion Photography with LCP Optimization */}
            <BlurFade delay={0.1} duration={0.5} yOffset={8} className="lg:col-span-5">
              <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[720px] bg-surface-container-low overflow-hidden group border border-surface-container-high shadow-lg">
                <img
                  src={LOOKBOOK_HERO_IMAGE}
                  alt="Downtown Originals Lookbook — Model wearing Metro Surplus M-65 Jacket in Washed Charcoal"
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Spec Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-on-primary">
                  <div className="bg-primary/95 backdrop-blur-sm px-3 py-1 font-label-code text-[11px] uppercase tracking-wider font-bold">
                    SERIES 04 // LOOK 01
                  </div>
                  <div className="bg-secondary/95 backdrop-blur-sm px-3 py-1 font-label-code text-[11px] uppercase tracking-wider font-bold text-on-secondary">
                    METRO SURPLUS M-65 JACKET
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* SECTION 2: NEW ARRIVALS */}
        <section id="new-arrivals" className="w-full px-3 sm:px-8 lg:px-12 py-16 sm:py-20 bg-surface border-b border-surface-container-high">
          {/* Section Header with Blur Fade */}
          <BlurFade delay={0.1} duration={0.4} yOffset={6}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <span className="font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
                  DROP 04 ARCHIVE RELEASES
                </span>
                <h2 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary leading-none mt-1">
                  NEW ARRIVALS.
                </h2>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl mt-2">
                  Functional silhouettes, heavyweight French terry, and modular utility cargos cut for everyday movement.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
                {newArrivalTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveNewArrivalTab(tab.id)}
                    className={`px-4 py-2 font-title-sm text-xs uppercase tracking-wider transition-all whitespace-nowrap border active:scale-95 ${
                      activeNewArrivalTab === tab.id
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface border-surface-container-high hover:border-primary'
                    }`}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Product Grid with Blur Fade */}
          <BlurFade delay={0.15} duration={0.45} yOffset={8}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
              {filteredNewArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </BlurFade>

          {/* Bottom Explore All CTA */}
          <div className="mt-12 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-4 bg-primary text-on-primary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-all flex items-center gap-2 group shadow-md active:scale-95"
            >
              <span>VIEW ALL PIECES ({PRODUCTS.length} STYLES)</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* SECTION 3: CURATED STREETWEAR */}
        <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 bg-surface-container-lowest border-b border-surface-container-high">
          <BlurFade delay={0.1} duration={0.4} yOffset={6}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
                  CORE CATEGORIES
                </span>
                <h2 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary leading-none mt-1">
                  CURATED SILHOUETTES.
                </h2>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl mt-2">
                  Wardrobe foundations shaped by substantial textiles, relaxed proportions, and purposeful utility.
                </p>
              </div>
              <Link
                to="/shop"
                className="font-title-sm text-xs sm:text-sm uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-1 transition-colors"
              >
                <span>EXPLORE ALL ARCHIVES</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </BlurFade>

          {/* 5 Categories Cards Grid with Blur Fade */}
          <BlurFade delay={0.15} duration={0.45} yOffset={8}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
              {CURATED_CATEGORIES.map((cat) => (
                <Link
                  key={cat.num}
                  to={`/shop?cat=${cat.categoryFilter}`}
                  className="group flex flex-col bg-surface border border-surface-container-high hover:border-primary overflow-hidden transition-all duration-200"
                >
                  <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden">
                    <img
                      src={cat.image}
                      alt={`Downtown Originals Category: ${cat.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-primary text-on-primary font-label-code text-xs font-bold">
                      {cat.num}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                    <div>
                      <span className="font-label-code text-[10px] uppercase text-secondary font-bold">
                        {cat.category}
                      </span>
                      <h3 className="font-title-sm text-sm uppercase text-primary font-bold mt-1 group-hover:text-secondary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-surface-container-high flex items-center justify-between font-label-code text-xs text-primary uppercase">
                      <span>SHOP CATEGORY</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </BlurFade>
        </section>

        {/* SECTION 4: CAMPAIGN EDITORIAL */}
        <section id="campaign" className="relative w-full bg-primary text-on-primary py-16 sm:py-24 overflow-hidden">
          <div className="w-full px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center py-6">
              <span className="font-label-code text-xs uppercase tracking-widest text-secondary-container font-bold mb-2">
                CAMPAIGN EDITORIAL // METROPOLIS '25
              </span>
              <div className="font-label-code text-xs uppercase tracking-wider text-outline-variant mb-4">
                VISUAL ARCHIVE • DROP 04
              </div>
              <h2 className="font-headline-lg text-4xl sm:text-6xl uppercase text-on-primary leading-none mb-6">
                <TextAnimate
                  by="word"
                  animation="blurInUp"
                  duration={0.45}
                  delay={0.1}
                  as="span"
                  className="block text-on-primary"
                >
                  LESS ORDINARY.
                </TextAnimate>
                <span className="text-secondary-fixed block">MORE YOU.</span>
              </h2>
              <p className="font-body-lg text-base sm:text-lg text-primary-fixed-dim max-w-xl mb-8 leading-relaxed">
                Personal style is an everyday statement. We design garments that prioritize structure, proportion, and comfortable utility—giving you pieces that move naturally from dawn commutes to midnight city streets.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-secondary text-on-secondary font-title-sm text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary-container transition-colors flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <span>SHOP THE EDITORIAL LOOKS</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Image: Featured Campaign Highlight with Magic UI Shine Border */}
            <div className="lg:col-span-6">
              <ShineBorder
                borderWidth={1.5}
                duration={14}
                color={['#245BFF', '#FFFFFF', '#245BFF']}
                className="relative aspect-[4/5] w-full bg-surface-container-highest/10 overflow-hidden shadow-2xl border border-white/10"
              >
                <img
                  src={CAMPAIGN_IMAGE}
                  alt="Downtown Originals Campaign Editorial Metropolis '25 Lookbook"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm px-3 py-1 font-label-code text-xs text-on-primary uppercase border border-white/10 z-10">
                  METROPOLIS '25 CAPSULE
                </div>
              </ShineBorder>
            </div>
          </div>
        </section>

        {/* SECTION 5: STANDARDS & CRAFT */}
        <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 bg-surface border-b border-surface-container-high">
          <BlurFade delay={0.1} duration={0.4} yOffset={6}>
            <div className="mb-10">
              <span className="font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
                DESIGN PHILOSOPHY
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary leading-none mt-1">
                STANDARDS &amp; CRAFT.
              </h2>
            </div>
          </BlurFade>

          <BlurFade delay={0.15} duration={0.45} yOffset={8}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-surface-container-high hover:border-primary transition-colors">
                <div>
                  <div className="font-headline-md text-3xl text-secondary mb-3 leading-none font-bold">
                    01
                  </div>
                  <h3 className="font-title-md text-base sm:text-lg uppercase text-primary mb-2 font-bold">
                    SUBSTANTIAL TEXTILES
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Selected for density and hand-feel. Heavyweight 500 GSM loopback cotton, durable ripstop twill, and rigid selvedge denim that maintain clean structural drape.
                  </p>
                </div>
                <div className="mt-6 pt-3 flex items-center gap-1 font-label-code text-xs text-outline uppercase border-t border-surface-container-high">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                  <span>PREMIUM WEIGHT</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-surface-container-high hover:border-primary transition-colors">
                <div>
                  <div className="font-headline-md text-3xl text-secondary mb-3 leading-none font-bold">
                    02
                  </div>
                  <h3 className="font-title-md text-base sm:text-lg uppercase text-primary mb-2 font-bold">
                    CONTROLLED RUNS
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Produced in small, numbered capsule batches to prioritize quality control and reduce deadstock. Once an edition sells out, it enters our design archive.
                  </p>
                </div>
                <div className="mt-6 pt-3 flex items-center gap-1 font-label-code text-xs text-outline uppercase border-t border-surface-container-high">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  <span>LIMITED BATCHES</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-surface-container-high hover:border-primary transition-colors">
                <div>
                  <div className="font-headline-md text-3xl text-secondary mb-3 leading-none font-bold">
                    03
                  </div>
                  <h3 className="font-title-md text-base sm:text-lg uppercase text-primary mb-2 font-bold">
                    FUNCTIONAL DETAILS
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Articulated knee darts, two-way metal zippers, and adjustable bungee hem cords designed for natural movement and versatility across city settings.
                  </p>
                </div>
                <div className="mt-6 pt-3 flex items-center gap-1 font-label-code text-xs text-outline uppercase border-t border-surface-container-high">
                  <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
                  <span>PRACTICAL UTILITY</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-surface-container-high hover:border-primary transition-colors">
                <div>
                  <div className="font-headline-md text-3xl text-secondary mb-3 leading-none font-bold">
                    04
                  </div>
                  <h3 className="font-title-md text-base sm:text-lg uppercase text-primary mb-2 font-bold">
                    TIMELESS FIT
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Designed outside fleeting trend cycles. Focused on relaxed dropped shoulders, balanced proportions, and durable construction that stay wearable season after season.
                  </p>
                </div>
                <div className="mt-6 pt-3 flex items-center gap-1 font-label-code text-xs text-outline uppercase border-t border-surface-container-high">
                  <span className="material-symbols-outlined text-[16px] text-secondary">all_inclusive</span>
                  <span>SEASONLESS WEAR</span>
                </div>
              </div>
            </div>
          </BlurFade>
        </section>

        {/* SECTION 6: COMMUNITY STYLE SPOTLIGHT */}
        <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 bg-surface-container-lowest">
          <BlurFade delay={0.1} duration={0.4} yOffset={6}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="font-label-code text-xs uppercase tracking-widest text-secondary font-bold">
                  COMMUNITY
                </span>
                <h2 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary leading-none mt-1">
                  STREET STYLE.
                </h2>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-2">
                  Styled by individuals in cities worldwide. Tag <span className="text-primary font-bold">#DOWNTOWNORIGINALS</span> to share your look.
                </p>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-title-sm text-xs sm:text-sm uppercase tracking-wider text-primary hover:text-secondary transition-colors"
              >
                <span>FOLLOW @DOWNTOWNORIGINALS</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.15} duration={0.45} yOffset={8}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {COMMUNITY_POSTS.map((post, idx) => (
                <div key={idx} className="relative aspect-square bg-surface-container-low group overflow-hidden border border-surface-container-high hover:border-primary transition-colors">
                  <img
                    src={post.image}
                    alt={`Street style by ${post.handle} in ${post.location} wearing Downtown Originals`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-on-primary">
                    <div className="font-label-code text-[9px] sm:text-[10px] text-secondary-fixed uppercase tracking-wider font-bold">
                      {post.location}
                    </div>
                    <div className="font-title-sm text-xs sm:text-sm uppercase font-bold">
                      {post.handle}
                    </div>
                    <div className="font-label-code text-[9px] sm:text-[10px] text-on-secondary-container truncate opacity-90">
                      {post.item}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        </section>
      </div>
    </div>
  );
};
