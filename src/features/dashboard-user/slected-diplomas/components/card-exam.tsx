import { CircleQuestionMark, MoveRight, Timer } from "lucide-react";
import Image from "next/image";
import { IExam } from "../types/exams";
import Link from "next/link";
import { useParams } from "next/navigation";
import { generateSlug } from "@/src/shared/components/lib/utils";

export default function CardExam({ exams }: { exams: IExam }) {
  const { id } = useParams();

  return (
    <div className="py-2 px-3 group border border-blue-300 border-dotted overflow-hidden flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 w-full bg-[#eff6ff]">
      {/* Image */}
      <div className="flex h-24 w-full sm:w-auto sm:min-w-[120px] sm:h-[110px] items-center justify-center py-2 border border-blue-300 bg-[#dbeafe]">
        <Image
          src={exams.image}
          alt={exams.title}
          width={100}
          height={75}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-blue-600 relative space-y-1 flex-1 w-full">
        <h3 className="text-lg sm:text-xl font-semibold font-mono line-clamp-2 sm:line-clamp-none">
          {exams.title}
        </h3>
        <p className="text-sm opacity-90 max-w-full text-gray-500 break-all line-clamp-3 sm:line-clamp-4 font-mono mb-0">
          {exams.description}
        </p>
        <div className="flex gap-2 flex-wrap static sm:absolute sm:top-1 sm:right-2 pt-1 sm:pt-0">
          <span className="flex items-center gap-1 font-mono text-xs sm:text-sm text-gray-600">
            <CircleQuestionMark size={16} className="shrink-0 sm:size-[18px]" />{" "}
            {exams.questionsCount} Question |{" "}
            <Timer size={14} className="shrink-0 sm:size-[15px]" />
            {exams.duration} minutes
          </span>
        </div>
        <Link
          href={`/${id}/${generateSlug(exams.title)}-${exams.id}?duration=${exams.duration}`}
          className="static sm:absolute sm:right-2 sm:top-[102px] sm:group-hover:top-[50px]
             w-fit sm:w-auto mt-1 sm:mt-0
             bg-blue-600 text-white sm:bg-transparent sm:text-blue-600
             sm:group-hover:bg-blue-600 sm:group-hover:text-white
             transition-all duration-300 px-4 py-1.5 font-mono text-sm flex items-center gap-2"
        >
          Start <MoveRight size={18} />
        </Link>
      </div>
    </div>
  );
}
