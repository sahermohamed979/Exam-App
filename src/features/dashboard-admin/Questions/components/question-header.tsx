"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";
export default function QuestionHeader({
  prams,
}: {
  prams: { exam?: string; questions?: string };
}) {
  return (
    <header className="flex w-full flex-col mt-4 pb-2 ">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4">
        Exams / {prams?.exam ?? ""} / Questions /
        <span className="text-blue-600"> {prams?.questions ?? ""}</span>
      </p>
    </header>
  );
}
