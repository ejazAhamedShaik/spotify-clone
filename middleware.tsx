import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET || "";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: secret });
  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) return NextResponse.next();

  if (!token && pathname !== "/login")
    return NextResponse.rewrite(new URL("/login", req.url));
}

export const config = {
  matcher: ["/api/auth", "/login"],
};
