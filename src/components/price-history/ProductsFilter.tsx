
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductsFilterProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

export const ProductsFilter = ({
  selectedTab,
  onTabChange
}: ProductsFilterProps) => {
  return (
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
  );
};
