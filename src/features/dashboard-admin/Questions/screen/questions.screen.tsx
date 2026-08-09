import { ExternalLink } from "lucide-react";
import { IQuestionAdmin } from "../types/question";
import Link from "next/link";

export default function QuestionScreen({
  questionData,
}: {
  questionData: IQuestionAdmin;
}) {
  return (
    <div className="bg-white w-full max-w-full min-w-0 flex flex-col gap-4 p-4">
      <div className="min-w-0">
        <span className="font-mono text-sm text-gray-400">Headline </span>
        <h2 className="font-mono text-black text-sm leading-7 break-words min-w-0">
          {questionData.text}
        </h2>
      </div>

      <div className="flex flex-col min-w-0">
        <span className="font-mono text-sm text-gray-400">Exam </span>
        <h2 className="font-mono text-black text-sm flex flex-wrap items-center gap-2 leading-7 min-w-0">
          <span className="break-words min-w-0">{questionData.exam.title}</span>

          <Link
            href={`/exams/${questionData.exam.id}?exam=${encodeURIComponent(questionData.exam.title)}`}
            className="shrink-0"
          >
            <ExternalLink size={18} className="cursor-pointer" />
          </Link>
        </h2>
      </div>

      <div className="min-w-0">
        <span className="font-mono text-sm text-gray-400">Answers </span>
        <h2 className="font-mono text-black text-sm leading-7 min-w-0">
          {" "}
          {questionData.answers.length}{" "}
        </h2>
      </div>
    </div>
  );
}
