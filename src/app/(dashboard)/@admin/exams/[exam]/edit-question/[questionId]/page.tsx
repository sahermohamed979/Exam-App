import HeaderAddQuestion from "@/src/features/dashboard-admin/add-edit-question/components/header-add-question";
import AddQuestionButtons from "@/src/features/dashboard-admin/add-edit-question/components/add-question-button";
import AddEditQuestionScreen from "@/src/features/dashboard-admin/add-edit-question/screen/add-edit-question.screen";
import HeaderEditQuestion from "@/src/features/dashboard-admin/add-edit-question/components/edit-header-question";
export default async function page({
  params,
  searchParams,
}: {
  params: { questionId: string; exam: string };
  searchParams: { title: string };
}) {
  const { questionId, exam } = await params;
  const { title } = await searchParams;

  
  return (
    <main className="w-full bg-gray-100">
      <HeaderEditQuestion title={title} />
      <AddQuestionButtons mode="edit" />

      <AddEditQuestionScreen
        mode="edit"
        examId={exam}
        questionId={questionId}
      />
    </main>
  );
}
