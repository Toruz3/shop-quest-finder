
import { AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/shopping";

interface ProductListProps {
  products: Product[];
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
}

export const ProductList = ({
  products,
  onUpdateQuantity,
  onRemoveProduct,
}: ProductListProps) => {
  return (
    <div 
      className="space-y-4 hide-scrollbar smooth-scroll touch-scroll focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
      style={{ 
        maxHeight: products.length ? `${Math.min(400, products.length * 110)}px` : "auto",
        willChange: 'transform',
        contain: 'paint layout',
      }}
      tabIndex={0}
      role="list"
      aria-label="Lista prodotti"
    >
      <AnimatePresence>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveProduct={onRemoveProduct}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
