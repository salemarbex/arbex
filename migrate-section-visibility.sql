-- =============================================
-- SECTION VISIBILITY TABLE
-- Controls which sections are visible on the public site
-- =============================================
DROP TABLE IF EXISTS public.section_visibility;

CREATE TABLE public.section_visibility (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key VARCHAR(50) NOT NULL UNIQUE,
    section_label VARCHAR(100) NOT NULL,
    section_label_ar VARCHAR(100) DEFAULT '',
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.section_visibility DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.section_visibility TO anon;
GRANT ALL ON public.section_visibility TO authenticated;

-- Insert default sections (all visible by default)
INSERT INTO public.section_visibility (section_key, section_label, section_label_ar, is_visible, display_order) VALUES
    ('hero', 'Hero / Video Banner', 'القسم الرئيسي / الفيديو', true, 1),
    ('about', 'About Us', 'من نحن', true, 2),
    ('consultant', 'Consultant', 'المستشار', true, 3),
    ('specialities', 'Specialities', 'التخصصات', true, 4),
    ('accreditation', 'Accreditation', 'الاعتمادات', true, 5),
    ('vision', 'Vision & Mission', 'الرؤية والرسالة', true, 6),
    ('values', 'Our Values', 'قيمنا', true, 7),
    ('awareness', 'Awareness', 'التوعية', true, 8),
    ('clients', 'Clients', 'العملاء', true, 9),
    ('contact', 'Contact Section', 'قسم التواصل', true, 10),
    ('map', 'Google Map', 'خريطة جوجل', true, 11)
ON CONFLICT (section_key) DO UPDATE SET
    section_label = EXCLUDED.section_label,
    section_label_ar = EXCLUDED.section_label_ar,
    display_order = EXCLUDED.display_order;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_section_visibility_updated_at ON public.section_visibility;
CREATE TRIGGER update_section_visibility_updated_at
    BEFORE UPDATE ON public.section_visibility
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
