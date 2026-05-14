"use client";

import { ApiResponse } from "@/src/shared/types/api";
import { useQuery } from "@tanstack/react-query";

import { IQuestion, Question } from "../types/questions";

export default function useGetExam(examId: string) {
  return useQuery({
    queryKey: ["get-exam-questions", examId],
    queryFn: async () => {
      const response = await fetch(`/api/diplomas/questions/${examId}`);
      const data: ApiResponse<IQuestion<Question>> = await response.json();

      if (!data.status) throw new Error(data.message);
      return data.payload.questions;
    },
  });
}
