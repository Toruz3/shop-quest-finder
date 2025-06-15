import { motion } from "framer-motion";
import { Product } from "@/types/shopping";
import { useToast } from "@/hooks/use-toast";
import { ProductInfo } from "./ProductInfo";
import { ProductQuantityControls } from "./ProductQuantityControls";
import { ProductPriceComparison } from "./ProductPriceComparison";
import { useRef } from "react";

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
  const { toast } = useToast();
  const activeToasts = useRef<Set<string>>(new Set());

  const showToast = (key: string, toastConfig: any) => {
    // Se un toast con questa chiave è già attivo, non mostrarne un altro
    if (activeToasts.current.has(key)) {
      return;
    }
    
    // Aggiungi la chiave ai toast attivi
    activeToasts.current.add(key);
    
    // Mostra il toast con durata ridotta
    toast({
      ...toastConfig,
      duration: 1500, // Durata ridotta a 1.5 secondi
    });
    
    // Rimuovi la chiave quando il toast si chiude
    setTimeout(() => {
      activeToasts.current.delete(key);
    }, 1500);
  };

  const handleQuantityChange = (increment: boolean) => {
    if (!increment && product.quantity === 1) {
      onRemoveProduct(product.id);
      return;
    }
    onUpdateQuantity(product.id, increment);
    if (increment) {
      showToast('product-quantity-increased', {
        title: "Prodotto aggiunto alla lista",
        description: `${product.name} è stato aggiunto con successo`
      });
    }
  };

  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} transition={{
    duration: 0.3
  }} className="w-full">
      {/* Card principale del prodotto */}
      <div className="bg-white rounded-t-xl p-4 shadow-sm border-2 border-green-100 hover:shadow-lg hover:bg-gray-50/30 transition-all duration-300 border-b-0">
        <div className="flex items-start gap-4">
          
          {/* Immagine Prodotto - senza sfondo grigio */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl p-2 flex items-center justify-center overflow-hidden">
              {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" loading="lazy" onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} /> : null}
              <div className={`w-full h-full flex items-center justify-center ${product.imageUrl ? 'hidden' : ''}`}>
                <div className="w-6 h-6 bg-gradient-to-br from-green-300 to-blue-300 rounded-md"></div>
              </div>
            </div>
          </div>
          
          {/* Contenuto principale */}
          <div className="flex-1 min-w-0">
            {/* Nome del prodotto */}
            <h3 className="font-semibold text-base text-gray-900 mb-2 leading-tight text-left">
              {product.name}
            </h3>
            
            {/* Riga con supermercato/prezzo e counter */}
            <div className="flex items-center justify-between">
              {/* Supermercato e prezzo */}
              <div className="flex flex-col gap-1">
                {product.supermarket && <span className="text-sm text-gray-600 font-medium text-left">
                    {product.supermarket}
                  </span>}
                {product.price && <span className="font-bold text-base text-gray-900 text-left">
                    €{product.price.toFixed(2)}
                  </span>}
              </div>
              
              {/* Counter a destra */}
              <div className="flex-shrink-0">
                <ProductQuantityControls quantity={product.quantity} onQuantityChange={handleQuantityChange} />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Sezione Confronta Prezzi - attaccata alla card principale */}
      <div className="w-full">
        <ProductPriceComparison product={product} />
      </div>
    </motion.div>;
};
