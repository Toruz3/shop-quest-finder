
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FabMenu } from "@/components/ui/fab-menu";
import { toast } from "@/hooks/use-toast";
import { Product, ProductSuggestion } from "@/types/shopping";
import { productDatabase } from "@/data/productDatabase";
import { ShoppingHeader } from "./shopping/ShoppingHeader";
import { SearchSection } from "./shopping/SearchSection";
import { ShoppingListArea } from "./shopping/ShoppingListArea";
import { ShoppingActionButton } from "./shopping/ShoppingActionButton";
import { ShoppingBag, Barcode, Upload, Share2, Calendar, Bell } from "lucide-react";

interface ShoppingListProps {
  onFindStores: (products: Product[]) => void;
  isCalculating: boolean;
}

export const ShoppingList = ({ onFindStores, isCalculating }: ShoppingListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const term = searchTerm.trim().toLowerCase();
      // Mostra solo prodotti il cui nome inizia con il termine inserito (non più categorie)
      const filtered = productDatabase.filter(product =>
        product.name.toLowerCase().startsWith(term)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const addProduct = (productName: string) => {
    if (productName.trim()) {
      const productInDb = productDatabase.find(p => 
        p.name.toLowerCase() === productName.toLowerCase()
      );
      
      setProducts(prevProducts => [
        ...prevProducts,
        { 
          id: Date.now(), 
          name: productName.trim(), 
          quantity: 1,
          imageUrl: productInDb?.imageUrl 
        },
      ]);
      setSearchTerm("");
      setShowSuggestions(false);
      toast({
        title: "Prodotto aggiunto",
        description: `${productName} è stato aggiunto alla lista`,
        duration: 3000,
      });
    }
  };

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

  const handleFindStores = () => {
    onFindStores(products);
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
  
  const handleSelectCategory = (category: string) => {
    setSearchTerm(category);
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) searchInput.focus();
  };
  
  const handleShareList = () => {
    if (products.length === 0) {
      toast({
        title: "Lista vuota",
        description: "Aggiungi prodotti alla lista prima di condividerla",
        duration: 3000,
        className: "toast-bottom"
      });
      return;
    }
    
    const listText = products.map(p => `${p.quantity}x ${p.name}`).join('\n');
    const shareData = {
      title: 'La mia lista della spesa',
      text: 'Ecco la mia lista della spesa:\n\n' + listText,
    };
    
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => {
          toast({
            title: "Lista condivisa",
            description: "La tua lista è stata condivisa con successo",
            duration: 3000,
            className: "toast-bottom"
          });
        })
        .catch((error) => {
          console.error('Errore nella condivisione:', error);
          toast({
            title: "Errore",
            description: "Non è stato possibile condividere la lista",
            duration: 3000,
            className: "toast-bottom"
          });
        });
    } else {
      toast({
        title: "Condivisione non supportata",
        description: "Il tuo browser non supporta la condivisione diretta",
        duration: 3000,
        className: "toast-bottom"
      });
    }
  };

  // Selection functions for the new props
  const handleSelectionChange = (id: number, selected: boolean) => {
    setSelectedProducts(prev => 
      selected 
        ? [...prev, id]
        : prev.filter(selectedId => selectedId !== id)
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(products.map(p => p.id));
    setSelectionMode(true);
  };

  const handleDeselectAll = () => {
    setSelectedProducts([]);
    setSelectionMode(false);
  };

  const handleBulkDelete = () => {
    const newProducts = products.filter(p => !selectedProducts.includes(p.id));
    setProducts(newProducts);
    setSelectedProducts([]);
    setSelectionMode(false);
    
    toast({
      title: "Prodotti rimossi",
      description: "I prodotti selezionati sono stati rimossi",
      duration: 3000,
      className: "toast-bottom"
    });
  };

  const handleBulkQuantityChange = (increment: boolean) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (selectedProducts.includes(product.id)) {
          const newQuantity = increment 
            ? product.quantity + 1 
            : Math.max(1, product.quantity - 1);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
    
    toast({
      title: increment ? "Quantità aumentata" : "Quantità diminuita",
      description: `${selectedProducts.length} prodotti modificati`,
      duration: 2000,
      className: "toast-bottom"
    });
  };
  
  const fabActions = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      label: "Aggiungi prodotto",
      onClick: () => {
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    },
    {
      icon: <Barcode className="w-6 h-6" />,
      label: "Scansiona barcode",
      onClick: () => {
        toast({
          title: "Scansione barcode",
          description: "Funzionalità in arrivo nelle prossime versioni!",
          duration: 3000,
          className: "toast-bottom"
        });
      }
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      label: "Condividi lista",
      onClick: handleShareList
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Pianifica spesa",
      onClick: () => {
        toast({
          title: "Pianifica spesa",
          description: "Funzionalità in arrivo nelle prossime versioni!",
          duration: 3000,
          className: "toast-bottom"
        });
      }
    },
    {
      icon: <Bell className="w-6 h-6" />,
      label: "Notifiche offerte",
      onClick: () => {
        toast({
          title: "Notifiche offerte",
          description: "Funzionalità in arrivo nelle prossime versioni!",
          duration: 3000,
          className: "toast-bottom"
        });
      }
    },
    {
      icon: <Upload className="w-6 h-6" />,
      label: "Importa lista",
      onClick: () => {
        toast({
          title: "Importa lista",
          description: "Funzionalità in arrivo nelle prossime versioni!",
          duration: 3000,
          className: "toast-bottom"
        });
      }
    }
  ];

  return (
    <Card className="p-6 w-full max-w-md mx-auto shadow-card rounded-xl border border-neutral-200 overflow-hidden flex flex-col h-[calc(100vh-100px)] md:min-h-[600px] md:max-h-[800px]">
      <ShoppingHeader />
      
      <SearchSection 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddProduct={() => addProduct(searchTerm)}
        onSelectCategory={handleSelectCategory}
        showSuggestions={showSuggestions}
        suggestions={suggestions}
        onSelectSuggestion={addProduct}
      />

      <ShoppingListArea 
        products={products}
        onUpdateQuantity={updateQuantity}
        onRemoveProduct={removeProduct}
        onAddSampleProducts={handleAddSampleProducts}
        selectedProducts={selectedProducts}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        onSelectionChange={handleSelectionChange}
        handleSelectAll={handleSelectAll}
        handleDeselectAll={handleDeselectAll}
        handleBulkDelete={handleBulkDelete}
        handleBulkQuantityChange={handleBulkQuantityChange}
        canUndo={false}
        canRedo={false}
        onUndo={() => {}}
        onRedo={() => {}}
      />

      <ShoppingActionButton 
        onFindStores={handleFindStores}
        isCalculating={isCalculating}
        showButton={products.length > 0}
      />
      
      <FabMenu actions={fabActions} />
    </Card>
  );
};
