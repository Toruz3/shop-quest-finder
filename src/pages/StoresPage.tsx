
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/shopping";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ProductSummary } from "@/components/store-comparison/ProductSummary";
import { SupermarketFilters } from "@/components/store-comparison/SupermarketFilters";
import { RecommendedStore } from "@/components/store-comparison/RecommendedStore";
import { SupermarketCard } from "@/components/store-comparison/SupermarketCard";
import { ProductPriceBreakdown } from "@/components/store-comparison/ProductPriceBreakdown";
import { AdvancedFilters } from "@/components/store-comparison/AdvancedFilters";
import { useStoreRecommendation } from "@/hooks/useStoreRecommendation";

interface Store {
  id: number;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  isOpen: boolean;
  closingTime: string;
  address: string;
  rating?: number;
  services?: string[];
}

const initialStores: Store[] = [
  {
    id: 1,
    name: "Eurospin",
    distance: "2.8 km",
    distanceInKm: 2.8,
    totalPrice: 38.99,
    savings: 12.50,
    isOpen: true,
    closingTime: "20:00",
    address: "Via Mazzini, 8",
    rating: 4.2,
    services: ["parking", "cards", "wifi"]
  },
  {
    id: 2,
    name: "Lidl",
    distance: "2.1 km",
    distanceInKm: 2.1,
    totalPrice: 40.99,
    savings: 10.50,
    isOpen: true,
    closingTime: "21:30",
    address: "Via Dante, 15",
    rating: 4.5,
    services: ["parking", "delivery", "cards"]
  },
  {
    id: 3,
    name: "Esselunga",
    distance: "1.2 km",
    distanceInKm: 1.2,
    totalPrice: 42.99,
    savings: 8.50,
    isOpen: true,
    closingTime: "22:00",
    address: "Corso Italia, 76",
    rating: 4.7,
    services: ["parking", "delivery", "pharmacy", "cafe", "wifi"]
  },
  {
    id: 4,
    name: "Conad",
    distance: "0.8 km",
    distanceInKm: 0.8,
    totalPrice: 45.99,
    savings: 5.50,
    isOpen: true,
    closingTime: "21:00",
    address: "Via Roma, 42",
    rating: 4.1,
    services: ["parking", "cards"]
  },
  {
    id: 5,
    name: "Carrefour",
    distance: "1.5 km",
    distanceInKm: 1.5,
    totalPrice: 48.99,
    savings: 2.50,
    isOpen: true,
    closingTime: "20:30",
    address: "Via Garibaldi, 103",
    rating: 4.3,
    services: ["parking", "delivery", "pharmacy", "wifi"]
  }
];

type SortOption = "price" | "distance";

const StoresPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("price");
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [filters, setFilters] = useState({
    openNow: false,
    hasParking: false,
    hasDelivery: false,
    hasServices: false
  });

  // Usa il nuovo hook per la raccomandazione intelligente
  const storesWithScores = useStoreRecommendation(stores);

  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products);
    } else {
      const sampleProducts = [
        { 
          id: Date.now(), 
          name: 'Pane', 
          quantity: 1, 
          imageUrl: 'https://placehold.co/100x100?text=Pane',
          originalIsPromotional: false 
        },
        { 
          id: Date.now() + 1, 
          name: 'Latte', 
          quantity: 2, 
          imageUrl: 'https://placehold.co/100x100?text=Latte',
          originalIsPromotional: true 
        },
        { 
          id: Date.now() + 2, 
          name: 'Pasta', 
          quantity: 1, 
          imageUrl: 'https://placehold.co/100x100?text=Pasta',
          originalIsPromotional: false 
        },
        { 
          id: Date.now() + 3, 
          name: 'Pomodori', 
          quantity: 1, 
          imageUrl: 'https://placehold.co/100x100?text=Pomodori',
          originalIsPromotional: true 
        },
        { 
          id: Date.now() + 4, 
          name: 'Olio extravergine', 
          quantity: 1, 
          imageUrl: 'https://placehold.co/100x100?text=Olio+EVO',
          originalIsPromotional: false 
        },
      ];
      setProducts(sampleProducts);
      toast({
        title: "Prodotti di esempio aggiunti",
        description: "Sono stati aggiunti alcuni prodotti di esempio per una migliore esperienza",
        duration: 3000,
      });
    }
  }, [location]);

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Applica filtri e ordinamento
  const filteredAndSortedStores = storesWithScores
    .filter(store => {
      if (filters.openNow && !store.isOpen) return false;
      if (filters.hasParking && !store.services?.includes("parking")) return false;
      if (filters.hasDelivery && !store.services?.includes("delivery")) return false;
      if (filters.hasServices && (!store.services || store.services.length === 0)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.totalPrice - b.totalPrice;
      } else {
        return a.distanceInKm - b.distanceInKm;
      }
    });

  const handleEditProducts = () => {
    navigate("/app", { state: { products } });
  };

  const goBackToHome = () => {
    navigate("/app", { state: { products } });
  };

  const getStoreWithMetadata = (store: any, index: number) => {
    const isLowestPrice = store.totalPrice === Math.min(...filteredAndSortedStores.map(s => s.totalPrice));
    const isClosest = store.distanceInKm === Math.min(...filteredAndSortedStores.map(s => s.distanceInKm));
    
    return {
      ...store,
      isBestPrice: isLowestPrice,
      isClosest: isClosest && !isLowestPrice
    };
  };

  const recommendedStore = filteredAndSortedStores[0];
  const otherStores = filteredAndSortedStores.slice(1);

  return (
    <motion.div 
      className="min-h-screen bg-background dark:bg-background overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border dark:border-border">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-muted dark:hover:bg-muted rounded-xl"
            onClick={goBackToHome}
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground dark:text-muted-foreground" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
              <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-semibold text-lg text-foreground dark:text-foreground tracking-tight">Shop Quest</h1>
          </div>
          <div className="w-9" />
        </div>
      </div>

      {/* Content */}
      <div className="pb-8">
        {/* Product Summary */}
        <ProductSummary products={products} onEditProducts={handleEditProducts} />
        
        {/* Product Price Breakdown */}
        <ProductPriceBreakdown 
          products={products} 
          stores={filteredAndSortedStores.map(s => ({ name: s.name, id: s.id }))} 
        />
        
        {/* Filters */}
        <SupermarketFilters sortBy={sortBy} onSortChange={handleSortChange} />
        
        {/* Advanced Filters */}
        <AdvancedFilters filters={filters} onFiltersChange={handleFiltersChange} />
        
        {/* Recommended Store */}
        {recommendedStore && <RecommendedStore store={recommendedStore} />}
        
        {/* Other Options */}
        {otherStores.length > 0 && (
          <div className="px-4 mt-8 pb-8">
            <h2 className="font-semibold mb-4 text-foreground dark:text-foreground">
              Altre opzioni ({otherStores.length})
            </h2>
            <div className="space-y-4">
              {otherStores.map((store, index) => (
                <SupermarketCard 
                  key={store.id} 
                  store={getStoreWithMetadata(store, index + 1)} 
                />
              ))}
            </div>
          </div>
        )}
        
        {filteredAndSortedStores.length === 0 && (
          <div className="px-4 mt-8 text-center">
            <p className="text-muted-foreground dark:text-muted-foreground">
              Nessun supermercato trovato con i filtri selezionati.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StoresPage;
