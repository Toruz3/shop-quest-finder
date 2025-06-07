
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface StoreOffer {
  text: string;
}

interface Store {
  id: number;
  name: string;
  distance: string;
  address: string;
  priceLevel: string;
  rating: number;
  hasOffers: boolean;
  specialOffers: string[];
}

interface StoreItemProps {
  store: Store;
}

export const StoreItem = ({ store }: StoreItemProps) => {
  return (
    <Card className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-200 transition-all shadow-sm hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-left">
            {store.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            <MapPin size={12} />
            {store.address} • {store.distance}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs py-0 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
              {store.priceLevel}
            </Badge>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ★ {store.rating}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Button size="sm" variant="default" className="h-8 text-xs px-2 mb-1">
            <Navigation size={12} className="mr-1" />
            Naviga
          </Button>
          <Button size="sm" variant="outline" className="h-8 text-xs px-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            Dettagli
          </Button>
        </div>
      </div>
      
      {store.hasOffers && (
        <div className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-xs text-accent-600 font-medium">Offerte speciali:</p>
          <ul className="mt-1 space-y-1">
            {store.specialOffers.map((offer, idx) => (
              <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1">
                <span className="text-primary text-xs">•</span>
                {offer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
