import React from 'react'
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { useLanguage } from '../../lib/LanguageContext'

const values = [
    { en: 'Accuracy', ar: 'الدقة', icon: 'flaticon-target' },
    { en: 'Neutrality', ar: 'الحياد', icon: 'flaticon-balance' },
    { en: 'Reliability', ar: 'الموثوقية', icon: 'flaticon-shield' },
    { en: 'Professionalism', ar: 'الاحتراف', icon: 'flaticon-businessman' },
    { en: 'Confidentiality', ar: 'السرية', icon: 'flaticon-secret' },
]

const OurValues = ({ className = '' }) => {
    const { isRTL } = useLanguage()

    return (
        <div className={`ourValuesArea ${className}`}>
            <Grid container className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={isRTL ? 'قيمنا' : 'Our Values'}
                        subTitle={isRTL ? 'المبادئ التي نلتزم بها' : 'The principles we stand by'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className="ourValuesWrapper">
                        {values.map((value, index) => (
                            <div className="valueCard" key={index}>
                                <h3 className="valueTitle">{isRTL ? value.ar : value.en}</h3>
                                <div className="valueUnderline"></div>
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default OurValues
