import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Grid, Button, TextField, Paper } from '@mui/material'
import { toast } from 'react-toastify'
import { supabase } from '../../lib/supabase'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check if we have a valid session from the reset link
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                setReady(true)
            } else {
                // Listen for auth state changes (when user clicks reset link)
                supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'PASSWORD_RECOVERY') {
                        setReady(true)
                    }
                })
            }
        }
        checkSession()
    }, [])

    const handleResetPassword = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }

        setLoading(true)

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            toast.success('Password updated successfully!')
            router.push('/admin')
        } catch (error) {
            console.error('Reset password error:', error)
            toast.error(error.message || 'Failed to reset password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Reset Password - Arbex Law Admin</title>
            </Head>
            <div className="adminLoginPage">
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={11} sm={8} md={4} lg={3}>
                        <Paper className="loginCard">
                            <div className="loginHeader">
                                <img src="/images/logo/arbex.png" alt="Arbex Law" className="loginLogo" />
                                <h2>Reset Password</h2>
                                <p>Enter your new password below</p>
                            </div>
                            {ready ? (
                                <form onSubmit={handleResetPassword} className="loginForm">
                                    <div className="formGroup">
                                        <TextField
                                            label="New Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <TextField
                                            label="Confirm New Password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                        {loading ? 'Updating...' : 'Update Password'}
                                    </Button>
                                </form>
                            ) : (
                                <div className="loadingMessage">
                                    <p>Verifying reset link...</p>
                                    <p className="small">If this takes too long, the link may have expired.</p>
                                    <Button
                                        onClick={() => router.push('/admin')}
                                        className="backBtn"
                                    >
                                        Back to Login
                                    </Button>
                                </div>
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
                .loadingMessage {
                    text-align: center;
                }
                .loadingMessage p {
                    color: #666;
                    margin-bottom: 10px;
                }
                .loadingMessage .small {
                    font-size: 12px;
                    color: #999;
                }
                .backBtn {
                    margin-top: 20px !important;
                    color: #c0b596 !important;
                }
            `}</style>
        </>
    )
}

export default ResetPassword
