import { useQuery } from '@tanstack/react-query'
import { getWeather } from './api'
import Card from './components/cards/Card'
import DailyForecast from './components/cards/DailyForecast'

function App() {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  })

  return (
    <div className="flex flex-col gap-8">
      <Card title="Current Weather">
        {JSON.stringify(data?.current)?.slice(0, 100)}
      </Card>
      <Card title="Hourly Forecast">
        {JSON.stringify(data?.hourly)?.slice(0, 100)}
      </Card>
      <DailyForecast />
    </div>
  )
}

export default App

// styling Tailwind
// data fetching - TanStack Quer cky (React query)
