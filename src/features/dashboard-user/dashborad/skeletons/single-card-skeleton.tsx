import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function SingleCardSkeleton() {
  return (
    <div className="relative overflow-hidden w-full h-[344px] rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800">
      <div className="absolute bottom-2 left-2 right-2 backdrop-blur-md bg-white/40 dark:bg-black/40 rounded-md p-4">
        <Skeleton className="h-5 w-2/3 mb-3 bg-neutral-300 dark:bg-neutral-600" />
        <Skeleton className="h-3 w-full mb-1.5 bg-neutral-200 dark:bg-neutral-700" />
        <Skeleton className="h-3 w-4/5 bg-neutral-200 dark:bg-neutral-700" />
      </div>
    </div>
  );
}
