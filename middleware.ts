import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/vote")) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const colonIdx = decoded.indexOf(":");
    const user = decoded.slice(0, colonIdx);
    const pass = decoded.slice(colonIdx + 1);
    if (
      user === (process.env.BASIC_AUTH_USER ?? "") &&
      pass === (process.env.BASIC_AUTH_PASS ?? "")
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Přístup zamítnut", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Workshop"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|slides/|spider/).*)"],
};
