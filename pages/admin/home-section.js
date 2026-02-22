import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {
    Grid,
    Paper,
    Button,
    TextField,
    FormControlLabel,
    Switch,
    CircularProgress
} from '@mui/material'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { replaceInStorage } from '../../lib/storageHelper'
import { toast } from 'react-toastify'

const HomeSectionAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        subtitle: 'The Most Trusted Legal Firm',
        heading_line1: 'We Fight For Your Justice',
        heading_line2: 'As Like A Friend.',
        show_button: true,
        button_text: 'Contact us now',
        video_url: '/videos/hero-video.mp4',
        subtitle_ar: '',
        heading_line1_ar: '',
        heading_line2_ar: '',
        button_text_ar: ''
    })
    const [videoFile, setVideoFile] = useState(null)
    const [videoPreview, setVideoPreview] = useState(null)

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
                setFormData(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching content:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setVideoFile(file)
            setVideoPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            let videoUrl = formData.video_url

            // Upload new video if selected
            if (videoFile) {
                const newUrl = await replaceInStorage(
                    videoFile,
                    formData.video_url,
                    'home',
                    'videos'
                )
                if (newUrl) {
                    videoUrl = newUrl
                }
            }

            // Prepare data for upsert
            const updates = [
                { section: 'home', field_key: 'subtitle', field_value: formData.subtitle },
                { section: 'home', field_key: 'heading_line1', field_value: formData.heading_line1 },
                { section: 'home', field_key: 'heading_line2', field_value: formData.heading_line2 },
                { section: 'home', field_key: 'show_button', field_value: formData.show_button.toString() },
                { section: 'home', field_key: 'button_text', field_value: formData.button_text },
                { section: 'home', field_key: 'video_url', field_value: videoUrl },
                { section: 'home', field_key: 'subtitle_ar', field_value: formData.subtitle_ar || '' },
                { section: 'home', field_key: 'heading_line1_ar', field_value: formData.heading_line1_ar || '' },
                { section: 'home', field_key: 'heading_line2_ar', field_value: formData.heading_line2_ar || '' },
                { section: 'home', field_key: 'button_text_ar', field_value: formData.button_text_ar || '' }
            ]

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_content')
                    .upsert(update, { onConflict: 'section,field_key' })

                if (error) throw error
            }

            setFormData(prev => ({ ...prev, video_url: videoUrl }))
            toast.success('Home section updated successfully!')
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
                    <title>Home Section - Arbex Law Admin</title>
                </Head>
                <AdminLayout title="Home Section">
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
                <title>Home Section - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Home Section">
                <div className="sectionAdminPage">
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>Home Section</h2>
                            <p>Manage the hero video section content</p>
                        </div>
                    </Paper>

                    <Paper className="formContainer">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Text Content</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Subtitle"
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleInputChange}
                                        fullWidth
                                        helperText="Small text above the heading"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Heading Line 1"
                                        name="heading_line1"
                                        value={formData.heading_line1}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Heading Line 2"
                                        name="heading_line2"
                                        value={formData.heading_line2}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Arabic Content - المحتوى العربي</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="العنوان الفرعي (Subtitle Arabic)"
                                        name="subtitle_ar"
                                        value={formData.subtitle_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                        helperText="النص الصغير فوق العنوان الرئيسي"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="السطر الأول (Heading Line 1 Arabic)"
                                        name="heading_line1_ar"
                                        value={formData.heading_line1_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="السطر الثاني (Heading Line 2 Arabic)"
                                        name="heading_line2_ar"
                                        value={formData.heading_line2_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Button Settings</h3>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.show_button}
                                                onChange={handleInputChange}
                                                name="show_button"
                                                color="primary"
                                            />
                                        }
                                        label="Show Contact Button"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Button Text (English)"
                                        name="button_text"
                                        value={formData.button_text}
                                        onChange={handleInputChange}
                                        fullWidth
                                        disabled={!formData.show_button}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="نص الزر (Button Text Arabic)"
                                        name="button_text_ar"
                                        value={formData.button_text_ar}
                                        onChange={handleInputChange}
                                        fullWidth
                                        disabled={!formData.show_button}
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Background Video</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="mediaUpload">
                                        <label>Video (1920x1080 recommended, MP4 format)</label>
                                        <input
                                            type="file"
                                            accept="video/mp4,video/webm"
                                            onChange={handleVideoChange}
                                        />
                                        {(videoPreview || formData.video_url) && (
                                            <div className="videoPreview">
                                                <video
                                                    src={videoPreview || formData.video_url}
                                                    controls
                                                    muted
                                                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                                                />
                                            </div>
                                        )}
                                    </div>
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
                    .sectionAdminPage .mediaUpload {
                        margin-top: 10px;
                    }
                    .sectionAdminPage .mediaUpload label {
                        display: block;
                        margin-bottom: 10px;
                        font-weight: 500;
                        color: #666;
                    }
                    .sectionAdminPage .mediaUpload input {
                        margin-bottom: 15px;
                    }
                    .sectionAdminPage .videoPreview {
                        margin-top: 15px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-radius: 8px;
                    }
                    .sectionAdminPage .saveBtn {
                        background: #c0b596 !important;
                        color: #fff !important;
                        padding: 12px 40px !important;
                        font-size: 16px !important;
                    }
                    .sectionAdminPage .MuiSwitch-colorPrimary.Mui-checked {
                        color: #c0b596 !important;
                    }
                    .sectionAdminPage .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
                        background-color: #c0b596 !important;
                    }
                `}</style>
            </AdminLayout>
        </>
    )
}

export default HomeSectionAdmin
