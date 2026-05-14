"use server";

import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import {
  AddDiplomaInput,
  addDiplomaSchema,
} from "../schema/add-diplomas-schema";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";
import { ApiResponse } from "@/src/shared/types/api";

export async function addDiploma(values: AddDiplomaInput) {
  const reult = addDiplomaSchema.safeParse(values);
  if (!reult.success) {
    throw new Error(reult.error.message);
  }
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diplomas`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
      data: reult.data,
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

export async function deleteDiploma(id: string) {
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diplomas/${id}`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
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

export async function editDiploma({
  id,
  values,
}: {
  id: string;
  values: AddDiplomaInput;
}) {
  const reult = addDiplomaSchema.safeParse(values);
  if (!reult.success) {
    throw new Error(reult.error.message);
  }
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;

  try {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diplomas/${id}`,
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token),
      },
      data: reult.data,
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
