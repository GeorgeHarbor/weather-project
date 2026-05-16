import { useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import Card from './Card'
import WeatherIcon from '../WeatherIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

type Props = {}

export default function CurrentWeather({}: Props) {
  const coords = useSelector((state: RootState) => state.coords)

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  })

  if (isLoading || !data) return null
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(data.current.temp)}°C
        </h2>
        <WeatherIcon className="size-14" src={data.current.weather[0].icon} />
        <h3 className="capitalize text-xl">
          {data.current.weather[0].description}
        </h3>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat('en-us', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Feels like</p>
          <p>{data.current.feels_like}°C</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Humidity</p>
          <p>{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Wind</p>
          <p>{data.current.wind_speed}km/h</p>
        </div>
      </div>
    </Card>
  )
}
