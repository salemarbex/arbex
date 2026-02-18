import React from "react";
import { Grid } from '@mui/material'
import Link from 'next/link'
import { Parallax } from 'react-parallax';
import SectionTitle from '../Title'

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


const ServiceArea = ({ className = '', title, subTitle }) => {
    return (
        <Parallax
            bgImage="/images/practice/1.jpg"
            bgImageAlt="the cat"
            contentClassName={`ourServiceArea ${className}`}
            strength={200}>
            <Grid container spacing={2} className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={title}
                        subTitle={subTitle}
                    />
                </Grid>
                {services.map((service, index) => (
                    <Grid item xs={12} xl={4} lg={4} md={6} sm={6} key={index}>
                        <Grid className="serviceWrap">
                            <Grid className="serviceIcon">
                                <i className={service.icon}></i>
                            </Grid>
                            <Grid className="serviceContent">
                                <h3>
                                    <Link
                                        href={`/practice/[id]`}
                                        as={`/practice/${service.id}`}>{service.title}
                                    </Link>
                                </h3>
                                <p>{service.content}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Parallax>

    )
}
export default ServiceArea