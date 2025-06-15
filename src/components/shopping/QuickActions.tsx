
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Undo, 
  Redo, 
  Trash2, 
  CheckSquare, 
  Square, 
  ShoppingCart,
  Plus,
  Minus
} from "lucide-react";
import { Product } from "@/types/shopping";

interface QuickActionsProps {
  selectedProducts: number[];
  products: Product[];
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkDelete: () => void;
  onBulkQuantityChange: (increment: boolean) => void;
  isVisible: boolean;
}

export const QuickActions = ({
  selectedProducts,
  products,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSelectAll,
  onDeselectAll,
  onBulkDelete,
  onBulkQuantityChange,
  isVisible
}: QuickActionsProps) => {
  const hasSelection = selectedProducts.length > 0;
  const allSelected = selectedProducts.length === products.length && products.length > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 left-4 right-4 z-40 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-100 dark:border-gray-700 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Selection Info */}
              {hasSelection && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {selectedProducts.length} selezionati
                  </Badge>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-1 flex-wrap">
                {/* Undo/Redo */}
                <div className="flex items-center gap-1 mr-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="h-8 px-2"
                    title="Annulla (Ctrl+Z)"
                  >
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="h-8 px-2"
                    title="Ripeti (Ctrl+Y)"
                  >
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selection Actions */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={allSelected ? onDeselectAll : onSelectAll}
                  className="h-8 px-2"
                  title={allSelected ? "Deseleziona tutto" : "Seleziona tutto"}
                >
                  {allSelected ? <Square className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
                </Button>

                {/* Bulk Actions - Only show when items are selected */}
                <AnimatePresence>
                  {hasSelection && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-200 dark:border-gray-600"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onBulkQuantityChange(false)}
                        className="h-8 px-2"
                        title="Diminuisci quantità"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onBulkQuantityChange(true)}
                        className="h-8 px-2"
                        title="Aumenta quantità"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={onBulkDelete}
                        className="h-8 px-2"
                        title="Elimina selezionati"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
