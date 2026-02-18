import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import Head from 'next/head'
import HeaderTop from '../components/HeaderTop'
import HeaderBottom from '../components/HeaderBottom'
import Breadcumb from '../components/Breadcumb'
import NewsLetter from '../components/Newsletter'
import BlogPost from '../components/BlogPost'

const breadcumbMenu = [
    {
        name: 'Home',
        route: '/'
    },
    { name: 'Blogs' }
]

const BlogFullwidth = () => {
    return (
        <Fragment>
            <Head>
                <title>Blogs</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title="News"
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            <Grid className="blogPostArea blogPostLeftArea">
                <Grid container spacing={4} className="container">
                    <Grid item xs={12}>
                        <BlogPost />
                    </Grid>
                </Grid>
            </Grid>
            <NewsLetter />
        </Fragment>
    )
}
export default BlogFullwidth