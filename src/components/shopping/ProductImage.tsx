
import React from 'react';
import { Package } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ 
  src, 
  alt, 
  className = "w-20 h-20" 
}) => {
  return (
    <div className={`${className} rounded-xl bg-gray-50 dark:bg-gray-800 p-2 flex items-center justify-center overflow-hidden`}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : (
        <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      )}
      <div className="hidden w-full h-full flex items-center justify-center">
        <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
};
