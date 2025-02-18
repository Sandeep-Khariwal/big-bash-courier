import { LocalStorageKey } from "@/utility/AddLocalStorage";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/" || path === "/";
  const token = request.cookies.get(LocalStorageKey.Token)?.value;
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/admin/:id"],
};
