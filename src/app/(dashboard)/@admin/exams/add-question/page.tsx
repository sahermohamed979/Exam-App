import AddEditQuestionScreen from "@/src/features/dashboard-admin/add-edit-question/screen/add-edit-question.screen";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ exam: string; title: string }>;
}) {
  const { exam } = await searchParams;
  const { title } = await searchParams;

  return (
    <main className="w-full bg-gray-100">
     

      <AddEditQuestionScreen mode="add" examId={exam} examTitle={title}/>
      
    </main>
  );
}
