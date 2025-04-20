
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useShoppingLists = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries(["shopping_lists", user.id]);
      return data;
    },
  });

  const deleteList = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("shopping_lists").delete().eq("id", id);
      if (error) throw error;
      queryClient.invalidateQueries(["shopping_lists", user?.id]);
    },
  });

  return {
    shoppingLists: data,
    isLoading,
    error,
    createList: createList.mutateAsync,
    deleteList: deleteList.mutateAsync,
    refresh: () => queryClient.invalidateQueries(["shopping_lists", user?.id]),
  };
};
