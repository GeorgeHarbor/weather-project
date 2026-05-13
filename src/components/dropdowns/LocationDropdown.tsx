import { useDispatch, useSelector } from 'react-redux'
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from '../ui/select'
import { AppDispatch, RootState } from '@/store/store'
import { setCoords } from '@/store/coordsSlice'
import { getCoords } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { setCity } from '../../store/citySlice.ts'

type Props = {}

export default function LocationDropdown({}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  // const [city, setCity] = useState('Kraljevo')
  const city = useSelector((state: RootState) => state.city)

  const { data } = useQuery({
    queryKey: ['city', city],
    queryFn: () => getCoords(city),
    enabled: city !== 'custom',
  })

  const lastDispatchedCity = useRef<string | null>(null)
  useEffect(() => {
    if (city === 'custom') {
      lastDispatchedCity.current = 'custom'
      return
    }
    if (data?.[0] && city !== lastDispatchedCity.current) {
      lastDispatchedCity.current = city
      dispatch(setCoords({ lat: data[0].lat, lon: data[0].lon }))
    }
  }, [data, city])

  return (
    <Select value={city} onValueChange={(value) => dispatch(setCity(value))}>
      <SelectTrigger className="w-45">
        {city === 'custom' ? <span>Custom</span> : <SelectValue placeholder="Location" />}
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const locations = [
  'Kraljevo',
  'Bangkok',
  'Tokyo',
  'Seoul',
  'Dubai',
  'Manila',
  'London',
  'New York',
  'Paris',
  'Berlin',
  'Madrid',
  'Rome',
  'Lisbon',
]
