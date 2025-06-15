import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FavoriteList } from "@/types/favorites";

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

  if (!list) return null;

  const filteredItems = list.items.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (newProduct.trim() && !list.items.includes(newProduct.trim())) {
      const updatedList = {
        ...list,
        items: [...list.items, newProduct.trim()],
        itemCount: list.items.length + 1,
        lastUsed: "Ora"
      };
      onUpdateList(updatedList);
      setNewProduct("");
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[calc(100vw-2rem)] !max-w-[calc(100vw-2rem)] sm:!max-w-[500px] !left-1/2 !top-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Gestisci "{list.name}"
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Aggiungi o rimuovi prodotti dalla tua lista
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Add new product */}
          <div className="flex-shrink-0 space-y-3 mb-4">
            <div className="flex gap-2">
              <Input 
                value={newProduct} 
                onChange={e => setNewProduct(e.target.value)} 
                onKeyPress={handleKeyPress}
                placeholder="Aggiungi prodotto" 
                className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl" 
                autoFocus 
              />
              <Button 
                onClick={handleAddProduct} 
                disabled={!newProduct.trim() || list.items.includes(newProduct.trim())}
                className="rounded-xl px-4"
              >
                <Plus size={16} />
              </Button>
            </div>
            
            {/* Search products */}
            <div className="relative">
              <Input 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                placeholder="Cerca nei prodotti" 
                className="pr-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl" 
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            </div>
          </div>

          {/* Products list */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {filteredItems.length} di {list.items.length} prodotti
              </span>
            </div>
            
            {filteredItems.length > 0 ? (
              <div className="space-y-2">
                <AnimatePresence>
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {item}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveProduct(item)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : list.items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  <Plus size={32} className="mx-auto" />
                </div>
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Lista vuota
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aggiungi il primo prodotto alla tua lista
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  <Search size={32} className="mx-auto" />
                </div>
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Nessun prodotto trovato
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Prova a modificare i filtri di ricerca
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
