import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export function ManageRestaurantFormSkeleton() {
  return (
    <div
      className="space-y-8 md:p-10 rounded-lg"
    >
      <div className="h-[32px]">
        <Skeleton className="w-24 h-full" />
      </div>
      {/* overview section */}
      <div>
        <div className="flex flex-col h-[51.2px]">
          <Skeleton className="w-24 h-[29px] mb-[3px]" />
          <Skeleton className="w-[18rem] h-[17.2px]" />
        </div>
        <div className="flex flex-col space-y-3.5 p-4 h-[312px]">
          <div className="space-y-2">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-full h-9" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-full h-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-[12rem] h-9" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-[12rem] h-9" />
          </div>
        </div>
      </div>
      {/* cuisines section */}
      <Skeleton className="w-full h-[1px]" />
      <div className="md:h-[255.2px]">
        <div className="flex flex-col h-[51.2px]">
          <Skeleton className="w-24 h-[29px] mb-[3px]" />
          <Skeleton className="w-[18rem] h-[17.2px]" />
        </div>
        <div className="grid md:grid-cols-5 space-y-3 p-4">
          {Array.from({ length: 25 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="flex gap-1 mt-3 h-5">
              <Skeleton
                className="w-4 h-4"
              />
              <Skeleton
                className="w-12 h-4"
              />
            </div>
          ))}
          <div className="flex gap-1 mt-3 h-5">
            <Skeleton
              className="w-4 h-4"
            />
            <Skeleton
              className="w-12 h-4"
            />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-[1px]" />
      {/* menu section */}
      <div className="h-[255.2px]">
        <div className="flex flex-col h-[51.2px]">
          <Skeleton className="w-24 h-[29px] mb-[3px]" />
          <Skeleton className="w-[18rem] h-[17.2px]" />
        </div>
        <div className="flex p-4 flex-col gap-4">
          <div className="flex gap-2">
            <div className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-[12rem] h-8" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <div className="flex">
                <Skeleton className="w-[12rem] h-8" />
                <Skeleton className="w-24 ml-2 h-8" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-[12rem] h-8" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <div className="flex">
                <Skeleton className="w-[12rem] h-8" />
                <Skeleton className="w-24 ml-2 h-8" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Skeleton className="w-[8rem] h-[34px]" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-[1px]" />
      {/* image section */}
      <div>
        <div className="flex flex-col h-[51.2px]">
          <Skeleton className="w-24 h-[29px] mb-[3px]" />
          <Skeleton className="w-[18rem] h-[17.2px]" />
        </div>
        <div className="space-y-8 w-1/2 p-4">
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="w-full h-full" />
          </AspectRatio>
          <Skeleton className="w-full h-[34px]" />
        </div>
      </div>
      <Skeleton className="w-full h-[1px]" />
      {/* settings section */}
      <div>
        <div className="flex flex-col h-[51.2px]">
          <Skeleton className="w-24 h-[29px] mb-[3px]" />
          <Skeleton className="w-[18rem] h-[17.2px]" />
        </div>
        <div className="p-4">
          <Skeleton className="w-full md:w-1/2 h-[80px]" />
        </div>
      </div>
      <Skeleton className="w-24 h-[32px]" />
    </div>
  );
}

export default ManageRestaurantFormSkeleton;
