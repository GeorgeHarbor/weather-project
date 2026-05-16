import DailyForecast from './components/cards/DailyForecast'
import HourlyForecast from './components/cards/HourlyForecast'
import CurrentWeather from './components/cards/CurrentWeather'
import AdditionalInfo from './components/cards/AdditionalInfo'
import Map from './components/Map'
import LocationDropdown from './components/dropdowns/LocationDropdown'
import MapTypeDropdown from './components/dropdowns/MapTypeDropdown'
import { Suspense, useState } from 'react'
import MapLegend from './components/MapLegend'
import CurrentSkeleton from './components/skeletons/CurrentSkeleton'
import HourlySkeleton from './components/skeletons/HourlySkeleton'
import DailySkeleton from './components/skeletons/DailySkeleton'
import AdditionalInfoSkeleton from './components/skeletons/AdditionalInfoSkeleton'

function App() {
  const [mapType, setMapType] = useState('clouds_new')
  return (
    <div className="flex flex-col gap-8 z-10001">
      <div className="flex  gap-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Location: </h1>
          <LocationDropdown />
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Map Type: </h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <div className="relative">
        <MapLegend mapType={mapType}></MapLegend>
        <Map mapType={mapType} />
      </div>
      <Suspense fallback={<CurrentSkeleton />}>
        <CurrentWeather />
      </Suspense>
      <Suspense fallback={<HourlySkeleton />}>
        <HourlyForecast />
      </Suspense>
      <Suspense fallback={<DailySkeleton />}>
        <DailyForecast />
      </Suspense>
      <Suspense fallback={<AdditionalInfoSkeleton />}>
        <AdditionalInfo />
      </Suspense>
    </div>
  )
}

export default App
