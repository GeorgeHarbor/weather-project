import { useQuery } from '@tanstack/react-query'
import Card from './Card'
import { getWeather } from '../../api'

type Props = {}

export default function DailyForecast({}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
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
          <img
            className="size-8"
            src={`https://openweathermap.org/payload/api/media/file/${day.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  )
}
