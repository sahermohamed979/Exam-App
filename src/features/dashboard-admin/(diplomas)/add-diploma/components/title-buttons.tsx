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
    <header className="flex w-full  items-center justify-between mt-4 p-3 border bg-white border-gray-200">
      <h1 className="font-semibold font-inter text-[18px] text-gray-800 ms-4">
        {formatSlugName(title ?? "")}
      </h1>
      <div className=" flex">
        <Link
          href="/"
          className="px-4 py-2 flex bg-gray-200 text-white  ms-2"
        >
          <span className="flex items-center gap-2 text-gray-800">
            <X size={18} />
            cancel
          </span>
        </Link>
        <button
          type="submit"
          form={form}
          className="px-4 py-2 bg-emerald-500 text-white   ms-2"
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
