import AddButtons from "@/src/features/dashboard-admin/(diplomas)/add-diploma/components/title-buttons";
import HeaderEditExam from "@/src/features/dashboard-admin/(exmas)/add-edit-exam/components/header-edit";
import AddEditExamScreen from "@/src/features/dashboard-admin/(exmas)/add-edit-exam/screen/add-edit-exam-screen";
import { get_exam_questions_actions } from "@/src/features/dashboard-admin/(exmas)/selected-exam/apis/get-exam-actions";
import { TableQuestions } from "@/src/features/dashboard-admin/(exmas)/selected-exam/components/table-questions";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Plus} from "lucide-react";
import Link from "next/link";

export default async function page({
  params,
  searchParams,
}: {
  params: { exam: string };
  searchParams: { exam?: string };
}) {
  const { exam: examTitle = "" } = await searchParams;
  const { exam: examId } = await params;
  const questions = await get_exam_questions_actions(examId);

  return (
    <main className="w-full">
      <HeaderEditExam title={examTitle} />
      <AddButtons form="add-exam-form" title={examTitle} />
      <div className="bg-gray-800">
        <AddEditExamScreen mode="edit" examId={examId} />
         <div className="px-4 py-8  bg-gray-200">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-blue-600">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-white font-medium py-2 px-4">
                Exam Questions
              </TableHead>

              <TableHead className=" text-white flex gap-2 flex-row-reverse font-medium py-2 px-4 text-right">
                <Link
                  href={`/add-question/${examId}`}
                  className="flex items-center gap-2"
                >
                  <Plus size={18} />
                  <span className="text-[16px] font-mono font-medium">
                    Add Questions
                  </span>
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableQuestions questions={questions} />
        </Table>
      </div>
      </div>
     
    </main>
  );
}
