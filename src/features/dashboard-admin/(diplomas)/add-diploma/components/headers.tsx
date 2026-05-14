
'use client';
import { formatSlugName } from "@/src/shared/components/lib/utils";
import { usePathname } from "next/navigation";

export default function HeadersAddDiploma() {
    const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex w-full flex-col mt-4 ">
      <p className="font-semibold font-mono text-sm text-gray-400 ms-4">


        Diplomas / <span className="text-blue-600">{formatSlugName(segments[segments.length - 1] ?? "")}</span>
      </p>
    </header>
  );
}
