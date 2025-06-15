
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoriteLists } from "@/components/favorites/FavoriteLists";
import { FavoriteProducts } from "@/components/favorites/FavoriteProducts";
import { ListManagementDialog } from "@/components/favorites/ListManagementDialog";
import { useFavoritesToast } from "@/hooks/useFavoritesToast";

interface FavoriteList {
  id: number;
  name: string;
  itemCount: number;
  lastUsed: string;
  items: string[];
}

interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  store: string;
}

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lists");
  const [showDialog, setShowDialog] = useState(false);
  const [editingList, setEditingList] = useState<FavoriteList | null>(null);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();
  const { showToast } = useFavoritesToast();

  const [favoriteLists, setFavoriteLists] = useState<FavoriteList[]>([{
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

  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([{
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

  const handleEditList = (list: FavoriteList) => {
    setEditingList(list);
    setListName(list.name);
    setShowDialog(true);
  };

  const handleSaveList = () => {
    if (!listName.trim()) {
      showToast("error", {
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
      showToast("list-updated", {
        title: "Lista aggiornata",
        description: `La lista "${listName}" è stata aggiornata`
      });
    } else {
      const newList: FavoriteList = {
        id: Date.now(),
        name: listName,
        itemCount: 0,
        lastUsed: "Mai",
        items: []
      };
      setFavoriteLists(prev => [...prev, newList]);
      showToast("list-added", {
        title: "Lista aggiunta",
        description: `La lista "${listName}" è stata creata`
      });
    }
    setShowDialog(false);
  };

  const handleDeleteProduct = (id: number) => {
    setFavoriteProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    showToast("product-removed", {
      title: "Prodotto rimosso",
      description: "Il prodotto è stato rimosso dai preferiti"
    });
  };

  const handleUseList = (list: FavoriteList) => {
    showToast("list-used", {
      title: "Lista utilizzata",
      description: `Hai aggiunto "${list.name}" alla tua spesa`
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleAddToCart = (product: FavoriteProduct) => {
    showToast("product-added", {
      title: "Prodotto aggiunto",
      description: `${product.name} aggiunto al carrello`
    });
  };

  const handleDuplicate = (listId: number) => {
    const originalList = favoriteLists.find(list => list.id === listId);
    if (originalList) {
      const duplicatedList: FavoriteList = {
        ...originalList,
        id: Date.now(),
        name: `${originalList.name} (Copia)`,
        lastUsed: "Mai"
      };
      setFavoriteLists(prev => [...prev, duplicatedList]);
      showToast("list-duplicated", {
        title: "Lista duplicata",
        description: `"${originalList.name}" è stata duplicata`
      });
    }
  };

  const handleSchedule = (listId: number) => {
    showToast("schedule", {
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
        showToast("link-copied", {
          title: "Link copiato",
          description: "Link condiviso copiato negli appunti!"
        });
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/shared-list/${listId}`);
      showToast("link-copied", {
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
                <FavoriteLists
                  filteredLists={filteredLists}
                  onAddList={handleAddList}
                  onEditList={handleEditList}
                  onUseList={handleUseList}
                  onDuplicate={handleDuplicate}
                  onSchedule={handleSchedule}
                  onShare={handleShare}
                />
              </TabsContent>
              
              <TabsContent value="products" className="mt-4">
                <FavoriteProducts
                  filteredProducts={filteredProducts}
                  onDeleteProduct={handleDeleteProduct}
                  onAddToCart={handleAddToCart}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <ListManagementDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          listName={listName}
          setListName={setListName}
          onSave={handleSaveList}
          isEditing={!!editingList}
        />

        <Footer productsCount={0} />
      </div>
    </TooltipProvider>
  );
};

export default FavoritesPage;
