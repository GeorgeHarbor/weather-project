import { useDispatch } from 'react-redux'
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from '../ui/select'
import { AppDispatch } from '@/store/store'
import { setCoords } from '@/store/coordsSlice'
import { getCoords } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

type Props = {}

export default function LocationDropdown({}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const [city, setCity] = useState('Kraljevo')

  const { data } = useQuery({
    queryKey: ['city', city],
    queryFn: () => getCoords(city),
  })

  useEffect(() => {
    if (data?.[0]) {
      dispatch(setCoords({ lat: data[0].lat, lon: data[0].lon }))
    }
  }, [data])

  return (
    <Select onValueChange={setCity}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
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
