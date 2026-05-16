import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const AdditionalInfoSkeleton = (props: Props) => {
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {Array.from({ length: 6 }).map(() => (
        <div className="flex justify-between">
          <div className="flex gap-4">
            {/* <span className="">{label}</span> */}
            <Skeleton className="w-30 h-6"></Skeleton>
            <Skeleton className="w-6 h-6 rounded-full"></Skeleton>
            {/* <Icon className="size-6 invert opacity-50" /> */}
          </div>
          <span>
            <Skeleton className="w-15 h-6" />
            {/* <FormatComponent value={value} number={data.current[value]} /> */}
          </span>
        </div>
      ))}
    </Card>
  )
}

export default AdditionalInfoSkeleton
