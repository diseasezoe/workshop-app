import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Vždy povoleno bez hesla
  if (
    pathname.startsWith("/vote") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("ws-auth");
  const correct = process.env.BASIC_AUTH_PASS ?? "";

  if (correct && cookie?.value === correct) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|slides/|spider/).*)"],
};
