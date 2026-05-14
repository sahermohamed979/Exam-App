import ExamTestScreen from "@/src/features/dashboard-user/exams/screens/exam-test-screen";
import { Suspense } from "react";

export default function page() {
  return (
    <main className="flex-1 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ExamTestScreen />
      </Suspense>
    </main>
  );
}
  