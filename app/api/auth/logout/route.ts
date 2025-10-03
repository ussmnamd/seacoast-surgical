import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteCookie } from "cookies-next";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");
  request.cookies.delete("token");
  request.cookies.delete("role");
  deleteCookie("token");
  deleteCookie("role");
  
  return NextResponse.json(
    { success: true },
    {
      status: 200,
    }
  );
}
