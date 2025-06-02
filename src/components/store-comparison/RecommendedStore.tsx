
import { Navigation, MapPin, Euro, PiggyBank } from "lucide-react";
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
          <div className="mb-6">
            <h3 className="font-bold text-2xl text-green-800 mb-2">{store.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              In base al prezzo totale e alla distanza,<br />
              ti consigliamo di fare la spesa qui
            </p>
          </div>
          
          {/* Layout fisso con grid per prevenire movimento testi */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center min-w-0">
              <div className="h-8 flex items-center justify-center mb-2">
                <span className="text-2xl font-semibold text-green-600">€{store.totalPrice.toFixed(2)}</span>
              </div>
              <div className="h-4 flex items-center justify-center">
                <span className="text-sm text-gray-500 text-center">Totale spesa</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center min-w-0">
              <div className="h-8 flex items-center justify-center mb-2">
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold text-blue-500">{store.distanceInKm}</span>
                  <span className="text-sm text-blue-500 ml-1">km</span>
                </div>
              </div>
              <div className="h-4 flex items-center justify-center">
                <span className="text-sm text-gray-500 text-center">Distanza</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center min-w-0">
              <div className="h-8 flex items-center justify-center mb-2">
                <span className="text-2xl font-semibold text-orange-500">€{store.savings.toFixed(2)}</span>
              </div>
              <div className="h-4 flex items-center justify-center">
                <span className="text-sm text-gray-500 text-center">Risparmi</span>
              </div>
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
