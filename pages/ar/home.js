import React, { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// components 
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import HeroVideo from '../../components/HeroVideo'
import About from '../../components/About'
import Consultant from '../../components/Consultant'
import Specialities from '../../components/Specialities'
import Accreditation from '../../components/Accreditation'
import VisionMission from '../../components/VisionMission'
import OurValues from '../../components/OurValues'
import Awareness from '../../components/Awareness'
import Clients from '../../components/Clients'
import ContactSection from '../../components/ContactSection'
import GoogleMap from '../../components/GoogleMap'
import { useLanguage } from '../../lib/LanguageContext'
import { useSectionVisibility } from '../../lib/useSectionVisibility'

const HomeArabic = () => {
    const { t } = useLanguage();
    const { isSectionVisible } = useSectionVisibility();
    
    return (
        <Fragment>
            <Head>
                <title>{t('pageTitle.home')}</title>
                <meta name="description" content="أربكس للمحاماة - خدمات الاستشارات القانونية المهنية في قطر" />
            </Head>
            <header className="headerArea headerAreaSpanning">
                <div className="headerSpanningLogo">
                    <Link href="/ar/home">
                        <img src="/images/logo/arbex.png" alt="أربكس للمحاماة" />
                    </Link>
                </div>
                <div className="headerContentRight">
                    <HeaderTop className="headerTop" />
                    <HeaderBottom className="headerBottomArea" />
                </div>
            </header>
            
            {/* قسم الصفحة الرئيسية مع الفيديو */}
            {isSectionVisible('hero') && <HeroVideo />}
            
            {/* قسم من نحن - يجلب من Supabase */}
            {isSectionVisible('about') && (
            <About
                fetchFromSupabase={true}
                hideButton={true}
                hideSignature={true}
            />
            )}
            
            {/* قسم المستشار - يجلب من Supabase */}
            {isSectionVisible('consultant') && (
            <Consultant
                fetchFromSupabase={true}
            />
            )}
            
            {/* قسم التخصصات */}
            {isSectionVisible('specialities') && <Specialities />}
            
            {/* قسم الاعتمادات */}
            {isSectionVisible('accreditation') && <Accreditation />}
            
            {/* قسم الرؤية والمهمة */}
            {isSectionVisible('vision') && <VisionMission />}
            
            {/* قسم قيمنا */}
            {isSectionVisible('values') && <OurValues />}
            
            {/* قسم التوعية */}
            {isSectionVisible('awareness') && <Awareness />}
            
            {/* قسم العملاء */}
            {isSectionVisible('clients') && <Clients />}
            
            {/* قسم اتصل بنا */}
            {isSectionVisible('contact') && <ContactSection />}
            
            {/* خريطة جوجل */}
            {isSectionVisible('map') && <GoogleMap />}
        </Fragment>
    )
}
export default HomeArabic
