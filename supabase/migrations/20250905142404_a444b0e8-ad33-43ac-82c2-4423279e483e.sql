-- Fix security vulnerability: Remove public access to profiles table
-- Drop the current policy that allows everyone to see all profiles
DROP POLICY IF EXISTS "Utenti possono vedere tutti i profili" ON public.profiles;

-- Create a new policy that only allows users to see their own profile
CREATE POLICY "Users can only view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);