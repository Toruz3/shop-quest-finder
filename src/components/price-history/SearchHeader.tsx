
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProductSuggestions } from "@/components/shopping/ProductSuggestions";
import { ProductSuggestion } from "@/types/shopping";

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  suggestions: ProductSuggestion[];
  onSelectSuggestion: (productName: string) => void;
}

export const SearchHeader = ({
  searchTerm,
  onSearchChange,
  suggestions,
  onSelectSuggestion
}: SearchHeaderProps) => {
  return (
    <div className="relative mb-4">
      <Input 
        placeholder="Cerca prodotto" 
        value={searchTerm} 
        onChange={e => onSearchChange(e.target.value)} 
        className="pr-10 py-5 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full" 
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      
      {/* Product suggestions */}
      {searchTerm.length >= 1 && suggestions && suggestions.length > 0 && (
        <ProductSuggestions
          suggestions={suggestions}
          onSelectSuggestion={onSelectSuggestion}
        />
      )}
    </div>
  );
};
