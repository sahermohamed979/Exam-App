import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function ExamSkeleton() {
  return (
    <div className="py-2 px-3 border border-blue-300 border-dotted overflow-hidden items-center flex gap-4 w-full bg-[#eff6ff]">
      {/* Image Skeleton */}
      <div className="w-auto min-w-[120px] flex h-[110px] items-center justify-center py-2 border border-blue-300 bg-[#dbeafe]">
        <Skeleton className="w-[100px] h-[75px] bg-blue-200/50" />
      </div>

      {/* Content Skeleton */}
      <div className="relative space-y-3 flex-1 w-full">
        {/* Title */}
        <Skeleton className="h-6 w-1/3 min-w-[150px] bg-blue-200/50 rounded-md" />
        
        {/* Description */}
        <div className="space-y-2 mt-2">
          <Skeleton className="h-3 w-full bg-blue-200/50 rounded-sm" />
          <Skeleton className="h-3 w-11/12 bg-blue-200/50 rounded-sm" />
          <Skeleton className="h-3 w-4/5 bg-blue-200/50 rounded-sm" />
        </div>

        {/* Metadata section (Questions | Time) */}
        <div className="flex gap-2 absolute top-0 right-2">
          <Skeleton className="w-32 h-4 bg-blue-200/50 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
