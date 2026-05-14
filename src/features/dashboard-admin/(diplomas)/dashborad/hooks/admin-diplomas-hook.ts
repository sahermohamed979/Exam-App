"use client";

import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteDiploma } from "../../add-diploma/apis/diplomas-action";
import { useState } from "react";
import {
  DEFAULT_FILTERS,
  DIPLOMAS_PER_PAGE,
} from "@/src/shared/constants/api.constants";
import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";

type Filters = {
  search: string;
  immutable: boolean | undefined;
  sortBy: string;
  sortOrder: string;
};

export default function UseAdminDiplomaList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const query = useQuery({
    queryKey: ["diplomas-admin", page, DIPLOMAS_PER_PAGE, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(DIPLOMAS_PER_PAGE),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });
      if (filters.search) params.set("search", filters.search);
      if (filters.immutable !== undefined)
        params.set("immutable", String(filters.immutable));

      const response = await fetch(`/api/diplomas?${params.toString()}`);
      const data: ApiResponse<IPaginationResponse<IDiploma>> =
        await response.json();
      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
    placeholderData: keepPreviousData,
  });

  const applyFilters = (newFilters: Filters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
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
export function useDeleteDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiploma(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diplomas-admin"] });
    },
  });
}
