
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus, Plus, Trash2, CheckCircle } from "lucide-react";
import { Product } from "@/types/shopping";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
  isSelected?: boolean;
  onSelectionChange?: (id: number, selected: boolean) => void;
  selectionMode?: boolean;
}

export const ProductCard = ({
  product,
  onUpdateQuantity,
  onRemoveProduct,
  isSelected = false,
  onSelectionChange,
  selectionMode = false
}: ProductCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveProduct(product.id);
    }, 150);
  };

  const handleSelectionChange = (checked: boolean) => {
    onSelectionChange?.(product.id, checked);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        scale: isRemoving ? 0.95 : 1,
        y: isRemoving ? -20 : 0
      }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ 
        duration: 0.2,
        layout: { duration: 0.3 }
      }}
      className="group"
    >
      <Card 
        className={`p-4 transition-all duration-200 touch-feedback ${
          isSelected 
            ? 'border-primary/50 bg-primary/5 shadow-md' 
            : 'border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md'
        }`}
        hover
        interactive
      >
        <div className="flex items-center gap-4">
          {/* Selection Checkbox */}
          {selectionMode && (
            <div className="flex-shrink-0">
              <Checkbox
                checked={isSelected}
                onCheckedChange={handleSelectionChange}
                className="w-5 h-5"
              />
            </div>
          )}

          {/* Product Image */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <div className="text-xs font-medium">IMG</div>
                </div>
              )}
            </div>
            {product.originalIsPromotional && (
              <Badge 
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 h-5 scale-75"
                variant="destructive"
              >
                PROMO
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate text-base">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {product.price && (
                    <span className="text-sm font-medium text-primary">
                      €{product.price.toFixed(2)}
                    </span>
                  )}
                  {product.supermarket && (
                    <Badge variant="outline" className="text-xs">
                      {product.supermarket}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateQuantity(product.id, false)}
              className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              aria-label="Diminuisci quantità"
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
              {product.quantity}
            </span>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateQuantity(product.id, true)}
              className="h-8 w-8 p-0 rounded-full hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all duration-200"
              aria-label="Aumenta quantità"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRemove}
            className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Rimuovi prodotto"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 text-primary"
          >
            <CheckCircle className="w-5 h-5" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
