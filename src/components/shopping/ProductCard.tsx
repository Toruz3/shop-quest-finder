
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
      // This is a simulated API call - in a real app, you would fetch from Supabase
      // Simulating a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 800));

      // Sample comparison data
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
    enabled: isComparisonOpen // Only fetch when comparison section is opened
  });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        {/* Main product content with padding */}
        <div className="p-4 bg-white dark:bg-gray-800">
          <div className="flex items-start gap-3">
            {/* Image column */}
            <div className="flex-shrink-0">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded-lg shadow-sm" 
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400 dark:text-gray-300">
                    {product.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Product info column */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {product.name}
                </h3>
              </div>

              {/* Price and supermarket info */}
              {(product.price || product.supermarket) && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-left">
                  {product.price ? `€${product.price.toFixed(2)}` : ''} 
                  {product.supermarket ? ` • ${product.supermarket}` : ''}
                </p>
              )}

              {/* Quantity controls in a row */}
              <div className="flex items-center justify-between mt-3 mb-2">
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700" 
                    onClick={() => onUpdateQuantity(product.id, false)} 
                    aria-label="Diminuisci quantità"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <span className="w-6 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.quantity}
                  </span>

                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700" 
                    onClick={() => onUpdateQuantity(product.id, true)} 
                    aria-label="Aumenta quantità"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700" 
                  onClick={() => onRemoveProduct(product.id)} 
                  aria-label="Rimuovi prodotto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Price comparison section - positioned as direct child of Card */}
        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen} className="w-full border-t border-gray-100 dark:border-gray-700">
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-4 py-2 h-8 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full flex items-center justify-center"
            >
              <BarChart3 className="h-3.5 w-3.5 mr-1" />
              Confronta prezzi
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="w-full">
            <div className="bg-gray-50 dark:bg-gray-700 w-full">
              {isLoading ? (
                <div className="py-3 px-4 text-center text-xs text-gray-500 dark:text-gray-400">Caricamento...</div>
              ) : priceComparison && priceComparison.length > 0 ? (
                <div className="py-3 space-y-2">
                  {priceComparison.map((item, idx) => (
                    <div key={idx} className="w-full">
                      {idx > 0 && <Separator className="my-1.5 bg-gray-200 dark:bg-gray-600" />}
                      <div className="flex justify-between items-center w-full px-4 pt-1">
                        <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[55%]">
                          {item.supermarketName}
                        </span>
                        <div className="flex items-center gap-x-1.5 flex-shrink-0">
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                            €{item.price.toFixed(2)}
                          </span>
                          {item.isBestOffer && (
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] border-green-200 dark:border-green-800 py-0 px-1 whitespace-nowrap">
                              Miglior prezzo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-3 px-4 text-center text-xs text-gray-500 dark:text-gray-400">
                  Nessun dato disponibile per il confronto
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};
