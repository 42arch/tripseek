import Map from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

function MapView() {
  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    />
  )
}

export default MapView
