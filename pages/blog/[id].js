import React, { Fragment } from 'react'
import Head from 'next/head'
import { Grid } from '@mui/material'
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import CetagorySidebar from '../../components/CetagorySidebar'
import SearchSidebar from '../../components/SearchSidebar'
import RecentPosts from '../../components/RecentPosts'
import Tags from '../../components/Tags'
import Instagram from '../../components/Instagram'


const blogs = [
    {
        image: '/images/blog-page/1.jpg',
        title: 'What lawyer can do for you',
        text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        avatar: '/images/blog-page/6.jpg',
        name: 'By Aliza anne',
        level: 'Family Law',
        date: 'Feb 12,2020',
        id: 1
    },
    {
        image: '/images/blog-page/2.jpg',
        title: 'who do not know how to pursue pleasure',
        text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        avatar: '/images/blog-page/6.jpg',
        name: 'Kaji Hasib',
        level: 'Business Law',
        date: 'Jan 12,2020',
        id: 2
    },
    {
        image: '/images/blog-page/3.jpg',
        title: 'How you can find the best justice',
        text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        avatar: '/images/blog-page/6.jpg',
        name: 'Jone doe',
        level: 'Business Law',
        date: 'Oct 12,2020',
        id: 3
    },
    {
        image: '/images/blog-page/4.jpg',
        title: 'who do not know how to pursue pleasure',
        text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        avatar: '/images/blog-page/6.jpg',
        name: 'Alex Jon',
        level: 'Company Law',
        date: 'Nov 12,2020',
        id: 4
    },
    {
        image: '/images/blog-page/5.jpg',
        title: 'What lawyer can do for you',
        text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        avatar: '/images/blog-page/6.jpg',
        name: 'Alex Jon',
        level: 'Company Law',
        date: 'Nov 12,2020',
        id: 5
    },
]

function getPostDataById(id) {
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === parseInt(id)) {
            return blogs[i];
        }
    }
}

const BlogDetails = ({ id }) => {
    const blog = getPostDataById(id);
    const breadcumbMenu = [
        { name: 'Home', route: '/' },
        { name: 'Practice', route: '/practice' },
        { name: blog.title }
    ]
    return (
        <Fragment>
            <Head>
                <title>Blog {blog.title}</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title={blog.title}
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            <Grid className="singleArea ptb100">
                <Grid container spacing={4} className="container">
                    <Grid item md={8}>
                        <Grid className="blogPostWrapper mb0">
                            <Grid className="blogPostImg">
                                <img src={blog.image} alt={blog.title} />
                            </Grid>
                            <Grid className="blogPostContent">
                                <ul className="blogPostMeta">
                                    <li><img src={blog.avatar} alt={blog.name} /></li>
                                    <li>{blog.name}</li>
                                    <li>{blog.level}</li>
                                    <li>{blog.date}</li>
                                </ul>
                                <h3>{blog.title}</h3>
                                <p>{blog.text}</p>
                                <p style={{ marginBottom: "20px" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi cupiditate perferendis tenetur dolorem sunt necessitatibus quasi ullam, nihil, magni distinctio ipsa minus assumenda maiores doloribus voluptatem quas consectetur possimus suscipit praesentium reprehenderit. Pariatur reprehenderit eius nostrum libero dicta cum nobis.</p>
                            </Grid>
                            <Grid className="importent-section">
                                <Grid className="importent-img">
                                    <img src="/images/blog-details/1.jpg" alt="" />
                                </Grid>
                                <Grid className="importent-text" style={{ marginTop: "20px" }}>
                                    <h2>The display is most important</h2>
                                    <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                                    <p>because it is pleasure, but because those who do not know how to pursue pleasure</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <aside className="pr25">
                            <SearchSidebar />
                            <CetagorySidebar title="Blog Category" />
                            <RecentPosts />
                            <Tags />
                            <Instagram />
                        </aside>
                    </Grid>
                </Grid>
            </Grid>
           
        </Fragment>
    );
}
export default BlogDetails

BlogDetails.getInitialProps = async ({ query }) => {
    const { id } = query;
    return { id };
};