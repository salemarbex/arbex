import React from 'react'
import { useLanguage } from '../../lib/LanguageContext'
import Link from 'next/link'

const LanguageSwitcher = ({ className = '' }) => {
    const { locale, switchLanguage } = useLanguage()

    const targetLocale = locale === 'en' ? 'ar' : 'en'
    const label = locale === 'en' ? 'العربية' : 'English'

    return (
        <div className={`languageSwitcher ${className}`}>
            <button
                onClick={() => switchLanguage(targetLocale)}
                className="langSwitchBtn"
                aria-label={`Switch to ${targetLocale === 'ar' ? 'Arabic' : 'English'}`}
            >
                <span className="langIcon">
                    {locale === 'en' ? '🇶🇦' : '🇬🇧'}
                </span>
                <span className="langLabel">{label}</span>
            </button>
        </div>
    )
}

export default LanguageSwitcher
