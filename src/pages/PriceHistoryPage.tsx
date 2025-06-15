
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { LineChart } from "lucide-react";
import { useProductSearch } from "@/hooks/useProductSearch";
import { SearchHeader } from "@/components/price-history/SearchHeader";
import { ProductsFilter } from "@/components/price-history/ProductsFilter";
import { PriceChart } from "@/components/price-history/PriceChart";
import { ProductsList } from "@/components/price-history/ProductsList";

// Expanded sample products from the database
const products = [{
  id: 1,
  name: "Latte",
  price: 2.25,
  trend: "down",
  discount: "10%"
}, {
  id: 2,
  name: "Pane",
  price: 1.50,
  trend: "stable",
  discount: null
}, {
  id: 3,
  name: "Pasta",
  price: 0.89,
  trend: "down",
  discount: "20%"
}, {
  id: 4,
  name: "Uova",
  price: 2.99,
  trend: "up",
  discount: null
}, {
  id: 5,
  name: "Pomodori",
  price: 1.85,
  trend: "down",
  discount: "15%"
}, {
  id: 6,
  name: "Olio extravergine",
  price: 4.50,
  trend: "stable",
  discount: null
}, {
  id: 7,
  name: "Mozzarella",
  price: 3.20,
  trend: "up",
  discount: null
}, {
  id: 8,
  name: "Salmone",
  price: 12.90,
  trend: "down",
  discount: "25%"
}, {
  id: 9,
  name: "Banane",
  price: 1.80,
  trend: "stable",
  discount: null
}, {
  id: 10,
  name: "Yogurt",
  price: 2.40,
  trend: "down",
  discount: "5%"
}, {
  id: 11,
  name: "Pollo",
  price: 6.50,
  trend: "up",
  discount: null
}, {
  id: 12,
  name: "Riso",
  price: 1.20,
  trend: "stable",
  discount: null
}, {
  id: 13,
  name: "Broccoli",
  price: 2.10,
  trend: "down",
  discount: "12%"
}, {
  id: 14,
  name: "Formaggio",
  price: 4.80,
  trend: "up",
  discount: null
}, {
  id: 15,
  name: "Caffè",
  price: 3.60,
  trend: "stable",
  discount: null
}, {
  id: 16,
  name: "Arance",
  price: 2.30,
  trend: "down",
  discount: "8%"
}, {
  id: 17,
  name: "Spaghetti",
  price: 1.10,
  trend: "stable",
  discount: null
}, {
  id: 18,
  name: "Carne di manzo",
  price: 15.80,
  trend: "up",
  discount: null
}, {
  id: 19,
  name: "Limoni",
  price: 2.90,
  trend: "down",
  discount: "18%"
}, {
  id: 20,
  name: "Acqua",
  price: 0.50,
  trend: "stable",
  discount: null
}];

const PriceHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tracked");
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  
  // Add product search functionality
  const { suggestions, isLoading } = useProductSearch(searchTerm);
  
  // Update filtering logic to use "starts with" approach
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  
  const selectedProductData = products.find(p => p.id === selectedProduct);
  
  const handleSelectSuggestion = (productName: string) => {
    const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (product) {
      setSelectedProduct(product.id);
      setSearchTerm("");
    }
  };

  const handleProductClick = (productId: number) => {
    setSelectedProduct(productId);
    console.log('Selected product:', productId);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden pb-20 bg-white dark:bg-gray-900">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <LineChart className="text-primary" />
            <span>Storico Prezzi</span>
          </h1>
          
          <SearchHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            suggestions={suggestions || []}
            onSelectSuggestion={handleSelectSuggestion}
          />
          
          <ProductsFilter
            selectedTab={selectedTab}
            selectedPeriod={selectedPeriod}
            onTabChange={setSelectedTab}
            onPeriodChange={setSelectedPeriod}
          />
          
          {/* Price chart - Only show when a product is selected */}
          <PriceChart selectedProduct={selectedProductData} />
          
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
