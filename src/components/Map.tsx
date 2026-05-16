import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { setCoords } from '../store/coordsSlice'
import { setCity } from '../store/citySlice.ts'
import { LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const API_KEY = import.meta.env.VITE_API_KEY
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})
type Props = {
  mapType: string
}

export default function Map({ mapType }: Props) {
  const coords = useSelector((state: RootState) => state.coords)
  return (
    <div className="relative z-0">
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={5}
        style={{}}
        className="w-full h-150"
        scrollWheelZoom={true}
      >
        <MapClick />
        <MapCenter />
        <MapTileLayer />
        <TileLayer
          opacity={0.5}
          url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        />
        <Marker position={[coords.lat, coords.lon]} />
      </MapContainer>
    </div>
  )
}

function MapCenter() {
  const map = useMap()
  const coords = useSelector((state: RootState) => state.coords)

  useEffect(() => {
    map.setView([coords.lat, coords.lon])
  }, [coords])

  return null
}

function MapClick() {
  const map = useMap()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const handler = (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      dispatch(setCity('custom'))
      dispatch(setCoords({ lat, lon: lng }))
    }

    map.on('click', handler)
    return () => {
      map.off('click', handler)
    }
  }, [map, dispatch])

  return null
}
function MapTileLayer() {
  const map = useMap()

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: 'basic-dark',
      apiKey: MAPTILER_KEY,
    })

    tileLayer.addTo(map)

    return () => {
      map.removeLayer(tileLayer)
    }
  }, [map])

  return null
}
