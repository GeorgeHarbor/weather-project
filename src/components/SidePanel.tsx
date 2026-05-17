import { getAirPollution } from '@/api'
import { RootState } from '@/store/store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import Card from './cards/Card'
import InfoTooltip from './InfoTooltip'
import PollutantCard from './PollutantCard'
import { Skeleton } from './ui/skeleton'

export default function SidePanel() {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-1 py-8 px-4 overflow-y-scroll flex gap-8">
      <Suspense fallback={<AirPollutionSkeleton />}>
        <AirPollution />
      </Suspense>
    </div>
  )
}

function AirPollution() {
  const coords = useSelector((state: RootState) => state.coords)
  const { data } = useSuspenseQuery({
    queryKey: ['polution', coords.lon, coords.lat],
    queryFn: () => getAirPollution(coords),
  })
  return (
    <div className="flex flex-col gap-4 w-90">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <div className="flex items-start gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <InfoTooltip>
          Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 =
          Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
        </InfoTooltip>
      </div>
      {Object.entries(data.list[0].components).map(([key, value]) => (
        <PollutantCard key={key} name={key} value={value} />
      ))}
    </div>
  )
}

function AirPollutionSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-90">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <Skeleton className="w-8 h-12 bg-sidebar-foreground/20 shrink-0" />
      <div className="flex items-start gap-2">
        <Skeleton className="w-16 h-8 bg-sidebar-foreground/20  shrink-0" />
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <PollutantCardSkeleton key={i} />
      ))}
    </div>
  )
}

function PollutantCardSkeleton() {
  return (
    <Card
      className="transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
      childrenClassName="flex flex-col gap-3"
    >
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Skeleton className="w-11 h-7 bg-sidebar-foreground/20" />
        </div>
        <Skeleton className="w-13 h-7 bg-sidebar-foreground/20" />
      </div>
      <Skeleton className="w-full h-1.5 bg-sidebar-foreground/20" />
      <div className="flex justify-between text-xs">
        <Skeleton className="w-3 h-4 bg-sidebar-foreground/20" />
        <Skeleton className="w-6 h-4 bg-sidebar-foreground/20" />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-6 h-6 bg-sidebar-foreground/20" />
        ))}
      </div>
    </Card>
  )
}
