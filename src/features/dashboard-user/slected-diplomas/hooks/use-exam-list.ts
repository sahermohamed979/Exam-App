"use client";

import { ApiResponse } from "@/src/shared/types/api";
import { useQuery } from "@tanstack/react-query";

import { IExam } from "../types/exams";
import { IDiplomaResponse } from "@/src/features/dashboard-user/dashborad/types/diploma";

export default function UseExamList(diplomaId: string) {
  return useQuery({
    queryKey: ["Exam-list", diplomaId],
    queryFn: async () => {
      const response = await fetch(`/api/diplomas/${diplomaId}`);
      const data: ApiResponse<IDiplomaResponse<IExam>> = await response.json();

      if (!data.status) throw new Error(data.message);
      return data.payload.diploma;
    },
  });
}
