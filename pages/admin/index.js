import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Grid, Button, TextField, Paper } from '@mui/material'
import { toast } from 'react-toastify'
import { supabase } from '../../lib/supabase'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [resetMode, setResetMode] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check if already logged in
        checkUser()
    }, [])

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
            router.push('/admin/dashboard')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            toast.success('Login successful!')
            router.push('/admin/dashboard')
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.message || 'Login failed. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email address')
            return
        }
        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            })

            if (error) throw error

            toast.success('Password reset email sent! Check your inbox.')
            setResetMode(false)
        } catch (error) {
            console.error('Reset password error:', error)
            toast.error(error.message || 'Failed to send reset email.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>{resetMode ? 'Reset Password' : 'Admin Login'} - Arbex Law</title>
            </Head>
            <div className="adminLoginPage">
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={11} sm={8} md={4} lg={3}>
                        <Paper className="loginCard">
                            <div className="loginHeader">
                                <img src="/images/logo/arbex.png" alt="Arbex Law" className="loginLogo" />
                                <h2>Admin Panel</h2>
                                <p>{resetMode ? 'Enter your email to reset password' : 'Sign in to manage your website'}</p>
                            </div>
                            {!resetMode ? (
                                <form onSubmit={handleLogin} className="loginForm">
                                    <div className="formGroup">
                                        <TextField
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <TextField
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        className="loginBtn"
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                    <div className="forgotPassword">
                                        <button type="button" onClick={() => setResetMode(true)}>
                                            Forgot Password?
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleResetPassword} className="loginForm">
                                    <div className="formGroup">
                                        <TextField
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        className="loginBtn"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </Button>
                                    <div className="forgotPassword">
                                        <button type="button" onClick={() => setResetMode(false)}>
                                            Back to Login
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <style jsx global>{`
                .adminLoginPage {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #151a30 0%, #282e3f 100%);
                }
                .loginCard {
                    padding: 40px;
                    border-radius: 8px;
                    background: #fff;
                }
                .loginHeader {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .loginHeader .loginLogo {
                    height: 70px;
                    margin-bottom: 20px;
                }
                .loginHeader h2 {
                    font-family: 'Playfair Display', serif;
                    color: #282e3f;
                    margin-bottom: 10px;
                }
                .loginHeader p {
                    color: #666;
                    font-size: 14px;
                }
                .loginForm .formGroup {
                    margin-bottom: 20px;
                }
                .loginBtn {
                    background: #c0b596 !important;
                    color: #fff !important;
                    padding: 12px !important;
                    font-size: 16px !important;
                    text-transform: none !important;
                }
                .loginBtn:hover {
                    background: #a89f7f !important;
                }
                .loginBtn:disabled {
                    opacity: 0.7 !important;
                }
                .forgotPassword {
                    text-align: center;
                    margin-top: 20px;
                }
                .forgotPassword button {
                    background: none;
                    border: none;
                    color: #c0b596;
                    cursor: pointer;
                    font-size: 14px;
                    text-decoration: underline;
                }
                .forgotPassword button:hover {
                    color: #a89f7f;
                }
            `}</style>
        </>
    )
}

export default AdminLogin
