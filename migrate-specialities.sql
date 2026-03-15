-- =========================================
-- Specialities (Area of Practice) Table
-- =========================================

-- Section heading content (stored in site_content table)
INSERT INTO site_content (section, field_key, field_value) VALUES
    ('specialities', 'title', 'How Can We Help You'),
    ('specialities', 'subtitle', 'Area Of Practice'),
    ('specialities', 'title_ar', 'كيف يمكننا مساعدتك'),
    ('specialities', 'subtitle_ar', 'مجالات الممارسة')
ON CONFLICT (section, field_key) DO UPDATE SET field_value = EXCLUDED.field_value;

-- Specialities cards table
CREATE TABLE IF NOT EXISTS specialities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    icon VARCHAR(100) NOT NULL DEFAULT 'fi flaticon-scale',
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    title_ar VARCHAR(255) DEFAULT '',
    content_ar TEXT DEFAULT '',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE specialities ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on specialities"
    ON specialities FOR SELECT
    USING (true);

-- Allow authenticated users to manage
CREATE POLICY "Allow authenticated insert on specialities"
    ON specialities FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update on specialities"
    ON specialities FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete on specialities"
    ON specialities FOR DELETE
    TO authenticated
    USING (true);

-- Seed with default data
INSERT INTO specialities (icon, title, content, title_ar, content_ar, display_order) VALUES
    ('fi flaticon-parents', 'Family Law', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'قانون الأسرة', 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي.', 1),
    ('fi flaticon-wounded', 'Personal Injury', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'الإصابة الشخصية', 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي.', 2),
    ('fi flaticon-employee', 'Business Law', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'قانون الأعمال', 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي.', 3),
    ('fi flaticon-thief', 'Criminal Law', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'القانون الجنائي', 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي.', 4),
    ('fi flaticon-university-graduate-hat', 'Education Law', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'قانون التعليم', 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي.', 5),
    ('fi flaticon-house', 'Real Estate Law', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'قانون العقارات', 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي.', 6);
