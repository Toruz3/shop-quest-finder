
import { Filter, Tag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortOption = "price" | "distance";

interface SupermarketFiltersProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export const SupermarketFilters = ({ sortBy, onSortChange }: SupermarketFiltersProps) => {
  return (
    <div className="px-4 mt-6">
      <h2 className="font-semibold mb-3 flex items-center gap-2 text-foreground dark:text-foreground">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Filter className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        </div>
        Ordina supermercati
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <Button 
          variant={sortBy === 'price' ? 'default' : 'outline'} 
          size="sm" 
          className={`whitespace-nowrap rounded-full h-10 px-4 ${
            sortBy === 'price' 
              ? 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white' 
              : 'border-border dark:border-border hover:bg-muted dark:hover:bg-muted text-foreground dark:text-foreground'
          }`}
          onClick={() => onSortChange('price')}
        >
          <Tag className="h-4 w-4 mr-2" />
          Prezzo migliore
        </Button>
        <Button 
          variant={sortBy === 'distance' ? 'default' : 'outline'} 
          size="sm" 
          className={`whitespace-nowrap rounded-full h-10 px-4 ${
            sortBy === 'distance' 
              ? 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white' 
              : 'border-border dark:border-border hover:bg-muted dark:hover:bg-muted text-foreground dark:text-foreground'
          }`}
          onClick={() => onSortChange('distance')}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Più vicino
        </Button>
      </div>
    </div>
  );
};
