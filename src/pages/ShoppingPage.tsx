
import { ShoppingHeader } from "@/components/shopping/ShoppingHeader";
import { SearchSection } from "@/components/shopping/SearchSection";
import { ShoppingListArea } from "@/components/shopping/ShoppingListArea";
import { ShoppingFab } from "@/components/shopping/ShoppingFab";
import { FindStoresButton } from "@/components/shopping/FindStoresButton";
import { useShoppingState } from "@/hooks/useShoppingState";

const ShoppingPage = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    isCalculating,
    suggestions,
    isLoadingSuggestions,
    handleAddProduct,
    handleUpdateQuantity,
    handleRemoveProduct,
    handleAddSampleProducts,
    handleFindStores,
    handleNewList,
  } = useShoppingState();
  
  const handleFabClick = () => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      console.log("Focusing search input");
      searchInput.focus();
    } else {
      console.log("Could not find search input");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-4 overflow-y-auto pb-16 relative">
        <div className="flex flex-col max-w-md mx-auto w-full">
          <ShoppingHeader />
          
          <div className="mt-4 mb-6">
            <SearchSection
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddProduct={() => handleAddProduct(searchTerm)}
              onSelectCategory={() => {}}
              showSuggestions={searchTerm.length >= 2}
              suggestions={suggestions}
              onSelectSuggestion={(name) => {
                setSearchTerm(name);
                handleAddProduct(name);
              }}
            />
          </div>

          <div className="flex-1">
            <ShoppingListArea
              products={products}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveProduct={handleRemoveProduct}
              onAddSampleProducts={handleAddSampleProducts}
            />
          </div>
          
          {products.length > 0 && (
            <FindStoresButton 
              isCalculating={isCalculating}
              onClick={handleFindStores}
            />
          )}
        </div>
      </main>

      <ShoppingFab 
        onClick={handleFabClick} 
        onNewList={handleNewList}
      />
    </div>
  );
};

export default ShoppingPage;
