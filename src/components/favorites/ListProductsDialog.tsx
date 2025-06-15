import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, Package } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FavoriteList } from "@/types/favorites";
import { productDatabase } from "@/data/productDatabase";

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

  const getProductImage = (productName: string) => {
    const product = productDatabase.find(p => 
      p.name.toLowerCase() === productName.toLowerCase()
    );
    return product?.imageUrl || 'https://placehold.co/40x40?text=P';
  };

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
      <DialogContent 
        className="max-w-sm w-[calc(100vw-2rem)] max-h-[calc(100vh-12rem)] overflow-hidden flex flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
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
          {/* Add new product section */}
          <div className="flex gap-2">
            <Input 
              value={newProduct} 
              onChange={e => setNewProduct(e.target.value)} 
              onKeyPress={handleKeyPress}
              placeholder="Aggiungi prodotto..." 
              className="h-9 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary/20" 
              autoFocus 
            />
            <Button 
              onClick={handleAddProduct} 
              disabled={!newProduct.trim() || list.items.includes(newProduct.trim())}
              className="h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-40"
              size="icon"
            >
              <Plus size={14} />
            </Button>
          </div>
          
          {/* Search and count */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                placeholder={`Cerca tra ${list.items.length} prodotti...`}
                className="h-8 pl-8 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg" 
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
            </div>
            <Badge variant="secondary" className="text-xs px-2 py-1 bg-primary/10 text-primary">
              {filteredItems.length}
            </Badge>
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
                      transition={{ 
                        duration: 0.15, 
                        delay: index * 0.02
                      }}
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
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveProduct(item)}
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150 flex-shrink-0"
                      >
                        <X size={12} />
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
      </DialogContent>
    </Dialog>
  );
};
