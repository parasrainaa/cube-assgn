import React from 'react';
import { useProduct } from '../context/ProductContext';
import type { SubscriptionType } from '../types';

const SubscriptionOptions: React.FC = () => {
  const { state, dispatch, getSinglePrice, getDoublePrice } = useProduct();

  const handleSubscriptionChange = (type: SubscriptionType) => {
    dispatch({ type: 'SET_SUBSCRIPTION_TYPE', payload: type });
  };

  const singlePricing = getSinglePrice();
  const doublePricing = getDoublePrice();

  return (
    <div className="purchase-options-section">
      <div className="space-y-4">
        
        <label 
          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-sm flex items-center justify-between ${
            state.subscriptionType === 'single' 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-200'
          }`}
          htmlFor="single-subscription"
        >
          <div className="flex items-center flex-1">
            <input 
              type="radio" 
              id="single-subscription" 
              name="subscription-type" 
              value="single" 
              className="sr-only"
              checked={state.subscriptionType === 'single'}
              onChange={() => handleSubscriptionChange('single')}
            />
            <div className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center transition-all duration-200 ${
              state.subscriptionType === 'single' 
                ? 'border-orange-500' 
                : 'border-gray-300'
            }`}>
              <div className={`w-2.5 h-2.5 bg-orange-500 rounded-full transition-opacity duration-200 ${
                state.subscriptionType === 'single' ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <span className="text-lg font-semibold text-gray-900">Single Drink Subscription</span>
              </div>
              <p className="text-sm text-gray-600">Perfect for trying out or light consumption</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 line-through">{singlePricing.originalFormatted}</div>
            <div className="text-xl font-bold text-gray-900">{singlePricing.formatted}</div>
            <div className="text-xs text-gray-500">per delivery</div>
          </div>
        </label>
        
        <label 
          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-sm flex items-center justify-between ${
            state.subscriptionType === 'double' 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-200'
          }`}
          htmlFor="double-subscription"
        >
          <div className="flex items-center flex-1">
            <input 
              type="radio" 
              id="double-subscription" 
              name="subscription-type" 
              value="double" 
              className="sr-only"
              checked={state.subscriptionType === 'double'}
              onChange={() => handleSubscriptionChange('double')}
            />
            <div className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center transition-all duration-200 ${
              state.subscriptionType === 'double' 
                ? 'border-orange-500' 
                : 'border-gray-300'
            }`}>
              <div className={`w-2.5 h-2.5 bg-orange-500 rounded-full transition-opacity duration-200 ${
                state.subscriptionType === 'double' ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <span className="text-lg font-semibold text-gray-900">Double Drink Subscription</span>
              </div>
              <p className="text-sm text-gray-600">Best value for regular consumption</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 line-through">{doublePricing.originalFormatted}</div>
            <div className="text-xl font-bold text-gray-900">{doublePricing.formatted}</div>
            <div className="text-xs text-gray-500">per delivery</div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SubscriptionOptions;