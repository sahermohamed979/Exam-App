import {
  bulkQuestionItemSchema,
  BulkQuestionItemType,
} from "../schema/bulk-question-schema";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import { ApiResponse } from "@/src/shared/types/api";
import { BulkAddResponse } from "../types/bulk";

export async function addBulkQuestion(values: BulkQuestionItemType) {
  const result = bulkQuestionItemSchema.safeParse(values);
  if (!result.success) {
    throw new Error("Invalid data");
  }
  const jwt = await getAuthToken();
  if (!jwt) {
    return RESPONSES.Unauthorized;
  }
  const token = jwt.token;
  const { examId, ...rest } = values;
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/questions/exam/${examId}/bulk`,
    headers: {
      ...HEADERS.jsonBody,
      ...HEADERS.authorization(token),
    },
    data: rest,
  };
  try {
    const res: AxiosResponse<ApiResponse<BulkAddResponse>> =
      await axios(options);
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
