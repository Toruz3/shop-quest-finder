
import { useState } from "react";
import { FavoriteList } from "@/types/favorites";

export const useFavoritesDialogs = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showProductsDialog, setShowProductsDialog] = useState(false);
  const [editingList, setEditingList] = useState<FavoriteList | null>(null);
  const [managingList, setManagingList] = useState<FavoriteList | null>(null);
  const [listName, setListName] = useState("");

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

  const handleManageProducts = (list: FavoriteList) => {
    setManagingList(list);
    setShowProductsDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const closeProductsDialog = () => {
    setShowProductsDialog(false);
  };

  const updateManagingList = (updatedList: FavoriteList) => {
    setManagingList(updatedList);
  };

  return {
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
  };
};
