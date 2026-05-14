import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { FormValues } from "../types/questions";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { ISubmitExam, IAnalytics } from "../types/submit";
import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import { ApiResponse } from "@/src/shared/types/api";

export const submitExam = async (data: FormValues) => {
  const jwt = await getAuthToken();
  const token = jwt?.token;

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/submissions`,
      data: data,
      headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
    };

    const response: AxiosResponse<ApiResponse<ISubmitExam<IAnalytics>>> =
      await axios(options);

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "something went wrong";
      throw new Error(message);
    }

    throw new Error("something went wrong");
  }
};
