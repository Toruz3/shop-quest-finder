
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ShoppingActionButtonProps {
  onFindStores: () => void;
  isCalculating: boolean;
  showButton: boolean;
}

export const ShoppingActionButton = ({
  onFindStores,
  isCalculating,
  showButton
}: ShoppingActionButtonProps) => {
  if (!showButton) return null;
  
  return (
    <Button 
      className="w-full mt-6 py-6 h-14 btn-primary rounded-lg shadow-lg ripple"
      onClick={onFindStores}
      disabled={isCalculating}
    >
      {isCalculating ? (
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Ricerca in corso...
        </span>
      ) : (
        <span className="flex items-center gap-2 font-semibold text-base">
          <span>Trova supermercato</span>
          <ShoppingCart className="w-5 h-5" />
        </span>
      )}
    </Button>
  );
};
