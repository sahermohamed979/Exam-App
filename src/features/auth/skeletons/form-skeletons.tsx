import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function ResetPasswordSkeleton() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-xl px-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2 mb-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" /> 
            <Skeleton className="h-[46px] w-full rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-36" /> 
            <Skeleton className="h-[46px] w-full rounded-md" /> 
          </div>
        </div>

        <Skeleton className="h-[46px] w-full mt-4 rounded-md" /> 

        <div className="flex justify-center mt-2">
          <Skeleton className="h-4 w-48" /> 
        </div>
      </div>
    </div>
  );
}
