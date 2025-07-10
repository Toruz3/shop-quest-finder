import { Clock, Car, MapPin } from "lucide-react";

interface TravelTimeEstimateProps {
  distanceInKm: number;
  compact?: boolean;
}

export const TravelTimeEstimate = ({ distanceInKm, compact = false }: TravelTimeEstimateProps) => {
  // Stima semplificata del tempo di viaggio (considerando traffico medio)
  const estimateTime = (distance: number) => {
    if (distance <= 1) return Math.round(distance * 3); // 3 min per km in città
    if (distance <= 5) return Math.round(distance * 2.5); // 2.5 min per km in zona urbana
    return Math.round(distance * 2); // 2 min per km fuori città
  };

  const travelTime = estimateTime(distanceInKm);

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{travelTime} min</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/30 dark:bg-muted/30 rounded-lg">
      <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <Car className="h-3 w-3 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground dark:text-foreground">
          {travelTime} minuti
        </span>
        <span className="text-xs text-muted-foreground dark:text-muted-foreground">
          Tempo stimato in auto
        </span>
      </div>
    </div>
  );
};