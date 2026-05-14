import HeaderExams from "@/src/features/dashboard-admin/(exmas)/Exams/components/headers";
import ExamsScreen from "@/src/features/dashboard-admin/(exmas)/Exams/screen/exams-screen";

export default function AdminExamsPage() {
  return (
    <main className="w-full">
      <HeaderExams />
      <ExamsScreen />
    </main>
  );
}
