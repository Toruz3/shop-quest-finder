import { useState } from "react";
import { ChevronDown, Tag, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Product } from "@/types/shopping";

interface ProductPrice {
  productName: string;
  prices: {
    storeName: string;
    price: number;
    isLowest: boolean;
    savings?: number;
  }[];
}

interface ProductPriceBreakdownProps {
  products: Product[];
  stores: Array<{ name: string; id: number }>;
}

export const ProductPriceBreakdown = ({ products, stores }: ProductPriceBreakdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock data per dimostrazione - in un'app reale verrebbe dal database
  const productPrices: ProductPrice[] = products.map((product, index) => ({
    productName: product.name,
    prices: stores.map((store, storeIndex) => {
      const basePrice = 2 + index + storeIndex * 0.5;
      const isLowest = storeIndex === 0; // Il primo store ha sempre il prezzo più basso per demo
      const savings = isLowest ? 0 : Math.round((basePrice - (2 + index)) * 100) / 100;
      
      return {
        storeName: store.name,
        price: Math.round(basePrice * 100) / 100,
        isLowest,
        savings: savings > 0 ? savings : undefined
      };
    })
  }));

  return (
    <div className="mx-4 mt-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between p-4 h-auto rounded-2xl border-border dark:border-border hover:bg-muted dark:hover:bg-muted bg-card dark:bg-card"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-foreground dark:text-foreground">Confronto prezzi prodotti</span>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Vedi i prezzi di ogni singolo prodotto
                </p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground dark:text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-3 border-border dark:border-border rounded-2xl overflow-hidden bg-card dark:bg-card">
            <CardContent className="p-4 space-y-4">
              {productPrices.map((product) => (
                <div key={product.productName} className="space-y-2">
                  <h4 className="font-medium text-foreground dark:text-foreground">{product.productName}</h4>
                  <div className="space-y-1">
                    {product.prices.map((priceInfo) => (
                      <div 
                        key={priceInfo.storeName}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          priceInfo.isLowest 
                            ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' 
                            : 'bg-muted/30 dark:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground dark:text-foreground">
                            {priceInfo.storeName}
                          </span>
                          {priceInfo.isLowest && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                              <TrendingDown className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                Migliore
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${
                            priceInfo.isLowest 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-foreground dark:text-foreground'
                          }`}>
                            €{priceInfo.price.toFixed(2)}
                          </span>
                          {priceInfo.savings && (
                            <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                              (+€{priceInfo.savings.toFixed(2)})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};