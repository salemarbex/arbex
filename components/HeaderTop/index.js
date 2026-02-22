import React from 'react'
import { Grid, Hidden } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';

const HeaderTop = props => {
    const { t, locale } = useLanguage();
    const homePath = locale === 'ar' ? '/ar/home' : '/home';
    
    return (
        <Grid className={props.className}>
            <Grid
                container
                alignItems="center"
                className="container headerTopMainWrapper">
                <Grid item sm={6} md={5} lg={5} xs={12}>
                    <ul className="d-flex accountLoginArea">
                        <li><a href={`${homePath}#map`} style={{ color: 'inherit', textDecoration: 'none' }}><PlaceIcon /> {t('header.address')}</a></li>
                    </ul>
                </Grid>
                <Grid item sm={6} md={4} lg={5} xs={12}>
                    <ul className="headerContact">
                        <li><PhoneAndroidIcon /> <a href="tel:+97470202010">{t('header.phone')}</a></li>
                        <li><QueryBuilderIcon /> {t('header.hours')}</li>
                    </ul>
                </Grid>
                <Hidden smDown>
                    <Grid item lg={2} md={3} xs={12} className="text-right">
                        <Link className="btnStyle btnOutlined btnRadius" href={`${homePath}#contact`}>{t('nav.consult')}</Link>
                    </Grid>
                </Hidden>
            </Grid>
        </Grid>
    )
}
export default HeaderTop