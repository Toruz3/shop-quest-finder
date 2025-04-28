
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingHeader } from "@/components/shopping/ShoppingHeader";
import { SearchSection } from "@/components/shopping/SearchSection";
import { ShoppingListArea } from "@/components/shopping/ShoppingListArea";
import { Product } from "@/types/shopping";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ShoppingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  
  const handleFabClick = () => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) searchInput.focus();
  };

  const handleUpdateQuantity = (id: number, increment: boolean) => {
    setProducts(products.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: increment
              ? product.quantity + 1
              : Math.max(1, product.quantity - 1),
          }
        : product
    ));
  };

  const handleRemoveProduct = (id: number) => {
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col h-full max-w-md mx-auto w-full">
          <ShoppingHeader />
          
          <div className="mt-4 mb-6">
            <SearchSection
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddProduct={() => {
                if (searchTerm.trim()) {
                  setProducts([
                    ...products,
                    { id: Date.now(), name: searchTerm.trim(), quantity: 1 }
                  ]);
                  setSearchTerm("");
                  toast({
                    title: "Prodotto aggiunto",
                    description: `${searchTerm} è stato aggiunto alla lista`,
                    duration: 3000,
                  });
                }
              }}
              onSelectCategory={() => {}}
              showSuggestions={false}
              suggestions={[]}
              onSelectSuggestion={() => {}}
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
            <Button
              className="w-full mt-6 py-6 h-14 btn-primary rounded-lg shadow-lg ripple"
              onClick={handleFindStores}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ricerca in corso...
                </span>
              ) : (
                <span className="flex items-center gap-2 font-semibold text-base">
                  <span>Trova supermercato</span>
                </span>
              )}
            </Button>
          )}
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
