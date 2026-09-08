-- THE SOUNDTRACK / music_tracks
-- Additive, production-safe SQL for a new music showcase table and storage bucket.
-- Run manually in Supabase SQL Editor. Do not auto-run.

BEGIN;

-- 1) music_tracks table
CREATE TABLE IF NOT EXISTS public.music_tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    title TEXT NOT NULL,
    artist TEXT NOT NULL DEFAULT 'Yudistira',
    description TEXT,
    cover_image_url TEXT,
    release_year INTEGER,
    genre TEXT,
    spotify_url TEXT,
    youtube_url TEXT,
    youtube_music_url TEXT,
    soundcloud_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT music_tracks_title_not_empty CHECK (length(trim(title)) > 0),
    CONSTRAINT music_tracks_artist_not_empty CHECK (length(trim(artist)) > 0),
    CONSTRAINT music_tracks_release_year_valid CHECK (release_year IS NULL OR release_year BETWEEN 1900 AND 2100)
);

-- 2) Helpful indexes
CREATE INDEX IF NOT EXISTS idx_music_tracks_public_order
    ON public.music_tracks (is_visible, is_featured DESC, sort_order ASC, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_music_tracks_created_at
    ON public.music_tracks (created_at DESC);

-- 3) Enable RLS and add policies
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.music_tracks TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE
ON public.music_tracks
TO authenticated;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'music_tracks'
          AND policyname = 'music_tracks_visible_select'
    ) THEN
        CREATE POLICY "music_tracks_visible_select"
            ON public.music_tracks
            FOR SELECT
            TO anon
            USING (is_visible = TRUE);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'music_tracks'
          AND policyname = 'music_tracks_authenticated_select'
    ) THEN
        CREATE POLICY "music_tracks_authenticated_select"
            ON public.music_tracks
            FOR SELECT
            TO authenticated
            USING (TRUE);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'music_tracks'
          AND policyname = 'music_tracks_authenticated_insert'
    ) THEN
        CREATE POLICY "music_tracks_authenticated_insert"
            ON public.music_tracks
            FOR INSERT
            TO authenticated
            WITH CHECK (TRUE);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'music_tracks'
          AND policyname = 'music_tracks_authenticated_update'
    ) THEN
        CREATE POLICY "music_tracks_authenticated_update"
            ON public.music_tracks
            FOR UPDATE
            TO authenticated
            USING (TRUE)
            WITH CHECK (TRUE);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'music_tracks'
          AND policyname = 'music_tracks_authenticated_delete'
    ) THEN
        CREATE POLICY "music_tracks_authenticated_delete"
            ON public.music_tracks
            FOR DELETE
            TO authenticated
            USING (TRUE);
    END IF;
END $$;

-- 4) music-assets bucket for cover art
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('music-assets', 'music-assets', TRUE, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 5) Storage policies for public read, authenticated write/update/delete
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'music_assets_public_read'
    ) THEN
        CREATE POLICY "music_assets_public_read"
            ON storage.objects
            FOR SELECT
            USING (bucket_id = 'music-assets');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'music_assets_authenticated_insert'
    ) THEN
        CREATE POLICY "music_assets_authenticated_insert"
            ON storage.objects
            FOR INSERT
            TO authenticated
            WITH CHECK (bucket_id = 'music-assets');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'music_assets_authenticated_update'
    ) THEN
        CREATE POLICY "music_assets_authenticated_update"
            ON storage.objects
            FOR UPDATE
            TO authenticated
            USING (bucket_id = 'music-assets')
            WITH CHECK (bucket_id = 'music-assets');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'music_assets_authenticated_delete'
    ) THEN
        CREATE POLICY "music_assets_authenticated_delete"
            ON storage.objects
            FOR DELETE
            TO authenticated
            USING (bucket_id = 'music-assets');
    END IF;
END $$;

COMMIT;
