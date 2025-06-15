
import { useState } from "react";
import { ChevronDown, Package, Edit3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Product } from "@/types/shopping";

interface ProductSummaryProps {
  products: Product[];
  onEditProducts: () => void;
}

export const ProductSummary = ({ products, onEditProducts }: ProductSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-4 mt-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between p-4 h-auto rounded-2xl border-border dark:border-border hover:bg-muted dark:hover:bg-muted bg-card dark:bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-foreground dark:text-foreground">Riepilogo prodotti</span>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">{products.length} prodotti selezionati</p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground dark:text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-3 border-border dark:border-border rounded-2xl overflow-hidden bg-card dark:bg-card">
            <div className="p-4 space-y-3 bg-muted/30 dark:bg-muted/30">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    {product.imageUrl && (
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-background dark:bg-background shadow-sm">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium text-foreground dark:text-foreground">{product.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground bg-background dark:bg-background px-3 py-1 rounded-full shadow-sm">
                    x{product.quantity}
                  </span>
                </div>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/30 mt-4 rounded-xl"
                onClick={onEditProducts}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Modifica prodotti
              </Button>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
