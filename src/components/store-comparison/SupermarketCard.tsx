
import { Navigation, MapPin, Tag, Clock, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StoreRating } from "./StoreRating";
import { StoreServices } from "./StoreServices";
import { TravelTimeEstimate } from "./TravelTimeEstimate";
import { NavigationButtons } from "./NavigationButtons";
import { motion } from "framer-motion";
import { useState } from "react";

interface Store {
  id: number;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  address: string;
  isOpen?: boolean;
  closingTime?: string;
  isBestPrice?: boolean;
  isClosest?: boolean;
  rating?: number;
  services?: string[];
  recommendationReason?: string;
}

interface SupermarketCardProps {
  store: Store;
}

export const SupermarketCard = ({ store }: SupermarketCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implementare salvataggio preferiti nel backend
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl border-border dark:border-border overflow-hidden bg-card dark:bg-card relative group">
        <CardContent className="p-4">
          {/* Pulsante cuore preferiti */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 p-1 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground dark:text-muted-foreground'}`} />
          </Button>

          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground dark:text-foreground text-lg">{store.name}</h3>
                {store.isBestPrice && (
                  <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-0.5">
                    Prezzo più basso
                  </Badge>
                )}
                {store.isClosest && !store.isBestPrice && (
                  <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium px-2 py-0.5">
                    Più vicino
                  </Badge>
                )}
              </div>
              
              {/* Rating */}
              {store.rating && (
                <div className="mb-2">
                  <StoreRating rating={store.rating} reviewCount={Math.floor(Math.random() * 500) + 50} />
                </div>
              )}
              
              {/* Motivo raccomandazione */}
              {store.recommendationReason && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 dark:bg-yellow-950/30 rounded-full mb-2">
                  <Star className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                    {store.recommendationReason}
                  </span>
                </div>
              )}
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground" />
                  <span>{store.distance} • {store.address}</span>
                </div>
                
                {store.isOpen !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground" />
                    <span className={store.isOpen ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {store.isOpen ? `Aperto fino alle ${store.closingTime}` : "Chiuso"}
                    </span>
                  </div>
                )}
                
                {/* Tempo di viaggio */}
                <TravelTimeEstimate distanceInKm={store.distanceInKm} compact />
                
                {/* Servizi */}
                {store.services && store.services.length > 0 && (
                  <StoreServices services={store.services} compact />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-xl text-foreground dark:text-foreground">€{store.totalPrice.toFixed(2)}</span>
                </div>
                {store.savings > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Tag className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      Risparmi €{store.savings.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <NavigationButtons 
              address={store.address}
              storeName={store.name}
              compact
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
