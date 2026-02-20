import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Grid, Paper } from '@mui/material'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import CampaignIcon from '@mui/icons-material/Campaign'
import VerifiedIcon from '@mui/icons-material/Verified'
import BusinessIcon from '@mui/icons-material/Business'

const Dashboard = () => {
    const [stats, setStats] = useState({
        awarenessCount: 0,
        accreditationCount: 0,
        clientsCount: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const [awarenessRes, accreditationRes, clientsRes] = await Promise.all([
                supabase.from('awareness').select('*', { count: 'exact', head: true }),
                supabase.from('accreditation_logos').select('*', { count: 'exact', head: true }),
                supabase.from('client_logos').select('*', { count: 'exact', head: true }),
            ])

            setStats({
                awarenessCount: awarenessRes.count || 0,
                accreditationCount: accreditationRes.count || 0,
                clientsCount: clientsRes.count || 0,
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        {
            title: 'Awareness Items',
            count: stats.awarenessCount,
            icon: <CampaignIcon />,
            color: '#c0b596'
        },
        {
            title: 'Accreditation Logos',
            count: stats.accreditationCount,
            icon: <VerifiedIcon />,
            color: '#4caf50'
        },
        {
            title: 'Client Logos',
            count: stats.clientsCount,
            icon: <BusinessIcon />,
            color: '#2196f3'
        }
    ]

    return (
        <>
            <Head>
                <title>Dashboard - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Dashboard">
                <div className="dashboardPage">
                    <Grid container spacing={3}>
                        {statCards.map((card, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper className="statCard">
                                    <div className="statIcon" style={{ background: card.color }}>
                                        {card.icon}
                                    </div>
                                    <div className="statContent">
                                        <h3>{card.count}</h3>
                                        <p>{card.title}</p>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={3} style={{ marginTop: 20 }}>
                        <Grid item xs={12}>
                            <Paper className="welcomeCard">
                                <h2>Welcome to Arbex Law Admin Panel</h2>
                                <p>
                                    Use the sidebar menu to navigate between different sections. 
                                    You can manage your website content, awareness case studies, and more.
                                </p>
                                <div className="quickLinks">
                                    <h4>Content Management:</h4>
                                    <ul>
                                        <li><a href="/admin/home-section">Home Section</a> - Video, heading, button</li>
                                        <li><a href="/admin/about-section">About Section</a> - Image, text</li>
                                        <li><a href="/admin/consultant-section">Consultant</a> - Image, text, signature</li>
                                        <li><a href="/admin/accreditation">Accreditation</a> - Partner logos</li>
                                        <li><a href="/admin/clients">Clients</a> - Client logos</li>
                                        <li><a href="/admin/contact-purposes">Contact Purposes</a> - Contact form dropdown options</li>
                                        <li><a href="/admin/awareness">Awareness</a> - Case studies</li>
                                    </ul>
                                    <h4>Quick Actions:</h4>
                                    <ul>
                                        <li><a href="/home" target="_blank">View Website</a></li>
                                    </ul>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

                <style jsx global>{`
                    .dashboardPage .statCard {
                        padding: 20px;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }
                    .dashboardPage .statIcon {
                        width: 60px;
                        height: 60px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                    }
                    .dashboardPage .statIcon svg {
                        font-size: 30px;
                    }
                    .dashboardPage .statContent h3 {
                        font-size: 28px;
                        color: #282e3f;
                        margin: 0;
                    }
                    .dashboardPage .statContent p {
                        color: #666;
                        margin: 5px 0 0;
                        font-size: 14px;
                    }
                    .dashboardPage .welcomeCard {
                        padding: 30px;
                    }
                    .dashboardPage .welcomeCard h2 {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        margin-bottom: 15px;
                    }
                    .dashboardPage .welcomeCard p {
                        color: #666;
                        line-height: 1.6;
                    }
                    .dashboardPage .quickLinks {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    }
                    .dashboardPage .quickLinks h4 {
                        color: #282e3f;
                        margin-bottom: 10px;
                    }
                    .dashboardPage .quickLinks ul {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    .dashboardPage .quickLinks li {
                        margin-bottom: 8px;
                    }
                    .dashboardPage .quickLinks a {
                        color: #c0b596;
                        text-decoration: none;
                    }
                    .dashboardPage .quickLinks a:hover {
                        text-decoration: underline;
                    }
                `}</style>
            </AdminLayout>
        </>
    )
}

export default Dashboard
