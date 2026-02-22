import React from "react";
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { useLanguage } from '../../lib/LanguageContext'

const services = [
    {
        icon: "fi flaticon-parents",
        title: 'Family Law',
        content: 'It is a long established fact that a reader will be distracted by the readable content of ',
        id: 1
    },
    {
        icon: "fi flaticon-wounded",
        title: 'Personal Injury',
        content: 'It is a long established fact that a reader will be distracted by the readable content of ',
        id: 2
    },
    {
        icon: "fi flaticon-employee",
        title: 'Business Law',
        content: 'It is a long established fact that a reader will be distracted by the readable content of ',
        id: 3
    },
    {
        icon: "fi flaticon-thief",
        title: 'Criminal Law',
        content: 'It is a long established fact that a reader will be distracted by the readable content of ',
        id: 4
    },
    {
        icon: "fi flaticon-university-graduate-hat",
        title: 'Education Law',
        content: 'It is a long established fact that a reader will be distracted by the readable content of ',
        id: 5
    },
    {
        icon: "fi flaticon-house",
        title: 'Real Estate Law',
        content: 'It is a long established fact that a reader will be distracted by the readable content of ',
        id: 6
    },
]


const serviceKeys = ['familyLaw', 'personalInjury', 'businessLaw', 'criminalLaw', 'educationLaw', 'realEstateLaw'];

const Specialities = ({ className = '', title, subTitle }) => {
    const { t } = useLanguage();
    
    const localizedServices = services.map((service, index) => ({
        ...service,
        title: t(`specialities.services.${serviceKeys[index]}`),
        content: t('specialities.serviceDesc'),
    }));

    return (
        <div id="specialities" className={`specialitiesAreaWhite ${className}`}>
            <Grid container spacing={2} className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={title || t('specialities.title')}
                        subTitle={subTitle || t('specialities.subtitle')}
                    />
                </Grid>
                {localizedServices.map((service, index) => (
                    <Grid item xs={12} xl={4} lg={4} md={6} sm={6} key={index}>
                        <Grid className="serviceWrapWhite">
                            <Grid className="serviceIcon">
                                <i className={service.icon}></i>
                            </Grid>
                            <Grid className="serviceContent">
                                <h3>{service.title}</h3>
                                <p>{service.content}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
export default Specialities
