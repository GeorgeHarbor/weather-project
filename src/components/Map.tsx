import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { setCoords } from '../store/coordsSlice'
import { LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})
type Props = {}

export default function Map({}: Props) {
  const coords = useSelector((state: RootState) => state.coords)
  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={5}
      style={{ width: '700px', height: '500px', cursor: 'pointer' }}
    >
      <MapClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lon]} />
    </MapContainer>
  )
}

function MapClick() {
  const map = useMap()
  const dispatch = useDispatch<AppDispatch>()

  // useEffect is required here for two reasons:
  // 1. map.on('click', handler) is a side effect — it registers a listener on an
  //    external Leaflet instance, not on React's virtual DOM. Without useEffect,
  //    this would run on every render and stack duplicate listeners.
  // 2. The cleanup function (map.off) removes the listener when the component
  //    unmounts or before the effect re-runs, preventing memory leaks.
  // The dependency array [map, dispatch] ensures the listener is only re-registered
  // if the map instance or dispatch function changes.
  useEffect(() => {
    const handler = (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      map.panTo([lat, lng])
      dispatch(setCoords({ lat, lon: lng }))
    }

    map.on('click', handler)
    return () => {
      map.off('click', handler)
    }
  }, [map, dispatch])

  return null
}
