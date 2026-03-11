// ===== Product Types =====

/** Represents a single product returned from the API. */
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

/** Shape of the paginated products API response. */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// ===== Cart Types =====

/** Represents an item stored in the shopping cart. */
export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

/** Redux state shape for the cart slice. */
export interface CartState {
  items: CartItem[];
}

// ===== Component Props =====

/** Props for the ProductCard component. */
export interface ProductCardProps {
  product: Product;
}

/** Props for the Breadcrumbs component. */
export interface BreadcrumbsProps {
  currentStep: number;
  completedSteps?: number[];
}

/** Represents a single checkout step in the breadcrumbs. */
export interface Step {
  number: number;
  name: string;
  path: string;
}

/** Props for the CartItem row component. */
export interface CartItemRowProps {
  item: CartItem;
  showControls?: boolean;
}

// ===== Checkout Form Types =====

/** Data collected in the Contact step form. */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

/** Data collected in the Shipment step form. */
export interface ShipmentFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// ===== Checkout State (for location.state) =====

/** State passed between checkout steps via React Router location.state. */
export interface CheckoutLocationState {
  completedSteps: number[];
  contactData?: ContactFormData;
  shipmentData?: ShipmentFormData;
}