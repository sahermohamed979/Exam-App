import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function SelectedDiplomaSkeleton() {
  return (
    <div className="p-5 bg-white flex flex-col gap-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-20 rounded-md bg-linear-to-r from-sky-200 via-cyan-200 to-blue-200" />
        <Skeleton className="h-75 w-75 max-w-full rounded-xl bg-linear-to-r from-sky-100 via-cyan-100 to-blue-100" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-28 rounded-md bg-linear-to-r from-sky-200 via-cyan-200 to-blue-200" />
        <Skeleton className="h-4 w-full max-w-2xl rounded-md bg-linear-to-r from-sky-100 via-cyan-100 to-blue-100" />
        <Skeleton className="h-4 w-5/6 rounded-md bg-linear-to-r from-sky-100 via-cyan-100 to-blue-100" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-24 rounded-md bg-linear-to-r from-sky-200 via-cyan-200 to-blue-200" />
        <Skeleton className="h-4 w-2/3 rounded-md bg-linear-to-r from-sky-100 via-cyan-100 to-blue-100" />
        <Skeleton className="h-4 w-1/2 rounded-md bg-linear-to-r from-sky-100 via-cyan-100 to-blue-100" />
      </div>
    </div>
  );
}
