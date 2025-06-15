
import { useState, useRef, useEffect } from 'react';
import { Search, Mic, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useProductSearch } from "@/hooks/useProductSearch";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const { suggestions, isLoading, addToHistory } = useProductSearch(searchTerm);
  
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

  return (
    <div className="relative flex-1 group">
      <div className="relative h-14 rounded-lg shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Cosa vuoi acquistare?"
          className="h-14 pl-12 pr-24 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-none border-0 rounded-lg w-full text-base focus:ring-2 focus:ring-primary/20"
          aria-label="Cerca prodotto"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <AnimatePresence>
            {searchTerm && (
              <motion.button 
                onClick={clearSearch} 
                className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
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
                ? 'bg-primary text-white animate-pulse' 
                : 'text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-primary-50 dark:hover:bg-gray-700'
            }`}
            aria-label={isListening ? "Interrompi riconoscimento vocale" : "Attiva riconoscimento vocale"}
          >
            <Mic className="w-5 h-5" />
          </button>
          <div className="text-gray-300 dark:text-gray-600">|</div>
          <button 
            onClick={onAddProduct}
            disabled={!searchTerm.trim()}
            className="p-2 rounded-full text-primary hover:text-primary/80 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:hover:bg-transparent touch-target"
            aria-label="Aggiungi prodotto"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isListening && (
          <motion.div 
            className="absolute left-0 right-0 top-full mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-center z-10"
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
