-- =============================================
-- FIXED Schema for Clerk + Supabase Integration
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DROP EXISTING TABLE (Clean Slate Recommended to fix ID type)
-- WARNING: This deletes existing data. Since you are in dev, this is likely fine.
DROP TABLE IF EXISTS series;

-- 2. CREATE TABLE
CREATE TABLE IF NOT EXISTS series (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- CHANGED: user_id is now TEXT to support Clerk IDs (e.g. 'user_2...')
  -- REMOVED: REFERENCES auth.users(id) because Clerk users are external
  user_id TEXT NOT NULL,
  
  -- Series Details
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  publish_time TEXT NOT NULL,
  publish_platforms TEXT[] DEFAULT '{}',

  -- JSON Configs
  niche_config JSONB,
  language_config JSONB,
  voice_config JSONB,
  background_music_config JSONB,
  video_style_config JSONB,
  caption_style_config JSONB,

  -- Metadata
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE RLS
ALTER TABLE series ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES (Updated for Clerk JWTs)
-- The `auth.uid()` function will extract the 'sub' claim from the Clerk JWT
-- ensuring it matches the `user_id` column.

CREATE POLICY "Users can view their own series" 
  ON series FOR SELECT 
  USING (
    user_id = auth.uid()::text
  );

CREATE POLICY "Users can create their own series" 
  ON series FOR INSERT 
  WITH CHECK (
    user_id = auth.uid()::text
  );

CREATE POLICY "Users can update their own series" 
  ON series FOR UPDATE 
  USING (
    user_id = auth.uid()::text
  );

CREATE POLICY "Users can delete their own series" 
  ON series FOR DELETE 
  USING (
    user_id = auth.uid()::text
  );

-- 5. TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_series_updated_at
    BEFORE UPDATE ON series
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
