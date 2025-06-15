
import { useState } from "react";
import { products, Product } from "@/data/priceHistoryProducts";

export const usePriceHistoryState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tracked");
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  
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
      console.log('Selected product from suggestion:', product.id, product.name);
    }
  };

  const handleProductClick = (productId: number) => {
    console.log('handleProductClick called with:', productId);
    console.log('Current selectedProduct:', selectedProduct);
    setSelectedProduct(productId);
    console.log('Selected product updated to:', productId);
  };
  
  console.log('Rendering PriceHistoryPage - selectedProduct:', selectedProduct);
  console.log('selectedProductData:', selectedProductData);

  return {
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
  };
};
