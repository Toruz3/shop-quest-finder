import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
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
  onRemoveProduct
}: ProductCardProps) => {
  console.log('Rendering ProductCard:', product.id, 'originalIsPromotional:', product.originalIsPromotional);
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -10
  }} transition={{
    duration: 0.2
  }} className="p-4 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center gap-3">
      {/* Image column */}
      <div className="flex-shrink-0">
        {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" /> : <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-400">
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>}
      </div>

      {/* Product info column */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          
          {/* Badge for promotional items */}
          {product.originalIsPromotional && <Badge variant="default" className="bg-red-500 text-white text-xs">
              Offerta
            </Badge>}
        </div>

        {/* Price would go here */}
        <p className="text-sm text-gray-500 text-left">
          {/* We'll add price if available */}
          {product.price ? `€${product.price.toFixed(2)}` : ''} 
          {/* Optional supermarket */}
          {product.supermarket ? ` • ${product.supermarket}` : ''}
        </p>
      </div>

      {/* Quantity controls column */}
      <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onUpdateQuantity(product.id, false)} aria-label="Diminuisci quantità">
            <Minus className="h-3 w-3" />
          </Button>

          <span className="w-5 text-center text-sm font-medium">
            {product.quantity}
          </span>

          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onUpdateQuantity(product.id, true)} aria-label="Aumenta quantità">
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-full" onClick={() => onRemoveProduct(product.id)} aria-label="Rimuovi prodotto">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>;
};