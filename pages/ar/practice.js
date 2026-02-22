import React, { Fragment } from 'react'
import Head from 'next/head'
// components 
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import Service from '../../components/Service'
import ServiceArea from '../../components/ServiceArea'
import Testmonial from "../../components/Testmonial"
import PricingTable from "../../components/PricingTable"
import NewsLetter from '../../components/Newsletter'
import { useLanguage } from '../../lib/LanguageContext'

const PracticeArabic = () => {
    const { t } = useLanguage();

    const breadcumbMenu = [
        { name: t('breadcrumb.home'), route: '/ar/home' },
        { name: t('specialities.subtitle') }
    ]

    return (
        <Fragment>
            <Head>
                <title>{t('specialities.subtitle')}</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title={t('specialities.subtitle')}
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            <Service className="bgColor" />
            <ServiceArea
                className="ourServiceAreaStyleThree bgFFF"
                title={t('specialities.title')}
                subTitle={t('specialities.subtitle')}
            />
            <PricingTable
                title="جدول الأسعار"
                subTitle="خطة الأسعار لدينا"
            />
            <Testmonial
                className="pt100"
            />
            <NewsLetter />
        </Fragment>
    )
}
export default PracticeArabic
