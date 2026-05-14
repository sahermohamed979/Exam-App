"use client";

import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  DEFAULT_EXAMS_FILTERS,
  DIPLOMAS_PER_PAGE,
} from "@/src/shared/constants/api.constants";
import { IExam } from "../types/exams";

type Filters = {
  search: string;
  immutable: boolean | undefined;
  sortBy: string;
  sortOrder: string;
  diplomaId: string | undefined;
};

export default function useAdminExamsList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(DEFAULT_EXAMS_FILTERS);

  const query = useQuery({
    queryKey: ["exams-admin", page, DIPLOMAS_PER_PAGE, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(DIPLOMAS_PER_PAGE));
      params.set("sortBy", filters.sortBy);
      params.set("sortOrder", filters.sortOrder);
      if (filters.search) params.set("search", filters.search);
      if (filters.immutable !== undefined)
        params.set("immutable", String(filters.immutable));
      if (filters.diplomaId !== undefined && filters.diplomaId !== null)
        params.set("diplomaId", filters.diplomaId);

      const response = await fetch(`/api/exams?${params.toString()}`);
      const data: ApiResponse<IPaginationResponse<IExam>> =
        await response.json();
      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
    placeholderData:keepPreviousData
  });

  const applyFilters = (newFilters: Filters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setPage(1);
    setFilters(DEFAULT_EXAMS_FILTERS);
  };

  return {
    ...query,
    page,
    filters,
    nextPage: () => setPage((p) => p + 1),
    previousPage: () => setPage((p) => Math.max(1, p - 1)),
    applyFilters,
    resetFilters,
  };
}
