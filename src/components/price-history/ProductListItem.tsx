
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Product } from "@/data/priceHistoryProducts";

interface ProductListItemProps {
  product: Product;
  isSelected: boolean;
  onProductClick: (productId: number) => void;
}

export const ProductListItem = ({ product, isSelected, onProductClick }: ProductListItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('ProductListItem clicked:', product.id, product.name, product);
    onProductClick(product.id);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked for product:', product.id, product.name, product);
    onProductClick(product.id);
  };

  // Validate product data
  if (!product || typeof product.id !== 'number' || !product.name) {
    console.warn('Invalid product data:', product);
    return null;
  }

  return (
    <Card 
      className={`p-3 bg-white dark:bg-gray-800 border ${isSelected ? "border-primary-300 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-primary-200"} transition-all shadow-sm hover:shadow-md cursor-pointer`} 
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-left">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">€{(product.price || 0).toFixed(2)}</span>
            {product.discount && <Badge className="text-xs bg-accent text-white">-{product.discount}</Badge>}
            <Badge variant="outline" className={`text-xs ${product.trend === "down" ? "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" : product.trend === "up" ? "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" : "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"}`}>
              {product.trend === "down" && <TrendingDown size={10} className="mr-1" />}
              {product.trend === "up" && <TrendingUp size={10} className="mr-1" />}
              {product.trend === "down" ? "In calo" : product.trend === "up" ? "In aumento" : "Stabile"}
            </Badge>
          </div>
        </div>
        <Button 
          size="sm" 
          variant={isSelected ? "default" : "outline"} 
          className="h-8 text-xs"
          onClick={handleButtonClick}
        >
          {isSelected ? "Selezionato" : "Seleziona"}
        </Button>
      </div>
    </Card>
  );
};
