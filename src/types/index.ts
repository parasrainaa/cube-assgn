export interface ProductVariant {
  id: number;
  flavor: string;
  price: number;
  compare_at_price: number;
  available: boolean;
  featured_media?: number;
}

export interface ProductMedia {
  id: number;
  url: string;
  alt: string;
  type: string;
}

export interface ProductData {
  variants: ProductVariant[];
  media: ProductMedia[];
}

export type SubscriptionType = 'single' | 'double';

export type FlavorType = 'chocolate' | 'vanilla' | 'orange';

export interface SelectedFlavors {
  single?: FlavorType;
  flavor1?: FlavorType;
  flavor2?: FlavorType;
}

export interface AppState {
  subscriptionType: SubscriptionType;
  selectedFlavors: SelectedFlavors;
  currentMediaIndex: number;
}