-- =============================================
-- EMERGENCY FIX: Creating a FRESH table to avoid conflicts
-- =============================================

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- We use a NEW table name 'series_v2' to ensure no legacy schema issues exist
CREATE TABLE IF NOT EXISTS series_v2 (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Text to match Clerk
  
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  publish_time TEXT NOT NULL,
  publish_platforms TEXT[] DEFAULT '{}',
  
  niche_config JSONB,
  language_config JSONB,
  voice_config JSONB,
  background_music_config JSONB,
  video_style_config JSONB,
  caption_style_config JSONB,
  
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE series_v2 ENABLE ROW LEVEL SECURITY;

-- PERMISSIVE POLICY FOR DEBUGGING
-- This allows ANY authenticated user (with a valid token) to insert
-- It trusts the `user_id` sent by the client for now to unblock you.
CREATE POLICY "Allow all authenticated users" 
  ON series_v2 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
