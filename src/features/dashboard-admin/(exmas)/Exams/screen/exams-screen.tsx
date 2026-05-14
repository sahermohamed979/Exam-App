"use client";
import useAdminExamsList from "../hooks/exams-hook";
import { useMemo } from "react";
import { DIPLOMAS_PER_PAGE } from "@/src/shared/constants/api.constants";
import ExamTestSkeleton from "@/src/features/dashboard-user/exams/skeletons/exam-test-skeleton";
import { PaginationExam } from "../components/pagination-exam";
import { TableExams } from "../components/table-exams";
import { FilterExam } from "../components/filters-exams";

export default function ExamsScreen() {
  const {
    data,
    isLoading,
    page,
    nextPage,
    previousPage,
    applyFilters,
    resetFilters,
    filters,
  } = useAdminExamsList();

  const { currentDiplomas, totalPages, totalItems, pageSize } = useMemo(
    () => ({
      currentDiplomas: data?.data || [],
      totalPages: data?.metadata.totalPages || 0,
      totalItems: data?.metadata.total || 0,
      pageSize: data?.metadata.limit || DIPLOMAS_PER_PAGE,
    }),
    [data],
  );

  const handleFilterChange = (formFilters: {
    search: string;
    immutable: boolean | undefined;
    diplomaId: string | undefined;
  }) => {
    applyFilters({
      ...formFilters,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      diplomaId: formFilters.diplomaId,
    });
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    applyFilters({
      search: filters.search,
      immutable: filters.immutable,
      sortBy,
      sortOrder,
      diplomaId: filters.diplomaId,
    });
  };

  return (
    <div className="bg-gray-100">
      <PaginationExam
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
      />
      <div className="p-5">
        <FilterExam onFilter={handleFilterChange} onReset={resetFilters} />
        {isLoading ? (
          <ExamTestSkeleton />
        ) : (
          <TableExams currentExams={currentDiplomas} onSort={handleSort} />
        )}
      </div>
    </div>
  );
}
