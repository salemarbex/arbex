import React from 'react'
import { Grid, Hidden } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Link from 'next/link';
const HeaderTop = props => {
    return (
        <Grid className={props.className}>
            <Grid
                container
                alignItems="center"
                className="container headerTopMainWrapper">
                <Grid item sm={6} md={5} lg={5} xs={12}>
                    <ul className="d-flex accountLoginArea">
                        <li><PlaceIcon /> Zone 32, Street 958, Building 52, Floor 1, Office 6, Doha, Qatar</li>
                    </ul>
                </Grid>
                <Grid item sm={6} md={4} lg={5} xs={12}>
                    <ul className="headerContact">
                        <li><PhoneAndroidIcon /> +974 70202010</li>
                        <li><QueryBuilderIcon /> 9AM - 6PM</li>
                    </ul>
                </Grid>
                <Hidden smDown>
                    <Grid item lg={2} md={3} xs={12} className="text-right">
                        <Link className="btnStyle btnOutlined btnRadius" href="/home/#contact">Consult</Link>
                    </Grid>
                </Hidden>
            </Grid>
        </Grid>
    )
}
export default HeaderTop