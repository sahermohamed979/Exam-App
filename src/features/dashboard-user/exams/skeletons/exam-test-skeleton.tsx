import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function ExamTestSkeleton() {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-lg animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-5 px-3 sm:px-4 py-2">
        <div className="flex w-full flex-col relative">
          <Skeleton className="h-5 w-48 mb-3 max-sm:w-32 max-sm:mb-10" />
          <Skeleton className="h-4 w-full rounded-none" />
          <div className="flex justify-between absolute right-0 -bottom-6 max-sm:static max-sm:mt-1.5 max-sm:right-auto">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="w-px h-12 bg-blue-200 mx-2 shrink-0 hidden sm:block" />
        
        {/* Circular Progress Skeleton */}
        <div className="absolute right-3 top-2 shrink-0 origin-center scale-75 sm:static sm:right-auto sm:top-auto sm:scale-100">
           <Skeleton className="h-16 w-16 rounded-full" />
        </div>
      </div>

      <div className="p-3 sm:p-5 mt-4">
        <div className="flex flex-col gap-4">
          {/* Question Skeleton */}
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-4" />

          {/* Answers Skeletons */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-blue-50 flex items-center p-4">
              <Skeleton className="h-4 w-4 rounded-full mr-3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}

          {/* Navigation Buttons Skeleton */}
          <div className="flex gap-2 mt-7">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
