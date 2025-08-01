import { Navigation, Smartphone, Map, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavigationButtonsProps {
  address: string;
  storeName: string;
  compact?: boolean;
}

export const NavigationButtons = ({ address, storeName, compact = false }: NavigationButtonsProps) => {
  const encodedAddress = encodeURIComponent(`${storeName}, ${address}`);
  const googleMapsUrl = `https://maps.google.com/maps?daddr=${encodedAddress}`;

  const handleNavigation = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Button 
      size="sm" 
      onClick={handleNavigation}
      className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-xl px-3 py-1.5 h-8 font-medium shadow-sm hover:shadow-md transition-all duration-200"
    >
      <Navigation className="h-3 w-3 mr-1" />
      Naviga
    </Button>
  );
};