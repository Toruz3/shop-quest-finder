
import { Navigation, MapPin, Euro, PiggyBank, Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { StoreRating } from "./StoreRating";
import { StoreServices } from "./StoreServices";
import { TravelTimeEstimate } from "./TravelTimeEstimate";
import { NavigationButtons } from "./NavigationButtons";

interface Store {
  id: number;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  address: string;
  rating?: number;
  services?: string[];
  recommendationReason?: string;
}

interface RecommendedStoreProps {
  store: Store;
}

export const RecommendedStore = ({ store }: RecommendedStoreProps) => {
  return (
    <div className="px-4 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
          <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="font-semibold text-foreground dark:text-foreground">Migliore opzione</h2>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-2xl text-green-800 dark:text-green-200">{store.name}</h3>
                {store.rating && (
                  <StoreRating rating={store.rating} size="md" />
                )}
              </div>
              
              {store.recommendationReason && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                  <Star className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {store.recommendationReason}
                  </span>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground dark:text-muted-foreground leading-relaxed mb-4">
                In base al prezzo totale, distanza e orari di apertura,<br />
                ti consigliamo di fare la spesa qui
              </p>
              
              {store.services && store.services.length > 0 && (
                <StoreServices services={store.services} />
              )}
            </div>
            
            {/* Layout fisso con grid per prevenire movimento testi */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center min-w-0">
                <div className="h-8 flex items-center justify-center mb-2">
                  <span className="text-2xl font-semibold text-green-600 dark:text-green-400">€{store.totalPrice.toFixed(2)}</span>
                </div>
                <div className="h-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground text-center">Totale spesa</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="h-8 flex items-center justify-center mb-2">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-semibold text-blue-500 dark:text-blue-400">{store.distanceInKm}</span>
                    <span className="text-sm text-blue-500 dark:text-blue-400 ml-1">km</span>
                  </div>
                </div>
                <div className="h-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground text-center">Distanza</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="h-8 flex items-center justify-center mb-2">
                  <span className="text-2xl font-semibold text-orange-500 dark:text-orange-400">€{store.savings.toFixed(2)}</span>
                </div>
                <div className="h-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground text-center">Risparmi</span>
                </div>
              </div>
            </div>
            
            {/* Tempo di viaggio stimato */}
            <div className="mb-6">
              <TravelTimeEstimate distanceInKm={store.distanceInKm} />
            </div>
            
            {/* Pulsanti di navigazione */}
            <div className="space-y-3">
              <NavigationButtons 
                address={store.address}
                storeName={store.name}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
