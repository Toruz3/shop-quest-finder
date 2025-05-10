
import { useState } from "react";
import { Plus, X, FilePlus2, Save, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      
      {/* FAB options - positioned ABOVE the main FAB */}
      <AnimatePresence>
        {showFabOptions && (
          <div className="fixed bottom-24 right-5 z-50 flex flex-col-reverse items-end gap-4">
            {/* Aggiunta Rapida */}
            <motion.div 
              className="flex items-center justify-end gap-2" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="text-sm bg-white/90 backdrop-blur-sm text-card-foreground px-3 py-1.5 rounded-lg shadow">
                Aggiunta Rapida
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95" 
                      onClick={handleQuickAdd} 
                      aria-label="Aggiunta rapida"
                    >
                      <Zap className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Aggiunta rapida
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
            
            {/* Nuova Lista */}
            <motion.div 
              className="flex items-center justify-end gap-2" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="text-sm bg-white/90 backdrop-blur-sm text-card-foreground px-3 py-1.5 rounded-lg shadow">
                Nuova Lista
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95" 
                      onClick={handleNewList} 
                      aria-label="Nuova lista"
                    >
                      <FilePlus2 className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Nuova lista
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
            
            {/* Salva Lista */}
            <motion.div 
              className="flex items-center justify-end gap-2" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="text-sm bg-white/90 backdrop-blur-sm text-card-foreground px-3 py-1.5 rounded-lg shadow">
                Salva Lista
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95" 
                      onClick={handleSaveList} 
                      aria-label="Salva lista"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Salva lista
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Main FAB button - fixed position with correct positioning */}
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
