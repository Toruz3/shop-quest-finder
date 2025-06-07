
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FilterButton = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full justify-between bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" 
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className="flex items-center gap-2">
          <Filter size={16} />
          Filtri
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} 
        />
      </Button>
      
      {showFilters && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button size="sm" variant="outline" className="justify-start text-xs w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              Distanza <ChevronDown size={14} className="ml-1" />
            </Button>
            <Button size="sm" variant="outline" className="justify-start text-xs w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              Fascia di prezzo <ChevronDown size={14} className="ml-1" />
            </Button>
            <Button size="sm" variant="outline" className="justify-start text-xs w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              Valutazione <ChevronDown size={14} className="ml-1" />
            </Button>
            <Button size="sm" variant="outline" className="justify-start text-xs w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              Servizi <ChevronDown size={14} className="ml-1" />
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-300 border-primary-200 dark:border-primary-800">
              Consegna a domicilio ✓
            </Badge>
            <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-300 border-primary-200 dark:border-primary-800">
              Aperto ora ✓
            </Badge>
          </div>
        </motion.div>
      )}
    </div>
  );
};
