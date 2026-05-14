"use client";
import UseLogs from "../hooks/logs-hooks";
import { useMemo } from "react";
import { PaginationDemo } from "../components/pagination";
import { TableLogs } from "../components/table-logs";
import { LOGS_PER_PAGE } from "@/src/shared/constants/api.constants";
import ExamTestSkeleton from "@/src/features/dashboard-user/exams/skeletons/exam-test-skeleton";
import { FilterLogs } from "../components/filter-logs";
export default function LogsScreen() {
  const {
    data,
    isLoading,
    page,
    nextPage,
    previousPage,
    applyFilters,
    resetFilters,
  } = UseLogs();
  const mode = "logs";

  const { currentLogs, totalPages, totalItems, pageSize } = useMemo(
    () => ({
      currentLogs: data?.data || [],
      totalPages: data?.metadata.totalPages || 0,
      totalItems: data?.metadata.total || 0,
      pageSize: data?.metadata.limit || LOGS_PER_PAGE,
    }),
    [data],
  );

  return (
    <div>
      <PaginationDemo
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        mode={mode}
      />
      <div className=" w-full h-full p-6 bg-gray-100 ">
        <FilterLogs
          onFilter={(filters) => {
            applyFilters(filters);
          }}
          onReset={resetFilters}
        />{" "}
        {isLoading ? <ExamTestSkeleton /> : <TableLogs logs={currentLogs} />}
      </div>
    </div>
  );
}
