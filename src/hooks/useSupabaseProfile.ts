
import { useAuth } from "@/contexts/AuthContext";

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export function useSupabaseProfile() {
  const { profile, isLoading } = useAuth();
  
  return { profile, loading: isLoading };
}
