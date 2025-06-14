
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}

export const FilterTabs = ({ selectedTab, setSelectedTab }: FilterTabsProps) => {
  return (
    <Tabs defaultValue={selectedTab} className="w-full" onValueChange={setSelectedTab}>
      <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
        <TabsTrigger 
          value="nearby" 
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
        >
          Più vicini
        </TabsTrigger>
        <TabsTrigger 
          value="cheapest" 
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
        >
          Più economici
        </TabsTrigger>
        <TabsTrigger 
          value="offers" 
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
        >
          Offerte
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
