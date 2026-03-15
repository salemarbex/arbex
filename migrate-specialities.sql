-- =========================================
-- Specialities (Area of Practice) Table
-- FRESH INSTALL: drops and recreates everything
-- =========================================

-- Drop existing table (cascades policies)
DROP TABLE IF EXISTS specialities CASCADE;

-- Section heading content (stored in site_content table)
INSERT INTO site_content (section, field_key, field_value) VALUES
    ('specialities', 'title', 'Our Specialties'),
    ('specialities', 'subtitle', 'Area Of Practice'),
    ('specialities', 'title_ar', 'اختصاصاتنا'),
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

-- Seed with specialities
INSERT INTO specialities (icon, title, content, title_ar, content_ar, display_order) VALUES
    (
        'fi flaticon-scale',
        'Local and International Arbitration',
        'We provide expert arbitration services in commercial, engineering, and technical disputes at both local and international levels, ensuring fair and efficient resolution.',
        'التحكيم التجاري والهندسي والتقني المحلي والدولي',
        'نقدم خدمات تحكيم متخصصة في النزاعات التجارية والهندسية والتقنية على المستويين المحلي والدولي، لضمان حل عادل وفعّال.',
        1
    ),
    (
        'fi flaticon-lawyer',
        'Technical Reports & Expert Opinions',
        'We prepare comprehensive technical reports and expert opinions to support legal cases, combining deep technical knowledge with legal precision.',
        'إعداد التقارير والخبرة الفنية للقضايا القانونية',
        'نعدّ تقارير فنية شاملة وآراء خبراء لدعم القضايا القانونية، بالجمع بين المعرفة التقنية العميقة والدقة القانونية.',
        2
    ),
    (
        'fi flaticon-parents',
        'Mediation & Dispute Resolution',
        'Our mediation services help parties reach amicable settlements through structured negotiation, saving time and costs compared to traditional litigation.',
        'الوساطة وتسوية المنازعات',
        'تساعد خدمات الوساطة لدينا الأطراف على التوصل إلى تسويات ودية من خلال التفاوض المنظم، مما يوفر الوقت والتكاليف مقارنة بالتقاضي التقليدي.',
        3
    ),
    (
        'fi flaticon-employee',
        'Negotiation & Technical Representation',
        'We represent clients in technical negotiations, advocating for their interests with expertise and professionalism before all relevant parties.',
        'التفاوض والتمثيل الفني أمام الأطراف',
        'نمثل العملاء في المفاوضات التقنية، وندافع عن مصالحهم بخبرة واحترافية أمام جميع الأطراف المعنية.',
        4
    ),
    (
        'fi flaticon-network',
        'Technical Consultancy',
        'We offer specialized technical consultancy for contracts and projects, ensuring compliance with standards and optimizing outcomes for all stakeholders.',
        'الاستشارات التقنية للعقود والمشاريع',
        'نقدم استشارات تقنية متخصصة للعقود والمشاريع، لضمان الامتثال للمعايير وتحقيق أفضل النتائج لجميع الأطراف.',
        5
    ),
    (
        'fi flaticon-house',
        'Project Management & Evaluation',
        'Our team manages and evaluates technical projects from inception to completion, applying rigorous methodologies to deliver measurable results.',
        'إدارة وتقييم المشاريع التقنية',
        'يدير فريقنا المشاريع التقنية ويقيّمها من البداية حتى الإنجاز، بتطبيق منهجيات صارمة لتحقيق نتائج قابلة للقياس.',
        6
    ),
    (
        'fi flaticon-thief',
        'IT Audit',
        'We conduct thorough IT audits to assess system integrity, security vulnerabilities, and compliance, providing actionable recommendations for improvement.',
        'تدقيق نظم المعلومات',
        'نجري عمليات تدقيق شاملة لتقنية المعلومات لتقييم سلامة الأنظمة والثغرات الأمنية والامتثال، مع تقديم توصيات عملية للتحسين.',
        7
    ),
    (
        'fi flaticon-university-graduate-hat',
        'Systems & Infrastructure Analysis',
        'We analyze organizational systems and infrastructure to identify gaps, optimize performance, and recommend strategic technology solutions.',
        'تحليل الأنظمة والبنى التحتية',
        'نحلل الأنظمة والبنى التحتية المؤسسية لتحديد الثغرات وتحسين الأداء والتوصية بحلول تقنية استراتيجية.',
        8
    ),
    (
        'fi flaticon-wounded',
        'Judicial & Committee Support',
        'We provide impartial and specialized expert opinions to support judicial authorities and technical committees in reaching well-informed decisions.',
        'دعم الجهات القضائية واللجان الفنية برأي محايد ومتخصص',
        'نقدم آراء خبراء محايدة ومتخصصة لدعم الجهات القضائية واللجان الفنية في اتخاذ قرارات مستنيرة.',
        9
    );
