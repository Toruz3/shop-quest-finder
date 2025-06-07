
import { MapPin } from "lucide-react";

export const MapHeader = () => {
  return (
    <h1 className="text-xl font-bold mb-4 flex items-center gap-2 justify-center text-center text-neutral-800">
      <MapPin className="text-primary w-6 h-6" />
      <span>Supermercati vicini</span>
    </h1>
  );
};
