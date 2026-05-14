import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { uploadSchema } from "@/src/features/dashboard-admin/(diplomas)/add-diploma/schema/add-diplomas-schema";
import { API_RESPONSES } from "@/src/shared/constants/response.constant";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) return API_RESPONSES.Unauthorized;

  const formData = await req.formData();

  const result = uploadSchema.safeParse({ image: formData.get("image") });

  if (!result.success) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const response = await fetch(
    `https://exam-app.elevate-bootcamp.cloud/api/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      body: formData,
    },
  );
  const payload = await response.json();

  return NextResponse.json(payload);
}
