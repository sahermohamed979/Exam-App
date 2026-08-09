import ExamTestScreen from "@/src/features/dashboard-user/exams/screens/exam-test-screen";
import { Suspense } from "react";

export default function page() {
  return (
    <main className="flex-1 min-w-0 w-full p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ExamTestScreen />
      </Suspense>
    </main>
  );
}
  