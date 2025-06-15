
import React from 'react';
import { Product } from '@/types/shopping';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product
}) => {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-1 leading-tight text-left">
        {product.name}
      </h3>
      <div className="flex items-center gap-3 flex-wrap">
        {product.supermarket && (
          <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full font-medium shadow-sm">
            {product.supermarket}
          </span>
        )}
        {product.price && (
          <span className="font-bold text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-full shadow-sm">
            €{product.price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
