
import { motion } from "framer-motion";
import { Minus, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/shopping";

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
}

export const ProductCard = ({
  product,
  onUpdateQuantity,
  onRemoveProduct,
}: ProductCardProps) => {
  console.log('Rendering ProductCard:', product.id, 'originalIsPromotional:', product.originalIsPromotional);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center gap-3"
    >
      {product.imageUrl ? (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-semibold text-gray-400">
            {product.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          
          {/* Use originalIsPromotional for badge visibility */}
          {product.originalIsPromotional && (
            <Badge variant="default" className="bg-red-500 text-white text-xs">
              Offerta
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => onUpdateQuantity(product.id, false)}
          aria-label="Diminuisci quantità"
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-5 text-center text-sm font-medium">
          {product.quantity}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => onUpdateQuantity(product.id, true)}
          aria-label="Aumenta quantità"
        >
          <Plus className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-full ml-2"
          onClick={() => onRemoveProduct(product.id)}
          aria-label="Rimuovi prodotto"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
