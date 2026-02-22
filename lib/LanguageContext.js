import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import en from './translations/en'
import ar from './translations/ar'

const translations = { en, ar }

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const router = useRouter()
    const [locale, setLocale] = useState('en')

    useEffect(() => {
        // Detect locale from path
        if (router.pathname.startsWith('/ar')) {
            setLocale('ar')
        } else {
            setLocale('en')
        }
    }, [router.pathname])

    const t = (key) => {
        const keys = key.split('.')
        let value = translations[locale]
        for (const k of keys) {
            value = value?.[k]
        }
        return value || key
    }

    const switchLanguage = (newLocale) => {
        const currentPath = router.pathname
        if (newLocale === 'ar') {
            if (!currentPath.startsWith('/ar')) {
                const newPath = currentPath === '/home' ? '/ar/home' : `/ar${currentPath}`
                router.push(newPath)
            }
        } else {
            if (currentPath.startsWith('/ar')) {
                const newPath = currentPath.replace('/ar', '') || '/home'
                router.push(newPath)
            }
        }
    }

    const isRTL = locale === 'ar'
    const direction = isRTL ? 'rtl' : 'ltr'

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t, switchLanguage, isRTL, direction }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export default LanguageContext
