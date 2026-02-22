import React, { Fragment } from 'react'
import Head from 'next/head'
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import TeamMember from '../../components/TeamMember'
import NewsLetter from '../../components/Newsletter'
import { useLanguage } from '../../lib/LanguageContext'

const TeamArabic = () => {
    const { t } = useLanguage();

    const breadcumbMenu = [
        { name: t('breadcrumb.home'), route: '/ar/home' },
        { name: 'المحامون' }
    ]

    return (
        <Fragment>
            <Head>
                <title>المحامون</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title="محامونا"
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            <TeamMember
                title="المحامون المؤهلون"
                subTitle="تعرف على خبرائنا"
                className="ptb100"
                noGutters={true}
            />
            <NewsLetter />
        </Fragment>
    )
}
export default TeamArabic
