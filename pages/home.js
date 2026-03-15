import React, { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// components 
import HeaderTop from '../components/HeaderTop'
import HeaderBottom from '../components/HeaderBottom'
import HeroVideo from '../components/HeroVideo'
import About from '../components/About'
import Consultant from '../components/Consultant'
import Specialities from '../components/Specialities'
import Accreditation from '../components/Accreditation'
import VisionMission from '../components/VisionMission'
import Awareness from '../components/Awareness'
import Clients from '../components/Clients'
import ContactSection from '../components/ContactSection'
import GoogleMap from '../components/GoogleMap'
import { useLanguage } from '../lib/LanguageContext'

const Home = () => {
    const { t } = useLanguage();
    
    return (
        <Fragment>
            <Head>
                <title>{t('pageTitle.home')}</title>
                <meta name="description" content="Arbex Law - Professional legal consultancy services in Qatar" />
            </Head>
            <header className="headerArea headerAreaSpanning">
                <div className="headerSpanningLogo">
                    <Link href="/home">
                        <img src="/images/logo/arbex.png" alt="Arbex Law" />
                    </Link>
                </div>
                <div className="headerContentRight">
                    <HeaderTop className="headerTop" />
                    <HeaderBottom className="headerBottomArea" />
                </div>
            </header>
            
            {/* Home Section with Video */}
            <HeroVideo />
            
            {/* About Us Section - Fetches from Supabase */}
            <About
                fetchFromSupabase={true}
                hideButton={true}
                hideSignature={true}
            />
            
            {/* Consultant Section - Fetches from Supabase */}
            <Consultant
                fetchFromSupabase={true}
            />
            
            {/* Specialities Section */}
            <Specialities />
            
            {/* Accreditation Section */}
            <Accreditation />
            
            {/* Vision & Mission Section */}
            <VisionMission />
            
            {/* Awareness Section */}
            <Awareness />
            
            {/* Clients Section */}
            <Clients />
            
            {/* Contact Us Section */}
            <ContactSection />
            
            {/* Google Maps */}
            <GoogleMap />
        </Fragment>
    )
}
export default Home