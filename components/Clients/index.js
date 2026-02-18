import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material'
import SectionTitle from '../Title'
import { supabase } from '../../lib/supabase'

const Clients = ({ className = '' }) => {
    const [allClients, setAllClients] = useState([])
    const [displayedClients, setDisplayedClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [showLoadMore, setShowLoadMore] = useState(false)
    const clientsPerPage = 8

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
                setDisplayedClients(data.slice(0, clientsPerPage))
                setShowLoadMore(data.length > clientsPerPage)
            }
        } catch (error) {
            console.error('Error fetching clients:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLoadMore = () => {
        const currentLength = displayedClients.length
        const nextClients = allClients.slice(currentLength, currentLength + clientsPerPage)
        setDisplayedClients([...displayedClients, ...nextClients])
        setShowLoadMore(currentLength + clientsPerPage < allClients.length)
    }

    if (loading || allClients.length === 0) {
        return null // Don't show section if no clients
    }

    return (
        <div id="clients" className={`clientsSection ${className}`}>
            <Grid container className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title="Our Clients"
                        subTitle="Trusted Partners"
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className="clientsLogosGrid">
                        {displayedClients.map((client) => (
                            <div key={client.id} className="clientLogoItem">
                                <div className="clientLogoCell">
                                    <div className="client-logo">
                                        <img 
                                            src={client.logo_url} 
                                            alt={client.name}
                                        />
                                        <span className="logoName">{client.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Grid>
                {showLoadMore && (
                    <Grid item xs={12} className="loadMoreWrapper">
                        <Button 
                            className="btnStyle" 
                            onClick={handleLoadMore}
                        >
                            Load More
                        </Button>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Clients
