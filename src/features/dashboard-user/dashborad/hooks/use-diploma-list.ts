"use client";

import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IDiploma } from "../types/diploma";
import { DIPLOMA_OPTIONS } from "../constants/diploma.option";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGINATION } from "@/src/shared/constants/api.constants";

export default function UseDiplomaList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || DEFAULT_PAGINATION;

  return useInfiniteQuery({
    queryKey: DIPLOMA_OPTIONS.list(page, limit),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/diplomas?page=${pageParam}&limit=${limit}`,
      );

      const data: ApiResponse<IPaginationResponse<IDiploma>> =
        await response.json();

      if (!data.status) throw new Error(data.message);

      return data.payload;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.page === lastPage.metadata.totalPages) {
        return undefined;
      }
      return lastPage.metadata.page + 1;
    },
  });
}
