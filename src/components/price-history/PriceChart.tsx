
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { Product } from "@/data/priceHistoryProducts";

// Sample price history data
const priceData = [{
  name: "1 Set",
  Esselunga: 2.50,
  Conad: 2.70,
  Carrefour: 2.60
}, {
  name: "8 Set",
  Esselunga: 2.50,
  Conad: 2.65,
  Carrefour: 2.60
}, {
  name: "15 Set",
  Esselunga: 2.45,
  Conad: 2.65,
  Carrefour: 2.55
}, {
  name: "22 Set",
  Esselunga: 2.30,
  Conad: 2.60,
  Carrefour: 2.55
}, {
  name: "29 Set",
  Esselunga: 2.30,
  Conad: 2.50,
  Carrefour: 2.45
}, {
  name: "6 Ott",
  Esselunga: 2.20,
  Conad: 2.50,
  Carrefour: 2.45
}, {
  name: "13 Ott",
  Esselunga: 2.25,
  Conad: 2.45,
  Carrefour: 2.40
}, {
  name: "20 Ott",
  Esselunga: 2.25,
  Conad: 2.45,
  Carrefour: 2.40
}];

interface PriceChartProps {
  selectedProduct: Product | null;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

export const PriceChart = ({ selectedProduct, selectedPeriod, onPeriodChange }: PriceChartProps) => {
  if (!selectedProduct) return null;

  return (
    <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium text-gray-800 dark:text-gray-100">
          {selectedProduct.name} - Andamento prezzi
        </h2>
        <Badge variant="outline" className={`${selectedProduct.trend === "down" ? "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400" : selectedProduct.trend === "up" ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" : "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"}`}>
          {selectedProduct.trend === "down" && <TrendingDown size={14} className="mr-1" />}
          {selectedProduct.trend === "up" && <TrendingUp size={14} className="mr-1" />}
          {selectedProduct.trend === "down" ? "-10% ultimo mese" : selectedProduct.trend === "up" ? "+5% ultimo mese" : "Stabile"}
        </Badge>
      </div>
      
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} stroke="#374151" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={['dataMin - 0.1', 'dataMax + 0.1']} tickFormatter={value => `€${value.toFixed(2)}`} />
            <Tooltip 
              formatter={value => [`€${Number(value).toFixed(2)}`, ""]} 
              labelFormatter={label => `Settimana: ${label}`}
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#f9fafb'
              }}
            />
            <Line type="monotone" dataKey="Esselunga" stroke="#2ecc71" strokeWidth={2} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Conad" stroke="#8a6cff" strokeWidth={2} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Carrefour" stroke="#3498db" strokeWidth={2} activeDot={{ r: 6 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', paddingTop: '8px', color: '#9ca3af' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Calendar size={12} />
          Ultimo aggiornamento: oggi
        </div>
        <Select onValueChange={onPeriodChange} value={selectedPeriod}>
          <SelectTrigger className="w-32 h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
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
    </Card>
  );
};
