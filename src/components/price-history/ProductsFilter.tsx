
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductsFilterProps {
  selectedTab: string;
  selectedPeriod: string;
  onTabChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

export const ProductsFilter = ({
  selectedTab,
  selectedPeriod,
  onTabChange,
  onPeriodChange
}: ProductsFilterProps) => {
  return (
    <>
      <Tabs defaultValue="tracked" className="mb-4" onValueChange={onTabChange}>
        <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="tracked" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            Monitorati
          </TabsTrigger>
          <TabsTrigger value="offers" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            In offerta
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            Tendenze
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-2 mb-4">
        <Select onValueChange={onPeriodChange} defaultValue="30days">
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="7days" className="text-gray-900 dark:text-gray-100">7 giorni</SelectItem>
            <SelectItem value="30days" className="text-gray-900 dark:text-gray-100">30 giorni</SelectItem>
            <SelectItem value="90days" className="text-gray-900 dark:text-gray-100">3 mesi</SelectItem>
            <SelectItem value="365days" className="text-gray-900 dark:text-gray-100">1 anno</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
