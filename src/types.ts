export type ProductCategory = 
  | 'outerwear'
  | 'tees'
  | 'hoodies'
  | 'cargos'
  | 'formals'
  | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface SizeAvailability {
  size: ProductSize;
  inStock: boolean;
  lowStock?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  sku: string;
  runNumber?: string; // e.g. "RUN 01/250"
  category: ProductCategory;
  categoryLabel: string;
  price: number; // in INR
  originalPrice?: number;
  description: string;
  images: string[];
  colors: ProductColor[];
  sizes: SizeAvailability[];
  badge?: string; // e.g. "LIMITED", "ARCHIVE", "DROP 04", "BESTSELLER"
  fitArchitecture: string; // e.g. "Boxy / Oversized Heavy", "Relaxed Drape", "Tailored Slim Hybrid", "Dropped Shoulder Surplus"
  gsm: string; // e.g. "380 GSM", "500 GSM", "280 GSM", "14oz"
  material: string;
  specifications: ProductSpecification[];
  features?: string[];
  careInstructions?: string[];
  measurements?: {
    size: ProductSize;
    chest: string;
    length: string;
    shoulder: string;
    sleeve: string;
  }[];
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${selectedColor}-${selectedSize}`
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: ProductSize;
  quantity: number;
  price: number;
}

export interface FilterState {
  category: string;
  fitArchitecture: string[];
  fabricGsm: string[];
  priceRange: [number, number];
  sizes: ProductSize[];
  colors: string[];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high';
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'express' | 'priority';
  paymentMethod: 'upi' | 'card' | 'cod';
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}
