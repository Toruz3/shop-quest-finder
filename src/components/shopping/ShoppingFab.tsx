
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FabMenu } from "@/components/ui/fab-menu";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ShoppingFabProps {
  onClick: () => void;
  onNewList?: () => void;
}

export const ShoppingFab = ({ onClick, onNewList }: ShoppingFabProps) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  
  const handleFabClick = () => {
    if (!showFabOptions) {
      onClick(); // Original action (search input focus) only when not showing options
    }
    setShowFabOptions(prev => !prev);
  };

  const handleQuickAdd = () => {
    console.log("Quick add action clicked");
    toast({
      title: "Funzione in arrivo",
      description: "La funzionalità di aggiunta rapida sarà disponibile presto!",
      duration: 3000,
    });
  };

  const handleNewList = () => {
    console.log("New list action clicked");
    if (onNewList) {
      onNewList();
    } else {
      toast({
        title: "Lista cancellata",
        description: "La lista della spesa è stata azzerata",
        duration: 3000,
      });
    }
  };

  const handleSaveList = () => {
    console.log("Save list action clicked");
    toast({
      title: "Lista salvata",
      description: "La tua lista è stata salvata con successo",
      duration: 3000,
    });
  };

  const actions = [
    {
      icon: <Plus className="w-5 h-5 rotate-45" />,
      label: "Aggiunta rapida",
      onClick: handleQuickAdd
    },
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Nuova lista",
      onClick: handleNewList
    },
    {
      icon: <Save className="w-5 h-5" />,
      label: "Salva lista",
      onClick: handleSaveList
    }
  ];

  return (
    <>
      {showFabOptions ? (
        <FabMenu actions={actions} />
      ) : (
        <Button
          size="icon"
          className="!fixed !bottom-20 !right-6 !z-50 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center transform-gpu"
          onClick={handleFabClick}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};
