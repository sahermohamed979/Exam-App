import { ExternalLink } from "lucide-react";
import { IQuestionAdmin } from "../types/question";
import Link from "next/link";

export default function QuestionScreen({
  questionData,
}: {
  questionData: IQuestionAdmin;
}) {
  return (
    <div className=" bg-white flex flex-col gap-4 p-4  ">
      <div className="  ">
        <span className="font-mono text-sm text-gray-400">Headline </span>
        <h2 className="font-mono text-black text-sm leading-7 ">
          {questionData.text}
        </h2>
      </div>

      <div className=" flex flex-col ">
        <span className="font-mono text-sm text-gray-400">Exam </span>
        <h2 className="font-mono text-black text-sm  flex items-center gap-2 leading-7">
          {questionData.exam.title}

          <Link
            href={`/exams/${questionData.exam.id}?exam=${encodeURIComponent(questionData.exam.title)}`}
          >
            <ExternalLink size={18} className=" cursor-pointer" />
          </Link>
        </h2>
      </div>

      <div>
        <span className="font-mono text-sm text-gray-400">Answers </span>
        <h2 className="font-mono text-black text-sm  leading-7">
          {" "}
          {questionData.answers.length}{" "}
        </h2>
      </div>
    </div>
  );
}
