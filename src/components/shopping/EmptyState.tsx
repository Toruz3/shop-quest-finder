
import { ShoppingCart, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProductSearch } from "@/hooks/useProductSearch";

interface EmptyStateProps {
  onAddSampleProducts: () => void;
}

export const EmptyState = ({
  onAddSampleProducts
}: EmptyStateProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { recentSearches } = useProductSearch("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="py-4 text-center text-neutral-500 min-h-[200px] flex flex-col items-center justify-center">
      <motion.div 
        className={`relative mb-3 transition-all duration-500 transform`}
        animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
        initial={{ scale: 1 }}
      >
        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-7 h-7 text-primary-500" />
        </div>
        <div className="absolute top-0 right-0 w-5 h-5 bg-accent-100 rounded-full flex items-center justify-center">
          <span className="text-accent-500 text-xs font-bold">0</span>
        </div>
      </motion.div>
      
      <p className="text-base font-medium mb-1">La tua lista è vuota</p>
      <p className="text-xs mb-3 text-neutral-400 max-w-xs">
        Aggiungi prodotti utilizzando la barra di ricerca o prova alcuni suggerimenti
      </p>
      
      {recentSearches.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Ricerche recenti:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {recentSearches.map((term, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="bg-white text-sm"
                onClick={() => {
                  // Your search handler here
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="bg-white border-primary-200 text-primary-600 hover:bg-primary-50 mt-1 group transition-all duration-300"
        onClick={onAddSampleProducts}
      >
        <Plus size={16} className="mr-1 group-hover:scale-110 transition-transform" />
        <span className="group-hover:translate-x-0.5 transition-transform">
          Aggiungi prodotti di esempio
        </span>
      </Button>
    </div>
  );
};
