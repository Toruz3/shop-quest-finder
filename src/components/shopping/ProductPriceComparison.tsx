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
export const ProductPriceComparison: React.FC<ProductPriceComparisonProps> = ({
  product
}) => {
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
  return <div className="w-full">
      <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-semibold transition-all duration-300 px-4 py-2.5 rounded-b-xl border-2 border-blue-100 border-t-0 shadow-sm hover:shadow-md">
            <BarChart3 size={16} strokeWidth={2.5} />
            <span>Confronta Prezzi</span>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-b-xl shadow-sm border-2 border-gray-100 border-t-0 w-full">
            {isLoading ? <div className="text-center text-xs text-blue-600 py-2">
                <div className="inline-flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Caricamento prezzi...</span>
                </div>
              </div> : priceComparison && priceComparison.length > 0 ? <div className="space-y-2">
                
                {priceComparison.map((item, idx) => <div key={idx}>
                    {idx > 0 && <Separator className="my-2 bg-gray-200" />}
                    <div className="flex justify-between items-center py-2 px-2 rounded-lg bg-white/60 hover:bg-white/80 transition-all duration-200">
                      <span className="text-xs text-gray-700 font-semibold bg-gray-100 px-2 py-1 rounded-full">
                        {item.supermarketName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-800 bg-white px-2 py-1 rounded-full shadow-sm">
                          €{item.price.toFixed(2)}
                        </span>
                        {item.isBestOffer && <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-xs border-green-300 px-2 py-1 font-semibold shadow-sm">
                            Migliore
                          </Badge>}
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="text-center text-xs text-gray-600 py-3">
                <span className="bg-gray-100 px-3 py-2 rounded-full font-medium">
                  Nessun dato disponibile per il confronto prezzi
                </span>
              </div>}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>;
};