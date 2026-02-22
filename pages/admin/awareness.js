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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { replaceInStorage, deleteFromStorage } from '../../lib/storageHelper'
import { toast } from 'react-toastify'

const AwarenessAdmin = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        details: '',
        image_url: '',
        title_ar: '',
        subtitle_ar: '',
        details_ar: ''
    })
    const [imageFile, setImageFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('awareness')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setItems(data || [])
        } catch (error) {
            console.error('Error fetching items:', error)
            toast.error('Failed to load awareness items')
        } finally {
            setLoading(false)
        }
    }

    const handleOpenDialog = (item = null) => {
        if (item) {
            setSelectedItem(item)
            setFormData({
                title: item.title,
                subtitle: item.subtitle,
                details: item.details,
                image_url: item.image_url,
                title_ar: item.title_ar || '',
                subtitle_ar: item.subtitle_ar || '',
                details_ar: item.details_ar || ''
            })
        } else {
            setSelectedItem(null)
            setFormData({
                title: '',
                subtitle: '',
                details: '',
                image_url: '',
                title_ar: '',
                subtitle_ar: '',
                details_ar: ''
            })
        }
        setImageFile(null)
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedItem(null)
        setFormData({
            title: '',
            subtitle: '',
            details: '',
            image_url: '',
            title_ar: '',
            subtitle_ar: '',
            details_ar: ''
        })
        setImageFile(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUploading(true)

        try {
            let imageUrl = formData.image_url

            // Upload new image if selected (and delete old one)
            if (imageFile) {
                const newUrl = await replaceInStorage(
                    imageFile,
                    selectedItem?.image_url, // Pass old URL to delete
                    'awareness',
                    'images'
                )
                if (newUrl) {
                    imageUrl = newUrl
                }
            }

            const itemData = {
                title: formData.title,
                subtitle: formData.subtitle,
                details: formData.details,
                image_url: imageUrl,
                title_ar: formData.title_ar || '',
                subtitle_ar: formData.subtitle_ar || '',
                details_ar: formData.details_ar || ''
            }

            if (selectedItem) {
                // Update existing item
                const { error } = await supabase
                    .from('awareness')
                    .update(itemData)
                    .eq('id', selectedItem.id)

                if (error) throw error
                toast.success('Item updated successfully')
            } else {
                // Create new item
                const { error } = await supabase
                    .from('awareness')
                    .insert([itemData])

                if (error) throw error
                toast.success('Item created successfully')
            }

            handleCloseDialog()
            fetchItems()
        } catch (error) {
            console.error('Error saving item:', error)
            toast.error('Failed to save item')
        } finally {
            setUploading(false)
        }
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            // Delete the image from storage first
            if (selectedItem.image_url) {
                await deleteFromStorage(selectedItem.image_url, 'images')
            }

            // Then delete from database
            const { error } = await supabase
                .from('awareness')
                .delete()
                .eq('id', selectedItem.id)

            if (error) throw error

            toast.success('Item deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedItem(null)
            fetchItems()
        } catch (error) {
            console.error('Error deleting item:', error)
            toast.error('Failed to delete item')
        }
    }

    return (
        <>
            <Head>
                <title>Awareness Management - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Awareness Management">
                <div className="awarenessAdminPage">
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>Awareness Items</h2>
                            <p>Manage case studies displayed in the Awareness section</p>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            className="addBtn"
                        >
                            Add New Item
                        </Button>
                    </Paper>

                    <TableContainer component={Paper} className="tableContainer">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Subtitle</TableCell>
                                    <TableCell>Details</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">Loading...</TableCell>
                                    </TableRow>
                                ) : items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">No items found. Add your first awareness item!</TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <img 
                                                    src={item.image_url} 
                                                    alt={item.title}
                                                    className="tableImage"
                                                />
                                            </TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.subtitle}</TableCell>
                                            <TableCell>
                                                <div className="detailsPreview">
                                                    {item.details?.substring(0, 100)}...
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleOpenDialog(item)}
                                                    className="editBtn"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleDeleteClick(item)}
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
                    <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                        <DialogTitle>
                            {selectedItem ? 'Edit Awareness Item' : 'Add New Awareness Item'}
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <h4 style={{ margin: '0 0 5px', fontFamily: 'Playfair Display, serif', color: '#282e3f' }}>English Content</h4>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Subtitle"
                                            name="subtitle"
                                            value={formData.subtitle}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Details"
                                            name="details"
                                            value={formData.details}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <h4 style={{ margin: '10px 0 5px', fontFamily: 'Playfair Display, serif', color: '#282e3f' }}>Arabic Content - المحتوى العربي</h4>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="العنوان (Title Arabic)"
                                            name="title_ar"
                                            value={formData.title_ar}
                                            onChange={handleInputChange}
                                            fullWidth
                                            inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="العنوان الفرعي (Subtitle Arabic)"
                                            name="subtitle_ar"
                                            value={formData.subtitle_ar}
                                            onChange={handleInputChange}
                                            fullWidth
                                            inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="التفاصيل (Details Arabic)"
                                            name="details_ar"
                                            value={formData.details_ar}
                                            onChange={handleInputChange}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className="imageUpload">
                                            <label>Image (600x594 recommended)</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            {(formData.image_url || imageFile) && (
                                                <div className="imagePreview">
                                                    <img 
                                                        src={imageFile ? URL.createObjectURL(imageFile) : formData.image_url} 
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
                                    disabled={uploading}
                                    className="submitBtn"
                                >
                                    {uploading ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete "{selectedItem?.title}"? This action cannot be undone.
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
                    .awarenessAdminPage .pageHeader {
                        padding: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .awarenessAdminPage .headerContent h2 {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        margin: 0;
                    }
                    .awarenessAdminPage .headerContent p {
                        color: #666;
                        margin: 5px 0 0;
                        font-size: 14px;
                    }
                    .awarenessAdminPage .addBtn {
                        background: #c0b596 !important;
                        color: #fff !important;
                    }
                    .awarenessAdminPage .tableContainer {
                        margin-top: 20px;
                    }
                    .awarenessAdminPage .tableImage {
                        width: 80px;
                        height: 60px;
                        object-fit: cover;
                        border-radius: 4px;
                    }
                    .awarenessAdminPage .detailsPreview {
                        max-width: 300px;
                        font-size: 13px;
                        color: #666;
                    }
                    .awarenessAdminPage .editBtn {
                        color: #c0b596;
                    }
                    .awarenessAdminPage .deleteBtn {
                        color: #f44336;
                    }
                    .awarenessAdminPage .imageUpload {
                        margin-top: 10px;
                    }
                    .awarenessAdminPage .imageUpload label {
                        display: block;
                        margin-bottom: 10px;
                        font-weight: 500;
                        color: #666;
                    }
                    .awarenessAdminPage .imageUpload input {
                        margin-bottom: 15px;
                    }
                    .awarenessAdminPage .imagePreview {
                        margin-top: 10px;
                    }
                    .awarenessAdminPage .imagePreview img {
                        max-width: 200px;
                        height: auto;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                    }
                    .awarenessAdminPage .submitBtn {
                        background: #c0b596 !important;
                    }
                `}</style>
            </AdminLayout>
        </>
    )
}

export default AwarenessAdmin
