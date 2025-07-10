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
  
  const navigationApps = [
    {
      name: "Google Maps",
      icon: Map,
      url: `https://maps.google.com/maps?daddr=${encodedAddress}`,
    },
    {
      name: "Apple Maps",
      icon: Smartphone,
      url: `https://maps.apple.com/?daddr=${encodedAddress}`,
    },
    {
      name: "Waze",
      icon: Navigation,
      url: `https://waze.com/ul?q=${encodedAddress}`,
    },
  ];

  const handleNavigation = (url: string) => {
    window.open(url, '_blank');
  };

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-xl px-3 py-1.5 h-8 font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Navigation className="h-3 w-3 mr-1" />
            Vai
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background dark:bg-background border-border dark:border-border">
          {navigationApps.map((app) => {
            const Icon = app.icon;
            return (
              <DropdownMenuItem
                key={app.name}
                onClick={() => handleNavigation(app.url)}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted dark:hover:bg-muted"
              >
                <Icon className="h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
                <span className="text-foreground dark:text-foreground">{app.name}</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground dark:text-muted-foreground" />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex gap-2">
      {navigationApps.map((app) => {
        const Icon = app.icon;
        return (
          <Button
            key={app.name}
            variant="outline"
            size="sm"
            onClick={() => handleNavigation(app.url)}
            className="flex items-center gap-2 border-border dark:border-border hover:bg-muted dark:hover:bg-muted text-foreground dark:text-foreground"
          >
            <Icon className="h-3.5 w-3.5" />
            {app.name}
          </Button>
        );
      })}
    </div>
  );
};