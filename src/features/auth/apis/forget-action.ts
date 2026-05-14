import axios, { AxiosError, AxiosResponse } from "axios";
import { HEADERS } from "@/src/shared/constants/api.constants";
import {
  IforgetPasswordResponse,
  ResetPassowrdField,
  VerifyEmailField,
} from "../types/auth";
import { ApiResponse } from "@/src/shared/types/api";
import { sendEmailVerificationBodySchema } from "../Schema/verfiy-email--schema";
import { restPassowrdScema } from "../Schema/register-schema";

export const forgetPassword = async (email: VerifyEmailField) => {
  const result = sendEmailVerificationBodySchema.safeParse(email);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  try {
    const payload: AxiosResponse<ApiResponse<IforgetPasswordResponse>> =
      await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        method: "POST",
        data: email,
        headers: { ...HEADERS.jsonBody },
      });

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid credentials";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const resetPassword = async (
  token: string,
  password: ResetPassowrdField,
) => {
  const result = restPassowrdScema.safeParse(password);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      method: "POST",
      data: {
        token,
        newPassword: password.password,
        confirmPassword: password.confirmPassword,
      },
      headers: { ...HEADERS.jsonBody },
    });


    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid credentials";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
