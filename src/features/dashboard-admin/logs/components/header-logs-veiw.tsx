"use client";

import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function Header_logs_veiw({
  prams,
}: {
  prams: { log?: string };
}) {
  return (
    <header className="flex w-full flex-col mt-4 ">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4">
        Audit /{" "}
        <span className="text-blue-600 font-mono">
          {formatSlugName(prams?.log ?? "")}
          
        </span>
      </p>
    </header>
  );
}
