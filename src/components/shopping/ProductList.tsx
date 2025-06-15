
import { AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/shopping";

interface ProductListProps {
  products: Product[];
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
  selectedProducts: number[];
  onSelectionChange: (id: number, selected: boolean) => void;
  selectionMode: boolean;
}

export const ProductList = ({
  products,
  onUpdateQuantity,
  onRemoveProduct,
  selectedProducts,
  onSelectionChange,
  selectionMode,
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
            isSelected={selectedProducts.includes(product.id)}
            onSelectionChange={onSelectionChange}
            selectionMode={selectionMode}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
