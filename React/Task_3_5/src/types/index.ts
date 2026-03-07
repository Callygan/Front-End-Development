// ===== Product Types =====
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// ===== Cart Types =====
export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// ===== Component Props =====
export interface ProductCardProps {
  product: Product;
}

export interface BreadcrumbsProps {
  currentStep: number;
  completedSteps?: number[];
}

export interface Step {
  number: number;
  name: string;
  path: string;
}

export interface CartItemRowProps {
  item: CartItem;
  showControls?: boolean;
}

// ===== Checkout Form Types =====
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export interface ShipmentFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// ===== Checkout State (for location.state) =====
export interface CheckoutLocationState {
  completedSteps: number[];
  contactData?: ContactFormData;
  shipmentData?: ShipmentFormData;
}