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
import Hamburger from './assets/hamburger.svg?react'
import SidePanel from './components/SidePanel'
import DailyForecast from './components/cards/DailyForecast'

function App() {
  const [mapType, setMapType] = useState('clouds_new')
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  return (
    <>
      <div className="flex flex-col gap-8 p-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Location: </h1>
              <LocationDropdown />
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Map Type: </h1>
              <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
            </div>
          </div>
          <button className="shrink-0" onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className="size-8 cursor-pointer invert lg:hidden" />
          </button>
        </div>

        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <MapLegend mapType={mapType}></MapLegend>
            <Map mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  )
}

export default App
