import { NextResponse } from "next/server";

import { ErrorResponse } from "../types/api";

export const RESPONSES = {
  Unauthorized: {
    status: false,
    message: "Unauthorized",
    code: 401,
  } as ErrorResponse,
};
export const API_RESPONSES = {
  Unauthorized: NextResponse.json(
    { status: false, message: "Unauthorized" },
    { status: 401 },
  ),
};
