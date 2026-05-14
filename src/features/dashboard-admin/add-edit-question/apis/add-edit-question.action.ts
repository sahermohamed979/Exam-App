"use server";

import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import {
  ICreateQuestionBody,
  IUpdateQuestionBody,
  updateQuestionBodySchema,
} from "../schema/add-questions-schema";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  IaddQuestionApiRESP,
  IAnswerResponse,
  IGetQuestionByIdResponse,
} from "../types/add-edit-question";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { ApiResponse } from "@/src/shared/types/api";
import { createQuestionBodySchema } from "../schema/add-questions-schema";

export async function addQuestion(values: ICreateQuestionBody) {
  const result = createQuestionBodySchema.safeParse(values);
  if (!result.success) {
    throw new Error("Invalid data");
  }
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/questions`,
    headers: {
      ...HEADERS.jsonBody,
      ...HEADERS.authorization(token),
    },
    data: result.data,
  };
  try {
    const res: AxiosResponse<
      ApiResponse<IaddQuestionApiRESP<IAnswerResponse>>
    > = await axios(options);
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

export async function getQuestionById(questionId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}`,
      {
        method: "GET",
        headers: {
          ...HEADERS.authorization(token),
          ...HEADERS.jsonBody,
        },
      },
    );
    if (!response.ok) throw new Error("Unauthorized");
    const data: ApiResponse<IGetQuestionByIdResponse> = await response.json();
    if (!data.status) {
      return;
    }
    return data.payload.question;
  } catch {
    return;
  }
}

export async function updateQuestion(
  questionId: string,
  values: IUpdateQuestionBody,
) {
  const result = updateQuestionBodySchema.safeParse(values);
  if (!result.success) {
    throw new Error("Invalid data");
  }

  const payload = {
    text: result.data.text,
    answers: result.data.answers.map(({ text, isCorrect }) => ({
      text,
      isCorrect,
    })),
  };

  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;
  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}`,
    headers: {
      ...HEADERS.jsonBody,
      ...HEADERS.authorization(token),
    },
    data: payload,
  };
  try {
    const res: AxiosResponse<ApiResponse<IGetQuestionByIdResponse>> =
      await axios(options);
    const data = res.data;

    if (!data.status) {
      throw new Error(data.message);
    }

    return data.payload.question;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "something went wrong";
      throw new Error(message);
    }

    throw new Error("something went wrong");
  }
}
