import { useSuspenseQuery } from '@tanstack/react-query'
import Card from './Card'
import { getWeather } from '../../api'
import WeatherIcon from '../WeatherIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

type Props = {}

export default function DailyForecast({}: Props) {
  const coords = useSelector((state: RootState) => state.coords)
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  })

  if (isLoading || !data) return null

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: 'short',
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  )
}
