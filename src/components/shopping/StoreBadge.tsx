
import React from 'react';

interface StoreBadgeProps {
  store: string;
  color?: string;
}

const storeColors: Record<string, string> = {
  'Esselunga': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  'Carrefour': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  'Coop': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  'Conad': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
};

export const StoreBadge: React.FC<StoreBadgeProps> = ({ store, color }) => {
  const colorClass = color || storeColors[store] || storeColors.default;
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${colorClass}`}>
      {store}
    </span>
  );
};
