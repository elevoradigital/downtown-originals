import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'metro-surplus-m65-jacket',
    name: 'METRO SURPLUS M-65 JACKET',
    subtitle: 'Washed Japanese Cotton-Nylon Ripstop Shell',
    sku: 'M65-WCH-04',
    runNumber: 'RUN 01/250',
    category: 'outerwear',
    categoryLabel: 'JACKETS / SURPLUS',
    price: 6499,
    originalPrice: 7999,
    description: 'Engineered surplus silhouette constructed from high-density 380 GSM Japanese cotton-nylon ripstop. Features a stowable storm hood, articulated sleeves, and modular dual-entry chest cargo pockets with reinforced bar-tacks.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWS9UJgWB_SVySfPx9n_afIbFAnHJu49lvUgjQK7yvST280b8ImoKrjZCebWOmh1MoNd1yvpeVKvyjI4ICuJlI1qzy6G7ywVEVZ99ahQpKqcqn3MQvWJx1odV6hXb03Bif7KxgZqQifyfzAGleT1sfQwrwfxqyVa6oL8VO9ojEeNNfIM0P6uqlzDOz6MOjmQNIeeqJgpeqlGsRcf2pxIcc-unr2ZoGRYPJrnneiI0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcEBfJmGKRwqjJgxMy-kDB0pvF92JNIBudTW-v6ul-goLyK7hhs--YXsPFeafda7Tz7xHh7UunJyZ3k6kyn0vJne3o-9Ify19XIfdQnEmTeMDAo69h0k00llLe-cNSIkgqy8Hr70KAs59SVh3SKWGCkrd2JZAR59mQNSs20Wz5x2yOffxTr1o2osZKVsO3dO-8kEDLtY7d8yr3QSbkUnWE9_1YH7UmqqmZfcS25E',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Y6lgscVccAzUa8454eEWUVONWAFBysNZnb56USqGUuSrYbbc4XVRsJnn2bgLMfwXIgts-trvrfkxrR-j82AGtMD8-7BmotgDa1qUjLg3CXg2GAhoSMYampapgjYzwT8OrXtKZDBon1RyylrvKoZ7jO5e9HJrgwoWKE7JN1D6UNW1A-lhOw0a8xYbZZ5n0mytPLvrNU-WPoEQ1MZy0MKpV3L6wd_knkeovgJ8RQE',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJsv_3XRL5o9vUAJ4QSet_uxyZoEP8jkS4Ln35skMyAnCDLIx_ZpVW4tP2kJNyerstk5wvEPJofW8DMu1kjqOljDwpoiMcfrnCH8cCKIYhasoeVBt3ogGY4w_omu9XXCnp-o9C5EVDJH1bP2IU97zWJqJva86BEWqZSzJn-IZGrwC1h69cAMJcTnBOqANpjWJDAEkkdUd_gbTTxDlurgn75YZqtiij5lPkiuR-Tvk',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATYRzbzd3til82FiuCPeNnImk6LaL9veh4N0K7ZkhhvkGIZ18J8fJvM2e5ZvuaUu7sI6a3o9PgYeHER4-JaOMm7a8w1smRmkN4hBlnNayFgcPFCRa6FMbjX3lq87fH3p-n2sbb9k6YhN5OewUMTgc4x6YZEvJ6nDWqVSCpE911jYd2w8znzSKKjS_utEhQBQB0Hr5xE4T-6mBO2sI3cqzpfHLY1PWYS0onIY-yS6w'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#2B2C2D' },
      { name: 'Surplus Olive', hex: '#3B4436' },
      { name: 'Concrete Grey', hex: '#686B70' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true, lowStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    badge: 'LIMITED DROP',
    fitArchitecture: 'Dropped Shoulder Surplus',
    gsm: '380 GSM',
    material: '70% Milled Cotton, 30% High-Tensile Cordura Ripstop Nylon',
    specifications: [
      { label: 'Weave Architecture', value: '380 GSM Cotton-Nylon High-Density Ripstop' },
      { label: 'Hardware', value: 'Matte Gunmetal #8 YKK Dual-Directional Zip' },
      { label: 'Weather Proofing', value: 'Fluorocarbon-Free DWR Coating (Water Repellent)' },
      { label: 'Pockets', value: '6 Tactical Exterior Cargo + 2 Internal Storm Pockets' },
      { label: 'Origin', value: 'Fabric Milled in Osaka, Assembled in Mumbai' }
    ],
    features: [
      'Packable concealed hood with adjustable shock cord barrel toggles',
      'Dual-entry bellowed chest utility pockets with Fidlock magnetic flaps',
      'Articulated elbow darting engineered for unimpeded arm movement',
      'Internal military webbing harness for hands-free shoulder carry'
    ],
    careInstructions: [
      'Machine wash cold at 30°C on delicate cycle',
      'Do not use fabric softeners or chlorine bleach',
      'Hang dry in shade to preserve technical coating',
      'Cool iron inside out if necessary'
    ],
    measurements: [
      { size: 'S', chest: '58 cm', length: '72 cm', shoulder: '52 cm', sleeve: '62 cm' },
      { size: 'M', chest: '61 cm', length: '74 cm', shoulder: '54 cm', sleeve: '64 cm' },
      { size: 'L', chest: '64 cm', length: '76 cm', shoulder: '56 cm', sleeve: '66 cm' },
      { size: 'XL', chest: '67 cm', length: '78 cm', shoulder: '58 cm', sleeve: '67 cm' },
      { size: 'XXL', chest: '70 cm', length: '80 cm', shoulder: '60 cm', sleeve: '68 cm' }
    ],
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-002',
    slug: 'box-fit-oversized-graphic-tee',
    name: 'BOX-FIT OVERSIZED GRAPHIC TEE',
    subtitle: 'Drop 04 Architectural Blueprint Graphic',
    sku: 'TEE-BFG-04',
    runNumber: 'RUN 04/500',
    category: 'tees',
    categoryLabel: 'HEAVYWEIGHT TEES',
    price: 2499,
    originalPrice: 2999,
    description: 'Heavyweight 280 GSM combed cotton jersey cut in our signature wide, boxy drape. Features high-density screenprinted architectural typography and reinforced twin-needle 1.25" rib knit collar.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6FNjWgMIysLvC-LiLNUaYJ5ZbdrRPvcbXU5peoUQU4RWCoyNSE4S2LUbtdI0NH1xtS3fwUvdp2hmxkqIoNHP5BmBqH7RNFw75qdXcQCOZQ4Z6PYKhTmzDTMWg8IN1dZ7VEmtwPfkLr-NLUuitGRrRX1ic-Ft0GP_SUHxT-1uzPu-ahs_MpjGfIV7XMasdud2qdSjyozA6S_RyJnAOBPjUWHhiVieNirmJYaCEXNk',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAo0vb9YDEIwi3az3MQNopE996nX8k4NWR4VfW00T8jHX9PjGS9nK8YuU7RVZl98B0xuETMyT9HXLSPaXFciIyRQbNLvntmLCb458ydZbqatJHo-UAXiYRXOtK2_qStxezNN8XzOWtqdWJqCXE4rwgfni8ADsDtXZ7L18rnML_g2PpXixebAkIMCPgBIqHytb_cPAt4OBMHBil9bHKHnVw6wRC8XzENZIN681SnB24',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLJsZepuC1vSAVD9qaracEskkqVo3gF5RZVwB-vuNC3sdRNUCug2x5xyjqLOTDwGN-f3tv3bh6MMcHFMaWmsZL6S47U_tsrljGr-d7LEFp4Of-10zk5WzB4fj9Ba-DhQPeBvY9Dk-WVeVi_ZA9Esr1UKKfcbn3u7egvj7ts6p_C5Ha-OIzw1zrTH4EEuLC-IbABqFBspHonQnIAG6l7Q47pP_SmzeC2alxABcEcQ'
    ],
    colors: [
      { name: 'Vintage Black', hex: '#1C1B1B' },
      { name: 'Bone White', hex: '#EBE8E1' },
      { name: 'Electric Blue', hex: '#265CFF' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true, lowStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    badge: 'CORE ESSENTIAL',
    fitArchitecture: 'Boxy / Oversized Heavy',
    gsm: '280 GSM',
    material: '100% Combed Ringspun Long-Staple Cotton',
    specifications: [
      { label: 'Weight', value: '280 GSM Heavy Single Jersey' },
      { label: 'Collar', value: '1.25" High-Density Bound Rib' },
      { label: 'Print Technique', value: 'Water-based Plastisol Discharge Screenprint' },
      { label: 'Pre-Shrunk', value: 'Silicon Enzyme Washed for Zero Shrinkage' }
    ],
    measurements: [
      { size: 'S', chest: '56 cm', length: '71 cm', shoulder: '53 cm', sleeve: '24 cm' },
      { size: 'M', chest: '59 cm', length: '73 cm', shoulder: '55 cm', sleeve: '25 cm' },
      { size: 'L', chest: '62 cm', length: '75 cm', shoulder: '57 cm', sleeve: '26 cm' },
      { size: 'XL', chest: '65 cm', length: '77 cm', shoulder: '59 cm', sleeve: '27 cm' },
      { size: 'XXL', chest: '68 cm', length: '79 cm', shoulder: '61 cm', sleeve: '28 cm' }
    ],
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-003',
    slug: 'heavyweight-french-terry-hoodie',
    name: 'HEAVYWEIGHT FRENCH TERRY HOODIE',
    subtitle: '500 GSM Zero-Loom Loopback Fleece',
    sku: 'HOD-FTH-04',
    runNumber: 'RUN 02/300',
    category: 'hoodies',
    categoryLabel: 'FLEECE DIVISION',
    price: 3899,
    originalPrice: 4499,
    description: 'An architectural everyday heavyweight hoodie woven from dense 500 GSM loopback cotton. Double-layered crossover hood without drawstrings for an uncompromising brutalist look.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEs72_UheiaAnR-5Pto2DnIflDMXnzKqAfB3XhoTIbCwJxwvQcR713xBYsGaPWHGmhesAxTGgfmJQ_IyeqVOddHx5GNxfEnBbRZFN4CL97qePO7wo7ifWUvoiKfkqGhYRScxDY_bgXtYgsWYVUE8EmtJB8S4VOWkRdDmXGvqP9Q0gJ0o-SlbH3ztsBOquwOp9CTauuo8JA0hjw_Yjp-3ifAN6dBQ2cm1jydcwwyKs',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCS3JhSK8nShMBVHpOubA_htCi_jRwqXD42yGeeKXxG2F7xm5Ux4Bt1159tFf6f6yQYXBCob4lx-yG4tt_C_BCCdKrLb6BJoOJLcPAJBOsbSmD-crMoU9m-jyQl1N6cwh3cNGuJMbHHYtDIyDOD0l0oYk4IMDfsHWmFtgsxAP6ixbiny8-fonxjHnzEmjMRTLTk5PM54J581c2K68YEkTMBwz6TngVa7Cin1yG9HfA'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Muted Concrete', hex: '#65676B' },
      { name: 'Electric Cobalt', hex: '#265CFF' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true, lowStock: true },
      { size: 'XXL', inStock: false }
    ],
    badge: 'HEAVYWEIGHT',
    fitArchitecture: 'Boxy / Oversized Heavy',
    gsm: '500 GSM',
    material: '100% GOTS Certified Heavy Loopback French Terry',
    specifications: [
      { label: 'Weight', value: '500 GSM Custom Milled Loopback Cotton' },
      { label: 'Hood', value: 'Dual Layer Crossover Construct, Seamless Front' },
      { label: 'Ribbing', value: 'Heavy 420 GSM 2x1 Spandex Blend Rib Cuffs' },
      { label: 'Pocket', value: 'Concealed Side-Seam Ergonomic Pockets' }
    ],
    measurements: [
      { size: 'S', chest: '60 cm', length: '68 cm', shoulder: '56 cm', sleeve: '61 cm' },
      { size: 'M', chest: '63 cm', length: '70 cm', shoulder: '58 cm', sleeve: '63 cm' },
      { size: 'L', chest: '66 cm', length: '72 cm', shoulder: '60 cm', sleeve: '65 cm' },
      { size: 'XL', chest: '69 cm', length: '74 cm', shoulder: '62 cm', sleeve: '67 cm' },
      { size: 'XXL', chest: '72 cm', length: '76 cm', shoulder: '64 cm', sleeve: '68 cm' }
    ],
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-004',
    slug: 'wide-leg-modular-cargo-trouser',
    name: 'WIDE-LEG MODULAR CARGO TROUSER',
    subtitle: 'Tactical Utility Pant with Bungee Ankle Cinching',
    sku: 'CRG-WLM-04',
    runNumber: 'RUN 03/200',
    category: 'cargos',
    categoryLabel: 'TACTICAL UTILITY',
    price: 4999,
    originalPrice: 5999,
    description: 'Constructed from high-tensile 320 GSM cotton-poly twill with reinforced knee articulation and deep modular cargo accordion pockets. Features an integrated webbing belt and hem shock cords.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoj26I43RupYu7O3oQVVqD0F7QfFk8-njrcvhUEF_DSMnVQBPoVBeLwd96ocSJ1JwC0mkNHWDLmw3wWoUqm8PWMxtsMNFXqoH3GU387U520xV8SYWRaGH_UJLxvF_68lQTeoYam92Kix4iqX2gsDX2a5QvLREf8OSJemMgvYyclFpdnqFOGz6Jzt04EoZrZWaEEdCISmjNuOIZHi16RXhJwFyvQB5-Nwg1rvoXPVY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9y51eGkgyY3zqm5--yMD0Gtm6bodKp4uFdFkB4fXklpCtp4BtNxSG2ZpoRESuaCcZT2sCPjfSuWBvtnYfX6ZJtXMZjSo_hl6nqOhjWhnIgNDxmwbr8S3brVrhLyryY2418--NHmpNOsNn2RO3P2Om-rRYOIdQYLqEzY4boTEEk24eCSLYe_hgfa8rNAh-Vd4SchYEzWYf_2T_QiVBoas8SnB7f7n2_3cc6FfYPGg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb3LHZ8tP5r4y9UppcBsb6yW30fUOzIqpFqzL93wIpmjJPkwXVbZ-GaRrhl7NLhMxqyqjDY8Qr3euAh8vflG4UEPoWth9tpOk-17jfzVQXNLIotJXHp9TBP6TOiiNl5p_5Aq7BWsXsWMSh2-GEPOgHJo2NY6cRWJHYVJ3t4emyrtkT8ZOBgjGxQliT53IrnBX2KKYsA1sDx_67z6vggiNqZi0haKScxOTw8DYHeN0'
    ],
    colors: [
      { name: 'Tactical Slate', hex: '#3C4043' },
      { name: 'Dark Khaki', hex: '#4A483D' },
      { name: 'Nightshade Black', hex: '#161618' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
      { size: 'XXL', inStock: false }
    ],
    badge: 'LIMITED DROP',
    fitArchitecture: 'Relaxed Drape',
    gsm: '320 GSM',
    material: '65% Cotton, 35% Technical Poly Ripstop',
    specifications: [
      { label: 'Fit Profile', value: 'Relaxed Wide-Leg with Knee Pleats' },
      { label: 'Hem System', value: 'Modular Elastic Shock Cord with Duraflex Toggle' },
      { label: 'Waistband', value: 'Elasticated with Integrated Webbing Tension Belt' },
      { label: 'Storage', value: '6 Functional Multi-Depth Pockets' }
    ],
    measurements: [
      { size: 'S', chest: '30-32 in', length: '104 cm', shoulder: '-', sleeve: 'Open: 24 cm' },
      { size: 'M', chest: '32-34 in', length: '106 cm', shoulder: '-', sleeve: 'Open: 25 cm' },
      { size: 'L', chest: '34-36 in', length: '108 cm', shoulder: '-', sleeve: 'Open: 26 cm' },
      { size: 'XL', chest: '36-38 in', length: '110 cm', shoulder: '-', sleeve: 'Open: 27 cm' },
      { size: 'XXL', chest: '38-40 in', length: '112 cm', shoulder: '-', sleeve: 'Open: 28 cm' }
    ],
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-005',
    slug: 'heavyweight-metro-bomber',
    name: 'HEAVYWEIGHT METRO BOMBER',
    subtitle: 'Insulated MA-1 Revision with Hardware Details',
    sku: 'BMB-HMB-04',
    runNumber: 'RUN 01/150',
    category: 'outerwear',
    categoryLabel: 'OUTERWEAR',
    price: 7499,
    originalPrice: 8999,
    description: 'An aggressive revision of the classic flight jacket. Fabricated from 320 GSM flight nylon with 100g Primaloft fill, heavy gauge two-way zip, storm flap, and oversized utility arm pocket.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ubea-AjmUiEjpFK_9YW-0nXiIRKLYKzYAUEr1iHxIEppWKABo4ARBNV_nMGybUdAcU5uBOJ6qkH4wlu43ByuZnRUWhWcxzkuyWJLpfcB0VwzbWxS43DvmEkl5_NXYdmR0MVmZPz6AopVIAsPBZ6ql_wYCK3NdcEGRikjyRd3mzLnYxVxxKOay85bFx29sZofdc7vKC67k5tokmtitqBDLj-xU8KgcXRk9p7xrbY'
    ],
    colors: [
      { name: 'Metropolis Olive', hex: '#404B3D' },
      { name: 'Matte Obsidian', hex: '#1D1E22' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true, lowStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    badge: 'ARCHIVE EXCLUSIVE',
    fitArchitecture: 'Dropped Shoulder Surplus',
    gsm: '320 GSM Shell / 100g Fill',
    material: 'High-Density Mil-Spec Flight Nylon with Thermal Fill',
    specifications: [
      { label: 'Shell', value: '100% Waterproof Heavy Flight Nylon' },
      { label: 'Insulation', value: '100g Lightweight Thermoregulating Microfiber' },
      { label: 'Zippers', value: '#10 Industrial Heavy Gauge Dual Reversible' },
      { label: 'Lining', value: 'Surplus Emergency Orange Ripstop' }
    ],
    measurements: [
      { size: 'S', chest: '61 cm', length: '67 cm', shoulder: '53 cm', sleeve: '65 cm' },
      { size: 'M', chest: '64 cm', length: '69 cm', shoulder: '55 cm', sleeve: '66 cm' },
      { size: 'L', chest: '67 cm', length: '71 cm', shoulder: '57 cm', sleeve: '67 cm' },
      { size: 'XL', chest: '70 cm', length: '73 cm', shoulder: '59 cm', sleeve: '68 cm' },
      { size: 'XXL', chest: '73 cm', length: '75 cm', shoulder: '61 cm', sleeve: '69 cm' }
    ],
    isFeatured: true
  },
  {
    id: 'prod-006',
    slug: 'surplus-acid-wash-oversized-tee',
    name: 'SURPLUS ACID WASH OVERSIZED TEE',
    subtitle: 'Sun-Faded Mineral Washed Heavyweight Jersey',
    sku: 'TEE-SAW-04',
    category: 'tees',
    categoryLabel: 'TEES',
    price: 2299,
    originalPrice: 2699,
    description: 'Each piece undergoes a bespoke ozone stone wash process creating unique patina and hand feel. Milled from 300 GSM ringspun cotton with dropped shoulders and raw edge cuffs.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBav9n5hKc7m1kiMfuygouGdLSeEzW51CzCr1c4OJgrhuxCKudzx_ImgBbTi_d7myf5O39LVxhtxqX-MI6goWDO_O-Ln_78a-ruQfS85XdIrBiyuxSnqRns6dX0vQLSy72KOpImR-Ew7tvOoNclKPAotF1t9Id0bx-VYmrJ10pO1AWf8xewTeFCrtkyzlCqEVFX0srOVvuIa0gEYLYTNLWQmb9pw7aeDso4S0gG6Pc'
    ],
    colors: [
      { name: 'Acid Washed Charcoal', hex: '#39393C' },
      { name: 'Faded Concrete', hex: '#6D7174' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    badge: 'NEW DROP',
    fitArchitecture: 'Boxy / Oversized Heavy',
    gsm: '300 GSM',
    material: '100% Mineral Washed Heavy Ringspun Cotton',
    specifications: [
      { label: 'Weight', value: '300 GSM Ring Spun' },
      { label: 'Finish', value: 'Manual Mineral Stone Wash (Each garment unique)' },
      { label: 'Cuffs', value: 'Double Layer Clean Finish' }
    ]
  },
  {
    id: 'prod-007',
    slug: 'relaxed-pleated-cargo-pant',
    name: 'RELAXED PLEATED CARGO PANT',
    subtitle: 'Hybrid Tailored Surplus Slacks with Side Volume Pockets',
    sku: 'PNT-RPC-04',
    category: 'cargos',
    categoryLabel: 'CARGOS',
    price: 4799,
    originalPrice: 5499,
    description: 'Merging sartorial front pleats with military utility pockets. Designed for a draped balloon leg profile that stacks over high-top boots or technical sneakers.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9y51eGkgyY3zqm5--yMD0Gtm6bodKp4uFdFkB4fXklpCtp4BtNxSG2ZpoRESuaCcZT2sCPjfSuWBvtnYfX6ZJtXMZjSo_hl6nqOhjWhnIgNDxmwbr8S3brVrhLyryY2418--NHmpNOsNn2RO3P2Om-rRYOIdQYLqEzY4boTEEk24eCSLYe_hgfa8rNAh-Vd4SchYEzWYf_2T_QiVBoas8SnB7f7n2_3cc6FfYPGg'
    ],
    colors: [
      { name: 'Field Khaki', hex: '#59564B' },
      { name: 'Washed Black', hex: '#232324' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: false },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    badge: 'HYBRID',
    fitArchitecture: 'Relaxed Drape',
    gsm: '290 GSM',
    material: '80% Wool-Cotton Serge, 20% Technical Poly',
    specifications: [
      { label: 'Pleats', value: 'Deep Double Reverse Forward Pleats' },
      { label: 'Closure', value: 'Horn Button with YKK Antique Silver Zip' },
      { label: 'Pockets', value: 'Streamlined Flap Side Cargo & Welt Rear' }
    ]
  },
  {
    id: 'prod-008',
    slug: 'core-heavyweight-zip-hoodie',
    name: 'CORE HEAVYWEIGHT ZIP HOODIE',
    subtitle: 'Double Zip Thermal Enclosure with Bound Seams',
    sku: 'HOD-CHZ-04',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 4299,
    originalPrice: 4899,
    description: 'Constructed from 480 GSM diagonal loopback French terry with heavy-duty two-way gunmetal zip. Clean boxy silhouette with dropped shoulders and ribbed gusset underarms.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCS3JhSK8nShMBVHpOubA_htCi_jRwqXD42yGeeKXxG2F7xm5Ux4Bt1159tFf6f6yQYXBCob4lx-yG4tt_C_BCCdKrLb6BJoOJLcPAJBOsbSmD-crMoU9m-jyQl1N6cwh3cNGuJMbHHYtDIyDOD0l0oYk4IMDfsHWmFtgsxAP6ixbiny8-fonxjHnzEmjMRTLTk5PM54J581c2K68YEkTMBwz6TngVa7Cin1yG9HfA'
    ],
    colors: [
      { name: 'Iron Grey', hex: '#373A3C' },
      { name: 'Core Black', hex: '#141415' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    badge: 'CORE DROP',
    fitArchitecture: 'Boxy / Oversized Heavy',
    gsm: '480 GSM',
    material: '100% Combed Loopback Cotton',
    specifications: [
      { label: 'Zip', value: 'Two-Way Full Length #8 Gunmetal Zipper' },
      { label: 'Construction', value: 'Flatlock Seam Reinforcement Throughout' }
    ]
  },
  {
    id: 'prod-009',
    slug: 'tailored-surplus-blazer-hybrid',
    name: 'TAILORED SURPLUS BLAZER HYBRID',
    subtitle: 'Deconstructed Single-Breasted Jacket with Flap Cargo Ports',
    sku: 'BLZ-TSB-04',
    category: 'formals',
    categoryLabel: 'REFINED FORMALS',
    price: 6999,
    originalPrice: 8499,
    description: 'Where traditional tailoring meets military gear. Cut with a sharp notched lapel, unpadded dropped shoulders, half-canvassed chest, and asymmetrical technical cargo pocketing.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI0Vhq322wYRd93qVnITaQzKnF7_3ho64AVBP-D5xjnOFuvXkXMsa_BjFz6bSaHg0TgqGvaUzB_vmrNC8TrmS6pzLFjgcCXmMxtHWFlS3wjPe6T7JQPOVrSKyYnWd8yadfqEjJeFS_27UU4aO8kK4I9JanpDcAYEeYiIarvohehdi-MuRzbPwdl05NKu45eFSG5JSvoquaNfwERIyRevMU9u_GZcd-PSnJRO_1r1E',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSmrKFFbTm5Tjkg_4qGCWbaf3UC5s1fJwjlhpNhOACY_71SreE_7aKg_uwJRU3sIPoIZwP2MY_Di6THNPLkTBLQpX1oucCOv8qHxflERHH9dUnIcdDILyXQLfXy1V761-m2MV7halmPml9oxDKNOhN_WnZvgg6RmIwagTIr_Y5ki3xRqK7u9I067DIcy0D9MsU09Q1BfkvI8mflmqGbSSExg3uwX2kYZxHeuJONIg'
    ],
    colors: [
      { name: 'Brutal Slate', hex: '#2E3033' },
      { name: 'Deep Midnight', hex: '#161921' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true, lowStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
      { size: 'XXL', inStock: false }
    ],
    badge: 'HYBRID TAILORING',
    fitArchitecture: 'Tailored Slim Hybrid',
    gsm: '340 GSM',
    material: 'Virgin Wool / Technical Tactel Blend',
    specifications: [
      { label: 'Closure', value: 'Double Matte Horn Buttons with Internal Storm Tab' },
      { label: 'Vents', value: 'Dual Deep Rear Gusset Vents' }
    ]
  },
  {
    id: 'prod-010',
    slug: 'contrast-stitch-knit-sweater',
    name: 'CONTRAST STITCH KNIT SWEATER',
    subtitle: 'Heavy Gauge Chunky Waffle Knit with Exposed Blue Yarn',
    sku: 'KNT-CSK-04',
    category: 'tees',
    categoryLabel: 'KNITWEAR',
    price: 3999,
    originalPrice: 4799,
    description: 'Chunky 5-gauge waffle knit spun from Australian merino wool blend. Features hand-finished contrast electric-blue overlock seams and a relaxed drop-shoulder shape.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCz7jyUjj7OohKHZ6v3f9WhP1vR2IVcuKotMsxH-GPo00QWv1XIm7EXev4V41URoLA5VPTwQhAqG7MrXlqTDu6kAWh09ecwl3HsY7SLTICCL01jiW7r1OQj0hqQD3knHREi9FWZ5pTu8GMfExR8_D9Dff3eyCLPl0aGDxUgtCp563e2JEZQOLi5o6wqE7CiiOyRDiuyk7xcWcjlq1FfVfw1j35e1sgyqeApOmD5EeY'
    ],
    colors: [
      { name: 'Coal & Electric Blue', hex: '#1B1C1E' },
      { name: 'Oatmeal & Black', hex: '#D7D2C7' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    badge: 'LIMITED RUN',
    fitArchitecture: 'Relaxed Drape',
    gsm: '5-Gauge Merino Knit',
    material: '60% Australian Merino Wool, 40% Low-Pill Acrylic',
    specifications: [
      { label: 'Stitch Gauge', value: '5-Gauge Fisherman Rib with Contrast Piping' },
      { label: 'Yarn', value: '2-Ply Twisted High-Softness Spun Wool' }
    ]
  },
  {
    id: 'prod-011',
    slug: 'tactical-nylon-sling-bag',
    name: 'TACTICAL NYLON SLING BAG',
    subtitle: '1000D Cordura Crossbody with Quick-Release Cobra Buckle',
    sku: 'ACC-TNS-04',
    category: 'accessories',
    categoryLabel: 'SURPLUS ACCESSORIES',
    price: 2199,
    originalPrice: 2799,
    description: 'Built for urban commuting and technical carry. Milled from indestructible 1000D Cordura nylon with waterproof YKK Aquaguard zips, padded spacer mesh back, and quick-release metal buckle.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCb_BPMGvN-c05No63ru-ckUWnIneXyTQVfMwEiv9O-1y9oXHHqiFRSnZM4GdOecGj-6vVwBSLgd11vM5Gq3pmpiYsJffNiBZ07gmHrwSZV0u8qjKw2cghERhR1y7ds0bJmRqLJK7gdj-1xqAYuS27irMz8ExMIxSgn57WVp0pWe0XYWZCbuRi-pDNcoO2zACgkc_MGWgaCQ86r6fj7XRr4hO61CINdvAPicLcRpH0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4uXwvv_mZj5X3EEysCV0BrQ_GApVzMRw01AUs9XG-iBnt3J8JbST-KKKzAtKCy8Ze8F7DH3SKBYHjAxtgKwzI3VYnEzZGeiYH4iT1zykxcgFS2oBs3XdcxLTQeKyvEkibpkMpIDojiRPRCZ2_i1ue_1LUZOt67YutIJTjRSwH47AfDRdRiqQDsUYL-Ylrtwb8gKfUqU7iTWTy0kLWSXJAgKl6UJIo7O87cZvkwRA'
    ],
    colors: [
      { name: 'Tactical Black', hex: '#111111' },
      { name: 'Coyote Tan', hex: '#827357' }
    ],
    sizes: [
      { size: 'S', inStock: true } // accessories one-size
    ],
    badge: 'HARDWARE ARCHIVE',
    fitArchitecture: 'Modular Gear',
    gsm: '1000D Ballistic Cordura',
    material: '1000D Cordura Nylon with PU Waterproof Coating',
    specifications: [
      { label: 'Volume', value: '4.5 Litres Modular Compartment' },
      { label: 'Buckle', value: 'Heavy Duty Quick-Release Zinc Alloy' },
      { label: 'Zippers', value: 'YKK Aquaguard Matte Waterproof' }
    ]
  },
  {
    id: 'prod-012',
    slug: 'raw-selvedge-wide-jeans',
    name: 'RAW SELVEDGE WIDE JEANS',
    subtitle: '14oz Kurabo Japanese Denim with Surplus Slash Pockets',
    sku: 'DNM-RSW-04',
    category: 'cargos',
    categoryLabel: 'DENIM ARCHIVE',
    price: 5499,
    originalPrice: 6499,
    description: 'Cut from rigid 14oz shuttle-loomed Japanese selvedge denim. Deep indigo dye with red selvedge ID line, vintage chainstitch hems, and a roomy, architectural wide-leg drape.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwgsF0PkyPvkRQ4TEkOhRqlKqNNTgMMBCL6Qo1b6d6eRhkth6cRxpnMeblkaPmf8DkaXoqj2h6R9xABGn3g8tgn342KHGx8EpID8KrCUOe94Vx0PLNI17dHKNSxJ5ZXZ2WOb2TwEwerU59l44HsJ9_DuGGAuBpbloawSQDRzmb8wNfemAH39VaDiRVLRHQh56r617ibzwTF4tOwie8lW2SWvhzfqkrZKscYqooT-Y'
    ],
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1E2538' },
      { name: 'Washed Stone Blue', hex: '#485873' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true, lowStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    badge: '14OZ SELVEDGE',
    fitArchitecture: 'Relaxed Drape',
    gsm: '14oz Rigid',
    material: '100% Japanese Kurabo Selvedge Cotton',
    specifications: [
      { label: 'Loom', value: 'Traditional Shuttle Loom with Red Selvedge ID' },
      { label: 'Rivets', value: 'Hidden Solid Copper Rivets at Stress Points' },
      { label: 'Hardware', value: 'Custom Downtown Originals Donut Buttons' }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'ALL', count: 24 },
  { id: 'outerwear', name: 'OUTERWEAR', count: 6 },
  { id: 'tees', name: 'TEES', count: 8 },
  { id: 'hoodies', name: 'HOODIES', count: 5 },
  { id: 'cargos', name: 'CARGOS', count: 4 },
  { id: 'formals', name: 'FORMALS', count: 3 },
  { id: 'accessories', name: 'ACCESSORIES', count: 2 }
];

export const FIT_ARCHITECTURES = [
  { label: 'Boxy / Oversized Heavy', count: 14 },
  { label: 'Relaxed Drape', count: 6 },
  { label: 'Tailored Slim Hybrid', count: 3 },
  { label: 'Dropped Shoulder Surplus', count: 8 }
];

export const FABRIC_GSM_OPTIONS = [
  '280 GSM (Heavy Ringspun)',
  '380 GSM (Japanese Ripstop)',
  '450 GSM (Looped French Terry)',
  '500 GSM (Zero-Loom Fleece)',
  '14oz Japanese Selvedge',
  'Tactical Ripstop Nylon'
];

export const LOOKBOOK_HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnWC5bgqxG9uymO6OGn-PTm--VJB7oFUW3J7WGHoAnmnUaWIu61egFbVKKwmJ8jiz41O9R6JUr3TvRQg1Jq5fJWXfyupCbvJhJaAYSXgLQWIvHHm4YFd0R-0g0zZ5r2m-slFObiPP9OfAcv_uvKYgZYs4_Rjk1_Mpwypjt4NsywpsKPwsgeXJJ4pFj7ld5DaYrWQceaJTyxF0HQFFttxjI3kYL3_TyoRceA5h_C0M';

export const CAMPAIGN_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUS3BuzXOn7JQUo6CRdKE0JUIFDax-J-YeQSTflkV2DbIBye85olVqN_DmC1E19e_k1jKDM8du-5c53tAqmXDW1a9TdSgsksBVG3I-cquTxmX8yPLW7UOqPkiQ0Bhm0x4y9Bu_qdKMReBzA5iyYVnEkMoe0BP4B75fo9IjHGhZJTYq3GHN3roEgQcxRl--3sYLgJdh1fjOpxKx9VVjEp3oyNFOlz3YVl_QizM4nVU';

export const COMMUNITY_POSTS = [
  {
    location: 'LONDON, UK',
    handle: '@marcus_ldn',
    item: 'HEAVY FLEECE HOODIE (XL)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEb3BgcxvOJJi65ZTGG2I7H1Rc7GrFLnYOikb4VXAgxM5FhtnZNXp4zB9ZiyO54R8u2fWCxZ_WU9by8NosAxjxlwGgcKbhtVP2FE3uquTE13J4-HFS35pJJBTsi4VR1ZmWTbS6PzOY-dCzQ73yOXqaYfsFztDYKDkZbOI0aTzCK5Vf6E6HqT90WBClgSoeWdUuMjGKJ0OcpGdBLk-BBVTJB0aNOAxFzxk32OiYWJU'
  },
  {
    location: 'TOKYO, JP',
    handle: '@kenji_tokyo',
    item: 'MODULAR CARGO (M)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjofjxDSlIovdlBjjVJHgoQ2lq-U_5N4T5ffN-q77_55VPYFbhsej16ppfzD-EC843HEqLsZTymlWKKH_G6-JbT1Je9WXEB5TvmgRxioo7OGAF5fjJxEg45zq4l1Rd13JaNXubZRwxLI0vl2KFsd9ItV4r3lMm5Lf7pEnZb0uU9aSIxqQhLcX2OSM061PCPUHxBt6aGExLb_bFKDaDDbgyQ1DFeVofoYPIngh1kPw'
  },
  {
    location: 'NEW YORK, US',
    handle: '@maya.nyc',
    item: 'SURPLUS M-65 (S)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0qn3qBpwtLt2Rd6LTwsg2i2Zb9MG6vLWuTVXXbVs5XO48kHfvPulugbm_D5a6IM4ftvsTRDbBuyfPMIYEYJfdIjM9B6hHO3gPUQTuiXcCuTxCw5E-WtTqnGjuLiKg7mklYSvPgGAsN9cqpCioCkiIfaQ2cM1RzPaesK-axGKbvPrLVntlI4uoZr2Jo1d52l55tQfLV5Ae_rI-iEBhVEi2DMZRlgadjvdQk8ZiUYU'
  },
  {
    location: 'SEOUL, KR',
    handle: '@jun.street',
    item: 'TAILORED BLAZER (L)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJahbMxN-tVwYHceoA2XdL4Wot5t9WlRy3Y9r7ADPg13wTYDliLWLdpvqw78GKQyiS4y5SO8rnyNUnBtX-rGFQ8zW_HMFqnIxhucyX6kFlwLQf0YyMGcnNIQ6c5R7UE5xHeYeaa8DKo8rwFHvqYi6KLrlQkRfOKH_fnZ5JQ46ErUaz1P8lNcpeTyQCJhS09OzNfHgv6PMjtck58DWiV4r6RQ-NTAy6oe2qskPdq_Y'
  }
];

export const CURATED_CATEGORIES = [
  {
    num: '01',
    category: 'FOUNDATIONAL ESSENTIALS',
    title: 'OVERSIZED TEES & TOPS',
    description: 'Custom 280-320 GSM ringspun cotton jersey. Engineered for a crisp box-fit that maintains architectural shape through relentless wears.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkQEAMeK_C8RAXHADFHZla1UPB38Lwbpe44L-YRMPCp0TZieT1PLR4OKY-mq9xIqHwHwp4uC3kAnRGDP1O_P2F1JEntlP7wlkqeM3KaVcaSuR47iztNZPey86Vv81pIv3-bFIomLYGzDVtgBt0cbxZqMBA1SLPXoTTlJe5VgV3jxN1oUnsvcajH7EcizlPED_-EsLSDW0gDIrdjOKCYyV9YqwxhbZF6ZsGKpZLNrg',
    categoryFilter: 'tees'
  },
  {
    num: '02',
    category: 'FLEECE DIVISION',
    title: 'HEAVY HOODIES & FLEECE',
    description: 'Custom milled 500 GSM loopback cotton fleece. Heavy, unbrushed, and structured with crossover hoods and seamless side pockets.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLJsZepuC1vSAVD9qaracEskkqVo3gF5RZVwB-vuNC3sdRNUCug2x5xyjqLOTDwGN-f3tv3bh6MMcHFMaWmsZL6S47U_tsrljGr-d7LEFp4Of-10zk5WzB4fj9Ba-DhQPeBvY9Dk-WVeVi_ZA9Esr1UKKfcbn3u7egvj7ts6p_C5Ha-OIzw1zrTH4EEuLC-IbABqFBspHonQnIAG6l7Q47pP_SmzeC2alxABcEcQ',
    categoryFilter: 'hoodies'
  },
  {
    num: '03',
    category: 'TACTICAL UTILITY',
    title: 'TACTICAL & UTILITY CARGOS',
    description: 'High-tensile ripstop and heavy twill cargos with knee articulation, gusseted crotches, and modular bellowed pockets.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb3LHZ8tP5r4y9UppcBsb6yW30fUOzIqpFqzL93wIpmjJPkwXVbZ-GaRrhl7NLhMxqyqjDY8Qr3euAh8vflG4UEPoWth9tpOk-17jfzVQXNLIotJXHp9TBP6TOiiNl5p_5Aq7BWsXsWMSh2-GEPOgHJo2NY6cRWJHYVJ3t4emyrtkT8ZOBgjGxQliT53IrnBX2KKYsA1sDx_67z6vggiNqZi0haKScxOTw8DYHeN0',
    categoryFilter: 'cargos'
  },
  {
    num: '04',
    category: 'HYBRID TAILORING',
    title: 'REFINED FORMALS & OVERSHIRTS',
    description: 'Deconstructed suiting, crisp poplin overshirts, and wool-cotton hybrids reimagined with modern relaxed proportions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSmrKFFbTm5Tjkg_4qGCWbaf3UC5s1fJwjlhpNhOACY_71SreE_7aKg_uwJRU3sIPoIZwP2MY_Di6THNPLkTBLQpX1oucCOv8qHxflERHH9dUnIcdDILyXQLfXy1V761-m2MV7halmPml9oxDKNOhN_WnZvgg6RmIwagTIr_Y5ki3xRqK7u9I067DIcy0D9MsU09Q1BfkvI8mflmqGbSSExg3uwX2kYZxHeuJONIg',
    categoryFilter: 'formals'
  },
  {
    num: '05',
    category: 'HARDWARE ARCHIVE',
    title: 'SURPLUS ACCESSORIES & CAPS',
    description: '1000D Cordura crossbody packs, modular webbing key fobs, and structured low-profile 6-panel technical surplus caps.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4uXwvv_mZj5X3EEysCV0BrQ_GApVzMRw01AUs9XG-iBnt3J8JbST-KKKzAtKCy8Ze8F7DH3SKBYHjAxtgKwzI3VYnEzZGeiYH4iT1zykxcgFS2oBs3XdcxLTQeKyvEkibpkMpIDojiRPRCZ2_i1ue_1LUZOt67YutIJTjRSwH47AfDRdRiqQDsUYL-Ylrtwb8gKfUqU7iTWTy0kLWSXJAgKl6UJIo7O87cZvkwRA',
    categoryFilter: 'accessories'
  }
];
