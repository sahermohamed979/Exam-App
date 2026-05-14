"use client";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "../Schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginField } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export function useLogin() {
  const {
    handleSubmit,
    control,
    setError,

    formState,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(LoginFormSchema),
  }); 
  const onSubmit = (values: LoginField) => {
    mutate(values);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginField) => {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.ok)
        throw new Error(response?.error || "something went wrong");

      return response;
    },

    onSuccess: () => {
      
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      location.href = callbackUrl;
    },
    onError: () => {

      setError("form", {
        message: "something went wrong",
      });
    },
  });

  return { handleSubmit, control, isPending, onSubmit, formState };
}
