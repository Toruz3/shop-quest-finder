
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteList, FavoriteProduct } from "@/types/favorites";
import { useFavoritesToast } from "@/hooks/useFavoritesToast";

export const useFavoritesData = () => {
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

  const handleSaveList = (listName: string, editingList: FavoriteList | null) => {
    if (!listName.trim()) {
      showToast("error", {
        title: "Nome lista richiesto",
        description: "Inserisci un nome per la lista",
        variant: "destructive"
      });
      return false;
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
    return true;
  };

  const handleUpdateList = (updatedList: FavoriteList) => {
    setFavoriteLists(prevLists => 
      prevLists.map(list => 
        list.id === updatedList.id ? updatedList : list
      )
    );
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

  return {
    favoriteLists,
    favoriteProducts,
    handleSaveList,
    handleUpdateList,
    handleDeleteProduct,
    handleUseList,
    handleAddToCart,
    handleDuplicate,
    handleSchedule,
    handleShare
  };
};
