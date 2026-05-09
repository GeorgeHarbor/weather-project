import DailyForecast from './components/cards/DailyForecast'
import HourlyForecast from './components/cards/HourlyForecast'

function App() {
  return (
    <div className="flex flex-col gap-8">
      <Card title="Current Weather">
        {JSON.stringify(data?.current)?.slice(0, 100)}
      </Card>
      <HourlyForecast />
      <DailyForecast />
    </div>
  )
}

export default App
