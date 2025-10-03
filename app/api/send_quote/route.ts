import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using your email service
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
    try {
      const { email, cartItems } = await request.json();
      console.log('Received cartItems:', cartItems);
      if (!email || !cartItems || cartItems.length === 0) {
        return NextResponse.json({ message: 'Missing required fields or empty cart' }, { status: 400 });
      }
  
      // Construct the HTML content for the email
      const cartItemsHtml = cartItems.map((item: any) => {
        return `
          
          <br />
          <hr />
          <br />
          <li>
            <strong>Product:</strong> ${item.product_name || 'Unknown Product'} <br />
            <strong>Quantity:</strong> ${item.quantity || 0} <br />
            <strong>Price per item:</strong> ${item.price_per_item !== undefined ? item.price_per_item : 0} <br />
            <strong>Total price:</strong> ${item.quantity && item.price_per_item ? item.quantity * item.price_per_item : 0}
          </li>
        `;
      }).join('');
  
      const emailContent = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Quote Request</h2>
            <p>A quote request has been made for the following items:</p>
            <ul>${cartItemsHtml}</ul>
            <p>Total items: ${cartItems.length}</p>
          </body>
        </html>
      `;
  
      // Send email to the user
      await sendEmail(
        email,
        'Your Quote Request',
        emailContent
      );
  
      // Send notification email to admin
      await sendEmail(
        'sales@artemamed.com',
        'New Quote Request',
        `<p>A new quote request has been submitted by ${email}.</p>${emailContent}`
      );
  
      return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
    }
  }
  