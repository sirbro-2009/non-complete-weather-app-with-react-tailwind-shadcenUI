import { Skeleton } from "@/components/ui/skeleton"
export function SkeletonDemo() {
  return (
    <div className="flex items-center w-[98%] p-4 rounded-xl  flex-col ">
      <Skeleton className="h-12 w-12 rounded-full " />
      <div className="space-y-2 mt-2 ">
        <Skeleton className="h-4 w-15 lg:w-40  " />
        <Skeleton className="h-4 w-15 lg:w-40  " />
      </div>

      
    </div>
  )
}
