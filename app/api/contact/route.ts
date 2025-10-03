import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER!,
    to,
    subject,
    html, // Use 'html' for HTML content
  };

  return transporter.sendMail(mailOptions);
};

// API route handler
export async function POST(request: Request) {
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

  try {
    const data = await request.json();
    const { fname, lname, city, country, email, phone, message } = data;

    if (!fname || !lname || !city || !country || !email || !phone || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Send confirmation email to the user
    await sendEmail(
      email,
      'Thank You for Your Inquiry!',
      `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
              <h2 style="color: #007BFF;">Hello ${fname} ${lname},</h2>
              <p style="font-size: 16px;">
                Thank you for reaching out to us at Dynamic Medical Solutions! We have received your inquiry and our team will get back to you as soon as possible.
              </p>
              <p style="font-size: 16px;">
                If you have any additional questions or need further assistance in the meantime, please don't hesitate to contact us.
              </p>
              <p style="font-size: 16px; margin-top: 20px;">
                Best regards,<br />
                <strong>Dynamic Medical Solutions</strong><br />
              </p>
            </div>
          </body>
        </html>
      `
    );
    
    // Send notification email to admin
    await sendEmail(
      'sales@artemamed.com',
      'New Contact Form Submission from Dynamic Medical Solutions',
      `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
              <h2 style="color: #007BFF;">New Contact Form Submission</h2>
              <p style="font-size: 16px;">
                <strong>Name:</strong> ${fname} ${lname}<br />
                <strong>City:</strong> ${city}<br />
                <strong>Country:</strong> ${country}<br />
                <strong>Email:</strong> ${email}<br />
                <strong>Phone:</strong> ${phone}<br />
                <strong>Message:</strong><br />
                <pre style="background-color: #fff; border: 1px solid #ddd; border-radius: 4px; padding: 10px; white-space: pre-wrap;">${message}</pre>
              </p>
              <p style="font-size: 16px; margin-top: 20px;">
                Please review the submission and follow up as needed.
              </p>
              <p style="font-size: 16px;">
                Best regards,<br />
                <strong>Dynamic Medical Solutions</strong><br />
              </p>
            </div>
          </body>
        </html>
      `
    );

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
}

