import { useState, useRef, useEffect } from "react";
import { Search, Mic, X, Plus } from "lucide-react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToHistory } = useProductSearch(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && window.innerWidth < 768) inputRef.current.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await addToHistory(searchTerm.trim());
      onAddProduct();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch();
      e.preventDefault();
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        onSearchChange(searchTerm + (searchTerm ? " " : "") + "pomodori");
        inputRef.current?.focus();
      }, 2000);
    } else setIsListening(false);
  };

  const clearSearch = () => {
    onSearchChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative h-12 rounded-lg bg-card border border-border focus-within:border-primary/60 transition-colors">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cerca un prodotto…"
          className="h-12 pl-10 pr-24 bg-transparent border-0 rounded-lg text-base placeholder:text-muted-foreground focus-visible:ring-0"
          aria-label="Cerca prodotto"
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                onClick={clearSearch}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-label="Cancella"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
          <button
            onClick={handleMicClick}
            className={`p-1.5 rounded-md transition-colors ${
              isListening
                ? "bg-primary text-primary-foreground animate-pulse"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            aria-label="Riconoscimento vocale"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={handleSearch}
            disabled={!searchTerm.trim()}
            className="ml-1 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
            aria-label="Aggiungi prodotto"
          >
            <Plus className="w-4 h-4" />
            Aggiungi
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isListening && (
          <motion.div
            className="absolute left-0 right-0 top-full mt-2 p-4 rounded-lg paper-card text-center z-10"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <p className="font-serif text-lg text-foreground">Sto ascoltando…</p>
            <p className="text-xs text-muted-foreground mt-1">
              Pronuncia il nome del prodotto
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
