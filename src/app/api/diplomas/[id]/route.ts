import getDiplomaExams from "@/src/features/dashboard-user/slected-diplomas/apis/diplomas-exams.api";
import { extractId } from "@/src/shared/components/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const payload = await params;
  const realId = extractId(payload.id);
  const exams = await getDiplomaExams(req, realId);

  return NextResponse.json(exams);
}
