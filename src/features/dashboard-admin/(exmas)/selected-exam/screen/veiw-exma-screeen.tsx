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
    <div className="flex w-full max-w-full min-w-0 flex-col gap-4 bg-white p-4 sm:p-0 sm:pl-3 font-mono text-[14px] leading-6 text-black">
      <div className="space-y-1 min-w-0">
        <p className="text-[15px] font-normal text-slate-400">Image</p>
        <Image
          src={exam.image ?? ""}
          alt={exam.title ?? ""}
          width={300}
          height={300}
          className="h-auto w-full max-w-72 object-cover bg-cover"
        />
      </div>
      <div className="space-y-1 min-w-0">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Title</p>
        <p className="break-words min-w-0 text-black">{exam.title}</p>
      </div>
      <div className="space-y-1 min-w-0">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Description</p>
        <p className="max-w-235 break-words min-w-0 text-black font-mono">{exam.description}</p>
      </div>
      <div className="space-y-1 min-w-0">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Diploma</p>
        <Link href={`/${exam.diploma.id}?diploma=${exam.diploma.title}`}>
          <span className="text-black flex text-sm font-mono items-center gap-1 flex-wrap min-w-0 break-words">
            <span className="break-words min-w-0">{exam.diploma.title}</span>
            <ExternalLink size={18} className="shrink-0" />
          </span>
        </Link>
      </div>
      <div className="space-y-1 min-w-0">
        <p className="text-[15px] font-normal text-slate-400 font-mono">Duration</p>
        <span className="text-black font-mono">{exam.duration}</span>
      </div>

      <div className="space-y-1 min-w-0">
        <p className="text-[15px] font-normal font-mono text-slate-400">
          No. of Questions
        </p>
        <p className="text-black font-mono">{exam.questionsCount}</p>
      </div>
    </div>



  );
}
