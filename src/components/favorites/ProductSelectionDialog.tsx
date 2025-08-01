
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { useProductDatabase } from "@/hooks/useProductDatabase";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

interface ProductSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: { name: string; category: string }) => void;
}

export const ProductSelectionDialog = ({
  isOpen,
  onClose,
  onSelectProduct
}: ProductSelectionDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products = [], isLoading } = useProductDatabase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProduct = (product: { name: string; category: string }) => {
    onSelectProduct(product);
    onClose();
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[calc(100vw-2rem)] max-h-[calc(100vh-12rem)] overflow-hidden flex flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl fixed left-[50%] top-[calc(50%-2rem)] translate-x-[-50%] translate-y-[-50%]">
        <DialogHeader className="flex-shrink-0 pb-3 border-b border-gray-100 dark:border-gray-700">
          <DialogTitle className="text-gray-900 dark:text-gray-100 text-base font-semibold flex items-center gap-2">
            <Plus className="text-green-500" size={18} />
            Aggiungi prodotto ai preferiti
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col p-4 pt-3 space-y-3">
          {/* Search input */}
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Cerca prodotti..."
              className="h-10 pl-8 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg focus:border-green-500 focus:ring-green-200"
              autoFocus
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          </div>

          {/* Products list */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Caricamento prodotti...
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <Command className="bg-transparent">
                <CommandList className="max-h-none">
                  <CommandGroup>
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => handleSelectProduct(product)}
                        className="cursor-pointer p-3 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg mb-1 transition-colors"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <img
                            src={product.image_url || 'https://placehold.co/32x32?text=P'}
                            alt={product.name}
                            className="w-8 h-8 rounded object-cover bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            ) : searchTerm ? (
              <CommandEmpty className="py-8 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Nessun prodotto trovato per "{searchTerm}"
                </div>
              </CommandEmpty>
            ) : (
              <div className="text-center py-8">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Digita per cercare prodotti
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
