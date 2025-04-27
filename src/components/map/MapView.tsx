
import { Button } from "@/components/ui/button";
import { PlusCircle, Locate } from "lucide-react";

interface MapViewProps {
  isMapLoaded: boolean;
}

export const MapView = ({ isMapLoaded }: MapViewProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden h-48 bg-neutral-100">
      {!isMapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <img 
            src="https://images.unsplash.com/photo-1545065053-73e294de55ed?auto=format&fit=crop&w=600&h=200&q=80" 
            alt="Map" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
          <Button size="sm" className="absolute bottom-2 right-2 bg-white text-primary hover:bg-white/90">
            <Locate size={16} className="mr-1" />
            Posizione attuale
          </Button>
          <Button size="icon" className="absolute top-2 right-2 h-8 w-8 bg-white text-neutral-700 hover:bg-white/90">
            <PlusCircle size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};
