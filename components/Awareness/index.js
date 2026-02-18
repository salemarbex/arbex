import React, { useState, useEffect } from 'react'
import { Grid, Button, Modal, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SectionTitle from '../Title'
import { supabase } from '../../lib/supabase'

const Awareness = ({ className = '' }) => {
    const [awarenessItems, setAwarenessItems] = useState([])
    const [displayedItems, setDisplayedItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showLoadMore, setShowLoadMore] = useState(false)
    const itemsPerPage = 6

    useEffect(() => {
        fetchAwarenessItems()
    }, [])

    const fetchAwarenessItems = async () => {
        try {
            const { data, error } = await supabase
                .from('awareness')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setAwarenessItems(data || [])
            setDisplayedItems((data || []).slice(0, itemsPerPage))
            setShowLoadMore((data || []).length > itemsPerPage)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching awareness items:', error)
            // Use fallback data if Supabase table doesn't exist yet
            const fallbackData = [
                {
                    id: 1,
                    title: 'General Service',
                    subtitle: 'Corporate',
                    image_url: '/images/studies/1.jpg',
                    details: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
                },
                {
                    id: 2,
                    title: 'Personal Issue',
                    subtitle: 'General',
                    image_url: '/images/studies/2.jpg',
                    details: 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.'
                },
                {
                    id: 3,
                    title: 'Business Accounting',
                    subtitle: 'Business',
                    image_url: '/images/studies/3.jpg',
                    details: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced for those interested.'
                },
                {
                    id: 4,
                    title: 'Accounting Issue',
                    subtitle: 'Criminal',
                    image_url: '/images/studies/4.jpg',
                    details: 'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form.'
                },
                {
                    id: 5,
                    title: 'Business Consulting',
                    subtitle: 'Family Issue',
                    image_url: '/images/studies/5.jpg',
                    details: 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil).'
                },
                {
                    id: 6,
                    title: 'Legal Advisory',
                    subtitle: 'Legal',
                    image_url: '/images/studies/1.jpg',
                    details: 'This book is a treatise on the theory of ethics, very popular during the Renaissance.'
                }
            ]
            setAwarenessItems(fallbackData)
            setDisplayedItems(fallbackData.slice(0, itemsPerPage))
            setShowLoadMore(fallbackData.length > itemsPerPage)
            setLoading(false)
        }
    }

    const handleLoadMore = () => {
        const currentLength = displayedItems.length
        const nextItems = awarenessItems.slice(currentLength, currentLength + itemsPerPage)
        setDisplayedItems([...displayedItems, ...nextItems])
        setShowLoadMore(currentLength + itemsPerPage < awarenessItems.length)
    }

    const handleItemClick = (item) => {
        setSelectedItem(item)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedItem(null)
    }

    return (
        <Grid id="awareness" className={`portfolioArea portfolioAreaStyleTwo ${className}`}>
            <Grid container className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title="Our Recent Case Studies"
                        subTitle="Awareness"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={4} className="container">
                {displayedItems.map((item, i) => (
                    <Grid key={item.id || i} item md={4} sm={6} xs={12}>
                        <Grid 
                            className="portfolioItem" 
                            onClick={() => handleItemClick(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={item.image_url} alt={item.title} />
                            <Grid className="portfolioContent">
                                <p>{item.subtitle}</p>
                                <h3>{item.title}</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            {showLoadMore && (
                <Grid container justifyContent="center" style={{ marginTop: '40px' }}>
                    <Button 
                        className="btnStyle" 
                        onClick={handleLoadMore}
                    >
                        Load More
                    </Button>
                </Grid>
            )}

            {/* Lightbox Modal */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="awareness-modal-title"
                aria-describedby="awareness-modal-description"
            >
                <Box className="awarenessModal">
                    <IconButton
                        className="closeModalBtn"
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </IconButton>
                    {selectedItem && (
                        <Grid container spacing={4} className="modalContent">
                            <Grid item md={6} xs={12}>
                                <div className="modalImageWrapper">
                                    <img 
                                        src={selectedItem.image_url} 
                                        alt={selectedItem.title} 
                                        className="modalImage"
                                    />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="modalTextContent">
                                    <span className="modalSubtitle">{selectedItem.subtitle}</span>
                                    <h2 className="modalTitle">{selectedItem.title}</h2>
                                    <p className="modalDetails">{selectedItem.details}</p>
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>
        </Grid>
    )
}

export default Awareness
