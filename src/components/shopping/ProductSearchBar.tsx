
import { useState, useRef, useEffect } from 'react';
import { Search, Mic, X, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Badge } from "@/components/ui/badge";

interface ProductSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddProduct: () => void;
}

export const ProductSearchBar = ({
  searchTerm,
  onSearchChange,
  onAddProduct,
}: ProductSearchBarProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { suggestions, isLoading, addToHistory, recentSearches } = useProductSearch(searchTerm);
  
  // Popular suggestions for empty search
  const popularSuggestions = [
    "Pane", "Latte", "Pasta", "Pomodori", "Formaggio", "Olio", "Riso", "Carne"
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && window.innerWidth < 768) {
        inputRef.current.focus();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      console.log("Adding to history:", searchTerm.trim());
      await addToHistory(searchTerm.trim());
      onAddProduct();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch();
      e.preventDefault();
    }
    if (e.key === 'Escape') {
      setShowHistory(false);
      inputRef.current?.blur();
    }
  };
  
  const handleMicClick = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        onSearchChange(searchTerm + (searchTerm ? ' ' : '') + 'pomodori');
        if (inputRef.current) inputRef.current.focus();
      }, 2000);
    } else {
      setIsListening(false);
    }
  };
  
  const clearSearch = () => {
    onSearchChange('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    handleSearch();
    setShowHistory(false);
  };

  const showSuggestions = isFocused && (searchTerm.length >= 2 ? suggestions.length > 0 : true);

  return (
    <div className="relative flex-1 group">
      <div className="relative h-14 rounded-xl shadow-sm bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 focus-within:border-primary/50 focus-within:shadow-md">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-200">
          <Search className="w-5 h-5" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            console.log("Search input changed:", e.target.value);
            onSearchChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            setShowHistory(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
              setShowHistory(false);
            }, 200);
          }}
          placeholder="Cosa vuoi acquistare?"
          className="h-14 pl-12 pr-24 py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-none border-0 rounded-xl w-full text-base focus-visible:ring-0 focus-visible:ring-offset-0 touch-feedback"
          aria-label="Cerca prodotto"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <AnimatePresence>
            {searchTerm && (
              <motion.button 
                onClick={clearSearch} 
                className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 touch-target"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                aria-label="Cancella ricerca"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
          <button 
            onClick={handleMicClick} 
            className={`p-2 rounded-full transition-all duration-300 touch-target ${
              isListening 
                ? 'bg-primary text-white animate-pulse shadow-lg' 
                : 'text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-primary/10 dark:hover:bg-gray-700'
            }`}
            aria-label={isListening ? "Interrompi riconoscimento vocale" : "Attiva riconoscimento vocale"}
          >
            <Mic className="w-5 h-5" />
          </button>
          <div className="text-gray-300 dark:text-gray-600">|</div>
          <button 
            onClick={handleSearch}
            disabled={!searchTerm.trim()}
            className="p-2 rounded-full text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent touch-target"
            aria-label="Aggiungi prodotto"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Enhanced Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div 
            className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-100 dark:border-gray-700 max-h-80 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="overflow-y-auto max-h-80">
              {/* Recent Searches */}
              {recentSearches.length > 0 && searchTerm.length < 2 && (
                <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Ricerche recenti</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 5).map((term, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                        onClick={() => handleSuggestionClick(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Suggestions */}
              {searchTerm.length < 2 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Popolari</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSuggestions.map((term, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                        onClick={() => handleSuggestionClick(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchTerm.length >= 2 && suggestions.length > 0 && (
                <div className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                      onClick={() => handleSuggestionClick(suggestion.name)}
                    >
                      <div className="flex items-center gap-3">
                        {suggestion.imageUrl && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-600 flex-shrink-0">
                            <img
                              src={suggestion.imageUrl}
                              alt={suggestion.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-200">
                            {suggestion.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {suggestion.description}
                          </div>
                        </div>
                        {suggestion.price && (
                          <div className="text-sm font-medium text-primary">
                            €{suggestion.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchTerm.length >= 2 && suggestions.length === 0 && !isLoading && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  <div className="text-sm">Nessun prodotto trovato per "{searchTerm}"</div>
                  <div className="text-xs mt-1">Premi Invio per aggiungerlo comunque</div>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="p-4 text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <div className="spinner-enhanced w-4 h-4" />
                    <span className="text-sm">Cercando...</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isListening && (
          <motion.div 
            className="absolute left-0 right-0 top-full mt-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-primary/20 text-center z-50"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full absolute"></div>
                <div className="w-8 h-8 bg-primary/30 rounded-full animate-ping absolute -top-2 -left-2"></div>
                <div className="w-16 h-16 bg-primary/10 rounded-full animate-ping absolute -top-6 -left-6"></div>
              </div>
            </div>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">Sto ascoltando...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pronuncia il nome del prodotto</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
