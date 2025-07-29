import React from 'react';
import { useProduct } from '../context/ProductContext';

const MediaGallery: React.FC = () => {
  const { state, dispatch, mockData } = useProduct();

  const handlePrevImage = () => {
    const newIndex = state.currentMediaIndex > 0 
      ? state.currentMediaIndex - 1 
      : mockData.media.length - 1;
    dispatch({ type: 'SET_MEDIA_INDEX', payload: newIndex });
  };

  const handleNextImage = () => {
    const newIndex = state.currentMediaIndex < mockData.media.length - 1 
      ? state.currentMediaIndex + 1 
      : 0;
    dispatch({ type: 'SET_MEDIA_INDEX', payload: newIndex });
  };

  const handleThumbnailClick = (index: number) => {
    dispatch({ type: 'SET_MEDIA_INDEX', payload: index });
  };

  const currentMedia = mockData.media[state.currentMediaIndex];

  return (
    <div className="product-media-section">
      <div className="main-image-wrapper mb-4">
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
          <img 
            src={currentMedia?.url || '/images/products/bottle-chocolate.svg'}
            alt={currentMedia?.alt || 'Premium Drink Bottle'}
            className="w-full h-full object-cover select-none"
          />
          
          {mockData.media.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 backdrop-blur-sm hover:scale-105"
                onClick={handlePrevImage}
                type="button"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 backdrop-blur-sm hover:scale-105"
                onClick={handleNextImage}
                type="button"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      
      {mockData.media.length > 1 && (
        <div className="thumbnail-gallery">
          <div className="flex space-x-3">
            {mockData.media.map((media, index) => (
              <button 
                key={media.id}
                className={`w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:scale-105 ${
                  index === state.currentMediaIndex 
                    ? 'border-orange-500' 
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => handleThumbnailClick(index)}
                type="button"
              >
                <img 
                  src={media.url.replace('.svg', '-thumb.svg')}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover select-none"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;