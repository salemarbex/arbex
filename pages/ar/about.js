import React, { Fragment } from 'react'
import Head from 'next/head'
// components 
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import Service from '../../components/Service'
import About from '../../components/About'
import ServiceArea from '../../components/ServiceArea'
import Testmonial from "../../components/Testmonial"
import TeamMember from '../../components/TeamMember'
import CounterArea from '../../components/CounterArea'
import BlogArea from '../../components/BlogArea'
import NewsLetter from '../../components/Newsletter'
import { useLanguage } from '../../lib/LanguageContext'

const aboutText = [
    'خلافاً للاعتقاد السائد، ليس نص لوريم إيبسوم مجرد نص عشوائي. له جذور في أدب لاتيني كلاسيكي من عام 45 قبل الميلاد، مما يجعله أكثر من 2000 عام. ريتشارد مكلينتوك، أستاذ اللاتينية في',
    'ومن خلال البحث في الكلمات في الأدب الكلاسيكي، اكتشف المصدر الذي لا شك فيه. يأتي لوريم إيبسوم من الأقسام 1.10.32 و 1.10.33 من "حول حدود الخير والشر"'
]
const breadcumbMenu = [
    { name: 'الرئيسية', route: '/ar/home' },
    { name: 'من نحن' }
]

const AboutPageArabic = () => {
    const { t } = useLanguage();
    
    return (
        <Fragment>
            <Head>
                <title>{t('pageTitle.about')}</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title={t('breadcrumb.aboutUs')}
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            <Service className="bgColor" />
            <About
                className="aboutAreaStyleTwo"
                title={t('about.subtitle')}
                subTitle={t('about.subTitle2')}
                images="/images/about/1.jpg"
                pragraphs={aboutText}
                changeOrder="changeOrder"
            />
            <ServiceArea
                className="ourServiceAreaStyleTwo"
                title={t('specialities.title')}
                subTitle={t('specialities.subtitle')}
            />
            <Testmonial />
            <CounterArea
                fullWidth={true}
                className="counterAreaStyleTwo"
            />
            <TeamMember
                title="المحامون المؤهلون"
                subTitle="تعرف على خبرائنا"
                slider={true}
            />
            <BlogArea className="blogArea"
                title="آخر الأخبار"
                subTitle="من مدونتنا"
            />
            <NewsLetter />
        </Fragment>
    )
}
export default AboutPageArabic
