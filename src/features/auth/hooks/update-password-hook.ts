"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPassowrdField, VerifyEmailField } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationBodySchema } from "../Schema/verfiy-email--schema";
import { forgetPassword, resetPassword } from "../apis/forget-action";
import { restPassowrdScema } from "../Schema/register-schema";

export function useUpdatePassword(token: string) {


  const {
    handleSubmit,
    control,
    setError,

    formState,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(sendEmailVerificationBodySchema),
  });
  const onSubmit = (values: VerifyEmailField) => {
    mutate(values);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: VerifyEmailField) => {
      const response = await forgetPassword(values);
      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onSuccess: () => {},
    onError: () => {
      setError("form", {
        message: "This email is not registered.",
      });
    },
  });

  const {
    handleSubmit: handleSubmitReset,
    control: controlReset,
    setError: setErrorReset,

    formState: formStateReset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(restPassowrdScema),
  });
  const onSubmitReset = (values: ResetPassowrdField) => {
    mutateReset(values);
  };
  const { mutate: mutateReset, isPending: isPendingReset } = useMutation({
    mutationFn: async (values: ResetPassowrdField) => {
      if (!token) throw new Error("Expired link or invalid");
      const response = await resetPassword(token, values);
      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") ||
        "login";
      location.href = callbackUrl;
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorReset("form", {
        message,
      });
    },
  });
  return {
    handleSubmit,
    control,
    isPending,
    onSubmit,
    formState,
    handleSubmitReset,
    controlReset,
    isPendingReset,
    onSubmitReset,
    formStateReset,
  };
}
