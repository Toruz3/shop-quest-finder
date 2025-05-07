
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FabMenu } from "@/components/ui/fab-menu";
import { useState } from "react";

interface ShoppingFabProps {
  onClick: () => void;
}

export const ShoppingFab = ({ onClick }: ShoppingFabProps) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  
  const handleFabClick = () => {
    if (!showFabOptions) {
      onClick(); // Original action (search input focus) only when closing
    }
    setShowFabOptions(prev => !prev);
  };

  const actions = [
    {
      icon: <Plus className="w-5 h-5 rotate-45" />,
      label: "Aggiungi velocemente",
      onClick: () => {
        console.log("Quick add action clicked");
        // Implement quick add functionality here
      }
    },
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Nuova lista",
      onClick: () => {
        console.log("New list action clicked");
        // Implement new list functionality here
      }
    }
  ];

  return (
    <>
      {showFabOptions ? (
        <FabMenu actions={actions} />
      ) : (
        <Button
          size="icon"
          className="!fixed !bottom-20 !right-6 !z-50 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center"
          onClick={handleFabClick}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};
