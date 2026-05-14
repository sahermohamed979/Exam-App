"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";
import { Ban, ExternalLink, PenLine, Trash } from "lucide-react";
import Link from "next/link";
import { IQuestionAdmin } from "../types/question";
import {
  deleteQuestionById,
  immutableQuestion,
} from "../apis/get-question-actions";

export default function QuestionHeaderButtons({
  params,
}: {
  params: { id: string; question?: IQuestionAdmin };
}) {
  return (
    <header className="flex w-full  items-center justify-between mt-4 p-3 border bg-white border-gray-200">
      <h1 className="font-inter  font-semibold  text-[18px]  text-gray-800 ms-4 flex flex-col">
        {formatSlugName(params.question?.text ?? "")}

        <span className="text-sm text-gray-400 flex   font-inter font-normal  items-center gap-1">
          Exam:
          <Link
            href={`/exams/${params.question?.exam.id}?exam=${encodeURIComponent(params.question?.exam.title || "")}`}
            className="text-sm text-gray-400  underline  cursor-pointer flex items-center gap-1"
          >
            {params.question?.exam.title}
            <ExternalLink size={14} />
          </Link>
        </span>
      </h1>
      <div className="flex gap-3">
        <button
          onClick={async () => {
            await immutableQuestion(params.id);
            window.location.href = "/";
          }}
          className="px-4 
        
         py-2 bg-gray-200  flex cursor-pointer items-center gap-2 text-gray-800"
        >
          <Ban size={18} />
          <span className="material-symbols-outlined font-mono text-sm">
            Immutable
          </span>
        </button>
        <Link
          href={`/exams/${params.question?.exam.id}/edit-question/${params.question?.id}?title=${params.question?.text}`}
          className="px-4  bg-blue-600  text-white flex items-center gap-2"
        >
          <PenLine size={18} />
          <span className="material-symbols-outlined font-mono text-sm">
            Edit
          </span>
        </Link>
        <button
          onClick={async () => {
            await deleteQuestionById(params.id);
            window.location.href = `/exams/${params.question?.exam.id}?exam=${encodeURIComponent(params.question?.exam.title || "")}`;
          }}
          className="px-4 
        
         py-2 bg-red-500 text-white flex cursor-pointer items-center gap-2"
        >
          <Trash size={18} />
          <span className="material-symbols-outlined font-mono text-sm">
            Delete
          </span>
        </button>
      </div>
    </header>
  );
}
