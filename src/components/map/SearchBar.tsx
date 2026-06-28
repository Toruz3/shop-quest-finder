
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div className="relative">
      <Input 
        placeholder="Cerca supermercato per nome" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        className="pr-10 py-6 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-300 rounded-xl shadow-search w-full text-base" 
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
    </div>
  );
};
