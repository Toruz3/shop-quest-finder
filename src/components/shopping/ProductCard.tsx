
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
      className="w-full"
    >
      {/* Card principale del prodotto */}
      <div className="bg-white rounded-t-xl p-4 shadow-sm border-2 border-green-100 hover:shadow-lg hover:bg-gray-50/30 transition-all duration-300 border-b-0">
        <div className="flex items-center gap-4">
          
          {/* Immagine Prodotto - più grande */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 p-2 flex items-center justify-center overflow-hidden shadow-sm">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${product.imageUrl ? 'hidden' : ''}`}>
                <div className="w-6 h-6 bg-gradient-to-br from-green-300 to-blue-300 rounded-md shadow-sm"></div>
              </div>
            </div>
          </div>
          
          {/* Informazioni Prodotto */}
          <div className="flex-1 min-w-0">
            <ProductInfo product={product} />
          </div>

          {/* Controlli Quantità - spostati più a destra e ridotti */}
          <div className="flex-shrink-0 ml-auto">
            <ProductQuantityControls 
              quantity={product.quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
          
        </div>
      </div>

      {/* Sezione Confronta Prezzi - attaccata alla card principale */}
      <div className="w-full">
        <ProductPriceComparison product={product} />
      </div>
    </motion.div>
  );
};
