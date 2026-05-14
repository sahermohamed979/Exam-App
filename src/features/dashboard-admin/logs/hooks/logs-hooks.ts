"use client";

import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Ilogs } from "../types/log";
import { logs_options } from "../constants/logs.options";
import {
  DEFAULT_USER_LOGS_FILTERS,
  LOGS_PER_PAGE,
} from "@/src/shared/constants/api.constants";
import { deleteLogs, deleteLogsById, getUser } from "../apis/logs.action";
type Filters = {
  category: string;
  action: string;
  actorUserId: string;
  sortBy: string;
  sortOrder: string;
};
export default function UseLogs() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filters>(DEFAULT_USER_LOGS_FILTERS);

  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || LOGS_PER_PAGE;

  const query = useQuery({
    queryKey: [...logs_options.list(page, limit), filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));

      if (filter.category) params.set("category", filter.category);
      if (filter.action) params.set("action", filter.action);
      if (filter.actorUserId) params.set("actorUserId", filter.actorUserId);
      if (filter.sortBy) params.set("sortBy", filter.sortBy);
      if (filter.sortOrder) params.set("sortOrder", filter.sortOrder);

      const response = await fetch(`/api/logs?${params.toString()}`);
      const data: ApiResponse<IPaginationResponse<Ilogs>> =
        await response.json();
      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
    placeholderData: keepPreviousData,
    retry: 2,
  });

  return {
    ...query,
    page,
    nextPage: () => setPage((p) => p + 1),
    previousPage: () => setPage((p) => Math.max(1, p - 1)),
    applyFilters: (newFilter: Filters) => {
      setFilter(newFilter);
      setPage(1);
    },
    resetFilters: () => {
      setFilter(DEFAULT_USER_LOGS_FILTERS);
      setPage(1);
    },
  };
}

export const useClearLogs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await deleteLogs();
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs-list"] });
    },
  });
};

export const useDeleteLogsById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteLogsById(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs-list"] });
      window.location.href = "/logs";
    },
  });
};

export function UseGetAllUsers() {
  const query = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await getUser();
      console.log("res", res);

      return res;
    },
  });

  return {
    ...query,
  };
}
