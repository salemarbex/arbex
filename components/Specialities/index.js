import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { useLanguage } from '../../lib/LanguageContext'
import { supabase } from '../../lib/supabase'

const defaultServices = [
    { icon: "fa fa-balance-scale", title: 'Local and International Arbitration', content: 'We provide expert arbitration services in commercial, engineering, and technical disputes.', id: 1 },
    { icon: "fa fa-file-text-o", title: 'Technical Reports & Expert Opinions', content: 'We prepare comprehensive technical reports and expert opinions to support legal cases.', id: 2 },
    { icon: "fa fa-handshake-o", title: 'Mediation & Dispute Resolution', content: 'Our mediation services help parties reach amicable settlements through structured negotiation.', id: 3 },
    { icon: "fa fa-briefcase", title: 'Negotiation & Technical Representation', content: 'We represent clients in technical negotiations with expertise and professionalism.', id: 4 },
    { icon: "fa fa-cogs", title: 'Technical Consultancy', content: 'We offer specialized technical consultancy for contracts and projects.', id: 5 },
    { icon: "fa fa-tasks", title: 'Project Management & Evaluation', content: 'Our team manages and evaluates technical projects from inception to completion.', id: 6 },
    { icon: "fa fa-clipboard", title: 'IT Audit', content: 'We conduct thorough IT audits to assess system integrity and security.', id: 7 },
    { icon: "fa fa-sitemap", title: 'Systems & Infrastructure Analysis', content: 'We analyze organizational systems and infrastructure to optimize performance.', id: 8 },
    { icon: "fa fa-gavel", title: 'Judicial & Committee Support', content: 'We provide impartial expert opinions to support judicial authorities.', id: 9 },
]

// Map icon based on title keywords (works for both English and Arabic titles)
const getIconForTitle = (title, titleAr, fallbackIcon) => {
    const text = ((title || '') + ' ' + (titleAr || '')).toLowerCase()
    if (text.includes('arbitration') || text.includes('تحكيم')) return 'fa fa-balance-scale'
    if (text.includes('technical report') || text.includes('expert opinion') || text.includes('تقارير') || text.includes('آراء')) return 'fa fa-file-text-o'
    if (text.includes('mediation') || text.includes('dispute resolution') || text.includes('وساطة') || text.includes('نزاعات')) return 'fa fa-handshake-o'
    if (text.includes('negotiation') || text.includes('representation') || text.includes('تفاوض') || text.includes('تمثيل')) return 'fa fa-briefcase'
    if (text.includes('consultancy') || text.includes('استشار')) return 'fa fa-cogs'
    if (text.includes('project management') || text.includes('evaluation') || text.includes('إدارة مشاريع') || text.includes('تقييم')) return 'fa fa-tasks'
    if (text.includes('it audit') || text.includes('تدقيق')) return 'fa fa-clipboard'
    if (text.includes('systems') || text.includes('infrastructure') || text.includes('أنظمة') || text.includes('بنية')) return 'fa fa-sitemap'
    if (text.includes('judicial') || text.includes('committee') || text.includes('قضائي') || text.includes('لجان')) return 'fa fa-gavel'
    return fallbackIcon || 'fa fa-balance-scale'
}

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
            icon: getIconForTitle(s.title, s.title_ar, s.icon),
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
