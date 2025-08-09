import { Clock, Car, Truck, Zap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface AdvancedFiltersProps {
  filters: {
    openNow: boolean;
    hasParking: boolean;
    hasDelivery: boolean;
    hasServices: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export const AdvancedFilters = ({ filters, onFiltersChange }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="px-4 mt-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between p-3 h-auto rounded-xl border-border dark:border-border hover:bg-muted dark:hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Filter className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-medium text-foreground dark:text-foreground">Filtri avanzati</span>
              {activeFiltersCount > 0 && (
                <div className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    {activeFiltersCount}
                  </span>
                </div>
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 p-2 bg-card dark:bg-card border border-border dark:border-border rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="openNow"
                checked={filters.openNow}
                onCheckedChange={(checked) => handleFilterChange('openNow', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-green-600 dark:text-green-400" />
                <label htmlFor="openNow" className="text-sm font-medium text-foreground dark:text-foreground cursor-pointer">
                  Aperto ora
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasParking"
                checked={filters.hasParking}
                onCheckedChange={(checked) => handleFilterChange('hasParking', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Car className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                <label htmlFor="hasParking" className="text-sm font-medium text-foreground dark:text-foreground cursor-pointer">
                  Con parcheggio
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasDelivery"
                checked={filters.hasDelivery}
                onCheckedChange={(checked) => handleFilterChange('hasDelivery', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Truck className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                <label htmlFor="hasDelivery" className="text-sm font-medium text-foreground dark:text-foreground cursor-pointer">
                  Consegna disponibile
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasServices"
                checked={filters.hasServices}
                onCheckedChange={(checked) => handleFilterChange('hasServices', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                <label htmlFor="hasServices" className="text-sm font-medium text-foreground dark:text-foreground cursor-pointer">
                  Servizi extra (farmacia, bar)
                </label>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                onClick={() => onFiltersChange({
                  openNow: false,
                  hasParking: false,
                  hasDelivery: false,
                  hasServices: false
                })}
              >
                Cancella tutti i filtri
              </Button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};