import Veiw_exam_screen from "@/src/features/dashboard-admin/(exmas)/selected-exam/screen/veiw-exma-screeen";
import Header_view_exam from "@/src/features/dashboard-admin/(exmas)/selected-exam/components/headers-veiw-exam";
import {
  get_exam_actions,
  get_exam_questions_actions,
} from "@/src/features/dashboard-admin/(exmas)/selected-exam/apis/get-exam-actions";
import { Suspense } from "react";
import { SelectedDiplomaSkeleton } from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/skeleton/selected-diploma-skeleton";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { TableQuestions } from "@/src/features/dashboard-admin/(exmas)/selected-exam/components/table-questions";
import { Plus } from "lucide-react";
import Link from "next/link";
import TitleButtonsExam from "@/src/features/dashboard-admin/(exmas)/add-edit-exam/components/title-button-exam";
export default async function page({
  searchParams,
  params,
}: {
  params: Promise<{ exam: string }>;
  searchParams: Promise<{ exam?: string }>;
}) {
  const { exam: examId } = await params;
  const { exam } = await searchParams;
  const data = get_exam_actions(examId);
  const questions = await get_exam_questions_actions(examId);

  return (
    <main className=" w-full">
      <Header_view_exam prams={{ exam }} />
      <TitleButtonsExam params={{ id: examId, exam: exam }} />

      <div className="p-4  bg-gray-100 max-h-175 ">
        <Suspense fallback={<SelectedDiplomaSkeleton />}>
          <Veiw_exam_screen examData={data} />
        </Suspense>
      </div>
      <div className="px-4 py-2  bg-gray-100">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-blue-600">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-white font-medium py-2 px-4">
                Exam Questions
              </TableHead>

              <TableHead className=" text-white flex gap-2 flex-row-reverse font-medium py-2 px-4 text-right">
                <Link
                  href={`/exams/add-question?exam=${examId}&title=${exam} `}
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
    </main>
  );
}
