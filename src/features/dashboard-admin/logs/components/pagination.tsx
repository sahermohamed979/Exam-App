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
import ClearLogs from "./clear-logs";

export function PaginationDemo({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onNextPage,
  onPreviousPage,
  mode,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  mode: string;
}) {
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="flex flex-wrap w-full min-w-0 items-center gap-3 sm:gap-4 px-3 sm:px-4 py-4 bg-white border border-gray-100">
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
      {mode === "diploma" ? (
        <Link
          href={"/add-diploma"}
          className="bg-emerald-500 ms-auto flex justify-center items-center gap-2 p-3 max-sm:w-full max-sm:justify-center"
        >
          <Plus size={18} className="text-white" />
          <span className="font-mono text-sm text-white">Add New Diploma</span>
        </Link>
      ) : (
        <div className="ms-auto max-sm:w-full">
          <ClearLogs />
        </div>
      )}
    </div>
  );
}
