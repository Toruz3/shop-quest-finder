import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, ChevronDown, Filter, Navigation, PlusCircle, Locate } from "lucide-react";
import { motion } from "framer-motion";

const MapPage = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("nearby");
  const [showFilters, setShowFilters] = useState(false);
  
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
    },
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
            <h1 className="text-xl font-bold mb-4 flex items-center gap-2 justify-center text-center">
              <MapPin className="text-primary" />
              <span>Supermercati vicini</span>
            </h1>
            
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Cerca supermercato per nome"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 py-5 bg-white border-primary-100 focus:border-primary-300 focus:ring focus:ring-primary-200 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              </div>
              
              <Tabs defaultValue="nearby" className="w-full" onValueChange={setSelectedTab}>
                <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-primary-50">
                  <TabsTrigger 
                    value="nearby" 
                    className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                  >
                    Più vicini
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cheapest" 
                    className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                  >
                    Più economici
                  </TabsTrigger>
                  <TabsTrigger 
                    value="offers" 
                    className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                  >
                    Offerte
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-between bg-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span className="flex items-center gap-2">
                    <Filter size={16} />
                    Filtri
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-3 bg-white rounded-lg border border-neutral-200"
                  >
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Button size="sm" variant="outline" className="justify-start text-xs w-full">
                        Distanza <ChevronDown size={14} className="ml-1" />
                      </Button>
                      <Button size="sm" variant="outline" className="justify-start text-xs w-full">
                        Fascia di prezzo <ChevronDown size={14} className="ml-1" />
                      </Button>
                      <Button size="sm" variant="outline" className="justify-start text-xs w-full">
                        Valutazione <ChevronDown size={14} className="ml-1" />
                      </Button>
                      <Button size="sm" variant="outline" className="justify-start text-xs w-full">
                        Servizi <ChevronDown size={14} className="ml-1" />
                      </Button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-primary-50 text-primary border-primary-200">
                        Consegna a domicilio ✓
                      </Badge>
                      <Badge variant="outline" className="bg-primary-50 text-primary border-primary-200">
                        Aperto ora ✓
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="relative rounded-xl overflow-hidden h-48 bg-neutral-100">
                {!isMapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <img 
                      src="https://images.unsplash.com/photo-1545065053-73e294de55ed?auto=format&fit=crop&w=600&h=200&q=80" 
                      alt="Map" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    <Button 
                      size="sm" 
                      className="absolute bottom-2 right-2 bg-white text-primary hover:bg-white/90"
                    >
                      <Locate size={16} className="mr-1" />
                      Posizione attuale
                    </Button>
                    <Button 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 bg-white text-neutral-700 hover:bg-white/90"
                    >
                      <PlusCircle size={16} />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {stores
                  .filter(store => 
                    (selectedTab === "offers" ? store.hasOffers : true) &&
                    (searchTerm ? store.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  )
                  .sort((a, b) => {
                    if (selectedTab === "nearby") {
                      return parseFloat(a.distance) - parseFloat(b.distance);
                    } else if (selectedTab === "cheapest") {
                      return a.priceLevel.length - b.priceLevel.length;
                    }
                    return 0;
                  })
                  .map(store => (
                    <Card key={store.id} className="p-3 border border-neutral-200 hover:border-primary-200 transition-all shadow-sm hover:shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-neutral-800">
                            {store.name}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                            <MapPin size={12} />
                            {store.address} • {store.distance}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs py-0">
                              {store.priceLevel}
                            </Badge>
                            <span className="text-xs text-neutral-600">
                              ★ {store.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Button size="sm" variant="default" className="h-8 text-xs px-2 mb-1">
                            <Navigation size={12} className="mr-1" />
                            Naviga
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-xs px-2">
                            Dettagli
                          </Button>
                        </div>
                      </div>
                      
                      {store.hasOffers && (
                        <div className="mt-2 pt-2 border-t border-dashed border-neutral-200">
                          <p className="text-xs text-accent-600 font-medium">Offerte speciali:</p>
                          <ul className="mt-1 space-y-1">
                            {store.specialOffers.map((offer, idx) => (
                              <li key={idx} className="text-xs text-neutral-700 flex items-start gap-1">
                                <span className="text-primary text-xs">•</span>
                                {offer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage;
