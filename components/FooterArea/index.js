import React from 'react'
import Link from 'next/link'
import { Grid } from '@mui/material'
import { useLanguage } from '../../lib/LanguageContext'
import { useSectionVisibility } from '../../lib/useSectionVisibility'

const FooterArea = () => {
    const { t, locale } = useLanguage();
    const { isSectionVisible } = useSectionVisibility();
    const homePath = locale === 'ar' ? '/ar/home' : '/home';

    const allQuickLinks = [
        { name: t('nav.home'), route: `${homePath}#home`, visibilityKey: 'hero' },
        { name: t('nav.about'), route: `${homePath}#about`, visibilityKey: 'about' },
        { name: t('nav.consultant'), route: `${homePath}#consultant`, visibilityKey: 'consultant' },
        { name: t('nav.specialities'), route: `${homePath}#specialities`, visibilityKey: 'specialities' },
        { name: t('nav.accreditation'), route: `${homePath}#accreditation`, visibilityKey: 'accreditation' },
        { name: t('nav.clients'), route: `${homePath}#clients`, visibilityKey: 'clients' },
    ];

    const allMoreLinks = [
        { name: t('nav.vision'), route: `${homePath}#vision`, visibilityKey: 'vision' },
        { name: t('nav.awareness'), route: `${homePath}#awareness`, visibilityKey: 'awareness' },
        { name: t('nav.contact'), route: `${homePath}#contact`, visibilityKey: 'contact' },
    ];

    const footerLinks = [
        {
            title: t('footer.quickLink'),
            menus: allQuickLinks.filter(item => isSectionVisible(item.visibilityKey))
        },
        {
            title: t('footer.moreLinks'),
            menus: allMoreLinks.filter(item => isSectionVisible(item.visibilityKey))
        },
    ].filter(group => group.menus.length > 0);

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
                            <li><a href="https://wa.me/97470202010" target="_blank" rel="noopener noreferrer"><i className='fa fa-whatsapp'></i></a></li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}
export default FooterArea