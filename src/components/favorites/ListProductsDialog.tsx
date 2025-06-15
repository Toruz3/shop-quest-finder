
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, Trash2, Package } from "lucide-react";
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
      <DialogContent className="!w-[calc(100vw-2rem)] !max-w-[calc(100vw-2rem)] sm:!max-w-[500px] !left-1/2 !top-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        <DialogHeader className="flex-shrink-0 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Package className="text-primary" size={20} />
            </div>
            <div>
              <DialogTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
                Gestisci "{list.name}"
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 text-sm">
                Aggiungi o rimuovi prodotti dalla tua lista
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col p-6 pt-4">
          {/* Add new product section */}
          <div className="flex-shrink-0 space-y-4 mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input 
                  value={newProduct} 
                  onChange={e => setNewProduct(e.target.value)} 
                  onKeyPress={handleKeyPress}
                  placeholder="Aggiungi un nuovo prodotto..." 
                  className="h-12 pr-4 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:bg-white dark:focus:bg-gray-700 transition-all duration-200" 
                  autoFocus 
                />
              </div>
              <Button 
                onClick={handleAddProduct} 
                disabled={!newProduct.trim() || list.items.includes(newProduct.trim())}
                className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-40"
                size="icon"
              >
                <Plus size={18} />
              </Button>
            </div>
            
            {/* Search section */}
            <div className="relative">
              <Input 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                placeholder="Cerca tra i prodotti..." 
                className="h-11 pl-10 pr-4 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:bg-white dark:focus:bg-gray-700 transition-all duration-200" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            </div>
          </div>

          {/* Products count and list */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary border-primary/20">
                  {filteredItems.length} di {list.items.length}
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  prodotti
                </span>
              </div>
            </div>
            
            {/* Products list with improved styling */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {filteredItems.length > 0 ? (
                <div className="space-y-3 pr-2">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.95 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: index * 0.03,
                          layout: { duration: 0.2 }
                        }}
                        className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                          <span className="text-gray-900 dark:text-gray-100 font-medium text-sm">
                            {item}
                          </span>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveProduct(item)}
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : list.items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Lista vuota
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Inizia aggiungendo il primo prodotto alla tua lista della spesa
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Nessun risultato
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Non abbiamo trovato prodotti che corrispondono alla tua ricerca
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
