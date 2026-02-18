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
import { replaceInStorage } from '../../lib/storageHelper'
import { toast } from 'react-toastify'

const AboutSectionAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: 'About Us',
        paragraph1: '',
        paragraph2: '',
        image_url: '/images/about/2.jpg'
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        fetchContent()
    }, [])

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

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            let imageUrl = formData.image_url

            // Upload new image if selected
            if (imageFile) {
                const newUrl = await replaceInStorage(
                    imageFile,
                    formData.image_url,
                    'about',
                    'images'
                )
                if (newUrl) {
                    imageUrl = newUrl
                }
            }

            // Prepare data for upsert
            const updates = [
                { section: 'about', field_key: 'title', field_value: formData.title },
                { section: 'about', field_key: 'paragraph1', field_value: formData.paragraph1 },
                { section: 'about', field_key: 'paragraph2', field_value: formData.paragraph2 },
                { section: 'about', field_key: 'image_url', field_value: imageUrl }
            ]

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_content')
                    .upsert(update, { onConflict: 'section,field_key' })

                if (error) throw error
            }

            setFormData(prev => ({ ...prev, image_url: imageUrl }))
            toast.success('About section updated successfully!')
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
                    <title>About Section - Arbex Law Admin</title>
                </Head>
                <AdminLayout title="About Section">
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
                <title>About Section - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="About Section">
                <div className="sectionAdminPage">
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>About Section</h2>
                            <p>Manage the About Us section content</p>
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
                                        label="Section Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Paragraph 1"
                                        name="paragraph1"
                                        value={formData.paragraph1}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Paragraph 2"
                                        name="paragraph2"
                                        value={formData.paragraph2}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Section Image</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="mediaUpload">
                                        <label>Image (600x445 recommended)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        {(imagePreview || formData.image_url) && (
                                            <div className="imagePreview">
                                                <img
                                                    src={imagePreview || formData.image_url}
                                                    alt="About section preview"
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
                    .sectionAdminPage .imagePreview {
                        margin-top: 15px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-radius: 8px;
                    }
                    .sectionAdminPage .imagePreview img {
                        max-width: 300px;
                        height: auto;
                        border-radius: 4px;
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

export default AboutSectionAdmin
