
import { ProductSuggestion } from "@/types/shopping";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductSuggestionsProps {
  suggestions: ProductSuggestion[];
  onSelectSuggestion: (name: string) => void;
}

export const ProductSuggestions = ({
  suggestions,
  onSelectSuggestion,
}: ProductSuggestionsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScroll(scrollHeight > clientHeight);
    };

    checkScroll();
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [suggestions]);

  if (suggestions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute z-50 w-full bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-primary/10 max-h-[350px] overflow-hidden animate-fade-in mt-1"
      >
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex flex-col overflow-y-auto py-3 px-2 max-h-[350px] custom-scrollbar"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#e2e8f0 transparent'
            }}
          >
            {suggestions.length > 7 && (
              <div className="sticky top-0 left-0 w-full h-4 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-10"></div>
            )}
            
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="w-full mx-1 my-1.5 bg-white rounded-lg shadow-sm border border-neutral-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 overflow-hidden"
                onClick={() => onSelectSuggestion(suggestion.name)}
              >
                <div className="flex p-3 cursor-pointer">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md border border-neutral-100 flex-shrink-0">
                    <img
                      src={suggestion.imageUrl}
                      alt={suggestion.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 ml-3 text-left">
                    <div className="font-medium text-neutral-800">{suggestion.name}</div>
                    <div className="text-sm text-neutral-500 line-clamp-2">{suggestion.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {suggestions.length > 7 && (
              <div className="sticky bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
            )}
          </div>
          
          {showScroll && (
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
