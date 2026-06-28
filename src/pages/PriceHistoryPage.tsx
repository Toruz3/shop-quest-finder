
import { Footer } from "@/components/Footer";
import { useProductSearch } from "@/hooks/useProductSearch";
import { usePriceHistoryState } from "@/hooks/usePriceHistoryState";
import { PriceHistoryHeader } from "@/components/price-history/PriceHistoryHeader";
import { SearchHeader } from "@/components/price-history/SearchHeader";
import { ProductsFilter } from "@/components/price-history/ProductsFilter";
import { PriceChart } from "@/components/price-history/PriceChart";
import { ProductsList } from "@/components/price-history/ProductsList";

const PriceHistoryPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedTab,
    setSelectedTab,
    selectedPeriod,
    setSelectedPeriod,
    selectedProduct,
    selectedProductData,
    filteredProducts,
    handleSelectSuggestion,
    handleProductClick
  } = usePriceHistoryState();
  
  // Add product search functionality
  const { suggestions, isLoading } = useProductSearch(searchTerm);
  
  return (
    <div className="min-h-screen relative overflow-hidden pb-16">
      {/* Decorative elements */}      
      <div className="container px-4 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <PriceHistoryHeader />
          
          <SearchHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            suggestions={suggestions || []}
            onSelectSuggestion={handleSelectSuggestion}
          />
          
          <ProductsFilter
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          
          {/* Price chart - Only show when a product is selected */}
          <PriceChart 
            selectedProduct={selectedProductData} 
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
          
          {/* Products list */}
          <ProductsList
            products={filteredProducts}
            selectedProduct={selectedProduct}
            selectedTab={selectedTab}
            onProductClick={handleProductClick}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PriceHistoryPage;
