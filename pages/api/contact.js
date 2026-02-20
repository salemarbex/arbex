import nodemailer from 'nodemailer'
import path from 'path'

const LOGO_CID = 'arbex-logo@arbex.law'
const LOGO_SRC = `cid:${LOGO_CID}`

const getCompanyEmailHtml = ({ name, email, phone, purpose, description }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f7;padding:16px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#1e2235 0%,#272c3f 50%,#2f3549 100%);padding:24px 40px;text-align:center;position:relative;">
                            <img src="${LOGO_SRC}" alt="Arbex Law" width="140" style="display:block;margin:0 auto 8px;max-width:140px;height:auto;" />
                            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c0b596;font-weight:500;">Legal Consultancy</p>
                        </td>
                    </tr>

                    <!-- Title Bar -->
                    <tr>
                        <td style="background-color:#c0b596;padding:14px 40px;">
                            <h1 style="margin:0;font-size:16px;font-weight:600;color:#1e2235;letter-spacing:0.5px;">New Contact Form Submission</h1>
                        </td>
                    </tr>

                    <!-- Body with watermark -->
                    <tr>
                        <td style="padding:0;position:relative;">
                            <!-- Watermark background -->
                            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:320px;height:320px;opacity:0.03;pointer-events:none;z-index:0;">
                                <img src="${LOGO_SRC}" alt="" width="320" style="width:320px;max-width:320px;display:block;" />
                            </div>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="position:relative;z-index:1;">
                                <tr>
                                    <td style="padding:32px 40px 8px;">
                                        <p style="margin:0 0 24px;font-size:15px;color:#1d1d1f;line-height:1.5;">
                                            A new inquiry has been submitted through the website contact form.
                                        </p>
                                    </td>
                                </tr>

                                <!-- Info Card -->
                                <tr>
                                    <td style="padding:0 40px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9fb;border-radius:12px;overflow:hidden;border:1px solid #e8e8ed;">
                                            <tr>
                                                <td style="padding:20px 24px;border-bottom:1px solid #e8e8ed;">
                                                    <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Name</p>
                                                    <p style="margin:0;font-size:16px;color:#1d1d1f;font-weight:500;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:20px 24px;border-bottom:1px solid #e8e8ed;">
                                                    <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Email</p>
                                                    <p style="margin:0;font-size:16px;color:#1d1d1f;">
                                                        <a href="mailto:${email}" style="color:#0071e3;text-decoration:none;">${email}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:20px 24px;border-bottom:1px solid #e8e8ed;">
                                                    <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Phone</p>
                                                    <p style="margin:0;font-size:16px;color:#1d1d1f;">
                                                        <a href="tel:${phone}" style="color:#0071e3;text-decoration:none;">${phone}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:20px 24px;">
                                                    <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Purpose</p>
                                                    <p style="margin:0;font-size:16px;color:#1d1d1f;">
                                                        <span style="display:inline-block;background:#c0b596;color:#1e2235;padding:4px 14px;border-radius:20px;font-size:13px;font-weight:600;">${purpose}</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Message -->
                                <tr>
                                    <td style="padding:24px 40px 8px;">
                                        <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Message</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 40px 32px;">
                                        <div style="background-color:#f9f9fb;border-radius:12px;padding:20px 24px;border-left:4px solid #c0b596;border:1px solid #e8e8ed;border-left:4px solid #c0b596;">
                                            <p style="margin:0;font-size:15px;color:#1d1d1f;line-height:1.65;white-space:pre-wrap;">${description}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f9f9fb;padding:24px 40px;border-top:1px solid #e8e8ed;text-align:center;">
                            <p style="margin:0 0 4px;font-size:12px;color:#86868b;">Arbex Law &mdash; Legal Consultancy</p>
                            <p style="margin:0;font-size:11px;color:#aeaeb2;">Zone 32, Street 958, Building 52, Floor 1, Office 6, Doha, Qatar</p>
                            <p style="margin:8px 0 0;font-size:11px;color:#aeaeb2;">+974 70202010 &nbsp;&bull;&nbsp; info@arbex.law</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`

const getUserConfirmationHtml = ({ name, purpose, description }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You - Arbex Law</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f7;padding:16px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#1e2235 0%,#272c3f 50%,#2f3549 100%);padding:24px 40px;text-align:center;">
                            <img src="${LOGO_SRC}" alt="Arbex Law" width="140" style="display:block;margin:0 auto 8px;max-width:140px;height:auto;" />
                            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c0b596;font-weight:500;">Legal Consultancy</p>
                        </td>
                    </tr>

                    <!-- Greeting -->
                    <tr>
                        <td style="padding:0;position:relative;">
                            <!-- Watermark background -->
                            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;height:360px;opacity:0.03;pointer-events:none;z-index:0;">
                                <img src="${LOGO_SRC}" alt="" width="360" style="width:360px;max-width:360px;display:block;" />
                            </div>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="position:relative;z-index:1;">
                                <tr>
                                    <td style="padding:24px 40px 0;text-align:center;">
                                        <!-- Checkmark circle -->
                                        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#c0b596 0%,#a89e7a 100%);margin:0 auto 20px;line-height:64px;text-align:center;">
                                            <span style="color:#fff;font-size:28px;line-height:64px;">&#10003;</span>
                                        </div>
                                        <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;color:#1d1d1f;letter-spacing:-0.3px;">Thank You, ${name}</h1>
                                        <p style="margin:0;font-size:15px;color:#86868b;line-height:1.5;">We have received your inquiry and will get back to you shortly.</p>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 40px;">
                                        <hr style="border:none;border-top:1px solid #e8e8ed;margin:0;" />
                                    </td>
                                </tr>

                                <!-- Summary -->
                                <tr>
                                    <td style="padding:0 40px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9fb;border-radius:12px;overflow:hidden;border:1px solid #e8e8ed;">
                                            <tr>
                                                <td style="padding:20px 24px;border-bottom:1px solid #e8e8ed;">
                                                    <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Purpose of Inquiry</p>
                                                    <p style="margin:0;font-size:15px;color:#1d1d1f;font-weight:500;">${purpose}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:20px 24px;">
                                                    <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#86868b;font-weight:600;">Your Message</p>
                                                    <p style="margin:0;font-size:14px;color:#3a3a3c;line-height:1.6;white-space:pre-wrap;">${description}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- What's next -->
                                <tr>
                                    <td style="padding:28px 40px 0;">
                                        <h3 style="margin:0 0 12px;font-size:15px;font-weight:600;color:#1d1d1f;">What happens next?</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 40px 32px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="36" valign="top" style="padding-top:2px;">
                                                    <div style="width:24px;height:24px;border-radius:50%;background:#f0ede6;text-align:center;line-height:24px;font-size:12px;color:#c0b596;font-weight:700;">1</div>
                                                </td>
                                                <td style="padding:0 0 14px 8px;">
                                                    <p style="margin:0;font-size:14px;color:#3a3a3c;line-height:1.5;">Our team will review your inquiry carefully.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="36" valign="top" style="padding-top:2px;">
                                                    <div style="width:24px;height:24px;border-radius:50%;background:#f0ede6;text-align:center;line-height:24px;font-size:12px;color:#c0b596;font-weight:700;">2</div>
                                                </td>
                                                <td style="padding:0 0 14px 8px;">
                                                    <p style="margin:0;font-size:14px;color:#3a3a3c;line-height:1.5;">A consultant will reach out to you within 1&ndash;2 business days.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="36" valign="top" style="padding-top:2px;">
                                                    <div style="width:24px;height:24px;border-radius:50%;background:#f0ede6;text-align:center;line-height:24px;font-size:12px;color:#c0b596;font-weight:700;">3</div>
                                                </td>
                                                <td style="padding:0 0 0 8px;">
                                                    <p style="margin:0;font-size:14px;color:#3a3a3c;line-height:1.5;">We&rsquo;ll schedule a consultation at your convenience.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td style="padding:0 40px 32px;text-align:center;">
                            <a href="https://arbex.law" style="display:inline-block;background:linear-gradient(135deg,#c0b596 0%,#a89e7a 100%);color:#1e2235;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">Visit Our Website</a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f9f9fb;padding:28px 40px;border-top:1px solid #e8e8ed;text-align:center;">
                            <img src="${LOGO_SRC}" alt="Arbex Law" width="80" style="display:block;margin:0 auto 12px;max-width:80px;height:auto;opacity:0.4;" />
                            <p style="margin:0 0 4px;font-size:13px;color:#1d1d1f;font-weight:500;">Arbex Law</p>
                            <p style="margin:0 0 4px;font-size:12px;color:#86868b;">Zone 32, Street 958, Building 52</p>
                            <p style="margin:0 0 4px;font-size:12px;color:#86868b;">Floor 1, Office 6, Doha, Qatar</p>
                            <p style="margin:12px 0 0;font-size:12px;color:#aeaeb2;">
                                <a href="tel:+97470202010" style="color:#aeaeb2;text-decoration:none;">+974 70202010</a>
                                &nbsp;&bull;&nbsp;
                                <a href="mailto:info@arbex.law" style="color:#aeaeb2;text-decoration:none;">info@arbex.law</a>
                            </p>
                            <hr style="border:none;border-top:1px solid #e8e8ed;margin:20px 0 12px;" />
                            <p style="margin:0;font-size:10px;color:#c7c7cc;line-height:1.5;">
                                This is an automated confirmation. Please do not reply to this email.<br>
                                &copy; ${new Date().getFullYear()} Arbex Law. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { name, email, phone, purpose, description } = req.body

    // Validate required fields
    if (!name || !email || !phone || !description || !purpose) {
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
        // Logo attachment for embedding in emails
        const logoAttachment = {
            filename: 'arbex.png',
            path: path.join(process.cwd(), 'public', 'images', 'logo', 'arbex.png'),
            cid: LOGO_CID,
        }

        // Email to the company
        const companyMailOptions = {
            from: process.env.SMTP_FROM_EMAIL || 'noreply@arbex.law',
            to: process.env.CONTACT_EMAIL || 'info@arbex.law',
            subject: `New Contact Inquiry — ${purpose} — ${name}`,
            html: getCompanyEmailHtml({ name, email, phone, purpose, description }),
            attachments: [logoAttachment],
        }

        // Confirmation email to the user
        const userMailOptions = {
            from: process.env.SMTP_FROM_EMAIL || 'noreply@arbex.law',
            to: email,
            subject: 'Thank you for contacting Arbex Law',
            html: getUserConfirmationHtml({ name, purpose, description }),
            attachments: [logoAttachment],
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
