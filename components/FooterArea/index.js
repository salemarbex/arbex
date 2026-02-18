import React from 'react'
import Link from 'next/link'
import { Grid } from '@mui/material'

const footerLinks = [
    {
        title: 'Quick Link', menus: [
            { name: 'Home', route: '/home/#home' },
            { name: 'About', route: '/home/#about' },
            { name: 'Consultant', route: '/home/#consultant' },
            { name: 'Specialities', route: '/home/#specialities' },
            { name: 'Accreditation', route: '/home/#accreditation' },
            { name: 'Clients', route: '/home/#clients' },
        ]
    },
    {
        title: 'More Links', menus: [
            { name: 'Vision & Mission', route: '/home/#vision' },
            { name: 'Awareness', route: '/home/#awareness' },
            { name: 'Contact Us', route: '/home/#contact' },
        ]
    },
]

const FooterArea = () => {
    return (
        <footer className="footerArea">
            <Grid className="footerTopArea">
                <Grid
                    container
                    spacing={3}
                    className="container">
                    <Grid item lg={3} sm={6} xs={12}>
                        <Grid className="footerLogo">
                            <Link href="/home">
                                <img src="/images/logo/arbex.png" alt="Arbex Law" />
                            </Link>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature</p>
                        </Grid>
                    </Grid>
                    {footerLinks.map((menu, i) => (
                        <Grid key={i} item lg={3} sm={6} xs={12}>
                            <div className="footerWrap">
                                <h3>{menu.title}</h3>
                                <ul>
                                    {menu.menus.map((item, i) => (
                                        <li key={i}><Link href={`${item.route}`}>{item.name}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </Grid>
                    ))}
                    <Grid item lg={3} sm={6} xs={12}>
                        <div className="footerWrap footerContact">
                            <h3>Contact Us</h3>
                            <ul>
                                <li className="addressText">Head Office Address</li>
                                <li className="addressText">Zone 32, Street 958, Building 52,</li>
                                <li className="addressText">Floor 1, Office 6, Doha, Qatar</li>
                                <li><a href="tel:+97470202010">Phone: +974 70202010</a></li>
                                <li><a href="mailto:info@arbex.law">Email: info@arbex.law</a></li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="footerBottomArea">
                <Grid container spacing={3} className="container" alignItems="center">
                    <Grid item md={8} sm={10} xs={12}>
                        <span className="copyrightText">
                            All rights reserved © 2026 ARBEX | Powered by 
                            <a href="https://wafra.net" target="_blank" rel="noopener noreferrer" className="wafraLink">
                                <img src="/images/wafra_logo.png" alt="WAFRA" className="wafraLogo" />
                                WAFRA
                            </a>
                        </span>
                    </Grid>
                    <Grid item md={4} sm={2} xs={12}>
                        <ul className="socialListFooter">
                            <li><a href="#"><i className='fa fa-facebook'></i></a></li>
                            <li><a href="#"><i className='fa fa-twitter'></i></a></li>
                            <li><a href="#"><i className='fa fa-instagram'></i></a></li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}
export default FooterArea