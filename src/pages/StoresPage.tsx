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
    address: "Via Mazzini, 8"
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
    address: "Via Dante, 15"
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
    address: "Corso Italia, 76"
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
    address: "Via Roma, 42"
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
    address: "Via Garibaldi, 103"
  }
];

type SortOption = "price" | "distance";

const StoresPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("price");
  const [stores, setStores] = useState<Store[]>(() => {
    return [...initialStores].sort((a, b) => a.totalPrice - b.totalPrice);
  });

  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products);
    } else {
      const sampleProducts = [
        { 
          id: Date.now(), 
          name: 'Pane', 
          quantity: 1, 
          imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          originalIsPromotional: false 
        },
        { 
          id: Date.now() + 1, 
          name: 'Latte', 
          quantity: 2, 
          imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          originalIsPromotional: true 
        },
        { 
          id: Date.now() + 2, 
          name: 'Pasta', 
          quantity: 1, 
          imageUrl: 'https://images.unsplash.com/photo-1556060997-e26d9299868f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
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
    const sortedStores = [...initialStores].sort((a, b) => {
      if (value === "price") {
        return a.totalPrice - b.totalPrice;
      } else {
        return a.distanceInKm - b.distanceInKm;
      }
    });
    setStores(sortedStores);
  };

  const handleEditProducts = () => {
    navigate("/app", { state: { products } });
  };

  const goBackToHome = () => {
    navigate("/app", { state: { products } });
  };

  const getStoreWithMetadata = (store: Store, index: number) => {
    const isLowestPrice = store.totalPrice === Math.min(...stores.map(s => s.totalPrice));
    const isClosest = store.distanceInKm === Math.min(...stores.map(s => s.distanceInKm));
    
    return {
      ...store,
      isBestPrice: isLowestPrice,
      isClosest: isClosest && !isLowestPrice
    };
  };

  const recommendedStore = stores[0];
  const otherStores = stores.slice(1);

  return (
    <motion.div 
      className="min-h-screen bg-slate-800 overflow-x-hidden w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-slate-700/80 backdrop-blur-md border-b border-slate-600">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-slate-600 rounded-xl text-slate-100"
            onClick={goBackToHome}
          >
            <ChevronLeft className="h-5 w-5 text-slate-300" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-400/20 rounded-full">
              <ShoppingCart className="h-4 w-4 text-green-400" />
            </div>
            <h1 className="font-semibold text-lg text-slate-100 tracking-tight">Shop Quest</h1>
          </div>
          <div className="w-9" />
        </div>
      </div>

      {/* Content */}
      <div className="pb-8">
        {/* Product Summary */}
        <ProductSummary products={products} onEditProducts={handleEditProducts} />
        
        {/* Filters */}
        <SupermarketFilters sortBy={sortBy} onSortChange={handleSortChange} />
        
        {/* Recommended Store */}
        <RecommendedStore store={recommendedStore} />
        
        {/* Other Options */}
        <div className="px-2 mt-8 pb-8">
          <h2 className="font-semibold mb-4 text-slate-100">Tutte le opzioni:</h2>
          <div className="space-y-4">
            {otherStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <SupermarketCard store={getStoreWithMetadata(store, index + 1)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoresPage;
