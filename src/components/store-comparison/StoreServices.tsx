import { Car, Truck, CreditCard, Wifi, ShoppingCart, Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StoreServicesProps {
  services: string[];
  compact?: boolean;
}

const serviceIcons: Record<string, any> = {
  parking: Car,
  delivery: Truck,
  cards: CreditCard,
  wifi: Wifi,
  pharmacy: ShoppingCart,
  cafe: Coffee,
};

const serviceLabels: Record<string, string> = {
  parking: "Parcheggio",
  delivery: "Consegna",
  cards: "Carte",
  wifi: "WiFi",
  pharmacy: "Farmacia",
  cafe: "Bar",
};

export const StoreServices = ({ services, compact = false }: StoreServicesProps) => {
  if (services.length === 0) return null;

  return (
    <div className={`flex ${compact ? "gap-1" : "gap-2"} flex-wrap`}>
      {services.map((service) => {
        const Icon = serviceIcons[service];
        const label = serviceLabels[service];
        
        if (!Icon || !label) return null;

        return (
          <Badge
            key={service}
            variant="outline"
            className={`${
              compact ? "px-1 py-0 text-xs" : "px-2 py-1 text-xs"
            } border-border dark:border-border bg-muted/50 dark:bg-muted/50 text-muted-foreground dark:text-muted-foreground hover:bg-muted dark:hover:bg-muted`}
          >
            <Icon className={`${compact ? "h-2.5 w-2.5" : "h-3 w-3"} mr-1`} />
            {!compact && label}
          </Badge>
        );
      })}
    </div>
  );
};