-- ==========================================================
-- YUDISWORKS PORTFOLIO UPGRADE
-- Additive schema for skills + live deployments
-- SAFE FOR MANUAL RUN IN SUPABASE SQL EDITOR
-- ==========================================================

-- ==========================================================
-- 1) SKILLS TABLE
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  proof_label TEXT NOT NULL DEFAULT 'VIEW WORK',
  proof_href TEXT NOT NULL DEFAULT '#operations',
  visual_variant TEXT NOT NULL DEFAULT 'paper' CHECK (visual_variant IN ('paper', 'dark', 'red', 'outline')),
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_skills_visible_sort
  ON public.skills (is_visible, sort_order, created_at DESC);

-- ==========================================================
-- 2) WEB PROJECTS TABLE
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.web_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  preview_image_url TEXT,
  live_url TEXT,
  display_domain TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  repository_url TEXT,
  case_study_url TEXT,
  status TEXT NOT NULL DEFAULT 'live' CHECK (status IN ('live', 'private', 'archived', 'development')),
  sort_order INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_web_projects_visible_sort
  ON public.web_projects (is_visible, sort_order, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_web_projects_featured
  ON public.web_projects (is_featured, is_visible, sort_order);

-- ==========================================================
-- 3) STORAGE BUCKET: web-project-assets
-- ==========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('web-project-assets', 'web-project-assets', true)
ON CONFLICT (id) DO NOTHING;

-- ==========================================================
-- 4) RLS ENABLEMENT
-- ==========================================================
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_projects ENABLE ROW LEVEL SECURITY;

-- ==========================================================
-- 5) PUBLIC READ POLICIES
-- ==========================================================
CREATE POLICY IF NOT EXISTS "skills_select_public"
  ON public.skills FOR SELECT
  USING (is_visible = true);

CREATE POLICY IF NOT EXISTS "web_projects_select_public"
  ON public.web_projects FOR SELECT
  USING (is_visible = true);

-- ==========================================================
-- 6) AUTHENTICATED WRITE POLICIES
-- ==========================================================
CREATE POLICY IF NOT EXISTS "skills_insert_auth"
  ON public.skills FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "skills_update_auth"
  ON public.skills FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "skills_delete_auth"
  ON public.skills FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "web_projects_insert_auth"
  ON public.web_projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "web_projects_update_auth"
  ON public.web_projects FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "web_projects_delete_auth"
  ON public.web_projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- ==========================================================
-- 7) STORAGE POLICIES: web-project-assets
-- ==========================================================
CREATE POLICY IF NOT EXISTS "web_project_assets_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'web-project-assets');

CREATE POLICY IF NOT EXISTS "web_project_assets_auth_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'web-project-assets'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IS NOT NULL
  );

CREATE POLICY IF NOT EXISTS "web_project_assets_auth_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'web-project-assets' AND auth.role() = 'authenticated')
  WITH CHECK (bucket_id = 'web-project-assets' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "web_project_assets_auth_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'web-project-assets' AND auth.role() = 'authenticated');

-- ==========================================================
-- END
-- ==========================================================
