# Arbex Law Website Setup Guide

## Overview
This is a single-page website for Arbex Law with the following features:
- Home section with video background
- About Us section
- Consultant section
- Specialities (Practice Areas)
- Accreditation (Partner logos with animation)
- Vision & Mission section
- Awareness section (Dynamic case studies with lightbox)
- Contact form with email notifications
- Admin dashboard for managing awareness content

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local` (already created with your Supabase keys)

3. Run the development server:
```bash
npm run dev
```

4. Visit http://localhost:3000/home (the root URL "/" redirects to /home)

## Supabase Setup

### 1. Create Database Tables
Run the SQL commands from `supabase-setup.sql` in your Supabase SQL Editor:
1. Go to https://app.supabase.com
2. Select your project
3. Go to SQL Editor
4. Copy and paste the contents of `supabase-setup.sql`
5. Run the query

### 2. Create Storage Bucket
1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `images`
3. Make it public (or configure policies as needed)
4. This will be used for uploading awareness images

### 3. Create Admin User
The default admin user needs to be created in Supabase:
1. Go to Authentication → Users in Supabase dashboard
2. Click "Add user" → "Create new user"
3. Email: m@wafra.net
4. Password: M0hammadalmarii@132
5. Check "Auto Confirm User"

## Admin Dashboard

Access the admin panel at: `/admin`

Login with:
- Email: m@wafra.net
- Password: M0hammadalmarii@132

Features:
- Manage Awareness case studies
- Forgot Password functionality (sends reset email)

**Important:** The admin URL is intentionally not publicly linked. Only share it with authorized personnel.

## Email Configuration (SMTP)

Update the SMTP settings in `.env.local`:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password
SMTP_FROM_EMAIL=noreply@arbex.law
CONTACT_EMAIL=info@arbex.law
```

## Hero Video

Place your hero video at `public/videos/hero-video.mp4`
- Recommended resolution: 1920x800
- Format: MP4 (H.264)
- Keep file size under 10MB

## Sections Overview

### Navigation (Single Page at /home)
All navigation links scroll to their respective sections on /home:
- Home → /home#home
- About → /home#about
- Consultant → /home#consultant
- Specialities → /home#specialities
- Accreditation → /home#accreditation
- Vision → /home#vision
- Awareness → /home#awareness
- Contact Us → /home#contact

### Contact Information
- Address: Zone 32, Street 958, Building 52, Floor 1, Office 6, Doha, Qatar
- Phone: +974 70202010
- Email: info@arbex.law

## File Structure

```
├── components/
│   ├── About/           - About Us section
│   ├── Accreditation/   - Partner logos with animation
│   ├── AdminLayout/     - Admin dashboard layout
│   ├── Awareness/       - Dynamic case studies
│   ├── Consultant/      - Consultant section
│   ├── ContactSection/  - Contact form and info
│   ├── HeaderBottom/    - Navigation menu
│   ├── HeaderTop/       - Top bar with contact
│   ├── HeroVideo/       - Video hero section
│   ├── Specialities/    - Practice areas
│   ├── StackedLogos/    - Animated logo component
│   └── VisionMission/   - Vision & Mission section
├── lib/
│   ├── supabase.js      - Supabase client
│   └── utils.js         - Utility functions
├── pages/
│   ├── api/
│   │   ├── contact.js   - Contact form API
│   │   └── setup.js     - Initial setup API
│   ├── admin/
│   │   ├── index.js     - Admin login
│   │   ├── dashboard.js - Dashboard home
│   │   └── awareness.js - Awareness management
│   ├── home.js          - Main single page website
│   └── index.js         - Redirects to /home
├── public/
│   └── videos/          - Hero video folder
└── styles/
    └── sass/style.scss  - Main styles
```

## Customization

### Colors
The main brand color is `#c0b596` (gold/beige). To change it, search and replace in:
- `styles/sass/style.scss`
- Component style blocks

### Logo
Replace `public/images/logo/logo.png` with your logo

### Content
Edit text content directly in:
- `pages/home.js` (aboutText, consultantText)
- `components/VisionMission/index.js` (vision/mission text)
- `components/Specialities/index.js` (service items)

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

Or deploy to Vercel/Netlify for automatic builds.

## Support

For any issues or questions, contact the development team.
