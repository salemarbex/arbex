import React, { Fragment } from 'react'
import Head from 'next/head'


// components 
import HeaderTop from '../../components/HeaderTop'
import HeaderBottom from '../../components/HeaderBottom'
import Breadcumb from '../../components/Breadcumb'
import Error from '../../components/ErrorPage/404'


const breadcumbMenu = [
    { name: 'Home', route: '/' },
    { name: '404' }
]

const error = () => {
    return (
        <Fragment>
            <Head>
                <title>404</title>
            </Head>
            <header className="headerArea">
                <HeaderTop className="headerTop" />
                <HeaderBottom className="headerBottomArea headerBottomAreaStyelTwo" />
            </header>
            <Breadcumb
                title="404"
                breadcumbMenu={breadcumbMenu}
                background='/images/breadcumb/1.jpg'
            />
            < Error />


        </Fragment>
    )
}
export default error