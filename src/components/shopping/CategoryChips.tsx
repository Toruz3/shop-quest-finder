
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryChipsProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryChips = ({
  onSelectCategory
}: CategoryChipsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<{
    id: number;
    name: string;
    icon: string;
  }[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare le categorie",
          variant: "destructive"
        });
        return;
      }

      // Extract unique categories
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
      <ScrollArea className="w-full">
        <div className="flex gap-2 py-1 pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleSelect(category.name)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
                ${selectedCategory === category.name 
                  ? 'bg-primary text-white shadow-md scale-105' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200'
                }
              `}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: category.id * 0.1 }}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
