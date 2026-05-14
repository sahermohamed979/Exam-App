import { Book } from "lucide-react";
import React from "react";
import BackButton from "../../../../shared/components/ui/backButton";
import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function HeaderUserDashboard({ title }: { title: string  }) {
  const formattedTitle = formatSlugName(title );
  return (
    <>
      <header className="mb-3 text-gray-400">
        Diplomas/
        <span className="text-blue-600"> {formattedTitle}</span>
      </header>

      <div className={`flex items-center gap-3 mb-3 text-white `}>
        <BackButton />{" "}
        <div className="flex items-center gap-3  bg-blue-600 w-full p-2 py-3">
          <Book size={43} />
          <h1 className="text-3xl font-semibold capitalize"> {formattedTitle}</h1>
        </div>
      </div>
    </>
  );
}
