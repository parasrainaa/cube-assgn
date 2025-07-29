import React from 'react';
import { useProduct } from '../context/ProductContext';
import type { FlavorType } from '../types';

interface FlavorSwatchProps {
  flavor: FlavorType;
  isSelected: boolean;
  onClick: () => void;
}

const FlavorSwatch: React.FC<FlavorSwatchProps> = ({ flavor, isSelected, onClick }) => {
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

  const getFlavorName = (flavor: FlavorType): string => {
    return flavor.charAt(0).toUpperCase() + flavor.slice(1);
  };

  return (
    <button 
      type="button"
      className={`w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:scale-105 ${
        isSelected 
          ? 'border-orange-500 shadow-[0_0_0_4px] shadow-orange-100' 
          : 'border-gray-200'
      }`}
      style={{ background: getFlavorColor(flavor) }}
      title={getFlavorName(flavor)}
      onClick={onClick}
    >
      <span className="sr-only">{getFlavorName(flavor)}</span>
    </button>
  );
};

const FlavorSelection: React.FC = () => {
  const { state, dispatch } = useProduct();

  const handleSingleFlavorSelect = (flavor: FlavorType) => {
    dispatch({ type: 'SET_SINGLE_FLAVOR', payload: flavor });
  };

  const handleFlavor1Select = (flavor: FlavorType) => {
    dispatch({ type: 'SET_FLAVOR_1', payload: flavor });
  };

  const handleFlavor2Select = (flavor: FlavorType) => {
    dispatch({ type: 'SET_FLAVOR_2', payload: flavor });
  };

  const flavors: FlavorType[] = ['chocolate', 'vanilla', 'orange'];

  return (
    <div className="flavor-selection-section">
      
      {/* Single Flavor Selector */}
      {state.subscriptionType === 'single' && (
        <div className="flavor-selector">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Flavor</h3>
          <div className="flex space-x-3 mb-4">
            {flavors.map((flavor) => (
              <FlavorSwatch
                key={flavor}
                flavor={flavor}
                isSelected={state.selectedFlavors.single === flavor}
                onClick={() => handleSingleFlavorSelect(flavor)}
              />
            ))}
          </div>
        </div>
      )}
      
      {state.subscriptionType === 'double' && (
        <div className="flavor-selector">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Flavor 1</h3>
          <div className="flex space-x-3 mb-6">
            {flavors.map((flavor) => (
              <FlavorSwatch
                key={`flavor1-${flavor}`}
                flavor={flavor}
                isSelected={state.selectedFlavors.flavor1 === flavor}
                onClick={() => handleFlavor1Select(flavor)}
              />
            ))}
          </div>
        
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Flavor 2</h3>
          <div className="flex space-x-3 mb-4">
            {flavors.map((flavor) => (
              <FlavorSwatch
                key={`flavor2-${flavor}`}
                flavor={flavor}
                isSelected={state.selectedFlavors.flavor2 === flavor}
                onClick={() => handleFlavor2Select(flavor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlavorSelection;