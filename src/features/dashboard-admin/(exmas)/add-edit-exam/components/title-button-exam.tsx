"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";
import { PenLine, Trash } from "lucide-react";
import Link from "next/link";
import { useDeleteExm } from "../../add-edit-exam/hooks/add-exam-hook";
import { immutableExam } from "../../selected-exam/apis/get-exam-actions";
import { Ban } from "lucide-react";

export default function TitleButtonsExam({
  params,
}: {
  params: { id: string; exam?: string };
}) {
  const { mutate: deleteExmMutation } = useDeleteExm(params.id);
  return (
    <header className="flex w-full  items-center justify-between mt-4 p-3 border bg-white border-gray-200">
      <h1 className="font-semibold font-inter text-[18px] text-gray-800 ms-4">
        {formatSlugName(params.exam ?? "")}
      </h1>

      <div className="flex gap-3">
        <button
          onClick={async () => {
            await immutableExam(params.id);
            window.location.href = "/exams";
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
          href={`/exams/${params.id}/edit`}
          className="px-4  bg-blue-600  text-white flex items-center gap-2"
        >
          <PenLine size={18} />
          <span className="material-symbols-outlined font-mono text-sm">
            Edit
          </span>
        </Link>
        <button
          onClick={() => {
            deleteExmMutation();
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
