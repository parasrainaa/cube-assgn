import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { SubscriptionType, FlavorType, SelectedFlavors, ProductVariant, ProductMedia } from '../types';

interface ProductState {
  subscriptionType: SubscriptionType;
  selectedFlavors: SelectedFlavors;
  currentMediaIndex: number;
}

type ProductAction =
  | { type: 'SET_SUBSCRIPTION_TYPE'; payload: SubscriptionType }
  | { type: 'SET_SINGLE_FLAVOR'; payload: FlavorType }
  | { type: 'SET_FLAVOR_1'; payload: FlavorType }
  | { type: 'SET_FLAVOR_2'; payload: FlavorType }
  | { type: 'SET_MEDIA_INDEX'; payload: number }
  | { type: 'UPDATE_MEDIA_FOR_FLAVOR' };

const initialState: ProductState = {
  subscriptionType: 'single',
  selectedFlavors: {
    single: 'chocolate',
    flavor1: 'chocolate',
    flavor2: 'vanilla'
  },
  currentMediaIndex: 0
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_SUBSCRIPTION_TYPE':
      return { ...state, subscriptionType: action.payload };
    case 'SET_SINGLE_FLAVOR':
      return { 
        ...state, 
        selectedFlavors: { ...state.selectedFlavors, single: action.payload },
        currentMediaIndex: getMediaIndexForFlavor(action.payload)
      };
    case 'SET_FLAVOR_1':
      return { 
        ...state, 
        selectedFlavors: { ...state.selectedFlavors, flavor1: action.payload },
        currentMediaIndex: getMediaIndexForFlavor(action.payload)
      };
    case 'SET_FLAVOR_2':
      return { 
        ...state, 
        selectedFlavors: { ...state.selectedFlavors, flavor2: action.payload }
      };
    case 'SET_MEDIA_INDEX':
      return { ...state, currentMediaIndex: action.payload };
    case 'UPDATE_MEDIA_FOR_FLAVOR':
      const currentFlavor = state.subscriptionType === 'single' 
        ? state.selectedFlavors.single 
        : state.selectedFlavors.flavor1;
      return { 
        ...state, 
        currentMediaIndex: getMediaIndexForFlavor(currentFlavor || 'chocolate')
      };
    default:
      return state;
  }
};

// Helper function to get media index based on flavor
const getMediaIndexForFlavor = (flavor: FlavorType): number => {
  switch (flavor) {
    case 'chocolate':
      return 0;
    case 'vanilla':
      return 1;
    case 'orange':
      return 2;
    default:
      return 0;
  }
};

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  mockData: {
    variants: ProductVariant[];
    media: ProductMedia[];
  };
  // Pricing helper functions
  getSinglePrice: () => { current: number; original: number; formatted: string; originalFormatted: string };
  getDoublePrice: () => { current: number; original: number; formatted: string; originalFormatted: string };
  getCurrentVariant: () => ProductVariant | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const mockVariants: ProductVariant[] = [
  {
    id: 1,
    flavor: 'chocolate',
    price: 400,
    compare_at_price: 600,
    available: true,
    featured_media: 1
  },
  {
    id: 2,
    flavor: 'vanilla',
    price: 400,
    compare_at_price: 600,
    available: true,
    featured_media: 2
  },
  {
    id: 3,
    flavor: 'orange',
    price: 400,
    compare_at_price: 600,
    available: true,
    featured_media: 3
  }
];

const mockMedia: ProductMedia[] = [
  {
    id: 1,
    url: '/src/images/products/bottle-chocolate.svg',
    alt: 'Chocolate Drink Bottle',
    type: 'image'
  },
  {
    id: 2,
    url: '/src/images/products/bottle-vanilla.svg',
    alt: 'Vanilla Drink Bottle',
    type: 'image'
  },
  {
    id: 3,
    url: '/src/images/products/bottle-orange.svg',
    alt: 'Orange Drink Bottle',
    type: 'image'
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const mockData = {
    variants: mockVariants,
    media: mockMedia
  };

  // Helper function to find variant by flavor
  const findVariantByFlavor = (flavor: string): ProductVariant | null => {
    return mockVariants.find(v => v.flavor.toLowerCase() === flavor.toLowerCase()) || null;
  };

  // Get current variant based on subscription type and selections
  const getCurrentVariant = (): ProductVariant | null => {
    if (state.subscriptionType === 'single') {
      return findVariantByFlavor(state.selectedFlavors.single || 'chocolate');
    } else {
      // For double, return the first flavor's variant for pricing base
      return findVariantByFlavor(state.selectedFlavors.flavor1 || 'chocolate');
    }
  };

  // Calculate single subscription pricing (25% off from compare_at_price)
  const getSinglePrice = () => {
    const variant = getCurrentVariant();
    if (!variant) return { current: 400, original: 600, formatted: '$4.00', originalFormatted: '$6.00' };
    
    const original = variant.compare_at_price;
    const current = Math.round(original * 0.75); // 25% off
    
    return {
      current,
      original,
      formatted: `$${(current / 100).toFixed(2)}`,
      originalFormatted: `$${(original / 100).toFixed(2)}`
    };
  };

  // Calculate double subscription pricing (25% off from 2x compare_at_price)
  const getDoublePrice = () => {
    const variant1 = findVariantByFlavor(state.selectedFlavors.flavor1 || 'chocolate');
    const variant2 = findVariantByFlavor(state.selectedFlavors.flavor2 || 'vanilla');
    
    if (!variant1 || !variant2) return { current: 900, original: 1200, formatted: '$9.00', originalFormatted: '$12.00' };
    
    const original = variant1.compare_at_price + variant2.compare_at_price;
    const current = Math.round(original * 0.75); // 25% off
    
    return {
      current,
      original,
      formatted: `$${(current / 100).toFixed(2)}`,
      originalFormatted: `$${(original / 100).toFixed(2)}`
    };
  };

  return (
    <ProductContext.Provider value={{ 
      state, 
      dispatch, 
      mockData, 
      getSinglePrice,
      getDoublePrice,
      getCurrentVariant 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};