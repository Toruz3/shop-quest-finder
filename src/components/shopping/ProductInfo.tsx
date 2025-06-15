
import React from 'react';
import { Product } from '@/types/shopping';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="flex-1 min-w-0 py-1">
      <h3 className="font-semibold text-base text-gray-900 dark:text-gray-800 mb-1 truncate leading-tight">
        {product.name}
      </h3>
      <div className="flex flex-col gap-0.5">
        {product.supermarket && (
          <span className="text-xs text-gray-500 dark:text-gray-600 leading-tight">
            {product.supermarket}
          </span>
        )}
        {product.price && (
          <span className="font-bold text-lg text-green-600 dark:text-green-700 leading-tight">
            €{product.price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
