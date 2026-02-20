import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
    AppBar, 
    Toolbar, 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText,
    IconButton,
    Box,
    Divider,
    Collapse
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CampaignIcon from '@mui/icons-material/Campaign'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import WebIcon from '@mui/icons-material/Web'
import InfoIcon from '@mui/icons-material/Info'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedIcon from '@mui/icons-material/Verified'
import BusinessIcon from '@mui/icons-material/Business'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

const drawerWidth = 260

const AdminLayout = ({ children, title = 'Dashboard' }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [sectionsOpen, setSectionsOpen] = useState(true)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin')
        } else {
            setUser(session.user)
        }
        setLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        toast.success('Logged out successfully')
        router.push('/admin')
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleSectionsClick = () => {
        setSectionsOpen(!sectionsOpen)
    }

    const mainMenuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'Awareness', icon: <CampaignIcon />, path: '/admin/awareness' },
    ]

    const sectionMenuItems = [
        { text: 'Home Section', icon: <HomeIcon />, path: '/admin/home-section' },
        { text: 'About Section', icon: <InfoIcon />, path: '/admin/about-section' },
        { text: 'Consultant', icon: <PersonIcon />, path: '/admin/consultant-section' },
        { text: 'Accreditation', icon: <VerifiedIcon />, path: '/admin/accreditation' },
        { text: 'Clients', icon: <BusinessIcon />, path: '/admin/clients' },
        { text: 'Contact Purposes', icon: <ContactMailIcon />, path: '/admin/contact-purposes' },
    ]

    const drawer = (
        <div className="adminDrawer">
            <div className="drawerHeader">
                <img src="/images/logo/arbex.png" alt="Arbex Law" />
                <span>Admin Panel</span>
            </div>
            <Divider />
            <List>
                {mainMenuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.text} 
                        component={Link} 
                        href={item.path}
                        className={router.pathname === item.path ? 'activeItem' : ''}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleSectionsClick}>
                    <ListItemIcon><WebIcon /></ListItemIcon>
                    <ListItemText primary="Page Sections" />
                    {sectionsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={sectionsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {sectionMenuItems.map((item) => (
                            <ListItem 
                                button 
                                key={item.text} 
                                component={Link} 
                                href={item.path}
                                className={`nestedItem ${router.pathname === item.path ? 'activeItem' : ''}`}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List>
                <ListItem button component={Link} href="/home" target="_blank">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="View Website" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    )

    if (loading) {
        return (
            <div className="adminLoading">
                <div className="loader"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="adminLayout">
            <AppBar position="fixed" className="adminAppBar">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className="menuButton"
                    >
                        <MenuIcon />
                    </IconButton>
                    <h1 className="pageTitle">{title}</h1>
                    <div className="userInfo">
                        <span>{user.email}</span>
                    </div>
                </Toolbar>
            </AppBar>
            <Box component="nav" className="adminNav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    className="mobileDrawer"
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    className="desktopDrawer"
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" className="adminMain">
                <Toolbar />
                <div className="adminContent">
                    {children}
                </div>
            </Box>
            <style jsx global>{`
                .adminLayout {
                    display: flex;
                    min-height: 100vh;
                    background: #f5f5f5;
                }
                .adminAppBar {
                    background: #151a30 !important;
                    z-index: 1201 !important;
                }
                .adminAppBar .menuButton {
                    margin-right: 16px;
                }
                @media (min-width: 960px) {
                    .adminAppBar .menuButton {
                        display: none;
                    }
                    .adminAppBar {
                        width: calc(100% - ${drawerWidth}px) !important;
                        margin-left: ${drawerWidth}px !important;
                    }
                }
                .adminAppBar .pageTitle {
                    font-family: 'Playfair Display', serif;
                    font-size: 20px;
                    flex-grow: 1;
                }
                .adminAppBar .userInfo {
                    font-size: 14px;
                    color: #c0b596;
                }
                .adminNav {
                    width: ${drawerWidth}px;
                    flex-shrink: 0;
                }
                .mobileDrawer .MuiDrawer-paper {
                    width: ${drawerWidth}px;
                    background: #151a30 !important;
                }
                .desktopDrawer {
                    display: none;
                }
                .desktopDrawer .MuiDrawer-paper {
                    width: ${drawerWidth}px;
                    background: #151a30 !important;
                }
                @media (min-width: 960px) {
                    .mobileDrawer {
                        display: none;
                    }
                    .desktopDrawer {
                        display: block;
                    }
                }
                .adminDrawer {
                    color: #fff;
                }
                .drawerHeader {
                    padding: 20px;
                    text-align: center;
                }
                .drawerHeader img {
                    height: 40px;
                    margin-bottom: 10px;
                }
                .drawerHeader span {
                    display: block;
                    font-size: 14px;
                    color: #c0b596;
                }
                .adminDrawer .MuiListItem-root {
                    color: #ddd;
                    padding: 12px 20px;
                }
                .adminDrawer .MuiListItem-root:hover {
                    background: rgba(192, 181, 150, 0.1);
                }
                .adminDrawer .MuiListItem-root.activeItem {
                    background: rgba(192, 181, 150, 0.2);
                    border-left: 3px solid #c0b596;
                }
                .adminDrawer .MuiListItem-root.nestedItem {
                    padding-left: 40px;
                }
                .adminDrawer .MuiSvgIcon-root {
                    color: #c0b596;
                }
                .adminDrawer .MuiListItemIcon-root {
                    color: #c0b596;
                    min-width: 40px;
                }
                .adminDrawer .MuiDivider-root {
                    background: rgba(192, 181, 150, 0.2);
                }
                .adminMain {
                    flex-grow: 1;
                    padding: 24px;
                }
                @media (min-width: 960px) {
                    .adminMain {
                        width: calc(100% - ${drawerWidth}px);
                        margin-left: ${drawerWidth}px;
                    }
                }
                .adminContent {
                    padding-top: 20px;
                }
                .adminLoading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: #151a30;
                }
                .adminLoading .loader {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(192, 181, 150, 0.3);
                    border-top-color: #c0b596;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

export default AdminLayout
