
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CategoryChipsProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryChips = ({ onSelectCategory }: CategoryChipsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string; icon: string }[]>([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      // Using select distinct with PostgreSQL
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .order('category');
      
      if (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare le categorie",
          variant: "destructive"
        });
        return;
      }
      
      // Filter out duplicates in JavaScript
      const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
      
      // Map categories to icons
      const categoriesWithIcons = uniqueCategories.map((category, index) => ({
        id: index + 1,
        name: category,
        icon: getCategoryIcon(category)
      }));
      
      setCategories(categoriesWithIcons);
    };
    
    loadCategories();
  }, []);
  
  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Frutta': '🍎',
      'Verdura': '🥦',
      'Carne': '🥩',
      'Pesce': '🐟',
      'Latticini': '🧀',
      'Casa': '🧹',
      'Bevande': '🥤',
      'Surgelati': '🧊'
    };
    return icons[category] || '📦';
  };
  
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
