
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, Package } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FavoriteList } from "@/types/favorites";
import { productDatabase } from "@/data/productDatabase";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface ListProductsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  list: FavoriteList | null;
  onUpdateList: (updatedList: FavoriteList) => void;
}

export const ListProductsDialog = ({
  isOpen,
  onClose,
  list,
  onUpdateList
}: ListProductsDialogProps) => {
  const [newProduct, setNewProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Use product search hook for suggestions
  const {
    suggestions,
    isLoading
  } = useProductSearch(newProduct);

  if (!list) return null;

  const filteredItems = list.items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

  const getProductImage = (productName: string) => {
    const product = productDatabase.find(p => p.name.toLowerCase() === productName.toLowerCase());
    return product?.imageUrl || 'https://placehold.co/40x40?text=P';
  };

  const handleAddProduct = (productName?: string) => {
    const nameToAdd = productName || newProduct.trim();
    if (nameToAdd && !list.items.includes(nameToAdd)) {
      const updatedList = {
        ...list,
        items: [...list.items, nameToAdd],
        itemCount: list.items.length + 1,
        lastUsed: "Ora"
      };
      onUpdateList(updatedList);
      setNewProduct("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveProduct = (productToRemove: string) => {
    const updatedList = {
      ...list,
      items: list.items.filter(item => item !== productToRemove),
      itemCount: list.items.length - 1
    };
    onUpdateList(updatedList);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  };

  const handleInputChange = (value: string) => {
    setNewProduct(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    handleAddProduct(suggestion.name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[calc(100vw-2rem)] max-h-[calc(100vh-12rem)] overflow-hidden flex flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl"
        style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(50vh - 2rem)',
          transform: 'translate(-50%, -50%)',
          margin: '0',
          zIndex: 50
        }}
      >
        <DialogHeader className="flex-shrink-0 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Package className="text-primary" size={18} />
            <div>
              <DialogTitle className="text-gray-900 dark:text-gray-100 text-base font-semibold">
                {list.name}
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400 text-xs">
                Gestisci i prodotti della lista
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col p-4 pt-3 space-y-3">
          {/* Add new product section with suggestions */}
          <div className="relative">
            <div className="flex gap-2 items-center">
              <div className="flex-1 relative">
                <Input
                  value={newProduct}
                  onChange={e => handleInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setShowSuggestions(newProduct.length > 0)}
                  placeholder="Aggiungi prodotto..."
                  className="h-10 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary/20"
                  autoFocus
                />
                
                {/* Product suggestions dropdown */}
                {showSuggestions && newProduct.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    {isLoading ? (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        Caricamento...
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="py-1">
                        {suggestions.slice(0, 5).map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm transition-colors"
                          >
                            <img
                              src={suggestion.imageUrl || 'https://placehold.co/24x24?text=P'}
                              alt={suggestion.name}
                              className="w-6 h-6 rounded object-cover bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {suggestion.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {suggestion.category}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        Nessun prodotto trovato
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Search and count */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={`Cerca tra ${list.items.length} prodotti...`}
                className="h-10 pl-8 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
            </div>
          </div>

          {/* Products list */}
          <div className="flex-1 overflow-y-auto">
            {filteredItems.length > 0 ? (
              <div className="space-y-1.5">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.15, delay: index * 0.02 }}
                      className="group flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/20 hover:bg-primary/5 transition-all duration-150"
                    >
                      <img
                        src={getProductImage(item)}
                        alt={item}
                        className="w-8 h-8 rounded-md object-cover bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                      />
                      <span className="flex-1 text-gray-900 dark:text-gray-100 text-sm font-medium truncate">
                        {item}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveProduct(item)}
                        className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 active:scale-95 transition-all duration-200 ease-out flex-shrink-0 flex items-center justify-center"
                        aria-label="Rimuovi prodotto"
                      >
                        <X size={14} />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : list.items.length === 0 ? (
              <div className="text-center py-8">
                <Package size={32} className="text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nessun prodotto nella lista
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Aggiungi il primo prodotto
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Search size={32} className="text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nessun risultato per "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Click outside handler to close suggestions */}
        {showSuggestions && (
          <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};
