import DashboardScreen from "@/src/features/dashboard-user/dashborad/screens/dashboard.screen";
import { SkeletonCard } from "@/src/features/dashboard-user/dashborad/skeletons/diplomas-card-skeletons";
import { Suspense } from "react";

export default function page() {
  return (
    <main className="flex-1 min-w-0 w-full p-4">
      <Suspense fallback={<SkeletonCard />}>
        <DashboardScreen />
      </Suspense>
    </main>
  );
}
