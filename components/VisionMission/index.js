import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { useLanguage } from '../../lib/LanguageContext'
import { supabase } from '../../lib/supabase'

const VisionMission = ({ className = '', title, subTitle }) => {
    const { t, isRTL } = useLanguage();
    const [content, setContent] = useState({
        section_title: null,
        section_subtitle: null,
        vision_title: null,
        vision_subtitle: null,
        vision_paragraph1: null,
        vision_paragraph2: null,
        mission_title: null,
        mission_subtitle: null,
        mission_paragraph1: null,
        mission_paragraph2: null,
        section_title_ar: null,
        section_subtitle_ar: null,
        vision_title_ar: null,
        vision_subtitle_ar: null,
        vision_paragraph1_ar: null,
        vision_paragraph2_ar: null,
        mission_title_ar: null,
        mission_subtitle_ar: null,
        mission_paragraph1_ar: null,
        mission_paragraph2_ar: null
    })

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .eq('section', 'vision')

            if (error) throw error

            if (data && data.length > 0) {
                const contentObj = {}
                data.forEach(item => {
                    contentObj[item.field_key] = item.field_value
                })
                setContent(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching vision content:', error)
        }
    }

    // Helper: use DB value if it exists (even empty string), only fall back to translation if DB field was never set
    const dbField = (key) => content[key] !== undefined && content[key] !== null ? content[key] : null
    const getDisplay = (arKey, enKey, fallback) => {
        if (isRTL) {
            const arVal = dbField(arKey)
            if (arVal !== null) return arVal
        }
        const enVal = dbField(enKey)
        if (enVal !== null) return enVal
        return fallback
    }

    const displaySectionTitle = getDisplay('section_title_ar', 'section_title', title || t('vision.title'))
    const displaySectionSubtitle = getDisplay('section_subtitle_ar', 'section_subtitle', subTitle || t('vision.subtitle'))
    const displayVisionTitle = getDisplay('vision_title_ar', 'vision_title', t('vision.visionTitle'))
    const displayVisionSubtitle = getDisplay('vision_subtitle_ar', 'vision_subtitle', t('vision.visionSubtitle'))
    const displayMissionTitle = getDisplay('mission_title_ar', 'mission_title', t('vision.missionTitle'))
    const displayMissionSubtitle = getDisplay('mission_subtitle_ar', 'mission_subtitle', t('vision.missionSubtitle'))

    const visionText = [
        getDisplay('vision_paragraph1_ar', 'vision_paragraph1', ''),
        getDisplay('vision_paragraph2_ar', 'vision_paragraph2', '')
    ].filter(p => p)

    const missionText = [
        getDisplay('mission_paragraph1_ar', 'mission_paragraph1', ''),
        getDisplay('mission_paragraph2_ar', 'mission_paragraph2', '')
    ].filter(p => p)

    return (
        <div id="vision" className={`visionMissionArea ${className}`}>
            <Grid container className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={displaySectionTitle}
                        subTitle={displaySectionSubtitle}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className="visionMissionWrapper">
                        {/* Vision Section */}
                        <div className="visionSection">
                            <div className="visionContent">
                                {displayVisionTitle && <span className="subtitle">{displayVisionTitle}</span>}
                                {displayVisionSubtitle && <h2>{displayVisionSubtitle}</h2>}
                                {visionText.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="verticalDivider">
                            <div className="dividerLine"></div>
                        </div>

                        {/* Mission Section */}
                        <div className="missionSection">
                            <div className="missionContent">
                                {displayMissionTitle && <span className="subtitle">{displayMissionTitle}</span>}
                                {displayMissionSubtitle && <h2>{displayMissionSubtitle}</h2>}
                                {missionText.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default VisionMission
