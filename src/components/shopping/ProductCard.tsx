import { motion } from "framer-motion";
import { Product } from "@/types/shopping";
import { useToast } from "@/hooks/use-toast";
import { ProductQuantityControls } from "./ProductQuantityControls";
import { ProductPriceComparison } from "./ProductPriceComparison";
import { useRef } from "react";

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
  const { toast } = useToast();
  const activeToasts = useRef<Set<string>>(new Set());

  const showToast = (key: string, cfg: any) => {
    if (activeToasts.current.has(key)) return;
    activeToasts.current.add(key);
    toast({ ...cfg, duration: 1500 });
    setTimeout(() => activeToasts.current.delete(key), 1500);
  };

  const handleQuantityChange = (increment: boolean) => {
    if (!increment && product.quantity === 1) {
      onRemoveProduct(product.id);
      return;
    }
    onUpdateQuantity(product.id, increment);
    if (increment) {
      showToast("product-quantity-increased", {
        title: "Prodotto aggiunto",
        description: product.name,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="w-full paper-card overflow-hidden"
    >
      <div className="p-4 flex items-center gap-4">
        {/* Image / placeholder */}
        <div className="flex-shrink-0 w-14 h-14 rounded-md bg-muted flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="font-serif text-xl text-muted-foreground">
              {product.name?.[0]?.toUpperCase() ?? "·"}
            </span>
          )}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-foreground truncate">
            {product.name}
          </h3>
          <div className="mt-0.5 flex items-baseline gap-2 text-xs text-muted-foreground">
            {product.supermarket && <span>{product.supermarket}</span>}
            {product.supermarket && product.price && <span>·</span>}
            {product.price && (
              <span className="font-serif text-base text-foreground num-tabular">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <ProductQuantityControls
          quantity={product.quantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      <ProductPriceComparison product={product} />
    </motion.div>
  );
};
