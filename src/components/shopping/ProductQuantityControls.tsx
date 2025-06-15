
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProductQuantityControlsProps {
  quantity: number;
  onQuantityChange: (increment: boolean) => void;
}

export const ProductQuantityControls: React.FC<ProductQuantityControlsProps> = ({
  quantity,
  onQuantityChange
}) => {
  return (
    <div className="flex-shrink-0">
      <div className="flex items-center bg-gray-100 dark:bg-gray-200 rounded-full px-2 py-1.5 gap-2">
        <button 
          onClick={() => onQuantityChange(false)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-700 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all"
          aria-label="Diminuisci quantità"
        >
          <Minus size={14} strokeWidth={2} />
        </button>
        <span className="font-bold text-base text-gray-900 dark:text-gray-800 min-w-[20px] text-center">
          {quantity}
        </span>
        <button 
          onClick={() => onQuantityChange(true)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-700 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all"
          aria-label="Aumenta quantità"
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
