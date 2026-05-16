import { getAirPolution } from '@/api'
import { RootState } from '@/store/store'
import { dataTagErrorSymbol, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './cards/Card'

export default function SidePanel() {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-1 py-8 px-4">
      <Suspense>
        <AirPolution />
      </Suspense>
    </div>
  )
}

function AirPolution() {
  const coords = useSelector((state: RootState) => state.coords)
  const { data } = useSuspenseQuery({
    queryKey: ['polution', coords.lon, coords.lat],
    queryFn: () => getAirPolution(coords),
  })
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <h1 className="text-2xl font-semibold">AQI</h1>
      {Object.entries(data.list[0].components).map(([key, value]) => {
        return (
          <Card
            key={key}
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60"
          >
            <div className="flex justify-between">
              <span className="text-lg font-bold capitalize">{key}</span>
              <span className="text-lg font-semibold">{value}</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
