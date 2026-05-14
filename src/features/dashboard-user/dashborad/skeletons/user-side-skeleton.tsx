import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function UserSideSkeleton() {
  return (
    <div className="flex items-center gap-3 w-full">
      <Skeleton className="shrink-0 w-12 h-12 bg-gray-300/50" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-5 w-24 bg-gray-300/50" />
        <Skeleton className="h-3 w-32 bg-gray-300/50" />
      </div>
      <div>
        <Skeleton className="h-6 w-6 bg-gray-300/50" />
      </div>
    </div>
  );
}
