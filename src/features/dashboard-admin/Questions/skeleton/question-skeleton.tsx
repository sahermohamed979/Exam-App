import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function QuestionSkeleton() {
  return (
    <div className="p-8 bg-white flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Headline Section */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-16 bg-gray-200/70 rounded-sm" />
        <Skeleton className="h-4 w-80 bg-gray-200/70 rounded-sm" />
      </div>

      {/* Exam Section */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-10 bg-gray-200/70 rounded-sm" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-72 bg-gray-200/70 rounded-sm" />
          <Skeleton className="h-4 w-4 bg-gray-200/70 rounded-full" />
        </div>
      </div>

      {/* Answers Section */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-14 bg-gray-200/70 rounded-sm" />
        <Skeleton className="h-4 w-8 bg-gray-200/70 rounded-sm" />
      </div>
    </div>
  );
}
