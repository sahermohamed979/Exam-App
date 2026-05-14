import { ApiResponse } from "@/src/shared/types/api.d";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { IQuestion, Question } from "../types/questions";

export default async function getExamApi(req: NextRequest, examId: string) {
  const token = await getToken({ req });
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/exam/${examId}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token.token),
      },
    },
  );
  const payload: ApiResponse<IQuestion<Question>> = await response.json();
  return payload;
}
