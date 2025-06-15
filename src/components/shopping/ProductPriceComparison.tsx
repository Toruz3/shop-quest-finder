
import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/shopping';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ProductPriceComparisonProps {
  product: Product;
}

interface StorePriceData {
  supermarketName: string;
  price: number;
  isBestOffer: boolean;
  isOnSale?: boolean;
  salePrice?: number;
}

export const ProductPriceComparison: React.FC<ProductPriceComparisonProps> = ({
  product
}) => {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const {
    data: priceComparison,
    isLoading
  } = useQuery({
    queryKey: ['product-price-comparison', product.name],
    queryFn: async () => {
      // Search for the product by name in the database
      const { data: dbProduct } = await supabase
        .from('products')
        .select('id')
        .ilike('name', product.name)
        .single();

      if (!dbProduct) {
        return [];
      }

      // Get prices for this product from all stores
      const { data: prices } = await supabase
        .from('product_prices')
        .select(`
          price,
          sale_price,
          is_on_sale,
          stores!inner(name)
        `)
        .eq('product_id', dbProduct.id);

      if (!prices || prices.length === 0) {
        return [];
      }

      // Transform the data and find the best offer
      const priceData: StorePriceData[] = prices.map(price => ({
        supermarketName: price.stores.name,
        price: price.is_on_sale && price.sale_price ? Number(price.sale_price) : Number(price.price),
        isBestOffer: false,
        isOnSale: price.is_on_sale || false,
        salePrice: price.sale_price ? Number(price.sale_price) : undefined
      }));

      // Find the lowest price and mark it as best offer
      if (priceData.length > 0) {
        const lowestPrice = Math.min(...priceData.map(p => p.price));
        const bestOfferIndex = priceData.findIndex(p => p.price === lowestPrice);
        if (bestOfferIndex !== -1) {
          priceData[bestOfferIndex].isBestOffer = true;
        }
      }

      return priceData.sort((a, b) => a.price - b.price);
    },
    enabled: isComparisonOpen
  });

  return (
    <div className="w-full">
      <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-b-xl border-2 border-blue-100 border-t-0 shadow-sm hover:shadow-md">
            <BarChart3 size={16} strokeWidth={2.5} />
            <span>Confronta Prezzi</span>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-2 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-b-xl shadow-sm border-2 border-gray-100 border-t-0 w-full">
            {isLoading ? (
              <div className="text-center text-xs text-blue-600 py-2">
                <div className="inline-flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Caricamento prezzi...</span>
                </div>
              </div>
            ) : priceComparison && priceComparison.length > 0 ? (
              <div className="space-y-1">
                {priceComparison.map((item, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="my-1 bg-gray-200" />}
                    <div className="flex justify-between items-center py-1.5 px-2 rounded-lg bg-white/60 hover:bg-white/80 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700 font-semibold">
                          {item.supermarketName}
                        </span>
                        {item.isBestOffer && (
                          <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-xs border-green-300 px-1.5 py-0.5 font-semibold shadow-sm">
                            Migliore
                          </Badge>
                        )}
                        {item.isOnSale && (
                          <Badge variant="outline" className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs border-red-300 px-1.5 py-0.5 font-semibold shadow-sm">
                            Offerta
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-800">
                        €{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-xs text-gray-600 py-2">
                <span className="font-medium">
                  Nessun dato disponibile per il confronto prezzi
                </span>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
