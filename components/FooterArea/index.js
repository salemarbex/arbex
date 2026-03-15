import React from 'react'
import Link from 'next/link'
import { Grid } from '@mui/material'
import { useLanguage } from '../../lib/LanguageContext'

const FooterArea = () => {
    const { t, locale } = useLanguage();
    const homePath = locale === 'ar' ? '/ar/home' : '/home';

    const footerLinks = [
        {
            title: t('footer.quickLink'), menus: [
                { name: t('nav.home'), route: `${homePath}#home` },
                { name: t('nav.about'), route: `${homePath}#about` },
                { name: t('nav.consultant'), route: `${homePath}#consultant` },
                { name: t('nav.specialities'), route: `${homePath}#specialities` },
                { name: t('nav.accreditation'), route: `${homePath}#accreditation` },
                { name: t('nav.clients'), route: `${homePath}#clients` },
            ]
        },
        {
            title: t('footer.moreLinks'), menus: [
                { name: t('nav.vision'), route: `${homePath}#vision` },
                { name: t('nav.awareness'), route: `${homePath}#awareness` },
                { name: t('nav.contact'), route: `${homePath}#contact` },
            ]
        },
    ];

    return (
        <footer className="footerArea">
            <Grid className="footerTopArea">
                <Grid
                    container
                    spacing={3}
                    className="container">
                    <Grid item lg={3} sm={6} xs={12}>
                        <Grid className="footerLogo">
                            <Link href={homePath}>
                                <img src="/images/logo/arbex.png" alt="Arbex Law" />
                            </Link>
                            <p>{t('footer.description')}</p>
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
                            <h3>{t('footer.contactUs')}</h3>
                            <ul>
                                <li className="addressText">{t('footer.headOffice')}</li>
                                <li className="addressText">{t('contact.addressLine1')}</li>
                                <li className="addressText">{t('contact.addressLine2')}</li>
                                <li className="addressText">{t('contact.addressLine3')}</li>
                                <li>{t('contact.phone')}: <a href="tel:+97470202010">{t('header.phone')}</a></li>
                                <li><a href="mailto:info@arbex.law">{t('contact.email')}: info@arbex.law</a></li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="footerBottomArea">
                <Grid container spacing={3} className="container" alignItems="center">
                    <Grid item md={8} sm={10} xs={12}>
                        <span className="copyrightText">
                            {t('footer.copyright')} 
                            <a href="https://wafra.net" target="_blank" rel="noopener noreferrer" className="wafraLink">
                                <img src="/images/wafra_logo.png" alt="WAFRA" className="wafraLogo" />
                                {locale === 'ar' ? 'الوفرة' : 'WAFRA'}
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