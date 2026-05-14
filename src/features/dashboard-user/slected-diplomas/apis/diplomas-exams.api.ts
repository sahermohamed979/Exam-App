import { ApiResponse } from "@/src/shared/types/api.d";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { IDiplomaWithExams } from "@/src/features/dashboard-user/dashborad/types/diploma";
import { IExam } from "../types/exams";

export default async function getDiplomaExams(req: NextRequest, id: string) {
  const token = await getToken({ req });
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/diplomas/${id}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token.token),
      },
    },
  );
  const payload: ApiResponse<IDiplomaWithExams<IExam>> = await response.json();
  return payload;
}
