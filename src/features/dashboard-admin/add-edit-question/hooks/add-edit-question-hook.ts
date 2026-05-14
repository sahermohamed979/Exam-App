"use client";

import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IExam } from "../../(exmas)/Exams/types/exams";
import {
  addQuestion,
  getQuestionById,
  updateQuestion,
} from "../apis/add-edit-question.action";
import {
  ICreateQuestionBody,
  IUpdateQuestionBody,
} from "../schema/add-questions-schema";
import { IQuestionResponse } from "../types/add-edit-question";

export function useGetExmaFroQues() {
  const query = useQuery({
    queryKey: ["exma-for-ques"],
    queryFn: async () => {
      const response = await fetch(`/api/exams?page=1&limit=100`);
      const data: ApiResponse<IPaginationResponse<IExam>> =
        await response.json();
      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
  });

  return {
    ...query,
  };
}

export function useAddQuestion() {
  const query = useMutation({
    mutationFn: async (values: ICreateQuestionBody) => {
      const res = await addQuestion(values);

      return res;
    },

    onSuccess: () => {
      window.location.href = "/exams";
    },
  });

  return {
    ...query,
  };
}
export function useGetQuestionById(
  questionId: string,
  options?: { enabled?: boolean },
) {
  const query = useQuery<IQuestionResponse>({
    queryKey: ["question-edit", questionId],
    queryFn: async (): Promise<IQuestionResponse> => {
      const res = await getQuestionById(questionId);
      if (!res || "status" in res) {
        throw new Error("Question not found");
      }
      return res;
    },
    enabled: !!questionId && (options?.enabled ?? true),
  });

  return { ...query };
}

export function useUpdateQuestion(questionId: string) {
  const query = useMutation({
    mutationFn: async (values: IUpdateQuestionBody) => {
      const res = await updateQuestion(questionId, values);
      console.log(res);
      return res;
    },

    onSuccess: () => {
      window.location.href = "/exams";
    },
  });

  return {
    ...query,
  };
}
