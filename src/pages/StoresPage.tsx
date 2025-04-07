
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreComparison } from "@/components/StoreComparison";
import { ProductList } from "@/components/shopping/ProductList";
import { ShoppingCart, ChevronLeft, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product, ProductSuggestion } from "@/types/shopping";
import { Input } from "@/components/ui/input";
import { ProductSuggestions } from "@/components/shopping/ProductSuggestions";
import { productDatabase } from "@/data/productDatabase";
import { motion } from "framer-motion";

const StoresPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [showEditMode, setShowEditMode] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    if (newProductName.length >= 2) {
      const filtered = productDatabase.filter(product =>
        product.name.toLowerCase().includes(newProductName.toLowerCase()) ||
        product.category.toLowerCase().includes(newProductName.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [newProductName]);

  const updateQuantity = (id: number, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: increment
                ? product.quantity + 1
                : Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const goBackToHome = () => {
    navigate("/", { state: { products } });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductName.trim()) {
      setProducts([
        ...products,
        { id: Date.now(), name: newProductName.trim(), quantity: 1 },
      ]);
      setNewProductName("");
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (name: string) => {
    setProducts([
      ...products,
      { id: Date.now(), name: name.trim(), quantity: 1 },
    ]);
    setNewProductName("");
    setShowSuggestions(false);
  };

  const handleSearchAgain = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate("/stores", { state: { products: [...products] }, replace: true });
    }, 1000);
  };

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-40 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-3 py-6 relative z-10 h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-grow flex flex-col md:flex-row gap-4 md:gap-10 max-w-4xl mx-auto">
          <div className="w-full md:w-1/3">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={goBackToHome}
                className="flex items-center text-gray-700 hover:text-primary"
                aria-label="Torna indietro"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Shop Quest
                </h2>
              </div>
              <div className="w-8"></div>
            </div>

            <Card className="p-4 w-full mx-auto glass-effect rounded-xl shadow-lg animate-fade-in h-[calc(100vh-180px)] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-800">Riepilogo prodotti</h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowEditMode(!showEditMode)}
                  className="text-xs text-primary hover:text-primary/80 p-1 h-auto"
                >
                  {showEditMode ? "Nascondi modifica" : "Modifica prodotti"}
                </Button>
              </div>
              
              <div className="flex-grow overflow-y-auto custom-scrollbar">
                {showEditMode ? (
                  <div className="space-y-4">
                    <ProductList
                      products={products}
                      onUpdateQuantity={updateQuantity}
                      onRemoveProduct={removeProduct}
                    />
                    
                    <form onSubmit={handleAddProduct} className="mt-4 pt-3 border-t border-gray-100 relative">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Aggiungi un prodotto</h4>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={newProductName}
                          onChange={(e) => setNewProductName(e.target.value)}
                          placeholder="Nome prodotto"
                          className="flex-1 bg-white/80 border-gray-200 focus:border-primary/30 h-9 text-sm"
                        />
                        <Button 
                          type="submit" 
                          size="sm" 
                          className="bg-primary h-9"
                          disabled={!newProductName.trim()}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          <span>Aggiungi</span>
                        </Button>
                      </div>
                      
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="relative mt-1">
                          <div className="absolute top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-primary/10 max-h-64 overflow-y-auto">
                            <ProductSuggestions
                              suggestions={suggestions}
                              onSelectSuggestion={handleSelectSuggestion}
                            />
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-primary/5"
                      >
                        <div className="flex items-center gap-2">
                          {product.imageUrl && (
                            <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span className="font-medium text-gray-800 text-sm">{product.name}</span>
                        </div>
                        <span className="text-sm text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">x{product.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {showEditMode && (
                <Button 
                  onClick={handleSearchAgain} 
                  className="w-full mt-4 bg-accent hover:bg-accent/90"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Ricerca in corso...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Aggiorna lista</span>
                    </span>
                  )}
                </Button>
              )}
            </Card>
          </div>
          
          <div className="w-full md:w-2/3 mt-4 md:mt-16">
            <StoreComparison />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoresPage;
