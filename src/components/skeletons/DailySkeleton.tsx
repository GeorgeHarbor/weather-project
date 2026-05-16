import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

const DailySkeleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {Array.from({ length: 12 }).map(() => (
        <div className="flex justify-between">
          <Skeleton className="w-9 h-6" />
          <Skeleton className="w-9 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-9 h-6" />
          <Skeleton className="w-9 h-6" />
          <Skeleton className="w-9 h-6" />
        </div>
      ))}
    </Card>
  )
}

export default DailySkeleton
