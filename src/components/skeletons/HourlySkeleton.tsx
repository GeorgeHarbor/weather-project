import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

const HourlySkeleton = () => {
  return (
    <Card
      title={'Hourly Forecast'}
      childrenClassName="flex flex-row justify-between gap-12 overflow-auto p-4"
    >
      {Array.from({ length: 24 }).map(() => (
        <div className="flex flex-col justify-between w-9 whitespace-nowrap items-center gap-1">
          {/* <p className="text-center leading-tight">{formatHour(hour.dt)}</p> */}
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-10 h-6" />
        </div>
      ))}
    </Card>
  )
}

export default HourlySkeleton
