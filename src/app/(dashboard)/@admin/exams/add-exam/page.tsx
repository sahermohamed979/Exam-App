import AddEditExamScreen from "@/src/features/dashboard-admin/(exmas)/add-edit-exam/screen/add-edit-exam-screen";
import HeaderAddExam from "@/src/features/dashboard-admin/(exmas)/add-edit-exam/components/header-add-exam";
import AddButtons from "@/src/features/dashboard-admin/(diplomas)/add-diploma/components/title-buttons";

export default function page( ) {
  return (
    <main className="w-full">
      <HeaderAddExam />
      <AddButtons form="add-exam-form" title="Add Exam" />
      <div className="bg-gray-800">
        <AddEditExamScreen mode="add" examId="" />
      </div>
    </main>
  );
}
