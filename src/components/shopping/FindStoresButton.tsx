
import { Button } from "@/components/ui/button";

interface FindStoresButtonProps {
  isCalculating: boolean;
  onClick: () => void;
}

export const FindStoresButton = ({ isCalculating, onClick }: FindStoresButtonProps) => {
  return (
    <Button
      className="w-full mt-6 py-6 h-14 btn-primary rounded-lg shadow-lg ripple"
      onClick={onClick}
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
        </span>
      )}
    </Button>
  );
};
