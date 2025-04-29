// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configure which paths require authentication
// const protectedPaths = ["/dashboard", "/profile", "/settings"];
// const authRoutes = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // return NextResponse.redirect(new URL("/dashboard", request.url));
  // return NextResponse.next();
}

// Configure matcher to run middleware only on specific paths
export const config = {
  matcher: [],
};
