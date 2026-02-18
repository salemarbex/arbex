import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { supabase } from '../../lib/supabase'

const Consultant = ({ subTitle, title, className = '', signature, pragraphs, images, fetchFromSupabase = false }) => {
    const [content, setContent] = useState({
        title: title || 'Consultant',
        subtitle: subTitle || 'Our Expert',
        paragraph1: pragraphs?.[0] || '',
        paragraph2: pragraphs?.[1] || '',
        image_url: images || '/images/about/1.jpg',
        signature_url: signature || '/images/about/1.png'
    })

    useEffect(() => {
        if (fetchFromSupabase) {
            fetchContent()
        }
    }, [fetchFromSupabase])

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .eq('section', 'consultant')

            if (error) throw error

            if (data && data.length > 0) {
                const contentObj = {}
                data.forEach(item => {
                    contentObj[item.field_key] = item.field_value
                })
                setContent(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching consultant content:', error)
        }
    }

    const displayParagraphs = fetchFromSupabase 
        ? [content.paragraph1, content.paragraph2].filter(p => p)
        : pragraphs

    const displayImage = fetchFromSupabase ? content.image_url : images
    const displayTitle = fetchFromSupabase ? content.title : title
    const displaySubtitle = fetchFromSupabase ? content.subtitle : subTitle
    const displaySignature = fetchFromSupabase ? content.signature_url : signature

    return (
        <Grid id="consultant" className={`aboutArea consultantArea ${className}`}>
            <Grid container spacing={4} className="container">
                <Grid item md={6} xs={12}>
                    <Grid className="aboutContent">
                        {displaySubtitle && <span className="subtitle">{displaySubtitle}</span>}
                        <h2>{displayTitle}</h2>
                        {displayParagraphs.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                        {displaySignature && <Grid className="signature">
                            <img src={displaySignature} alt="Consultant Signature" />
                        </Grid>}
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid className="aboutImageWrap consultantImageWrap">
                        <img src={displayImage} alt="Consultant" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Consultant
