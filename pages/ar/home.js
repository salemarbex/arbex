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
import Awareness from '../../components/Awareness'
import Clients from '../../components/Clients'
import ContactSection from '../../components/ContactSection'
import GoogleMap from '../../components/GoogleMap'
import { useLanguage } from '../../lib/LanguageContext'

const HomeArabic = () => {
    const { t } = useLanguage();
    
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
            <HeroVideo />
            
            {/* قسم من نحن - يجلب من Supabase */}
            <About
                fetchFromSupabase={true}
                hideButton={true}
                hideSignature={true}
            />
            
            {/* قسم المستشار - يجلب من Supabase */}
            <Consultant
                fetchFromSupabase={true}
            />
            
            {/* قسم التخصصات */}
            <Specialities />
            
            {/* قسم الاعتمادات */}
            <Accreditation />
            
            {/* قسم الرؤية والمهمة */}
            <VisionMission />
            
            {/* قسم التوعية */}
            <Awareness />
            
            {/* قسم العملاء */}
            <Clients />
            
            {/* قسم اتصل بنا */}
            <ContactSection />
            
            {/* خريطة جوجل */}
            <GoogleMap />
        </Fragment>
    )
}
export default HomeArabic
