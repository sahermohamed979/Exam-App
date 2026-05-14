"use server";

import {
  ChangePassowrdField,
  restPassowrdScema,
} from "../schema/change-pass-schema";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { getAuthToken } from "@/src/features/auth/components/util/token.action";

export async function changePasswordAction(values: ChangePassowrdField) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const result = restPassowrdScema.safeParse(values);

  if (!result.success) {
    throw new Error(result.error?.message);
  }
  try {
    const payload: AxiosResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password`,
      method: "POST",
      data: values,
      headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
    });

    return payload.data;    
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
