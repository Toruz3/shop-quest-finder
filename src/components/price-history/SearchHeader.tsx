
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
        className="pr-10 py-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-300 focus:ring focus:ring-primary-200 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full" 
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      
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
