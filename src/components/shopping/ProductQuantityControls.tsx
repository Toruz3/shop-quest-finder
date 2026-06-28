import { Plus, Minus } from "lucide-react";

interface ProductQuantityControlsProps {
  quantity: number;
  onQuantityChange: (increment: boolean) => void;
}

export const ProductQuantityControls = ({
  quantity,
  onQuantityChange,
}: ProductQuantityControlsProps) => {
  return (
    <div className="inline-flex items-center border border-border rounded-md bg-background">
      <button
        onClick={() => onQuantityChange(false)}
        className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors rounded-l-md"
        aria-label="Diminuisci quantità"
      >
        <Minus size={14} strokeWidth={1.75} />
      </button>
      <span className="font-serif text-base min-w-[24px] text-center num-tabular text-foreground">
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(true)}
        className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors rounded-r-md"
        aria-label="Aumenta quantità"
      >
        <Plus size={14} strokeWidth={1.75} />
      </button>
    </div>
  );
};
