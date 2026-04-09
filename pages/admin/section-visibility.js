import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    CircularProgress,
    Chip
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

const SectionVisibilityAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [sections, setSections] = useState([])
    const [toggling, setToggling] = useState(null)

    useEffect(() => {
        fetchSections()
    }, [])

    const fetchSections = async () => {
        try {
            const { data, error } = await supabase
                .from('section_visibility')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setSections(data || [])
        } catch (error) {
            console.error('Error fetching sections:', error)
            toast.error('Failed to load sections')
        } finally {
            setLoading(false)
        }
    }

    const handleToggle = async (sectionKey, currentValue) => {
        setToggling(sectionKey)
        try {
            const { error } = await supabase
                .from('section_visibility')
                .update({ is_visible: !currentValue })
                .eq('section_key', sectionKey)

            if (error) throw error

            setSections(prev =>
                prev.map(s =>
                    s.section_key === sectionKey
                        ? { ...s, is_visible: !currentValue }
                        : s
                )
            )

            toast.success(
                `${sections.find(s => s.section_key === sectionKey)?.section_label} is now ${!currentValue ? 'visible' : 'hidden'}`
            )
        } catch (error) {
            console.error('Error toggling visibility:', error)
            toast.error('Failed to update visibility')
        } finally {
            setToggling(null)
        }
    }

    if (loading) {
        return (
            <>
                <Head>
                    <title>Section Visibility - Arbex Law Admin</title>
                </Head>
                <AdminLayout title="Section Visibility">
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
                <title>Section Visibility - Arbex Law Admin</title>
            </Head>
            <AdminLayout title="Section Visibility">
                <div className="sectionAdminPage">
                    <Paper className="pageHeader">
                        <div className="headerContent">
                            <h2>Section Visibility</h2>
                            <p>Show or hide sections on the public website. Hidden sections will not appear to visitors.</p>
                        </div>
                    </Paper>

                    <TableContainer component={Paper} style={{ marginTop: 24 }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ background: '#151a30' }}>
                                    <TableCell style={{ color: '#c0b596', fontWeight: 'bold', width: 60 }}>#</TableCell>
                                    <TableCell style={{ color: '#c0b596', fontWeight: 'bold' }}>Section (English)</TableCell>
                                    <TableCell style={{ color: '#c0b596', fontWeight: 'bold', textAlign: 'right', direction: 'rtl' }}>القسم (عربي)</TableCell>
                                    <TableCell style={{ color: '#c0b596', fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                                    <TableCell style={{ color: '#c0b596', fontWeight: 'bold', textAlign: 'center' }}>Toggle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sections.map((section, index) => (
                                    <TableRow
                                        key={section.section_key}
                                        style={{
                                            background: section.is_visible ? 'inherit' : '#fff5f5',
                                            opacity: section.is_visible ? 1 : 0.7
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {section.is_visible
                                                    ? <VisibilityIcon style={{ color: '#4caf50', fontSize: 20 }} />
                                                    : <VisibilityOffIcon style={{ color: '#f44336', fontSize: 20 }} />
                                                }
                                                <span style={{ fontWeight: 500 }}>{section.section_label}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'right', direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
                                            {section.section_label_ar || '—'}
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <Chip
                                                label={section.is_visible ? 'Visible' : 'Hidden'}
                                                size="small"
                                                style={{
                                                    background: section.is_visible ? '#e8f5e9' : '#ffebee',
                                                    color: section.is_visible ? '#2e7d32' : '#c62828',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {toggling === section.section_key ? (
                                                <CircularProgress size={24} style={{ color: '#c0b596' }} />
                                            ) : (
                                                <Switch
                                                    checked={section.is_visible}
                                                    onChange={() => handleToggle(section.section_key, section.is_visible)}
                                                    sx={{
                                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                                            color: '#4caf50',
                                                        },
                                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                            backgroundColor: '#4caf50',
                                                        },
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Paper style={{ marginTop: 24, padding: 20, background: '#fff8e1' }}>
                        <p style={{ margin: 0, color: '#f57f17', fontWeight: 500 }}>
                            💡 Note: Toggling a section affects both the English and Arabic versions of the website.
                            The section will be hidden/shown for all visitors regardless of language.
                        </p>
                    </Paper>
                </div>
            </AdminLayout>
        </>
    )
}

export default SectionVisibilityAdmin
