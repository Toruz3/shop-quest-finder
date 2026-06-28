
import React from 'react';

interface PriceDisplayProps {
  price: number;
  currency?: string;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  currency = '€', 
  className = "" 
}) => {
  return (
    <div className={`text-2xl font-bold text-foreground ${className}`}>
      {currency}{price.toFixed(2)}
    </div>
  );
};
