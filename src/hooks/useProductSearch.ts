
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ProductSuggestion } from "@/types/shopping";

export const useProductSearch = (searchTerm: string) => {
  const { user } = useAuth();

  // Search products with text search that starts with the search term
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      if (searchTerm.length < 1) return [];
      
      console.log('Fetching suggestions for:', searchTerm);
      
      try {
        // Use ilike with only trailing % to match products that START with the search term
        const { data: products, error } = await supabase
          .from('products')
          .select('id, name, category, image_url')
          .ilike('name', `${searchTerm}%`) // Changed from %${searchTerm}% to ${searchTerm}%
          .order('name') // Add ordering for better UX
          .limit(15);

        if (error) {
          console.error("Error searching products:", error);
          return [];
        }
        
        console.log('Raw suggestions count from Supabase:', products?.length);
        
        // Map database columns to our expected format
        return products.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          imageUrl: product.image_url || '',
          description: product.category,
          price: Math.floor(Math.random() * 10) + 1 + Math.random(),
          supermarket: ['Coop', 'Conad', 'Carrefour', 'Esselunga'][Math.floor(Math.random() * 4)],
          isPromotional: Math.random() > 0.8
        })) as ProductSuggestion[];
      } catch (error) {
        console.error("Error in product search:", error);
        return [];
      }
    },
    enabled: searchTerm.length >= 1 // Changed from >= 2 to >= 1 for better responsiveness
  });

  // Add search term to history when user is logged in
  const addToHistory = async (term: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase.rpc('add_search_term', {
        p_user_id: user.id,
        p_search_term: term
      });
      
      if (error) {
        console.error("Error adding search term to history:", error);
      }
    } catch (error) {
      console.error("Exception adding search term to history:", error);
    }
  };

  // Get recent search history
  const { data: recentSearches = [] } = useQuery({
    queryKey: ['search_history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('user_search_history')
          .select('search_term')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching search history:", error);
          return [];
        }

        return (data || []).map(item => item.search_term);
      } catch (error) {
        console.error("Exception fetching search history:", error);
        return [];
      }
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
