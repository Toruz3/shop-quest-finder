
import React from 'react';
import { Product } from '@/types/shopping';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-sm text-gray-900 dark:text-gray-800 mb-1 line-clamp-1 leading-tight">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        {product.supermarket && (
          <span className="text-xs text-gray-500 dark:text-gray-600 font-medium">
            {product.supermarket}
          </span>
        )}
        {product.price && (
          <span className="font-semibold text-sm text-green-600 dark:text-green-700">
            €{product.price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
