import { useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import Card from './Card'
import WeatherIcon from '../WeatherIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const formatHour = (dt: number): string => {
  const h = new Date(dt * 1000).getHours()
  return `${h % 12 || 12} ${h >= 12 ? 'PM' : 'AM'}`
}

function HourlyForecast() {
  const coords = useSelector((state: RootState) => state.coords)
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  })

  if (isLoading || !data) return null

  const now = new Date()
  const endOfToday = new Date(now)
  endOfToday.setHours(23, 59, 59, 999)

  return (
    <Card
      title={'Hourly Forecast'}
      childrenClassName="flex flex-row justify-between gap-12 overflow-auto p-4"
    >
      {data.hourly
        // .filter((hour) => {
        //  const d = new Date(hour.dt * 1000)
        //  return d >= now && d <= endOfToday
        // })
        .map((hour) => (
          <div
            className="flex flex-col justify-between w-9 whitespace-nowrap items-center 2xl:justify-between"
            key={hour.dt}
          >
            <p className="text-center leading-tight 2xl:scale-110">
              {formatHour(hour.dt)}
            </p>
            <WeatherIcon className="2xl:scale-250" src={hour.weather[0].icon} />
            <p className="2xl:scale-110">{Math.round(hour.temp)}°C</p>
          </div>
        ))}
    </Card>
  )
}

export default HourlyForecast
