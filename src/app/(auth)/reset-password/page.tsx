import ResetScreen from "@/src/features/auth/screens/reset-screen";
import { Suspense } from "react";
import { ResetPasswordSkeleton } from "@/src/features/auth/skeletons/form-skeletons";

export default function page() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetScreen />
    </Suspense>
  );
}
