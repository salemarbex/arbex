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
    CircularProgress,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

const ICON_OPTIONS = [
    { value: 'fi flaticon-parents', label: 'Parents / Family' },
    { value: 'fi flaticon-wounded', label: 'Wounded / Injury' },
    { value: 'fi flaticon-employee', label: 'Employee / Business' },
    { value: 'fi flaticon-thief', label: 'Thief / Criminal' },
    { value: 'fi flaticon-university-graduate-hat', label: 'Graduate Hat / Education' },
    { value: 'fi flaticon-house', label: 'House / Real Estate' },
    { value: 'fi flaticon-network', label: 'Network' },
    { value: 'fi flaticon-scale', label: 'Scale / Justice' },
    { value: 'fi flaticon-lawyer', label: 'Lawyer' },
]

const SpecialitiesSectionAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [items, setItems] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    // Section heading fields (from site_content)
    const [headingData, setHeadingData] = useState({
        title: 'How Can We Help You',
        subtitle: 'Area Of Practice',
        title_ar: '',
        subtitle_ar: ''
    })

    // Card form data
    const [formData, setFormData] = useState({
        icon: 'fi flaticon-scale',
        title: '',
        content: '',
        title_ar: '',
        content_ar: '',
        display_order: 0
    })

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        try {
            await Promise.all([fetchHeadings(), fetchItems()])
        } finally {
            setLoading(false)
        }
    }

    const fetchHeadings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .eq('section', 'specialities')

            if (error) throw error

            if (data && data.length > 0) {
                const contentObj = {}
                data.forEach(item => {
                    contentObj[item.field_key] = item.field_value
                })
                setHeadingData(prev => ({ ...prev, ...contentObj }))
            }
        } catch (error) {
            console.error('Error fetching headings:', error)
        }
    }

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('specialities')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setItems(data || [])
        } catch (error) {
            console.error('Error fetching specialities:', error)
            toast.error('Failed to load specialities')
        }
    }

    const handleHeadingChange = (e) => {
        const { name, value } = e.target
        setHeadingData(prev => ({ ...prev, [name]: value }))
    }

    const handleSaveHeadings = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const updates = [
                { section: 'specialities', field_key: 'title', field_value: headingData.title },
                { section: 'specialities', field_key: 'subtitle', field_value: headingData.subtitle },
                { section: 'specialities', field_key: 'title_ar', field_value: headingData.title_ar || '' },
                { section: 'specialities', field_key: 'subtitle_ar', field_value: headingData.subtitle_ar || '' }
            ]

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_content')
                    .upsert(update, { onConflict: 'section,field_key' })

                if (error) throw error
            }

            toast.success('Section headings updated successfully!')
        } catch (error) {
            console.error('Error saving headings:', error)
            toast.error('Failed to save headings')
        } finally {
            setSaving(false)
        }
    }

    const handleOpenDialog = (item = null) => {
        if (item) {
            setSelectedItem(item)
            setFormData({
                icon: item.icon,
                title: item.title,
                content: item.content,
                title_ar: item.title_ar || '',
                content_ar: item.content_ar || '',
                display_order: item.display_order || 0
            })
        } else {
            setSelectedItem(null)
            setFormData({
                icon: 'fi flaticon-scale',
                title: '',
                content: '',
                title_ar: '',
                content_ar: '',
                display_order: items.length + 1
            })
        }
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedItem(null)
        setFormData({
            icon: 'fi flaticon-scale',
            title: '',
            content: '',
            title_ar: '',
            content_ar: '',
            display_order: 0
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const itemData = {
                icon: formData.icon,
                title: formData.title,
                content: formData.content,
                title_ar: formData.title_ar || '',
                content_ar: formData.content_ar || '',
                display_order: parseInt(formData.display_order) || 0
            }

            if (selectedItem) {
                const { error } = await supabase
                    .from('specialities')
                    .update(itemData)
                    .eq('id', selectedItem.id)

                if (error) throw error
                toast.success('Service updated successfully')
            } else {
                const { error } = await supabase
                    .from('specialities')
                    .insert([itemData])

                if (error) throw error
                toast.success('Service created successfully')
            }

            handleCloseDialog()
            fetchItems()
        } catch (error) {
            console.error('Error saving item:', error)
            toast.error('Failed to save service')
        }
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            const { error } = await supabase
                .from('specialities')
                .delete()
                .eq('id', selectedItem.id)

            if (error) throw error

            toast.success('Service deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedItem(null)
            fetchItems()
        } catch (error) {
            console.error('Error deleting item:', error)
            toast.error('Failed to delete service')
        }
    }

    if (loading) {
        return (
            <>
                <Head>
                    <title>Specialities Section - Arbex Law Admin</title>
                </Head>
                <AdminLayout title="Specialities Section">
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
                <title>Specialities Section - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Area of Practice">
                <div className="specialitiesAdminPage">
                    {/* Section Headings */}
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>Section Headings</h2>
                            <p>Manage the title and subtitle for the Area of Practice section</p>
                        </div>
                    </Paper>

                    <Paper className="formContainer">
                        <form onSubmit={handleSaveHeadings}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">English Content</h3>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Section Title"
                                        name="title"
                                        value={headingData.title}
                                        onChange={handleHeadingChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Section Subtitle"
                                        name="subtitle"
                                        value={headingData.subtitle}
                                        onChange={handleHeadingChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h3 className="sectionTitle">Arabic Content - المحتوى العربي</h3>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="عنوان القسم (Section Title Arabic)"
                                        name="title_ar"
                                        value={headingData.title_ar}
                                        onChange={handleHeadingChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="العنوان الفرعي (Subtitle Arabic)"
                                        name="subtitle_ar"
                                        value={headingData.subtitle_ar}
                                        onChange={handleHeadingChange}
                                        fullWidth
                                        inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={saving}
                                        className="saveBtn"
                                    >
                                        {saving ? 'Saving...' : 'Save Headings'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>

                    {/* Service Cards */}
                    <Paper className="pageHeader" style={{ marginTop: 30 }}>
                        <div className="headerContent">
                            <h2>Service Cards</h2>
                            <p>Manage the individual practice area cards</p>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            className="addBtn"
                        >
                            Add New Service
                        </Button>
                    </Paper>

                    <TableContainer component={Paper} className="tableContainer">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Icon</TableCell>
                                    <TableCell>Title (EN)</TableCell>
                                    <TableCell>Title (AR)</TableCell>
                                    <TableCell>Content</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">No services found. Add your first service!</TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.display_order}</TableCell>
                                            <TableCell>
                                                <i className={item.icon} style={{ fontSize: '24px', color: '#c0b596' }}></i>
                                            </TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>{item.title_ar}</TableCell>
                                            <TableCell>
                                                <div className="detailsPreview">
                                                    {item.content?.substring(0, 80)}...
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
                            {selectedItem ? 'Edit Service' : 'Add New Service'}
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
                                        <FormControl fullWidth>
                                            <InputLabel>Icon</InputLabel>
                                            <Select
                                                name="icon"
                                                value={formData.icon}
                                                onChange={handleInputChange}
                                                label="Icon"
                                            >
                                                {ICON_OPTIONS.map(opt => (
                                                    <MenuItem key={opt.value} value={opt.value}>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <i className={opt.value} style={{ fontSize: '18px' }}></i>
                                                            {opt.label}
                                                        </span>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Content"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            multiline
                                            rows={3}
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
                                            label="Display Order"
                                            name="display_order"
                                            type="number"
                                            value={formData.display_order}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="المحتوى (Content Arabic)"
                                            name="content_ar"
                                            value={formData.content_ar}
                                            onChange={handleInputChange}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            inputProps={{ dir: 'rtl', style: { fontFamily: 'Cairo, sans-serif' } }}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="submitBtn"
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete &quot;{selectedItem?.title}&quot;? This action cannot be undone.
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
                    .specialitiesAdminPage .pageHeader {
                        padding: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .specialitiesAdminPage .headerContent h2 {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        margin: 0;
                    }
                    .specialitiesAdminPage .headerContent p {
                        color: #666;
                        margin: 5px 0 0;
                        font-size: 14px;
                    }
                    .specialitiesAdminPage .formContainer {
                        padding: 30px;
                        margin-bottom: 20px;
                    }
                    .specialitiesAdminPage .sectionTitle {
                        font-family: 'Playfair Display', serif;
                        color: #282e3f;
                        font-size: 18px;
                        margin: 0;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    .specialitiesAdminPage .saveBtn {
                        background: #c0b596 !important;
                        color: #fff !important;
                        padding: 12px 40px !important;
                        font-size: 16px !important;
                    }
                    .specialitiesAdminPage .addBtn {
                        background: #c0b596 !important;
                        color: #fff !important;
                    }
                    .specialitiesAdminPage .tableContainer {
                        margin-top: 20px;
                    }
                    .specialitiesAdminPage .detailsPreview {
                        max-width: 300px;
                        font-size: 13px;
                        color: #666;
                    }
                    .specialitiesAdminPage .editBtn {
                        color: #c0b596;
                    }
                    .specialitiesAdminPage .deleteBtn {
                        color: #f44336;
                    }
                    .specialitiesAdminPage .submitBtn {
                        background: #c0b596 !important;
                    }
                `}</style>
            </AdminLayout>
        </>
    )
}

export default SpecialitiesSectionAdmin
