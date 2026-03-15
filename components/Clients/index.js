import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../lib/LanguageContext'

const CLIENTS_PER_PAGE = 8

const Clients = ({ className = '' }) => {
    const { t } = useLanguage();
    const [allClients, setAllClients] = useState([])
    const [visibleCount, setVisibleCount] = useState(CLIENTS_PER_PAGE)
    const [loading, setLoading] = useState(true)
    const gridRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            const { data, error } = await supabase
                .from('client_logos')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error

            if (data && data.length > 0) {
                setAllClients(data)
            }
        } catch (error) {
            console.error('Error fetching clients:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + CLIENTS_PER_PAGE)
    }

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current || !gridRef.current) return
        const rect = gridRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        containerRef.current.style.setProperty('--mouse-x', `${x}px`)
        containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    }, [])

    if (loading || allClients.length === 0) {
        return null
    }

    const visibleClients = allClients.slice(0, visibleCount)
    const hasMore = visibleCount < allClients.length

    return (
        <div id="clients" className={`clientsSection ${className}`}>
            <Grid container className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={t('clients.title')}
                        subTitle={t('clients.subtitle')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div
                        ref={containerRef}
                        className="clients-grid-wrapper"
                        onMouseMove={handleMouseMove}
                    >
                        {/* Hover glow overlay */}
                        <div className="clients-grid__glow" />
                        <div ref={gridRef} className="clients-grid">
                            {visibleClients.map((client) => (
                                <div key={client.id} className="clients-grid__cell">
                                    <div className="clients-grid__logo-wrap">
                                        <img
                                            src={client.logo_url}
                                            alt={client.name}
                                        />
                                        <span className="logoName">{client.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {hasMore && (
                            <div className="loadMoreWrapper">
                                <button className="btnStyle" onClick={handleLoadMore}>
                                    {t('clients.loadMore')}
                                </button>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Clients
