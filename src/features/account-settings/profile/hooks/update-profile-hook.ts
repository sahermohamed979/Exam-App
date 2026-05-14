"use client";
import { useMutation } from "@tanstack/react-query";
import { updateAccountProfileRequest } from "../apis/account.action";
import { AccountProfileField } from "../../../auth/types/auth";
import { useSession } from "next-auth/react";
import { Console } from "console";

export function useUpdateAccount() {
  const { update } = useSession();

  return useMutation({
    mutationFn: async (values: AccountProfileField) => {
      const response = await updateAccountProfileRequest(values);

      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onSuccess: async (response) => {
      await update({ user: response.payload.user });

      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") ||
        "/account";

      window.location.replace(callbackUrl);
    },
  });
}
