
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CategoryChipsProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryChips = ({ onSelectCategory }: CategoryChipsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 1, name: 'Frutta', icon: '🍎' },
    { id: 2, name: 'Verdura', icon: '🥦' },
    { id: 3, name: 'Carne', icon: '🥩' },
    { id: 4, name: 'Pesce', icon: '🐟' },
    { id: 5, name: 'Latticini', icon: '🧀' },
    { id: 6, name: 'Casa', icon: '🧹' },
    { id: 7, name: 'Bevande', icon: '🥤' },
    { id: 8, name: 'Surgelati', icon: '🧊' }
  ];
  
  const handleSelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    onSelectCategory(category);
  };
  
  return (
    <div className="flex justify-center w-full mt-4">
      <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none w-full pb-2">
        <div className="flex gap-2 pb-1 mx-auto">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleSelect(category.name)}
              className={`category-chip ripple ${
                selectedCategory === category.name 
                  ? 'category-chip-active' 
                  : 'category-chip-inactive'
              }`}
              style={{ animationDelay: `${category.id * 0.05}s` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: category.id * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
