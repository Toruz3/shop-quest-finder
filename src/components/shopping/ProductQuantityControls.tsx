
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
      <div className="flex items-center bg-gray-100 dark:bg-gray-200 rounded-md px-1 py-0.5 gap-0.5">
        <button 
          onClick={() => onQuantityChange(false)}
          className="w-4 h-4 rounded-sm flex items-center justify-center text-gray-600 dark:text-gray-700 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all duration-200"
          aria-label="Diminuisci quantità"
        >
          <Minus size={8} strokeWidth={2.5} />
        </button>
        <span className="font-semibold text-xs text-gray-900 dark:text-gray-800 min-w-[12px] text-center">
          {quantity}
        </span>
        <button 
          onClick={() => onQuantityChange(true)}
          className="w-4 h-4 rounded-sm flex items-center justify-center text-gray-600 dark:text-gray-700 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all duration-200"
          aria-label="Aumenta quantità"
        >
          <Plus size={8} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
