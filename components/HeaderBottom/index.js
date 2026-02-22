import React, { useState, Fragment, useEffect } from 'react'
import { InputAdornment, Grid, TextField, Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import { useLanguage } from '../../lib/LanguageContext';

const HeaderBottom = props => {
    const [search, setSearch] = useState()
    const [responsive, setResponsive] = useState(false)
    const [trigger, setTrigger] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { t, locale, switchLanguage } = useLanguage();
    
    const homePath = locale === 'ar' ? '/ar/home' : '/home';
    
    const clickHandler = () => {
        setTrigger(!trigger)
    }
    const responsiveHandler = () => {
        setResponsive(!responsive)
    }
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setResponsive(false);
    };

    const menuItems = [
        { id: 'home', label: t('nav.home') },
        { id: 'about', label: t('nav.about') },
        { id: 'consultant', label: t('nav.consultant') },
        { id: 'specialities', label: t('nav.specialities') },
        { id: 'accreditation', label: t('nav.accreditation') },
        { id: 'clients', label: t('nav.clients') },
        { id: 'vision', label: t('nav.vision') },
        { id: 'awareness', label: t('nav.awareness') },
        { id: 'contact', label: t('nav.contact') },
    ];

    return (
        <Fragment>
            {trigger && <Grid className="backdrop" onClick={clickHandler} ></Grid>}
            <Grid className={`${props.className} ${isScrolled ? 'stickyHeader' : ''}`}>
                <Grid
                    container
                    alignItems="center"
                    className="container">
                    <Grid item xs={8} sm={6} md={3} className="logoGridItem">
                        <Grid className="logo">
                            <Link href={homePath}>
                                <img src="/images/logo/arbex.png" alt="Arbex Law" />
                            </Link>
                            <span className="logoDivider"></span>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}
                        className={responsive ?
                            "responsiveWrapper active" :
                            "responsiveWrapper"}>
                        <ul className="mainMenuWrap">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <a href={`${homePath}#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li className="langNavItem">
                                <a
                                    href={locale === 'en' ? '/ar/home' : '/home'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        switchLanguage(locale === 'en' ? 'ar' : 'en');
                                        setResponsive(false);
                                    }}
                                >
                                    {locale === 'en' ? 'العربية' : 'English'}
                                </a>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={4} sm={6} md={1}>
                        <Grid className="searchMenuWrapper">
                            <Grid onClick={responsiveHandler} className="responsiveTrigger">
                                <span className="first"></span>
                                <span className="second"></span>
                                <span className="third"></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default HeaderBottom