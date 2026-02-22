import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {
    Grid,
    Paper,
    Button,
    TextField,
    CircularProgress
} from '@mui/material'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

const VisionSectionAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        section_title: 'Vision & Mission',
        section_subtitle: 'What Drives Us',
        vision_title: 'Our Vision',
        vision_subtitle: 'What We See',
        vision_paragraph1: '',
        vision_paragraph2: '',
        mission_title: 'Our Mission',
        mission_subtitle: 'Why We Do It',
        mission_paragraph1: '',
        mission_paragraph2: '',
        // Arabic fields
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
                setFormData(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching content:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const updates = Object.entries(formData).map(([key, value]) => ({
                section: 'vision',
                field_key: key,
                field_value: value || ''
            }))

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_content')
                    .upsert(update, { onConflict: 'section,field_key' })

                if (error) throw error
            }

            toast.success('Vision & Mission section updated successfully!')
        } catch (error) {
            console.error('Error saving content:', error)
            toast.error('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <>
                <Head>
                    <title>Vision & Mission - Arbex Law Admin</title>
                </Head>
                <AdminLayout title="Vision & Mission">
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                        <CircularProgress style={{ color: '#c0b596' }} />
                    </div>
                </AdminLayout>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Vision & Mission - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Vision & Mission">
                <div className="sectionAdminPage">
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>Vision & Mission Section</h2>
                            <p>Manage the Vision & Mission section content in English and Arabic</p>
                        </div>
                    </Paper>

                    <Paper className="formContainer">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* ===== ENGLISH CONTENT ===== */}
                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">English Content</h3>
                                </Grid>

                                {/* Section Header */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Section Title"
                                        name="section_title"
                                        value={formData.section_title}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Section Subtitle"
                                        name="section_subtitle"
                                        value={formData.section_subtitle}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>

                                {/* Vision */}
                                <Grid item xs={12}>
                                    <h4 className="subSectionTitle">Vision</h4>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Vision Title"
                                        name="vision_title"
                                        value={formData.vision_title}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Vision Subtitle"
                                        name="vision_subtitle"
                                        value={formData.vision_subtitle}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Vision Paragraph 1"
                                        name="vision_paragraph1"
                                        value={formData.vision_paragraph1}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Vision Paragraph 2"
                                        name="vision_paragraph2"
                                        value={formData.vision_paragraph2}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                {/* Mission */}
                                <Grid item xs={12}>
                                    <h4 className="subSectionTitle">Mission</h4>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Mission Title"
                                        name="mission_title"
                                        value={formData.mission_title}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Mission Subtitle"
                                        name="mission_subtitle"
                                        value={formData.mission_subtitle}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mission Paragraph 1"
                                        name="mission_paragraph1"
                                        value={formData.mission_paragraph1}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mission Paragraph 2"
                                        name="mission_paragraph2"
                                        value={formData.mission_paragraph2}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                {/* ===== ARABIC CONTENT ===== */}
                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Arabic Content - المحتوى العربي</h3>
                                </Grid>

                                {/* Section Header Arabic */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="عنوان القسم (Section Title Arabic)"
                                        name="section_title_ar"
                                        value={formData.section_title_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="العنوان الفرعي (Section Subtitle Arabic)"
                                        name="section_subtitle_ar"
                                        value={formData.section_subtitle_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>

                                {/* Vision Arabic */}
                                <Grid item xs={12}>
                                    <h4 className="subSectionTitle">الرؤية - Vision</h4>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="عنوان الرؤية (Vision Title Arabic)"
                                        name="vision_title_ar"
                                        value={formData.vision_title_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="العنوان الفرعي للرؤية (Vision Subtitle Arabic)"
                                        name="vision_subtitle_ar"
                                        value={formData.vision_subtitle_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="فقرة الرؤية 1 (Vision Paragraph 1 Arabic)"
                                        name="vision_paragraph1_ar"
                                        value={formData.vision_paragraph1_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="فقرة الرؤية 2 (Vision Paragraph 2 Arabic)"
                                        name="vision_paragraph2_ar"
                                        value={formData.vision_paragraph2_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>

                                {/* Mission Arabic */}
                                <Grid item xs={12}>
                                    <h4 className="subSectionTitle">الرسالة - Mission</h4>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="عنوان الرسالة (Mission Title Arabic)"
                                        name="mission_title_ar"
                                        value={formData.mission_title_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="العنوان الفرعي للرسالة (Mission Subtitle Arabic)"
                                        name="mission_subtitle_ar"
                                        value={formData.mission_subtitle_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="فقرة الرسالة 1 (Mission Paragraph 1 Arabic)"
                                        name="mission_paragraph1_ar"
                                        value={formData.mission_paragraph1_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="فقرة الرسالة 2 (Mission Paragraph 2 Arabic)"
                                        name="mission_paragraph2_ar"
                                        value={formData.mission_paragraph2_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={saving}
                                        className="saveBtn"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </div>

                <style jsx global>{`
                    .sectionAdminPage .pageHeader {
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                    .sectionAdminPage .headerContent h2 {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        margin: 0;
                    }
                    .sectionAdminPage .headerContent p {
                        color: #666;
                        margin: 5px 0 0;
                        font-size: 14px;
                    }
                    .sectionAdminPage .formContainer {
                        padding: 30px;
                    }
                    .sectionAdminPage .sectionTitle {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        font-size: 18px;
                        margin: 0;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    .sectionAdminPage .subSectionTitle {
                        font-family: 'Playfair Display', serif;
                        color: #c0b596;
                        font-size: 16px;
                        margin: 5px 0 0;
                        padding-bottom: 8px;
                        border-bottom: 1px dashed #e0d9c8;
                    }
                    .sectionAdminPage .saveBtn {
                        background: #c0b596 !important;
                        color: #fff !important;
                        padding: 12px 40px !important;
                        font-size: 16px !important;
                    }
                `}</style>
            </AdminLayout>
        </>
    )
}

export default VisionSectionAdmin
