import React from 'react'

const GoogleMap = () => {
    return (
        <div id="map" className="googleMapArea">
            <iframe
                src="https://maps.google.com/maps?q=Zone%2032,%20Street%20958,%20Building%2052,%20Doha,%20Qatar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arbex Law Office Location"
            />
        </div>
    )
}

export default GoogleMap
