
import { StoreItem } from "./StoreItem";

interface Store {
  id: number;
  name: string;
  distance: string;
  address: string;
  priceLevel: string;
  rating: number;
  hasOffers: boolean;
  specialOffers: string[];
}

interface StoresListProps {
  stores: Store[];
  searchTerm: string;
  selectedTab: string;
}

export const StoresList = ({ stores, searchTerm, selectedTab }: StoresListProps) => {
  const filteredStores = stores
    .filter(store => 
      (selectedTab === "offers" ? store.hasOffers : true) && 
      (searchTerm ? store.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    )
    .sort((a, b) => {
      if (selectedTab === "nearby") {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (selectedTab === "cheapest") {
        return a.priceLevel.length - b.priceLevel.length;
      }
      return 0;
    });

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar smooth-scroll">
      <div className="space-y-3">
        {filteredStores.map(store => (
          <StoreItem key={store.id} store={store} />
        ))}
        {/* This invisible spacer ensures content doesn't get cut off at the bottom */}
        <div className="h-2" aria-hidden="true"></div>
      </div>
    </div>
  );
};
