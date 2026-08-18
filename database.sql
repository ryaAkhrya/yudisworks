-- =========================================
-- YUDISWORKS — Full Database Schema
-- Run this in Supabase SQL Editor
-- =========================================

-- Drop old table if migrating
DROP TABLE IF EXISTS heists CASCADE;

-- =========================================
-- TESTIMONIALS
-- =========================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT NOT NULL,
  text TEXT NOT NULL
);

-- =========================================
-- PROJECT CATEGORIES
-- =========================================
CREATE TABLE project_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  accent_color TEXT DEFAULT '#CE0000'
);

-- =========================================
-- PROJECT ITEMS
-- =========================================
CREATE TABLE project_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category_id UUID REFERENCES project_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'CLASSIFIED',
  image_urls TEXT[] DEFAULT '{}',
  is_redacted BOOLEAN DEFAULT FALSE
);

-- =========================================
-- STORAGE BUCKETS
-- =========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', true)
ON CONFLICT DO NOTHING;

-- =========================================
-- ROW LEVEL SECURITY
-- =========================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_items ENABLE ROW LEVEL SECURITY;

-- Testimonials Policies
CREATE POLICY "testimonials_select_public" ON testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_insert_auth" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "testimonials_delete_auth" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Project Categories Policies
CREATE POLICY "categories_select_public" ON project_categories FOR SELECT USING (true);
CREATE POLICY "categories_insert_auth" ON project_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "categories_delete_auth" ON project_categories FOR DELETE USING (auth.role() = 'authenticated');

-- Project Items Policies
CREATE POLICY "items_select_public" ON project_items FOR SELECT USING (true);
CREATE POLICY "items_insert_auth" ON project_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "items_delete_auth" ON project_items FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Policy for project-files
CREATE POLICY "project_files_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-files');

CREATE POLICY "project_files_auth_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-files' AND auth.role() = 'authenticated');

CREATE POLICY "project_files_auth_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'project-files' AND auth.role() = 'authenticated');
