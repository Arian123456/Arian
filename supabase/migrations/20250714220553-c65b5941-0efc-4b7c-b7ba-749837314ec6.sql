-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('student', 'tutor', 'guardian');

-- Create enum for languages
CREATE TYPE public.app_language AS ENUM ('en', 'bn');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  role user_role NOT NULL,
  preferred_language app_language DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role, phone_number)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CAST(NEW.raw_user_meta_data->>'role' AS user_role),
    NEW.raw_user_meta_data->>'phone_number'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Create a table for storing Google Drive configurations
CREATE TABLE public.google_drive_storage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_name TEXT NOT NULL,
  folder_id TEXT NOT NULL,
  drive_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert the three Google Drive folders
INSERT INTO public.google_drive_storage (folder_name, folder_id, drive_url, description) VALUES
('Main Storage', '1anBwH66NcmdbNgH0v2G5XVK9vP0UPQiH', 'https://drive.google.com/drive/folders/1anBwH66NcmdbNgH0v2G5XVK9vP0UPQiH?usp=drive_link', 'Primary storage space'),
('Secondary Storage', '18V9lb4NazZJTExyYAxkzRLyOCk4s2wwx', 'https://drive.google.com/drive/folders/18V9lb4NazZJTExyYAxkzRLyOCk4s2wwx?usp=sharing', 'Secondary storage space'),
('Shared Storage', '1nXN-P0MMt9RV8IlVUNsR8lS6AHBlNzab', 'https://drive.google.com/drive/folders/1nXN-P0MMt9RV8IlVUNsR8lS6AHBlNzab?usp=sharing', 'Shared storage space');

-- Enable RLS for google_drive_storage
ALTER TABLE public.google_drive_storage ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read Google Drive storage info
CREATE POLICY "Anyone can view google drive storage" 
ON public.google_drive_storage 
FOR SELECT 
USING (true);

-- Create user tracking table for analytics
CREATE TABLE public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for user_analytics
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Users can only view their own analytics
CREATE POLICY "Users can view their own analytics" 
ON public.user_analytics 
FOR SELECT 
USING (user_id = (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()));

-- Allow system to insert analytics for authenticated users
CREATE POLICY "System can insert analytics" 
ON public.user_analytics 
FOR INSERT 
WITH CHECK (true);