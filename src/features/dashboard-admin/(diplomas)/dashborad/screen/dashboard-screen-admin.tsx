"use client";
import { TableDiplomas } from "../components/table-diplomas";
import UseAdminDiplomaList from "../hooks/admin-diplomas-hook";
import { useMemo } from "react";
import { DIPLOMAS_PER_PAGE } from "@/src/shared/constants/api.constants";
import { PaginationDemo } from "../../../logs/components/pagination";
import { FilterDashboard } from "../components/filter-dashboard";
import ExamTestSkeleton from "@/src/features/dashboard-user/exams/skeletons/exam-test-skeleton";

export default function DashboardScreenAdmin() {
  const {
    data,
    isLoading,
    page,
    nextPage,
    previousPage,
    applyFilters,
    resetFilters,
    filters,
  } = UseAdminDiplomaList();

  const mode = "diploma"
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
  }) => {
    applyFilters({
      ...formFilters,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    applyFilters({
      search: filters.search,
      immutable: filters.immutable,
      sortBy,
      sortOrder,
    });
  };

  return (
    <div className="bg-gray-100">
      <PaginationDemo
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        mode={mode}
      />
      <div className="p-5">
        <FilterDashboard onFilter={handleFilterChange} onReset={resetFilters} />
        {isLoading ? (
          <ExamTestSkeleton />
        ) : (
          <TableDiplomas
            currentDiplomas={currentDiplomas}
            onSort={handleSort}
          />
        )}
      </div>
    </div>
  );
}
