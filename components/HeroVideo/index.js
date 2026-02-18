import React, { useState, useEffect } from 'react'
import { Button, Grid } from '@mui/material';
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

const HeroVideo = ({ className = '' }) => {
    const [content, setContent] = useState({
        subtitle: 'The Most Trusted Legal Firm',
        heading_line1: 'We Fight For Your Justice',
        heading_line2: 'As Like A Friend.',
        show_button: true,
        button_text: 'Contact us now',
        video_url: '/videos/hero-video.mp4'
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
                    <p>{content.subtitle}</p>
                    <h2>
                        <span>{content.heading_line1}</span>
                        <span>{content.heading_line2}</span>
                    </h2>
                    {content.show_button && (
                        <a href="#contact" className="btnStyle btnStyle3">
                            {content.button_text}
                        </a>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
export default HeroVideo
