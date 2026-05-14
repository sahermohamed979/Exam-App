import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const autoRoutes = new Set([
  "/login",
  "/reset-password",
  "/forget-password",
  "/signup",
]);
const privateRoutes = new Set([
  "/exams",
  "/logs",
  "/add-diploma",
  "/",
  "/account",
]);

export default async function proxy(req: NextRequest) {
  const jwt = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (privateRoutes.has(pathname)) {
    if (jwt) return NextResponse.next();

    const redirect = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(redirect);
  }

   if (autoRoutes.has(pathname)) {
    if (!jwt) return NextResponse.next();

    const redirect = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(redirect);
  }



  return NextResponse.next();
}
