import DailyForecast from './components/cards/DailyForecast'
import HourlyForecast from './components/cards/HourlyForecast'
import CurrentWeather from './components/cards/CurrentWeather'
import AdditionalInfo from './components/cards/AdditionalInfo'
import Map from './components/Map'
// import { useState } from 'react'
// import { Coords } from './types'

function App() {
  // const [coords, setCoords] = useState<Coords>({
  //   lat: 43.72583,
  //   lon: 20.68944,
  // })

  return (
    <div className="flex flex-col gap-8">
      <Map />
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <AdditionalInfo />
    </div>
  )
}

export default App
