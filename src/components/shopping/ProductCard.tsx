
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
import { ProductImage } from "./ProductImage";
import { StoreBadge } from "./StoreBadge";
import { QuantityCounter } from "./QuantityCounter";
import { PriceDisplay } from "./PriceDisplay";

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

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      onRemoveProduct(product.id);
    } else {
      const increment = newQuantity > product.quantity;
      onUpdateQuantity(product.id, increment);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="transform hover:scale-[1.02] transition-all duration-300"
    >
      <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Main Product Content */}
        <div className="p-6">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
            
            {/* Product Image */}
            <ProductImage 
              src={product.imageUrl} 
              alt={product.name}
              className="w-20 h-20"
            />

            {/* Product Info */}
            <div className="min-w-0 space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-base line-clamp-2 leading-tight">
                {product.name}
              </h3>
              
              <div className="flex flex-col gap-2">
                {product.price && (
                  <PriceDisplay price={product.price} />
                )}
                {product.supermarket && (
                  <StoreBadge store={product.supermarket} />
                )}
              </div>
            </div>

            {/* Quantity Counter */}
            <div className="flex-shrink-0">
              <QuantityCounter 
                quantity={product.quantity}
                onQuantityChange={handleQuantityChange}
                min={0}
                max={99}
              />
            </div>
          </div>
        </div>

        {/* Price Comparison Section */}
        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <div className="border-t border-gray-100 dark:border-gray-800">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-none hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium h-auto"
              >
                <BarChart3 size={18} />
                Confronta prezzi
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4">
                {isLoading ? (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-3">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Caricamento...
                    </div>
                  </div>
                ) : priceComparison && priceComparison.length > 0 ? (
                  <div className="space-y-3">
                    {priceComparison.map((item, idx) => (
                      <div key={idx}>
                        {idx > 0 && <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {item.supermarketName}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                              €{item.price.toFixed(2)}
                            </span>
                            {item.isBestOffer && (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs border-green-200 dark:border-green-800 px-2 py-1 font-medium">
                                Miglior prezzo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-3">
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
