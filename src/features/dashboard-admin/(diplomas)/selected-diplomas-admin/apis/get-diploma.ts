import { getAuthToken } from "@/src/features/auth/components/util/token.action";
import {
  IDiploma,
  IDiplomaResponse,
} from "@/src/features/dashboard-user/dashborad/types/diploma";
import { HEADERS } from "@/src/shared/constants/api.constants";
import { RESPONSES } from "@/src/shared/constants/response.constant";
import { ApiResponse, Iimmutable } from "@/src/shared/types/api";

export async function getDiploma(diplomaId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/diplomas/${diplomaId}`,
    {
      method: "GET",
      headers: {
        ...HEADERS.authorization(token),
        ...HEADERS.jsonBody,
      },
    },
  );
  if (!response.ok) return RESPONSES.Unauthorized;

  const data: ApiResponse<IDiplomaResponse<IDiploma>> = await response.json();
  if (!data.status) {
    return;
  }

  return data.payload.diploma;
}

export async function immutableDiploma(diplomaId: string) {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  if (!token) return RESPONSES.Unauthorized;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/diplomas/${diplomaId}/immutable`,
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
