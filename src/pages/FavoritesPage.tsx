
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Star, Search } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoriteLists } from "@/components/favorites/FavoriteLists";
import { FavoriteProducts } from "@/components/favorites/FavoriteProducts";
import { ListManagementDialog } from "@/components/favorites/ListManagementDialog";
import { ListProductsDialog } from "@/components/favorites/ListProductsDialog";
import { useFavoritesData } from "@/hooks/useFavoritesData";
import { useFavoritesDialogs } from "@/hooks/useFavoritesDialogs";

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const {
    favoriteLists,
    favoriteProducts,
    handleSaveList,
    handleUpdateList,
    handleDeleteProduct,
    handleAddProduct,
    handleUseList,
    handleAddToCart,
    handleDuplicate,
    handleSchedule,
    handleShare
  } = useFavoritesData();

  const {
    showDialog,
    showProductsDialog,
    editingList,
    managingList,
    listName,
    setListName,
    handleAddList,
    handleEditList,
    handleManageProducts,
    closeDialog,
    closeProductsDialog,
    updateManagingList
  } = useFavoritesDialogs();

  const filteredLists = favoriteLists.filter(list => 
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredProducts = favoriteProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSaveList = () => {
    const success = handleSaveList(listName, editingList);
    if (success) {
      closeDialog();
    }
  };

  const onUpdateList = (updatedList: any) => {
    handleUpdateList(updatedList);
    updateManagingList(updatedList);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen relative overflow-hidden pb-16">        
        <div className="container px-4 py-4 relative z-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <Star className="text-primary" size={20} />
              <span>I miei preferiti</span>
            </h1>
            
            <div className="relative mb-4">
              <Input 
                placeholder={activeTab === "lists" ? "Cerca lista" : "Cerca prodotto"} 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="pr-10 py-5 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:shadow-md w-full" 
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            
            <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="w-full grid grid-cols-1 h-12 rounded-lg p-1 bg-muted">
                <TabsTrigger value="products" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                  Prodotti Preferiti
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="mt-4">
                <FavoriteProducts
                  filteredProducts={filteredProducts}
                  onDeleteProduct={handleDeleteProduct}
                  onAddToCart={handleAddToCart}
                  onAddProduct={handleAddProduct}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <ListManagementDialog
          isOpen={showDialog}
          onClose={closeDialog}
          listName={listName}
          setListName={setListName}
          onSave={onSaveList}
          isEditing={!!editingList}
        />

        <ListProductsDialog
          isOpen={showProductsDialog}
          onClose={closeProductsDialog}
          list={managingList}
          onUpdateList={onUpdateList}
        />

        <Footer productsCount={0} />
      </div>
    </TooltipProvider>
  );
};

export default FavoritesPage;
