import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/app/firebase/config";

const authenticated = false;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // // Get the current pathname
  // const { pathname } = request.nextUrl;
  //
  // // Allow requests to the login page without redirection
  // if (pathname === "/login") {
  //   return NextResponse.next();
  // }
  //
  // // Redirect to /login if the user is not authenticated
  // if (!authenticated) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  //
  // return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}
