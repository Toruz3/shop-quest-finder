
import { Plus, X, FilePlus2, Save, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ShoppingFabProps {
  onClick: () => void;
  onNewList?: () => void;
}

export const ShoppingFab = ({ onClick, onNewList }: ShoppingFabProps) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  
  const handleFabClick = () => {
    setShowFabOptions(prev => !prev);
    
    // Only trigger the original action (search input focus) when not showing options
    if (!showFabOptions) {
      onClick();
    }
  };

  const handleQuickAdd = () => {
    console.log("Quick add action clicked");
    toast({
      title: "Funzione in arrivo",
      description: "La funzionalità di aggiunta rapida sarà disponibile presto!",
      duration: 3000,
    });
    setShowFabOptions(false);
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
    setShowFabOptions(false);
  };

  const handleSaveList = () => {
    console.log("Save list action clicked");
    toast({
      title: "Lista salvata",
      description: "La tua lista è stata salvata con successo",
      duration: 3000,
    });
    setShowFabOptions(false);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <AnimatePresence>
        {showFabOptions && (
          <motion.div 
            className="fixed bottom-[calc(5rem+1rem)] right-6 z-40 flex flex-col-reverse items-center space-y-3 space-y-reverse"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 mb-3"
              onClick={handleQuickAdd}
              aria-label="Aggiunta rapida"
            >
              <Zap className="w-6 h-6" />
            </Button>
            
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 mb-3"
              onClick={handleNewList}
              aria-label="Nuova lista"
            >
              <FilePlus2 className="w-6 h-6" />
            </Button>
            
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
              onClick={handleSaveList}
              aria-label="Salva lista"
            >
              <Save className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        size="icon"
        className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center transform-gpu transition-transform duration-150 ease-in-out active:scale-95"
        onClick={handleFabClick}
        aria-label="Apri opzioni aggiuntive"
      >
        {showFabOptions ? <X className="h-7 w-7" /> : <Plus className="h-7 w-7" />}
      </Button>
    </div>
  );
};
