
import { useState, useEffect } from "react";
import { Product, ProductSuggestion } from "@/types/shopping";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useProductSearch } from "@/hooks/useProductSearch";

export const useShoppingState = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Use the product search hook to get suggestions
  const { suggestions, isLoading } = useProductSearch(searchTerm);

  const handleUpdateQuantity = (id: number, increment: boolean) => {
    console.log('Updating quantity for product ID:', id, 'increment:', increment);
    
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === id) {
          if (!increment && product.quantity === 1) {
            // Mark for removal if decrementing and quantity is 1
            console.log('Product will be removed as quantity would become 0');
            return null;
          }
          
          const newQuantity = increment ? product.quantity + 1 : product.quantity - 1;
          console.log('New quantity will be:', newQuantity);
          
          // Important: Do NOT set any offer-related property based on quantity
          return {
            ...product,
            quantity: newQuantity,
            // No offer-related property should be set here
          };
        }
        return product;
      }).filter(Boolean) as Product[]; // Remove null items (products marked for removal)
      
      return updatedProducts;
    });
  };

  const handleRemoveProduct = (id: number) => {
    console.log('Removing product with ID:', id);
    const productToRemove = products.find(p => p.id === id);
    setProducts(products.filter((product) => product.id !== id));
    
    if (productToRemove) {
      toast({
        title: "Prodotto rimosso",
        description: `${productToRemove.name} è stato rimosso dalla lista`,
        duration: 3000,
        className: "toast-bottom"
      });
    }
  };

  const handleAddProduct = (name: string) => {
    if (name.trim()) {
      // Check if the product name matches any suggestion to get the image
      const matchingSuggestion = suggestions.find(
        s => s.name.toLowerCase() === name.toLowerCase()
      );
      
      // Log the suggestion data to verify it contains the correct information
      console.log('Adding product with matching suggestion:', matchingSuggestion);
      
      setProducts([
        ...products,
        { 
          id: Date.now(), 
          name: name.trim(), 
          quantity: 1,
          imageUrl: matchingSuggestion?.imageUrl,
          // No offer-related property should be set here based on quantity
        }
      ]);
      setSearchTerm("");
      toast({
        title: "Prodotto aggiunto",
        description: `${name} è stato aggiunto alla lista`,
        duration: 3000,
      });
    }
  };

  const handleAddSampleProducts = () => {
    const sampleProducts = [
      { id: Date.now(), name: 'Pane', quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
      { id: Date.now() + 1, name: 'Latte', quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
      { id: Date.now() + 2, name: 'Pasta', quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1556060997-e26d9299868f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
    ];
    
    setProducts(sampleProducts);
    toast({
      title: "Prodotti di esempio aggiunti",
      description: "Sono stati aggiunti 3 prodotti alla tua lista",
      duration: 3000,
      className: "toast-bottom"
    });
  };

  const handleFindStores = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      navigate("/stores", { state: { products } });
    }, 2000);
  };

  // Debug logging of products state to check for unexpected changes
  useEffect(() => {
    console.log('Products state updated:', products);
  }, [products]);

  return {
    products,
    searchTerm,
    setSearchTerm,
    isCalculating,
    suggestions,
    isLoadingSuggestions: isLoading,
    handleAddProduct,
    handleUpdateQuantity,
    handleRemoveProduct,
    handleAddSampleProducts,
    handleFindStores,
  };
};
