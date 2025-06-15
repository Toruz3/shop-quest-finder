
import { Navigation, MapPin, Tag, Clock } from "lucide-react";
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
  isOpen?: boolean;
  closingTime?: string;
  isBestPrice?: boolean;
  isClosest?: boolean;
}

interface SupermarketCardProps {
  store: Store;
}

export const SupermarketCard = ({ store }: SupermarketCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl border-border dark:border-border overflow-hidden bg-card dark:bg-card">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
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
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground" />
                <span>{store.distance} • {store.address}</span>
              </div>
              {store.isOpen !== undefined && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground" />
                  <span>{store.isOpen ? `Aperto fino alle ${store.closingTime}` : "Chiuso"}</span>
                </div>
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
          
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-xl px-4 py-2 h-9 font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Navigation className="h-3.5 w-3.5 mr-1.5" />
            Vai
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
