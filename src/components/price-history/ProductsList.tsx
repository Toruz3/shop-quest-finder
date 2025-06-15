
import { ProductListItem } from "./ProductListItem";

interface Product {
  id: number;
  name: string;
  price: number;
  trend: "down" | "up" | "stable";
  discount: string | null;
}

interface ProductsListProps {
  products: Product[];
  selectedProduct: number | null;
  selectedTab: string;
  onProductClick: (productId: number) => void;
}

export const ProductsList = ({ products, selectedProduct, selectedTab, onProductClick }: ProductsListProps) => {
  const filteredProducts = products.filter(product => 
    (selectedTab === "offers" ? product.discount !== null : true) && 
    (selectedTab === "trends" ? product.trend !== "stable" : true)
  );

  return (
    <div className="space-y-2">
      {filteredProducts.map(product => (
        <ProductListItem
          key={product.id}
          product={product}
          isSelected={selectedProduct === product.id}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};
