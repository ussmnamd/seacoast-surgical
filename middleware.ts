import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const ACCESS_DENIED = new URL("/access-denied", request.url);
  const ForgotPassword = new URL("/auth/forgot-password", request.url);
  const Home = new URL("/", request.url);

  const cookiesList = cookies();
  const token: RequestCookie | undefined = cookiesList.get("token");
  const role: RequestCookie | undefined = cookiesList.get("role");
  if (
    !token &&
    request.nextUrl.pathname.startsWith("/auth/forgot-password/add-otp")
  ) {
    if (!request.cookies.get("OTP-Verified")) {
      return NextResponse.redirect(ForgotPassword);
    }
  } else if (
    !token &&
    request.nextUrl.pathname.startsWith(
      "/auth/forgot-password/add-otp/UpdatePassword"
    )
  ) {
    if (!request.cookies.get("Verified")) {
      request.cookies.delete("OTP-Verified");
      cookiesList.delete("OTP-Verified");
      return NextResponse.redirect(ForgotPassword);
    }
  }
  if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(Home);
  // } else if (!token && request.nextUrl.pathname.startsWith("/cart")) {
  //   return NextResponse.redirect();
  } else if (!token && request.nextUrl.pathname.startsWith("/info")) {
    return NextResponse.redirect(Home);
  } else if (!token && request.nextUrl.pathname.startsWith("/setting")) {
    return NextResponse.redirect(Home);
  }
}
