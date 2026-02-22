import React, { useState, useEffect } from 'react'
import { Button, Grid } from '@mui/material';
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../lib/LanguageContext'

const HeroVideo = ({ className = '' }) => {
    const { t, isRTL } = useLanguage();
    const [content, setContent] = useState({
        subtitle: '',
        heading_line1: '',
        heading_line2: '',
        show_button: true,
        button_text: '',
        video_url: '/videos/hero-video.mp4',
        subtitle_ar: '',
        heading_line1_ar: '',
        heading_line2_ar: '',
        button_text_ar: ''
    })

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .eq('section', 'home')

            if (error) throw error

            if (data && data.length > 0) {
                const contentObj = {}
                data.forEach(item => {
                    if (item.field_key === 'show_button') {
                        contentObj[item.field_key] = item.field_value === 'true'
                    } else {
                        contentObj[item.field_key] = item.field_value
                    }
                })
                setContent(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching home content:', error)
        }
    }

    return (
        <div id="home" className={`heroVideoArea ${className}`}>
            <div className="videoWrapper">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="heroVideo"
                    key={content.video_url}
                >
                    <source src={content.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="videoOverlay"></div>
            </div>
            <Grid container className="container heroContent">
                <Grid item lg={8} xs={12}>
                    <p>{(isRTL && content.subtitle_ar) || content.subtitle || t('hero.subtitle')}</p>
                    <h2>
                        <span>{(isRTL && content.heading_line1_ar) || content.heading_line1 || t('hero.title1')}</span>
                        <span>{(isRTL && content.heading_line2_ar) || content.heading_line2 || t('hero.title2')}</span>
                    </h2>
                    {content.show_button && (
                        <a href="#contact" className="btnStyle btnStyle3">
                            {(isRTL && content.button_text_ar) || content.button_text || t('hero.button')}
                        </a>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
export default HeroVideo
