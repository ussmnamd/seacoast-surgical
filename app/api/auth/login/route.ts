import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const authenticationResponse = await axios.post(
      `${process.env.ApiEdgePoint}/api/login`,
      {
        email,
        password,
      }
    );
    // if the authentication from the server is valid
    const { token, role }: { token: string; role: string } =
      await authenticationResponse.data;
    // Store the token and the role in the cookie's
    const cookieStore = cookies();
    cookieStore.set("token", token, { secure: true });
    cookieStore.set("role", role, { secure: true });
    request.cookies.set("token", token);
    request.cookies.set("role", token);

    return NextResponse.json(
      { success: true, message: "Welcome" },
      { status: 200 }
    );
    
    
  } catch (error: any) {
    if (error.response && error.response.data) {
      // Extract the error message from the response data
      const errorMessage = error.response.data.message || "Error";

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: error.response.status || 402 } // Use the status from the response or default to 402
      );
    } else {
      // If no specific error message is available, handle it generically
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred",
        },
        { status: 500 } // Use a default status code for generic errors
      );
    }
  }
}
