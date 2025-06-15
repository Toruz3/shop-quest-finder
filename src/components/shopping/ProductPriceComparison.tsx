
import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Product, PriceComparison } from '@/types/shopping';
import { useQuery } from '@tanstack/react-query';

interface ProductPriceComparisonProps {
  product: Product;
}

export const ProductPriceComparison: React.FC<ProductPriceComparisonProps> = ({ product }) => {
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
    <div className="w-full">
      <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50/70 text-sm font-medium transition-all duration-200 px-4 py-2 rounded-b-xl border border-gray-100 border-t-0 bg-white dark:bg-gray-50">
            <BarChart3 size={16} strokeWidth={2} />
            <span>Confronta Prezzi</span>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-2 bg-white dark:bg-gray-50 rounded-b-xl shadow-sm border border-gray-200 dark:border-gray-300 border-t-0 w-full">
            {isLoading ? (
              <div className="text-center text-xs text-gray-500 dark:text-gray-600 py-2">
                <div className="inline-flex items-center gap-1">
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Caricamento prezzi...
                </div>
              </div>
            ) : priceComparison && priceComparison.length > 0 ? (
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-800 text-sm mb-2">
                  Confronto prezzi per {product.name}
                </h4>
                {priceComparison.map((item, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="my-1 bg-gray-200 dark:bg-gray-300" />}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-gray-700 dark:text-gray-600 font-medium">
                        {item.supermarketName}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-800">
                          €{item.price.toFixed(2)}
                        </span>
                        {item.isBestOffer && (
                          <Badge variant="outline" className="bg-green-50 dark:bg-green-100 text-green-700 dark:text-green-800 text-xs border-green-200 dark:border-green-300 px-1 py-0 font-medium scale-75">
                            Migliore Offerta
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-xs text-gray-500 dark:text-gray-600 py-2">
                Nessun dato disponibile per il confronto prezzi
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
