import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { useLanguage } from '../../lib/LanguageContext'
import { supabase } from '../../lib/supabase'

const VisionMission = ({ className = '', title, subTitle }) => {
    const { t, isRTL } = useLanguage();
    const [content, setContent] = useState({
        section_title: '',
        section_subtitle: '',
        vision_title: '',
        vision_subtitle: '',
        vision_paragraph1: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at',
        vision_paragraph2: 'and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum',
        mission_title: '',
        mission_subtitle: '',
        mission_paragraph1: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at',
        mission_paragraph2: 'and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum',
        section_title_ar: '',
        section_subtitle_ar: '',
        vision_title_ar: '',
        vision_subtitle_ar: '',
        vision_paragraph1_ar: '',
        vision_paragraph2_ar: '',
        mission_title_ar: '',
        mission_subtitle_ar: '',
        mission_paragraph1_ar: '',
        mission_paragraph2_ar: ''
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

    const displaySectionTitle = (isRTL && content.section_title_ar) || content.section_title || title || t('vision.title')
    const displaySectionSubtitle = (isRTL && content.section_subtitle_ar) || content.section_subtitle || subTitle || t('vision.subtitle')
    const displayVisionTitle = (isRTL && content.vision_title_ar) || content.vision_title || t('vision.visionTitle')
    const displayVisionSubtitle = (isRTL && content.vision_subtitle_ar) || content.vision_subtitle || t('vision.visionSubtitle')
    const displayMissionTitle = (isRTL && content.mission_title_ar) || content.mission_title || t('vision.missionTitle')
    const displayMissionSubtitle = (isRTL && content.mission_subtitle_ar) || content.mission_subtitle || t('vision.missionSubtitle')

    const visionText = [
        (isRTL && content.vision_paragraph1_ar) || content.vision_paragraph1,
        (isRTL && content.vision_paragraph2_ar) || content.vision_paragraph2
    ].filter(p => p)

    const missionText = [
        (isRTL && content.mission_paragraph1_ar) || content.mission_paragraph1,
        (isRTL && content.mission_paragraph2_ar) || content.mission_paragraph2
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
                                <span className="subtitle">{displayVisionTitle}</span>
                                <h2>{displayVisionSubtitle}</h2>
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
                                <span className="subtitle">{displayMissionTitle}</span>
                                <h2>{displayMissionSubtitle}</h2>
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
