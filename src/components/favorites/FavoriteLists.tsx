import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, ShoppingCart, Pencil, Copy, Calendar, Share2, AlertCircle, Package } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFavoritesToast } from "@/hooks/useFavoritesToast";
import { FavoriteList } from "@/types/favorites";
interface FavoriteListsProps {
  filteredLists: FavoriteList[];
  onAddList: () => void;
  onEditList: (list: FavoriteList) => void;
  onUseList: (list: FavoriteList) => void;
  onDuplicate: (listId: number) => void;
  onSchedule: (listId: number) => void;
  onShare: (listId: number, listName: string) => void;
  onManageProducts: (list: FavoriteList) => void;
}
export const FavoriteLists = ({
  filteredLists,
  onAddList,
  onEditList,
  onUseList,
  onDuplicate,
  onSchedule,
  onShare,
  onManageProducts
}: FavoriteListsProps) => {
  const {
    showToast
  } = useFavoritesToast();
  const handleUseList = (list: FavoriteList) => {
    onUseList(list);
  };
  const handleDuplicate = (listId: number) => {
    onDuplicate(listId);
  };
  const handleSchedule = (listId: number) => {
    onSchedule(listId);
  };
  const handleShare = async (listId: number, listName: string) => {
    onShare(listId, listName);
  };
  const handleManageProducts = (list: FavoriteList) => {
    onManageProducts(list);
  };
  return <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {filteredLists.length} liste salvate
        </h2>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" onClick={onAddList}>
          <Plus size={14} className="mr-1" />
          Nuova lista
        </Button>
      </div>
      
      {filteredLists.length > 0 ? <div className="space-y-3">
          {filteredLists.map(list => <motion.div key={list.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
              <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="text-gray-600 dark:text-gray-400" size={16} />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-left">{list.name}</h3>
                        <Button size="sm" variant="ghost" onClick={() => handleManageProducts(list)} className="h-8 w-8 p-0 text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 ml-auto rounded-lg">
                          <Plus size={14} />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                        {list.itemCount} prodotti • Usata {list.lastUsed}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" onClick={() => onEditList(list)}>
                      <Pencil size={14} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {list.items.slice(0, 5).map((item, idx) => <Badge key={idx} variant="outline" className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 text-xs px-2 py-1 rounded-full">
                        {item}
                      </Badge>)}
                    {list.items.length > 5}
                  </div>
                  
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600" onClick={() => handleDuplicate(list.id)}>
                            <Copy size={16} className="text-gray-600 dark:text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duplica lista</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 transition-colors border border-blue-200 dark:border-blue-800" onClick={() => handleSchedule(list.id)}>
                            <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pianifica spesa</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 transition-colors border border-green-200 dark:border-green-800" onClick={() => handleShare(list.id, list.name)}>
                            <Share2 size={16} className="text-green-600 dark:text-green-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Condividi lista</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <Button variant="default" size="sm" className="h-10 px-4 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm flex-shrink-0" onClick={() => handleUseList(list)}>
                      <ShoppingCart size={16} className="mr-2" />
                      Usa
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>)}
        </div> : <Card className="p-6 text-center border-dashed border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <AlertCircle className="text-gray-400 dark:text-gray-500 mb-2" size={32} />
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Nessuna lista trovata</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Crea una nuova lista o modifica i filtri di ricerca</p>
            <Button onClick={onAddList} className="mt-4">
              <Plus size={16} className="mr-1" />
              Crea lista
            </Button>
          </div>
        </Card>}
    </>;
};