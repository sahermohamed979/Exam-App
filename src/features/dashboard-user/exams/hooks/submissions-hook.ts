"use client";

import { useMutation } from "@tanstack/react-query";

import { FormValues } from "../types/questions";
import { submitExam } from "../apis/submit.actions";

export default function useSubmitExam() {
  return  useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await submitExam(data);

      if (!response?.status) throw new Error(response?.message || "Error");
      return response.payload;
    },
  });
}
