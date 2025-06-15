

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from "recharts";
import { Calendar, Filter, TrendingDown, TrendingUp, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProductSearch } from "@/hooks/useProductSearch";
import { ProductSuggestions } from "@/components/shopping/ProductSuggestions";

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

// Expanded sample products from the database
const products = [{
  id: 1,
  name: "Latte",
  price: 2.25,
  trend: "down",
  discount: "10%"
}, {
  id: 2,
  name: "Pane",
  price: 1.50,
  trend: "stable",
  discount: null
}, {
  id: 3,
  name: "Pasta",
  price: 0.89,
  trend: "down",
  discount: "20%"
}, {
  id: 4,
  name: "Uova",
  price: 2.99,
  trend: "up",
  discount: null
}, {
  id: 5,
  name: "Pomodori",
  price: 1.85,
  trend: "down",
  discount: "15%"
}, {
  id: 6,
  name: "Olio extravergine",
  price: 4.50,
  trend: "stable",
  discount: null
}, {
  id: 7,
  name: "Mozzarella",
  price: 3.20,
  trend: "up",
  discount: null
}, {
  id: 8,
  name: "Salmone",
  price: 12.90,
  trend: "down",
  discount: "25%"
}, {
  id: 9,
  name: "Banane",
  price: 1.80,
  trend: "stable",
  discount: null
}, {
  id: 10,
  name: "Yogurt",
  price: 2.40,
  trend: "down",
  discount: "5%"
}, {
  id: 11,
  name: "Pollo",
  price: 6.50,
  trend: "up",
  discount: null
}, {
  id: 12,
  name: "Riso",
  price: 1.20,
  trend: "stable",
  discount: null
}, {
  id: 13,
  name: "Broccoli",
  price: 2.10,
  trend: "down",
  discount: "12%"
}, {
  id: 14,
  name: "Formaggio",
  price: 4.80,
  trend: "up",
  discount: null
}, {
  id: 15,
  name: "Caffè",
  price: 3.60,
  trend: "stable",
  discount: null
}, {
  id: 16,
  name: "Arance",
  price: 2.30,
  trend: "down",
  discount: "8%"
}, {
  id: 17,
  name: "Spaghetti",
  price: 1.10,
  trend: "stable",
  discount: null
}, {
  id: 18,
  name: "Carne di manzo",
  price: 15.80,
  trend: "up",
  discount: null
}, {
  id: 19,
  name: "Limoni",
  price: 2.90,
  trend: "down",
  discount: "18%"
}, {
  id: 20,
  name: "Acqua",
  price: 0.50,
  trend: "stable",
  discount: null
}];

const PriceHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tracked");
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  
  // Add product search functionality
  const { suggestions, isLoading } = useProductSearch(searchTerm);
  
  // Update filtering logic to use "starts with" approach
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  
  const selectedProductData = products.find(p => p.id === selectedProduct);
  
  const handleSelectSuggestion = (productName: string) => {
    const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (product) {
      setSelectedProduct(product.id);
      setSearchTerm("");
    }
  };

  const handleProductClick = (productId: number) => {
    setSelectedProduct(productId);
    console.log('Selected product:', productId);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden pb-20 bg-white dark:bg-gray-900">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <LineChart className="text-primary" />
            <span>Storico Prezzi</span>
          </h1>
          
          <div className="relative mb-4">
            <Input 
              placeholder="Cerca prodotto" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pr-10 py-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-300 focus:ring focus:ring-primary-200 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full" 
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            
            {/* Product suggestions */}
            {searchTerm.length >= 1 && suggestions && suggestions.length > 0 && (
              <ProductSuggestions
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
              />
            )}
          </div>
          
          <Tabs defaultValue="tracked" className="mb-4" onValueChange={setSelectedTab}>
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
          
          {/* Period filter only - removed product selector */}
          <div className="flex gap-2 mb-4">
            <Select onValueChange={setSelectedPeriod} defaultValue="30days">
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
          
          {/* Price chart - Only show when a product is selected */}
          {selectedProduct && (
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-gray-800 dark:text-gray-100">
                  {selectedProductData?.name || "Prodotto"} - Andamento prezzi
                </h2>
                <Badge variant="outline" className={`${selectedProductData?.trend === "down" ? "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400" : selectedProductData?.trend === "up" ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" : "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"}`}>
                  {selectedProductData?.trend === "down" && <TrendingDown size={14} className="mr-1" />}
                  {selectedProductData?.trend === "up" && <TrendingUp size={14} className="mr-1" />}
                  {selectedProductData?.trend === "down" ? "-10% ultimo mese" : selectedProductData?.trend === "up" ? "+5% ultimo mese" : "Stabile"}
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
                <Button size="sm" variant="outline" className="h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  Confronta più prodotti
                </Button>
              </div>
            </Card>
          )}
          
          {/* Products list */}
          <div className="space-y-2">
            {filteredProducts.filter(product => (selectedTab === "offers" ? product.discount !== null : true) && (selectedTab === "trends" ? product.trend !== "stable" : true)).map(product => (
              <Card 
                key={product.id} 
                className={`p-3 bg-white dark:bg-gray-800 border ${selectedProduct === product.id ? "border-primary-300 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-primary-200"} transition-all shadow-sm hover:shadow-md cursor-pointer`} 
                onClick={() => handleProductClick(product.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100 text-left">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-gray-100">€{product.price.toFixed(2)}</span>
                      {product.discount && <Badge className="text-xs bg-accent text-white">-{product.discount}</Badge>}
                      <Badge variant="outline" className={`text-xs ${product.trend === "down" ? "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" : product.trend === "up" ? "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" : "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"}`}>
                        {product.trend === "down" && <TrendingDown size={10} className="mr-1" />}
                        {product.trend === "up" && <TrendingUp size={10} className="mr-1" />}
                        {product.trend === "down" ? "In calo" : product.trend === "up" ? "In aumento" : "Stabile"}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant={selectedProduct === product.id ? "default" : "outline"} className="h-8 text-xs">
                    {selectedProduct === product.id ? "Selezionato" : "Seleziona"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PriceHistoryPage;

