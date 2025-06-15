
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Product, PriceComparison } from "@/types/shopping";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

  const handleQuantityChange = (increment: boolean) => {
    if (!increment && product.quantity === 1) {
      onRemoveProduct(product.id);
      return;
    }
    
    onUpdateQuantity(product.id, increment);
    
    if (increment) {
      toast({
        title: "Prodotto aggiunto alla lista",
        description: `${product.name} è stato aggiunto con successo`,
        duration: 3000,
      });
    }
  };

  const handleFindStore = () => {
    toast({
      title: "Ricerca supermercato",
      description: "Funzionalità in arrivo nelle prossime versioni!",
      duration: 3000,
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto"
    >
      {/* Layout principale */}
      <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
        {/* Immagine prodotto */}
        <div className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-gray-800 p-2 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-full h-full flex items-center justify-center ${product.imageUrl ? 'hidden' : ''}`}>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
        
        {/* Info prodotto */}
        <div className="flex flex-col gap-3">
          {/* Nome e prezzo */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2 flex-1">
              {product.name}
            </h3>
            {product.price && (
              <div className="text-right flex-shrink-0">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  €{product.price.toFixed(2)}
                </span>
              </div>
            )}
          </div>
          
          {/* Store e counter */}
          <div className="flex items-center justify-between gap-3">
            {product.supermarket && (
              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                {product.supermarket}
              </span>
            )}
            
            {/* Counter compatto */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button 
                onClick={() => handleQuantityChange(false)}
                className="w-7 h-7 rounded-md bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                aria-label="Diminuisci quantità"
              >
                <Minus size={14} className="text-gray-600 dark:text-gray-300" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                {product.quantity}
              </span>
              <button 
                onClick={() => handleQuantityChange(true)}
                className="w-7 h-7 rounded-md bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                aria-label="Aumenta quantità"
              >
                <Plus size={14} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confronta prezzi */}
      <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/70 transition-colors text-sm font-medium">
              <BarChart3 size={16} />
              Confronta prezzi
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              {isLoading ? (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Caricamento...
                  </div>
                </div>
              ) : priceComparison && priceComparison.length > 0 ? (
                <div className="space-y-2">
                  {priceComparison.map((item, idx) => (
                    <div key={idx}>
                      {idx > 0 && <Separator className="my-2 bg-gray-200 dark:bg-gray-700" />}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {item.supermarketName}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            €{item.price.toFixed(2)}
                          </span>
                          {item.isBestOffer && (
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs border-green-200 dark:border-green-800 px-1.5 py-0.5 font-medium">
                              Miglior prezzo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                  Nessun dato disponibile per il confronto
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      {/* Button trova supermercato */}
      <button 
        onClick={handleFindStore}
        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        Trova supermercato
      </button>
    </motion.div>
  );
};
