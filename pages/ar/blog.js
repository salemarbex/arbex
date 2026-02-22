import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import Head from 'next/head'
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import NewsLetter from '../../components/Newsletter'
import SearchSidebar from '../../components/SearchSidebar'
import CetagorySidebar from '../../components/CetagorySidebar'
import RecentPosts from '../../components/RecentPosts'
import BlogPost from '../../components/BlogPost'
import Tags from '../../components/Tags'
import Instagram from '../../components/Instagram'
import { useLanguage } from '../../lib/LanguageContext'

const BlogArabic = () => {
    const { t } = useLanguage();

    const breadcumbMenu = [
        { name: t('breadcrumb.home'), route: '/ar/home' },
        { name: 'المدونة' }
    ]

    return (
        <Fragment>
            <Head>
                <title>المدونة</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title="الأخبار"
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            <Grid className="blogPostArea blogPostLeftArea">
                <Grid container spacing={4} className="container">
                    <Grid item md={4} xs={12}>
                        <aside>
                            <SearchSidebar />
                            <CetagorySidebar
                                title="تصنيفات المدونة"
                            />
                            <RecentPosts />
                            <Tags />
                            <Instagram />
                        </aside>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <BlogPost />
                    </Grid>
                </Grid>
            </Grid>
            <NewsLetter />
        </Fragment>
    )
}
export default BlogArabic
