import React from 'react';
import { useProduct } from '../context/ProductContext';

const WhatsIncluded: React.FC = () => {
  const { state } = useProduct();

  const getInclusionItems = () => {
    const baseItems = [
      'Premium organic ingredients sourced sustainably',
      'Free shipping on all subscription orders',
      'Cancel or modify your subscription anytime',
      'Satisfaction guarantee with 30-day returns'
    ];

    const modeSpecificItems = state.subscriptionType === 'single' 
      ? [
          'Monthly delivery (1 bottle per month)',
          'Perfect for light consumption',
          'Easy to try different flavors'
        ]
      : [
          'Bi-weekly delivery (2 bottles every 2 weeks)',
          'Best value for regular consumption',
          'Mix and match different flavors'
        ];

    return [...baseItems, ...modeSpecificItems];
  };

  const bottleImages = [
    '/src/images/products/bottle-chocolate-thumb.svg',
    '/src/images/products/bottle-vanilla-thumb.svg',
    '/src/images/products/bottle-orange-thumb.svg',
    '/src/images/products/bottle-chocolate-thumb.svg'
  ];

  return (
    <div className="whats-included-section">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">What's included</h3>
      
      {state.subscriptionType === 'single' && (
        <div className="included-content">
          <div className="flex space-x-3 mb-4">
            {bottleImages.map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <img 
                  src={image}
                  alt="Drink bottle"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            {getInclusionItems().map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {state.subscriptionType === 'double' && (
        <div className="included-content">
          <div className="grid grid-cols-4 gap-3 mb-4">
            {bottleImages.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt="Drink bottle"
                className="w-full h-20 object-cover rounded-lg"
              />
            ))}
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            {getInclusionItems().map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsIncluded;