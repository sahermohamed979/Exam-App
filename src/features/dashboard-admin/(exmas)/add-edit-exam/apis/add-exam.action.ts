"use server";

import { AddExamInput, AddExamSchema } from "../schema/edit-add-exam.schema";
import { ApiResponse } from "@/src/shared/types/api";
import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import { IExam } from "../../Exams/types/exams";

export async function addExamAction(values: AddExamInput) {
  const result  = AddExamSchema.safeParse(values);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/exams`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
      data: result.data,
    };
    const res: AxiosResponse<ApiResponse<IDiploma>> = await axios(options);
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



export async function updateExamAction(
  id: string,
  values: Partial<AddExamInput>,
) {
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${id}`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
      data: values,
    };
    const res: AxiosResponse<ApiResponse<IExam>> = await axios(options);
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
 
export async function deleteExm(id: string) {
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${id}`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
    };
    const res: AxiosResponse<ApiResponse<IExam>> = await axios(options);
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