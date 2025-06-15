
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

export const useShoppingLists = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeToasts, setActiveToasts] = useState<Set<string>>(new Set());

  const showToast = (toastKey: string, toastConfig: any) => {
    if (activeToasts.has(toastKey)) return;
    
    setActiveToasts(prev => new Set(prev).add(toastKey));
    
    const { dismiss } = toast(toastConfig);
    
    setTimeout(() => {
      setActiveToasts(prev => {
        const newSet = new Set(prev);
        newSet.delete(toastKey);
        return newSet;
      });
    }, 1500);
    
    return dismiss;
  };

  // Fetch lists for logged in user
  const { data, isLoading, error } = useQuery({
    queryKey: ["shopping_lists", user?.id],
    queryFn: async () => {
      if (!user) return [];
      let { data, error } = await supabase
        .from("shopping_lists")
        .select("*, shopping_list_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // CRUD mutations
  const createList = useMutation({
    mutationFn: async (name: string) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("shopping_lists")
        .insert([{ name, user_id: user.id }]);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["shopping_lists", user.id] });
      showToast("list-created", {
        title: "Lista creata",
        description: `La lista "${name}" è stata creata con successo`
      });
      return data;
    },
  });

  const deleteList = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("shopping_lists").delete().eq("id", id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["shopping_lists", user?.id] });
      showToast("list-deleted", {
        title: "Lista eliminata",
        description: "La lista è stata eliminata con successo"
      });
    },
  });

  return {
    shoppingLists: data,
    isLoading,
    error,
    createList: createList.mutateAsync,
    deleteList: deleteList.mutateAsync,
    refresh: () => queryClient.invalidateQueries({ queryKey: ["shopping_lists", user?.id] }),
  };
};
