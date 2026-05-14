"use server";
import { HEADERS } from "@/src/shared/constants/api.constants";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  AccountProfileField,
  ChangeNewEmailField,
  VerifyOtpField,
} from "../../../auth/types/auth";
import { getAuthToken } from "../../../auth/components/util/token.action";
import {
  accountProfileSchema,
  changeNewEmailSchema,
  checkVerificationCodeSchema,
} from "../schema/profile-schema";
import { ApiResponse } from "@/src/shared/types/api";
import { UserType } from "@/src/features/auth/types/user";

export const sendChangeEmailRequest = async (newEmail: ChangeNewEmailField) => {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const result = changeNewEmailSchema.safeParse(newEmail);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/email/request`,
      method: "POST",
      data: result.data,
      headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
    });

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const sendVerificationCodeRequest = async (values: VerifyOtpField) => {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const result = checkVerificationCodeSchema.safeParse(values);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/email/confirm`,
      method: "POST",
      data: result.data,
      headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
    });

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const deleteAccountRequest = async () => {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/account`,
      method: "DELETE",
      headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
    });

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const updateAccountProfileRequest = async (
  value: AccountProfileField,
) => {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const result = accountProfileSchema.safeParse(value);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const options: AxiosRequestConfig = {
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
      data: result.data,
      headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
    };

    const response: AxiosResponse<ApiResponse<{user:UserType}>> = await axios(options);

    if (!response.data.status) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "something went wrong";
      throw new Error(message);
    }

    throw new Error("something went wrong");
  }
};
