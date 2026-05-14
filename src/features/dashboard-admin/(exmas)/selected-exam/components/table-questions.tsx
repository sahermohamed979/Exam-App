import {
  TableBody,
  TableCell,
  TableRow,
} from "@/src/shared/components/ui/table";
import { ArrowDownWideNarrow, Ellipsis, Eye, Pencil } from "lucide-react";
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
import { Question } from "@/src/features/dashboard-user/exams/types/questions";
import { ErrorResponse } from "@/src/shared/types/api";
import DeletButton from "./delet-button";

export function TableQuestions({
  questions,
}: {
  questions: Question[] | ErrorResponse | undefined;
}) {
  return (
    <TableBody className="bg-[#f8fafc]">
      <TableRow className="border-b bg-gray-200 hover:bg-gray-50 transition-colors">
        <TableCell className="font-mono text-[#334155] text-sm font-medium px-4">
          Title
        </TableCell>

        <TableCell className=" text-right px-4 flex items-center justify-end gap-2">
          {true ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <ArrowDownWideNarrow size={18} />
                  <span>Sort</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Title (descending)</DropdownMenuItem>
                <DropdownMenuItem>Title (ascending)</DropdownMenuItem>
                <DropdownMenuItem>Newest (descending)</DropdownMenuItem>
                <DropdownMenuItem>Newest (ascending)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <ArrowDownWideNarrow size={18} />
              <span>Sort</span>
            </>
          )}
        </TableCell>
      </TableRow>
      {Array.isArray(questions) &&
        questions.map((question) => (
          <TableRow
            key={question.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <TableCell className="font-mono text-[#334155] text-sm font-medium px-4">
              <Tooltip>
                <TooltipTrigger>{question.text}</TooltipTrigger>
                <TooltipContent>
                  <p> {question.text}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>

            <TableCell className="text-right px-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#475569] rounded transition-colors inline-flex items-center justify-center">
                    <Ellipsis size={18} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem className=" cursor-pointer">
                    <Link
                      href={`/exams/${question.examId} /questions/${question.id} `}
                      className="flex items-center gap-2"
                    >
                      <Eye size={18} />
                      <span>View</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Pencil size={18} />
                    <Link
                      href={`/exams/${question.examId}/edit-question/${question.id}?title=${question.text}`}
                      className="flex items-center gap-2"
                    >
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DeletButton id={question.id} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
}
