import { Dispatch, SetStateAction } from 'react'
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from '../ui/select'

type Props = {
  mapType: string
  setMapType: Dispatch<SetStateAction<string>>
}

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={setMapType}>
      <SelectTrigger className="w-full xs:w-45 capitalize">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {types.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type.split('_')[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const types = [
  'clouds_new',
  'precipitation_new',
  'pressure_new',
  'wind_new',
  'temp_new',
]
