"use server";
import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import { HEADERS } from "@/src/shared/constants/api.constants";

import { IQuestionAdmin, QuestionApiResponse } from "../types/question";
import { ApiResponse, Iimmutable } from "@/src/shared/types/api";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


export async function getQuestionById(id: string) {
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${id}`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
    };
    const res: AxiosResponse<ApiResponse<QuestionApiResponse<IQuestionAdmin>>> =
      await axios(options);
    const data = res.data;

    if (!data.status) {
      throw new Error(data.message);
    }

    return data.payload.question
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "something went wrong";
      throw new Error(message);
    }

    throw new Error("something went wrong");
  }
}
export async function deleteQuestionById(id: string) {
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${id}`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
    };
    const res = await axios(options);
    const data = res.data;

    if (!data.status) {
      throw new Error(data.message);
    }

    return data.payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "something went wrong";
      throw new Error(message);
    }

    throw new Error("something went wrong");
  }
}
export async function immutableQuestion(questionId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/immutable`,
    {
      method: "PATCH",
      headers: {
        ...HEADERS.authorization(token),
        ...HEADERS.jsonBody,
      },
    },
  );
  if (!response.ok) return RESPONSES.Unauthorized;

  const data: ApiResponse<Iimmutable> = await response.json();
  if (!data.status) {
    return;
  }

  return data.message;
}
