
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
    <Card className="p-3 border border-neutral-200 hover:border-primary-200 transition-all shadow-sm hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-neutral-800 text-left">
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
  );
};
