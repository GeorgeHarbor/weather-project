import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'

type Props = {}

export default function Map({}: Props) {
  // const [latlng, setLatlng] = useState([11, 25])
  return (
    <MapContainer
      center={[10, 25]}
      zoom={5}
      style={{ width: '700px', height: '500px' }}
    >
      <MapClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[10, 25]} />
    </MapContainer>
  )
}

function MapClick() {
  const map = useMap()

  map.on('click', (e) => {
    const { lat, lng } = e.latlng

    map.panTo([lat, lng])
  })

  return null
}
