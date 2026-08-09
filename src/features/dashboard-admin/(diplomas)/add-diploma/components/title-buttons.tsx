import { formatSlugName } from "@/src/shared/components/lib/utils";
import { Save, X } from "lucide-react";
import Link from "next/link";

export default function AddButtons({
  form,
  title,
}: {
  form: string;
  title: string;
}) {
  return (
    <header className="flex flex-wrap w-full min-w-0 items-center justify-between gap-3 mt-4 px-4 py-3 sm:px-3 border bg-white border-gray-200">
      <h1 className="font-semibold font-inter text-[18px] text-gray-800 ms-4 max-sm:ms-0 min-w-0 break-words">
        {formatSlugName(title ?? "")}
      </h1>
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <Link
          href="/"
          className="px-4 py-2 flex bg-gray-200 text-white  ms-2 max-sm:ms-0"
        >
          <span className="flex items-center gap-2 text-gray-800">
            <X size={18} />
            cancel
          </span>
        </Link>
        <button
          type="submit"
          form={form}
          className="px-4 py-2 bg-emerald-500 text-white   ms-2 max-sm:ms-0"
        >
          <span className="flex items-center gap-2">
            <Save size={18} />
            Save
          </span>{" "}
        </button>
      </div>
    </header>
  );
}
