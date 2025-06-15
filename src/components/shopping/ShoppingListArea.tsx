
import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { ProductList } from "./ProductList";
import { QuickActions } from "./QuickActions";
import { Product } from "@/types/shopping";
import { CheckSquare, Square } from "lucide-react";

interface ShoppingListAreaProps {
  products: Product[];
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemoveProduct: (id: number) => void;
  onAddSampleProducts: () => void;
  // New props for enhanced functionality
  selectedProducts: number[];
  selectionMode: boolean;
  setSelectionMode: (mode: boolean) => void;
  onSelectionChange: (id: number, selected: boolean) => void;
  handleSelectAll: () => void;
  handleDeselectAll: () => void;
  handleBulkDelete: () => void;
  handleBulkQuantityChange: (increment: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const ShoppingListArea = ({
  products,
  onUpdateQuantity,
  onRemoveProduct,
  onAddSampleProducts,
  selectedProducts,
  selectionMode,
  setSelectionMode,
  onSelectionChange,
  handleSelectAll,
  handleDeselectAll,
  handleBulkDelete,
  handleBulkQuantityChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: ShoppingListAreaProps) => {
  const isEmpty = products.length === 0;
  const hasSelection = selectedProducts.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {!isEmpty && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Lista della spesa ({products.length})
            </h2>
            {products.length > 1 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectionMode(!selectionMode)}
                className="h-8 px-3"
              >
                {selectionMode ? (
                  <>
                    <Square className="w-4 h-4 mr-1" />
                    Annulla
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-4 h-4 mr-1" />
                    Seleziona
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <QuickActions
        selectedProducts={selectedProducts}
        products={products}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={onUndo}
        onRedo={onRedo}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onBulkDelete={handleBulkDelete}
        onBulkQuantityChange={handleBulkQuantityChange}
        isVisible={!isEmpty}
      />

      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <EmptyState onAddSampleProducts={onAddSampleProducts} />
        ) : (
          <ProductList
            products={products}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveProduct={onRemoveProduct}
            selectedProducts={selectedProducts}
            onSelectionChange={onSelectionChange}
            selectionMode={selectionMode}
          />
        )}
      </div>
    </div>
  );
};
