import { getServiceSupabase } from '../../lib/supabase'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // This endpoint should only be called once during initial setup
    // You can remove or protect it after initial setup
    const { secret } = req.body

    // Simple protection - you should change this secret
    if (secret !== 'initial-setup-secret-2024') {
        return res.status(403).json({ message: 'Unauthorized' })
    }

    const supabase = getServiceSupabase()

    try {
        // Create the admin user
        const { data: userData, error: userError } = await supabase.auth.admin.createUser({
            email: 'm@wafra.net',
            password: 'M0hammadalmarri',
            email_confirm: true
        })

        if (userError && !userError.message.includes('already registered')) {
            throw userError
        }

        return res.status(200).json({ 
            message: 'Setup completed successfully',
            user: userData?.user?.email || 'm@wafra.net'
        })
    } catch (error) {
        console.error('Setup error:', error)
        return res.status(500).json({ message: error.message })
    }
}
