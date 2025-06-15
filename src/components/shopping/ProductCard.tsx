
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Product, PriceComparison } from "@/types/shopping";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: priceComparison,
    isLoading
  } = useQuery({
    queryKey: ['product-price-comparison', product.id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return [{
        supermarketName: 'Esselunga',
        price: (product.price || 0) * 0.9,
        isBestOffer: true
      }, {
        supermarketName: 'Carrefour',
        price: (product.price || 0) * 1.05,
        isBestOffer: false
      }, {
        supermarketName: 'Coop',
        price: (product.price || 0) * 0.95,
        isBestOffer: false
      }] as PriceComparison[];
    },
    enabled: isComparisonOpen
  });

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
      className="bg-white dark:bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.01] transition-all duration-200 w-full"
    >
      <div className="flex items-center gap-4 min-h-[80px]">
        
        {/* Immagine Prodotto */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-200 p-2 flex items-center justify-center overflow-hidden">
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
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Informazioni Prodotto */}
        <div className="flex-1 min-w-0 py-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-800 mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex flex-col gap-1">
            {product.supermarket && (
              <span className="text-sm text-gray-500 dark:text-gray-600">
                {product.supermarket}
              </span>
            )}
            {product.price && (
              <span className="font-bold text-xl text-green-600 dark:text-green-700">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Controlli Quantità */}
        <div className="flex-shrink-0">
          <div className="flex items-center bg-gray-100 dark:bg-gray-200 rounded-full px-3 py-2 gap-3">
            <button 
              onClick={() => handleQuantityChange(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-700 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all"
              aria-label="Diminuisci quantità"
            >
              <Minus size={16} strokeWidth={2} />
            </button>
            <span className="font-bold text-lg text-gray-900 dark:text-gray-800 min-w-[24px] text-center">
              {product.quantity}
            </span>
            <button 
              onClick={() => handleQuantityChange(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-700 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all"
              aria-label="Aumenta quantità"
            >
              <Plus size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Confronta prezzi */}
        <div className="flex-shrink-0 relative">
          <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 hover:underline text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                <BarChart3 size={16} strokeWidth={2} />
                <span>Confronta</span>
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="absolute right-0 top-full mt-2 p-4 bg-white dark:bg-gray-50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-300 w-64 z-10">
                {isLoading ? (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-600 py-3">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Caricamento...
                    </div>
                  </div>
                ) : priceComparison && priceComparison.length > 0 ? (
                  <div className="space-y-3">
                    {priceComparison.map((item, idx) => (
                      <div key={idx}>
                        {idx > 0 && <Separator className="my-2 bg-gray-200 dark:bg-gray-300" />}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-600 font-medium">
                            {item.supermarketName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-800">
                              €{item.price.toFixed(2)}
                            </span>
                            {item.isBestOffer && (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-100 text-green-700 dark:text-green-800 text-xs border-green-200 dark:border-green-300 px-2 py-1 font-medium">
                                Migliore
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-600 py-3">
                    Nessun dato disponibile
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
      </div>
    </motion.div>
  );
};
