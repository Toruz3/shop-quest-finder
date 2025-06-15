
import { motion } from "framer-motion";
import { Product } from "@/types/shopping";
import { useToast } from "@/hooks/use-toast";
import { ProductInfo } from "./ProductInfo";
import { ProductQuantityControls } from "./ProductQuantityControls";
import { ProductPriceComparison } from "./ProductPriceComparison";

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
}

export const ProductCard = ({
  product,
  onUpdateQuantity,
  onRemoveProduct
}: ProductCardProps) => {
  const { toast } = useToast();

  const handleQuantityChange = (increment: boolean) => {
    if (!increment && product.quantity === 1) {
      onRemoveProduct(product.id);
      return;
    }
    
    onUpdateQuantity(product.id, increment);
    
    if (increment) {
      toast({
        title: "Prodotto aggiunto alla lista",
        description: `${product.name} è stato aggiunto con successo`,
        duration: 3000,
      });
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.01] transition-all duration-200 w-full"
    >
      <div className="flex items-center gap-3">
        
        {/* Immagine Prodotto - più piccola */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-200 p-1.5 flex items-center justify-center overflow-hidden">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full flex items-center justify-center ${product.imageUrl ? 'hidden' : ''}`}>
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Informazioni Prodotto - layout compatto */}
        <div className="flex-1 min-w-0">
          <ProductInfo product={product} />
        </div>

        {/* Controlli in orizzontale - più compatti */}
        <div className="flex items-center gap-2 flex-shrink-0">
          
          {/* Controlli Quantità */}
          <ProductQuantityControls 
            quantity={product.quantity}
            onQuantityChange={handleQuantityChange}
          />

          {/* Confronta prezzi */}
          <ProductPriceComparison product={product} />
          
        </div>
      </div>
    </motion.div>
  );
};
