import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Store {
  id: number;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  isOpen: boolean;
  closingTime: string;
  address: string;
  rating?: number;
}

interface StoreCardProps {
  store: Store;
  rank: number;
  isBest?: boolean;
  isBestPrice?: boolean;
  isClosest?: boolean;
}

export const StoreCard = ({ store, rank, isBest, isBestPrice, isClosest }: StoreCardProps) => {
  const tags: string[] = [];
  if (isBestPrice) tags.push("Miglior prezzo");
  if (isClosest) tags.push("Più vicino");

  const navigateUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${store.name} ${store.address}`
  )}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className={`paper-card p-4 ${isBest ? "border-primary/40" : ""}`}
    >
      <div className="flex items-start gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-8 flex flex-col items-center pt-0.5">
          <span className="font-serif text-2xl leading-none text-foreground num-tabular">
            {rank}
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">
            {rank === 1 ? "Top" : ""}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-serif text-foreground leading-tight">
                {store.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {store.address}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-serif text-2xl text-foreground num-tabular leading-none">
                €{store.totalPrice.toFixed(2)}
              </div>
              {store.savings > 0 && (
                <div className="text-[11px] text-primary mt-1 num-tabular">
                  risparmi €{store.savings.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
              {store.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {store.isOpen ? `aperto fino alle ${store.closingTime}` : "chiuso"}
            </span>
          </div>

          {(tags.length > 0 || isBest) && (
            <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-widest">
              {tags.map((t) => (
                <span key={t} className="text-primary">{t}</span>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs font-medium border-border hover:border-primary hover:text-primary"
              asChild
            >
              <a href={navigateUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} />
                Naviga
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
