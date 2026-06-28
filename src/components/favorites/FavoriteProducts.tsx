import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, ShoppingCart, Trash2, AlertCircle } from "lucide-react";
import { FavoriteProduct } from "@/types/favorites";
import { ProductSelectionDialog } from "./ProductSelectionDialog";
import { useState } from "react";
interface FavoriteProductsProps {
  filteredProducts: FavoriteProduct[];
  onDeleteProduct: (id: number) => void;
  onAddToCart: (product: FavoriteProduct) => void;
  onAddProduct: (productData: {
    name: string;
    category: string;
  }) => void;
}
export const FavoriteProducts = ({
  filteredProducts,
  onDeleteProduct,
  onAddToCart,
  onAddProduct
}: FavoriteProductsProps) => {
  const [showProductDialog, setShowProductDialog] = useState(false);
  const handleSelectProduct = (productData: {
    name: string;
    category: string;
  }) => {
    onAddProduct(productData);
  };
  return <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-foreground">
          {filteredProducts.length} prodotti preferiti
        </h2>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-card border-border text-foreground" onClick={() => setShowProductDialog(true)}>
          <Plus size={14} className="mr-1" />
          Aggiungi prodotto
        </Button>
      </div>
      
      {filteredProducts.length > 0 ? <div className="space-y-2">
          {filteredProducts.map(product => <motion.div key={product.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
              <Card className="p-3 bg-card border border-border hover:border-primary/40 transition-all shadow-sm hover:shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground text-left">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-foreground">€{product.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.store}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-500" onClick={() => onDeleteProduct(product.id)}>
                      <Trash2 size={16} />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 bg-card border-border text-foreground" onClick={() => onAddToCart(product)}>
                      <ShoppingCart size={14} className="mr-1" />
                      Aggiungi
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>)}
        </div> : <Card className="p-6 text-center border-dashed border-2 bg-card border-border">
          <div className="flex flex-col items-center">
            <AlertCircle className="text-muted-foreground mb-2" size={32} />
            <h3 className="text-base font-medium text-foreground">Nessun prodotto trovato</h3>
            <p className="text-sm text-muted-foreground mt-1">Aggiungi prodotti ai preferiti o modifica i filtri di ricerca</p>
          </div>
        </Card>}

      <ProductSelectionDialog isOpen={showProductDialog} onClose={() => setShowProductDialog(false)} onSelectProduct={handleSelectProduct} />
    </>;
};