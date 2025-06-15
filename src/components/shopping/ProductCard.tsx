
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
      <Card className="overflow-hidden bg-gradient-to-r from-white to-gray-50/30 border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200/40">
        {/* Main product content */}
        <div className="p-4">
          <div className="flex items-center gap-4">
            {/* Product image - enhanced with better styling */}
            {product.imageUrl ? (
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-sm ring-1 ring-gray-200/50" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-gray-200/50">
                <span className="text-xl font-semibold text-gray-400">
                  {product.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Product info - enhanced typography */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-base leading-tight">
                {product.name}
              </h3>
              
              {/* Price and supermarket - improved styling */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1.5">
                {product.price && (
                  <span className="font-bold text-gray-900 text-lg">
                    €{product.price.toFixed(2)}
                  </span>
                )}
                {product.supermarket && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-blue-600 font-medium">{product.supermarket}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity controls - enhanced design */}
            <div className="flex items-center gap-2 flex-shrink-0 bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-full px-3 py-2 shadow-sm ring-1 ring-gray-200/40">
              <button 
                className="text-gray-500 hover:text-red-500 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors duration-150" 
                onClick={() => onUpdateQuantity(product.id, false)} 
              >
                −
              </button>

              <span className="text-sm font-bold text-gray-900 min-w-[12px] text-center px-1">
                {product.quantity}
              </span>

              <button 
                className="text-gray-500 hover:text-green-500 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-green-50 transition-colors duration-150" 
                onClick={() => onUpdateQuantity(product.id, true)} 
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price comparison section - enhanced */}
        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <div className="border-t border-gray-100/80">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full h-10 text-blue-600 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 flex items-center justify-center gap-2 rounded-none text-sm font-medium transition-all duration-200"
              >
                <BarChart3 className="h-4 w-4" />
                Confronta prezzi
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-3 border-t border-gray-100/60">
                {isLoading ? (
                  <div className="text-center text-sm text-gray-500 py-2">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Caricamento...
                    </div>
                  </div>
                ) : priceComparison && priceComparison.length > 0 ? (
                  <div className="space-y-2">
                    {priceComparison.map((item, idx) => (
                      <div key={idx}>
                        {idx > 0 && <Separator className="my-2 bg-gray-200/80" />}
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-gray-700 font-medium">
                            {item.supermarketName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              €{item.price.toFixed(2)}
                            </span>
                            {item.isBestOffer && (
                              <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs border-green-300/60 px-2 py-1 font-medium shadow-sm">
                                Miglior prezzo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-2">
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
