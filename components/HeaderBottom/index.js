import React, { useState, Fragment, useEffect } from 'react'
import { InputAdornment, Grid, TextField, Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from "next/router";
import SearchIcon from '@mui/icons-material/Search';

const HeaderBottom = props => {
    const [search, setSearch] = useState()
    const [responsive, setResponsive] = useState(false)
    const [trigger, setTrigger] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    
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
                            <Link href="/home">
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
                            <li><a href="/home/#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
                            <li><a href="/home/#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
                            <li><a href="/home/#consultant" onClick={(e) => scrollToSection(e, 'consultant')}>Consultant</a></li>
                            <li><a href="/home/#specialities" onClick={(e) => scrollToSection(e, 'specialities')}>Specialities</a></li>
                            <li><a href="/home/#accreditation" onClick={(e) => scrollToSection(e, 'accreditation')}>Accreditation</a></li>
                            <li><a href="/home/#clients" onClick={(e) => scrollToSection(e, 'clients')}>Clients</a></li>
                            <li><a href="/home/#vision" onClick={(e) => scrollToSection(e, 'vision')}>Vision</a></li>
                            <li><a href="/home/#awareness" onClick={(e) => scrollToSection(e, 'awareness')}>Awareness</a></li>
                            <li><a href="/home/#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact Us</a></li>
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