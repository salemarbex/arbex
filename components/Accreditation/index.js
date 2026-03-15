import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Grid } from '@mui/material'
import SectionTitle from '../Title'
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../lib/LanguageContext'

const LOGOS_PER_PAGE = 8

const Accreditation = ({ className = '' }) => {
  const { t } = useLanguage();
  const [allLogos, setAllLogos] = useState([])
  const [visibleCount, setVisibleCount] = useState(LOGOS_PER_PAGE)
  const [loading, setLoading] = useState(true)
  const gridRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    fetchLogos()
  }, [])

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('accreditation_logos')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error

      if (data && data.length > 0) {
        setAllLogos(data)
      }
    } catch (error) {
      console.error('Error fetching accreditation logos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOGOS_PER_PAGE)
  }

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || !gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    containerRef.current.style.setProperty('--mouse-x', `${x}px`)
    containerRef.current.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  const visibleLogos = allLogos.slice(0, visibleCount)
  const hasMore = visibleCount < allLogos.length

  return (
    <div id="accreditation" className={`accreditationArea ${className}`}>
      <Grid container className="container">
        <Grid item xs={12}>
          <SectionTitle
            title={t('accreditation.title')}
            subTitle={t('accreditation.subtitle')}
          />
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p>{t('accreditation.loading')}</p>
            </div>
          ) : allLogos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p>{t('accreditation.noData')}</p>
            </div>
          ) : (
            <div
              ref={containerRef}
              className="accreditation-grid-wrapper"
              onMouseMove={handleMouseMove}
            >
              {/* Hover glow overlay */}
              <div className="accreditation-grid__glow" />
              <div ref={gridRef} className="accreditation-grid">
                {visibleLogos.map((logo) => (
                  <div key={logo.id} className="accreditation-grid__cell">
                    <div className="accreditation-grid__logo-wrap">
                      <img
                        src={logo.logo_url}
                        alt={logo.name}
                      />
                      <span className="logoName">{logo.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="loadMoreWrapper">
                  <button className="btnStyle" onClick={handleLoadMore}>
                    {t('accreditation.loadMore')}
                  </button>
                </div>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Accreditation
