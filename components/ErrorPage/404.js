import React from 'react'
import Link from 'next/link'
import { Button, Grid } from '@mui/material'
const Error = () => {

    return (

        <section className="error-page">

            <Grid container spacing={4} className="container">
                <Grid item xs={12}>
                    <div className="image">
                        <img src="/images/404.png" alt="" />
                    </div>
                    <h2>Oops! Page Not Found!</h2>
                    <p>We’re sorry but we can’t seem to find the page you requested. This might be because you have typed the web address incorrectly.</p>
                    <Link href='/home' className="btnStyle">
                        Back to home
                    </Link>
                </Grid>
            </Grid>
        </section>
    )
}
export default Error








