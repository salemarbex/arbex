import React, { Fragment } from 'react'
import Head from 'next/head'

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

const Home = () => {
    return (
        <Fragment>
            <Head>
                <title>Arbex Law - Legal Consultancy</title>
                <meta name="description" content="Arbex Law - Professional legal consultancy services in Qatar" />
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea" />
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
            <Specialities
                title="How Can We Help You"
                subTitle="Area Of Practice"
            />
            
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