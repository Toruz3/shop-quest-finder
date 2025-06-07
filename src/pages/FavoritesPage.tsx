import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Search, Plus, ShoppingCart, Pencil, Copy, Calendar, Share2, Trash2, AlertCircle, X, Save } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lists");
  const [showDialog, setShowDialog] = useState(false);
  const [editingList, setEditingList] = useState<any>(null);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const [favoriteLists, setFavoriteLists] = useState([{
    id: 1,
    name: "Spesa settimanale",
    itemCount: 12,
    lastUsed: "2 giorni fa",
    items: ["Latte", "Pane", "Frutta", "Verdura", "Pasta", "Formaggio"]
  }, {
    id: 2,
    name: "Cena speciale",
    itemCount: 8,
    lastUsed: "1 settimana fa",
    items: ["Carne", "Vino", "Formaggio", "Pane", "Verdura"]
  }, {
    id: 3,
    name: "Colazione",
    itemCount: 5,
    lastUsed: "3 giorni fa",
    items: ["Caffè", "Latte", "Cereali", "Frutta", "Yogurt"]
  }]);
  const [favoriteProducts, setFavoriteProducts] = useState([{
    id: 1,
    name: "Latte Parzialmente Scremato",
    price: 1.29,
    store: "Esselunga"
  }, {
    id: 2,
    name: "Pane Casereccio",
    price: 2.50,
    store: "Fornaio Locale"
  }, {
    id: 3,
    name: "Pasta De Cecco",
    price: 1.45,
    store: "Conad"
  }, {
    id: 4,
    name: "Parmigiano Reggiano",
    price: 4.99,
    store: "Esselunga"
  }, {
    id: 5,
    name: "Caffè Lavazza",
    price: 3.75,
    store: "Carrefour"
  }]);

  const filteredLists = favoriteLists.filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredProducts = favoriteProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddList = () => {
    setEditingList(null);
    setListName("");
    setShowDialog(true);
  };

  const handleEditList = (list: any) => {
    setEditingList(list);
    setListName(list.name);
    setShowDialog(true);
  };

  const handleSaveList = () => {
    if (!listName.trim()) {
      toast({
        title: "Nome lista richiesto",
        description: "Inserisci un nome per la lista",
        variant: "destructive"
      });
      return;
    }
    if (editingList) {
      setFavoriteLists(prevLists => prevLists.map(item => item.id === editingList.id ? {
        ...item,
        name: listName
      } : item));
      toast({
        title: "Lista aggiornata",
        description: `La lista "${listName}" è stata aggiornata`
      });
    } else {
      const newList = {
        id: Date.now(),
        name: listName,
        itemCount: 0,
        lastUsed: "Mai",
        items: []
      };
      setFavoriteLists(prev => [...prev, newList]);
      toast({
        title: "Lista aggiunta",
        description: `La lista "${listName}" è stata creata`
      });
    }
    setShowDialog(false);
  };

  const handleDeleteProduct = (id: number) => {
    setFavoriteProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    toast({
      title: "Prodotto rimosso",
      description: "Il prodotto è stato rimosso dai preferiti"
    });
  };

  const handleUseList = (list: any) => {
    toast({
      title: "Lista utilizzata",
      description: `Hai aggiunto "${list.name}" alla tua spesa`
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleAddToCart = (product: any) => {
    toast({
      title: "Prodotto aggiunto",
      description: `${product.name} aggiunto al carrello`
    });
  };

  const handleDuplicate = (listId: number) => {
    const originalList = favoriteLists.find(list => list.id === listId);
    if (originalList) {
      const duplicatedList = {
        ...originalList,
        id: Date.now(),
        name: `${originalList.name} (Copia)`,
        lastUsed: "Mai"
      };
      setFavoriteLists(prev => [...prev, duplicatedList]);
      toast({
        title: "Lista duplicata",
        description: `"${originalList.name}" è stata duplicata`
      });
    }
  };

  const handleSchedule = (listId: number) => {
    toast({
      title: "Pianificazione",
      description: "Funzione di pianificazione in arrivo!"
    });
  };

  const handleShare = async (listId: number, listName: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Lista spesa: ${listName}`,
          text: `Dai un'occhiata alla mia lista della spesa!`,
          url: `${window.location.origin}/shared-list/${listId}`
        });
      } catch (error) {
        navigator.clipboard.writeText(`${window.location.origin}/shared-list/${listId}`);
        toast({
          title: "Link copiato",
          description: "Link condiviso copiato negli appunti!"
        });
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/shared-list/${listId}`);
      toast({
        title: "Link copiato",
        description: "Link condiviso copiato negli appunti!"
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen relative overflow-hidden pb-20 bg-white dark:bg-gray-900">
        <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container px-3 py-4 relative z-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Star className="text-primary" size={20} />
              <span>I miei preferiti</span>
            </h1>
            
            <div className="relative mb-4">
              <Input 
                placeholder={activeTab === "lists" ? "Cerca lista" : "Cerca prodotto"} 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="pr-10 py-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-300 focus:ring focus:ring-primary-200 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full" 
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            </div>
            
            <Tabs defaultValue="lists" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="w-full grid grid-cols-2 h-12 rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="lists" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                  Liste salvate
                </TabsTrigger>
                <TabsTrigger value="products" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                  Prodotti preferiti
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lists" className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {filteredLists.length} liste salvate
                  </h2>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" onClick={handleAddList}>
                    <Plus size={14} className="mr-1" />
                    Nuova lista
                  </Button>
                </div>
                
                {filteredLists.length > 0 ? (
                  <div className="space-y-3">
                    {filteredLists.map(list => (
                      <motion.div key={list.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-200 transition-all duration-300 shadow-sm hover:shadow-md">
                          <div className="p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-100 text-left">{list.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-left">
                                  {list.itemCount} prodotti • Usata {list.lastUsed}
                                </p>
                              </div>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-600 dark:text-gray-400" onClick={() => handleEditList(list)}>
                                <Pencil size={14} />
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {list.items.slice(0, 5).map((item, idx) => (
                                <Badge key={idx} variant="outline" className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800 text-xs">
                                  {item}
                                </Badge>
                              ))}
                              {list.items.length > 5 && (
                                <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 text-xs">
                                  +{list.items.length - 5}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-3 flex justify-between items-center">
                            {/* Compact action buttons with tooltips */}
                            <div className="flex items-center gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                    onClick={() => handleDuplicate(list.id)}
                                  >
                                    <Copy size={14} className="text-gray-600" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Duplica lista</p>
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                                    onClick={() => handleSchedule(list.id)}
                                  >
                                    <Calendar size={14} className="text-blue-600" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Pianifica spesa</p>
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg bg-green-100 hover:bg-green-200 transition-colors"
                                    onClick={() => handleShare(list.id, list.name)}
                                  >
                                    <Share2 size={14} className="text-green-600" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Condividi lista</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            <Button variant="default" size="sm" className="h-8 px-3 text-xs" onClick={() => handleUseList(list)}>
                              <ShoppingCart size={14} className="mr-1" />
                              Usa
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 text-center border-dashed border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center">
                      <AlertCircle className="text-gray-400 dark:text-gray-500 mb-2" size={32} />
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Nessuna lista trovata</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Crea una nuova lista o modifica i filtri di ricerca</p>
                      <Button onClick={handleAddList} className="mt-4">
                        <Plus size={16} className="mr-1" />
                        Crea lista
                      </Button>
                    </div>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="products" className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {filteredProducts.length} prodotti preferiti
                  </h2>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    <Plus size={14} className="mr-1" />
                    Aggiungi prodotto
                  </Button>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    {filteredProducts.map(product => (
                      <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <Card className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-200 transition-all shadow-sm hover:shadow-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-gray-800 dark:text-gray-100">{product.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-900 dark:text-gray-100">€{product.price.toFixed(2)}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {product.store}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-red-500" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 size={16} />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" onClick={() => handleAddToCart(product)}>
                                <ShoppingCart size={14} className="mr-1" />
                                Aggiungi
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 text-center border-dashed border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center">
                      <AlertCircle className="text-gray-400 dark:text-gray-500 mb-2" size={32} />
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Nessun prodotto trovato</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Aggiungi prodotti ai preferiti o modifica i filtri di ricerca</p>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">{editingList ? "Modifica lista" : "Crea nuova lista"}</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                {editingList ? "Modifica il nome della tua lista preferita" : "Crea una nuova lista dei tuoi prodotti preferiti"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Input 
                value={listName} 
                onChange={e => setListName(e.target.value)} 
                placeholder="Nome lista" 
                className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" 
                autoFocus 
              />
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-between gap-2">
              <Button variant="outline" onClick={() => setShowDialog(false)} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                <X size={16} className="mr-1" />
                Annulla
              </Button>
              <Button onClick={handleSaveList}>
                <Save size={16} className="mr-1" />
                {editingList ? "Aggiorna" : "Crea"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer productsCount={0} />
      </div>
    </TooltipProvider>
  );
};

export default FavoritesPage;
