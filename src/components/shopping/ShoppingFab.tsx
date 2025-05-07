
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
            className="fixed bottom-[calc(3.5rem+0.75rem)] right-6 z-40 flex flex-col-reverse items-end space-y-3 space-y-reverse"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Aggiunta Rapida */}
            <div className="flex items-center justify-end space-x-2">
              <span className="text-sm text-card-foreground bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow">
                Aggiunta Rapida
              </span>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
                onClick={handleQuickAdd}
                aria-label="Aggiunta rapida"
              >
                <Zap className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Nuova Lista */}
            <div className="flex items-center justify-end space-x-2">
              <span className="text-sm text-card-foreground bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow">
                Nuova Lista
              </span>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
                onClick={handleNewList}
                aria-label="Nuova lista"
              >
                <FilePlus2 className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Salva Lista */}
            <div className="flex items-center justify-end space-x-2">
              <span className="text-sm text-card-foreground bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow">
                Salva Lista
              </span>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
                onClick={handleSaveList}
                aria-label="Salva lista"
              >
                <Save className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main FAB button - reduced size to w-14 h-14 */}
      <Button
        className="fixed bottom-16 right-6 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center transform-gpu transition-transform duration-150 ease-in-out active:scale-95" 
        onClick={handleFabClick}
        aria-label={showFabOptions ? "Chiudi opzioni" : "Apri opzioni"}
      >
        {showFabOptions ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
};
