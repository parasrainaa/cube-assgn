import React from 'react';
import { ProductProvider } from '../context/ProductContext';
import MediaGallery from './MediaGallery';
import SubscriptionOptions from './SubscriptionOptions';
import FlavorSelection from './FlavorSelection';
import WhatsIncluded from './WhatsIncluded';
import Sidebar from './Sidebar';

const ProductPageContent: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add to cart clicked');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <MediaGallery />
        

        <div className="product-info-section">
          
          <div className="product-header mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Premium Drink Subscription
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Experience our premium craft drinks delivered fresh to your door. Choose from our 
              signature flavors including rich chocolate, smooth vanilla, and zesty orange. Each bottle 
              is carefully crafted with organic ingredients and natural flavors.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Perfect for daily hydration or special occasions.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <SubscriptionOptions />
            
            <FlavorSelection />
            
            <WhatsIncluded />
            
            <div className="add-to-cart-section">
              <button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 text-lg hover:-translate-y-px hover:shadow-lg active:translate-y-0"
              >
                Add to Cart
              </button>
            </div>
            
            <input type="hidden" name="id" value="1" />
            <input type="hidden" name="quantity" value="1" />
            
          </form>
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

const ProductPage: React.FC = () => {
  return (
    <ProductProvider>
      <ProductPageContent />
    </ProductProvider>
  );
};

export default ProductPage;