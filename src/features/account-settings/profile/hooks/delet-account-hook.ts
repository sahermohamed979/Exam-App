"use client";
import { useMutation } from "@tanstack/react-query";
import { deleteAccountRequest } from "../apis/account.action";
import { signOut } from "next-auth/react";

export function useDeleteAccount() {

  return useMutation({
    mutationFn: async () => {
      const response = await deleteAccountRequest();

      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onSuccess: () => {
      signOut({ callbackUrl: "/login" });

    },
  });
}
