"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function Header_view_exam({ prams }: { prams: { exam?: string } }) {
  return (
    <header className="flex w-full min-w-0 flex-col mt-4 max-sm:mt-2 mb-4 max-sm:mb-2">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4 break-words min-w-0">
        Exams / <span className="text-blue-600">{formatSlugName(prams?.exam ?? "")}</span>
      </p>
    </header>
  );
}
  