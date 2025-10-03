import { SendOTPEmail } from "@/lib/Emails/SendOTP";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  let { email } = (await request.json()) as { email: string };
  let otp = Math.floor(100000 + Math.random() * 900000);
  // console.log(email);
  // console.log(otp);
  let OTP = otp.toString();
  try {
    // Base options for all emails without HTML content
    const options = {
      from: {
        name: "Dynamic Medical Solutions",
        address: "sales@dynamicmedicalsolution.com",
      },
      to: email,
      subject: "OTP form Dynamic Medical Solutions",
      html: SendOTPEmail({ otp: otp }),
    };
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail service used for sending emails
      host: "smtp.gmail.com", // SMTP host for Gmail
      port: 587, // Port number for SMTP on Gmail
      auth: {
        user: "sales@artemamed.com", // Sender's email address for authentication
        pass: "jjxk ygzq brkg nbxu", // Sender's application password for authentication
      },
    });
    // Send the email using the transporter and provided options
    await transporter.sendMail(options);

    cookieStore.set("Verification-Email", email, {
      secure: true,
      maxAge: 60,
      expires: new Date(60),
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });
    cookieStore.set("Verification-OTP", OTP, {
      secure: true,
      maxAge: 60,
      expires: new Date(60),
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    request.cookies.set("Verification-Email", email);
    request.cookies.set("Verification-OTP", OTP);
    request.cookies.set("Verified", "true");
    cookieStore.set("OTP-Verified", "true");
    cookieStore.set("Verification-Email", email);    
    // Return a success response if the email is sent successfully
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
