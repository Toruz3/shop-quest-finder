
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, ShoppingCart, Trash2, AlertCircle } from "lucide-react";

interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  store: string;
}

interface FavoriteProductsProps {
  filteredProducts: FavoriteProduct[];
  onDeleteProduct: (id: number) => void;
  onAddToCart: (product: FavoriteProduct) => void;
}

export const FavoriteProducts = ({
  filteredProducts,
  onDeleteProduct,
  onAddToCart
}: FavoriteProductsProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {filteredProducts.length} prodotti preferiti
        </h2>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <Plus size={14} className="mr-1" />
          Aggiungi prodotto
        </Button>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="space-y-2">
          {filteredProducts.map(product => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-200 transition-all shadow-sm hover:shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-900 dark:text-gray-100">€{product.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {product.store}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-red-500" onClick={() => onDeleteProduct(product.id)}>
                      <Trash2 size={16} />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" onClick={() => onAddToCart(product)}>
                      <ShoppingCart size={14} className="mr-1" />
                      Aggiungi
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center border-dashed border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <AlertCircle className="text-gray-400 dark:text-gray-500 mb-2" size={32} />
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Nessun prodotto trovato</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Aggiungi prodotti ai preferiti o modifica i filtri di ricerca</p>
          </div>
        </Card>
      )}
    </>
  );
};
