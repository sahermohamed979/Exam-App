import QuestionScreen from "@/src/features/dashboard-admin/Questions/screen/questions.screen";
import { getQuestionById } from "@/src/features/dashboard-admin/Questions/apis/get-question-actions";
import QuestionSkeleton from "@/src/features/dashboard-admin/Questions/skeleton/question-skeleton";
import QuestionHeader from "@/src/features/dashboard-admin/Questions/components/question-header";
import QuestionHeaderButtons from "@/src/features/dashboard-admin/Questions/components/question-button-header";

export default async function page({
  params,
}: {
  params: { question: string };
}) {
  const { question } = await params;

  const questionData = await getQuestionById(question);

  if (!questionData || "status" in questionData) {
    return null;
  }

  return (
    <main className="w-full  bg-gray-100">
      <QuestionHeader
        prams={{ exam: questionData.exam.title, questions: questionData.text }}
      />
      <QuestionHeaderButtons
        params={{ id: question, question: questionData }}
      />
      <div className="bg-gray-100  p-4 ">
        {!questionData ? (
          <QuestionSkeleton />
        ) : (
          <QuestionScreen questionData={questionData} />
        )}
      </div>
    </main>
  );
}
