-- ==========================================================
-- YUDISWORKS TESTIMONIALS UPGRADE
-- Safe, additive schema changes for THE PHAN-SITE
-- Run manually in Supabase SQL Editor if your current project DB
-- still uses the older testimonials schema.
-- ==========================================================

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT,
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS visible BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.testimonials
SET
  display_name = COALESCE(display_name, author, 'ANONYMOUS'),
  message = COALESCE(message, text, ''),
  sort_order = COALESCE(sort_order, 0),
  visible = COALESCE(visible, TRUE),
  updated_at = COALESCE(updated_at, created_at, NOW())
WHERE display_name IS NULL
   OR message IS NULL
   OR sort_order IS NULL
   OR visible IS NULL
   OR updated_at IS NULL;

ALTER TABLE public.testimonials
  ALTER COLUMN display_name SET NOT NULL,
  ALTER COLUMN message SET NOT NULL,
  ALTER COLUMN sort_order SET DEFAULT 0,
  ALTER COLUMN visible SET DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_testimonials_visible_sort
  ON public.testimonials (visible, sort_order, created_at DESC);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'testimonials'
      AND policyname = 'testimonials_select_public'
  ) THEN
    CREATE POLICY "testimonials_select_public"
      ON public.testimonials
      FOR SELECT
      USING (visible = true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'testimonials'
      AND policyname = 'testimonials_insert_auth'
  ) THEN
    CREATE POLICY "testimonials_insert_auth"
      ON public.testimonials
      FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'testimonials'
      AND policyname = 'testimonials_update_auth'
  ) THEN
    CREATE POLICY "testimonials_update_auth"
      ON public.testimonials
      FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'testimonials'
      AND policyname = 'testimonials_delete_auth'
  ) THEN
    CREATE POLICY "testimonials_delete_auth"
      ON public.testimonials
      FOR DELETE
      USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Optional: keep legacy columns available for compatibility if older code still references them.
-- These are retained intentionally so the existing schema is not destroyed.
