
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from "recharts";
import { Calendar, Filter, TrendingDown, TrendingUp, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

// Sample products
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
}];

const PriceHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tracked");
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedProductData = products.find(p => p.id === selectedProduct);
  
  return (
    <div className="min-h-screen bg-slate-800 text-slate-100 relative overflow-hidden pb-20">
      {/* Decorative elements with updated colors */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-slate-600/20 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-100">
            <LineChart className="text-green-400" />
            <span>Storico Prezzi</span>
          </h1>
          
          <div className="relative mb-4">
            <Input 
              placeholder="Cerca prodotto" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pr-10 py-5 bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full" 
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          
          <Tabs defaultValue="tracked" className="mb-4" onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-slate-700">
              <TabsTrigger 
                value="tracked" 
                className="rounded-md data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-300 transition-all"
              >
                Monitorati
              </TabsTrigger>
              <TabsTrigger 
                value="offers" 
                className="rounded-md data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-300 transition-all"
              >
                In offerta
              </TabsTrigger>
              <TabsTrigger 
                value="trends" 
                className="rounded-md data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-300 transition-all"
              >
                Tendenze
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Product selector and period filter */}
          <div className="flex gap-2 mb-4">
            <Select onValueChange={value => setSelectedProduct(Number(value))} defaultValue="1">
              <SelectTrigger className="flex-1 bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Seleziona prodotto" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {products.map(product => (
                  <SelectItem 
                    key={product.id} 
                    value={product.id.toString()}
                    className="text-slate-100 focus:bg-slate-600 focus:text-slate-100"
                  >
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={setSelectedPeriod} defaultValue="30days">
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="7days" className="text-slate-100 focus:bg-slate-600 focus:text-slate-100">7 giorni</SelectItem>
                <SelectItem value="30days" className="text-slate-100 focus:bg-slate-600 focus:text-slate-100">30 giorni</SelectItem>
                <SelectItem value="90days" className="text-slate-100 focus:bg-slate-600 focus:text-slate-100">3 mesi</SelectItem>
                <SelectItem value="365days" className="text-slate-100 focus:bg-slate-600 focus:text-slate-100">1 anno</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Price chart */}
          <Card className="p-4 mb-4 bg-slate-700 border-slate-600 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-slate-100">
                {selectedProductData?.name || "Latte"} - Andamento prezzi
              </h2>
              <Badge 
                variant="outline" 
                className={`${
                  selectedProductData?.trend === "down" 
                    ? "text-green-400 bg-green-400/10 border-green-400/30" 
                    : selectedProductData?.trend === "up" 
                    ? "text-red-400 bg-red-400/10 border-red-400/30" 
                    : "text-blue-400 bg-blue-400/10 border-blue-400/30"
                }`}
              >
                {selectedProductData?.trend === "down" && <TrendingDown size={14} className="mr-1" />}
                {selectedProductData?.trend === "up" && <TrendingUp size={14} className="mr-1" />}
                {selectedProductData?.trend === "down" ? "-10% ultimo mese" : selectedProductData?.trend === "up" ? "+5% ultimo mese" : "Stabile"}
              </Badge>
            </div>
            
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={priceData} 
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} stroke="#475569" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: '#cbd5e1' }} 
                    axisLine={{ stroke: '#475569' }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#cbd5e1' }} 
                    axisLine={false} 
                    tickLine={false} 
                    domain={['dataMin - 0.1', 'dataMax + 0.1']} 
                    tickFormatter={value => `€${value.toFixed(2)}`} 
                  />
                  <Tooltip 
                    formatter={value => [`€${Number(value).toFixed(2)}`, ""]} 
                    labelFormatter={label => `Settimana: ${label}`}
                    contentStyle={{
                      backgroundColor: '#334155',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#f1f5f9'
                    }}
                  />
                  <Line type="monotone" dataKey="Esselunga" stroke="#4ade80" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Conad" stroke="#a855f7" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Carrefour" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Legend 
                    iconType="circle" 
                    iconSize={8} 
                    wrapperStyle={{
                      fontSize: '10px',
                      paddingTop: '8px',
                      color: '#cbd5e1'
                    }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-600 flex justify-between items-center">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar size={12} />
                Ultimo aggiornamento: oggi
              </div>
              <Button size="sm" variant="outline" className="h-8 text-xs bg-slate-600 hover:bg-slate-500 text-slate-100 border-slate-500">
                Confronta più prodotti
              </Button>
            </div>
          </Card>
          
          {/* Products list */}
          <div className="space-y-2">
            {filteredProducts
              .filter(product => 
                (selectedTab === "offers" ? product.discount !== null : true) && 
                (selectedTab === "trends" ? product.trend !== "stable" : true)
              )
              .map(product => (
                <Card 
                  key={product.id} 
                  className={`p-3 border cursor-pointer transition-all shadow-sm hover:shadow-md ${
                    selectedProduct === product.id 
                      ? "border-green-400 bg-green-400/10" 
                      : "border-slate-600 bg-slate-700 hover:border-green-400/50 hover:bg-slate-600"
                  }`} 
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-slate-100 text-left">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium text-sm text-slate-100">€{product.price.toFixed(2)}</span>
                        {product.discount && (
                          <Badge className="text-xs bg-green-600 text-white">-{product.discount}</Badge>
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            product.trend === "down" 
                              ? "text-green-400 bg-green-400/10 border-green-400/30" 
                              : product.trend === "up" 
                              ? "text-red-400 bg-red-400/10 border-red-400/30" 
                              : "text-blue-400 bg-blue-400/10 border-blue-400/30"
                          }`}
                        >
                          {product.trend === "down" && <TrendingDown size={10} className="mr-1" />}
                          {product.trend === "up" && <TrendingUp size={10} className="mr-1" />}
                          {product.trend === "down" ? "In calo" : product.trend === "up" ? "In aumento" : "Stabile"}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={selectedProduct === product.id ? "default" : "outline"} 
                      className={`h-8 text-xs ${
                        selectedProduct === product.id 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-slate-600 hover:bg-slate-500 text-slate-100 border-slate-500"
                      }`}
                    >
                      Dettagli
                    </Button>
                  </div>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryPage;
