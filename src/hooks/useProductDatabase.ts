
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseProduct {
  id: string;
  name: string;
  category: string;
  image_url: string | null;
}

export interface ProductWithPrices extends DatabaseProduct {
  prices: {
    store_name: string;
    price: number;
    sale_price: number | null;
    is_on_sale: boolean;
  }[];
}

export const useProductDatabase = () => {
  return useQuery({
    queryKey: ['products-database'],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          category,
          image_url
        `)
        .order('name');

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return products || [];
    }
  });
};

export const useProductWithPrices = (productId?: string) => {
  return useQuery({
    queryKey: ['product-with-prices', productId],
    queryFn: async () => {
      if (!productId) return null;

      const { data: product, error: productError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          category,
          image_url
        `)
        .eq('id', productId)
        .single();

      if (productError) {
        console.error('Error fetching product:', productError);
        throw productError;
      }

      const { data: prices, error: pricesError } = await supabase
        .from('product_prices')
        .select(`
          price,
          sale_price,
          is_on_sale,
          stores!inner(name)
        `)
        .eq('product_id', productId);

      if (pricesError) {
        console.error('Error fetching prices:', pricesError);
        throw pricesError;
      }

      return {
        ...product,
        prices: prices?.map(p => ({
          store_name: p.stores.name,
          price: Number(p.price),
          sale_price: p.sale_price ? Number(p.sale_price) : null,
          is_on_sale: p.is_on_sale || false
        })) || []
      } as ProductWithPrices;
    },
    enabled: !!productId
  });
};

export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data: stores, error } = await supabase
        .from('stores')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching stores:', error);
        throw error;
      }

      return stores || [];
    }
  });
};
