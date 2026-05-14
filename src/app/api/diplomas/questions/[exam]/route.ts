import getExamApi from "@/src/features/dashboard-user/exams/apis/getExam.api";
import { extractId } from "@/src/shared/components/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ exam: string }> },
) {
  const param = await params;
    const realId = extractId(param.exam);
  
  const payload = await getExamApi(req, realId);

  return NextResponse.json(payload);
}
