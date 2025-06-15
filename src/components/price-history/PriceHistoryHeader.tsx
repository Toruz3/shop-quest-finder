
import { LineChart } from "lucide-react";

export const PriceHistoryHeader = () => {
  return (
    <h1 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
      <LineChart className="text-primary" />
      <span>Storico Prezzi</span>
    </h1>
  );
};
