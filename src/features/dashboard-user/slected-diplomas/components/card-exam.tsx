import { CircleQuestionMark, MoveRight, Timer } from "lucide-react";
import Image from "next/image";
import { IExam } from "../types/exams";
import Link from "next/link";
import { useParams } from "next/navigation";
import { generateSlug } from "@/src/shared/components/lib/utils";

export default function CardExam({ exams }: { exams: IExam }) {
  const { id } = useParams();

  return (
    <div className=" py-2 px-3  group  border border-blue-300 border-dotted overflow-hidden items-center  flex gap-4 w-full   bg-[#eff6ff] ">
      {/* Image */}
      <div className="  w-auto  min-w-[120px] flex h-[110px] items-center justify-center py-2    border border-blue-300  bg-[#dbeafe] ">
        <Image
          src={exams.image}
          alt={exams.title}
          width={100}
          height={75}
          className="   object-cover    "
        />
      </div>

      {/* Content */}

      <div className="    text-blue-600 relative space-y-1 flex-1">
        <h3 className="text-xl font-semibold   font-mono  ">{exams.title}</h3>
        <p className="text-sm opacity-90 max-w-full text-gray-500  break-all line-clamp-4 font-mono mb-0">
          {exams.description}
        </p>
        <div className=" flex  gap-2  absolute top-1 right-2">
          <span className=" flex items-center gap-1 font-mono text-sm text-gray-600 ">
            {" "}
            <CircleQuestionMark size={18} /> {exams.questionsCount} Question |{" "}
            <Timer size={15} />
            {exams.duration} minutes
          </span>
        </div>
        <Link
          href={`/${id}/${generateSlug(exams.title)}-${exams.id}?duration=${exams.duration}`}
          className="absolute right-2 top-[102px] group-hover:top-[50px] 
             bg-transparent group-hover:bg-blue-600 
              group-hover:text-white 
             transition-all duration-300 px-4 py-1.5  font-mono text-sm flex items-center gap-2"
        >
          Start <MoveRight size={18} />
        </Link>
      </div>
    </div>
  );
}
