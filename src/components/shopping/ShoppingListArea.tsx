
import { Product } from "@/types/shopping";
import { EmptyState } from "./EmptyState";
import { ProductList } from "./ProductList";

interface ShoppingListAreaProps {
  products: Product[];
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
  onAddSampleProducts: () => void;
}

export const ShoppingListArea = ({
  products,
  onUpdateQuantity,
  onRemoveProduct,
  onAddSampleProducts
}: ShoppingListAreaProps) => {
  return (
    <div 
      className="mt-4 w-full flex-grow hide-scrollbar smooth-scroll touch-scroll"
      style={{ 
        minHeight: products.length ? "0" : "220px",
        contain: 'paint layout',
      }}
      role="region"
      aria-label="Area lista della spesa"
    >
      {products.length === 0 ? (
        <EmptyState onAddSampleProducts={onAddSampleProducts} />
      ) : (
        <ProductList
          products={products}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveProduct={onRemoveProduct}
        />
      )}
    </div>
  );
};
