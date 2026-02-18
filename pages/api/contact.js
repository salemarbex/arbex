import nodemailer from 'nodemailer'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { name, email, phone, address, description } = req.body

    // Validate required fields
    if (!name || !email || !phone || !description) {
        return res.status(400).json({ message: 'Please fill in all required fields' })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    try {
        // Email to the company
        const companyMailOptions = {
            from: process.env.SMTP_FROM_EMAIL || 'noreply@arbex.law',
            to: process.env.CONTACT_EMAIL || 'info@arbex.law',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${description}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">This message was sent from the Arbex Law website contact form.</p>
            `,
        }

        // Confirmation email to the user
        const userMailOptions = {
            from: process.env.SMTP_FROM_EMAIL || 'noreply@arbex.law',
            to: email,
            subject: 'Thank you for contacting Arbex Law',
            html: `
                <h2>Thank you for contacting us!</h2>
                <p>Dear ${name},</p>
                <p>We have received your inquiry and will get back to you as soon as possible.</p>
                <p><strong>Your message:</strong></p>
                <p style="background: #f5f5f5; padding: 15px; border-left: 3px solid #c0b596;">${description}</p>
                <br>
                <p>Best regards,</p>
                <p><strong>Arbex Law</strong></p>
                <p>Zone 32, Street 958, Building 52<br>Floor 1, Office 6<br>Doha, Qatar</p>
                <p>Phone: +974 70202010<br>Email: info@arbex.law</p>
            `,
        }

        // Send both emails
        await transporter.sendMail(companyMailOptions)
        await transporter.sendMail(userMailOptions)

        return res.status(200).json({ message: 'Message sent successfully' })
    } catch (error) {
        console.error('Email sending error:', error)
        return res.status(500).json({ message: 'Failed to send message. Please try again later.' })
    }
}
