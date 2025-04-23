
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
        className="absolute z-50 w-full bg-white rounded-xl shadow-lg border border-neutral-200 max-h-[350px] overflow-hidden mt-1"
      >
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex flex-col overflow-y-auto py-2 max-h-[350px]"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="px-3 py-2 cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => onSelectSuggestion(suggestion.name)}
              >
                <div className="flex items-center gap-3">
                  {suggestion.imageUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-neutral-100 flex-shrink-0">
                      <img
                        src={suggestion.imageUrl}
                        alt={suggestion.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-neutral-800">{suggestion.name}</div>
                    <div className="text-sm text-neutral-500 line-clamp-1">{suggestion.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {showScroll && (
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
