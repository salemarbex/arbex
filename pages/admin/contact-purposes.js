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
    Switch,
    FormControlLabel,
    CircularProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

const ContactPurposesAdmin = () => {
    const [purposes, setPurposes] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedPurpose, setSelectedPurpose] = useState(null)
    const [formData, setFormData] = useState({
        label: '',
        is_active: true
    })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchPurposes()
    }, [])

    const fetchPurposes = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_purposes')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setPurposes(data || [])
        } catch (error) {
            console.error('Error fetching purposes:', error)
            toast.error('Failed to load contact purposes')
        } finally {
            setLoading(false)
        }
    }

    const handleOpenDialog = (purpose = null) => {
        if (purpose) {
            setSelectedPurpose(purpose)
            setFormData({
                label: purpose.label,
                is_active: purpose.is_active
            })
        } else {
            setSelectedPurpose(null)
            setFormData({
                label: '',
                is_active: true
            })
        }
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedPurpose(null)
        setFormData({ label: '', is_active: true })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleToggleActive = (e) => {
        setFormData(prev => ({ ...prev, is_active: e.target.checked }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.label.trim()) {
            toast.error('Please enter a purpose label')
            return
        }

        setSaving(true)

        try {
            const purposeData = {
                label: formData.label.trim(),
                is_active: formData.is_active,
                display_order: selectedPurpose?.display_order ?? purposes.length
            }

            if (selectedPurpose) {
                const { error } = await supabase
                    .from('contact_purposes')
                    .update(purposeData)
                    .eq('id', selectedPurpose.id)

                if (error) throw error
                toast.success('Purpose updated successfully')
            } else {
                const { error } = await supabase
                    .from('contact_purposes')
                    .insert([purposeData])

                if (error) throw error
                toast.success('Purpose added successfully')
            }

            handleCloseDialog()
            fetchPurposes()
        } catch (error) {
            console.error('Error saving purpose:', error)
            toast.error('Failed to save purpose')
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteClick = (purpose) => {
        setSelectedPurpose(purpose)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            const { error } = await supabase
                .from('contact_purposes')
                .delete()
                .eq('id', selectedPurpose.id)

            if (error) throw error

            toast.success('Purpose deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedPurpose(null)
            fetchPurposes()
        } catch (error) {
            console.error('Error deleting purpose:', error)
            toast.error('Failed to delete purpose')
        }
    }

    const handleToggleActiveInline = async (purpose) => {
        try {
            const { error } = await supabase
                .from('contact_purposes')
                .update({ is_active: !purpose.is_active })
                .eq('id', purpose.id)

            if (error) throw error
            fetchPurposes()
        } catch (error) {
            console.error('Error toggling status:', error)
            toast.error('Failed to update status')
        }
    }

    const handleMoveUp = async (index) => {
        if (index === 0) return

        const newPurposes = [...purposes]
        const temp = newPurposes[index].display_order
        newPurposes[index].display_order = newPurposes[index - 1].display_order
        newPurposes[index - 1].display_order = temp

        try {
            await Promise.all([
                supabase.from('contact_purposes').update({ display_order: newPurposes[index].display_order }).eq('id', newPurposes[index].id),
                supabase.from('contact_purposes').update({ display_order: newPurposes[index - 1].display_order }).eq('id', newPurposes[index - 1].id)
            ])
            fetchPurposes()
        } catch (error) {
            console.error('Error reordering:', error)
            toast.error('Failed to reorder')
        }
    }

    const handleMoveDown = async (index) => {
        if (index === purposes.length - 1) return

        const newPurposes = [...purposes]
        const temp = newPurposes[index].display_order
        newPurposes[index].display_order = newPurposes[index + 1].display_order
        newPurposes[index + 1].display_order = temp

        try {
            await Promise.all([
                supabase.from('contact_purposes').update({ display_order: newPurposes[index].display_order }).eq('id', newPurposes[index].id),
                supabase.from('contact_purposes').update({ display_order: newPurposes[index + 1].display_order }).eq('id', newPurposes[index + 1].id)
            ])
            fetchPurposes()
        } catch (error) {
            console.error('Error reordering:', error)
            toast.error('Failed to reorder')
        }
    }

    return (
        <>
            <Head>
                <title>Contact Purposes - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Contact Purposes">
                <div className="adminPageContent">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper style={{ padding: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif" }}>
                                        Purpose of Contact Options
                                    </h3>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleOpenDialog()}
                                        style={{ background: '#c0b596', color: '#fff' }}
                                    >
                                        Add Purpose
                                    </Button>
                                </div>
                                <p style={{ color: '#666', marginBottom: 20 }}>
                                    Manage the dropdown options shown in the contact form. Users will select one of these when submitting an inquiry.
                                </p>

                                {loading ? (
                                    <div style={{ textAlign: 'center', padding: 40 }}>
                                        <CircularProgress style={{ color: '#c0b596' }} />
                                    </div>
                                ) : (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width="50">#</TableCell>
                                                    <TableCell>Purpose Label</TableCell>
                                                    <TableCell width="100" align="center">Active</TableCell>
                                                    <TableCell width="100" align="center">Order</TableCell>
                                                    <TableCell width="120" align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {purposes.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} align="center" style={{ padding: 40, color: '#999' }}>
                                                            No contact purposes added yet. Click "Add Purpose" to create one.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    purposes.map((purpose, index) => (
                                                        <TableRow key={purpose.id} style={{ opacity: purpose.is_active ? 1 : 0.5 }}>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>
                                                                <strong>{purpose.label}</strong>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Switch
                                                                    checked={purpose.is_active}
                                                                    onChange={() => handleToggleActiveInline(purpose)}
                                                                    size="small"
                                                                    sx={{
                                                                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#c0b596' },
                                                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#c0b596' }
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="center">
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
                                                                    disabled={index === purposes.length - 1}
                                                                >
                                                                    <ArrowDownwardIcon fontSize="small" />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleOpenDialog(purpose)}
                                                                    style={{ color: '#c0b596' }}
                                                                >
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDeleteClick(purpose)}
                                                                    style={{ color: '#e74c3c' }}
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Add / Edit Dialog */}
                    <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                        <DialogTitle style={{ fontFamily: "'Playfair Display', serif" }}>
                            {selectedPurpose ? 'Edit Purpose' : 'Add New Purpose'}
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="label"
                                    label="Purpose Label"
                                    placeholder="e.g. Legal Consultation"
                                    fullWidth
                                    value={formData.label}
                                    onChange={handleInputChange}
                                    required
                                    variant="outlined"
                                    style={{ marginBottom: 16 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.is_active}
                                            onChange={handleToggleActive}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#c0b596' },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#c0b596' }
                                            }}
                                        />
                                    }
                                    label="Active (visible in contact form)"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={saving}
                                    style={{ background: '#c0b596', color: '#fff' }}
                                >
                                    {saving ? <CircularProgress size={24} /> : (selectedPurpose ? 'Update' : 'Add')}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                        <DialogTitle>Delete Purpose</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete "<strong>{selectedPurpose?.label}</strong>"?
                            This option will no longer appear in the contact form.
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                            <Button
                                onClick={handleDeleteConfirm}
                                variant="contained"
                                style={{ background: '#e74c3c', color: '#fff' }}
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    )
}

export default ContactPurposesAdmin
