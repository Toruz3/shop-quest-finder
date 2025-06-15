
import { useState, useEffect, useCallback } from "react";
import { Product, ProductSuggestion } from "@/types/shopping";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useUndoRedo } from "@/hooks/useUndoRedo";

export const useShoppingState = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  
  // Use undo/redo for products
  const {
    state: products,
    set: setProducts,
    undo,
    redo,
    canUndo,
    canRedo
  } = useUndoRedo<Product[]>([]);

  // Use the product search hook to get suggestions
  const { suggestions, isLoading } = useProductSearch(searchTerm);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              redo();
            } else {
              e.preventDefault();
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 'a':
            e.preventDefault();
            handleSelectAll();
            break;
        }
      }
      if (e.key === 'Escape') {
        setSelectionMode(false);
        setSelectedProducts([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleUpdateQuantity = useCallback((id: number, increment: boolean) => {
    console.log('Updating quantity for product ID:', id, 'increment:', increment);
    
    setProducts(prevProducts => {
      return prevProducts.map((product) => {
        if (product.id === id) {
          if (!increment && product.quantity === 1) {
            console.log('Product will be removed as quantity would become 0');
            return null;
          }
          
          const newQuantity = increment ? product.quantity + 1 : product.quantity - 1;
          console.log('New quantity will be:', newQuantity);
          
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      }).filter(Boolean) as Product[];
    });
  }, [setProducts]);

  const handleRemoveProduct = useCallback((id: number) => {
    console.log('Removing product with ID:', id);
    const productToRemove = products.find(p => p.id === id);
    setProducts(products.filter((product) => product.id !== id));
    
    // Remove from selection if selected
    setSelectedProducts(prev => prev.filter(selectedId => selectedId !== id));
    
    if (productToRemove) {
      toast({
        title: "Prodotto rimosso",
        description: `${productToRemove.name} è stato rimosso dalla lista`,
        duration: 3000,
        className: "toast-bottom"
      });
    }
  }, [products, setProducts]);

  const handleAddProduct = useCallback((name: string) => {
    if (name.trim()) {
      const matchingSuggestion = suggestions.find(
        s => s.name.toLowerCase() === name.toLowerCase()
      );
      
      console.log('Adding product with matching suggestion:', matchingSuggestion);
      
      const newProduct = { 
        id: Date.now(), 
        name: name.trim(), 
        quantity: 1,
        imageUrl: matchingSuggestion?.imageUrl,
        price: matchingSuggestion?.price || undefined,
        supermarket: matchingSuggestion?.supermarket || undefined,
        originalIsPromotional: matchingSuggestion?.isPromotional || false
      };

      setProducts([...products, newProduct]);
      setSearchTerm("");
      toast({
        title: "Prodotto aggiunto",
        description: `${name} è stato aggiunto alla lista`,
        duration: 3000,
      });
    }
  }, [products, suggestions, setProducts]);

  const handleAddSampleProducts = useCallback(() => {
    const sampleProducts = [
      { 
        id: Date.now(), 
        name: 'Pane', 
        quantity: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        price: 1.50,
        supermarket: 'Supermercato locale',
        originalIsPromotional: false 
      },
      { 
        id: Date.now() + 1, 
        name: 'Latte', 
        quantity: 2, 
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        price: 1.20,
        supermarket: 'Coop',
        originalIsPromotional: true 
      },
      { 
        id: Date.now() + 2, 
        name: 'Pasta', 
        quantity: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1556060997-e26d9299868f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        price: 0.90,
        supermarket: 'Carrefour',
        originalIsPromotional: false 
      },
    ];
    
    setProducts(sampleProducts);
    toast({
      title: "Prodotti di esempio aggiunti",
      description: "Sono stati aggiunti 3 prodotti alla tua lista",
      duration: 3000,
      className: "toast-bottom"
    });
  }, [setProducts]);

  const handleNewList = useCallback(() => {
    if (products.length > 0) {
      setProducts([]);
      setSelectedProducts([]);
      setSelectionMode(false);
      toast({
        title: "Lista svuotata",
        description: "La tua lista della spesa è stata azzerata",
        duration: 3000,
        className: "toast-bottom"
      });
    } else {
      toast({
        title: "Lista già vuota",
        description: "La tua lista della spesa è già vuota",
        duration: 3000,
        className: "toast-bottom"
      });
    }
  }, [products.length, setProducts]);

  const handleFindStores = useCallback(() => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      navigate("/stores", { state: { products } });
    }, 2000);
  }, [navigate, products]);

  // Selection functions
  const handleSelectionChange = useCallback((id: number, selected: boolean) => {
    setSelectedProducts(prev => 
      selected 
        ? [...prev, id]
        : prev.filter(selectedId => selectedId !== id)
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedProducts(products.map(p => p.id));
    setSelectionMode(true);
  }, [products]);

  const handleDeselectAll = useCallback(() => {
    setSelectedProducts([]);
    setSelectionMode(false);
  }, []);

  const handleBulkDelete = useCallback(() => {
    const productsToRemove = products.filter(p => selectedProducts.includes(p.id));
    const newProducts = products.filter(p => !selectedProducts.includes(p.id));
    
    setProducts(newProducts);
    setSelectedProducts([]);
    setSelectionMode(false);
    
    toast({
      title: "Prodotti rimossi",
      description: `${productsToRemove.length} prodotti sono stati rimossi dalla lista`,
      duration: 3000,
      className: "toast-bottom"
    });
  }, [products, selectedProducts, setProducts]);

  const handleBulkQuantityChange = useCallback((increment: boolean) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (selectedProducts.includes(product.id)) {
          const newQuantity = increment 
            ? product.quantity + 1 
            : Math.max(1, product.quantity - 1);
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
    
    toast({
      title: increment ? "Quantità aumentata" : "Quantità diminuita",
      description: `${selectedProducts.length} prodotti modificati`,
      duration: 2000,
      className: "toast-bottom"
    });
  }, [selectedProducts, setProducts]);

  // Auto-disable selection mode when no products are selected
  useEffect(() => {
    if (selectedProducts.length === 0 && selectionMode) {
      setSelectionMode(false);
    }
  }, [selectedProducts.length, selectionMode]);

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
    handleNewList,
    // Undo/Redo
    undo,
    redo,
    canUndo,
    canRedo,
    // Selection
    selectedProducts,
    selectionMode,
    setSelectionMode,
    handleSelectionChange,
    handleSelectAll,
    handleDeselectAll,
    handleBulkDelete,
    handleBulkQuantityChange,
  };
};
