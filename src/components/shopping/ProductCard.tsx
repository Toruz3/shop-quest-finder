
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
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
      <Card className="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Main product content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            
            {/* Product image */}
            {product.imageUrl ? (
              <div className="flex-shrink-0">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded-xl border border-gray-100" 
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                <span className="text-lg font-medium text-gray-500">
                  {product.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Product info - takes remaining space */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              {/* Price and supermarket */}
              <div className="flex flex-col gap-1">
                {product.price && (
                  <div className="text-2xl font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </div>
                )}
                {product.supermarket && (
                  <div className="text-sm text-blue-600 font-medium">
                    {product.supermarket}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity controls - fixed width */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                <button 
                  className="text-gray-600 hover:text-red-600 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors" 
                  onClick={() => onUpdateQuantity(product.id, false)} 
                >
                  −
                </button>

                <span className="text-lg font-bold text-gray-900 min-w-[24px] text-center">
                  {product.quantity}
                </span>

                <button 
                  className="text-gray-600 hover:text-green-600 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-50 transition-colors" 
                  onClick={() => onUpdateQuantity(product.id, true)} 
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price comparison section */}
        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <div className="border-t border-gray-100">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full h-12 text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2 rounded-none text-sm font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                Confronta prezzi
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-gray-50 p-4 border-t border-gray-100">
                {isLoading ? (
                  <div className="text-center text-sm text-gray-500 py-3">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Caricamento...
                    </div>
                  </div>
                ) : priceComparison && priceComparison.length > 0 ? (
                  <div className="space-y-3">
                    {priceComparison.map((item, idx) => (
                      <div key={idx}>
                        {idx > 0 && <Separator className="my-3 bg-gray-200" />}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 font-medium">
                            {item.supermarketName}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">
                              €{item.price.toFixed(2)}
                            </span>
                            {item.isBestOffer && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs border-green-200 px-2 py-1 font-medium">
                                Miglior prezzo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-3">
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
