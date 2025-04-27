
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ProductSuggestion } from "@/types/shopping";

export const useProductSearch = (searchTerm: string) => {
  const { user } = useAuth();

  // Search products with trigram similarity
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      if (searchTerm.length < 2) return [];
      
      const { data: products } = await supabase
        .from('products')
        .select('id, name, category, description, imageUrl')
        .order('similarity(name, $1)', { ascending: false })
        .textSearch('name', `${searchTerm}:*`)
        .limit(5);

      return products || [];
    },
    enabled: searchTerm.length >= 2
  });

  // Add search term to history when user is logged in
  const addToHistory = async (term: string) => {
    if (!user) return;
    
    await supabase.rpc('add_search_term', {
      p_user_id: user.id,
      p_search_term: term
    });
  };

  // Get recent search history
  const { data: recentSearches = [] } = useQuery({
    queryKey: ['search_history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data } = await supabase
        .from('user_search_history')
        .select('search_term')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      return (data || []).map(item => item.search_term);
    },
    enabled: !!user
  });

  return {
    suggestions,
    isLoading,
    addToHistory,
    recentSearches
  };
};
