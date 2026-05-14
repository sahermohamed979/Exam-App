"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function Headers({ prams }: { prams: { diploma?: string } }) {
  return (
    <header className="flex w-full flex-col mt-4 ">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4">
        Diplomas / <span className="text-blue-600">{formatSlugName(prams.diploma ?? "")}</span>
      </p>
    </header>
  );
}
  