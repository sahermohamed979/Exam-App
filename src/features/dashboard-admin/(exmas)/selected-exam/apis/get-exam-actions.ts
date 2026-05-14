import { getAuthToken } from "@/src/features/auth/components/util/token.action";

import { HEADERS } from "@/src/shared/constants/api.constants";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import { ApiResponse, Iimmutable } from "@/src/shared/types/api";
import { IExam } from "../../Exams/types/exams";
import { IExamResponse, IQuestion, Question } from "@/src/features/dashboard-user/exams/types/questions";

export async function get_exam_actions(examId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token),
        ...HEADERS.jsonBody,
      },
    },

  );
  if (!response.ok) return RESPONSES.Unauthorized;

  const data: ApiResponse<IExamResponse<IExam>> = await response.json();
  if (!data.status) {
    return;
  }

  return data.payload.exam;
}


export async function get_exam_questions_actions(examId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/exam/${examId}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token),
        ...HEADERS.jsonBody,
      },
    },

  );
  if (!response.ok) return RESPONSES.Unauthorized;

  const data: ApiResponse<IQuestion<Question>> = await response.json();
  if (!data.status) {
    return;
  }

  return data.payload.questions;
}

export async function immutableExam(examId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exams/${examId}/immutable`,
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
