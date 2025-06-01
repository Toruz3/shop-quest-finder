
import { Navigation, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
              <h3 className="font-bold text-xl text-green-800 mb-1">{store.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                In base al prezzo totale e alla distanza,<br />
                ti consigliamo di fare la spesa qui
              </p>
            </div>
            <Badge className="bg-green-600 hover:bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              TOP CHOICE
            </Badge>
          </div>
          
          <div className="flex items-center justify-between mb-6 py-4 px-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-green-700">€{store.totalPrice.toFixed(2)}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">Totale spesa</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-xl font-bold text-blue-700">{store.distance}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">Distanza</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xl font-bold text-orange-600">€{store.savings.toFixed(2)}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">Risparmi</span>
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
