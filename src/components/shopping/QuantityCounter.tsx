
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityCounterProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export const QuantityCounter: React.FC<QuantityCounterProps> = ({ 
  quantity, 
  onQuantityChange, 
  min = 0, 
  max = 99 
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
      <button 
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuisci quantità"
      >
        <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      <span 
        className="text-lg font-bold text-gray-900 dark:text-gray-100 min-w-[32px] text-center"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button 
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumenta quantità"
      >
        <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
};
