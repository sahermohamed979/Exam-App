import "server-only";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { ApiResponse } from "@/src/shared/types/api";
import { IloginResponse, LoginField } from "../types/auth";

export const login = async (credentials: LoginField) => {
  try {
    const payload: AxiosResponse<ApiResponse<IloginResponse>> = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      method: "POST",
      data: credentials,
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

