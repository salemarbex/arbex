import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import Head from 'next/head'
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import NewsLetter from '../../components/Newsletter'
import Form from '../../components/Form'
import { useLanguage } from '../../lib/LanguageContext'

const ContactArabic = () => {
    const { t } = useLanguage();

    const breadcumbMenu = [
        { name: t('breadcrumb.home'), route: '/ar/home' },
        { name: t('nav.contact') },
    ]

    return (
        <Fragment>
            <Head>
                <title>{t('nav.contact')}</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                className="breadcumbArea"
                title={t('nav.contact')}
                breadcumbMenu={breadcumbMenu}
                background="/images/breadcumb/1.jpg"
            />

            <Grid className="contactusPageArea">
                <Grid container spacing={2} className="container">
                    <Grid item md={5} xs={12}>
                        <Grid className="contactUsInfo">
                            <h3>{t('contact.title')}</h3>
                            <p>{t('contact.description')}</p>
                            <h4>{t('contact.address')}</h4>
                            <span>{t('contact.addressLine1')}</span>
                            <span>{t('contact.addressLine2')}</span>
                            <span>{t('contact.addressLine3')}</span>
                            <h4>{t('contact.phone')}</h4>
                            <span>{t('header.phone')}</span>
                            <h4>{t('contact.email')}</h4>
                            <span>info@arbex.law</span>
                        </Grid>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Grid className="contactUSForm">
                            <h3>{t('contact.formTitle')}</h3>
                            <Form
                                addressInfo={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <NewsLetter />
        </Fragment>
    )
}
export default ContactArabic
