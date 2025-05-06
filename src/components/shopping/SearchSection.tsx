
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
  return (
    <div className="relative space-y-2 w-full">
      <ProductSearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onAddProduct={onAddProduct}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ProductSuggestions
          suggestions={suggestions}
          onSelectSuggestion={onSelectSuggestion}
        />
      )}
    </div>
  );
};
