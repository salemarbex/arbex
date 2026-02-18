import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import StackedLogos from '../StackedLogos'
import SectionTitle from '../Title'
import { supabase } from '../../lib/supabase'

const Accreditation = ({ className = '' }) => {
  const [logoGroups, setLogoGroups] = useState([])
  const [loading, setLoading] = useState(true)

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
        // Create logo components from data
        const logoComponents = data.map((logo) => (
          <div key={logo.id} className="accreditation-logo">
            <img src={logo.logo_url} alt={logo.name} style={{ maxWidth: '100%', maxHeight: '60px', objectFit: 'contain' }} />
            <span className="logoName">{logo.name}</span>
          </div>
        ))

        // Create 4 groups where each group shows 4 logos
        // Logos rotate through positions in each group for variety
        const numLogos = logoComponents.length
        const groups = []
        
        // Create 4 different arrangements so animation shows different logos
        for (let groupIndex = 0; groupIndex < 4; groupIndex++) {
          const group = []
          for (let slot = 0; slot < 4; slot++) {
            // Rotate through logos based on group index to show different combinations
            const logoIndex = (slot + groupIndex) % numLogos
            // Clone the element with a unique key for this group
            const logo = logoComponents[logoIndex]
            group.push(
              <div key={`${logo.key}-g${groupIndex}-s${slot}`} className="accreditation-logo">
                <img 
                  src={data[logoIndex].logo_url} 
                  alt={data[logoIndex].name} 
                  style={{ maxWidth: '100%', maxHeight: '60px', objectFit: 'contain' }} 
                />
                <span className="logoName">{data[logoIndex].name}</span>
              </div>
            )
          }
          groups.push(group)
        }

        setLogoGroups(groups)
      } else {
        // Use fallback placeholder logos if no data
        const placeholderLogo = (key) => (
          <div key={key} className="accreditation-logo">
            <span>Accreditation {key}</span>
          </div>
        )
        const group1 = [1, 2, 3, 4].map(n => placeholderLogo(`g1-${n}`))
        const group2 = [2, 3, 4, 5].map(n => placeholderLogo(`g2-${n}`))
        const group3 = [3, 4, 5, 6].map(n => placeholderLogo(`g3-${n}`))
        const group4 = [4, 5, 6, 7].map(n => placeholderLogo(`g4-${n}`))
        setLogoGroups([group1, group2, group3, group4])
      }
    } catch (error) {
      console.error('Error fetching accreditation logos:', error)
      // Use fallback
      const placeholderLogo = (key) => (
        <div key={key} className="accreditation-logo">
          <span>Accreditation {key}</span>
        </div>
      )
      const group1 = [1, 2, 3, 4].map(n => placeholderLogo(`g1-${n}`))
      const group2 = [2, 3, 4, 5].map(n => placeholderLogo(`g2-${n}`))
      const group3 = [3, 4, 5, 6].map(n => placeholderLogo(`g3-${n}`))
      const group4 = [4, 5, 6, 7].map(n => placeholderLogo(`g4-${n}`))
      setLogoGroups([group1, group2, group3, group4])
    } finally {
      setLoading(false)
    }
  }

  if (loading || logoGroups.length === 0) {
    return (
      <div id="accreditation" className={`accreditationArea ${className}`}>
        <Grid container className="container">
          <Grid item xs={12}>
            <SectionTitle
              title="Our Accreditations"
              subTitle="Trusted By"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Loading accreditations...</p>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <div id="accreditation" className={`accreditationArea ${className}`}>
      <Grid container className="container">
        <Grid item xs={12}>
          <SectionTitle
            title="Our Accreditations"
            subTitle="Trusted By"
          />
        </Grid>
        <Grid item xs={12}>
          <StackedLogos
            logoGroups={logoGroups}
            duration={30}
            stagger={2}
            logoWidth="200px"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Accreditation
