
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
    <div className="min-h-screen relative overflow-hidden pb-20 bg-white dark:bg-gray-900">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
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
