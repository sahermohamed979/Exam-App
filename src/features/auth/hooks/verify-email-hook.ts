"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import {
  sendEmailVerificationBodySchema,
  verifyOtpBodySchema,
} from "../Schema/verfiy-email--schema";
import { sendEmailVerification, verifyOtp } from "../apis/register.action";
import { VerifyEmailField, VerifyOtpField } from "../types/auth";

export function useVerifyEmail() {
  // email form
  const {
    handleSubmit: handleSubmitEmail,
    control: controlEmail,
    setError: setErrorEmail,
    
    formState: formStateEmail,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(sendEmailVerificationBodySchema),
  });
  const onSubmitEmail = async (values: VerifyEmailField) => {
    await mutateEmail(values);
  };
  const { mutateAsync: mutateEmail, isPending: isPendingEmail  } = useMutation({
    mutationFn: async (values: VerifyEmailField) => {
      const response = await sendEmailVerification(values);

      if (!response?.status) throw new Error(response?.message);
      return response;
    },
    onSuccess: () => {},

    onError: (error) => {
      setErrorEmail("email", {
        message: "This email is already registered.",
      });
    },
  });
  // otp form
  const {
    handleSubmit: otpSubmit,
    control: otpControl,
    setError: otpSetError,
    reset: resetOtp,
    formState: otpFormState,
  } = useForm({
    defaultValues: {
      code: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(verifyOtpBodySchema.omit({ email: true })),
  });

  const onSubmitOtp = async (values: VerifyOtpField) => {
    await mutateOtp(values);
  };
  const { mutateAsync: mutateOtp, isPending: isPendingOtp } = useMutation({
    mutationFn: async (values: VerifyOtpField) => {
      const response = await verifyOtp(values);

      if (!response?.status) throw new Error(response?.message);
      return response;
    },

    onError: (error) => {
      otpSetError("form", {
        message: error.message,
      });
    },
  });
  return {
    handleSubmitEmail,
    controlEmail,
    isPendingEmail,
    onSubmitEmail,
    formStateEmail,
    otpSubmit,
    otpControl,
    resetOtp,
    otpSetError,
    otpFormState,
    isPendingOtp,
    onSubmitOtp,
  };
}
