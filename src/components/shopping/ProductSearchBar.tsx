
import { useState, useRef, useEffect } from 'react';
import { Search, Mic, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  
  // Focus input on component mount for mobile
  useEffect(() => {
    // Delay focus to ensure proper keyboard behavior on mobile
    const timer = setTimeout(() => {
      if (inputRef.current && window.innerWidth < 768) {
        inputRef.current.focus();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onAddProduct();
      e.preventDefault();
    }
  };
  
  const handleMicClick = () => {
    // Voice recognition simulation
    if (!isListening) {
      setIsListening(true);
      // In a real app, voice recognition API would be integrated here
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
      <div className="relative h-14 rounded-lg shadow-search bg-white border border-border">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <Search className="w-5 h-5" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Cosa vuoi acquistare? (Enter per aggiungere)"
          className={`h-14 pl-12 pr-24 py-4 bg-white border-input dark:border-neutral-700 transition-all duration-300 rounded-lg w-full text-base
            ${isFocused ? 'border-primary ring-1 ring-primary/30 shadow-md' : 'hover:border-neutral-300'}`}
          aria-label="Cerca prodotto"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <AnimatePresence>
            {searchTerm && (
              <motion.button 
                onClick={clearSearch} 
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors touch-target"
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
                : 'text-neutral-400 hover:text-primary hover:bg-primary-50'
            }`}
            aria-label={isListening ? "Interrompi riconoscimento vocale" : "Attiva riconoscimento vocale"}
          >
            <Mic className="w-5 h-5" />
          </button>
          <div className="text-neutral-300">|</div>
          <button 
            onClick={onAddProduct}
            disabled={!searchTerm.trim()}
            className="p-2 rounded-full text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent touch-target ripple"
            aria-label="Aggiungi prodotto"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isListening && (
          <motion.div 
            className="absolute left-0 right-0 top-full mt-2 p-4 bg-white rounded-lg shadow-md border border-neutral-100 text-center z-10"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full absolute"></div>
                <div className="w-8 h-8 bg-primary-300/50 rounded-full animate-ping absolute -top-2 -left-2"></div>
                <div className="w-16 h-16 bg-primary-100/30 rounded-full animate-ping absolute -top-6 -left-6"></div>
              </div>
            </div>
            <p className="text-base font-medium text-neutral-800">Sto ascoltando...</p>
            <p className="text-sm text-neutral-500 mt-1">Pronuncia il nome del prodotto</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
