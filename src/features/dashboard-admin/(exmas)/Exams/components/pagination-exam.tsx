import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPageLabel,
  PaginationPrevious,
} from "@/src/shared/components/ui/pagination";
import { Plus } from "lucide-react";
import Link from "next/link";

export function PaginationExam({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onNextPage,
  onPreviousPage,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}) {
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="flex w-full min-w-0 flex-wrap items-center gap-3 sm:gap-4 px-4 py-4 bg-white border border-gray-100">
      <span className="text-sm text-gray-800 whitespace-nowrap font-mono">
        {rangeStart} – {rangeEnd} of {totalItems}
      </span>

      <Pagination className="w-auto border border-gray-300">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                onPreviousPage();
              }}
              className={
                currentPage === 1
                  ? "opacity-40 pointer-events-none"
                  : "  cursor-pointer"
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPageLabel current={currentPage} total={totalPages} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => onNextPage()}
              className={
                currentPage === totalPages
                  ? "opacity-40 pointer-events-none"
                  : "  cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Link
        href="/exams/add-exam"
        className="bg-emerald-500 max-sm:w-full max-sm:justify-center ms-auto flex justify-center items-center gap-2 p-3"
      >
        <Plus size={18} className="text-white" />
        <span className="font-mono text-sm text-white">Add New Exam</span>
      </Link>
    </div>
  );
}
