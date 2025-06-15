
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface EmptyStateProps {
  onAddSampleProducts: () => void;
}

export const EmptyState = ({ onAddSampleProducts }: EmptyStateProps) => {
  const [activeToasts, setActiveToasts] = useState<Set<string>>(new Set());

  const showToast = (toastKey: string, toastConfig: any) => {
    if (activeToasts.has(toastKey)) return;
    
    setActiveToasts(prev => new Set(prev).add(toastKey));
    
    const { dismiss } = toast(toastConfig);
    
    setTimeout(() => {
      setActiveToasts(prev => {
        const newSet = new Set(prev);
        newSet.delete(toastKey);
        return newSet;
      });
    }, 1500);
    
    return dismiss;
  };

  const handleAddSampleProducts = () => {
    onAddSampleProducts();
    showToast("sample-products-added", {
      title: "Prodotti aggiunti",
      description: "Prodotti di esempio aggiunti alla lista"
    });
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <motion.div 
        className="relative mb-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-7 h-7 text-primary" />
        </div>
        <div className="absolute top-0 right-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center">
          <span className="text-accent text-xs font-bold">0</span>
        </div>
      </motion.div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          La tua lista è vuota
        </h3>
        <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
          Aggiungi prodotti utilizzando la barra di ricerca o prova alcuni suggerimenti
        </p>
      </div>
      
      <Button 
        variant="outline"
        onClick={handleAddSampleProducts}
        className="bg-card border-primary/20 text-primary hover:bg-primary/5 group"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-all" />
        <span className="group-hover:translate-x-0.5 transition-all">
          Aggiungi prodotti di esempio
        </span>
      </Button>
    </div>
  );
};
