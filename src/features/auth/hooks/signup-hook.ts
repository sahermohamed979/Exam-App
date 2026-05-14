"use client";
import { useForm } from "react-hook-form";
import { registerBodySchema } from "../Schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterField } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { register } from "../apis/register.action";
import { signIn } from "next-auth/react";

export function useSignup() {
  const {
    handleSubmit: handelRegister,
    control: controlRegister,
    formState: formStateRegister,
    trigger: triggerRegister,
    setValue: setValueRegister,
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(registerBodySchema),
    shouldUnregister: false,
  });
  const onSubmitRegister = async (values: RegisterField) => {
    mutate(values);
  };
  const { mutate, isPending: isPendingRegister } = useMutation({
    mutationFn: async (values: RegisterField) => {
      const data = await register(values);
      if (!data?.status)
        throw new Error(data?.message || "something went wrong");
      return data;
    },

    onSuccess: async (payload, values) => {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.ok)
        throw new Error(response?.error || "something went wrong");
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      location.href = callbackUrl;
    },
    onError: (error) => {
      setError("form", {
        message: error.message,
      });
    },
  });

  return {
    handelRegister,
    controlRegister,
    isPendingRegister,
    onSubmitRegister,
    formStateRegister,
    triggerRegister,
    setValueRegister,
  };
}
