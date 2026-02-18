-- Supabase SQL Setup Script
-- Run this in your Supabase SQL Editor to create the necessary tables and storage bucket

-- =============================================
-- STEP 1: Create Admin User
-- =============================================
-- Go to Supabase Dashboard → Authentication → Users → Add User
-- Email: m@wafra.net
-- Password: M0hammadalmarii@132
-- Check "Auto Confirm User"
-- =============================================

-- =============================================
-- SITE CONTENT TABLE (Home, About, Consultant sections)
-- =============================================
DROP TABLE IF EXISTS public.site_content;

CREATE TABLE public.site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section VARCHAR(50) NOT NULL,
    field_key VARCHAR(100) NOT NULL,
    field_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, field_key)
);

ALTER TABLE public.site_content DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.site_content TO anon;
GRANT ALL ON public.site_content TO authenticated;

-- Insert default Home section content
INSERT INTO public.site_content (section, field_key, field_value) VALUES
    ('home', 'subtitle', 'The Most Trusted Legal Firm'),
    ('home', 'heading_line1', 'We Fight For Your Justice'),
    ('home', 'heading_line2', 'As Like A Friend.'),
    ('home', 'show_button', 'true'),
    ('home', 'button_text', 'Contact us now'),
    ('home', 'video_url', '/videos/hero-video.mp4')
ON CONFLICT (section, field_key) DO UPDATE SET field_value = EXCLUDED.field_value;

-- Insert default About section content
INSERT INTO public.site_content (section, field_key, field_value) VALUES
    ('about', 'title', 'About Us'),
    ('about', 'paragraph1', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at'),
    ('about', 'paragraph2', 'and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum'),
    ('about', 'image_url', '/images/about/2.jpg')
ON CONFLICT (section, field_key) DO UPDATE SET field_value = EXCLUDED.field_value;

-- Insert default Consultant section content
INSERT INTO public.site_content (section, field_key, field_value) VALUES
    ('consultant', 'title', 'Consultant'),
    ('consultant', 'subtitle', 'Our Expert'),
    ('consultant', 'paragraph1', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at'),
    ('consultant', 'paragraph2', 'and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum'),
    ('consultant', 'image_url', '/images/about/1.jpg'),
    ('consultant', 'signature_url', '/images/about/1.png')
ON CONFLICT (section, field_key) DO UPDATE SET field_value = EXCLUDED.field_value;

-- =============================================
-- ACCREDITATION LOGOS TABLE
-- =============================================
DROP TABLE IF EXISTS public.accreditation_logos;

CREATE TABLE public.accreditation_logos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.accreditation_logos DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.accreditation_logos TO anon;
GRANT ALL ON public.accreditation_logos TO authenticated;

-- =============================================
-- CLIENT LOGOS TABLE
-- =============================================
DROP TABLE IF EXISTS public.client_logos;

CREATE TABLE public.client_logos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.client_logos DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.client_logos TO anon;
GRANT ALL ON public.client_logos TO authenticated;

-- =============================================
-- AWARENESS TABLE
-- =============================================
DROP TABLE IF EXISTS public.awareness;

CREATE TABLE public.awareness (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    details TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.awareness DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.awareness TO anon;
GRANT ALL ON public.awareness TO authenticated;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
DROP TRIGGER IF EXISTS update_awareness_updated_at ON public.awareness;
CREATE TRIGGER update_awareness_updated_at
    BEFORE UPDATE ON public.awareness
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_content_updated_at ON public.site_content;
CREATE TRIGGER update_site_content_updated_at
    BEFORE UPDATE ON public.site_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accreditation_logos_updated_at ON public.accreditation_logos;
CREATE TRIGGER update_accreditation_logos_updated_at
    BEFORE UPDATE ON public.accreditation_logos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_logos_updated_at ON public.client_logos;
CREATE TRIGGER update_client_logos_updated_at
    BEFORE UPDATE ON public.client_logos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- STORAGE BUCKET SETUP
-- =============================================

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('videos', 'videos', true, 524288000, ARRAY['video/mp4', 'video/webm', 'video/ogg'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop any existing storage policies
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Enable read access for all users" ON storage.objects;
DROP POLICY IF EXISTS "Allow all uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow all updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow all deletes" ON storage.objects;

-- Create permissive policies for storage - allow ALL operations
CREATE POLICY "Allow public read access" ON storage.objects
    FOR SELECT USING (true);

CREATE POLICY "Allow all uploads" ON storage.objects
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all updates" ON storage.objects
    FOR UPDATE USING (true);

CREATE POLICY "Allow all deletes" ON storage.objects
    FOR DELETE USING (true);
