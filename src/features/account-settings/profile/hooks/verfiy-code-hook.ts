"use client";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationCodeRequest } from "../apis/account.action";
import { VerifyOtpField } from "../../../auth/types/auth";
import { useSession } from "next-auth/react";

export function useConfirmChangeEmail() {
  const { update } = useSession();

  return useMutation({
    mutationFn: async (values: VerifyOtpField) => {
      const response = await sendVerificationCodeRequest(values);

      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onSuccess: async (response) => {
      await update({ user: response.payload.user });
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") ||
        "/account";
      location.href = callbackUrl;
    },
  });
}
