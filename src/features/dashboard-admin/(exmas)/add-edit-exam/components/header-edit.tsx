import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function HeaderEditExam({ title }: { title?: string }) {

  return (
    <header className=" flex w-full flex-col  mt-4  ">
      <p className="  font-semibold  font-mono text-sm text-gray-400  ms-4">
        Exams / {formatSlugName(title ?? "")}<span className="text-blue-600 ms-2">/Edit</span>
      </p>
    </header>
  );
}
