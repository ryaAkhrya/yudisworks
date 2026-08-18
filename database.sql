-- Create Heists Table
CREATE TABLE heists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  image_url TEXT,
  is_redacted BOOLEAN DEFAULT FALSE
);

-- Create Testimonials Table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT NOT NULL,
  text TEXT NOT NULL
);

-- Setup Storage for Heist Images
INSERT INTO storage.buckets (id, name, public) VALUES ('heists', 'heists', true);

-- Enable RLS (Row Level Security)
ALTER TABLE heists ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create Policies for Heists (Public Read, Authenticated Insert/Update/Delete)
CREATE POLICY "Public profiles are viewable by everyone." ON heists
  FOR SELECT USING (true);

CREATE POLICY "Users can insert heists." ON heists
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete heists." ON heists
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create Policies for Testimonials
CREATE POLICY "Testimonials are viewable by everyone." ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Users can insert testimonials." ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete testimonials." ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');
