import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {
    Grid,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { replaceInStorage, deleteFromStorage } from '../../lib/storageHelper'
import { toast } from 'react-toastify'

const ClientsAdmin = () => {
    const [logos, setLogos] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        logo_url: ''
    })
    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchLogos()
    }, [])

    const fetchLogos = async () => {
        try {
            const { data, error } = await supabase
                .from('client_logos')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setLogos(data || [])
        } catch (error) {
            console.error('Error fetching logos:', error)
            toast.error('Failed to load client logos')
        } finally {
            setLoading(false)
        }
    }

    const handleOpenDialog = (logo = null) => {
        if (logo) {
            setSelectedLogo(logo)
            setFormData({
                name: logo.name,
                logo_url: logo.logo_url
            })
        } else {
            setSelectedLogo(null)
            setFormData({
                name: '',
                logo_url: ''
            })
        }
        setLogoFile(null)
        setLogoPreview(null)
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedLogo(null)
        setFormData({ name: '', logo_url: '' })
        setLogoFile(null)
        setLogoPreview(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            let logoUrl = formData.logo_url

            // Upload new logo if selected
            if (logoFile) {
                const newUrl = await replaceInStorage(
                    logoFile,
                    selectedLogo?.logo_url,
                    'clients',
                    'images'
                )
                if (newUrl) {
                    logoUrl = newUrl
                }
            }

            if (!logoUrl && !logoFile) {
                toast.error('Please upload a logo image')
                setSaving(false)
                return
            }

            const logoData = {
                name: formData.name,
                logo_url: logoUrl,
                display_order: selectedLogo?.display_order || logos.length
            }

            if (selectedLogo) {
                // Update existing logo
                const { error } = await supabase
                    .from('client_logos')
                    .update(logoData)
                    .eq('id', selectedLogo.id)

                if (error) throw error
                toast.success('Client logo updated successfully')
            } else {
                // Create new logo
                const { error } = await supabase
                    .from('client_logos')
                    .insert([logoData])

                if (error) throw error
                toast.success('Client logo added successfully')
            }

            handleCloseDialog()
            fetchLogos()
        } catch (error) {
            console.error('Error saving logo:', error)
            toast.error('Failed to save logo')
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteClick = (logo) => {
        setSelectedLogo(logo)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            // Delete the logo image from storage first
            await deleteFromStorage(selectedLogo.logo_url, 'images')

            // Then delete from database
            const { error } = await supabase
                .from('client_logos')
                .delete()
                .eq('id', selectedLogo.id)

            if (error) throw error

            toast.success('Client logo deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedLogo(null)
            fetchLogos()
        } catch (error) {
            console.error('Error deleting logo:', error)
            toast.error('Failed to delete logo')
        }
    }

    const handleMoveUp = async (index) => {
        if (index === 0) return
        
        const newLogos = [...logos]
        const temp = newLogos[index].display_order
        newLogos[index].display_order = newLogos[index - 1].display_order
        newLogos[index - 1].display_order = temp
        
        try {
            await supabase
                .from('client_logos')
                .update({ display_order: newLogos[index].display_order })
                .eq('id', newLogos[index].id)
            
            await supabase
                .from('client_logos')
                .update({ display_order: newLogos[index - 1].display_order })
                .eq('id', newLogos[index - 1].id)
            
            fetchLogos()
        } catch (error) {
            console.error('Error reordering:', error)
        }
    }

    const handleMoveDown = async (index) => {
        if (index === logos.length - 1) return
        
        const newLogos = [...logos]
        const temp = newLogos[index].display_order
        newLogos[index].display_order = newLogos[index + 1].display_order
        newLogos[index + 1].display_order = temp
        
        try {
            await supabase
                .from('client_logos')
                .update({ display_order: newLogos[index].display_order })
                .eq('id', newLogos[index].id)
            
            await supabase
                .from('client_logos')
                .update({ display_order: newLogos[index + 1].display_order })
                .eq('id', newLogos[index + 1].id)
            
            fetchLogos()
        } catch (error) {
            console.error('Error reordering:', error)
        }
    }

    return (
        <>
            <Head>
                <title>Client Logos - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Client Logos">
                <div className="clientsAdminPage">
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>Client Logos</h2>
                            <p>Manage client logos displayed in the Clients section</p>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            className="addBtn"
                        >
                            Add New Client
                        </Button>
                    </Paper>

                    <TableContainer component={Paper} className="tableContainer">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Logo</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <CircularProgress size={24} style={{ color: '#c0b596' }} />
                                        </TableCell>
                                    </TableRow>
                                ) : logos.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No client logos found. Add your first client!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    logos.map((logo, index) => (
                                        <TableRow key={logo.id}>
                                            <TableCell>
                                                <div className="orderButtons">
                                                    <IconButton 
                                                        size="small"
                                                        onClick={() => handleMoveUp(index)}
                                                        disabled={index === 0}
                                                    >
                                                        <ArrowUpwardIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton 
                                                        size="small"
                                                        onClick={() => handleMoveDown(index)}
                                                        disabled={index === logos.length - 1}
                                                    >
                                                        <ArrowDownwardIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <img 
                                                    src={logo.logo_url} 
                                                    alt={logo.name}
                                                    className="tableLogo"
                                                />
                                            </TableCell>
                                            <TableCell>{logo.name}</TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleOpenDialog(logo)}
                                                    className="editBtn"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleDeleteClick(logo)}
                                                    className="deleteBtn"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Add/Edit Dialog */}
                    <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            {selectedLogo ? 'Edit Client' : 'Add New Client'}
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Client Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="logoUpload">
                                            <label>Logo Image (PNG recommended, transparent background)</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                            />
                                            {(logoPreview || formData.logo_url) && (
                                                <div className="logoPreview">
                                                    <img 
                                                        src={logoPreview || formData.logo_url} 
                                                        alt="Preview" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    disabled={saving}
                                    className="submitBtn"
                                >
                                    {saving ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete "{selectedLogo?.name}"? This action cannot be undone.
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <style jsx global>{`
                    .clientsAdminPage .pageHeader {
                        padding: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .clientsAdminPage .headerContent h2 {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        margin: 0;
                    }
                    .clientsAdminPage .headerContent p {
                        color: #666;
                        margin: 5px 0 0;
                        font-size: 14px;
                    }
                    .clientsAdminPage .addBtn {
                        background: #c0b596 !important;
                        color: #fff !important;
                    }
                    .clientsAdminPage .tableContainer {
                        margin-top: 20px;
                    }
                    .clientsAdminPage .tableLogo {
                        max-width: 120px;
                        max-height: 60px;
                        object-fit: contain;
                    }
                    .clientsAdminPage .orderButtons {
                        display: flex;
                        flex-direction: column;
                    }
                    .clientsAdminPage .editBtn {
                        color: #c0b596;
                    }
                    .clientsAdminPage .deleteBtn {
                        color: #f44336;
                    }
                    .clientsAdminPage .logoUpload {
                        margin-top: 10px;
                    }
                    .clientsAdminPage .logoUpload label {
                        display: block;
                        margin-bottom: 10px;
                        font-weight: 500;
                        color: #666;
                    }
                    .clientsAdminPage .logoUpload input {
                        margin-bottom: 15px;
                    }
                    .clientsAdminPage .logoPreview {
                        margin-top: 10px;
                        padding: 20px;
                        background: #f5f5f5;
                        border-radius: 8px;
                        text-align: center;
                    }
                    .clientsAdminPage .logoPreview img {
                        max-width: 200px;
                        max-height: 100px;
                        object-fit: contain;
                    }
                    .clientsAdminPage .submitBtn {
                        background: #c0b596 !important;
                    }
                `}</style>
            </AdminLayout>
        </>
    )
}

export default ClientsAdmin
