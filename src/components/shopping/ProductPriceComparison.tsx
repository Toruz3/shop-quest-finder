import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Product } from "@/types/shopping";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProductPriceComparisonProps {
  product: Product;
}

interface StorePriceData {
  supermarketName: string;
  price: number;
  isBestOffer: boolean;
  isOnSale?: boolean;
}

export const ProductPriceComparison = ({ product }: ProductPriceComparisonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: priceComparison, isLoading } = useQuery({
    queryKey: ["product-price-comparison", product.name],
    queryFn: async () => {
      const { data: dbProduct } = await supabase
        .from("products")
        .select("id")
        .ilike("name", product.name)
        .single();

      if (!dbProduct) return [];

      const { data: prices } = await supabase
        .from("product_prices")
        .select(`price, sale_price, is_on_sale, stores!inner(name)`)
        .eq("product_id", dbProduct.id);

      if (!prices?.length) return [];

      const priceData: StorePriceData[] = prices.map((p) => ({
        supermarketName: p.stores.name,
        price: p.is_on_sale && p.sale_price ? Number(p.sale_price) : Number(p.price),
        isBestOffer: false,
        isOnSale: p.is_on_sale || false,
      }));

      const lowest = Math.min(...priceData.map((p) => p.price));
      const i = priceData.findIndex((p) => p.price === lowest);
      if (i !== -1) priceData[i].isBestOffer = true;

      return priceData.sort((a, b) => a.price - b.price);
    },
    enabled: isOpen,
  });

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-4 py-2.5 border-t border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
          <span>Confronta prezzi</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
              Caricamento prezzi…
            </div>
          ) : priceComparison && priceComparison.length > 0 ? (
            <ul className="divide-y divide-border">
              {priceComparison.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-foreground truncate">
                      {item.supermarketName}
                    </span>
                    {item.isBestOffer && (
                      <span className="text-[10px] uppercase tracking-wider text-primary">
                        miglior prezzo
                      </span>
                    )}
                    {item.isOnSale && (
                      <span className="text-[10px] uppercase tracking-wider text-destructive">
                        offerta
                      </span>
                    )}
                  </div>
                  <span className="font-serif text-base num-tabular text-foreground">
                    €{item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">
              Nessun dato disponibile.
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
