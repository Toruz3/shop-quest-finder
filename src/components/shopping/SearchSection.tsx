
import { ProductSearchBar } from "./ProductSearchBar";
import { ProductSuggestions } from "./ProductSuggestions";
import { ProductSuggestion } from "@/types/shopping";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddProduct: () => void;
  onSelectCategory: (category: string) => void;
  showSuggestions: boolean;
  suggestions: ProductSuggestion[];
  onSelectSuggestion: (name: string) => void;
}

export const SearchSection = ({
  searchTerm,
  onSearchChange,
  onAddProduct,
  onSelectCategory,
  showSuggestions,
  suggestions,
  onSelectSuggestion
}: SearchSectionProps) => {
  console.log("SearchSection render - suggestions:", suggestions?.length, "showSuggestions:", showSuggestions);
  
  return (
    <div className="relative space-y-2 w-full">
      <ProductSearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onAddProduct={onAddProduct}
      />
      
      {/* Show suggestions when there's at least 1 character and we have suggestions */}
      {searchTerm.length >= 1 && suggestions && suggestions.length > 0 && (
        <ProductSuggestions
          suggestions={suggestions}
          onSelectSuggestion={onSelectSuggestion}
        />
      )}
    </div>
  );
};
