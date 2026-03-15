import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { useLanguage } from '../../lib/LanguageContext'
import { supabase } from '../../lib/supabase'

const defaultServices = [
    { icon: "fi flaticon-parents", title: 'Family Law', content: 'It is a long established fact that a reader will be distracted by the readable content of ', id: 1 },
    { icon: "fi flaticon-wounded", title: 'Personal Injury', content: 'It is a long established fact that a reader will be distracted by the readable content of ', id: 2 },
    { icon: "fi flaticon-employee", title: 'Business Law', content: 'It is a long established fact that a reader will be distracted by the readable content of ', id: 3 },
    { icon: "fi flaticon-thief", title: 'Criminal Law', content: 'It is a long established fact that a reader will be distracted by the readable content of ', id: 4 },
    { icon: "fi flaticon-university-graduate-hat", title: 'Education Law', content: 'It is a long established fact that a reader will be distracted by the readable content of ', id: 5 },
    { icon: "fi flaticon-house", title: 'Real Estate Law', content: 'It is a long established fact that a reader will be distracted by the readable content of ', id: 6 },
]

const serviceKeys = ['familyLaw', 'personalInjury', 'businessLaw', 'criminalLaw', 'educationLaw', 'realEstateLaw'];

const Specialities = ({ className = '', title, subTitle }) => {
    const { t, locale } = useLanguage();
    const [services, setServices] = useState([])
    const [headings, setHeadings] = useState({})
    const isArabic = locale === 'ar'

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [servicesRes, headingsRes] = await Promise.all([
                supabase.from('specialities').select('*').order('display_order', { ascending: true }),
                supabase.from('site_content').select('*').eq('section', 'specialities')
            ])

            if (servicesRes.data && servicesRes.data.length > 0) {
                setServices(servicesRes.data)
            }

            if (headingsRes.data && headingsRes.data.length > 0) {
                const obj = {}
                headingsRes.data.forEach(item => { obj[item.field_key] = item.field_value })
                setHeadings(obj)
            }
        } catch (error) {
            console.error('Error fetching specialities:', error)
        }
    }

    // Use DB data if available, otherwise fall back to translation keys
    const displayServices = services.length > 0
        ? services.map(s => ({
            ...s,
            title: isArabic ? (s.title_ar || s.title) : s.title,
            content: isArabic ? (s.content_ar || s.content) : s.content,
        }))
        : defaultServices.map((service, index) => ({
            ...service,
            title: t(`specialities.services.${serviceKeys[index]}`),
            content: t('specialities.serviceDesc'),
        }))

    const sectionTitle = title || (isArabic ? headings.title_ar : headings.title) || t('specialities.title')
    const sectionSubTitle = subTitle || (isArabic ? headings.subtitle_ar : headings.subtitle) || t('specialities.subtitle')

    return (
        <div id="specialities" className={`specialitiesAreaWhite ${className}`}>
            <Grid container spacing={2} className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={sectionTitle}
                        subTitle={sectionSubTitle}
                    />
                </Grid>
                {displayServices.map((service, index) => (
                    <Grid item xs={12} xl={4} lg={4} md={6} sm={6} key={service.id || index}>
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
