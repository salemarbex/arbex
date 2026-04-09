import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'

const SectionVisibilityContext = createContext({
    isSectionVisible: () => true,
    loading: true
})

export function SectionVisibilityProvider({ children }) {
    const [visibility, setVisibility] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchVisibility()
    }, [])

    const fetchVisibility = async () => {
        try {
            const { data, error } = await supabase
                .from('section_visibility')
                .select('section_key, is_visible')

            if (error) throw error

            const visMap = {}
            if (data) {
                data.forEach(item => {
                    visMap[item.section_key] = item.is_visible
                })
            }
            setVisibility(visMap)
        } catch (error) {
            console.error('Error fetching section visibility:', error)
        } finally {
            setLoading(false)
        }
    }

    const isSectionVisible = (sectionKey) => {
        if (visibility[sectionKey] === undefined) return true
        return visibility[sectionKey]
    }

    return (
        <SectionVisibilityContext.Provider value={{ isSectionVisible, loading }}>
            {children}
        </SectionVisibilityContext.Provider>
    )
}

export function useSectionVisibility() {
    return useContext(SectionVisibilityContext)
}
