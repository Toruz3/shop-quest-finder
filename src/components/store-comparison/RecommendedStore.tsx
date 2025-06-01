
import { Navigation, MapPin, Crown, Euro, PiggyBank } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Store {
  id: number;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  address: string;
}

interface RecommendedStoreProps {
  store: Store;
}

export const RecommendedStore = ({ store }: RecommendedStoreProps) => {
  return (
    <div className="px-4 mt-8">
      <h2 className="font-semibold mb-4 text-gray-600">Migliore opzione:</h2>
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-2xl text-green-800 mb-1">{store.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                In base al prezzo totale e alla distanza,<br />
                ti consigliamo di fare la spesa qui
              </p>
            </div>
            
            {/* Badge discreto nell'angolo */}
            <div className="ml-4 flex-shrink-0">
              <div className="flex items-center gap-1 text-green-600">
                <Crown className="h-3 w-3" />
                <span className="text-xs font-medium">Consigliato</span>
              </div>
            </div>
          </div>
          
          {/* Layout stabilizzato con grid system */}
          <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-white/60 rounded-xl backdrop-blur-sm mb-6">
            {/* Colonna Totale Spesa - Larghezza Fissa */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Euro className="h-4 w-4 text-green-600 flex-shrink-0" />
                <motion.span 
                  key={store.totalPrice}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-xl text-green-700 min-w-[4rem] text-center"
                >
                  €{store.totalPrice.toFixed(2)}
                </motion.span>
              </div>
              <span className="text-xs text-gray-500 font-medium block">Totale spesa</span>
            </div>

            {/* Colonna Distanza - Larghezza Fissa */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <motion.span 
                  key={store.distance}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-xl text-blue-700 min-w-[3rem] text-center"
                >
                  {store.distance}
                </motion.span>
              </div>
              <span className="text-xs text-gray-500 font-medium block">Distanza</span>
            </div>

            {/* Colonna Risparmi - Larghezza Fissa */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <PiggyBank className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <motion.span 
                  key={store.savings}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-xl text-orange-600 min-w-[3rem] text-center"
                >
                  €{store.savings.toFixed(2)}
                </motion.span>
              </div>
              <span className="text-xs text-gray-500 font-medium block">Risparmi</span>
            </div>
          </div>
          
          <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl py-3 h-12 font-semibold shadow-md hover:shadow-lg transition-all duration-200">
            <Navigation className="h-4 w-4 mr-2" />
            Ottieni indicazioni
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
