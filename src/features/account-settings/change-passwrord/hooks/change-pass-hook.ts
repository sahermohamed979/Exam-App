import { useMutation } from "@tanstack/react-query";
import { ChangePassowrdField } from "../schema/change-pass-schema";
import { signOut } from "next-auth/react";
import { changePasswordAction } from "../apis/change-pass-action";

export default function useChangePassword() {
  return useMutation({
    mutationFn: async (values: ChangePassowrdField) => {
      const response = await changePasswordAction(values);
      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onSuccess: () => {
      signOut();
      location.href = "/login";
    },
  });
}
