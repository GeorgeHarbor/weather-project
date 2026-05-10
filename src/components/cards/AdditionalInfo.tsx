import { useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import Card from './Card'
import Sunrise from '../../assets/sunrise.svg?react'
import Sunset from '../../assets/sunset.svg?react'
import Cloud from '../../assets/cloud.svg?react'
import Uv from '../../assets/uv.svg?react'
import Wind from '../../assets/wind.svg?react'
import Pressure from '../../assets/pressure.svg?react'
import UpArrow from '../../assets/uparrow.svg?react'

type Props = {}

export default function AdditionalInfo({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  })

  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between" key={value}>
          <div className="flex gap-4">
            <span className="">{label}</span>
            <Icon className="size-6 invert opacity-50" />
          </div>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  )
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === 'sunrise' || value === 'sunset') {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (value === 'wind_deg')
    return (
      <UpArrow
        className="size-6 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
    )

  return number
}

const rows = [
  {
    label: 'Cloudiness (%)',
    value: 'clouds',
    Icon: Cloud,
  },
  {
    label: 'UV Index',
    value: 'uvi',
    Icon: Uv,
  },
  {
    label: 'Wind Direction',
    value: 'wind_deg',
    Icon: Wind,
  },
  {
    label: 'Pressure (hPa)',
    value: 'pressure',
    Icon: Pressure,
  },
  {
    label: 'Sunrise',
    value: 'sunrise',
    Icon: Sunrise,
  },
  {
    label: 'Sunset',
    value: 'sunset',
    Icon: Sunset,
  },
] as const
