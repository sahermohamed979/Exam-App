"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function Headers({ prams }: { prams: { diploma?: string } }) {
  return (
    <header className="flex w-full min-w-0 flex-col mt-4 max-sm:mt-2 mb-4 max-sm:mb-2">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4 break-words min-w-0">
        Diplomas / <span className="text-blue-600">{formatSlugName(prams.diploma ?? "")}</span>
      </p>
    </header>
  );
}
  