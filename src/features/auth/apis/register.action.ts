"use server";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { IloginResponse, RegisterField } from "../types/auth";
import { VerifyEmailField, VerifyOtpField } from "../types/auth";
import {
  sendEmailVerificationBodySchema,
  verifyOtpBodySchema,
} from "../Schema/verfiy-email--schema";
import { registerBodySchema } from "../Schema/register-schema";
import { ApiResponse } from "@/src/shared/types/api";

export const sendEmailVerification = async ({ email }: VerifyEmailField) => {
  const result = sendEmailVerificationBodySchema.safeParse({ email });
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-email-verification`,
      method: "POST",
      data: result.data,
      headers: { ...HEADERS.jsonBody },
    });

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const verifyOtp = async ({ email, code }: VerifyOtpField) => {
  const result = verifyOtpBodySchema.safeParse({ email, code });
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/confirm-email-verification`,
      method: "POST",
      data: result.data,
      headers: { ...HEADERS.jsonBody },
    });

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};
export const register = async (value: RegisterField) => {
  const result = registerBodySchema.safeParse(value);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      data: result.data,
      headers: { ...HEADERS.jsonBody },
    };

    const response: AxiosResponse<ApiResponse<IloginResponse>> =
      await axios(options);

    const data = response.data; 

    if (!data.status) {
      throw new Error(data.message);
    }
    return {
      user: data?.payload?.user,
      code: data?.code,
      status: data?.status,
      message: data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "something went wrong";
      throw new Error(message);
    }

    throw new Error("something went wrong");
  }
};
