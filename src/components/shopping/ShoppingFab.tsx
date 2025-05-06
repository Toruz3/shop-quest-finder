
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShoppingFabProps {
  onClick: () => void;
}

export const ShoppingFab = ({ onClick }: ShoppingFabProps) => {
  return (
    <Button
      size="icon"
      className="!fixed !bottom-20 !right-6 !z-50 h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
