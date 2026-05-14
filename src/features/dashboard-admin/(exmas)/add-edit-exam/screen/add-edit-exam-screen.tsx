import AddExamForm from "../components/add-exam.form";
import EditExamForm from "../components/edit-form-exam";
import { IExam } from "../../Exams/types/exams";
import { get_exam_actions } from "../../selected-exam/apis/get-exam-actions";
export default async function AddEditExamScreen({
  mode,
  examId,
}: {
  mode: "add" | "edit";
  examId: string;
}) {
  const data = mode === "edit" && (await get_exam_actions(examId));
  return (
    <div className="bg-gray-200 p-4">
      <div className="bg-[#f5f6f8]   ">
        <div className=" mx-auto bg-white border border-gray-100  overflow-hidden shadow-sm">
          <div
            className={`bg-blue-600 text-white font-semibold px-6 py-3 text-sm`}
          >
            {mode === "add" ? "Add New Exam" : "Edit Exam"}
          </div>

          <div className="p-6   h-auto">
            {mode === "add" ? (
              <AddExamForm />
            ) : (
              <EditExamForm examId={examId} initialData={data as IExam} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
