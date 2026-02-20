import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material'
import { toast } from 'react-toastify'
import { supabase } from '../../lib/supabase'

const ContactSection = ({ className = '' }) => {
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
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        if (!formData.purpose) newErrors.purpose = 'Please select a purpose'
        if (!formData.description.trim()) newErrors.description = 'Message is required'
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
                toast.success('Your message has been sent successfully!')
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    purpose: '',
                    description: ''
                })
            } else {
                toast.error(data.message || 'Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Contact form error:', error)
            toast.error('Failed to send message. Please try again.')
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
                        <h3>Our Contacts</h3>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                        <h4>Address</h4>
                        <span>Zone 32, Street 958, Building 52</span>
                        <span>Floor 1, Office 6</span>
                        <span>Doha, Qatar</span>
                        <h4>Phone</h4>
                        <span><a href="tel:+97470202010">+974 70202010</a></span>
                        <h4>Email</h4>
                        <span><a href="mailto:info@arbex.law">info@arbex.law</a></span>
                    </Grid>
                </Grid>

                {/* Contact Form */}
                <Grid item md={7} xs={12}>
                    <Grid className="contactUSForm">
                        <h3>Quick Contact Form</h3>
                        <form onSubmit={handleSubmit} className="contactForm">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Grid className="formInput">
                                        <input
                                            placeholder="Your Name"
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
                                            placeholder="Phone"
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
                                            placeholder="Email"
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
                                            <option value="">Select Purpose of Contact</option>
                                            {purposes.map((p) => (
                                                <option key={p.id} value={p.label}>{p.label}</option>
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
                                            placeholder="Your Message..."
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
                                        {loading ? 'Sending...' : 'Send Message'}
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
