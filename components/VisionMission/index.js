import React from 'react'
import { Grid } from '@mui/material'
import SectionTitle from '../Title'

const VisionMission = ({ className = '', title = 'Vision & Mission', subTitle = 'What Drives Us' }) => {
    const visionText = [
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at',
        'and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum'
    ]

    const missionText = [
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at',
        'and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum'
    ]

    return (
        <div id="vision" className={`visionMissionArea ${className}`}>
            <Grid container className="container">
                <Grid item xs={12}>
                    <SectionTitle
                        title={title}
                        subTitle={subTitle}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className="visionMissionWrapper">
                        {/* Vision Section */}
                        <div className="visionSection">
                            <div className="visionContent">
                                <span className="subtitle">Our Vision</span>
                                <h2>What We See</h2>
                                {visionText.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="verticalDivider">
                            <div className="dividerLine"></div>
                        </div>

                        {/* Mission Section */}
                        <div className="missionSection">
                            <div className="missionContent">
                                <span className="subtitle">Our Mission</span>
                                <h2>Why We Do It</h2>
                                {missionText.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default VisionMission
