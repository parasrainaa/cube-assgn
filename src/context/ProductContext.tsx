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
  | { type: 'SET_MEDIA_INDEX'; payload: number };

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
        selectedFlavors: { ...state.selectedFlavors, single: action.payload }
      };
    case 'SET_FLAVOR_1':
      return { 
        ...state, 
        selectedFlavors: { ...state.selectedFlavors, flavor1: action.payload }
      };
    case 'SET_FLAVOR_2':
      return { 
        ...state, 
        selectedFlavors: { ...state.selectedFlavors, flavor2: action.payload }
      };
    case 'SET_MEDIA_INDEX':
      return { ...state, currentMediaIndex: action.payload };
    default:
      return state;
  }
};

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  mockData: {
    variants: ProductVariant[];
    media: ProductMedia[];
  };
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

  return (
    <ProductContext.Provider value={{ state, dispatch, mockData }}>
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