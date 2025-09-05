-- Fix profiles table security: Add missing INSERT policy
-- This prevents unauthorized profile creation while allowing the trigger to work
CREATE POLICY "Only system can create profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (false);

-- Update the handle_new_user function to use SECURITY DEFINER properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Update other functions to use proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.add_search_term(p_user_id uuid, p_search_term text)
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Insert or update the search term
  INSERT INTO user_search_history (user_id, search_term)
  VALUES (p_user_id, p_search_term)
  ON CONFLICT (user_id, search_term)
  DO UPDATE SET created_at = now();
  
  -- Keep only the 20 most recent search terms per user
  DELETE FROM user_search_history
  WHERE id IN (
    SELECT id FROM user_search_history
    WHERE user_id = p_user_id
    ORDER BY created_at DESC
    OFFSET 20
  );
END;
$$;