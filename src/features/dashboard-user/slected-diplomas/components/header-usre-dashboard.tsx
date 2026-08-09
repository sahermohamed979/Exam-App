import { Book } from "lucide-react";
import React from "react";
import BackButton from "../../../../shared/components/ui/backButton";
import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function HeaderUserDashboard({ title }: { title: string  }) {
  const formattedTitle = formatSlugName(title );
  return (
    <>
      <header className="mb-3 w-full max-w-full text-gray-400 sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
        Diplomas/
        <span className="text-blue-600 break-words"> {formattedTitle}</span>
      </header>

      <div className={`flex items-center gap-3 mb-3 w-full max-w-full text-white`}>
        <BackButton />{" "}
        <div className="flex items-center gap-2 sm:gap-3 bg-blue-600 w-full max-w-full min-w-0 p-2 py-3">
          <Book size={30} className="shrink-0 sm:hidden" />
          <Book size={43} className="hidden sm:block shrink-0" />
          <h1 className="text-xl sm:text-3xl font-semibold capitalize max-sm:truncate min-w-0">
            {formattedTitle}
          </h1>
        </div>
      </div>
    </>
  );
}
