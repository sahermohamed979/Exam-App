import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { ArrowDownWideNarrow, Ellipsis, Eye, Pencil } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shared/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import Link from "next/link";
import { IExam } from "../types/exams";
import DeletExam from "./delet-exam";

function ExamActions({ exam }: { exam: IExam }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#475569] rounded transition-colors inline-flex items-center justify-center">
          <Ellipsis size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem className=" cursor-pointer">
          <Link
            href={`/exams/${exam.id}?exam=${encodeURIComponent(exam.title)}`}
            className="flex items-center gap-2"
          >
            <Eye size={18} />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Link
            href={`/exams/${exam.id}/edit?exam=${encodeURIComponent(exam.title)}`}
            className="flex items-center gap-2"
          >
            <Pencil size={18} />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DeletExam id={exam.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TableExams({
  currentExams,
  onSort,
}: {
  currentExams: IExam[];
  onSort?: (sortBy: string, sortOrder: string) => void;
}) {
  return (
    <>
      <div className="hidden md:block w-full max-w-full min-w-0">
        <Table className="w-full border-collapse">
      <TableHeader className="bg-blue-600">
        <TableRow className="hover:bg-transparent border-none">
          <TableHead className="text-white font-medium py-2 px-4">
            Image
          </TableHead>
          <TableHead className="text-white font-medium py-2 px-4">
            Title
          </TableHead>
          <TableHead className="text-white font-medium py-2 px-4">
            Description
          </TableHead>
          <TableHead className="text-white font-medium py-2 px-4">
            No. of Questions
          </TableHead>
          <TableHead className="text-white flex gap-2 flex-row-reverse font-medium py-2 px-4 text-right">
            {onSort ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowDownWideNarrow size={18} />
                    <span>Sort</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onSort("title", "desc")}>
                    Title (descending)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("title", "asc")}>
                    Title (ascending)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("createdAt", "desc")}>
                    Newest (descending)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("createdAt", "asc")}>
                    Newest (ascending)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onSort("questionsCount", "desc")}
                  >
                    Questions No. (descending)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onSort("questionsCount", "asc")}
                  >
                    Questions No. (ascending)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <ArrowDownWideNarrow size={18} />
                <span>Sort</span>
              </>
            )}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-[#f8fafc]">
        {currentExams.map((exam) => (
          <TableRow
            key={exam.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <TableCell className="py-3 px-3 max-w-lg">
              <div className="relative w-auto h-20 overflow-hidden ">
                <Image
                  src={exam.image || ""}
                  alt={exam.title}
                  fill
                  className="object-contain"
                />
              </div>
            </TableCell>

            <TableCell className="font-mono text-[#334155] text-sm font-medium px-4">
              <Tooltip>
                <TooltipTrigger>{exam.title}</TooltipTrigger>
                <TooltipContent>
                  <p> {exam.title}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>

            <TableCell className="py-3 px-2 max-w-xs align-top">
              <p className="font-mono text-gray-500 text-sm leading-relaxed line-clamp-2 overflow-hidden">
                {exam.description}
              </p>
            </TableCell>
            <TableCell className="py-3 px-3  align-top">
              <p className="font-mono  flex justify-center items-center text-gray-500 text-sm leading-relaxed line-clamp-2 overflow-hidden">
                {exam.questionsCount}
              </p>
            </TableCell>

            <TableCell className="text-right px-4">
              <ExamActions exam={exam} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
        </Table>
      </div>

      <div className="md:hidden flex w-full min-w-0 flex-col gap-4">
        {currentExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white border border-gray-100 rounded-md p-4 w-full min-w-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden border border-gray-100">
                <Image
                  src={exam.image || ""}
                  alt={exam.title}
                  fill
                  className="object-contain"
                />
              </div>
              <ExamActions exam={exam} />
            </div>

            <div className="mt-3 min-w-0">
              <p className="text-sm font-medium text-slate-400">Title</p>
              <p className="font-mono text-[#334155] text-sm font-medium break-words min-w-0">
                {exam.title}
              </p>
            </div>

            <div className="mt-3 min-w-0">
              <p className="text-sm font-medium text-slate-400">Description</p>
              <p className="font-mono text-gray-500 text-sm leading-relaxed break-words min-w-0">
                {exam.description}
              </p>
            </div>

            <div className="mt-3 min-w-0">
              <p className="text-sm font-medium text-slate-400">
                No. of Questions
              </p>
              <p className="font-mono text-gray-500 text-sm min-w-0">
                {exam.questionsCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
