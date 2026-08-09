"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";
import { Ban, PenLine, Trash } from "lucide-react";
import Link from "next/link";
import { deleteDiploma } from "../../../(diplomas)/add-diploma/apis/diplomas-action";
import { immutableDiploma } from "../apis/get-diploma";

export default function TitleButtons({
  params,
}: {
  params: { id: string; diploma?: string };
}) {
  return (
    <header className="flex flex-wrap w-full min-w-0 items-center justify-between gap-3 mt-4 px-4 py-3 sm:px-3 border bg-white border-gray-200">
      <h1 className="font-semibold font-inter text-[18px] text-gray-800 ms-4 max-sm:ms-0 min-w-0 break-words">
        {formatSlugName(params.diploma ?? "")}
      </h1>
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <button
          onClick={async () => {
            await immutableDiploma(params.id);
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
          href={`/${params.id}/edit`}
          className="px-4  py-2 bg-blue-600  text-white flex items-center gap-2"
        >
          <PenLine size={18} />
          <span className="material-symbols-outlined font-mono text-sm">
            Edit
          </span>
        </Link>
        <button
          onClick={async () => {
            await deleteDiploma(params.id);
            window.location.href = "/";
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
