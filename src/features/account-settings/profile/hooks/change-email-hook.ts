"use client";
import { useMutation } from "@tanstack/react-query";
import { sendChangeEmailRequest } from "../apis/account.action";
import { ChangeNewEmailField } from "../../../auth/types/auth";

export function useChangeEmail() {
  return useMutation({
    mutationFn: async (values: ChangeNewEmailField) => {
      const response = await sendChangeEmailRequest(values);

      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onError: (error) => {
      throw new Error(error.message);
    },
  });
}
