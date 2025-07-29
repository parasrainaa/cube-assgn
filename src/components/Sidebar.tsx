import React from 'react';
import { useProduct } from '../context/ProductContext';
import type { FlavorType } from '../types';

const Sidebar: React.FC = () => {
  const { state } = useProduct();

  const getFlavorColor = (flavor: FlavorType): string => {
    switch (flavor) {
      case 'chocolate':
        return '#8B4513';
      case 'vanilla':
        return '#F5DEB3';
      case 'orange':
        return '#FFA500';
      default:
        return '#8B4513';
    }
  };

  const getTitle = () => {
    return state.subscriptionType === 'single' 
      ? 'Single Drink Subscription Selected'
      : 'Double Drink Subscription Selected';
  };

  const getProductTitle = () => {
    return state.subscriptionType === 'single' 
      ? 'Single Drink Subscription'
      : 'Double Drink Subscription';
  };

  const getPrice = () => {
    return state.subscriptionType === 'single' ? '$4.00' : '$7.20';
  };

  const flavors: FlavorType[] = ['chocolate', 'vanilla', 'orange'];

  const bottleImages = [
    '/src/images/products/bottle-chocolate-thumb.svg',
    '/src/images/products/bottle-vanilla-thumb.svg',
    '/src/images/products/bottle-orange-thumb.svg',
    '/src/images/products/bottle-chocolate-thumb.svg'
  ];

  const inclusionItems = [
    'Premium organic ingredients sourced sustainably',
    'Free shipping on all subscription orders',
    'Cancel or modify your subscription anytime',
    'Satisfaction guarantee with 30-day returns'
  ];

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 p-6 space-y-6 hidden lg:block shadow-[-4px_0_12px_rgba(0,0,0,0.05)] z-10">
      <div className="sticky top-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">{getTitle()}</h2>
        
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900">{getProductTitle()}</span>
            <span className="text-xl font-bold text-gray-900">{getPrice()}</span>
          </div>
          
          {state.subscriptionType === 'double' && (
            <>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Choose Flavor 1</div>
                <div className="flex space-x-2">
                  {flavors.map((flavor) => (
                    <div 
                      key={`sidebar-flavor1-${flavor}`}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        state.selectedFlavors.flavor1 === flavor 
                          ? 'border-orange-500' 
                          : 'border-gray-200'
                      }`}
                      style={{ background: getFlavorColor(flavor) }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Choose Flavor 2</div>
                <div className="flex space-x-2">
                  {flavors.map((flavor) => (
                    <div 
                      key={`sidebar-flavor2-${flavor}`}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        state.selectedFlavors.flavor2 === flavor 
                          ? 'border-orange-500' 
                          : 'border-gray-200'
                      }`}
                      style={{ background: getFlavorColor(flavor) }}
                    ></div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">What's included</h4>
            <div className="grid grid-cols-4 gap-2">
              {bottleImages.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Product ${index + 1}`} 
                  className="w-full h-10 object-cover rounded"
                />
              ))}
            </div>
            
            <div className="text-xs text-gray-600 space-y-1 mt-3">
              {inclusionItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0 mt-0.5"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;