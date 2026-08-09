"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";
export default function QuestionHeader({
  prams,
}: {
  prams: { exam?: string; questions?: string };
}) {
  return (
    <header className="flex w-full min-w-0 flex-col mt-4 max-sm:mt-2 pb-2 mb-2">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4 break-words min-w-0">
        Exams / {prams?.exam ?? ""} / Questions /
        <span className="text-blue-600"> {prams?.questions ?? ""}</span>
      </p>
    </header>
  );
}
