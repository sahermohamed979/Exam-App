import { ApiResponse, IPaginationResponse } from "../../../../shared/types/api";
import { IDiploma } from "../types/diploma";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import {
  DEFAULT_PAGINATION,
  HEADERS,
} from "@/src/shared/constants/api.constants";

export default async function getDiplomas(req: NextRequest) {
  const token = await getToken({ req });
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit =
    Number(req.nextUrl.searchParams.get("limit")) || DEFAULT_PAGINATION;
  const search = req.nextUrl.searchParams.get("search");
  const immutable = req.nextUrl.searchParams.get("immutable");
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/diplomas?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token.token),
      },
    },
  );
  const payload: ApiResponse<IPaginationResponse<IDiploma>> =
    await response.json();
  return payload;
}
