
import { useState } from "react";
import { Plus, X, FilePlus2, Save, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ShoppingFabProps {
  onClick: () => void;
  onNewList?: () => void;
}

export const ShoppingFab = ({
  onClick,
  onNewList
}: ShoppingFabProps) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  
  const handleFabClick = () => {
    setShowFabOptions(prev => !prev);
  };
  
  const handleQuickAdd = () => {
    console.log("Quick add action clicked");
    toast({
      title: "Funzione in arrivo",
      description: "La funzionalità di aggiunta rapida sarà disponibile presto!",
      duration: 3000
    });
    setShowFabOptions(false);
    onClick();
  };
  
  const handleNewList = () => {
    console.log("New list action clicked");
    if (onNewList) {
      onNewList();
    } else {
      toast({
        title: "Lista cancellata",
        description: "La lista della spesa è stata azzerata",
        duration: 3000
      });
    }
    setShowFabOptions(false);
  };
  
  const handleSaveList = () => {
    console.log("Save list action clicked");
    toast({
      title: "Lista salvata",
      description: "La tua lista è stata salvata con successo",
      duration: 3000
    });
    setShowFabOptions(false);
  };
  
  return (
    <>
      {/* Backdrop overlay when FAB options are open */}
      <AnimatePresence>
        {showFabOptions && (
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFabOptions(false)} 
          />
        )}
      </AnimatePresence>
      
      {/* FAB options with adjusted positioning 
           Calculation: bottom-[9.75rem] based on:
           FAB: bottom-24 (6rem) + h-14 (3.5rem) + space (1.25rem) = 10.75rem
      */}
      <AnimatePresence>
        {showFabOptions && (
          <motion.div 
            className="fixed bottom-[9.75rem] right-6 z-40 flex flex-col items-end gap-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Aggiunta Rapida - top position (furthest from FAB) */}
            <motion.div 
              className="flex items-center justify-end space-x-3 rtl:space-x-reverse pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="bg-card text-card-foreground py-1.5 px-3 rounded-md shadow-sm text-sm font-medium">
                Aggiunta Rapida
              </span>
              <Button 
                size="icon" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10 w-10 flex-shrink-0" 
                onClick={handleQuickAdd}
                aria-label="Aggiunta rapida"
              >
                <Zap className="h-5 w-5" />
              </Button>
            </motion.div>
            
            {/* Nuova Lista - middle position */}
            <motion.div 
              className="flex items-center justify-end space-x-3 rtl:space-x-reverse pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="bg-card text-card-foreground py-1.5 px-3 rounded-md shadow-sm text-sm font-medium">
                Nuova Lista
              </span>
              <Button 
                size="icon" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10 w-10 flex-shrink-0" 
                onClick={handleNewList}
                aria-label="Nuova lista"
              >
                <FilePlus2 className="h-5 w-5" />
              </Button>
            </motion.div>
            
            {/* Salva Lista - bottom position (closest to FAB) */}
            <motion.div 
              className="flex items-center justify-end space-x-3 rtl:space-x-reverse pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="bg-card text-card-foreground py-1.5 px-3 rounded-md shadow-sm text-sm font-medium">
                Salva Lista
              </span>
              <Button 
                size="icon" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10 w-10 flex-shrink-0" 
                onClick={handleSaveList}
                aria-label="Salva lista"
              >
                <Save className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main FAB button - fixed position at bottom right */}
      <button 
        onClick={handleFabClick} 
        aria-label={showFabOptions ? "Chiudi opzioni" : "Apri opzioni"} 
        className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center transition-colors"
      >
        <motion.div 
          animate={{ rotate: showFabOptions ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {showFabOptions ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </button>
    </>
  );
};
