
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoriteProducts } from "@/components/favorites/FavoriteProducts";
import { ListManagementDialog } from "@/components/favorites/ListManagementDialog";
import { ListProductsDialog } from "@/components/favorites/ListProductsDialog";
import { useFavoritesData } from "@/hooks/useFavoritesData";
import { useFavoritesDialogs } from "@/hooks/useFavoritesDialogs";

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
            <header className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">La tua collezione</p>
              <h1 className="font-serif text-3xl leading-tight text-foreground">
                I tuoi <em className="italic text-primary">preferiti</em>
              </h1>
            </header>

            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Cerca prodotto"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-md"
              />
            </div>

            <FavoriteProducts
              filteredProducts={filteredProducts}
              onDeleteProduct={handleDeleteProduct}
              onAddToCart={handleAddToCart}
              onAddProduct={handleAddProduct}
            />
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
