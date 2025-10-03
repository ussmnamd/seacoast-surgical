import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { SendWelcome } from "@/lib/Emails/SendWelcome";
import { sendFreshUserInfo } from "@/lib/Emails/sendFreshUserInfo";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest, response: NextResponse) {
  const data = await request.json();

  try {
    const authenticationResponse = await axios.post(
      `${process.env.ApiEdgePoint}/api/add-client-user`,
      {
        user_id: 92,
        user_from: "web",
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone,
      }
    );

    console.log("function not called");
    console.log(authenticationResponse);

    if (authenticationResponse.data) {
      console.log("success");
      await sendRegistrationEmail(data.email, "user", data);
      await sendRegistrationEmail("sales@dynamicmedicalsolution.com", "admin", data);
      await sendRegistrationEmail("sales@dynamicmedicalsolution.com", "chris", data);

      console.log("function called");
    }

    return NextResponse.json({ data: authenticationResponse.data, success: true }, { status: authenticationResponse.status });
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || "Error";

      // Check for the specific error message related to the duplicate email entry
      if (errorMessage.includes("Duplicate entry")) {
        return NextResponse.json(
          {
            success: false,
            message: "User Email Already Exists & Active.",
          },
          { status: 409 } // Conflict status code
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: error.response.status || 402 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred",
        },
        { status: 500 }
      );
    }
  }
}

async function sendRegistrationEmail(to: string, recipientType: "user" | "admin" | "chris", data: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sales@dynamicmedicalsolution.com",
        pass: "wpae mkvg bdeo sxoh",
      },
    });

    let subject, text, html;
    if (recipientType === "chris") {
      subject = "New User Registration";
      text = "This is the Copy Of Email sent to Admin about Registration of a New User ";
      html = sendFreshUserInfo(data.first_name, data.email, recipientType);
    } else if (recipientType === "user") {
      subject = "Registration Successful";
      html = SendWelcome(data.first_name);
    } else if (recipientType === "admin") {
      subject = "New User Registration";
      html = sendFreshUserInfo(data.first_name, data.email, recipientType);
    }

    const mailOptions = {
      from: {
        name: "Dynamic Medical Solutions",
        address: "sales@dynamicmedicalsolution.com",
      },
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending ${recipientType} registration email:`, error);
  }
}
