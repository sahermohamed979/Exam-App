"use client";
import { CopyPlus, Save, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddQuestionButtons({ mode }: { mode: "add" | "edit" }) {
  const pathname = usePathname();
  const isBulk = pathname.includes("bulk");

  return (
    <header className="flex w-full items-center justify-between p-3 border bg-white border-gray-200">
      <Link
        href={
          isBulk
            ? "/exams/add-question"
            : "/exams/add-question/bulk"
        }
      >
        <button
          disabled={mode === "edit"}
          className={`${mode === "add" ? "visible" : "opacity-0"} ${
            isBulk ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } py-2.5 px-4 flex gap-2 items-center`}
        >
          <CopyPlus size={18} />
          <span className="font-mono text-sm font-medium">Bulk Add Mode</span>
        </button>
      </Link>
      <div className="flex">
        <Link href="/exams" className="px-4 py-2 flex bg-gray-200 ms-2">
          <span className="flex items-center gap-2 text-gray-800">
            <X size={18} />
            cancel
          </span>
        </Link>
        <button
          type="submit"
          form={isBulk ? "bulk-question-form" : "add-edit-question"}
          className="px-4 py-2 bg-emerald-500 text-white ms-2"
        >
          <span className="flex items-center gap-2">
            <Save size={18} />
            Save
          </span>
        </button>
      </div>
    </header>
  );
}
