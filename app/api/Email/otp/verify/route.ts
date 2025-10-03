import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let { OTP } = (await request.json()) as { OTP: string };
  const cookie = cookies();
  const cookieOTP = cookie.get("Verification-OTP");
  if (OTP === cookieOTP?.value) {
    cookie.delete("Verification-OTP");
    request.cookies.delete("Verification-OTP");
    request.cookies.set("Verified", "true");
    cookie.set("Verified", "true");
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
