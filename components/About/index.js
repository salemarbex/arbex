import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Grid } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../lib/LanguageContext'

const About = ({ subTitle, title, videoId, className = '', signature, pragraphs, images, changeOrder = "", hideButton = false, hideSignature = false, fetchFromSupabase = false }) => {
    const { t, isRTL } = useLanguage();
    const [videoVisible, setVideoVisible] = useState(false);
    const [content, setContent] = useState({
        title: title || 'About Us',
        paragraph1: pragraphs?.[0] || '',
        paragraph2: pragraphs?.[1] || '',
        image_url: images || '/images/about/2.jpg',
        title_ar: '',
        paragraph1_ar: '',
        paragraph2_ar: ''
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
                .eq('section', 'about')

            if (error) throw error

            if (data && data.length > 0) {
                const contentObj = {}
                data.forEach(item => {
                    contentObj[item.field_key] = item.field_value
                })
                setContent(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching about content:', error)
        }
    }

    const handlePlayVideo = () => {
        setVideoVisible(true);
    };

    const displayParagraphs = fetchFromSupabase 
        ? [
            (isRTL && content.paragraph1_ar) || content.paragraph1, 
            (isRTL && content.paragraph2_ar) || content.paragraph2
          ].filter(p => p)
        : pragraphs

    const displayImage = fetchFromSupabase ? content.image_url : images
    const displayTitle = fetchFromSupabase 
        ? ((isRTL && content.title_ar) || content.title) 
        : title

    return (
        <Grid id="about" className={`aboutArea ${className}`}>
            <Grid container spacing={4} className="container">
                <Grid item md={6} xs={12}
                    className="changeOrder">
                    <Grid className="aboutImageWrap">
                        <img src={displayImage} alt="" />
                        {videoId && !videoVisible && (
                            <Button onClick={handlePlayVideo} className="playBtn">
                                <PlayArrowIcon />
                            </Button>
                        )}
                        {videoId && videoVisible && (
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid className="aboutContent">
                        {subTitle && <span className="subtitle">{subTitle}</span>}
                        <h2>{displayTitle}</h2>
                        {displayParagraphs.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                        {!hideButton && (
                            <Link href='/about'>
                                <Button className="btnStyle">{t('about.moreAbout')}</Button>
                            </Link>
                        )}
                        {!hideSignature && signature && <Grid className="signature">
                            <img src={signature} alt="" />
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default About