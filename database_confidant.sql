-- =========================================
-- CONFIDANT NETWORK — Database & Storage SQL
-- Run this in Supabase SQL Editor
-- =========================================

-- ─────────────────────────────────────────
-- TABLE: confidant_feed
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS confidant_feed (
  id         UUID                     DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url  TEXT                     NOT NULL,
  caption    TEXT                     NOT NULL DEFAULT ''
);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY: confidant_feed
-- ─────────────────────────────────────────
ALTER TABLE confidant_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "confidant_feed_select_public"
  ON confidant_feed FOR SELECT USING (true);

CREATE POLICY "confidant_feed_insert_auth"
  ON confidant_feed FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "confidant_feed_delete_auth"
  ON confidant_feed FOR DELETE
  USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────
-- STORAGE: feed-assets bucket (public)
-- ─────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('feed-assets', 'feed-assets', true)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────
-- STORAGE POLICIES: feed-assets
-- Pattern: public read + authenticated INSERT only.
-- We intentionally OMIT an UPDATE policy — all uploads
-- use unique Date.now() filenames so only INSERT is needed,
-- completely bypassing any RLS upsert/UPDATE AccessDenied issues.
-- ─────────────────────────────────────────

-- Allow anyone to read/view feed assets
CREATE POLICY "feed_assets_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'feed-assets');

-- Allow authenticated users to upload (INSERT only — no upsert)
CREATE POLICY "feed_assets_auth_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'feed-assets' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "feed_assets_auth_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'feed-assets' AND auth.role() = 'authenticated');
