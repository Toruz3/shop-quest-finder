
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
      className="space-y-4" 
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
