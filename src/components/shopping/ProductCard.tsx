
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, BarChart3 } from "lucide-react";
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
      <Card className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Main product content - with larger image */}
        <div className="p-3">
          <div className="flex items-center gap-3">
            {/* Product image - larger */}
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0" 
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-medium text-gray-400">
                  {product.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate text-sm">
                {product.name}
              </h3>
              
              {/* Price and supermarket */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                {product.price && (
                  <span className="font-medium text-gray-700">
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
            </div>

            {/* Quantity controls - very small */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-4 w-4 rounded-full" 
                onClick={() => onUpdateQuantity(product.id, false)} 
              >
                <Minus className="h-1.5 w-1.5" />
              </Button>

              <span className="text-sm font-medium min-w-[1.5rem] text-center">
                {product.quantity}
              </span>

              <Button 
                variant="outline" 
                size="icon" 
                className="h-4 w-4 rounded-full" 
                onClick={() => onUpdateQuantity(product.id, true)} 
              >
                <Plus className="h-1.5 w-1.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Price comparison section - smaller */}
        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <div className="border-t border-gray-100">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2 rounded-none text-xs"
              >
                <BarChart3 className="h-3 w-3" />
                Confronta prezzi
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-gray-50 p-2">
                {isLoading ? (
                  <div className="text-center text-xs text-gray-500">
                    Caricamento...
                  </div>
                ) : priceComparison && priceComparison.length > 0 ? (
                  <div className="space-y-1.5">
                    {priceComparison.map((item, idx) => (
                      <div key={idx}>
                        {idx > 0 && <Separator className="my-1.5 bg-gray-200" />}
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">
                            {item.supermarketName}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-gray-900">
                              €{item.price.toFixed(2)}
                            </span>
                            {item.isBestOffer && (
                              <Badge variant="outline" className="bg-green-50 text-green-600 text-[10px] border-green-200 px-1.5 py-0.5">
                                Miglior prezzo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-xs text-gray-500">
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
