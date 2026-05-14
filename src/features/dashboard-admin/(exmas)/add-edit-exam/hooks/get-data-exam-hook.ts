"use client";

import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import { useQuery } from "@tanstack/react-query";
import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";

export  function  useGetExmasDipomas() {
  const query = useQuery({
    queryKey: ["diplomas-admin"],
    queryFn: async () => {
      const response = await fetch(`/api/diplomas?page=1&limit=100`);
      const data: ApiResponse<IPaginationResponse<IDiploma>> =
        await response.json();
      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
  });

  return {
    ...query,
  };
}

