-- =============================================
-- ARABIC LANGUAGE SUPPORT MIGRATION (SAFE)
-- This script ONLY adds new columns and rows.
-- It will NOT delete or modify any existing data.
-- Safe to run multiple times.
-- =============================================

-- Add Arabic columns to awareness table (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='awareness' AND column_name='title_ar') THEN
        ALTER TABLE public.awareness ADD COLUMN title_ar VARCHAR(255) DEFAULT '';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='awareness' AND column_name='subtitle_ar') THEN
        ALTER TABLE public.awareness ADD COLUMN subtitle_ar VARCHAR(255) DEFAULT '';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='awareness' AND column_name='details_ar') THEN
        ALTER TABLE public.awareness ADD COLUMN details_ar TEXT DEFAULT '';
    END IF;
END $$;

-- Add Arabic column to contact_purposes table (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contact_purposes' AND column_name='label_ar') THEN
        ALTER TABLE public.contact_purposes ADD COLUMN label_ar VARCHAR(255) DEFAULT '';
    END IF;
END $$;

-- Insert Arabic content keys for site_content (home, about, consultant)
-- Uses ON CONFLICT DO NOTHING so it won't overwrite any existing values
INSERT INTO public.site_content (section, field_key, field_value) VALUES
    ('home', 'subtitle_ar', ''),
    ('home', 'heading_line1_ar', ''),
    ('home', 'heading_line2_ar', ''),
    ('home', 'button_text_ar', ''),
    ('about', 'title_ar', ''),
    ('about', 'paragraph1_ar', ''),
    ('about', 'paragraph2_ar', ''),
    ('consultant', 'title_ar', ''),
    ('consultant', 'subtitle_ar', ''),
    ('consultant', 'paragraph1_ar', ''),
    ('consultant', 'paragraph2_ar', ''),
    -- Vision & Mission section (English + Arabic)
    ('vision', 'section_title', 'Vision & Mission'),
    ('vision', 'section_subtitle', 'What Drives Us'),
    ('vision', 'vision_title', 'Our Vision'),
    ('vision', 'vision_subtitle', 'What We See'),
    ('vision', 'vision_paragraph1', ''),
    ('vision', 'vision_paragraph2', ''),
    ('vision', 'mission_title', 'Our Mission'),
    ('vision', 'mission_subtitle', 'Why We Do It'),
    ('vision', 'mission_paragraph1', ''),
    ('vision', 'mission_paragraph2', ''),
    ('vision', 'section_title_ar', ''),
    ('vision', 'section_subtitle_ar', ''),
    ('vision', 'vision_title_ar', ''),
    ('vision', 'vision_subtitle_ar', ''),
    ('vision', 'vision_paragraph1_ar', ''),
    ('vision', 'vision_paragraph2_ar', ''),
    ('vision', 'mission_title_ar', ''),
    ('vision', 'mission_subtitle_ar', ''),
    ('vision', 'mission_paragraph1_ar', ''),
    ('vision', 'mission_paragraph2_ar', '')
ON CONFLICT (section, field_key) DO NOTHING;
