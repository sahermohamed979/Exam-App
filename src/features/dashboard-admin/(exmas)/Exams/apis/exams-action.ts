import { ApiResponse, IPaginationResponse } from "@/src/shared/types/api";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import {
  DIPLOMAS_PER_PAGE,
  HEADERS,
} from "@/src/shared/constants/api.constants";
import { IExam } from "../types/exams";

export default async function getExams(req: NextRequest) {
  const token = await getToken({ req });
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit =
    Number(req.nextUrl.searchParams.get("limit")) || DIPLOMAS_PER_PAGE;
  const search = req.nextUrl.searchParams.get("search");
  const immutable = req.nextUrl.searchParams.get("immutable");
  const diplomaId = req.nextUrl.searchParams.get("diplomaId");
  const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
  const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "desc";
  if (!token) return RESPONSES.Unauthorized;

  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy: sortBy,
    sortOrder: sortOrder,
  });

  if (search) queryParams.set("search", search);
  if (immutable) queryParams.set("immutable", immutable);
  if (diplomaId) queryParams.set("diplomaId", diplomaId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token.token),
      },
    },
  );
  const payload: ApiResponse<IPaginationResponse<IExam>> =
    await response.json();
  return payload;
}

export async function deleteExam(examId: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}`,
    {
      method: "DELETE",
      headers: {
        ...HEADERS.authorization(token),
      },
    },
  );
  const payload: ApiResponse<IExam> = await response.json();
  return payload;
}
