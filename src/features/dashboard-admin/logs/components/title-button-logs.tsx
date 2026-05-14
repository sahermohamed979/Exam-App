"use client";

import { extractId, formatSlugName } from "@/src/shared/components/lib/utils";
import { useDeleteLogsById } from "../hooks/logs-hooks";
import { Trash } from "lucide-react";

export default function TitleButtonsLogsView({
  params,
}: {
  params: { id: string };
}) {
  const { mutate: deleteLogsById, isPending } = useDeleteLogsById();
  const id = extractId(params.id);
  return (
    <header className="flex w-full  items-center justify-between mt-4 p-3 border bg-white border-gray-200">
      <h1 className=" font-inter text-[18px] text-gray-800 ms-4 font-semibold">
        {formatSlugName(params.id ?? "")}
      </h1>
      <div className="flex gap-3">
        <button
          disabled={isPending}
          onClick={() => {
            deleteLogsById(id);
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
