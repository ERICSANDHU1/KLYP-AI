-- Run this in your Supabase SQL Editor to create the users table

CREATE TABLE public.users (
  id TEXT PRIMARY KEY, -- Matches Clerk user ID
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone (or restrict as needed)
CREATE POLICY "Allow public read access" ON public.users FOR SELECT USING (true);
