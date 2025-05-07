
import { Plus, Minus, Trash2, Heart, ChevronDown, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/shopping";

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
  onAddToFavorites?: (id: number) => void;
}

export const ProductCard = ({
  product,
  onUpdateQuantity,
  onRemoveProduct,
  onAddToFavorites,
}: ProductCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Simulated price data
  const priceData = {
    bestPrice: { store: "Conad", price: 2.99 },
    alternatives: [
      { store: "Esselunga", price: 3.49 },
      { store: "Carrefour", price: 3.29 },
    ],
    onSale: Math.random() > 0.7,
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onRemoveProduct(product.id);
    }, 300);
  };

  console.log('Rendering ProductCard:', product);
  console.log('Checking offer badge for item:', product.id, 'onSale:', priceData.onSale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden ${isDeleting ? "animate-fade-out" : ""}`}
    >
      <div className="card p-4 animate-fade-in hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3 flex-grow min-w-0">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-neutral-400 overflow-hidden flex-shrink-0">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBagIcon className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-1">
                <h3 className="font-medium text-neutral-800 text-base truncate">{product.name}</h3>
                {priceData.onSale && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-notification/10 text-notification-600 flex-shrink-0">
                    <Tag className="w-3 h-3 mr-1" />
                    Offerta
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-neutral-500 mt-0.5">
                <span className="font-medium text-primary-600">{priceData.bestPrice.price} €</span>
                <span className="mx-1">•</span>
                <span>{priceData.bestPrice.store}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(product.id, false)}
              className="h-8 w-8 rounded-lg border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 touch-target"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-6 text-center font-semibold text-neutral-700 text-base">{product.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(product.id, true)}
              className="h-8 w-8 rounded-lg border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 touch-target"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Expandable details section */}
        <div className="mt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full h-8 text-sm text-neutral-500 hover:text-neutral-700 p-0 flex items-center justify-center gap-1 hover:bg-neutral-50 rounded-lg"
          >
            <span>Confronta prezzi</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}
            />
          </Button>
          
          {showDetails && (
            <div className="mt-3 pt-3 border-t border-neutral-100 animate-fade-in">
              <div className="space-y-2">
                {priceData.alternatives.map((store) => (
                  <div key={store.store} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">{store.store}</span>
                    <span className="font-medium text-neutral-700">{store.price} €</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4 pt-3 border-t border-neutral-100">
                {onAddToFavorites && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddToFavorites(product.id)}
                    className="h-9 px-3 text-sm text-neutral-500 hover:text-accent-600 hover:bg-accent-50 rounded-lg"
                  >
                    <Heart className="w-4 h-4 mr-1.5" />
                    <span>Preferiti</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-9 px-3 text-sm text-neutral-500 hover:text-red-600 hover:bg-red-50 ml-auto rounded-lg"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  <span>Rimuovi</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Componente icona carrello
const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
