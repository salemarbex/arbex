import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material'
import { toast } from 'react-toastify'
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../lib/LanguageContext'

const ContactSection = ({ className = '' }) => {
    const { t, isRTL } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        purpose: '',
        description: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [purposes, setPurposes] = useState([])

    useEffect(() => {
        fetchPurposes()
    }, [])

    const fetchPurposes = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_purposes')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true })

            if (error) throw error
            if (data) setPurposes(data)
        } catch (error) {
            console.error('Error fetching contact purposes:', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = t('contact.errors.nameRequired')
        if (!formData.email.trim()) {
            newErrors.email = t('contact.errors.emailRequired')
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('contact.errors.emailInvalid')
        }
        if (!formData.phone.trim()) newErrors.phone = t('contact.errors.phoneRequired')
        if (!formData.purpose) newErrors.purpose = t('contact.errors.purposeRequired')
        if (!formData.description.trim()) newErrors.description = t('contact.errors.messageRequired')
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success(t('contact.successMessage'))
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    purpose: '',
                    description: ''
                })
            } else {
                toast.error(data.message || t('contact.errorMessage'))
            }
        } catch (error) {
            console.error('Contact form error:', error)
            toast.error(t('contact.errorMessage'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="contact" className={`contactSectionArea ${className}`}>
            <Grid container spacing={4} className="container">
                {/* Contact Info */}
                <Grid item md={5} xs={12}>
                    <Grid className="contactUsInfo">
                        <h3>{t('contact.title')}</h3>
                        <p>{t('contact.description')}</p>
                        <h4>{t('contact.address')}</h4>
                        <span>{t('contact.addressLine1')}</span>
                        <span>{t('contact.addressLine2')}</span>
                        <span>{t('contact.addressLine3')}</span>
                        <h4>{t('contact.phone')}</h4>
                        <span><a href="tel:+97470202010">{t('header.phone')}</a></span>
                        <h4>{t('contact.email')}</h4>
                        <span><a href="mailto:info@arbex.law">info@arbex.law</a></span>
                    </Grid>
                </Grid>

                {/* Contact Form */}
                <Grid item md={7} xs={12}>
                    <Grid className="contactUSForm">
                        <h3>{t('contact.formTitle')}</h3>
                        <form onSubmit={handleSubmit} className="contactForm">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Grid className="formInput">
                                        <input
                                            placeholder={t('contact.placeholders.name')}
                                            value={formData.name}
                                            name="name"
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                        />
                                        {errors.name && <p className="errorText">{errors.name}</p>}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid className="formInput">
                                        <input
                                            placeholder={t('contact.placeholders.phone')}
                                            value={formData.phone}
                                            name="phone"
                                            onChange={handleChange}
                                            className="form-control"
                                            type="tel"
                                        />
                                        {errors.phone && <p className="errorText">{errors.phone}</p>}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid className="formInput">
                                        <input
                                            placeholder={t('contact.placeholders.email')}
                                            value={formData.email}
                                            name="email"
                                            onChange={handleChange}
                                            className="form-control"
                                            type="email"
                                        />
                                        {errors.email && <p className="errorText">{errors.email}</p>}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid className="formInput">
                                        <select
                                            value={formData.purpose}
                                            name="purpose"
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">{t('contact.placeholders.purpose')}</option>
                                            {purposes.map((p) => (
                                                <option key={p.id} value={p.label}>{(isRTL && p.label_ar) || p.label}</option>
                                            ))}
                                        </select>
                                        {errors.purpose && <p className="errorText">{errors.purpose}</p>}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid className="formInput">
                                        <textarea
                                            className="form-control"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder={t('contact.placeholders.message')}
                                            name="description"
                                            rows={5}
                                        />
                                        {errors.description && <p className="errorText">{errors.description}</p>}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        type="submit" 
                                        className="btnStyle"
                                        disabled={loading}
                                    >
                                        {loading ? t('contact.sending') : t('contact.send')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContactSection
