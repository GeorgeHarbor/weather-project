import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

const CurrentSkeleton = () => {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="w-30 h-15"></Skeleton>
        <Skeleton className="size-14 rounded-full"></Skeleton>
        <Skeleton className="w-36 h-7"></Skeleton>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl">Local Time:</p>
        <Skeleton className="w-36 h-10"></Skeleton>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Feels like</p>
          <Skeleton className="w-20 h-6"></Skeleton>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Humidity</p>
          <Skeleton className="w-15 h-6"></Skeleton>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Wind</p>
          <Skeleton className="w-20 h-6"></Skeleton>
        </div>
      </div>
    </Card>
  )
}

export default CurrentSkeleton
