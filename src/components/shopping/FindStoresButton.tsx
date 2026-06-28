import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FindStoresButtonProps {
  isCalculating: boolean;
  onClick: () => void;
}

export const FindStoresButton = ({ isCalculating, onClick }: FindStoresButtonProps) => {
  return (
    <Button
      className="w-full mt-6 h-12 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      onClick={onClick}
      disabled={isCalculating}
    >
      {isCalculating ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Ricerca in corso…
        </span>
      ) : (
        <span className="flex items-center gap-2">
          Trova il miglior supermercato
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
    </Button>
  );
};
