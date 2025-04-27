
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapHeader } from "@/components/map/MapHeader";
import { SearchBar } from "@/components/map/SearchBar";
import { FilterTabs } from "@/components/map/FilterTabs";
import { FilterButton } from "@/components/map/FilterButton";
import { MapView } from "@/components/map/MapView";
import { StoresList } from "@/components/map/StoresList";

const MapPage = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("nearby");
  
  // Sample data for stores
  const stores = [
    {
      id: 1,
      name: "Supermercato Esselunga",
      distance: "0.8 km",
      address: "Via Milano 123",
      priceLevel: "€€",
      rating: 4.2,
      hasOffers: true,
      specialOffers: ["20% di sconto su frutta e verdura", "3x2 sui prodotti per la casa"]
    },
    {
      id: 2,
      name: "Conad City",
      distance: "1.2 km",
      address: "Via Roma 45",
      priceLevel: "€",
      rating: 3.9,
      hasOffers: false,
      specialOffers: []
    },
    {
      id: 3,
      name: "Carrefour Express",
      distance: "1.5 km",
      address: "Corso Italia 78",
      priceLevel: "€€",
      rating: 4.0,
      hasOffers: true,
      specialOffers: ["Offerta del mese: -30% sui surgelati"]
    },
    {
      id: 4,
      name: "Lidl",
      distance: "2.3 km",
      address: "Via Garibaldi 12",
      priceLevel: "€",
      rating: 4.1,
      hasOffers: true,
      specialOffers: ["Settimana italiana: offerte speciali"]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col overflow-hidden main-content" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="w-full h-full overflow-y-auto pb-24">
        <div className="container mx-auto px-4 py-4 relative">
          <div className="w-full max-w-md mx-auto">
            <MapHeader />
            
            <div className="space-y-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              
              <FilterTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              
              <FilterButton />
              
              <MapView isMapLoaded={isMapLoaded} />
              
              <StoresList
                stores={stores}
                searchTerm={searchTerm}
                selectedTab={selectedTab}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage;
