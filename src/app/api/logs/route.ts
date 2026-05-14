import { NextRequest, NextResponse } from "next/server";
import getLogs from "@/src/features/dashboard-admin/logs/apis/logs.action";

export async function GET(req: NextRequest) {
  const payload = await getLogs(req);

  return NextResponse.json(payload);
}
