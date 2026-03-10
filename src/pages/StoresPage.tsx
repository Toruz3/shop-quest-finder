
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/shopping";
import { motion, AnimatePresence } from "framer-motion";
import { StoreCard } from "@/components/store-comparison/StoreCard";

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
}

const initialStores: Store[] = [
  { id: 1, name: "Eurospin", distance: "2.8 km", distanceInKm: 2.8, totalPrice: 38.99, savings: 12.50, isOpen: true, closingTime: "20:00", address: "Via Mazzini, 8", rating: 4.2 },
  { id: 2, name: "Lidl", distance: "2.1 km", distanceInKm: 2.1, totalPrice: 40.99, savings: 10.50, isOpen: true, closingTime: "21:30", address: "Via Dante, 15", rating: 4.5 },
  { id: 3, name: "Esselunga", distance: "1.2 km", distanceInKm: 1.2, totalPrice: 42.99, savings: 8.50, isOpen: true, closingTime: "22:00", address: "Corso Italia, 76", rating: 4.7 },
  { id: 4, name: "Conad", distance: "0.8 km", distanceInKm: 0.8, totalPrice: 45.99, savings: 5.50, isOpen: true, closingTime: "21:00", address: "Via Roma, 42", rating: 4.1 },
  { id: 5, name: "Carrefour", distance: "1.5 km", distanceInKm: 1.5, totalPrice: 48.99, savings: 2.50, isOpen: true, closingTime: "20:30", address: "Via Garibaldi, 103", rating: 4.3 },
];

type SortOption = "price" | "distance";

const StoresPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("price");

  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products);
    } else {
      setProducts([
        { id: Date.now(), name: 'Pane', quantity: 1, imageUrl: '', originalIsPromotional: false },
        { id: Date.now() + 1, name: 'Latte', quantity: 2, imageUrl: '', originalIsPromotional: true },
        { id: Date.now() + 2, name: 'Pasta', quantity: 1, imageUrl: '', originalIsPromotional: false },
        { id: Date.now() + 3, name: 'Pomodori', quantity: 1, imageUrl: '', originalIsPromotional: true },
        { id: Date.now() + 4, name: 'Olio extravergine', quantity: 1, imageUrl: '', originalIsPromotional: false },
      ]);
    }
  }, [location]);

  const sortedStores = [...initialStores].sort((a, b) => {
    if (sortBy === "price") return a.totalPrice - b.totalPrice;
    return a.distanceInKm - b.distanceInKm;
  });

  const bestPrice = Math.min(...initialStores.map(s => s.totalPrice));
  const closestDistance = Math.min(...initialStores.map(s => s.distanceInKm));

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => navigate("/app", { state: { products } })}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Confronta supermercati</h1>
            <p className="text-xs text-muted-foreground">{products.length} prodotti nella lista</p>
          </div>
        </div>
      </div>

      {/* Sort Toggle */}
      <div className="px-4 pt-4 pb-2">
        <div className="inline-flex items-center bg-muted rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => setSortBy("price")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              sortBy === "price"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Prezzo
          </button>
          <button
            onClick={() => setSortBy("distance")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              sortBy === "distance"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Distanza
          </button>
        </div>
      </div>

      {/* Store List */}
      <div className="px-4 pb-16 space-y-2 pt-1">
        <AnimatePresence mode="popLayout">
          {sortedStores.map((store, index) => (
            <StoreCard
              key={store.id}
              store={store}
              rank={index + 1}
              isBest={index === 0}
              isBestPrice={store.totalPrice === bestPrice}
              isClosest={store.distanceInKm === closestDistance}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StoresPage;
