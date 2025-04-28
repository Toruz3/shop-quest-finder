import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingHeader } from "@/components/shopping/ShoppingHeader";
import { SearchSection } from "@/components/shopping/SearchSection";
import { EmptyState } from "@/components/shopping/EmptyState";

const ShoppingPage = () => {
  const navigate = useNavigate();

  const handleFabClick = () => {
    // Handle FAB click (e.g., navigate to add product page)
  };

  const handleAddSampleProducts = () => {
    // Handle adding sample products to the list
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-y-auto px-4 pb-20 pt-4">
        <div className="flex flex-col h-full max-w-md mx-auto w-full">
          <ShoppingHeader />
          
          <div className="mt-4 mb-6">
            <SearchSection
              searchTerm=""
              onSearchChange={() => {}}
              onAddProduct={() => {}}
              onSelectCategory={() => {}}
              showSuggestions={false}
              suggestions={[]}
              onSelectSuggestion={() => {}}
            />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <EmptyState onAddSampleProducts={handleAddSampleProducts} />
          </div>
        </div>
      </main>

      <Button
        size="icon"
        className="fixed right-4 bottom-20 h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white"
        onClick={handleFabClick}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ShoppingPage;
