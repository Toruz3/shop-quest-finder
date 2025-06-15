import { useState } from "react";
import { MapPin, Navigation, SortAsc, Tag, Star, Building, ArrowRight, Clock, Wallet, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStores } from "@/hooks/useProductDatabase";

interface StoreWithCalculatedData {
  id: string;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  isOpen: boolean;
  closingTime: string;
  address: string;
}

type SortOption = "price" | "distance";

export const StoreComparison = () => {
  const [sortBy, setSortBy] = useState<SortOption>("price");
  const { data: storesData, isLoading } = useStores();
  const isMobile = useIsMobile();

  // Transform database stores to display format with mock data for demo
  const stores: StoreWithCalculatedData[] = storesData?.map((store, index) => ({
    id: store.id,
    name: store.name,
    distance: `${(0.8 + index * 0.4).toFixed(1)} km`,
    distanceInKm: 0.8 + index * 0.4,
    totalPrice: 40.99 + index * 3,
    savings: 12.50 - index * 2,
    isOpen: true,
    closingTime: index % 2 === 0 ? "21:00" : "20:30",
    address: store.address || `${store.city}, Via Example ${index + 1}`
  })) || [];

  const sortedStores = [...stores].sort((a, b) => {
    if (sortBy === "price") {
      return a.totalPrice - b.totalPrice;
    } else {
      return a.distanceInKm - b.distanceInKm;
    }
  });

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const getBestOption = (store: StoreWithCalculatedData): React.ReactNode => {
    const isLowestPrice = store.totalPrice === Math.min(...sortedStores.map(s => s.totalPrice));
    const isClosest = store.distanceInKm === Math.min(...sortedStores.map(s => s.distanceInKm));
    
    if (isLowestPrice && isClosest) {
      return <div className="absolute -right-1 -top-1 z-10">
          <div className="bg-gradient-to-r from-primary to-accent px-2 py-0.5 rounded-full shadow-md flex items-center justify-center">
            <Star className="w-3 h-3 text-white mr-0.5" /> 
            <span className="text-white text-[10px] font-medium">Miglior opzione</span>
          </div>
        </div>;
    }
    if (isLowestPrice) {
      return <div className="absolute -right-1 -top-1 z-10">
          <div className="bg-primary px-2 py-0.5 rounded-full shadow-md flex items-center justify-center">
            <Tag className="w-2.5 h-2.5 text-white mr-0.5" /> 
            <span className="text-white text-[10px] font-medium">Prezzo più basso</span>
          </div>
        </div>;
    }
    if (isClosest) {
      return <div className="absolute -right-1 -top-1 z-10">
          <div className="bg-accent px-2 py-0.5 rounded-full shadow-md flex items-center justify-center">
            <MapPin className="w-2.5 h-2.5 text-white mr-0.5" /> 
            <span className="text-white text-[10px] font-medium">Più vicino</span>
          </div>
        </div>;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto flex items-center justify-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Caricamento supermercati...</span>
        </div>
      </div>
    );
  }

  return <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'} mx-auto space-y-4 px-1 flex flex-col h-full pb-20`}>
      <div className="glass-effect p-3 rounded-xl shadow-md sticky top-0 z-10 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <SortAsc className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ordina supermercati</h3>
        </div>
        
        <RadioGroup value={sortBy} onValueChange={value => handleSortChange(value as SortOption)} className="flex gap-2">
          <div className="flex-1">
            <div className={`flex items-center gap-1.5 p-2 rounded-xl border-2 transition-all duration-200 cursor-pointer ${sortBy === 'price' ? 'border-primary/50 bg-primary/5' : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'}`}>
              <RadioGroupItem value="price" id="price" className="text-primary w-1.5 h-1.5" />
              <Label htmlFor="price" className="cursor-pointer font-medium flex items-center gap-1.5 text-sm">
                <Tag className="w-3.5 h-3.5" /> Prezzo
              </Label>
            </div>
          </div>
          <div className="flex-1">
            <div className={`flex items-center gap-1.5 p-2 rounded-xl border-2 transition-all duration-200 cursor-pointer ${sortBy === 'distance' ? 'border-primary/50 bg-primary/5' : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'}`}>
              <RadioGroupItem value="distance" id="distance" className="text-primary w-1.5 h-1.5" />
              <Label htmlFor="distance" className="cursor-pointer font-medium flex items-center gap-1.5 text-sm">
                <MapPin className="w-3.5 h-3.5" /> Distanza
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar pb-4">
        {sortedStores.length > 0 && (
          <div className="bg-accent/10 p-3 rounded-xl mb-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">Migliore opzione:</h3>
            <p className="text-sm text-gray-600 mb-2">
              In base al prezzo totale e alla distanza, ti consigliamo di fare la spesa da:
            </p>
            <div className="text-center bg-white p-3 rounded-lg shadow-sm">
              <div className="text-lg font-bold text-primary">
                {sortedStores[0].name}
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex flex-col items-center">
                  <Wallet className="w-4 h-4 text-primary mb-1" />
                  <span className="text-sm font-semibold">€{sortedStores[0].totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-4 h-4 text-accent mb-1" />
                  <span className="text-sm font-semibold">{sortedStores[0].distance}</span>
                </div>
              </div>
              <Button className="mt-3 btn-gradient py-1.5 px-4 h-auto text-sm w-full">
                <Navigation className="w-3.5 h-3.5 mr-1.5" />
                Indicazioni
              </Button>
            </div>
          </div>
        )}

        <h3 className="text-base font-bold text-gray-800 mt-4 mb-2">Tutte le opzioni:</h3>

        <div className="space-y-4">
          {sortedStores.map((store, index) => (
            <Card key={store.id} className="p-3 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary/20 glass-effect rounded-xl relative overflow-hidden group">
              {getBestOption(store)}
              
              <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 bg-primary/10 rounded-full">
                      <Building className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{store.name}</h3>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <div className="flex items-center text-gray-600 text-xs">
                      <MapPin className="w-3.5 h-3.5 mr-0.5 text-accent" />
                      {store.distance} - {store.address}
                    </div>
                    <div className="flex items-center text-gray-600 text-xs">
                      <Clock className="w-3.5 h-3.5 mr-0.5 text-amber-500" />
                      {store.isOpen ? `Aperto fino alle ${store.closingTime}` : "Chiuso"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    €{store.totalPrice.toFixed(2)}
                  </div>
                  <div className="flex items-center justify-end text-xs text-green-600 font-medium">
                    <Tag className="w-3 h-3 mr-0.5" />
                    Risparmi €{store.savings.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <Button variant="outline" className="text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-1 border-primary/20 hover:bg-primary/5 hover:border-primary/40 rounded-lg transition-all duration-200 px-2 py-1 h-auto">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Indicazioni</span>
                </Button>
                <Button variant="outline" className="text-xs font-medium text-gray-600 hover:text-gray-800 group-hover:pr-5 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-300 px-2 py-1 h-auto">
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  <span>Acquista</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>;
};
