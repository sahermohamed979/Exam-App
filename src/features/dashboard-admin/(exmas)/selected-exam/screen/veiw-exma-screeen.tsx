import Image from "next/image";
import { get_exam_actions } from "../apis/get-exam-actions";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function veiw_exam_screen({
  examData,
}: {
  examData: ReturnType<typeof get_exam_actions>;
}) {
  const exam = await examData;
  if (!exam || "status" in exam) return null;
  return (
    <div className="flex w-full flex-col gap-4 bg-white  pl-3 font-mono text-[14px] leading-6 text-black">
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400">Image</p>
        <Image
          src={exam.image ?? ""}
          alt={exam.title ?? ""}
          width={300}
          height={300}
          className="h-72 w-72 object-cover bg-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Title</p>
        <p className="text-black">{exam.title}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Description</p>
        <p className="max-w-235 text-black font-mono">{exam.description}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Diploma</p>
        <Link href={`/${exam.diploma.id}?diploma=${exam.diploma.title}`}>
          <span className="text-black flex text-sm font-mono items-center gap-1">
            {exam.diploma.title}
            <ExternalLink size={18} />
          </span>
        </Link>
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Duration</p>
        <span className="text-black font-mono">{exam.duration}</span>
      </div>

      <div className="space-y-1">
        <p className="text-[15px] font-normal font-mono text-slate-400">
          No. of Questions
        </p>
        <p className="text-black font-mono">{exam.questionsCount}</p>
      </div>
    </div>



  );
}
