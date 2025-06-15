
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Product, PriceComparison } from "@/types/shopping";
import { useQuery } from "@tanstack/react-query";

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

  // Price comparison data fetch using React Query
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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        {/* Main product content */}
        <div className="p-4">
          <div className="flex items-center gap-4">
            {/* Product image */}
            <div className="flex-shrink-0">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded-xl shadow-sm" 
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400 dark:text-gray-300">
                    {product.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate mb-1">
                {product.name}
              </h3>
              
              {/* Price and supermarket in one line */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                {product.price && (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    €{product.price.toFixed(2)}
                  </span>
                )}
                {product.supermarket && (
                  <>
                    <span>•</span>
                    <span>{product.supermarket}</span>
                  </>
                )}
              </div>

              {/* Quantity controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700" 
                    onClick={() => onUpdateQuantity(product.id, false)} 
                    aria-label="Diminuisci quantità"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
                    {product.quantity}
                  </span>

                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700" 
                    onClick={() => onUpdateQuantity(product.id, true)} 
                    aria-label="Aumenta quantità"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" 
                  onClick={() => onRemoveProduct(product.id)} 
                  aria-label="Rimuovi prodotto"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Price comparison section */}
        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full h-12 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center gap-2 rounded-none"
              >
                <BarChart3 className="h-4 w-4" />
                Confronta prezzi
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                {isLoading ? (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Caricamento...
                  </div>
                ) : priceComparison && priceComparison.length > 0 ? (
                  <div className="space-y-3">
                    {priceComparison.map((item, idx) => (
                      <div key={idx}>
                        {idx > 0 && <Separator className="my-2 bg-gray-200 dark:bg-gray-600" />}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item.supermarketName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              €{item.price.toFixed(2)}
                            </span>
                            {item.isBestOffer && (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs border-green-200 dark:border-green-800">
                                Miglior prezzo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Nessun dato disponibile per il confronto
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </Card>
    </motion.div>
  );
};
