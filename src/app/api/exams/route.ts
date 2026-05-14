import getExams from "@/src/features/dashboard-admin/(exmas)/Exams/apis/exams-action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const payload = await getExams(req);

  return NextResponse.json(payload);
}

