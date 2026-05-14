import { ApiResponse, IPaginationResponse } from "../../../../shared/types/api";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { IdeleteLogs, Ilogs, IUsers, log } from "../types/log";
import { LOGS_PER_PAGE } from "@/src/shared/constants/api.constants";
import { getAuthToken } from "@/src/features/auth/components/util/token.action";

export default async function getLogs(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) return RESPONSES.Unauthorized;

  const { searchParams } = req.nextUrl;

  const params = new URLSearchParams();
  params.set("page", searchParams.get("page") || "1");
  params.set("limit", searchParams.get("limit") || String(LOGS_PER_PAGE));

  const fields = ["category", "action", "actorUserId", "sortBy", "sortOrder"];
  fields.forEach((key) => {
    const val = searchParams.get(key);
    if (val) params.set(key, val);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/audit-logs?${params.toString()}`,
    {
      method: "GET",
      headers: { ...HEADERS.authorization(token.token) },
    },
  );

  const payload: ApiResponse<IPaginationResponse<Ilogs>> =
    await response.json();
  return payload;
}

export async function deleteLogs() {
  const jwt = await getAuthToken();

  if (!jwt?.token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/audit-logs`,
    {
      method: "DELETE",
      headers: {
        ...HEADERS.authorization(jwt.token),
      },
    },
  );
  if (!response.ok) return RESPONSES.Unauthorized;
  const data: ApiResponse<IdeleteLogs> = await response.json();
  if (!data.status) {
    return;
  }
  return data.payload;
}

export async function getLogsById(id: string) {
  const jwt = await getAuthToken();

  if (!jwt?.token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/audit-logs/${id}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(jwt.token),
      },
    },
  );
  if (!response.ok) return RESPONSES.Unauthorized;
  const data: ApiResponse<log<Ilogs>> = await response.json();
  if (!data.status) {
    return;
  }
  return data.payload.auditLog;
}

export async function deleteLogsById(id: string) {
  const jwt = await getAuthToken();

  if (!jwt?.token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/audit-logs${id}`,
    {
      method: "DELETE",
      headers: {
        ...HEADERS.authorization(jwt.token),
      },
    },
  );
  if (!response.ok) return RESPONSES.Unauthorized;
  const data: ApiResponse<IdeleteLogs> = await response.json();
  if (!data.status) {
    return;
  }
  return data.payload;
}

export async function getUser() {
  const jwt = await getAuthToken();

  if (!jwt?.token) return RESPONSES.Unauthorized;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?limit=100`,
      {
        method: "GET",
        headers: {
          ...HEADERS.authorization(jwt.token),
        },
      },
    );
    if (!response.ok) return undefined;

    const data: ApiResponse<IPaginationResponse<IUsers>> =
      await response.json();

    if (!data.status) {
      return;
    }

    return data.payload;
  } catch (error) {
    console.log("error.message", error);
  }
}
