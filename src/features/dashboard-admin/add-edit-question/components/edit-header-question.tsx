import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function HeaderEditQuestion({ title }: { title?: string }) {
  return (
    <header className=" flex w-full flex-col    bg-white py-3 ">
      <p className="  font-semibold  font-mono text-sm text-gray-400  ms-4">
        Exams / {formatSlugName(title ?? "")}
        <span className="text-blue-600 ms-2">/Edit Question</span>
      </p>
    </header>
  );
}
