
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
      <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-1 leading-tight text-left">
        {product.name}
      </h3>
      <div className="flex flex-col gap-1">
        {product.supermarket && (
          <span className="text-sm text-gray-600 font-medium">
            {product.supermarket}
          </span>
        )}
        {product.price && (
          <span className="font-bold text-base text-gray-900">
            €{product.price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
